export interface Ad {
  id?: string;
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: Array<number>;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}
