import { useCallback } from 'react'
import type { CSSProperties } from 'react'

import type { TEntry } from '../../../../types'
import { STYLE_VARIABLES } from '../../../../constants'

import styles from './styles.module.scss'

type EntryProps = {
    entry: TEntry;
    onMouseOver(entry: TEntry): void;
    onMouseOut(): void;
    color: string
}

export const Entry = ({ entry, onMouseOver, onMouseOut, color }: EntryProps) => {
    const handleMouseOver = useCallback(() => {
        onMouseOver(entry)
    }, [entry, onMouseOver])

    const style = {
        [STYLE_VARIABLES.TRANSLATE_X]: `${entry.x}px`,
        [STYLE_VARIABLES.TRANSLATE_Y]: `${entry.y}px`,
    } as CSSProperties

    return (
        <g
            key={entry.id}
            className={styles.entry}
            style={style}
            onMouseOver={handleMouseOver}
            onMouseOut={onMouseOut}
        >
            <a href={`#${entry.id}`}>
                {entry.moved > 0 && <path d="M -11,5 11,5 0,-13 z" fill={color} />}
                {entry.moved < 0 && <path d="M -11,-5 11,-5 0,13 z" fill={color} />}
                {entry.moved === 0 && <circle r={9} fill={color} />}

                <text className={styles.entryText} y={3}>
                    {entry.id}
                </text>
            </a>
        </g>
    )
}
