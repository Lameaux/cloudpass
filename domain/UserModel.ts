import mongoose from 'mongoose';
import UserDocument from '../types/UserDocument';

const userSchema = new mongoose.Schema(
  {
    email: String,
    passwordHash: String
  },
  {
    timestamps: true
  }
);

export default mongoose.models.User ||
  mongoose.model<UserDocument>('User', userSchema);
