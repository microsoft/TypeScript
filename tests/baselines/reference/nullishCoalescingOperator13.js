//// [nullishCoalescingOperator13.ts]
// Repro from #44988
type T =
  | { a: string; b: string }
  | { a: string; b?: undefined }
  | { a?: undefined; b: string };

const getResult1 = (value1: string | undefined, value2: T): string => {
  return value1 ?? value2.a ?? value2.b;
};


//// [nullishCoalescingOperator13.js]
"use strict";
const getResult1 = (value1, value2) => {
    var _a;
    return (_a = value1 !== null && value1 !== void 0 ? value1 : value2.a) !== null && _a !== void 0 ? _a : value2.b;
};
