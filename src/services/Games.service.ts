import { api } from './axios';
import { Ad } from '../models/Ads';
import { Game } from '../models/Games';

export const gamesServices = {
  getGames() {
    return api.get<Game[]>('/games').then((response) => response.data);
  },

  createAnAd(data: Ad) {
    return api
      .post<Ad>(`/games/${data.gameId}/ads`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data);
  },
};
