import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../../../lib/mongodb';
import Media from '../../../../models/Media';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDatabase();

    const { title } = req.query;  // Przeszukiwanie po tytule serialu

    if (!title) {
      return res.status(400).json({ error: 'Missing title' });
    }

    // Pobieranie wszystkich mediów, które są serialami
    const media = await Media.find({ title, type: 'serie' }).sort({ season: 1, episode: 1 });

    if (media.length === 0) {
      return res.status(404).json({ error: 'Series not found' });
    }

    // Grupowanie odcinków według sezonów
    const groupedEpisodes = media.reduce((acc, item) => {
      if (item.season === 0 && item.episode === 0) {
        // Główny odcinek (sezon 0, odcinek 0)
        acc.mainEpisode = item;
      } else {
        // Pozostałe odcinki w odpowiednich sezonach
        if (!acc.seasons[item.season]) {
          acc.seasons[item.season] = [];
        }
        acc.seasons[item.season].push(item);
      }
      return acc;
    }, { mainEpisode: null, seasons: {} });

    res.status(200).json(groupedEpisodes);
  } catch (error) {
    console.error('Error fetching media:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
