// @strictNullChecks: true

interface Point { x: number; y?: number }
const x = 1
const y = 1
const foo: Point = { x: 1, y: 2 }
const a: Point = { y, y: 1, ...foo}
const b: Point = { x, x: 1, ...foo}
const c: Point = { y, y: 1, ...{ x: 1, y: 1}}
const d: Point = { x, x: 1, ...{ x: 1, y: 1}}


class PointBar { x: number; y?: number }
const bar: PointBar = { x: 1, y: 2 }
const e: PointBar = { y, y: 1, ...bar}
const f: PointBar = { x, x: 1, ...bar}
const g: PointBar = { y, y: 1, ...{ x: 1, y: 1}}
const h: PointBar = { x, x: 1, ...{ x: 1, y: 1}}
