// @target: esnext
// @experimentaldecorators: true
// @emitdecoratormetadata: true
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
