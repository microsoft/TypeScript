import * as ts from "../../_namespaces/ts";
import { libContent } from "../helpers/contents";
import { solutionBuildWithBaseline } from "../helpers/solutionBuilder";
import {
    createBaseline,
    createWatchCompilerHostOfConfigFileForBaseline,
    runWatchBaseline,
} from "../helpers/tscWatch";
import {
    createWatchedSystem,
    File,
    FileOrFolderOrSymLink,
    getTsBuildProjectFile,
    libFile,
    SymLink,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsc-watch:: watchAPI:: with sourceOfProjectReferenceRedirect", () => {
    interface VerifyWatchInput {
        files: readonly FileOrFolderOrSymLink[];
        config: string;
        subScenario: string;
    }

    function verifyWatch({ files, config, subScenario }: VerifyWatchInput, alreadyBuilt: boolean) {
        const { sys, baseline, oldSnap, cb, getPrograms } = createBaseline(
            createWatchedSystem(files),
            alreadyBuilt ? (sys, originalRead) => {
                solutionBuildWithBaseline(sys, [config], originalRead);
                sys.clearOutput();
            } : undefined
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
            oldSnap,
            getPrograms,
            watchOrSolution: watch,
            useSourceOfProjectReferenceRedirect: ts.returnTrue,
        });
    }

    function verifyScenario(input: () => VerifyWatchInput) {
        it("when solution is not built", () => {
            verifyWatch(input(), /*alreadyBuilt*/ false);
        });

        it("when solution is already built", () => {
            verifyWatch(input(), /*alreadyBuilt*/ true);
        });
    }

    describe("with simple project", () => {
        verifyScenario(() => {
            const baseConfig = getTsBuildProjectFile("demo", "tsconfig-base.json");
            const coreTs = getTsBuildProjectFile("demo", "core/utilities.ts");
            const coreConfig = getTsBuildProjectFile("demo", "core/tsconfig.json");
            const animalTs = getTsBuildProjectFile("demo", "animals/animal.ts");
            const dogTs = getTsBuildProjectFile("demo", "animals/dog.ts");
            const indexTs = getTsBuildProjectFile("demo", "animals/index.ts");
            const animalsConfig = getTsBuildProjectFile("demo", "animals/tsconfig.json");
            return {
                files: [{ path: libFile.path, content: libContent }, baseConfig, coreTs, coreConfig, animalTs, dogTs, indexTs, animalsConfig],
                config: animalsConfig.path,
                subScenario: "with simple project"
            };
        });
    });

    describe("when references are monorepo like with symlinks", () => {
        interface Packages {
            bPackageJson: File;
            aTest: File;
            bFoo: File;
            bBar: File;
            bSymlink: SymLink;
            subScenario: string;
        }
        function verifySymlinkScenario(packages: () => Packages) {
            describe("when preserveSymlinks is turned off", () => {
                verifySymlinkScenarioWorker(packages, {});
            });
            describe("when preserveSymlinks is turned on", () => {
                verifySymlinkScenarioWorker(packages, { preserveSymlinks: true });
            });
        }

        function verifySymlinkScenarioWorker(packages: () => Packages, extraOptions: ts.CompilerOptions) {
            verifyScenario(() => {
                const { bPackageJson, aTest, bFoo, bBar, bSymlink, subScenario } = packages();
                const aConfig = config("A", extraOptions, ["../B"]);
                const bConfig = config("B", extraOptions);
                return {
                    files: [libFile, bPackageJson, aConfig, bConfig, aTest, bFoo, bBar, bSymlink],
                    config: aConfig.path,
                    subScenario: `${subScenario}${extraOptions.preserveSymlinks ? " with preserveSymlinks" : ""}`
                };
            });
        }

        function config(packageName: string, extraOptions: ts.CompilerOptions, references?: string[]): File {
            return {
                path: `/user/username/projects/myproject/packages/${packageName}/tsconfig.json`,
                content: JSON.stringify({
                    compilerOptions: {
                        outDir: "lib",
                        rootDir: "src",
                        composite: true,
                        ...extraOptions
                    },
                    include: ["src"],
                    ...(references ? { references: references.map(path => ({ path })) } : {})
                })
            };
        }

        function file(packageName: string, fileName: string, content: string): File {
            return {
                path: `/user/username/projects/myproject/packages/${packageName}/src/${fileName}`,
                content
            };
        }

        function verifyMonoRepoLike(scope = "") {
            describe("when packageJson has types field", () => {
                verifySymlinkScenario(() => ({
                    bPackageJson: {
                        path: `/user/username/projects/myproject/packages/B/package.json`,
                        content: JSON.stringify({
                            main: "lib/index.js",
                            types: "lib/index.d.ts"
                        })
                    },
                    aTest: file("A", "index.ts", `import { foo } from '${scope}b';
import { bar } from '${scope}b/lib/bar';
foo();
bar();
`),
                    bFoo: file("B", "index.ts", `export function foo() { }`),
                    bBar: file("B", "bar.ts", `export function bar() { }`),
                    bSymlink: {
                        path: `/user/username/projects/myproject/node_modules/${scope}b`,
                        symLink: `/user/username/projects/myproject/packages/B`
                    },
                    subScenario: `when packageJson has types field${scope ? " with scoped package" : ""}`
                }));
            });

            describe("when referencing file from subFolder", () => {
                verifySymlinkScenario(() => ({
                    bPackageJson: {
                        path: `/user/username/projects/myproject/packages/B/package.json`,
                        content: "{}"
                    },
                    aTest: file("A", "test.ts", `import { foo } from '${scope}b/lib/foo';
import { bar } from '${scope}b/lib/bar/foo';
foo();
bar();
`),
                    bFoo: file("B", "foo.ts", `export function foo() { }`),
                    bBar: file("B", "bar/foo.ts", `export function bar() { }`),
                    bSymlink: {
                        path: `/user/username/projects/myproject/node_modules/${scope}b`,
                        symLink: `/user/username/projects/myproject/packages/B`
                    },
                    subScenario: `when referencing file from subFolder${scope ? " with scoped package" : ""}`
                }));
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
