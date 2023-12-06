import * as ts from "../../_namespaces/ts";
import {
    dedent,
} from "../../_namespaces/Utils";
import {
    jsonToReadableText,
} from "../helpers";
import {
    commonFile1,
} from "../helpers/tscWatch";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    logInferredProjectsOrphanStatus,
    openFilesForSession,
    setCompilerOptionsForInferredProjectsRequestForSession,
    TestSession,
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
                `,
        };

        const moduleFile: File = {
            path: `/user/username/projects/myproject/module.d.ts`,
            content: `export let x: number`,
        };
        const host = createServerHost([appFile, moduleFile, libFile]);
        const session = new TestSession(host);
        openFilesForSession([appFile], session);
        baselineTsserverLogs("inferredProjects", "create inferred project", session);
    });

    it("should use only one inferred project if 'useOneInferredProject' is set", () => {
        const file1 = {
            path: `/user/username/projects/myproject/a/b/main.ts`,
            content: "let x =1;",
        };
        const configFile: File = {
            path: `/user/username/projects/myproject/a/b/tsconfig.json`,
            content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`,
        };
        const file2 = {
            path: `/user/username/projects/myproject/a/c/main.ts`,
            content: "let x =1;",
        };

        const file3 = {
            path: `/user/username/projects/myproject/a/d/main.ts`,
            content: "let x =1;",
        };

        const host = createServerHost([file1, file2, file3, libFile]);
        const session = new TestSession({ host, useSingleInferredProject: true });
        openFilesForSession([file1, file2, file3], session);

        host.writeFile(configFile.path, configFile.content);
        host.runQueuedTimeoutCallbacks(); // load configured project from disk + ensureProjectsForOpenFiles
        baselineTsserverLogs("inferredProjects", "should use only one inferred project if useOneInferredProject is set", session);
    });

    it("disable inferred project", () => {
        const file1 = {
            path: "/a/b/f1.ts",
            content: "let x =1;",
        };

        const host = createServerHost([file1]);
        const session = new TestSession({ host, useSingleInferredProject: true, serverMode: ts.LanguageServiceMode.Syntactic });

        openFilesForSession([file1], session);

        session.logger.log(`LanguageServiceEnabled:: ${session.getProjectService().inferredProjects[0].languageServiceEnabled}`);
        baselineTsserverLogs("inferredProjects", "disable inferred project", session);
    });

    it("project settings for inferred projects", () => {
        const file1 = {
            path: "/a/b/app.ts",
            content: `import {x} from "mod"`,
        };
        const modFile = {
            path: "/a/mod.ts",
            content: "export let x: number",
        };
        const host = createServerHost([file1, modFile]);
        const session = new TestSession(host);

        openFilesForSession([file1, modFile], session);
        setCompilerOptionsForInferredProjectsRequestForSession({
            moduleResolution: ts.server.protocol.ModuleResolutionKind.Classic,
        }, session);
        host.runQueuedTimeoutCallbacks();
        logInferredProjectsOrphanStatus(session);
        baselineTsserverLogs("inferredProjects", "project settings for inferred projects", session);
    });

    it("should support files without extensions", () => {
        const f = {
            path: "/a/compile",
            content: "let x = 1",
        };
        const host = createServerHost([f]);
        const session = new TestSession(host);
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
        const session = new TestSession({
            host,
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: true,
        });
        setCompilerOptionsForInferredProjectsRequestForSession({
            allowJs: true,
            target: ts.server.protocol.ScriptTarget.ESNext,
        }, session);
        setCompilerOptionsForInferredProjectsRequestForSession({
            options: {
                allowJs: true,
                target: ts.server.protocol.ScriptTarget.ES2015,
            },
            projectRootPath: "/b",
        }, session);
        openFilesForSession([{
            file: file1.path,
            content: file1.content,
            scriptKindName: "JS",
            projectRootPath: file1.projectRootPath,
        }], session);
        openFilesForSession([{
            file: file2.path,
            content: file2.content,
            scriptKindName: "JS",
            projectRootPath: file2.projectRootPath,
        }], session);
        openFilesForSession([{
            file: file3.path,
            content: file3.content,
            scriptKindName: "JS",
            projectRootPath: file3.projectRootPath,
        }], session);
        openFilesForSession([{
            file: file4.path,
            content: file4.content,
            scriptKindName: "JS",
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
                { path: "/c/file3.ts", content: "let z = 4;" },
            ];
            const host = createServerHost(files, { useCaseSensitiveFileNames });
            const session = new TestSession({ host, useSingleInferredProject: true, useInferredProjectPerProjectRoot: true });
            setCompilerOptionsForInferredProjectsRequestForSession({
                allowJs: true,
                target: ts.server.protocol.ScriptTarget.ESNext,
            }, session);
            setCompilerOptionsForInferredProjectsRequestForSession({
                options: {
                    allowJs: true,
                    target: ts.server.protocol.ScriptTarget.ES2015,
                },
                projectRootPath: "/a",
            }, session);

            openClientFiles(["/a", "/a", "/b", undefined]);
            closeClientFiles();

            openClientFiles(["/a", "/A", "/b", undefined]);
            closeClientFiles();

            setCompilerOptionsForInferredProjectsRequestForSession({
                options: {
                    allowJs: true,
                    target: ts.server.protocol.ScriptTarget.ES2017,
                },
                projectRootPath: "/A",
            }, session);

            openClientFiles(["/a", "/a", "/b", undefined]);
            closeClientFiles();

            openClientFiles(["/a", "/A", "/b", undefined]);
            closeClientFiles();
            baselineTsserverLogs("inferredProjects", subScenario, session);

            function openClientFiles(projectRoots: [string | undefined, string | undefined, string | undefined, string | undefined]) {
                files.forEach((file, index) => openFilesForSession([{ file: file.path, content: file.content, scriptKindName: "JS", projectRootPath: projectRoots[index] }], session));
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
            content: `const app = 20;`,
        };
        const config: File = {
            path: `/user/username/projects/myproject/tsconfig.json`,
            content: "{}",
        };
        const jsFile1: File = {
            path: `/user/username/projects/myproject/jsFile1.js`,
            content: `const jsFile1 = 10;`,
        };
        const jsFile2: File = {
            path: `/user/username/projects/myproject/jsFile2.js`,
            content: `const jsFile2 = 10;`,
        };
        const host = createServerHost([appFile, libFile, config, jsFile1, jsFile2]);
        const session = new TestSession(host);

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

        const session = new TestSession(host);

        openFilesForSession([file1], session);

        const inferredProject = session.getProjectService().inferredProjects[0];
        session.logger.log(`typeAcquisition : setting to undefined`);
        inferredProject.setTypeAcquisition(undefined);
        session.logger.log(`typeAcquisition should be inferred for inferred projects: ${jsonToReadableText(inferredProject.getTypeAcquisition())}`);
        baselineTsserverLogs("inferredProjects", "regression test - should infer typeAcquisition for inferred projects when set undefined", session);
    });

    it("Setting compiler options for inferred projects when there are no open files should not schedule any refresh", () => {
        const host = createServerHost([commonFile1, libFile]);
        const session = new TestSession(host);
        setCompilerOptionsForInferredProjectsRequestForSession({
            allowJs: true,
            target: ts.server.protocol.ScriptTarget.ES2015,
        }, session);
        baselineTsserverLogs("inferredProjects", "Setting compiler options for inferred projects when there are no open files should not schedule any refresh", session);
    });

    it("when existing inferred project has no root files", () => {
        const host = createServerHost({
            "/user/username/projects/myproject/app.ts": dedent`
                import {x} from "./module";
            `,
            // Removing resolutions of this happens after program gets created and we are removing not needed files
            "/user/username/projects/myproject/module.d.ts": dedent`
                import {y} from "./module2";
                import {a} from "module3";
                export const x = y;
                export const b = a;
            `,
            "/user/username/projects/myproject/module2.d.ts": dedent`
                export const y = 10;
            `,
            "/user/username/projects/myproject/node_modules/module3/package.json": jsonToReadableText({
                name: "module3",
                version: "1.0.0",
            }),
            "/user/username/projects/myproject/node_modules/module3/index.d.ts": dedent`
                export const a = 10;
            `,
            [libFile.path]: libFile.content,
        });
        const session = new TestSession(host);
        openFilesForSession([{
            file: "/user/username/projects/myproject/app.ts",
            projectRootPath: "/user/username/projects/myproject",
        }], session);
        closeFilesForSession(["/user/username/projects/myproject/app.ts"], session);
        openFilesForSession([{
            file: "/user/username/projects/myproject/module.d.ts",
            projectRootPath: "/user/username/projects/myproject",
        }], session);
        baselineTsserverLogs("inferredProjects", "when existing inferred project has no root files", session);
    });
});
