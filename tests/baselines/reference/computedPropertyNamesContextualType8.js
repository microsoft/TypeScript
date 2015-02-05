//// [computedPropertyNamesContextualType8.ts]
interface I {
    [s: string]: boolean;
    [s: number]: boolean;
}

var o: I = {
    [""+"foo"]: "",
    [""+"bar"]: 0
}

//// [computedPropertyNamesContextualType8.js]
var o = {
    ["" + "foo"]: "",
    ["" + "bar"]: 0
};
