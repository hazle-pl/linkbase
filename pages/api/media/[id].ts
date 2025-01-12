import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../lib/mongodb';
import Media from '../../../models/Media';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    const { id } = req.query;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID is required and must be a string' });
    }

    // Find the media by ID
    const media = await Media.findOne({ _id: id });
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Increment the popularity by 1
    media.popularity += 1;
    await media.save();  // Save the updated media

    // Return the updated media
    res.status(200).json(media);
  } catch (error) {
    console.error('Error fetching media by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
