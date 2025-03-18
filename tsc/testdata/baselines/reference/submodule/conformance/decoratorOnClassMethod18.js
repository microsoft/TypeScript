//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod18.ts] ////

//// [decoratorOnClassMethod18.ts]
declare var decorator: any;

class Foo {
    p1

    @decorator()
    p2;
}


//// [decoratorOnClassMethod18.js]
class Foo {
    p1;
    @decorator()
    p2;
}
