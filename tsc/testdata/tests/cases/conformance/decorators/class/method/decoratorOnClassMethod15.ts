// @target: esnext
// @experimentaldecorators: true
// @emitdecoratormetadata: true
declare var decorator: any;

class Foo {
    private prop = 1
    @decorator
    foo() {
        return 0;
    }
}
