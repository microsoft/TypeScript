// @target: esnext
// @experimentaldecorators: true
// @emitdecoratormetadata: true
declare var decorator: any;

class Foo {
    p1

    @decorator()
    p2;
}
