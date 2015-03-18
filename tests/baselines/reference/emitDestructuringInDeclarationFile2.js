//// [emitDestructuringInDeclarationFile2.ts]
module M {
    class c { }
    export var {b} = {
        b: new c()
    };
    export var {a}: { a: c };
}


//// [emitDestructuringInDeclarationFile2.js]
var M;
(function (M) {
    var c = (function () {
        function c() {
        }
        return c;
    })();
    M.b = ({
        b: new c()
    }).b;
    M.a = (void 0).a;
})(M || (M = {}));
