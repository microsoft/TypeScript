module M {
    function f() {
        var x;
    }
    var y;
    export var z;
    var test1=x;
    var test2=y; // y visible because same module
}

module N {
    var test3=M.y; // nope y private property of M
    var test4=M.z; // ok public property of M
}