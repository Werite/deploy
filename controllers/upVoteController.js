import UpVotes from "../models/UpVote.js";

const UpVoteVideo = async (req, res, next) => {
  try {
    let like = new UpVotes(req.user.user_id, req.params.video_id);
    console.log(like);
    await like.save();
    return res.status(200).json({ message: "user liked the video" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getAllUpVotes = async (req, res, next) => {
  try {
    const video_id = req.params.video_id;
    let likes = await UpVotes.getAllLikes(video_id);
    likes = likes[0];
    likes = Object.values(likes);
    return res.status(200).json({ likes });
  } catch (error) {
    return res.send(400).json({ message: error.sqlMessage });
  }
};

const removeUpvote = async (req, res, next) => {
  try {
    const video_id = req.params.video_id;
    const user_id = req.user.user_id;
    let likes = await UpVotes.removeLikeFromVideo(user_id, video_id);
    console.log(likes);
    return res.status(200).json({ message: "like removed" });
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

export { UpVoteVideo, getAllUpVotes, removeUpvote };
