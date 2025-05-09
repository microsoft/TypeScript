// @outFile: testfiles/fooResult.js
// @sourcemap: true
// @useCaseSensitiveFileNames: false
// @Filename: testFiles/app.ts
// Note in the out result we are using same folder name only different in casing
// Since this is non case sensitive, the relative paths should be just app.ts and app2.ts in the sourcemap
class c {
}

// @Filename: testFiles/app2.ts
class d {
}
