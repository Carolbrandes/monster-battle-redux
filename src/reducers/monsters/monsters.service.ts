import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { API_URL } from '../../constants/env';
import {
  Monster,
  Result,
  ResultBody,
} from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

const generateResult = async (data: ResultBody): Promise<Result> =>
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  }).then((response) => response.json());

export const MonsterService = {
  getAll,
  generateResult,
};
