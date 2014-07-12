// These are all errors because type parameters cannot reference other type parameters from the same list

function foo<T, U>(x: T, y: U) {
    foo<U, U>(y, y);
    return new C<U,T>();
}

class C<T, U> {
    x: T;
}

interface I<T, U> {
    x: C<U, T>;
}

//function foo<T, U extends T>(x: T, y: U) {
//    foo<U, U>(y, y);
//    return new C<U, T>();
//}

//class C<T extends U, U> {
//    x: T;
//}

//interface I<T, U extends T> {
//    x: C<U, T>;
//}
