//// [staticAsIdentifier.ts]
class C {
    static static
    [x: string]: string;
}

//// [staticAsIdentifier.js]
var C = (function () {
    function C() {
    }
    return C;
}());
