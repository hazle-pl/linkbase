import React, { useEffect, useState } from 'react';

interface Video {
  _id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  director: string;
  type: string;
  source: string;
  thumbnail: string;
  background: string;
  season?: string;
  episode?: string;
}

const AdminPanel: React.FC = () => {
  const [records, setRecords] = useState<Video[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingRecord, setEditingRecord] = useState<Partial<Video>>({});

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch(`/api/records?id=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      } else {
        throw new Error('Failed to fetch records');
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleRemoveRecord = async (recordId: string) => {
    try {
      const response = await fetch(`/api/records?id=${recordId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchRecords();
      } else {
        throw new Error('Failed to remove record');
      }
    } catch (error) {
      console.error('Error removing record:', error);
    }
  };

  const handleEditRecord = (record: Video) => {
    setEditingRecord(record);
  };

  const handleSaveChanges = async () => {
    try {
      if (!editingRecord._id) return;

      const response = await fetch(`/api/records?id=${editingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingRecord),
      });

      if (response.ok) {
        fetchRecords();
        setEditingRecord({});
      } else {
        throw new Error('Failed to update record');
      }
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Video) => {
    const value = e.target.value;
    setEditingRecord(prevState => ({ ...prevState, [field]: value }));
  };

  const filteredRecords = records.filter(record =>
    record.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Year</th>
            <th>Director</th>
            <th>Type</th>
            <th>Source</th>
            <th>Thumbnail</th>
            <th>Background</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map(record => (
            <tr key={record._id}>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.title || ''}
                    onChange={e => handleInputChange(e, 'title')}
                  />
                ) : (
                  record.title
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.description || ''}
                    onChange={e => handleInputChange(e, 'description')}
                  />
                ) : (
                  record.description
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.category || ''}
                    onChange={e => handleInputChange(e, 'category')}
                  />
                ) : (
                  record.category
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.year || ''}
                    onChange={e => handleInputChange(e, 'year')}
                  />
                ) : (
                  record.year
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.director || ''}
                    onChange={e => handleInputChange(e, 'director')}
                  />
                ) : (
                  record.director
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.type || ''}
                    onChange={e => handleInputChange(e, 'type')}
                  />
                ) : (
                  record.type
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.source || ''}
                    onChange={e => handleInputChange(e, 'source')}
                  />
                ) : (
                  record.source
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.thumbnail || ''}
                    onChange={e => handleInputChange(e, 'thumbnail')}
                  />
                ) : (
                  <img src={record.thumbnail} alt="Thumbnail" />
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <input
                    value={editingRecord.background || ''}
                    onChange={e => handleInputChange(e, 'background')}
                  />
                ) : (
                  <img src={record.background} alt="Background" />
                )}
              </td>
              <td>
                {editingRecord._id === record._id ? (
                  <button onClick={handleSaveChanges}>Save</button>
                ) : (
                  <button onClick={() => handleEditRecord(record)}>Edit</button>
                )}
                <button onClick={() => handleRemoveRecord(record._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
