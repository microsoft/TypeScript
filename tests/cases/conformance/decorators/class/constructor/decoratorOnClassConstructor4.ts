// @target: es5
// @module: commonjs
// @experimentaldecorators: true
// @emitdecoratormetadata: true
declare var dec: any;

@dec
class A {
}

@dec
class B {
    constructor(x: number) {}
}

@dec
class C extends A {
}