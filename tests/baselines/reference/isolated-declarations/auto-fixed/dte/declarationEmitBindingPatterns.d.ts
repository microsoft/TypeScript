//// [tests/cases/compiler/declarationEmitBindingPatterns.ts] ////

//// [declarationEmitBindingPatterns.ts]
const k = ({x: z = 'y'}: {
        x?: string;
    }): void => { }

var a: any;
function f({}: any = a, []: any = a, { p: {} = a}: any = a): void {
}

/// [Declarations] ////



//// [declarationEmitBindingPatterns.d.ts]
declare const k: ({ x }: {
    x?: string;
}) => void;
declare var a: any;
declare function f({}?: any, []?: any, { p: {} }?: any): void;
//# sourceMappingURL=declarationEmitBindingPatterns.d.ts.map