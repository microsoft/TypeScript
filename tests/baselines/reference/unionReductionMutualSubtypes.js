//// [unionReductionMutualSubtypes.ts]
// Repro from #35414

interface ReturnVal {
    something(): void;
}

const k: ReturnVal = { something() { } }

declare const val: ReturnVal;
function run(options: { something?(b?: string): void }) {
    const something = options.something ?? val.something;
    something('');
}


//// [unionReductionMutualSubtypes.js]
"use strict";
// Repro from #35414
var k = { something: function () { } };
function run(options) {
    var _a;
    var something = (_a = options.something) !== null && _a !== void 0 ? _a : val.something;
    something('');
}
