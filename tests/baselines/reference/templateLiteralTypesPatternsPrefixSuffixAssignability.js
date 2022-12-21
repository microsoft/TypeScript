//// [templateLiteralTypesPatternsPrefixSuffixAssignability.ts]
const s1: `:${string}:` = ":"; // should error
const s2: `:${string}:` = "::"; // ok
const s3: `:${string}:${string}:` = "::"; // should error
const s4: `:${string}:${string}:` = ":::"; // ok

//// [templateLiteralTypesPatternsPrefixSuffixAssignability.js]
var s1 = ":"; // should error
var s2 = "::"; // ok
var s3 = "::"; // should error
var s4 = ":::"; // ok
