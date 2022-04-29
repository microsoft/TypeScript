//// [undefinedSymbolReferencedInArrayLiteral1.ts]
var tokens = [{ startIndex: deltaOffset }];

var functions = [function() {
    [1, 2, 3].NonexistantMethod();
    anotherNonExistingMethod();
}];



//// [undefinedSymbolReferencedInArrayLiteral1.js]
var tokens = [{ startIndex: deltaOffset }];
var functions = [function () {
        [1, 2, 3].NonexistantMethod();
        anotherNonExistingMethod();
    }];
