//// [destructuringParameterDeclaration2.ts]
"use strict"
function a({while}) { }
function a1({public}) { }
function a2({public: x}) { }
function a3({while: y}) { }
function a4([while, for, public]){ }
function a5(...while) { }
function a6(...public) { }
function a7(...a: string) { }

class C {
    constructor(public ...a) { }
}


a2({ public: 1 });
a3({ while: 1 });
a({ while: 1 });



//// [destructuringParameterDeclaration2.js]
"use strict";
function a(_a) {
    var while = _a.while;
}
function a1(_a) {
    var public = _a.public;
}
function a2(_a) {
    var x = _a.public;
}
function a3(_a) {
    var y = _a.while;
}
while (, )
    for (, public; ; )
        ;
{ }
while () { }
function a6() {
    var public = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        public[_i - 0] = arguments[_i];
    }
}
function a7() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
var C = (function () {
    function C(public) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
    }
    return C;
})();
a2({ public: 1 });
a3({ while: 1 });
a({ while: 1 });
