import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Monster } from '../../models/interfaces/monster.interface';
import {
  setSelectedMonster,
  setSelectedMonsterByPc,
} from '../../reducers/monsters/monsters.actions';
import {
  Image,
  ListTitle,
  MonsterCard,
  MonsterName,
  MonstersSection,
} from './MonstersList.styled';

type MonstersListProps = {
  monsters: Monster[];
};

const MonstersList: React.FC<MonstersListProps> = ({ monsters }) => {
  const dispatch = useAppDispatch();

  const [selectedMonsterId, setSelectedMonsterId] = useState<string | null>(
    null,
  );

  const [selectedMonsterIdByPc, setSelectedMonsterIdByPc] = useState<
    string | null
  >(null);

  const selectComputerMonster = (selectedId: string | null) => {
    if (selectedId) {
      const totalOfMosters = +(monsters.length - 1);
      const random = Math.round(Math.random() * totalOfMosters + 1).toString();
      const sortId = `monster-${random}`;

      if (sortId != selectedId) {
        const select = monsters.find((monster) => monster.id == sortId);
        setSelectedMonsterIdByPc(select?.id ? select.id : null);
        dispatch(setSelectedMonsterByPc(!select ? null : select));
        return;
      }

      selectComputerMonster(selectedId);
    }
  };

  const handleMonsterClick = (monster: Monster) => {
    const value = selectedMonsterId === monster.id ? null : monster.id;
    setSelectedMonsterId(value);
    dispatch(setSelectedMonster(!value ? null : monster));

    selectComputerMonster(value);
  };

  return (
    <div>
      <ListTitle>
        {monsters?.length > 0 ? 'Select your monster' : 'No monsters available'}
      </ListTitle>

      <MonstersSection data-testid="monsters-list-section">
        {monsters?.map((monster) => (
          <MonsterCard
            key={monster.id}
            onClick={() => handleMonsterClick(monster)}
            selected={monster.id === selectedMonsterId}
            data-testid={monster.id}>
            <Image src={monster.imageUrl} />
            <MonsterName>{monster.name}</MonsterName>
          </MonsterCard>
        ))}
      </MonstersSection>
    </div>
  );
};

export { MonstersList };
