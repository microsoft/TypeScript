//// [tests/cases/conformance/async/es2017/asyncUseStrict_es2017.ts] ////

//// [asyncUseStrict_es2017.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "use strict";
    var b = await p || a;
}

//// [asyncUseStrict_es2017.js]
async function func() {
    "use strict";
    var b = await p || a;
}
