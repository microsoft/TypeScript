//// [emitDestructuringInDeclarationFile1.ts]
module M {
    export class c { }
    export var {b} = {
        b: new c()
    };
    export var {a}: { a: c };
}


//// [emitDestructuringInDeclarationFile1.js]
var M;
(function (M) {
    var c = (function () {
        function c() {
        }
        return c;
    })();
    M.c = c;
    M.b = ({
        b: new c()
    }).b;
    M.a = (void 0).a;
})(M || (M = {}));


//// [emitDestructuringInDeclarationFile1.d.ts]
declare module M {
    class c {
    }
    var b: c;
    var a: c;
}
