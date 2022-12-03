import express from 'express';
const router = express.Router();
import {
  registerUser,
  authUser
} from '../controllers/userControllers.js'

router.route('/login').post(authUser)
// router.route('/profile').get(protect, getUserProfile)

router.route('/').post(registerUser)

export default router