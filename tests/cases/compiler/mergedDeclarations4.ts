module M {
    export function f() { }
    f();
    M.f();    
    var r = f.hello;
}
 
module M {
    export module f {
        export var hello = 1;
    }
    f();
    M.f();
    var r = f.hello;
}
 
M.f();
M.f.hello;