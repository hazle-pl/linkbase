import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../utils/db';
import Video, { VideoModel } from '../../models/video';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { _id, category, title, limit, newest, random, all, type } = req.query;
    try {
      await connectDatabase();
      let query: any = {};

      if (all === 'true') {
        query = {};
      } else {
        if (_id) {
          query._id = _id;
        } else if (title) {
          query.title = { $regex: title.toString(), $options: 'i' };
        } else if (category) {
          query.category = { $regex: category.toString(), $options: 'i' };
        }
      }

      if (type === 'movies') {
        query.type = 'movie';
      } else if (type === 'series') {
        query.type = 'series';
      }

      const queryLimit = limit ? parseInt(limit.toString(), 10) : 10;
      const sortOrder = newest === 'true' ? -1 : 1;

      let films;
      if (random === 'true') {
        const count = await Video.countDocuments(query);
        const randomIndex = Math.floor(Math.random() * count);
        films = await Video.find(query).skip(randomIndex).limit(queryLimit);
      } else {
        films = await Video.find(query).sort({ createdAt: sortOrder }).limit(all === 'true' ? 0 : queryLimit); // No limit if fetching all
      }

      res.status(200).json(films);

    } catch (error) {
      console.error('Error fetching films:', error);
      res.status(500).json({ error: 'Error fetching films' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
