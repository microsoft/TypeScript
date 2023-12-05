//// [tests/cases/compiler/sourceMap-SkippedNode.ts] ////

//// [sourceMap-SkippedNode.ts]
try {
// ...
} finally {
// N.B. No 'catch' block
}

//// [sourceMap-SkippedNode.js]
try {
    // ...
}
finally {
    // N.B. No 'catch' block
}
//# sourceMappingURL=sourceMap-SkippedNode.js.map