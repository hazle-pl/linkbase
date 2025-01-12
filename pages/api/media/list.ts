import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../lib/mongodb';
import Media from '../../../models/Media';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    const { genre, type, page = '1', limit = '10' } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    const filter: Record<string, any> = {};
    if (genre) {
      filter.genre = genre;
    }
    if (type && type !== 'all') {
      filter.type = type;
    }

    // Liczba wszystkich elementów
    const totalItems = await Media.countDocuments(filter);

    // Pobieranie mediów z paginacją
    const mediaItems = await Media.find(filter)
      .sort({ popularity: -1 })
      .skip((pageNumber - 1) * limitNumber) // Pomijamy elementy w zależności od strony
      .limit(limitNumber);

    // Obliczanie liczby stron
    const totalPages = Math.ceil(totalItems / limitNumber);

    res.status(200).json({
      media: mediaItems,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems,
      },
    });
  } catch (error) {
    console.error('Error fetching media list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
