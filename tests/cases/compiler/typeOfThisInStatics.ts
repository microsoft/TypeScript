// @target: es2015
class C {
    static foo() {
        var r = this;
    }
    static get x() {
        var r = this;
        return 1;
    }
}
