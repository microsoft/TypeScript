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
export const x = Symbol();
//// [b.js]
var _a;
import { x } from "./a";
export class C {
    constructor() {
        this[_a] = 1;
    }
}
_a = x;
//// [c.js]
var _a;
import { x } from "./a";
import { C } from "./b";
export class D extends C {
    constructor() {
        super(...arguments);
        this[_a] = 12;
    }
}
_a = x;


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
