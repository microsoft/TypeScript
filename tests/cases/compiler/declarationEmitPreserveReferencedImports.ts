// @declaration: true
// @strict: true

// @filename: utils.ts
export interface Evt { }


// @filename: decl.ts
import {Evt} from './utils'
export const o = <T>(o: T) => () : T => null!

// @filename: main.ts
import { o }  from './decl'
import { Evt }  from './utils'

export const f = { o: o({ v: null! as Evt}) };