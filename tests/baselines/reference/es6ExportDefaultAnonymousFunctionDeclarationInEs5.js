//// [es6ExportDefaultAnonymousFunctionDeclarationInEs5.ts]

export default function () {
}

//// [es6ExportDefaultAnonymousFunctionDeclarationInEs5.js]
function () {
}
exports. = ;


//// [es6ExportDefaultAnonymousFunctionDeclarationInEs5.d.ts]
export declare function (): void;


//// [DtsFileErrors]


tests/cases/compiler/es6ExportDefaultAnonymousFunctionDeclarationInEs5.d.ts(1,25): error TS1003: Identifier expected.


==== tests/cases/compiler/es6ExportDefaultAnonymousFunctionDeclarationInEs5.d.ts (1 errors) ====
    export declare function (): void;
                            ~
!!! error TS1003: Identifier expected.
    