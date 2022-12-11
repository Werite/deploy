import db from '../config/db.js'

class Comments {
  constructor(video_id, reply_of_comment_id, user_id, comment) {
    this.video_id = video_id;
    this.reply_of_comment_id = reply_of_comment_id;
    this.user_id = user_id;
    this.comment = comment
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.mobile = mobile;
    this.username = username;
    this.inCall = inCall;
  }

  save() {
    

    let sql = `
    INSERT INTO comments(
        video_id, reply_of_comment_id, user_id, comment
    )
    VALUES(
      '${this.video_id}',
      '${this.reply_of_comment_id}',
      '${this.user_id}',
      '${this.comment}',
    )
    `;

    return db.execute(sql);
  }

}

export default Comments;
