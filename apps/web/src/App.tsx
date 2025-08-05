import React, { useEffect, useState } from 'react';

interface College {
  id: string;
  college_name: string;
  state: string;
  city: string;
}

const App: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/colleges')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Medical + Dental Admissions Intelligence Platform</h1>
      <ul className="space-y-4">
        {colleges.map((college) => (
          <li key={college.id} className="bg-white rounded shadow p-4">
            <div className="font-semibold text-lg">{college.college_name}</div>
            <div className="text-gray-600">{college.city}, {college.state}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;