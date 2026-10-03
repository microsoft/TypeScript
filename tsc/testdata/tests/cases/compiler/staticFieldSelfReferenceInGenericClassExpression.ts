// @strict: true

function id<T>(x: T): T {
    return x;
}

const Foo = id(class {
    static readonly foo = id(42);
});

const Ok = class {
    static readonly foo = id(42);
};

class Circular {
    static foo = Circular.foo;
}