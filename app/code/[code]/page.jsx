import prisma from '../../../lib/prisma';

export default async function Page({ params }) {
  const { code } = params;
  const link = await prisma.link.findUnique({ where: { code } });

  if (!link) {
    return <div style={{ padding: 24 }}>Not found</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Stats — {link.code}</h1>
      <p><strong>Target URL:</strong> <a href={link.url} target="_blank" rel="noreferrer">{link.url}</a></p>
      <p><strong>Total clicks:</strong> {link.clicks}</p>
      <p><strong>Last clicked:</strong> {link.lastClicked ? new Date(link.lastClicked).toString() : "Never"}</p>
      <p><strong>Created:</strong> {new Date(link.createdAt).toString()}</p>
      <p><a href="/">Back to dashboard</a></p>
    </div>
  );
}
