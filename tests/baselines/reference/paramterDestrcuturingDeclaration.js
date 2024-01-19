//// [tests/cases/compiler/paramterDestrcuturingDeclaration.ts] ////

//// [paramterDestrcuturingDeclaration.ts]
interface C {
    ({p: name}): any;
    new ({p: boolean}): any;
}


//// [paramterDestrcuturingDeclaration.js]


//// [paramterDestrcuturingDeclaration.d.ts]
interface C {
    ({ p: name }: {
        p: any;
    }): any;
    new ({ p: boolean }: {
        p: any;
    }): any;
}
