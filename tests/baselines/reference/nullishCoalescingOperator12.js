//// [nullishCoalescingOperator12.ts]
const obj: { arr: any[] } = { arr: [] };
for (const i of obj?.arr ?? []) { }


//// [nullishCoalescingOperator12.js]
"use strict";
var _a;
const obj = { arr: [] };
for (const i of (_a = obj === null || obj === void 0 ? void 0 : obj.arr) !== null && _a !== void 0 ? _a : []) { }
