import { connectDatabase } from '@/lib/mongodb';
import Media from '@/models/Media';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    const { query } = req.query;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required and must be a string' });
    }

    const media = await Media.find({
      title: { $regex: query, $options: 'i' },
    }).limit(10);

    res.status(200).json(media);
  } catch (error) {
    console.error('Error fetching media by query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
