import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        firstName: {
            type: String, 
            trim: true, 
            required: true,
            lowercase: true,
        },
        lastName:{
            type: String, 
            trim: true, 
            required: true,
            lowercase: true,
            minLength: 3,
        },
        email: {
            type: String, 
            trim: true, 
            required: true,
            lowercase: true,
            unique: true,
        },
        password:{
            type: String, 
            required: true, 
            minLength: 6, 
            validate: {
                validator: function(v) {
                  return (v=="123456" || v=="000000")?false:true;
                },
                message: v => `${v} es una clave demasiado simple...!!!`
              },
        }, 
        role:{
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true,
        // collection: "usuarios2021",
        // strict: false,
    }
)

export const userModel=mongoose.model("user", userSchema)

// userModel.find()
