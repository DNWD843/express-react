import { memo } from 'react'
import classNames from 'classnames'

import type { TEntry } from '../../../../types'

import styles from './styles.module.scss'

type EntryLegendProps = {
    entry: TEntry;
    onMouseOver(entry: TEntry): void;
    onMouseOut(): void;
    isHovered: boolean
}

export const EntryLegend = memo(({ entry, onMouseOver, onMouseOut, isHovered }: EntryLegendProps) => {
    const handleHoverEntry = () => {
        onMouseOver(entry)
    }

    return (
        <a
            href={`#${entry.id}`}
            onFocus={accessibilityMockFn}
            onMouseOver={handleHoverEntry}
            onBlur={accessibilityMockFn}
            onMouseOut={onMouseOut}
            className={classNames(styles.entryLegend, {
                [String(styles.accented)]: isHovered,
            })}
        >
            {`${entry.id}. ${entry.name}`}
        </a>
    )
})

EntryLegend.displayName = 'EntryLegend'

function accessibilityMockFn() {}
