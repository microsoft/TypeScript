/// <reference path="perfsys.ts"/>
/// <reference path="..\src\compiler\tsc.ts"/>

// resolve all files used in this compilation
if (perftest.hasLogIOFlag()) {
    perftest.interceptIO();

    const compilerHost: ts.CompilerHost = {
        getSourceFile: (s, v) => {
            const content = perftest.readFile(s);
            return content !== undefined ? ts.createSourceFile(s, content, v) : undefined;
        },
        getDefaultLibFileName: () => ts.combinePaths(ts.getDirectoryPath(ts.normalizePath(perftest.getExecutingFilePath())), "lib.d.ts"),
        writeFile: (f: string, content: string) => { throw new Error("Unexpected operation: writeFile"); },
        getCurrentDirectory: () => perftest.getCurrentDirectory(),
        getCanonicalFileName: (f: string) => ts.sys.useCaseSensitiveFileNames ? f : f.toLowerCase(),
        useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
        getNewLine: () => ts.sys.newLine
    };

    const commandLine = ts.parseCommandLine(perftest.getArgsWithoutLogIOFlag());
    const program = ts.createProgram(commandLine.fileNames, commandLine.options, compilerHost);
    const fileNames = program.getSourceFiles().map(f => f.fileName);
    perftest.writeIOLog(fileNames);
}
else {
    const io = perftest.prepare();
    ts.executeCommandLine(perftest.getArgsWithoutIOLogFile());
    perftest.write(io.getOut());
}
