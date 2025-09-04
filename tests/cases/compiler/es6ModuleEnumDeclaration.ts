// @target: ES6
export enum e1 {
    a,
    b,
    c
}
enum e2 {
    x,
    y,
    z
}
var x = e1.a;
var y = e2.x;
export namespace m1 {
    export enum e3 {
        a,
        b,
        c
    }
    enum e4 {
        x,
        y,
        z
    }
    var x1 = e1.a;
    var y1 = e2.x;
    var x2 = e3.a;
    var y2 = e4.x;
}
namespace m2 {
    export enum e5 {
        a,
        b,
        c
    }
    enum e6 {
        x,
        y,
        z
    }
    var x1 = e1.a;
    var y1 = e2.x;
    var x2 = e5.a;
    var y2 = e6.x;
    var x3 = m1.e3.a;
}