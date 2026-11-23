// @declaration: true

// TS2695: Left side of comma operator is unused and has no side effects.
export enum Values {
    [(1, 2).valueOf] = 1,
}
