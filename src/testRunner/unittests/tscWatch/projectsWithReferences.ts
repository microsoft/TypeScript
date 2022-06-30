namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: projects with references: invoking when references are already built", () => {
        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: "on sample project",
            sys: () => createSystemWithSolutionBuild(
                ["tests"],
                [
                    libFile,
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "core/tsconfig.json"),
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "core/index.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "core/anotherModule.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "core/some_decl.d.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/tsconfig.json"),
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/index.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/tsconfig.json"),
                    TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/index.ts"),
                ],
                { currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/sample1` }
            ),
            commandLineArgs: ["-w", "-p", "tests"],
            changes: [
                {
                    caption: "local edit in logic ts, and build logic",
                    change: sys => {
                        sys.appendFile(TestFSWithWatch.getTsBuildProjectFilePath("sample1", "logic/index.ts"), `function foo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    // not ideal, but currently because of d.ts but no new file is written
                    // There will be timeout queued even though file contents are same
                    timeouts: sys => sys.checkTimeoutQueueLength(0),
                },
                {
                    caption: "non local edit in logic ts, and build logic",
                    change: sys => {
                        sys.appendFile(TestFSWithWatch.getTsBuildProjectFilePath("sample1", "logic/index.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "change in project reference config file builds correctly",
                    change: sys => {
                        sys.writeFile(TestFSWithWatch.getTsBuildProjectFilePath("sample1", "logic/tsconfig.json"), JSON.stringify({
                            compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
                            references: [{ path: "../core" }]
                        }));
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
            ],
            baselineDependencies: true
        });

        function changeCompilerOpitonsPaths(sys: WatchedSystem, config: string, newPaths: object) {
            const configJson = JSON.parse(sys.readFile(config)!);
            configJson.compilerOptions.paths = newPaths;
            sys.writeFile(config, JSON.stringify(configJson));
        }

        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: "on transitive references",
            sys: () => createSystemWithSolutionBuild(
                ["tsconfig.c.json"],
                [
                    libFile,
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.b.json"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.c.json"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "a.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "b.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "c.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
            ),
            commandLineArgs: ["-w", "-p", "tsconfig.c.json"],
            changes: [
                {
                    caption: "non local edit b ts, and build b",
                    change: sys => {
                        sys.appendFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["tsconfig.b.json"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit on config file",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                            content: sys.readFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                        });
                        changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.c.json"), { "@ref/*": ["./nrefs/*"] });
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.c.json"), { "@ref/*": ["./refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit in referenced config file",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"), { "@ref/*": ["./nrefs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert referenced config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"), { "@ref/*": ["./refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting referenced config file",
                    change: sys => sys.deleteFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json")),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert deleting referenced config file",
                    change: sys => sys.ensureFileOrFolder(TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.b.json")),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting transitively referenced config file",
                    change: sys => sys.deleteFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.a.json")),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert deleting transitively referenced config file",
                    change: sys => sys.ensureFileOrFolder(TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json")),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
            ],
            baselineDependencies: true,
        });

        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: "when referenced project uses different module resolution",
            sys: () => createSystemWithSolutionBuild(
                ["tsconfig.c.json"],
                [
                    libFile,
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json"),
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true, moduleResolution: "classic" },
                            files: ["b.ts"],
                            references: [{ path: "tsconfig.a.json" }]
                        })
                    },
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.c.json"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "a.ts"),
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b.ts"),
                        content: `import {A} from "a";export const b = new A();`
                    },
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "c.ts"),
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
            ),
            commandLineArgs: ["-w", "-p", "tsconfig.c.json"],
            changes: emptyArray,
            baselineDependencies: true,
        });

        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: "on transitive references in different folders",
            sys: () => createSystemWithSolutionBuild(
                ["c"],
                [
                    libFile,
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true },
                            files: ["index.ts"]
                        }),
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../a` }]
                        }),
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../b` }]
                        }),
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/index.ts"),
                        content: `export class A {}`,
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"),
                        content: `import {A} from '@ref/a';
export const b = new A();`,
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/index.ts"),
                        content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                    },
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
            ),
            commandLineArgs: ["-w", "-p", "c"],
            changes: [
                {
                    caption: "non local edit b ts, and build b",
                    change: sys => {
                        sys.appendFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["b"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit on config file",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                            content: sys.readFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                        });
                        changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../nrefs/*"] });
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit in referenced config file",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../nrefs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert referenced config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting referenced config file",
                    change: sys => sys.deleteFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting referenced config file",
                    change: sys => sys.writeFile(
                        TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                        JSON.stringify({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../a` }]
                        })
                    ),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "deleting transitively referenced config file",
                    change: sys => sys.deleteFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting transitively referenced config file",
                    change: sys => sys.writeFile(
                        TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                        JSON.stringify({
                            compilerOptions: { composite: true },
                            files: ["index.ts"]
                        }),
                    ),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
            ],
            baselineDependencies: true,
        });

        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: "on transitive references in different folders with no files clause",
            sys: () => createSystemWithSolutionBuild(
                ["c"],
                [
                    libFile,
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                        content: JSON.stringify({ compilerOptions: { composite: true } }),
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            references: [{ path: `../a` }]
                        }),
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                            references: [{ path: `../b` }]
                        }),
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/index.ts"),
                        content: `export class A {}`,
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"),
                        content: `import {A} from '@ref/a';
export const b = new A();`,
                    },
                    {
                        path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/index.ts"),
                        content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                    },
                    TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
            ),
            commandLineArgs: ["-w", "-p", "c"],
            changes: [
                {
                    caption: "non local edit b ts, and build b",
                    change: sys => {
                        sys.appendFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["b"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit on config file",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                            content: sys.readFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                        });
                        changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../nrefs/*"] });
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit in referenced config file",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../nrefs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert referenced config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting referenced config file",
                    change: sys => sys.deleteFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting referenced config file",
                    change: sys => sys.writeFile(
                        TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                        JSON.stringify({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            references: [{ path: `../a` }]
                        })
                    ),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "deleting transitively referenced config file",
                    change: sys => sys.deleteFile(TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting transitively referenced config file",
                    change: sys => sys.writeFile(
                        TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                        JSON.stringify({ compilerOptions: { composite: true } }),
                    ),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
            ],
            baselineDependencies: true,
        });
    });
}