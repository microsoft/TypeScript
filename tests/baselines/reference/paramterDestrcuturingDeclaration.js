//// [tests/cases/compiler/paramterDestrcuturingDeclaration.ts] ////

//// [paramterDestrcuturingDeclaration.ts]
interface C {
    ({p: name}): any;
    new ({p: boolean}): any;
}


//// [paramterDestrcuturingDeclaration.js]


//// [paramterDestrcuturingDeclaration.d.ts]
interface C {
    ({ p }: {
        p: any;
    }): any;
    new ({ p }: {
        p: any;
    }): any;
}
