export type TEntryData = {
    segment: number;
    ring: number;
    name: string;
    moved: number;
    description?: string;
}

export type TRingData = {
    name: string;
    color: string;
    description: string
}

export type TSegmentData = {
    name: string
    description: string
}
export interface GetDataApiResponse {
    lastModifiedDate: string
    description: string
    segments: TSegmentData[]
    rings: TRingData[]
    entries: TEntryData[]
}
