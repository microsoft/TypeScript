//// [es5ExportDefaultFunctionDeclaration2.ts]

export default function () { }


//// [es5ExportDefaultFunctionDeclaration2.js]
function () {
}
module.exports = _default;


//// [es5ExportDefaultFunctionDeclaration2.d.ts]
export declare function (): void;


//// [DtsFileErrors]


tests/cases/compiler/es5ExportDefaultFunctionDeclaration2.d.ts(1,25): error TS1003: Identifier expected.


==== tests/cases/compiler/es5ExportDefaultFunctionDeclaration2.d.ts (1 errors) ====
    export declare function (): void;
                            ~
!!! error TS1003: Identifier expected.
    