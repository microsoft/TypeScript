//// [funClodule.ts]
declare function foo();
declare module foo {
    export function x(): any;
}
declare class foo { } // Should error


declare class foo2 { }
declare module foo2 {
    export function x(): any;
}
declare function foo2(); // Should error


function foo3() { }
module foo3 {
     export function x(): any { }
}
class foo3 { } // Should error

//// [funClodule.js]
function foo3() { }
(function (foo3) {
    function x() { }
    foo3.x = x;
})(foo3 || (foo3 = {}));
var foo3 = /** @class */ (function () {
    function foo3() {
    }
    return foo3;
}()); // Should error
