function* f() {
    <number> (yield 0);
    // Unlike await, yield is not allowed to appear in a simple unary expression.
    <number> yield 0;
}
