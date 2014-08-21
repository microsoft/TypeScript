//// [wrappedRecursiveGenericType.ts]
interface X<T> { e: T; }
interface A<T> {
    a: B<T>;
    val: T;
}
interface B<T> {
    b: A<X<T>>;
    val: T;
}
var x: A<number>;
x.val = 5;         // val -> number
x.a.val = 5;       // val -> number
x.a.b.val = 5;     // val -> X<number> (This should be an error)
x.a.b.a.val = 5;   // val -> X<number> (This should be an error)

//// [wrappedRecursiveGenericType.js]
var x;
x.val = 5; // val -> number
x.a.val = 5; // val -> number
x.a.b.val = 5; // val -> X<number> (This should be an error)
x.a.b.a.val = 5; // val -> X<number> (This should be an error)
