//// [tests/cases/compiler/abstractIdentifierNameStrict.ts] ////

//// [abstractIdentifierNameStrict.ts]
var abstract = true;

function foo() {
    "use strict";
    var abstract = true;
}

//// [abstractIdentifierNameStrict.js]
"use strict";
var abstract = true;
function foo() {
    "use strict";
    var abstract = true;
}
