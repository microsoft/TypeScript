// @target: es2015
class Base {
    get x() {
        return 1;
    }
    set x(v) {
    }
}

// error
class Derived extends Base {
    x() {
        return 1;
    }
}