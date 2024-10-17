import { useEffect, useState } from 'react'

import styles from './styles.module.scss'

type GoUpButtonProps = {
    positionToShow?: number;
}

export const GoUpButton = ({ positionToShow = 1000 }: GoUpButtonProps) => {
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleScrollToTop = () => {
        window.scrollTo(window.scrollX, 0)
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    if (scrollPosition < positionToShow) {
        return null
    }

    return (
        <button
            aria-label="go up button"
            type="button"
            onClick={handleScrollToTop}
            className={styles.button}
        />
    )
}
