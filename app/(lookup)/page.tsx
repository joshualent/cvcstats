"use client";
import { useEffect, useState } from "react";
import getPlayerStats from "../../lib/getPlayerStats";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function App() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchedUsername, setSearchedUsername] = useState("");

  // Initialize searchedUsername from the URL params on component
  useEffect(() => {
    const urlUsername = searchParams.get("q");
    if (urlUsername) {
      setSearchedUsername(urlUsername);
    }
  }, [searchParams]);

  const { isLoading, data } = useQuery({
    queryKey: ["playerStats", searchedUsername],
    queryFn: () => getPlayerStats(searchedUsername),
    enabled: !!searchedUsername,
    staleTime: 5 * 60 * 1000,
  });

  const cvc_stats = data?.player?.stats?.MCGO;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username") as string;
    if (typeof username === "string" && username.trim()) {
      const trimmedUsername = username.trim();
      setSearchedUsername(trimmedUsername);
      router.push(`?q=${encodeURIComponent(trimmedUsername)}`);
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
            name="username"
            className="border border-slate-400 rounded-sm ml-2 p-0.5 pl-1"
            defaultValue={searchParams.get("q") || ""}
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
        {!searchedUsername ? (
          <p>Search for a player above</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : cvc_stats ? (
          <div>
            <p className="text-lg">
              Stats for{" "}
              <span className="font-mono text-xl">
                {data.player.displayname}
              </span>
            </p>
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
