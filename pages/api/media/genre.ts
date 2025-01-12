import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../lib/mongodb';
import Media from '../../../models/Media';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    const { genre, type, limit } = req.query;

    const filter: { genre?: string; type?: string; season?: number; episode?: number } = {};

    // Filtracja według gatunku
    if (genre && typeof genre === 'string') filter.genre = genre;

    // Filtracja według typu (serial lub film)
    if (type && type !== 'all' && typeof type === 'string') {
      filter.type = type;
    }

    // Filtracja sezonu i odcinka tylko dla seriali
    if (filter.type === 'serie') {
      filter.season = 0;  // Sezon 0
      filter.episode = 0; // Odcinek 0
    }

    const limitNumber = limit && typeof limit === 'string' ? parseInt(limit, 10) : 10;

    // Pobierz dane z bazy z ograniczeniem liczby wyników
    const media = await Media.find(filter).limit(limitNumber);

    // Logowanie wyników (do debugowania)
    console.log('Fetched media:', media);

    res.status(200).json(media);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
