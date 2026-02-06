import * as ts from "../../_namespaces/ts.js";
import { jsonToReadableText } from "../helpers.js";
import { createBaseline } from "../helpers/baseline.js";
import { getSysForDemoProjectReferences } from "../helpers/demoProjectReferences.js";
import { solutionBuildWithBaseline } from "../helpers/solutionBuilder.js";
import {
    createWatchCompilerHostOfConfigFileForBaseline,
    runWatchBaseline,
} from "../helpers/tscWatch.js";
import {
    File,
    SymLink,
    TestServerHost,
} from "../helpers/virtualFileSystemWithWatch.js";

describe("unittests:: tscWatch:: watchAPI:: with sourceOfProjectReferenceRedirect::", () => {
    interface VerifyWatchInput {
        getSys: () => TestServerHost;
        config: string;
        subScenario: string;
    }

    function verifyWatch({ getSys, config, subScenario }: VerifyWatchInput, alreadyBuilt: boolean) {
        const { sys, baseline, cb, getPrograms } = createBaseline(
            getSys(),
            alreadyBuilt ? (sys, originalRead) => {
                solutionBuildWithBaseline(sys, [config], /*buildOptions*/ undefined, /*versionToWrite*/ undefined, originalRead);
                sys.clearOutput();
            } : undefined,
        );
        const host = createWatchCompilerHostOfConfigFileForBaseline({
            configFileName: config,
            system: sys,
            cb,
        });
        host.useSourceOfProjectReferenceRedirect = ts.returnTrue;
        const watch = ts.createWatchProgram(host);
        runWatchBaseline({
            scenario: "sourceOfProjectReferenceRedirect",
            subScenario: `${subScenario}${alreadyBuilt ? " when solution is already built" : ""}`,
            commandLineArgs: ["--w", "--p", config],
            sys,
            baseline,
            getPrograms,
            watchOrSolution: watch,
            useSourceOfProjectReferenceRedirect: ts.returnTrue,
        });
    }

    function verifyScenario(input: VerifyWatchInput) {
        it("when solution is not built", () => {
            verifyWatch(input, /*alreadyBuilt*/ false);
        });

        it("when solution is already built", () => {
            verifyWatch(input, /*alreadyBuilt*/ true);
        });
    }

    describe("with simple project", () => {
        verifyScenario({
            getSys: getSysForDemoProjectReferences,
            config: "/user/username/projects/demo/animals/tsconfig.json",
            subScenario: "with simple project",
        });
    });

    describe("when references are monorepo like with symlinks", () => {
        interface Packages {
            files: () => {
                bPackageJson: File;
                aTest: File;
                bFoo: File;
                bBar: File;
                bSymlink: SymLink;
            };
            subScenario: string;
        }
        function verifySymlinkScenario(packages: Packages) {
            describe("when preserveSymlinks is turned off", () => {
                verifySymlinkScenarioWorker(packages, {});
            });
            describe("when preserveSymlinks is turned on", () => {
                verifySymlinkScenarioWorker(packages, { preserveSymlinks: true });
            });
        }

        function verifySymlinkScenarioWorker(packages: Packages, extraOptions: ts.CompilerOptions) {
            verifyScenario({
                getSys: () => {
                    const { bPackageJson, aTest, bFoo, bBar, bSymlink } = packages.files();
                    const aConfig = config("A", extraOptions, ["../B"]);
                    const bConfig = config("B", extraOptions);
                    return TestServerHost.createWatchedSystem(
                        [bPackageJson, aConfig, bConfig, aTest, bFoo, bBar, bSymlink],
                        { currentDirectory: "/user/username/projects/myproject" },
                    );
                },
                config: configPath("A"),
                subScenario: `${packages.subScenario}${extraOptions.preserveSymlinks ? " with preserveSymlinks" : ""}`,
            });
        }

        function configPath(packageName: string) {
            return `/user/username/projects/myproject/packages/${packageName}/tsconfig.json`;
        }

        function config(packageName: string, extraOptions: ts.CompilerOptions, references?: string[]): File {
            return {
                path: configPath(packageName),
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
            describe("when packageJson has types field", () => {
                verifySymlinkScenario({
                    files: () => ({
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
                    }),
                    subScenario: `when packageJson has types field${scope ? " with scoped package" : ""}`,
                });
            });

            describe("when referencing file from subFolder", () => {
                verifySymlinkScenario({
                    files: () => ({
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
                    }),
                    subScenario: `when referencing file from subFolder${scope ? " with scoped package" : ""}`,
                });
            });
        }
        describe("when package is not scoped", () => {
            verifyMonoRepoLike();
        });
        describe("when package is scoped", () => {
            verifyMonoRepoLike("@issue/");
        });
    });
});
