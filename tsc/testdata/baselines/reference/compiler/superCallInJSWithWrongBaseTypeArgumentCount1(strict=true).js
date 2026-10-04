//// [tests/cases/compiler/superCallInJSWithWrongBaseTypeArgumentCount1.ts] ////

//// [a.ts]
export class A<T> {}

//// [b.js]
import { A } from './a.js';

export class B1 extends A {
    constructor() {
        super();
    }
}

export class B2 extends A<string> {
    constructor() {
        super();
    }
}

export class B3 extends A<string, string> {
    constructor() {
        super();
    }
}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
class A {
}
exports.A = A;


//// [a.d.ts]
export declare class A<T> {
}
//// [b.d.ts]
import { A } from './a.js';
export declare class B1 extends A {
    constructor();
}
export declare class B2 extends A<string> {
    constructor();
}
export declare class B3 extends A<string, string> {
    constructor();
}
