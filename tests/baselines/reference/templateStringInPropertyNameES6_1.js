//// [tests/cases/conformance/es6/templates/templateStringInPropertyNameES6_1.ts] ////

//// [templateStringInPropertyNameES6_1.ts]
var x = {
    `a`: 321
}

//// [templateStringInPropertyNameES6_1.js]
"use strict";
var x = {} `a`;
321;
