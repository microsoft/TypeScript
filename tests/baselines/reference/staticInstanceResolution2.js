//// [staticInstanceResolution2.ts]
class A { }
A.hasOwnProperty('foo');

class B {
    constructor() { }
}
B.hasOwnProperty('foo');





//// [staticInstanceResolution2.js]
var A = (function () {
    function A() {
    }
    return A;
}());
A.hasOwnProperty('foo');
var B = (function () {
    function B() {
    }
    return B;
}());
B.hasOwnProperty('foo');
