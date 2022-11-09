import * as ts from "../../_namespaces/ts";

const packageJson: ts.projectSystem.File = {
    path: "/package.json",
    content: `{ "dependencies": { "mobx": "*" } }`
};
const aTs: ts.projectSystem.File = {
    path: "/a.ts",
    content: "export const foo = 0;",
};
const bTs: ts.projectSystem.File = {
    path: "/b.ts",
    content: "foo",
};
const tsconfig: ts.projectSystem.File = {
    path: "/tsconfig.json",
    content: "{}",
};
const ambientDeclaration: ts.projectSystem.File = {
    path: "/ambient.d.ts",
    content: "declare module 'ambient' {}"
};
const mobxPackageJson: ts.projectSystem.File = {
    path: "/node_modules/mobx/package.json",
    content: `{ "name": "mobx", "version": "1.0.0" }`
};
const mobxDts: ts.projectSystem.File = {
    path: "/node_modules/mobx/index.d.ts",
    content: "export declare function observable(): unknown;"
};
const exportEqualsMappedType: ts.projectSystem.File = {
    path: "/lib/foo/constants.d.ts",
    content: `
            type Signals = "SIGINT" | "SIGABRT";
            declare const exp: {} & { [K in Signals]: K };
            export = exp;`,
};

describe("unittests:: tsserver:: exportMapCache", () => {
    it("caches auto-imports in the same file", () => {
        const { exportMapCache } = setup();
        assert.ok(exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(!exportMapCache.isEmpty());
    });

    it("invalidates the cache when new files are added", () => {
        const { host, exportMapCache } = setup();
        host.writeFile("/src/a2.ts", aTs.content);
        host.runQueuedTimeoutCallbacks();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
    });

    it("invalidates the cache when files are deleted", () => {
        const { host, projectService, exportMapCache } = setup();
        projectService.closeClientFile(aTs.path);
        host.deleteFile(aTs.path);
        host.runQueuedTimeoutCallbacks();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
    });

    it("does not invalidate the cache when package.json is changed inconsequentially", () => {
        const { host, exportMapCache, project } = setup();
        host.writeFile("/package.json", `{ "name": "blah", "dependencies": { "mobx": "*" } }`);
        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();
        assert.ok(exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(!exportMapCache.isEmpty());
    });

    it("invalidates the cache when package.json change results in AutoImportProvider change", () => {
        const { host, exportMapCache, project } = setup();
        host.writeFile("/package.json", `{}`);
        host.runQueuedTimeoutCallbacks();
        project.getPackageJsonAutoImportProvider();
        assert.ok(!exportMapCache.isUsableByFile(bTs.path as ts.Path));
        assert.ok(exportMapCache.isEmpty());
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
        session.executeCommandSeq<ts.projectSystem.protocol.UpdateOpenRequest>({
            command: ts.projectSystem.protocol.CommandTypes.UpdateOpen,
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
    });
});

function setup() {
    const host = ts.projectSystem.createServerHost([aTs, bTs, ambientDeclaration, tsconfig, packageJson, mobxPackageJson, mobxDts, exportEqualsMappedType]);
    const session = ts.projectSystem.createSession(host);
    ts.projectSystem.openFilesForSession([aTs, bTs], session);
    const projectService = session.getProjectService();
    const project = ts.projectSystem.configuredProjectAt(projectService, 0);
    triggerCompletions();
    const checker = project.getLanguageService().getProgram()!.getTypeChecker();
    return { host, project, projectService, session, exportMapCache: project.getCachedExportInfoMap(), checker, triggerCompletions };

    function triggerCompletions() {
        const requestLocation: ts.projectSystem.protocol.FileLocationRequestArgs = {
            file: bTs.path,
            line: 1,
            offset: 3,
        };
        ts.projectSystem.executeSessionRequest<ts.projectSystem.protocol.CompletionsRequest, ts.projectSystem.protocol.CompletionInfoResponse>(session, ts.projectSystem.protocol.CommandTypes.CompletionInfo, {
            ...requestLocation,
            includeExternalModuleExports: true,
            prefix: "foo",
        });
    }
}
