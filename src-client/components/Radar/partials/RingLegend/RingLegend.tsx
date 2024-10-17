import { EntryLegend } from '../EntryLegend'
import type { TEntry, TRing } from '../../../../types'

import styles from './styles.module.scss'

type RingLegendProps = {
    ring: TRing;
    onMouseOver(entry: TEntry): void;
    onMouseOut(): void;
    hoveredEntry: TEntry | null;
}

export const RingLegend = ({ ring, onMouseOver, onMouseOut, hoveredEntry }: RingLegendProps) => {
    return (
        <div className={styles.ringLegend}>
            <h3 className={styles.title} style={{ color: ring.color }}>{ring.name}</h3>
            <div className={styles.content}>
                {ring.entryList.map(entry => (
                    <EntryLegend
                        key={entry.id}
                        entry={entry}
                        onMouseOver={onMouseOver}
                        onMouseOut={onMouseOut}
                        isHovered={hoveredEntry?.id === entry.id}
                    />
                ))}
            </div>
        </div>
    )
}
