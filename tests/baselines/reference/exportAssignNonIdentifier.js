//// [tests/cases/conformance/externalModules/exportAssignNonIdentifier.ts] ////

//// [foo1.ts]
var x = 10;
export = typeof x; // Error

//// [foo2.ts]
export = "sausages"; // Error

//// [foo3.ts]
export = class Foo3 {}; // Error

//// [foo4.ts]
export = true; // Error

//// [foo5.ts]
export = undefined; // Valid.  undefined is an identifier in JavaScript/TypeScript

//// [foo6.ts]
export = void; // Error

//// [foo7.ts]
export = Date || String; // Error

//// [foo8.ts]
export = null; // Error



//// [foo1.js]
var x = 10;
typeof x; // Error
//// [foo2.js]
"sausages"; // Error
//// [foo3.js]
var Foo3 = (function () {
    function Foo3() {
    }
    return Foo3;
})();
;
//// [foo4.js]
true; // Error
//// [foo5.js]
module.exports = undefined;
//// [foo6.js]
void ; // Error
//// [foo7.js]
 || String; // Error
module.exports = Date;
//// [foo8.js]
null; // Error
