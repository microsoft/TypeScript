//// [tests/cases/compiler/undefinedSymbolReferencedInArrayLiteral1.ts] ////

//// [undefinedSymbolReferencedInArrayLiteral1.ts]
var tokens = [{ startIndex: deltaOffset }];

var functions = [function() {
    [1, 2, 3].NonexistantMethod();
    anotherNonExistingMethod();
}];



//// [undefinedSymbolReferencedInArrayLiteral1.js]
"use strict";
var tokens = [{ startIndex: deltaOffset }];
var functions = [function () {
        [1, 2, 3].NonexistantMethod();
        anotherNonExistingMethod();
    }];
