import PoolRequest from "../models/PoolRequest.js";
import Pool from "../models/Pool.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

const createPoolRequest = async (req, res, next) => {
  try {
    let hasPoolRequest = await PoolRequest.findOne(
      req.user.user_id,
      req.params.id
    );
    hasPoolRequest = hasPoolRequest[0][0];

    if (hasPoolRequest) {
      return res
        .status(400)
        .json({ message: "You have already sent a request" });
    }

    const { stance, guts } = req.body;
    let poolRequest = new PoolRequest(
      stance,
      guts,
      req.user.user_id,
      req.params.id
    );

    await poolRequest.save();

    let poolData = await Pool.findById(req.params.id);
    poolData = poolData[0][0];

    let notification = new Notification(
      `${req.user.username} sent you a Request for the pool ${poolData.title}`,
      poolData.user_id
    );

    notification = await notification.save();

    // console.log(notification[0]["ResultSetHeader"].insertId)

    let message = await Notification.getById(notification[0].insertId);
    message = message[0][0].message;

    return res
      .status(201)
      .json({ message: "Request Sent Successfully!", noti: message });
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getMyPoolRequests = async (req, res, next) => {
  try {
    let PoolRequests = await PoolRequest.findMy(req.user.user_id);
    PoolRequests = PoolRequests[0];

    // console.log(PoolRequests)
    PoolRequests = await Promise.all(
      PoolRequests.map(async (req) => {
        let poolData = await Pool.findById(req.pool_id);
        poolData = poolData[0][0];
        return { ...req, pool: poolData };
      })
    );

    return res.status(200).json(PoolRequests);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getAllPoolRequests = async (req, res, next) => {
  try {
    let poolData = await Pool.findById(req.params.id);
    poolData = poolData[0][0];

    if (poolData.user_id !== req.user.user_id)
      return res.status(403).json({ message: "Not Authorized" });

    let PoolRequests = await PoolRequest.findAll(req.params.id);
    PoolRequests = PoolRequests[0];

    PoolRequests = await Promise.all(
      PoolRequests.map(async (req) => {
        let user = await User.findById(req.user_id);
        req.pool_id = undefined;
        user = user[0][0];
        user.password = undefined;
        user.mobile = undefined;
        user.gender = undefined;
        user.created_at = undefined;
        return { ...req, user };
      })
    );

    return res.status(200).json(PoolRequests);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const acceptPoolRequest = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const pool_id = req.params.id;
    const joiningUser_id = req.body.joiningUser_id;
    // console.log(req.body)

    let isUserHost = await Pool.isUserHostOfPool(user_id, pool_id);
    isUserHost = isUserHost[0][0];
    // console.log(isUserHost);
    if (!isUserHost) {
      return res
        .status(403)
        .json({ message: "Permission Denied! Not a host." });
    }

    await PoolRequest.acceptPoolRequest(pool_id, joiningUser_id);
    let user = await User.findById(isUserHost.user_id);
    user = user[0][0];
    let notification = new Notification(
      `${user.username} accepted your Request for the pool ${isUserHost.title}`,
      joiningUser_id
    );

    notification = await notification.save();

    // console.log(notification[0]["ResultSetHeader"].insertId)

    let message = await Notification.getById(notification[0].insertId);
    message = message[0][0].message;

    return res.status(200).json({ Success: "OK", message });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const rejectPoolRequest = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const pool_id = req.params.id;
    const joiningUser_id = req.body.joiningUser_id;
    let isUserHost = await Pool.isUserHostOfPool(user_id, pool_id);
    isUserHost = isUserHost[0][0];
    if (!isUserHost) {
      return res
        .status(404)
        .json({ message: "Permission Denied! Not a host." });
    }
    await PoolRequest.rejectPoolRequest(pool_id, joiningUser_id);
    return res.status(200).json({ Success: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

export {
  createPoolRequest,
  getMyPoolRequests,
  getAllPoolRequests,
  acceptPoolRequest,
  rejectPoolRequest,
};
