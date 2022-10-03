//// [generics4NoError.ts]
class C<T> { private x: T; }
interface X { f(): string; }
interface Y { f(): boolean; }
var a: C<X>;
var b: C<Y>;


//// [generics4NoError.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var a;
var b;


//// [generics4NoError.d.ts]
declare class C<T> {
    private x;
}
interface X {
    f(): string;
}
interface Y {
    f(): boolean;
}
declare var a: C<X>;
declare var b: C<Y>;
