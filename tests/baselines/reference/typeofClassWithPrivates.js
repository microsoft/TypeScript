//// [typeofClassWithPrivates.ts]
class C<T> {
    private a: number;
    private static b: number;
    x: T;
    static y: T;
}

var c: C<string>;
var r: typeof C;
var r2: typeof c;

//// [typeofClassWithPrivates.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var r;
var r2;
