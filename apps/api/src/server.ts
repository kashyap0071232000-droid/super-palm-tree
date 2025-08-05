import Fastify from 'fastify';
import cors from '@fastify/cors';

const server = Fastify({
  logger: true,
});

server.register(cors, { origin: true });

const colleges = [
  {
    id: '1',
    college_name: 'All India Institute of Medical Sciences',
    state: 'Delhi',
    city: 'New Delhi',
    college_type: 'medical',
    management_type: 'Government',
    university_affiliation: 'AIIMS',
    establishment_year: '1956-57',
    recognition_status: 'Active',
    recognition_details: 'Recognized by NMC',
    accreditation: {},
    bond_policy: { required: false },
    contact_info: { address: 'Ansari Nagar, New Delhi' },
    courses: [],
    last_updated: new Date().toISOString(),
    data_source: 'NMC',
    validation_status: 'validated',
    quality_score: 100
  },
  {
    id: '2',
    college_name: 'Maulana Azad Medical College',
    state: 'Delhi',
    city: 'New Delhi',
    college_type: 'medical',
    management_type: 'Government',
    university_affiliation: 'University of Delhi',
    establishment_year: '1959-60',
    recognition_status: 'Active',
    recognition_details: 'Recognized by NMC',
    accreditation: {},
    bond_policy: { required: true, duration_years: 1, amount: 500000 },
    contact_info: { address: 'Bahadur Shah Zafar Marg, New Delhi' },
    courses: [],
    last_updated: new Date().toISOString(),
    data_source: 'NMC',
    validation_status: 'validated',
    quality_score: 98
  }
];

server.get('/api/health', async (request, reply) => {
  return { status: 'ok' };
});

server.get('/api/colleges', async (request, reply) => {
  return colleges;
});

const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
    console.log('API server running on http://localhost:3001');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();