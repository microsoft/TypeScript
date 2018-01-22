/// <reference path="../harness.ts" />
/// <reference path="../../compiler/watch.ts" />
/// <reference path="../fakes.ts" />
/// <reference path="../vpath.ts" />
/// <reference path="../utils.ts" />

namespace ts.tscWatch {
    import theory = utils.theory;
    import spy = typemock.spy;
    import Arg = typemock.Arg;
    import Times = typemock.Times;

    import checkFileNames = utils.checkFileNames;

    export function checkProgramActualFiles(program: Program, expectedFiles: string[]) {
        checkFileNames(`Program actual files`, program.getSourceFiles().map(file => file.fileName), expectedFiles);
    }

    export function checkProgramRootFiles(program: Program, expectedFiles: string[]) {
        checkFileNames(`Program rootFileNames`, program.getRootFileNames(), expectedFiles);
    }

    function createWatchOfConfigFile(configFileName: string, host: ts.System, maxNumberOfFilesToIterateForInvalidation?: number) {
        const compilerHost = ts.createWatchCompilerHostOfConfigFile(configFileName, {}, host);
        compilerHost.maxNumberOfFilesToIterateForInvalidation = maxNumberOfFilesToIterateForInvalidation;
        const watch = createWatchProgram(compilerHost);
        return () => watch.getCurrentProgram().getProgram();
    }

    function createWatchOfFilesAndCompilerOptions(rootFiles: string[], host: ts.System, options: CompilerOptions = {}) {
        const watch = createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptions(rootFiles, options, host));
        return () => watch.getCurrentProgram().getProgram();
    }

    function formatOutputFile(path: string, host: ts.System) {
        return `TSFILE: ${path}${host.newLine}`;
    }

    function getEmittedLines(files: ReadonlyArray<string>, host: ts.System, getOutput: (file: string, host: ts.System) => string) {
        let result: string[] | undefined;
        if (files) {
            const seen = createMap<true>();
            result = [];
            for (const file of files) {
                const output = getOutput(file, host);
                if (output && !seen.has(output)) {
                    seen.set(output, true);
                    result.push(output);
                }
            }
        }
        return result;
    }

    enum ExpectedOutputErrorsPosition {
        BeforeCompilationStarts,
        AfterCompilationStarting,
        AfterFileChangeDetected
    }

    function checkOutputErrors(
        host: fakes.FakeServerHost,
        errors: ReadonlyArray<Diagnostic>,
        errorsPosition: ExpectedOutputErrorsPosition,
        skipWaiting?: true
    ) {
        const outputs = host.getOutput();
        const expectedOutputCount = errors.length + (skipWaiting ? 0 : 1) + 1;
        assert.equal(outputs.length, expectedOutputCount, "Outputs = " + outputs.toString());
        let index: number;

        switch (errorsPosition) {
            case ExpectedOutputErrorsPosition.AfterCompilationStarting:
                assertWatchDiagnosticAt(host, 0, Diagnostics.Starting_compilation_in_watch_mode);
                index = 1;
                break;
            case ExpectedOutputErrorsPosition.AfterFileChangeDetected:
                assertWatchDiagnosticAt(host, 0, Diagnostics.File_change_detected_Starting_incremental_compilation);
                index = 1;
                break;
            case ExpectedOutputErrorsPosition.BeforeCompilationStarts:
                assertWatchDiagnosticAt(host, errors.length, Diagnostics.Starting_compilation_in_watch_mode);
                index = 0;
                break;
        }

        forEach(errors, error => {
            assertDiagnosticAt(host, index, error);
            index++;
        });
        if (!skipWaiting) {
            if (errorsPosition === ExpectedOutputErrorsPosition.BeforeCompilationStarts) {
                assertWatchDiagnosticAt(host, index, ts.Diagnostics.Starting_compilation_in_watch_mode);
                index += 1;
            }
            assertWatchDiagnosticAt(host, index, Diagnostics.Compilation_complete_Watching_for_file_changes);
        }
        host.clearOutput();
    }

    function assertDiagnosticAt(host: fakes.FakeServerHost, outputAt: number, diagnostic: Diagnostic) {
        const output = host.getOutput()[outputAt];
        assert.equal(output, formatDiagnostic(diagnostic, host), "outputs[" + outputAt + "] is " + output);
    }

    function assertWatchDiagnosticAt(host: fakes.FakeServerHost, outputAt: number, diagnosticMessage: DiagnosticMessage) {
        const output = host.getOutput()[outputAt];
        assert.isTrue(endsWith(output, getWatchDiagnosticWithoutDate(host, diagnosticMessage)), "outputs[" + outputAt + "] is " + output);
    }

    function getWatchDiagnosticWithoutDate(host: fakes.FakeServerHost, diagnosticMessage: DiagnosticMessage) {
        return ` - ${flattenDiagnosticMessageText(getLocaleSpecificMessage(diagnosticMessage), host.newLine)}${host.newLine + host.newLine + host.newLine}`;
    }

    function getFile(program: Program, filePath: string) {
        return program.getSourceFileByPath(toPath(filePath, program.getCurrentDirectory(), s => s.toLowerCase()));
    }

    function getConfigFile(program: Program) {
        return program.getCompilerOptions().configFile;
    }

    function createDiagnostic(file: SourceFile | undefined, start: number | undefined, length: number | undefined, message: DiagnosticMessage, ...args: string[]): Diagnostic {
        let text = getLocaleSpecificMessage(message);
        if (args.length > 0) {
            text = formatStringFromArgs(text, args);
        }
        return {
            file,
            start,
            length,
            messageText: text,
            category: message.category,
            code: message.code,
        };
    }

    function createCompilerDiagnostic(message: DiagnosticMessage, ...args: string[]): Diagnostic {
        return createDiagnostic(/*file*/ undefined, /*start*/ undefined, /*length*/ undefined, message, ...args);
    }

    function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: string[]): Diagnostic {
        return createDiagnostic(file, start, length, message, ...args);
    }

    function createUnknownCompilerOptionDiagnostic(program: Program, content: string, option: string) {
        const quotedOption = `"${option}"`;
        return createFileDiagnostic(getConfigFile(program), content.indexOf(quotedOption), quotedOption.length, Diagnostics.Unknown_compiler_option_0, option);
    }

    function createExclusiveCompilerOptionDiagnostic(program: Program, content: string, option1: string, option2: string, checkFirst: boolean) {
        const quotedOption1 = `"${checkFirst ? option1 : option2 }"`;
        return createFileDiagnostic(getConfigFile(program), content.indexOf(quotedOption1), quotedOption1.length, Diagnostics.Option_0_cannot_be_specified_with_option_1, option1, option2);
    }

    function createCannotFindModuleDiagnostic(program: Program, path: string, content: string, moduleName: string) {
        const quotedModuleName = `"${moduleName}"`;
        return createFileDiagnostic(getFile(program, path), content.indexOf(quotedModuleName), quotedModuleName.length, Diagnostics.Cannot_find_module_0, moduleName);
    }

    function createFileIsNotAModuleDiagnostic(program: Program, path: string, content: string, moduleName: string, modulePath: string) {
        const quotedModuleName = `"${moduleName}"`;
        return createFileDiagnostic(getFile(program, path), content.indexOf(quotedModuleName), quotedModuleName.length, Diagnostics.File_0_is_not_a_module, modulePath);
    }

    function createFileNotFoundDiagnostic(program: Program, path: string, content: string, fragment: string, file: string) {
        return createFileDiagnostic(getFile(program, path), content.indexOf(fragment), fragment.length, Diagnostics.File_0_not_found, file);
    }

    function createCannotFindNameDiagnostic(program: Program, path: string, content: string, name: string) {
        return createFileDiagnostic(getFile(program, path), content.indexOf(name), name.length, Diagnostics.Cannot_find_name_0, name);
    }

    describe("tsc-watch", () => {

        describe("program updates", () => {
            it("create watch without config file", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/c/app.ts": `import {f} from "./module"\nconsole.log(f)`,
                    "/a/b/c/module.d.ts": `export let x: number`,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/c/app.ts"], host);
                checkProgramActualFiles(watch(), ["/a/b/c/app.ts", fakes.FakeServerHost.libPath, "/a/b/c/module.d.ts"]);

                // TODO: Should we watch creation of config files in the root file's file hierarchy?

                // const configFileLocations = ["/a/b/c/", "/a/b/", "/a/", "/"];
                // const configFiles = flatMap(configFileLocations, location => [location + "tsconfig.json", location + "jsconfig.json"]);
                // checkWatchedFiles(host, configFiles.concat(mocks.MockServerHost.libPath, "/a/b/c/module.d.ts"));
            });

            it("can handle tsconfig file name with difference casing", () => {
                const host = new fakes.FakeServerHost({ vfs: { useCaseSensitiveFileNames: false } }, /*files*/ {
                    "/a/b/app.ts": `let x = 1`,
                    "/a/b/tsconfig.json": `{ "include": ["app.ts"] }`,
                });

                const watch = createWatchOfConfigFile("/A/B/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/A/B/app.ts"]);
            });

            it("create configured project without file list", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/tsconfig.json": `{ "compilerOptions": {}, "exclude": ["e"] }`,
                    "/a/b/c/f1.ts": `let x = 1`,
                    "/a/b/d/f2.ts": `let y = 1`,
                    "/a/b/e/f3.ts": `let z = 1`,
                });

                const watch = createWatchProgram(createWatchCompilerHostOfConfigFile("/a/b/tsconfig.json", {}, host, /*createProgram*/ undefined, notImplemented));

                checkProgramActualFiles(watch.getCurrentProgram().getProgram(), ["/a/b/c/f1.ts", fakes.FakeServerHost.libPath, "/a/b/d/f2.ts"]);
                checkProgramRootFiles(watch.getCurrentProgram().getProgram(), ["/a/b/c/f1.ts", "/a/b/d/f2.ts"]);
                host.checkWatchedFiles(["/a/b/tsconfig.json", "/a/b/c/f1.ts", "/a/b/d/f2.ts", fakes.FakeServerHost.libPath]);
                host.checkWatchedDirectories(["/a/b", "/a/b/node_modules/@types"], /*recursive*/ true);
            });

            // TODO: if watching for config file creation
            // it("add and then remove a config file in a folder with loose files", () => {
            // });

            it("add new files to a configured program without file list", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/commonFile1.ts": `let x = 1`,
                    "/a/b/tsconfig.json": `{}`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                host.checkWatchedDirectories(["/a/b", "/a/b/node_modules/@types"], /*recursive*/ true);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts"]);

                // add a new ts file
                host.vfs.writeFileSync("/a/b/commonFile2.ts", `let y = 1`);

                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"]);
            });

            it("should ignore non-existing files specified in the config file", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/commonFile1.ts": `let x = 1`,
                    "/a/b/commonFile2.ts": `let y = 1`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {}, "files": ["commonFile1.ts", "commonFile3.ts"] }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts", "/a/b/commonFile3.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/commonFile1.ts"]);
            });

            it("handle recreated files correctly", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/commonFile1.ts": `let x = 1`,
                    "/a/b/commonFile2.ts": `let y = 1`,
                    "/a/b/tsconfig.json": `{}`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"]);

                // delete commonFile2
                host.vfs.unlinkSync("/a/b/commonFile2.ts");
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts"]);

                // re-add commonFile2
                host.vfs.writeFileSync("/a/b/commonFile2.ts", `let y = 1`);
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"]);
            });

            it("handles the missing files - that were added to program because they were added with ///<ref", () => {
                const file1Content = `/// <reference path="commonFile2.ts"/>\nlet x = y`;

                const host = new fakes.FakeServerHost({ lib: true, vfs: { useCaseSensitiveFileNames: false } }, /*files*/ {
                    "/a/b/commonFile1.ts": file1Content,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/commonFile1.ts"], host);

                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/commonFile1.ts", fakes.FakeServerHost.libPath]);
                checkOutputErrors(host, [
                    createFileNotFoundDiagnostic(watch(), "/a/b/commonFile1.ts", file1Content, "commonFile2.ts", "/a/b/commonFile2.ts"),
                    createCannotFindNameDiagnostic(watch(), "/a/b/commonFile1.ts", file1Content, "y"),
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                host.vfs.writeFileSync("/a/b/commonFile2.ts", `let y = 1`);
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/commonFile1.ts", fakes.FakeServerHost.libPath, "/a/b/commonFile2.ts"]);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("should reflect change in config file", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/commonFile1.ts": `let x = 1`,
                    "/a/b/commonFile2.ts": `let y = 1`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {}, "files": ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"] }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"]);

                host.vfs.writeFileSync("/a/b/tsconfig.json", `{ "compilerOptions": {}, "files": ["/a/b/commonFile1.ts"] }`);
                host.checkTimeoutQueueLengthAndRun(1); // reload the configured project
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts"]);
            });

            it("files explicitly excluded in config file", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/commonFile1.ts": `let x = 1`,
                    "/a/b/commonFile2.ts": `let y = 1`,
                    "/a/c/excludedFile1.ts": `let t = 1;`,
                    "/a/tsconfig.json": `{ "compilerOptions": {}, "exclude": ["/a/c"] }`,
                });

                const watch = createWatchOfConfigFile("/a/tsconfig.json", host);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"]);
            });

            it("should properly handle module resolution changes in config file", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/file1.ts": `import { T } from "module1";`,
                    "/a/b/node_modules/module1.ts": `export interface T {}`,
                    "/a/module1.ts": `export interface T {}`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": { "moduleResolution": "node" }, "files": ["/a/b/file1.ts"] }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramRootFiles(watch(), ["/a/b/file1.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/file1.ts", "/a/b/node_modules/module1.ts"]);

                host.vfs.writeFileSync("/a/b/tsconfig.json", `{ "compilerOptions": { "moduleResolution": "classic" }, "files": ["/a/b/file1.ts"] }`);
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/file1.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/file1.ts", "/a/module1.ts"]);
            });

            it("should tolerate config file errors and still try to build a project", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/commonFile1.ts": `let x = 1`,
                    "/a/b/commonFile2.ts": `let y = 1`,
                    "/a/b/tsconfig.json":
                        `{\n` +
                        `   "compilerOptions": {\n` +
                        `        "target": "es6",\n` +
                        `        "allowAnything": true\n` +
                        `    },\n` +
                        `    "someOtherProperty": {}\n` +
                        `}`
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramRootFiles(watch(), ["/a/b/commonFile1.ts", "/a/b/commonFile2.ts"]);
            });

            it("changes in files are reflected in project structure", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts": `export * from "./f2"`,
                    "/a/b/f2.ts": `export let x = 1`,
                    "/a/c/f3.ts": `export let y = 1;`,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/f1.ts"], host);
                checkProgramRootFiles(watch(), ["/a/b/f1.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);

                host.vfs.writeFileSync("/a/b/f2.ts", `export * from "../c/f3"`); // now inferred project should inclule file3
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/f1.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts", "/a/c/f3.ts"]);
            });

            it("deleted files affect project structure", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts": `export * from "./f2"`,
                    "/a/b/f2.ts": `export * from "../c/f3"`,
                    "/a/c/f3.ts": `export let y = 1;`,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/f1.ts"], host);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts", "/a/c/f3.ts"]);

                host.vfs.unlinkSync("/a/b/f2.ts");
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts"]);
            });

            it("deleted files affect project structure - 2", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts": `export * from "./f2"`,
                    "/a/b/f2.ts": `export * from "../c/f3"`,
                    "/a/c/f3.ts": `export let y = 1;`,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/f1.ts", "/a/c/f3.ts"], host);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts", "/a/c/f3.ts"]);

                host.vfs.unlinkSync("/a/b/f2.ts");
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/c/f3.ts"]);
            });

            it("config file includes the file", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts": `export let x = 5`,
                    "/a/c/f2.ts": `import {x} from "../b/f1"`,
                    "/a/c/f3.ts": `export let y = 1`,
                    "/a/c/tsconfig.json": `{ "compilerOptions": {}, "files": ["f2.ts", "f3.ts"] }`,
                });

                const watch = createWatchOfConfigFile("/a/c/tsconfig.json", host);
                checkProgramRootFiles(watch(), ["/a/c/f2.ts", "/a/c/f3.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/c/f2.ts", "/a/c/f3.ts"]);
            });

            it("correctly migrate files between projects", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts":
                        `export * from "../c/f2";\n` +
                        `export * from "../d/f3";`,
                    "/a/c/f2.ts": `export let x = 1;`,
                    "/a/d/f3.ts": `export let y = 1;`,
                });

                const watch1 = createWatchOfFilesAndCompilerOptions(["/a/c/f2.ts", "/a/d/f3.ts"], host);
                checkProgramActualFiles(watch1(), ["/a/c/f2.ts", "/a/d/f3.ts"]);

                const watch2 = createWatchOfFilesAndCompilerOptions(["/a/b/f1.ts"], host);
                checkProgramActualFiles(watch2(), ["/a/b/f1.ts", "/a/c/f2.ts", "/a/d/f3.ts"]);

                // Previous program shouldnt be updated
                checkProgramActualFiles(watch1(), ["/a/c/f2.ts", "/a/d/f3.ts"]);
                host.checkTimeoutQueueLength(0);
            });

            it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts": `let x = 1`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {} }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts"]);

                host.vfs.writeFileSync("/a/b/f2.ts", `let y = 1`);
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);
                checkProgramRootFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);
            });

            it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts": `let x = 1`,
                    "/a/b/f2.ts": `let y = 1`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {}, "files": ["f1.ts"] }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts"]);

                host.vfs.writeFileSync("/a/b/tsconfig.json", `{ "compilerOptions": {}, "files": ["f1.ts", "f2.ts"] }`);
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);
            });

            it("can update configured project when set of root files was not changed", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/f1.ts": `let x = 1`,
                    "/a/b/f2.ts": `let y = 1`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {}, "files": ["f1.ts", "f2.ts"] }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);

                host.vfs.writeFileSync("/a/b/tsconfig.json", `{ "compilerOptions": { "outFile": "out.js" }, "files": ["f1.ts", "f2.ts"] }`);
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramRootFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);
                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts"]);
            });

            it("config file is deleted", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/f1.ts": `let x = 1`,
                    "/a/b/f2.ts": `let y = 1`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {} }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);

                checkProgramActualFiles(watch(), ["/a/b/f1.ts", "/a/b/f2.ts", fakes.FakeServerHost.libPath]);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                host.vfs.unlinkSync("/a/b/tsconfig.json");
                host.checkTimeoutQueueLengthAndRun(1);

                assert.equal(host.exitCode, ExitStatus.DiagnosticsPresent_OutputsSkipped);
                checkOutputErrors(host, [
                    createCompilerDiagnostic(Diagnostics.File_0_not_found, "/a/b/tsconfig.json")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected, /*skipWaiting*/ true);
            });

            it("Proper errors: document is not contained in project", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/app.ts": ``,
                    "/a/b/tsconfig.json": `{`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/a/b/app.ts"]);
            });

            it("correctly handles changes in lib section of config file", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/.ts/lib.es5.d.ts": `declare const eval: any`,
                    "/.ts/lib.es2015.promise.d.ts": `declare class Promise<T> {}`,
                    "/src/app.ts": `var x: Promise<string>;`,
                    "/src/tsconfig.json": `{ "compilerOptions": { "lib": ["es5"] } }`,
                });

                const watch = createWatchOfConfigFile("/src/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/.ts/lib.es5.d.ts", "/src/app.ts"]);

                host.vfs.writeFileSync("/src/tsconfig.json", `{ "compilerOptions": { "lib": ["es5", "es2015.promise"] } }`);
                host.checkTimeoutQueueLengthAndRun(1);
                checkProgramActualFiles(watch(), ["/.ts/lib.es5.d.ts", "/.ts/lib.es2015.promise.d.ts", "/src/app.ts"]);
            });

            it("should handle non-existing directories in config file", () => {
                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/src/app.ts": `let x = 1;`,
                    "/a/tsconfig.json": `{ "compilerOptions": {}, "include": ["src/**/*", "notexistingfolder/*"] }`,
                });

                const watch = createWatchOfConfigFile("/a/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/a/src/app.ts"]);
            });

            it("rename a module file and rename back should restore the states for inferred projects", () => {
                const file1Content = `import * as T from "./moduleFile"; T.bar();`;
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/file1.ts": file1Content,
                    "/a/b/moduleFile.ts": `export function bar() { };`,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/file1.ts"], host);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                host.vfs.unlinkSync("/a/b/moduleFile.js");
                host.vfs.renameSync("/a/b/moduleFile.ts", "/a/b/moduleFile1.ts");

                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/b/file1.ts", file1Content, "./moduleFile")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                host.vfs.renameSync("/a/b/moduleFile1.ts", "/a/b/moduleFile.ts");

                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("rename a module file and rename back should restore the states for configured projects", () => {
                const file1Content = `import * as T from "./moduleFile"; T.bar();`;
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/file1.ts": file1Content,
                    "/a/b/moduleFile.ts": `export function bar() { };`,
                    "/a/b/tsconfig.json": `{}`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                host.vfs.unlinkSync("/a/b/moduleFile.js");
                host.vfs.renameSync("/a/b/moduleFile.ts", "/a/b/moduleFile1.ts");

                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/b/file1.ts", file1Content, "./moduleFile")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                host.vfs.unlinkSync("/a/b/moduleFile1.js");
                host.vfs.renameSync("/a/b/moduleFile1.ts", "/a/b/moduleFile.ts");

                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("types should load from config file path if config exists", () => {
                const host = new fakes.FakeServerHost({ vfs: { currentDirectory: "/a/c" } }, /*files*/ {
                    "/a/c": {},
                    "/a/b/app.ts": `let x = 1`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": { "types": ["node"], "typeRoots": [] } }`,
                    "/a/b/node_modules/@types/node/index.d.ts": `declare var process: any`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramActualFiles(watch(), ["/a/b/app.ts", "/a/b/node_modules/@types/node/index.d.ts"]);
            });

            it("add the missing module file for inferred project: should remove the `module not found` error", () => {
                const file1Content = `import * as T from "./moduleFile"; T.bar();`;
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/file1.ts": file1Content,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/file1.ts"], host);

                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/b/file1.ts", file1Content, "./moduleFile")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                host.vfs.writeFileSync("/a/b/moduleFile.ts", `export function bar() { };`);

                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("Configure file diagnostics events are generated when the config file has errors", () => {
                const configFileContent = `{ "compilerOptions": { "foo": "bar", "allowJS": true } }`;
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/app.ts": `let x = 10`,
                    "/a/b/tsconfig.json": configFileContent,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkOutputErrors(host, [
                    createUnknownCompilerOptionDiagnostic(watch(), configFileContent, "foo"),
                    createUnknownCompilerOptionDiagnostic(watch(), configFileContent, "allowJS")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.BeforeCompilationStarts);
            });

            it("If config file doesnt have errors, they are not reported", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/app.ts": `let x = 10`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {} }`,
                });

                createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);
            });

            it("Reports errors when the config file changes", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/app.ts": `let x = 10`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {} }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                const configFileBadContent = `{ "compilerOptions": { "haha": 123 } }`;
                host.vfs.writeFileSync("/a/b/tsconfig.json", configFileBadContent);

                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, [
                    createUnknownCompilerOptionDiagnostic(watch(), configFileBadContent, "haha")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                host.vfs.writeFileSync("/a/b/tsconfig.json", `{ "compilerOptions": {} }`);

                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("non-existing directories listed in config file input array should be tolerated without crashing the server", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/file1.ts": `let t = 10;`,
                    "/a/b/tsconfig.json": `{ "compilerOptions": {}, "include": ["app/*", "test/**/*", "something"] }`,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                checkProgramActualFiles(watch(), [fakes.FakeServerHost.libPath]);
            });

            it("non-existing directories listed in config file input array should be able to handle @types if input file list is empty", () => {
                const host = new fakes.FakeServerHost({ vfs: { currentDirectory: "/a/" } }, /*files*/ {
                    "/a/app.ts": `let x = 1`,
                    "/a/tsconfig.json": `{ "compilerOptions": {}, "files": [] }`,
                    "/a/node_modules/@types/typings/index.d.ts": `export * from "./lib"`,
                    "/a/node_modules/@types/typings/lib.d.ts": `export const x: number`,
                });

                const watch = createWatchOfConfigFile("/a/tsconfig.json", host);

                checkProgramActualFiles(watch(), ["/a/node_modules/@types/typings/index.d.ts", "/a/node_modules/@types/typings/lib.d.ts"]);
            });

            it("should support files without extensions", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/compile": `let x = 1`,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/compile"], host, { allowNonTsExtensions: true });
                checkProgramActualFiles(watch(), ["/a/compile", fakes.FakeServerHost.libPath]);
            });

            it("Options Diagnostic locations reported correctly with changes in configFile contents when options change", () => {
                const configFileContentComment =
                    `    // comment\n` +
                    `    // More comment\n`;
                const configFileContentWithComment =
                    `{\n` +
                    configFileContentComment +
                    `    "compilerOptions": {\n` +
                    `        "allowJs": true,\n` +
                    `        "declaration": true\n` +
                    `    }\n` +
                    `}`;
                const configFileContentWithoutComment =
                    `{\n` +
                    `    "compilerOptions": {\n` +
                    `        "allowJs": true,\n` +
                    `        "declaration": true\n` +
                    `    }\n` +
                    `}`;

                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/b/app.ts": `let x = 10`,
                    "/a/b/tsconfig.json": configFileContentWithComment,
                });

                const watch = createWatchOfConfigFile("/a/b/tsconfig.json", host);
                const initialErrors = [
                    createExclusiveCompilerOptionDiagnostic(watch(), configFileContentWithComment, "allowJs", "declaration", /*checkFirst*/ true),
                    createExclusiveCompilerOptionDiagnostic(watch(), configFileContentWithComment, "allowJs", "declaration", /*checkFirst*/ false)
                ];
                checkOutputErrors(host, initialErrors, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                host.vfs.writeFileSync("/a/b/tsconfig.json", configFileContentWithoutComment);
                host.runQueuedTimeoutCallbacks();
                const nowErrors = [
                    createExclusiveCompilerOptionDiagnostic(watch(), configFileContentWithoutComment, "allowJs", "declaration", /*checkFirst*/ true),
                    createExclusiveCompilerOptionDiagnostic(watch(), configFileContentWithoutComment, "allowJs", "declaration", /*checkFirst*/ false)
                ];
                checkOutputErrors(host, nowErrors, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                assert.equal(nowErrors[0].start, initialErrors[0].start - configFileContentComment.length);
                assert.equal(nowErrors[1].start, initialErrors[1].start - configFileContentComment.length);
            });

            it("should not trigger recompilation because of program emit", () => {
                const proj = "/user/username/projects/myproject";
                const host = new fakes.FakeServerHost({ lib: true, vfs: { currentDirectory: proj } }, /*files*/ { [proj]: {
                    "file1.ts": `export const c = 30;`,
                    "src/file2.ts": `import {c} from "file1"; export const d = 30;`,
                    "tsconfig.json": JSON.stringify({
                        compilerOptions: {
                            module: "amd",
                            outDir: "build"
                        }
                    })
                }});
                const watch = createWatchOfConfigFile(`${proj}/tsconfig.json`, host, /*maxNumberOfFilesToIterateForInvalidation*/1);
                checkProgramActualFiles(watch(), [`${proj}/file1.ts`, `${proj}/src/file2.ts`, fakes.FakeServerHost.libPath]);

                assert.isTrue(host.fileExists("build/file1.js"));
                assert.isTrue(host.fileExists("build/src/file2.js"));

                // This should be 0
                host.checkTimeoutQueueLengthAndRun(0);
            });
        });

        describe("emit once", () => {
            function verifyFilesEmittedOnce(useOutFile: boolean) {
                const configContent = JSON.stringify({
                    compilerOptions: useOutFile ?
                        { outFile: "../output/common.js", target: "es5" } :
                        { outDir: "../output", target: "es5" },
                    files: [
                        "/a/b/output/AnotherDependency/file1.d.ts",
                        "/a/b/dependencies/file2.d.ts",
                        "/a/b/project/src/main.ts",
                        "/a/b/project/src/main2.ts"
                    ]
                });

                const host = new fakes.FakeServerHost({}, /*files*/ {
                    "/a/b/output/AnotherDependency/file1.d.ts": `declare namespace Common.SomeComponent.DynamicMenu { enum Z { Full = 0, Min = 1, Average = 2, } }`,
                    "/a/b/dependencies/file2.d.ts": `declare namespace Dependencies.SomeComponent { export class SomeClass { version: string; } }`,
                    "/a/b/project/src/main.ts": `namespace Main { export function fooBar() { } }`,
                    "/a/b/project/src/main2.ts": `namespace main.file4 { import DynamicMenu = Common.SomeComponent.DynamicMenu; export function foo(a: DynamicMenu.z) { } }`,
                    "/a/b/project/tsconfig.json": configContent,
                });

                const writeFileSpy = spy(host, "writeFile");

                createWatchOfConfigFile("/a/b/project/tsconfig.json", host);

                if (useOutFile) {
                    writeFileSpy
                        .verify(_ => _("/a/b/output/common.js", Arg.string(), Arg.any()), Times.once())
                        .verify(_ => _(Arg.string(), Arg.string(), Arg.any()), Times.once())
                        .revoke();
                }
                else {
                    writeFileSpy
                        .verify(_ => _("/a/b/output/main.js", Arg.string(), Arg.any()), Times.once())
                        .verify(_ => _("/a/b/output/main2.js", Arg.string(), Arg.any()), Times.once())
                        .verify(_ => _(Arg.string(), Arg.string(), Arg.any()), Times.exactly(2))
                        .revoke();
                }
            }

            it("with --outFile and multiple declaration files in the program", () => {
                verifyFilesEmittedOnce(/*useOutFile*/ true);
            });

            it("without --outFile and multiple declaration files in the program", () => {
                verifyFilesEmittedOnce(/*useOutFile*/ false);
            });
        });

        describe("emit", () => {
            function writeFile(host: fakes.FakeServerHost, path: string, content: string) {
                vfsutils.writeFile(host.vfs, path, content);
            }

            function writeConfigFile(host: fakes.FakeServerHost, path: string, config: any = {}) {
                const compilerOptions = (config.compilerOptions || (config.compilerOptions = {}));
                compilerOptions.listEmittedFiles = true;
                writeFile(host, path, JSON.stringify(config));
            }

            function waitAndCheckAffectedFiles(host: fakes.FakeServerHost, affectedFiles: ReadonlyArray<string>, unaffectedFiles?: ReadonlyArray<string>) {
                host.checkTimeoutQueueLengthAndRun(1);
                checkAffectedFiles(host, affectedFiles, unaffectedFiles);
            }

            function checkAffectedFiles(host: fakes.FakeServerHost, affectedFiles: ReadonlyArray<string>, unaffectedFiles?: ReadonlyArray<string>) {
                affectedFiles = getEmittedLines(affectedFiles, host, formatOutputFile);
                host.checkOutputContains(affectedFiles);
                if (unaffectedFiles) {
                    unaffectedFiles = getEmittedLines(unaffectedFiles, host, formatOutputFile);
                    unaffectedFiles = mapDefined(unaffectedFiles, line => contains(affectedFiles, line) ? undefined : line);
                    host.checkOutputDoesNotContain(unaffectedFiles);
                }
                host.clearOutput();
            }

            describe("affected files", () => {
                describe("with --outFile or --out", () => {
                    const configFilePath = "/a/tsconfig.json";
                    const file1Path = "/a/a.ts";
                    const file1OutputPath = "/a/a.js";
                    const file2Path = "/a/b.ts";
                    const file2OutputPath = "/a/b.js";
                    const commonOutputPaths: ReadonlyArray<string> = [file1OutputPath, file2OutputPath];

                    function writeCommonFiles(host: fakes.FakeServerHost) {
                        writeFile(host, file1Path, `let x = 1`);
                        writeFile(host, file2Path, `let y = 1`);
                    }

                    it("if neither is set", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        writeFile(host, file1Path, `let x = 11`);
                        waitAndCheckAffectedFiles(host, [file1OutputPath], commonOutputPaths);
                    });

                    it("if --out is set", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath, { compilerOptions: { out: "/a/out.js" } });

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, ["/a/out.js"], commonOutputPaths);

                        writeFile(host, file1Path, `let x = 11`);
                        waitAndCheckAffectedFiles(host, ["/a/out.js"], commonOutputPaths);
                    });

                    it("if --outFile is set", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath, { compilerOptions: { outFile: "/a/out.js" } });

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, ["/a/out.js"], commonOutputPaths);

                        writeFile(host, file1Path, `let x = 11`);
                        waitAndCheckAffectedFiles(host, ["/a/out.js"], commonOutputPaths);
                    });

                });

                describe("for configured projects", () => {
                    const configFilePath = "/a/b/tsconfig.json";
                    const file1Consumer1Path = "/a/b/file1Consumer1.ts";
                    const file1Consumer1OutputPath = "/a/b/file1Consumer1.js";
                    const file1Consumer2Path = "/a/b/file1Consumer2.ts";
                    const file1Consumer2OutputPath = "/a/b/file1Consumer2.js";
                    const moduleFile1Path = "/a/b/moduleFile1.ts";
                    const moduleFile1OutputPath = "/a/b/moduleFile1.js";
                    const moduleFile2Path = "/a/b/moduleFile2.ts";
                    const moduleFile2OutputPath = "/a/b/moduleFile2.js";
                    const globalFile3Path = "/a/b/globalFile3.ts";
                    const globalFile3OutputPath = "/a/b/globalFile3.js";
                    const commonOutputPaths: ReadonlyArray<string> = [
                        file1Consumer1OutputPath,
                        file1Consumer2OutputPath,
                        moduleFile1OutputPath,
                        moduleFile2OutputPath,
                        globalFile3OutputPath
                    ];

                    function writeCommonFiles(host: fakes.FakeServerHost, files?: string[]) {
                        if (!files || ts.contains(files, moduleFile1Path)) {
                            writeFile(host, moduleFile1Path, `export function Foo() { };`);
                        }
                        if (!files || ts.contains(files, moduleFile2Path)) {
                            writeFile(host, moduleFile2Path, `export var Foo4 = 10;`);
                        }
                        if (!files || ts.contains(files, file1Consumer1Path)) {
                            writeFile(host, file1Consumer1Path, `import {Foo} from "./moduleFile1"; export var y = 10;`);
                        }
                        if (!files || ts.contains(files, file1Consumer2Path)) {
                            writeFile(host, file1Consumer2Path, `import {Foo} from "./moduleFile1"; let z = 10;`);
                        }
                        if (!files || ts.contains(files, globalFile3Path)) {
                            writeFile(host, globalFile3Path, `interface GlobalFoo { age: number }`);
                        }
                    }

                    it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        // Make a change to moduleFile1 that changes its external shape
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath, file1Consumer2OutputPath], commonOutputPaths);

                        // Make a change to moduleFile1 that does not change its external shape
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { console.log('hi'); };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath], commonOutputPaths);
                    });

                    it("should be up-to-date with the reference map changes", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        // Remove import of moduleFile1 from file1Consumer1. Should only affect itself.
                        writeFile(host, file1Consumer1Path, `export let y = Foo();`);
                        waitAndCheckAffectedFiles(host, [file1Consumer1OutputPath], commonOutputPaths);

                        // Add additional export to moduleFile1. Should not affect file1Consumer1
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer2OutputPath], commonOutputPaths);

                        // Restore import of moduleFile1 to file1Consumer1. Should only affect itself.
                        writeFile(host, file1Consumer1Path, `import {Foo} from "./moduleFile1";let y = Foo();`);
                        waitAndCheckAffectedFiles(host, [file1Consumer1OutputPath], commonOutputPaths);

                        // Add additional export to moduleFile1. Should now also affect file1Consumer1.
                        writeFile(host, moduleFile1Path, `export var T: number;export var T2: string;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath, file1Consumer2OutputPath], commonOutputPaths);

                        // Multiple file edits in one go.
                        writeFile(host, file1Consumer1Path, `export let y = Foo();`);
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath, file1Consumer2OutputPath], commonOutputPaths);
                    });

                    it("should be up-to-date with deleted files", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);

                        // Delete file1Consumer2
                        host.vfs.unlinkSync(file1Consumer2Path);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath], commonOutputPaths);
                    });

                    it("should be up-to-date with newly created files", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        writeFile(host, "/a/b/file1Consumer3.ts", `import {Foo} from "./moduleFile1"; let y = Foo();`);
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath, "/a/b/file1Consumer3.js", file1Consumer2OutputPath], commonOutputPaths);
                    });

                    it("should detect changes in non-root files", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host, [file1Consumer1Path, moduleFile1Path]);
                        writeConfigFile(host, configFilePath, { files: [file1Consumer1Path] });

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, [file1Consumer1OutputPath, moduleFile1OutputPath]);

                        // Add export to moduleFile1. Should affect moduleFile1 and file1Consumer1.
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath]);

                        // Change moduleFile1 internal. Should only affect moduleFile1.
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };var T1: number;`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath], [file1Consumer1OutputPath]);
                    });

                    it("should return all files if a global file changed shape", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        // Add declaration to global. Should affect all files.
                        writeFile(host, globalFile3Path, `interface GlobalFoo { age: number }\nvar T2: string;`);
                        waitAndCheckAffectedFiles(host, commonOutputPaths);
                    });

                    it("should always return the file itself if '--isolatedModules' is specified", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath, { compilerOptions: { isolatedModules: true } });

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        // Add export to moduleFile1. Should only affect moduleFile1.
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath], commonOutputPaths);
                    });

                    it("should always return the file itself if '--out' or '--outFile' is specified", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath, { compilerOptions: { module: "system", outFile: "/a/b/out.js" } });

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, ["/a/b/out.js"]);

                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, ["/a/b/out.js"]);
                    });

                    it("should return cascaded affected file list", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeCommonFiles(host);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, commonOutputPaths);

                        writeFile(host, "/a/b/file1Consumer1Consumer1.ts", `import {y} from "./file1Consumer1";`);
                        writeFile(host, file1Consumer1Path, `import {Foo} from "./moduleFile1"; export var y = 10; export var T: number;`);
                        waitAndCheckAffectedFiles(host, [file1Consumer1OutputPath, "/a/b/file1Consumer1Consumer1.js"], commonOutputPaths);

                        // Doesn't change the shape of file1Consumer1
                        writeFile(host, moduleFile1Path, `export var T: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath, file1Consumer2OutputPath], commonOutputPaths);

                        // Change both files before the timeout
                        writeFile(host, file1Consumer1Path, `import {Foo} from "./moduleFile1"; export var y = 10; export var T: number; export var T2: number;`);
                        writeFile(host, moduleFile1Path, `export var T2: number;export function Foo() { };`);
                        waitAndCheckAffectedFiles(host, [moduleFile1OutputPath, file1Consumer1OutputPath, file1Consumer2OutputPath, "/a/b/file1Consumer1Consumer1.js"], commonOutputPaths);
                    });

                    it("should work fine for files with circular references", () => {
                        // TODO: do not exit on such errors? Just continue to watch the files for update in watch mode
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeFile(host, "/a/b/file1.ts", `/// <reference path="./file2.ts" />\nexport var t1 = 10;`);
                        writeFile(host, "/a/b/file2.ts", `/// <reference path="./file1.ts" />\nexport var t2 = 10;`);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, ["/a/b/file1.js", "/a/b/file2.js"]);

                        writeFile(host, "/a/b/file1.ts", `/// <reference path="./file2.ts" />\nexport var t1 = 10;\nexport var t3 = 10;`);
                        waitAndCheckAffectedFiles(host, ["/a/b/file1.js", "/a/b/file2.js"]);
                    });

                    it("should detect removed code file", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeFile(host, "/a/b/referenceFile1.ts", `/// <reference path="./moduleFile1.ts" />\nexport var x = Foo();`);
                        writeCommonFiles(host, [moduleFile1Path]);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, ["/a/b/referenceFile1.js", moduleFile1OutputPath]);

                        host.vfs.unlinkSync(moduleFile1Path);
                        waitAndCheckAffectedFiles(host, ["/a/b/referenceFile1.js"], [moduleFile1OutputPath]);
                    });

                    it("should detect non-existing code file", () => {
                        const host = new fakes.FakeServerHost({ lib: true });
                        writeFile(host, "/a/b/referenceFile1.ts", `/// <reference path="./moduleFile2.ts" />\nexport var x = Foo();`);
                        writeConfigFile(host, configFilePath);

                        createWatchOfConfigFile(configFilePath, host);
                        checkAffectedFiles(host, ["/a/b/referenceFile1.js"]);

                        writeFile(host, "/a/b/referenceFile1.ts", `/// <reference path="./moduleFile2.ts" />\nexport var x = Foo();\nexport var yy = Foo();`);
                        waitAndCheckAffectedFiles(host, ["/a/b/referenceFile1.js"]);

                        writeCommonFiles(host, [moduleFile2Path]);
                        waitAndCheckAffectedFiles(host, ["/a/b/referenceFile1.js", moduleFile2OutputPath]);
                    });
                });
            });

            describe("file content", () => {
                theory("handles new lines", [
                    { title: "\\r\\n", args: ["\r\n"] },
                    { title: "\\n", args: ["\n"] }
                ], (newLine: "\r\n" | "\n") => {
                    const host = new fakes.FakeServerHost({ newLine });
                    writeFile(host, "/a/app.ts", `var x = 1;${newLine}var y = 2;`);

                    createWatchOfFilesAndCompilerOptions(["/a/app.ts"], host, { listEmittedFiles: true });
                    checkAffectedFiles(host, ["/a/app.js"]);

                    assert.isTrue(host.fileExists("/a/app.js"));
                    assert.strictEqual(host.readFile("/a/app.js"), `var x = 1;${newLine}var y = 2;${newLine}`);

                    writeFile(host, "/a/app.ts", `var x = 1;${newLine}var y = 2;${newLine}var z = 3;`);
                    waitAndCheckAffectedFiles(host, ["/a/app.js"]);

                    assert.isTrue(host.fileExists("/a/app.js"));
                    assert.strictEqual(host.readFile("/a/app.js"), `var x = 1;${newLine}var y = 2;${newLine}var z = 3;${newLine}`);
                });

                it("should emit specified file", () => {
                    const host = new fakes.FakeServerHost({ newLine: "\r\n" });

                    writeFile(host, "/a/b/f1.ts", `export function Foo() { return 10; }`);
                    writeFile(host, "/a/b/f2.ts", `import {Foo} from "./f1"; export let y = Foo();`);
                    writeFile(host, "/a/b/f3.ts", `import {y} from "./f2"; let x = y;`);
                    writeConfigFile(host, "/a/b/tsconfig.json");

                    const writeFileSpy1 = spy(host, "writeFile");

                    createWatchOfConfigFile("/a/b/tsconfig.json", host);
                    checkAffectedFiles(host, ["/a/b/f1.js", "/a/b/f2.js", "/a/b/f3.js"]);

                    writeFileSpy1
                        .verify(_ => _("/a/b/f1.js", `"use strict";\r\nexports.__esModule = true;\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\n`, Arg.any()), Times.once())
                        .verify(_ => _("/a/b/f2.js", `"use strict";\r\nexports.__esModule = true;\r\nvar f1_1 = require("./f1");\r\nexports.y = f1_1.Foo();\r\n`, Arg.any()), Times.once())
                        .verify(_ => _("/a/b/f3.js", `"use strict";\r\nexports.__esModule = true;\r\nvar f2_1 = require("./f2");\r\nvar x = f2_1.y;\r\n`, Arg.any()), Times.once())
                        .revoke();

                    const writeFileSpy2 = spy(host, "writeFile");

                    writeFile(host, "/a/b/f1.ts", `export function Foo() { return 10; }export function foo2() { return 2; }`);
                    waitAndCheckAffectedFiles(host, ["/a/b/f1.js", "/a/b/f2.js"], ["/a/b/f3.js"]);

                    writeFileSpy2
                        .verify(_ => _("/a/b/f1.js", `"use strict";\r\nexports.__esModule = true;\r\nfunction Foo() { return 10; }\r\nexports.Foo = Foo;\r\nfunction foo2() { return 2; }\r\nexports.foo2 = foo2;\r\n`, Arg.any()), Times.once())
                        .verify(_ => _("/a/b/f2.js", `"use strict";\r\nexports.__esModule = true;\r\nvar f1_1 = require("./f1");\r\nexports.y = f1_1.Foo();\r\n`, Arg.any()), Times.once())
                        .verify(_ => _("/a/b/f3.js", Arg.string(), Arg.any()), Times.none())
                        .revoke();
                });

                it("Elides const enums correctly in incremental compilation", () => {
                    const host = new fakes.FakeServerHost({ lib: true, newLine: "\n" });

                    writeFile(host, "/user/someone/projects/myproject/file1.ts", `export const enum E1 { V = 1 }`);
                    writeFile(host, "/user/someone/projects/myproject/file2.ts", `import { E1 } from "./file1"; export const enum E2 { V = E1.V }`);
                    writeFile(host, "/user/someone/projects/myproject/file3.ts", `import { E2 } from "./file2"; const v: E2 = E2.V;`);

                    const writeFileSpy1 = spy(host, "writeFile");

                    createWatchOfFilesAndCompilerOptions(["/user/someone/projects/myproject/file1.ts", "/user/someone/projects/myproject/file2.ts", "/user/someone/projects/myproject/file3.ts"], host, { listEmittedFiles: true });
                    checkAffectedFiles(host, ["/user/someone/projects/myproject/file1.js", "/user/someone/projects/myproject/file2.js", "/user/someone/projects/myproject/file3.js"]);

                    writeFileSpy1
                        .verify(_ => _("/user/someone/projects/myproject/file1.js", `"use strict";\nexports.__esModule = true;\n`, Arg.any()), Times.once())
                        .verify(_ => _("/user/someone/projects/myproject/file2.js", `"use strict";\nexports.__esModule = true;\n`, Arg.any()), Times.once())
                        .verify(_ => _("/user/someone/projects/myproject/file3.js", `"use strict";\nexports.__esModule = true;\nvar v = 1 /* V */;\n`, Arg.any()), Times.once())
                        .revoke();

                    const writeFileSpy2 = spy(host, "writeFile");

                    writeFile(host, "/user/someone/projects/myproject/file1.ts", `export const enum E1 { V = 1 }function foo2() { return 2; }`);
                    waitAndCheckAffectedFiles(host, ["/user/someone/projects/myproject/file1.js"], ["/user/someone/projects/myproject/file2.js", "/user/someone/projects/myproject/file3.js"]);

                    writeFileSpy2
                        .verify(_ => _("/user/someone/projects/myproject/file1.js", `"use strict";\nexports.__esModule = true;\nfunction foo2() { return 2; }\n`, Arg.any()), Times.once())
                        .verify(_ => _("/user/someone/projects/myproject/file2.js", Arg.string(), Arg.any()), Times.none())
                        .verify(_ => _("/user/someone/projects/myproject/file3.js", Arg.string(), Arg.any()), Times.none())
                        .revoke();
                });
            });
        });

        describe("module resolution caching", () => {
            it("works", () => {
                const rootContent1 = `import {x} from "f1"`;
                const importedContent = `foo()`;

                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/d/f0.ts": rootContent1,
                    "/a/f1.ts": importedContent,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/d/f0.ts"], host, { module: ModuleKind.AMD });

                // ensure that imported file was found
                checkOutputErrors(host, [
                    createFileIsNotAModuleDiagnostic(watch(), "/a/d/f0.ts", rootContent1, "f1", "/a/f1.ts"),
                    createCannotFindNameDiagnostic(watch(), "/a/f1.ts", importedContent, "foo")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                // spy on calls to fileExists to make sure that disk is not touched
                const fileExistsSpy1 = spy(host, "fileExists");

                // write file and trigger synchronization
                const rootContent2 = `import {x} from "f1"\nvar x: string = 1;`;
                host.vfs.writeFileSync("/a/d/f0.ts", rootContent2);
                host.runQueuedTimeoutCallbacks();

                // verify fileExists was not called.
                fileExistsSpy1
                    .verify(_ => _(Arg.any()), Times.none())
                    .revoke();

                // ensure file has correct number of errors after edit
                checkOutputErrors(host, [
                    createFileIsNotAModuleDiagnostic(watch(), "/a/d/f0.ts", rootContent1, "f1", "/a/f1.ts"),
                    createFileDiagnostic(getFile(watch(), "/a/d/f0.ts"), rootContent2.indexOf("var x") + "var ".length, "x".length, Diagnostics.Type_0_is_not_assignable_to_type_1, "1", "string"),
                    createCannotFindNameDiagnostic(watch(), "/a/f1.ts", importedContent, "foo")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                // spy on calls to fileExists to make sure LSHost only searches for 'f2'
                const fileExistsSpy2 = spy(host, "fileExists");

                // write file and trigger synchronization
                const rootContent3 = `import {x} from "f2"`;
                host.vfs.writeFileSync("/a/d/f0.ts", rootContent3);
                host.runQueuedTimeoutCallbacks();

                // verify fileExists was called correctly
                fileExistsSpy2
                    .verify(_ => _(Arg.includes("/f2.")), Times.atLeastOnce())
                    .verify(_ => _(Arg.not(Arg.includes("/f2."))), Times.none())
                    .revoke();

                // ensure file has correct number of errors after edit
                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/d/f0.ts", rootContent3, "f2")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                // spy on calls to fileExists to make sure LSHost only searches for 'f1'
                const fileExistsSpy3 = spy(host, "fileExists");

                // write file and trigger synchronization
                const rootContent4 = `import {x} from "f1"`;
                host.vfs.writeFileSync("/a/d/f0.ts", rootContent4);
                host.runQueuedTimeoutCallbacks();

                // verify fileExists was called correctly
                fileExistsSpy3
                    .verify(_ => _(Arg.includes("/f1.")), Times.atLeastOnce())
                    .verify(_ => _(Arg.not(Arg.includes("/f1."))), Times.none())
                    .revoke();

                checkOutputErrors(host, [
                    createFileIsNotAModuleDiagnostic(watch(), "/a/d/f0.ts", rootContent1, "f1", "/a/f1.ts"),
                    createCannotFindNameDiagnostic(watch(), "/a/f1.ts", importedContent, "foo")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("loads missing files from disk", () => {
                const rootContent1 = `import {x} from "bar"`;

                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/foo.ts": rootContent1,
                });

                // spy on calls to fileExists when starting watch mode
                const fileExistsSpy1 = spy(host, "fileExists");

                const watch = createWatchOfFilesAndCompilerOptions(["/a/foo.ts"], host, { module: ModuleKind.AMD });

                // verify fileExists was called correctly
                fileExistsSpy1
                    .verify(_ => _(Arg.includes("/bar.")), Times.atLeastOnce())
                    .revoke();

                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/foo.ts", rootContent1, "bar")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                // spy on calls to fileExists after synchronization is triggered
                const fileExistsSpy2 = spy(host, "fileExists");

                host.vfs.writeFileSync("/a/foo.ts", `import {y} from "bar"`);
                host.vfs.writeFileSync("/a/bar.d.ts", `export const y = 1;`);
                host.runQueuedTimeoutCallbacks();

                // verify fileExists was called correctly
                fileExistsSpy2
                    .verify(_ => _(Arg.includes("/bar.")), Times.atLeastOnce())
                    .revoke();

                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("should compile correctly when resolved module goes missing and then comes back (module is not part of the root)", () => {
                const rootContent = `import {x} from "bar"`;
                const importedContent = `export const y = 1;export const x = 10;`;

                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/foo.ts": rootContent,
                    "/a/bar.d.ts": importedContent,
                });

                // spy on fileExists when starting watch mode
                const fileExistsSpy1 = spy(host, "fileExists");

                const watch = createWatchOfFilesAndCompilerOptions(["/a/foo.ts"], host, { module: ModuleKind.AMD });

                // verify fileExists was called correctly
                fileExistsSpy1
                    .verify(_ => _(Arg.includes("/bar.")), Times.atLeastOnce())
                    .revoke();

                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                // spy on fileExists when triggering synchronization
                const fileExistsSpy2 = spy(host, "fileExists");

                host.vfs.unlinkSync("/a/bar.d.ts");
                host.runQueuedTimeoutCallbacks();

                // verify fileExists was called correctly
                fileExistsSpy2
                    .verify(_ => _(Arg.includes("/bar.")), Times.atLeastOnce())
                    .revoke();

                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/foo.ts", rootContent, "bar")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                // spy on fileExists when triggering synchronization
                const fileExistsSpy3 = spy(host, "fileExists");

                host.vfs.writeFileSync("/a/bar.d.ts", importedContent);
                host.checkTimeoutQueueLengthAndRun(1);

                // verify fileExists was called correctly.
                fileExistsSpy3
                    .verify(_ => _(Arg.includes("/bar.")), Times.atLeastOnce())
                    .revoke();

                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("works when module resolution changes to ambient module", () => {
                const rootContent = `import * as fs from "fs";`;
                const host = new fakes.FakeServerHost({ vfs: { currentDirectory: "/a/b" }, lib: true }, /*files*/ {
                    "/a/b/foo.ts": rootContent,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/foo.ts"], host, { });

                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/b/foo.ts", rootContent, "fs")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                host.writeFile("/a/b/node_modules/@types/node/package.json", `{\n  "main": ""\n}\n`);
                host.writeFile("/a/b/node_modules/@types/node/index.d.ts", `\ndeclare module "fs" {\n    export interface Stats {\n        isFile(): boolean;\n    }\n}`);
                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("works when included file with ambient module changes", () => {
                const rootContent = `import * as fs from "fs";\nimport * as u from "url";`;
                const fileContent1 = `declare module "url" {\n    export interface Url {\n        href?: string;\n    }\n}`;

                const host = new fakes.FakeServerHost({ vfs: { currentDirectory: "/a/b" }, lib: true }, /*files*/ {
                    "/a/b/foo.ts": rootContent,
                    "/a/b/bar.d.ts": fileContent1,
                });

                const watch = createWatchOfFilesAndCompilerOptions(["/a/b/foo.ts", "/a/b/bar.d.ts"], host, {});

                checkOutputErrors(host, [
                    createCannotFindModuleDiagnostic(watch(), "/a/b/foo.ts", rootContent, "fs")
                ], /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                const fileContent2 = fileContent1 + `declare module "fs" {\n    export interface Stats {\n        isFile(): boolean;\n    }\n}`;
                host.vfs.writeFileSync("/a/b/bar.d.ts", fileContent2);
                host.runQueuedTimeoutCallbacks();
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);
            });

            it("works when reusing program with files from external library", () => {
                const file1Content = `import module1 = require("module1");\nmodule1("hello");`;
                const file1Output = `"use strict";\nexports.__esModule = true;\nvar module1 = require("module1");\nmodule1("hello");\n`;
                const file2Content = `import module11 = require("module1");\nmodule11("hello");`;
                const file2Output = `"use strict";\nexports.__esModule = true;\nvar module11 = require("module1");\nmodule11("hello");\n`;

                const host = new fakes.FakeServerHost({ vfs: { currentDirectory: "/a/b/projects/myProject/" }, lib: true }, /*files*/ {
                    "/a/b/projects/myProject/src/file1.ts": file1Content,
                    "/a/b/projects/myProject/src/file2.ts": file2Content,
                    "/a/b/projects/myProject/node_modules/module1/index.js": `module.exports = options => { return options.toString(); }`,
                    "/a/b/projects/myProject/src/tsconfig.json": JSON.stringify({
                        compilerOptions: {
                            allowJs: true,
                            rootDir: ".",
                            outDir: "../dist",
                            moduleResolution: "node",
                            maxNodeModuleJsDepth: 1
                        }
                    })
                });

                // spy on calls to writeFile when starting watch mode
                const writeFileSpy1 = spy(host, "writeFile");

                const watch = createWatchOfConfigFile("/a/b/projects/myProject/src/tsconfig.json", host);
                checkProgramActualFiles(watch(), [
                    "/a/b/projects/myProject/src/file1.ts",
                    "/a/b/projects/myProject/src/file2.ts",
                    "/a/b/projects/myProject/node_modules/module1/index.js",
                    fakes.FakeServerHost.libPath
                ]);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterCompilationStarting);

                // verify writeFile was called correctly.
                writeFileSpy1
                    .verify(_ => _("/a/b/projects/myProject/dist/file1.js", file1Output, Arg.any()), Times.once())
                    .verify(_ => _("/a/b/projects/myProject/dist/file2.js", file2Output, Arg.any()), Times.once())
                    .verify(_ => _(Arg.not(Arg.or("/a/b/projects/myProject/dist/file1.js", "/a/b/projects/myProject/dist/file2.js")), Arg.string(), Arg.any()), Times.none())
                    .revoke();

                // spy on calls to writeFile when triggering synchronization
                const writeFileSpy2 = spy(host, "writeFile");

                host.vfs.writeFileSync("/a/b/projects/myProject/src/file1.ts", file1Content + "\n;");
                host.runQueuedTimeoutCallbacks();
                checkProgramActualFiles(watch(), [
                    "/a/b/projects/myProject/src/file1.ts",
                    "/a/b/projects/myProject/src/file2.ts",
                    "/a/b/projects/myProject/node_modules/module1/index.js",
                    fakes.FakeServerHost.libPath
                ]);
                checkOutputErrors(host, emptyArray, /*errorsPosition*/ ExpectedOutputErrorsPosition.AfterFileChangeDetected);

                // verify writeFile was called correctly
                writeFileSpy2
                    .verify(_ => _("/a/b/projects/myProject/dist/file1.js", file1Output + ";\n", Arg.any()), Times.once())
                    .verify(_ => _(Arg.not("/a/b/projects/myProject/dist/file1.js"), Arg.string(), Arg.any()), Times.none())
                    .revoke();
            });
        });

        describe("with when module emit is specified as node", () => {
            it("when instead of filechanged recursive directory watcher is invoked", () => {
                const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                    "/a/rootFolder/project/Scripts/TypeScript.ts": `var z = 10;`,
                    "/a/rootFolder/project/Scripts/Javascript.js": `var zz = 10;`,
                    "/a/rootFolder/project/tsconfig.json": JSON.stringify({
                        compilerOptions: {
                            module: "none",
                            allowJs: true,
                            outDir: "Static/scripts/"
                        },
                        include: [
                            "Scripts/**/*"
                        ],
                    })
                });

                const watch = createWatchOfConfigFile("/a/rootFolder/project/tsconfig.json", host);

                checkProgramActualFiles(watch(), [
                    "/a/rootFolder/project/Scripts/TypeScript.ts",
                    "/a/rootFolder/project/Scripts/Javascript.js",
                    fakes.FakeServerHost.libPath
                ]);


                host.watchFiles = false;
                host.vfs.unlinkSync("/a/rootFolder/project/Scripts/TypeScript.ts");
                host.runQueuedTimeoutCallbacks();

                const writeFileSpy1 = spy(host, "writeFile");

                host.vfs.writeFileSync("/a/rootFolder/project/Scripts/TypeScript.ts", `var zz30 = 100;`);
                host.runQueuedTimeoutCallbacks();

                checkProgramActualFiles(watch(), [
                    "/a/rootFolder/project/Scripts/TypeScript.ts",
                    "/a/rootFolder/project/Scripts/Javascript.js",
                    fakes.FakeServerHost.libPath
                ]);

                writeFileSpy1
                    .verify(_ => _("/a/rootFolder/project/Static/scripts/TypeScript.js", `var zz30 = 100;\n`, Arg.any()), Times.once())
                    .revoke();
            });
        });
    });

    describe("tsc-watch console clearing", () => {
        it("clears the console when it starts", () => {
            const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                "/a/f.ts": "",
            });

            createWatchOfFilesAndCompilerOptions(["/a/f.ts"], host);
            host.runQueuedTimeoutCallbacks();

            host.checkScreenClears(1);
        });

        it("clears the console on recompile", () => {
            const host = new fakes.FakeServerHost({ lib: true }, /*files*/ {
                "/a/f.ts": "",
            });
            createWatchOfFilesAndCompilerOptions(["/a/f.ts"], host);

            host.vfs.writeFileSync("/a/f.ts", "//");
            host.runQueuedTimeoutCallbacks();

            host.checkScreenClears(2);
        });
    });
}
