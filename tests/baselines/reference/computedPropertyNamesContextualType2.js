//// [computedPropertyNamesContextualType2.ts]
interface I {
    [s: string]: (x: any) => number; // Doesn't get hit
    [s: number]: (x: string) => number;
}

var o: I = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
}

//// [computedPropertyNamesContextualType2.js]
var o = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => { return y.length; }
};
