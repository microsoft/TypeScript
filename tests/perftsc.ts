/// <reference path="perfsys.ts"/>
/// <reference path="..\src\compiler\tsc.ts"/>

// resolve all files used in this compilation

ts.optionDeclarations.push({
    name: "logio",
    type: "string",
    isFilePath: true
})

var commandLine = ts.parseCommandLine(ts.sys.args);
commandLine.options.diagnostics = true

var logIoPath = commandLine.options['logio'];
if (logIoPath) {
    perftest.interceptIO();

    var compilerHost: ts.CompilerHost = {
        getSourceFile: (s, v) => {
            var content = perftest.readFile(s);
            return content !== undefined ? ts.createSourceFile(s, content, v) : undefined;
        },
        getDefaultLibFileName: () => ts.combinePaths(ts.getDirectoryPath(ts.normalizePath(perftest.getExecutingFilePath())), "lib.d.ts"),
        writeFile: (f: string, content: string) => { throw new Error("Unexpected operation: writeFile"); },
        getCurrentDirectory: () => perftest.getCurrentDirectory(),
        getCanonicalFileName: (f: string) => ts.sys.useCaseSensitiveFileNames ? f : f.toLowerCase(),
        useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
        getNewLine: () => ts.sys.newLine
    };

    var program = ts.createProgram(commandLine.fileNames, commandLine.options, compilerHost);
    var fileNames = program.getSourceFiles().map(f => f.fileName);
    perftest.writeIOLog(fileNames, "" + logIoPath);
}
else {
    var io = perftest.prepare(commandLine);
    ts.executeCommand(commandLine);

    perftest.write(io.getOut());
}
