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
class Foo {
}
exports.Foo = Foo;
//// [index1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Example;
const foo_1 = require("./foo");
function Example() { }
Example.Foo = foo_1.Foo;
//// [index2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
exports.default = Example;
const foo_1 = require("./foo");
Object.defineProperty(exports, "Foo", { enumerable: true, get: function () { return foo_1.Foo; } });
function Example() { }
Example.Foo = foo_1.Foo;
//// [index3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
exports.default = Example;
class Bar {
}
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
