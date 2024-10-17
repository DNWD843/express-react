import type { CSSProperties, ReactNode } from 'react'

import { STYLE_VARIABLES } from '../../../../constants'

import styles from './styles.module.scss'

type EntryTooltipProps = {
    coordinateX: number
    coordinateY: number
    content: ReactNode
}
export const EntryTooltip = ({ coordinateX, coordinateY, content }: EntryTooltipProps) => (
    <span
        style={{
            [STYLE_VARIABLES.ENTRY_X]: `${coordinateX}px`,
            [STYLE_VARIABLES.ENTRY_Y]: `${coordinateY}px`,
        } as CSSProperties}
        className={styles.entryTooltip}
    >
        {content}
    </span>
)
