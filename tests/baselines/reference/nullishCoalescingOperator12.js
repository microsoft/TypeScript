//// [nullishCoalescingOperator12.ts]
const obj: { arr: any[] } = { arr: [] };
for (const i of obj?.arr ?? []) { }


//// [nullishCoalescingOperator12.js]
"use strict";
var _a, _b;
const obj = { arr: [] };
for (const i of (_b = (_a = obj) === null || _a === void 0 ? void 0 : _a.arr, (_b !== null && _b !== void 0 ? _b : []))) { }
