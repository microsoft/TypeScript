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
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B3 = exports.B2 = exports.B1 = void 0;
const a_js_1 = require("./a.js");
class B1 extends a_js_1.A {
    constructor() {
        super();
    }
}
exports.B1 = B1;
class B2 extends a_js_1.A {
    constructor() {
        super();
    }
}
exports.B2 = B2;
class B3 extends a_js_1.A {
    constructor() {
        super();
    }
}
exports.B3 = B3;


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


//// [DtsFileErrors]


b.d.ts(2,33): error TS2314: Generic type 'A<T>' requires 1 type argument(s).
b.d.ts(8,33): error TS2314: Generic type 'A<T>' requires 1 type argument(s).


==== a.d.ts (0 errors) ====
    export declare class A<T> {
    }
    
==== b.d.ts (2 errors) ====
    import { A } from './a.js';
    export declare class B1 extends A {
                                    ~
!!! error TS2314: Generic type 'A<T>' requires 1 type argument(s).
        constructor();
    }
    export declare class B2 extends A<string> {
        constructor();
    }
    export declare class B3 extends A<string, string> {
                                    ~~~~~~~~~~~~~~~~~
!!! error TS2314: Generic type 'A<T>' requires 1 type argument(s).
        constructor();
    }
    