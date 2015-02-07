//// [computedPropertyNamesContextualType1.ts]
interface I {
    [s: string]: (x: string) => number;
    [s: number]: (x: any) => number; // Doesn't get hit
}

var o: I = {
    ["" + 0](y) { return y.length; },
    ["" + 1]: y => y.length
}

//// [computedPropertyNamesContextualType1.js]
var o = {
    ["" + 0](y) { return y.length; },
    ["" + 1]: y => { return y.length; }
};
