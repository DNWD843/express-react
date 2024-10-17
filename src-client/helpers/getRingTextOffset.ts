export const getRingTextOffset = (width: number) => {
    if (width < 400) {
        return 28
    }

    if (width < 500) {
        return 35
    }

    if (width < 700) {
        return 42
    }

    if (width < 800) {
        return 52
    }

    return 62
}
