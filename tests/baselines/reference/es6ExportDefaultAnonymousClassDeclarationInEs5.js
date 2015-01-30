//// [es6ExportDefaultAnonymousClassDeclarationInEs5.ts]

export default class {
    member = 10;
}

//// [es6ExportDefaultAnonymousClassDeclarationInEs5.js]
var  = (function () {
    function () {
        this.member = 10;
    }
    return ;
})();
exports. = ;


//// [es6ExportDefaultAnonymousClassDeclarationInEs5.d.ts]
export declare class  {
    member: number;
}


//// [DtsFileErrors]


tests/cases/compiler/es6ExportDefaultAnonymousClassDeclarationInEs5.d.ts(1,1): error TS1128: Declaration or statement expected.
tests/cases/compiler/es6ExportDefaultAnonymousClassDeclarationInEs5.d.ts(1,8): error TS2304: Cannot find name 'declare'.
tests/cases/compiler/es6ExportDefaultAnonymousClassDeclarationInEs5.d.ts(1,16): error TS1005: ';' expected.
tests/cases/compiler/es6ExportDefaultAnonymousClassDeclarationInEs5.d.ts(2,13): error TS2304: Cannot find name 'number'.


==== tests/cases/compiler/es6ExportDefaultAnonymousClassDeclarationInEs5.d.ts (4 errors) ====
    export declare class  {
    ~~~~~~
!!! error TS1128: Declaration or statement expected.
           ~~~~~~~
!!! error TS2304: Cannot find name 'declare'.
                   ~~~~~
!!! error TS1005: ';' expected.
        member: number;
                ~~~~~~
!!! error TS2304: Cannot find name 'number'.
    }
    