// @strictNullChecks: true

interface Point { x: number; y?: number }
const x = 1
const y = 1
const foo: Point = { x: 1, y: 2 }
const a: Point = { y, y: 1, ...foo}
const b: Point = { x, x: 1, ...foo}
const c: Point = { y, y: 1, ...{ x: 1, y: 1}}
const d: Point = { x, x: 1, ...{ x: 1, y: 1}}
const e: Point = { y, ...foo}
const f: Point = { y, ...{ x: 1, y: 1}}

class PointBar { x: number; y?: number }
const bar: PointBar = { x: 1, y: 2 }
const g: PointBar = { y, y: 1, ...bar}
const h: PointBar = { x, x: 1, ...bar}
const i: PointBar = { y, y: 1, ...{ x: 1, y: 1}}
const j: PointBar = { x, x: 1, ...{ x: 1, y: 1}}
const k: PointBar = { y, ...bar}
const l: PointBar = { y, ...{ x: 1, y: 1}}
