//// [conditionalSubstitutionInferencesLowerPriority.ts]
type TestType<Keys extends string> = string extends Keys ? Record<Keys, string> : Record<Keys, string>

function inferHelper<Keys extends string>(data: TestType<Keys>) {
    return data;
}

export const a = inferHelper({
    // key1 is inferred to be value1 here
    key1: "value1"
})

//// [conditionalSubstitutionInferencesLowerPriority.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
function inferHelper(data) {
    return data;
}
exports.a = inferHelper({
    // key1 is inferred to be value1 here
    key1: "value1"
});
