//// [inferTypes2.ts]
// Repro from #22755

export declare function foo<T>(obj: T): T extends () => infer P ? P : never;
export function bar<T>(obj: T) {
    return foo(obj);
}


//// [inferTypes2.js]
"use strict";
// Repro from #22755
exports.__esModule = true;
function bar(obj) {
    return foo(obj);
}
exports.bar = bar;


//// [inferTypes2.d.ts]
export declare function foo<T>(obj: T): T extends () => infer P ? P : never;
export declare function bar<T>(obj: T): T extends () => infer P ? P : never;
