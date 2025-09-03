//// [tests/cases/conformance/externalModules/typeOnlyMerge3.ts] ////

//// [a.ts]
function A() {}
export type { A };

//// [b.ts]
import { A } from "./a";
namespace A {
  export const displayName = "A";
}
export { A };

//// [c.ts]
import { A } from "./b";
A;
A.displayName;
A();


//// [a.js]
function A() { }
export {};
//// [b.js]
var A;
(function (A) {
    A.displayName = "A";
})(A || (A = {}));
export { A };
//// [c.js]
import { A } from "./b";
A;
A.displayName;
A();
