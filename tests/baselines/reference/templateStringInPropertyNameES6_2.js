//// [tests/cases/conformance/es6/templates/templateStringInPropertyNameES6_2.ts] ////

//// [templateStringInPropertyNameES6_2.ts]
var x = {
    `abc${ 123 }def${ 456 }ghi`: 321
}

//// [templateStringInPropertyNameES6_2.js]
"use strict";
var x = {} `abc${123}def${456}ghi`;
321;
