//// [regexValidated.controlFlow.ts]
const isA = /a/i;
let mustBeA: /a/i;
declare var s: string;
if (isA.test(s)) {
    mustBeA = s;
}

const isB = /b/i;
let mustBeB: /b/i;
if (isB.test(s)) {
    mustBeB = s;
}

let mustBeBOrA: /b/i | /a/i;
if (isB.test(s) || isA.test(s)) {
    mustBeBOrA = s;
}

let mustBeBAndA: /b/i & /a/i;
if (isB.test(s) && isA.test(s)) {
    mustBeBOrA = s;
}


//// [regexValidated.controlFlow.js]
var isA = /a/i;
var mustBeA;
if (isA.test(s)) {
    mustBeA = s;
}
var isB = /b/i;
var mustBeB;
if (isB.test(s)) {
    mustBeB = s;
}
var mustBeBOrA;
if (isB.test(s) || isA.test(s)) {
    mustBeBOrA = s;
}
var mustBeBAndA;
if (isB.test(s) && isA.test(s)) {
    mustBeBOrA = s;
}


//// [regexValidated.controlFlow.d.ts]
declare const isA: RegExp</a/i>;
declare let mustBeA: /a/i;
declare var s: string;
declare const isB: RegExp</b/i>;
declare let mustBeB: /b/i;
declare let mustBeBOrA: /b/i | /a/i;
declare let mustBeBAndA: /b/i & /a/i;
