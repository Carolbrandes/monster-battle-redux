import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { API_URL } from '../../constants/env';
import {
  Monster,
  Result,
  ResultBody,
} from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const generateResult = async (data: ResultBody) =>
  await fetch({
    method: 'POST',
    url: `${API_URL}/battle`,
    body: data,
  }).then((response) => response.json());

export const MonsterService = {
  getAll,
  generateResult,
};
