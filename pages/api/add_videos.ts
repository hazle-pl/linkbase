// pages/api/records.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../utils/db';
import Video, { VideoModel } from '../../models/video';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDatabase();
      const {
        title,
        description,
        category,
        year,
        director,
        type,
        source,
        thumbnail,
        background,
        season,
        episode,
      } = req.body;

      const newRecord: VideoModel = new Video({
        title,
        description,
        category,
        year,
        director,
        type,
        source,
        thumbnail,
        background,
        season,
        episode,
      });

      await newRecord.save();

      res.status(200).json({ message: 'Record added successfully' });
    } catch (error) {
      console.error('Error adding record:', error);
      res.status(500).json({ error: 'Error adding record' });
    }
  }
}
