// @target: es6
class C1 {
    static staticProp = 10;
    get [C1.staticProp]() {
        return "hello";
    }
    set [C1.staticProp](x: string) {
        var y = x;
    }
    [C1.staticProp]() { }
}

(class C2 {
    static staticProp = 10;
    get [C2.staticProp]() {
        return "hello";
    }
    set [C2.staticProp](x: string) {
        var y = x;
    }
    [C2.staticProp]() { }
})
