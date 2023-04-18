const ts = require("./built/local/typescript");

function compile(fileNames,options) {
  const program = ts.createProgram(fileNames, options);
  const emitResult = program.emit();
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    }
    else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  const exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);

  // My Code
  const astSourceFile = program.getSourceFile("input.ts");
  console.log(program.getSymbolCount());
  process.exit(exitCode);
}

compile(["./input.ts"], {
  strict: true,
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.CommonJS
});