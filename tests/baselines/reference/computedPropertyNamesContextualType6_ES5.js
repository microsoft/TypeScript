//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesContextualType6_ES5.ts] ////

//// [computedPropertyNamesContextualType6_ES5.ts]
interface I<T> {
    [s: string]: T;
}

declare function foo<T>(obj: I<T>): T

foo({
    p: "",
    0: () => { },
    ["hi" + "bye"]: true,
    [0 + 1]: 0,
    [+"hi"]: [0]
});

//// [computedPropertyNamesContextualType6_ES5.js]
var _a;
foo((_a = {
        p: "",
        0: function () { }
    },
    _a["hi" + "bye"] = true,
    _a[0 + 1] = 0,
    _a[+"hi"] = [0],
    _a));
