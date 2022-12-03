import db from '../config/db.js'

class User {
  constructor(name, email, password ,gender, mobile,username, inCall) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.mobile = mobile;
    this.username = username;
    this.inCall = inCall;
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
      '0'
    )
    `;

    return db.execute(sql);
  }
  

  static findOne(email) {
    let sql = `SELECT * FROM users WHERE email="${email}";`;

    return db.execute(sql);
  }

  static matchPassword(user,password) {
    return user.password === password
  }

  static findByUsername(username) {
    let sql = `SELECT user_id FROM users WHERE username="${username}";`
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
    let sql = `SELECT * FROM users WHERE inCall=${inCall};`

    return db.execute(sql);
  }

}

export default User;
