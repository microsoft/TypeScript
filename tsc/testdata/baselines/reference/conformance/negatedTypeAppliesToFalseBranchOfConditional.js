//// [tests/cases/conformance/types/negated/negatedTypeAppliesToFalseBranchOfConditional.ts] ////

//// [negatedTypeAppliesToFalseBranchOfConditional.ts]
// https://github.com/Microsoft/TypeScript/issues/26240

type OnlyNumber<T extends number> = T;
type ToNumber<T extends number | string> =
    T extends string ? undefined : OnlyNumber<T>;


//// [negatedTypeAppliesToFalseBranchOfConditional.js]
"use strict";
// https://github.com/Microsoft/TypeScript/issues/26240
