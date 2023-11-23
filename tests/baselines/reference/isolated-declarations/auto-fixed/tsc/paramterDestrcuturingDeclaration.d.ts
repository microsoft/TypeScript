//// [tests/cases/compiler/paramterDestrcuturingDeclaration.ts] ////

//// [paramterDestrcuturingDeclaration.ts]
interface C {
    ({p: name}: {
            p: any;
        }): any;
    new ({p: boolean}: {
            p: any;
        }): any;
}


/// [Declarations] ////



//// [paramterDestrcuturingDeclaration.d.ts]
interface C {
    ({ p }: {
        p: any;
    }): any;
    new ({ p }: {
        p: any;
    }): any;
}
//# sourceMappingURL=paramterDestrcuturingDeclaration.d.ts.map
/// [Errors] ////

paramterDestrcuturingDeclaration.ts(2,10): error TS2842: 'name' is an unused renaming of 'p'. Did you intend to use it as a type annotation?
paramterDestrcuturingDeclaration.ts(5,14): error TS2842: 'boolean' is an unused renaming of 'p'. Did you intend to use it as a type annotation?


==== paramterDestrcuturingDeclaration.ts (2 errors) ====
    interface C {
        ({p: name}: {
             ~~~~
!!! error TS2842: 'name' is an unused renaming of 'p'. Did you intend to use it as a type annotation?
                p: any;
            }): any;
        new ({p: boolean}: {
                 ~~~~~~~
!!! error TS2842: 'boolean' is an unused renaming of 'p'. Did you intend to use it as a type annotation?
                p: any;
            }): any;
    }
    