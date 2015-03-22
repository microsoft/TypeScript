//// [classExtendsEveryObjectType2.ts]
class C2 extends { foo: string; } { } // error

class C6 extends []{ } // error

//// [classExtendsEveryObjectType2.js]
var C2 = (function () {
    function C2() {
    }
    return C2;
})();
{
} // error
var C6 = (function () {
    function C6() {
    }
    return C6;
})();
[];
{
} // error
