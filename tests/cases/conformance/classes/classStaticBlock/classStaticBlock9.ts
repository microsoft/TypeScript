class A {
    static bar = A.foo + 1
    static {
        A.foo + 2;
    }
    static foo = 1;
}
