// @strict: true
// @noEmit: true

declare module mAmbient {
    enum e {
        x,
        y,
        z
    }
}

declare const num: number

const test1: mAmbient.e = num
const test2: mAmbient.e.x = num
const test3: mAmbient.e = 42
const test4: mAmbient.e.x = 42
