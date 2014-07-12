// @declaration: true
module m {
    export class c {
    }
}
module m1 {
    import x = m.c;
    export var d = new x(); // emit the type as m.c
}
module m2 {
    export import x = m.c;
    export var d = new x(); // emit the type as x
}