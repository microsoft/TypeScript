//// [tests/cases/compiler/exportAssignmentMerging7.ts] ////

//// [a.ts]
class Foo {}
class Bar {}
export = Foo;
export { Bar }; // Causes error
//// [b.ts]
import { Bar } from "./a";
const b = new Bar();



//// [a.js]
"use strict";
exports.Bar = void 0;
class Foo {
}
class Bar {
}
module.exports = Foo;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
const b = new a_1.Bar();


//// [a.d.ts]
declare class Foo {
}
declare class Bar {
}
export = Foo;
export { Bar };
//// [b.d.ts]
export {};
