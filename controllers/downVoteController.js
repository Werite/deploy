import DownVotes from "../models/DownVote.js";

const downVoteVideo = async (req, res, next) => {
  try {
    let dislike = new DownVotes(req.user.user_id, req.params.video_id);
    await dislike.save();
    return res.status(200).json({ message: "User disliked the video" });
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getAllDownVotes = async (req, res, next) => {
  try {
    const video_id = req.params.video_id;
    let dislikes = await DownVotes.getAllDisLikes(video_id);
    dislikes = dislikes[0];
    dislikes = Object.values(dislikes);
    return res.status(200).json({ dislikes });
  } catch (error) {
    return res.send(400).json({ message: error.sqlMessage });
  }
};
const removeDownvote = async (req, res, next) => {
  try {
    let dislikes = await DownVotes.removeDislikeFromVideo(
      req.user.user_id,
      req.params.video_id
    );
    console.log(dislikes);
    return res.status(200).json({ message: "dislike removed" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

export { downVoteVideo, getAllDownVotes, removeDownvote };
