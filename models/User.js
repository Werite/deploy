import db from "../config/db.js";

class User {
  constructor(
    name,
    email,
    password,
    gender,
    mobile,
    username,
    is_active,
    inCall,
    profile_pic,
    bio
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.mobile = mobile;
    this.username = username;
    this.is_active = is_active;
    this.inCall = inCall;
    this.profile_pic = profile_pic;
    this.bio = bio;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
    INSERT INTO users(
        name, 
        email, 
        password,
        gender, 
        mobile,
        created_at,
        username,
        merit,
        is_active,
        inCall
    )
    VALUES(
      '${this.name}',
      '${this.email}',
      '${this.password}',
      '${this.gender}',
      '${this.mobile}',
      '${createdAtDate}',
      '${this.username}',
      '100',
      '0',
      '0'
    )
    `;

    return db.execute(sql);
  }

  static findOne(email) {
    let sql = `SELECT * FROM users WHERE email="${email}";`;

    return db.execute(sql);
  }

  static matchPassword(user, password) {
    return user.password === password;
  }

  static findByUsername(username) {
    let sql = `SELECT user_id FROM users WHERE username="${username}";`;
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM users WHERE user_id = ${id};`;

    return db.execute(sql);
  }

  static isUserInCall(user_id) {
    let sql = `SELECT * FROM users WHERE user_id = ${user_id} AND inCall != 0;`;

    return db.execute(sql);
  }

  static setUserCallStatus(user_id, inCall) {
    let sql = `UPDATE users SET inCall = ${inCall} WHERE user_id = ${user_id};`;

    return db.execute(sql);
  }

  static isCurrentPoolEmpty(inCall) {
    let sql = `SELECT * FROM users WHERE inCall=${inCall};`;

    return db.execute(sql);
  }
  static isUserActive(user_id) {
    let sql = `UPDATE users SET is_active = 1 WHERE user_id = ${user_id}`;
    return db.execute(sql);
  }
  static isUserNotActive(user_id) {
    let sql = `UPDATE users SET is_active = 0 WHERE user_id = ${user_id}`;
    return db.execute(sql);
  }
  static findUserPosts(user_id) {
    let sql = ` SELECT video_recordings.video_id,video_recordings.video_rec_url,users.user_id,users.username,pools.* from video_recordings INNER JOIN users ON video_recordings.user_id = users.user_id INNER JOIN pools ON video_recordings.pool_id = pools.pool_id WHERE users.user_id=${user_id}`;
    return db.execute(sql);
  }
  static addUserBio(user_id, bio) {
    let sql = `UPDATE users SET bio='${bio}' WHERE user_id=${user_id}`;
    return db.execute(sql);
  }
  static addProfileImage(user_id, url) {
    let sql = `UPDATE users SET profile_pic='${url}' WHERE user_id=${user_id}`;
    return db.execute(sql);
  }
}

export default User;
