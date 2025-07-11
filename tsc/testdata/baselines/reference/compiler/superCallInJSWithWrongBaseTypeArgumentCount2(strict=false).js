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
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.B3 = exports.B2 = exports.B1 = void 0;
const a_js_1 = require("./a.js");
/** @extends {A} */
class B1 extends a_js_1.A {
    constructor() {
        super();
    }
}
exports.B1 = B1;
/** @extends {A<string>} */
class B2 extends a_js_1.A {
    constructor() {
        super();
    }
}
exports.B2 = B2;
/** @extends {A<string, string>} */
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
