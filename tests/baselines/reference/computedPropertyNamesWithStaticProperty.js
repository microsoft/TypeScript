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
