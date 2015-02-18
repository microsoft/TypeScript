// @target: ES6
export module m {
    export var a = 10;
}
export import a1 = m.a;
import a2 = m.a;
var x = a1 + a2;
export module m1 {
    export import a3 = m.a;
    import a4 = m.a;
    var x = a1 + a2;
    var x2 = a3 + a4;
}
module m2 {
    export import a3 = m.a;
    import a4 = m.a;
    var x = a1 + a2;
    var x2 = a3 + a4;
    var x4 = m1.a3 + m2.a3;
}