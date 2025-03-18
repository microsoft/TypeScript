//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod16.ts] ////

//// [decoratorOnClassMethod16.ts]
declare var decorator: any;

class Foo {
    private prop
    @decorator
    foo() {
        return 0;
    }
}


//// [decoratorOnClassMethod16.js]
class Foo {
    prop;
    @decorator
    foo() {
        return 0;
    }
}
