import { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from '../../utils/db';
import Video, { VideoModel } from '../../models/video';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      await connectDatabase();
      const records = await Video.find();
      res.status(200).json(records);
    } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Error fetching records' });
    }
  } else if (req.method === 'PUT') {
    try {
      await connectDatabase();
      const {
        _id,
        ...updatedFields // Destructure only the updated fields
      } = req.body;

      const updatedRecord = await Video.findByIdAndUpdate(
        _id,
        updatedFields, // Use only the updated fields
        { new: true }
      );

      res.status(200).json({ message: 'Record updated successfully', record: updatedRecord });
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Error updating record' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await connectDatabase();
      const deletedRecord = await Video.findByIdAndDelete(id);
      if (!deletedRecord) {
        res.status(404).json({ error: 'Record not found' });
      } else {
        res.status(200).json({ message: 'Record deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting record:', error);
      res.status(500).json({ error: 'Error deleting record' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
