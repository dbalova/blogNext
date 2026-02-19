import styles from './Button.module.sass';

export default function Button(props) {
    const {
        className = '',
        children,
        type = 'button',
        variant = 'primary', 
        onClick,
        isDisabled = false,
    } = props;
    
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
