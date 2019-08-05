//// [scannerUnicodeEscapeInKeyword2.ts]
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


//// [scannerUnicodeEscapeInKeyword2.js]
var \u0061wait = 12; // ok
async function main() {
    await 12; // not ok
}
var \u0079ield = 12; // ok
function* gen() {
    yield 12; //not ok
}
