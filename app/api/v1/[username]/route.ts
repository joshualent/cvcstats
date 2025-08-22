import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: any } }
) {
  try {
    const username = (await params).username;
    const mojang_response = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`
    );
    if (!mojang_response.ok) {
      return NextResponse.json(
        { success: false, stats: null },
        { status: 404 }
      );
    }
    const id = (await mojang_response.json()).id;
    const hypixel_response = await fetch(
      `https://api.hypixel.net/v2/player?uuid=${id}`,
      { headers: { "API-Key": process.env.HYPIXEL_API_KEY } }
    );
    if (!hypixel_response.ok) {
      return Response.json({ success: false, stats: null }, { status: 404 });
    }
    const hypixel_data = await hypixel_response.json();
    if (!hypixel_data?.player?.stats?.MCGO) {
      return Response.json({ success: false, stats: null }, { status: 404 });
    }
    return NextResponse.json(hypixel_data);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Could not find player stats" },
      { status: 502 }
    );
  }
}
