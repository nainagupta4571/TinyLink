import prisma from '../../../lib/prisma';

export async function GET() {
  const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } });
  return new Response(JSON.stringify(links), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { url, code } = body;

    if (!url || !code) {
      return new Response(JSON.stringify({ error: 'url and code required' }), { status: 400 });
    }

    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      return new Response(JSON.stringify({ error: 'invalid code format' }), { status: 400 });
    }

    const exists = await prisma.link.findUnique({ where: { code } });
    if (exists) {
      return new Response(JSON.stringify({ error: 'code exists' }), { status: 409 });
    }

    const link = await prisma.link.create({ data: { code, url } });
    return new Response(JSON.stringify(link), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
