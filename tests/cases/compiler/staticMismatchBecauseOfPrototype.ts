interface A {
    n: number;
}
declare var A: {
    prototype: A;
    new(): A;
};

class B extends A {
    n = "";
}