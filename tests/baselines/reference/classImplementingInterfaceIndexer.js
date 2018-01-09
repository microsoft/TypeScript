//// [classImplementingInterfaceIndexer.ts]
interface I {
    [index: string]: { prop }
}
class A implements I {
    [index: string]: { prop }
}

//// [classImplementingInterfaceIndexer.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
