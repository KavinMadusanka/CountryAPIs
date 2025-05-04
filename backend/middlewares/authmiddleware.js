import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//token verification part

export const verifyToken = async (req, res, next) => {
    try {
        // console.log('awa')
        // console.log(req.cookies);
        const token = req.cookies.access_token;
        // console.log(token);

        //check token is available or not. token is not available mean user not login
        if(!token){
            return res.status(404).send({
                success:false,
                message:'Access Denied, You have to log in first'
            });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        //attach user data to request object
        req.user = await userModel.findById(decoded.id).select("-password");

        next();
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message: "Authontication Faild"
        })
    }
}