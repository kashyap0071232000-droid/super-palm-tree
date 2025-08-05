import React, { useEffect, useState } from 'react';
import CollegeDetail from './CollegeDetail';

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
  const [search, setSearch] = useState('');
  const [route, setRoute] = useState<{ page: 'list' | 'detail'; id?: string }>({ page: 'list' });

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/college/')) {
        const id = hash.replace('#/college/', '');
        setRoute({ page: 'detail', id });
      } else {
        setRoute({ page: 'list' });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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

  const filtered = colleges.filter((c) =>
    c.college_name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase())
  );

  if (route.page === 'detail' && route.id) {
    return <CollegeDetail id={route.id} />;
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Medical + Dental Admissions Intelligence Platform</h1>
      <input
        className="mb-6 p-2 border border-blue-300 rounded w-full max-w-md"
        type="text"
        placeholder="Search by college, city, or state..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ul className="space-y-4">
        {filtered.map((college) => (
          <li key={college.id} className="bg-white rounded shadow p-4">
            <a href={`#/college/${college.id}`} className="font-semibold text-lg text-blue-700 hover:underline">
              {college.college_name}
            </a>
            <div className="text-gray-600">{college.city}, {college.state}</div>
          </li>
        ))}
        {filtered.length === 0 && <li className="text-gray-500">No colleges found.</li>}
      </ul>
    </div>
  );
};

export default App;