import express from 'express';
import { adminLogin, register } from '../controller/adminController.js';

const adminRoute = express.Router();
adminRoute.post("/login",adminLogin);
adminRoute.post("/register",register);
export default adminRoute;