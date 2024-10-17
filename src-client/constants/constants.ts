export const SEGMENTS = [
    { radialMin: -1, radialMax: -0.5, factorX: -1, factorY: -1 },
    { radialMin: -0.5, radialMax: 0, factorX: 1, factorY: -1 },
    { radialMin: 0.5, radialMax: 1, factorX: -1, factorY: 1 },
    { radialMin: 0, radialMax: 0.5, factorX: 1, factorY: 1 },
]

export const INITIAL_SEED = 42
export const INNER_CIRCLE_RADIUS_MULTIPLIER = 1.5
export const FIRST_ENTRY_ID = 1
export const OFFSET_FROM_AXIS = 15

export const enum STYLE_VARIABLES {
    TRANSLATE_X = '--translate-x',
    TRANSLATE_Y = '--translate-y',
    ENTRY_X = '--entry-x',
    ENTRY_Y = '--entry-y',
}
