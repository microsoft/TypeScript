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
const o = (o) => () => null;
exports.o = o;
//// [main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
const decl_1 = require("./decl");
exports.f = { o: (0, decl_1.o)({ v: null }) };
