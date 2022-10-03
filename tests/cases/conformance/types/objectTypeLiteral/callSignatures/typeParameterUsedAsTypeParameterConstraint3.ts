// Type parameters are in scope in their own and other type parameter lists
// Object types

//class C<T, U extends T, V extends U> {
//    x: T;
//    y: U;
//    z: V;
//    foo<W extends V>(x: W): T {
//        var r: T;
//        return x;
//    }
//}

//class C2<V extends U, T, U extends T> {
//    x: T;
//    y: U;
//    z: V;
//    foo<W extends V>(x: W): T {
//        var r: T;
//        return x;
//    }
//}

interface I<T, U, V> {
    x: T;
    y: U;
    z: V;
    foo<W extends V>(x: W): T;
}

interface I2<V, T, U> {
    x: T;
    y: U;
    z: V;
    foo<W extends V>(x: W): T;
}

//interface I < T, U extends T, V extends U > {
//    x: T;
//    y: U;
//    z: V;
//    foo<W extends V>(x: W): T;
//}

//interface I2<V extends U, T, U extends T> {
//    x: T;
//    y: U;
//    z: V;
//    foo<W extends V>(x: W): T;
//}