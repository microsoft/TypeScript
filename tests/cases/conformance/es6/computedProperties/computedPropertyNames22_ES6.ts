// @target: es6
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}