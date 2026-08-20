// @module: commonjs
// @target: es2015
// @declaration: true
export declare namespace A {
    namespace X { }
}

class X { }

export class A {
    static X = X;
}

export declare namespace Y {

}

export class Y { }