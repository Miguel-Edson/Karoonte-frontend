// lib/questions.ts

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number; // 0, 1, 2 ou 3 (representando a posição no array de opções)
}

export const greekMythologyQuestions: Question[] = [
  {
    id: 1,
    text: "Quem é o deus dos deuses, dos raios e do trovão na mitologia grega?",
    options: ["Poseidon", "Apolo", "Zeus", "Hades"],
    correctAnswerIndex: 2,
  },
  {
    id: 2,
    text: "Qual destas deusas é conhecida como a deusa da sabedoria e da guerra estratégica?",
    options: ["Afrodite", "Atena", "Hera", "Ártemis"],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    text: "Quem era o deus grego do submundo e dos mortos?",
    options: ["Ares", "Hermes", "Hefesto", "Hades"],
    correctAnswerIndex: 3,
  },
  {
    id: 4,
    text: "Qual o nome do herói que realizou os famosos '12 Trabalhos'?",
    options: ["Aquiles", "Perseu", "Hércules (Héracles)", "Teseu"],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    text: "Quem era a górgona cujo olhar transformava as pessoas em pedra?",
    options: ["Quimera", "Medusa", "Hidra", "Esfinge"],
    correctAnswerIndex: 1,
  },
  {
    id: 6,
    text: "Qual criatura mítica era metade homem e metade touro?",
    options: ["Centauro", "Minotauro", "Sátiro", "Ciclope"],
    correctAnswerIndex: 1,
  },
  {
    id: 7,
    text: "Quem era o deus dos mares e dos terremotos, que carregava um tridente?",
    options: ["Poseidon", "Zeus", "Ares", "Apolo"],
    correctAnswerIndex: 0,
  },
  {
    id: 8,
    text: "Qual era a única parte vulnerável do corpo do herói Aquiles?",
    options: ["O pescoço", "Os olhos", "O calcanhar", "O peito"],
    correctAnswerIndex: 2,
  },
  {
    id: 9,
    text: "Quem abriu a caixa (ou jarra) que liberou todos os males do mundo?",
    options: ["Helena", "Medéia", "Andrômeda", "Pandora"],
    correctAnswerIndex: 3,
  },
  {
    id: 10,
    text: "Qual o nome do cavalo alado que nasceu do sangue da Medusa?",
    options: ["Pégaso", "Bucéfalo", "Arion", "Hipocampo"],
    correctAnswerIndex: 0,
  },
  {
    id: 11,
    text: "Quem era o deus mensageiro, que possuía asas nos pés?",
    options: ["Eros", "Apolo", "Hermes", "Dionísio"],
    correctAnswerIndex: 2,
  },
  {
    id: 12,
    text: "Qual deusa nasceu da espuma do mar e é a deusa do amor e da beleza?",
    options: ["Héstia", "Deméter", "Hera", "Afrodite"],
    correctAnswerIndex: 3,
  },
  {
    id: 13,
    text: "Quem era o cão de três cabeças que guardava os portões do submundo?",
    options: ["Ortros", "Cérbero", "Argos", "Licaão"],
    correctAnswerIndex: 1,
  },
  {
    id: 14,
    text: "Quem voou perto demais do sol com asas feitas de cera e penas?",
    options: ["Dédalo", "Ícaro", "Orfeu", "Tântalo"],
    correctAnswerIndex: 1,
  },
  {
    id: 15,
    text: "Qual era o alimento dos deuses gregos, que lhes concedia imortalidade?",
    options: ["Néctar e Ambrosia", "Maçãs de Ouro", "Vinho e Pão", "Mel e Romã"],
    correctAnswerIndex: 0,
  },
  {
    id: 16,
    text: "Quem era o ferreiro dos deuses, deus do fogo e da metalurgia?",
    options: ["Ares", "Cronos", "Hefesto", "Urano"],
    correctAnswerIndex: 2,
  },
  {
    id: 17,
    text: "Qual animal era o símbolo principal da deusa Atena?",
    options: ["A águia", "A coruja", "O pavão", "A pomba"],
    correctAnswerIndex: 1,
  },
  {
    id: 18,
    text: "Qual deusa era a rainha do submundo, após ser raptada por Hades?",
    options: ["Perséfone", "Deméter", "Hécate", "Nêmesis"],
    correctAnswerIndex: 0,
  },
  {
    id: 19,
    text: "Na Guerra de Tróia, qual estratagema os gregos usaram para invadir a cidade?",
    options: ["Catapultas", "Um Cavalo de Madeira", "Túneis subterrâneos", "Fogo Grego"],
    correctAnswerIndex: 1,
  },
  {
    id: 20,
    text: "Quem era o titã que carregava o céu e o mundo nos ombros?",
    options: ["Prometeu", "Oceano", "Atlas", "Hipérion"],
    correctAnswerIndex: 2,
  },
];