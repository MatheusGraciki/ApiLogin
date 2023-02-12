
import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    email:{
        type: 'string',
        required: true,
    },
    password:{
        type: 'string',
        required: true,
    },
},
{timestamps:true,}
);

const User = mongoose.model('User', UserSchema);

export {UserSchema,User};
 


