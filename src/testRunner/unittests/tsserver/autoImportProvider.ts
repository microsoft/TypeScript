namespace ts.projectSystem {
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
        content: "{}",
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
            assert.equal(
                projectService.getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!.getLanguageService().getAutoImportProvider(),
                undefined);
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
            assert.equal(
                projectService.getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!.getLanguageService().getAutoImportProvider(),
                undefined);
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
            checkNumberOfInferredProjects(projectService, 1);
            checkNumberOfConfiguredProjects(projectService, 0);
            assert.equal(
                projectService.getDefaultProjectForFile(angularFormsDts.path as server.NormalizedPath, /*ensureProject*/ true)!.getLanguageService().getAutoImportProvider(),
                undefined);
        });

        it("Auto-importable file is in inferred project until imported", () => {
            const { projectService, session, updateFile } = setup([angularFormsDts, angularFormsPackageJson, tsconfig, packageJson, indexTs]);
            checkNumberOfInferredProjects(projectService, 0);
            openFilesForSession([angularFormsDts], session);
            checkNumberOfInferredProjects(projectService, 1);
            assert.equal(
                projectService.getDefaultProjectForFile(angularFormsDts.path as server.NormalizedPath, /*ensureProject*/ true)?.projectKind,
                server.ProjectKind.Inferred);

            updateFile(indexTs.path, "import '@angular/forms'");
            assert.equal(
                projectService.getDefaultProjectForFile(angularFormsDts.path as server.NormalizedPath, /*ensureProject*/ true)?.projectKind,
                server.ProjectKind.Configured);
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
            assert.equal(
                projectService
                    .getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!
                    .getLanguageService()
                    .getAutoImportProvider(),
                undefined);

            host.writeFile(packageJson.path, packageJson.content);
            assert.ok(projectService
                .getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!
                .getLanguageService()
                .getAutoImportProvider());
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
            const autoImportProvider = projectService
                .getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!
                .getLanguageService()
                .getAutoImportProvider();

            updateFile(indexTs.path, "console.log(0)");
            assert.strictEqual(
                projectService
                    .getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!
                    .getLanguageService()
                    .getAutoImportProvider(),
                autoImportProvider);
        });

        it("Responds to changes in node_modules", () => {
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
            projectService
                .getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!
                .getLanguageService()
                .getAutoImportProvider();

            // Directory watchers only fire for add/remove, not change.
            // This is ok since a real `npm install` will always trigger add/remove events.
            host.deleteFile(angularFormsDts.path);
            host.writeFile(angularFormsDts.path, "");

            const autoImportProvider = projectService
                .getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!
                .getLanguageService()
                .getAutoImportProvider();

            assert.equal(autoImportProvider!.getSourceFile(angularFormsDts.path)!.getText(), "");
        });
    });

    function setup(files: File[]) {
        const host = createServerHost(files);
        const session = createSession(host);
        const projectService = session.getProjectService();
        return {
            host,
            projectService,
            session,
            updateFile
        };

        function updateFile(path: string, newText: string) {
            const file = Debug.checkDefined(files.find(f => f.path === path));
            session.executeCommandSeq<protocol.ApplyChangedToOpenFilesRequest>({
                command: protocol.CommandTypes.ApplyChangedToOpenFiles,
                arguments: {
                    openFiles: [{
                        fileName: file.path,
                        content: newText
                    }]
                }
            });
        }
    }
}
