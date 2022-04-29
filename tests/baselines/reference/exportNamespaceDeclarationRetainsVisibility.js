//// [exportNamespaceDeclarationRetainsVisibility.ts]
namespace X {
    interface A {
        kind: 'a';
    }

    interface B {
        kind: 'b';
    }

    export type C = A | B;
}

export = X;

//// [exportNamespaceDeclarationRetainsVisibility.js]
"use strict";
exports.__esModule = true;


//// [exportNamespaceDeclarationRetainsVisibility.d.ts]
declare namespace X {
    interface A {
        kind: 'a';
    }
    interface B {
        kind: 'b';
    }
    export type C = A | B;
    export {};
}
export = X;
