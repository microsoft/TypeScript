//// [tests/cases/conformance/override/override13.ts] ////

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

class Intermediate extends Foo {}

class Derived extends Intermediate {
    property = 42;
    staticProperty = 42;
}

class StaticDerived extends Intermediate {
    static property = 42;
    static staticProperty = 42;
}

//// [override13.js]
class Foo {
    property = 1;
    static staticProperty = 2;
}
class SubFoo extends Foo {
    property = 42;
    staticProperty = 42;
}
class StaticSubFoo extends Foo {
    static property = 42;
    static staticProperty = 42;
}
class Intermediate extends Foo {
}
class Derived extends Intermediate {
    property = 42;
    staticProperty = 42;
}
class StaticDerived extends Intermediate {
    static property = 42;
    static staticProperty = 42;
}
