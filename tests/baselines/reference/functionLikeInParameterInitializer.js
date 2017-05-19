//// [functionLikeInParameterInitializer.ts]
// error
export function bar(func = () => foo) {
    let foo = "in";
}
// error
export function baz1(func = { f() { return foo } }) {
    let foo = "in";
}

// error
export function baz2(func = function () { return foo }) {
    let foo = "in";
}

// error
export function baz3(func = class { x = foo }) {
    let foo = "in";
}


//// [functionLikeInParameterInitializer.js]
"use strict";
exports.__esModule = true;
// error
function bar(func) {
    if (func === void 0) { func = function () { return foo; }; }
    var foo = "in";
}
exports.bar = bar;
// error
function baz1(func) {
    if (func === void 0) { func = { f: function () { return foo; } }; }
    var foo = "in";
}
exports.baz1 = baz1;
// error
function baz2(func) {
    if (func === void 0) { func = function () { return foo; }; }
    var foo = "in";
}
exports.baz2 = baz2;
// error
function baz3(func) {
    if (func === void 0) { func = (function () {
        function class_1() {
            this.x = foo;
        }
        return class_1;
    }()); }
    var foo = "in";
}
exports.baz3 = baz3;
