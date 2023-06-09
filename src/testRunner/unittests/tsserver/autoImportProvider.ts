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

const angularFormsDts: File = {
    path: "/node_modules/@angular/forms/forms.d.ts",
    content: "export declare class PatternValidator {}",
};
const angularFormsPackageJson: File = {
    path: "/node_modules/@angular/forms/package.json",
    content: `{ "name": "@angular/forms", "typings": "./forms.d.ts" }`,
};
const angularCoreDts: File = {
    path: "/node_modules/@angular/core/core.d.ts",
    content: "",
};
const angularCorePackageJson: File = {
    path: "/node_modules/@angular/core/package.json",
    content: `{ "name": "@angular/core", "typings": "./core.d.ts" }`,
};
const tsconfig: File = {
    path: "/tsconfig.json",
    content: `{ "compilerOptions": { "module": "commonjs" } }`,
};
const packageJson: File = {
    path: "/package.json",
    content: `{ "dependencies": { "@angular/forms": "*", "@angular/core": "*" } }`
};
const indexTs: File = {
    path: "/index.ts",
    content: ""
};

describe("unittests:: tsserver:: autoImportProvider", () => {
    it("Auto import provider program is not created without dependencies listed in package.json", () => {
        const { projectService, session } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            { path: packageJson.path, content: `{ "dependencies": {} }` },
            indexTs
        ]);
        openFilesForSession([indexTs], session);
        assert.isUndefined(projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "without dependencies listed", session);
    });

    it("Auto import provider program is not created if dependencies are already in main program", () => {
        const { projectService, session } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            packageJson,
            { path: indexTs.path, content: "import '@angular/forms';" }
        ]);
        openFilesForSession([indexTs], session);
        assert.isUndefined(projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "dependencies are already in main program", session);
    });

    it("Auto-import program is not created for projects already inside node_modules", () => {
        // Simulate browsing typings files inside node_modules: no point creating auto import program
        // for the InferredProject that gets created in there.
        const { projectService, session } = setup([
            angularFormsDts,
            { path: angularFormsPackageJson.path, content: `{ "dependencies": { "@angular/core": "*" } }` },
            { path: "/node_modules/@angular/core/package.json", content: `{ "typings": "./core.d.ts" }` },
            { path: "/node_modules/@angular/core/core.d.ts", content: `export namespace angular {};` },
        ]);

        openFilesForSession([angularFormsDts], session);
        assert.isUndefined(projectService
            .getDefaultProjectForFile(angularFormsDts.path as ts.server.NormalizedPath, /*ensureProject*/ true)!
            .getLanguageService()
            .getAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "projects already inside node_modules", session);
    });

    it("Auto-importable file is in inferred project until imported", () => {
        const { projectService, session, updateFile } = setup([angularFormsDts, angularFormsPackageJson, tsconfig, packageJson, indexTs]);
        openFilesForSession([angularFormsDts], session);
        session.logger.log(`Default Project for ${angularFormsDts.path}:: ${projectService.getDefaultProjectForFile(angularFormsDts.path as ts.server.NormalizedPath, /*ensureProject*/ true)?.projectName}`);

        updateFile(indexTs.path, "import '@angular/forms'");
        session.logger.log(`Default Project for ${angularFormsDts.path}:: ${projectService.getDefaultProjectForFile(angularFormsDts.path as ts.server.NormalizedPath, /*ensureProject*/ true)?.projectName}`);

        assert.isUndefined(projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "Auto-importable file is in inferred project until imported", session);
    });

    it("Responds to package.json changes", () => {
        const { projectService, session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            { path: "/package.json", content: "{}" },
            indexTs
        ]);

        openFilesForSession([indexTs], session);
        assert.isUndefined(projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());

        host.writeFile(packageJson.path, packageJson.content);
        assert.ok(projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "Responds to package_json changes", session);
    });

    it("Reuses autoImportProvider when program structure is unchanged", () => {
        const { projectService, session, updateFile } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            packageJson,
            indexTs
        ]);

        openFilesForSession([indexTs], session);
        const autoImportProvider = projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider();
        assert.ok(autoImportProvider);

        updateFile(indexTs.path, "console.log(0)");
        assert.strictEqual(
            projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider(),
            autoImportProvider);
        baselineTsserverLogs("autoImportProvider", "Reuses autoImportProvider when program structure is unchanged", session);
    });

    it("Closes AutoImportProviderProject when host project closes", () => {
        const { projectService, session } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            packageJson,
            indexTs
        ]);

        openFilesForSession([indexTs], session);
        const hostProject = projectService.configuredProjects.get(tsconfig.path)!;
        hostProject.getPackageJsonAutoImportProvider();
        const autoImportProviderProject = hostProject.autoImportProviderHost;
        assert.ok(autoImportProviderProject);

        hostProject.close();
        assert.ok(autoImportProviderProject && autoImportProviderProject.isClosed());
        assert.isUndefined(hostProject.autoImportProviderHost);
        baselineTsserverLogs("autoImportProvider", "Closes AutoImportProviderProject when host project closes", session);
    });

    it("Does not schedule ensureProjectForOpenFiles on AutoImportProviderProject creation", () => {
        const { projectService, session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            indexTs
        ]);

        // Create configured project only, ensure !projectService.pendingEnsureProjectForOpenFiles
        openFilesForSession([indexTs], session);
        const hostProject = projectService.configuredProjects.get(tsconfig.path)!;
        projectService.delayEnsureProjectForOpenFiles();
        host.runQueuedTimeoutCallbacks();
        assert.isFalse(projectService.pendingEnsureProjectForOpenFiles);

        // Create auto import provider project, ensure still !projectService.pendingEnsureProjectForOpenFiles
        host.writeFile(packageJson.path, packageJson.content);
        hostProject.getPackageJsonAutoImportProvider();
        assert.isFalse(projectService.pendingEnsureProjectForOpenFiles);
        baselineTsserverLogs("autoImportProvider", "Does not schedule ensureProjectForOpenFiles on AutoImportProviderProject creation", session);
    });

    it("Responds to automatic changes in node_modules", () => {
        const { projectService, session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            angularCoreDts,
            angularCorePackageJson,
            tsconfig,
            packageJson,
            indexTs
        ]);

        openFilesForSession([indexTs], session);
        const project = projectService.configuredProjects.get(tsconfig.path)!;
        const completionsBefore = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.isTrue(completionsBefore?.entries.some(c => c.name === "PatternValidator"));

        // Directory watchers only fire for add/remove, not change.
        // This is ok since a real `npm install` will always trigger add/remove events.
        host.deleteFile(angularFormsDts.path);
        host.writeFile(angularFormsDts.path, "");

        const autoImportProvider = project.getLanguageService().getAutoImportProvider();
        const completionsAfter = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.equal(autoImportProvider!.getSourceFile(angularFormsDts.path)!.getText(), "");
        assert.isFalse(completionsAfter?.entries.some(c => c.name === "PatternValidator"));
        baselineTsserverLogs("autoImportProvider", "Responds to automatic changes in node_modules", session);
    });

    it("Responds to manual changes in node_modules", () => {
        const { projectService, session, updateFile } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            angularCoreDts,
            angularCorePackageJson,
            tsconfig,
            packageJson,
            indexTs
        ]);

        openFilesForSession([indexTs, angularFormsDts], session);
        const project = projectService.configuredProjects.get(tsconfig.path)!;
        const completionsBefore = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.isTrue(completionsBefore?.entries.some(c => c.name === "PatternValidator"));

        updateFile(angularFormsDts.path, "export class ValidatorPattern {}");
        const completionsAfter = project.getLanguageService().getCompletionsAtPosition(indexTs.path, 0, { includeCompletionsForModuleExports: true });
        assert.isFalse(completionsAfter?.entries.some(c => c.name === "PatternValidator"));
        assert.isTrue(completionsAfter?.entries.some(c => c.name === "ValidatorPattern"));
        baselineTsserverLogs("autoImportProvider", "Responds to manual changes in node_modules", session);
    });

    it("Recovers from an unparseable package.json", () => {
        const { projectService, session, host } = setup([
            angularFormsDts,
            angularFormsPackageJson,
            tsconfig,
            { path: packageJson.path, content: "{" },
            indexTs
        ]);

        openFilesForSession([indexTs], session);
        assert.isUndefined(projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());

        host.writeFile(packageJson.path, packageJson.content);
        assert.ok(projectService.configuredProjects.get(tsconfig.path)!.getLanguageService().getAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "Recovers from an unparseable package_json", session);
    });

    it("Does not create an auto import provider if there are too many dependencies", () => {
        const createPackage = (i: number): File[] => ([
            { path: `/node_modules/package${i}/package.json`, content: `{ "name": "package${i}" }` },
            { path: `/node_modules/package${i}/index.d.ts`, content: `` }
        ]);

        const packages = [];
        for (let i = 0; i < 11; i++) {
            packages.push(createPackage(i));
        }

        const dependencies = packages.reduce((hash, p) => ({ ...hash, [JSON.parse(p[0].content).name]: "*" }), {});
        const packageJson: File = { path: "/package.json", content: JSON.stringify(dependencies) };
        const { projectService, session } = setup([...ts.flatten(packages), indexTs, tsconfig, packageJson]);

        openFilesForSession([indexTs], session);
        const project = projectService.configuredProjects.get(tsconfig.path)!;
        assert.isUndefined(project.getPackageJsonAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "Does not create an auto import provider if there are too many dependencies", session);
    });

    it("Shared source files between AutoImportProvider and main program do not cause duplicate entries in export info map", () => {
        const files = [
            // node_modules/memfs - AutoImportProvider only
            { path: "/node_modules/memfs/package.json", content: `{ "name": "memfs", "version": "1.0.0", "types": "lib/index.d.ts" }` },
            { path: "/node_modules/memfs/lib/index.d.ts", content: `/// <reference types="node" />\nexport declare class Volume {}` },

            // node_modules/@types/node - AutoImportProvider and main program
            { path: "/node_modules/@types/node/package.json", content: `{ "name": "@types/node", "version": "1.0.0" }` },
            { path: "/node_modules/@types/node/index.d.ts", content: `export declare class Stats {}` },

            // root
            { path: "/package.json", content: `{ "dependencies": { "memfs": "*" }, "devDependencies": { "@types/node": "*" } }` },
            { path: "/tsconfig.json", content: `{ "compilerOptions": { "types": ["node"] }` },
            { path: "/index.ts", content: `export {};` },
        ];

        const { projectService, session, triggerCompletions } = setup(files);
        openFilesForSession([files[files.length - 1]], session);
        const project = projectService.configuredProjects.get("/tsconfig.json")!;
        const autoImportProvider = project.getPackageJsonAutoImportProvider()!;
        assert.isDefined(autoImportProvider);

        // Trigger completions to ensure export info map is populated
        triggerCompletions("/index.ts", 0, 0);
        const exportInfoMap = project.getCachedExportInfoMap();
        const seenSymbolNames = new Set<string>();
        exportInfoMap.search("/index.ts" as ts.Path, /*preferCapitalized*/ false, ts.returnTrue, (info, symbolName) => {
            assert.lengthOf(info, 1);
            seenSymbolNames.add(symbolName);
        });
        assert.equal(seenSymbolNames.size, 2);
        assert.ok(seenSymbolNames.has("Stats"));
        assert.ok(seenSymbolNames.has("Volume"));
        baselineTsserverLogs("autoImportProvider", "Shared source files between AutoImportProvider and main program", session);
    });
});

describe("unittests:: tsserver:: autoImportProvider - monorepo", () => {
    it("Does not create auto import providers upon opening projects for find-all-references", () => {
        const files = [
            // node_modules
            angularFormsDts,
            angularFormsPackageJson,

            // root
            { path: tsconfig.path, content: `{ "references": [{ "path": "packages/a" }, { "path": "packages/b" }] }` },
            { path: packageJson.path, content: `{ "private": true }` },

            // packages/a
            { path: "/packages/a/package.json", content: packageJson.content },
            { path: "/packages/a/tsconfig.json", content: `{ "compilerOptions": { "composite": true }, "references": [{ "path": "../b" }] }` },
            { path: "/packages/a/index.ts", content: "import { B } from '../b';" },

            // packages/b
            { path: "/packages/b/package.json", content: packageJson.content },
            { path: "/packages/b/tsconfig.json", content: `{ "compilerOptions": { "composite": true } }` },
            { path: "/packages/b/index.ts", content: `export class B {}` }
        ];

        const { projectService, session, findAllReferences } = setup(files);

        openFilesForSession([files.find(f => f.path === "/packages/b/index.ts")!], session);
        findAllReferences("/packages/b/index.ts", 1, "export class B".length - 1);

        // Project for A is created - ensure it doesn't have an autoImportProvider
        assert.isUndefined(projectService.configuredProjects.get("/packages/a/tsconfig.json")!.getLanguageService().getAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "Does not create auto import providers upon opening projects for find-all-references", session);
    });

    it("Does not close when root files are redirects that don't actually exist", () => {
        const files = [
            // packages/a
            { path: "/packages/a/package.json", content: `{ "dependencies": { "b": "*" } }` },
            { path: "/packages/a/tsconfig.json", content: `{ "compilerOptions": { "composite": true }, "references": [{ "path": "./node_modules/b" }] }` },
            { path: "/packages/a/index.ts", content: "" },

            // packages/b
            { path: "/packages/a/node_modules/b/package.json", content: `{ "types": "dist/index.d.ts" }` },
            { path: "/packages/a/node_modules/b/tsconfig.json", content: `{ "compilerOptions": { "composite": true, "outDir": "dist" } }` },
            { path: "/packages/a/node_modules/b/index.ts", content: `export class B {}` }
        ];

        const { projectService, session } = setup(files);
        openFilesForSession([files[2]], session);
        assert.isDefined(projectService.configuredProjects.get("/packages/a/tsconfig.json")!.getPackageJsonAutoImportProvider());
        assert.isDefined(projectService.configuredProjects.get("/packages/a/tsconfig.json")!.getPackageJsonAutoImportProvider());
        baselineTsserverLogs("autoImportProvider", "Does not close when root files are redirects that dont actually exist", session);
    });

    it("Can use the same document registry bucket key as main program", () => {
        for (const option of ts.sourceFileAffectingCompilerOptions) {
            assert(
                !ts.hasProperty(ts.server.AutoImportProviderProject.compilerOptionsOverrides, option.name),
                `'${option.name}' may cause AutoImportProviderProject not to share source files with main program`
            );
        }
    });
});

function setup(files: File[]) {
    const host = createServerHost(files);
    const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
    const projectService = session.getProjectService();
    return {
        host,
        projectService,
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
                    content: newText
                }]
            }
        });
    }

    function findAllReferences(file: string, line: number, offset: number) {
        ts.Debug.assertIsDefined(files.find(f => f.path === file));
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: {
                file,
                line,
                offset
            }
        });
    }

    function triggerCompletions(file: string, line: number, offset: number) {
        const requestLocation: ts.server.protocol.FileLocationRequestArgs = {
            file,
            line,
            offset,
        };
        session.executeCommandSeq<ts.server.protocol.CompletionsRequest>({
            command: ts.server.protocol.CommandTypes.CompletionInfo,
            arguments: {
                ...requestLocation,
                includeExternalModuleExports: true,
            }
        });
    }
}
