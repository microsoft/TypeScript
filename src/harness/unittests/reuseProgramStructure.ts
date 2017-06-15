/// <reference path="..\harness.ts" />
/// <reference path="..\..\harness\harnessLanguageService.ts" />

namespace ts {

    const enum ChangedPart {
        references = 1 << 0,
        importsAndExports = 1 << 1,
        program = 1 << 2
    }

    const newLine = "\r\n";

    interface SourceFileWithText extends SourceFile {
        sourceText?: SourceText;
    }

    interface NamedSourceText {
        name: string;
        text: SourceText;
    }

    interface ProgramWithSourceTexts extends Program {
        sourceTexts?: NamedSourceText[];
        host: TestCompilerHost;
    }

    interface TestCompilerHost extends CompilerHost {
        getTrace(): string[];
    }

    class SourceText implements IScriptSnapshot {
        private fullText: string;

        constructor(private references: string,
            private importsAndExports: string,
            private program: string,
            private changedPart: ChangedPart = 0,
            private version = 0) {
        }

        static New(references: string, importsAndExports: string, program: string): SourceText {
            Debug.assert(references !== undefined);
            Debug.assert(importsAndExports !== undefined);
            Debug.assert(program !== undefined);
            return new SourceText(references + newLine, importsAndExports + newLine, program || "");
        }

        public getVersion(): number {
            return this.version;
        }

        public updateReferences(newReferences: string): SourceText {
            Debug.assert(newReferences !== undefined);
            return new SourceText(newReferences + newLine, this.importsAndExports, this.program, this.changedPart | ChangedPart.references, this.version + 1);
        }
        public updateImportsAndExports(newImportsAndExports: string): SourceText {
            Debug.assert(newImportsAndExports !== undefined);
            return new SourceText(this.references, newImportsAndExports + newLine, this.program, this.changedPart | ChangedPart.importsAndExports, this.version + 1);
        }
        public updateProgram(newProgram: string): SourceText {
            Debug.assert(newProgram !== undefined);
            return new SourceText(this.references, this.importsAndExports, newProgram, this.changedPart | ChangedPart.program, this.version + 1);
        }

        public getFullText() {
            return this.fullText || (this.fullText = this.references + this.importsAndExports + this.program);
        }

        public getText(start: number, end: number): string {
            return this.getFullText().substring(start, end);
        }

        getLength(): number {
            return this.getFullText().length;
        }

        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange {
            const oldText = <SourceText>oldSnapshot;
            let oldSpan: TextSpan;
            let newLength: number;
            switch (oldText.changedPart ^ this.changedPart) {
                case ChangedPart.references:
                    oldSpan = createTextSpan(0, oldText.references.length);
                    newLength = this.references.length;
                    break;
                case ChangedPart.importsAndExports:
                    oldSpan = createTextSpan(oldText.references.length, oldText.importsAndExports.length);
                    newLength = this.importsAndExports.length;
                    break;
                case ChangedPart.program:
                    oldSpan = createTextSpan(oldText.references.length + oldText.importsAndExports.length, oldText.program.length);
                    newLength = this.program.length;
                    break;
                default:
                    Debug.assert(false, "Unexpected change");
            }

            return createTextChangeRange(oldSpan, newLength);
        }
    }

    function createSourceFileWithText(fileName: string, sourceText: SourceText, target: ScriptTarget) {
        const file = <SourceFileWithText>createSourceFile(fileName, sourceText.getFullText(), target);
        file.sourceText = sourceText;
        return file;
    }

    function createTestCompilerHost(texts: NamedSourceText[], target: ScriptTarget, oldProgram?: ProgramWithSourceTexts): TestCompilerHost {
        const files = arrayToMap(texts, t => t.name, t => {
            if (oldProgram) {
                const oldFile = <SourceFileWithText>oldProgram.getSourceFile(t.name);
                if (oldFile && oldFile.sourceText.getVersion() === t.text.getVersion()) {
                    return oldFile;
                }
            }
            return createSourceFileWithText(t.name, t.text, target);
        });
        const trace: string[] = [];

        return {
            trace: s => trace.push(s),
            getTrace: () => trace,
            getSourceFile(fileName): SourceFile {
                return files.get(fileName);
            },
            getDefaultLibFileName(): string {
                return "lib.d.ts";
            },
            writeFile: notImplemented,
            getCurrentDirectory(): string {
                return "";
            },
            getDirectories(): string[] {
                return [];
            },
            getCanonicalFileName(fileName): string {
                return sys && sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
            },
            useCaseSensitiveFileNames(): boolean {
                return sys && sys.useCaseSensitiveFileNames;
            },
            getNewLine(): string {
                return sys ? sys.newLine : newLine;
            },
            fileExists: fileName => files.has(fileName),
            readFile: fileName => {
                const file = files.get(fileName);
                return file && file.text;
            },
        };
    }

    function newProgram(texts: NamedSourceText[], rootNames: string[], options: CompilerOptions): ProgramWithSourceTexts {
        const host = createTestCompilerHost(texts, options.target);
        const program = <ProgramWithSourceTexts>createProgram(rootNames, options, host);
        program.sourceTexts = texts;
        program.host = host;
        return program;
    }

    function updateProgram(oldProgram: ProgramWithSourceTexts, rootNames: string[], options: CompilerOptions, updater: (files: NamedSourceText[]) => void, newTexts?: NamedSourceText[]) {
        if (!newTexts) {
            newTexts = (<ProgramWithSourceTexts>oldProgram).sourceTexts.slice(0);
        }
        updater(newTexts);
        const host = createTestCompilerHost(newTexts, options.target, oldProgram);
        const program = <ProgramWithSourceTexts>createProgram(rootNames, options, host, oldProgram);
        program.sourceTexts = newTexts;
        program.host = host;
        return program;
    }

    function checkResolvedTypeDirective(expected: ResolvedTypeReferenceDirective, actual: ResolvedTypeReferenceDirective): boolean {
        if (!expected === !actual) {
            if (expected) {
                assert.isTrue(expected.resolvedFileName === actual.resolvedFileName, `'resolvedFileName': expected '${expected.resolvedFileName}' to be equal to '${actual.resolvedFileName}'`);
                assert.isTrue(expected.primary === actual.primary, `'primary': expected '${expected.primary}' to be equal to '${actual.primary}'`);
            }
            return true;
        }
        return false;
    }

    function checkCache<T>(caption: string, program: Program, fileName: string, expectedContent: Map<T>, getCache: (f: SourceFile) => Map<T>, entryChecker: (expected: T, original: T) => boolean): void {
        const file = program.getSourceFile(fileName);
        assert.isTrue(file !== undefined, `cannot find file ${fileName}`);
        const cache = getCache(file);
        if (expectedContent === undefined) {
            assert.isTrue(cache === undefined, `expected ${caption} to be undefined`);
        }
        else {
            assert.isTrue(cache !== undefined, `expected ${caption} to be set`);
            assert.isTrue(mapsAreEqual(expectedContent, cache, entryChecker), `contents of ${caption} did not match the expected contents.`);
        }
    }

    /** True if the maps have the same keys and values. */
    function mapsAreEqual<T>(left: Map<T>, right: Map<T>, valuesAreEqual?: (left: T, right: T) => boolean): boolean {
        if (left === right) return true;
        if (!left || !right) return false;
        const someInLeftHasNoMatch = forEachEntry(left, (leftValue, leftKey) => {
            if (!right.has(leftKey)) return true;
            const rightValue = right.get(leftKey);
            return !(valuesAreEqual ? valuesAreEqual(leftValue, rightValue) : leftValue === rightValue);
        });
        if (someInLeftHasNoMatch) return false;
        const someInRightHasNoMatch = forEachKey(right, rightKey => !left.has(rightKey));
        return !someInRightHasNoMatch;
    }

    function checkResolvedModulesCache(program: Program, fileName: string, expectedContent: Map<ResolvedModule>): void {
        checkCache("resolved modules", program, fileName, expectedContent, f => f.resolvedModules, checkResolvedModule);
    }

    function checkResolvedTypeDirectivesCache(program: Program, fileName: string, expectedContent: Map<ResolvedTypeReferenceDirective>): void {
        checkCache("resolved type directives", program, fileName, expectedContent, f => f.resolvedTypeReferenceDirectiveNames, checkResolvedTypeDirective);
    }

    describe("Reuse program structure", () => {
        const target = ScriptTarget.Latest;
        const files: NamedSourceText[] = [
            {
                name: "a.ts", text: SourceText.New(
                    `
/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs" />
`, "", `var x = 1`)
            },
            { name: "b.ts", text: SourceText.New(`/// <reference path='c.ts'/>`, "", `var y = 2`) },
            { name: "c.ts", text: SourceText.New("", "", `var z = 1;`) },
            { name: "types/typerefs/index.d.ts", text: SourceText.New("", "", `declare let z: number;`) },
        ];

        it("successful if change does not affect imports", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            const program_2 = updateProgram(program_1, ["a.ts"], { target }, files => {
                files[0].text = files[0].text.updateProgram("var x = 100");
            });
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Completely);
            const program1Diagnostics = program_1.getSemanticDiagnostics(program_1.getSourceFile("a.ts"));
            const program2Diagnostics = program_2.getSemanticDiagnostics(program_1.getSourceFile("a.ts"));
            assert.equal(program1Diagnostics.length, program2Diagnostics.length);
        });

        it("successful if change does not affect type reference directives", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            const program_2 = updateProgram(program_1, ["a.ts"], { target }, files => {
                files[0].text = files[0].text.updateProgram("var x = 100");
            });
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Completely);
            const program1Diagnostics = program_1.getSemanticDiagnostics(program_1.getSourceFile("a.ts"));
            const program2Diagnostics = program_2.getSemanticDiagnostics(program_1.getSourceFile("a.ts"));
            assert.equal(program1Diagnostics.length, program2Diagnostics.length);
        });

        it("fails if change affects tripleslash references", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            updateProgram(program_1, ["a.ts"], { target }, files => {
                const newReferences = `/// <reference path='b.ts'/>
                /// <reference path='c.ts'/>
                `;
                files[0].text = files[0].text.updateReferences(newReferences);
            });
            assert.isTrue(program_1.structureIsReused === StructureIsReused.SafeModules);
        });

        it("fails if change affects type references", () => {
            const program_1 = newProgram(files, ["a.ts"], { types: ["a"] });
            updateProgram(program_1, ["a.ts"], { types: ["b"] }, noop);
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Not);
        });

        it("succeeds if change doesn't affect type references", () => {
            const program_1 = newProgram(files, ["a.ts"], { types: ["a"] });
            updateProgram(program_1, ["a.ts"], { types: ["a"] }, noop);
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Completely);
        });

        it("fails if change affects imports", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            updateProgram(program_1, ["a.ts"], { target }, files => {
                files[2].text = files[2].text.updateImportsAndExports("import x from 'b'");
            });
            assert.isTrue(program_1.structureIsReused === StructureIsReused.SafeModules);
        });

        it("fails if change affects type directives", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            updateProgram(program_1, ["a.ts"], { target }, files => {
                const newReferences = `
/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs1" />`;
                files[0].text = files[0].text.updateReferences(newReferences);
            });
            assert.isTrue(program_1.structureIsReused === StructureIsReused.SafeModules);
        });

        it("fails if module kind changes", () => {
            const program_1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS });
            updateProgram(program_1, ["a.ts"], { target, module: ModuleKind.AMD }, noop);
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Not);
        });

        it("fails if rootdir changes", () => {
            const program_1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS, rootDir: "/a/b" });
            updateProgram(program_1, ["a.ts"], { target, module: ModuleKind.CommonJS, rootDir: "/a/c" }, noop);
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Not);
        });

        it("fails if config path changes", () => {
            const program_1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS, configFilePath: "/a/b/tsconfig.json" });
            updateProgram(program_1, ["a.ts"], { target, module: ModuleKind.CommonJS, configFilePath: "/a/c/tsconfig.json" }, noop);
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Not);
        });

        it("succeeds if missing files remain missing", () => {
            const options: CompilerOptions = { target, noLib: true };

            const program_1 = newProgram(files, ["a.ts"], options);
            assert.notDeepEqual(emptyArray, program_1.getMissingFilePaths());

            const program_2 = updateProgram(program_1, ["a.ts"], options, noop);
            assert.deepEqual(program_1.getMissingFilePaths(), program_2.getMissingFilePaths());

            assert.equal(StructureIsReused.Completely, program_1.structureIsReused);
        });

        it("fails if missing file is created", () => {
            const options: CompilerOptions = { target, noLib: true };

            const program_1 = newProgram(files, ["a.ts"], options);
            assert.notDeepEqual(emptyArray, program_1.getMissingFilePaths());

            const newTexts: NamedSourceText[] = files.concat([{ name: "non-existing-file.ts", text: SourceText.New("", "", `var x = 1`) }]);
            const program_2 = updateProgram(program_1, ["a.ts"], options, noop, newTexts);
            assert.deepEqual(emptyArray, program_2.getMissingFilePaths());

            assert.equal(StructureIsReused.SafeModules, program_1.structureIsReused);
        });

        it("resolution cache follows imports", () => {
            (<any>Error).stackTraceLimit = Infinity;

            const files = [
                { name: "a.ts", text: SourceText.New("", "import {_} from 'b'", "var x = 1") },
                { name: "b.ts", text: SourceText.New("", "", "var y = 2") },
            ];
            const options: CompilerOptions = { target };

            const program_1 = newProgram(files, ["a.ts"], options);
            checkResolvedModulesCache(program_1, "a.ts", createMapFromTemplate({ "b": createResolvedModule("b.ts") }));
            checkResolvedModulesCache(program_1, "b.ts", /*expectedContent*/ undefined);

            const program_2 = updateProgram(program_1, ["a.ts"], options, files => {
                files[0].text = files[0].text.updateProgram("var x = 2");
            });
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Completely);

            // content of resolution cache should not change
            checkResolvedModulesCache(program_1, "a.ts", createMapFromTemplate({ "b": createResolvedModule("b.ts") }));
            checkResolvedModulesCache(program_1, "b.ts", /*expectedContent*/ undefined);

            // imports has changed - program is not reused
            const program_3 = updateProgram(program_2, ["a.ts"], options, files => {
                files[0].text = files[0].text.updateImportsAndExports("");
            });
            assert.isTrue(program_2.structureIsReused === StructureIsReused.SafeModules);
            checkResolvedModulesCache(program_3, "a.ts", /*expectedContent*/ undefined);

            const program_4 = updateProgram(program_3, ["a.ts"], options, files => {
                const newImports = `import x from 'b'
                import y from 'c'
                `;
                files[0].text = files[0].text.updateImportsAndExports(newImports);
            });
            assert.isTrue(program_3.structureIsReused === StructureIsReused.SafeModules);
            checkResolvedModulesCache(program_4, "a.ts", createMapFromTemplate({ "b": createResolvedModule("b.ts"), "c": undefined }));
        });

        it("resolved type directives cache follows type directives", () => {
            const files = [
                { name: "/a.ts", text: SourceText.New("/// <reference types='typedefs'/>", "", "var x = $") },
                { name: "/types/typedefs/index.d.ts", text: SourceText.New("", "", "declare var $: number") },
            ];
            const options: CompilerOptions = { target, typeRoots: ["/types"] };

            const program_1 = newProgram(files, ["/a.ts"], options);
            checkResolvedTypeDirectivesCache(program_1, "/a.ts", createMapFromTemplate({ "typedefs": { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } }));
            checkResolvedTypeDirectivesCache(program_1, "/types/typedefs/index.d.ts", /*expectedContent*/ undefined);

            const program_2 = updateProgram(program_1, ["/a.ts"], options, files => {
                files[0].text = files[0].text.updateProgram("var x = 2");
            });
            assert.isTrue(program_1.structureIsReused === StructureIsReused.Completely);

            // content of resolution cache should not change
            checkResolvedTypeDirectivesCache(program_1, "/a.ts", createMapFromTemplate({ "typedefs": { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } }));
            checkResolvedTypeDirectivesCache(program_1, "/types/typedefs/index.d.ts", /*expectedContent*/ undefined);

            // type reference directives has changed - program is not reused
            const program_3 = updateProgram(program_2, ["/a.ts"], options, files => {
                files[0].text = files[0].text.updateReferences("");
            });

            assert.isTrue(program_2.structureIsReused === StructureIsReused.SafeModules);
            checkResolvedTypeDirectivesCache(program_3, "/a.ts", /*expectedContent*/ undefined);

            updateProgram(program_3, ["/a.ts"], options, files => {
                const newReferences = `/// <reference types="typedefs"/>
                /// <reference types="typedefs2"/>
                `;
                files[0].text = files[0].text.updateReferences(newReferences);
            });
            assert.isTrue(program_3.structureIsReused === StructureIsReused.SafeModules);
            checkResolvedTypeDirectivesCache(program_1, "/a.ts", createMapFromTemplate({ "typedefs": { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } }));
        });

        it("fetches imports after npm install", () => {
            const file1Ts = { name: "file1.ts", text: SourceText.New("", `import * as a from "a";`, "const myX: number = a.x;") };
            const file2Ts = { name: "file2.ts", text: SourceText.New("", "", "") };
            const indexDTS = { name: "node_modules/a/index.d.ts", text: SourceText.New("", "export declare let x: number;", "") };
            const options: CompilerOptions = { target: ScriptTarget.ES2015, traceResolution: true, moduleResolution: ModuleResolutionKind.NodeJs };
            const rootFiles = [file1Ts, file2Ts];
            const filesAfterNpmInstall = [file1Ts, file2Ts, indexDTS];

            const initialProgram = newProgram(rootFiles, rootFiles.map(f => f.name), options);
            {
                assert.deepEqual(initialProgram.host.getTrace(),
                    [
                        "======== Resolving module 'a' from 'file1.ts'. ========",
                        "Explicitly specified module resolution kind: 'NodeJs'.",
                        "Loading module 'a' from 'node_modules' folder, target file type 'TypeScript'.",
                        "File 'node_modules/a.ts' does not exist.",
                        "File 'node_modules/a.tsx' does not exist.",
                        "File 'node_modules/a.d.ts' does not exist.",
                        "File 'node_modules/a/package.json' does not exist.",
                        "File 'node_modules/a/index.ts' does not exist.",
                        "File 'node_modules/a/index.tsx' does not exist.",
                        "File 'node_modules/a/index.d.ts' does not exist.",
                        "File 'node_modules/@types/a.d.ts' does not exist.",
                        "File 'node_modules/@types/a/package.json' does not exist.",
                        "File 'node_modules/@types/a/index.d.ts' does not exist.",
                        "Loading module 'a' from 'node_modules' folder, target file type 'JavaScript'.",
                        "File 'node_modules/a.js' does not exist.",
                        "File 'node_modules/a.jsx' does not exist.",
                        "File 'node_modules/a/package.json' does not exist.",
                        "File 'node_modules/a/index.js' does not exist.",
                        "File 'node_modules/a/index.jsx' does not exist.",
                        "======== Module name 'a' was not resolved. ========"
                    ],
                    "initialProgram: execute module resolution normally.");

                const initialProgramDiagnostics = initialProgram.getSemanticDiagnostics(initialProgram.getSourceFile("file1.ts"));
                assert(initialProgramDiagnostics.length === 1, `initialProgram: import should fail.`);
            }

            const afterNpmInstallProgram = updateProgram(initialProgram, rootFiles.map(f => f.name), options, f => {
                f[1].text = f[1].text.updateReferences(`/// <reference no-default-lib="true"/>`);
            }, filesAfterNpmInstall);
            {
                assert.deepEqual(afterNpmInstallProgram.host.getTrace(),
                    [
                        "======== Resolving module 'a' from 'file1.ts'. ========",
                        "Explicitly specified module resolution kind: 'NodeJs'.",
                        "Loading module 'a' from 'node_modules' folder, target file type 'TypeScript'.",
                        "File 'node_modules/a.ts' does not exist.",
                        "File 'node_modules/a.tsx' does not exist.",
                        "File 'node_modules/a.d.ts' does not exist.",
                        "File 'node_modules/a/package.json' does not exist.",
                        "File 'node_modules/a/index.ts' does not exist.",
                        "File 'node_modules/a/index.tsx' does not exist.",
                        "File 'node_modules/a/index.d.ts' exist - use it as a name resolution result.",
                        "======== Module name 'a' was successfully resolved to 'node_modules/a/index.d.ts'. ========"
                    ],
                    "afterNpmInstallProgram: execute module resolution normally.");

                const afterNpmInstallProgramDiagnostics = afterNpmInstallProgram.getSemanticDiagnostics(afterNpmInstallProgram.getSourceFile("file1.ts"));
                assert(afterNpmInstallProgramDiagnostics.length === 0, `afterNpmInstallProgram: program is well-formed with import.`);
            }
        });

        it("can reuse ambient module declarations from non-modified files", () => {
            const files = [
                { name: "/a/b/app.ts", text: SourceText.New("", "import * as fs from 'fs'", "") },
                { name: "/a/b/node.d.ts", text: SourceText.New("", "", "declare module 'fs' {}") }
            ];
            const options = { target: ScriptTarget.ES2015, traceResolution: true };
            const program = newProgram(files, files.map(f => f.name), options);
            assert.deepEqual(program.host.getTrace(),
                [
                    "======== Resolving module 'fs' from '/a/b/app.ts'. ========",
                    "Module resolution kind is not specified, using 'Classic'.",
                    "File '/a/b/fs.ts' does not exist.",
                    "File '/a/b/fs.tsx' does not exist.",
                    "File '/a/b/fs.d.ts' does not exist.",
                    "File '/a/fs.ts' does not exist.",
                    "File '/a/fs.tsx' does not exist.",
                    "File '/a/fs.d.ts' does not exist.",
                    "File '/fs.ts' does not exist.",
                    "File '/fs.tsx' does not exist.",
                    "File '/fs.d.ts' does not exist.",
                    "File '/a/b/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/b/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/b/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/node_modules/@types/fs/package.json' does not exist.",
                    "File '/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/a/b/fs.js' does not exist.",
                    "File '/a/b/fs.jsx' does not exist.",
                    "File '/a/fs.js' does not exist.",
                    "File '/a/fs.jsx' does not exist.",
                    "File '/fs.js' does not exist.",
                    "File '/fs.jsx' does not exist.",
                    "======== Module name 'fs' was not resolved. ========",
                ], "should look for 'fs'");

            const program_2 = updateProgram(program, program.getRootFileNames(), options, f => {
                f[0].text = f[0].text.updateProgram("var x = 1;");
            });
            assert.deepEqual(program_2.host.getTrace(), [
                "Module 'fs' was resolved as ambient module declared in '/a/b/node.d.ts' since this file was not modified."
            ], "should reuse 'fs' since node.d.ts was not changed");

            const program_3 = updateProgram(program_2, program_2.getRootFileNames(), options, f => {
                f[0].text = f[0].text.updateProgram("var y = 1;");
                f[1].text = f[1].text.updateProgram("declare var process: any");
            });
            assert.deepEqual(program_3.host.getTrace(),
                [
                    "======== Resolving module 'fs' from '/a/b/app.ts'. ========",
                    "Module resolution kind is not specified, using 'Classic'.",
                    "File '/a/b/fs.ts' does not exist.",
                    "File '/a/b/fs.tsx' does not exist.",
                    "File '/a/b/fs.d.ts' does not exist.",
                    "File '/a/fs.ts' does not exist.",
                    "File '/a/fs.tsx' does not exist.",
                    "File '/a/fs.d.ts' does not exist.",
                    "File '/fs.ts' does not exist.",
                    "File '/fs.tsx' does not exist.",
                    "File '/fs.d.ts' does not exist.",
                    "File '/a/b/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/b/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/b/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/node_modules/@types/fs/package.json' does not exist.",
                    "File '/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/a/b/fs.js' does not exist.",
                    "File '/a/b/fs.jsx' does not exist.",
                    "File '/a/fs.js' does not exist.",
                    "File '/a/fs.jsx' does not exist.",
                    "File '/fs.js' does not exist.",
                    "File '/fs.jsx' does not exist.",
                    "======== Module name 'fs' was not resolved. ========",
                ], "should look for 'fs' again since node.d.ts was changed");
        });

        it("can reuse module resolutions from non-modified files", () => {
            const files = [
                { name: "a1.ts", text: SourceText.New("", "", "let x = 1;") },
                { name: "a2.ts", text: SourceText.New("", "", "let x = 1;") },
                { name: "b1.ts", text: SourceText.New("", "export class B { x: number; }", "") },
                { name: "b2.ts", text: SourceText.New("", "export class B { x: number; }", "") },
                { name: "node_modules/@types/typerefs1/index.d.ts", text: SourceText.New("", "", "declare let z: string;") },
                { name: "node_modules/@types/typerefs2/index.d.ts", text: SourceText.New("", "", "declare let z: string;") },
                {
                    name: "f1.ts",
                    text:
                    SourceText.New(
                        `/// <reference path="a1.ts"/>${newLine}/// <reference types="typerefs1"/>${newLine}/// <reference no-default-lib="true"/>`,
                        `import { B } from './b1';${newLine}export let BB = B;`,
                        "declare module './b1' { interface B { y: string; } }")
                },
                {
                    name: "f2.ts",
                    text: SourceText.New(
                        `/// <reference path="a2.ts"/>${newLine}/// <reference types="typerefs2"/>`,
                        `import { B } from './b2';${newLine}import { BB } from './f1';`,
                        "(new BB).x; (new BB).y;")
                },
            ];

            const options: CompilerOptions = { target: ScriptTarget.ES2015, traceResolution: true, moduleResolution: ModuleResolutionKind.Classic };
            const program_1 = newProgram(files, files.map(f => f.name), options);
            let expectedErrors = 0;
            {
                assert.deepEqual(program_1.host.getTrace(),
                    [
                        "======== Resolving type reference directive 'typerefs1', containing file 'f1.ts', root directory 'node_modules/@types'. ========",
                        "Resolving with primary search path 'node_modules/@types'.",
                        "File 'node_modules/@types/typerefs1/package.json' does not exist.",
                        "File 'node_modules/@types/typerefs1/index.d.ts' exist - use it as a name resolution result.",
                        "======== Type reference directive 'typerefs1' was successfully resolved to 'node_modules/@types/typerefs1/index.d.ts', primary: true. ========",
                        "======== Resolving module './b1' from 'f1.ts'. ========",
                        "Explicitly specified module resolution kind: 'Classic'.",
                        "File 'b1.ts' exist - use it as a name resolution result.",
                        "======== Module name './b1' was successfully resolved to 'b1.ts'. ========",
                        "======== Resolving type reference directive 'typerefs2', containing file 'f2.ts', root directory 'node_modules/@types'. ========",
                        "Resolving with primary search path 'node_modules/@types'.",
                        "File 'node_modules/@types/typerefs2/package.json' does not exist.",
                        "File 'node_modules/@types/typerefs2/index.d.ts' exist - use it as a name resolution result.",
                        "======== Type reference directive 'typerefs2' was successfully resolved to 'node_modules/@types/typerefs2/index.d.ts', primary: true. ========",
                        "======== Resolving module './b2' from 'f2.ts'. ========",
                        "Explicitly specified module resolution kind: 'Classic'.",
                        "File 'b2.ts' exist - use it as a name resolution result.",
                        "======== Module name './b2' was successfully resolved to 'b2.ts'. ========",
                        "======== Resolving module './f1' from 'f2.ts'. ========",
                        "Explicitly specified module resolution kind: 'Classic'.",
                        "File 'f1.ts' exist - use it as a name resolution result.",
                        "======== Module name './f1' was successfully resolved to 'f1.ts'. ========"
                    ],
                    "program_1: execute module reoslution normally.");

                const program_1Diagnostics = program_1.getSemanticDiagnostics(program_1.getSourceFile("f2.ts"));
                assert(program_1Diagnostics.length === expectedErrors, `initial program should be well-formed`);
            }
            const indexOfF1 = 6;
            const program_2 = updateProgram(program_1, program_1.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateReferences(`/// <reference path="a1.ts"/>${newLine}/// <reference types="typerefs1"/>`);
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program_2Diagnostics = program_2.getSemanticDiagnostics(program_2.getSourceFile("f2.ts"));
                assert(program_2Diagnostics.length === expectedErrors, `removing no-default-lib shouldn't affect any types used.`);

                assert.deepEqual(program_2.host.getTrace(), [
                    "======== Resolving type reference directive 'typerefs1', containing file 'f1.ts', root directory 'node_modules/@types'. ========",
                    "Resolving with primary search path 'node_modules/@types'.",
                    "File 'node_modules/@types/typerefs1/package.json' does not exist.",
                    "File 'node_modules/@types/typerefs1/index.d.ts' exist - use it as a name resolution result.",
                    "======== Type reference directive 'typerefs1' was successfully resolved to 'node_modules/@types/typerefs1/index.d.ts', primary: true. ========",
                    "======== Resolving module './b1' from 'f1.ts'. ========",
                    "Explicitly specified module resolution kind: 'Classic'.",
                    "File 'b1.ts' exist - use it as a name resolution result.",
                    "======== Module name './b1' was successfully resolved to 'b1.ts'. ========",
                    "======== Resolving type reference directive 'typerefs2', containing file 'f2.ts', root directory 'node_modules/@types'. ========",
                    "Resolving with primary search path 'node_modules/@types'.",
                    "File 'node_modules/@types/typerefs2/package.json' does not exist.",
                    "File 'node_modules/@types/typerefs2/index.d.ts' exist - use it as a name resolution result.",
                    "======== Type reference directive 'typerefs2' was successfully resolved to 'node_modules/@types/typerefs2/index.d.ts', primary: true. ========",
                    "Reusing resolution of module './b2' to file 'f2.ts' from old program.",
                    "Reusing resolution of module './f1' to file 'f2.ts' from old program."
                ], "program_2: reuse module resolutions in f2 since it is unchanged");
            }

            const program_3 = updateProgram(program_2, program_2.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateReferences(`/// <reference path="a1.ts"/>`);
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program_3Diagnostics = program_3.getSemanticDiagnostics(program_3.getSourceFile("f2.ts"));
                assert(program_3Diagnostics.length === expectedErrors, `typerefs2 was unused, so diagnostics should be unaffected.`);

                assert.deepEqual(program_3.host.getTrace(), [
                    "======== Resolving module './b1' from 'f1.ts'. ========",
                    "Explicitly specified module resolution kind: 'Classic'.",
                    "File 'b1.ts' exist - use it as a name resolution result.",
                    "======== Module name './b1' was successfully resolved to 'b1.ts'. ========",
                    "======== Resolving type reference directive 'typerefs2', containing file 'f2.ts', root directory 'node_modules/@types'. ========",
                    "Resolving with primary search path 'node_modules/@types'.",
                    "File 'node_modules/@types/typerefs2/package.json' does not exist.",
                    "File 'node_modules/@types/typerefs2/index.d.ts' exist - use it as a name resolution result.",
                    "======== Type reference directive 'typerefs2' was successfully resolved to 'node_modules/@types/typerefs2/index.d.ts', primary: true. ========",
                    "Reusing resolution of module './b2' to file 'f2.ts' from old program.",
                    "Reusing resolution of module './f1' to file 'f2.ts' from old program."
                ], "program_3: reuse module resolutions in f2 since it is unchanged");
            }


            const program_4 = updateProgram(program_3, program_3.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateReferences("");
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program_4Diagnostics = program_4.getSemanticDiagnostics(program_4.getSourceFile("f2.ts"));
                assert(program_4Diagnostics.length === expectedErrors, `a1.ts was unused, so diagnostics should be unaffected.`);

                assert.deepEqual(program_4.host.getTrace(), [
                    "======== Resolving module './b1' from 'f1.ts'. ========",
                    "Explicitly specified module resolution kind: 'Classic'.",
                    "File 'b1.ts' exist - use it as a name resolution result.",
                    "======== Module name './b1' was successfully resolved to 'b1.ts'. ========",
                    "======== Resolving type reference directive 'typerefs2', containing file 'f2.ts', root directory 'node_modules/@types'. ========",
                    "Resolving with primary search path 'node_modules/@types'.",
                    "File 'node_modules/@types/typerefs2/package.json' does not exist.",
                    "File 'node_modules/@types/typerefs2/index.d.ts' exist - use it as a name resolution result.",
                    "======== Type reference directive 'typerefs2' was successfully resolved to 'node_modules/@types/typerefs2/index.d.ts', primary: true. ========",
                    "Reusing resolution of module './b2' to file 'f2.ts' from old program.",
                    "Reusing resolution of module './f1' to file 'f2.ts' from old program."
                ], "program_4: reuse module resolutions in f2 since it is unchanged");
            }

            const program_5 = updateProgram(program_4, program_4.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateImportsAndExports(`import { B } from './b1';`);
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program_5Diagnostics = program_5.getSemanticDiagnostics(program_5.getSourceFile("f2.ts"));
                assert(program_5Diagnostics.length === ++expectedErrors, `import of BB in f1 fails. BB is of type any. Add one error`);

                assert.deepEqual(program_5.host.getTrace(), [
                    "======== Resolving module './b1' from 'f1.ts'. ========",
                    "Explicitly specified module resolution kind: 'Classic'.",
                    "File 'b1.ts' exist - use it as a name resolution result.",
                    "======== Module name './b1' was successfully resolved to 'b1.ts'. ========"
                ], "program_5: exports do not affect program structure, so f2's resolutions are silently reused.");
            }

            const program_6 = updateProgram(program_5, program_5.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateProgram("");
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program_6Diagnostics = program_6.getSemanticDiagnostics(program_6.getSourceFile("f2.ts"));
                assert(program_6Diagnostics.length === expectedErrors, `import of BB in f1 fails.`);

                assert.deepEqual(program_6.host.getTrace(), [
                    "======== Resolving module './b1' from 'f1.ts'. ========",
                    "Explicitly specified module resolution kind: 'Classic'.",
                    "File 'b1.ts' exist - use it as a name resolution result.",
                    "======== Module name './b1' was successfully resolved to 'b1.ts'. ========",
                    "======== Resolving type reference directive 'typerefs2', containing file 'f2.ts', root directory 'node_modules/@types'. ========",
                    "Resolving with primary search path 'node_modules/@types'.",
                    "File 'node_modules/@types/typerefs2/package.json' does not exist.",
                    "File 'node_modules/@types/typerefs2/index.d.ts' exist - use it as a name resolution result.",
                    "======== Type reference directive 'typerefs2' was successfully resolved to 'node_modules/@types/typerefs2/index.d.ts', primary: true. ========",
                    "Reusing resolution of module './b2' to file 'f2.ts' from old program.",
                    "Reusing resolution of module './f1' to file 'f2.ts' from old program."
                ], "program_6: reuse module resolutions in f2 since it is unchanged");
            }

            const program_7 = updateProgram(program_6, program_6.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateImportsAndExports("");
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program_7Diagnostics = program_7.getSemanticDiagnostics(program_7.getSourceFile("f2.ts"));
                assert(program_7Diagnostics.length === expectedErrors, `removing import is noop with respect to program, so no change in diagnostics.`);

                assert.deepEqual(program_7.host.getTrace(), [
                    "======== Resolving type reference directive 'typerefs2', containing file 'f2.ts', root directory 'node_modules/@types'. ========",
                    "Resolving with primary search path 'node_modules/@types'.",
                    "File 'node_modules/@types/typerefs2/package.json' does not exist.",
                    "File 'node_modules/@types/typerefs2/index.d.ts' exist - use it as a name resolution result.",
                    "======== Type reference directive 'typerefs2' was successfully resolved to 'node_modules/@types/typerefs2/index.d.ts', primary: true. ========",
                    "Reusing resolution of module './b2' to file 'f2.ts' from old program.",
                    "Reusing resolution of module './f1' to file 'f2.ts' from old program."
                ], "program_7 should reuse module resolutions in f2 since it is unchanged");
            }
        });
    });

    describe("host is optional", () => {
        it("should work if host is not provided", () => {
            createProgram([], {});
        });
    });
}
