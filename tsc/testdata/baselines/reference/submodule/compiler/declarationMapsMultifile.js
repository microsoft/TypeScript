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
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = exports.c = exports.x = void 0;
const a_1 = require("./a");
Object.defineProperty(exports, "Foo", { enumerable: true, get: function () { return a_1.Foo; } });
const c = new a_1.Foo();
exports.c = c;
c.doThing({ a: 42 });
exports.x = c.doThing({ a: 12 });
