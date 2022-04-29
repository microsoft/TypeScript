//// [typeAliasDeclarationEmit2.ts]
export type A<a> = { value: a };

//// [typeAliasDeclarationEmit2.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});


//// [typeAliasDeclarationEmit2.d.ts]
export declare type A<a> = {
    value: a;
};
