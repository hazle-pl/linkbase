import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../lib/mongodb';
import Media from '../../../models/Media';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    // Losowe pobranie jednego filmu z bazy
    const randomMedia = await Media.aggregate([{ $sample: { size: 1 } }]);
    if (randomMedia.length === 0) {
      return res.status(404).json({ error: 'No media found' });
    }

    res.status(200).json(randomMedia[0]);
  } catch (error) {
    console.error('Error fetching random media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
