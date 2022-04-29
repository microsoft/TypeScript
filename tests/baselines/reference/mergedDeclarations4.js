//// [mergedDeclarations4.ts]
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

//// [mergedDeclarations4.js]
var M;
(function (M) {
    function f() { }
    M.f = f;
    f();
    M.f();
    var r = f.hello;
})(M || (M = {}));
(function (M) {
    var f;
    (function (f) {
        f.hello = 1;
    })(f = M.f || (M.f = {}));
    f();
    M.f();
    var r = f.hello;
})(M || (M = {}));
M.f();
M.f.hello;
