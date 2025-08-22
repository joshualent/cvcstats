export default async function getPlayerStats(player: string) {
  const response = await fetch(`/api/v1/${player}`);
  const data = await response.json();
  return data;
}
