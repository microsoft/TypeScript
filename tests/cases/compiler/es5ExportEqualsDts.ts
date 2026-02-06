// @target: es5, es2015
// @module: commonjs
// @declaration: true

class A {
    foo() {
        var aVal: A.B;
        return aVal;
    }
}

namespace A {
    export interface B { }
}

export = A