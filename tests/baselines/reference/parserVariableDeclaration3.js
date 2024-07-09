//// [tests/cases/conformance/parser/ecmascript5/VariableDeclarations/parserVariableDeclaration3.ts] ////

//// [parserVariableDeclaration3.ts]
function runTests() {
    var outfile = new Harness.Compiler.WriterAggregator()
      , outerr = new Harness.Compiler.WriterAggregator()
      , compiler = <TypeScript.TypeScriptCompiler>new TypeScript.TypeScriptCompiler(outerr)
      , code;
}

//// [parserVariableDeclaration3.js]
function runTests() {
    var outfile = new Harness.Compiler.WriterAggregator(), outerr = new Harness.Compiler.WriterAggregator(), compiler = new TypeScript.TypeScriptCompiler(outerr), code;
}
