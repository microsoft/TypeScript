// @target: es5
interface I {
    [s: number]: boolean;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}