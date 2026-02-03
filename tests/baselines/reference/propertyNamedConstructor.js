//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyNamedConstructor.ts] ////

//// [propertyNamedConstructor.ts]
class X1 {
  "constructor" = 3; // Error
}

class X2 {
  ["constructor"] = 3;
}


//// [propertyNamedConstructor.js]
var X1 = /** @class */ (function () {
    function X1() {
        this["constructor"] = 3; // Error
    }
    return X1;
}());
var X2 = /** @class */ (function () {
    function X2() {
        this["constructor"] = 3;
    }
    return X2;
}());
