//// [jsdocInTypescript2.ts]
// parse error (blocks grammar errors from checker)
function parse1(n: number=) { }


//// [jsdocInTypescript2.js]
// parse error (blocks grammar errors from checker)
function parse1(n) {
    if (n === void 0) { n = ; }
}
