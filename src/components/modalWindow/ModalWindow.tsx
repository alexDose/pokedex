import { useEffect, useState } from 'react';
import styles from './ModalWindow.module.scss';
import { CircularProgress, IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import InfoBlock from './InfoBlock';
import { PokemonInfoType, PokemonType } from '../../types/Types';
import { getEffectEntriesEn, getName } from '../../common/utilities/Utilities';

type Props = {
  isModal: boolean;
  closeModalWindow: () => void;
  pokemon: PokemonType;
};

const ModalWindow = ({ isModal, closeModalWindow, pokemon }: Props) => {
  const [pokemonInfo, setPokemonInfoInfo] = useState<PokemonInfoType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonInfo = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/ability/${pokemon.id}`);
    const data = await response.json();
    setPokemonInfoInfo(
      [data].map((item) => {
        return {
          id: item.id,
          nameStr: item.name,
          effectEntries: getEffectEntriesEn(item.effect_entries)
        };
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    //не успел разобраться, но почему-то данные подхватывались только при втором открытии модалки, оставил локально
    //dispatch(fetchInfo(pokemon.id.toString()))

    getPokemonInfo();
  }, []);

  return (
    <div className={styles.overlay}>
      {isModal && <div className={styles.backside} onClick={closeModalWindow}></div>}
      <div className={styles.modal}>
        <div className={styles.crossButton} onClick={closeModalWindow}>
          <IconButton color={'primary'}>
            <CloseOutlinedIcon />
          </IconButton>
        </div>
        <img
          width={260}
          height={260}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={getName(pokemon.name)}
        />
        {isLoading && <CircularProgress />}
        {pokemonInfo ? (
          <>
            <h4>
              {getName(pokemon.name)}(<span>{pokemonInfo[0].nameStr}</span>)
            </h4>
            <InfoBlock
              effect={pokemonInfo[0].effectEntries[0].effect}
              shortEffect={pokemonInfo[0].effectEntries[0].short_effect}
            />
          </>
        ) : (
          <>
            <h4>{getName(pokemon.name)}</h4>
            <div>Information is not available</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
