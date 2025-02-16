import User from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
      //select users without a password
      const users = await User.find().select('-password');

      res.status(200).json({ success: true, data: users})

  }catch (e) {
      next(e)
  }
}

export const getUser = async (req, res, next) => {
    try {
        //select user without a password
        const user = await User.findById(req.params.id).select('-password');

        if (!user){
            const error = new Error('User not found!');
            error.statusCode = 404;
            throw error
        }

        res.status(200).json({ success: true, data: user})

    }catch (e) {
        next(e)
    }
}