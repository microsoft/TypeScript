// @declaration: true
// @target: esnext

// @filename: decl.ts
const u = "X";
type A = { a: { b : "value of b", notNecessary: typeof u }}
const a = { a: "value of a", notNecessary: u } as const


export const o1 = (o: A['a']['b']) => {}

export const o2 = (o: (typeof a)['a']) => {}
export const o3 = (o:  typeof a['a']) => {}

export const o4 = (o: keyof (A['a'])) => {}

// @filename: main.ts
import * as d  from './decl'

export const f = {...d}