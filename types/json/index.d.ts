declare module "*/data/idols.json" {
  interface Status {
    [key: string]: number;
    ボーカル: number;
    ダンス: number;
    ビジュアル: number;
    スタミナ: number;
  }
  interface Skill {
    type: string;
    name: string;
    effect: string[];
    スタミナ?: number;
    ct?: number;
    probability?: string;
  }

  interface Idol {
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
  }

  interface IdolData {
    idolDataJson: Idol[];
  }

  const value: IdolData;
  export = value;
}
