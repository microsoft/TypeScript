//// [tests/cases/compiler/mergedDeclarations6.ts] ////

//// [a.ts]
export class A {
    protected protected: any;

    protected setProtected(val: any) {
        this.protected = val;
    }
}

//// [b.ts]
import {A} from './a';

declare module "./a" {
    interface A { }
}

export class B extends A {
    protected setProtected() {

    }
}

//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    class A {
        setProtected(val) {
            this.protected = val;
        }
    }
    exports.A = A;
});
//// [b.js]
define(["require", "exports", "./a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B = void 0;
    class B extends a_1.A {
        setProtected() {
        }
    }
    exports.B = B;
});
