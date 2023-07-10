import { createReducer } from '@reduxjs/toolkit';
import { Monster, Result } from '../../models/interfaces/monster.interface';
import {
  fetchMonstersData,
  setSelectedMonster,
  setSelectedMonsterByPc,
  fetchMonstersResult,
} from './monsters.actions';

interface MonsterState {
  monsters: Monster[];
  selectedMonster: Monster | null;
  selectedMonsterByPc: Monster | null;
  result: Result | null;
}

const initialState: MonsterState = {
  monsters: [],
  selectedMonster: null,
  selectedMonsterByPc: null,
  result: null,
};

export const monstersReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchMonstersData.pending, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.rejected, (state) => ({
    ...state,
    monsters: [],
  }));

  builder.addCase(fetchMonstersData.fulfilled, (state, action) => ({
    ...state,
    monsters: action.payload,
  }));

  builder.addCase(fetchMonstersResult.pending, (state) => ({
    ...state,
    result: null,
  }));

  builder.addCase(fetchMonstersResult.rejected, (state) => ({
    ...state,
    result: null,
  }));

  builder.addCase(fetchMonstersResult.fulfilled, (state, action) => ({
    ...state,
    result: action.payload,
  }));

  builder.addCase(setSelectedMonster, (state, action) => ({
    ...state,
    selectedMonster: action.payload,
  }));

  builder.addCase(setSelectedMonsterByPc, (state, action) => ({
    ...state,
    selectedMonsterByPc: action.payload,
  }));
});
