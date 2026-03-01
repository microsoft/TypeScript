//// [tests/cases/compiler/declarationMapsOutFile.ts] ////

//// [a.ts]
export class Foo {
    doThing(x: {a: number}) {
        return {b: x.a};
    }
    static make() {
        return new Foo();
    }
}
//// [index.ts]
import {Foo} from "./a";

const c = new Foo();
c.doThing({a: 42});

export let x = c.doThing({a: 12});
export { c, Foo };


//// [bundle.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Foo = void 0;
    class Foo {
        doThing(x) {
            return { b: x.a };
        }
        static make() {
            return new Foo();
        }
    }
    exports.Foo = Foo;
});
define("index", ["require", "exports", "a"], function (require, exports, a_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Foo = exports.c = exports.x = void 0;
    Object.defineProperty(exports, "Foo", { enumerable: true, get: function () { return a_1.Foo; } });
    const c = new a_1.Foo();
    exports.c = c;
    c.doThing({ a: 42 });
    exports.x = c.doThing({ a: 12 });
});


//// [bundle.d.ts]
declare module "a" {
    export class Foo {
        doThing(x: {
            a: number;
        }): {
            b: number;
        };
        static make(): Foo;
    }
}
declare module "index" {
    import { Foo } from "a";
    const c: Foo;
    export let x: {
        b: number;
    };
    export { c, Foo };
}
//# sourceMappingURL=bundle.d.ts.map