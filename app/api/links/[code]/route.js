import prisma from '../../../../lib/prisma';

export async function GET(req, { params }) {
  const { code } = params;
  const link = await prisma.link.findUnique({ where: { code } });
  if (!link) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  return new Response(JSON.stringify(link), { status: 200 });
}

export async function DELETE(req, { params }) {
  const { code } = params;
  try {
    await prisma.link.delete({ where: { code } });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
}
