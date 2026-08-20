// @strict: true
// @target: ES6
class Base {
    method?() { }
}

class Derived extends Base {
    method() {
        return super.method?.();
    }

    async asyncMethod() {
        return super.method?.();
    }
}