// @declaration: true

// @filename: e.ts
export enum E {
    A = 'a',
    B = 'b',
}

// @filename: a.ts
import { E } from './e.js'
export const A = {
    item: {
        a: E.A,
    },
} as const

// @filename: b.ts
import { A } from './a.js'
export const B = { ...A } as const
