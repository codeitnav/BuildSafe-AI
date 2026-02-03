export const API_BASE_URL = "http://localhost:8000";

export async function checkBackend() {
  const res = await fetch(`${API_BASE_URL}/api/health`);
  return res.json();
}
