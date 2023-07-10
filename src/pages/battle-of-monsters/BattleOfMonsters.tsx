import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { MonsterBattleCard } from '../../components/monster-battle-card/MonsterBattleCard';
import { MonstersList } from '../../components/monsters-list/MonstersList';
import { Title } from '../../components/title/Title';
import {
  fetchMonstersData,
  fetchMonstersResult,
  setSelectedMonster,
  setSelectedMonsterByPc,
} from '../../reducers/monsters/monsters.actions';
import {
  selectMonsters,
  selectSelectedMonster,
  selectedMonsterByPc,
  result,
} from '../../reducers/monsters/monsters.selectors';
import {
  BattleSection,
  PageContainer,
  StartBattleButton,
} from './BattleOfMonsters.styled';
import { ModalResult } from '../../components/ModalResult/ModalResult';

const BattleOfMonsters = () => {
  const [openModalResult, setOpenModalResult] = useState(false);
  const dispatch = useAppDispatch();

  const monsters = useSelector(selectMonsters);
  const selectedMonster = useSelector(selectSelectedMonster);
  const selectedMonsterPc = useSelector(selectedMonsterByPc);
  const battleresult = useSelector(result);

  useEffect(() => {
    console.log('battleresult =>', battleresult);
  }, [battleresult]);

  useEffect(() => {
    dispatch(fetchMonstersData());
  }, []);

  const handleStartBattleClick = async () => {
    if (selectedMonster?.id && selectedMonsterPc?.id) {
      await dispatch(
        fetchMonstersResult({
          monster1Id: selectedMonster?.id,
          monster2Id: selectedMonsterPc?.id,
        }),
      );

      setOpenModalResult(true);
    }
  };

  const handleClose = () => {
    setOpenModalResult(false);
    dispatch(setSelectedMonster(null));
    dispatch(setSelectedMonsterByPc(null));
  };

  return (
    <PageContainer>
      <Title>Battle of Monsters</Title>

      <MonstersList monsters={monsters} />

      <BattleSection>
        <MonsterBattleCard
          title={selectedMonster?.name || 'Player'}></MonsterBattleCard>
        <StartBattleButton
          data-testid="start-battle-button"
          disabled={selectedMonster === null}
          onClick={handleStartBattleClick}>
          Start Battle
        </StartBattleButton>
        <MonsterBattleCard
          title={selectedMonsterPc?.name || 'Computer'}></MonsterBattleCard>
      </BattleSection>

      <ModalResult
        open={openModalResult}
        handleClose={handleClose}
        battleresult={battleresult ? battleresult : null}
      />
    </PageContainer>
  );
};

export { BattleOfMonsters };
