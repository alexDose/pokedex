export type PokemonType = {
  id: number;
  name: string;
  url?: string;
  height?: number;
  weight?: number;
  experience?: number;
  type?: string;
  effectEntries?: InfoType[];
  nameStr?: string;
};
export type PokemonStatsType = {
  id: number;
  name: string;
  height: number;
  weight: number;
  experience: number;
  type: string;
};
export type InfoType = {
  effect: string;
  language: {
    name: string;
    url: string;
  };
  short_effect: string;
};
export type PokemonInfoType = {
  id: number;
  effectEntries: InfoType[];
  nameStr: string;
};
