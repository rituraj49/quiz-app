import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        unique:true
    },
    options:{
        type:Array,
        required:true
    },
    correctOption:{
        type:Number,
        required:true
    },
    points:{
        type:Number
    }
 
});

export default mongoose.model('question', questionSchema)