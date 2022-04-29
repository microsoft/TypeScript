//// [computedPropertyNamesContextualType7_ES5.ts]
interface I<T> {
    [n: number]: T;
}
interface J<T> {
    [s: string]: T;
}

declare function foo<T>(obj: I<T>): T;
declare function g<T>(obj: J<T>): T;

foo({
    0: () => { },
    ["hi" + "bye"]: true,
    [0 + 1]: 0,
    [+"hi"]: [0]
});

g({ p: "" });


//// [computedPropertyNamesContextualType7_ES5.js]
var _a;
foo((_a = {
        0: function () { }
    },
    _a["hi" + "bye"] = true,
    _a[0 + 1] = 0,
    _a[+"hi"] = [0],
    _a));
g({ p: "" });
