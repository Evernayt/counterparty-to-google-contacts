import { googleContacts, moysklad } from 'constants/images';
import { FC } from 'react';
import Loader from 'components/ui/loader/Loader';
import styles from './Converting.module.scss';

interface ConvertingProps {
  isConverting: boolean;
}

const Converting: FC<ConvertingProps> = ({ isConverting }) => {
  return (
    <div
      className={styles.container}
      style={{ display: isConverting ? 'flex' : 'none' }}
    >
      <img className={styles.icon} src={moysklad} />
      <Loader />
      <img className={styles.icon} src={googleContacts} />
    </div>
  );
};

export default Converting;
