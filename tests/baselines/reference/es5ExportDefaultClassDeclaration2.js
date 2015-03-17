//// [es5ExportDefaultClassDeclaration2.ts]

export default class {
    method() { }
}


//// [es5ExportDefaultClassDeclaration2.js]
var _default = (function () {
    function _default() {
    }
    _default.prototype.method = function () {
    };
    return _default;
})();
module.exports = _default;


//// [es5ExportDefaultClassDeclaration2.d.ts]
export declare class  {
    method(): void;
}


//// [DtsFileErrors]


tests/cases/compiler/es5ExportDefaultClassDeclaration2.d.ts(1,1): error TS1128: Declaration or statement expected.
tests/cases/compiler/es5ExportDefaultClassDeclaration2.d.ts(1,8): error TS2304: Cannot find name 'declare'.
tests/cases/compiler/es5ExportDefaultClassDeclaration2.d.ts(1,16): error TS1005: ';' expected.
tests/cases/compiler/es5ExportDefaultClassDeclaration2.d.ts(2,5): error TS2304: Cannot find name 'method'.
tests/cases/compiler/es5ExportDefaultClassDeclaration2.d.ts(2,13): error TS1005: ';' expected.
tests/cases/compiler/es5ExportDefaultClassDeclaration2.d.ts(2,19): error TS1109: Expression expected.


==== tests/cases/compiler/es5ExportDefaultClassDeclaration2.d.ts (6 errors) ====
    export declare class  {
    ~~~~~~
!!! error TS1128: Declaration or statement expected.
           ~~~~~~~
!!! error TS2304: Cannot find name 'declare'.
                   ~~~~~
!!! error TS1005: ';' expected.
        method(): void;
        ~~~~~~
!!! error TS2304: Cannot find name 'method'.
                ~
!!! error TS1005: ';' expected.
                      ~
!!! error TS1109: Expression expected.
    }
    