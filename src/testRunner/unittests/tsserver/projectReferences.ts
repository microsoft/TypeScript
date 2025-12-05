import * as ts from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { solutionBuildWithBaseline } from "../helpers/solutionBuilder.js";
import {
    baselineTsserverLogs,
    closeFilesForSession,
    createHostWithSolutionBuild,
    openFilesForSession,
    projectInfoForSession,
    protocolFileLocationFromSubstring,
    protocolLocationFromSubstring,
    TestSession,
    verifyGetErrRequest,
} from "../helpers/tsserver.js";
import {
    File,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

function logDefaultProjectAndDefaultConfiguredProject(session: TestSession, file: File) {
    const info = session.getProjectService().getScriptInfo(file.path);
    if (info) {
        const projectInfo = projectInfoForSession(session, file);
        return session.getProjectService().findProject(projectInfo.configFileName);
    }
}

describe("unittests:: tsserver:: with projectReferences:: and tsbuild", () => {
    describe("with container project", () => {
        function setup(tempFile?: File) {
            const containerLibConfig: File = {
                path: "/user/username/projects/container/lib/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        outFile: "../built/local/lib.js",
                        composite: true,
                        declarationMap: true,
                    },
                    references: [],
                    files: [
                        "index.ts",
                    ],
                }),
            };
            const containerLibIndex: File = {
                path: "/user/username/projects/container/lib/index.ts",
                content: dedent`
                    namespace container {
                        export const myConst = 30;
                    }
                `,
            };
            const containerExecConfig: File = {
                path: "/user/username/projects/container/exec/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        outFile: "../built/local/exec.js",
                    },
                    files: [
                        "index.ts",
                    ],
                    references: [
                        { path: "../lib" },
                    ],
                }),
            };
            const containerExecIndex: File = {
                path: "/user/username/projects/container/exec/index.ts",
                content: dedent`
                    namespace container {
                        export function getMyConst() {
                            return myConst;
                        }
                    }
                `,
            };
            const containerCompositeExecConfig: File = {
                path: "/user/username/projects/container/compositeExec/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        outFile: "../built/local/compositeExec.js",
                        composite: true,
                        declarationMap: true,
                    },
                    files: [
                        "index.ts",
                    ],
                    references: [
                        { path: "../lib" },
                    ],
                }),
            };
            const containerCompositeExecIndex: File = {
                path: "/user/username/projects/container/compositeExec/index.ts",
                content: dedent`
                    namespace container {
                        export function getMyConst() {
                            return myConst;
                        }
                    }
                `,
            };
            const containerConfig: File = {
                path: "/user/username/projects/container/tsconfig.json",
                content: jsonToReadableText({
                    files: [],
                    include: [],
                    references: [
                        { path: "./exec" },
                        { path: "./compositeExec" },
                    ],
                }),
            };
            const files = [containerLibConfig, containerLibIndex, containerExecConfig, containerExecIndex, containerCompositeExecConfig, containerCompositeExecIndex, containerConfig];
            if (tempFile) files.push(tempFile);
            const host = createHostWithSolutionBuild(files, [containerConfig.path]);
            const session = new TestSession(host);
            return { files, session, containerConfig, containerCompositeExecIndex };
        }

        it("does not error on container only project", () => {
            const { files, session, containerConfig } = setup();
            session.executeCommandSeq<ts.server.protocol.OpenExternalProjectsRequest>({
                command: ts.server.protocol.CommandTypes.OpenExternalProjects,
                arguments: {
                    projects: [{
                        projectFileName: "/user/username/projects/container/container",
                        rootFiles: files.map(f => ({ fileName: f.path })),
                        options: {},
                    }],
                },
            });
            files.forEach(f => {
                const args: ts.server.protocol.FileRequestArgs = {
                    file: f.path,
                    projectFileName: ts.endsWith(f.path, "tsconfig.json") ? f.path : undefined,
                };
                session.executeCommandSeq<ts.server.protocol.SyntacticDiagnosticsSyncRequest>({
                    command: ts.server.protocol.CommandTypes.SyntacticDiagnosticsSync,
                    arguments: args,
                });
                session.executeCommandSeq<ts.server.protocol.SemanticDiagnosticsSyncRequest>({
                    command: ts.server.protocol.CommandTypes.SemanticDiagnosticsSync,
                    arguments: args,
                });
            });
            const containerProject = session.getProjectService().configuredProjects.get(containerConfig.path)!;
            session.executeCommandSeq<ts.server.protocol.CompilerOptionsDiagnosticsRequest>({
                command: ts.server.protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
                arguments: { projectFileName: containerProject.projectName },
            });
            baselineTsserverLogs("projectReferences", `does not error on container only project`, session);
        });

        it("can successfully find references with --out options", () => {
            const { session, containerCompositeExecIndex } = setup();
            openFilesForSession([containerCompositeExecIndex], session);
            const myConstStart = protocolLocationFromSubstring(containerCompositeExecIndex.content, "myConst");
            session.executeCommandSeq<ts.server.protocol.RenameRequest>({
                command: ts.server.protocol.CommandTypes.Rename,
                arguments: { file: containerCompositeExecIndex.path, ...myConstStart },
            });

            baselineTsserverLogs("projectReferences", `can successfully find references with out option`, session);
        });

        it("ancestor and project ref management", () => {
            const tempFile: File = {
                path: `/user/username/projects/temp/temp.ts`,
                content: "let x = 10",
            };
            const { session, containerCompositeExecIndex } = setup(tempFile);
            openFilesForSession([containerCompositeExecIndex], session);

            // Open temp file and verify all projects alive
            openFilesForSession([tempFile], session);

            // Ref projects are loaded after as part of this command
            const locationOfMyConst = protocolLocationFromSubstring(containerCompositeExecIndex.content, "myConst");
            session.executeCommandSeq<ts.server.protocol.RenameRequest>({
                command: ts.server.protocol.CommandTypes.Rename,
                arguments: {
                    file: containerCompositeExecIndex.path,
                    ...locationOfMyConst,
                },
            });

            // Open temp file and verify all projects alive
            closeFilesForSession([tempFile], session);
            openFilesForSession([tempFile], session);

            // Close all files and open temp file, only inferred project should be alive
            closeFilesForSession([containerCompositeExecIndex, tempFile], session);
            openFilesForSession([tempFile], session);
            baselineTsserverLogs("projectReferences", `ancestor and project ref management`, session);
        });
    });

    describe("when root file is file from referenced project", () => {
        function verify(disableSourceOfProjectReferenceRedirect: boolean) {
            const projectLocation = `/user/username/projects/project`;
            const commonConfig: File = {
                path: `${projectLocation}/src/common/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declarationMap: true,
                        outDir: "../../out",
                        baseUrl: "..",
                        disableSourceOfProjectReferenceRedirect,
                    },
                    include: ["./**/*"],
                }),
            };
            const keyboardTs: File = {
                path: `${projectLocation}/src/common/input/keyboard.ts`,
                content: `function bar() { return "just a random function so .d.ts location doesnt match"; }
export function evaluateKeyboardEvent() { }`,
            };
            const keyboardTestTs: File = {
                path: `${projectLocation}/src/common/input/keyboard.test.ts`,
                content: `import { evaluateKeyboardEvent } from 'common/input/keyboard';
function testEvaluateKeyboardEvent() {
    return evaluateKeyboardEvent();
}
`,
            };
            const srcConfig: File = {
                path: `${projectLocation}/src/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        declarationMap: true,
                        outDir: "../out",
                        baseUrl: ".",
                        paths: {
                            "common/*": ["./common/*"],
                        },
                        tsBuildInfoFile: "../out/src.tsconfig.tsbuildinfo",
                        disableSourceOfProjectReferenceRedirect,
                    },
                    include: ["./**/*"],
                    references: [
                        { path: "./common" },
                    ],
                }),
            };
            const terminalTs: File = {
                path: `${projectLocation}/src/terminal.ts`,
                content: `import { evaluateKeyboardEvent } from 'common/input/keyboard';
function foo() {
    return evaluateKeyboardEvent();
}
`,
            };
            const host = createHostWithSolutionBuild(
                [commonConfig, keyboardTs, keyboardTestTs, srcConfig, terminalTs],
                [srcConfig.path],
            );
            const session = new TestSession(host);
            openFilesForSession([keyboardTs, terminalTs], session);

            const searchStr = "evaluateKeyboardEvent";
            session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
                command: ts.server.protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(keyboardTs, searchStr),
            });
            baselineTsserverLogs("projectReferences", `root file is file from referenced project${disableSourceOfProjectReferenceRedirect ? " and using declaration maps" : ""}`, session);
        }

        it(`when using declaration file maps to navigate between projects`, () => {
            verify(/*disableSourceOfProjectReferenceRedirect*/ true);
        });
        it(`when using original source files in the project`, () => {
            verify(/*disableSourceOfProjectReferenceRedirect*/ false);
        });
    });

    it("reusing d.ts files from composite and non composite projects", () => {
        const configA: File = {
            path: `/user/username/projects/myproject/compositea/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    outDir: "../dist/",
                    rootDir: "../",
                    baseUrl: "../",
                    paths: { "@ref/*": ["./dist/*"] },
                },
            }),
        };
        const aTs: File = {
            path: `/user/username/projects/myproject/compositea/a.ts`,
            content: `import { b } from "@ref/compositeb/b";`,
        };
        const a2Ts: File = {
            path: `/user/username/projects/myproject/compositea/a2.ts`,
            content: `export const x = 10;`,
        };
        const configB: File = {
            path: `/user/username/projects/myproject/compositeb/tsconfig.json`,
            content: configA.content,
        };
        const bTs: File = {
            path: `/user/username/projects/myproject/compositeb/b.ts`,
            content: "export function b() {}",
        };
        const bDts: File = {
            path: `/user/username/projects/myproject/dist/compositeb/b.d.ts`,
            content: "export declare function b(): void;",
        };
        const configC: File = {
            path: `/user/username/projects/myproject/compositec/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    outDir: "../dist/",
                    rootDir: "../",
                    baseUrl: "../",
                    paths: { "@ref/*": ["./*"] },
                },
                references: [{ path: "../compositeb" }],
            }),
        };
        const cTs: File = {
            path: `/user/username/projects/myproject/compositec/c.ts`,
            content: aTs.content,
        };
        const files = [aTs, a2Ts, configA, bDts, bTs, configB, cTs, configC];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([aTs], session);

        // project A referencing b.d.ts without project reference
        const projectA = session.getProjectService().configuredProjects.get(configA.path)!;
        assert.isDefined(projectA);

        // reuses b.d.ts but sets the path and resolved path since projectC has project references
        // as the real resolution was to b.ts
        openFilesForSession([cTs], session);

        // Now new project for project A tries to reuse b but there is no filesByName mapping for b's source location
        host.writeFile(a2Ts.path, `${a2Ts.content}export const y = 30;`);
        session.host.baselineHost("a2Ts modified");
        assert.isTrue(projectA.dirty);
        projectA.updateGraph();
        baselineTsserverLogs("projectReferences", "reusing d.ts files from composite and non composite projects", session);
    });

    it("referencing const enum from referenced project with preserveConstEnums", () => {
        const projectLocation = `/user/username/projects/project`;
        const utilsIndex: File = {
            path: `${projectLocation}/src/utils/index.ts`,
            content: "export const enum E { A = 1 }",
        };
        const utilsDeclaration: File = {
            path: `${projectLocation}/src/utils/index.d.ts`,
            content: "export declare const enum E { A = 1 }",
        };
        const utilsConfig: File = {
            path: `${projectLocation}/src/utils/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: { composite: true, declaration: true, preserveConstEnums: true } }),
        };
        const projectIndex: File = {
            path: `${projectLocation}/src/project/index.ts`,
            content: `import { E } from "../utils"; E.A;`,
        };
        const projectConfig: File = {
            path: `${projectLocation}/src/project/tsconfig.json`,
            content: jsonToReadableText({ compilerOptions: { isolatedModules: true }, references: [{ path: "../utils" }] }),
        };
        const host = TestServerHost.createServerHost([utilsIndex, utilsDeclaration, utilsConfig, projectIndex, projectConfig]);
        const session = new TestSession(host);
        openFilesForSession([projectIndex], session);
        verifyGetErrRequest({ session, files: [projectIndex] });
        baselineTsserverLogs("projectReferences", `referencing const enum from referenced project with preserveConstEnums`, session);
    });

    describe("when references are monorepo like with symlinks", () => {
        interface Packages {
            bPackageJson: File;
            aTest: File;
            bFoo: File;
            bBar: File;
            bSymlink: SymLink;
        }
        function verifySymlinkScenario(scenario: string, packages: () => Packages) {
            describe(`${scenario}: when solution is not built`, () => {
                it("with preserveSymlinks turned off", () => {
                    verifySession(scenario, packages(), /*alreadyBuilt*/ false, {});
                });

                it("with preserveSymlinks turned on", () => {
                    verifySession(scenario, packages(), /*alreadyBuilt*/ false, { preserveSymlinks: true });
                });
            });

            describe(`${scenario}: when solution is already built`, () => {
                it("with preserveSymlinks turned off", () => {
                    verifySession(scenario, packages(), /*alreadyBuilt*/ true, {});
                });

                it("with preserveSymlinks turned on", () => {
                    verifySession(scenario, packages(), /*alreadyBuilt*/ true, { preserveSymlinks: true });
                });
            });
        }

        function verifySession(scenario: string, { bPackageJson, aTest, bFoo, bBar, bSymlink }: Packages, alreadyBuilt: boolean, extraOptions: ts.CompilerOptions) {
            const aConfig = config("A", extraOptions, ["../B"]);
            const bConfig = config("B", extraOptions);
            const files = [bPackageJson, aConfig, bConfig, aTest, bFoo, bBar, bSymlink];
            const host = alreadyBuilt ?
                createHostWithSolutionBuild(files, [aConfig.path]) :
                TestServerHost.createServerHost(files);

            // Create symlink in node module
            const session = new TestSession(host);
            openFilesForSession([aTest], session);
            verifyGetErrRequest({ session, files: [aTest] });
            session.executeCommandSeq<ts.server.protocol.UpdateOpenRequest>({
                command: ts.server.protocol.CommandTypes.UpdateOpen,
                arguments: {
                    changedFiles: [{
                        fileName: aTest.path,
                        textChanges: [{
                            newText: "\n",
                            start: { line: 5, offset: 1 },
                            end: { line: 5, offset: 1 },
                        }],
                    }],
                },
            });
            verifyGetErrRequest({ session, files: [aTest] });
            baselineTsserverLogs("projectReferences", `monorepo like with symlinks ${scenario} and solution is ${alreadyBuilt ? "built" : "not built"}${extraOptions.preserveSymlinks ? " with preserveSymlinks" : ""}`, session);
        }

        function config(packageName: string, extraOptions: ts.CompilerOptions, references?: string[]): File {
            return {
                path: `/user/username/projects/myproject/packages/${packageName}/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        outDir: "lib",
                        rootDir: "src",
                        composite: true,
                        ...extraOptions,
                    },
                    include: ["src"],
                    ...(references ? { references: references.map(path => ({ path })) } : {}),
                }),
            };
        }

        function file(packageName: string, fileName: string, content: string): File {
            return {
                path: `/user/username/projects/myproject/packages/${packageName}/src/${fileName}`,
                content,
            };
        }

        function verifyMonoRepoLike(scope = "") {
            verifySymlinkScenario(`when packageJson has types field and has index.ts${scope ? " with scoped package" : ""}`, () => ({
                bPackageJson: {
                    path: `/user/username/projects/myproject/packages/B/package.json`,
                    content: jsonToReadableText({
                        main: "lib/index.js",
                        types: "lib/index.d.ts",
                    }),
                },
                aTest: file(
                    "A",
                    "index.ts",
                    `import { foo } from '${scope}b';
import { bar } from '${scope}b/lib/bar';
foo();
bar();
`,
                ),
                bFoo: file("B", "index.ts", `export function foo() { }`),
                bBar: file("B", "bar.ts", `export function bar() { }`),
                bSymlink: {
                    path: `/user/username/projects/myproject/node_modules/${scope}b`,
                    symLink: `/user/username/projects/myproject/packages/B`,
                },
            }));

            verifySymlinkScenario(`when referencing file from subFolder${scope ? " with scoped package" : ""}`, () => ({
                bPackageJson: {
                    path: `/user/username/projects/myproject/packages/B/package.json`,
                    content: "{}",
                },
                aTest: file(
                    "A",
                    "test.ts",
                    `import { foo } from '${scope}b/lib/foo';
import { bar } from '${scope}b/lib/bar/foo';
foo();
bar();
`,
                ),
                bFoo: file("B", "foo.ts", `export function foo() { }`),
                bBar: file("B", "bar/foo.ts", `export function bar() { }`),
                bSymlink: {
                    path: `/user/username/projects/myproject/node_modules/${scope}b`,
                    symLink: `/user/username/projects/myproject/packages/B`,
                },
            }));
        }

        describe("when package is not scoped", () => {
            verifyMonoRepoLike();
        });
        describe("when package is scoped", () => {
            verifyMonoRepoLike("@issue/");
        });
    });

    it("when the referenced projects have allowJs and emitDeclarationOnly", () => {
        const compositeConfig: File = {
            path: `/user/username/projects/myproject/packages/emit-composite/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    allowJs: true,
                    emitDeclarationOnly: true,
                    outDir: "lib",
                    rootDir: "src",
                },
                include: ["src"],
            }),
        };
        const compositePackageJson: File = {
            path: `/user/username/projects/myproject/packages/emit-composite/package.json`,
            content: jsonToReadableText({
                name: "emit-composite",
                version: "1.0.0",
                main: "src/index.js",
                typings: "lib/index.d.ts",
            }),
        };
        const compositeIndex: File = {
            path: `/user/username/projects/myproject/packages/emit-composite/src/index.js`,
            content: `const testModule = require('./testModule');
module.exports = {
    ...testModule
}`,
        };
        const compositeTestModule: File = {
            path: `/user/username/projects/myproject/packages/emit-composite/src/testModule.js`,
            content: `/**
 * @param {string} arg
 */
 const testCompositeFunction = (arg) => {
}
module.exports = {
    testCompositeFunction
}`,
        };
        const consumerConfig: File = {
            path: `/user/username/projects/myproject/packages/consumer/tsconfig.json`,
            content: jsonToReadableText({
                include: ["src"],
                references: [{ path: "../emit-composite" }],
            }),
        };
        const consumerIndex: File = {
            path: `/user/username/projects/myproject/packages/consumer/src/index.ts`,
            content: `import { testCompositeFunction } from 'emit-composite';
testCompositeFunction('why hello there');
testCompositeFunction('why hello there', 42);`,
        };
        const symlink: SymLink = {
            path: `/user/username/projects/myproject/node_modules/emit-composite`,
            symLink: `/user/username/projects/myproject/packages/emit-composite`,
        };
        const host = TestServerHost.createServerHost([compositeConfig, compositePackageJson, compositeIndex, compositeTestModule, consumerConfig, consumerIndex, symlink], { useCaseSensitiveFileNames: true });
        const session = new TestSession(host);
        openFilesForSession([consumerIndex], session);
        verifyGetErrRequest({ session, files: [consumerIndex] });
        baselineTsserverLogs("projectReferences", `when the referenced projects have allowJs and emitDeclarationOnly`, session);
    });

    it("when finding local reference doesnt load ancestor sibling projects", () => {
        const solutionLocation = "/user/username/projects/solution";
        const solution: File = {
            path: `${solutionLocation}/tsconfig.json`,
            content: jsonToReadableText({
                files: [],
                include: [],
                references: [
                    { path: "./compiler" },
                    { path: "./services" },
                ],
            }),
        };
        const compilerConfig: File = {
            path: `${solutionLocation}/compiler/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    module: "none",
                },
                files: ["./types.ts", "./program.ts"],
            }),
        };
        const typesFile: File = {
            path: `${solutionLocation}/compiler/types.ts`,
            content: `
                namespace ts {
                    export interface Program {
                        getSourceFiles(): string[];
                    }
                }`,
        };
        const programFile: File = {
            path: `${solutionLocation}/compiler/program.ts`,
            content: `
                namespace ts {
                    export const program: Program = {
                        getSourceFiles: () => [getSourceFile()]
                    };
                    function getSourceFile() { return "something"; }
                }`,
        };
        const servicesConfig: File = {
            path: `${solutionLocation}/services/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                },
                files: ["./services.ts"],
                references: [
                    { path: "../compiler" },
                ],
            }),
        };
        const servicesFile: File = {
            path: `${solutionLocation}/services/services.ts`,
            content: `
                namespace ts {
                    const result = program.getSourceFiles();
                }`,
        };

        const files = [solution, compilerConfig, typesFile, programFile, servicesConfig, servicesFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([programFile], session);

        // Find all references for getSourceFile
        // Shouldnt load more projects
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(programFile, "getSourceFile", { index: 1 }),
        });

        // Find all references for getSourceFiles
        // Should load more projects
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(programFile, "getSourceFiles"),
        });
        baselineTsserverLogs("projectReferences", "finding local reference doesnt load ancestor sibling projects", session);
    });

    it("when finding references in overlapping projects", () => {
        const solutionLocation = "/user/username/projects/solution";
        const solutionConfig: File = {
            path: `${solutionLocation}/tsconfig.json`,
            content: jsonToReadableText({
                files: [],
                include: [],
                references: [
                    { path: "./a" },
                    { path: "./b" },
                    { path: "./c" },
                    { path: "./d" },
                ],
            }),
        };
        const aConfig: File = {
            path: `${solutionLocation}/a/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    module: "none",
                },
                files: ["./index.ts"],
            }),
        };
        const aFile: File = {
            path: `${solutionLocation}/a/index.ts`,
            content: `
                export interface I {
                    M(): void;
                }`,
        };

        const bConfig: File = {
            path: `${solutionLocation}/b/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                },
                files: ["./index.ts"],
                references: [
                    { path: "../a" },
                ],
            }),
        };
        const bFile: File = {
            path: `${solutionLocation}/b/index.ts`,
            content: `
                import { I } from "../a";

                export class B implements I {
                    M() {}
                }`,
        };

        const cConfig: File = {
            path: `${solutionLocation}/c/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                },
                files: ["./index.ts"],
                references: [
                    { path: "../b" },
                ],
            }),
        };
        const cFile: File = {
            path: `${solutionLocation}/c/index.ts`,
            content: `
                import { I } from "../a";
                import { B } from "../b";

                export const C: I = new B();
                `,
        };

        const dConfig: File = {
            path: `${solutionLocation}/d/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                },
                files: ["./index.ts"],
                references: [
                    { path: "../c" },
                ],
            }),
        };
        const dFile: File = {
            path: `${solutionLocation}/d/index.ts`,
            content: `
                import { I } from "../a";
                import { C } from "../c";

                export const D: I = C;
                `,
        };

        const files = [solutionConfig, aConfig, aFile, bConfig, bFile, cConfig, cFile, dConfig, dFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([bFile], session);

        // The first search will trigger project loads
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(bFile, "I", { index: 1 }),
        });

        // The second search starts with the projects already loaded
        // Formerly, this would search some projects multiple times
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(bFile, "I", { index: 1 }),
        });

        baselineTsserverLogs("projectReferences", `finding references in overlapping projects`, session);
    });

    describe("special handling of localness of the definitions for findAllRefs", () => {
        function verify(scenario: string, definition: string, usage: string, referenceTerm: string) {
            it(scenario, () => {
                const solutionLocation = "/user/username/projects/solution";
                const solution: File = {
                    path: `${solutionLocation}/tsconfig.json`,
                    content: jsonToReadableText({
                        files: [],
                        references: [
                            { path: "./api" },
                            { path: "./app" },
                        ],
                    }),
                };
                const apiConfig: File = {
                    path: `${solutionLocation}/api/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            composite: true,
                            outDir: "dist",
                            rootDir: "src",
                        },
                        include: ["src"],
                        references: [{ path: "../shared" }],
                    }),
                };
                const apiFile: File = {
                    path: `${solutionLocation}/api/src/server.ts`,
                    content: `import * as shared from "../../shared/dist";
${usage}`,
                };
                const appConfig: File = {
                    path: `${solutionLocation}/app/tsconfig.json`,
                    content: apiConfig.content,
                };
                const appFile: File = {
                    path: `${solutionLocation}/app/src/app.ts`,
                    content: apiFile.content,
                };
                const sharedConfig: File = {
                    path: `${solutionLocation}/shared/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions: {
                            composite: true,
                            outDir: "dist",
                            rootDir: "src",
                        },
                        include: ["src"],
                    }),
                };
                const sharedFile: File = {
                    path: `${solutionLocation}/shared/src/index.ts`,
                    content: definition,
                };
                const host = TestServerHost.createServerHost([solution, apiConfig, apiFile, appConfig, appFile, sharedConfig, sharedFile]);
                const session = new TestSession(host);
                openFilesForSession([apiFile], session);

                // Find all references
                session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
                    command: ts.server.protocol.CommandTypes.References,
                    arguments: protocolFileLocationFromSubstring(apiFile, referenceTerm),
                });

                baselineTsserverLogs("projectReferences", `special handling of localness ${scenario}`, session);
            });
        }

        verify(
            "when using arrow function assignment",
            `export const dog = () => { };`,
            `shared.dog();`,
            "dog",
        );

        verify(
            "when using arrow function as object literal property types",
            `export const foo = { bar: () => { } };`,
            `shared.foo.bar();`,
            "bar",
        );

        verify(
            "when using object literal property",
            `export const foo = {  baz: "BAZ" };`,
            `shared.foo.baz;`,
            "baz",
        );

        verify(
            "when using method of class expression",
            `export const foo = class { fly() {} };`,
            `const instance = new shared.foo();
instance.fly();`,
            "fly",
        );

        verify(
            // when using arrow function as object literal property is loaded through indirect assignment with original declaration local to project is treated as local
            "when using arrow function as object literal property",
            `const local = { bar: () => { } };
export const foo = local;`,
            `shared.foo.bar();`,
            "bar",
        );
    });

    it("when disableSolutionSearching is true, solution and siblings are not loaded", () => {
        const solutionLocation = "/user/username/projects/solution";
        const solution: File = {
            path: `${solutionLocation}/tsconfig.json`,
            content: jsonToReadableText({
                files: [],
                include: [],
                references: [
                    { path: "./compiler" },
                    { path: "./services" },
                ],
            }),
        };
        const compilerConfig: File = {
            path: `${solutionLocation}/compiler/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                    module: "none",
                    disableSolutionSearching: true,
                },
                files: ["./types.ts", "./program.ts"],
            }),
        };
        const typesFile: File = {
            path: `${solutionLocation}/compiler/types.ts`,
            content: `
                namespace ts {
                    export interface Program {
                        getSourceFiles(): string[];
                    }
                }`,
        };
        const programFile: File = {
            path: `${solutionLocation}/compiler/program.ts`,
            content: `
                namespace ts {
                    export const program: Program = {
                        getSourceFiles: () => [getSourceFile()]
                    };
                    function getSourceFile() { return "something"; }
                }`,
        };
        const servicesConfig: File = {
            path: `${solutionLocation}/services/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    composite: true,
                },
                files: ["./services.ts"],
                references: [
                    { path: "../compiler" },
                ],
            }),
        };
        const servicesFile: File = {
            path: `${solutionLocation}/services/services.ts`,
            content: `
                namespace ts {
                    const result = program.getSourceFiles();
                }`,
        };

        const files = [solution, compilerConfig, typesFile, programFile, servicesConfig, servicesFile];
        const host = TestServerHost.createServerHost(files);
        const session = new TestSession(host);
        openFilesForSession([programFile], session);

        // Find all references
        // No new solutions/projects loaded
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(programFile, "getSourceFiles"),
        });
        baselineTsserverLogs("projectReferences", `with disableSolutionSearching solution and siblings are not loaded`, session);
    });

    describe("when default project is solution project", () => {
        interface Setup {
            scenario: string;
            solutionOptions?: ts.CompilerOptions;
            solutionFiles?: string[];
            configRefs: string[];
            additionalFiles: readonly File[];
        }
        const main: File = {
            path: `/user/username/projects/myproject/src/main.ts`,
            content: `import { foo } from 'helpers/functions';
export { foo };`,
        };
        const helper: File = {
            path: `/user/username/projects/myproject/src/helpers/functions.ts`,
            content: `export const foo = 1;`,
        };
        const mainDts: File = {
            path: `/user/username/projects/myproject/target/src/main.d.ts`,
            content: `import { foo } from 'helpers/functions';
export { foo };
//# sourceMappingURL=main.d.ts.map`,
        };
        const mainDtsMap: File = {
            path: `/user/username/projects/myproject/target/src/main.d.ts.map`,
            content: jsonToReadableText({
                version: 3,
                file: "main.d.ts",
                sourceRoot: "",
                sources: ["../../src/main.ts"],
                names: [],
                mappings: "AAAA,OAAO,EAAE,GAAG,EAAE,MAAM,mBAAmB,CAAC;AAExC,OAAO,EAAC,GAAG,EAAC,CAAC",
            }),
        };
        const helperDts: File = {
            path: `/user/username/projects/myproject/target/src/helpers/functions.d.ts`,
            content: `export declare const foo = 1;
//# sourceMappingURL=functions.d.ts.map`,
        };
        const helperDtsMap: File = {
            path: `/user/username/projects/myproject/target/src/helpers/functions.d.ts.map`,
            content: jsonToReadableText({
                version: 3,
                file: "functions.d.ts",
                sourceRoot: "",
                sources: ["../../../src/helpers/functions.ts"],
                names: [],
                mappings: "AAAA,eAAO,MAAM,GAAG,IAAI,CAAC",
            }),
        };
        const tsconfigIndirect3: File = {
            path: `/user/username/projects/myproject/indirect3/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    baseUrl: "../target/src/",
                },
            }),
        };
        const fileResolvingToMainDts: File = {
            path: `/user/username/projects/myproject/indirect3/main.ts`,
            content: `import { foo } from 'main';
foo;
export function bar() {}`,
        };
        const tsconfigSrcPath = `/user/username/projects/myproject/tsconfig-src.json`;
        const tsconfigPath = `/user/username/projects/myproject/tsconfig.json`;
        const dummyFilePath = "/user/username/workspaces/dummy/dummy.ts";
        function setup({ solutionFiles, solutionOptions, configRefs, additionalFiles }: Setup) {
            const tsconfigSrc: File = {
                path: tsconfigSrcPath,
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "./target/",
                        baseUrl: "./src/",
                    },
                    include: ["./src/**/*"],
                }),
            };
            const tsconfig: File = {
                path: tsconfigPath,
                content: jsonToReadableText({
                    ...(solutionOptions ? { compilerOptions: solutionOptions } : {}),
                    references: configRefs.map(path => ({ path })),
                    files: solutionFiles || [],
                }),
            };
            const dummyFile: File = {
                path: dummyFilePath,
                content: "let a = 10;",
            };
            const host = TestServerHost.createServerHost([
                tsconfigSrc,
                tsconfig,
                main,
                helper,
                dummyFile,
                mainDts,
                mainDtsMap,
                helperDts,
                helperDtsMap,
                tsconfigIndirect3,
                fileResolvingToMainDts,
                ...additionalFiles,
            ]);
            const session = new TestSession(host);
            openFilesForSession([main], session);
            return { session, host };
        }

        function verifySolutionScenario(input: Setup) {
            const { session, host } = setup(input);
            const defaultProject = logDefaultProjectAndDefaultConfiguredProject(session, main);

            // Verify errors
            verifyGetErrRequest({ session, files: [main] });

            // Verify collection of script infos
            openFilesForSession([dummyFilePath], session);

            closeFilesForSession([main, dummyFilePath], session);
            openFilesForSession([dummyFilePath, main], session);

            closeFilesForSession([dummyFilePath], session);
            openFilesForSession([dummyFilePath], session);

            // Verify that tsconfig can be deleted and watched
            if (ts.server.isConfiguredProject(defaultProject!)) {
                closeFilesForSession([dummyFilePath], session);
                const config = defaultProject.projectName;
                const content = host.readFile(config)!;
                host.deleteFile(config);
                host.runQueuedTimeoutCallbacks();

                host.writeFile(config, content);
                host.runQueuedTimeoutCallbacks();

                host.deleteFile(config);
                openFilesForSession([dummyFilePath], session);

                host.writeFile(config, content);
                host.runQueuedTimeoutCallbacks();
            }

            // Verify Reload projects
            session.executeCommandSeq<ts.server.protocol.ReloadProjectsRequest>({
                command: ts.server.protocol.CommandTypes.ReloadProjects,
            });

            // Find all refs
            session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
                command: ts.server.protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(main, "foo", { index: 1 }),
            });

            closeFilesForSession([main, dummyFilePath], session);

            // Verify when declaration map references the file
            openFilesForSession([fileResolvingToMainDts], session);

            // Find all refs from dts include
            session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
                command: ts.server.protocol.CommandTypes.References,
                arguments: protocolFileLocationFromSubstring(fileResolvingToMainDts, "foo"),
            });
            baselineTsserverLogs("projectReferences", input.scenario, session);
        }

        function getIndirectProject(postfix: string, optionsToExtend?: ts.CompilerOptions) {
            const tsconfigIndirect: File = {
                path: `/user/username/projects/myproject/tsconfig-indirect${postfix}.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "./target/",
                        baseUrl: "./src/",
                        ...optionsToExtend,
                    },
                    files: [`./indirect${postfix}/main.ts`],
                    references: [{ path: "./tsconfig-src.json" }],
                }),
            };
            const indirect: File = {
                path: `/user/username/projects/myproject/indirect${postfix}/main.ts`,
                content: fileResolvingToMainDts.content,
            };
            return { tsconfigIndirect, indirect };
        }

        function verifyDisableReferencedProjectLoad(input: Setup) {
            const { session } = setup(input);
            logDefaultProjectAndDefaultConfiguredProject(session, main);

            // Verify collection of script infos
            openFilesForSession([dummyFilePath], session);

            closeFilesForSession([main, dummyFilePath], session);
            openFilesForSession([dummyFilePath, main], session);

            // Verify Reload projects
            session.executeCommandSeq<ts.server.protocol.ReloadProjectsRequest>({
                command: ts.server.protocol.CommandTypes.ReloadProjects,
            });
            baselineTsserverLogs("projectReferences", input.scenario, session);
        }

        it("when project is directly referenced by solution", () => {
            verifySolutionScenario({
                scenario: "project is directly referenced by solution",
                configRefs: ["./tsconfig-src.json"],
                additionalFiles: ts.emptyArray,
            });
        });

        it("when project is indirectly referenced by solution", () => {
            const { tsconfigIndirect, indirect } = getIndirectProject("1");
            const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
            verifySolutionScenario({
                scenario: "project is indirectly referenced by solution",
                configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2],
            });
        });

        it("disables looking into the child project if disableReferencedProjectLoad is set", () => {
            verifyDisableReferencedProjectLoad({
                scenario: "disables looking into the child project if disableReferencedProjectLoad is set",
                solutionOptions: { disableReferencedProjectLoad: true },
                configRefs: ["./tsconfig-src.json"],
                additionalFiles: ts.emptyArray,
            });
        });

        it("disables looking into the child project if disableReferencedProjectLoad is set in indirect project", () => {
            const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
            verifyDisableReferencedProjectLoad({
                scenario: "disables looking into the child project if disableReferencedProjectLoad is set in indirect project",
                configRefs: ["./tsconfig-indirect1.json"],
                additionalFiles: [tsconfigIndirect, indirect],
            });
        });

        it("disables looking into the child project if disableReferencedProjectLoad is set in first indirect project but not in another one", () => {
            const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
            const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
            verifyDisableReferencedProjectLoad({
                scenario: "disables looking into the child project if disableReferencedProjectLoad is set in first indirect project but not in another one",
                configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2],
            });
        });

        describe("when solution is project that contains its own files", () => {
            it("when the project found is not solution but references open file through project reference", () => {
                const ownMain: File = {
                    path: `/user/username/projects/myproject/own/main.ts`,
                    content: fileResolvingToMainDts.content,
                };
                verifySolutionScenario({
                    scenario: "solution with its own files and project found is not solution but references open file through project reference",
                    solutionFiles: [`./own/main.ts`],
                    solutionOptions: {
                        outDir: "./target/",
                        baseUrl: "./src/",
                    },
                    configRefs: ["./tsconfig-src.json"],
                    additionalFiles: [ownMain],
                });
            });

            it("when project is indirectly referenced by solution", () => {
                const ownMain: File = {
                    path: `/user/username/projects/myproject/own/main.ts`,
                    content: `import { bar } from 'main';
bar;`,
                };
                const { tsconfigIndirect, indirect } = getIndirectProject("1");
                const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
                verifySolutionScenario({
                    scenario: "solution with its own files and project is indirectly referenced by solution",
                    solutionFiles: [`./own/main.ts`],
                    solutionOptions: {
                        outDir: "./target/",
                        baseUrl: "./indirect1/",
                    },
                    configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                    additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2, ownMain],
                });
            });

            it("disables looking into the child project if disableReferencedProjectLoad is set", () => {
                const ownMain: File = {
                    path: `/user/username/projects/myproject/own/main.ts`,
                    content: fileResolvingToMainDts.content,
                };
                verifyDisableReferencedProjectLoad({
                    scenario: "solution with its own files and disables looking into the child project if disableReferencedProjectLoad is set",
                    solutionFiles: [`./own/main.ts`],
                    solutionOptions: {
                        outDir: "./target/",
                        baseUrl: "./src/",
                        disableReferencedProjectLoad: true,
                    },
                    configRefs: ["./tsconfig-src.json"],
                    additionalFiles: [ownMain],
                });
            });

            it("disables looking into the child project if disableReferencedProjectLoad is set in indirect project", () => {
                const ownMain: File = {
                    path: `/user/username/projects/myproject/own/main.ts`,
                    content: `import { bar } from 'main';
bar;`,
                };
                const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
                verifyDisableReferencedProjectLoad({
                    scenario: "solution with its own files and disables looking into the child project if disableReferencedProjectLoad is set in indirect project",
                    solutionFiles: [`./own/main.ts`],
                    solutionOptions: {
                        outDir: "./target/",
                        baseUrl: "./indirect1/",
                    },
                    configRefs: ["./tsconfig-indirect1.json"],
                    additionalFiles: [tsconfigIndirect, indirect, ownMain],
                });
            });

            it("disables looking into the child project if disableReferencedProjectLoad is set in first indirect project but not in another one", () => {
                const ownMain: File = {
                    path: `/user/username/projects/myproject/own/main.ts`,
                    content: `import { bar } from 'main';
bar;`,
                };
                const { tsconfigIndirect, indirect } = getIndirectProject("1", { disableReferencedProjectLoad: true });
                const { tsconfigIndirect: tsconfigIndirect2, indirect: indirect2 } = getIndirectProject("2");
                verifyDisableReferencedProjectLoad({
                    scenario: "solution with its own files and disables looking into the child project if disableReferencedProjectLoad is set in first indirect project but not in another one",
                    solutionFiles: [`./own/main.ts`],
                    solutionOptions: {
                        outDir: "./target/",
                        baseUrl: "./indirect1/",
                    },
                    configRefs: ["./tsconfig-indirect1.json", "./tsconfig-indirect2.json"],
                    additionalFiles: [tsconfigIndirect, indirect, tsconfigIndirect2, indirect2, ownMain],
                });
            });
        });
    });

    describe("when new file is added to the referenced project", () => {
        function setup(extendOptionsProject2?: ts.CompilerOptions) {
            const config1: File = {
                path: `/user/username/projects/myproject/projects/project1/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                    },
                    exclude: ["temp"],
                }),
            };
            const class1: File = {
                path: `/user/username/projects/myproject/projects/project1/class1.ts`,
                content: `class class1 {}`,
            };
            const class1Dts: File = {
                path: `/user/username/projects/myproject/projects/project1/class1.d.ts`,
                content: `declare class class1 {}`,
            };
            const config2: File = {
                path: `/user/username/projects/myproject/projects/project2/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        module: "none",
                        composite: true,
                        ...(extendOptionsProject2 || {}),
                    },
                    references: [
                        { path: "../project1" },
                    ],
                }),
            };
            const class2: File = {
                path: `/user/username/projects/myproject/projects/project2/class2.ts`,
                content: `class class2 {}`,
            };
            const host = TestServerHost.createServerHost([config1, class1, class1Dts, config2, class2]);
            const session = new TestSession(host);
            openFilesForSession([class2], session);
            return { host, session, class1 };
        }

        it("when referenced project is not open", () => {
            const { host, session } = setup();

            // Add new class to referenced project
            const class3 = `/user/username/projects/myproject/projects/project1/class3.ts`;
            host.writeFile(class3, `class class3 {}`);
            host.runQueuedTimeoutCallbacks();

            // Add excluded file to referenced project
            host.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
            host.runQueuedTimeoutCallbacks();

            // Add output from new class to referenced project
            const class3Dts = `/user/username/projects/myproject/projects/project1/class3.d.ts`;
            host.writeFile(class3Dts, `declare class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectReferences", `new file is added to the referenced project when referenced project is not open`, session);
        });

        it("when referenced project is open", () => {
            const { host, session, class1 } = setup();
            openFilesForSession([class1], session);

            // Add new class to referenced project
            const class3 = `/user/username/projects/myproject/projects/project1/class3.ts`;
            host.writeFile(class3, `class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            // Add excluded file to referenced project
            host.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
            host.runQueuedTimeoutCallbacks();
            // Add output from new class to referenced project
            const class3Dts = `/user/username/projects/myproject/projects/project1/class3.d.ts`;
            host.writeFile(class3Dts, `declare class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectReferences", `new file is added to the referenced project when referenced project is open`, session);
        });

        it("when referenced project is not open with disableSourceOfProjectReferenceRedirect", () => {
            const { host, session } = setup({ disableSourceOfProjectReferenceRedirect: true });

            // Add new class to referenced project
            const class3 = `/user/username/projects/myproject/projects/project1/class3.ts`;
            host.writeFile(class3, `class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            // Add output of new class to referenced project
            const class3Dts = `/user/username/projects/myproject/projects/project1/class3.d.ts`;
            host.writeFile(class3Dts, `declare class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            // Add excluded file to referenced project
            host.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
            host.runQueuedTimeoutCallbacks();
            // Delete output from new class to referenced project
            host.deleteFile(class3Dts);
            host.runQueuedTimeoutCallbacks();
            // Write back output of new class to referenced project
            host.writeFile(class3Dts, `declare class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectReferences", `new file is added to the referenced project when referenced project is not open with disableSourceOfProjectReferenceRedirect`, session);
        });

        it("when referenced project is open with disableSourceOfProjectReferenceRedirect", () => {
            const { host, session, class1 } = setup({ disableSourceOfProjectReferenceRedirect: true });
            openFilesForSession([class1], session);

            // Add new class to referenced project
            const class3 = `/user/username/projects/myproject/projects/project1/class3.ts`;
            host.writeFile(class3, `class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            // Add output of new class to referenced project
            const class3Dts = `/user/username/projects/myproject/projects/project1/class3.d.ts`;
            host.writeFile(class3Dts, `declare class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            // Add excluded file to referenced project
            host.ensureFileOrFolder({ path: `/user/username/projects/myproject/projects/project1/temp/file.d.ts`, content: `declare class file {}` });
            host.runQueuedTimeoutCallbacks();
            // Delete output from new class to referenced project
            host.deleteFile(class3Dts);
            host.runQueuedTimeoutCallbacks();
            // Write back output of new class to referenced project
            host.writeFile(class3Dts, `declare class class3 {}`);
            host.runQueuedTimeoutCallbacks();
            baselineTsserverLogs("projectReferences", `new file is added to the referenced project when referenced project is open with disableSourceOfProjectReferenceRedirect`, session);
        });
    });

    describe("auto import with referenced project", () => {
        function verifyAutoImport(built: boolean, disableSourceOfProjectReferenceRedirect?: boolean) {
            const solnConfig: File = {
                path: `/user/username/projects/myproject/tsconfig.json`,
                content: jsonToReadableText({
                    files: [],
                    references: [
                        { path: "shared/src/library" },
                        { path: "app/src/program" },
                    ],
                }),
            };
            const sharedConfig: File = {
                path: `/user/username/projects/myproject/shared/src/library/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "../../bld/library",
                    },
                }),
            };
            const sharedIndex: File = {
                path: `/user/username/projects/myproject/shared/src/library/index.ts`,
                content: `export function foo() {}`,
            };
            const sharedPackage: File = {
                path: `/user/username/projects/myproject/shared/package.json`,
                content: jsonToReadableText({
                    name: "shared",
                    version: "1.0.0",
                    main: "bld/library/index.js",
                    types: "bld/library/index.d.ts",
                }),
            };
            const appConfig: File = {
                path: `/user/username/projects/myproject/app/src/program/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "../../bld/program",
                        disableSourceOfProjectReferenceRedirect,
                    },
                    references: [
                        { path: "../../../shared/src/library" },
                    ],
                }),
            };
            const appBar: File = {
                path: `/user/username/projects/myproject/app/src/program/bar.ts`,
                content: `import {foo} from "shared";`,
            };
            const appIndex: File = {
                path: `/user/username/projects/myproject/app/src/program/index.ts`,
                content: `foo`,
            };
            const sharedSymlink: SymLink = {
                path: `/user/username/projects/myproject/node_modules/shared`,
                symLink: `/user/username/projects/myproject/shared`,
            };
            const files = [solnConfig, sharedConfig, sharedIndex, sharedPackage, appConfig, appBar, appIndex, sharedSymlink];
            const host = TestServerHost.createServerHost(files);
            if (built) {
                solutionBuildWithBaseline(host, [solnConfig.path]);
                host.clearOutput();
            }
            const session = new TestSession(host);
            openFilesForSession([appIndex], session);
            session.executeCommandSeq<ts.server.protocol.CodeFixRequest>({
                command: ts.server.protocol.CommandTypes.GetCodeFixes,
                arguments: {
                    file: appIndex.path,
                    startLine: 1,
                    startOffset: 1,
                    endLine: 1,
                    endOffset: 4,
                    errorCodes: [ts.Diagnostics.Cannot_find_name_0.code],
                },
            });
            baselineTsserverLogs("projectReferences", `auto import with referenced project${built ? " when built" : ""}${disableSourceOfProjectReferenceRedirect ? " with disableSourceOfProjectReferenceRedirect" : ""}`, session);
        }

        it("when project is built", () => {
            verifyAutoImport(/*built*/ true);
        });
        it("when project is not built", () => {
            verifyAutoImport(/*built*/ false);
        });
        it("when disableSourceOfProjectReferenceRedirect is true", () => {
            verifyAutoImport(/*built*/ true, /*disableSourceOfProjectReferenceRedirect*/ true);
        });
    });

    it("when files from two projects are open and one project references", () => {
        function getPackageAndFile(packageName: string, references?: string[], optionsToExtend?: ts.CompilerOptions): [file: File, config: File] {
            const file: File = {
                path: `/user/username/projects/myproject/${packageName}/src/file1.ts`,
                content: `export const ${packageName}Const = 10;`,
            };
            const config: File = {
                path: `/user/username/projects/myproject/${packageName}/tsconfig.json`,
                content: jsonToReadableText({
                    compilerOptions: { composite: true, ...optionsToExtend || {} },
                    references: references?.map(path => ({ path: `../${path}` })),
                }),
            };
            return [file, config];
        }
        const [mainFile, mainConfig] = getPackageAndFile("main", ["core", "indirect", "noCoreRef1", "indirectDisabledChildLoad1", "indirectDisabledChildLoad2", "refToCoreRef3", "indirectNoCoreRef"]);
        const [coreFile, coreConfig] = getPackageAndFile("core");
        const [noCoreRef1File, noCoreRef1Config] = getPackageAndFile("noCoreRef1");
        const [indirectFile, indirectConfig] = getPackageAndFile("indirect", ["coreRef1"]);
        const [coreRef1File, coreRef1Config] = getPackageAndFile("coreRef1", ["core"]);
        const [indirectDisabledChildLoad1File, indirectDisabledChildLoad1Config] = getPackageAndFile("indirectDisabledChildLoad1", ["coreRef2"], { disableReferencedProjectLoad: true });
        const [coreRef2File, coreRef2Config] = getPackageAndFile("coreRef2", ["core"]);
        const [indirectDisabledChildLoad2File, indirectDisabledChildLoad2Config] = getPackageAndFile("indirectDisabledChildLoad2", ["coreRef3"], { disableReferencedProjectLoad: true });
        const [coreRef3File, coreRef3Config] = getPackageAndFile("coreRef3", ["core"]);
        const [refToCoreRef3File, refToCoreRef3Config] = getPackageAndFile("refToCoreRef3", ["coreRef3"]);
        const [indirectNoCoreRefFile, indirectNoCoreRefConfig] = getPackageAndFile("indirectNoCoreRef", ["noCoreRef2"]);
        const [noCoreRef2File, noCoreRef2Config] = getPackageAndFile("noCoreRef2");

        const host = TestServerHost.createServerHost([
            mainFile,
            mainConfig,
            coreFile,
            coreConfig,
            noCoreRef1File,
            noCoreRef1Config,
            indirectFile,
            indirectConfig,
            coreRef1File,
            coreRef1Config,
            indirectDisabledChildLoad1File,
            indirectDisabledChildLoad1Config,
            coreRef2File,
            coreRef2Config,
            indirectDisabledChildLoad2File,
            indirectDisabledChildLoad2Config,
            coreRef3File,
            coreRef3Config,
            refToCoreRef3File,
            refToCoreRef3Config,
            indirectNoCoreRefFile,
            indirectNoCoreRefConfig,
            noCoreRef2File,
            noCoreRef2Config,
        ], { useCaseSensitiveFileNames: true });
        const session = new TestSession(host);
        openFilesForSession([mainFile, coreFile], session);

        // Find all refs in coreFile
        session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
            command: ts.server.protocol.CommandTypes.References,
            arguments: protocolFileLocationFromSubstring(coreFile, `coreConst`),
        });
        baselineTsserverLogs("projectReferences", `when files from two projects are open and one project references`, session);
    });

    describe("find refs to decl in other proj", () => {
        const indexA: File = {
            path: `/user/username/projects/myproject/a/index.ts`,
            content: `import { B } from "../b/lib";

const b: B = new B();`,
        };

        const configB: File = {
            path: `/user/username/projects/myproject/b/tsconfig.json`,
            content: jsonToReadableText({
                compilerOptions: {
                    declarationMap: true,
                    outDir: "lib",
                    composite: true,
                },
            }),
        };

        const indexB: File = {
            path: `/user/username/projects/myproject/b/index.ts`,
            content: `export class B {
    M() {}
}`,
        };

        const helperB: File = {
            path: `/user/username/projects/myproject/b/helper.ts`,
            content: `import { B } from ".";

const b: B = new B();`,
        };

        const dtsB: File = {
            path: `/user/username/projects/myproject/b/lib/index.d.ts`,
            content: `export declare class B {
    M(): void;
}
//# sourceMappingURL=index.d.ts.map`,
        };

        const dtsMapB: File = {
            path: `/user/username/projects/myproject/b/lib/index.d.ts.map`,
            content: jsonToReadableText({
                version: 3,
                file: "index.d.ts",
                sourceRoot: "",
                sources: ["../index.ts"],
                names: [],
                mappings: "AAAA,qBAAa,CAAC;IACV,CAAC;CACJ",
            }),
        };

        function baselineDisableReferencedProjectLoad(
            projectAlreadyLoaded: boolean,
            disableReferencedProjectLoad: boolean,
            disableSourceOfProjectReferenceRedirect: boolean,
            dtsMapPresent: boolean,
        ) {
            // Mangled to stay under windows path length limit
            const subScenario = `when proj ${projectAlreadyLoaded ? "is" : "is not"} loaded` +
                ` and refd proj loading is ${disableReferencedProjectLoad ? "disabled" : "enabled"}` +
                ` and proj ref redirects are ${disableSourceOfProjectReferenceRedirect ? "disabled" : "enabled"}` +
                ` and a decl map is ${dtsMapPresent ? "present" : "missing"}`;
            const compilerOptions: ts.CompilerOptions = {
                disableReferencedProjectLoad,
                disableSourceOfProjectReferenceRedirect,
                composite: true,
            };

            it(subScenario, () => {
                const configA: File = {
                    path: `/user/username/projects/myproject/a/tsconfig.json`,
                    content: jsonToReadableText({
                        compilerOptions,
                        references: [{ path: "../b" }],
                    }),
                };

                const host = TestServerHost.createServerHost([configA, indexA, configB, indexB, helperB, dtsB, ...(dtsMapPresent ? [dtsMapB] : [])]);
                const session = new TestSession(host);
                openFilesForSession([indexA, ...(projectAlreadyLoaded ? [helperB] : [])], session);

                session.executeCommandSeq<ts.server.protocol.ReferencesRequest>({
                    command: ts.server.protocol.CommandTypes.References,
                    arguments: protocolFileLocationFromSubstring(indexA, `B`, { index: 1 }),
                });
                baselineTsserverLogs("projectReferences", `find refs to decl in other proj ${subScenario}`, session);
            });
        }

        /* eslint-disable local/argument-trivia */
        // dprint-ignore
        {
            // Pre-loaded = A file from project B is already open when FAR is invoked
            // dRPL = Project A has disableReferencedProjectLoad
            // dSOPRR = Project A has disableSourceOfProjectReferenceRedirect
            // Map = The declaration map file b/lib/index.d.ts.map exists
            // B refs = files under directory b in which references are found (all scenarios find all references in a/index.ts)

            //                                   Pre-loaded | dRPL   | dSOPRR | Map      | B state    | Notes        | B refs              | Notes
            //                                   -----------+--------+--------+----------+------------+--------------+---------------------+---------------------------------------------------
            baselineDisableReferencedProjectLoad(true,        true,    true,    true);  // Pre-loaded |              | index.ts, helper.ts | Via map and pre-loaded project
            baselineDisableReferencedProjectLoad(true,        true,    true,    false); // Pre-loaded |              | lib/index.d.ts      | Even though project is loaded
            baselineDisableReferencedProjectLoad(true,        true,    false,   true);  // Pre-loaded |              | index.ts, helper.ts |
            baselineDisableReferencedProjectLoad(true,        true,    false,   false); // Pre-loaded |              | index.ts, helper.ts |
            baselineDisableReferencedProjectLoad(true,        false,   true,    true);  // Pre-loaded |              | index.ts, helper.ts | Via map and pre-loaded project
            baselineDisableReferencedProjectLoad(true,        false,   true,    false); // Pre-loaded |              | lib/index.d.ts      | Even though project is loaded
            baselineDisableReferencedProjectLoad(true,        false,   false,   true);  // Pre-loaded |              | index.ts, helper.ts |
            baselineDisableReferencedProjectLoad(true,        false,   false,   false); // Pre-loaded |              | index.ts, helper.ts |
            baselineDisableReferencedProjectLoad(false,       true,    true,    true);  // Not loaded |              | lib/index.d.ts      | Even though map is present
            baselineDisableReferencedProjectLoad(false,       true,    true,    false); // Not loaded |              | lib/index.d.ts      |
            baselineDisableReferencedProjectLoad(false,       true,    false,   true);  // Not loaded |              | index.ts            | But not helper.ts, which is not referenced from a
            baselineDisableReferencedProjectLoad(false,       true,    false,   false); // Not loaded |              | index.ts            | But not helper.ts, which is not referenced from a
            baselineDisableReferencedProjectLoad(false,       false,   true,    true);  // Loaded     | Via map      | index.ts, helper.ts | Via map and newly loaded project
            baselineDisableReferencedProjectLoad(false,       false,   true,    false); // Not loaded |              | lib/index.d.ts      |
            baselineDisableReferencedProjectLoad(false,       false,   false,   true);  // Loaded     | Via redirect | index.ts, helper.ts |
            baselineDisableReferencedProjectLoad(false,       false,   false,   false); // Loaded     | Via redirect | index.ts, helper.ts |
        }
        /* eslint-enable local/argument-trivia */
    });

    describe("when file is not part of first config tree found", () => {
        it("finds default project", () => {
            const { session, appDemo, baseline, verifyProjectManagement } = setup();
            verifyGetErrRequest({
                files: [appDemo],
                session,
            });
            verifyProjectManagement(); // Should not remove projects for file
            closeFilesForSession([appDemo], session);
            verifyProjectManagement(); // Should remove projects for file
            baseline("finds default project");
        });

        // Changes to app Config
        verifyAppConfigNotComposite();

        // Changes to solution Config
        verifySolutionConfigWithoutReferenceToDemo();
        verifySolutionConfigDelete();

        // Demo config
        verfiyDemoConfigChange();

        it("reload projects", () => {
            const { session, baseline } = setup();
            session.executeCommandSeq<ts.server.protocol.ReloadProjectsRequest>({
                command: ts.server.protocol.CommandTypes.ReloadProjects,
            });
            baseline("reload projects");
        });

        function setup() {
            const appDemo: File = {
                path: "/home/src/projects/project/app/Component-demos.ts",
                content: dedent`
                import * as helpers from 'demos/helpers';
                export const demo = () => {
                    helpers;
                }
            `,
            };
            const app: File = {
                path: "/home/src/projects/project/app/Component.ts",
                content: dedent`
                export const Component = () => {}
            `,
            };
            const appConfig: File = {
                path: "/home/src/projects/project/app/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        outDir: "../app-dist/",
                    },
                    include: ["**/*"],
                    exclude: ["**/*-demos.*"],
                }),
            };
            const demoHelpers: File = {
                path: "/home/src/projects/project/demos/helpers.ts",
                content: dedent`
                export const foo = 1;
            `,
            };
            const demoConfig: File = {
                path: "/home/src/projects/project/demos/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        composite: true,
                        rootDir: "../",
                        outDir: "../demos-dist/",
                        paths: {
                            "demos/*": ["./*"],
                        },
                    },
                    include: [
                        "**/*",
                        "../app/**/*-demos.*",
                    ],
                }),
            };
            const solutionConfig: File = {
                path: "/home/src/projects/project/tsconfig.json",
                content: jsonToReadableText({
                    compilerOptions: {
                        outDir: "./dist/",
                    },
                    references: [
                        { path: "./demos/tsconfig.json" },
                        { path: "./app/tsconfig.json" },
                    ],
                }),
            };
            const randomTs: File = {
                path: "/home/src/projects/random/random.ts",
                content: "export let a = 10;",
            };
            const randomConfig: File = {
                path: "/home/src/projects/random/tsconfig.json",
                content: "{ }",
            };
            const host = TestServerHost.createServerHost([appDemo, app, appConfig, demoHelpers, demoConfig, solutionConfig, randomTs, randomConfig]);
            const session = new TestSession(host);
            openFilesForSession([appDemo], session);
            return {
                host,
                session,
                appDemo,
                configs: { appConfig, demoConfig, solutionConfig },
                verifyProjectManagement,
                baseline,
            };

            function verifyProjectManagement() {
                logDefaultProjectAndDefaultConfiguredProject(session, appDemo);
                openFilesForSession([randomTs], session); // Verify Project management
                closeFilesForSession([randomTs], session);
                logDefaultProjectAndDefaultConfiguredProject(session, appDemo);
            }

            function baseline(scenario: string) {
                baselineTsserverLogs(
                    "projectReferences",
                    `when file is not part of first config tree found ${scenario}`,
                    session,
                );
            }
        }

        function verifyAppConfigNotComposite() {
            // Not composite
            verifyConfigChange("appConfig not composite", ({ appConfig }) => ({
                config: appConfig,
                change: appConfig.content.replace(`"composite": true,`, ""),
            }));
        }

        function verifySolutionConfigWithoutReferenceToDemo() {
            // Not referencing demos
            verifyConfigChange("solutionConfig without reference to demo", ({ solutionConfig }) => ({
                config: solutionConfig,
                change: jsonToReadableText({
                    compilerOptions: {
                        outDir: "./dist/",
                    },
                    references: [
                        { path: "./app/tsconfig.json" },
                    ],
                }),
            }));
        }

        function verifySolutionConfigDelete() {
            // Delete solution file
            verifyConfigChange("solutionConfig delete", ({ solutionConfig }) => ({
                config: solutionConfig,
                change: undefined,
            }));
        }

        function verfiyDemoConfigChange() {
            // Make some errors in demo::
            verifyConfigChange("demoConfig change", ({ demoConfig }) => ({
                config: demoConfig,
                change: demoConfig.content.replace(`"../app/**/*-demos.*"`, ""),
            }));
        }

        function verifyConfigChange(
            scenario: string,
            configAndChange: (configs: ReturnType<typeof setup>["configs"]) => { config: File; change: string | undefined; },
        ) {
            verifyConfigChangeWorker(scenario, /*fileOpenBeforeRevert*/ true, configAndChange);
            verifyConfigChangeWorker(scenario, /*fileOpenBeforeRevert*/ false, configAndChange);
        }

        function verifyConfigChangeWorker(
            scenario: string,
            fileOpenBeforeRevert: boolean,
            configAndChange: (configs: ReturnType<typeof setup>["configs"]) => { config: File; change: string | undefined; },
        ) {
            it(`${scenario}${fileOpenBeforeRevert ? " with file open before revert" : ""}`, () => {
                const { host, session, appDemo, configs, verifyProjectManagement, baseline } = setup();
                const { config, change } = configAndChange(configs);

                if (change !== undefined) host.writeFile(config.path, change);
                else host.deleteFile(config.path);
                host.runQueuedTimeoutCallbacks();

                if (fileOpenBeforeRevert) verifyProjectManagement();
                else logDefaultProjectAndDefaultConfiguredProject(session, appDemo);

                // Revert
                host.writeFile(config.path, config.content);
                host.runQueuedTimeoutCallbacks();

                if (!fileOpenBeforeRevert) verifyProjectManagement();
                else logDefaultProjectAndDefaultConfiguredProject(session, appDemo);

                baseline(`${scenario}${fileOpenBeforeRevert ? " with file open before revert" : ""}`);
            });
        }
    });

    it("with dts file next to ts file", () => {
        const indexDts: File = {
            path: "/home/src/projects/project/src/index.d.ts",
            content: dedent`
                declare global {
                    interface Window {
                        electron: ElectronAPI
                        api: unknown
                    }
                }
            `,
        };
        const host = TestServerHost.createServerHost({
            [indexDts.path]: indexDts.content,
            "/home/src/projects/project/src/index.ts": dedent`
                const api = {}
            `,
            "/home/src/projects/project/tsconfig.json": jsonToReadableText({
                include: [
                    "src/*.d.ts",
                ],
                references: [{ path: "./tsconfig.node.json" }],
            }),
            "/home/src/projects/project/tsconfig.node.json": jsonToReadableText({
                include: ["src/**/*"],
                compilerOptions: {
                    composite: true,
                },
            }),
        });
        const session = new TestSession(host);
        openFilesForSession([{ file: indexDts, projectRootPath: "/home/src/projects/project" }], session);
        session.executeCommandSeq<ts.server.protocol.DocumentHighlightsRequest>({
            command: ts.server.protocol.CommandTypes.DocumentHighlights,
            arguments: {
                ...protocolFileLocationFromSubstring(indexDts, "global"),
                filesToSearch: ["/home/src/projects/project/src/index.d.ts"],
            },
        });
        session.executeCommandSeq<ts.server.protocol.EncodedSemanticClassificationsRequest>({
            command: ts.server.protocol.CommandTypes.EncodedSemanticClassificationsFull,
            arguments: {
                file: indexDts.path,
                start: 0,
                length: indexDts.content.length,
                format: "2020",
            },
        });
        baselineTsserverLogs("projectReferences", "with dts file next to ts file", session);
    });
});
