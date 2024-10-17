import { Fragment, useCallback, useState } from 'react'
import type { GetDataApiResponse } from '@base/types'

import { TEntry } from '../../types'
import { useRadar } from '../../hooks'

import styles from './styles.module.scss'
import { Entry, SegmentLegend, EntryTooltip, RadarLegend } from './partials'

type RadarProps = {
    data: GetDataApiResponse
}

export const Radar = ({ data }: RadarProps) => {
    const [hoveredEntry, setHoveredEntry] = useState<TEntry | null>(null)

    const onMouseOver = useCallback((entry: TEntry) => {
        setHoveredEntry(entry)
    }, [])

    const onMouseOut = useCallback(() => {
        setHoveredEntry(null)
    }, [])

    const { segments, radarRings, wrapperRef, radarParams } = useRadar(data)

    return (
        <div className={styles.techRadar}>
            <div ref={wrapperRef} className={styles.radarWrapper}>
                {radarParams
                    ? (
                        <>
                            <svg className={styles.radar}>
                                <g className={styles.radarContent}>
                                    <g className={styles.radarGrid}>
                                        <line x1={0} y1={-radarParams.width / 2} x2={0} y2={radarParams.width / 2} />
                                        <line x1={-radarParams.width / 2} y1={0} x2={radarParams.width / 2} y2={0} />

                                        {radarRings?.map((ring, i) => (
                                            <Fragment key={ring.radius}>
                                                <circle cx={0} cy={0} r={ring.radius} />
                                                <text
                                                    className={styles.radarRingText}
                                                    y={-ring.radius + radarParams.ringTextOffset}
                                                    fill={radarRings[i]!.color}
                                                >
                                                    {radarRings[i]!.name}
                                                </text>
                                            </Fragment>
                                        ))}
                                    </g>
                                    <g id="rink">
                                        {segments?.map(
                                            ({ rings }) => rings.map(
                                                ({ entryList }) => entryList.map(entry => (
                                                    <Entry
                                                        key={entry.id}
                                                        entry={entry}
                                                        onMouseOver={onMouseOver}
                                                        onMouseOut={onMouseOut}
                                                        color={radarRings[entry.ring]!.color}
                                                    />
                                                )),
                                            ),
                                        )}
                                    </g>
                                </g>
                            </svg>

                            {hoveredEntry && (
                                <EntryTooltip
                                    coordinateX={hoveredEntry.x}
                                    coordinateY={hoveredEntry.y}
                                    content={hoveredEntry.name}
                                />
                            )}
                        </>
                    )
                    : null}
            </div>

            <RadarLegend />

            {segments?.map(segment => (
                <SegmentLegend
                    key={segment.name}
                    segment={segment}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    hoveredEntry={hoveredEntry}
                />
            ))}
        </div>
    )
}
