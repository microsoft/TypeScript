class A {
    foo: number;
}

class B extends A {
    bar: string;
}

class C {
    0: B;
    [x: number]: A;
}