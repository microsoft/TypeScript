// @declaration: true

module m1 {
    export class c {
    }
}
var d = {
    m1: { m: m1 },
    m2: { c: m1.c },
};