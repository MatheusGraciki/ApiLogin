
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type: 'string',
        required: true,
    },
    email:{
        type: 'string',
        required: true,
    },
    password:{
        type: 'string',
        required: true,
    },
    deviceToken:{
        type: 'string',
    }
},
{timestamps:true,}
);

UserSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
});
const UserModel = mongoose.model('User', UserSchema);

export {UserSchema,UserModel};
 


