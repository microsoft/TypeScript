//// [es6ExportDefaultAnonymousFunctionDeclaration.ts]

export default function () {
}

//// [es6ExportDefaultAnonymousFunctionDeclaration.js]
function () {
}
exports. = ;


//// [es6ExportDefaultAnonymousFunctionDeclaration.d.ts]
export declare function (): void;


//// [DtsFileErrors]


tests/cases/compiler/es6ExportDefaultAnonymousFunctionDeclaration.d.ts(1,25): error TS1003: Identifier expected.


==== tests/cases/compiler/es6ExportDefaultAnonymousFunctionDeclaration.d.ts (1 errors) ====
    export declare function (): void;
                            ~
!!! error TS1003: Identifier expected.
    