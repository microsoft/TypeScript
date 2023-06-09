import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    baselineTsserverLogs,
    createSession,
    openFilesForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
} from "../helpers/virtualFileSystemWithWatch";

function createExportingModuleFile(path: string, exportPrefix: string, exportCount: number): File {
    return {
        path,
        content: ts.arrayOf(exportCount, i => `export const ${exportPrefix}_${i} = ${i};`).join("\n"),
    };
}

function createExportingModuleFiles(pathPrefix: string, fileCount: number, exportCount: number, getExportPrefix: (fileIndex: number) => string): File[] {
    return ts.arrayOf(fileCount, fileIndex => createExportingModuleFile(
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
                .map(f => `export * from "./${ts.removeFileExtension(ts.convertToRelativePath(f.path, `/node_modules/${packageName}/`, ts.identity))}";`)
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
        const excessFileCount = ts.Completions.moduleSpecifierResolutionLimit + 50;
        const exportingFiles = createExportingModuleFiles(`/lib/a`, ts.Completions.moduleSpecifierResolutionLimit + excessFileCount, 1, i => `aa_${i}_`);
        const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
        openFilesForSession([indexFile], session);

        typeToTriggerCompletions(indexFile.path, "a", completions => {
            assert(completions.isIncomplete);
            assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), ts.Completions.moduleSpecifierResolutionLimit);
            assert.lengthOf(completions.entries.filter(entry => entry.source && !(entry.data as any)?.moduleSpecifier), excessFileCount);
            assert.deepEqual(completions.optionalReplacementSpan, { start: { line: 1, offset: 1 }, end: { line: 1, offset: 2 } });
        })
            .continueTyping("a", completions => {
                assert(completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), ts.Completions.moduleSpecifierResolutionLimit * 2);
                assert.deepEqual(completions.optionalReplacementSpan, { start: { line: 1, offset: 1 }, end: { line: 1, offset: 3 } });
            })
            .continueTyping("_", completions => {
                assert(!completions.isIncomplete);
                assert.lengthOf(completions.entries.filter(entry => (entry.data as any)?.moduleSpecifier), exportingFiles.length);
            });
        baselineTsserverLogs("completionsIncomplete", "works", session);
    });

    it("resolves more when available from module specifier cache (1)", () => {
        const exportingFiles = createExportingModuleFiles(`/lib/a`, 50, 50, i => `aa_${i}_`);
        const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
        openFilesForSession([indexFile], session);

        typeToTriggerCompletions(indexFile.path, "a", completions => {
            assert(!completions.isIncomplete);
        });
        baselineTsserverLogs("completionsIncomplete", "resolves more when available from module specifier cache (1)", session);
    });

    it("resolves more when available from module specifier cache (2)", () => {
        const excessFileCount = 50;
        const exportingFiles = createExportingModuleFiles(`/lib/a`, ts.Completions.moduleSpecifierResolutionLimit + excessFileCount, 1, i => `aa_${i}_`);
        const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles]);
        openFilesForSession([indexFile], session);

        typeToTriggerCompletions(indexFile.path, "a", completions => assert(completions.isIncomplete))
            .backspace()
            .type("a", completions => assert(!completions.isIncomplete));
        baselineTsserverLogs("completionsIncomplete", "resolves more when available from module specifier cache (2)", session);
    });

    it("ambient module specifier resolutions do not count against the resolution limit", () => {
        const ambientFiles = ts.arrayOf(100, (i): File => ({
            path: `/lib/ambient_${i}.ts`,
            content: `declare module "ambient_${i}" { export const aa_${i} = ${i}; }`,
        }));

        const exportingFiles = createExportingModuleFiles(`/lib/a`, ts.Completions.moduleSpecifierResolutionLimit, 5, i => `aa_${i}_`);
        const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...ambientFiles, ...exportingFiles]);
        openFilesForSession([indexFile], session);

        typeToTriggerCompletions(indexFile.path, "a", completions => {
            assert(!completions.isIncomplete);
            assert.lengthOf(completions.entries.filter(e => (e.data as any)?.moduleSpecifier), ambientFiles.length * 5 + exportingFiles.length);
        });
        baselineTsserverLogs("completionsIncomplete", "ambient module specifier resolutions do not count against the resolution limit", session);
    });

    it("works with PackageJsonAutoImportProvider", () => {
        const exportingFiles = createExportingModuleFiles(`/lib/a`, ts.Completions.moduleSpecifierResolutionLimit, 1, i => `aa_${i}_`);
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
        baselineTsserverLogs("completionsIncomplete", "works with PackageJsonAutoImportProvider", session);
    });

    it("works for transient symbols between requests", () => {
        const constantsDts: File = {
            path: "/lib/foo/constants.d.ts",
            content: `
                    type Signals = "SIGINT" | "SIGABRT";
                    declare const exp: {} & { [K in Signals]: K };
                    export = exp;`,
        };
        const exportingFiles = createExportingModuleFiles("/lib/a", ts.Completions.moduleSpecifierResolutionLimit, 1, i => `S${i}`);
        const { typeToTriggerCompletions, session } = setup([tsconfigFile, indexFile, ...exportingFiles, constantsDts]);
        openFilesForSession([indexFile], session);

        typeToTriggerCompletions(indexFile.path, "s", completions => {
            const sigint = completions.entries.find(e => e.name === "SIGINT");
            assert(sigint);
            assert(!(sigint.data as any).moduleSpecifier);
        })
            .continueTyping("i", completions => {
                const sigint = completions.entries.find(e => e.name === "SIGINT");
                assert((sigint!.data as any).moduleSpecifier);
            });
        baselineTsserverLogs("completionsIncomplete", "works for transient symbols between requests", session);
    });
});

function setup(files: File[]) {
    const host = createServerHost(files);
    const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
    const projectService = session.getProjectService();
    session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
        command: ts.server.protocol.CommandTypes.Configure,
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

    function typeToTriggerCompletions(fileName: string, typedCharacters: string, cb?: (completions: ts.server.protocol.CompletionInfo) => void) {
        const project = projectService.getDefaultProjectForFile(ts.server.toNormalizedPath(fileName), /*ensureProject*/ true)!;
        return type(typedCharacters, cb, /*isIncompleteContinuation*/ false);

        function type(typedCharacters: string, cb: ((completions: ts.server.protocol.CompletionInfo) => void) | undefined, isIncompleteContinuation: boolean) {
            const file = ts.Debug.checkDefined(project.getLanguageService(/*ensureSynchronized*/ true).getProgram()?.getSourceFile(fileName));
            const { line, character } = ts.getLineAndCharacterOfPosition(file, file.text.length);
            const oneBasedEditPosition = { line: line + 1, offset: character + 1 };
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
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

            const response = session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: {
                    file: fileName,
                    line: oneBasedEditPosition.line,
                    offset: oneBasedEditPosition.offset,
                    triggerKind: isIncompleteContinuation
                        ? ts.server.protocol.CompletionTriggerKind.TriggerForIncompleteCompletions
                        : undefined,
                }
            }).response as ts.server.protocol.CompletionInfo;

            cb?.(ts.Debug.checkDefined(response));
            return {
                backspace,
                continueTyping: (typedCharacters: string, cb: (completions: ts.server.protocol.CompletionInfo) => void) => {
                    return type(typedCharacters, cb, !!response.isIncomplete);
                },
            };
        }

        function backspace(n = 1) {
            const file = ts.Debug.checkDefined(project.getLanguageService(/*ensureSynchronized*/ true).getProgram()?.getSourceFile(fileName));
            const startLineCharacter = ts.getLineAndCharacterOfPosition(file, file.text.length - n);
            const endLineCharacter = ts.getLineAndCharacterOfPosition(file, file.text.length);
            const oneBasedStartPosition = { line: startLineCharacter.line + 1, offset: startLineCharacter.character + 1 };
            const oneBasedEndPosition = { line: endLineCharacter.line + 1, offset: endLineCharacter.character + 1 };
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
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
                type: (typedCharacters: string, cb: (completions: ts.server.protocol.CompletionInfo) => void) => {
                    return type(typedCharacters, cb, /*isIncompleteContinuation*/ false);
                },
            };
        }
    }

    function assertCompletionDetailsOk(fileName: string, entry: ts.server.protocol.CompletionEntry) {
        const project = projectService.getDefaultProjectForFile(ts.server.toNormalizedPath(fileName), /*ensureProject*/ true)!;
        const file = ts.Debug.checkDefined(project.getLanguageService(/*ensureSynchronized*/ true).getProgram()?.getSourceFile(fileName));
        const { line, character } = ts.getLineAndCharacterOfPosition(file, file.text.length - 1);
        const details = session.executeCommandSeq<ts.server.protocol.CompletionDetailsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionDetails,
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
        }).response as ts.server.protocol.CompletionEntryDetails[];

        assert(details[0]);
        assert(details[0].codeActions);
        assert(details[0].codeActions[0].changes[0].textChanges[0].newText.includes(`"${(entry.data as any).moduleSpecifier}"`));
        return details;
    }
}
