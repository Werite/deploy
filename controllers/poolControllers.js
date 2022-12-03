import Pool from '../models/Pool.js'
import User from '../models/User.js';

const createPool = async(req, res,next) => {
    try {
        const { title, category, merit_required:meritRequired ,discussion_type:discussionType , spectators_allowed: spectatorsAllowed, stance,guts, source ,  duration, is_active: isActive } = req.body;
        let pool = new Pool(title, category, meritRequired ,discussionType, spectatorsAllowed, stance,guts, source ,  duration, isActive,req.user.user_id);
    
        pool = await pool.save();

        return res.status(201).json({ message: "Pool created" });

      } catch (error) {
        
        // console.log(error)
        return res.status(400).json({ message: error.sqlMessage })
    }
  }

const getPools= async(req, res,next) => {

    try {
      let pools = await Pool.findAll(req.user.user_id);
      pools= pools[0]

      pools= await Promise.all(pools.map(async(pool)=>{

        let user = await User.findById(pool.user_id) ;
        
        user= user[0][0] 
        user.password=undefined;
        user.mobile=undefined;
        user.merit=undefined;
        user.gender=undefined;
        user.created_at=undefined;
        return ({...pool,user})
      }))

      return res.status(200).json(pools);

    } catch (error) {

      console.log(error)
      return res.status(400).json({ message: error.sqlMessage })

    }
  
}

const getMyPools= async(req, res,next) => {

  try {
    let pools = await Pool.findMy(req.user.user_id);
    pools= pools[0]

    return res.status(200).json(pools);

  } catch (error) {

    console.log(error)
    return res.status(400).json({ message: error.sqlMessage })

  }

}

  export {
    createPool,
    getPools,
    getMyPools
  }