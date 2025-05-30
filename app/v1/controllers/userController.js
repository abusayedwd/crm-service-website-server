const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Response = require("../../../helpers/respones");
const sendActivationEmail = require("../../../helpers/email");
const { createJSONWebToken } = require("../../../helpers/jsonwebtoken");
const { forgotPasswordService, changePasswordService, userLogin } = require("../services/userServices");


// signup 

const signUp = async (req, res, next) => {
    try {
        const { name, email, password, phone,role } = req.body;
        console.log(password)

        // Check if the user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(409).json(Response({
                message: "User Already Exist",
                statusCode: 409,
                status: "Conflict",
                type: "Auth"
            }));
        }

       

        // Send activation email
        const emailResult = await sendActivationEmail(email, name);
        const oneTimeCode = emailResult.oneTimeCode;

        // Create a new user instance and save it to the database
        const newUser = new User({ name, email, password, phone, oneTimeCode,role, });
        const savedUser = await newUser.save();

        if (!emailResult.success) {
            return res.status(500).json(Response({
                message: 'Error sending activation email',
                statusCode: 500,
                status: 'Error',
                type: 'Email',
                error: emailResult.error
            }));
        }

        // Set a timeout to update the oneTimeCode to null after 3 minutes
        setTimeout(async () => {
            try {
                savedUser.oneTimeCode = null;
                await savedUser.save();
                console.log('oneTimeCode reset to null after 3 minutes');
            } catch (error) {
                console.error('Error updating oneTimeCode:', error);
            }
        }, 180000); // 3 minutes in milliseconds

        // Respond with a success message and the saved user data
        return res.status(200).json(Response({
            message: emailResult,
            statusCode: 200,
            status: "Success",
            data: savedUser,
            type: role
        }));
    } catch (error) {
       next(error)}
};

//verify code
const verifyCode = async (req, res,next) => {
    try {
        const { code, email } = req.body;

        // Check if email or code is missing
        if (!email || !code) {
            return res.status(400).json(Response({ message: "Email and code are required", status: "Bad Request", statusCode: 400, type: "Validation" }));
        }

        console.log(code, email);
        const user = await User.findOne({ email: email });

        // Check if user exists
        if (!user) {
            return res.status(404).json(Response({ message: "User not found", status: "Not Found", statusCode: 404, type: "User" }));
        }

        console.log(user.oneTimeCode);
        // Check if one-time code is null
        if (!user.oneTimeCode) {
            return res.status(400).json(Response({ message: "One-time code is null, please generate a new code", status: "Bad Request", statusCode: 400, type: "Validation" }));
        }

        // Check if provided code matches the user's one-time code
        if (user.oneTimeCode !== code) {
            return res.status(400).json(Response({ message: "Incorrect verification code", status: "Bad Request", statusCode: 400, type: "Validation" }));
        }

        // If code is correct, mark user as verified and clear one-time code
        user.isVerified = true;
        user.oneTimeCode = null;
        await user.save(); // Remember to await save()
          // Generate JWT token for the user
          const expiresInOneYear = 365 * 24 * 60 * 60; // seconds in 1 year
          const accessToken = createJSONWebToken({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, expiresInOneYear);
          console.log(accessToken);

        // Respond with success message
        res.status(200).json(Response({ message: "User verified successfully", status: "OK", statusCode: 200, type: "User",token:accessToken }));

    } catch (error) {
       next(error)
    }
};


//Sign in user
const signIn = async (req, res, next) => {
    try {
        // Get email and password from req.body
        const { email, password } = req.body;
        console.log("--------Meow", email)
       

        // Find the user by email
        const user = await User.findOne({ email });
        console.log("-------------->>>>>", user)

        if (!user) {
            return res.status(404).json(Response({ statusCode: 404, message: 'User not found', status: "Failed" }));
        }

        if(user.isVerified === false){
 return res.status(401).json(Response({statusCode:401, message:'you are not veryfied',status:'Failed'}))
        }

        // Check if the user is banned
        if (user.isBlocked) {
            return res.status(401).json(Response({ statusCode: 401, message: 'sorry your account  blocked', status: "Failed" }));
        }
           
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("---------------", isPasswordValid)

        if (!isPasswordValid) {
           return res.status(401).json(Response({ statusCode: 401, message: 'Invalid password', status: "Failed" }));
        }

        // Call userLogin service function
        const accessToken = await userLogin({ email, password, user });
        
      // Update the user's isLoggedIn status to true
      await User.updateOne({ _id: user._id }, { isLoggedIn: true });

        //Success response
        res.status(200).json(Response({ statusCode: 200, message: 'Authentication successful', status: "OK", data: user, token: accessToken, }));

    } catch (error) {
     
        next(error)
    }
};
// resend otp
const resendOtp=async(req,res,next )=>{
    try {
        // Extract email from request body
        const { email } = req.body;
        
    
        // Validate email
        if (!email) {
        //   return res.status(400).json({ error: 'Email is required' });
          return res.status(400).json(Response({ message: 'Email is required',statusCode:400,status:"faield" }));

        }
    
        // Find user by email
        const user = await User.findOne({ email });
       
    
        // Check if user exists
        if (!user) {
          return res.status(404).json(Response({ message: 'User not found',statusCode:404,status:"faield" }));
        }
    
    if(user.oneTimeCode===null ){
       
   
       
    
        // Send verification email with new OTP
        const emailss=await sendActivationEmail(email,user.name,);
         // Update user's oneTimeCode
         user.oneTimeCode = emailss.oneTimeCode;
         // await user.save();
         // if(user.isVerified)
         const data =await user.save();
        console.log(emailss,"++++++++++++++++++++++")
    
        // Send success response
      return  res.status(200).json(Response({statusCode:200,status:'ok', message: 'OTP has been resent successfully',data:{user} }))
    }
        // bad response 
     return   res.status(400).json(Response({statusCode:400,status:'Failed', message: 'you alredy have otp please chaeck your email ' }));
    
      } catch (error) {
        next(error)

        
      }
}



// forget password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
       
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json(Response({ statusCode: 404, message: 'User not found', status: "Failed" }));
        }

        await forgotPasswordService(email, user);

        res.status(200).json(Response({ statusCode: 200, message: 'A verification code is sent to your email', status: "OK" }));

    } catch (error) {
        console.error(error);
        res.status(500).json(Response({ statusCode: 500, message: 'Internal server error', status: "Failed" }));
    }
};

// change your password after forget the password
const cahngePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        

        const user = await User.findOne({ email });
        
        if (!email) {
            return res.status(404).json(Response({ statusCode: 404, message: 'Email is required', status: "Failed" }));
        }
        if (!password) {
            return res.status(404).json(Response({ statusCode: 404, message: 'Password is required', status: "Failed" }));
        }

        if (!user) {
            return res.status(404).json(Response({ statusCode: 404, message: 'User not found', status: "Failed" }));
        }

        await changePasswordService({ user, password });

        res.status(200).json(Response({ statusCode: 200, message: 'Password changed successfully', status: "OK" }));

    } catch (error) {
        res.status(500).json(Response({ statusCode: 500, message: 'Internal server error', status: "Failed" }));
    }
};

const changePasswordUseingOldPassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
// console.log(oldPassword,newPassword)
    // Get the token from the request headers
  const tokenWithBearer = req.headers.authorization;
  let token;

  if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
      // Extract the token without the 'Bearer ' prefix
      token = tokenWithBearer.slice(7);
  }

  if (!token) {
      return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.',status:'faield' }));
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
     
       // Assuming user is authenticated and req.user contains user details
       
       // Extract old and new passwords from request body

       const user=await User.findById(decoded._id)
    //    console.log(user)


       if (!user) {
           return res.status(404).json(Response({ message: 'User not found.',statusCode:404,status:"failed" }));
       }
    //    console.log(user.password,oldPassword,newPassword)
       // // Check if old password matches the stored hashed password
       const passwordMatch = await bcrypt.compare(oldPassword, user.password);
       console.log(passwordMatch,"comapar")

       if (!passwordMatch) {
          return res.status(404).json(Response({ statusCode: 404, message: 'password incurrect.', status: 'success'}));
       }

       // // Hash the new password
       // const hashedNewPassword = await bcrypt.hash(newPassword, 10);
       // const hashedNewPassword = newPassword

       // console.log(hashedNewPassword)

       // // Update the user's password in the database
       user.password = newPassword;
       // console.log(hashedNewPassword,"hasssssss")

       // // Save the updated user object in the database
           await user.save()
       // Optionally, respond with success message
       res.status(200).json(Response({ statusCode: 200, message: 'Profile updated successfully.', status: 'success',data:user}));
   } catch (error) {
       // Pass error to the error handling middleware
     return  res.status(500).json(Response({status:"faield",message:error.message,statusCode:500}))
   }
};



// show the personal information with get request 
//----------------------#------------------------

const userInformation=async(req,res,next)=>{
    try {
          // Get the token from the request headers
  const tokenWithBearer = req.headers.authorization;
  let token;

  if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
      // Extract the token without the 'Bearer ' prefix
      token = tokenWithBearer.slice(7);
  }

  if (!token) {
      return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.',status:'faield' }));
  }

  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const user=await User.findById(decoded._id)

            res.status(200).json(Response({ statusCode: 200, message: 'user information  successfully showed.', status: 'success',data:user}));


        
    } catch (error) {
        return  res.status(500).json(Response({status:"faield",message:error.message,statusCode:500}))

    }
}
const userInformationOnDashBoard=async(req,res,next)=>{
    try {
          // Get the token from the request headers
  const tokenWithBearer = req.headers.authorization;
  let token;

  if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
      // Extract the token without the 'Bearer ' prefix
      token = tokenWithBearer.slice(7);
  }

  if (!token) {
      return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.',status:'faield' }));
  }

  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (decoded.role !== 'Admin') {
        return res.status(404).json(Response({ statusCode: 404, message: 'You are not authorized to access this resource.', status: 'failed' }));
    }
    const {id}=req.query

      const user=await User.findById(id)
      const licence={front:user.driverLicenceFront,
        back:user.driverLicenceback}


            res.status(200).json(Response({ statusCode: 200, message: 'user information  successfully showed.', status: 'success',data:licence}));


        
    } catch (error) {
        return  res.status(500).json(Response({status:"faield",message:error.message,statusCode:500}))

    }
}

// update the user profile 
//-----------#-----------

const updatedUserProfile=async(req,res,next)=>{
    // console.log(req.body)
    try {
        const {address,name,email,}=req.body
      const {profile}=req.files || {}
        // Get the token from the request headers
  const tokenWithBearer = req.headers.authorization;
  let token;

  if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
      // Extract the token without the 'Bearer ' prefix
      token = tokenWithBearer.slice(7);
  }

  if (!token) {
      return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.',status:'faield' }));
  }

  
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
    
//    console.log(name)
      const files = [];
      console.log(profile)

// Check if there are uploaded files
if (profile && Array.isArray(profile)) {
    profile.forEach((img) => {
        const publicFileUrl = `/images/users/${img.filename}`;
        files.push({
            publicFileUrl,
            path: img.filename,
        });
    });
}
// console.log(files)

      const user=await User.findById(decoded._id)

      user.address=address || user.address
      user.name=name || user.name
      user.email=email || user.email
   
      user.image=files.length > 0 ?files[0]: user.image
      
    const updateUser=  await user.save()

      res.status(200).json(Response({ statusCode: 200, message: 'user updated  successfully .', status: 'success',data:updateUser}));

        
    } catch (error) {
        return  res.status(500).json(Response({status:"faield",message:error.message,statusCode:500}))

        
    }
}

 const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ isDeleted: false }).select('-password');
      res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching users',
        error: error.message
      });
    }
  };


module.exports = { 
    getAllUsers,
    signUp,
     verifyCode,
     signIn,
     resendOtp ,
   
     forgotPassword,
     cahngePassword,
     changePasswordUseingOldPassword,

     userInformation,
     updatedUserProfile,
     userInformationOnDashBoard
    };
