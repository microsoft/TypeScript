//// [classDeclarationBlockScoping2.ts]
function f() {
    class C {}
    var c1 = C;
    {
        class C {}
        var c2 = C;
    }
    return C === c1;
}

//// [classDeclarationBlockScoping2.js]
function f() {
    var C = (function () {
        function C() {
        }
        return C;
    }());
    var c1 = C;
    {
        var C_1 = (function () {
            function C() {
            }
            return C;
        }());
        var c2 = C_1;
    }
    return C === c1;
}
