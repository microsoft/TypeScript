//// [genericInheritedImplicitConstructors.ts]
interface Constructor<T> {
    new(...args: any[]): T;
    prototype: T;
}

class A<U> { a: U; }
class B<V> extends A<V> { b: V; }
var c:Constructor<B<boolean>> = B; // error here

//class A1 { a: boolean; }
//class B1 extends A1 { b: boolean; }
//var c1:Constructor<B1> = B1; // no error here


//// [genericInheritedImplicitConstructors.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
}(A));
var c = B; // error here
//class A1 { a: boolean; }
//class B1 extends A1 { b: boolean; }
//var c1:Constructor<B1> = B1; // no error here
