//// [tests/cases/conformance/es6/destructuring/destructuringParameterDeclaration6.ts] ////

//// [destructuringParameterDeclaration6.ts]
// A parameter declaration may specify either an identifier or a binding pattern.

// Reserved words are not allowed to be used as an identifier in parameter declaration
"use strict"

// Error
function a({while}) { }
function a1({public}) { }
function a4([while, for, public]){ }
function a5(...while) { }
function a6(...public) { }
function a7(...a: string) { }
a({ while: 1 });

// No Error
function b1({public: x}) { }
function b2({while: y}) { }
b1({ public: 1 });
b2({ while: 1 });



//// [destructuringParameterDeclaration6.js]
// A parameter declaration may specify either an identifier or a binding pattern.
// Reserved words are not allowed to be used as an identifier in parameter declaration
"use strict";
// Error
function a(_a) {
    var  = _a.while;
}
function a1(_a) {
    var public = _a.public;
}
function a4(_a) { }
while (, )
    for (, public; ; )
        ;
{ }
function a5() {
    var  = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        [_i] = arguments[_i];
    }
}
while () { }
function a6() {
    var public = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        public[_i] = arguments[_i];
    }
}
function a7() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
}
a({ while: 1 });
// No Error
function b1(_a) {
    var x = _a.public;
}
function b2(_a) {
    var y = _a.while;
}
b1({ public: 1 });
b2({ while: 1 });
