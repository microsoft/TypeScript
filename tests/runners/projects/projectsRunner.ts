///<reference path="../../../src/harness/harness.ts" />
///<reference path="../../../src/harness/exec.ts" />
///<reference path="../runnerBase.ts" />

class SourceFile {
    constructor(public scriptSnapshot: TypeScript.IScriptSnapshot, public byteOrderMark: TypeScript.ByteOrderMark) {
    }
}

class HarnessBatch implements TypeScript.IReferenceResolverHost {
    private host: TypeScript.IIO;
    public errout: Harness.Compiler.WriterAggregator;
    private inputFiles: string[];
    private resolvedFiles: TypeScript.IResolvedFile[];
    private fileNameToSourceFile = new TypeScript.StringHashTable<SourceFile>();
    public sourcemapRecord = new Harness.Compiler.WriterAggregator();
    public compilationSettings: TypeScript.ImmutableCompilationSettings;

    constructor(
        getDeclareFiles: boolean,
        generateMapFiles: boolean,
        outFileOption: string,
        outDirOption: string,
        mapRoot: string,
        sourceRoot: string,
        compilationSettings: TypeScript.CompilationSettings) {

        this.host = TypeScript.IO;
        compilationSettings.generateDeclarationFiles = getDeclareFiles;
        compilationSettings.mapSourceFiles = generateMapFiles;
        compilationSettings.outFileOption = outFileOption;
        compilationSettings.outDirOption = outDirOption;
        compilationSettings.mapRoot = mapRoot;
        compilationSettings.sourceRoot = sourceRoot;
        // todo: change this and update baselines
        compilationSettings.removeComments = true;

        this.compilationSettings = TypeScript.ImmutableCompilationSettings.fromCompilationSettings(compilationSettings);
        this.errout = new Harness.Compiler.WriterAggregator();
    }

    private resolve() {
        var resolvedFiles: TypeScript.IResolvedFile[];

        // Resolve references
        var resolutionResults = TypeScript.ReferenceResolver.resolve(this.inputFiles, this,
            this.compilationSettings.useCaseSensitiveFileResolution());
        resolvedFiles = resolutionResults.resolvedFiles;

        // Populate any diagnostic messages generated during resolution
        for (var i = 0, n = resolutionResults.diagnostics.length; i < n; i++) {
            this.addDiagnostic(resolutionResults.diagnostics[i]);
        }

        // Add the library file if needed
        if (!this.compilationSettings.noLib() && !resolutionResults.seenNoDefaultLibTag) {
            var libraryPath = Harness.userSpecifiedroot + 'tests/minimal.lib.d.ts';
            resolvedFiles.unshift({ path: libraryPath, referencedFiles: [], importedFiles: [] });
        }

        this.resolvedFiles = resolvedFiles;
    }

    /// Do the actual compilation reading from input files and
    /// writing to output file(s).
    private compile(
        writeEmitFile: (path: string, contents: string, writeByteOrderMark: boolean) => void,
        writeDeclareFile: (path: string, contents: string, writeByteOrderMark: boolean) => void,
        sourceMapEmitterCallback: Harness.SourceMapEmitterCallback) {

        var compiler: TypeScript.TypeScriptCompiler;

        compiler = new TypeScript.TypeScriptCompiler();
        compiler.setCompilationSettings(this.compilationSettings);

        for (var iCode = 0; iCode < this.resolvedFiles.length; iCode++) {
            var code = this.resolvedFiles[iCode];

            try {
                var sourceFile = this.getSourceFile(code.path);
                var soruceScriptSnapshot = sourceFile.scriptSnapshot;
                var sourceText = soruceScriptSnapshot.getText(0, soruceScriptSnapshot.getLength());

                // Log any bugs associated with the test
                //Harness.Assert.bugs(sourceText);

                compiler.addFile(code.path, soruceScriptSnapshot, sourceFile.byteOrderMark, /*version:*/ 0, /*isOpen:*/ true, code.referencedFiles);
            }
            catch (err) {
                // This includes syntax errors thrown from error callback if not in recovery mode
                if (this.errout != null) {
                    this.errout.WriteLine(err.message)
                } else {
                    this.host.stderr.WriteLine(err.message);
                }
            }
        }

            for (var i = compiler.compile(path => TypeScript.IO.resolvePath(path)); i.moveNext();) {
            var result = i.current();

            result.diagnostics.forEach(d => this.addDiagnostic(d));
            result.outputFiles.forEach(o => {
                var write = o.fileType === TypeScript.OutputFileType.Declaration ? writeDeclareFile : writeEmitFile;
                write(o.name, o.text, o.writeByteOrderMark);

                o.sourceMapEntries.forEach(s => sourceMapEmitterCallback(
                    s.emittedFile, s.emittedLine, s.emittedColumn, s.sourceFile, s.sourceLine, s.sourceColumn, s.sourceName));
            });
        }

        if (this.errout) {
            this.errout.Close();
        }
    }

    // Execute the provided inputs
    private run() {
        for (var i = 0; i < this.resolvedFiles.length; i++) {
            var unit = this.resolvedFiles[i];
            var outputFileName = unit.path.replace(/\.ts$/, ".js");
            var unitRes = this.host.readFile(outputFileName, /*codepage:*/ null).contents;
            this.host.run(unitRes, outputFileName);
        }
    }

    /// Begin batch compilation
    public harnessCompile(
        files: string[],
        writeEmitFiles: (path: string, contents: string, writeByteOrderMark: boolean) => void,
        writeDeclareFile: (path: string, contents: string, writeByteOrderMark: boolean) => void,
        sourceMapEmitterCallback: Harness.SourceMapEmitterCallback) {

        TypeScript.CompilerDiagnostics.diagnosticWriter = { Alert: function (s: string) { this.host.printLine(s); } };

        this.errout.reset();

        this.inputFiles = files;

        // resolve file dependencies
        this.resolve();

        this.compile(writeEmitFiles, writeDeclareFile, sourceMapEmitterCallback);
    }

    public getResolvedFilePaths(): string[] {
        var paths: string[] = [];
        for (var i = 1; i < this.resolvedFiles.length; i++) {
            paths.push(this.resolvedFiles[i].path);
        }

        return paths;
    }

    private getSourceFile(fileName: string): SourceFile {
        var sourceFile: SourceFile = this.fileNameToSourceFile.lookup(fileName);
        if (!sourceFile) {
            var fileInformation = this.host.readFile(fileName, /*codepage:*/ null);
            var snapshot = TypeScript.ScriptSnapshot.fromString(fileInformation.contents);
            var sourceFile = new SourceFile(snapshot, fileInformation.byteOrderMark);
            this.fileNameToSourceFile.add(fileName, sourceFile);
        }

        return sourceFile;
    }

    /// TypeScript.IReferenceResolverHost methods
    getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot {
        return this.getSourceFile(fileName).scriptSnapshot;
    }

    resolveRelativePath(path: string, directory: string): string {
        var unQuotedPath = TypeScript.stripStartAndEndQuotes(path);
        var normalizedPath: string;

        if (TypeScript.isRooted(unQuotedPath) || !directory) {
            normalizedPath = unQuotedPath;
        } else {
            normalizedPath = TypeScript.IOUtils.combine(directory, unQuotedPath);
        }

        // get the absolute path
        normalizedPath = this.host.resolvePath(normalizedPath);

        // Switch to forward slashes
        normalizedPath = TypeScript.switchToForwardSlashes(normalizedPath);

        return normalizedPath;
    }

    fileExists(path: string): boolean {
        return this.host.fileExists(path);
    }

    directoryExists(path: string): boolean {
        return this.host.directoryExists(path);
    }

    getParentDirectory(path: string): string {
        return this.host.dirName(path);
    }

    /// TypeScript.IDiagnosticReporter methods
    addDiagnostic(diagnostic: TypeScript.Diagnostic) {
        this.errout.WriteLine(TypeScript.TypeScriptCompiler.getFullDiagnosticText(diagnostic, path => this.host.resolvePath(path)));
    }
}

interface ProjectRunnerTestCase {
    scenario: string;
    projectRoot: string;
    inputFiles: string[];
    collectedFiles: string[];
    outputFiles: string[];
    declareFiles?: string[];
    verifyEmitFiles?: boolean;
    errors?: string[];
    verifyFileNamesOnly?: boolean;
    baselineCheck?: boolean;
    baselineFiles?: string[];
    path?: string;
    skipRun?: boolean;
    skipNodeRun?: boolean;
    negative?: boolean;
    bug?: string;
    outputOption?: string;
    outDirOption?: string;
    sourceMapRecordBaseline?: string;
    mapRoot?: string;
    sourceRoot?: string;
}

class ProjectRunner extends RunnerBase {
    public initializeTests() {

        describe("Compiling a project", function (done: any) {


            var rPath = Harness.userSpecifiedroot + 'tests\\cases\\projects\\r.js';
            var testExec = true;

            function cleanProjectDirectory(directory: string, outputFiles: string[], declareFiles: string[]) {
                var files = outputFiles.concat(declareFiles);
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    if (TypeScript.IO.fileExists(file)) {
                        TypeScript.IO.deleteFile(file);
                    }
                }
            }

            function assertRelativePathsInArray(arr: string[], relativePaths: string[]) {
                for (var i = 0; i < relativePaths.length; i++) {
                    var expectedPath = TypeScript.switchToForwardSlashes(relativePaths[i]);
                    var expectedPathMatchingRegEx = new RegExp(expectedPath + "$");
                    var found = false;
                    for (var j = 0; j < arr.length; j++) {
                        var actualPath = TypeScript.switchToForwardSlashes(arr[j]);
                        if (actualPath.match(expectedPathMatchingRegEx)) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        throw new Error("Expected array to contain path " + relativePaths[i]);
                    }
                }
            }

            function assertAllFilesExist(files: string[]) {
                for (var i = 0; i < files.length; i++) {
                    if (!TypeScript.IO.fileExists(files[i])) {
                        throw new Error("Expected the file " + files[i] + " to exist.");
                    }
                }
            }

            function createTest(spec: ProjectRunnerTestCase) {
                var inputFiles: string[] = [];
                for (var i = 0; i < spec.inputFiles.length; i++) {
                    inputFiles.push(Harness.userSpecifiedroot + spec.projectRoot + "/" + spec.inputFiles[i]);
                }

                var outputFiles: string[] = [];
                if (spec.outputFiles) {
                    for (var j = 0; j < spec.outputFiles.length; j++) {
                        outputFiles.push(Harness.userSpecifiedroot + spec.projectRoot + "/" + spec.outputFiles[j]);
                    }
                }

                var declareFiles: string[] = [];
                if (spec.declareFiles) {
                    for (var j = 0; j < spec.declareFiles.length; j++) {
                        declareFiles.push(Harness.userSpecifiedroot + spec.projectRoot + "/" + spec.declareFiles[j]);
                    }
                }

                var generatedDeclareFiles: { fileName: string; file: Harness.Compiler.WriterAggregator; }[] = [];
                var getDeclareFiles = false;
                if (spec.declareFiles) {
                    getDeclareFiles = true;
                }

                var writeGeneratedFile = (files: { fileName: string; file: Harness.Compiler.WriterAggregator; }[], fn: string, contents: string, writeByteOrderMark: boolean) => {
                    var fnEntry = { fileName: fn, file: new Harness.Compiler.WriterAggregator() };
                    files.push(fnEntry);
                    fnEntry.file.Write(contents);
                    fnEntry.file.Close();
                    return fnEntry.file;
                }

                var writeDeclareFile = (fn: string, contents: string, writeByteOrderMark: boolean) => {
                    return writeGeneratedFile(generatedDeclareFiles, fn, contents, writeByteOrderMark);
                }

                var generatedEmitFiles: { fileName: string; file: Harness.Compiler.WriterAggregator; }[] = [];
                var writeGeneratedEmitFile = (fn: string, contents: string, writeByteOrderMark: boolean) => {
                    return writeGeneratedFile(generatedEmitFiles, fn, contents, writeByteOrderMark);
                }

                var writeEmitFile = (fileName: string, contents: string, writeByteOrderMark: boolean) => TypeScript.IOUtils.writeFileAndFolderStructure(TypeScript.IO, fileName, contents, writeByteOrderMark);
                var verifyEmitFiles = false;
                if (spec.verifyEmitFiles) {
                    verifyEmitFiles = true;
                    writeEmitFile = writeGeneratedEmitFile;
                }

                var generateMapFiles = false;
                var sourcemapDir = "";
                if (spec.sourceMapRecordBaseline) {
                    generateMapFiles = true;
                    sourcemapDir = "sourcemap/"
                }

                var baseFileName = TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/" + spec.projectRoot + "/";
                var outputOption = "";
                if (spec.outputOption) {
                    outputOption = baseFileName + spec.outputOption;
                }

                var outDirOption = "";
                if (spec.outDirOption) {
                    outDirOption = baseFileName + spec.outDirOption;
                }

                var mapRoot = "";
                var mapRootDir = "";
                if (spec.mapRoot) {
                    mapRoot = spec.mapRoot;
                    mapRootDir = "mapRootDir/"
                }

                var sourceRoot = "";
                var sourceRootDir = "";
                if (spec.sourceRoot) {
                    sourceRoot = spec.sourceRoot;
                    sourceRootDir = "sourceRootDir/"
                }

                var codeGenType: string;
                var compareGeneratedFiles = (
                    generatedFiles: { fileName: string; file: Harness.Compiler.WriterAggregator; }[],
                    expectedFiles: string[]) => {

                    Harness.Assert.equal(generatedFiles.length, expectedFiles.length);
                    for (var i = 0; i < expectedFiles.length; i++) {
                        var expectedfileName = baseFileName + expectedFiles[i];

                        var generatedFile = TypeScript.ArrayUtilities.firstOrDefault(
                            generatedFiles, f => TypeScript.IO.resolvePath(f.fileName) === TypeScript.IO.resolvePath(expectedfileName));

                        Harness.Assert.notNull(generatedFile);
                        if (spec.verifyFileNamesOnly) {
                            continue;
                        }
                        var fileContents = generatedFile.file.lines.join("\n");
                        if (generateMapFiles) {

                            if (expectedFiles[i].lastIndexOf(".js") == expectedFiles[i].length - 3) {
                                // JS file
                                var indexOfMap = fileContents.lastIndexOf("//# sourceMappingURL=");
                                if (indexOfMap != -1) {
                                    var mapFileName = fileContents.substring(indexOfMap + 21);
                                    if (mapFileName.indexOf(baseFileName) == 0) {
                                        mapFileName = "/" + spec.projectRoot + "/" + mapFileName.substring(baseFileName.length);
                                        fileContents = fileContents.substring(0, indexOfMap + 21) + mapFileName;
                                    }
                                }
                            } else if (expectedFiles[i].lastIndexOf(".map") == expectedFiles[i].length - 4) {
                                // Map file
                                var mapContents = JSON.parse(fileContents);
                                var sourceList: string[] = mapContents.sources;
                                var searchStr = "file:///" + baseFileName;
                                var searchStrLen = searchStr.length;
                                var replaceStr = "file:///" + spec.projectRoot + "/";
                                var updateMap = false;
                                for (var j = 0; j < sourceList.length; j++) {
                                    if (sourceList[j].indexOf(searchStr) == 0) {
                                        sourceList[j] = replaceStr + sourceList[j].substring(searchStrLen);
                                        updateMap = true;
                                    }
                                }

                                var sourceRootStr: string = mapContents.sourceRoot;
                                if (sourceRootStr.indexOf(baseFileName) == 0) {
                                    mapContents.sourceRoot = "/" + spec.projectRoot + "/" + sourceRootStr.substring(baseFileName.length);
                                    updateMap = true;
                                }

                                if (updateMap) {
                                    mapContents.sources = sourceList;
                                    fileContents = JSON.stringify(mapContents);
                                }
                            }
                        }

                        var localFileName = baseFileName + "local/" + codeGenType + "/" + sourcemapDir + mapRootDir + sourceRootDir + expectedFiles[i];
                        var localFile = TypeScript.IOUtils.writeFileAndFolderStructure(TypeScript.IO, localFileName, fileContents, /*writeByteOrderMark:*/ false);
                        var referenceFileName = baseFileName + "reference/" + codeGenType + "/" + sourcemapDir + mapRootDir + sourceRootDir + expectedFiles[i];
                        Harness.Assert.noDiff(fileContents, TypeScript.IO.readFile(referenceFileName, /*codepage:*/ null).contents);
                    }
                }


                var prevSourceFile = "";
                var sourceMapRecord: Harness.Compiler.WriterAggregator;
                var sourceMapEmitterCallback = (emittedFile: string, emittedLine: number, emittedColumn: number, sourceFile: string, sourceLine: number, sourceColumn: number, sourceName: string): void => {
                    if (prevSourceFile != sourceFile) {
                        var sourceFileName = sourceFile;
                        var searchStr = "file:///" + baseFileName;
                        var searchStrLen = searchStr.length;
                        var replaceStr = "file:///" + spec.projectRoot + "/";
                        if (sourceFile.indexOf(searchStr) == 0) {
                            sourceFileName = replaceStr + sourceFile.substring(searchStrLen);
                        }
                        sourceMapRecord.WriteLine("");
                        sourceMapRecord.WriteLine("EmittedFile: (" + emittedFile + ") sourceFile: (" + sourceFileName + ")");
                        sourceMapRecord.WriteLine("-------------------------------------------------------------------");
                        prevSourceFile = sourceFile;
                    }
                    sourceMapRecord.Write("Emitted (" + emittedLine + ", " + emittedColumn + ") source (" + sourceLine + ", " + sourceColumn + ")");
                    if (sourceName) {
                        sourceMapRecord.Write(" name (" + sourceName + ")");
                    }
                    sourceMapRecord.WriteLine("");
                };

                var verifySourceMapRecord = (sourceMapContents: string, baselineName: string) => {
                    var localFileName = baseFileName + "local/" + codeGenType + "/" + sourcemapDir + mapRootDir + sourceRootDir + baselineName;
                    var localFile = TypeScript.IOUtils.writeFileAndFolderStructure(TypeScript.IO, localFileName, sourceMapContents, /*writeByteOrderMark:*/ false);
                    var referenceFileName = baseFileName + "reference/" + codeGenType + "/" + sourcemapDir + mapRootDir + sourceRootDir + baselineName;
                    Harness.Assert.noDiff(sourceMapContents, TypeScript.IO.readFile(referenceFileName, /*codepage:*/ null).contents);
                }

                /********************************************************
                                     NODE CODEGEN
                *********************************************************/

                describe("with " + spec.scenario + " - Node Codegen", function () {
                    // clean out bugids
                    Harness.Assert.bugIds = [];

                    if (spec.bug && spec.bug !== '') {
                        Harness.Assert.bug(spec.bug)
                    }

                    cleanProjectDirectory(spec.projectRoot, outputFiles, declareFiles);

                    generatedDeclareFiles = [];
                    generatedEmitFiles = [];
                    var compilationSettings = new TypeScript.CompilationSettings();
                    compilationSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
                    codeGenType = "node";
                    var batch = new HarnessBatch(getDeclareFiles, generateMapFiles, outputOption, outDirOption, mapRoot, sourceRoot, compilationSettings);
                    prevSourceFile = "";
                    sourceMapRecord = batch.sourcemapRecord;
                    batch.harnessCompile(inputFiles, writeEmitFile, writeDeclareFile, sourceMapEmitterCallback);

                    it("collects the right files", function () {
                        var resolvedFiles = batch.getResolvedFilePaths();
                        assertRelativePathsInArray(resolvedFiles, spec.collectedFiles);
                        Harness.Assert.equal(resolvedFiles.length, spec.collectedFiles.length);
                    });

                    if (!spec.negative) {
                        it("compiles without error", function () {
                            Harness.Assert.equal(batch.errout.lines.join(""), '');
                        });
                    } else {
                        it("compiles with errors", function () {
                            Harness.Assert.equal(batch.errout.lines.join("").trim(), spec.errors.join(TypeScript.Environment.newLine).trim());
                        });
                    }

                    if (verifyEmitFiles) {
                        it("checks emit files baseline", function () {
                            compareGeneratedFiles(generatedEmitFiles, spec.outputFiles);
                        });
                    } else {
                        it("creates the proper output files", function () {
                            assertAllFilesExist(outputFiles);
                        });
                    }

                    if (testExec && !spec.skipRun && !spec.skipNodeRun) {
                        it("runs without error", function (done: any) {
                            Exec.exec("node.exe", ['"' + outputFiles[0] + '"'], function (res) {
                                Harness.Assert.equal(res.stdout, "");
                                Harness.Assert.equal(res.stderr, "");
                                done();
                            })
                        });
                    }

                    if (spec.baselineCheck) {
                        it("checks baseline", function () {
                            Harness.Assert.noDiff(Harness.readFile(spec.path + spec.outputFiles[0] + "").contents,
                                Harness.readFile(spec.path + spec.baselineFiles[0] + "." + codeGenType).contents);
                        });
                    }

                    if (getDeclareFiles) {
                        it("checks declare files baseline", function () {
                            compareGeneratedFiles(generatedDeclareFiles, spec.declareFiles);
                        });
                    }

                    if (generateMapFiles && verifyEmitFiles && !spec.verifyFileNamesOnly ) {
                        it("checks sourcemap record baseline", function () {
                            verifySourceMapRecord(batch.sourcemapRecord.lines.join("\r\n"), spec.sourceMapRecordBaseline);
                        });
                    }
                });

                /// AMD Codegen

                describe("with " + spec.scenario + " - AMD Codegen", function () {
                    // clean out bugids
                    Harness.Assert.bugIds = [];

                    if (spec.bug && spec.bug !== '') {
                        Harness.Assert.bug(spec.bug)
                    }

                    cleanProjectDirectory(spec.projectRoot, outputFiles, declareFiles);

                    var compilationSettings = new TypeScript.CompilationSettings();
                    compilationSettings.moduleGenTarget = TypeScript.ModuleGenTarget.Asynchronous;

                    generatedDeclareFiles = [];
                    generatedEmitFiles = [];
                    codeGenType = "amd";
                    var batch = new HarnessBatch(getDeclareFiles, generateMapFiles, outputOption, outDirOption, mapRoot, sourceRoot, compilationSettings);
                    prevSourceFile = "";
                    sourceMapRecord = batch.sourcemapRecord;
                    batch.harnessCompile(inputFiles, writeEmitFile, writeDeclareFile, sourceMapEmitterCallback);

                    it("collects the right files", function () {
                        var resolvedFiles = batch.getResolvedFilePaths();

                        //Harness.Assert.equal(resolvedFiles.length, spec.collectedFiles.length);
                        assertRelativePathsInArray(resolvedFiles, spec.collectedFiles);
                    });

                    if (!spec.negative) {
                        it("compiles without error", function () {
                            //Harness.Assert.equal(batch.errout.lines.join("\n"), '');
                        });
                    }
                    else {
                        it("compiles with errors", function () {
                            //Harness.Assert.equal(batch.errout.lines.join("\n").trim(), spec.errors.join("\n").trim());
                        });
                    }

                    if (verifyEmitFiles) {
                        it("checks emit files baseline", function () {
                            compareGeneratedFiles(generatedEmitFiles, spec.outputFiles);
                        });
                    } else {
                        it("creates the proper output files", function () {
                            assertAllFilesExist(outputFiles);
                        });
                    }

                    if (testExec && !spec.skipRun) {
                        var moduleName = spec.outputFiles[0].replace(/\.js$/, "");
                        TypeScript.IO.writeFile(spec.projectRoot + '/driver.js', amdDriverTemplate.replace(/\{0}/g, moduleName), /*writeByteOrderMark:*/false);

                        it("runs without error", function (done: any) {
                            Exec.exec("node.exe", ['"' + spec.projectRoot + '/driver.js"'], function (res) {
                                Harness.Assert.equal(res.stdout, "");
                                Harness.Assert.equal(res.stderr, "");
                                done();
                            })
                        });
                    }

                    if (spec.baselineCheck) {
                        it("checks baseline", function () {
                            Harness.Assert.noDiff(Harness.readFile(spec.path + spec.outputFiles[0] + "").contents,
                                Harness.readFile(spec.path + spec.baselineFiles[0] + "." + codeGenType).contents);
                        });
                    }

                    if (getDeclareFiles) {
                        it("checks declare files baseline", function () {
                            compareGeneratedFiles(generatedDeclareFiles, spec.declareFiles);
                        });
                    }

                    if (generateMapFiles && verifyEmitFiles && !spec.verifyFileNamesOnly) {
                        it("checks sourcemap record baseline", function () {
                            verifySourceMapRecord(batch.sourcemapRecord.lines.join("\r\n"), spec.sourceMapRecordBaseline);
                        });
                    }
                });
            }

            var tests: ProjectRunnerTestCase[] = [];

            tests.push({
                scenario: 'module identifier'
                , projectRoot: 'tests/cases/projects/ModuleIdentifier'
                , inputFiles: ['consume.ts']
                , collectedFiles: ['consume.ts', 'decl.ts']
                , outputFiles: ['consume.js', 'decl.js']
            });

            tests.push({
                scenario: 'relative - global'
                , projectRoot: 'tests/cases/projects/relative-global'
                , inputFiles: ['consume.ts']
                , collectedFiles: ['consume.ts', 'decl.ts']
                , outputFiles: ['consume.js', 'decl.js']
            });

            tests.push({
                scenario: 'relative - nested'
                , projectRoot: 'tests/cases/projects/relative-nested'
                , inputFiles: ['app.ts']
                , collectedFiles: ['app.ts', 'main/consume.ts', 'decl.ts']
                , outputFiles: ['app.js', 'main/consume.js', 'decl.js']
            });

            tests.push({
                scenario: 'non-relative'
                , projectRoot: 'tests/cases/projects/non-relative'
                , inputFiles: ['consume.ts']
                , collectedFiles: ['consume.ts', 'decl.ts', 'lib/foo/a.ts', 'lib/foo/b.ts', 'lib/bar/a.ts']
                , outputFiles: ['consume.js', 'decl.js', 'lib/bar/a.js', 'lib/foo/a.js']
                , baselineCheck: true
                , baselineFiles: ['base-consume', 'base-decl', 'lib/bar/base-a', 'lib/foo/base-a']
                , path: 'cases/projects/non-relative/'
                , skipRun: true
            });

            tests.push({
                scenario: "can't find the module"
                , projectRoot: 'tests/cases/projects/NoModule'
                , inputFiles: ['decl.ts']
                , collectedFiles: ['decl.ts']
                , outputFiles: <string[]>[]
                , negative: true
                , skipRun: true
                , errors: [
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NoModule/decl.ts") + "(1,1): error TS2071: Unable to resolve external module '\"./foo/bar.js\"'.",
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NoModule/decl.ts") + "(1,1): error TS2072: Module cannot be aliased to a non-module type.",
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NoModule/decl.ts") + "(2,1): error TS2071: Unable to resolve external module '\"baz\"'.",
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NoModule/decl.ts") + "(2,1): error TS2072: Module cannot be aliased to a non-module type.",
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NoModule/decl.ts") + "(3,1): error TS2071: Unable to resolve external module '\"./baz\"'.",
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NoModule/decl.ts") + "(3,1): error TS2072: Module cannot be aliased to a non-module type."]
            });

            tests.push({
                scenario: 'baseline'
                , projectRoot: 'tests/cases/projects/baseline'
                , inputFiles: ['emit.ts']
                , collectedFiles: ['emit.ts', 'decl.ts']
                , outputFiles: ['emit.js']
                , baselineCheck: true
                , baselineFiles: ['base-emit']
                , path: 'cases/projects/baseline/'
            });

            tests.push({
                scenario: 'baseline 2'
                , projectRoot: 'tests/cases/projects/baseline'
                , inputFiles: ['dont_emit.ts']
                , collectedFiles: ['dont_emit.ts', 'decl.ts']
                , outputFiles: ['dont_emit.js']
                , baselineCheck: true
                , baselineFiles: ['base-dont-emit']
                , path: 'cases/projects/baseline/'
            });

            tests.push({
                scenario: 'baseline 3'
                , projectRoot: 'tests/cases/projects/baseline'
                , inputFiles: ['nestedModule.ts']
                , collectedFiles: ['nestedModule.ts']
                , outputFiles: ['nestedModule.js']
                , baselineCheck: true
                , baselineFiles: ['base-nestedModule']
                , path: 'cases/projects/baseline/'
            });

            tests.push({
                scenario: 'relative - global - ref'
                , projectRoot: 'tests/cases/projects/relative-global-ref'
                , inputFiles: ['consume.ts']
                , collectedFiles: ['consume.ts', 'decl.d.ts']
                , outputFiles: ['consume.js']
                , skipRun: true
            });

            tests.push({
                scenario: 'relative - nested - ref'
                , projectRoot: 'tests/cases/projects/relative-nested-ref'
                , inputFiles: ['main/consume.ts']
                , collectedFiles: [(Harness.userSpecifiedroot == "" ? "main/consume.ts" : 'main/consume.ts'), 'decl.d.ts']
                , outputFiles: ['main/consume.js']
                , skipRun: true
            });


            tests.push({
                scenario: 'nested declare'
                , projectRoot: 'tests/cases/projects/NestedDeclare'
                , inputFiles: ['consume.ts']
                , collectedFiles: ['consume.ts']
                , outputFiles: <string[]>[]
                , skipRun: true
            });

            tests.push({
                scenario: 'ext referencing ext and int'
                , projectRoot: 'tests/cases/projects/ext-int-ext'
                , inputFiles: ['external.ts']
                , collectedFiles: ['external.ts', 'external2.ts', 'internal.ts']
                , outputFiles: ['external.js', 'external2.js', 'internal.js']
                , skipRun: true /* this requires a host which is able to resolve the script in the reference tag */
            });

            //Harness.Assert.bug('No error for importing an external module in illegal scope');
            //tests.push({
            //    scenario: 'int referencing ext and int'
            //        , projectRoot: 'tests/cases/projects/ext-int-ext'
            //        , inputFiles: ['internal2.ts']
            //        , collectedFiles: ['internal2.ts', 'external2.ts']
            //        , outputFiles: ['external2.js']
            //        , negative: true
            //        , skipRun: true /* this requires a host which is able to resolve the script in the reference tag */ // TODO: What does this actually mean...
            //        , errors: [TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/ext-int-ext/internal2.ts') + '(2,19): Import declaration of external module is permitted only in global or top level dynamic modules']
            //});

            tests.push({
                scenario: 'nested reference tags'
                , projectRoot: 'tests/cases/projects/reference-1'
                , inputFiles: ['main.ts']
                , collectedFiles: ['main.ts', 'classA.ts', 'classB.ts']
                , outputFiles: ['main.js', 'lib/classA.js', 'lib/classB.js']
                , skipRun: true /* this requires a host which is able to resolve the script in the reference tags */
            });

            tests.push({
                scenario: 'CircularReferencing'
                , projectRoot: 'tests/cases/projects/CircularReferencing'
                , inputFiles: ['consume.ts']
                , collectedFiles: ['consume.ts', 'decl.ts']
                , outputFiles: ['consume.js', 'decl.js']
                , skipRun: true
            });

            tests.push({
                scenario: 'circular referencing - 2'
                , projectRoot: 'tests/cases/projects/CircularReferencing-2'
                , inputFiles: ['a.ts']
                , collectedFiles: ['a.ts', 'b.ts', 'c.ts']
                , outputFiles: ['a.js', 'b.js', 'c.js']
            });

            tests.push({
                scenario: 'nested local module - with recursive typecheck'
                , projectRoot: 'tests/cases/projects/NestedLocalModule-WithRecursiveTypecheck'
                , inputFiles: ['test1.ts']
                , collectedFiles: ['test1.ts', 'test2.ts']
                , outputFiles: <string[]>[]
                , skipRun: true
                , negative: true
                , errors: [
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NestedLocalModule-WithRecursiveTypecheck/test2.ts") + "(5,5): error TS2136: Import declarations in an internal module cannot reference an external module.",
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NestedLocalModule-WithRecursiveTypecheck/test1.ts") + "(3,2): error TS2136: Import declarations in an internal module cannot reference an external module."
                ]
            });

            tests.push({
                scenario: 'nested local module - simple case'
                , projectRoot: 'tests/cases/projects/NestedLocalModule-SimpleCase'
                , inputFiles: ['test1.ts']
                , collectedFiles: ['test1.ts', 'test2.ts']
                , outputFiles: <string[]>[]
                , skipRun: true
                , negative: true
                , errors: [
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/NestedLocalModule-SimpleCase/test1.ts") + "(2,2): error TS2136: Import declarations in an internal module cannot reference an external module.",
                ]
            });

            tests.push({
                scenario: "privacy Check on imported module - simple reference"
                , projectRoot: 'tests/cases/projects/privacyCheck-SimpleReference'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'mExported.ts', 'mNonExported.ts']
                , outputFiles: ['mExported.js', 'mNonExported.js']
                , negative: true
                , skipRun: true
                , errors: <string[]>[]
            });

            tests.push({
                scenario: "privacy Check on indirect type from the external type"
                , projectRoot: 'tests/cases/projects/privacyCheck-IndirectReference'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'indirectExternalModule.ts', 'externalModule.ts']
                , outputFiles: ['indirectExternalModule.js', 'externalModule.js']
                , negative: true
                , skipRun: true
                , errors: [
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/privacyCheck-IndirectReference/test.ts") + "(2,12): error TS2031: Exported variable 'x' is using inaccessible module '" + TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/privacyCheck-IndirectReference/indirectExternalModule.ts'.",
                ]
            });

            //Harness.Assert.bug('No error for importing an external module in illegal scope');
            //tests.push({
            //    scenario: "privacy Check on imported module - declarations inside non exported module"
            //        , projectRoot: 'tests/cases/projects/privacyCheck-InsideModule'
            //        , inputFiles: ['test.ts']
            //        , collectedFiles: ['test.ts', 'mExported.ts', 'mNonExported.ts']
            //        , outputFiles: ['test.js', 'mExported.js', 'mNonExported.js']
            //        , negative: true
            //        , skipRun: true
            //        , errors: [ TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-InsideModule/test.ts') + '(5,37): Import declaration of external module is permitted only in global or top level dynamic modules'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-InsideModule/test.ts') + '(24,33): Import declaration of external module is permitted only in global or top level dynamic modules']
            //});

            //Harness.Assert.bug('No error for importing an external module in illegal scope');
            //tests.push({
            //    scenario: "privacy Check on imported module - import statement in parent module"
            //        , projectRoot: 'tests/cases/projects/privacyCheck-ImportInParent'
            //        , inputFiles: ['test.ts']
            //        , collectedFiles: ['test.ts', 'mExported.ts', 'mNonExported.ts']
            //        , outputFiles: ['test.js', 'mExported.js', 'mNonExported.js']
            //        , negative: true
            //        , skipRun: true
            //        , errors: [TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(2,37): Import declaration of external module is permitted only in global or top level dynamic modules'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(42,33): Import declaration of external module is permitted only in global or top level dynamic modules'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(24,8): exported variable \'c1\' is using inaccessible module "mExported"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(26,12): exported function return type is using inaccessible module "mExported"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(28,8): exported variable \'x1\' is using inaccessible module "mExported"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(30,36): exported class \'class1\' extends class from private module "mExported"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(64,8): exported variable \'c3\' is using inaccessible module "mNonExported"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(66,12): exported function return type is using inaccessible module "mNonExported"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(68,8): exported variable \'x3\' is using inaccessible module "mNonExported"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/privacyCheck-ImportInParent/test.ts') + '(70,36): exported class \'class3\' extends class from private module "mNonExported"']
            //});

            tests.push({
                scenario: "declare export added"
                , projectRoot: 'tests/cases/projects/DeclareExportAdded'
                , inputFiles: ['consumer.ts']
                , collectedFiles: ['consumer.ts', 'ref.d.ts']
                , outputFiles: ['consumer.js']
                , skipRun: true
                , baselineCheck: true
                , path: 'cases/projects/DeclareExportAdded/'
                , baselineFiles: ['base-declare-export']
            })


            tests.push({
                scenario: "relative paths"
                , projectRoot: 'tests/cases/projects/RelativePaths'
                , inputFiles: ['app.ts']
                , collectedFiles: ['app.ts', 'a.ts', 'b.ts']
                , outputFiles: ['app.js', 'A/a.js', 'A/b.js']
                , skipRun: true
            })

            tests.push({
                scenario: "declare Variable Collision"
                , projectRoot: 'tests/cases/projects/declareVariableCollision'
                , inputFiles: ['decl.d.ts', 'in1.d.ts', 'in2.d.ts']
                , collectedFiles: ['decl.d.ts', 'in1.d.ts', 'in2.d.ts']
                , outputFiles: <string[]>[]
                , negative: true
                , skipRun: true
                , bug: '535531'
                , errors: [TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/declareVariableCollision/in2.d.ts") + "(1,1): error TS2000: Duplicate identifier 'a'. Additional locations:"
                    + TypeScript.Environment.newLine + "\t" + TypeScript.IO.resolvePath(Harness.userSpecifiedroot + "tests/cases/projects/declareVariableCollision/in1.d.ts") + "(1,1)"]
            })

            tests.push({
                scenario: "module merging ordering 1"
                , projectRoot: 'tests/cases/projects/moduleMergeOrder'
                , inputFiles: ['a.ts', 'b.ts']
                , collectedFiles: ['a.ts', 'b.ts']
                , outputFiles: ['a.js']
                , skipRun: true
            });

            tests.push({
                scenario: "module merging ordering 2"
                , projectRoot: 'tests/cases/projects/moduleMergeOrder'
                , inputFiles: ['b.ts', 'a.ts']
                , collectedFiles: ['a.ts', 'b.ts']
                , outputFiles: ['a.js']
                , skipRun: true
            });

            //Harness.Assert.bug('Wrong signature emitted in declaration file for class types imported from external modules');
            tests.push({
                scenario: "declarations_SimpleImport"
                , projectRoot: 'tests/cases/projects/declarations_SimpleImport'
                , inputFiles: ['useModule.ts']
                , collectedFiles: ['useModule.ts', 'm4.ts']
                , outputFiles: ['useModule.js', 'm4.js']
                , declareFiles: ['m4.d.ts', 'useModule.d.ts']
                , skipRun: true
            });

            //Harness.Assert.bug('Wrong signature emitted in declaration file for class types imported from external modules');
            //tests.push({
            //    scenario: "declarations_GlobalImport"
            //        , projectRoot: 'tests/cases/projects/declarations_GlobalImport'
            //        , inputFiles: ['useModule.ts']
            //        , collectedFiles: ['useModule.ts', 'glo_m4.ts']
            //        , outputFiles: ['useModule.js', 'glo_m4.js']
            //        , declareFiles: ['glo_m4.d.ts', 'useModule.d.ts']
            //        , skipRun: true
            //});

            tests.push({
                scenario: "declarations_ImportedInPrivate"
                , projectRoot: 'tests/cases/projects/declarations_ImportedInPrivate'
                , inputFiles: ['useModule.ts']
                , collectedFiles: ['useModule.ts', 'private_m4.ts']
                , outputFiles: ['useModule.js', 'private_m4.js']
                , declareFiles: ['private_m4.d.ts', 'useModule.d.ts']
                , skipRun: true
            });

            tests.push({
                scenario: "declarations_ImportedUseInFunction"
                , projectRoot: 'tests/cases/projects/declarations_ImportedUseInFunction'
                , inputFiles: ['useModule.ts']
                , collectedFiles: ['useModule.ts', 'fncOnly_m4.ts']
                , outputFiles: ['useModule.js', 'fncOnly_m4.js']
                , declareFiles: ['fncOnly_m4.d.ts', 'useModule.d.ts']
                , skipRun: true
            });

            //Harness.Assert.bug('Wrong signature emitted in declaration file for class types imported from external modules');
            //tests.push({
            //    scenario: "declarations_MultipleTimesImport"
            //        , projectRoot: 'tests/cases/projects/declarations_MultipleTimesImport'
            //        , inputFiles: ['useModule.ts']
            //        , collectedFiles: ['useModule.ts', 'm4.ts']
            //        , outputFiles: ['useModule.js', 'm4.js']
            //        , declareFiles: ['m4.d.ts', 'useModule.d.ts']
            //        , skipRun: true
            //});

            //Harness.Assert.bug('Wrong signature emitted in declaration file for class types imported from external modules');
            //tests.push({
            //    scenario: "declarations_MultipleTimesMultipleImport"
            //        , projectRoot: 'tests/cases/projects/declarations_MultipleTimesMultipleImport'
            //        , inputFiles: ['useModule.ts']
            //        , collectedFiles: ['useModule.ts', 'm4.ts', 'm5.ts']
            //        , outputFiles: ['useModule.js', 'm4.js', 'm5.js']
            //        , declareFiles: ['m4.d.ts', 'm5.d.ts', 'useModule.d.ts']
            //        , skipRun: true
            //});

            tests.push({
                scenario: "declarations_CascadingImports"
                , projectRoot: 'tests/cases/projects/declarations_CascadingImports'
                , inputFiles: ['useModule.ts']
                , collectedFiles: ['useModule.ts', 'm4.ts']
                , outputFiles: ['m4.js']
                , declareFiles: ['m4.d.ts', 'useModule.d.ts']
                , skipRun: true
            });

            //Harness.Assert.bug('Exported types cannot flow across multiple external module boundaries');
            //tests.push({
            //    scenario: "declarations_IndirectImport should result in error"
            //        , projectRoot: 'tests/cases/projects/declarations_IndirectImport'
            //        , inputFiles: ['useModule.ts']
            //        , collectedFiles: ['useModule.ts', 'm4.ts', 'm5.ts']
            //        , outputFiles: ['useModule.js', 'm4.js', 'm5.js']
            //        , negative: true
            //        , skipRun: true
            //        , errors: [TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/declarations_IndirectImport/useModule.ts') + '(3,0): exported variable \'d\' is using inaccessible module "m4"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/declarations_IndirectImport/useModule.ts') + '(4,0): exported variable \'x\' is using inaccessible module "m4"'
            //            , TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/declarations_IndirectImport/useModule.ts') + '(7,4): exported function return type is using inaccessible module "m4"']
            //});

            tests.push({
                scenario: "outputdir_singleFile: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['test.js']
                , declareFiles: ['test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['bin/test.js']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simple/test.js']
                , verifyEmitFiles: true
                , declareFiles: ['outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_singleFile: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['test.js', 'test.js.map']
                , declareFiles: ['test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_singleFile: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_singleFile: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_singleFile: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot - disk path]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['binMapRootDiskPath/test.js', 'binMapRootDiskPath/test.js.map']
                , outputOption: 'binMapRootDiskPath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileDiskPath.sourcemapRecord.baseline"
                , mapRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_singleFile/mapFiles"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot - relative path]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['binMapRootRelativePath/test.js', 'binMapRootRelativePath/test.js.map']
                , outputOption: 'binMapRootRelativePath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileRelativePath.sourcemapRecord.baseline"
                , mapRoot: "../mapFiles"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot - disk path]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['binSourceRootDiskPath/test.js', 'binSourceRootDiskPath/test.js.map']
                , outputOption: 'binSourceRootDiskPath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileDiskPath.sourcemapRecord.baseline"
                , sourceRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_singleFile/src/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot - relative path]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['binSourceRootRelativePath/test.js', 'binSourceRootRelativePath/test.js.map']
                , outputOption: 'binSourceRootRelativePath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileRelativePath.sourcemapRecord.baseline"
                , sourceRoot: "../src/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_singleFile: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot - disk path]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simpleMapRootDiskPath/test.js', 'outdir/simpleMapRootDiskPath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirDiskPath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleMapRootDiskPath'
                , mapRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_singleFile/mapFiles"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot - relative path]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simpleMapRootRelativePath/test.js', 'outdir/simpleMapRootRelativePath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirRelativePath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleMapRootRelativePath'
                , mapRoot: "../mapFiles"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot - disk path]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simpleSourceRootDiskPath/test.js', 'outdir/simpleSourceRootDiskPath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirDiskPath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleSourceRootDiskPath'
                , sourceRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_singleFile/src/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/sourceRoot - relative path]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simpleSourceRootRelativePath/test.js', 'outdir/simpleSourceRootRelativePath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirRelativePath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleSourceRootRelativePath'
                , sourceRoot: "../src/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_singleFile: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_singleFile'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts']
                , outputFiles: ['outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'test.js']
                , declareFiles: ['m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['bin/test.js']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/test.js']
                , verifyEmitFiles: true
                , declareFiles: ['outdir/simple/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , declareFiles: ['m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot - disk path]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['binMapRootDiskPath/test.js', 'binMapRootDiskPath/test.js.map']
                , outputOption: 'binMapRootDiskPath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileDiskPath.sourcemapRecord.baseline"
                , mapRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_simple/mapFiles/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot - relative path]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['binMapRootRelativePath/test.js', 'binMapRootRelativePath/test.js.map']
                , outputOption: 'binMapRootRelativePath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileRelativePath.sourcemapRecord.baseline"
                , mapRoot: "../mapFiles"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot - disk path]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['binSourceRootDiskPath/test.js', 'binSourceRootDiskPath/test.js.map']
                , outputOption: 'binSourceRootDiskPath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileDiskPath.sourcemapRecord.baseline"
                , sourceRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_simple/src/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot - relative path]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['binSourceRootRelativePath/test.js', 'binSourceRootRelativePath/test.js.map']
                , outputOption: 'binSourceRootRelativePath/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFileRelativePath.sourcemapRecord.baseline"
                , sourceRoot: "../src/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot - disk path]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simpleMapRootDiskPath/m1.js', 'outdir/simpleMapRootDiskPath/m1.js.map', 'outdir/simpleMapRootDiskPath/test.js', 'outdir/simpleMapRootDiskPath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirDiskPath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleMapRootDiskPath'
                , mapRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_simple/mapFiles/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot- relative path]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simpleMapRootRelativePath/m1.js', 'outdir/simpleMapRootRelativePath/m1.js.map', 'outdir/simpleMapRootRelativePath/test.js', 'outdir/simpleMapRootRelativePath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirRelativePath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleMapRootRelativePath'
                , mapRoot: "../mapFiles"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot - disk path]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simpleSourceRootDiskPath/m1.js', 'outdir/simpleSourceRootDiskPath/m1.js.map', 'outdir/simpleSourceRootDiskPath/test.js', 'outdir/simpleSourceRootDiskPath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirDiskPath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleSourceRootDiskPath'
                , sourceRoot: TypeScript.switchToForwardSlashes(TypeScript.IO.resolvePath(Harness.userSpecifiedroot)) + "/tests/cases/projects/outputdir_simple/src/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot - relative path]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simpleSourceRootRelativePath/m1.js', 'outdir/simpleSourceRootRelativePath/m1.js.map', 'outdir/simpleSourceRootRelativePath/test.js', 'outdir/simpleSourceRootRelativePath/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDirRelativePath.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simpleSourceRootRelativePath'
                , sourceRoot: "../src/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'test.js']
                , declareFiles: ['ref/m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_subfolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['bin/test.js']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/test.js']
                , verifyEmitFiles: true
                , declareFiles: ['outdir/simple/ref/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , declareFiles: ['ref/m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_subfolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_subfolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_subfolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_subfolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/ref/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            // TODO: Add for outputdir_multifolder that spans one level below where we are building
            //  Need to verify baselines as well

            tests.push({
                scenario: "outputdir_multifolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['ref/m1.js', '../outputdir_multifolder_ref/m2.js', 'test.js']
                , declareFiles: ['ref/m1.d.ts', '../outputdir_multifolder_ref/m2.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_multifolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['bin/test.js']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_multifolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['outdir/simple/outputdir_multifolder/ref/m1.js', 'outdir/simple/outputdir_multifolder_ref/m2.js', 'outdir/simple/outputdir_multifolder/test.js']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , declareFiles: ['outdir/simple/outputdir_multifolder/ref/m1.d.ts', 'outdir/simple/outputdir_multifolder_ref/m2.d.ts', 'outdir/simple/outputdir_multifolder/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_multifolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', '../outputdir_multifolder_ref/m2.js', '../outputdir_multifolder_ref/m2.js.map', 'test.js', 'test.js.map']
                , declareFiles: ['ref/m1.d.ts', '../outputdir_multifolder_ref/m2.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , verifyFileNamesOnly: true
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_multifolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', '../outputdir_multifolder_ref/m2.js', '../outputdir_multifolder_ref/m2.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , verifyFileNamesOnly: true
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_multifolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', '../outputdir_multifolder_ref/m2.js', '../outputdir_multifolder_ref/m2.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , verifyFileNamesOnly: true
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_multifolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', '../outputdir_multifolder_ref/m2.js', '../outputdir_multifolder_ref/m2.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , verifyFileNamesOnly: true
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_multifolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , declareFiles: ['bin/test.d.ts']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_multifolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_multifolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_multifolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['bin/test.js', 'bin/test.js.map']
                , outputOption: 'bin/test.js'
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outputFile.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_multifolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['outdir/simple/outputdir_multifolder/ref/m1.js', 'outdir/simple/outputdir_multifolder/ref/m1.js.map', 'outdir/simple/outputdir_multifolder_ref/m2.js', 'outdir/simple/outputdir_multifolder_ref/m2.js.map', 'outdir/simple/outputdir_multifolder/test.js', 'outdir/simple/outputdir_multifolder/test.js.map']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/outputdir_multifolder/ref/m1.d.ts', 'outdir/simple/outputdir_multifolder_ref/m2.d.ts', 'outdir/simple/outputdir_multifolder/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_multifolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['outdir/simple/outputdir_multifolder/ref/m1.js', 'outdir/simple/outputdir_multifolder/ref/m1.js.map', 'outdir/simple/outputdir_multifolder_ref/m2.js', 'outdir/simple/outputdir_multifolder_ref/m2.js.map', 'outdir/simple/outputdir_multifolder/test.js', 'outdir/simple/outputdir_multifolder/test.js.map']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , skipRun: true
                , mapRoot: "http://www.typescriptlang.org/"
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_multifolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['outdir/simple/outputdir_multifolder/ref/m1.js', 'outdir/simple/outputdir_multifolder/ref/m1.js.map', 'outdir/simple/outputdir_multifolder_ref/m2.js', 'outdir/simple/outputdir_multifolder_ref/m2.js.map', 'outdir/simple/outputdir_multifolder/test.js', 'outdir/simple/outputdir_multifolder/test.js.map']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_multifolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_multifolder_ref/m2.ts']
                , outputFiles: ['outdir/simple/outputdir_multifolder/ref/m1.js', 'outdir/simple/outputdir_multifolder/ref/m1.js.map', 'outdir/simple/outputdir_multifolder_ref/m2.js', 'outdir/simple/outputdir_multifolder_ref/m2.js.map', 'outdir/simple/outputdir_multifolder/test.js', 'outdir/simple/outputdir_multifolder/test.js.map']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , skipRun: true
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
            });

            tests.push({
                scenario: "outputdir_module_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'test.js']
                , declareFiles: ['m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_module_simple: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputOption: 'bin/test.js'
                , outputFiles: ['m1.js', 'test.js']
                , declareFiles: ['m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_module_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/test.js']
                , verifyEmitFiles: true
                , declareFiles: ['outdir/simple/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_module_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , declareFiles: ['m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_module_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_module_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_module_simple: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['m1.js', 'm1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });


            tests.push({
                scenario: "[Sourcemap]: outputdir_module_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_module_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_module_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_module_simple: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_simple'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'm1.ts']
                , outputFiles: ['outdir/simple/m1.js', 'outdir/simple/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });


            tests.push({
                scenario: "outputdir_module_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'test.js']
                , declareFiles: ['ref/m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_module_subfolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'test.js']
                , declareFiles: ['ref/m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , outputOption: 'bin/test.js'
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_module_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/test.js']
                , verifyEmitFiles: true
                , declareFiles: ['outdir/simple/ref/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_module_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , declareFiles: ['ref/m1.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_module_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_module_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_module_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_module_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/ref/m1.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_module_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_module_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_module_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            // TODO: Add for outputdir_module_multifolder that spans one level below where we are building
            //  Need to verify baselines as well

            tests.push({
                scenario: "outputdir_module_multifolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_module_multifolder_ref/m2.ts']
                , outputFiles: ['ref/m1.js', '../outputdir_module_multifolder_ref/m2.js', 'test.js']
                , declareFiles: ['ref/m1.d.ts', '../outputdir_module_multifolder_ref/m2.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_module_multifolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_module_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_module_multifolder_ref/m2.ts']
                , outputOption: 'bin/test.js'
                , outputFiles: ['ref/m1.js', '../outputdir_module_multifolder_ref/m2.js', 'test.js']
                , declareFiles: ['ref/m1.d.ts', '../outputdir_module_multifolder_ref/m2.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_module_multifolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_module_multifolder_ref/m2.ts']
                , outputFiles: ['outdir/simple/outputdir_module_multifolder/ref/m1.js', 'outdir/simple/outputdir_module_multifolder_ref/m2.js', 'outdir/simple/outputdir_module_multifolder/test.js']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , declareFiles: ['outdir/simple/outputdir_module_multifolder/ref/m1.d.ts', 'outdir/simple/outputdir_module_multifolder_ref/m2.d.ts', 'outdir/simple/outputdir_module_multifolder/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_module_multifolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_module_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_module_multifolder_ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', '../outputdir_module_multifolder_ref/m2.js', '../outputdir_module_multifolder_ref/m2.js.map', 'test.js', 'test.js.map']
                , declareFiles: ['ref/m1.d.ts', '../outputdir_module_multifolder_ref/m2.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , verifyFileNamesOnly: true
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_module_multifolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_module_multifolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', '../outputdir_module_multifolder_ref/m2.ts']
                , outputFiles: ['outdir/simple/outputdir_module_multifolder/ref/m1.js', 'outdir/simple/outputdir_module_multifolder/ref/m1.js.map', 'outdir/simple/outputdir_module_multifolder_ref/m2.js', 'outdir/simple/outputdir_module_multifolder_ref/m2.js.map', 'outdir/simple/outputdir_module_multifolder/test.js', 'outdir/simple/outputdir_module_multifolder/test.js.map']
                , verifyEmitFiles: true
                , verifyFileNamesOnly: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/outputdir_module_multifolder/ref/m1.d.ts', 'outdir/simple/outputdir_module_multifolder_ref/m2.d.ts', 'outdir/simple/outputdir_module_multifolder/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_mixed_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m2.js', 'test.js']
                , declareFiles: ['ref/m1.d.ts', 'ref/m2.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_mixed_subfolder: specify outputFile"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputOption: 'bin/test.js'
                , outputFiles: ['ref/m2.js', 'bin/test.js']
                , declareFiles: ['ref/m2.d.ts', 'bin/test.d.ts']
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_mixed_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m2.js', 'outdir/simple/test.js']
                , verifyEmitFiles: true
                , declareFiles: ['outdir/simple/ref/m1.d.ts', 'outdir/simple/ref/m2.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });

            tests.push({
                scenario: "outputdir_mixed_subfolder: specify outputFile and outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/outAndOutDirFolder/ref/m2.js', 'bin/outAndOutDirFile.js']
                , verifyEmitFiles: true
                , declareFiles: ['outdir/outAndOutDirFolder/ref/m2.d.ts', 'bin/outAndOutDirFile.d.ts']
                , outputOption: 'bin/outAndOutDirFile.js'
                , outDirOption: 'outdir/outAndOutDirFolder'
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_mixed_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'ref/m2.js', 'ref/m2.js.map', 'test.js', 'test.js.map']
                , declareFiles: ['ref/m1.d.ts', 'ref/m2.d.ts', 'test.d.ts']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_mixed_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'ref/m2.js', 'ref/m2.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_mixed_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'ref/m2.js', 'ref/m2.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_mixed_subfolder: no outdir"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['ref/m1.js', 'ref/m1.js.map', 'ref/m2.js', 'ref/m2.js.map', 'test.js', 'test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "noOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap]: outputdir_mixed_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/ref/m2.js', 'outdir/simple/ref/m2.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , declareFiles: ['outdir/simple/ref/m1.d.ts', 'outdir/simple/ref/m2.d.ts', 'outdir/simple/test.d.ts']
                , outDirOption: 'outdir/simple'
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot]: outputdir_mixed_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/ref/m2.js', 'outdir/simple/ref/m2.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/sourceRoot]: outputdir_mixed_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/ref/m2.js', 'outdir/simple/ref/m2.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });
            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot]: outputdir_mixed_subfolder: specify outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/simple/ref/m1.js', 'outdir/simple/ref/m1.js.map', 'outdir/simple/ref/m2.js', 'outdir/simple/ref/m2.js.map', 'outdir/simple/test.js', 'outdir/simple/test.js.map']
                , verifyEmitFiles: true
                , sourceMapRecordBaseline: "outDir.sourcemapRecord.baseline"
                , outDirOption: 'outdir/simple'
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap] outputdir_mixed_subfolder: specify outputFile and outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/outAndOutDirFolder/ref/m2.js', 'outdir/outAndOutDirFolder/ref/m2.js.map', 'bin/outAndOutDirFile.js', 'bin/outAndOutDirFile.js.map']
                , verifyEmitFiles: true
                , outputOption: 'bin/outAndOutDirFile.js'
                , outDirOption: 'outdir/outAndOutDirFolder'
                , sourceMapRecordBaseline: "outputFileAndOutDir.sourcemapRecord.baseline"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot] outputdir_mixed_subfolder: specify outputFile and outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/outAndOutDirFolder/ref/m2.js', 'outdir/outAndOutDirFolder/ref/m2.js.map', 'bin/outAndOutDirFile.js', 'bin/outAndOutDirFile.js.map']
                , verifyEmitFiles: true
                , outputOption: 'bin/outAndOutDirFile.js'
                , outDirOption: 'outdir/outAndOutDirFolder'
                , sourceMapRecordBaseline: "outputFileAndOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/sourceRoot] outputdir_mixed_subfolder: specify outputFile and outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/outAndOutDirFolder/ref/m2.js', 'outdir/outAndOutDirFolder/ref/m2.js.map', 'bin/outAndOutDirFile.js', 'bin/outAndOutDirFile.js.map']
                , verifyEmitFiles: true
                , outputOption: 'bin/outAndOutDirFile.js'
                , outDirOption: 'outdir/outAndOutDirFolder'
                , sourceMapRecordBaseline: "outputFileAndOutDir.sourcemapRecord.baseline"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            tests.push({
                scenario: "[Sourcemap/mapRoot/sourceRoot] outputdir_mixed_subfolder: specify outputFile and outputDirectory"
                , projectRoot: 'tests/cases/projects/outputdir_mixed_subfolder'
                , inputFiles: ['test.ts']
                , collectedFiles: ['test.ts', 'ref/m1.ts', 'ref/m2.ts']
                , outputFiles: ['outdir/outAndOutDirFolder/ref/m2.js', 'outdir/outAndOutDirFolder/ref/m2.js.map', 'bin/outAndOutDirFile.js', 'bin/outAndOutDirFile.js.map']
                , verifyEmitFiles: true
                , outputOption: 'bin/outAndOutDirFile.js'
                , outDirOption: 'outdir/outAndOutDirFolder'
                , sourceMapRecordBaseline: "outputFileAndOutDir.sourcemapRecord.baseline"
                , mapRoot: "http://www.typescriptlang.org/"
                , sourceRoot: "http://typescript.codeplex.com/"
                , skipRun: true
            });

            // TODO: case when folder is present and option --out is use
            // TODO: case when file is present for the option --out in use
            // TODO: since the precompiled info about the referenced files is not passed the declare files 
            //       generated using this runner isnt emitting updated reference tag.

            //Harness.Assert.bug("Not emitting a JS file for a TS file whose JS would be 'empty'")
            tests.push({
                scenario: "Visibility of type used across modules"
                , projectRoot: 'tests/cases/projects/VisibilityOfCrosssModuleTypeUsage'
                , inputFiles: ['commands.ts']
                , collectedFiles: ['fs.ts', 'server.ts', 'commands.ts']
                , outputFiles: ['fs.js', 'server.js', 'commands.js']
                , verifyEmitFiles: true
                , skipRun: true
                , negative: true
                , errors: <string[]>[]
            });


            tests.push({
                scenario: "Visibility of type used across modules - 2"
                , projectRoot: 'tests/cases/projects/InvalidReferences'
                , inputFiles: ['main.ts']
                , collectedFiles: ['main.ts']
                , outputFiles: ['main.js']
                , verifyEmitFiles: false
                , skipRun: true
                , negative: true
                , errors: [
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/InvalidReferences/main.ts') + '(1,1): error TS5006: A file cannot have a reference to itself.',
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/InvalidReferences/main.ts') + '(2,1): error TS5007: Cannot resolve referenced file: \'nonExistingFile1.ts\'.',
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/InvalidReferences/main.ts') + '(3,1): error TS5007: Cannot resolve referenced file: \'nonExistingFile2.ts\'.']
            });


            tests.push({
                scenario: "Prologue emit"
                , projectRoot: 'tests/cases/projects/PrologueEmit'
                , inputFiles: ['globalThisCapture.ts', '__extends.ts']
                , collectedFiles: ['globalThisCapture.ts', '__extends.ts']
                , outputFiles: ['out.js']
                , outputOption: 'out.js'
                , verifyEmitFiles: true
                , skipRun: true
            });

            tests.push({
                scenario: "No-default-lib"
                , projectRoot: 'tests/cases/projects/No-default-lib'
                , inputFiles: ['test.ts']
                , collectedFiles: <string[]>[]
                , outputFiles: ['test.js']
                , verifyEmitFiles: false
                , skipRun: true
                , negative: true
                , errors: [
                    TypeScript.IO.resolvePath(Harness.userSpecifiedroot + 'tests/cases/projects/No-default-lib/test.ts') + '(3,8): error TS2095: Could not find symbol \'Array\'.']
            });

            tests.push({
                scenario: 'Quotes in file and directory names'
                , projectRoot: 'tests/cases/projects/Quote\'InName'
                , inputFiles: ['m\'ain.ts']
                , collectedFiles: ['m\'ain.ts', 'class\'A.ts']
                , outputFiles: ['m\'ain.js', 'li\'b/class\'A.js']
                , skipRun: true /* this requires a host which is able to resolve the script in the reference tags */
            });


            var amdDriverTemplate = "var requirejs = require('../r.js');\n\n" +
                "requirejs.config({\n" +
                "    nodeRequire: require\n" +
                "});\n\n" +
                "requirejs(['{0}'],\n" +
                "function ({0}) {\n" +
                "});";

            for (var i = 0; i < tests.length; i++) {
                createTest(tests[i]);
            }

            Exec.exec("node.exe", ['-v'], function (res) {
                if (res.stderr.length > 0) {
                    testExec = false;
                }

                done();
            });
        });
    }
}