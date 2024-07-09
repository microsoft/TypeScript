// type parameters from the same declaration are identical to themself

function foo1<T>(x: T);
function foo1<T>(x: T); // no error, different declaration for each T
function foo1<T>(x: T) { }

function foo2<T, U>(x: T);
function foo2<T, U>(x: T); // no error, different declaration for each T
function foo2<T, U>(x: T) { }

function foo3<T, U>(x: T, y: U) {
    function inner(x: T);
    function inner(x: T); // error, same T
    function inner(x: T) { }

    function inner2(x: T);
    function inner2<T>(x: T); // no error, different T
    function inner2(x: any) { }
}

class C<T> {
    foo1(x: T);
    foo1(x: T); // error, same T
    foo1(x: T) { }

    foo2<U>(a: T, x: U);
    foo2<U>(a: T, x: U); // no error, different declaration for each U
    foo2<U>(a: T, x: U) { }

    foo3<T>(x: T);
    foo3<T>(x: T); // no error, different declaration for each T
    foo3<T>(x: T) { }

    foo4<T extends Date>(x: T);
    foo4<T extends Date>(x: T); // no error, different declaration for each T
    foo4<T extends Date>(x: T) { }
}

class C2<T extends Date> {
    foo1(x: T);
    foo1(x: T); // error, same T
    foo1(x: T) { }

    foo2<U>(a: T, x: U);
    foo2<U>(a: T, x: U); // no error, different declaration for each U
    foo2<U>(a: T, x: U) { }

    foo3<T>(x: T);
    foo3<T>(x: T); // no error, different declaration for each T
    foo3<T>(x: T) { }
}

interface I<T> {
    foo1(x: T);
    foo1(x: T); // error, same T

    foo2<U>(a: T, x: U);
    foo2<U>(a: T, x: U); // no error, different declaration for each U

    foo3<T>(x: T);
    foo3<T>(x: T); // no error, different declaration for each T

    foo4<T extends Date>(x: T);
    foo4<T extends Date>(x: T); // no error, different declaration for each T
}

interface I2<T extends Date> {
    foo1(x: T);
    foo1(x: T); // error, same T

    foo2<U>(a: T, x: U);
    foo2<U>(a: T, x: U); // no error, different declaration for each U

    foo3<T>(x: T);
    foo3<T>(x: T); // no error, different declaration for each T
}