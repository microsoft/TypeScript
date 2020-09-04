namespace ts.projectSystem {
    describe("unittests:: tsserver:: reloadProjects", () => {
        const configFile: File = {
            path: `${tscWatch.projectRoot}/tsconfig.json`,
            content: JSON.stringify({
                watchOptions: { excludeDirectories: ["node_modules"] }
            })
        };
        const file1: File = {
            path: `${tscWatch.projectRoot}/file1.ts`,
            content: `import { foo } from "module1";
                foo();`
        };
        const file2: File = {
            path: `${tscWatch.projectRoot}/file2.ts`,
            content: `${file1.content}
                export function bar(){}`
        };
        const moduleFile: File = {
            path: `${tscWatch.projectRoot}/node_modules/module1/index.d.ts`,
            content: `export function foo(): string;`
        };

        it("configured project", () => {
            const host = createServerHost([configFile, libFile, file1, file2]);
            const service = createProjectService(host);
            service.openClientFile(file1.path);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(configFile.path)!;
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path, configFile.path]);

            // Install module1
            host.ensureFileOrFolder(moduleFile);
            host.checkTimeoutQueueLength(0);

            service.reloadProjects();
            checkNumberOfProjects(service, { configuredProjects: 1 });
            assert.strictEqual(service.configuredProjects.get(configFile.path), project);
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path, configFile.path, moduleFile.path]);
        });

        it("inferred project", () => {
            const host = createServerHost([libFile, file1, file2]);
            const service = createProjectService(host, /*parameters*/ undefined, { useInferredProjectPerProjectRoot: true, });
            const timeoutId = host.getNextTimeoutId();
            service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["node_modules"] }, tscWatch.projectRoot);
            host.clearTimeout(timeoutId);
            service.openClientFile(file1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, tscWatch.projectRoot);
            checkNumberOfProjects(service, { inferredProjects: 1 });
            const project = service.inferredProjects[0];
            checkProjectActualFiles(project, [libFile.path, file1.path]);

            // Install module1
            host.ensureFileOrFolder(moduleFile);
            host.checkTimeoutQueueLength(0);

            service.reloadProjects();
            checkNumberOfProjects(service, { inferredProjects: 1 });
            assert.strictEqual(service.inferredProjects[0], project);
            checkProjectActualFiles(project, [libFile.path, file1.path, moduleFile.path]);
        });

        it("external project", () => {
            const host = createServerHost([libFile, file1, file2]);
            const service = createProjectService(host);
            service.openExternalProject({
                projectFileName: `${tscWatch.projectRoot}/project.sln`,
                options: { excludeDirectories: ["node_modules"] },
                rootFiles: [{ fileName: file1.path }, { fileName: file2.path }]
            });
            service.openClientFile(file1.path);
            checkNumberOfProjects(service, { externalProjects: 1 });
            const project = service.externalProjects[0];
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path]);

            // Install module1
            host.ensureFileOrFolder(moduleFile);
            host.checkTimeoutQueueLength(0);

            service.reloadProjects();
            checkNumberOfProjects(service, { externalProjects: 1 });
            assert.strictEqual(service.externalProjects[0], project);
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path, moduleFile.path]);
        });

        it("external project with config file", () => {
            const host = createServerHost([libFile, file1, file2, configFile]);
            const service = createProjectService(host);
            service.openExternalProject({
                projectFileName: `${tscWatch.projectRoot}/project.sln`,
                options: { excludeDirectories: ["node_modules"] },
                rootFiles: [{ fileName: file1.path }, { fileName: file2.path }, { fileName: configFile.path }]
            });
            service.openClientFile(file1.path);
            checkNumberOfProjects(service, { configuredProjects: 1 });
            const project = service.configuredProjects.get(configFile.path)!;
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path, configFile.path]);

            // Install module1
            host.ensureFileOrFolder(moduleFile);
            host.checkTimeoutQueueLength(0);

            service.reloadProjects();
            checkNumberOfProjects(service, { configuredProjects: 1 });
            assert.strictEqual(service.configuredProjects.get(configFile.path), project);
            checkProjectActualFiles(project, [libFile.path, file1.path, file2.path, configFile.path, moduleFile.path]);
        });
    });
}
