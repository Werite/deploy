import db from "../config/db.js";

class Comments {
  constructor(video_id, reply_of_comment_id, user_id, comment) {
    this.video_id = video_id;
    this.reply_of_comment_id = reply_of_comment_id;
    this.user_id = user_id;
    this.comment = comment;
  }
  async save() {
    const result = await db.execute(
      "INSERT INTO comments SET video_id = ?, reply_of_comment_id = ?, user_id = ?, comment = ?",
      [this.video_id, this.reply_of_comment_id, this.user_id, this.comment],
      {
        returning: true,
      }
    );

    const insertedComment = result[0];

    return insertedComment.insertId;
  }

  static findAllComments(video_id) {
    let sql = `SELECT comments.*,users.username,users.profile_pic FROM comments LEFT JOIN users ON comments.user_id = users.user_id WHERE video_id=${video_id} ORDER BY created_at DESC`;
    return db.execute(sql);
  }

  static findAllParentComment(video_id) {
    let sql = `SELECT comments.*,users.username FROM comments LEFT JOIN users ON comments.user_id = users.user_id WHERE reply_of_comment_id=0 AND video_id=${video_id}`;
    return db.execute(sql);
  }

  static findAllChildComment(reply_of_comment_id, video_id) {
    let sql = `SELECT comments.*,users.username,users.profile_pic FROM comments LEFT JOIN users ON comments.user_id = users.user_id WHERE reply_of_comment_id=${reply_of_comment_id} AND video_id=${video_id}`;
    return db.execute(sql);
  }
}

export default Comments;
