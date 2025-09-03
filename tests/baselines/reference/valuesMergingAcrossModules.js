//// [tests/cases/conformance/externalModules/valuesMergingAcrossModules.ts] ////

//// [a.ts]
function A() {}
export { A };

//// [b.ts]
import { A } from "./a";
type A = 0;
export { A };

//// [c.ts]
import { A } from "./b";
namespace A {
  export const displayName = "A";
}

A();
A.displayName;


//// [a.js]
function A() { }
export { A };
//// [b.js]
import { A } from "./a";
export { A };
//// [c.js]
var A;
(function (A) {
    A.displayName = "A";
})(A || (A = {}));
A();
A.displayName;
export {};
