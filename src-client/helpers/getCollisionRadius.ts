export const getCollisionRadius = (width: number) => {
    if (width <= 400) {
        return 2
    }

    if (width <= 500) {
        return 7
    }

    if (width <= 700) {
        return 9
    }

    return 10
}
