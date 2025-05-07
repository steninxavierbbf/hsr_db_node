import express from 'express';
import { createANewOrder} from '../controller/userController.js';
// import { validateToken } from '../validateToken.js';
import { createPdfAndEmail} from '../controller/mailerController.js';
const route = express.Router();
route.post("/create-order",createANewOrder);
route.post('/send-email',createPdfAndEmail);
export default route;