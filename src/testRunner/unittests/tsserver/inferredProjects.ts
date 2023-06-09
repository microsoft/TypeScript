import { createLoggerWithInMemoryLogs } from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import { commonFile1 } from "../helpers/tscWatch";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createProjectService,
    createSession,
    logInferredProjectsOrphanStatus,
    openFilesForSession,
    setCompilerOptionsForInferredProjectsRequestForSession,
} from "../helpers/tsserver";
import {
    createServerHost,
    File,
    libFile,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsserver:: inferredProjects", () => {
    it("create inferred project", () => {
        const appFile: File = {
            path: `/user/username/projects/myproject/app.ts`,
            content: `
                import {f} from "./module"
                console.log(f)
                `
        };

        const moduleFile: File = {
            path: `/user/username/projects/myproject/module.d.ts`,
            content: `export let x: number`
        };
        const host = createServerHost([appFile, moduleFile, libFile]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(appFile.path);
        baselineTsserverLogs("inferredProjects", "create inferred project", projectService);
    });

    it("should use only one inferred project if 'useOneInferredProject' is set", () => {
        const file1 = {
            path: `/user/username/projects/myproject/a/b/main.ts`,
            content: "let x =1;"
        };
        const configFile: File = {
            path: `/user/username/projects/myproject/a/b/tsconfig.json`,
            content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
        };
        const file2 = {
            path: `/user/username/projects/myproject/a/c/main.ts`,
            content: "let x =1;"
        };

        const file3 = {
            path: `/user/username/projects/myproject/a/d/main.ts`,
            content: "let x =1;"
        };

        const host = createServerHost([file1, file2, file3, libFile]);
        const projectService = createProjectService(host, { useSingleInferredProject: true, logger: createLoggerWithInMemoryLogs(host) });
        projectService.openClientFile(file1.path);
        projectService.openClientFile(file2.path);
        projectService.openClientFile(file3.path);

        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks(); // load configured project from disk + ensureProjectsForOpenFiles
        baselineTsserverLogs("inferredProjects", "should use only one inferred project if useOneInferredProject is set", projectService);
    });

    it("disable inferred project", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x =1;"
        };

        const host = createServerHost([file1]);
        const projectService = createProjectService(host, { useSingleInferredProject: true, serverMode: ts.LanguageServiceMode.Syntactic, logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path, file1.content);

        projectService.logger.log(`LanguageServiceEnabled:: ${projectService.inferredProjects[0].languageServiceEnabled}`);
        baselineTsserverLogs("inferredProjects", "disable inferred project", projectService);
    });

    it("project settings for inferred projects", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: `import {x} from "mod"`
        };
        const modFile = {
            path: "/a/mod.ts",
            content: "export let x: number"
        };
        const host = createServerHost([file1, modFile]);
        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);
        projectService.openClientFile(modFile.path);
        projectService.setCompilerOptionsForInferredProjects({ moduleResolution: ts.ModuleResolutionKind.Classic });
        host.runQueuedTimeoutCallbacks();
        logInferredProjectsOrphanStatus(projectService);
        baselineTsserverLogs("inferredProjects", "project settings for inferred projects", projectService);
    });

    it("should support files without extensions", () => {
        const f = {
            path: "/a/compile",
            content: "let x = 1"
        };
        const host = createServerHost([f]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        setCompilerOptionsForInferredProjectsRequestForSession({ allowJs: true }, session);
        openFilesForSession([{ file: f.path, content: f.content, scriptKindName: "JS" }], session);
        baselineTsserverLogs("inferredProjects", "should support files without extensions", session);
    });

    it("inferred projects per project root", () => {
        const file1 = { path: "/a/file1.ts", content: "let x = 1;", projectRootPath: "/a" };
        const file2 = { path: "/a/file2.ts", content: "let y = 2;", projectRootPath: "/a" };
        const file3 = { path: "/b/file2.ts", content: "let x = 3;", projectRootPath: "/b" };
        const file4 = { path: "/c/file3.ts", content: "let z = 4;" };
        const host = createServerHost([file1, file2, file3, file4]);
        const session = createSession(host, {
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: true,
            logger: createLoggerWithInMemoryLogs(host)
        });
        setCompilerOptionsForInferredProjectsRequestForSession({
            allowJs: true,
            target: ts.ScriptTarget.ESNext
        }, session);
        setCompilerOptionsForInferredProjectsRequestForSession({
            options: {
                allowJs: true,
                target: ts.ScriptTarget.ES2015
            },
            projectRootPath: "/b"
        }, session);
        openFilesForSession([{
            file: file1.path,
            content: file1.content,
            scriptKindName: "JS",
            projectRootPath: file1.projectRootPath
        }], session);
        openFilesForSession([{
            file: file2.path,
            content: file2.content,
            scriptKindName: "JS",
            projectRootPath: file2.projectRootPath
        }], session);
        openFilesForSession([{
            file: file3.path,
            content: file3.content,
            scriptKindName: "JS",
            projectRootPath: file3.projectRootPath
        }], session);
        openFilesForSession([{
            file: file4.path,
            content: file4.content,
            scriptKindName: "JS"
        }], session);

        const projectService = session.getProjectService();
        assert.equal(projectService.inferredProjects[0].getCompilationSettings().target, ts.ScriptTarget.ESNext);
        assert.equal(projectService.inferredProjects[1].getCompilationSettings().target, ts.ScriptTarget.ESNext);
        assert.equal(projectService.inferredProjects[2].getCompilationSettings().target, ts.ScriptTarget.ES2015);
        baselineTsserverLogs("inferredProjects", "inferred projects per project root", session);
    });

    function verifyProjectRootWithCaseSensitivity(subScenario: string, useCaseSensitiveFileNames: boolean) {
        it(subScenario, () => {
            const files: [File, File, File, File] = [
                { path: "/a/file1.ts", content: "let x = 1;" },
                { path: "/A/file2.ts", content: "let y = 2;" },
                { path: "/b/file2.ts", content: "let x = 3;" },
                { path: "/c/file3.ts", content: "let z = 4;" }
            ];
            const host = createServerHost(files, { useCaseSensitiveFileNames });
            const session = createSession(host, { useSingleInferredProject: true, useInferredProjectPerProjectRoot: true, logger: createLoggerWithInMemoryLogs(host) });
            setCompilerOptionsForInferredProjectsRequestForSession({
                allowJs: true,
                target: ts.ScriptTarget.ESNext
            }, session);
            setCompilerOptionsForInferredProjectsRequestForSession({
                options: {
                    allowJs: true,
                    target: ts.ScriptTarget.ES2015
                },
                projectRootPath: "/a"
            }, session);

            openClientFiles(["/a", "/a", "/b", undefined]);
            closeClientFiles();

            openClientFiles(["/a", "/A", "/b", undefined]);
            closeClientFiles();

            setCompilerOptionsForInferredProjectsRequestForSession({
                options: {
                    allowJs: true,
                    target: ts.ScriptTarget.ES2017
                },
                projectRootPath: "/A"
            }, session);

            openClientFiles(["/a", "/a", "/b", undefined]);
            closeClientFiles();

            openClientFiles(["/a", "/A", "/b", undefined]);
            closeClientFiles();
            baselineTsserverLogs("inferredProjects", subScenario, session);

            function openClientFiles(projectRoots: [string | undefined, string | undefined, string | undefined, string | undefined]) {
                files.forEach((file, index) =>
                    openFilesForSession([{ file: file.path, content: file.content, scriptKindName: "JS", projectRootPath: projectRoots[index] }], session)
                );
            }

            function closeClientFiles() {
                closeFilesForSession(files, session);
            }
        });
    }

    verifyProjectRootWithCaseSensitivity("inferred projects per project root with case sensitive system", /*useCaseSensitiveFileNames*/ true);
    verifyProjectRootWithCaseSensitivity("inferred projects per project root with case insensitive system", /*useCaseSensitiveFileNames*/ false);

    it("should still retain configured project created while opening the file", () => {
        const appFile: File = {
            path: `/user/username/projects/myproject/app.ts`,
            content: `const app = 20;`
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}"
        };
        const jsFile1: File = {
            path: `/user/username/projects/myproject/jsFile1.js`,
            content: `const jsFile1 = 10;`
        };
        const jsFile2: File = {
            path: `/user/username/projects/myproject/jsFile2.js`,
            content: `const jsFile2 = 10;`
        };
        const host = createServerHost([appFile, libFile, config, jsFile1, jsFile2]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });

        // Do not remove config project when opening jsFile that is not present as part of config project
        openFilesForSession([jsFile1], session);

        // Do not remove config project when opening jsFile that is not present as part of config project
        closeFilesForSession([jsFile1], session);
        openFilesForSession([jsFile2], session);

        // Do not remove config project when opening jsFile that is not present as part of config project
        openFilesForSession([jsFile1], session);

        // When opening file that doesnt fall back to the config file, we remove the config project
        openFilesForSession([libFile], session);
        baselineTsserverLogs("inferredProjects", "should still retain configured project created while opening the file", session);
    });

    it("regression test - should infer typeAcquisition for inferred projects when set undefined", () => {
        const file1 = { path: "/a/file1.js", content: "" };
        const host = createServerHost([file1]);

        const projectService = createProjectService(host, { logger: createLoggerWithInMemoryLogs(host) });

        projectService.openClientFile(file1.path);

        const inferredProject = projectService.inferredProjects[0];
        projectService.logger.log(`typeAcquisition : setting to undefined`);
        inferredProject.setTypeAcquisition(undefined);
        projectService.logger.log(`typeAcquisition should be inferred for inferred projects: ${JSON.stringify(inferredProject.getTypeAcquisition(), undefined, " ")}`);
        baselineTsserverLogs("inferredProjects", "regression test - should infer typeAcquisition for inferred projects when set undefined", projectService);
    });

    it("Setting compiler options for inferred projects when there are no open files should not schedule any refresh", () => {
        const host = createServerHost([commonFile1, libFile]);
        const session = createSession(host, { logger: createLoggerWithInMemoryLogs(host) });
        setCompilerOptionsForInferredProjectsRequestForSession({
            allowJs: true,
            target: ts.ScriptTarget.ES2015
        }, session);
        session.testhost.logTimeoutQueueLength();
        baselineTsserverLogs("inferredProjects", "Setting compiler options for inferred projects when there are no open files should not schedule any refresh", session);
    });
});
