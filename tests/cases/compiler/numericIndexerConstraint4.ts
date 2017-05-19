class A {
    foo: number;
}

class B extends A {
    bar: string;
}

var x: {
    [idx: number]: A;
} = { 0: new B() }
