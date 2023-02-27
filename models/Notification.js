import db from "../config/db.js";

class Notification {
  constructor(message, user_id, type = "normal", link = "") {
    this.message = message;
    this.user_id = user_id;
    this.type = type;
    this.link = link;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let hh = d.getHours();
    let mmm = d.getMinutes();
    let ss = d.getSeconds();

    let createdAtDate = `${yyyy}-${mm}-${dd} ${hh}:${mmm}:${ss}`;

    let sql = `
    INSERT INTO notifications
    (   
      message, 
      user_id,
      viewed,
      created_at,
      type,
      link
    )
    VALUES(
      '${this.message}',
      '${this.user_id}',
      0,
      '${createdAtDate}',
      '${this.type}',
      '${this.link}'
    )
    `;

    return db.execute(sql);
  }

  static findAll(user_id) {
    let sql = `SELECT * FROM notifications WHERE user_id = ${user_id} ORDER BY created_at DESC;`;

    return db.execute(sql);
  }

  static getById(noti_id) {
    let sql = `SELECT * FROM notifications WHERE notification_id = ${noti_id}`;

    return db.execute(sql);
  }

  static acceptPoolRequest(user_id) {
    let sql = `UPDATE notifications SET viewed= 1 WHERE user_id="${user_id}";`;

    return db.execute(sql);
  }
}

export default Notification;
