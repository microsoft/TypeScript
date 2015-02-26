//// [tests/cases/conformance/externalModules/exportAssignNonIdentifier.ts] ////

//// [foo1.ts]
var x = 10;
export = typeof x; // Ok

//// [foo2.ts]
export = "sausages"; // Ok

//// [foo3.ts]
export = class Foo3 {}; // Error, not an expression

//// [foo4.ts]
export = true; // Ok

//// [foo5.ts]
export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript

//// [foo6.ts]
export = void; // Error, void operator requires an argument

//// [foo7.ts]
export = Date || String; // Ok

//// [foo8.ts]
export = null; // Ok



//// [foo1.js]
var x = 10;
module.exports = typeof x;
//// [foo2.js]
module.exports = "sausages";
//// [foo3.js]
var Foo3 = (function () {
    function Foo3() {
    }
    return Foo3;
})();
; // Error, not an expression
module.exports = ;
//// [foo4.js]
module.exports = true;
//// [foo5.js]
module.exports = undefined;
//// [foo6.js]
module.exports = void ;
//// [foo7.js]
module.exports = Date || String;
//// [foo8.js]
module.exports = null;
