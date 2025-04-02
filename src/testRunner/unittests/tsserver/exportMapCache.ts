import * as ts from "../../_namespaces/ts.js";
import {
    protocol,
    updateProjectIfDirty,
} from "../../_namespaces/ts.server.js";
import { jsonToReadableText } from "../helpers.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver.js";
import {
    File,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

const packageJson: File = {
    path: "/home/src/projects/project/package.json",
    content: `{ "dependencies": { "mobx": "*" } }`,
};
const aTs: File = {
    path: "/home/src/projects/project/a.ts",
    content: "export const foo = 0;",
};
const bTs: File = {
    path: "/home/src/projects/project/b.ts",
    content: "foo",
};
const tsconfig: File = {
    path: "/home/src/projects/project/tsconfig.json",
    content: "{}",
};
const ambientDeclaration: File = {
    path: "/home/src/projects/project/ambient.d.ts",
    content: "declare module 'ambient' {}",
};
const mobxPackageJson: File = {
    path: "/home/src/projects/project/node_modules/mobx/package.json",
    content: jsonToReadableText({ name: "mobx", version: "1.0.0" }),
};
const mobxDts: File = {
    path: "/home/src/projects/project/node_modules/mobx/index.d.ts",
    content: "export declare function observable(): unknown;",
};
const exportEqualsMappedType: File = {
    path: "/home/src/projects/project/lib/foo/constants.d.ts",
    content: `
            type Signals = "SIGINT" | "SIGABRT";
            declare const exp: {} & { [K in Signals]: K };
            export = exp;`,
};

describe("unittests:: tsserver:: exportMapCache::", () => {
    const files = [aTs, bTs, ambientDeclaration, tsconfig, packageJson, mobxPackageJson, mobxDts, exportEqualsMappedType];
    const setup = createSetup(files, [aTs, bTs], { file: bTs.path, line: 1, offset: 3 });
    it("caches auto-imports in the same file", () => {
        const { exportMapCache, session } = setup();
        assert.ok(exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(!exportMapCache.isEmpty());
        baselineTsserverLogs("exportMapCache", "caches auto-imports in the same file", session);
    });

    it("invalidates the cache when new files are added", () => {
        const { host, exportMapCache, session } = setup();
        host.writeFile("/home/src/projects/project/src/a2.ts", aTs.content);
        host.runQueuedTimeoutCallbacks();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
        baselineTsserverLogs("exportMapCache", "invalidates the cache when new files are added", session);
    });

    it("invalidates the cache when files are deleted", () => {
        const { host, exportMapCache, session } = setup();
        closeFilesForSession([aTs], session);
        host.deleteFile(aTs.path);
        host.runQueuedTimeoutCallbacks();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
        baselineTsserverLogs("exportMapCache", "invalidates the cache when files are deleted", session);
    });

    it("does not invalidate the cache when package.json is changed inconsequentially", () => {
        const { host, exportMapCache, project, session } = setup();
        host.writeFile("/home/src/projects/project/package.json", `{ "name": "blah", "dependencies": { "mobx": "*" } }`);
        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();
        assert.ok(exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(!exportMapCache.isEmpty());
        session.host.baselineHost("After getPackageJsonAutoImportProvider");
        baselineTsserverLogs("exportMapCache", "does not invalidate the cache when package.json is changed inconsequentially", session);
    });

    it("invalidates the cache when package.json change results in AutoImportProvider change", () => {
        const { host, exportMapCache, project, session } = setup();
        host.writeFile("/home/src/projects/project/package.json", `{}`);
        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
        session.host.baselineHost("After getPackageJsonAutoImportProvider");
        baselineTsserverLogs("exportMapCache", "invalidates the cache when package.json change results in AutoImportProvider change", session);
    });

    it("does not store transient symbols through program updates", () => {
        const { exportMapCache, project, session } = setup();
        // SIGINT, exported from /lib/foo/constants.d.ts, is a mapped type property, which will be a transient symbol.
        // Transient symbols contain types, which retain the checkers they came from, so are not safe to cache.
        // We clear symbols from the cache during updateGraph, leaving only the information about how to re-get them
        // (see getters on `CachedSymbolExportInfo`). We can roughly test that this is working by ensuring that
        // accessing a transient symbol with two different checkers results in different symbol identities, since
        // transient symbols are recreated with every new checker.
        const programBefore = project.getCurrentProgram()!;
        let sigintPropBefore: readonly ts.SymbolExportInfo[] | undefined;
        exportMapCache.search(bTs.path as ts.Path, /*preferCapitalized*/ false, ts.returnTrue, (info, symbolName) => {
            if (symbolName === "SIGINT") sigintPropBefore = info;
        });
        assert.ok(sigintPropBefore);
        assert.ok(sigintPropBefore[0].symbol.flags & ts.SymbolFlags.Transient);
        const symbolIdBefore = ts.getSymbolId(sigintPropBefore[0].symbol);

        // Update program without clearing cache
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: bTs.path,
                    textChanges: [{
                        newText: " ",
                        start: { line: 1, offset: 1 },
                        end: { line: 1, offset: 1 },
                    }],
                }],
            },
        });
        project.getLanguageService(/*ensureSynchronized*/ true);
        assert.notEqual(programBefore, project.getCurrentProgram());

        // Get same info from cache again
        let sigintPropAfter: readonly ts.SymbolExportInfo[] | undefined;
        exportMapCache.search(bTs.path as ts.Path, /*preferCapitalized*/ false, ts.returnTrue, (info, symbolName) => {
            if (symbolName === "SIGINT") sigintPropAfter = info;
        });
        assert.ok(sigintPropAfter);
        assert.notEqual(symbolIdBefore, ts.getSymbolId(sigintPropAfter[0].symbol));
        baselineTsserverLogs("exportMapCache", "does not store transient symbols through program updates", session);
    });

    it("invalidates the cache when a file is opened with different contents", () => {
        const utilsTs: File = {
            path: "/home/src/projects/project/utils.ts",
            content: `export class Element {
                // ...
            }

            export abstract class Component {
                abstract render(): Element;
            }`,
        };
        const classesTs: File = {
            path: "/home/src/projects/project/classes.ts",
            content: `import { Component } from "./utils.js";

            export class MyComponent extends Component {
                render/**/
            }`,
        };
        const host = TestServerHost.createServerHost([utilsTs, classesTs, tsconfig]);
        const session = new TestSession(host);
        openFilesForSession([classesTs], session);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includeCompletionsForModuleExports: true,
                    includeCompletionsWithClassMemberSnippets: true,
                    includeCompletionsWithInsertText: true,
                },
            },
        });
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: classesTs.path,
                line: 4,
                offset: 23,
                prefix: "render",
            },
        });

        const project = session.getProjectService().configuredProjects.get(tsconfig.path)!;
        const exportMapCache = project.getCachedExportInfoMap();
        assert.ok(exportMapCache.isUsableByFile(classesTs.path as ts.Path));
        assert.ok(!exportMapCache.isEmpty());

        openFilesForSession([{ file: utilsTs.path, content: utilsTs.content.replace("render", "render2") }], session);
        session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
            command: ts.server.protocol.CommandTypes.UpdateOpen,
            arguments: {
                changedFiles: [{
                    fileName: classesTs.path,
                    textChanges: [{
                        newText: "",
                        start: { line: 4, offset: 22 },
                        end: { line: 4, offset: 23 },
                    }],
                }],
            },
        });

        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();
        session.host.baselineHost("After getPackageJsonAutoImportProvider");

        // Cache is invalidated because other file has changed
        assert.ok(!exportMapCache.isUsableByFile(classesTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());

        // Does not crash
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: classesTs.path,
                line: 4,
                offset: 22,
                prefix: "rende",
            },
        });

        baselineTsserverLogs("exportMapCache", "invalidates the cache when a file is opened with different contents", session);
    });
});

describe("unittests:: tsserver:: exportMapCache:: project references", () => {
    const libTsconfig: File = {
        path: "/home/src/projects/project/packages/lib/tsconfig.json",
        content: jsonToReadableText({
            compilerOptions: {
                composite: true,
                module: "commonjs",
            },
        }),
    };

    const libIndex: File = {
        path: "/home/src/projects/project/packages/lib/index.ts",
        content: `export const foo = 0;`,
    };

    const appTsconfig: File = {
        path: "/home/src/projects/project/packages/app/tsconfig.json",
        content: jsonToReadableText({
            compilerOptions: {
                composite: true,
                module: "commonjs",
                paths: {
                    lib: ["../lib/index.ts"],
                },
            },
            references: [
                { path: "../lib" },
            ],
        }),
    };

    const appIndex: File = {
        path: "/home/src/projects/project/packages/app/index.ts",
        content: `foo`,
    };

    function verifyReferences(includesLib: boolean) {
        const files = [libTsconfig, libIndex, appTsconfig, appIndex];
        if (includesLib) {
            files.push({
                path: "/home/src/projects/project/packages/app/other.ts",
                content: `import { foo } from "../lib";`,
            });
        }
        const setup = createSetup(files, [appIndex, libIndex], { file: appIndex.path, line: 1, offset: 1 });
        it("does not invalidate the cache when referenced project changes inconsequentially", () => {
            const { session, project, exportMapCache, triggerCompletions } = setup();
            assert.ok(exportMapCache.isUsableByFile(appIndex.path as ts.Path));
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: libIndex.path,
                        textChanges: [{
                            newText: "\nfoo.toFixed()",
                            start: { line: 1, offset: 3 },
                            end: { line: 1, offset: 3 },
                        }],
                    }],
                },
            });

            // If lib/index.ts were part of the same project, we would recognize that
            // this change does not modify the shape of the program exports and the cache
            // would not be cleared. But because this file is part of the AutoImportProvider,
            // the cache clears unconditionally during its updateGraph.
            // As shown in the test, currently whether file is part of own program or AutoImportProvider
            // if its not the file used to create cache, any change in other file invalidates the cache
            // So in both scenarios: whether referenced project file is part of own program or auto import provider program
            // the cache will be cleared for any changes
            updateProjectIfDirty(project);
            project.getPackageJsonAutoImportProvider();
            assert.ok(exportMapCache.isEmpty());
            triggerCompletions();
            baselineTsserverLogs("exportMapCache", `does not invalidate the cache when referenced project changes inconsequentially${includesLib ? " referencedInProject" : ""}`, session);
        });

        it("invalidates the cache when referenced project changes signatures", () => {
            const { session, project, exportMapCache, triggerCompletions } = setup();
            session.executeCommandSeq<protocol.UpdateOpenRequest>({
                command: protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: libIndex.path,
                        textChanges: [{
                            newText: "export const food = 0;",
                            start: { line: 1, offset: 1 },
                            end: { line: 1, offset: 3 },
                        }],
                    }],
                },
            });

            updateProjectIfDirty(project);
            project.getPackageJsonAutoImportProvider();
            assert.ok(exportMapCache.isEmpty());

            triggerCompletions();
            baselineTsserverLogs("exportMapCache", `invalidates the cache when referenced project changes signatures${includesLib ? " referencedInProject" : ""}`, session);
        });
    }

    describe("when referenced project file is not part of project", () => {
        verifyReferences(/*includesLib*/ false);
    });

    describe("when referenced project file is part of project", () => {
        verifyReferences(/*includesLib*/ true);
    });
});

function createSetup(files: readonly File[], openFiles: readonly File[], completionRequestLocation: protocol.FileLocationRequestArgs) {
    return () => {
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includePackageJsonAutoImports: "auto",
                    includeCompletionsForModuleExports: true,
                },
            },
        });
        openFilesForSession(openFiles, session);
        const project = ts.firstIterator(session.getProjectService().configuredProjects.values());
        triggerCompletions();
        const checker = project.getLanguageService().getProgram()!.getTypeChecker();
        return { host, project, session, exportMapCache: project.getCachedExportInfoMap(), checker, triggerCompletions };

        function triggerCompletions() {
            session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
                command: ts.server.protocol.CommandTypes.CompletionInfo,
                arguments: {
                    ...completionRequestLocation,
                    prefix: "foo",
                },
            });
        }
    };
}
