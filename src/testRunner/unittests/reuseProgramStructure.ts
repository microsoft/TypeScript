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

    export interface NamedSourceText {
        name: string;
        text: SourceText;
    }

    export interface ProgramWithSourceTexts extends Program {
        sourceTexts?: readonly NamedSourceText[];
        host: TestCompilerHost;
    }

    interface TestCompilerHost extends CompilerHost {
        getTrace(): string[];
    }

    export class SourceText implements IScriptSnapshot {
        private fullText: string | undefined;

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
                    return Debug.fail("Unexpected change");
            }

            return createTextChangeRange(oldSpan, newLength);
        }
    }

    function createSourceFileWithText(fileName: string, sourceText: SourceText, target: ScriptTarget) {
        const file = <SourceFileWithText>createSourceFile(fileName, sourceText.getFullText(), target);
        file.sourceText = sourceText;
        file.version = "" + sourceText.getVersion();
        return file;
    }

    export function createTestCompilerHost(texts: readonly NamedSourceText[], target: ScriptTarget, oldProgram?: ProgramWithSourceTexts, useGetSourceFileByPath?: boolean) {
        const files = arrayToMap(texts, t => t.name, t => {
            if (oldProgram) {
                let oldFile = <SourceFileWithText>oldProgram.getSourceFile(t.name);
                if (oldFile && oldFile.redirectInfo) {
                    oldFile = oldFile.redirectInfo.unredirected;
                }
                if (oldFile && oldFile.sourceText!.getVersion() === t.text.getVersion()) {
                    return oldFile;
                }
            }
            return createSourceFileWithText(t.name, t.text, target);
        });
        const useCaseSensitiveFileNames = sys && sys.useCaseSensitiveFileNames;
        const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
        const trace: string[] = [];
        const result: TestCompilerHost = {
            trace: s => trace.push(s),
            getTrace: () => trace,
            getSourceFile: fileName => files.get(fileName),
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: notImplemented,
            getCurrentDirectory: () => "",
            getDirectories: () => [],
            getCanonicalFileName,
            useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
            getNewLine: () => sys ? sys.newLine : newLine,
            fileExists: fileName => files.has(fileName),
            readFile: fileName => {
                const file = files.get(fileName);
                return file && file.text;
            },
        };
        if (useGetSourceFileByPath) {
            const filesByPath = mapEntries(files, (fileName, file) => [toPath(fileName, "", getCanonicalFileName), file]);
            result.getSourceFileByPath = (_fileName, path) => filesByPath.get(path);
        }
        return result;
    }

    export function newProgram(texts: NamedSourceText[], rootNames: string[], options: CompilerOptions, useGetSourceFileByPath?: boolean): ProgramWithSourceTexts {
        const host = createTestCompilerHost(texts, options.target!, /*oldProgram*/ undefined, useGetSourceFileByPath);
        const program = <ProgramWithSourceTexts>createProgram(rootNames, options, host);
        program.sourceTexts = texts;
        program.host = host;
        return program;
    }

    export function updateProgram(oldProgram: ProgramWithSourceTexts, rootNames: readonly string[], options: CompilerOptions, updater: (files: NamedSourceText[]) => void, newTexts?: NamedSourceText[], useGetSourceFileByPath?: boolean) {
        if (!newTexts) {
            newTexts = oldProgram.sourceTexts!.slice(0);
        }
        updater(newTexts);
        const host = createTestCompilerHost(newTexts, options.target!, oldProgram, useGetSourceFileByPath);
        const program = <ProgramWithSourceTexts>createProgram(rootNames, options, host, oldProgram);
        program.sourceTexts = newTexts;
        program.host = host;
        return program;
    }

    export function updateProgramText(files: readonly NamedSourceText[], fileName: string, newProgramText: string) {
        const file = find(files, f => f.name === fileName)!;
        file.text = file.text.updateProgram(newProgramText);
    }

    function checkResolvedTypeDirective(actual: ResolvedTypeReferenceDirective, expected: ResolvedTypeReferenceDirective) {
        assert.equal(actual.resolvedFileName, expected.resolvedFileName, `'resolvedFileName': expected '${actual.resolvedFileName}' to be equal to '${expected.resolvedFileName}'`);
        assert.equal(actual.primary, expected.primary, `'primary': expected '${actual.primary}' to be equal to '${expected.primary}'`);
        return true;
    }

    function checkCache<T>(caption: string, program: Program, fileName: string, expectedContent: Map<string, T> | undefined, getCache: (f: SourceFile) => Map<string, T> | undefined, entryChecker: (expected: T, original: T) => boolean): void {
        const file = program.getSourceFile(fileName);
        assert.isTrue(file !== undefined, `cannot find file ${fileName}`);
        const cache = getCache(file!);
        if (expectedContent === undefined) {
            assert.isTrue(cache === undefined, `expected ${caption} to be undefined`);
        }
        else {
            assert.isTrue(cache !== undefined, `expected ${caption} to be set`);
            assert.isTrue(mapsAreEqual(expectedContent, cache!, entryChecker), `contents of ${caption} did not match the expected contents.`);
        }
    }

    /** True if the maps have the same keys and values. */
    function mapsAreEqual<T>(left: Map<string, T>, right: Map<string, T>, valuesAreEqual?: (left: T, right: T) => boolean): boolean {
        if (left === right) return true;
        if (!left || !right) return false;
        const someInLeftHasNoMatch = forEachEntry(left, (leftValue, leftKey) => {
            if (!right.has(leftKey)) return true;
            const rightValue = right.get(leftKey)!;
            return !(valuesAreEqual ? valuesAreEqual(leftValue, rightValue) : leftValue === rightValue);
        });
        if (someInLeftHasNoMatch) return false;
        const someInRightHasNoMatch = forEachKey(right, rightKey => !left.has(rightKey));
        return !someInRightHasNoMatch;
    }

    function checkResolvedModulesCache(program: Program, fileName: string, expectedContent: Map<string, ResolvedModule | undefined> | undefined): void {
        checkCache("resolved modules", program, fileName, expectedContent, f => f.resolvedModules, checkResolvedModule);
    }

    function checkResolvedTypeDirectivesCache(program: Program, fileName: string, expectedContent: Map<string, ResolvedTypeReferenceDirective> | undefined): void {
        checkCache("resolved type directives", program, fileName, expectedContent, f => f.resolvedTypeReferenceDirectiveNames, checkResolvedTypeDirective);
    }

    describe("unittests:: Reuse program structure:: General", () => {
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
            const program1 = newProgram(files, ["a.ts"], { target });
            const program2 = updateProgram(program1, ["a.ts"], { target }, files => {
                files[0].text = files[0].text.updateProgram("var x = 100");
            });
            assert.equal(program1.structureIsReused, StructureIsReused.Completely);
            const program1Diagnostics = program1.getSemanticDiagnostics(program1.getSourceFile("a.ts"));
            const program2Diagnostics = program2.getSemanticDiagnostics(program1.getSourceFile("a.ts"));
            assert.equal(program1Diagnostics.length, program2Diagnostics.length);
        });

        it("successful if change does not affect type reference directives", () => {
            const program1 = newProgram(files, ["a.ts"], { target });
            const program2 = updateProgram(program1, ["a.ts"], { target }, files => {
                files[0].text = files[0].text.updateProgram("var x = 100");
            });
            assert.equal(program1.structureIsReused, StructureIsReused.Completely);
            const program1Diagnostics = program1.getSemanticDiagnostics(program1.getSourceFile("a.ts"));
            const program2Diagnostics = program2.getSemanticDiagnostics(program1.getSourceFile("a.ts"));
            assert.equal(program1Diagnostics.length, program2Diagnostics.length);
        });

        it("fails if change affects tripleslash references", () => {
            const program1 = newProgram(files, ["a.ts"], { target });
            updateProgram(program1, ["a.ts"], { target }, files => {
                const newReferences = `/// <reference path='b.ts'/>
                /// <reference path='c.ts'/>
                `;
                files[0].text = files[0].text.updateReferences(newReferences);
            });
            assert.equal(program1.structureIsReused, StructureIsReused.SafeModules);
        });

        it("fails if change affects type references", () => {
            const program1 = newProgram(files, ["a.ts"], { types: ["a"] });
            updateProgram(program1, ["a.ts"], { types: ["b"] }, noop);
            assert.equal(program1.structureIsReused, StructureIsReused.Not);
        });

        it("succeeds if change doesn't affect type references", () => {
            const program1 = newProgram(files, ["a.ts"], { types: ["a"] });
            updateProgram(program1, ["a.ts"], { types: ["a"] }, noop);
            assert.equal(program1.structureIsReused, StructureIsReused.Completely);
        });

        it("fails if change affects imports", () => {
            const program1 = newProgram(files, ["a.ts"], { target });
            updateProgram(program1, ["a.ts"], { target }, files => {
                files[2].text = files[2].text.updateImportsAndExports("import x from 'b'");
            });
            assert.equal(program1.structureIsReused, StructureIsReused.SafeModules);
        });

        it("fails if change affects type directives", () => {
            const program1 = newProgram(files, ["a.ts"], { target });
            updateProgram(program1, ["a.ts"], { target }, files => {
                const newReferences = `
/// <reference path='b.ts'/>
/// <reference path='non-existing-file.ts'/>
/// <reference types="typerefs1" />`;
                files[0].text = files[0].text.updateReferences(newReferences);
            });
            assert.equal(program1.structureIsReused, StructureIsReused.SafeModules);
        });

        it("fails if module kind changes", () => {
            const program1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS });
            updateProgram(program1, ["a.ts"], { target, module: ModuleKind.AMD }, noop);
            assert.equal(program1.structureIsReused, StructureIsReused.Not);
        });

        it("succeeds if rootdir changes", () => {
            const program1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS, rootDir: "/a/b" });
            updateProgram(program1, ["a.ts"], { target, module: ModuleKind.CommonJS, rootDir: "/a/c" }, noop);
            assert.equal(program1.structureIsReused, StructureIsReused.Completely);
        });

        it("fails if config path changes", () => {
            const program1 = newProgram(files, ["a.ts"], { target, module: ModuleKind.CommonJS, configFilePath: "/a/b/tsconfig.json" });
            updateProgram(program1, ["a.ts"], { target, module: ModuleKind.CommonJS, configFilePath: "/a/c/tsconfig.json" }, noop);
            assert.equal(program1.structureIsReused, StructureIsReused.Not);
        });

        it("succeeds if missing files remain missing", () => {
            const options: CompilerOptions = { target, noLib: true };

            const program1 = newProgram(files, ["a.ts"], options);
            assert.notDeepEqual(emptyArray, program1.getMissingFilePaths());

            const program2 = updateProgram(program1, ["a.ts"], options, noop);
            assert.deepEqual(program1.getMissingFilePaths(), program2.getMissingFilePaths());

            assert.equal(StructureIsReused.Completely, program1.structureIsReused);
        });

        it("fails if missing file is created", () => {
            const options: CompilerOptions = { target, noLib: true };

            const program1 = newProgram(files, ["a.ts"], options);
            assert.notDeepEqual(emptyArray, program1.getMissingFilePaths());

            const newTexts: NamedSourceText[] = files.concat([{ name: "non-existing-file.ts", text: SourceText.New("", "", `var x = 1`) }]);
            const program2 = updateProgram(program1, ["a.ts"], options, noop, newTexts);
            assert.lengthOf(program2.getMissingFilePaths(), 0);

            assert.equal(StructureIsReused.Not, program1.structureIsReused);
        });

        it("resolution cache follows imports", () => {
            (<any>Error).stackTraceLimit = Infinity;

            const files = [
                { name: "a.ts", text: SourceText.New("", "import {_} from 'b'", "var x = 1") },
                { name: "b.ts", text: SourceText.New("", "", "var y = 2") },
            ];
            const options: CompilerOptions = { target };

            const program1 = newProgram(files, ["a.ts"], options);
            checkResolvedModulesCache(program1, "a.ts", new Map(getEntries({ b: createResolvedModule("b.ts") })));
            checkResolvedModulesCache(program1, "b.ts", /*expectedContent*/ undefined);

            const program2 = updateProgram(program1, ["a.ts"], options, files => {
                files[0].text = files[0].text.updateProgram("var x = 2");
            });
            assert.equal(program1.structureIsReused, StructureIsReused.Completely);

            // content of resolution cache should not change
            checkResolvedModulesCache(program1, "a.ts", new Map(getEntries({ b: createResolvedModule("b.ts") })));
            checkResolvedModulesCache(program1, "b.ts", /*expectedContent*/ undefined);

            // imports has changed - program is not reused
            const program3 = updateProgram(program2, ["a.ts"], options, files => {
                files[0].text = files[0].text.updateImportsAndExports("");
            });
            assert.equal(program2.structureIsReused, StructureIsReused.SafeModules);
            checkResolvedModulesCache(program3, "a.ts", /*expectedContent*/ undefined);

            const program4 = updateProgram(program3, ["a.ts"], options, files => {
                const newImports = `import x from 'b'
                import y from 'c'
                `;
                files[0].text = files[0].text.updateImportsAndExports(newImports);
            });
            assert.equal(program3.structureIsReused, StructureIsReused.SafeModules);
            checkResolvedModulesCache(program4, "a.ts", new Map(getEntries({ b: createResolvedModule("b.ts"), c: undefined })));
        });

        it("set the resolvedImports after re-using an ambient external module declaration", () => {
            const files = [
                { name: "/a.ts", text: SourceText.New("", "", 'import * as a from "a";') },
                { name: "/types/zzz/index.d.ts", text: SourceText.New("", "", 'declare module "a" { }') },
            ];
            const options: CompilerOptions = { target, typeRoots: ["/types"] };
            const program1 = newProgram(files, ["/a.ts"], options);
            const program2 = updateProgram(program1, ["/a.ts"], options, files => {
                files[0].text = files[0].text.updateProgram('import * as aa from "a";');
            });
            assert.isDefined(program2.getSourceFile("/a.ts")!.resolvedModules!.get("a"), "'a' is not an unresolved module after re-use");
        });

        it("works with updated SourceFiles", () => {
            // adapted repro from https://github.com/Microsoft/TypeScript/issues/26166
            const files = [
                { name: "/a.ts", text: SourceText.New("", "", 'import * as a from "a";a;') },
                { name: "/types/zzz/index.d.ts", text: SourceText.New("", "", 'declare module "a" { }') },
            ];
            const host = createTestCompilerHost(files, target);
            const options: CompilerOptions = { target, typeRoots: ["/types"] };
            const program1 = createProgram(["/a.ts"], options, host);
            let sourceFile = program1.getSourceFile("/a.ts")!;
            assert.isDefined(sourceFile, "'/a.ts' is included in the program");
            sourceFile = updateSourceFile(sourceFile, "'use strict';" + sourceFile.text, { newLength: "'use strict';".length, span: { start: 0, length: 0 } });
            assert.strictEqual(sourceFile.statements[2].getSourceFile(), sourceFile, "parent pointers are updated");
            const updateHost: TestCompilerHost = {
                ...host,
                getSourceFile(fileName) {
                    return fileName === sourceFile.fileName ? sourceFile : program1.getSourceFile(fileName);
                }
            };
            const program2 = createProgram(["/a.ts"], options, updateHost, program1);
            assert.isDefined(program2.getSourceFile("/a.ts")!.resolvedModules!.get("a"), "'a' is not an unresolved module after re-use");
            assert.strictEqual(sourceFile.statements[2].getSourceFile(), sourceFile, "parent pointers are not altered");
        });

        it("resolved type directives cache follows type directives", () => {
            const files = [
                { name: "/a.ts", text: SourceText.New("/// <reference types='typedefs'/>", "", "var x = $") },
                { name: "/types/typedefs/index.d.ts", text: SourceText.New("", "", "declare var $: number") },
            ];
            const options: CompilerOptions = { target, typeRoots: ["/types"] };

            const program1 = newProgram(files, ["/a.ts"], options);
            checkResolvedTypeDirectivesCache(program1, "/a.ts", new Map(getEntries({ typedefs: { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } })));
            checkResolvedTypeDirectivesCache(program1, "/types/typedefs/index.d.ts", /*expectedContent*/ undefined);

            const program2 = updateProgram(program1, ["/a.ts"], options, files => {
                files[0].text = files[0].text.updateProgram("var x = 2");
            });
            assert.equal(program1.structureIsReused, StructureIsReused.Completely);

            // content of resolution cache should not change
            checkResolvedTypeDirectivesCache(program1, "/a.ts", new Map(getEntries({ typedefs: { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } })));
            checkResolvedTypeDirectivesCache(program1, "/types/typedefs/index.d.ts", /*expectedContent*/ undefined);

            // type reference directives has changed - program is not reused
            const program3 = updateProgram(program2, ["/a.ts"], options, files => {
                files[0].text = files[0].text.updateReferences("");
            });

            assert.equal(program2.structureIsReused, StructureIsReused.SafeModules);
            checkResolvedTypeDirectivesCache(program3, "/a.ts", /*expectedContent*/ undefined);

            updateProgram(program3, ["/a.ts"], options, files => {
                const newReferences = `/// <reference types="typedefs"/>
                /// <reference types="typedefs2"/>
                `;
                files[0].text = files[0].text.updateReferences(newReferences);
            });
            assert.equal(program3.structureIsReused, StructureIsReused.SafeModules);
            checkResolvedTypeDirectivesCache(program1, "/a.ts", new Map(getEntries({ typedefs: { resolvedFileName: "/types/typedefs/index.d.ts", primary: true } })));
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
                        "File 'node_modules/a/package.json' does not exist.",
                        "File 'node_modules/a.ts' does not exist.",
                        "File 'node_modules/a.tsx' does not exist.",
                        "File 'node_modules/a.d.ts' does not exist.",
                        "File 'node_modules/a/index.ts' does not exist.",
                        "File 'node_modules/a/index.tsx' does not exist.",
                        "File 'node_modules/a/index.d.ts' does not exist.",
                        "File 'node_modules/@types/a/package.json' does not exist.",
                        "File 'node_modules/@types/a.d.ts' does not exist.",
                        "File 'node_modules/@types/a/index.d.ts' does not exist.",
                        "Loading module 'a' from 'node_modules' folder, target file type 'JavaScript'.",
                        "File 'node_modules/a/package.json' does not exist.",
                        "File 'node_modules/a.js' does not exist.",
                        "File 'node_modules/a.jsx' does not exist.",
                        "File 'node_modules/a/index.js' does not exist.",
                        "File 'node_modules/a/index.jsx' does not exist.",
                        "======== Module name 'a' was not resolved. ========"
                    ],
                    "initialProgram: execute module resolution normally.");

                const initialProgramDiagnostics = initialProgram.getSemanticDiagnostics(initialProgram.getSourceFile("file1.ts"));
                assert.lengthOf(initialProgramDiagnostics, 1, `initialProgram: import should fail.`);
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
                        "File 'node_modules/a/package.json' does not exist.",
                        "File 'node_modules/a.ts' does not exist.",
                        "File 'node_modules/a.tsx' does not exist.",
                        "File 'node_modules/a.d.ts' does not exist.",
                        "File 'node_modules/a/index.ts' does not exist.",
                        "File 'node_modules/a/index.tsx' does not exist.",
                        "File 'node_modules/a/index.d.ts' exist - use it as a name resolution result.",
                        "======== Module name 'a' was successfully resolved to 'node_modules/a/index.d.ts'. ========"
                    ],
                    "afterNpmInstallProgram: execute module resolution normally.");

                const afterNpmInstallProgramDiagnostics = afterNpmInstallProgram.getSemanticDiagnostics(afterNpmInstallProgram.getSourceFile("file1.ts"));
                assert.lengthOf(afterNpmInstallProgramDiagnostics, 0, `afterNpmInstallProgram: program is well-formed with import.`);
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
                    "File '/a/b/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/b/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/b/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/node_modules/@types/fs/package.json' does not exist.",
                    "File '/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/a/b/fs.js' does not exist.",
                    "File '/a/b/fs.jsx' does not exist.",
                    "File '/a/fs.js' does not exist.",
                    "File '/a/fs.jsx' does not exist.",
                    "File '/fs.js' does not exist.",
                    "File '/fs.jsx' does not exist.",
                    "======== Module name 'fs' was not resolved. ========",
                ], "should look for 'fs'");

            const program2 = updateProgram(program, program.getRootFileNames(), options, f => {
                f[0].text = f[0].text.updateProgram("var x = 1;");
            });
            assert.deepEqual(program2.host.getTrace(), [
                "Module 'fs' was resolved as ambient module declared in '/a/b/node.d.ts' since this file was not modified."
            ], "should reuse 'fs' since node.d.ts was not changed");

            const program3 = updateProgram(program2, program2.getRootFileNames(), options, f => {
                f[0].text = f[0].text.updateProgram("var y = 1;");
                f[1].text = f[1].text.updateProgram("declare var process: any");
            });
            assert.deepEqual(program3.host.getTrace(),
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
                    "File '/a/b/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/b/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/b/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs/package.json' does not exist.",
                    "File '/a/node_modules/@types/fs.d.ts' does not exist.",
                    "File '/a/node_modules/@types/fs/index.d.ts' does not exist.",
                    "File '/node_modules/@types/fs/package.json' does not exist.",
                    "File '/node_modules/@types/fs.d.ts' does not exist.",
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
            const program1 = newProgram(files, files.map(f => f.name), options);
            let expectedErrors = 0;
            {
                assert.deepEqual(program1.host.getTrace(),
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
                    "program1: execute module resolution normally.");

                const program1Diagnostics = program1.getSemanticDiagnostics(program1.getSourceFile("f2.ts"));
                assert.lengthOf(program1Diagnostics, expectedErrors, `initial program should be well-formed`);
            }
            const indexOfF1 = 6;
            const program2 = updateProgram(program1, program1.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateReferences(`/// <reference path="a1.ts"/>${newLine}/// <reference types="typerefs1"/>`);
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program2Diagnostics = program2.getSemanticDiagnostics(program2.getSourceFile("f2.ts"));
                assert.lengthOf(program2Diagnostics, expectedErrors, `removing no-default-lib shouldn't affect any types used.`);

                assert.deepEqual(program2.host.getTrace(), [
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
                ], "program2: reuse module resolutions in f2 since it is unchanged");
            }

            const program3 = updateProgram(program2, program2.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateReferences(`/// <reference path="a1.ts"/>`);
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program3Diagnostics = program3.getSemanticDiagnostics(program3.getSourceFile("f2.ts"));
                assert.lengthOf(program3Diagnostics, expectedErrors, `typerefs2 was unused, so diagnostics should be unaffected.`);

                assert.deepEqual(program3.host.getTrace(), [
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
                ], "program3: reuse module resolutions in f2 since it is unchanged");
            }


            const program4 = updateProgram(program3, program3.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateReferences("");
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program4Diagnostics = program4.getSemanticDiagnostics(program4.getSourceFile("f2.ts"));
                assert.lengthOf(program4Diagnostics, expectedErrors, `a1.ts was unused, so diagnostics should be unaffected.`);

                assert.deepEqual(program4.host.getTrace(), [
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

            const program5 = updateProgram(program4, program4.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateImportsAndExports(`import { B } from './b1';`);
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program5Diagnostics = program5.getSemanticDiagnostics(program5.getSourceFile("f2.ts"));
                assert.lengthOf(program5Diagnostics, ++expectedErrors, `import of BB in f1 fails. BB is of type any. Add one error`);

                assert.deepEqual(program5.host.getTrace(), [
                    "======== Resolving module './b1' from 'f1.ts'. ========",
                    "Explicitly specified module resolution kind: 'Classic'.",
                    "File 'b1.ts' exist - use it as a name resolution result.",
                    "======== Module name './b1' was successfully resolved to 'b1.ts'. ========"
                ], "program_5: exports do not affect program structure, so f2's resolutions are silently reused.");
            }

            const program6 = updateProgram(program5, program5.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateProgram("");
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program6Diagnostics = program6.getSemanticDiagnostics(program6.getSourceFile("f2.ts"));
                assert.lengthOf(program6Diagnostics, expectedErrors, `import of BB in f1 fails.`);

                assert.deepEqual(program6.host.getTrace(), [
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

            const program7 = updateProgram(program6, program6.getRootFileNames(), options, f => {
                const newSourceText = f[indexOfF1].text.updateImportsAndExports("");
                f[indexOfF1] = { name: "f1.ts", text: newSourceText };
            });

            {
                const program7Diagnostics = program7.getSemanticDiagnostics(program7.getSourceFile("f2.ts"));
                assert.lengthOf(program7Diagnostics, expectedErrors, `removing import is noop with respect to program, so no change in diagnostics.`);

                assert.deepEqual(program7.host.getTrace(), [
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

        describe("redirects", () => {
            const axIndex = "/node_modules/a/node_modules/x/index.d.ts";
            const axPackage = "/node_modules/a/node_modules/x/package.json";
            const bxIndex = "/node_modules/b/node_modules/x/index.d.ts";
            const bxPackage = "/node_modules/b/node_modules/x/package.json";
            const root = "/a.ts";
            const compilerOptions = { target, moduleResolution: ModuleResolutionKind.NodeJs };

            function createRedirectProgram(useGetSourceFileByPath: boolean, options?: { bText: string, bVersion: string }): ProgramWithSourceTexts {
                const files: NamedSourceText[] = [
                    {
                        name: "/node_modules/a/index.d.ts",
                        text: SourceText.New("", 'import X from "x";', "export function a(x: X): void;"),
                    },
                    {
                        name: axIndex,
                        text: SourceText.New("", "", "export default class X { private x: number; }"),
                    },
                    {
                        name: axPackage,
                        text: SourceText.New("", "", JSON.stringify({ name: "x", version: "1.2.3" })),
                    },
                    {
                        name: "/node_modules/b/index.d.ts",
                        text: SourceText.New("", 'import X from "x";', "export const b: X;"),
                    },
                    {
                        name: bxIndex,
                        text: SourceText.New("", "", options ? options.bText : "export default class X { private x: number; }"),
                    },
                    {
                        name: bxPackage,
                        text: SourceText.New("", "", JSON.stringify({ name: "x", version: options ? options.bVersion : "1.2.3" })),
                    },
                    {
                        name: root,
                        text: SourceText.New("", 'import { a } from "a"; import { b } from "b";', "a(b)"),
                    },
                ];

                return newProgram(files, [root], compilerOptions, useGetSourceFileByPath);
            }

            function updateRedirectProgram(program: ProgramWithSourceTexts, updater: (files: NamedSourceText[]) => void, useGetSourceFileByPath: boolean): ProgramWithSourceTexts {
                return updateProgram(program, [root], compilerOptions, updater, /*newTexts*/ undefined, useGetSourceFileByPath);
            }

            function verifyRedirects(useGetSourceFileByPath: boolean) {
                it("No changes -> redirect not broken", () => {
                    const program1 = createRedirectProgram(useGetSourceFileByPath);

                    const program2 = updateRedirectProgram(program1, files => {
                        updateProgramText(files, root, "const x = 1;");
                    }, useGetSourceFileByPath);
                    assert.equal(program1.structureIsReused, StructureIsReused.Completely);
                    assert.lengthOf(program2.getSemanticDiagnostics(), 0);
                });

                it("Target changes -> redirect broken", () => {
                    const program1 = createRedirectProgram(useGetSourceFileByPath);
                    assert.lengthOf(program1.getSemanticDiagnostics(), 0);

                    const program2 = updateRedirectProgram(program1, files => {
                        updateProgramText(files, axIndex, "export default class X { private x: number; private y: number; }");
                        updateProgramText(files, axPackage, JSON.stringify('{ name: "x", version: "1.2.4" }'));
                    }, useGetSourceFileByPath);
                    assert.equal(program1.structureIsReused, StructureIsReused.Not);
                    assert.lengthOf(program2.getSemanticDiagnostics(), 1);
                });

                it("Underlying changes -> redirect broken", () => {
                    const program1 = createRedirectProgram(useGetSourceFileByPath);

                    const program2 = updateRedirectProgram(program1, files => {
                        updateProgramText(files, bxIndex, "export default class X { private x: number; private y: number; }");
                        updateProgramText(files, bxPackage, JSON.stringify({ name: "x", version: "1.2.4" }));
                    }, useGetSourceFileByPath);
                    assert.equal(program1.structureIsReused, StructureIsReused.Not);
                    assert.lengthOf(program2.getSemanticDiagnostics(), 1);
                });

                it("Previously duplicate packages -> program structure not reused", () => {
                    const program1 = createRedirectProgram(useGetSourceFileByPath, { bVersion: "1.2.4", bText: "export = class X { private x: number; }" });

                    const program2 = updateRedirectProgram(program1, files => {
                        updateProgramText(files, bxIndex, "export default class X { private x: number; }");
                        updateProgramText(files, bxPackage, JSON.stringify({ name: "x", version: "1.2.3" }));
                    }, useGetSourceFileByPath);
                    assert.equal(program1.structureIsReused, StructureIsReused.Not);
                    assert.deepEqual(program2.getSemanticDiagnostics(), []);
                });
            }

            describe("when host implements getSourceFile", () => {
                verifyRedirects(/*useGetSourceFileByPath*/ false);
            });
            describe("when host implements getSourceFileByPath", () => {
                verifyRedirects(/*useGetSourceFileByPath*/ true);
            });
        });
    });

    describe("unittests:: Reuse program structure:: host is optional", () => {
        it("should work if host is not provided", () => {
            createProgram([], {});
        });
    });

    type File = TestFSWithWatch.File;
    import createTestSystem = TestFSWithWatch.createWatchedSystem;
    import libFile = TestFSWithWatch.libFile;

    describe("unittests:: Reuse program structure:: isProgramUptoDate", () => {
        function getWhetherProgramIsUptoDate(
            program: Program,
            newRootFileNames: string[],
            newOptions: CompilerOptions
        ) {
            return isProgramUptoDate(
                program, newRootFileNames, newOptions,
                path => program.getSourceFileByPath(path)!.version, /*fileExists*/ returnFalse,
                /*hasInvalidatedResolution*/ returnFalse,
                /*hasChangedAutomaticTypeDirectiveNames*/ undefined,
                /*projectReferences*/ undefined
            );
        }

        function duplicate(options: CompilerOptions): CompilerOptions;
        function duplicate(fileNames: string[]): string[];
        function duplicate(filesOrOptions: CompilerOptions | string[]) {
            return JSON.parse(JSON.stringify(filesOrOptions));
        }

        describe("should return true when there is no change in compiler options and", () => {
            function verifyProgramIsUptoDate(
                program: Program,
                newRootFileNames: string[],
                newOptions: CompilerOptions
            ) {
                const actual = getWhetherProgramIsUptoDate(program, newRootFileNames, newOptions);
                assert.isTrue(actual);
            }

            function verifyProgramWithoutConfigFile(system: System, rootFiles: string[], options: CompilerOptions) {
                const program = createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptions({
                    rootFiles,
                    options,
                    watchOptions: undefined,
                    system
                })).getCurrentProgram().getProgram();
                verifyProgramIsUptoDate(program, duplicate(rootFiles), duplicate(options));
            }

            function verifyProgramWithConfigFile(system: System, configFileName: string) {
                const program = createWatchProgram(createWatchCompilerHostOfConfigFile({
                    configFileName,
                    system
                })).getCurrentProgram().getProgram();
                const { fileNames, options } = parseConfigFileWithSystem(configFileName, {}, /*watchOptionsToExtend*/ undefined, system, notImplemented)!; // TODO: GH#18217
                verifyProgramIsUptoDate(program, fileNames, options);
            }

            function verifyProgram(files: File[], rootFiles: string[], options: CompilerOptions, configFile: string) {
                const system = createTestSystem(files);
                verifyProgramWithoutConfigFile(system, rootFiles, options);
                verifyProgramWithConfigFile(system, configFile);
            }

            it("has empty options", () => {
                const file1: File = {
                    path: "/a/b/file1.ts",
                    content: "let x = 1"
                };
                const file2: File = {
                    path: "/a/b/file2.ts",
                    content: "let y = 1"
                };
                const configFile: File = {
                    path: "/a/b/tsconfig.json",
                    content: "{}"
                };
                verifyProgram([file1, file2, libFile, configFile], [file1.path, file2.path], {}, configFile.path);
            });

            it("has lib specified in the options", () => {
                const compilerOptions: CompilerOptions = { lib: ["es5", "es2015.promise"] };
                const app: File = {
                    path: "/src/app.ts",
                    content: "var x: Promise<string>;"
                };
                const configFile: File = {
                    path: "/src/tsconfig.json",
                    content: JSON.stringify({ compilerOptions })
                };
                const es5Lib: File = {
                    path: "/compiler/lib.es5.d.ts",
                    content: "declare const eval: any"
                };
                const es2015Promise: File = {
                    path: "/compiler/lib.es2015.promise.d.ts",
                    content: "declare class Promise<T> {}"
                };

                verifyProgram([app, configFile, es5Lib, es2015Promise], [app.path], compilerOptions, configFile.path);
            });

            it("has paths specified in the options", () => {
                const compilerOptions: CompilerOptions = {
                    baseUrl: ".",
                    paths: {
                        "*": [
                            "packages/mail/data/*",
                            "packages/styles/*",
                            "*"
                        ]
                    }
                };
                const app: File = {
                    path: "/src/packages/framework/app.ts",
                    content: 'import classc from "module1/lib/file1";\
                              import classD from "module3/file3";\
                              let x = new classc();\
                              let y = new classD();'
                };
                const module1: File = {
                    path: "/src/packages/mail/data/module1/lib/file1.ts",
                    content: 'import classc from "module2/file2";export default classc;',
                };
                const module2: File = {
                    path: "/src/packages/mail/data/module1/lib/module2/file2.ts",
                    content: 'class classc { method2() { return "hello"; } }\nexport default classc',
                };
                const module3: File = {
                    path: "/src/packages/styles/module3/file3.ts",
                    content: "class classD { method() { return 10; } }\nexport default classD;"
                };
                const configFile: File = {
                    path: "/src/tsconfig.json",
                    content: JSON.stringify({ compilerOptions })
                };

                verifyProgram([app, module1, module2, module3, libFile, configFile], [app.path], compilerOptions, configFile.path);
            });

            it("has include paths specified in tsconfig file", () => {
                const compilerOptions: CompilerOptions = {
                    baseUrl: ".",
                    paths: {
                        "*": [
                            "packages/mail/data/*",
                            "packages/styles/*",
                            "*"
                        ]
                    }
                };
                const app: File = {
                    path: "/src/packages/framework/app.ts",
                    content: 'import classc from "module1/lib/file1";\
                              import classD from "module3/file3";\
                              let x = new classc();\
                              let y = new classD();'
                };
                const module1: File = {
                    path: "/src/packages/mail/data/module1/lib/file1.ts",
                    content: 'import classc from "module2/file2";export default classc;',
                };
                const module2: File = {
                    path: "/src/packages/mail/data/module1/lib/module2/file2.ts",
                    content: 'class classc { method2() { return "hello"; } }\nexport default classc',
                };
                const module3: File = {
                    path: "/src/packages/styles/module3/file3.ts",
                    content: "class classD { method() { return 10; } }\nexport default classD;"
                };
                const configFile: File = {
                    path: "/src/tsconfig.json",
                    content: JSON.stringify({ compilerOptions, include: ["packages/**/*.ts"] })
                };
                verifyProgramWithConfigFile(createTestSystem([app, module1, module2, module3, libFile, configFile]), configFile.path);
            });
            it("has the same root file names", () => {
                const module1: File = {
                    path: "/src/packages/mail/data/module1/lib/file1.ts",
                    content: 'import classc from "module2/file2";export default classc;',
                };
                const module2: File = {
                    path: "/src/packages/mail/data/module1/lib/module2/file2.ts",
                    content: 'class classc { method2() { return "hello"; } }\nexport default classc',
                };
                const module3: File = {
                    path: "/src/packages/styles/module3/file3.ts",
                    content: "class classD { method() { return 10; } }\nexport default classD;"
                };
                const rootFiles = [module1.path, module2.path, module3.path];
                const system = createTestSystem([module1, module2, module3]);
                const options = {};
                const program = createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptions({
                    rootFiles,
                    options,
                    watchOptions: undefined,
                    system
                })).getCurrentProgram().getProgram();
                verifyProgramIsUptoDate(program, duplicate(rootFiles), duplicate(options));
            });

        });
        describe("should return false when there is no change in compiler options but", () => {
            function verifyProgramIsNotUptoDate(
                program: Program,
                newRootFileNames: string[],
                newOptions: CompilerOptions
            ) {
                const actual = getWhetherProgramIsUptoDate(program, newRootFileNames, newOptions);
                assert.isFalse(actual);
            }
            it("has more root file names", () => {
                const module1: File = {
                    path: "/src/packages/mail/data/module1/lib/file1.ts",
                    content: 'import classc from "module2/file2";export default classc;',
                };
                const module2: File = {
                    path: "/src/packages/mail/data/module1/lib/module2/file2.ts",
                    content: 'class classc { method2() { return "hello"; } }\nexport default classc',
                };
                const module3: File = {
                    path: "/src/packages/styles/module3/file3.ts",
                    content: "class classD { method() { return 10; } }\nexport default classD;"
                };
                const rootFiles = [module1.path, module2.path];
                const newRootFiles = [module1.path, module2.path, module3.path];
                const system = createTestSystem([module1, module2, module3]);
                const options = {};
                const program = createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptions({
                    rootFiles,
                    options,
                    watchOptions: undefined,
                    system
                })).getCurrentProgram().getProgram();
                verifyProgramIsNotUptoDate(program, duplicate(newRootFiles), duplicate(options));
            });
            it("has one root file replaced by another", () => {
                const module1: File = {
                    path: "/src/packages/mail/data/module1/lib/file1.ts",
                    content: 'import classc from "module2/file2";export default classc;',
                };
                const module2: File = {
                    path: "/src/packages/mail/data/module1/lib/module2/file2.ts",
                    content: 'class classc { method2() { return "hello"; } }\nexport default classc',
                };
                const module3: File = {
                    path: "/src/packages/styles/module3/file3.ts",
                    content: "class classD { method() { return 10; } }\nexport default classD;"
                };
                const rootFiles = [module1.path, module2.path];
                const newRootFiles = [module2.path, module3.path];
                const system = createTestSystem([module1, module2, module3]);
                const options = {};
                const program = createWatchProgram(createWatchCompilerHostOfFilesAndCompilerOptions({
                    rootFiles,
                    options,
                    watchOptions: undefined,
                    system
                })).getCurrentProgram().getProgram();
                verifyProgramIsNotUptoDate(program, duplicate(newRootFiles), duplicate(options));
            });
        });
    });
}
