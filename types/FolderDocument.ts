import mongoose from 'mongoose';

export interface FolderDocument extends mongoose.Document {
  name: string;
}
