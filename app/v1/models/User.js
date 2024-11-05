const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], minlength: 3, maxlength: 30, },
    email: {
        type: String, required: [true, "Email is required"], minlength: 3, maxlength: 30, trim: true,
        unique: [true, 'Email should be unique'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
            },
            message: 'Please enter a valid Email'
        }
    },
    role: { type: String, required: true, enum: ["user", "admin","agency","driver"], default: "user" },
    password: {
        type: String,
        required: false,
      
      },
    phone: { type: String, required: false ,default:"0124544"},
    address:{type:String,required:false,default:null},
   
  
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    image: { type: Object, required: false, default: { publicFileUrl: "/images/users/user.png", path: "public\\images\\users\\user.png" } },
   
    oneTimeCode: { type: String, required: false, default: null },
},{ timestamps: true },
 {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
    },
},
    
);

userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };
  
  userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });
module.exports = mongoose.model('User', userSchema);