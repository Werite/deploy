import Notification from "../models/Notification.js";

const getNotifications = async (req, res, next) => {
  try {
    let notifications = await Notification.findAll(req.user.user_id);
    notifications = notifications[0];

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const upadateNotificationsSeen = async (req, res, next) => {
  try {
    await Notification.acceptPoolRequest(req.user.user_id);

    return res.status(200).json({ message: "Notification updated" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

export { getNotifications, upadateNotificationsSeen };
