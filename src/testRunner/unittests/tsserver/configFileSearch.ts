import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import {
    baselineTsserverLogs,
    createProjectService,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: configFileSearch:: searching for config file", () => {
    it("should stop at projectRootPath if given", () => {
        const f1 = {
            path: "/a/file1.ts",
            content: ""
        };
        const configFile = {
            path: "/tsconfig.json",
            content: "{}"
        };
        const host = createServerHost([f1, configFile]);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a");

        service.closeClientFile(f1.path);
        service.openClientFile(f1.path);
        baselineTsserverLogs("configFileSerach", "should stop at projectRootPath if given", service);
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
        const host = createServerHost([f1, libFile, configFile, configFile2]);
        const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectDir);

        // Delete config file - should create inferred project and not configured project
        host.deleteFile(configFile.path);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configFileSearch", "should use projectRootPath when searching for inferred project again", service);
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
        const host = createServerHost([f1, libFile, configFile, configFile2]);
        const service = createProjectService(host, {
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: true,
            logger: createLoggerWithInMemoryLogs(host),
        });
        service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectDir);

        // Delete config file - should create inferred project with project root path set
        host.deleteFile(configFile.path);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configFileSearch", "should use projectRootPath when searching for inferred project again 2", service);
    });

    describe("when the opened file is not from project root", () => {
        const projectRoot = "/a/b/projects/project";
        const file: File = {
            path: `${projectRoot}/src/index.ts`,
            content: "let y = 10"
        };
        const tsconfig: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: "{}"
        };
        function openClientFile(files: File[]) {
            const host = createServerHost(files);
            const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            projectService.openClientFile(file.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a/b/projects/proj");
            return { host, projectService };
        }

        it("tsconfig for the file exists", () => {
            const { host, projectService } = openClientFile([file, libFile, tsconfig]);

            host.deleteFile(tsconfig.path);
            host.runQueuedTimeoutCallbacks();

            host.writeFile(tsconfig.path, tsconfig.content);
            host.runQueuedTimeoutCallbacks();

            baselineTsserverLogs("configFileSearch", "tsconfig for the file exists", projectService);
        });

        it("tsconfig for the file does not exist", () => {
            const { host, projectService } = openClientFile([file, libFile]);

            host.writeFile(tsconfig.path, tsconfig.content);
            host.runQueuedTimeoutCallbacks();

            host.deleteFile(tsconfig.path);
            host.runQueuedTimeoutCallbacks();

            baselineTsserverLogs("configFileSearch", "tsconfig for the file does not exist", projectService);
        });
    });

    describe("should not search and watch config files from directories that cannot be watched", () => {
        function verifyConfigFileWatch(scenario: string, projectRootPath: string | undefined) {
            it(scenario, () => {
                const path = `/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js`;
                const host = createServerHost([libFile, { path, content: "const x = 10" }], { useCaseSensitiveFileNames: true });
                const service = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
                service.openClientFile(path, /*fileContent*/ undefined, /*scriptKind*/ undefined, projectRootPath);
                baselineTsserverLogs("configFileSearch", scenario, service);
            });
        }
        verifyConfigFileWatch("when projectRootPath is not present", /*projectRootPath*/ undefined);
        verifyConfigFileWatch("when projectRootPath is present but file is not from project root", "/a/b");
    });
});
