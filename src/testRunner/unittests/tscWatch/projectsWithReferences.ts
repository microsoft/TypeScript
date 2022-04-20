namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: projects with references: invoking when references are already built", () => {
        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: "on sample project",
            sys: () => createSystemWithSolutionBuild(
                ["tests"],
                [
                    libFile,
                    VirtualFS.getTsBuildProjectFile("sample1", "core/tsconfig.json"),
                    VirtualFS.getTsBuildProjectFile("sample1", "core/index.ts"),
                    VirtualFS.getTsBuildProjectFile("sample1", "core/anotherModule.ts"),
                    VirtualFS.getTsBuildProjectFile("sample1", "core/some_decl.d.ts"),
                    VirtualFS.getTsBuildProjectFile("sample1", "logic/tsconfig.json"),
                    VirtualFS.getTsBuildProjectFile("sample1", "logic/index.ts"),
                    VirtualFS.getTsBuildProjectFile("sample1", "tests/tsconfig.json"),
                    VirtualFS.getTsBuildProjectFile("sample1", "tests/index.ts"),
                ],
                { currentDirectory: `${VirtualFS.tsbuildProjectsLocation}/sample1` }
            ),
            commandLineArgs: ["-w", "-p", "tests"],
            changes: [
                {
                    caption: "local edit in logic ts, and build logic",
                    change: sys => {
                        sys.appendFile(VirtualFS.getTsBuildProjectFilePath("sample1", "logic/index.ts"), `function foo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    // not ideal, but currently because of d.ts but no new file is written
                    // There will be timeout queued even though file contents are same
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "non local edit in logic ts, and build logic",
                    change: sys => {
                        sys.appendFile(VirtualFS.getTsBuildProjectFilePath("sample1", "logic/index.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "change in project reference config file builds correctly",
                    change: sys => {
                        sys.writeFile(VirtualFS.getTsBuildProjectFilePath("sample1", "logic/tsconfig.json"), JSON.stringify({
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
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "tsconfig.b.json"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "tsconfig.c.json"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "a.ts"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "b.ts"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "c.ts"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${VirtualFS.tsbuildProjectsLocation}/transitiveReferences` }
            ),
            commandLineArgs: ["-w", "-p", "tsconfig.c.json"],
            changes: [
                {
                    caption: "non local edit b ts, and build b",
                    change: sys => {
                        sys.appendFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["tsconfig.b.json"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit on config file",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                            content: sys.readFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                        });
                        changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.c.json"), { "@ref/*": ["./nrefs/*"] });
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.c.json"), { "@ref/*": ["./refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit in referenced config file",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"), { "@ref/*": ["./nrefs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert referenced config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"), { "@ref/*": ["./refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting referenced config file",
                    change: sys => sys.deleteFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json")),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert deleting referenced config file",
                    change: sys => sys.ensureFileOrFolder(VirtualFS.getTsBuildProjectFile("transitiveReferences", "tsconfig.b.json")),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting transitively referenced config file",
                    change: sys => sys.deleteFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.a.json")),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert deleting transitively referenced config file",
                    change: sys => sys.ensureFileOrFolder(VirtualFS.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json")),
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
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json"),
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true, moduleResolution: "classic" },
                            files: ["b.ts"],
                            references: [{ path: "tsconfig.a.json" }]
                        })
                    },
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "tsconfig.c.json"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "a.ts"),
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b.ts"),
                        content: `import {A} from "a";export const b = new A();`
                    },
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "c.ts"),
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${VirtualFS.tsbuildProjectsLocation}/transitiveReferences` }
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
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true },
                            files: ["index.ts"]
                        }),
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../a` }]
                        }),
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../b` }]
                        }),
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/index.ts"),
                        content: `export class A {}`,
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"),
                        content: `import {A} from '@ref/a';
export const b = new A();`,
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/index.ts"),
                        content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                    },
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${VirtualFS.tsbuildProjectsLocation}/transitiveReferences` }
            ),
            commandLineArgs: ["-w", "-p", "c"],
            changes: [
                {
                    caption: "non local edit b ts, and build b",
                    change: sys => {
                        sys.appendFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["b"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit on config file",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                            content: sys.readFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                        });
                        changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../nrefs/*"] });
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit in referenced config file",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../nrefs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert referenced config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting referenced config file",
                    change: sys => sys.deleteFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting referenced config file",
                    change: sys => sys.writeFile(
                        VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
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
                    change: sys => sys.deleteFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting transitively referenced config file",
                    change: sys => sys.writeFile(
                        VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
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
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                        content: JSON.stringify({ compilerOptions: { composite: true } }),
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            references: [{ path: `../a` }]
                        }),
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"),
                        content: JSON.stringify({
                            compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                            references: [{ path: `../b` }]
                        }),
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/index.ts"),
                        content: `export class A {}`,
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"),
                        content: `import {A} from '@ref/a';
export const b = new A();`,
                    },
                    {
                        path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/index.ts"),
                        content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                    },
                    VirtualFS.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
                ],
                { currentDirectory: `${VirtualFS.tsbuildProjectsLocation}/transitiveReferences` }
            ),
            commandLineArgs: ["-w", "-p", "c"],
            changes: [
                {
                    caption: "non local edit b ts, and build b",
                    change: sys => {
                        sys.appendFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"), `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["b"]);
                        solutionBuilder.build();
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit on config file",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                            content: sys.readFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                        });
                        changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../nrefs/*"] });
                    },
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "edit in referenced config file",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../nrefs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "Revert referenced config file edit",
                    change: sys => changeCompilerOpitonsPaths(sys, VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                    timeouts: checkSingleTimeoutQueueLengthAndRun
                },
                {
                    caption: "deleting referenced config file",
                    change: sys => sys.deleteFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting referenced config file",
                    change: sys => sys.writeFile(
                        VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                        JSON.stringify({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            references: [{ path: `../a` }]
                        })
                    ),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "deleting transitively referenced config file",
                    change: sys => sys.deleteFile(VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json")),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
                {
                    caption: "Revert deleting transitively referenced config file",
                    change: sys => sys.writeFile(
                        VirtualFS.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                        JSON.stringify({ compilerOptions: { composite: true } }),
                    ),
                    timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
                },
            ],
            baselineDependencies: true,
        });
    });
}
