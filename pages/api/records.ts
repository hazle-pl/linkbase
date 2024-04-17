// pages/api/records.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase, getDb } from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      await connectDatabase();
      const {
        title,
        year,
        director,
        type,
        source,
        thumbnail, // Assuming thumbnail is a URL to an image
        background, // Assuming background is a URL to an image
        season, // For series
        episode, // For series
      } = req.body;

      const db = getDb();
      await db.collection('records').insertOne({
        title,
        year,
        director,
        type,
        source,
        thumbnail,
        background,
        season,
        episode,
      });

      res.status(200).json({ message: 'Record added successfully' });
    } catch (error) {
      console.error('Error adding record:', error);
      res.status(500).json({ error: 'Error adding record' });
    }
  } else if (req.method === 'GET') {
    try {
      await connectDatabase();
      const db = getDb();
      const records = await db.collection('records').find().toArray();
      res.status(200).json(records);
    } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Error fetching records' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
