/// <reference path="..\harness.ts" />
/// <reference path="..\..\compiler\watch.ts" />
/// <reference path="..\virtualFileSystemWithWatch.ts" />

namespace ts.tscWatch {
    import WatchedSystem = TestFSWithWatch.TestServerHost;
    type File = TestFSWithWatch.File;
    type SymLink = TestFSWithWatch.SymLink;
    import createWatchedSystem = TestFSWithWatch.createWatchedSystem;
    import checkArray = TestFSWithWatch.checkArray;
    import libFile = TestFSWithWatch.libFile;
    import checkWatchedFiles = TestFSWithWatch.checkWatchedFiles;
    import checkWatchedDirectories = TestFSWithWatch.checkWatchedDirectories;
    import checkOutputContains = TestFSWithWatch.checkOutputContains;
    import checkOutputDoesNotContain = TestFSWithWatch.checkOutputDoesNotContain;

    export function checkProgramActualFiles(program: Program, expectedFiles: string[]) {
        checkArray(`Program actual files`, program.getSourceFiles().map(file => file.fileName), expectedFiles);
    }

    export function checkProgramRootFiles(program: Program, expectedFiles: string[]) {
        checkArray(`Program rootFileNames`, program.getRootFileNames(), expectedFiles);
    }

    function createWatchOfConfigFile(configFileName: string, host: WatchedSystem, maxNumberOfFilesToIterateForInvalidation?: number) {
        const compilerHost = createWatchCompilerHostOfConfigFile(configFileName, {}, host);
        compilerHost.maxNumberOfFilesToIterateForInvalidation = maxNumberOfFilesToIterateForInvalidation;
        const watch = createWatchProgram(compilerHost);
        return () => watch.getCurrentProgram().getProgram();
    }

    function createWatchOfFilesAndCompilerOptions(rootFiles: string[], host: WatchedSystem, options: CompilerOptions = {}) {
        const watch = createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptions(rootFiles, options, host));
        return () => watch.getCurrentProgram().getProgram();
    }

    function getEmittedLineForMultiFileOutput(file: File, host: WatchedSystem) {
        return `TSFILE: ${file.path.replace(".ts", ".js")}${host.newLine}`;
    }

    function getEmittedLineForSingleFileOutput(filename: string, host: WatchedSystem) {
        return `TSFILE: ${filename}${host.newLine}`;
    }

    interface FileOrFolderEmit extends File {
        output?: string;
    }

    function getFileOrFolderEmit(file: File, getOutput?: (file: File) => string): FileOrFolderEmit {
        const result = file as FileOrFolderEmit;
        if (getOutput) {
            result.output = getOutput(file);
        }
        return result;
    }

    function getEmittedLines(files: FileOrFolderEmit[]) {
        const seen = createMap<true>();
        const result: string[] = [];
        for (const { output } of files) {
            if (output && !seen.has(output)) {
                seen.set(output, true);
                result.push(output);
            }
        }
        return result;
    }

    function checkAffectedLines(host: WatchedSystem, affectedFiles: FileOrFolderEmit[], allEmittedFiles: string[]) {
        const expectedAffectedFiles = getEmittedLines(affectedFiles);
        const expectedNonAffectedFiles = mapDefined(allEmittedFiles, line => contains(expectedAffectedFiles, line) ? undefined : line);
        checkOutputContains(host, expectedAffectedFiles);
        checkOutputDoesNotContain(host, expectedNonAffectedFiles);
    }

    const elapsedRegex = /^Elapsed:: [0-9]+ms/;
    function checkOutputErrors(
        host: WatchedSystem,
        logsBeforeWatchDiagnostic: string[] | undefined,
        preErrorsWatchDiagnostic: Diagnostic,
        logsBeforeErrors: string[] | undefined,
        errors: ReadonlyArray<Diagnostic>,
        disableConsoleClears?: boolean | undefined,
        ...postErrorsWatchDiagnostics: Diagnostic[]
    ) {
        let screenClears = 0;
        const outputs = host.getOutput();
        const expectedOutputCount = 1 + errors.length + postErrorsWatchDiagnostics.length +
            (logsBeforeWatchDiagnostic ? logsBeforeWatchDiagnostic.length : 0) + (logsBeforeErrors ? logsBeforeErrors.length : 0);
        assert.equal(outputs.length, expectedOutputCount, JSON.stringify(outputs));
        let index = 0;
        forEach(logsBeforeWatchDiagnostic, log => assertLog("logsBeforeWatchDiagnostic", log));
        assertWatchDiagnostic(preErrorsWatchDiagnostic);
        forEach(logsBeforeErrors, log => assertLog("logBeforeError", log));
        // Verify errors
        forEach(errors, assertDiagnostic);
        forEach(postErrorsWatchDiagnostics, assertWatchDiagnostic);
        assert.equal(host.screenClears.length, screenClears, "Expected number of screen clears");
        host.clearOutput();

        function assertDiagnostic(diagnostic: Diagnostic) {
            const expected = formatDiagnostic(diagnostic, host);
            assert.equal(outputs[index], expected, getOutputAtFailedMessage("Diagnostic", expected));
            index++;
        }

        function assertLog(caption: string, expected: string) {
            const actual = outputs[index];
            assert.equal(actual.replace(elapsedRegex, ""), expected.replace(elapsedRegex, ""), getOutputAtFailedMessage(caption, expected));
            index++;
        }

        function assertWatchDiagnostic(diagnostic: Diagnostic) {
            const expected = getWatchDiagnosticWithoutDate(diagnostic);
            if (!disableConsoleClears && !contains(nonClearingMessageCodes, diagnostic.code)) {
                assert.equal(host.screenClears[screenClears], index, `Expected screen clear at this diagnostic: ${expected}`);
                screenClears++;
            }
            assert.isTrue(endsWith(outputs[index], expected), getOutputAtFailedMessage("Watch diagnostic", expected));
            index++;
        }

        function getOutputAtFailedMessage(caption: string, expectedOutput: string) {
            return `Expected ${caption}: ${JSON.stringify(expectedOutput)} at ${index} in ${JSON.stringify(outputs)}`;
        }

        function getWatchDiagnosticWithoutDate(diagnostic: Diagnostic) {
            const newLines = contains(screenStartingMessageCodes, diagnostic.code)
                ? `${host.newLine}${host.newLine}`
                : host.newLine;
            return ` - ${flattenDiagnosticMessageText(diagnostic.messageText, host.newLine)}${newLines}`;
        }
    }

    function createErrorsFoundCompilerDiagnostic(errors: ReadonlyArray<Diagnostic>) {
        return errors.length === 1
            ? createCompilerDiagnostic(Diagnostics.Found_1_error_Watching_for_file_changes)
            : createCompilerDiagnostic(Diagnostics.Found_0_errors_Watching_for_file_changes, errors.length);
    }

    function checkOutputErrorsInitial(host: WatchedSystem, errors: ReadonlyArray<Diagnostic>, disableConsoleClears?: boolean, logsBeforeErrors?: string[]) {
        checkOutputErrors(
            host,
            /*logsBeforeWatchDiagnostic*/ undefined,
            createCompilerDiagnostic(Diagnostics.Starting_compilation_in_watch_mode),
            logsBeforeErrors,
            errors,
            disableConsoleClears,
            createErrorsFoundCompilerDiagnostic(errors));
    }

    function checkOutputErrorsIncremental(host: WatchedSystem, errors: ReadonlyArray<Diagnostic>, disableConsoleClears?: boolean, logsBeforeWatchDiagnostic?: string[], logsBeforeErrors?: string[]) {
        checkOutputErrors(
            host,
            logsBeforeWatchDiagnostic,
            createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation),
            logsBeforeErrors,
            errors,
            disableConsoleClears,
            createErrorsFoundCompilerDiagnostic(errors));
    }

    function checkOutputErrorsIncrementalWithExit(host: WatchedSystem, errors: ReadonlyArray<Diagnostic>, expectedExitCode: ExitStatus, disableConsoleClears?: boolean, logsBeforeWatchDiagnostic?: string[], logsBeforeErrors?: string[]) {
        checkOutputErrors(
            host,
            logsBeforeWatchDiagnostic,
            createCompilerDiagnostic(Diagnostics.File_change_detected_Starting_incremental_compilation),
            logsBeforeErrors,
            errors,
            disableConsoleClears);
        assert.equal(host.exitCode, expectedExitCode);
    }

    function getDiagnosticOfFileFrom(file: SourceFile, text: string, start: number, length: number, message: DiagnosticMessage): Diagnostic {
        return {
            file,
            start,
            length,

            messageText: text,
            category: message.category,
            code: message.code,
        };
    }

    function getDiagnosticWithoutFile(message: DiagnosticMessage, ..._args: (string | number)[]): Diagnostic {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }

        return getDiagnosticOfFileFrom(/*file*/ undefined, text, /*start*/ undefined, /*length*/ undefined, message);
    }

    function getDiagnosticOfFile(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ..._args: (string | number)[]): Diagnostic {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 4) {
            text = formatStringFromArgs(text, arguments, 4);
        }

        return getDiagnosticOfFileFrom(file, text, start, length, message);
    }

    function getUnknownCompilerOption(program: Program, configFile: File, option: string) {
        const quotedOption = `"${option}"`;
        return getDiagnosticOfFile(program.getCompilerOptions().configFile, configFile.content.indexOf(quotedOption), quotedOption.length, Diagnostics.Unknown_compiler_option_0, option);
    }

    function getDiagnosticOfFileFromProgram(program: Program, filePath: string, start: number, length: number, message: DiagnosticMessage, ..._args: (string | number)[]): Diagnostic {
        let text = getLocaleSpecificMessage(message);

        if (arguments.length > 5) {
            text = formatStringFromArgs(text, arguments, 5);
        }

        return getDiagnosticOfFileFrom(program.getSourceFileByPath(toPath(filePath, program.getCurrentDirectory(), s => s.toLowerCase())),
            text, start, length, message);
    }

    function getDiagnosticModuleNotFoundOfFile(program: Program, file: File, moduleName: string) {
        const quotedModuleName = `"${moduleName}"`;
        return getDiagnosticOfFileFromProgram(program, file.path, file.content.indexOf(quotedModuleName), quotedModuleName.length, Diagnostics.Cannot_find_module_0, moduleName);
    }

    describe("tsc-watch program updates", () => {
        const commonFile1: File = {
            path: "/a/b/commonFile1.ts",
            content: "let x = 1"
        };
        const commonFile2: File = {
            path: "/a/b/commonFile2.ts",
            content: "let y = 1"
        };

        it("create watch without config file", () => {
            const appFile: File = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };

            const moduleFile: File = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            const host = createWatchedSystem([appFile, moduleFile, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([appFile.path], host);

            checkProgramActualFiles(watch(), [appFile.path, libFile.path, moduleFile.path]);

            // TODO: Should we watch creation of config files in the root file's file hierarchy?

            // const configFileLocations = ["/a/b/c/", "/a/b/", "/a/", "/"];
            // const configFiles = flatMap(configFileLocations, location => [location + "tsconfig.json", location + "jsconfig.json"]);
            // checkWatchedFiles(host, configFiles.concat(libFile.path, moduleFile.path));
        });

        it("can handle tsconfig file name with difference casing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    include: ["app.ts"]
                })
            };

            const host = createWatchedSystem([f1, config], { useCaseSensitiveFileNames: false });
            const upperCaseConfigFilePath = combinePaths(getDirectoryPath(config.path).toUpperCase(), getBaseFileName(config.path));
            const watch = createWatchOfConfigFile(upperCaseConfigFilePath, host);
            checkProgramActualFiles(watch(), [combinePaths(getDirectoryPath(upperCaseConfigFilePath), getBaseFileName(f1.path))]);
        });

        it("create configured project without file list", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
            };
            const file1: File = {
                path: "/a/b/c/f1.ts",
                content: "let x = 1"
            };
            const file2: File = {
                path: "/a/b/d/f2.ts",
                content: "let y = 1"
            };
            const file3: File = {
                path: "/a/b/e/f3.ts",
                content: "let z = 1"
            };

            const host = createWatchedSystem([configFile, libFile, file1, file2, file3]);
            const watch = createWatchProgram(createWatchCompilerHostOfConfigFile(configFile.path, {}, host, /*createProgram*/ undefined, notImplemented));

            checkProgramActualFiles(watch.getCurrentProgram().getProgram(), [file1.path, libFile.path, file2.path]);
            checkProgramRootFiles(watch.getCurrentProgram().getProgram(), [file1.path, file2.path]);
            checkWatchedFiles(host, [configFile.path, file1.path, file2.path, libFile.path]);
            const configDir = getDirectoryPath(configFile.path);
            checkWatchedDirectories(host, [configDir, combinePaths(configDir, projectSystem.nodeModulesAtTypes)], /*recursive*/ true);
        });

        // TODO: if watching for config file creation
        // it("add and then remove a config file in a folder with loose files", () => {
        // });

        it("add new files to a configured program without file list", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([commonFile1, libFile, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            const configDir = getDirectoryPath(configFile.path);
            checkWatchedDirectories(host, [configDir, combinePaths(configDir, projectSystem.nodeModulesAtTypes)], /*recursive*/ true);

            checkProgramRootFiles(watch(), [commonFile1.path]);

            // add a new ts file
            host.reloadFS([commonFile1, commonFile2, libFile, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("should ignore non-existing files specified in the config file", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
            };
            const host = createWatchedSystem([commonFile1, commonFile2, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);

            const commonFile3 = "/a/b/commonFile3.ts";
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile3]);
            checkProgramActualFiles(watch(), [commonFile1.path]);
        });

        it("handle recreated files correctly", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([commonFile1, commonFile2, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);

            // delete commonFile2
            host.reloadFS([commonFile1, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [commonFile1.path]);

            // re-add commonFile2
            host.reloadFS([commonFile1, commonFile2, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("handles the missing files - that were added to program because they were added with ///<ref", () => {
            const commonFile2Name = "commonFile2.ts";
            const file1: File = {
                path: "/a/b/commonFile1.ts",
                content: `/// <reference path="${commonFile2Name}"/>
                    let x = y`
            };
            const host = createWatchedSystem([file1, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);

            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, libFile.path]);
            checkOutputErrorsInitial(host, [
                getDiagnosticOfFileFromProgram(watch(), file1.path, file1.content.indexOf(commonFile2Name), commonFile2Name.length, Diagnostics.File_0_not_found, commonFile2.path),
                getDiagnosticOfFileFromProgram(watch(), file1.path, file1.content.indexOf("y"), 1, Diagnostics.Cannot_find_name_0, "y")
            ]);

            host.reloadFS([file1, commonFile2, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, libFile.path, commonFile2.path]);
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("should reflect change in config file", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [commonFile1, commonFile2, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
            configFile.content = `{
                "compilerOptions": {},
                "files": ["${commonFile1.path}"]
            }`;

            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(1); // reload the configured project
            checkProgramRootFiles(watch(), [commonFile1.path]);
        });

        it("works correctly when config file is changed but its content havent", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [libFile, commonFile1, commonFile2, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramActualFiles(watch(), [libFile.path, commonFile1.path, commonFile2.path]);
            checkOutputErrorsInitial(host, emptyArray);

            host.modifyFile(configFile.path, configFile.content);
            host.checkTimeoutQueueLengthAndRun(1); // reload the configured project

            checkProgramActualFiles(watch(), [libFile.path, commonFile1.path, commonFile2.path]);
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("files explicitly excluded in config file", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
            };
            const excludedFile1: File = {
                path: "/a/c/excluedFile1.ts",
                content: `let t = 1;`
            };

            const host = createWatchedSystem([commonFile1, commonFile2, excludedFile1, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("should properly handle module resolution changes in config file", () => {
            const file1: File = {
                path: "/a/b/file1.ts",
                content: `import { T } from "module1";`
            };
            const nodeModuleFile: File = {
                path: "/a/b/node_modules/module1.ts",
                content: `export interface T {}`
            };
            const classicModuleFile: File = {
                path: "/a/module1.ts",
                content: `export interface T {}`
            };
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
            };
            const files = [file1, nodeModuleFile, classicModuleFile, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, nodeModuleFile.path]);

            configFile.content = `{
                "compilerOptions": {
                    "moduleResolution": "classic"
                },
                "files": ["${file1.path}"]
            }`;
            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, classicModuleFile.path]);
        });

        it("should tolerate config file errors and still try to build a project", () => {
            const configFile: File = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6",
                        "allowAnything": true
                    },
                    "someOtherProperty": {}
                }`
            };
            const host = createWatchedSystem([commonFile1, commonFile2, libFile, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramRootFiles(watch(), [commonFile1.path, commonFile2.path]);
        });

        it("changes in files are reflected in project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export let x = 1`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);

            const modifiedFile2 = {
                path: file2.path,
                content: `export * from "../c/f3"` // now inferred project should inclule file3
            };

            host.reloadFS([file1, modifiedFile2, file3]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path]);
            checkProgramActualFiles(watch(), [file1.path, modifiedFile2.path, file3.path]);
        });

        it("deleted files affect project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export * from "../c/f3"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);
            checkProgramActualFiles(watch(), [file1.path, file2.path, file3.path]);

            host.reloadFS([file1, file3]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkProgramActualFiles(watch(), [file1.path]);
        });

        it("deleted files affect project structure - 2", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export * from "../c/f3"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path, file3.path], host);
            checkProgramActualFiles(watch(), [file1.path, file2.path, file3.path]);

            host.reloadFS([file1, file3]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkProgramActualFiles(watch(), [file1.path, file3.path]);
        });

        it("config file includes the file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: `import {x} from "../b/f1"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: "export let y = 1"
            };
            const configFile = {
                path: "/a/c/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] })
            };

            const host = createWatchedSystem([file1, file2, file3, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramRootFiles(watch(), [file2.path, file3.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path, file3.path]);
        });

        it("correctly migrate files between projects", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `
                export * from "../c/f2";
                export * from "../d/f3";`
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: "export let x = 1;"
            };
            const file3 = {
                path: "/a/d/f3.ts",
                content: "export let y = 1;"
            };
            const host = createWatchedSystem([file1, file2, file3]);
            const watch = createWatchOfFilesAndCompilerOptions([file2.path, file3.path], host);
            checkProgramActualFiles(watch(), [file2.path, file3.path]);

            const watch2 = createWatchOfFilesAndCompilerOptions([file1.path], host);
            checkProgramActualFiles(watch2(), [file1.path, file2.path, file3.path]);

            // Previous program shouldnt be updated
            checkProgramActualFiles(watch(), [file2.path, file3.path]);
            host.checkTimeoutQueueLength(0);
        });

        it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };

            const host = createWatchedSystem([file1, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramActualFiles(watch(), [file1.path]);

            host.reloadFS([file1, file2, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkProgramActualFiles(watch(), [file1.path, file2.path]);
            checkProgramRootFiles(watch(), [file1.path, file2.path]);
        });

        it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts"] })
            };

            const host = createWatchedSystem([file1, file2, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramActualFiles(watch(), [file1.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path, file2.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);
        });

        it("can update configured project when set of root files was not changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            const host = createWatchedSystem([file1, file2, configFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramRootFiles(watch(), [file1.path, file2.path]);
            checkProgramActualFiles(watch(), [file1.path, file2.path]);
        });

        it("config file is deleted", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 2;"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const host = createWatchedSystem([file1, file2, libFile, config]);
            const watch = createWatchOfConfigFile(config.path, host);

            checkProgramActualFiles(watch(), [file1.path, file2.path, libFile.path]);
            checkOutputErrorsInitial(host, emptyArray);

            host.reloadFS([file1, file2, libFile]);
            host.checkTimeoutQueueLengthAndRun(1);

            checkOutputErrorsIncrementalWithExit(host, [
                getDiagnosticWithoutFile(Diagnostics.File_0_not_found, config.path)
            ], ExitStatus.DiagnosticsPresent_OutputsSkipped);
        });

        it("Proper errors: document is not contained in project", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const corruptedConfig = {
                path: "/a/b/tsconfig.json",
                content: "{"
            };
            const host = createWatchedSystem([file1, corruptedConfig]);
            const watch = createWatchOfConfigFile(corruptedConfig.path, host);

            checkProgramActualFiles(watch(), [file1.path]);
        });

        it("correctly handles changes in lib section of config file", () => {
            const libES5 = {
                path: "/compiler/lib.es5.d.ts",
                content: "declare const eval: any"
            };
            const libES2015Promise = {
                path: "/compiler/lib.es2015.promise.d.ts",
                content: "declare class Promise<T> {}"
            };
            const app = {
                path: "/src/app.ts",
                content: "var x: Promise<string>;"
            };
            const config1 = {
                path: "/src/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {
                            module: "commonjs",
                            target: "es5",
                            noImplicitAny: true,
                            sourceMap: false,
                            lib: [
                                "es5"
                            ]
                        }
                    })
            };
            const config2 = {
                path: config1.path,
                content: JSON.stringify(
                    {
                        compilerOptions: {
                            module: "commonjs",
                            target: "es5",
                            noImplicitAny: true,
                            sourceMap: false,
                            lib: [
                                "es5",
                                "es2015.promise"
                            ]
                        }
                    })
            };
            const host = createWatchedSystem([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
            const watch = createWatchOfConfigFile(config1.path, host);

            checkProgramActualFiles(watch(), [libES5.path, app.path]);

            host.reloadFS([libES5, libES2015Promise, app, config2]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkProgramActualFiles(watch(), [libES5.path, libES2015Promise.path, app.path]);
        });

        it("should handle non-existing directories in config file", () => {
            const f = {
                path: "/a/src/app.ts",
                content: "let x = 1;"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {},
                    include: [
                        "src/**/*",
                        "notexistingfolder/*"
                    ]
                })
            };
            const host = createWatchedSystem([f, config]);
            const watch = createWatchOfConfigFile(config.path, host);
            checkProgramActualFiles(watch(), [f.path]);
        });

        it("rename a module file and rename back should restore the states for inferred projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();'
            };
            const host = createWatchedSystem([moduleFile, file1, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);
            checkOutputErrorsInitial(host, emptyArray);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), file1, "./moduleFile")
            ]);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("rename a module file and rename back should restore the states for configured projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();'
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createWatchedSystem([moduleFile, file1, configFile, libFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, emptyArray);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), file1, "./moduleFile")
            ]);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("types should load from config file path if config exists", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { types: ["node"], typeRoots: [] } })
            };
            const node = {
                path: "/a/b/node_modules/@types/node/index.d.ts",
                content: "declare var process: any"
            };
            const cwd = {
                path: "/a/c"
            };
            const host = createWatchedSystem([f1, config, node, cwd], { currentDirectory: cwd.path });
            const watch = createWatchOfConfigFile(config.path, host);

            checkProgramActualFiles(watch(), [f1.path, node.path]);
        });

        it("add the missing module file for inferred project: should remove the `module not found` error", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: 'import * as T from "./moduleFile"; T.bar();'
            };
            const host = createWatchedSystem([file1, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);

            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), file1, "./moduleFile")
            ]);

            host.reloadFS([file1, moduleFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("Configure file diagnostics events are generated when the config file has errors", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {
                            "foo": "bar",
                            "allowJS": true
                        }
                    }`
            };

            const host = createWatchedSystem([file, configFile, libFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, [
                getUnknownCompilerOption(watch(), configFile, "foo"),
                getUnknownCompilerOption(watch(), configFile, "allowJS")
            ]);
        });

        it("If config file doesnt have errors, they are not reported", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {}
                    }`
            };

            const host = createWatchedSystem([file, configFile, libFile]);
            createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, emptyArray);
        });

        it("Reports errors when the config file changes", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {}
                    }`
            };

            const host = createWatchedSystem([file, configFile, libFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkOutputErrorsInitial(host, emptyArray);

            configFile.content = `{
                    "compilerOptions": {
                        "haha": 123
                    }
                }`;
            host.reloadFS([file, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, [
                getUnknownCompilerOption(watch(), configFile, "haha")
            ]);

            configFile.content = `{
                    "compilerOptions": {}
                }`;
            host.reloadFS([file, configFile, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("non-existing directories listed in config file input array should be tolerated without crashing the server", () => {
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                        "compilerOptions": {},
                        "include": ["app/*", "test/**/*", "something"]
                    }`
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "let t = 10;"
            };

            const host = createWatchedSystem([file1, configFile, libFile]);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramActualFiles(watch(), [libFile.path]);
        });

        it("non-existing directories listed in config file input array should be able to handle @types if input file list is empty", () => {
            const f = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compiler: {},
                    files: []
                })
            };
            const t1 = {
                path: "/a/node_modules/@types/typings/index.d.ts",
                content: `export * from "./lib"`
            };
            const t2 = {
                path: "/a/node_modules/@types/typings/lib.d.ts",
                content: `export const x: number`
            };
            const host = createWatchedSystem([f, config, t1, t2], { currentDirectory: getDirectoryPath(f.path) });
            const watch = createWatchOfConfigFile(config.path, host);

            checkProgramActualFiles(watch(), [t1.path, t2.path]);
        });

        it("should support files without extensions", () => {
            const f = {
                path: "/a/compile",
                content: "let x = 1"
            };
            const host = createWatchedSystem([f, libFile]);
            const watch = createWatchOfFilesAndCompilerOptions([f.path], host, { allowNonTsExtensions: true });
            checkProgramActualFiles(watch(), [f.path, libFile.path]);
        });

        it("Options Diagnostic locations reported correctly with changes in configFile contents when options change", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFileContentBeforeComment = `{`;
            const configFileContentComment = `
                    // comment
                    // More comment`;
            const configFileContentAfterComment = `
                    "compilerOptions": {
                        "allowJs": true,
                        "declaration": true
                    }
                }`;
            const configFileContentWithComment = configFileContentBeforeComment + configFileContentComment + configFileContentAfterComment;
            const configFileContentWithoutCommentLine = configFileContentBeforeComment + configFileContentAfterComment;
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: configFileContentWithComment
            };

            const files = [file, libFile, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);
            const errors = () => [
                getDiagnosticOfFile(watch().getCompilerOptions().configFile, configFile.content.indexOf('"allowJs"'), '"allowJs"'.length, Diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "declaration"),
                getDiagnosticOfFile(watch().getCompilerOptions().configFile, configFile.content.indexOf('"declaration"'), '"declaration"'.length, Diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "declaration")
            ];
            const intialErrors = errors();
            checkOutputErrorsInitial(host, intialErrors);

            configFile.content = configFileContentWithoutCommentLine;
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            const nowErrors = errors();
            checkOutputErrorsIncremental(host, nowErrors);
            assert.equal(nowErrors[0].start, intialErrors[0].start - configFileContentComment.length);
            assert.equal(nowErrors[1].start, intialErrors[1].start - configFileContentComment.length);
        });

        it("should not trigger recompilation because of program emit", () => {
            const proj = "/user/username/projects/myproject";
            const file1: File = {
                path: `${proj}/file1.ts`,
                content: "export const c = 30;"
            };
            const file2: File = {
                path: `${proj}/src/file2.ts`,
                content: `import {c} from "file1"; export const d = 30;`
            };
            const tsconfig: File = {
                path: `${proj}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        module: "amd",
                        outDir: "build"
                    }
                })
            };
            const host = createWatchedSystem([file1, file2, libFile, tsconfig], { currentDirectory: proj });
            const watch = createWatchOfConfigFile(tsconfig.path, host, /*maxNumberOfFilesToIterateForInvalidation*/1);
            checkProgramActualFiles(watch(), [file1.path, file2.path, libFile.path]);

            assert.isTrue(host.fileExists("build/file1.js"));
            assert.isTrue(host.fileExists("build/src/file2.js"));

            // This should be 0
            host.checkTimeoutQueueLengthAndRun(0);
        });

        it("shouldnt report error about unused function incorrectly when file changes from global to module", () => {
            const getFileContent = (asModule: boolean) => `
                    function one() {}
                    ${asModule ? "export " : ""}function two() {
                      return function three() {
                        one();
                      }
                    }`;
            const file: File = {
                path: "/a/b/file.ts",
                content: getFileContent(/*asModule*/ false)
            };
            const files = [file, libFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfFilesAndCompilerOptions([file.path], host, {
                noUnusedLocals: true
            });
            checkProgramActualFiles(watch(), files.map(file => file.path));
            checkOutputErrorsInitial(host, []);

            file.content = getFileContent(/*asModule*/ true);
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), files.map(file => file.path));
            checkOutputErrorsIncremental(host, []);
        });

        it("watched files when file is deleted and new file is added as part of change", () => {
            const projectLocation = "/home/username/project";
            const file: File = {
                path: `${projectLocation}/src/file1.ts`,
                content: "var a = 10;"
            };
            const configFile: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: "{}"
            };
            const files = [file, libFile, configFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);
            verifyProgram();

            file.path = file.path.replace("file1", "file2");
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            verifyProgram();

            function verifyProgram() {
                checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
                checkWatchedDirectories(host, [], /*recursive*/ false);
                checkWatchedDirectories(host, [projectLocation, `${projectLocation}/node_modules/@types`], /*recursive*/ true);
                checkWatchedFiles(host, files.map(f => f.path));
            }
        });
    });

    describe("tsc-watch emit with outFile or out setting", () => {
        function createWatchForOut(out?: string, outFile?: string) {
            const host = createWatchedSystem([]);
            const config: FileOrFolderEmit = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { listEmittedFiles: true }
                })
            };

            let getOutput: (file: File) => string;
            if (out) {
                config.content = JSON.stringify({
                    compilerOptions: { listEmittedFiles: true, out }
                });
                getOutput = __ => getEmittedLineForSingleFileOutput(out, host);
            }
            else if (outFile) {
                config.content = JSON.stringify({
                    compilerOptions: { listEmittedFiles: true, outFile }
                });
                getOutput = __ => getEmittedLineForSingleFileOutput(outFile, host);
            }
            else {
                getOutput = file => getEmittedLineForMultiFileOutput(file, host);
            }

            const f1 = getFileOrFolderEmit({
                path: "/a/a.ts",
                content: "let x = 1"
            }, getOutput);
            const f2 = getFileOrFolderEmit({
                path: "/a/b.ts",
                content: "let y = 1"
            }, getOutput);

            const files = [f1, f2, config, libFile];
            host.reloadFS(files);
            createWatchOfConfigFile(config.path, host);

            const allEmittedLines = getEmittedLines(files);
            checkOutputContains(host, allEmittedLines);
            host.clearOutput();

            f1.content = "let x = 11";
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkAffectedLines(host, [f1], allEmittedLines);
        }

        it("projectUsesOutFile should not be returned if not set", () => {
            createWatchForOut();
        });

        it("projectUsesOutFile should be true if out is set", () => {
            const outJs = "/a/out.js";
            createWatchForOut(outJs);
        });

        it("projectUsesOutFile should be true if outFile is set", () => {
            const outJs = "/a/out.js";
            createWatchForOut(/*out*/ undefined, outJs);
        });

        function verifyFilesEmittedOnce(useOutFile: boolean) {
            const file1: File = {
                path: "/a/b/output/AnotherDependency/file1.d.ts",
                content: "declare namespace Common.SomeComponent.DynamicMenu { enum Z { Full = 0,  Min = 1, Average = 2, } }"
            };
            const file2: File = {
                path: "/a/b/dependencies/file2.d.ts",
                content: "declare namespace Dependencies.SomeComponent { export class SomeClass { version: string; } }"
            };
            const file3: File = {
                path: "/a/b/project/src/main.ts",
                content: "namespace Main { export function fooBar() {} }"
            };
            const file4: File = {
                path: "/a/b/project/src/main2.ts",
                content: "namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) {  } }"
            };
            const configFile: File = {
                path: "/a/b/project/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: useOutFile ?
                        { outFile: "../output/common.js", target: "es5" } :
                        { outDir: "../output", target: "es5" },
                    files: [file1.path, file2.path, file3.path, file4.path]
                })
            };
            const files = [file1, file2, file3, file4];
            const allfiles = files.concat(configFile);
            const host = createWatchedSystem(allfiles);
            const originalWriteFile = host.writeFile.bind(host);
            const mapOfFilesWritten = createMap<number>();
            host.writeFile = (p: string, content: string) => {
                const count = mapOfFilesWritten.get(p);
                mapOfFilesWritten.set(p, count ? count + 1 : 1);
                return originalWriteFile(p, content);
            };
            createWatchOfConfigFile(configFile.path, host);
            if (useOutFile) {
                // Only out file
                assert.equal(mapOfFilesWritten.size, 1);
            }
            else {
                // main.js and main2.js
                assert.equal(mapOfFilesWritten.size, 2);
            }
            mapOfFilesWritten.forEach((value, key) => {
                assert.equal(value, 1, "Key: " + key);
            });
        }

        it("with --outFile and multiple declaration files in the program", () => {
            verifyFilesEmittedOnce(/*useOutFile*/ true);
        });

        it("without --outFile and multiple declaration files in the program", () => {
            verifyFilesEmittedOnce(/*useOutFile*/ false);
        });
    });

    describe("tsc-watch emit for configured projects", () => {
        const file1Consumer1Path = "/a/b/file1Consumer1.ts";
        const moduleFile1Path = "/a/b/moduleFile1.ts";
        const configFilePath = "/a/b/tsconfig.json";
        interface InitialStateParams {
            /** custom config file options */
            configObj?: any;
            /** list of the files that will be emitted for first compilation */
            firstCompilationEmitFiles?: string[];
            /** get the emit file for file - default is multi file emit line */
            getEmitLine?(file: File, host: WatchedSystem): string;
            /** Additional files and folders to add */
            getAdditionalFileOrFolder?(): File[];
            /** initial list of files to emit if not the default list */
            firstReloadFileList?: string[];
        }
        function getInitialState({ configObj = {}, firstCompilationEmitFiles, getEmitLine, getAdditionalFileOrFolder, firstReloadFileList }: InitialStateParams = {}) {
            const host = createWatchedSystem([]);
            const getOutputName = getEmitLine ? (file: File) => getEmitLine(file, host) :
                (file: File) => getEmittedLineForMultiFileOutput(file, host);

            const moduleFile1 = getFileOrFolderEmit({
                path: moduleFile1Path,
                content: "export function Foo() { };",
            }, getOutputName);

            const file1Consumer1 = getFileOrFolderEmit({
                path: file1Consumer1Path,
                content: `import {Foo} from "./moduleFile1"; export var y = 10;`,
            }, getOutputName);

            const file1Consumer2 = getFileOrFolderEmit({
                path: "/a/b/file1Consumer2.ts",
                content: `import {Foo} from "./moduleFile1"; let z = 10;`,
            }, getOutputName);

            const moduleFile2 = getFileOrFolderEmit({
                path: "/a/b/moduleFile2.ts",
                content: `export var Foo4 = 10;`,
            }, getOutputName);

            const globalFile3 = getFileOrFolderEmit({
                path: "/a/b/globalFile3.ts",
                content: `interface GlobalFoo { age: number }`
            });

            const additionalFiles = getAdditionalFileOrFolder ?
                map(getAdditionalFileOrFolder(), file => getFileOrFolderEmit(file, getOutputName)) :
                [];

            (configObj.compilerOptions || (configObj.compilerOptions = {})).listEmittedFiles = true;
            const configFile = getFileOrFolderEmit({
                path: configFilePath,
                content: JSON.stringify(configObj)
            });

            const files = [moduleFile1, file1Consumer1, file1Consumer2, globalFile3, moduleFile2, configFile, libFile, ...additionalFiles];
            let allEmittedFiles = getEmittedLines(files);
            host.reloadFS(firstReloadFileList ? getFiles(firstReloadFileList) : files);

            // Initial compile
            createWatchOfConfigFile(configFile.path, host);
            if (firstCompilationEmitFiles) {
                checkAffectedLines(host, getFiles(firstCompilationEmitFiles), allEmittedFiles);
            }
            else {
                checkOutputContains(host, allEmittedFiles);
            }
            host.clearOutput();

            return {
                moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile,
                files,
                getFile,
                verifyAffectedFiles,
                verifyAffectedAllFiles,
                getOutputName
            };

            function getFiles(filelist: string[]) {
                return map(filelist, getFile);
            }

            function getFile(fileName: string) {
                return find(files, file => file.path === fileName);
            }

            function verifyAffectedAllFiles() {
                host.reloadFS(files);
                host.checkTimeoutQueueLengthAndRun(1);
                checkOutputContains(host, allEmittedFiles);
                host.clearOutput();
            }

            function verifyAffectedFiles(expected: FileOrFolderEmit[], filesToReload?: FileOrFolderEmit[]) {
                if (!filesToReload) {
                    filesToReload = files;
                }
                else if (filesToReload.length > files.length) {
                    allEmittedFiles = getEmittedLines(filesToReload);
                }
                host.reloadFS(filesToReload);
                host.checkTimeoutQueueLengthAndRun(1);
                checkAffectedLines(host, expected, allEmittedFiles);
                host.clearOutput();
            }
        }

        it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                verifyAffectedFiles
            } = getInitialState();

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2]);

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { console.log('hi'); };`
            moduleFile1.content = `export var T: number;export function Foo() { console.log('hi'); };`;
            verifyAffectedFiles([moduleFile1]);
        });

        it("should be up-to-date with the reference map changes", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                verifyAffectedFiles
            } = getInitialState();

            // Change file1Consumer1 content to `export let y = Foo();`
            file1Consumer1.content = `export let y = Foo();`;
            verifyAffectedFiles([file1Consumer1]);

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer2]);

            // Add the import statements back to file1Consumer1
            file1Consumer1.content = `import {Foo} from "./moduleFile1";let y = Foo();`;
            verifyAffectedFiles([file1Consumer1]);

            // Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`
            moduleFile1.content = `export var T: number;export var T2: string;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer2, file1Consumer1]);

            // Multiple file edits in one go:

            // Change file1Consumer1 content to `export let y = Foo();`
            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            file1Consumer1.content = `export let y = Foo();`;
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2]);
        });

        it("should be up-to-date with deleted files", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                files,
                verifyAffectedFiles
            } = getInitialState();

            // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
            moduleFile1.content = `export var T: number;export function Foo() { };`;

            // Delete file1Consumer2
            const filesToLoad = mapDefined(files, file => file === file1Consumer2 ? undefined : file);
            verifyAffectedFiles([moduleFile1, file1Consumer1], filesToLoad);
        });

        it("should be up-to-date with newly created files", () => {
            const {
                moduleFile1, file1Consumer1, file1Consumer2,
                files,
                verifyAffectedFiles,
                getOutputName
            } = getInitialState();

            const file1Consumer3 = getFileOrFolderEmit({
                path: "/a/b/file1Consumer3.ts",
                content: `import {Foo} from "./moduleFile1"; let y = Foo();`
            }, getOutputName);
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer3, file1Consumer2], files.concat(file1Consumer3));
        });

        it("should detect changes in non-root files", () => {
            const {
                moduleFile1, file1Consumer1,
                verifyAffectedFiles
            } = getInitialState({ configObj: { files: [file1Consumer1Path] }, firstCompilationEmitFiles: [file1Consumer1Path, moduleFile1Path] });

            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1]);

            // change file1 internal, and verify only file1 is affected
            moduleFile1.content += "var T1: number;";
            verifyAffectedFiles([moduleFile1]);
        });

        it("should return all files if a global file changed shape", () => {
            const {
                globalFile3, verifyAffectedAllFiles
            } = getInitialState();

            globalFile3.content += "var T2: string;";
            verifyAffectedAllFiles();
        });

        it("should always return the file itself if '--isolatedModules' is specified", () => {
            const {
                moduleFile1, verifyAffectedFiles
            } = getInitialState({ configObj: { compilerOptions: { isolatedModules: true } } });

            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1]);
        });

        it("should always return the file itself if '--out' or '--outFile' is specified", () => {
            const outFilePath = "/a/b/out.js";
            const {
                moduleFile1, verifyAffectedFiles
            } = getInitialState({
                    configObj: { compilerOptions: { module: "system", outFile: outFilePath } },
                    getEmitLine: (_, host) => getEmittedLineForSingleFileOutput(outFilePath, host)
                });

            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1]);
        });

        it("should return cascaded affected file list", () => {
            const file1Consumer1Consumer1: File = {
                path: "/a/b/file1Consumer1Consumer1.ts",
                content: `import {y} from "./file1Consumer1";`
            };
            const {
                moduleFile1, file1Consumer1, file1Consumer2, verifyAffectedFiles, getFile
            } = getInitialState({
                    getAdditionalFileOrFolder: () => [file1Consumer1Consumer1]
                });

            const file1Consumer1Consumer1Emit = getFile(file1Consumer1Consumer1.path);
            file1Consumer1.content += "export var T: number;";
            verifyAffectedFiles([file1Consumer1, file1Consumer1Consumer1Emit]);

            // Doesnt change the shape of file1Consumer1
            moduleFile1.content = `export var T: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2]);

            // Change both files before the timeout
            file1Consumer1.content += "export var T2: number;";
            moduleFile1.content = `export var T2: number;export function Foo() { };`;
            verifyAffectedFiles([moduleFile1, file1Consumer1, file1Consumer2, file1Consumer1Consumer1Emit]);
        });

        it("should work fine for files with circular references", () => {
            // TODO: do not exit on such errors? Just continue to watch the files for update in watch mode

            const file1: File = {
                path: "/a/b/file1.ts",
                content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`
            };
            const file2: File = {
                path: "/a/b/file2.ts",
                content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`
            };
            const {
                configFile,
                getFile,
                verifyAffectedFiles
            } = getInitialState({
                    firstCompilationEmitFiles: [file1.path, file2.path],
                    getAdditionalFileOrFolder: () => [file1, file2],
                    firstReloadFileList: [libFile.path, file1.path, file2.path, configFilePath]
                });
            const file1Emit = getFile(file1.path), file2Emit = getFile(file2.path);

            file1Emit.content += "export var t3 = 10;";
            verifyAffectedFiles([file1Emit, file2Emit], [file1, file2, libFile, configFile]);

        });

        it("should detect removed code file", () => {
            const referenceFile1: File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`
            };
            const {
                configFile,
                getFile,
                verifyAffectedFiles
            } = getInitialState({
                    firstCompilationEmitFiles: [referenceFile1.path, moduleFile1Path],
                    getAdditionalFileOrFolder: () => [referenceFile1],
                    firstReloadFileList: [libFile.path, referenceFile1.path, moduleFile1Path, configFilePath]
                });

            const referenceFile1Emit = getFile(referenceFile1.path);
            verifyAffectedFiles([referenceFile1Emit], [libFile, referenceFile1Emit, configFile]);
        });

        it("should detect non-existing code file", () => {
            const referenceFile1: File = {
                path: "/a/b/referenceFile1.ts",
                content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`
            };
            const {
                configFile,
                moduleFile2,
                getFile,
                verifyAffectedFiles
            } = getInitialState({
                    firstCompilationEmitFiles: [referenceFile1.path],
                    getAdditionalFileOrFolder: () => [referenceFile1],
                    firstReloadFileList: [libFile.path, referenceFile1.path, configFilePath]
                });

            const referenceFile1Emit = getFile(referenceFile1.path);
            referenceFile1Emit.content += "export var yy = Foo();";
            verifyAffectedFiles([referenceFile1Emit], [libFile, referenceFile1Emit, configFile]);

            // Create module File2 and see both files are saved
            verifyAffectedFiles([referenceFile1Emit, moduleFile2], [libFile, moduleFile2, referenceFile1Emit, configFile]);
        });
    });

    describe("tsc-watch emit file content", () => {
        interface EmittedFile extends File {
            shouldBeWritten: boolean;
        }
        function getEmittedFiles(files: FileOrFolderEmit[], contents: string[]): EmittedFile[] {
            return map(contents, (content, index) => {
                return {
                    content,
                    path: changeExtension(files[index].path, Extension.Js),
                    shouldBeWritten: true
                };
            }
            );
        }
        function verifyEmittedFiles(host: WatchedSystem, emittedFiles: EmittedFile[]) {
            for (const { path, content, shouldBeWritten } of emittedFiles) {
                if (shouldBeWritten) {
                    assert.isTrue(host.fileExists(path), `Expected file ${path} to be present`);
                    assert.equal(host.readFile(path), content, `Contents of file ${path} do not match`);
                }
                else {
                    assert.isNotTrue(host.fileExists(path), `Expected file ${path} to be absent`);
                }
            }
        }

        function verifyEmittedFileContents(newLine: string, inputFiles: File[], initialEmittedFileContents: string[],
            modifyFiles: (files: FileOrFolderEmit[], emitedFiles: EmittedFile[]) => FileOrFolderEmit[], configFile?: File) {
            const host = createWatchedSystem([], { newLine });
            const files = concatenate(
                map(inputFiles, file => getFileOrFolderEmit(file, fileToConvert => getEmittedLineForMultiFileOutput(fileToConvert, host))),
                configFile ? [libFile, configFile] : [libFile]
            );
            const allEmittedFiles = getEmittedLines(files);
            host.reloadFS(files);

            // Initial compile
            if (configFile) {
                createWatchOfConfigFile(configFile.path, host);
            }
            else {
                // First file as the root
                createWatchOfFilesAndCompilerOptions([files[0].path], host, { listEmittedFiles: true });
            }
            checkOutputContains(host, allEmittedFiles);

            const emittedFiles = getEmittedFiles(files, initialEmittedFileContents);
            verifyEmittedFiles(host, emittedFiles);
            host.clearOutput();

            const affectedFiles = modifyFiles(files, emittedFiles);
            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(1);
            checkAffectedLines(host, affectedFiles, allEmittedFiles);

            verifyEmittedFiles(host, emittedFiles);
        }

        function verifyNewLine(newLine: string) {
            const lines = ["var x = 1;", "var y = 2;"];
            const fileContent = lines.join(newLine);
            const f = {
                path: "/a/app.ts",
                content: fileContent
            };

            verifyEmittedFileContents(newLine, [f], [fileContent + newLine], modifyFiles);

            function modifyFiles(files: FileOrFolderEmit[], emittedFiles: EmittedFile[]) {
                files[0].content = fileContent + newLine + "var z = 3;";
                emittedFiles[0].content = files[0].content + newLine;
                return [files[0]];
            }
        }

        it("handles new lines: \\n", () => {
            verifyNewLine("\n");
        });

        it("handles new lines: \\r\\n", () => {
            verifyNewLine("\r\n");
        });

        it("should emit specified file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export function Foo() { return 10; }`
            };

            const file2 = {
                path: "/a/b/f2.ts",
                content: `import {Foo} from "./f1"; export let y = Foo();`
            };

            const file3 = {
                path: "/a/b/f3.ts",
                content: `import {y} from "./f2"; let x = y;`
            };

            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { listEmittedFiles: true } })
            };

            verifyEmittedFileContents("\r\n", [file1, file2, file3], [
                `"use strict";\r\nexports.__esModule = true;\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\n`,
                `"use strict";\r\nexports.__esModule = true;\r\nvar f1_1 = require("./f1");\r\nexports.y = f1_1.Foo();\r\n`,
                `"use strict";\r\nexports.__esModule = true;\r\nvar f2_1 = require("./f2");\r\nvar x = f2_1.y;\r\n`
            ], modifyFiles, configFile);

            function modifyFiles(files: FileOrFolderEmit[], emittedFiles: EmittedFile[]) {
                files[0].content += `export function foo2() { return 2; }`;
                emittedFiles[0].content += `function foo2() { return 2; }\r\nexports.foo2 = foo2;\r\n`;
                emittedFiles[2].shouldBeWritten = false;
                return files.slice(0, 2);
            }
        });

        it("Elides const enums correctly in incremental compilation", () => {
            const currentDirectory = "/user/someone/projects/myproject";
            const file1: File = {
                path: `${currentDirectory}/file1.ts`,
                content: "export const enum E1 { V = 1 }"
            };
            const file2: File = {
                path: `${currentDirectory}/file2.ts`,
                content: `import { E1 } from "./file1"; export const enum E2 { V = E1.V }`
            };
            const file3: File = {
                path: `${currentDirectory}/file3.ts`,
                content: `import { E2 } from "./file2"; const v: E2 = E2.V;`
            };
            const strictAndEsModule = `"use strict";\nexports.__esModule = true;\n`;
            verifyEmittedFileContents("\n", [file3, file2, file1], [
                `${strictAndEsModule}var v = 1 /* V */;\n`,
                strictAndEsModule,
                strictAndEsModule
            ], modifyFiles);

            function modifyFiles(files: FileOrFolderEmit[], emittedFiles: EmittedFile[]) {
                files[0].content += `function foo2() { return 2; }`;
                emittedFiles[0].content += `function foo2() { return 2; }\n`;
                emittedFiles[1].shouldBeWritten = false;
                emittedFiles[2].shouldBeWritten = false;
                return [files[0]];
            }
        });

        it("file is deleted and created as part of change", () => {
            const projectLocation = "/home/username/project";
            const file: File = {
                path: `${projectLocation}/app/file.ts`,
                content: "var a = 10;"
            };
            const fileJs = `${projectLocation}/app/file.js`;
            const configFile: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: JSON.stringify({
                    include: [
                        "app/**/*.ts"
                    ]
                })
            };
            const files = [file, configFile, libFile];
            const host = createWatchedSystem(files, { currentDirectory: projectLocation, useCaseSensitiveFileNames: true });
            createWatchOfConfigFile("tsconfig.json", host);
            verifyProgram();

            file.content += "\nvar b = 10;";

            host.reloadFS(files, { invokeFileDeleteCreateAsPartInsteadOfChange: true });
            host.runQueuedTimeoutCallbacks();
            verifyProgram();

            function verifyProgram() {
                assert.isTrue(host.fileExists(fileJs));
                assert.equal(host.readFile(fileJs), file.content + "\n");
            }
        });
    });

    describe("tsc-watch module resolution caching", () => {
        it("works", () => {
            const root = {
                path: "/a/d/f0.ts",
                content: `import {x} from "f1"`
            };
            const imported = {
                path: "/a/f1.ts",
                content: `foo()`
            };

            const files = [root, imported, libFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { module: ModuleKind.AMD });

            const f1IsNotModule = getDiagnosticOfFileFromProgram(watch(), root.path, root.content.indexOf('"f1"'), '"f1"'.length, Diagnostics.File_0_is_not_a_module, imported.path);
            const cannotFindFoo = getDiagnosticOfFileFromProgram(watch(), imported.path, imported.content.indexOf("foo"), "foo".length, Diagnostics.Cannot_find_name_0, "foo");

            // ensure that imported file was found
            checkOutputErrorsInitial(host, [f1IsNotModule, cannotFindFoo]);

            const originalFileExists = host.fileExists;
            {
                const newContent = `import {x} from "f1"
                var x: string = 1;`;
                root.content = newContent;
                host.reloadFS(files);

                // patch fileExists to make sure that disk is not touched
                host.fileExists = notImplemented;

                // trigger synchronization to make sure that import will be fetched from the cache
                host.runQueuedTimeoutCallbacks();

                // ensure file has correct number of errors after edit
                checkOutputErrorsIncremental(host, [
                    f1IsNotModule,
                    getDiagnosticOfFileFromProgram(watch(), root.path, newContent.indexOf("var x") + "var ".length, "x".length, Diagnostics.Type_0_is_not_assignable_to_type_1, 1, "string"),
                    cannotFindFoo
                ]);
            }
            {
                let fileExistsIsCalled = false;
                host.fileExists = (fileName): boolean => {
                    if (fileName === "lib.d.ts") {
                        return false;
                    }
                    fileExistsIsCalled = true;
                    assert.isTrue(fileName.indexOf("/f2.") !== -1);
                    return originalFileExists.call(host, fileName);
                };

                root.content = `import {x} from "f2"`;
                host.reloadFS(files);

                // trigger synchronization to make sure that LSHost will try to find 'f2' module on disk
                host.runQueuedTimeoutCallbacks();

                // ensure file has correct number of errors after edit
                checkOutputErrorsIncremental(host, [
                    getDiagnosticModuleNotFoundOfFile(watch(), root, "f2")
                ]);

                assert.isTrue(fileExistsIsCalled);
            }
            {
                let fileExistsCalled = false;
                host.fileExists = (fileName): boolean => {
                    if (fileName === "lib.d.ts") {
                        return false;
                    }
                    fileExistsCalled = true;
                    assert.isTrue(fileName.indexOf("/f1.") !== -1);
                    return originalFileExists.call(host, fileName);
                };

                const newContent = `import {x} from "f1"`;
                root.content = newContent;

                host.reloadFS(files);
                host.runQueuedTimeoutCallbacks();

                checkOutputErrorsIncremental(host, [f1IsNotModule, cannotFindFoo]);
                assert.isTrue(fileExistsCalled);
            }
        });

        it("loads missing files from disk", () => {
            const root = {
                path: `/a/foo.ts`,
                content: `import {x} from "bar"`
            };

            const imported = {
                path: `/a/bar.d.ts`,
                content: `export const y = 1;`
            };

            const files = [root, libFile];
            const host = createWatchedSystem(files);
            const originalFileExists = host.fileExists;

            let fileExistsCalledForBar = false;
            host.fileExists = fileName => {
                if (fileName === "lib.d.ts") {
                    return false;
                }
                if (!fileExistsCalledForBar) {
                    fileExistsCalledForBar = fileName.indexOf("/bar.") !== -1;
                }

                return originalFileExists.call(host, fileName);
            };

            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { module: ModuleKind.AMD });

            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), root, "bar")
            ]);

            fileExistsCalledForBar = false;
            root.content = `import {y} from "bar"`;
            host.reloadFS(files.concat(imported));

            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
        });

        it("should compile correctly when resolved module goes missing and then comes back (module is not part of the root)", () => {
            const root = {
                path: `/a/foo.ts`,
                content: `import {x} from "bar"`
            };

            const imported = {
                path: `/a/bar.d.ts`,
                content: `export const y = 1;export const x = 10;`
            };

            const files = [root, libFile];
            const filesWithImported = files.concat(imported);
            const host = createWatchedSystem(filesWithImported);
            const originalFileExists = host.fileExists;
            let fileExistsCalledForBar = false;
            host.fileExists = fileName => {
                if (fileName === "lib.d.ts") {
                    return false;
                }
                if (!fileExistsCalledForBar) {
                    fileExistsCalledForBar = fileName.indexOf("/bar.") !== -1;
                }
                return originalFileExists.call(host, fileName);
            };

            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { module: ModuleKind.AMD });

            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            checkOutputErrorsInitial(host, emptyArray);

            fileExistsCalledForBar = false;
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
            checkOutputErrorsIncremental(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), root, "bar")
            ]);

            fileExistsCalledForBar = false;
            host.reloadFS(filesWithImported);
            host.checkTimeoutQueueLengthAndRun(1);
            checkOutputErrorsIncremental(host, emptyArray);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
        });

        it("works when module resolution changes to ambient module", () => {
            const root = {
                path: "/a/b/foo.ts",
                content: `import * as fs from "fs";`
            };

            const packageJson = {
                path: "/a/b/node_modules/@types/node/package.json",
                content: `
{
  "main": ""
}
`
            };

            const nodeType = {
                path: "/a/b/node_modules/@types/node/index.d.ts",
                content: `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}`
            };

            const files = [root, libFile];
            const filesWithNodeType = files.concat(packageJson, nodeType);
            const host = createWatchedSystem(files, { currentDirectory: "/a/b" });

            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { });

            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), root, "fs")
            ]);

            host.reloadFS(filesWithNodeType);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("works when included file with ambient module changes", () => {
            const root = {
                path: "/a/b/foo.ts",
                content: `
import * as fs from "fs";
import * as u from "url";
`
            };

            const file = {
                path: "/a/b/bar.d.ts",
                content: `
declare module "url" {
    export interface Url {
        href?: string;
    }
}
`
            };

            const fileContentWithFS = `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}
`;

            const files = [root, file, libFile];
            const host = createWatchedSystem(files, { currentDirectory: "/a/b" });

            const watch = createWatchOfFilesAndCompilerOptions([root.path, file.path], host, {});

            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), root, "fs")
            ]);

            file.content += fileContentWithFS;
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("works when reusing program with files from external library", () => {
            interface ExpectedFile { path: string; isExpectedToEmit?: boolean; content?: string; }
            const configDir = "/a/b/projects/myProject/src/";
            const file1: File = {
                path: configDir + "file1.ts",
                content: 'import module1 = require("module1");\nmodule1("hello");'
            };
            const file2: File = {
                path: configDir + "file2.ts",
                content: 'import module11 = require("module1");\nmodule11("hello");'
            };
            const module1: File = {
                path: "/a/b/projects/myProject/node_modules/module1/index.js",
                content: "module.exports = options => { return options.toString(); }"
            };
            const configFile: File = {
                path: configDir + "tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        allowJs: true,
                        rootDir: ".",
                        outDir: "../dist",
                        moduleResolution: "node",
                        maxNodeModuleJsDepth: 1
                    }
                })
            };
            const outDirFolder = "/a/b/projects/myProject/dist/";
            const programFiles = [file1, file2, module1, libFile];
            const host = createWatchedSystem(programFiles.concat(configFile), { currentDirectory: "/a/b/projects/myProject/" });
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramActualFiles(watch(), programFiles.map(f => f.path));
            checkOutputErrorsInitial(host, emptyArray);
            const expectedFiles: ExpectedFile[] = [
                createExpectedEmittedFile(file1),
                createExpectedEmittedFile(file2),
                createExpectedToNotEmitFile("index.js"),
                createExpectedToNotEmitFile("src/index.js"),
                createExpectedToNotEmitFile("src/file1.js"),
                createExpectedToNotEmitFile("src/file2.js"),
                createExpectedToNotEmitFile("lib.js"),
                createExpectedToNotEmitFile("lib.d.ts")
            ];
            verifyExpectedFiles(expectedFiles);

            file1.content += "\n;";
            expectedFiles[0].content += ";\n"; // Only emit file1 with this change
            expectedFiles[1].isExpectedToEmit = false;
            host.reloadFS(programFiles.concat(configFile));
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), programFiles.map(f => f.path));
            checkOutputErrorsIncremental(host, emptyArray);
            verifyExpectedFiles(expectedFiles);


            function verifyExpectedFiles(expectedFiles: ExpectedFile[]) {
                forEach(expectedFiles, f => {
                    assert.equal(!!host.fileExists(f.path), f.isExpectedToEmit, "File " + f.path + " is expected to " + (f.isExpectedToEmit ? "emit" : "not emit"));
                    if (f.isExpectedToEmit) {
                        assert.equal(host.readFile(f.path), f.content, "Expected contents of " + f.path);
                    }
                });
            }

            function createExpectedToNotEmitFile(fileName: string): ExpectedFile {
                return {
                    path: outDirFolder + fileName,
                    isExpectedToEmit: false
                };
            }

            function createExpectedEmittedFile(file: File): ExpectedFile {
                return {
                    path: removeFileExtension(file.path.replace(configDir, outDirFolder)) + Extension.Js,
                    isExpectedToEmit: true,
                    content: '"use strict";\nexports.__esModule = true;\n' + file.content.replace("import", "var") + "\n"
                };
            }
        });

        it("works when renaming node_modules folder that already contains @types folder", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const file: File = {
                path: `${currentDirectory}/a.ts`,
                content: `import * as q from "qqq";`
            };
            const module: File = {
                path: `${currentDirectory}/node_modules2/@types/qqq/index.d.ts`,
                content: "export {}"
            };
            const files = [file, module, libFile];
            const host = createWatchedSystem(files, { currentDirectory });
            const watch = createWatchOfFilesAndCompilerOptions([file.path], host);
            checkProgramActualFiles(watch(), [file.path, libFile.path]);
            checkOutputErrorsInitial(host, [getDiagnosticModuleNotFoundOfFile(watch(), file, "qqq")]);

            host.renameFolder(`${currentDirectory}/node_modules2`, `${currentDirectory}/node_modules`);
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), [file.path, libFile.path, `${currentDirectory}/node_modules/@types/qqq/index.d.ts`]);
            checkOutputErrorsIncremental(host, emptyArray);
        });
    });

    describe("tsc-watch with when module emit is specified as node", () => {
        it("when instead of filechanged recursive directory watcher is invoked", () => {
            const configFile: File = {
                path: "/a/rootFolder/project/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        module: "none",
                        allowJs: true,
                        outDir: "Static/scripts/"
                    },
                    include: [
                        "Scripts/**/*"
                    ],
                })
            };
            const outputFolder = "/a/rootFolder/project/Static/scripts/";
            const file1: File = {
                path: "/a/rootFolder/project/Scripts/TypeScript.ts",
                content: "var z = 10;"
            };
            const file2: File = {
                path: "/a/rootFolder/project/Scripts/Javascript.js",
                content: "var zz = 10;"
            };
            const files = [configFile, file1, file2, libFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfConfigFile(configFile.path, host);

            checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
            file1.content = "var zz30 = 100;";
            host.reloadFS(files, { invokeDirectoryWatcherInsteadOfFileChanged: true });
            host.runQueuedTimeoutCallbacks();

            checkProgramActualFiles(watch(), mapDefined(files, f => f === configFile ? undefined : f.path));
            const outputFile1 = changeExtension((outputFolder + getBaseFileName(file1.path)), ".js");
            assert.isTrue(host.fileExists(outputFile1));
            assert.equal(host.readFile(outputFile1), file1.content + host.newLine);
        });
    });

    describe("tsc-watch console clearing", () => {
        function checkConsoleClearing(options: CompilerOptions = {}) {
            const file = {
                path: "f.ts",
                content: ""
            };
            const files = [file, libFile];
            const disableConsoleClear = options.diagnostics || options.extendedDiagnostics || options.preserveWatchOutput;
            const host = createWatchedSystem(files);
            createWatchOfFilesAndCompilerOptions([file.path], host, options);
            checkOutputErrorsInitial(host, emptyArray, disableConsoleClear, options.extendedDiagnostics && [
                "Current directory: / CaseSensitiveFileNames: false\n",
                "Synchronizing program\n",
                "CreatingProgramWith::\n",
                "  roots: [\"f.ts\"]\n",
                "  options: {\"extendedDiagnostics\":true}\n",
                "FileWatcher:: Added:: WatchInfo: f.ts 250 Source file\n",
                "FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 Source file\n"
            ]);

            file.content = "//";
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray, disableConsoleClear, options.extendedDiagnostics && [
                "FileWatcher:: Triggered with /f.ts1:: WatchInfo: f.ts 250 Source file\n",
                "Scheduling update\n",
                "Elapsed:: 0ms FileWatcher:: Triggered with /f.ts1:: WatchInfo: f.ts 250 Source file\n"
            ], options.extendedDiagnostics && [
                "Synchronizing program\n",
                "CreatingProgramWith::\n",
                "  roots: [\"f.ts\"]\n",
                "  options: {\"extendedDiagnostics\":true}\n"
            ]);
        }

        it("without --diagnostics or --extendedDiagnostics", () => {
            checkConsoleClearing();
        });
        it("with --diagnostics", () => {
            checkConsoleClearing({
                diagnostics: true,
            });
        });
        it("with --extendedDiagnostics", () => {
            checkConsoleClearing({
                extendedDiagnostics: true,
            });
        });
        it("with --preserveWatchOutput", () => {
            checkConsoleClearing({
                preserveWatchOutput: true,
            });
        });
    });

    describe("tsc-watch with different polling/non polling options", () => {
        it("watchFile using dynamic priority polling", () => {
            const projectFolder = "/a/username/project";
            const file1: File = {
                path: `${projectFolder}/typescript.ts`,
                content: "var z = 10;"
            };
            const files = [file1, libFile];
            const environmentVariables = createMap<string>();
            environmentVariables.set("TSC_WATCHFILE", "DynamicPriorityPolling");
            const host = createWatchedSystem(files, { environmentVariables });
            const watch = createWatchOfFilesAndCompilerOptions([file1.path], host);

            const initialProgram = watch();
            verifyProgram();

            const mediumPollingIntervalThreshold = unchangedPollThresholds[PollingInterval.Medium];
            for (let index = 0; index < mediumPollingIntervalThreshold; index++) {
                // Transition libFile and file1 to low priority queue
                host.checkTimeoutQueueLengthAndRun(1);
                assert.deepEqual(watch(), initialProgram);
            }

            // Make a change to file
            file1.content = "var zz30 = 100;";
            host.reloadFS(files);

            // This should detect change in the file
            host.checkTimeoutQueueLengthAndRun(1);
            assert.deepEqual(watch(), initialProgram);

            // Callbacks: medium priority + high priority queue and scheduled program update
            host.checkTimeoutQueueLengthAndRun(3);
            // During this timeout the file would be detected as unchanged
            let fileUnchangeDetected = 1;
            const newProgram = watch();
            assert.notStrictEqual(newProgram, initialProgram);

            verifyProgram();
            const outputFile1 = changeExtension(file1.path, ".js");
            assert.isTrue(host.fileExists(outputFile1));
            assert.equal(host.readFile(outputFile1), file1.content + host.newLine);

            const newThreshold = unchangedPollThresholds[PollingInterval.Low] + mediumPollingIntervalThreshold;
            for (; fileUnchangeDetected < newThreshold; fileUnchangeDetected++) {
                // For high + Medium/low polling interval
                host.checkTimeoutQueueLengthAndRun(2);
                assert.deepEqual(watch(), newProgram);
            }

            // Everything goes in high polling interval queue
            host.checkTimeoutQueueLengthAndRun(1);
            assert.deepEqual(watch(), newProgram);

            function verifyProgram() {
                checkProgramActualFiles(watch(), files.map(f => f.path));
                checkWatchedFiles(host, []);
                checkWatchedDirectories(host, [], /*recursive*/ false);
                checkWatchedDirectories(host, [], /*recursive*/ true);
            }
        });

        describe("tsc-watch when watchDirectories implementation", () => {
            function verifyRenamingFileInSubFolder(tscWatchDirectory: TestFSWithWatch.Tsc_WatchDirectory) {
                const projectFolder = "/a/username/project";
                const projectSrcFolder = `${projectFolder}/src`;
                const configFile: File = {
                    path: `${projectFolder}/tsconfig.json`,
                    content: "{}"
                };
                const file: File = {
                    path: `${projectSrcFolder}/file1.ts`,
                    content: ""
                };
                const programFiles = [file, libFile];
                const files = [file, configFile, libFile];
                const environmentVariables = createMap<string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", tscWatchDirectory);
                const host = createWatchedSystem(files, { environmentVariables });
                const watch = createWatchOfConfigFile(configFile.path, host);
                const projectFolders = [projectFolder, projectSrcFolder, `${projectFolder}/node_modules/@types`];
                // Watching files config file, file, lib file
                const expectedWatchedFiles = files.map(f => f.path);
                const expectedWatchedDirectories = tscWatchDirectory === TestFSWithWatch.Tsc_WatchDirectory.NonRecursiveWatchDirectory ? projectFolders : emptyArray;
                if (tscWatchDirectory === TestFSWithWatch.Tsc_WatchDirectory.WatchFile) {
                    expectedWatchedFiles.push(...projectFolders);
                }

                verifyProgram(checkOutputErrorsInitial);

                // Rename the file:
                file.path = file.path.replace("file1.ts", "file2.ts");
                expectedWatchedFiles[0] = file.path;
                host.reloadFS(files);
                if (tscWatchDirectory === TestFSWithWatch.Tsc_WatchDirectory.DynamicPolling) {
                    // With dynamic polling the fs change would be detected only by running timeouts
                    host.runQueuedTimeoutCallbacks();
                }
                // Delayed update program
                host.runQueuedTimeoutCallbacks();
                verifyProgram(checkOutputErrorsIncremental);

                function verifyProgram(checkOutputErrors: (host: WatchedSystem, errors: ReadonlyArray<Diagnostic>) => void) {
                    checkProgramActualFiles(watch(), programFiles.map(f => f.path));
                    checkOutputErrors(host, emptyArray);

                    const outputFile = changeExtension(file.path, ".js");
                    assert(host.fileExists(outputFile));
                    assert.equal(host.readFile(outputFile), file.content);

                    checkWatchedDirectories(host, emptyArray, /*recursive*/ true);

                    // Watching config file, file, lib file and directories
                    TestFSWithWatch.checkMultiMapEachKeyWithCount("watchedFiles", host.watchedFiles, expectedWatchedFiles, 1);
                    TestFSWithWatch.checkMultiMapEachKeyWithCount("watchedDirectories", host.watchedDirectories, expectedWatchedDirectories, 1);
                }
            }

            it("uses watchFile when renaming file in subfolder", () => {
                verifyRenamingFileInSubFolder(TestFSWithWatch.Tsc_WatchDirectory.WatchFile);
            });

            it("uses non recursive watchDirectory when renaming file in subfolder", () => {
                verifyRenamingFileInSubFolder(TestFSWithWatch.Tsc_WatchDirectory.NonRecursiveWatchDirectory);
            });

            it("uses non recursive dynamic polling when renaming file in subfolder", () => {
                verifyRenamingFileInSubFolder(TestFSWithWatch.Tsc_WatchDirectory.DynamicPolling);
            });

            it("when there are symlinks to folders in recursive folders", () => {
                const cwd = "/home/user/projects/myproject";
                const file1: File = {
                    path: `${cwd}/src/file.ts`,
                    content: `import * as a from "a"`
                };
                const tsconfig: File = {
                    path: `${cwd}/tsconfig.json`,
                    content: `{ "compilerOptions": { "extendedDiagnostics": true, "traceResolution": true }}`
                };
                const realA: File = {
                    path: `${cwd}/node_modules/reala/index.d.ts`,
                    content: `export {}`
                };
                const realB: File = {
                    path: `${cwd}/node_modules/realb/index.d.ts`,
                    content: `export {}`
                };
                const symLinkA: SymLink = {
                    path: `${cwd}/node_modules/a`,
                    symLink: `${cwd}/node_modules/reala`
                };
                const symLinkB: SymLink = {
                    path: `${cwd}/node_modules/b`,
                    symLink: `${cwd}/node_modules/realb`
                };
                const symLinkBInA: SymLink = {
                    path: `${cwd}/node_modules/reala/node_modules/b`,
                    symLink: `${cwd}/node_modules/b`
                };
                const symLinkAInB: SymLink = {
                    path: `${cwd}/node_modules/realb/node_modules/a`,
                    symLink: `${cwd}/node_modules/a`
                };
                const files = [file1, tsconfig, realA, realB, symLinkA, symLinkB, symLinkBInA, symLinkAInB];
                const environmentVariables = createMap<string>();
                environmentVariables.set("TSC_WATCHDIRECTORY", TestFSWithWatch.Tsc_WatchDirectory.NonRecursiveWatchDirectory);
                const host = createWatchedSystem(files, { environmentVariables, currentDirectory: cwd });
                createWatchOfConfigFile("tsconfig.json", host);
                checkWatchedDirectories(host, emptyArray, /*recursive*/ true);
                checkWatchedDirectories(host, [cwd, `${cwd}/node_modules`, `${cwd}/node_modules/@types`, `${cwd}/node_modules/reala`, `${cwd}/node_modules/realb`,
                    `${cwd}/node_modules/reala/node_modules`, `${cwd}/node_modules/realb/node_modules`, `${cwd}/src`], /*recursive*/ false);
            });
        });
    });
}
