//// [tests/cases/conformance/types/literal/templateLiteralTypesPatternsPrefixSuffixAssignability.ts] ////

//// [templateLiteralTypesPatternsPrefixSuffixAssignability.ts]
const s1: `:${string}:` = ":"; // should error
const s2: `:${string}:` = "::"; // ok
const s3: `:${string}:${string}:` = "::"; // should error
const s4: `:${string}:${string}:` = ":::"; // ok

//// [templateLiteralTypesPatternsPrefixSuffixAssignability.js]
const s1 = ":";
const s2 = "::";
const s3 = "::";
const s4 = ":::";
