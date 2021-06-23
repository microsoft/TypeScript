namespace ts.projectSystem {
    function createExportingModuleFile(path: string, exportPrefix: string, exportCount: number): File {
        return {
            path,
            content: fill(exportCount, i => `export const ${exportPrefix}_${i} = ${i};`).join("\n"),
        };
    }

    function createExportingModuleFiles(pathPrefix: string, fileCount: number, exportCount: number, getExportPrefix: (fileIndex: number) => string) {
        return fill(fileCount, fileIndex => createExportingModuleFile(
            `${pathPrefix}_${fileIndex}.ts`,
            getExportPrefix(fileIndex),
            exportCount));
    }

    const indexFile: File = {
        path: "/index.ts",
        content: ""
    };

    const tsconfigFile: File = {
        path: "/tsconfig.json",
        content: `{ "compilerOptions": { "module": "commonjs" } }`
    };

    describe("unittests:: tsserver:: completionsIncomplete", () => {
        it("works", () => {
            const excessFileCount = 50;
            const exportingFiles = createExportingModuleFiles(`/lib/a`, Completions.moduleSpecifierResolutionLimit + excessFileCount, 1, i => `aa_${i}_`);
            const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "a", completions => {
                assert(completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), Completions.moduleSpecifierResolutionLimit);
                assert.lengthOf(completions.entries.filter(entry => entry.source && !(entry.data as any)?.moduleSpecifier), excessFileCount);
            })
            .continueTyping("a", completions => {
                assert(!completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), exportingFiles.length);
            });
        });

        it("resolves more when available from module specifier cache", () => {
            const exportingFiles = createExportingModuleFiles(`/lib/a`, 50, 50, i => `aa_${i}_`);
            const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
            openFilesForSession([indexFile], session);

            typeToTriggerCompletions(indexFile.path, "a", completions => {
                assert(!completions.isIncomplete);
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

        return { host, session, projectService, typeToTriggerCompletions };

        function typeToTriggerCompletions(fileName: string, typedCharacters: string, cb: (completions: protocol.CompletionInfo) => void) {
            function type(typedCharacters: string, cb: (completions: protocol.CompletionInfo) => void, isIncompleteContinuation: boolean) {
                const project = projectService.getDefaultProjectForFile(server.toNormalizedPath(fileName), /*ensureProject*/ true)!;
                const file = Debug.checkDefined(projectService.getSourceFileLike(fileName, project));
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

                cb(Debug.checkDefined(response));
                return {
                    continueTyping: (typedCharacters: string, cb: (completions: protocol.CompletionInfo) => void) => {
                        return type(typedCharacters, cb, !!response.isIncomplete);
                    },
                };
            }

            return type(typedCharacters, cb, /*isIncompleteContinuation*/ false);
        }
    }
}
