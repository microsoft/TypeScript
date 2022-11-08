import * as ts from "../../_namespaces/ts";

describe("unittests:: tsserver:: searching for config file", () => {
    it("should stop at projectRootPath if given", () => {
        const f1 = {
            path: "/a/file1.ts",
            content: ""
        };
        const configFile = {
            path: "/tsconfig.json",
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([f1, configFile]);
        const service = ts.projectSystem.createProjectService(host);
        service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a");

        ts.projectSystem.checkNumberOfConfiguredProjects(service, 0);
        ts.projectSystem.checkNumberOfInferredProjects(service, 1);

        service.closeClientFile(f1.path);
        service.openClientFile(f1.path);
        ts.projectSystem.checkNumberOfConfiguredProjects(service, 1);
        ts.projectSystem.checkNumberOfInferredProjects(service, 0);
    });

    it("should use projectRootPath when searching for inferred project again", () => {
        const projectDir = "/a/b/projects/project";
        const configFileLocation = `${projectDir}/src`;
        const f1 = {
            path: `${configFileLocation}/file1.ts`,
            content: ""
        };
        const configFile = {
            path: `${configFileLocation}/tsconfig.json`,
            content: "{}"
        };
        const configFile2 = {
            path: "/a/b/projects/tsconfig.json",
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([f1, ts.projectSystem.libFile, configFile, configFile2]);
        const service = ts.projectSystem.createProjectService(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
        service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectDir);

        // Delete config file - should create inferred project and not configured project
        host.deleteFile(configFile.path);
        host.runQueuedTimeoutCallbacks();
        ts.projectSystem.checkNumberOfProjects(service, { inferredProjects: 1 });
        ts.projectSystem.baselineTsserverLogs("configFileSearch", "should use projectRootPath when searching for inferred project again", service);
    });

    it("should use projectRootPath when searching for inferred project again 2", () => {
        const projectDir = "/a/b/projects/project";
        const configFileLocation = `${projectDir}/src`;
        const f1 = {
            path: `${configFileLocation}/file1.ts`,
            content: ""
        };
        const configFile = {
            path: `${configFileLocation}/tsconfig.json`,
            content: "{}"
        };
        const configFile2 = {
            path: "/a/b/projects/tsconfig.json",
            content: "{}"
        };
        const host = ts.projectSystem.createServerHost([f1, ts.projectSystem.libFile, configFile, configFile2]);
        const service = ts.projectSystem.createProjectService(host, {
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: true,
            logger: ts.projectSystem.createLoggerWithInMemoryLogs(host),
        });
        service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectDir);

        // Delete config file - should create inferred project with project root path set
        host.deleteFile(configFile.path);
        host.runQueuedTimeoutCallbacks();
        ts.projectSystem.baselineTsserverLogs("configFileSearch", "should use projectRootPath when searching for inferred project again 2", service);
    });

    describe("when the opened file is not from project root", () => {
        const projectRoot = "/a/b/projects/project";
        const file: ts.projectSystem.File = {
            path: `${projectRoot}/src/index.ts`,
            content: "let y = 10"
        };
        const tsconfig: ts.projectSystem.File = {
            path: `${projectRoot}/tsconfig.json`,
            content: "{}"
        };
        function openClientFile(files: ts.projectSystem.File[]) {
            const host = ts.projectSystem.createServerHost(files);
            const projectService = ts.projectSystem.createProjectService(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
            projectService.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a/b/projects/proj");
            return { host, projectService };
        }

        it("tsconfig for the file exists", () => {
            const { host, projectService } = openClientFile([file, ts.projectSystem.libFile, tsconfig]);

            host.deleteFile(tsconfig.path);
            host.runQueuedTimeoutCallbacks();

            host.writeFile(tsconfig.path, tsconfig.content);
            host.runQueuedTimeoutCallbacks();

            ts.projectSystem.baselineTsserverLogs("configFileSearch", "tsconfig for the file exists", projectService);
        });

        it("tsconfig for the file does not exist", () => {
            const { host, projectService } = openClientFile([file, ts.projectSystem.libFile]);

            host.writeFile(tsconfig.path, tsconfig.content);
            host.runQueuedTimeoutCallbacks();

            host.deleteFile(tsconfig.path);
            host.runQueuedTimeoutCallbacks();

            ts.projectSystem.baselineTsserverLogs("configFileSearch", "tsconfig for the file does not exist", projectService);
        });
    });

    describe("should not search and watch config files from directories that cannot be watched", () => {
        function verifyConfigFileWatch(scenario: string, projectRootPath: string | undefined) {
            it(scenario, () => {
                const path = `/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js`;
                const host = ts.projectSystem.createServerHost([ts.projectSystem.libFile, { path, content: "const x = 10" }], { useCaseSensitiveFileNames: true });
                const service = ts.projectSystem.createProjectService(host, { logger: ts.projectSystem.createLoggerWithInMemoryLogs(host) });
                service.openClientFile(path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRootPath);
                ts.projectSystem.baselineTsserverLogs("configFileSearch", scenario, service);
            });
        }
        verifyConfigFileWatch("when projectRootPath is not present", /*projectRootPath*/ undefined);
        verifyConfigFileWatch("when projectRootPath is present but file is not from project root", "/a/b");
    });
});
