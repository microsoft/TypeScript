//// [nullishCoalescingOperator9.ts]
declare let f: null | ((x: string) => void);

let g = f || (abc => { void abc.toLowerCase() })
let gg = f ?? (abc => { void abc.toLowerCase() })


//// [nullishCoalescingOperator9.js]
"use strict";
var g = f || (function (abc) { void abc.toLowerCase(); });
var gg = f !== null && f !== void 0 ? f : (function (abc) { void abc.toLowerCase(); });
