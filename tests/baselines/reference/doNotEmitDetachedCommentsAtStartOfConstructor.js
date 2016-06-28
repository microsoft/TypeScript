//// [doNotEmitDetachedCommentsAtStartOfConstructor.ts]
class A {
    constructor() {
        // Single Line Comment

        var x = 10;
    }
}

class B {
    constructor() {
        /* 
            Multi-line comment
        */

        var y = 10;
    }
}

class C {
    constructor() {
        // Single Line Comment with more than one blank line


        var x = 10;
    }
}

class D {
    constructor() {
        /* 
            Multi-line comment with more than one blank line
        */


        var y = 10;
    }
}

//// [doNotEmitDetachedCommentsAtStartOfConstructor.js]
var A = (function () {
    function A() {
        var x = 10;
    }
    return A;
}());
var B = (function () {
    function B() {
        var y = 10;
    }
    return B;
}());
var C = (function () {
    function C() {
        var x = 10;
    }
    return C;
}());
var D = (function () {
    function D() {
        var y = 10;
    }
    return D;
}());
