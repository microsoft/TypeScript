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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [decl.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.o = void 0;
var o = function (o) { return function () { return null; }; };
exports.o = o;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
var decl_1 = require("./decl");
exports.f = { o: (0, decl_1.o)({ v: null }) };


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
