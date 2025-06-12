//// [tests/cases/compiler/genericTypeConstraints.ts] ////

//// [genericTypeConstraints.ts]
class Foo {
    fooMethod() {}
}

class FooExtended { }

class Bar<T extends Foo> { }

class BarExtended extends Bar<FooExtended> {
    constructor() {
        super();
    }
}

//// [genericTypeConstraints.js]
class Foo {
    fooMethod() { }
}
class FooExtended {
}
class Bar {
}
class BarExtended extends Bar {
    constructor() {
        super();
    }
}
