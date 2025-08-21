// @declaration: true
// @strict: true

// @filename: a.ts
type O = {
    prop: string
    prop2: string
}

type I = {
    prop: string
}

export const fn = (v: O['prop'], p: Omit<O, 'prop'>, key: keyof O, p2: Omit<O, keyof I>) => {};

// @filename: aExp.ts

export type O = {
    prop: string
    prop2: string
}

export type I = {
    prop: string
}

export const fnExp = (v: O['prop'], p: Omit<O, 'prop'>, key: keyof O, p2: Omit<O, keyof I>) => {};

// @filename: b.ts

import {fn} from './a'
import {fnExp} from './aExp'
export const f = fn;
export const fExp = fnExp;