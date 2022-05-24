export type Status = {
  [key: string]: number;
  ボーカル: number;
  ダンス: number;
  ビジュアル: number;
  スタミナ: number;
};
export type Skill = {
  type: string;
  name: string;
  effect: string[];
  スタミナ?: number;
  ct?: number;
  probability?: string;
};

export type Idol = {
  character: string;
  name: string;
  cardType: string;
  image: string;
  speciality: string;
  type: string;
  rarelity: number;
  status: Status;
  yell?: string;
  skills: Skill[];
};
