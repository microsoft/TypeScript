//// [nullishCoalescingOperator10.ts]
declare function f(): string | undefined;

let gg = f() ?? 'foo'



//// [nullishCoalescingOperator10.js]
"use strict";
var _a;
var gg = (_a = f(), (_a !== null && _a !== void 0 ? _a : 'foo'));
