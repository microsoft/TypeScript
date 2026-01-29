//// [tests/cases/compiler/genericClassStaticMethod.ts] ////

//// [genericClassStaticMethod.ts]
class Foo<T> {
    static getFoo() {
    }
}

class Bar<T> extends Foo<T> {
    static getFoo() {
    }
}


//// [genericClassStaticMethod.js]
class Foo {
    static getFoo() {
    }
}
class Bar extends Foo {
    static getFoo() {
    }
}
