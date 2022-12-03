import db from '../config/db.js'

class Pool {
  constructor(title, category, meritRequired ,discussionType, spectatorsAllowed, stance,guts, source ,  duration, isActive, user_id) {
    this.title = title;
    this.category = category;
    this.meritRequired = meritRequired;
    this.discussionType = discussionType;
    this.spectatorsAllowed = spectatorsAllowed;
    this.stance= stance;
    this.guts= guts;
    this.source= source;
    this.duration= duration;
    this.isActive= isActive;
    this.user_id= user_id;
  }

  save() {

    let sql = `
    INSERT INTO pools
    (   
      title, 
      category, 
      merit_required ,
      discussion_type, 
      spectators_allowed, 
      stance,
      guts, 
      source ,  
      duration, 
      is_active,
      user_id
    )
    VALUES(
      '${this.title}',
      '${this.category}',
      '${this.meritRequired}',
      '${this.discussionType}',
      '${this.spectatorsAllowed}',
      '${this.stance}',
      '${this.guts}',
      '${this.source}',
      '${this.duration}',
      '${this.isActive}',
      '${this.user_id}'
    )
    `;

    return db.execute(sql);
  }

  static findAll(user_id) {
    let sql = `SELECT * FROM pools WHERE user_id!= ${user_id};`;

    return db.execute(sql);
  }

  static findMy(user_id) {
    let sql = `SELECT * FROM pools WHERE user_id= ${user_id};`;

    return db.execute(sql);
  }

  static findById(pool_id) {
    let sql = `SELECT * FROM pools WHERE pool_id= ${pool_id};`;

    return db.execute(sql);
  }
  
  static isUserHostOfPool(user_id, pool_id) {
    let sql = `SELECT * FROM pools WHERE pool_id= ${pool_id} and user_id= ${user_id};`
    return db.execute(sql);
  }
  static setActiveStatusOfPool(pool_id, isactive) {
    let sql = `UPDATE pools SET is_active = ${isactive} WHERE pool_id=${pool_id};`
    return db.execute(sql);
  }

  static isCurrentPoolActive(pool_id) {
    let sql = `SELECT * FROM pools WHERE is_active = 1 AND pool_id="${pool_id}";`
    return db.execute(sql);
  }

  static isUserAllowedToJoinPool(pool_id, user_id) {
    let sql = `SELECT * FROM pools_requests WHERE status="accepted" AND user_id="${user_id}" AND pool_id="${pool_id}";`
    return db.execute(sql);
  }

  static setPoolNotification(pool_id) {
    let sql = `UPDATE pools SET noti_sent= 1 WHERE pool_id=${pool_id};`
    return db.execute(sql);
  } 
}

export default Pool;
