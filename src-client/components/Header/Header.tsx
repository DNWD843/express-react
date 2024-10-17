import styles from './styles.module.scss'

type HeaderProps = {
    lastModifiedDate?: string
}

export const Header = ({ lastModifiedDate }: HeaderProps) => (
    <header className={styles.header}>
        <h1 className={styles.title}>Техрадар I-Novus</h1>
        {lastModifiedDate && (<span className={styles.subTitle}>{`Дата последнего обновления: ${lastModifiedDate}`}</span>)}
    </header>
)
