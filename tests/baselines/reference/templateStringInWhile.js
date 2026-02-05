//// [tests/cases/conformance/es6/templates/templateStringInWhile.ts] ////

//// [templateStringInWhile.ts]
while (`abc${0}abc`) {
    `def${1}def`;
}

//// [templateStringInWhile.js]
"use strict";
while (`abc${0}abc`) {
    `def${1}def`;
}
