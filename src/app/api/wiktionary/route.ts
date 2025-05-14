export async function GET() {
  return new Response('Wrong directory. Did you mean to fetch from "/api/wiktionary/word"?', { status: 400 });
}