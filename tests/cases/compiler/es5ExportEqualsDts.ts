// @target: es5
// @module: commonjs
// @declaration: true

class A {
    foo() {
        var aVal: A.B;
        return aVal;
    }
}

module A {
    export interface B { }
}

export = A