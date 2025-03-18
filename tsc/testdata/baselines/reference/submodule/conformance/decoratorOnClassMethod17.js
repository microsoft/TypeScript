//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod17.ts] ////

//// [decoratorOnClassMethod17.ts]
declare var decorator: any;

class Foo {
    private prop @decorator
    foo() {
        return 0;
    }
}


//// [decoratorOnClassMethod17.js]
class Foo {
    prop;
    @decorator
    foo() {
        return 0;
    }
}
