// @target: es6
interface I {
    [s: string]: boolean;
    [s: number]: boolean;
}

var o: I = {
    [""+"foo"]: "",
    [""+"bar"]: 0
}