// @declaration: true

abstract class Foo {
    constructor(f: any) { }
    public static bar(): void { }

    public empty() { }
}

class Bar extends Foo {
    constructor(f: any) {
        super(f);
    }
}

var a = new Foo(1); // Error
var b = new Foo(); // Error because of invalid constructor arguments


// Valid

var c = new Bar(1);
c.empty();

// Calling a static method on a abstract class is valid
Foo.bar();

var Copy = Foo;
new Copy();
