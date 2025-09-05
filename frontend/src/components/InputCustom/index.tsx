import styles from './styles.module.css';

type Props = {
    placeholder: string;
    type: string;
}

export function InputCustom({ placeholder, type }: Props) {
    return (
        <input type={type} placeholder={placeholder} className={styles.input}/>
    )
}