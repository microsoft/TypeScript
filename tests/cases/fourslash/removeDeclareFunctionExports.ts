/// <reference path="fourslash.ts" />

////declare namespace M {
////    function RegExp2(pattern: string): RegExp2;
////    export function RegExp2(pattern: string, flags: string): RegExp2;
////}

goTo.bof();
edit.deleteAtCaret('declare '.length);