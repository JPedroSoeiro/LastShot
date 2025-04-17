export interface iTeam {
  id: number;
  nome: string;
  cidade: string;
  sigla: string;
  ano_fundacao: number;
  arena: string;
  titulos: {
    NBA: number;
    Conferencias: number;
    Divisoes: number;
  };
  principais_jogadores: string[];
}
