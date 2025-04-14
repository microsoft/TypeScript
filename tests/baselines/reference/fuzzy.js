//// [tests/cases/compiler/fuzzy.ts] ////

//// [fuzzy.ts]
module M {
    export interface I {
        works:()=>R;
        alsoWorks:()=>R;
        doesntWork:()=>R;
    }

    export interface R {
        anything:number;
        oneI:I;
    }

    export class C implements I {
        constructor(public x:number) {
        }
        works():R {
            return <R>({ anything: 1 });
        }

        doesntWork():R {
            return { anything:1, oneI:this };
        }

        worksToo():R {
            return <R>({ oneI: this });
        }
    }
}



//// [fuzzy.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C(x) {
            this.x = x;
        }
        C.prototype.works = function () {
            return ({ anything: 1 });
        };
        C.prototype.doesntWork = function () {
            return { anything: 1, oneI: this };
        };
        C.prototype.worksToo = function () {
            return ({ oneI: this });
        };
        return C;
    }());
    M.C = C;
})(M || (M = {}));
