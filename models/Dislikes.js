import db from '../config/db.js'

class Dislikes {
  constructor(user_id, video_id) {
    this.user_id = user_id;
    this.video_id = video_id;
  }

  save() {
    let sql = `
    INSERT INTO dislikes(
        user_id, video_id
    )
    VALUES(
        '${this.user_id}',
        '${this.video_id}',
    )
    `;

    return db.execute(sql);
  }

}

export default Dislikes;
