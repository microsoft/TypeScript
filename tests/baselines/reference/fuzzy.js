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
    var C = (function () {
        function C(x) {
            this.x = x;
        }
        var proto_1 = C.prototype;
        proto_1.works = function () {
            return ({ anything: 1 });
        };
        proto_1.doesntWork = function () {
            return { anything: 1, oneI: this };
        };
        proto_1.worksToo = function () {
            return ({ oneI: this });
        };
        return C;
    }());
    M.C = C;
})(M || (M = {}));
