//// [classDeclarationBlockScoping1.ts]
class C {
}

{
    class C {
    }
}

//// [classDeclarationBlockScoping1.js]
var C = (function () {
    function C() {
    }
    return C;
})();
{
    var C = (function () {
        function C() {
        }
        return C;
    })();
}
