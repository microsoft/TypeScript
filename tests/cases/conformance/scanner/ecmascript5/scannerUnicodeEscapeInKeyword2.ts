// @target: esnext
// @filename: file1.ts
var \u0061wait = 12; // ok
async function main() {
    \u0061wait 12; // not ok
}

var \u0079ield = 12; // ok
function *gen() {
    \u0079ield 12; //not ok
}

type typ\u0065 = 12; // ok

typ\u0065 notok = 0; // not ok

export {};
// @filename: file2.ts

\u{0076}ar x = "hello"; // not ok

var \u{0061}wait = 12; // ok
async function main() {
    \u{0061}wait 12; // not ok
}

var \u{0079}ield = 12; // ok
function *gen() {
    \u{0079}ield 12; //not ok
}

type typ\u{0065} = 12; // ok

typ\u{0065} notok = 0; // not ok

export {};

const a = {def\u0061ult: 12}; // OK, `default` not in keyword position
// chrome and jsc may still error on this, ref https://bugs.chromium.org/p/chromium/issues/detail?id=993000 and https://bugs.webkit.org/show_bug.cgi?id=200638
