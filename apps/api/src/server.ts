import Fastify from 'fastify';
import cors from '@fastify/cors';
import { validateCollege } from '@validation';
import { promises as fs } from 'fs';
import path from 'path';

const server = Fastify({
  logger: true,
});

server.register(cors, { origin: true });

const DATA_PATH = path.join(__dirname, 'data', 'colleges.json');
let colleges: any[] = [];

async function loadColleges() {
  const data = await fs.readFile(DATA_PATH, 'utf-8');
  colleges = JSON.parse(data);
}

// Load colleges on server start
loadColleges();

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
  const allCourses = colleges.flatMap((c) => c.courses.map((course: any) => ({ ...course, college_id: c.id, college_name: c.college_name })));
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