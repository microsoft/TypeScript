// @strict: true
// @noEmit: true

// repro #52036
declare const t1: number | Promise<number>
t1 >= 0 // error
