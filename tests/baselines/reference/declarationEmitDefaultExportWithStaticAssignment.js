//// [tests/cases/compiler/declarationEmitDefaultExportWithStaticAssignment.ts] ////

//// [foo.ts]
export class Foo {}

//// [index1.ts]
import {Foo} from './foo';
export default function Example() {}
Example.Foo = Foo

//// [index2.ts]
import {Foo} from './foo';
export {Foo};
export default function Example() {}
Example.Foo = Foo

//// [index3.ts]
export class Bar {}
export default function Example() {}

Example.Bar = Bar

//// [index4.ts]
function A() {  }

function B() { }

export function C() {
  return null;
}

C.A = A;
C.B = B;

//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
exports.Foo = Foo;
//// [index1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Example;
var foo_1 = require("./foo");
function Example() { }
Example.Foo = foo_1.Foo;
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
exports.default = Example;
var foo_1 = require("./foo");
Object.defineProperty(exports, "Foo", { enumerable: true, get: function () { return foo_1.Foo; } });
function Example() { }
Example.Foo = foo_1.Foo;
//// [index3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
exports.default = Example;
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
exports.Bar = Bar;
function Example() { }
Example.Bar = Bar;
//// [index4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = C;
function A() { }
function B() { }
function C() {
    return null;
}
C.A = A;
C.B = B;


//// [foo.d.ts]
export declare class Foo {
}
//// [index1.d.ts]
declare function Example(): void;
declare namespace Example {
    var Foo: typeof import("./foo").Foo;
}
export default Example;
//// [index2.d.ts]
import { Foo } from './foo';
export { Foo };
declare function Example(): void;
declare namespace Example {
    var Foo: typeof import("./foo").Foo;
}
export default Example;
//// [index3.d.ts]
export declare class Bar {
}
declare function Example(): void;
declare namespace Example {
    var Bar: typeof import("./index3").Bar;
}
export default Example;
//// [index4.d.ts]
export declare function C(): any;
export declare namespace C {
    var A: () => void;
    var B: () => void;
}
