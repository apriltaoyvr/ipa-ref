export async function GET() {
  return new Response('Missing word in route (e.g. /api/wiktionary/example)', { status: 400 });
}