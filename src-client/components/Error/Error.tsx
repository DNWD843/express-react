import styles from './styles.module.scss'

type ErrorProps = {
    message: string
}

export const Error = ({ message }: ErrorProps) => (
    <div className={styles.container}>
        <h2 className={styles.title}>Что-то пошло не так.</h2>
        <span className={styles.text}>{message}</span>
        <span className={styles.text}>Обновите страницу или попробуйте позже.</span>
    </div>
)
