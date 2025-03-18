//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod14.ts] ////

//// [decoratorOnClassMethod14.ts]
declare var decorator: any;

class Foo {
    private prop = () => {
        return 0;
    }
    @decorator
    foo() {
        return 0;
    }
}


//// [decoratorOnClassMethod14.js]
class Foo {
    prop = () => {
        return 0;
    };
    @decorator
    foo() {
        return 0;
    }
}
