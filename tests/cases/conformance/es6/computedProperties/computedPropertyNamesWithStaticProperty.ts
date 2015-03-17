// @target: es6
class C {
    static staticProp = 10;
    get [C.staticProp]() {
        return "hello";
    }
    set [C.staticProp](x: string) {
        var y = x;
    }
    [C.staticProp]() { }
}