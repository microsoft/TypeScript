//// [tests/cases/compiler/declarationEmitPreserveReferencedImports.ts] ////

//// [utils.ts]
export interface Evt { }


//// [decl.ts]
import {Evt} from './utils'
export const o = <T>(o: T) => () : T => null!

//// [main.ts]
import { o }  from './decl'
import { Evt }  from './utils'

export const f = { o: o({ v: null! as Evt}) };

//// [utils.js]
export {};
//// [decl.js]
export const o = (o) => () => null;
//// [main.js]
import { o } from './decl';
export const f = { o: o({ v: null }) };


//// [utils.d.ts]
export interface Evt {
}
//// [decl.d.ts]
export declare const o: <T>(o: T) => () => T;
//// [main.d.ts]
import { Evt } from './utils';
export declare const f: {
    o: () => {
        v: Evt;
    };
};
