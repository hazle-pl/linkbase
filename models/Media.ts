import mongoose, { Schema, model, Document } from 'mongoose';

interface IMedia extends Document {
  title: string;
  genre: string;
  coverImage: string;
  backgroundImage: string;
  trailer: string;
  description: string;
  videoLink: string;
  type: string;
  season?: number;
  episode?: number;
  popularity: number; // New field
}

const MediaSchema = new Schema<IMedia>({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  trailer: { type: String, required: true },
  videoLink: { type: String, required: true },
  coverImage: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  season: { type: Number },
  episode: { type: Number },
  popularity: { type: Number, default: 0 }, // Default to 0
});

export default mongoose.models.Media || model<IMedia>('Media', MediaSchema);
