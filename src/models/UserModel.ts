
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  deviceToken: {
    type: 'string',
  },
},
{ timestamps: true },
);

// eslint-disable-next-line func-names
UserSchema.pre('save', async function(next) {
  const saltRounds = 10;

  // eslint-disable-next-line no-invalid-this
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const UserModel = mongoose.model('User', UserSchema);

export { UserSchema, UserModel };

