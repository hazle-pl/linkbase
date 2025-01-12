import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../lib/mongodb';
import Media from '../../../models/Media';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    const { title, genre, trailer, coverImage, backgroundImage, videoLink, description, type, season, episode } = req.body;

    if (!title || !genre || !coverImage || !backgroundImage || !videoLink || !description || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (type === 'serie' && (season === undefined || episode === undefined)) {
      return res.status(400).json({ error: 'Season and episode are required for series' });
    }

    const newMedia = new Media({
      title,
      genre,
      coverImage,
      backgroundImage,
      trailer,
      videoLink,
      description,
      popularity: 0,
      type,
      season: type === 'serie' ? season : undefined,
      episode: type === 'serie' ? episode : undefined,
    });

    const savedMedia = await newMedia.save();
    res.status(201).json(savedMedia);
  } catch (error) {
    console.error('Error adding media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
