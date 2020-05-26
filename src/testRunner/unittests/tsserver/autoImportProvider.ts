namespace ts.projectSystem {
    const angularFormsDts: File = {
        path: "/node_modules/@angular/forms/forms.d.ts",
        content: "export declare class PatternValidator {}",
    };
    const angularFormsPackageJson: File = {
        path: "/node_modules/@angular/forms/package.json",
        content: `{ "name": "@angular/forms", "typings": "./forms.d.ts" }`,
    };
    const tsconfig: File = {
        path: "/tsconfig.json",
        content: "{}",
    };
    const packageJson: File = {
        path: "/package.json",
        content: `{ "dependencies": { "@angular/forms": "*" } }`
    };
    const indexTs: File = {
        path: "/index.ts",
        content: ""
    };

    describe("unittests:: tsserver:: autoImportProvider", () => {
        it("Auto import provider program is not created without dependencies listed in package.json", () => {
            const { projectService } = setup([
                angularFormsDts,
                angularFormsPackageJson,
                tsconfig,
                { path: packageJson.path, content: `{ "dependencies": {} }` },
                indexTs
            ]);

            assert.equal(
                projectService.getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!.getLanguageService().getAutoImportProvider(),
                undefined);
        });

        it("Auto import provider program is not created if dependencies are already in main program", () => {
            const { projectService } = setup([
                angularFormsDts,
                angularFormsPackageJson,
                tsconfig,
                packageJson,
                { path: indexTs.path, content: "import '@angular/forms';" }
            ]);

            assert.equal(
                projectService.getDefaultProjectForFile(indexTs.path as server.NormalizedPath, /*ensureProject*/ true)!.getLanguageService().getAutoImportProvider(),
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
    });

    function setup(files: File[]) {
        const host = createServerHost(files);
        const session = createSession(host);
        openFilesForSession([indexTs], session);
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
