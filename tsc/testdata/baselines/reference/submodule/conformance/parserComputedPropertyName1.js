//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName1.ts] ////

//// [parserComputedPropertyName1.ts]
var v = { [e] };

//// [parserComputedPropertyName1.js]
"use strict";
var v = { [e]:  };
