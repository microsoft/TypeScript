// @target: ES6
// @noEmitHelpers: true
class A {
    x() {
    }
}

class B extends A {
    async y() {
        super.x();
        super["x"]();
    }
}