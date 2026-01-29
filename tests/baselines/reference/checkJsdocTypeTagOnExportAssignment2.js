//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment2.ts] ////

//// [checkJsdocTypeTagOnExportAssignment2.js]

//// [a.ts]
export interface Foo {
    a: number;
    b: number;
}

//// [b.js]
/** @type {import("./a").Foo} */
export default { c: false };

//// [c.js]
import b from "./b";
b;


//// [checkJsdocTypeTagOnExportAssignment2.js]
//// [a.js]
export {};
//// [b.js]
/** @type {import("./a").Foo} */
export default { c: false };
//// [c.js]
import b from "./b";
b;
