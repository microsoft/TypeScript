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
exports.__esModule = true;
var baz = /** @class */ (function () {
    function baz() {
    }
    baz.prototype.foo = function (bar) { }; // error - access modifiers do not agree
    return baz;
}());
function bar(s) { }
