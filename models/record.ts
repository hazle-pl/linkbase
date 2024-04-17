// models/record.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface RecordModel extends Document {
  title: string;
  year: number;
  director: string;
  type: string;
  source: string;
  thumbnail: string;
  background: string;
  season?: number;
  episode?: number;
}

const recordSchema: Schema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  type: { type: String, required: true },
  source: { type: String, required: true },
  thumbnail: { type: String, required: true },
  background: { type: String, required: true },
  season: { type: Number },
  episode: { type: Number },
});

export default mongoose.model<RecordModel>('Record', recordSchema);
