//// [computedPropertyNamesWithStaticProperty.ts]
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

//// [computedPropertyNamesWithStaticProperty.js]
let C = /** @class */ (() => {
    class C {
        get [C.staticProp]() {
            return "hello";
        }
        set [C.staticProp](x) {
            var y = x;
        }
        [C.staticProp]() { }
    }
    C.staticProp = 10;
    return C;
})();
