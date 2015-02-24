// @target: es5
class C {
    bar() {
        var obj = {
            [this.bar()]() { }
        };
        return 0;
    }
}