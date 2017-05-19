//// [classWithPredefinedTypesAsNames.ts]
// classes cannot use predefined types as names

class any { }
class number { }
class boolean { }
class string { }

//// [classWithPredefinedTypesAsNames.js]
// classes cannot use predefined types as names
var any = (function () {
    function any() {
    }
    return any;
}());
var number = (function () {
    function number() {
    }
    return number;
}());
var boolean = (function () {
    function boolean() {
    }
    return boolean;
}());
var string = (function () {
    function string() {
    }
    return string;
}());
