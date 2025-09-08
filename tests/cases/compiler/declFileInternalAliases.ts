// @declaration: true
namespace m {
    export class c {
    }
}
namespace m1 {
    import x = m.c;
    export var d = new x(); // emit the type as m.c
}
namespace m2 {
    export import x = m.c;
    export var d = new x(); // emit the type as x
}