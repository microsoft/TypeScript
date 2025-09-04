namespace M {
    export function f() { }
    f();
    M.f();    
    var r = f.hello;
}
 
namespace M {
    export namespace f {
        export var hello = 1;
    }
    f();
    M.f();
    var r = f.hello;
}
 
M.f();
M.f.hello;