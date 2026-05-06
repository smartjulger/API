export async function GET({ params }) {
  try {
    const apiKey = import.meta.env.SOLAR_API_KEY;

    // Build headers only when needed. The external API is public,
    // so don't send Authorization when no key is configured.
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/json'
    };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;

    const res = await fetch(
      `https://api.le-systeme-solaire.net/rest/bodies/${params.id}`,
      { headers }
    );

    const contentType = res.headers.get('content-type') || 'application/json';
    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: { 'Content-Type': contentType },
    });
  } catch (err) {
    console.error('API Error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
