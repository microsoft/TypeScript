//// [tests/cases/compiler/instantiateCrossFileMerge.ts] ////

//// [first.ts]
declare class P<R> {
    constructor(callback: (resolve: (value: R) => void) => void);
}

//// [second.ts]
interface P<R> { }
new P<string>(r => { r('foo') });


//// [first.js]
"use strict";
//// [second.js]
"use strict";
new P(r => { r('foo'); });
