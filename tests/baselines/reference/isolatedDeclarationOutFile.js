//// [tests/cases/compiler/isolatedDeclarationOutFile.ts] ////

//// [a.ts]
export class A {
    toUpper(msg: string): string {
        return msg.toUpperCase();
    }
}

//// [b.ts]
import { A } from "./a";

export class B extends A {
    toFixed(n: number): string {
        return n.toFixed(6);
    }
}

export function makeB(): A {
    return new B();
}


//// [all.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    class A {
        toUpper(msg) {
            return msg.toUpperCase();
        }
    }
    exports.A = A;
});
define("b", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.B = void 0;
    exports.makeB = makeB;
    class B extends a_1.A {
        toFixed(n) {
            return n.toFixed(6);
        }
    }
    exports.B = B;
    function makeB() {
        return new B();
    }
});


//// [all.d.ts]
declare module "a" {
    export class A {
        toUpper(msg: string): string;
    }
}
declare module "b" {
    import { A } from "a";
    export class B extends A {
        toFixed(n: number): string;
    }
    export function makeB(): A;
}
