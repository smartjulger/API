export async function GET({ params }) {
  const res = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/${params.id}`,
    { headers: { Authorization: `Bearer ${import.meta.env.SOLAR_API_KEY}` } }
  );

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
