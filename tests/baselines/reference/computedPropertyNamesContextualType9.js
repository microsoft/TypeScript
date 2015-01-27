//// [computedPropertyNamesContextualType9.ts]
interface I {
    [s: string]: boolean;
    [s: number]: boolean;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}

//// [computedPropertyNamesContextualType9.js]
var o = {
    [+"foo"]: "",
    [+"bar"]: 0
};
