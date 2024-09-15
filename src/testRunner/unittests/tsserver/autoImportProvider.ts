import * as ts from "../../_namespaces/ts.js";
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

const angularFormsDts: File = {
    path: "/user/username/projects/project/node_modules/@angular/forms/forms.d.ts",
    content: "export declare class PatternValidator {}",
};
const angularFormsPackageJson: File = {
    path: "/user/username/projects/project/node_modules/@angular/forms/package.json",
    content: `{ "name": "@angular/forms", "typings": "./forms.d.ts" }`,
};
const angularCoreDts: File = {
    path: "/user/username/projects/project/node_modules/@angular/core/core.d.ts",
    content: "",
};
const angularCorePackageJson: File = {
    path: "/user/username/projects/project/node_modules/@angular/core/package.json",
    content: `{ "name": "@angular/core", "typings": "./core.d.ts" }`,
};
const tsconfig: File = {
    path: "/user/username/projects/project/tsconfig.json",
    content: `{ "compilerOptions": { "module": "commonjs" } }`,
};
const packageJson: File = {
    path: "/user/username/projects/project/package.json",
    content: `{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }`,
};
const indexTs: File = {
    path: "/user/username/projects/project/index.ts",
    content: "",
};

describe("unittests:: tsserver:: autoImportProvider::", () => {
    it("Auto import provider program is not created without dependencies listed in package.json", () => {
        const { session } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            { path: packageJson.path, content: `{ "dependencies": {} }` },
            indexTs,
        ]);
        openFilesForSession([indexTs], session);
        assert.isUndefined(session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "without dependencies listed", session);
    });

    it("Auto import provider program is not created if dependencies are already in main program", () => {
        const { session } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            packageJson,
            { path: indexTs.path, content: "import '@angular/forms';" },
        ]);
        openFilesForSession([indexTs], session);
        assert.isUndefined(session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "dependencies are already in main program", session);
    });

    it("Auto-import program is not created for projects already inside node_modules", () => {
        // Simulate browsing typings files inside node_modules: no point creating auto import program
        // for the InferredProject that gets created in there.
        const { session } = setup([
            angularFormsDts,
            { path: angularFormsPackageJson.path, content: `{ "dependencies": { "@angular/core": "*" } }` },
            { path: "/user/username/projects/project/node_modules/@angular/core/package.json", content: `{ "typings": "./core.d.ts" }` },
            { path: "/user/username/projects/project/node_modules/@angular/core/core.d.ts", content: `export namespace angular {};` },
        ]);

        openFilesForSession([angularFormsDts], session);
        assert.isUndefined(
            session.getProjectService()
                .getDefaultProjectForFile(angularFormsDts.path as ts.server.NormalizedPath, /*ensureProject*/ true)!
                .getLanguageService()
                .getAutoImportProvider(),
        );
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "projects already inside node_modules", session);
    });

    it("Auto-importable file is in inferred project until imported", () => {
        const { session, updateFile } = setup([angularFormsDts, angularFormsPackageJson, tsconfig, packageJson, indexTs]);
        openFilesForSession([angularFormsDts], session);
        updateFile(indexTs.path, "import '@angular/forms'");
        assert.isUndefined(session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Auto-importable file is in inferred project until imported", session);
    });

    it("Responds to package.json changes", () => {
        const { session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            { path: "/user/username/projects/project/package.json", content: "{}" },
            indexTs,
        ]);

        openFilesForSession([indexTs], session);
        assert.isUndefined(session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");

        host.writeFile(packageJson.path, packageJson.content);
        session.host.baselineHost("Before getAutoImportProvider");
        host.runQueuedTimeoutCallbacks();
        assert.ok(session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Responds to package_json changes", session);
    });

    it("Reuses autoImportProvider when program structure is unchanged", () => {
        const { session, updateFile } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            packageJson,
            indexTs,
        ]);

        openFilesForSession([indexTs], session);
        const autoImportProvider = session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider();
        assert.ok(autoImportProvider);
        session.host.baselineHost("After getAutoImportProvider");

        updateFile(indexTs.path, "console.log(0)");
        assert.strictEqual(
            session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider(),
            autoImportProvider,
        );
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Reuses autoImportProvider when program structure is unchanged", session);
    });

    it("Closes AutoImportProviderProject when host project closes", () => {
        const { session } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            packageJson,
            indexTs,
        ]);

        openFilesForSession([indexTs], session);
        const hostProject = session.getProjectService().configuredProjects.get(tsconfig.path)!;
        hostProject.getPackageJsonAutoImportProvider();
        const autoImportProviderProject = hostProject.autoImportProviderHost;
        assert.ok(autoImportProviderProject);
        session.host.baselineHost("After getPackageJsonAutoImportProvider");

        closeFilesForSession([indexTs], session);
        openFilesForSession([{
            file: "/user/username/projects/project/random/random.ts",
            content: "export const y = 10;",
            projectRootPath: "/user/username/projects/project/random",
        }], session);
        assert.isTrue(hostProject.isClosed());
        assert.ok(autoImportProviderProject && autoImportProviderProject.isClosed());
        assert.isUndefined(hostProject.autoImportProviderHost);
        baselineTsserverLogs("autoImportProvider", "Closes AutoImportProviderProject when host project closes", session);
    });

    it("Does not schedule ensureProjectForOpenFiles on AutoImportProviderProject creation", () => {
        const { session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            indexTs,
        ]);

        // Create configured project only, ensure !session.getProjectService().pendingEnsureProjectForOpenFiles
        openFilesForSession([indexTs], session);
        const hostProject = session.getProjectService().configuredProjects.get(tsconfig.path)!;
        session.getProjectService().delayEnsureProjectForOpenFiles();
        host.runQueuedTimeoutCallbacks();
        assert.isFalse(session.getProjectService().pendingEnsureProjectForOpenFiles);

        // Create auto import provider project, ensure still !session.getProjectService().pendingEnsureProjectForOpenFiles
        host.writeFile(packageJson.path, packageJson.content);
        session.host.baselineHost("Before getPackageJsonAutoImportProvider");
        hostProject.getPackageJsonAutoImportProvider();
        assert.isFalse(session.getProjectService().pendingEnsureProjectForOpenFiles);
        session.host.baselineHost("After getPackageJsonAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Does not schedule ensureProjectForOpenFiles on AutoImportProviderProject creation", session);
    });

    it("Responds to automatic changes in node_modules", () => {
        const { session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            angularCoreDts,
            angularCorePackageJson,
            tsconfig,
            packageJson,
            indexTs,
        ]);

        openFilesForSession([indexTs], session);
        const project = session.getProjectService().configuredProjects.get(tsconfig.path)!;
        const completionsBefore = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.isTrue(completionsBefore?.entries.some(c => c.name === "PatternValidator"));
        session.host.baselineHost("After completions");

        // Directory watchers only fire for add/remove, not change.
        // This is ok since a real `npm install` will always trigger add/remove events.
        host.deleteFile(angularFormsDts.path);
        host.writeFile(angularFormsDts.path, "");

        session.host.baselineHost("Before getAutoImportProvider");
        const autoImportProvider = project.getLanguageService().getAutoImportProvider();
        session.host.baselineHost("After getAutoImportProvider");
        const completionsAfter = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.equal(autoImportProvider!.getSourceFile(angularFormsDts.path)!.getText(), "");
        assert.isFalse(completionsAfter?.entries.some(c => c.name === "PatternValidator"));
        session.host.baselineHost("After Completions");
        baselineTsserverLogs("autoImportProvider", "Responds to automatic changes in node_modules", session);
    });

    it("Responds to manual changes in node_modules", () => {
        const { session, updateFile } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            angularCoreDts,
            angularCorePackageJson,
            tsconfig,
            packageJson,
            indexTs,
        ]);

        openFilesForSession([indexTs, angularFormsDts], session);
        const project = session.getProjectService().configuredProjects.get(tsconfig.path)!;
        const completionsBefore = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.isTrue(completionsBefore?.entries.some(c => c.name === "PatternValidator"));

        updateFile(angularFormsDts.path, "export class ValidatorPattern {}");
        const completionsAfter = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.isFalse(completionsAfter?.entries.some(c => c.name === "PatternValidator"));
        assert.isTrue(completionsAfter?.entries.some(c => c.name === "ValidatorPattern"));
        baselineTsserverLogs("autoImportProvider", "Responds to manual changes in node_modules", session);
    });

    it("Recovers from an unparseable package.json", () => {
        const { session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            { path: packageJson.path, content: "{" },
            indexTs,
        ]);

        openFilesForSession([indexTs], session);
        assert.isUndefined(session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");

        host.writeFile(packageJson.path, packageJson.content);
        session.host.baselineHost("Before getAutoImportProvider");
        assert.ok(session.getProjectService().configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Recovers from an unparseable package_json", session);
    });

    it("Does not create an auto import provider if there are too many dependencies", () => {
        const createPackage = (i: number): File[] => [
            { path: `/user/username/projects/project/node_modules/package${i}/package.json`, content: `{ "name": "package${i}" }` },
            { path: `/user/username/projects/project/node_modules/package${i}/index.d.ts`, content: `` },
        ];

        const packages = [];
        for (let i = 0; i < 10; i++) {
            packages.push(createPackage(i));
        }

        const dependencies = packages.reduce((hash, p) => ({ ...hash, [JSON.parse(p[0].content).name]: "*" }), {});
        const packageJson: File = { path: "/user/username/projects/project/package.json", content: jsonToReadableText(dependencies) };
        const { session } = setup([...ts.flatten(packages), indexTs, tsconfig, packageJson]);

        openFilesForSession([indexTs], session);
        const project = session.getProjectService().configuredProjects.get(tsconfig.path)!;
        assert.isUndefined(project.getPackageJsonAutoImportProvider());
        session.host.baselineHost("After getPackageJsonAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Does not create an auto import provider if there are too many dependencies", session);
    });

    it("Shared source files between AutoImportProvider and main program do not cause duplicate entries in export info map", () => {
        const files = [
            // node_modules/memfs - AutoImportProvider only
            { path: "/user/username/projects/project/node_modules/memfs/package.json", content: jsonToReadableText({ name: "memfs", version: "1.0.0", types: "lib/index.d.ts" }) },
            { path: "/user/username/projects/project/node_modules/memfs/lib/index.d.ts", content: `/// <reference types="node" />\nexport declare class Volume {}` },

            // node_modules/@types/node - AutoImportProvider and main program
            { path: "/user/username/projects/project/node_modules/@types/node/package.json", content: jsonToReadableText({ name: "@types/node", version: "1.0.0" }) },
            { path: "/user/username/projects/project/node_modules/@types/node/index.d.ts", content: `export declare class Stats {}` },

            // root
            { path: "/user/username/projects/project/package.json", content: `{ "dependencies": { "memfs": "*" }, "devDependencies": { "@types/node": "*" } }` },
            { path: "/user/username/projects/project/tsconfig.json", content: `{ "compilerOptions": { "types": ["node"] }` },
            { path: "/user/username/projects/project/index.ts", content: `export {};` },
        ];

        const { session, triggerCompletions } = setup(files);
        openFilesForSession([files[files.length - 1]], session);
        const project = session.getProjectService().configuredProjects.get("/user/username/projects/project/tsconfig.json")!;
        const autoImportProvider = project.getPackageJsonAutoImportProvider()!;
        assert.isDefined(autoImportProvider);
        session.host.baselineHost("After getPackageJsonAutoImportProvider");

        // Trigger completions to ensure export info map is populated
        triggerCompletions("/user/username/projects/project/index.ts", 0, 0);
        const exportInfoMap = project.getCachedExportInfoMap();
        const seenSymbolNames = new Set<string>();
        exportInfoMap.search("/user/username/projects/project/index.ts" as ts.Path, /*preferCapitalized*/ false, ts.returnTrue, (info, symbolName) => {
            assert.lengthOf(info, 1);
            seenSymbolNames.add(symbolName);
        });
        assert.equal(seenSymbolNames.size, 2);
        assert.ok(seenSymbolNames.has("Stats"));
        assert.ok(seenSymbolNames.has("Volume"));
        baselineTsserverLogs("autoImportProvider", "Shared source files between AutoImportProvider and main program", session);
    });
});

describe("unittests:: tsserver:: autoImportProvider:: monorepo", () => {
    it("Does not create auto import providers upon opening projects for find-all-references", () => {
        const files = [
            // node_modules
            angularFormsDts,
            angularFormsPackageJson,

            // root
            { path: tsconfig.path, content: `{ "references": [{ "path": "packages/a" }, { "path": "packages/b" }] }` },
            { path: packageJson.path, content: `{ "private": true }` },

            // packages/a
            { path: "/user/username/projects/project/packages/a/package.json", content: packageJson.content },
            { path: "/user/username/projects/project/packages/a/tsconfig.json", content: `{ "compilerOptions": { "composite": true }, "references": [{ "path": "../b" }] }` },
            { path: "/user/username/projects/project/packages/a/index.ts", content: "import { B } from '../b';" },

            // packages/b
            { path: "/user/username/projects/project/packages/b/package.json", content: packageJson.content },
            { path: "/user/username/projects/project/packages/b/tsconfig.json", content: `{ "compilerOptions": { "composite": true } }` },
            { path: "/user/username/projects/project/packages/b/index.ts", content: `export class B {}` },
        ];

        const { session, findAllReferences } = setup(files);

        openFilesForSession([files.find(f => f.path === "/user/username/projects/project/packages/b/index.ts")!], session);
        findAllReferences("/user/username/projects/project/packages/b/index.ts", 1, "export class B".length - 1);

        // Project for A is created - ensure it doesn't have an autoImportProvider
        assert.isUndefined(session.getProjectService().configuredProjects.get("/user/username/projects/project/packages/a/tsconfig.json")!.getLanguageService().getAutoImportProvider());
        session.host.baselineHost("After getAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Does not create auto import providers upon opening projects for find-all-references", session);
    });

    it("Does not close when root files are redirects that don't actually exist", () => {
        const files = [
            // packages/a
            { path: "/user/username/projects/project/packages/a/package.json", content: `{ "dependencies": { "b": "*" } }` },
            { path: "/user/username/projects/project/packages/a/tsconfig.json", content: `{ "compilerOptions": { "composite": true }, "references": [{ "path": "./node_modules/b" }] }` },
            { path: "/user/username/projects/project/packages/a/index.ts", content: "" },

            // packages/b
            { path: "/user/username/projects/project/packages/a/node_modules/b/package.json", content: `{ "types": "dist/index.d.ts" }` },
            { path: "/user/username/projects/project/packages/a/node_modules/b/tsconfig.json", content: `{ "compilerOptions": { "composite": true, "outDir": "dist" } }` },
            { path: "/user/username/projects/project/packages/a/node_modules/b/index.ts", content: `export class B {}` },
        ];

        const { session } = setup(files);
        openFilesForSession([files[2]], session);
        assert.isDefined(session.getProjectService().configuredProjects.get("/user/username/projects/project/packages/a/tsconfig.json")!.getPackageJsonAutoImportProvider());
        session.host.baselineHost("After getPackageJsonAutoImportProvider");
        assert.isDefined(session.getProjectService().configuredProjects.get("/user/username/projects/project/packages/a/tsconfig.json")!.getPackageJsonAutoImportProvider());
        session.host.baselineHost("After getPackageJsonAutoImportProvider");
        baselineTsserverLogs("autoImportProvider", "Does not close when root files are redirects that dont actually exist", session);
    });

    it("Can use the same document registry bucket key as main program", () => {
        for (const option of ts.sourceFileAffectingCompilerOptions) {
            assert(
                !ts.hasProperty(ts.server.AutoImportProviderProject.compilerOptionsOverrides, option.name),
                `'${option.name}' may cause AutoImportProviderProject not to share source files with main program`,
            );
        }
    });
});

function setup(files: File[]) {
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
    return {
        host,
        session,
        updateFile,
        findAllReferences,
        triggerCompletions,
    };

    function updateFile(path: string, newText: string) {
        ts.Debug.assertIsDefined(files.find(f => f.path === path));
        session.executeCommandSeq<ts.server.protocol.ApplyChangedToOpenFilesRequest>({
            command: ts.server.protocol.CommandTypes.ApplyChangedToOpenFiles,
            arguments: {
                openFiles: [{
                    fileName: path,
                    content: newText,
                }],
            },
        });
    }

    function findAllReferences(file: string, line: number, offset: number) {
        ts.Debug.assertIsDefined(files.find(f => f.path === file));
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: {
                file,
                line,
                offset,
            },
        });
    }

    function triggerCompletions(file: string, line: number, offset: number) {
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                file,
                line,
                offset,
            },
        });
    }
}
