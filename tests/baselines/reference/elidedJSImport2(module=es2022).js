//// [tests/cases/compiler/elidedJSImport2.ts] ////

//// [index.js]
import { Foo } from "./other.js";
import * as other from "./other.js";
import defaultFoo from "./other.js";

const x = new Foo();
const y = other.Foo();
const z = new defaultFoo();

//// [other.d.ts]
export interface Foo {
    bar: number;
}

export default interface Bar {
    foo: number;
}

//// [other.js]
export class Foo {
    bar = 2.4;
}

export default class Bar {
    foo = 1.2;
}


//// [index.js]
import { Foo } from "./other.js";
import * as other from "./other.js";
import defaultFoo from "./other.js";
var x = new Foo();
var y = other.Foo();
var z = new defaultFoo();
//// [other.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.bar = 2.4;
    }
    return Foo;
}());
export { Foo };
var Bar = /** @class */ (function () {
    function Bar() {
        this.foo = 1.2;
    }
    return Bar;
}());
export default Bar;
