// @declaration: true
class C<T> { private x: T; }
interface X { f(): string; }
interface Y { f(): string; }
var a: C<X>;
var b: C<Y>;

a = b; // Ok - should be identical