import styles from './ModalWindow.module.scss';

type InfoBlockType = {
  effect: string;
  shortEffect: string;
};

const InfoBlock = ({ effect, shortEffect }: InfoBlockType) => {
  return (
    <div>
      <div className={styles.infoBlock}>
        <div>Effect:</div>
        <div className={styles.info}>{effect}</div>
      </div>
      <div className={styles.infoBlock}>
        <div>Short effect:</div>
        <span className={styles.info}>{shortEffect}</span>
      </div>
    </div>
  );
};

export default InfoBlock;
