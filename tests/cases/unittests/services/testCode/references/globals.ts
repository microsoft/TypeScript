// Global variable reference

var ^^global = 2;

class foo {
    constructor (public global) { }
    public f(global) { }
    public f2(global) { }
}

class bar {
    constructor () {
        var n = [|global|];

        var f = new foo('');
        f.global = '';
    }
}

var k = [|global|];

================
var m = [|global|];