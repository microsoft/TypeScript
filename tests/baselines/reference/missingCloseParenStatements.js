//// [tests/cases/compiler/missingCloseParenStatements.ts] ////

//// [missingCloseParenStatements.ts]
var a1, a2, a3 = 0;
if ( a1 && (a2 + a3 > 0) {
    while( (a2 > 0) && a1
    {
        do {
            var i = i + 1;
            a1 = a1 + i;
            with ((a2 + a3 > 0) && a1 {
                console.log(x);
              }
        } while (i < 5 && (a1 > 5);
    }
}

//// [missingCloseParenStatements.js]
var a1, a2, a3 = 0;
if (a1 && (a2 + a3 > 0)) {
    while ((a2 > 0) && a1) {
        do {
            var i = i + 1;
            a1 = a1 + i;
            with ((a2 + a3 > 0) && a1) {
                console.log(x);
            }
        } while (i < 5 && (a1 > 5));
    }
}
