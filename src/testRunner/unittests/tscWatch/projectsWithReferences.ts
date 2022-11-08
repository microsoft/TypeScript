import * as ts from "../../_namespaces/ts";

describe("unittests:: tsc-watch:: projects with references: invoking when references are already built", () => {
    ts.tscWatch.verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "on sample project",
        sys: () => ts.tscWatch.createSystemWithSolutionBuild(
            ["tests"],
            [
                ts.tscWatch.libFile,
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/tsconfig.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/index.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/anotherModule.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/some_decl.d.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/tsconfig.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/index.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/tsconfig.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "tests/index.ts"),
            ],
            { currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/sample1` }
        ),
        commandLineArgs: ["-w", "-p", "tests"],
        changes: [
            {
                caption: "local edit in logic ts, and build logic",
                change: sys => {
                    sys.appendFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("sample1", "logic/index.ts"), `function foo() { }`);
                    const solutionBuilder = ts.tscWatch.createSolutionBuilder(sys, ["logic"]);
                    solutionBuilder.build();
                },
                // not ideal, but currently because of d.ts but no new file is written
                // There will be timeout queued even though file contents are same
                timeouts: sys => sys.checkTimeoutQueueLength(0),
            },
            {
                caption: "non local edit in logic ts, and build logic",
                change: sys => {
                    sys.appendFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("sample1", "logic/index.ts"), `export function gfoo() { }`);
                    const solutionBuilder = ts.tscWatch.createSolutionBuilder(sys, ["logic"]);
                    solutionBuilder.build();
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "change in project reference config file builds correctly",
                change: sys => {
                    sys.writeFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("sample1", "logic/tsconfig.json"), JSON.stringify({
                        compilerOptions: { composite: true, declaration: true, declarationDir: "decls" },
                        references: [{ path: "../core" }]
                    }));
                    const solutionBuilder = ts.tscWatch.createSolutionBuilder(sys, ["logic"]);
                    solutionBuilder.build();
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
        ],
        baselineDependencies: true
    });

    function changeCompilerOpitonsPaths(sys: ts.tscWatch.WatchedSystem, config: string, newPaths: object) {
        const configJson = JSON.parse(sys.readFile(config)!);
        configJson.compilerOptions.paths = newPaths;
        sys.writeFile(config, JSON.stringify(configJson));
    }

    ts.tscWatch.verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "on transitive references",
        sys: () => ts.tscWatch.createSystemWithSolutionBuild(
            ["tsconfig.c.json"],
            [
                ts.tscWatch.libFile,
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.b.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.c.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "a.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "b.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "c.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
            ],
            { currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
        ),
        commandLineArgs: ["-w", "-p", "tsconfig.c.json"],
        changes: [
            {
                caption: "non local edit b ts, and build b",
                change: sys => {
                    sys.appendFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b.ts"), `export function gfoo() { }`);
                    const solutionBuilder = ts.tscWatch.createSolutionBuilder(sys, ["tsconfig.b.json"]);
                    solutionBuilder.build();
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "edit on config file",
                change: sys => {
                    sys.ensureFileOrFolder({
                        path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                        content: sys.readFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                    });
                    changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.c.json"), { "@ref/*": ["./nrefs/*"] });
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert config file edit",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.c.json"), { "@ref/*": ["./refs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "edit in referenced config file",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"), { "@ref/*": ["./nrefs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert referenced config file edit",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"), { "@ref/*": ["./refs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "deleting referenced config file",
                change: sys => sys.deleteFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json")),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert deleting referenced config file",
                change: sys => sys.ensureFileOrFolder(ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.b.json")),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "deleting transitively referenced config file",
                change: sys => sys.deleteFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.a.json")),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert deleting transitively referenced config file",
                change: sys => sys.ensureFileOrFolder(ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json")),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
        ],
        baselineDependencies: true,
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "when referenced project uses different module resolution",
        sys: () => ts.tscWatch.createSystemWithSolutionBuild(
            ["tsconfig.c.json"],
            [
                ts.tscWatch.libFile,
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.a.json"),
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "tsconfig.b.json"),
                    content: JSON.stringify({
                        compilerOptions: { composite: true, moduleResolution: "classic" },
                        files: ["b.ts"],
                        references: [{ path: "tsconfig.a.json" }]
                    })
                },
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "tsconfig.c.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "a.ts"),
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b.ts"),
                    content: `import {A} from "a";export const b = new A();`
                },
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "c.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
            ],
            { currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
        ),
        commandLineArgs: ["-w", "-p", "tsconfig.c.json"],
        changes: ts.emptyArray,
        baselineDependencies: true,
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "on transitive references in different folders",
        sys: () => ts.tscWatch.createSystemWithSolutionBuild(
            ["c"],
            [
                ts.tscWatch.libFile,
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                    content: JSON.stringify({
                        compilerOptions: { composite: true },
                        files: ["index.ts"]
                    }),
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                    content: JSON.stringify({
                        compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                        files: ["index.ts"],
                        references: [{ path: `../a` }]
                    }),
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"),
                    content: JSON.stringify({
                        compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                        files: ["index.ts"],
                        references: [{ path: `../b` }]
                    }),
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/index.ts"),
                    content: `export class A {}`,
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"),
                    content: `import {A} from '@ref/a';
export const b = new A();`,
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/index.ts"),
                    content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                },
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
            ],
            { currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
        ),
        commandLineArgs: ["-w", "-p", "c"],
        changes: [
            {
                caption: "non local edit b ts, and build b",
                change: sys => {
                    sys.appendFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"), `export function gfoo() { }`);
                    const solutionBuilder = ts.tscWatch.createSolutionBuilder(sys, ["b"]);
                    solutionBuilder.build();
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "edit on config file",
                change: sys => {
                    sys.ensureFileOrFolder({
                        path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                        content: sys.readFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                    });
                    changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../nrefs/*"] });
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert config file edit",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "edit in referenced config file",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../nrefs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert referenced config file edit",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "deleting referenced config file",
                change: sys => sys.deleteFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json")),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
            },
            {
                caption: "Revert deleting referenced config file",
                change: sys => sys.writeFile(
                    ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
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
                change: sys => sys.deleteFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json")),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
            },
            {
                caption: "Revert deleting transitively referenced config file",
                change: sys => sys.writeFile(
                    ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
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

    ts.tscWatch.verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "on transitive references in different folders with no files clause",
        sys: () => ts.tscWatch.createSystemWithSolutionBuild(
            ["c"],
            [
                ts.tscWatch.libFile,
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                    content: JSON.stringify({ compilerOptions: { composite: true } }),
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                    content: JSON.stringify({
                        compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                        references: [{ path: `../a` }]
                    }),
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"),
                    content: JSON.stringify({
                        compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                        references: [{ path: `../b` }]
                    }),
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/index.ts"),
                    content: `export class A {}`,
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"),
                    content: `import {A} from '@ref/a';
export const b = new A();`,
                },
                {
                    path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/index.ts"),
                    content: `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                },
                ts.TestFSWithWatch.getTsBuildProjectFile("transitiveReferences", "refs/a.d.ts"),
            ],
            { currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/transitiveReferences` }
        ),
        commandLineArgs: ["-w", "-p", "c"],
        changes: [
            {
                caption: "non local edit b ts, and build b",
                change: sys => {
                    sys.appendFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/index.ts"), `export function gfoo() { }`);
                    const solutionBuilder = ts.tscWatch.createSolutionBuilder(sys, ["b"]);
                    solutionBuilder.build();
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "edit on config file",
                change: sys => {
                    sys.ensureFileOrFolder({
                        path: ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "nrefs/a.d.ts"),
                        content: sys.readFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "refs/a.d.ts"))!
                    });
                    changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../nrefs/*"] });
                },
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert config file edit",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "c/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "edit in referenced config file",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../nrefs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "Revert referenced config file edit",
                change: sys => changeCompilerOpitonsPaths(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"), { "@ref/*": ["../refs/*"] }),
                timeouts: ts.tscWatch.checkSingleTimeoutQueueLengthAndRun
            },
            {
                caption: "deleting referenced config file",
                change: sys => sys.deleteFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json")),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
            },
            {
                caption: "Revert deleting referenced config file",
                change: sys => sys.writeFile(
                    ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "b/tsconfig.json"),
                    JSON.stringify({
                        compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                        references: [{ path: `../a` }]
                    })
                ),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
            },
            {
                caption: "deleting transitively referenced config file",
                change: sys => sys.deleteFile(ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json")),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
            },
            {
                caption: "Revert deleting transitively referenced config file",
                change: sys => sys.writeFile(
                    ts.TestFSWithWatch.getTsBuildProjectFilePath("transitiveReferences", "a/tsconfig.json"),
                    JSON.stringify({ compilerOptions: { composite: true } }),
                ),
                timeouts: sys => sys.checkTimeoutQueueLengthAndRun(2)
            },
        ],
        baselineDependencies: true,
    });

    ts.tscWatch.verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "when declarationMap changes for dependency",
        sys: () => ts.tscWatch.createSystemWithSolutionBuild(
            ["core"],
            [
                ts.tscWatch.libFile,
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/tsconfig.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/index.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/anotherModule.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "core/some_decl.d.ts"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/tsconfig.json"),
                ts.TestFSWithWatch.getTsBuildProjectFile("sample1", "logic/index.ts"),
            ],
            { currentDirectory: `${ts.TestFSWithWatch.tsbuildProjectsLocation}/sample1` }
        ),
        commandLineArgs: ["-w", "-p", "logic"],
        changes: [
            {
                caption: "change declration map in core",
                change: sys => {
                    ts.tscWatch.replaceFileText(sys, ts.TestFSWithWatch.getTsBuildProjectFilePath("sample1", "core/tsconfig.json"), `"declarationMap": true,`, `"declarationMap": false,`);
                    const solutionBuilder = ts.tscWatch.createSolutionBuilder(sys, ["core"]);
                    solutionBuilder.build();
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(0),
            },
        ],
        baselineDependencies: true
    });
});