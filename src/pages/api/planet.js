export async function GET({ url }) {
  const id = url.searchParams.get('id');

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiKey = process.env.SOLAR_API_KEY ?? import.meta.env.SOLAR_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const res = await fetch(
      `https://api.le-systeme-solaire.net/rest/bodies/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'application/json'
        }
      }
    );

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('API Error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
