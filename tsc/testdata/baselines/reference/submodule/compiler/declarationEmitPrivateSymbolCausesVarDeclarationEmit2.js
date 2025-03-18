//// [tests/cases/compiler/declarationEmitPrivateSymbolCausesVarDeclarationEmit2.ts] ////

//// [a.ts]
export const x = Symbol();

//// [b.ts]
import { x } from "./a";

export class C {
  private [x]: number = 1;
}

//// [c.ts]
import { x } from "./a";
import { C } from "./b";

export class D extends C {
  private [x]: 12 = 12;
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = Symbol();
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
const a_1 = require("./a");
class C {
    [a_1.x] = 1;
}
exports.C = C;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
const a_1 = require("./a");
const b_1 = require("./b");
class D extends b_1.C {
    [a_1.x] = 12;
}
exports.D = D;
