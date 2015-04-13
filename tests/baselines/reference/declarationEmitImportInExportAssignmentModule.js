//// [declarationEmitImportInExportAssignmentModule.ts]

module m {
    export module c {
        export class c {
        }
    }
    import x = c;
    export var a: typeof x;
}
export = m;

//// [declarationEmitImportInExportAssignmentModule.js]
var m;
(function (m) {
    var c;
    (function (_c) {
        var c = (function () {
            function c() {
            }
            return c;
        })();
        _c.c = c;
    })(c = m.c || (m.c = {}));
    m.a;
})(m || (m = {}));
module.exports = m;


//// [declarationEmitImportInExportAssignmentModule.d.ts]
declare module m {
    module c {
        class c {
        }
    }
    import x = c;
    var a: typeof x;
}
export = m;
