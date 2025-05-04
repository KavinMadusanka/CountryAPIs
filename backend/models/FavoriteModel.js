import mongoose from "mongoose";

const FavSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
    },
    countryCode: {
        type: String,
        required: true
    },
},{timestamps: true});

export default mongoose.model('favorites',FavSchema);