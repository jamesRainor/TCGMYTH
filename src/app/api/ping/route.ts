export const dynamic = 'force-dynamic'; // evita que lo prerenderice

export async function GET() {
  return new Response(
    JSON.stringify({ ok: true, now: new Date().toISOString() }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
}
