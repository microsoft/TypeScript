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
    class C {
        x;
        constructor(x) {
            this.x = x;
        }
        works() {
            return ({ anything: 1 });
        }
        doesntWork() {
            return { anything: 1, oneI: this };
        }
        worksToo() {
            return ({ oneI: this });
        }
    }
    M.C = C;
})(M || (M = {}));
