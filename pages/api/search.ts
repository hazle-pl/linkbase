// pages/api/search.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../utils/db';
import Video, { VideoModel } from '../../models/video';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { title } = req.query;
    try {
      await connectDatabase();
      let query = {};
      if (title) {
        query = { title: { $regex: title.toString(), $options: 'i' } }; // Case-insensitive search
      }
      const films = await Video.find(query);
      res.status(200).json(films);
    } catch (error) {
      console.error('Error fetching films:', error);
      res.status(500).json({ error: 'Error fetching films' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
