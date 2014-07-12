class Foo {
    bar = 3;
    static bar = '';
}
Foo.prototype.bar = undefined; // Should be OK
