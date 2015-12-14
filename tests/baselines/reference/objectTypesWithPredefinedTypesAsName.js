//// [objectTypesWithPredefinedTypesAsName.ts]
// it is an error to use a predefined type as a type name

class any { }

class number { }

class boolean { }
class bool { } // not a predefined type anymore

class string { }




//// [objectTypesWithPredefinedTypesAsName.js]
// it is an error to use a predefined type as a type name
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
var bool = (function () {
    function bool() {
    }
    return bool;
}()); // not a predefined type anymore
var string = (function () {
    function string() {
    }
    return string;
}());
