//// [tests/cases/compiler/abstractIdentifierNameStrict.ts] ////

//// [abstractIdentifierNameStrict.ts]
var abstract = true;

function foo() {
    "use strict";
    var abstract = true;
}

//// [abstractIdentifierNameStrict.js]
var abstract = true;
function foo() {
    "use strict";
    var abstract = true;
}
