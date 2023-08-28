import mongoose from "mongoose";
import questionModel from "../models/questionModel.js";

const createController = async(req, res)=>{
    console.log("called");
    try {
        const {question, options, correctOption, points} = req.body;
        // if(!question || !options || !correctOption || !points){
        //     return res.send({
        //         success:false,
        //         message:"all fields are required"
        //     })
        // }

        // check existing question

        const existingQuest = questionModel.find({question});
        if(existingQuest){
            return res.status(200).send({
                success:true,
                message:"question already exists, add a new one"
            })
        }

        // add new question

        const newQuestion = new questionModel({question, options, correctOption, points})
        // const allQuestions = new questionModel.create(req.body.questions)
        await newQuestion.save();
        // await allQuestions.save();
        return res.status(201).send({
            success:true,
            message:"question added successfully",
            newQuestion
            // allQuestions
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"error while adding questions",
            error
        })
    }
}

const retrieveQuestions = async(req, res) => {
    try {
        const allQuests = await questionModel.find();
        return res.status(200).send({
            success:true,
            message:"questions retrieved successfully",
            allQuests
        })
    } catch (error) {
        return res.send({
            success:false,
            message:"error while fetching questions",
            error
        })
    }
}

export {createController, retrieveQuestions}