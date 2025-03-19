//// [tests/cases/compiler/overloadModifiersMustAgree.ts] ////

//// [overloadModifiersMustAgree.ts]
class baz {
    public foo();
    private foo(bar?: any) { } // error - access modifiers do not agree
}

declare function bar();
export function bar(s: string);
function bar(s?: string) { }

interface I {
    foo? ();
    foo(s: string);
}



//// [overloadModifiersMustAgree.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class baz {
    foo(bar) { } // error - access modifiers do not agree
}
function bar(s) { }
