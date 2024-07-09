// @noemithelpers: true
// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: es5

declare var decorator: any;

@decorator
class A {
    constructor(a: number, @decorator b: string) {
    }
}