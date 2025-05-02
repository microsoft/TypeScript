import { noop } from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { getProjectConfigWithNodeNext } from "../helpers/contents.js";
import {
    getSysForSampleProjectReferences,
    getSysForSampleProjectReferencesBuilt,
} from "../helpers/sampleProjectReferences.js";
import {
    createSolutionBuilder,
    solutionBuildWithBaseline,
} from "../helpers/solutionBuilder.js";
import {
    getFsContentsForTransitiveReferencesAConfig,
    getFsContentsForTransitiveReferencesBConfig,
    getFsContentsForTransitiveReferencesRefsAdts,
    getSysForTransitiveReferences,
} from "../helpers/transitiveReferences.js";
import { verifyTscWatch } from "../helpers/tscWatch.js";
import { TestServerHost } from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: projectsWithReferences:: invoking when references are already built", () => {
    function verifySampleProject(withNodeNext: boolean) {
        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: `on sample project${withNodeNext ? " with nodenext" : ""}`,
            sys: () => getSysForSampleProjectReferencesBuilt(withNodeNext),
            commandLineArgs: ["-w", "-p", "tests", "--traceResolution", "--explainFiles"],
            edits: [
                {
                    caption: "local edit in logic ts, and build logic",
                    edit: sys => {
                        sys.appendFile("/user/username/projects/sample1/logic/index.ts", `function foo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    // not ideal, but currently because of d.ts but no new file is written
                    // There will be timeout queued even though file contents are same
                    timeouts: noop,
                },
                {
                    caption: "non local edit in logic ts, and build logic",
                    edit: sys => {
                        sys.appendFile("/user/username/projects/sample1/logic/index.ts", `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "change in project reference config file builds correctly",
                    edit: sys => {
                        sys.writeFile(
                            "/user/username/projects/sample1/logic/tsconfig.json",
                            jsonToReadableText({
                                compilerOptions: {
                                    ...getProjectConfigWithNodeNext(withNodeNext),
                                    composite: true,
                                    declaration: true,
                                    declarationDir: "decls",
                                },
                                references: [{ path: "../core" }],
                            }),
                        );
                        const solutionBuilder = createSolutionBuilder(sys, ["logic"]);
                        solutionBuilder.build();
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
            baselineDependencies: true,
        });
    }
    verifySampleProject(/*withNodeNext*/ false);
    verifySampleProject(/*withNodeNext*/ true);

    function changeCompilerOpitonsPaths(sys: TestServerHost, config: string, newPaths: object) {
        const configJson = JSON.parse(sys.readFile(config)!);
        configJson.compilerOptions.paths = newPaths;
        sys.writeFile(config, jsonToReadableText(configJson));
    }

    function verifyTransitiveReferences(withNodeNext: boolean) {
        verifyTscWatch({
            scenario: "projectsWithReferences",
            subScenario: `on transitive references${withNodeNext ? " with nodenext" : ""}`,
            sys: () =>
                solutionBuildWithBaseline(
                    getSysForTransitiveReferences(withNodeNext),
                    ["tsconfig.c.json"],
                ),
            commandLineArgs: ["-w", "-p", "tsconfig.c.json", "--traceResolution", "--explainFiles"],
            edits: [
                {
                    caption: "non local edit b ts, and build b",
                    edit: sys => {
                        sys.appendFile("b.ts", `export function gfoo() { }`);
                        const solutionBuilder = createSolutionBuilder(sys, ["tsconfig.b.json"]);
                        solutionBuilder.build();
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "edit on config file",
                    edit: sys => {
                        sys.ensureFileOrFolder({
                            path: "/user/username/projects/transitiveReferences/nrefs/a.d.ts",
                            content: sys.readFile("/user/username/projects/transitiveReferences/refs/a.d.ts")!,
                        });
                        changeCompilerOpitonsPaths(sys, "tsconfig.c.json", { "@ref/*": ["./nrefs/*"] });
                    },
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Revert config file edit",
                    edit: sys => changeCompilerOpitonsPaths(sys, "tsconfig.c.json", { "@ref/*": ["./refs/*"] }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "edit in referenced config file",
                    edit: sys => changeCompilerOpitonsPaths(sys, "tsconfig.b.json", { "@ref/*": ["./nrefs/*"] }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Revert referenced config file edit",
                    edit: sys => changeCompilerOpitonsPaths(sys, "tsconfig.b.json", { "@ref/*": ["./refs/*"] }),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "deleting referenced config file",
                    edit: sys => sys.deleteFile("tsconfig.b.json"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Revert deleting referenced config file",
                    edit: sys => sys.writeFile("tsconfig.b.json", getFsContentsForTransitiveReferencesBConfig(withNodeNext)),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "deleting transitively referenced config file",
                    edit: sys => sys.deleteFile("tsconfig.a.json"),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
                {
                    caption: "Revert deleting transitively referenced config file",
                    edit: sys => sys.writeFile("tsconfig.a.json", getFsContentsForTransitiveReferencesAConfig(withNodeNext)),
                    timeouts: sys => sys.runQueuedTimeoutCallbacks(),
                },
            ],
            baselineDependencies: true,
        });
    }
    verifyTransitiveReferences(/*withNodeNext*/ false);
    verifyTransitiveReferences(/*withNodeNext*/ true);

    verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "when referenced project uses different module resolution",
        sys: () => {
            const sys = getSysForTransitiveReferences();
            sys.writeFile(
                "/user/username/projects/transitiveReferences/tsconfig.b.json",
                jsonToReadableText({
                    compilerOptions: { composite: true, moduleResolution: "classic" },
                    files: ["b.ts"],
                    references: [{ path: "tsconfig.a.json" }],
                }),
            );
            sys.writeFile("/user/username/projects/transitiveReferences/b.ts", `import {A} from "a";export const b = new A();`);
            return solutionBuildWithBaseline(sys, ["tsconfig.c.json"]);
        },
        commandLineArgs: ["-w", "-p", "tsconfig.c.json", "--traceResolution", "--explainFiles"],
        baselineDependencies: true,
    });

    verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "on transitive references in different folders",
        sys: () =>
            solutionBuildWithBaseline(
                TestServerHost.createWatchedSystem(
                    {
                        "/user/username/projects/transitiveReferences/a/tsconfig.json": jsonToReadableText({
                            compilerOptions: { composite: true },
                            files: ["index.ts"],
                        }),
                        "/user/username/projects/transitiveReferences/b/tsconfig.json": jsonToReadableText({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../a` }],
                        }),
                        "/user/username/projects/transitiveReferences/c/tsconfig.json": jsonToReadableText({
                            compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../b` }],
                        }),
                        "/user/username/projects/transitiveReferences/a/index.ts": `export class A {}`,
                        "/user/username/projects/transitiveReferences/b/index.ts": `import {A} from '@ref/a';
export const b = new A();`,
                        "/user/username/projects/transitiveReferences/c/index.ts": `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                        "/user/username/projects/transitiveReferences/refs/a.d.ts": getFsContentsForTransitiveReferencesRefsAdts(),
                    },
                    { currentDirectory: `/user/username/projects/transitiveReferences` },
                ),
                ["c"],
            ),
        commandLineArgs: ["-w", "-p", "c", "--traceResolution", "--explainFiles"],
        edits: [
            {
                caption: "non local edit b ts, and build b",
                edit: sys => {
                    sys.appendFile("b/index.ts", `export function gfoo() { }`);
                    const solutionBuilder = createSolutionBuilder(sys, ["b"]);
                    solutionBuilder.build();
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "edit on config file",
                edit: sys => {
                    sys.ensureFileOrFolder({
                        path: "/user/username/projects/transitiveReferences/nrefs/a.d.ts",
                        content: sys.readFile("/user/username/projects/transitiveReferences/refs/a.d.ts")!,
                    });
                    changeCompilerOpitonsPaths(sys, "c/tsconfig.json", { "@ref/*": ["../nrefs/*"] });
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert config file edit",
                edit: sys => changeCompilerOpitonsPaths(sys, "c/tsconfig.json", { "@ref/*": ["../refs/*"] }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "edit in referenced config file",
                edit: sys => changeCompilerOpitonsPaths(sys, "b/tsconfig.json", { "@ref/*": ["../nrefs/*"] }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert referenced config file edit",
                edit: sys => changeCompilerOpitonsPaths(sys, "b/tsconfig.json", { "@ref/*": ["../refs/*"] }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "deleting referenced config file",
                edit: sys => sys.deleteFile("b/tsconfig.json"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert deleting referenced config file",
                edit: sys =>
                    sys.writeFile(
                        "b/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            files: ["index.ts"],
                            references: [{ path: `../a` }],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "deleting transitively referenced config file",
                edit: sys => sys.deleteFile("a/tsconfig.json"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert deleting transitively referenced config file",
                edit: sys =>
                    sys.writeFile(
                        "a/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { composite: true },
                            files: ["index.ts"],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
        baselineDependencies: true,
    });

    verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "on transitive references in different folders with no files clause",
        sys: () =>
            solutionBuildWithBaseline(
                TestServerHost.createWatchedSystem(
                    {
                        "/user/username/projects/transitiveReferences/a/tsconfig.json": jsonToReadableText({ compilerOptions: { composite: true } }),
                        "/user/username/projects/transitiveReferences/b/tsconfig.json": jsonToReadableText({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            references: [{ path: `../a` }],
                        }),
                        "/user/username/projects/transitiveReferences/c/tsconfig.json": jsonToReadableText({
                            compilerOptions: { baseUrl: "./", paths: { "@ref/*": ["../refs/*"] } },
                            references: [{ path: `../b` }],
                        }),
                        "/user/username/projects/transitiveReferences/a/index.ts": `export class A {}`,
                        "/user/username/projects/transitiveReferences/b/index.ts": `import {A} from '@ref/a';
export const b = new A();`,
                        "/user/username/projects/transitiveReferences/c/index.ts": `import {b} from '../b';
import {X} from "@ref/a";
b;
X;`,
                        "/user/username/projects/transitiveReferences/refs/a.d.ts": getFsContentsForTransitiveReferencesRefsAdts(),
                    },
                    { currentDirectory: `/user/username/projects/transitiveReferences` },
                ),
                ["c"],
            ),
        commandLineArgs: ["-w", "-p", "c", "--traceResolution", "--explainFiles"],
        edits: [
            {
                caption: "non local edit b ts, and build b",
                edit: sys => {
                    sys.appendFile("b/index.ts", `export function gfoo() { }`);
                    const solutionBuilder = createSolutionBuilder(sys, ["b"]);
                    solutionBuilder.build();
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "edit on config file",
                edit: sys => {
                    sys.ensureFileOrFolder({
                        path: "nrefs/a.d.ts",
                        content: sys.readFile("refs/a.d.ts")!,
                    });
                    changeCompilerOpitonsPaths(sys, "c/tsconfig.json", { "@ref/*": ["../nrefs/*"] });
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert config file edit",
                edit: sys => changeCompilerOpitonsPaths(sys, "c/tsconfig.json", { "@ref/*": ["../refs/*"] }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "edit in referenced config file",
                edit: sys => changeCompilerOpitonsPaths(sys, "b/tsconfig.json", { "@ref/*": ["../nrefs/*"] }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert referenced config file edit",
                edit: sys => changeCompilerOpitonsPaths(sys, "b/tsconfig.json", { "@ref/*": ["../refs/*"] }),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "deleting referenced config file",
                edit: sys => sys.deleteFile("b/tsconfig.json"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert deleting referenced config file",
                edit: sys =>
                    sys.writeFile(
                        "b/tsconfig.json",
                        jsonToReadableText({
                            compilerOptions: { composite: true, baseUrl: "./", paths: { "@ref/*": ["../*"] } },
                            references: [{ path: `../a` }],
                        }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "deleting transitively referenced config file",
                edit: sys => sys.deleteFile("a/tsconfig.json"),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
            {
                caption: "Revert deleting transitively referenced config file",
                edit: sys =>
                    sys.writeFile(
                        "a/tsconfig.json",
                        jsonToReadableText({ compilerOptions: { composite: true } }),
                    ),
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
        baselineDependencies: true,
    });

    verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "when declarationMap changes for dependency",
        sys: () =>
            solutionBuildWithBaseline(
                getSysForSampleProjectReferences(),
                ["core"],
            ),
        commandLineArgs: ["-w", "-p", "logic", "--traceResolution", "--explainFiles"],
        edits: [
            {
                caption: "change declration map in core",
                edit: sys => {
                    sys.replaceFileText("/user/username/projects/sample1/core/tsconfig.json", `"declarationMap": true,`, `"declarationMap": false,`);
                    const solutionBuilder = createSolutionBuilder(sys, ["core"]);
                    solutionBuilder.build();
                },
                timeouts: sys => sys.runQueuedTimeoutCallbacks(),
            },
        ],
        baselineDependencies: true,
    });

    verifyTscWatch({
        scenario: "projectsWithReferences",
        subScenario: "watch options differing between projects",
        sys: () =>
            solutionBuildWithBaseline(
                TestServerHost.createWatchedSystem({
                    "/user/username/workspace/project/tsconfig.base.json": jsonToReadableText({
                        watchOptions: {
                            excludeDirectories: ["**/node_modules"],
                        },
                    }),
                    "/user/username/workspace/project/tsconfig.A.json": jsonToReadableText({
                        extends: "./tsconfig.base.json",
                        compilerOptions: { composite: true },
                        include: ["src/a/**/*.ts"],
                        watchOptions: {
                            excludeDirectories: ["**/excludes_by_A"],
                        },
                    }),
                    "/user/username/workspace/project/src/a/a.ts": "export const a = 10;",
                    "/user/username/workspace/project/tsconfig.B.json": jsonToReadableText({
                        extends: "./tsconfig.base.json",
                        include: ["src/b/**/*.ts"],
                        references: [
                            { path: "./tsconfig.A.json" },
                        ],
                    }),
                    "/user/username/workspace/project/src/b/b.ts": "export const b = 10;",
                }, {
                    currentDirectory: "/user/username/workspace/project",
                    useCaseSensitiveFileNames: false,
                }),
                ["tsconfig.A.json"],
            ),
        commandLineArgs: ["-w", "-p", "tsconfig.B.json", "--traceResolution", "--extendedDiagnostics"],
    });
});
