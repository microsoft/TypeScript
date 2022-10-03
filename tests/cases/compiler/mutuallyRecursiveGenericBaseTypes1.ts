interface A<T> {
    foo(): B<T>; // instead of B does see this
    foo(): void; // instead of B does see this
 
    foo2(): B<number>;
}
 
interface B<T> extends A<T> {
    bar(): void;
}
 
var b: B<number>;
b.foo(); // should not error

 
