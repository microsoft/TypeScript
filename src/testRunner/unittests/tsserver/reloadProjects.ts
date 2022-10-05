import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: reloadProjects", () => {
    const configFile: ts.projectSystem.File = {
        path: `${ts.tscWatch.projectRoot}/tsconfig.json`,
        content: JSON.stringify({
            watchOptions: { excludeDirectories: ["node_modules"] }
        })
    };
    const file1: ts.projectSystem.File = {
        path: `${ts.tscWatch.projectRoot}/file1.ts`,
        content: `import { foo } from "module1";
                foo();
                import { bar } from "./file2";
                bar();`
    };
    const file2: ts.projectSystem.File = {
        path: `${ts.tscWatch.projectRoot}/file2.ts`,
        content: `export function bar(){}`
    };
    const moduleFile: ts.projectSystem.File = {
        path: `${ts.tscWatch.projectRoot}/node_modules/module1/index.d.ts`,
        content: `export function foo(): string;`
    };

    function verifyFileUpdates(host: ts.projectSystem.TestServerHost, service: ts.projectSystem.TestProjectService, project: ts.server.Project) {
        // update file
        const updatedText = `${file2.content}
            bar();`;
        host.writeFile(file2.path, updatedText);
        host.checkTimeoutQueueLength(0);
        service.reloadProjects();
        assert.equal(project.getCurrentProgram()?.getSourceFile(file2.path)?.text, updatedText);

        // delete file
        host.deleteFile(file2.path);
        host.checkTimeoutQueueLength(0);
        service.reloadProjects();
        assert.isUndefined(project.getCurrentProgram()?.getSourceFile(file2.path)?.text);
        assert.isUndefined(service.getScriptInfo(file2.path));
    }

    it("configured project", () => {
        const host = ts.projectSystem.createServerHost([configFile, ts.projectSystem.libFile, file1, file2]);
        const service = ts.projectSystem.createProjectService(host);
        service.setHostConfiguration({ watchOptions: { excludeFiles: [file2.path] } });
        service.openClientFile(file1.path);
        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
        const project = service.configuredProjects.get(configFile.path)!;
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path, configFile.path]);

        // Install module1
        host.ensureFileOrFolder(moduleFile);
        host.checkTimeoutQueueLength(0);

        service.reloadProjects();
        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
        assert.strictEqual(service.configuredProjects.get(configFile.path), project);
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path, configFile.path, moduleFile.path]);

        verifyFileUpdates(host, service, project);
    });

    it("inferred project", () => {
        const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile, file1, file2]);
        const service = ts.projectSystem.createProjectService(host, { useInferredProjectPerProjectRoot: true, });
        service.setHostConfiguration({ watchOptions: { excludeFiles: [file2.path] } });
        const timeoutId = host.getNextTimeoutId();
        service.setCompilerOptionsForInferredProjects({ excludeDirectories: ["node_modules"] }, ts.tscWatch.projectRoot);
        host.clearTimeout(timeoutId);
        service.openClientFile(file1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, ts.tscWatch.projectRoot);
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        const project = service.inferredProjects[0];
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path]);

        // Install module1
        host.ensureFileOrFolder(moduleFile);
        host.checkTimeoutQueueLength(0);

        service.reloadProjects();
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        assert.strictEqual(service.inferredProjects[0], project);
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path, moduleFile.path]);

        verifyFileUpdates(host, service, project);
    });

    it("external project", () => {
        const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile, file1, file2]);
        const service = ts.projectSystem.createProjectService(host);
        service.setHostConfiguration({ watchOptions: { excludeFiles: [file2.path] } });
        service.openExternalProject({
            projectFileName: `${ts.tscWatch.projectRoot}/project.sln`,
            options: { excludeDirectories: ["node_modules"] },
            rootFiles: [{ fileName: file1.path }, { fileName: file2.path }]
        });
        service.openClientFile(file1.path);
        ts.projectSystem.checkNumberOfProjects(service, { externalProjects: 1 });
        const project = service.externalProjects[0];
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path]);

        // Install module1
        host.ensureFileOrFolder(moduleFile);
        host.checkTimeoutQueueLength(0);

        service.reloadProjects();
        ts.projectSystem.checkNumberOfProjects(service, { externalProjects: 1 });
        assert.strictEqual(service.externalProjects[0], project);
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path, moduleFile.path]);

        verifyFileUpdates(host, service, project);
    });

    it("external project with config file", () => {
        const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile, file1, file2, configFile]);
        const service = ts.projectSystem.createProjectService(host);
        service.setHostConfiguration({ watchOptions: { excludeFiles: [file2.path] } });
        service.openExternalProject({
            projectFileName: `${ts.tscWatch.projectRoot}/project.sln`,
            options: { excludeDirectories: ["node_modules"] },
            rootFiles: [{ fileName: file1.path }, { fileName: file2.path }, { fileName: configFile.path }]
        });
        service.openClientFile(file1.path);
        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
        const project = service.configuredProjects.get(configFile.path)!;
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path, configFile.path]);

        // Install module1
        host.ensureFileOrFolder(moduleFile);
        host.checkTimeoutQueueLength(0);

        service.reloadProjects();
        ts.projectSystem.checkNumberOfProjects(service, { configuredProjects: 1 });
        assert.strictEqual(service.configuredProjects.get(configFile.path), project);
        ts.projectSystem.checkProjectActualFiles(project, [ts.projectSystem.libFile.path, file1.path, file2.path, configFile.path, moduleFile.path]);

        verifyFileUpdates(host, service, project);
    });
});
