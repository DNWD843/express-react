import { RingLegend } from '../RingLegend'
import type { TEntry, TSegment } from '../../../../types'

import styles from './styles.module.scss'

type SegmentLegendProps = {
    segment: TSegment;
    onMouseOver(entry: TEntry): void;
    onMouseOut(): void;
    hoveredEntry: TEntry | null;
}

export const SegmentLegend = ({ segment, onMouseOver, onMouseOut, hoveredEntry }: SegmentLegendProps) => {
    const middleIndex = Math.ceil(segment.rings.length / 2)

    const leftRings = segment.rings.slice(0, middleIndex)
    const rightRings = segment.rings.slice(-middleIndex)

    return (
        <div className={styles.segmentLegend}>
            <h3 className={styles.title}>{segment.name}</h3>
            <div className={styles.content}>
                <div>
                    {leftRings.map(ring => (
                        <RingLegend
                            key={ring.name}
                            ring={ring}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                            hoveredEntry={hoveredEntry}
                        />
                    ))}
                </div>
                <div>
                    {rightRings.map(ring => (
                        <RingLegend
                            key={ring.name}
                            ring={ring}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                            hoveredEntry={hoveredEntry}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
