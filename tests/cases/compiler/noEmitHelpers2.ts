// @noemithelpers: true
// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: es5

function decorator() { }

@decorator
class A {
    constructor(a: number, @decorator b: string) {
    }
}