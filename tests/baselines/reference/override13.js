//// [override13.ts]
class Foo {
    property = 1
    static staticProperty = 2
}

class SubFoo extends Foo {
    property = 42;
    staticProperty = 42;
}

class StaticSubFoo extends Foo {
    static property = 42;
    static staticProperty = 42;
}

//// [override13.js]
class Foo {
    constructor() {
        this.property = 1;
    }
}
Foo.staticProperty = 2;
class SubFoo extends Foo {
    constructor() {
        super(...arguments);
        this.property = 42;
        this.staticProperty = 42;
    }
}
class StaticSubFoo extends Foo {
}
StaticSubFoo.property = 42;
StaticSubFoo.staticProperty = 42;
