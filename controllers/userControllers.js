import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const registerUser = async(req, res,next) => {
    try {
        const { name, email, password ,gender, mobile, username } = req.body;
        let user = new User(name, email, password ,gender, mobile,username);
    
        user = await user.save();
        // console.log(user)

        return res.status(201).json({ message: "User created" });

      } catch (error) {

        console.log(error)
        return res.status(400).json({ message: error.sqlMessage })
    }
  }

  const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};
  
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.user_id);
      
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      id: user.user_id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      username: user.username,
      merit: user.merit,
      token
    });
};

  const authUser= async(req,res,next)=>{

    const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({message: 'Please provide email and password!'});
  }



  // 2) Check if user exists && password is correct
  let user = await User.findOne(email);
  user= user[0][0];

  if (!user || !(User.matchPassword(user,password))) {
    return res.status(401).json({message: 'Incorrect email or password'});
  }

  // 3) If everything ok, send token to client
//   createSendToken(user, 200, res);
createSendToken(user, 200, res);

}

export{
  registerUser,
  authUser
}