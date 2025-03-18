//// [tests/cases/compiler/functionLikeInParameterInitializer.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = bar;
exports.baz1 = baz1;
exports.baz2 = baz2;
exports.baz3 = baz3;
function bar(func = () => foo) {
    let foo = "in";
}
function baz1(func = { f() { return foo; } }) {
    let foo = "in";
}
function baz2(func = function () { return foo; }) {
    let foo = "in";
}
function baz3(func = class {
    x = foo;
}) {
    let foo = "in";
}
