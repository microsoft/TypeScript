// @includeBuiltFile: typescriptServices.d.ts
// @noImplicitAny: true
// @target: ES3

var sourceFile = ts.createSourceFile("file1.ts", "var x = 0;", ts.ScriptTarget.Latest);

var program = ts.createProgram(["file1.ts"], {}, undefined);