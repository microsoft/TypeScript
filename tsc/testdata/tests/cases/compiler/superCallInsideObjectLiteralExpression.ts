// @target: es2015
class A {
    foo() {
    }
}

class B extends A {
    constructor() {
        var x = {
            x: super()
        }
    }
}