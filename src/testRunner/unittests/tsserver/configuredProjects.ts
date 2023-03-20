import * as ts from "../../_namespaces/ts";
import {
    commonFile1,
    commonFile2,
    ensureErrorFreeBuild,
} from "../tscWatch/helpers";
import {
    createServerHost,
    File,
    libFile,
    SymLink,
} from "../virtualFileSystemWithWatch";
import {
    baselineTsserverLogs,
    checkNumberOfConfiguredProjects,
    checkNumberOfInferredProjects,
    checkNumberOfProjects,
    checkProjectActualFiles,
    checkProjectRootFiles,
    configuredProjectAt,
    createLoggerWithInMemoryLogs,
    createProjectService,
    createSession,
    openFilesForSession,
    verifyGetErrRequest,
} from "./helpers";

describe("unittests:: tsserver:: ConfiguredProjects", () => {
    it("create configured project without file list", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
        };
        const file1: File = {
            path: "/a/b/c/f1.ts",
            content: "let x = 1"
        };
        const file2: File = {
            path: "/a/b/d/f2.ts",
            content: "let y = 1"
        };
        const file3: File = {
            path: "/a/b/e/f3.ts",
            content: "let z = 1"
        };

        const host = createServerHost([configFile, libFile, file1, file2, file3]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

        assert(configFileName, "should find config file");
        assert.isTrue(!configFileErrors || configFileErrors.length === 0, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);

        baselineTsserverLogs("configuredProjects", "create configured project without file list", projectService);
    });

    it("create configured project with the file list", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `
                {
                    "compilerOptions": {},
                    "include": ["*.ts"]
                }`
        };
        const file1: File = {
            path: "/a/b/f1.ts",
            content: "let x = 1"
        };
        const file2: File = {
            path: "/a/b/f2.ts",
            content: "let y = 1"
        };
        const file3: File = {
            path: "/a/b/c/f3.ts",
            content: "let z = 1"
        };

        const host = createServerHost([configFile, libFile, file1, file2, file3]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

        assert(configFileName, "should find config file");
        assert.isTrue(!configFileErrors || configFileErrors.length === 0, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);

        baselineTsserverLogs("configuredProjects", "create configured project with the file list", projectService);
    });

    it("add and then remove a config file in a folder with loose files", () => {
        const configFile: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: `{
                    "files": ["commonFile1.ts"]
                }`
        };
        const commonFile1: File = {
            path: `/user/username/projects/myproject/commonFile1.ts`,
            content: "let x = 1"
        };
        const commonFile2: File = {
            path: `/user/username/projects/myproject/commonFile2.ts`,
            content: "let y = 1"
        };

        const host = createServerHost([libFile, commonFile1, commonFile2]);

        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(commonFile1.path);
        projectService.openClientFile(commonFile2.path);

        // Add a tsconfig file
        host.writeFile(configFile.path, configFile.content);
        host.checkTimeoutQueueLengthAndRun(2); // load configured project from disk + ensureProjectsForOpenFiles

        // remove the tsconfig file
        host.deleteFile(configFile.path);
        host.checkTimeoutQueueLengthAndRun(1); // Refresh inferred projects

        baselineTsserverLogs("configuredProjects", "add and then remove a config file in a folder with loose files", projectService);
    });

    it("add new files to a configured project without file list", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{}`
        };
        const host = createServerHost([commonFile1, libFile, configFile]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(commonFile1.path);

        // add a new ts file
        host.writeFile(commonFile2.path, commonFile2.content);
        host.checkTimeoutQueueLengthAndRun(2);
        baselineTsserverLogs("configuredProjects", "add new files to a configured project without file list", projectService);
    });

    it("should ignore non-existing files specified in the config file", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
        };
        const host = createServerHost([commonFile1, commonFile2, configFile]);
        const projectService = createProjectService(host);
        projectService.openClientFile(commonFile1.path);
        projectService.openClientFile(commonFile2.path);

        checkNumberOfConfiguredProjects(projectService, 1);
        const project = configuredProjectAt(projectService, 0);
        checkProjectRootFiles(project, [commonFile1.path]);
        checkNumberOfInferredProjects(projectService, 1);
    });

    it("handle recreated files correctly", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{}`
        };
        const host = createServerHost([commonFile1, commonFile2, configFile]);
        const projectService = createProjectService(host);
        projectService.openClientFile(commonFile1.path);

        checkNumberOfConfiguredProjects(projectService, 1);
        const project = configuredProjectAt(projectService, 0);
        checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);

        // delete commonFile2
        host.deleteFile(commonFile2.path);
        host.checkTimeoutQueueLengthAndRun(2);
        checkProjectRootFiles(project, [commonFile1.path]);

        // re-add commonFile2
        host.writeFile(commonFile2.path, commonFile2.content);
        host.checkTimeoutQueueLengthAndRun(2);
        checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
    });

    it("files explicitly excluded in config file", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
        };
        const excludedFile1: File = {
            path: "/a/c/excluedFile1.ts",
            content: `let t = 1;`
        };

        const host = createServerHost([commonFile1, commonFile2, excludedFile1, configFile]);
        const projectService = createProjectService(host);

        projectService.openClientFile(commonFile1.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        const project = configuredProjectAt(projectService, 0);
        checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
        projectService.openClientFile(excludedFile1.path);
        checkNumberOfInferredProjects(projectService, 1);
    });

    it("should properly handle module resolution changes in config file", () => {
        const file1: File = {
            path: "/a/b/file1.ts",
            content: `import { T } from "module1";`
        };
        const nodeModuleFile: File = {
            path: "/a/b/node_modules/module1.ts",
            content: `export interface T {}`
        };
        const classicModuleFile: File = {
            path: "/a/module1.ts",
            content: `export interface T {}`
        };
        const randomFile: File = {
            path: "/a/file1.ts",
            content: `export interface T {}`
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
        };
        const files = [file1, nodeModuleFile, classicModuleFile, configFile, randomFile];
        const host = createServerHost(files);
        const projectService = createProjectService(host);
        projectService.openClientFile(file1.path);
        projectService.openClientFile(nodeModuleFile.path);
        projectService.openClientFile(classicModuleFile.path);

        checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });
        const project = configuredProjectAt(projectService, 0);
        const inferredProject0 = projectService.inferredProjects[0];
        checkProjectActualFiles(project, [file1.path, nodeModuleFile.path, configFile.path]);
        checkProjectActualFiles(projectService.inferredProjects[0], [classicModuleFile.path]);

        host.writeFile(configFile.path, `{
                "compilerOptions": {
                    "moduleResolution": "classic"
                },
                "files": ["${file1.path}"]
            }`);
        host.checkTimeoutQueueLengthAndRun(2);

        checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 }); // will not remove project 1
        checkProjectActualFiles(project, [file1.path, classicModuleFile.path, configFile.path]);
        assert.strictEqual(projectService.inferredProjects[0], inferredProject0);
        assert.isTrue(projectService.inferredProjects[0].isOrphan());
        const inferredProject1 = projectService.inferredProjects[1];
        checkProjectActualFiles(projectService.inferredProjects[1], [nodeModuleFile.path]);

        // Open random file and it will reuse first inferred project
        projectService.openClientFile(randomFile.path);
        checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
        checkProjectActualFiles(project, [file1.path, classicModuleFile.path, configFile.path]);
        assert.strictEqual(projectService.inferredProjects[0], inferredProject0);
        checkProjectActualFiles(projectService.inferredProjects[0], [randomFile.path]); // Reuses first inferred project
        assert.strictEqual(projectService.inferredProjects[1], inferredProject1);
        checkProjectActualFiles(projectService.inferredProjects[1], [nodeModuleFile.path]);
    });

    it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
        const file1: File = {
            path: "/a/b/main.ts",
            content: "import { objA } from './obj-a';"
        };
        const file2: File = {
            path: "/a/b/obj-a.ts",
            content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
        };
        const host = createServerHost([file1, file2, configFile]);
        const projectService = createProjectService(host);
        projectService.openClientFile(file1.path);
        projectService.closeClientFile(file1.path);
        projectService.openClientFile(file2.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        checkNumberOfInferredProjects(projectService, 0);
    });

    it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
        const file1: File = {
            path: "/a/b/main.ts",
            content: "import { objA } from './obj-a';"
        };
        const file2: File = {
            path: "/a/b/obj-a.ts",
            content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
        };
        const host = createServerHost([file1, file2, configFile]);
        const projectService = createProjectService(host);
        projectService.openClientFile(file1.path);
        projectService.closeClientFile(file1.path);
        projectService.openClientFile(file2.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        checkNumberOfInferredProjects(projectService, 0);
    });

    it("should tolerate config file errors and still try to build a project", () => {
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "target": "es6",
                        "allowAnything": true
                    },
                    "someOtherProperty": {}
                }`
        };
        const host = createServerHost([commonFile1, commonFile2, libFile, configFile]);
        const projectService = createProjectService(host);
        projectService.openClientFile(commonFile1.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        checkProjectRootFiles(configuredProjectAt(projectService, 0), [commonFile1.path, commonFile2.path]);
    });

    it("should reuse same project if file is opened from the configured project that has no open files", () => {
        const file1 = {
            path: "/a/b/main.ts",
            content: "let x =1;"
        };
        const file2 = {
            path: "/a/b/main2.ts",
            content: "let y =1;"
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts", "main2.ts" ]
                }`
        };
        const host = createServerHost([file1, file2, configFile, libFile]);
        const projectService = createProjectService(host, { useSingleInferredProject: true });
        projectService.openClientFile(file1.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        const project = projectService.configuredProjects.get(configFile.path)!;
        assert.isTrue(project.hasOpenRef()); // file1

        projectService.closeClientFile(file1.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
        assert.isFalse(project.hasOpenRef()); // No open files
        assert.isFalse(project.isClosed());

        projectService.openClientFile(file2.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
        assert.isTrue(project.hasOpenRef()); // file2
        assert.isFalse(project.isClosed());
    });

    it("should not close configured project after closing last open file, but should be closed on next file open if its not the file from same project", () => {
        const file1 = {
            path: "/a/b/main.ts",
            content: "let x =1;"
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
        };
        const host = createServerHost([file1, configFile, libFile]);
        const projectService = createProjectService(host, { useSingleInferredProject: true });
        projectService.openClientFile(file1.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        const project = projectService.configuredProjects.get(configFile.path)!;
        assert.isTrue(project.hasOpenRef()); // file1

        projectService.closeClientFile(file1.path);
        checkNumberOfConfiguredProjects(projectService, 1);
        assert.strictEqual(projectService.configuredProjects.get(configFile.path), project);
        assert.isFalse(project.hasOpenRef()); // No files
        assert.isFalse(project.isClosed());

        projectService.openClientFile(libFile.path);
        checkNumberOfConfiguredProjects(projectService, 0);
        assert.isFalse(project.hasOpenRef()); // No files + project closed
        assert.isTrue(project.isClosed());
    });

    it("open file become a part of configured project if it is referenced from root file", () => {
        const file1 = {
            path: `/user/username/projects/myproject/a/b/f1.ts`,
            content: "export let x = 5"
        };
        const file2 = {
            path: `/user/username/projects/myproject/a/c/f2.ts`,
            content: `import {x} from "../b/f1"`
        };
        const file3 = {
            path: `/user/username/projects/myproject/a/c/f3.ts`,
            content: "export let y = 1"
        };
        const configFile = {
            path: `/user/username/projects/myproject/a/c/tsconfig.json`,
            content: JSON.stringify({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] })
        };

        const host = createServerHost([file1, file2, file3]);
        const projectService = createProjectService(host);

        projectService.openClientFile(file1.path);
        checkNumberOfProjects(projectService, { inferredProjects: 1 });
        checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);

        projectService.openClientFile(file3.path);
        checkNumberOfProjects(projectService, { inferredProjects: 2 });
        checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
        checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

        host.writeFile(configFile.path, configFile.content);
        host.checkTimeoutQueueLengthAndRun(2); // load configured project from disk + ensureProjectsForOpenFiles
        checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
        checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, file3.path, configFile.path]);
        assert.isTrue(projectService.inferredProjects[0].isOrphan());
        assert.isTrue(projectService.inferredProjects[1].isOrphan());
    });

    it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1"
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y = 1"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: {} })
        };

        const host = createServerHost([file1, configFile]);
        const projectService = createProjectService(host);

        projectService.openClientFile(file1.path);
        checkNumberOfProjects(projectService, { configuredProjects: 1 });
        checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, configFile.path]);

        host.writeFile(file2.path, file2.content);

        host.checkTimeoutQueueLengthAndRun(2);

        checkNumberOfProjects(projectService, { configuredProjects: 1 });
        checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
    });

    it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1"
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y = 1"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts"] })
        };

        const host = createServerHost([file1, file2, configFile]);
        const projectService = createProjectService(host);

        projectService.openClientFile(file1.path);
        checkNumberOfProjects(projectService, { configuredProjects: 1 });
        checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, configFile.path]);

        host.writeFile(configFile.path, JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] }));

        checkNumberOfProjects(projectService, { configuredProjects: 1 });
        host.checkTimeoutQueueLengthAndRun(2);
        checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
    });

    it("can update configured project when set of root files was not changed", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x = 1"
        };
        const file2 = {
            path: "/a/b/f2.ts",
            content: "let y = 1"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
        };

        const host = createServerHost([file1, file2, configFile]);
        const projectService = createProjectService(host);

        projectService.openClientFile(file1.path);
        checkNumberOfProjects(projectService, { configuredProjects: 1 });
        checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, configFile.path]);

        host.writeFile(configFile.path, JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] }));

        checkNumberOfProjects(projectService, { configuredProjects: 1 });
        checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
    });

    it("Open ref of configured project when open file gets added to the project as part of configured file update", () => {
        const file1: File = {
            path: "/a/b/src/file1.ts",
            content: "let x = 1;"
        };
        const file2: File = {
            path: "/a/b/src/file2.ts",
            content: "let y = 1;"
        };
        const file3: File = {
            path: "/a/b/file3.ts",
            content: "let z = 1;"
        };
        const file4: File = {
            path: "/a/file4.ts",
            content: "let z = 1;"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ files: ["src/file1.ts", "file3.ts"] })
        };

        const files = [file1, file2, file3, file4];
        const host = createServerHost(files.concat(configFile));
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);
        projectService.openClientFile(file2.path);
        projectService.openClientFile(file3.path);
        projectService.openClientFile(file4.path);

        const configProject1 = projectService.configuredProjects.get(configFile.path)!;
        assert.isTrue(configProject1.hasOpenRef()); // file1 and file3

        host.writeFile(configFile.path, "{}");
        host.runQueuedTimeoutCallbacks();

        assert.isTrue(configProject1.hasOpenRef()); // file1, file2, file3
        assert.isTrue(projectService.inferredProjects[0].isOrphan());

        projectService.closeClientFile(file1.path);
        projectService.closeClientFile(file2.path);
        projectService.closeClientFile(file4.path);

        assert.isTrue(configProject1.hasOpenRef()); // file3
        assert.isTrue(projectService.inferredProjects[0].isOrphan());
        assert.isTrue(projectService.inferredProjects[1].isOrphan());

        projectService.openClientFile(file4.path);
        assert.isTrue(configProject1.hasOpenRef()); // file3
        const inferredProject4 = projectService.inferredProjects[0];
        checkProjectActualFiles(inferredProject4, [file4.path]);

        projectService.closeClientFile(file3.path);
        assert.isFalse(configProject1.hasOpenRef()); // No open files
        const inferredProject5 = projectService.inferredProjects[0];
        checkProjectActualFiles(inferredProject4, [file4.path]);
        assert.strictEqual(inferredProject5, inferredProject4);

        const file5: File = {
            path: "/file5.ts",
            content: "let zz = 1;"
        };
        host.writeFile(file5.path, file5.content);
        projectService.testhost.baselineHost("File5 written");
        projectService.openClientFile(file5.path);

        baselineTsserverLogs("configuredProjects", "Open ref of configured project when open file gets added to the project as part of configured file update", projectService);
    });

    it("Open ref of configured project when open file gets added to the project as part of configured file update buts its open file references are all closed when the update happens", () => {
        const file1: File = {
            path: "/a/b/src/file1.ts",
            content: "let x = 1;"
        };
        const file2: File = {
            path: "/a/b/src/file2.ts",
            content: "let y = 1;"
        };
        const file3: File = {
            path: "/a/b/file3.ts",
            content: "let z = 1;"
        };
        const file4: File = {
            path: "/a/file4.ts",
            content: "let z = 1;"
        };
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ files: ["src/file1.ts", "file3.ts"] })
        };

        const files = [file1, file2, file3];
        const hostFiles = files.concat(file4, configFile);
        const host = createServerHost(hostFiles);
        const projectService = createProjectService(host);

        projectService.openClientFile(file1.path);
        projectService.openClientFile(file2.path);
        projectService.openClientFile(file3.path);

        checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });
        const configuredProject = projectService.configuredProjects.get(configFile.path)!;
        assert.isTrue(configuredProject.hasOpenRef()); // file1 and file3
        checkProjectActualFiles(configuredProject, [file1.path, file3.path, configFile.path]);
        const inferredProject1 = projectService.inferredProjects[0];
        checkProjectActualFiles(inferredProject1, [file2.path]);

        projectService.closeClientFile(file1.path);
        projectService.closeClientFile(file3.path);
        assert.isFalse(configuredProject.hasOpenRef()); // No files

        host.writeFile(configFile.path, "{}");
        // Time out is not yet run so there is project update pending
        assert.isTrue(configuredProject.hasOpenRef()); // Pending update and file2 might get into the project

        projectService.openClientFile(file4.path);

        checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
        assert.strictEqual(projectService.configuredProjects.get(configFile.path), configuredProject);
        assert.isTrue(configuredProject.hasOpenRef()); // Pending update and F2 might get into the project
        assert.strictEqual(projectService.inferredProjects[0], inferredProject1);
        const inferredProject2 = projectService.inferredProjects[1];
        checkProjectActualFiles(inferredProject2, [file4.path]);

        host.runQueuedTimeoutCallbacks();
        checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 2 });
        assert.strictEqual(projectService.configuredProjects.get(configFile.path), configuredProject);
        assert.isTrue(configuredProject.hasOpenRef()); // file2
        checkProjectActualFiles(configuredProject, [file1.path, file2.path, file3.path, configFile.path]);
        assert.strictEqual(projectService.inferredProjects[0], inferredProject1);
        assert.isTrue(inferredProject1.isOrphan());
        assert.strictEqual(projectService.inferredProjects[1], inferredProject2);
        checkProjectActualFiles(inferredProject2, [file4.path]);
    });

    it("files are properly detached when language service is disabled", () => {
        const f1 = {
            path: "/a/app.js",
            content: "var x = 1"
        };
        const f2 = {
            path: "/a/largefile.js",
            content: ""
        };
        const f3 = {
            path: "/a/lib.js",
            content: "var x = 1"
        };
        const config = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({ compilerOptions: { allowJs: true } })
        };
        const host = createServerHost([f1, f2, f3, config]);
        const originalGetFileSize = host.getFileSize;
        host.getFileSize = (filePath: string) =>
            filePath === f2.path ? ts.server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

        const projectService = createProjectService(host);
        projectService.openClientFile(f1.path);
        projectService.checkNumberOfProjects({ configuredProjects: 1 });
        const project = projectService.configuredProjects.get(config.path)!;
        assert.isTrue(project.hasOpenRef()); // f1
        assert.isFalse(project.isClosed());

        projectService.closeClientFile(f1.path);
        projectService.checkNumberOfProjects({ configuredProjects: 1 });
        assert.strictEqual(projectService.configuredProjects.get(config.path), project);
        assert.isFalse(project.hasOpenRef()); // No files
        assert.isFalse(project.isClosed());

        for (const f of [f1, f2, f3]) {
            // All the script infos should be present and contain the project since it is still alive.
            const scriptInfo = projectService.getScriptInfoForNormalizedPath(ts.server.toNormalizedPath(f.path))!;
            assert.equal(scriptInfo.containingProjects.length, 1, `expect 1 containing projects for '${f.path}'`);
            assert.equal(scriptInfo.containingProjects[0], project, `expect configured project to be the only containing project for '${f.path}'`);
        }

        const f4 = {
            path: "/aa.js",
            content: "var x = 1"
        };
        host.writeFile(f4.path, f4.content);
        projectService.openClientFile(f4.path);
        projectService.checkNumberOfProjects({ inferredProjects: 1 });
        assert.isFalse(project.hasOpenRef()); // No files
        assert.isTrue(project.isClosed());

        for (const f of [f1, f2, f3]) {
            // All the script infos should not be present since the project is closed and orphan script infos are collected
            assert.isUndefined(projectService.getScriptInfoForNormalizedPath(ts.server.toNormalizedPath(f.path)));
        }
    });

    it("syntactic features work even if language service is disabled", () => {
        const f1 = {
            path: "/a/app.js",
            content: "let x =   1;"
        };
        const f2 = {
            path: "/a/largefile.js",
            content: ""
        };
        const config = {
            path: "/a/jsconfig.json",
            content: "{}"
        };
        const host = createServerHost([f1, f2, config]);
        const originalGetFileSize = host.getFileSize;
        host.getFileSize = (filePath: string) =>
            filePath === f2.path ? ts.server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        session.executeCommand({
            seq: 0,
            type: "request",
            command: "open",
            arguments: { file: f1.path }
        } as ts.server.protocol.OpenRequest);
        session.logger.log(`Language languageServiceEnabled:: ${session.getProjectService().configuredProjects.get(config.path)!.languageServiceEnabled}`);

        session.executeCommandSeq({
            command: ts.server.protocol.CommandTypes.FormatFull,
            arguments: {
                file: f1.path,
            }
        });
        baselineTsserverLogs("configuredProjects", "syntactic features work even if language service is disabled", session);
    });

    it("when multiple projects are open, detects correct default project", () => {
        const barConfig: File = {
            path: `/user/username/projects/myproject/bar/tsconfig.json`,
            content: JSON.stringify({
                include: ["index.ts"],
                compilerOptions: {
                    lib: ["dom", "es2017"]
                }
            })
        };
        const barIndex: File = {
            path: `/user/username/projects/myproject/bar/index.ts`,
            content: `
export function bar() {
  console.log("hello world");
}`
        };
        const fooConfig: File = {
            path: `/user/username/projects/myproject/foo/tsconfig.json`,
            content: JSON.stringify({
                include: ["index.ts"],
                compilerOptions: {
                    lib: ["es2017"]
                }
            })
        };
        const fooIndex: File = {
            path: `/user/username/projects/myproject/foo/index.ts`,
            content: `
import { bar } from "bar";
bar();`
        };
        const barSymLink: SymLink = {
            path: `/user/username/projects/myproject/foo/node_modules/bar`,
            symLink: `/user/username/projects/myproject/bar`
        };

        const lib2017: File = {
            path: `${ts.getDirectoryPath(libFile.path)}/lib.es2017.d.ts`,
            content: libFile.content
        };
        const libDom: File = {
            path: `${ts.getDirectoryPath(libFile.path)}/lib.dom.d.ts`,
            content: `
declare var console: {
    log(...args: any[]): void;
};`
        };
        const host = createServerHost([barConfig, barIndex, fooConfig, fooIndex, barSymLink, lib2017, libDom]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        openFilesForSession([fooIndex, barIndex], session);
        verifyGetErrRequest({ session, host, files: [barIndex, fooIndex] });
        baselineTsserverLogs("configuredProjects", "when multiple projects are open detects correct default project", session);
    });

    it("when file name starts with ^", () => {
        const file: File = {
            path: `/user/username/projects/myproject/file.ts`,
            content: "const x = 10;"
        };
        const app: File = {
            path: `/user/username/projects/myproject/^app.ts`,
            content: "const y = 10;"
        };
        const tsconfig: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}"
        };
        const host = createServerHost([file, app, tsconfig, libFile]);
        const service = createProjectService(host);
        service.openClientFile(file.path);
    });

    describe("when creating new file", () => {
        const foo: File = {
            path: `/user/username/projects/myproject/src/foo.ts`,
            content: "export function foo() { }"
        };
        const bar: File = {
            path: `/user/username/projects/myproject/src/bar.ts`,
            content: "export function bar() { }"
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: JSON.stringify({
                include: ["./src"]
            })
        };
        const fooBar: File = {
            path: `/user/username/projects/myproject/src/sub/fooBar.ts`,
            content: "export function fooBar() { }"
        };
        function verifySessionWorker({ withExclude, openFileBeforeCreating }: VerifySession, errorOnNewFileBeforeOldFile: boolean) {
            const host = createServerHost([
                foo, bar, libFile, { path: `/user/username/projects/myproject/src/sub` },
                withExclude ?
                    {
                        path: config.path,
                        content: JSON.stringify({
                            include: ["./src"],
                            exclude: ["./src/sub"]
                        })
                    } :
                    config
            ]);
            const session = createSession(host, {
                canUseEvents: true,
                logger: createLoggerWithInMemoryLogs(host),
            });
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: foo.path,
                    fileContent: foo.content,
                    projectRootPath: "/user/username/projects/myproject"
                }
            });
            if (!openFileBeforeCreating) {
                host.writeFile(fooBar.path, fooBar.content);
            }
            session.executeCommandSeq<ts.server.protocol.OpenRequest>({
                command: ts.server.protocol.CommandTypes.Open,
                arguments: {
                    file: fooBar.path,
                    fileContent: fooBar.content,
                    projectRootPath: "/user/username/projects/myproject"
                }
            });
            if (openFileBeforeCreating) {
                host.writeFile(fooBar.path, fooBar.content);
            }
            verifyGetErrRequest({
                session,
                host,
                files: errorOnNewFileBeforeOldFile ?
                    [fooBar, foo] :
                    [foo, fooBar],
                existingTimeouts: withExclude ? 0 : 2
            });
            baselineTsserverLogs("configuredProjects", `creating new file and then open it ${openFileBeforeCreating ? "before" : "after"} watcher is invoked, ask errors on it ${errorOnNewFileBeforeOldFile ? "before" : "after"} old one${withExclude ? " without file being in config" : ""}`, session);
        }
        interface VerifySession {
            withExclude?: boolean;
            openFileBeforeCreating: boolean;
        }
        function verifySession(input: VerifySession) {
            it("when error on new file are asked before old one", () => {
                verifySessionWorker(input, /*errorOnNewFileBeforeOldFile*/ true);
            });

            it("when error on new file are asked after old one", () => {
                verifySessionWorker(input, /*errorOnNewFileBeforeOldFile*/ false);
            });
        }
        describe("when new file creation directory watcher is invoked before file is opened in editor", () => {
            verifySession({
                openFileBeforeCreating: false,
            });
            describe("when new file is excluded from config", () => {
                verifySession({
                    withExclude: true,
                    openFileBeforeCreating: false,
                });
            });
        });

        describe("when new file creation directory watcher is invoked after file is opened in editor", () => {
            verifySession({
                openFileBeforeCreating: true,
            });
            describe("when new file is excluded from config", () => {
                verifySession({
                    withExclude: true,
                    openFileBeforeCreating: true,
                });
            });
        });
    });

    it("when default configured project does not contain the file", () => {
        const barConfig: File = {
            path: `/user/username/projects/myproject/bar/tsconfig.json`,
            content: "{}"
        };
        const barIndex: File = {
            path: `/user/username/projects/myproject/bar/index.ts`,
            content: `import {foo} from "../foo/lib";
foo();`
        };
        const fooBarConfig: File = {
            path: `/user/username/projects/myproject/foobar/tsconfig.json`,
            content: barConfig.path
        };
        const fooBarIndex: File = {
            path: `/user/username/projects/myproject/foobar/index.ts`,
            content: barIndex.content
        };
        const fooConfig: File = {
            path: `/user/username/projects/myproject/foo/tsconfig.json`,
            content: JSON.stringify({
                include: ["index.ts"],
                compilerOptions: {
                    declaration: true,
                    outDir: "lib"
                }
            })
        };
        const fooIndex: File = {
            path: `/user/username/projects/myproject/foo/index.ts`,
            content: `export function foo() {}`
        };
        const host = createServerHost([barConfig, barIndex, fooBarConfig, fooBarIndex, fooConfig, fooIndex, libFile]);
        ensureErrorFreeBuild(host, [fooConfig.path]);
        const fooDts = `/user/username/projects/myproject/foo/lib/index.d.ts`;
        assert.isTrue(host.fileExists(fooDts));
        const session = createSession(host);
        const service = session.getProjectService();
        service.openClientFile(barIndex.path);
        checkProjectActualFiles(service.configuredProjects.get(barConfig.path)!, [barIndex.path, fooDts, libFile.path, barConfig.path]);
        service.openClientFile(fooBarIndex.path);
        checkProjectActualFiles(service.configuredProjects.get(fooBarConfig.path)!, [fooBarIndex.path, fooDts, libFile.path, fooBarConfig.path]);
        service.openClientFile(fooIndex.path);
        checkProjectActualFiles(service.configuredProjects.get(fooConfig.path)!, [fooIndex.path, libFile.path, fooConfig.path]);
        service.openClientFile(fooDts);
        session.executeCommandSeq<ts.server.protocol.GetApplicableRefactorsRequest>({
            command: ts.server.protocol.CommandTypes.GetApplicableRefactors,
            arguments: {
                file: fooDts,
                startLine: 1,
                startOffset: 1,
                endLine: 1,
                endOffset: 1
            }
        });
        assert.equal(service.tryGetDefaultProjectForFile(ts.server.toNormalizedPath(fooDts)), service.configuredProjects.get(barConfig.path));
    });

    describe("watches extended config files", () => {
        function getService(additionalFiles?: File[]) {
            const alphaExtendedConfig: File = {
                path: `/user/username/projects/myproject/extended/alpha.tsconfig.json`,
                content: "{}"
            };
            const bravoExtendedConfig: File = {
                path: `/user/username/projects/myproject/extended/bravo.tsconfig.json`,
                content: JSON.stringify({
                    extends: "./alpha.tsconfig.json"
                })
            };
            const aConfig: File = {
                path: `/user/username/projects/myproject/a/tsconfig.json`,
                content: JSON.stringify({
                    extends: "../extended/alpha.tsconfig.json",
                    files: ["a.ts"]
                })
            };
            const aFile: File = {
                path: `/user/username/projects/myproject/a/a.ts`,
                content: `let a = 1;`
            };
            const bConfig: File = {
                path: `/user/username/projects/myproject/b/tsconfig.json`,
                content: JSON.stringify({
                    extends: "../extended/bravo.tsconfig.json",
                    files: ["b.ts"]
                })
            };
            const bFile: File = {
                path: `/user/username/projects/myproject/b/b.ts`,
                content: `let b = 1;`
            };

            const host = createServerHost([alphaExtendedConfig, aConfig, aFile, bravoExtendedConfig, bConfig, bFile, ...(additionalFiles || ts.emptyArray)]);
            const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
            return { host, projectService, aFile, bFile, aConfig, bConfig, alphaExtendedConfig, bravoExtendedConfig };
        }

        it("should watch the extended configs of multiple projects", () => {
            const { host, projectService, aFile, bFile, bConfig, alphaExtendedConfig, bravoExtendedConfig } = getService();

            projectService.openClientFile(aFile.path);
            projectService.openClientFile(bFile.path);

            host.writeFile(alphaExtendedConfig.path, JSON.stringify({
                compilerOptions: {
                    strict: true
                }
            }));
            host.checkTimeoutQueueLengthAndRun(3);

            host.writeFile(bravoExtendedConfig.path, JSON.stringify({
                extends: "./alpha.tsconfig.json",
                compilerOptions: {
                    strict: false
                }
            }));
            host.checkTimeoutQueueLengthAndRun(2);

            host.writeFile(bConfig.path, JSON.stringify({
                extends: "../extended/alpha.tsconfig.json",
            }));
            host.checkTimeoutQueueLengthAndRun(2);

            host.writeFile(alphaExtendedConfig.path, "{}");
            host.checkTimeoutQueueLengthAndRun(3);
            baselineTsserverLogs("configuredProjects", "should watch the extended configs of multiple projects", projectService);
        });

        it("should stop watching the extended configs of closed projects", () => {
            const dummy: File = {
                path: `/user/username/projects/myproject/dummy/dummy.ts`,
                content: `let dummy = 1;`
            };
            const dummyConfig: File = {
                path: `/user/username/projects/myproject/dummy/tsconfig.json`,
                content: "{}"
            };
            const { projectService, aFile, bFile } = getService([dummy, dummyConfig]);

            projectService.openClientFile(aFile.path);
            projectService.openClientFile(bFile.path);
            projectService.openClientFile(dummy.path);

            projectService.closeClientFile(bFile.path);
            projectService.closeClientFile(dummy.path);
            projectService.openClientFile(dummy.path);


            projectService.closeClientFile(aFile.path);
            projectService.closeClientFile(dummy.path);
            projectService.openClientFile(dummy.path);
            baselineTsserverLogs("configuredProjects", "should stop watching the extended configs of closed projects", projectService);
        });
    });
});

describe("unittests:: tsserver:: ConfiguredProjects:: non-existing directories listed in config file input array", () => {
    it("should be tolerated without crashing the server", () => {
        const configFile = {
            path: "/a/b/tsconfig.json",
            content: `{
                    "compilerOptions": {},
                    "include": ["app/*", "test/**/*", "something"]
                }`
        };
        const file1 = {
            path: "/a/b/file1.ts",
            content: "let t = 10;"
        };

        const host = createServerHost([file1, configFile]);
        const projectService = createProjectService(host);
        projectService.openClientFile(file1.path);
        host.runQueuedTimeoutCallbacks();

        // Since file1 refers to config file as the default project, it needs to be kept alive
        checkNumberOfProjects(projectService, { inferredProjects: 1, configuredProjects: 1 });
        const inferredProject = projectService.inferredProjects[0];
        assert.isTrue(inferredProject.containsFile(file1.path as ts.server.NormalizedPath));
        assert.isFalse(projectService.configuredProjects.get(configFile.path)!.containsFile(file1.path as ts.server.NormalizedPath));
    });

    it("should be able to handle @types if input file list is empty", () => {
        const f = {
            path: "/a/app.ts",
            content: "let x = 1"
        };
        const config = {
            path: "/a/tsconfig.json",
            content: JSON.stringify({
                compiler: {},
                files: []
            })
        };
        const t1 = {
            path: "/a/node_modules/@types/typings/index.d.ts",
            content: `export * from "./lib"`
        };
        const t2 = {
            path: "/a/node_modules/@types/typings/lib.d.ts",
            content: `export const x: number`
        };
        const host = createServerHost([f, config, t1, t2], { currentDirectory: ts.getDirectoryPath(f.path) });
        const projectService = createProjectService(host);

        projectService.openClientFile(f.path);
        // Since f refers to config file as the default project, it needs to be kept alive
        projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
    });

    it("should tolerate invalid include files that start in subDirectory", () => {
        const f = {
            path: `/user/username/projects/myproject/src/server/index.ts`,
            content: "let x = 1"
        };
        const config = {
            path: `/user/username/projects/myproject/src/server/tsconfig.json`,
            content: JSON.stringify({
                compiler: {
                    module: "commonjs",
                    outDir: "../../build"
                },
                include: [
                    "../src/**/*.ts"
                ]
            })
        };
        const host = createServerHost([f, config, libFile], { useCaseSensitiveFileNames: true });
        const projectService = createProjectService(host);

        projectService.openClientFile(f.path);
        // Since f refers to config file as the default project, it needs to be kept alive
        projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
    });

    it("Changed module resolution reflected when specifying files list", () => {
        const file1: File = {
            path: "/a/b/file1.ts",
            content: 'import classc from "file2"'
        };
        const file2a: File = {
            path: "/a/file2.ts",
            content: "export classc { method2a() { return 10; } }"
        };
        const file2: File = {
            path: "/a/b/file2.ts",
            content: "export classc { method2() { return 10; } }"
        };
        const configFile: File = {
            path: "/a/b/tsconfig.json",
            content: JSON.stringify({ files: [file1.path], compilerOptions: { module: "amd" } })
        };
        const files = [file1, file2a, configFile, libFile];
        const host = createServerHost(files);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(file1.path);

        host.writeFile(file2.path, file2.content);
        host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
        host.runQueuedTimeoutCallbacks(); // Actual update

        // On next file open the files file2a should be closed and not watched any more
        projectService.openClientFile(file2.path);
        baselineTsserverLogs("configuredProjects", "changed module resolution reflected when specifying files list", projectService);
    });

    it("Failed lookup locations uses parent most node_modules directory", () => {
        const root = "/user/username/rootfolder";
        const file1: File = {
            path: "/a/b/src/file1.ts",
            content: 'import { classc } from "module1"'
        };
        const module1: File = {
            path: "/a/b/node_modules/module1/index.d.ts",
            content: `import { class2 } from "module2";
                          export classc { method2a(): class2; }`
        };
        const module2: File = {
            path: "/a/b/node_modules/module2/index.d.ts",
            content: "export class2 { method2() { return 10; } }"
        };
        const module3: File = {
            path: "/a/b/node_modules/module/node_modules/module3/index.d.ts",
            content: "export class3 { method2() { return 10; } }"
        };
        const configFile: File = {
            path: "/a/b/src/tsconfig.json",
            content: JSON.stringify({ files: ["file1.ts"] })
        };
        const nonLibFiles = [file1, module1, module2, module3, configFile];
        nonLibFiles.forEach(f => f.path = root + f.path);
        const files = nonLibFiles.concat(libFile);
        const host = createServerHost(files);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(file1.path);
        baselineTsserverLogs("configuredProjects", "failed lookup locations uses parent most node_modules directory", projectService);
    });
});

describe("unittests:: tsserver:: ConfiguredProjects:: when reading tsconfig file fails", () => {
    it("should be tolerated without crashing the server", () => {
        const configFile = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: ""
        };
        const file1 = {
            path: `/user/username/projects/myproject/file1.ts`,
            content: "let t = 10;"
        };

        const host = createServerHost([file1, libFile, configFile]);
        const session = createSession(host, { canUseEvents: true, logger: createLoggerWithInMemoryLogs(host) });
        const originalReadFile = host.readFile;
        host.readFile = f => {
            return f === configFile.path ?
                undefined :
                originalReadFile.call(host, f);
        };
        openFilesForSession([file1], session);

        baselineTsserverLogs("configuredProjects", "should be tolerated without crashing the server", session);
    });
});
