//// [tests/cases/compiler/augmentedTypesModules4.ts] ////

//// [augmentedTypesModules4.ts]
// module then enum
// should be errors
namespace m4 { }
enum m4 { }

namespace m4a { var y = 2; }
enum m4a { One }

namespace m4b { export var y = 2; }
enum m4b { One }

namespace m4c { interface I { foo(): void } }
enum m4c { One }

namespace m4d { class C { foo() { } } }
enum m4d { One }

//// module then module

namespace m5 { export var y = 2; }
namespace m5 { export interface I { foo(): void } } // should already be reasonably well covered


//// [augmentedTypesModules4.js]
var m4;
(function (m4) {
})(m4 || (m4 = {}));
var m4a;
(function (m4a) {
    var y = 2;
})(m4a || (m4a = {}));
(function (m4a) {
    m4a[m4a["One"] = 0] = "One";
})(m4a || (m4a = {}));
var m4b;
(function (m4b) {
    m4b.y = 2;
})(m4b || (m4b = {}));
(function (m4b) {
    m4b[m4b["One"] = 0] = "One";
})(m4b || (m4b = {}));
var m4c;
(function (m4c) {
    m4c[m4c["One"] = 0] = "One";
})(m4c || (m4c = {}));
var m4d;
(function (m4d) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        return C;
    }());
})(m4d || (m4d = {}));
(function (m4d) {
    m4d[m4d["One"] = 0] = "One";
})(m4d || (m4d = {}));
//// module then module
var m5;
(function (m5) {
    m5.y = 2;
})(m5 || (m5 = {}));
