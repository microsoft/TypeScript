//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod15.ts] ////

//// [decoratorOnClassMethod15.ts]
declare var decorator: any;

class Foo {
    private prop = 1
    @decorator
    foo() {
        return 0;
    }
}


//// [decoratorOnClassMethod15.js]
class Foo {
    prop = 1;
    @decorator
    foo() {
        return 0;
    }
}
