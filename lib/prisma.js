import { PrismaClient } from "@prisma/client";
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;
export default prisma;
const globalForPrisma = globalThis;

if (!globalForPrisma.__prisma) {
  globalForPrisma.__prisma = new PrismaClient();
}

const prisma = globalForPrisma.__prisma;

export default prisma;
