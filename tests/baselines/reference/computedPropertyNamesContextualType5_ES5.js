//// [computedPropertyNamesContextualType5_ES5.ts]
interface I {
    [s: string]: any;
    [s: number]: any;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}

//// [computedPropertyNamesContextualType5_ES5.js]
var o = {
    [+"foo"]: "",
    [+"bar"]: 0
};
