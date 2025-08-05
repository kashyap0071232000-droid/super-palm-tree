import Fastify from 'fastify';
import cors from '@fastify/cors';
import { validateCollege } from '@validation';

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
    courses: [
      {
        course_type: 'MBBS',
        specialization: 'General Medicine',
        duration_years: 5,
        total_seats: 100,
        seat_allocation: { aiq_seats: 15, state_quota_seats: 85, management_quota_seats: 0 },
        category_breakdown: { general: 50, sc: 15, st: 8, obc: 22, ews: 5 },
        fees_structure: { government_quota: { annual_fee: 1000, total_course_fee: 5000 } },
        academic_year: '2023-24'
      }
    ],
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
    courses: [
      {
        course_type: 'MBBS',
        specialization: 'General Medicine',
        duration_years: 5,
        total_seats: 250,
        seat_allocation: { aiq_seats: 38, state_quota_seats: 212, management_quota_seats: 0 },
        category_breakdown: { general: 120, sc: 38, st: 19, obc: 60, ews: 13 },
        fees_structure: { government_quota: { annual_fee: 2000, total_course_fee: 10000 } },
        academic_year: '2023-24'
      }
    ],
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
  return colleges.map((college) => {
    const result = validateCollege(college);
    if (result.success) {
      return college;
    } else {
      return { ...college, validationErrors: result.error.errors };
    }
  });
});

server.get('/api/colleges/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  const college = colleges.find((c) => c.id === id);
  if (!college) {
    reply.code(404);
    return { error: 'College not found' };
  }
  const result = validateCollege(college);
  if (result.success) {
    return college;
  } else {
    return { ...college, validationErrors: result.error.errors };
  }
});

server.get('/api/courses', async (request, reply) => {
  const allCourses = colleges.flatMap((c) => c.courses.map((course) => ({ ...course, college_id: c.id, college_name: c.college_name })));
  return allCourses;
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