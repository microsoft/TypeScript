import {
    emptyArray,
    noop,
} from "../../_namespaces/ts.js";
import { dedent } from "../../_namespaces/Utils.js";
import { jsonToReadableText } from "../helpers.js";
import { TscWatchSystem } from "./baseline.js";
import { solutionBuildWithBaseline } from "./solutionBuilder.js";
import { TscWatchCompileChange } from "./tscWatch.js";
import {
    osFlavorToString,
    TestServerHost,
    TestServerHostOsFlavor,
} from "./virtualFileSystemWithWatch.js";

function getMonorepoSymlinkedSiblingPackagesSys(forTsserver: boolean, built: boolean, osFlavor?: TestServerHostOsFlavor): TestServerHost {
    const configText = jsonToReadableText({
        compilerOptions: {
            target: "es2016",
            module: "commonjs",
            rootDir: "./src",
            declaration: true,
            outDir: "./dist",
            esModuleInterop: true,
            forceConsistentCasingInFileNames: true,
            strict: true,
            skipLibCheck: true,
            traceResolution: true,
        },
        exclude: [
            "tests/**/*",
            "dist/**/*",
        ],
    });
    const sys = TestServerHost.getCreateWatchedSystem(forTsserver)({
        "/home/src/projects/project/packages/package1/package.json": getPackageJson("package1"),
        "/home/src/projects/project/packages/package1/tsconfig.json": configText,
        "/home/src/projects/project/packages/package1/src/index.ts": dedent`
            export type FooType = "foo";
            export type BarType = "bar";
        `,
        "/home/src/projects/project/packages/package2/package.json": getPackageJson("package2"),
        "/home/src/projects/project/packages/package2/tsconfig.json": configText,
        "/home/src/projects/project/packages/package2/src/index.ts": dedent`
            import { FooType, BarType } from "package1"
            type MyFooType = FooType;
            type MyBarType = BarType;
        `,
        "/home/src/projects/project/node_modules/package1": { symLink: "/home/src/projects/project/packages/package1" },
    }, { currentDirectory: "/home/src/projects/project", osFlavor });
    if (built) buildMonorepoSymlinkedSiblingPackage1(sys);
    return sys;
}

function getPackageJson(packageName: string) {
    return jsonToReadableText({
        name: packageName,
        version: "1.0.0",
        main: "dist/index.js",
    });
}

function buildMonorepoSymlinkedSiblingPackage1(host: TestServerHost) {
    solutionBuildWithBaseline(host, ["/home/src/projects/project/packages/package1"]);
}

function cleanMonorepoSymlinkedSiblingPackage1(host: TestServerHost) {
    host.deleteFolder("/home/src/projects/project/packages/package1/dist", /*recursive*/ true);
}

function forEachMonorepoSymlinkedSiblingPackagesSys(
    forTsserver: boolean,
    action: (
        scenario: string,
        sys: () => TestServerHost,
        edits: () => readonly TscWatchCompileChange[],
        project: string,
        currentDirectory: string,
    ) => void,
) {
    for (const built of [false, true]) {
        for (const osFlavor of [undefined, TestServerHostOsFlavor.Linux]) {
            action(
                `monorepo style sibling packages symlinked${built ? " package1 built" : ""}${osFlavor ? ` ${osFlavorToString(osFlavor)}` : ""}`,
                () => getMonorepoSymlinkedSiblingPackagesSys(forTsserver, built, osFlavor),
                () =>
                    getEditsWithBuildAndClean(
                        forTsserver,
                        built,
                        osFlavor,
                        buildMonorepoSymlinkedSiblingPackage1,
                        cleanMonorepoSymlinkedSiblingPackage1,
                    ),
                "packages/package2",
                "/home/src/projects/project",
            );
        }
    }
}

function threeTimeouts(sys: TscWatchSystem) {
    sys.runQueuedTimeoutCallbacks();
    sys.runQueuedTimeoutCallbacks();
    sys.runQueuedTimeoutCallbacks();
}

function getEditsWithBuildAndClean(
    forTsserver: boolean,
    built: boolean,
    osFlavor: TestServerHostOsFlavor | undefined,
    build: (host: TscWatchSystem) => void,
    clean: (host: TscWatchSystem) => void,
    beforeBuild?: readonly TscWatchCompileChange[],
    beforeClean?: readonly TscWatchCompileChange[],
): readonly TscWatchCompileChange[] {
    return [
        ...beforeBuild ?? emptyArray,
        ...built ? emptyArray : [{
            caption: "Build dependencies",
            edit: build,
            timeouts: threeTimeouts,
        }],
        ...beforeClean ?? emptyArray,
        {
            caption: "Clean dependencies build",
            edit: clean,
            timeouts: forTsserver ? threeTimeouts : sys => sys.runQueuedTimeoutCallbacks(),
        },
        ...!forTsserver && osFlavor === TestServerHostOsFlavor.Linux ? [{
            caption: "After updating childs",
            edit: noop,
            timeouts: threeTimeouts,
        }] : emptyArray,
        {
            caption: "Build dependencies",
            edit: build,
            timeouts: threeTimeouts,
        },
    ];
}

function getMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders(
    forTsserver: boolean,
    built: boolean,
    osFlavor: TestServerHostOsFlavor,
): TestServerHost {
    const sys = TestServerHost.getCreateWatchedSystem(forTsserver)({
        "/home/src/projects/c/3/c-impl/c/src/c.ts": `export const c: string = 'test';`,
        "/home/src/projects/c/3/c-impl/c/src/index.ts": `export * from './c';`,
        "/home/src/projects/c/3/c-impl/c/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                outDir: "lib",
                declaration: true,
            },
            include: ["src/**/*.ts"],
        }),
        "/home/src/projects/c/3/c-impl/c/package.json": jsonToReadableText({
            name: "c",
            version: "1.0.0",
            types: "./lib/index.d.ts",
        }),
        "/home/src/projects/c/4/unrelated/somefile.ts": `export const a: string = 'test';`,
        "/home/src/projects/a/1/a-impl/a/src/a.ts": `export const a: string = 'test';`,
        "/home/src/projects/a/1/a-impl/a/src/index.ts": dedent`
                                export * from './a';
                                export * from 'c';
                            `,
        "/home/src/projects/a/1/a-impl/a/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                outDir: "lib",
                declaration: true,
            },
            include: ["src/**/*.ts"],
        }),
        "/home/src/projects/a/1/a-impl/a/package.json": jsonToReadableText({
            name: "a",
            version: "1.0.0",
            types: "./lib/index.d.ts",
        }),
        "/home/src/projects/a/1/a-impl/a/node_modules/c": { symLink: "/home/src/projects/c/3/c-impl/c" },
        "/home/src/projects/a/2/unrelated/somefile.ts": `export const a: string = 'test';`,
        "/home/src/projects/b/2/b-impl/b/src/index.ts": `import { a } from 'a';`,
        "/home/src/projects/b/2/b-impl/b/tsconfig.json": jsonToReadableText({
            compilerOptions: {
                outDir: "lib",
            },
            include: ["src/**/*.ts"],
        }),
        "/home/src/projects/b/2/b-impl/b/node_modules/a": { symLink: "/home/src/projects/a/1/a-impl/a" },
    }, { currentDirectory: "/home/src/projects/b/2/b-impl/b", osFlavor });
    if (built) buildDependenciesOfMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders(sys);
    return sys;
}

function buildDependenciesOfMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders(host: TestServerHost) {
    solutionBuildWithBaseline(host, ["/home/src/projects/c/3/c-impl/c", "/home/src/projects/a/1/a-impl/a"]);
}

function cleanDependenciesOfMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders(host: TestServerHost) {
    host.deleteFolder("/home/src/projects/c/3/c-impl/c/lib", /*recursive*/ true);
    host.deleteFolder("/home/src/projects/a/1/a-impl/a/lib", /*recursive*/ true);
}

function forEachMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders(
    forTsserver: boolean,
    action: (
        scenario: string,
        sys: () => TestServerHost,
        edits: () => readonly TscWatchCompileChange[],
        indexFile: string,
        currentDirectory: string,
    ) => void,
) {
    for (const built of [false, true]) {
        for (const osFlavor of [TestServerHostOsFlavor.Windows, TestServerHostOsFlavor.MacOs, TestServerHostOsFlavor.Linux]) {
            action(
                `packages outside project folder${built ? " built" : ""} ${osFlavorToString(osFlavor)}`,
                () => getMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders(forTsserver, built, osFlavor),
                () =>
                    getEditsWithBuildAndClean(
                        forTsserver,
                        built,
                        osFlavor,
                        buildDependenciesOfMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders,
                        cleanDependenciesOfMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders,
                        [
                            {
                                caption: "change in unrelated folder in a",
                                edit: sys => sys.writeFile("/home/src/projects/a/2/unrelated/somethingUnrelated.ts", "export const a = 10;"),
                                timeouts: sys => {
                                    sys.runQueuedTimeoutCallbacks();
                                    sys.runQueuedTimeoutCallbacks();
                                },
                            },
                            {
                                caption: "change in unrelated folder in c",
                                edit: sys => sys.writeFile("/home/src/projects/c/4/unrelated/somethingUnrelated.ts", "export const a = 10;"),
                                timeouts: sys => {
                                    sys.runQueuedTimeoutCallbacks();
                                    sys.runQueuedTimeoutCallbacks();
                                },
                            },
                        ],
                        [
                            {
                                caption: "change in unrelated folder in a",
                                edit: sys => sys.writeFile("/home/src/projects/a/2/unrelated/anotherFile.ts", "export const a = 10;"),
                                timeouts: sys => {
                                    sys.runQueuedTimeoutCallbacks();
                                    sys.runQueuedTimeoutCallbacks();
                                },
                            },
                            {
                                caption: "change in unrelated folder in c",
                                edit: sys => sys.writeFile("/home/src/projects/c/4/unrelated/anotherFile.ts", "export const a = 10;"),
                                timeouts: sys => {
                                    sys.runQueuedTimeoutCallbacks();
                                    sys.runQueuedTimeoutCallbacks();
                                },
                            },
                        ],
                    ),
                ".",
                "/home/src/projects/b/2/b-impl/b",
            );
        }
    }
}

export function forEachMonorepoSymlinkScenario(
    forTsserver: boolean,
    action: (
        scenario: string,
        sys: () => TestServerHost,
        edits: () => readonly TscWatchCompileChange[],
        indexFile: string,
        currentDirectory: string,
    ) => void,
): void {
    describe("monorepoSymlinkedSiblingPackages:: monorepo style sibling packages symlinked", () => {
        forEachMonorepoSymlinkedSiblingPackagesSys(forTsserver, action);
    });

    describe("monorepoSymlinkedSiblingPackagesWithUnrelatedFolders:: packages outside project folder", () => {
        forEachMonorepoSymlinkedSiblingPackagesSysWithUnRelatedFolders(forTsserver, action);
    });
}
