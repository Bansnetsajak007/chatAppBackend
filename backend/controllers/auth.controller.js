import User from '../models/user.model.js'
import bycrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const singup = async (req , res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
             return res.status(400).json({error:"Password did not match"});
        }

		const user = await User.findOne({ userName });

        if (user) {
            return res.status(200).json({error: "User already exists"});
        }

        //will hash password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);


		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilepic:gender === "male" ? boyProfilePic : girlProfilePic,
        })

        if(newUser) {
            //generate JWt tokens
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                userName : newUser.userName,
                gender : newUser.gender,
                // profilePic : newUser.profilePic,
            });
        } else{
            res.status(404).json({error: "Invalid user Data"});
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
//fuckkkk i hate typo errors🤦

export const login = async (req, res) => {
   try {
        const { userName , password } = req.body;

        const user = await User.findOne({userName});
        const isPasswordCorrect = await bycrypt.compare(password, user?.password || "");

        //validations
        if(!user || !isPasswordCorrect) {
            /*
            yo if bhitra return lagayana vane app carash hunxa return use hannai parxa
             code ko exeution if bhitra gayo vane return statement ley terminare hanxa

             yo kura jailey yaad rakhh
            */
           return res.status(400).json({error: "Invalid username or password"});
        }

        //setting cookie as token
        generateTokenAndSetCookie(user._id , res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            gender : user.gender,
        });
    } catch(error) {
        console.error(error.message);
        res.status(500).json({
        error: "Internal Server Error"
        });
    }
}

export const logout = async (req , res) => {
    try{
        //logout logic
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }catch(error){
        console.error(error.message);
        res.status(500).json({
        error: "Internal Server Error"
        });       
    }
}