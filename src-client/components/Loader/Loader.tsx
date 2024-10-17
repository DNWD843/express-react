import styles from './styles.module.scss'

export const Loader = () => (
    <div className={styles.loader}>
        <svg
            viewBox="-3.04 -3.04 22.08 22.08"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className={styles.icon}
            transform="rotate(0)"
            stroke="#fafafa"
            strokeWidth="0.00016"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.032"
            />
            <g id="SVGRepo_iconCarrier">
                <g fill="#595959" fillRule="evenodd" clipRule="evenodd">
                    <path
                        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"
                        opacity=".2"
                    />
                    <path
                        d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"
                    />
                </g>
            </g>
        </svg>
    </div>
)
