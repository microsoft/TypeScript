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

