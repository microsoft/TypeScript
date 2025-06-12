//// [tests/cases/conformance/async/es5/asyncUseStrict_es5.ts] ////

//// [asyncUseStrict_es5.ts]
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "use strict";
    var b = await p || a;
}

//// [asyncUseStrict_es5.js]
function func() {
    return __awaiter(this, void 0, void 0, function* () {
        "use strict";
        var b = (yield p) || a;
    });
}
