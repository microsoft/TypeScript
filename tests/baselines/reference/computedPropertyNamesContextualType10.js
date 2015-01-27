//// [computedPropertyNamesContextualType10.ts]
interface I {
    [s: number]: boolean;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}

//// [computedPropertyNamesContextualType10.js]
var o = {
    [+"foo"]: "",
    [+"bar"]: 0
};
