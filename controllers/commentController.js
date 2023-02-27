import Comments from "../models/Comments.js";
import User from "../models/User.js";

const createComment = async (req, res, next) => {
  try {
    let comment = new Comments(
      req.params.video_id,
      req.body.reply_of_comment_id,
      req.user.user_id,
      req.body.comment
    );

    const commentId = await comment.save();
    let users = await User.findById(req.user.user_id);
    users = users[0];
    const username = users.map((u) => u.username);
    const profile_pic = users.map((p) => p.profile_pic);
    return res.status(200).json({
      comment_id: commentId,
      video_id: req.params.video_id,
      reply_of_comment_id: req.body.reply_of_comment_id,
      user_id: req.user.user_id,
      comment: req.body.comment,
      username: username[0],
      profile_pic: profile_pic[0],
    });
  } catch (error) {
    console.log("error");
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getAllComments = async (req, res, next) => {
  try {
    let comments = await Comments.findAllComments(req.params.video_id);
    comments = comments[0];

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getAllParentComments = async (req, res, next) => {
  try {
    let parentComments = await Comments.findAllParentComment(
      req.params.video_id
    );
    parentComments = parentComments[0];

    return res.status(200).json(parentComments);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.sqlMessage });
  }
};

const getReplies = async (req, res, next) => {
  try {
    let childComments = await Comments.findAllChildComment(
      req.params.reply_of_comment_id,
      req.params.video_id
    );
    childComments = childComments[0];

    return res.status(200).json(childComments);
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage });
  }
};

export { createComment, getAllComments, getAllParentComments, getReplies };
