//// [tests/cases/compiler/uncalledFunctionChecksInConditional.ts] ////

//// [uncalledFunctionChecksInConditional.ts]
declare function isFoo(): boolean;
declare function isBar(): boolean;
declare const isUndefinedFoo: (() => boolean) | undefined;

if (isFoo) {
    // error on isFoo
}

if (isFoo || isBar) {
    // error on isFoo, isBar
}

if (isFoo || isFoo()) {
    // error on isFoo
}

if (isUndefinedFoo || isFoo()) {
    // no error
}

if (isFoo && isFoo()) {
    // no error
}

declare const x: boolean;
declare const ux: boolean | undefined;
declare const y: boolean;
declare const uy: boolean | undefined;
declare function z(): boolean;
declare const uz: (() => boolean) | undefined;

if (x || isFoo) {
    // error on isFoo
}

if (isFoo || x) {
    // error on isFoo
}

if (x || y || z() || isFoo) {
    // error on isFoo
}

if (x || uy || z || isUndefinedFoo) {
    // error on z
}

if (ux || y || uz || isFoo) {
    // error on isFoo
}

if (x && z) {
    // no error
    z();
}

//// [uncalledFunctionChecksInConditional.js]
if (isFoo) {
    // error on isFoo
}
if (isFoo || isBar) {
    // error on isFoo, isBar
}
if (isFoo || isFoo()) {
    // error on isFoo
}
if (isUndefinedFoo || isFoo()) {
    // no error
}
if (isFoo && isFoo()) {
    // no error
}
if (x || isFoo) {
    // error on isFoo
}
if (isFoo || x) {
    // error on isFoo
}
if (x || y || z() || isFoo) {
    // error on isFoo
}
if (x || uy || z || isUndefinedFoo) {
    // error on z
}
if (ux || y || uz || isFoo) {
    // error on isFoo
}
if (x && z) {
    // no error
    z();
}
