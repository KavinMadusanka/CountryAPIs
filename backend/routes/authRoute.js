import express from 'express';
import { registerController,
    loginController,
    Signout,
    userDelete,
    addFavoriteController,
    getFavoritesController,
    deleteFavoriteController
    // getAllUsers,
    // getAllRestaurants,
    // getSingleUser
 } from '../Controllers/authController.js';
import { verifyToken } from '../middlewares/authmiddleware.js'

const router = express.Router();

//create account
router.post('/register', registerController);

//Login 
router.post('/login',loginController);

//signOut
router.post('/Signout',verifyToken, Signout) 

//delete account
router.delete('/deleteUser/:userId',verifyToken, userDelete)

//add favorite flag
router.post('/favorites',verifyToken,addFavoriteController);

//get favorite flags from logged user 
router.get('/getfavorites', verifyToken, getFavoritesController);

//delete favorite flags by logged user
router.delete('/favorites/:countryCode',verifyToken, deleteFavoriteController);

//get all users
// router.get('/getAllUsers',verifyToken, isAdmin, getAllUsers);

//get single user
// router.get('/getSingleUser/:Uid',getSingleUser);

// Route to fetch all restaurants
// router.get('/restaurants', getAllRestaurants );

export default router;