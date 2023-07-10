import { RootState } from '../../app/store';

export const selectMonsters = (state: RootState) => state.monsters.monsters;

export const result = (state: RootState) => state.monsters.result;

export const selectSelectedMonster = (state: RootState) =>
  state.monsters.selectedMonster;

export const selectedMonsterByPc = (state: RootState) =>
  state.monsters.selectedMonsterByPc;
