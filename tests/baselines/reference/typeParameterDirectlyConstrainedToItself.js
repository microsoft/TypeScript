//// [typeParameterDirectlyConstrainedToItself.ts]
// all of the below should be errors

class C<T extends T> { } 
class C2<T, U extends U> { } 

interface I<T extends T> { }
interface I2<T, U extends U> { }

function f<T extends T>() { }
function f2<T, U extends U>() { }

var a: {
    <T extends T>(): void;
    <T, U extends U>(): void;
}

var b = <T extends T>() => { }
var b2 = <T, U extends U>() => { }

//// [typeParameterDirectlyConstrainedToItself.js]
// all of the below should be errors
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
function f() { }
function f2() { }
var a;
var b = function () { };
var b2 = function () { };
