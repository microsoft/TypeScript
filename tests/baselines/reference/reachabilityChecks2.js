//// [tests/cases/compiler/reachabilityChecks2.ts] ////

//// [reachabilityChecks2.ts]
while (true) { }
const enum E { X }

namespace A4 {
    while (true);
    namespace A {
        const enum E { X }
    }
}



//// [reachabilityChecks2.js]
while (true) { }
var A4;
(function (A4) {
    while (true)
        ;
})(A4 || (A4 = {}));
