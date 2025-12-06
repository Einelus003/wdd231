export async function fetchHopeData(url = './data/hope-data.json') {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Network error: ${res.status} ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error('data failed to load:', err);
    throw err;
  }
}
