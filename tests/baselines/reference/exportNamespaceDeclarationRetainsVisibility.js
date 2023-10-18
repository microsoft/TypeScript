//// [tests/cases/compiler/exportNamespaceDeclarationRetainsVisibility.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });


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
