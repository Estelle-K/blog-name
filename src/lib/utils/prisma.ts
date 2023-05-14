import { PrismaClient } from '@prisma/client';

// to remove logs of prisma, remove { log: ['query', 'info', 'warn', 'error'] }
const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

export default prisma;
