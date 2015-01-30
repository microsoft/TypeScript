//// [computedPropertyNamesContextualType6.ts]
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

//// [computedPropertyNamesContextualType6.js]
foo({
    p: "",
    0: function () {
    },
    ["hi" + "bye"]: true,
    [0 + 1]: 0,
    [+"hi"]: [0]
});
