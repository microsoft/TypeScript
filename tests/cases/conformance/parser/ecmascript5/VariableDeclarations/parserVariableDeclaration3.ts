function runTests() {
    var outfile = new Harness.Compiler.WriterAggregator()
      , outerr = new Harness.Compiler.WriterAggregator()
      , compiler = <TypeScript.TypeScriptCompiler>new TypeScript.TypeScriptCompiler(outerr)
      , code;
}