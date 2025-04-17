export interface iPlayer {
  id: number;
  name: string;
  age: number;
  position: string;
  team: string;
  image?: string;
  careerStats: {
    PPG: number;
    RPG: number;
    APG: number;
    SPG: number;
    BPG: number;
    FG: number;
    FG3: number;
    FT: number;
  };
}
