import { FC, ReactNode } from 'react';
import styles from './Link.module.scss';

interface LinkProps {
  href: string;
  children: ReactNode;
}

const Link: FC<LinkProps> = ({ href, children }) => {
  return (
    <span className={styles.link} onClick={() => window.open(href)}>
      {children}
    </span>
  );
};

export default Link;
