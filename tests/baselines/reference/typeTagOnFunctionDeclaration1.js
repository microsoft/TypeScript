//// [tests/cases/conformance/jsdoc/typeTagOnFunctionDeclaration1.ts] ////

//// [index.js]
/**
 * @type {{(arg1: string): string;}}
*/
function fn(arg1) {
    return arg1;
}

/**
 * @type {{(arg1: string): string; bar: string}}
*/
function fn2(arg1) {
    return arg1;
}

fn2.bar = 42; // error

/**
 * @type {{(arg1: string): string; bar: string}}
*/
function fn3(arg1) {
    return arg1;
}

fn3('hello');
fn3(100); // error


//// [index.js]
"use strict";
/**
 * @type {{(arg1: string): string;}}
*/
function fn(arg1) {
    return arg1;
}
/**
 * @type {{(arg1: string): string; bar: string}}
*/
function fn2(arg1) {
    return arg1;
}
fn2.bar = 42; // error
/**
 * @type {{(arg1: string): string; bar: string}}
*/
function fn3(arg1) {
    return arg1;
}
fn3('hello');
fn3(100); // error


//// [index.d.ts]
declare function fn(arg1: string): string;
declare function fn2(arg1: string): string;
declare namespace fn2 {
    let bar: string;
}
declare function fn3(arg1: string): string;
