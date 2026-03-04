import { ButtonProps } from '../../types/button.types';
import styles from './Button.module.sass';

export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    onClick,
    isDisabled = false,
    className = '',
}: ButtonProps) {

    return (
        <button
            className={`
                ${styles.button} 
                ${styles[variant]} 
                ${className}
            `}
            type={type}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}
