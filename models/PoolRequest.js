import db from '../config/db.js'

class PoolRequest {
  constructor(stance,guts, user_id , pool_id) {
    this.stance= stance;
    this.guts= guts;
    this.user_id= user_id;
    this.pool_id= pool_id;
  }

  save() {

    let sql = `
    INSERT INTO pools_requests
    (    
      stance,
      guts, 
      user_id,
      pool_id,
      status
    )
    VALUES(
      '${this.stance}',
      '${this.guts}',
      '${this.user_id}',
      '${this.pool_id}',
      'pending'
    )
    `;

    return db.execute(sql);
  }

  static findOne(user_id,pool_id) {
    let sql = `SELECT * FROM pools_requests WHERE user_id="${user_id}" AND pool_id="${pool_id}";`;

    return db.execute(sql);
  }

  static findMy(user_id) {
    let sql = `SELECT * FROM pools_requests WHERE user_id= ${user_id};`;

    return db.execute(sql);
  }

  static findAll(pool_id) {
    let sql = `SELECT * FROM pools_requests WHERE pool_id= ${pool_id};`;

    return db.execute(sql);
  }
  
  static acceptPoolRequest(pool_id, joiningUser_id) {
    let sql = `UPDATE pools_requests SET status = "accepted" WHERE user_id="${joiningUser_id}" AND pool_id="${pool_id}";`
    
    return db.execute(sql);
  }

  static rejectPoolRequest(pool_id, joiningUser_id) {
    let sql = `UPDATE pools_requests SET status = "rejected" WHERE user_id="${joiningUser_id}" AND pool_id="${pool_id}";`
    
    return db.execute(sql);
  }
}

export default PoolRequest;
