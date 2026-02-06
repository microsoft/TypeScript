// @module: commonjs
// @target: es2015
// @experimentalDecorators: true
// @emitDecoratorMetadata: true
export class A {
    @test
    b: import('./b').B
}