//// [tests/cases/compiler/genericWithNoConstraintComparableWithCurlyCurly.ts] ////

//// [genericWithNoConstraintComparableWithCurlyCurly.ts]
function foo<T>() {
    let x = {};
    x as T;
}

function bar<T extends unknown>() {
    let x = {};
    x as T;
}

function baz<T extends {}>() {
    let x = {};
    x as T;
}

function bat<T extends object>() {
    let x = {};
    x as T;
}

function no<T extends null | undefined>() {
    let x = {};
    x as T; // should error
}

function yes<T extends object | null | undefined>() {
    let x = {};
    x as T;
}

//// [genericWithNoConstraintComparableWithCurlyCurly.js]
"use strict";
function foo() {
    var x = {};
    x;
}
function bar() {
    var x = {};
    x;
}
function baz() {
    var x = {};
    x;
}
function bat() {
    var x = {};
    x;
}
function no() {
    var x = {};
    x; // should error
}
function yes() {
    var x = {};
    x;
}
