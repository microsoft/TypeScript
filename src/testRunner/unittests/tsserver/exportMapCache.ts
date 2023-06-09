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

const packageJson: File = {
    path: "/package.json",
    content: `{ "dependencies": { "mobx": "*" } }`
};
const aTs: File = {
    path: "/a.ts",
    content: "export const foo = 0;",
};
const bTs: File = {
    path: "/b.ts",
    content: "foo",
};
const tsconfig: File = {
    path: "/tsconfig.json",
    content: "{}",
};
const ambientDeclaration: File = {
    path: "/ambient.d.ts",
    content: "declare module 'ambient' {}"
};
const mobxPackageJson: File = {
    path: "/node_modules/mobx/package.json",
    content: `{ "name": "mobx", "version": "1.0.0" }`
};
const mobxDts: File = {
    path: "/node_modules/mobx/index.d.ts",
    content: "export declare function observable(): unknown;"
};
const exportEqualsMappedType: File = {
    path: "/lib/foo/constants.d.ts",
    content: `
            type Signals = "SIGINT" | "SIGABRT";
            declare const exp: {} & { [K in Signals]: K };
            export = exp;`,
};

describe("unittests:: tsserver:: exportMapCache", () => {
    it("caches auto-imports in the same file", () => {
        const { exportMapCache, session } = setup();
        assert.ok(exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(!exportMapCache.isEmpty());
        baselineTsserverLogs("exportMapCache", "caches auto-imports in the same file", session);
    });

    it("invalidates the cache when new files are added", () => {
        const { host, exportMapCache, session } = setup();
        host.writeFile("/src/a2.ts", aTs.content);
        host.runQueuedTimeoutCallbacks();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
        baselineTsserverLogs("exportMapCache", "invalidates the cache when new files are added", session);
    });

    it("invalidates the cache when files are deleted", () => {
        const { host, projectService, exportMapCache, session } = setup();
        projectService.closeClientFile(aTs.path);
        host.deleteFile(aTs.path);
        host.runQueuedTimeoutCallbacks();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
        baselineTsserverLogs("exportMapCache", "invalidates the cache when files are deleted", session);
    });

    it("does not invalidate the cache when package.json is changed inconsequentially", () => {
        const { host, exportMapCache, project, session } = setup();
        host.writeFile("/package.json", `{ "name": "blah", "dependencies": { "mobx": "*" } }`);
        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();
        assert.ok(exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(!exportMapCache.isEmpty());
        baselineTsserverLogs("exportMapCache", "does not invalidate the cache when package.json is changed inconsequentially", session);
    });

    it("invalidates the cache when package.json change results in AutoImportProvider change", () => {
        const { host, exportMapCache, project, session } = setup();
        host.writeFile("/package.json", `{}`);
        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
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
        assert.ok(sigintPropBefore![0].symbol.flags & ts.SymbolFlags.Transient);
        const symbolIdBefore = ts.getSymbolId(sigintPropBefore![0].symbol);

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
                    }]
                }]
            }
        });
        project.getLanguageService(/*ensureSynchronized*/ true);
        assert.notEqual(programBefore, project.getCurrentProgram()!);

        // Get same info from cache again
        let sigintPropAfter: readonly ts.SymbolExportInfo[] | undefined;
        exportMapCache.search(bTs.path as ts.Path, /*preferCapitalized*/ false, ts.returnTrue, (info, symbolName) => {
            if (symbolName === "SIGINT") sigintPropAfter = info;
        });
        assert.ok(sigintPropAfter);
        assert.notEqual(symbolIdBefore, ts.getSymbolId(sigintPropAfter![0].symbol));
        baselineTsserverLogs("exportMapCache", "does not store transient symbols through program updates", session);
    });

    it("invalidates the cache when a file is opened with different contents", () => {
        const utilsTs: File = {
            path: "/utils.ts",
            content: `export class Element {
                // ...
            }

            export abstract class Component {
                abstract render(): Element;
            }`
        };
        const classesTs: File = {
            path: "/classes.ts",
            content: `import { Component } from "./utils.js";

            export class MyComponent extends Component {
                render/**/
            }`
        };
        const host = createServerHost([utilsTs, classesTs, tsconfig]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        const projectService = session.getProjectService();
        openFilesForSession([classesTs], session);
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: {
                preferences: {
                    includeCompletionsForModuleExports: true,
                    includeCompletionsWithClassMemberSnippets: true,
                    includeCompletionsWithInsertText: true,
                },
            }
        });
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file: classesTs.path,
                line: 4,
                offset: 23,
                prefix: "render",
                includeExternalModuleExports: true,
                includeInsertTextCompletions: true,
            }
        });

        const project = projectService.configuredProjects.get(tsconfig.path)!;
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
                    }]
                }]
            }
        });

        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();

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
                includeExternalModuleExports: true,
                includeInsertTextCompletions: true,
            }
        });

        baselineTsserverLogs("exportMapCache", "invalidates the cache when a file is opened with different contents", session);
    });
});

function setup() {
    const host = createServerHost([aTs, bTs, ambientDeclaration, tsconfig, packageJson, mobxPackageJson, mobxDts, exportEqualsMappedType]);
    const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
    openFilesForSession([aTs, bTs], session);
    const projectService = session.getProjectService();
    const project = projectService.configuredProjects.get(tsconfig.path)!;
    triggerCompletions();
    const checker = project.getLanguageService().getProgram()!.getTypeChecker();
    return { host, project, projectService, session, exportMapCache: project.getCachedExportInfoMap(), checker, triggerCompletions };

    function triggerCompletions() {
        const requestLocation: ts.server.protocol.FileLocationRequestArgs = {
            file: bTs.path,
            line: 1,
            offset: 3,
        };
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                ...requestLocation,
                includeExternalModuleExports: true,
                prefix: "foo",
            }
        });
    }
}
