// @target: es5, es2015
interface I {
    [s: string]: any;
    [s: number]: any;
}

var o: I = {
    [""+"foo"]: "",
    [""+"bar"]: 0
}