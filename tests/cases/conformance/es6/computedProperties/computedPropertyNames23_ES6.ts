// @target: es6
class C {
    bar() {
        return 0;
    }
    [
        { [this.bar()]: 1 }[0]
    ]() { }
}