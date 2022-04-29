//// [computedPropertyNamesContextualType9_ES6.ts]
interface I {
    [s: string]: boolean;
    [s: number]: boolean;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}

//// [computedPropertyNamesContextualType9_ES6.js]
var o = {
    [+"foo"]: "",
    [+"bar"]: 0
};
