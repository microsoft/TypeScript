//// [strictMode4.ts]
"use strict";

class A {
}


//// [strictMode4.js]
"use strict";
var A = (function () {
    function A() {
    }
    return A;
})();
