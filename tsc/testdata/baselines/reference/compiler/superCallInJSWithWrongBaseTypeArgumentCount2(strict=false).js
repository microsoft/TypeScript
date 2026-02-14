//// [tests/cases/compiler/superCallInJSWithWrongBaseTypeArgumentCount2.ts] ////

//// [a.ts]
export class A<T> {}

//// [b.js]
import { A } from './a.js';

/** @extends {A} */
export class B1 extends A {
    constructor() {
        super();
    }
}

/** @extends {A<string>} */
export class B2 extends A {
    constructor() {
        super();
    }
}

/** @extends {A<string, string>} */
export class B3 extends A {
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
/** @extends {A} */
export declare class B1 extends A {
    constructor();
}
/** @extends {A<string>} */
export declare class B2 extends A<string> {
    constructor();
}
/** @extends {A<string, string>} */
export declare class B3 extends A<string, string> {
    constructor();
}
