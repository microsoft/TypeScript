class Foo{};

function bar(x: {new(): Foo;}){}

bar(Foo); // Error, but should be allowed
