import {
    baselineTsserverLogs,
    closeFilesForSession,
    openFilesForSession,
    TestSession,
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
            content: "",
        };
        const configFile = {
            path: "/tsconfig.json",
            content: "{}",
        };
        const host = createServerHost([f1, configFile]);
        const session = new TestSession(host);
        openFilesForSession([{ file: f1, projectRootPath: "/a" }], session);

        closeFilesForSession([f1], session);
        openFilesForSession([f1], session);
        baselineTsserverLogs("configFileSearch", "should stop at projectRootPath if given", session);
    });

    it("should use projectRootPath when searching for inferred project again", () => {
        const projectRootPath = "/a/b/projects/project";
        const configFileLocation = `${projectRootPath}/src`;
        const f1 = {
            path: `${configFileLocation}/file1.ts`,
            content: "",
        };
        const configFile = {
            path: `${configFileLocation}/tsconfig.json`,
            content: "{}",
        };
        const configFile2 = {
            path: "/a/b/projects/tsconfig.json",
            content: "{}",
        };
        const host = createServerHost([f1, libFile, configFile, configFile2]);
        const session = new TestSession(host);
        openFilesForSession([{ file: f1, projectRootPath }], session);

        // Delete config file - should create inferred project and not configured project
        host.deleteFile(configFile.path);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configFileSearch", "should use projectRootPath when searching for inferred project again", session);
    });

    it("should use projectRootPath when searching for inferred project again 2", () => {
        const projectRootPath = "/a/b/projects/project";
        const configFileLocation = `${projectRootPath}/src`;
        const f1 = {
            path: `${configFileLocation}/file1.ts`,
            content: "",
        };
        const configFile = {
            path: `${configFileLocation}/tsconfig.json`,
            content: "{}",
        };
        const configFile2 = {
            path: "/a/b/projects/tsconfig.json",
            content: "{}",
        };
        const host = createServerHost([f1, libFile, configFile, configFile2]);
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: true,
        });
        openFilesForSession([{ file: f1, projectRootPath }], session);

        // Delete config file - should create inferred project with project root path set
        host.deleteFile(configFile.path);
        host.runQueuedTimeoutCallbacks();
        baselineTsserverLogs("configFileSearch", "should use projectRootPath when searching for inferred project again 2", session);
    });

    describe("when the opened file is not from project root", () => {
        const projectRoot = "/a/b/projects/project";
        const file: File = {
            path: `${projectRoot}/src/index.ts`,
            content: "let y = 10",
        };
        const tsconfig: File = {
            path: `${projectRoot}/tsconfig.json`,
            content: "{}",
        };
        function openClientFile(files: File[]) {
            const host = createServerHost(files);
            const session = new TestSession(host);
            openFilesForSession([{ file, projectRootPath: "/a/b/projects/proj" }], session);
            return { host, session };
        }

        it("tsconfig for the file exists", () => {
            const { host, session } = openClientFile([file, libFile, tsconfig]);

            host.deleteFile(tsconfig.path);
            host.runQueuedTimeoutCallbacks();

            host.writeFile(tsconfig.path, tsconfig.content);
            host.runQueuedTimeoutCallbacks();

            baselineTsserverLogs("configFileSearch", "tsconfig for the file exists", session);
        });

        it("tsconfig for the file does not exist", () => {
            const { host, session } = openClientFile([file, libFile]);

            host.writeFile(tsconfig.path, tsconfig.content);
            host.runQueuedTimeoutCallbacks();

            host.deleteFile(tsconfig.path);
            host.runQueuedTimeoutCallbacks();

            baselineTsserverLogs("configFileSearch", "tsconfig for the file does not exist", session);
        });
    });

    describe("should not search and watch config files from directories that cannot be watched", () => {
        function verifyConfigFileWatch(scenario: string, projectRootPath: string | undefined) {
            it(scenario, () => {
                const path = `/root/teams/VSCode68/Shared Documents/General/jt-ts-test-workspace/x.js`;
                const host = createServerHost([libFile, { path, content: "const x = 10" }], { useCaseSensitiveFileNames: true });
                const session = new TestSession(host);
                openFilesForSession([{ file: path, projectRootPath }], session);
                baselineTsserverLogs("configFileSearch", scenario, session);
            });
        }
        verifyConfigFileWatch("when projectRootPath is not present", /*projectRootPath*/ undefined);
        verifyConfigFileWatch("when projectRootPath is present but file is not from project root", "/a/b");
    });
});
