// @sourcemap: true
module m1 {
    var x = 10;
    export class c {
    }
}
module m1 {
    var b = new m1.c();
}