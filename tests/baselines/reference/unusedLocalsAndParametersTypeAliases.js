//// [unusedLocalsAndParametersTypeAliases.ts]
// used in a declaration
type handler1 = () => void;
export interface I1 {
    getHandler: handler1;
}

// exported
export type handler2 = () => void;

// used in extends clause
type handler3 = () => void;
export interface I3<T extends handler3> {
    getHandler: T;
}

// used in another type alias declaration
type handler4 = () => void;
type handler5 = handler4 | (()=>number);
var x: handler5;
x();

// used as type argument
type handler6 = () => void;
var y: Array<handler6>;
y[0]();
    

//// [unusedLocalsAndParametersTypeAliases.js]
"use strict";
exports.__esModule = true;
var x;
x();
var y;
y[0]();
