import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  Monster,
  Result,
  ResultBody,
} from '../../models/interfaces/monster.interface';
import { MonsterService } from './monsters.service';

export const fetchMonstersData = createAsyncThunk<Monster[]>(
  'monsters/fetchMonstersData',
  MonsterService.getAll,
);

export const fetchMonstersResult = createAsyncThunk<any, any>(
  'monsters/fetchMonstersResult',
  (data: ResultBody) => MonsterService.generateResult(data),
);

export const setSelectedMonster = createAction<Monster | null>(
  'monsters/setSelectedMonster',
);

export const setSelectedMonsterByPc = createAction<Monster | null>(
  'monsters/setSelectedMonsterByPc',
);
