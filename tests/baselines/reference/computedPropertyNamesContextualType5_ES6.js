//// [computedPropertyNamesContextualType5_ES6.ts]
interface I {
    [s: string]: any;
    [s: number]: any;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}

//// [computedPropertyNamesContextualType5_ES6.js]
var o = {
    [+"foo"]: "",
    [+"bar"]: 0
};
