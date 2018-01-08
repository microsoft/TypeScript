// @declaration: true
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
