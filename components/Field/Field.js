import styles from './Field.module.sass';

export default function Field(props) {
    const {
        label,
        id,
        type = 'text',
        value,
        onChange,
        required = false,
        isTextarea,
    } = props;

    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label} 
            </label>
            {isTextarea ? <textarea
                className={`${styles.input}`}
                id={id}
                name={id}
                placeholder=" "
                autoComplete='off'
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            /> : <input
                className={`${styles.input}`}
                id={id}
                name={id}
                placeholder=" "
                autoComplete='off'
                type={type}
                value={value}
                onChange={onChange}
                required={required}
            />}
        </div>
    );
}