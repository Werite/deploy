import Comments from "../models/Comments.js";
import DownVotes from "../models/DownVote.js";
import Pool from "../models/Pool.js";
import UpVotes from "../models/UpVote.js";
import User from "../models/User.js";
import VideoRecording from "../models/VideoRecording.js";

const insertVideoRecURL = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const video_rec_url = req.body.video_rec_url;
    const pool_id = req.params.pool_id;
    // console.log(`video rec url ${video_rec_url}`)
    let isUserHost = await Pool.isUserHostOfPool(user_id, pool_id);

    if (!isUserHost) {
      return res
        .status(401)
        .json({ message: "You are not authorized to perform the task" });
    }
    let videoRecordings = new VideoRecording(video_rec_url, user_id, pool_id);
    console.log(videoRecordings);
    videoRecordings = await videoRecordings.save();

    // console.log(`video recordings save: ${videorecordings}`)

    return res.status(201).json({ message: "Video URL inserted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getVideoRecording = async (req, res, next) => {
  try {
    let videoRecordings = await VideoRecording.findAllVideoRec();
    videoRecordings = videoRecordings[0];
    videoRecordings = await Promise.all(
      videoRecordings.map(async (videoRec) => {
        let user = await User.findById(videoRec.user_id);
        let pool = await Pool.findById(videoRec.pool_id);
        let like = await UpVotes.getAllLikes(videoRec.video_id);
        let dislike = await DownVotes.getAllDisLikes(videoRec.video_id);

        pool = pool[0][0];
        user = user[0][0];
        like = like[0];
        dislike = dislike[0];
        pool.merit_required = undefined;
        pool.discussion_type = undefined;
        pool.spectators_allowed = undefined;
        pool.stance = undefined;
        pool.guts = undefined;
        pool.source = undefined;
        pool.duration = undefined;
        pool.is_active = undefined;
        pool.user_id = undefined;
        pool.people_allowed = undefined;
        user.password = undefined;
        user.mobile = undefined;
        user.merit = undefined;
        user.gender = undefined;
        user.created_at = undefined;
        like = Object.values(like);
        dislike = Object.values(dislike);

        return { ...videoRec, user, ...pool, like, dislike };
      })
    );
    return res.status(200).json(videoRecordings);
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

export { insertVideoRecURL, getVideoRecording };
