// @target: es5, es2015
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}