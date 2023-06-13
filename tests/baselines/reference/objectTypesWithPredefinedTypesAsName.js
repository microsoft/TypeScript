//// [tests/cases/conformance/types/specifyingTypes/predefinedTypes/objectTypesWithPredefinedTypesAsName.ts] ////

//// [objectTypesWithPredefinedTypesAsName.ts]
// it is an error to use a predefined type as a type name

class any { }

class number { }

class boolean { }
class bool { } // not a predefined type anymore

class string { }




//// [objectTypesWithPredefinedTypesAsName.js]
// it is an error to use a predefined type as a type name
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
var bool = /** @class */ (function () {
    function bool() {
    }
    return bool;
}()); // not a predefined type anymore
var string = /** @class */ (function () {
    function string() {
    }
    return string;
}());
