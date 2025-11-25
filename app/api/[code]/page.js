import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const code = params.code;
  try {
    const link = await prisma.link.update({
      where: { code },
      data: { clicks: { increment: 1 }, lastClicked: new Date() }
    });
    return NextResponse.redirect(link.url);
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
  }
}
