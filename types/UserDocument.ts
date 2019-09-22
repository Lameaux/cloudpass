import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  email: string;
  passwordHash: string;
}

export default UserDocument;
