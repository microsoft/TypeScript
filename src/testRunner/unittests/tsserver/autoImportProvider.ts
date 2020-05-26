namespace ts.projectSystem {
    describe("unittests:: tsserver:: autoImportProvider", () => {
        it("Auto-importable file is in inferred project until imported", () => {
            const { projectService, session, file, updateFile } = setup();
            checkNumberOfInferredProjects(projectService, 0);
            openFilesForSession([file.angularFormsDts], session);
            checkNumberOfInferredProjects(projectService, 1);
            assert.equal(
                projectService.getDefaultProjectForFile(file.angularFormsDts.path as server.NormalizedPath, /*ensureProject*/ true)?.projectKind,
                server.ProjectKind.Inferred);

            updateFile(file.indexTs.path, "import '@angular/forms'");
            assert.equal(
                projectService.getDefaultProjectForFile(file.angularFormsDts.path as server.NormalizedPath, /*ensureProject*/ true)?.projectKind,
                server.ProjectKind.Configured);
        });
    });

    function setup() {
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

        const host = createServerHost([tsconfig, indexTs, packageJson, angularFormsPackageJson, angularFormsDts]);
        const session = createSession(host);
        openFilesForSession([indexTs], session);
        const projectService = session.getProjectService();
        const files = [angularFormsDts, angularFormsPackageJson, tsconfig, packageJson, indexTs];
        return {
            host,
            projectService,
            session,
            updateFile,
            files,
            file: {
                angularFormsDts,
                angularFormsPackageJson,
                tsconfig,
                packageJson,
                indexTs
            }
        };

        function updateFile(path: string, newText: string) {
            const file = Debug.checkDefined(files.find(f => f.path === path));
            file.content = newText;

            session.executeCommandSeq<protocol.ApplyChangedToOpenFilesRequest>({
                command: protocol.CommandTypes.ApplyChangedToOpenFiles,
                arguments: {
                    openFiles: [{
                        fileName: file.path,
                        content: file.content
                    }]
                }
            });
        }
    }
}
