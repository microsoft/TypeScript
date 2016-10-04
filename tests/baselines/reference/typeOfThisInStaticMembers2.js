//// [typeOfThisInStaticMembers2.ts]
class C {
    static foo = this; // error
}

class C2<T> {
    static foo = this; // error
}

//// [typeOfThisInStaticMembers2.js]
var C = (function () {
    function C() {
    }
    return C;
}());
C.foo = this; // error
var C2 = (function () {
    function C2() {
    }
    return C2;
}());
C2.foo = this; // error
