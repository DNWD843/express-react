import type { TEntryData, TRingData, TSegmentData } from '@base/types'

export type TPolar = {
    angle: number;
    radius: number;
}

export type TCartesian = {
    x: number;
    y: number;
}

export type TEntry = TEntryData & TCartesian & {
    id?: string;
}

export type TRing = TRingData & {
    entryList: TEntry[];
}

export type TSegment = TSegmentData & {
    rings: TRing[];
}

export type RadarParams = {
    width: number,
    height: number,
    collisionRadius: number
    ringTextOffset: number
}
