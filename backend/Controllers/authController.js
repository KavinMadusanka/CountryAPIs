import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import FavoriteModel from "../models/FavoriteModel.js";

// User Register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, address, contactNumber } = req.body;

        // Validation
        if (!name) {
            return res.status(404).send({ message: 'Name is Required' });
        }
        if (!email) {
            return res.status(404).send({ message: 'Email is required' });
        }
        if (!address) {
            return res.status(404).send({ message: 'Address is required' });
        }
        if (!contactNumber) {
            return res.status(404).send({ message: 'Contact Number is required' });
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: 'Already Registered. Please login',
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const user = await new userModel({ name, email, address, password: hashedPassword, contactNumber }).save();

        res.status(200).send({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error,
        });
    }
};

// User Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
            });
        }

        // Check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Password',
            });
        }
        //create session
        // req.session.userId = user._id;
        // console.log(req.session.userId);

        // Create JWT Token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Set cookie and send response
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: false,  // set to false for local testing (ensure HTTPS is used in production)
            sameSite: 'None',
        }).send({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                address: user.address,
                email: user.email,
                contactNumber: user.contactNumber,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        });
    }
};

// User Logout (Signout)
export const Signout = (req, res) => {
    try {
        console.log('signout')
        res.clearCookie('access_token').status(200).send({
            success: true,
            message: 'Signout successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error occurred during signout',
        });
    }
};

// User Delete
export const userDelete = async (req, res) => {
    if (req.user.id !== req.params.userId) {
        return res.status(403).send({
            success: false,
            message: 'You are not allowed to delete this account',
        });
    }

    try {
        await userModel.findByIdAndDelete(req.params.userId);
        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error deleting user',
        });
    }
};

// Get Single User
export const getSingleUser = async (req, res) => {
    try {
        const { Uid } = req.params;

        // Find user by ID
        const user = await userModel.findById(Uid).select('-password');  // exclude password

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'User fetched successfully',
            user,
        });
    } catch (error) {
        console.error('Error in getSingleUser:', error);
        res.status(500).send({
            success: false,
            message: 'Error fetching user',
            error,
        });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find();

        res.status(200).send({
            success: true,
            message: 'All users fetched successfully',
            allUsers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching all users',
            error,
        });
    }
};

//create ne favorite
export const addFavoriteController = async (req, res) => {
    try {
        console.log('fav')
        const { countryCode }  = req.body;        
        const id = req.user.id;
        console.log(id);
        console.log(countryCode);
        // console.log(req.user);

        //check this user added this flag before
        const existingFlag = await FavoriteModel.findOne({userId: id, countryCode:countryCode});

        if(existingFlag){
            return res.status(400).send({
                success:false,
                message: 'Already added this flag to your favorites',
            })
        }

        await new FavoriteModel({ userId: id, countryCode }).save();

        res.status(200).send({
            success:true,
            message:'Flag added to your favorites.'
        })


        
    } catch (error) {
        console.error(error); 
        res.status(500).send({
            success:false,
            message:'Faild to save favorite',
        })
    }
}

// Get user's favorite countries
export const getFavoritesController = async (req, res) => {
    try {
      const userId = req.user.id; // Logged-in user's ID
  
      const favorites = await FavoriteModel.find({ userId });
  
      if (!favorites || favorites.length === 0) {
        return res.status(200).send({ 
            success: true, 
            favorites: [] 
        }); // return empty if no favorites yet
      }
  
      res.status(200).send({ 
        success: true, 
        favorites });
    } catch (error) {
      console.error('Error fetching favorites:', error);
      res.status(500).send({ success: false, message: 'Failed to fetch favorites' });
    }
  };

  export const deleteFavoriteController = async (req, res) => {
    const userId = req.user.id;
    const { countryCode } = req.params;

    try {
        const removed = await FavoriteModel.findOneAndDelete({ userId, countryCode });

        if (!removed) {
        return res.status(404).send({ 
            success: false, 
            message: 'Favorite not found' });
        }

        res.status(200).send({ 
            success: true,
            message: 'Removed from favorites' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ 
            success: false, 
            message: 'Server error' });
    }
  }
  