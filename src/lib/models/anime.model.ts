import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    idAL: { type: Number, default: null },
    idMal: { type: Number, default: null },
    idAniDB: { type: Number, default: null },
    idZoro: { type: String, default: null },
    idGogo: { type: String, default: null },
    idGogoDub: { type: String, default: null },
    title: {
      romaji: { type: String, default: null },
      english: { type: String, default: null },
      native: { type: String, default: null },
    },
    description: { type: String, default: null },
    vector: { type: [Number], required: true },
    query: { type: String, default: null },
    countryOfOrigin: { type: String },
    genres: { type: [String] },
    studios: [
      {
        id: { type: Number },
        name: { type: String },
      },
    ],
    producers: [
      {
        id: { type: Number },
        name: { type: String },
      },
    ],
    startDate: { type: String, default: null },
    endDate: { type: String, default: null },
    premiered: { type: String, default: null },
    type: { type: String, default: null },
    duration: { type: Number, default: null },
    averageScore: { type: Number, default: 0 },
    popularity: { type: Number, default: 0 },
    coverImage: {
      extraLarge: { type: String },
      large: { type: String },
      medium: { type: String },
      color: { type: String },
    },
    bannerImage: { type: String, default: null },
    status: { type: String, default: null },
    season: { type: String, default: null },
    isAdult: { type: Boolean, default: false },
    siteScore: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    watched: { type: Number, default: 0 },
    episodesStats: {
      sub: { type: Number },
      dub: { type: Number },
      raw: { type: Number },
      total: { type: Number, default: 0 },
    },
    trailer: [
      {
        id: { type: String },
        site: { type: String },
      },
    ],
    seasons: [
      {
        id: { type: Number },
        idMAL: { type: Number },
        idZoro: { type: String },
        name: { type: String },
        title: { type: String },
        poster: { type: String },
        isCurrent: { type: Boolean },
      },
    ],
    related: [
      {
        id: { type: Number },
        source: { type: String },
      },
    ],
    characters: [
      {
        idAL: { type: Number },
        character: {
          idAL: { type: Number },
          name: { type: String },
          image: { type: String },
          type: { type: String },
        },
        voiceActor: {
          idAL: { type: Number },
          name: { type: String },
          image: { type: String },
          type: { type: String },
        },
      },
    ],
    manga: {
      idAL: { type: Number },
      idMAL: { type: Number },
      name: { type: String },
      image: { type: String },
    },
    source: {
      type: String,
      enum: ["Anilist", "MAL", "Zoro", "Gogo"],
    },
  },
  { timestamps: true }
);

animeSchema.index({ idAL: 1 });
animeSchema.index({ idMal: 1 });
animeSchema.index({ idAniDB: 1 });
animeSchema.index({ idZoro: 1 });
animeSchema.index({ idGogo: 1 });
animeSchema.index({ idGogoDub: 1 });
animeSchema.index({
  query: "text",
  popularity: -1,
  watched: -1,
  likes: -1,
  season: 1,
  // genres: 1,
});
animeSchema.index({ genres: 1, popularity: -1 });
animeSchema.index({ season: 1, popularity: -1 });
animeSchema.index({ popularity: -1 });

const Anime = mongoose.models?.Anime || mongoose.model("Anime", animeSchema);
export default Anime;
