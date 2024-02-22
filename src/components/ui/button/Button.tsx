import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'primary';
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'default',
  ...props
}) => {
  return (
    <button {...props} className={[styles.base, styles[variant]].join(' ')}>
      {children}
    </button>
  );
};

export default Button;
