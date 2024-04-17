// models/record.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface RecordModel extends Document {
  title: string;
  category: string;
  year: string;
  director: string;
  type: string;
  source: string;
  thumbnail: string;
  background: string;
  season?: string;
  episode?: string;
}

const recordSchema: Schema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: String, required: true },
  director: { type: String, required: true },
  type: { type: String, required: true },
  source: { type: String, required: true },
  thumbnail: { type: String, required: true },
  background: { type: String, required: true },
  season: { type: String },
  episode: { type: String },
});

// Define and export the model for the Record document
export default mongoose.models.Record || mongoose.model<RecordModel>('Record', recordSchema);
