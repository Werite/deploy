import db from "../config/db.js";

class VideoRecording {
  constructor(video_rec_url, user_id, pool_id) {
    this.video_rec_url = video_rec_url;
    this.user_id = user_id;
    this.pool_id = pool_id;
  }
  save() {
    let sql = `
    INSERT INTO video_recordings(
        video_rec_url,
        user_id,
        pool_id
    )
    VALUES(
        '${this.video_rec_url}',
        '${this.user_id}',
        '${this.pool_id}'
    )
    `;
    return db.execute(sql);
  }
  static findAllVideoRec() {
    let sql = `SELECT * FROM video_recordings`;
    return db.execute(sql);
  }
}

export default VideoRecording;
