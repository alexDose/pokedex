import styles from './ModalWindow.module.scss';
import { IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import InfoBlock from './InfoBlock';
import { PokemonType } from '../../types/Types';
import { getName } from '../../common/utilities/Utilities';

type Props = {
  isModal: boolean;
  closeModalWindow: () => void;
  pokemon: PokemonType;
};

const ModalWindow = ({ isModal, closeModalWindow, pokemon }: Props) => {
  return (
    <div className={`${styles.overlay} ${styles.animated} ${isModal ? styles.show : ''}`}>
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
          // alt={getName(pokemon.name)}
        />
        {pokemon.effectEntries?.length ? (
          <>
            <h4>
              {getName(pokemon.name)}(<span>{pokemon.nameStr}</span>)
            </h4>
            <InfoBlock
              effect={pokemon.effectEntries[0].effect}
              shortEffect={pokemon.effectEntries[0].short_effect}
            />
          </>
        ) : (
          <div>Information is not available</div>
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
