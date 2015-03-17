//// [es6ExportDefaultFunctionDeclaration2.ts]

export default function () { }


//// [es6ExportDefaultFunctionDeclaration2.js]
export default function () {
}


//// [es6ExportDefaultFunctionDeclaration2.d.ts]
export declare function (): void;


//// [DtsFileErrors]


tests/cases/compiler/es6ExportDefaultFunctionDeclaration2.d.ts(1,25): error TS1003: Identifier expected.


==== tests/cases/compiler/es6ExportDefaultFunctionDeclaration2.d.ts (1 errors) ====
    export declare function (): void;
                            ~
!!! error TS1003: Identifier expected.
    