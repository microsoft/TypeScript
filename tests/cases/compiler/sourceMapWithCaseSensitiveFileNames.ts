// @outFile: testfiles/fooResult.js
// @sourcemap: true
// @useCaseSensitiveFileNames: true
// @Filename: testFiles/app.ts
// Note in the out result we are using same folder name only different in casing
// Since this is case sensitive, the folders are different and hence the relative paths in sourcemap shouldn't be just app.ts or app2.ts
class c {
}

// @Filename: testFiles/app2.ts
class d {
}
