import db from "../config/db.js";

class DownVotes {
  constructor(user_id, video_id) {
    this.user_id = user_id;
    this.video_id = video_id;
  }
  save() {
    let sql = `
    INSERT INTO dislikes(
        user_id,
        video_id
    )
    VALUES(
        '${this.user_id}',
        '${this.video_id}'
    )
    `;
    return db.execute(sql);
  }
  static getAllDisLikes(video_id) {
    let sql = `SELECT * FROM dislikes WHERE video_id="${video_id}"`;
    return db.execute(sql);
  }
  static removeDislikeFromVideo(user_id, video_id) {
    let sql = `DELETE FROM dislikes WHERE user_id=${user_id} AND video_id=${video_id}`;
    return db.execute(sql);
  }
}

export default DownVotes;
