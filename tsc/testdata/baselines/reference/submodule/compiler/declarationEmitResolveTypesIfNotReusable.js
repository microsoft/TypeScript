//// [tests/cases/compiler/declarationEmitResolveTypesIfNotReusable.ts] ////

//// [decl.ts]
const u = "X";
type A = { a: { b : "value of b", notNecessary: typeof u }}
const a = { a: "value of a", notNecessary: u } as const


export const o1 = (o: A['a']['b']) => {}

export const o2 = (o: (typeof a)['a']) => {}
export const o3 = (o:  typeof a['a']) => {}

export const o4 = (o: keyof (A['a'])) => {}

//// [main.ts]
import * as d  from './decl'

export const f = {...d}

//// [decl.js]
const u = "X";
const a = { a: "value of a", notNecessary: u };
export const o1 = (o) => { };
export const o2 = (o) => { };
export const o3 = (o) => { };
export const o4 = (o) => { };
//// [main.js]
import * as d from './decl';
export const f = { ...d };
