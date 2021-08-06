namespace ts.projectSystem {
    function createExportingModuleFile(path: string, exportPrefix: string, exportCount: number): File {
        return {
            path,
            content: fill(exportCount, i => `export const ${exportPrefix}_${i} = ${i};`).join("\n"),
        };
    }

    function createExportingModuleFiles(pathPrefix: string, fileCount: number, exportCount: number, getExportPrefix: (fileIndex: number) => string): File[] {
        return fill(fileCount, fileIndex => createExportingModuleFile(
            `${pathPrefix}_${fileIndex}.ts`,
            getExportPrefix(fileIndex),
            exportCount));
    }

    function createNodeModulesPackage(packageName: string, fileCount: number, exportCount: number, getExportPrefix: (fileIndex: number) => string): File[] {
        const exportingFiles = createExportingModuleFiles(`/node_modules/${packageName}/file`, fileCount, exportCount, getExportPrefix);
        return [
            {
                path: `/node_modules/${packageName}/package.json`,
                content: `{ "types": "index.d.ts" }`,
            },
            {
                path: `/node_modules/${packageName}/index.d.ts`,
                content: exportingFiles
                    .map(f => `export * from "./${removeFileExtension(convertToRelativePath(f.path, `/node_modules/${packageName}/`, identity))}";`)
                    .join("\n") + `\nexport default function main(): void;`,
            },
            ...exportingFiles,
        ];
    }

    const indexFile: File = {
        path: "/index.ts",
        content: ""
    };

    const tsconfigFile: File = {
        path: "/tsconfig.json",
        content: `{ "compilerOptions": { "module": "commonjs" } }`
    };

    const packageJsonFile: File = {
        path: "/package.json",
        content: `{ "dependencies": { "dep-a": "*" } }`,
    };

    describe("unittests:: tsserver:: completionsIncomplete", () => {
        it("works", () => {
            const excessFileCount = Completions.moduleSpecifierResolutionLimit + 50;
            const exportingFiles = createExportingModuleFiles(`/lib/a`, Completions.moduleSpecifierResolutionLimit + excessFileCount, 1, i => `aa_${i}_`);
            const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "a", completions => {
                assert(completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), Completions.moduleSpecifierResolutionLimit);
                assert.lengthOf(completions.entries.filter(entry => entry.source && !(entry.data as any)?.moduleSpecifier), excessFileCount);
            })
            .continueTyping("a", completions => {
                assert(completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), Completions.moduleSpecifierResolutionLimit * 2);
            })
            .continueTyping("_", completions => {
                assert(!completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), exportingFiles.length);
            });
        });

        it("resolves more when available from module specifier cache (1)", () => {
            const exportingFiles = createExportingModuleFiles(`/lib/a`, 50, 50, i => `aa_${i}_`);
            const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "a", completions => {
                assert(!completions.isIncomplete);
            });
        });

        it("resolves more when available from module specifier cache (2)", () => {
            const excessFileCount = 50;
            const exportingFiles = createExportingModuleFiles(`/lib/a`, Completions.moduleSpecifierResolutionLimit + excessFileCount, 1, i => `aa_${i}_`);
            const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "a", completions => assert(completions.isIncomplete))
                .backspace()
                .type("a", completions => assert(!completions.isIncomplete));
        });

        it("ambient module specifier resolutions do not count against the resolution limit", () => {
            const ambientFiles = fill(100, (i): File => ({
                path: `/lib/ambient_${i}.ts`,
                content: `declare module "ambient_${i}" { export const aa_${i} = ${i}; }`,
            }));

            const exportingFiles = createExportingModuleFiles(`/lib/a`, Completions.moduleSpecifierResolutionLimit, 5, i => `aa_${i}_`);
            const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...ambientFiles, ...exportingFiles]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "a", completions => {
                assert(!completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(e => (e.data as any)?.moduleSpecifier), ambientFiles.length * 5 + exportingFiles.length);
            });
        });

        it("works with PackageJsonAutoImportProvider", () => {
            const exportingFiles = createExportingModuleFiles(`/lib/a`, Completions.moduleSpecifierResolutionLimit, 1, i => `aa_${i}_`);
            const nodeModulesPackage = createNodeModulesPackage("dep-a", 50, 1, i => `depA_${i}_`);
            const { typeToTriggerCompletions, assertCompletionDetailsOk, session } = setup([tsconfigFile, packageJsonFile, indexFile, ...exportingFiles, ...nodeModulesPackage]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "a", completions => assert(completions.isIncomplete))
                .continueTyping("_", completions => {
                    assert(!completions.isIncomplete);
                    assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier?.startsWith("dep-a")), 50);
                    assertCompletionDetailsOk(
                        indexFile.path,
                        completions.entries.find(entry => (entry.data as any)?.moduleSpecifier?.startsWith("dep-a"))!);
                });
        });

        it("works for transient symbols between requests", () => {
            const constantsDts: File = {
                path: "/lib/foo/constants.d.ts",
                content: `
                    type Signals = "SIGINT" | "SIGABRT";
                    declare const exp: {} & { [K in Signals]: K };
                    export = exp;`,
            };
            const exportingFiles = createExportingModuleFiles("/lib/a", Completions.moduleSpecifierResolutionLimit, 1, i => `S${i}`);
            const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles, constantsDts]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "s", completions => {
                const sigint = completions.entries.find(e => e.name === "SIGINT");
                assert(sigint);
                assert(!(sigint!.data as any).moduleSpecifier);
            })
            .continueTyping("i", completions => {
                const sigint = completions.entries.find(e => e.name === "SIGINT");
                assert((sigint!.data as any).moduleSpecifier);
            });
        });
    });

    function setup(files: File[]) {
        const host = createServerHost(files);
        const session = createSession(host);
        const projectService = session.getProjectService();
        session.executeCommandSeq<protocol.ConfigureRequest>({
            command: protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    allowIncompleteCompletions: true,
                    includeCompletionsForModuleExports: true,
                    includeCompletionsWithInsertText: true,
                    includeCompletionsForImportStatements: true,
                    includePackageJsonAutoImports: "auto",
                }
            }
        });

        return { host, session, projectService, typeToTriggerCompletions, assertCompletionDetailsOk };

        function typeToTriggerCompletions(fileName: string, typedCharacters: string, cb?: (completions: protocol.CompletionInfo) => void) {
            const project = projectService.getDefaultProjectForFile(server.toNormalizedPath(fileName), /*ensureProject*/ true)!;
            return type(typedCharacters, cb, /*isIncompleteContinuation*/ false);

            function type(typedCharacters: string, cb: ((completions: protocol.CompletionInfo) => void) | undefined, isIncompleteContinuation: boolean) {
                const file = Debug.checkDefined(project.getLanguageService(/*ensureSynchronized*/ true).getProgram()?.getSourceFile(fileName));
                const { line, character } = getLineAndCharacterOfPosition(file, file.text.length);
                const oneBasedEditPosition = { line: line + 1, offset: character + 1 };
                session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName,
                            textChanges: [{
                                newText: typedCharacters,
                                start: oneBasedEditPosition,
                                end: oneBasedEditPosition,
                            }],
                        }],
                    },
                });

                const response = session.executeCommandSeq<protocol.CompletionsRequest>({
                    command: protocol.CommandTypes.CompletionInfo,
                    arguments: {
                        file: fileName,
                        line: oneBasedEditPosition.line,
                        offset: oneBasedEditPosition.offset,
                        triggerKind: isIncompleteContinuation
                            ? protocol.CompletionTriggerKind.TriggerForIncompleteCompletions
                            : undefined,
                    }
                }).response as protocol.CompletionInfo;

                cb?.(Debug.checkDefined(response));
                return {
                    backspace,
                    continueTyping: (typedCharacters: string, cb: (completions: protocol.CompletionInfo) => void) => {
                        return type(typedCharacters, cb, !!response.isIncomplete);
                    },
                };
            }

            function backspace(n = 1) {
                const file = Debug.checkDefined(project.getLanguageService(/*ensureSynchronized*/ true).getProgram()?.getSourceFile(fileName));
                const startLineCharacter = getLineAndCharacterOfPosition(file, file.text.length - n);
                const endLineCharacter = getLineAndCharacterOfPosition(file, file.text.length);
                const oneBasedStartPosition = { line: startLineCharacter.line + 1, offset: startLineCharacter.character + 1 };
                const oneBasedEndPosition = { line: endLineCharacter.line + 1, offset: endLineCharacter.character + 1 };
                session.executeCommandSeq<protocol.UpdateOpenRequest>({
                    command: protocol.CommandTypes.UpdateOpen,
                    arguments: {
                        changedFiles: [{
                            fileName,
                            textChanges: [{
                                newText: "",
                                start: oneBasedStartPosition,
                                end: oneBasedEndPosition,
                            }],
                        }],
                    },
                });

                return {
                    backspace,
                    type: (typedCharacters: string, cb: (completions: protocol.CompletionInfo) => void) => {
                        return type(typedCharacters, cb, /*isIncompleteContinuation*/ false);
                    },
                };
            }
        }

        function assertCompletionDetailsOk(fileName: string, entry: protocol.CompletionEntry) {
            const project = projectService.getDefaultProjectForFile(server.toNormalizedPath(fileName), /*ensureProject*/ true)!;
            const file = Debug.checkDefined(project.getLanguageService(/*ensureSynchronized*/ true).getProgram()?.getSourceFile(fileName));
            const { line, character } = getLineAndCharacterOfPosition(file, file.text.length - 1);
            const details = session.executeCommandSeq<protocol.CompletionDetailsRequest>({
                command: protocol.CommandTypes.CompletionDetails,
                arguments: {
                    file: fileName,
                    line: line + 1,
                    offset: character + 1,
                    entryNames: [{
                        name: entry.name,
                        source: entry.source,
                        data: entry.data,
                    }]
                }
            }).response as protocol.CompletionEntryDetails[];

            assert(details[0]);
            assert(details[0].codeActions);
            assert(details[0].codeActions![0].changes[0].textChanges[0].newText.includes(`"${(entry.data as any).moduleSpecifier}"`));
            return details;
        }
    }
}
