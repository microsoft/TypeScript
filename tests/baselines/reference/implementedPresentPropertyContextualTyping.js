//// [implementedPresentPropertyContextualTyping.ts]
interface X {
    n: number
}
class C implements X { // error, n: undefined isn't assignable to n: number
    n = undefined;
}
class C2 implements X {
    n = null;
}


//// [implementedPresentPropertyContextualTyping.js]
var C = (function () {
    function C() {
        this.n = undefined;
    }
    return C;
}());
var C2 = (function () {
    function C2() {
        this.n = null;
    }
    return C2;
}());
