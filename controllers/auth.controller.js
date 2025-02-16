import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
   // Implement sign up logic

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //create a new user

        const { name, email, password } = req.body;

        //check if a user already exists
        const existingUser = await UserModel.findOne({email:email});

        if (existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUsers = await UserModel.create([{name, email, password:hashedPassword}], {session:session});

        // generate jwt token
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        await session.endSession()

        //sent response
        res.status(201).json({
            success:true,
            message: 'User created successfully',
            data:{
                token:token,
                user:newUsers[0]
            }
        })

    }catch (e){
        await session.abortTransaction();
        await session.endSession();
        next(e)
    }
}

export const signIn = async (req, res, next) => {
    // Implement sign in logic

    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({email: email});

        // console.log(user)

        if (!user){
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error
        }

        // validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error
        }

        // generate jwt token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN});

        //sent response
        res.status(201).json({
            success:true,
            message: 'User sing in successfully',
            data:{
                token:token,
                user:user
            }
        })

    }catch (e) {
        next(e)
    }
}

export const signOut = async (req, res, next) => {
    // Implement sign out logic
}