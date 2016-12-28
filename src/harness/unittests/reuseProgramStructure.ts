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
                return files[fileName];
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
            fileExists: fileName => fileName in files,
            readFile: fileName => {
                return fileName in files ? files[fileName].text : undefined;
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

    function updateProgram(oldProgram: ProgramWithSourceTexts, rootNames: string[], options: CompilerOptions, updater: (files: NamedSourceText[]) => void) {
        const texts: NamedSourceText[] = (<ProgramWithSourceTexts>oldProgram).sourceTexts.slice(0);
        updater(texts);
        const host = createTestCompilerHost(texts, options.target, oldProgram);
        const program = <ProgramWithSourceTexts>createProgram(rootNames, options, host, oldProgram);
        program.sourceTexts = texts;
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
            assert.isTrue(equalOwnProperties(expectedContent, cache, entryChecker), `contents of ${caption} did not match the expected contents.`);
        }
    }

    function checkResolvedModulesCache(program: Program, fileName: string, expectedContent: Map<ResolvedModule>): void {
        checkCache("resolved modules", program, fileName, expectedContent, f => f.resolvedModules, checkResolvedModule);
    }

    function checkResolvedTypeDirectivesCache(program: Program, fileName: string, expectedContent: Map<ResolvedTypeReferenceDirective>): void {
        checkCache("resolved type directives", program, fileName, expectedContent, f => f.resolvedTypeReferenceDirectiveNames, checkResolvedTypeDirective);
    }

    describe("Reuse program structure", () => {
        const target = ScriptTarget.Latest;
        const files = [
            { name: "a.ts", text: SourceText.New(
                `
/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs" />
`, "", `var x = 1`) },
            { name: "b.ts", text: SourceText.New(`/// <reference path='c.ts'/>`, "", `var y = 2`) },
            { name: "c.ts", text: SourceText.New("", "", `var z = 1;`) },
            { name: "types/typerefs/index.d.ts", text: SourceText.New("", "", `declare let z: number;`) },
        ];

        it("successful if change does not affect imports", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            const program_2 = updateProgram(program_1, ["a.ts"], { target }, files => {
                files[0].text = files[0].text.updateProgram("var x = 100");
            });
            assert.isTrue(program_1.structureIsReused);
            const program1Diagnostics = program_1.getSemanticDiagnostics(program_1.getSourceFile("a.ts"));
            const program2Diagnostics = program_2.getSemanticDiagnostics(program_1.getSourceFile("a.ts"));
            assert.equal(program1Diagnostics.length, program2Diagnostics.length);
        });

        it("successful if change does not affect type reference directives", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            const program_2 = updateProgram(program_1, ["a.ts"], { target }, files => {
                files[0].text = files[0].text.updateProgram("var x = 100");
            });
            assert.isTrue(program_1.structureIsReused);
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
            assert.isTrue(!program_1.structureIsReused);
        });

        it("fails if change affects type references", () => {
            const program_1 = newProgram(files, ["a.ts"], { types: ["a"] });
            updateProgram(program_1, ["a.ts"], { types: ["b"] }, noop);
            assert.isTrue(!program_1.structureIsReused);
        });

        it("succeeds if change doesn't affect type references", () => {
            const program_1 = newProgram(files, ["a.ts"], { types: ["a"] });
            updateProgram(program_1, ["a.ts"], { types: ["a"] }, noop);
            assert.isTrue(program_1.structureIsReused);
        });

        it("fails if change affects imports", () => {
            const program_1 = newProgram(files, ["a.ts"], { target });
            updateProgram(program_1, ["a.ts"], { target }, files => {
                files[2].text = files[2].text.updateImportsAndExports("import x from 'b'");
            });
            assert.isTrue(!program_1.structureIsReused);
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
            assert.isTrue(!program_1.structureIsReused);
        });

        it("fails if module kind changes", () => {
            const program_1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS });
            updateProgram(program_1, ["a.ts"], { target, module: ModuleKind.AMD }, noop);
            assert.isTrue(!program_1.structureIsReused);
        });

        it("fails if rootdir changes", () => {
            const program_1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS, rootDir: "/a/b" });
            updateProgram(program_1, ["a.ts"], { target, module: ModuleKind.CommonJS, rootDir: "/a/c" }, noop);
            assert.isTrue(!program_1.structureIsReused);
        });

        it("fails if config path changes", () => {
            const program_1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS, configFilePath: "/a/b/tsconfig.json" });
            updateProgram(program_1, ["a.ts"], { target, module: ModuleKind.CommonJS, configFilePath: "/a/c/tsconfig.json" }, noop);
            assert.isTrue(!program_1.structureIsReused);
        });

        it("resolution cache follows imports", () => {
            (<any>Error).stackTraceLimit = Infinity;

            const files = [
                { name: "a.ts", text: SourceText.New("", "import {_} from 'b'", "var x = 1") },
                { name: "b.ts", text: SourceText.New("", "", "var y = 2") },
            ];
            const options: CompilerOptions = { target };

            const program_1 = newProgram(files, ["a.ts"], options);
            checkResolvedModulesCache(program_1, "a.ts", createMap({ "b": createResolvedModule("b.ts") }));
            checkResolvedModulesCache(program_1, "b.ts", undefined);

            const program_2 = updateProgram(program_1, ["a.ts"], options, files => {
                files[0].text = files[0].text.updateProgram("var x = 2");
            });
            assert.isTrue(program_1.structureIsReused);

            // content of resolution cache should not change
            checkResolvedModulesCache(program_1, "a.ts", createMap({ "b": createResolvedModule("b.ts") }));
            checkResolvedModulesCache(program_1, "b.ts", undefined);

            // imports has changed - program is not reused
            const program_3 = updateProgram(program_2, ["a.ts"], options, files => {
                files[0].text = files[0].text.updateImportsAndExports("");
            });
            assert.isTrue(!program_2.structureIsReused);
            checkResolvedModulesCache(program_3, "a.ts", undefined);

            const program_4 = updateProgram(program_3, ["a.ts"], options, files => {
                const newImports = `import x from 'b'
                import y from 'c'
                `;
                files[0].text = files[0].text.updateImportsAndExports(newImports);
            });
            assert.isTrue(!program_3.structureIsReused);
            checkResolvedModulesCache(program_4, "a.ts", createMap({ "b": createResolvedModule("b.ts"), "c": undefined }));
        });

        it("resolved type directives cache follows type directives", () => {
            const files = [
                { name: "/a.ts", text: SourceText.New("/// <reference types='typedefs'/>", "", "var x = $") },
                { name: "/types/typedefs/index.d.ts", text: SourceText.New("", "", "declare var $: number") },
            ];
            const options: CompilerOptions = { target, typeRoots: ["/types"] };

            const program_1 = newProgram(files, ["/a.ts"], options);
            checkResolvedTypeDirectivesCache(program_1, "/a.ts", createMap({ "typedefs": { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } }));
            checkResolvedTypeDirectivesCache(program_1, "/types/typedefs/index.d.ts", undefined);

            const program_2 = updateProgram(program_1, ["/a.ts"], options, files => {
                files[0].text = files[0].text.updateProgram("var x = 2");
            });
            assert.isTrue(program_1.structureIsReused);

            // content of resolution cache should not change
            checkResolvedTypeDirectivesCache(program_1, "/a.ts", createMap({ "typedefs": { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } }));
            checkResolvedTypeDirectivesCache(program_1, "/types/typedefs/index.d.ts", undefined);

            // type reference directives has changed - program is not reused
            const program_3 = updateProgram(program_2, ["/a.ts"], options, files => {
                files[0].text = files[0].text.updateReferences("");
            });

            assert.isTrue(!program_2.structureIsReused);
            checkResolvedTypeDirectivesCache(program_3, "/a.ts", undefined);

            updateProgram(program_3, ["/a.ts"], options, files => {
                const newReferences = `/// <reference types="typedefs"/>
                /// <reference types="typedefs2"/>
                `;
                files[0].text = files[0].text.updateReferences(newReferences);
            });
            assert.isTrue(!program_3.structureIsReused);
            checkResolvedTypeDirectivesCache(program_1, "/a.ts", createMap({ "typedefs": { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } }));
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
    });

    describe("host is optional", () => {
        it("should work if host is not provided", () => {
            createProgram([], {});
        });
    });
}
