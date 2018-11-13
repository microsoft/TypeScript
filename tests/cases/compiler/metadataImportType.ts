// @experimentalDecorators: true
// @emitDecoratorMetadata: true
export class A {
    @test
    b: import('./b').B
}