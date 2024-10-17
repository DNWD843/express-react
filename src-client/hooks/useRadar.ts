import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { GetDataApiResponse, TEntryData } from '@base/types'

import type { RadarParams, TCartesian, TEntry, TPolar, TSegment } from '../types'
import { getCollisionRadius, getRingTextOffset } from '../helpers'
import { FIRST_ENTRY_ID, INITIAL_SEED, INNER_CIRCLE_RADIUS_MULTIPLIER, OFFSET_FROM_AXIS, SEGMENTS } from '../constants'

const defaultRadarParams: RadarParams = {
    width: 800,
    height: 800,
    collisionRadius: 10,
    ringTextOffset: 62,
}

export const useRadar = (config: GetDataApiResponse) => {
    const [radarParams, setRadarParams] = useState<RadarParams | null>(null)

    const wrapperRef = useRef<HTMLDivElement>(null)
    const prevWrapperWidthRef = useRef({ value: 0 })

    const radarWidth = radarParams?.width || defaultRadarParams.width
    const collisionRadius = radarParams?.collisionRadius || defaultRadarParams.collisionRadius

    const unitOfCircleRadius = radarWidth / (config.rings.length - 1 + INNER_CIRCLE_RADIUS_MULTIPLIER) / 2

    const radarRings = useMemo(() => config.rings.map((ring, i) => ({
        ...ring,
        radius: (i + INNER_CIRCLE_RADIUS_MULTIPLIER) * unitOfCircleRadius,
    })), [config.rings, unitOfCircleRadius])

    const seed = useRef(INITIAL_SEED)

    const getRandom = useCallback(() => {
        const x = Math.sin(seed.current) * 10000

        seed.current += 1

        return x - Math.floor(x)
    }, [seed])

    const getCartesian = useCallback((polar: TPolar) => {
        return {
            x: polar.radius * Math.cos(polar.angle),
            y: polar.radius * Math.sin(polar.angle),
        }
    }, [])

    const getBoundedInterval = useCallback(
        (value: number, min: number, max: number) => {
            const low = Math.min(min, max)
            const high = Math.max(min, max)

            return Math.min(Math.max(value, low), high)
        },
        [],
    )

    const getCollision = useCallback(
        (currentEntry: TEntry, entries: TEntry[]) => {
            if (!entries.length) {
                return false
            }

            for (let i = 0; i < entries.length; i += 1) {
                const entryX = entries[i]!.x + collisionRadius
                const entryY = entries[i]!.y + collisionRadius

                const currentX = currentEntry.x + collisionRadius
                const currentY = currentEntry.y + collisionRadius

                const deltaX = entryX - currentX
                const deltaY = entryY - currentY

                const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2)

                if (distance < collisionRadius * 2) {
                    return true
                }
            }

            return false
        },
        [collisionRadius],
    )

    const getCoordinates = useCallback(
        (entry: TEntryData) => {
            const polarDomain = {
                min: {
                    angle: SEGMENTS[entry.segment]!.radialMin * Math.PI,
                    radius: entry.ring ? radarRings[entry.ring - 1]!.radius : 0,
                },
                max: {
                    angle: SEGMENTS[entry.segment]!.radialMax * Math.PI,
                    radius: radarRings[entry.ring]!.radius,
                },
            }

            const cartesianDomain = {
                min: {
                    x: OFFSET_FROM_AXIS * SEGMENTS[entry.segment]!.factorX,
                    y: OFFSET_FROM_AXIS * SEGMENTS[entry.segment]!.factorY,
                },
                max: {
                    x: radarRings[radarRings.length - 1]!.radius * SEGMENTS[entry.segment]!.factorX,
                    y: radarRings[radarRings.length - 1]!.radius * SEGMENTS[entry.segment]!.factorY,
                },
            }

            const randomAngle = polarDomain.min.angle + getRandom() * (polarDomain.max.angle - polarDomain.min.angle)

            const randomRadius = polarDomain.min.radius +
        getRandom() * (polarDomain.max.radius - polarDomain.min.radius)

            const cartesianPoint: TCartesian = getCartesian({
                angle: randomAngle,
                radius: randomRadius,
            })

            const boundedBox: TCartesian = {
                x: getBoundedInterval(cartesianPoint.x, cartesianDomain.min.x, cartesianDomain.max.x),
                y: getBoundedInterval(cartesianPoint.y, cartesianDomain.min.y, cartesianDomain.max.y),
            }

            const polarPoint: TPolar = {
                angle: Math.atan2(boundedBox.y, boundedBox.x),
                radius: Math.sqrt(boundedBox.x * boundedBox.x + boundedBox.y * boundedBox.y),
            }

            const boundedRing: TPolar = {
                angle: polarPoint.angle,
                radius: getBoundedInterval(
                    polarPoint.radius,
                    polarDomain.min.radius + OFFSET_FROM_AXIS,
                    polarDomain.max.radius - OFFSET_FROM_AXIS,
                ),
            }

            return getCartesian(boundedRing)
        },
        [getBoundedInterval, getCartesian, getRandom, radarRings],
    )

    const getEntryWithCoordinates = useCallback(
        (configEntry: TEntryData, entriesWithCoordinates: TEntry[]): TEntry => {
            const coordinates = getCoordinates(configEntry)
            const entry: TEntry = {
                ...configEntry,
                ...coordinates,
            }
            const isCollision = getCollision(entry, entriesWithCoordinates)

            if (isCollision) {
                return getEntryWithCoordinates(configEntry, entriesWithCoordinates)
            }

            return entry
        },
        [getCollision, getCoordinates],
    )

    const segments: TSegment[] = useMemo(() => {
        const { rings: configRings, segments: configSegments } = config

        let id = FIRST_ENTRY_ID
        const entriesWithCoordinates: TEntry[] = []

        seed.current = INITIAL_SEED

        const segmentsWithEntries: TSegment[] = configSegments.map(segment => ({
            ...segment,
            rings: configRings.map(ring => ({
                ...ring,
                entryList: [],
            })),
        }))

        config.entries.forEach(entry => entriesWithCoordinates.push(
            getEntryWithCoordinates(entry, entriesWithCoordinates),
        ))

        entriesWithCoordinates.forEach((entry) => {
            const { segment, ring } = entry

            segmentsWithEntries[segment]!.rings[ring]!.entryList.push(entry)
        })

        return segmentsWithEntries.map((segment) => {
            const rings = segment.rings.map((ring) => {
                const sortedEntries = [...ring.entryList]

                sortedEntries.sort((firstEntry: TEntry, secondEntry: TEntry) => {
                    return firstEntry.name.localeCompare(secondEntry.name)
                })

                const entriesWithId = sortedEntries.map((entry) => {
                    const entryWithId = {
                        ...entry,
                        id: String(id),
                    }

                    id += 1

                    return entryWithId
                })

                return {
                    ...ring,
                    entryList: entriesWithId,
                }
            })

            return {
                ...segment,
                rings,
            }
        })
    }, [config, getEntryWithCoordinates])

    useLayoutEffect(() => {
        const wrapperElement = wrapperRef.current
        const prevWrapperWidth = prevWrapperWidthRef.current
        let resizeObserver: ResizeObserver | null = null

        if (wrapperElement) {
            prevWrapperWidth.value = wrapperElement.clientWidth

            setRadarParams({
                width: wrapperElement.clientWidth,
                height: wrapperElement.clientHeight,
                collisionRadius: getCollisionRadius(wrapperElement.clientWidth),
                ringTextOffset: getRingTextOffset(wrapperElement.clientWidth),
            })

            resizeObserver = new ResizeObserver(() => {
                if (wrapperElement.clientWidth !== prevWrapperWidth.value) {
                    prevWrapperWidth.value = wrapperElement.clientWidth

                    setRadarParams({
                        width: wrapperElement.clientWidth,
                        height: wrapperElement.clientHeight,
                        collisionRadius: getCollisionRadius(wrapperElement.clientWidth),
                        ringTextOffset: getRingTextOffset(wrapperElement.clientWidth),
                    })
                }
            })

            resizeObserver.observe(document.body)
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.unobserve(document.body)
            }
        }
    }, [])

    return {
        segments,
        radarRings,
        wrapperRef,
        radarParams,
    }
}
