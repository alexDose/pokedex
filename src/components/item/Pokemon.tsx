import { useEffect, useState } from 'react';
import styles from './Item.module.scss';
import { CircularProgress } from '@mui/material';
import { getName } from '../../common/utilities/Utilities';
import { useAppDispatch } from '../../store/store';
import { fetchStats } from '../../store/reducers/pokemons-reducer';
import { PokemonType } from '../../types/Types';

type Props = {
  pokemon: PokemonType;
  openModalWindow: (pokemon: PokemonType) => void;
};

const Pokemon = ({ pokemon, openModalWindow }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const fetch = () => {
    dispatch(fetchStats(pokemon.id.toString()));
    setIsLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div
      className={styles.item}
      onClick={() => {
        openModalWindow(pokemon);
      }}>
      <img
        width={150}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <p>{getName(pokemon.name)}</p>
      {isLoading && <CircularProgress />}
      {pokemon.type && (
        <div className={styles.infoBlock}>
          <div className={`${styles.type} ${styles[pokemon.type]}`}></div>
          <div className={styles.main}>
            <span>experience: </span>
            <span className={styles.info}>{pokemon.experience}xp</span>
          </div>
          <div className={styles.main}>
            <span>height: </span>
            <span className={styles.info}>{pokemon.height}m</span>
          </div>
          <div className={styles.main}>
            <span>weight: </span>
            <span className={styles.info}>{pokemon.weight}kg</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
