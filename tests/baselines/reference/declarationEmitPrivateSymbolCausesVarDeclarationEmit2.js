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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var a_1 = require("./a");
class C {
    constructor() {
        this[_a] = 1;
    }
}
exports.C = C;
_a = a_1.x;
//// [c.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
var a_1 = require("./a");
var b_1 = require("./b");
class D extends b_1.C {
    constructor() {
        super(...arguments);
        this[_a] = 12;
    }
}
exports.D = D;
_a = a_1.x;


//// [a.d.ts]
export declare const x: unique symbol;
//// [b.d.ts]
import { x } from "./a";
export declare class C {
    private [x];
}
//// [c.d.ts]
import { x } from "./a";
import { C } from "./b";
export declare class D extends C {
    private [x];
}
