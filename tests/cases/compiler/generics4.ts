class C<T> { private x: T; }
interface X { f(): string; }
interface Y { f(): boolean; }
var a: C<X>;
var b: C<Y>;

a = b; // Not ok - return types of "f" are different