// @experimentalDecorators: true
// @emitDecoratorMetadata: true
// @target: es5, es2015
// @module: commonjs
declare var decorator: any;

class X {
    @decorator()
    a?: string?;
    @decorator()
    b?: string!;
    @decorator()
    c?: *;
}