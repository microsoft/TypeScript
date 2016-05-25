//// [computedPropertyNamesContextualType7_ES6.ts]
interface I<T> {
    [s: number]: T;
}

declare function foo<T>(obj: I<T>): T

foo({
    101: "",
    0: () => { },
    ["hi" + "bye"]: true,
    [0 + 1]: 0,
    [+"hi"]: [0]
});


//// [computedPropertyNamesContextualType7_ES6.js]
foo({
    101: "",
    0: () => { },
    ["hi" + "bye"]: true,
    [0 + 1]: 0,
    [+"hi"]: [0]
});
