//// [tests/cases/compiler/invalidContinueInDownlevelAsync.ts] ////

//// [invalidContinueInDownlevelAsync.ts]
async function func() {
    if (true) {
        continue;
    }
    else {
        await 1;
    }
}

//// [invalidContinueInDownlevelAsync.js]
"use strict";
async function func() {
    if (true) {
        continue;
    }
    else {
        await 1;
    }
}
