import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import connectDB from "@/lib/db";
import Anime from "@/lib/models/anime.model";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface IAnimeId {
  idAL: number | null;
  idMal: number | null;
  idAniDB: number | null;
  idZoro: string | null;
  idGogo: string | null;
  idGogoDub: string | null;
  from?: string | null;
}

interface FinalAnime {
  idAL: number | null;
  idMal: number | null;
  idAniDB: number | null;
  idZoro: string | null;
  idGogo: string | null;
  idGogoDub: string | null;
  title: {
    romaji?: string | null;
    english?: string | null;
    native?: string | null;
  };
  description: string;
  query: string;
  countryOfOrigin?: string;
  genres: string[];
  studios?: Node[];
  producers?: Node[];
  startDate?: string | null;
  endDate?: string | null;
  premiered?: string;
  type?: string;
  duration: string | number;
  averageScore: number;
  popularity?: number;
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color?: string;
  };
  bannerImage?: string;
  status: string | null;
  season?: string | null;
  isAdult: boolean;
  siteScore: number;
  episodesStats: {
    sub: number;
    dub: number;
    total: number;
  };
  trailer?:
    | {
        id: string;
        site: string;
      }[]
    | null;
  seasons?:
    | {
        id?: number | null;
        idMAL?: number | null;
        idZoro?: string | null;
        name: string;
        title: string;
        poster: string;
        isCurrent: boolean;
      }[]
    | null;
  related?: IAnimeId[];
  characters?: {
    idAL: number;
    character: {
      idAL: number;
      name: string;
      image: string;
      type: string;
    };
    voiceActor: {
      idAL: number;
      name: string;
      image: string;
      type: string;
    };
  }[];
  manga?: {
    idAL?: number;
    idMAL?: number;
    name: string;
    image?: string;
  } | null;
  source: "Anilist" | "MAL" | "Zoro" | "Gogo";
}

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Parse the request body
    const animeData: FinalAnime = await request.json();

    if (!animeData.description) {
      return NextResponse.json(
        { error: "Title and description are required." },
        { status: 400 }
      );
    }

    // Generate embedding vector for the description
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: `${animeData.description} ${animeData.title.english} ${animeData.title.romaji} ${animeData.title.native}`,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // Save anime info using Mongoose
    const anime = await Anime.create({
      ...animeData,
      vector: embedding,
    });

    return NextResponse.json(
      { success: true, animeId: anime._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin":
        "http://localhost:3000, https://vumeto.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
