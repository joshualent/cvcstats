import { useState } from "react";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [username, setUsername] = useState("");
  const [lastSearchedUsername, setLastSearchedUsername] = useState("");
  const api_url =
    "https://cvcstats-api-933711537f94.herokuapp.com/api/v1/allstats/players/";

  const cvc_stats = stats?.player?.stats?.MCGO;

  async function fetchStats(username) {
    if (!lastSearchedUsername) {
      setLastSearchedUsername(username);
    }
    if (username.toLowerCase() !== lastSearchedUsername.toLowerCase()) {
      console.log("don't make request!");
    }
    const statsRes = await fetch(`${api_url}${username}`);
    const statsJson = await statsRes.json();
    setStats(statsJson);
    setLoading(false);
    console.log(statsJson);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      fetchStats(username.trim());
    }
  }

  return (
    <>
      <h1 className="text-center py-8 text-4xl font-semibold font-mono">
        <span className="text-blue-900">C</span>
        <span className="text-3xl mx-0.5">V</span>
        <span className="text-red-900">C</span> Stats
      </h1>
      <section className="border-2  border-slate-300 bg-slate-50 w-xl self-center px-5 py-8 m-auto rounded-lg mb-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Player Username</label>
          <input
            type="text"
            id="username"
            className="border border-slate-400 rounded-sm ml-2 p-0.5 pl-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="block text-white bg-blue-600 rounded-md px-2 py-1 mt-1 hover:bg-blue-500"
            type="submit"
          >
            Submit
          </button>
        </form>
      </section>
      <section className="border-2  border-slate-300 bg-slate-50 w-xl self-center px-5 py-8 m-auto rounded-lg">
        {!lastSearchedUsername ? (
          <p>Search for a player above</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : cvc_stats ? (
          <div>
            <p className="text-lg">Stats for {lastSearchedUsername}</p>
            <p>k/d: {cvc_stats.kills / cvc_stats.deaths}</p>
            <p>Kills: {cvc_stats.kills}</p>
            <p>deaths: {cvc_stats.deaths}</p>
            <p>total wins: {cvc_stats.game_wins}</p>
            <p>
              win rate:{" "}
              {(100 * cvc_stats.game_wins) / cvc_stats.game_plays + "%"}
            </p>
            <p>level: {cvc_stats.level}</p>
            <p>assists: {cvc_stats.assists}</p>
            <p>total games played: {cvc_stats.game_plays}</p>
            <details>
              <summary className="text-slate-700 mt-1">more stats...</summary>
              <div>
                <p>round wins: {cvc_stats.round_wins}</p>
                <p>knife kills: {cvc_stats.knife_kills}</p>
              </div>
            </details>
          </div>
        ) : (
          <p>No stats found</p>
        )}
      </section>
    </>
  );
}
