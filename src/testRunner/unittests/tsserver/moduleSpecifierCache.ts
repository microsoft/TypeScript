import * as ts from "../../_namespaces/ts";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineTsserverLogs,
    openFilesForSession,
    TestSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    SymLink,
} from "../helpers/virtualFileSystemWithWatch";

const packageJson: File = {
    path: "/package.json",
    content: `{ "dependencies": { "mobx": "*" } }`,
};
const aTs: File = {
    path: "/src/a.ts",
    content: "export const foo = 0;",
};
const bTs: File = {
    path: "/src/b.ts",
    content: "foo",
};
const cTs: File = {
    path: "/src/c.ts",
    content: "import ",
};
const bSymlink: SymLink = {
    path: "/src/b-link.ts",
    symLink: "./b.ts",
};
const tsconfig: File = {
    path: "/tsconfig.json",
    content: `{ "include": ["src"] }`,
};
const ambientDeclaration: File = {
    path: "/src/ambient.d.ts",
    content: "declare module 'ambient' {}",
};
const mobxPackageJson: File = {
    path: "/node_modules/mobx/package.json",
    content: jsonToReadableText({ name: "mobx", version: "1.0.0" }),
};
const mobxDts: File = {
    path: "/node_modules/mobx/index.d.ts",
    content: "export declare function observable(): unknown;",
};

describe("unittests:: tsserver:: moduleSpecifierCache", () => {
    it("caches importability within a file", () => {
        const { session, moduleSpecifierCache } = setup();
        session.logger.info(`importability: ${moduleSpecifierCache.get(bTs.path as ts.Path, aTs.path as ts.Path, {}, {})?.isBlockedByPackageJsonDependencies}`);
        baselineTsserverLogs("moduleSpecifierCache", "caches importability within a file", session);
    });

    it("caches module specifiers within a file", () => {
        const { session, moduleSpecifierCache, triggerCompletions } = setup();
        // Completion at an import statement will calculate and cache module specifiers
        triggerCompletions({ file: cTs.path, line: 1, offset: cTs.content.length + 1 });
        session.logger.info(`mobxCache: ${jsonToReadableText(moduleSpecifierCache.get(cTs.path as ts.Path, mobxDts.path as ts.Path, {}, {}))}`);
        baselineTsserverLogs("moduleSpecifierCache", "caches module specifiers within a file", session);
    });

    it("invalidates module specifiers when changes happen in contained node_modules directories", () => {
        const { host, session, moduleSpecifierCache, triggerCompletions } = setup();
        // Completion at an import statement will calculate and cache module specifiers
        triggerCompletions({ file: cTs.path, line: 1, offset: cTs.content.length + 1 });
        host.writeFile("/node_modules/.staging/mobx-12345678/package.json", "{}");
        host.runQueuedTimeoutCallbacks();
        assert.equal(moduleSpecifierCache.count(), 0);
        baselineTsserverLogs("moduleSpecifierCache", "invalidates module specifiers when changes happen in contained node_modules directories", session);
    });

    it("does not invalidate the cache when new files are added", () => {
        const { session, host, moduleSpecifierCache } = setup();
        host.writeFile("/src/a2.ts", aTs.content);
        host.runQueuedTimeoutCallbacks();
        session.logger.info(`importability: ${moduleSpecifierCache.get(bTs.path as ts.Path, aTs.path as ts.Path, {}, {})?.isBlockedByPackageJsonDependencies}`);
        baselineTsserverLogs("moduleSpecifierCache", "does not invalidate the cache when new files are added", session);
    });

    it("invalidates the cache when symlinks are added or removed", () => {
        const { session, host, moduleSpecifierCache } = setup();
        host.renameFile(bSymlink.path, "/src/b-link2.ts");
        host.runQueuedTimeoutCallbacks();
        session.logger.info(`moduleSpecifierCache count: ${moduleSpecifierCache.count()}`);
        baselineTsserverLogs("moduleSpecifierCache", "invalidates the cache when symlinks are added or removed", session);
    });

    it("invalidates the cache when local package.json changes", () => {
        const { session, host, moduleSpecifierCache } = setup();
        host.writeFile("/package.json", `{}`);
        host.runQueuedTimeoutCallbacks();
        session.logger.info(`moduleSpecifierCache count: ${moduleSpecifierCache.count()}`);
        baselineTsserverLogs("moduleSpecifierCache", "invalidates the cache when local packageJson changes", session);
    });

    it("invalidates the cache when module resolution settings change", () => {
        const { session, host, moduleSpecifierCache } = setup();
        host.writeFile(tsconfig.path, `{ "compilerOptions": { "moduleResolution": "classic" }, "include": ["src"] }`);
        host.runQueuedTimeoutCallbacks();
        session.logger.info(`moduleSpecifierCache count: ${moduleSpecifierCache.count()}`);
        baselineTsserverLogs("moduleSpecifierCache", "invalidates the cache when module resolution settings change", session);
    });

    it("invalidates the cache when user preferences change", () => {
        const { moduleSpecifierCache, session, triggerCompletions } = setup();
        const preferences: ts.UserPreferences = { importModuleSpecifierPreference: "project-relative" };

        getWithPreferences({});
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences },
        });
        // Nothing changes yet
        getWithPreferences({});
        getWithPreferences(preferences);
        // Completions will request (getting nothing) and set the cache with new preferences
        triggerCompletions({ file: bTs.path, line: 1, offset: 3 });
        getWithPreferences({});
        getWithPreferences(preferences);

        // Test other affecting preference
        session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
            command: ts.server.protocol.CommandTypes.Configure,
            arguments: { preferences: { importModuleSpecifierEnding: "js" } },
        });
        triggerCompletions({ file: bTs.path, line: 1, offset: 3 });
        getWithPreferences(preferences);
        baselineTsserverLogs("moduleSpecifierCache", "invalidates the cache when user preferences change", session);

        function getWithPreferences(preferences: ts.UserPreferences) {
            session.logger.info(`moduleSpecifierCache for ${jsonToReadableText(preferences)} (${bTs.path} -> ${aTs.path}) ${jsonToReadableText(moduleSpecifierCache.get(bTs.path as ts.Path, aTs.path as ts.Path, preferences, {}))}`);
        }
    });
});

function setup() {
    const host = createServerHost([aTs, bTs, cTs, bSymlink, ambientDeclaration, tsconfig, packageJson, mobxPackageJson, mobxDts]);
    const session = new TestSession(host);
    openFilesForSession([aTs, bTs, cTs], session);
    const project = session.getProjectService().configuredProjects.get(tsconfig.path)!;
    session.executeCommandSeq<ts.server.protocol.ConfigureRequest>({
        command: ts.server.protocol.CommandTypes.Configure,
        arguments: {
            preferences: {
                includeCompletionsForImportStatements: true,
                includeCompletionsForModuleExports: true,
                includeCompletionsWithInsertText: true,
                includeCompletionsWithSnippetText: true,
            },
        },
    });
    triggerCompletions({ file: bTs.path, line: 1, offset: 3 });

    return { host, project, session, moduleSpecifierCache: project.getModuleSpecifierCache(), triggerCompletions };

    function triggerCompletions(requestLocation: ts.server.protocol.FileLocationRequestArgs) {
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: requestLocation,
        });
    }
}
