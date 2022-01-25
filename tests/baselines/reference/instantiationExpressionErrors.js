//// [instantiationExpressionErrors.ts]
declare let f: any;

// Type arguments only permitted at end of member expression

const a1 = f<number>;
const a2 = f.g<number>;
const a3 = f<number>.g;
const a4 = f<number>.g<number>;

// Type arguments must follow ?. token

const b1 = f?.<number>;
const b2 = f?.<number>();
const b3 = f<number>?.();

// Parsed as function call, even though this differs from JavaScript

const x1 = f<true>
(true);

// Parsed as relational expression

const x2 = f<true>
true;

// Parsed as instantiation expression

const x3 = f<true>;
true;


//// [instantiationExpressionErrors.js]
"use strict";
// Type arguments only permitted at end of member expression
var a1 = (f);
var a2 = (f.g);
var a3 = (f), g;
var a4 = (f), g;
;
// Type arguments must follow ?. token
var b1 = f === null || f === void 0 ? void 0 : f();
var b2 = f === null || f === void 0 ? void 0 : f();
var b3 = f < number > ( === null ||  === void 0 ? void 0 : ());
// Parsed as function call, even though this differs from JavaScript
var x1 = f(true);
// Parsed as relational expression
var x2 = f < true >
    true;
// Parsed as instantiation expression
var x3 = (f);
true;


//// [instantiationExpressionErrors.d.ts]
declare let f: any;
declare const a1: any;
declare const a2: any;
declare const a3: any, g: any;
declare const a4: any, g: any;
declare const b1: any;
declare const b2: any;
declare const b3: boolean;
declare const x1: any;
declare const x2: boolean;
declare const x3: any;
