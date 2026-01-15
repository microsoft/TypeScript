// @target: esnext
// @experimentaldecorators: true
// @emitdecoratormetadata: true
declare var decorator: any;

class Foo {
    private prop
    @decorator
    foo() {
        return 0;
    }
}
