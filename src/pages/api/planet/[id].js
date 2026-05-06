export async function GET({ params }) {
  const res = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/${params.id}`
  );

  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
