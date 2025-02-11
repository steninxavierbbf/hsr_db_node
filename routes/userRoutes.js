import express from 'express';
import { createANewOrder} from '../controller/userController.js';
import { getAllUsers } from '../controller/userController.js';
import { deleteUser } from '../controller/userController.js';
import { validateToken } from '../validateToken.js';
import { createPdfAndEmail} from '../controller/mailerController.js';
const route = express.Router();
route.post("/create-order",createANewOrder);
route.get("/orders",validateToken, getAllUsers);
route.delete("/delete-order/:id",deleteUser);
route.post('/send-email',createPdfAndEmail);

export default route;