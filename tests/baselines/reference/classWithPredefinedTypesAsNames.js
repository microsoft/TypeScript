//// [tests/cases/conformance/classes/classDeclarations/classWithPredefinedTypesAsNames.ts] ////

//// [classWithPredefinedTypesAsNames.ts]
// classes cannot use predefined types as names

class any { }
class number { }
class boolean { }
class string { }

//// [classWithPredefinedTypesAsNames.js]
// classes cannot use predefined types as names
var any = /** @class */ (function () {
    function any() {
    }
    return any;
}());
var number = /** @class */ (function () {
    function number() {
    }
    return number;
}());
var boolean = /** @class */ (function () {
    function boolean() {
    }
    return boolean;
}());
var string = /** @class */ (function () {
    function string() {
    }
    return string;
}());
