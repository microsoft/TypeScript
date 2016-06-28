//// [staticMustPrecedePublic.ts]
class Outer {
    static public intI: number;
    static private stringF: string;
}


//// [staticMustPrecedePublic.js]
var Outer = (function () {
    function Outer() {
    }
    return Outer;
}());
