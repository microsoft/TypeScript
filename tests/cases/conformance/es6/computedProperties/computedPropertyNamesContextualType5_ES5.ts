// @target: es5
interface I {
    [s: string]: any;
    [s: number]: any;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}