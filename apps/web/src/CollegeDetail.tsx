import React, { useEffect, useState } from 'react';

interface College {
  id: string;
  college_name: string;
  state: string;
  city: string;
  management_type: string;
  university_affiliation: string;
  establishment_year: string;
  recognition_status: string;
  recognition_details: string;
  contact_info: { address: string };
}

const CollegeDetail: React.FC<{ id: string }> = ({ id }) => {
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/colleges/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setCollege(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>;
  if (!college) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">{college.college_name}</h2>
      <div className="mb-2 text-gray-700">{college.city}, {college.state}</div>
      <div className="mb-2">Management: <span className="font-semibold">{college.management_type}</span></div>
      <div className="mb-2">Affiliation: <span className="font-semibold">{college.university_affiliation}</span></div>
      <div className="mb-2">Established: <span className="font-semibold">{college.establishment_year}</span></div>
      <div className="mb-2">Recognition: <span className="font-semibold">{college.recognition_status}</span> ({college.recognition_details})</div>
      <div className="mb-2">Address: <span className="font-semibold">{college.contact_info.address}</span></div>
      <a href="#/" className="text-blue-600 hover:underline">&larr; Back to list</a>
    </div>
  );
};

export default CollegeDetail;