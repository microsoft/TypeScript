//// [tests/cases/conformance/async/es6/asyncUseStrict_es6.ts] ////

//// [asyncUseStrict_es6.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "use strict";
    var b = await p || a;
}

//// [asyncUseStrict_es6.js]
async function func() {
    "use strict";
    "use strict";
    var b = await p || a;
}
