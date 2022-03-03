//// [tests/cases/compiler/declarationMapsMultifile.ts] ////

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


//// [a.js]
"use strict";
exports.__esModule = true;
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.doThing = function (x) {
        return { b: x.a };
    };
    Foo.make = function () {
        return new Foo();
    };
    return Foo;
}());
exports.Foo = Foo;
//// [index.js]
"use strict";
exports.__esModule = true;
exports.Foo = exports.c = exports.x = void 0;
var a_1 = require("./a");
exports.Foo = a_1.Foo;
var c = new a_1.Foo();
exports.c = c;
c.doThing({ a: 42 });
exports.x = c.doThing({ a: 12 });


//// [a.d.ts]
export declare class Foo {
    doThing(x: {
        a: number;
    }): {
        b: number;
    };
    static make(): Foo;
}
//# sourceMappingURL=a.d.ts.map//// [index.d.ts]
import { Foo } from "./a";
declare const c: Foo;
export declare let x: {
    b: number;
};
export { c, Foo };
//# sourceMappingURL=index.d.ts.map