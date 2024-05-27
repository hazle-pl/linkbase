import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../utils/db';
import Video, { VideoModel } from '../../models/video';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { category, title, limit, newest } = req.query;
    try {
      await connectDatabase();
      let query: any = {};

      if (title) {
        query.title = { $regex: title.toString(), $options: 'i' };
      } else if (category) {
        query.category = { $regex: category.toString(), $options: 'i' };
      }

      const queryLimit = limit ? parseInt(limit.toString(), 10) : 10;
      const sortOrder = newest === 'true' ? -1 : 1;

      const films = await Video.find(query).sort({ createdAt: sortOrder }).limit(queryLimit);
      res.status(200).json(films);

    } catch (error) {
      console.error('Error fetching films:', error);
      res.status(500).json({ error: 'Error fetching films' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
