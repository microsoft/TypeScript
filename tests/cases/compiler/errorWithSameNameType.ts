// @filename: a.ts
export interface F {
    foo1: number
}

// @filename: b.ts
export interface F {
    foo2: number
}

// @filename: c.ts
import * as A from './a'
import * as B from './b'

let a: A.F
let b: B.F

if (a === b) {

}

a = b
