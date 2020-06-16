namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: resolutionCache:: tsc-watch module resolution caching", () => {
        const scenario = "resolutionCache";
        it("works", () => {
            const root = {
                path: "/a/d/f0.ts",
                content: `import {x} from "f1"`
            };
            const imported = {
                path: "/a/f1.ts",
                content: `foo()`
            };

            const files = [root, imported, libFile];
            const host = createWatchedSystem(files);
            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { module: ModuleKind.AMD });

            const f1IsNotModule = getDiagnosticOfFileFromProgram(watch.getCurrentProgram().getProgram(), root.path, root.content.indexOf('"f1"'), '"f1"'.length, Diagnostics.File_0_is_not_a_module, imported.path);
            const cannotFindFoo = getDiagnosticOfFileFromProgram(watch.getCurrentProgram().getProgram(), imported.path, imported.content.indexOf("foo"), "foo".length, Diagnostics.Cannot_find_name_0, "foo");

            // ensure that imported file was found
            checkOutputErrorsInitial(host, [f1IsNotModule, cannotFindFoo]);

            const originalFileExists = host.fileExists;
            {
                const newContent = `import {x} from "f1"
                var x: string = 1;`;
                root.content = newContent;
                host.writeFile(root.path, root.content);

                // patch fileExists to make sure that disk is not touched
                host.fileExists = notImplemented;

                // trigger synchronization to make sure that import will be fetched from the cache
                host.runQueuedTimeoutCallbacks();

                // ensure file has correct number of errors after edit
                checkOutputErrorsIncremental(host, [
                    f1IsNotModule,
                    getDiagnosticOfFileFromProgram(watch.getCurrentProgram().getProgram(), root.path, newContent.indexOf("var x") + "var ".length, "x".length, Diagnostics.Type_0_is_not_assignable_to_type_1, "number", "string"),
                    cannotFindFoo
                ]);
            }
            {
                let fileExistsIsCalled = false;
                host.fileExists = (fileName): boolean => {
                    if (fileName === "lib.d.ts") {
                        return false;
                    }
                    fileExistsIsCalled = true;
                    assert.isTrue(fileName.indexOf("/f2.") !== -1);
                    return originalFileExists.call(host, fileName);
                };

                root.content = `import {x} from "f2"`;
                host.writeFile(root.path, root.content);

                // trigger synchronization to make sure that system will try to find 'f2' module on disk
                host.runQueuedTimeoutCallbacks();

                // ensure file has correct number of errors after edit
                checkOutputErrorsIncremental(host, [
                    getDiagnosticModuleNotFoundOfFile(watch.getCurrentProgram().getProgram(), root, "f2")
                ]);

                assert.isTrue(fileExistsIsCalled);
            }
            {
                let fileExistsCalled = false;
                host.fileExists = (fileName): boolean => {
                    if (fileName === "lib.d.ts") {
                        return false;
                    }
                    fileExistsCalled = true;
                    assert.isTrue(fileName.indexOf("/f1.") !== -1);
                    return originalFileExists.call(host, fileName);
                };

                const newContent = `import {x} from "f1"`;
                root.content = newContent;

                host.writeFile(root.path, root.content);
                host.runQueuedTimeoutCallbacks();

                checkOutputErrorsIncremental(host, [f1IsNotModule, cannotFindFoo]);
                assert.isTrue(fileExistsCalled);
            }
        });

        it("loads missing files from disk", () => {
            const root = {
                path: `/a/foo.ts`,
                content: `import {x} from "bar"`
            };

            const imported = {
                path: `/a/bar.d.ts`,
                content: `export const y = 1;`
            };

            const files = [root, libFile];
            const host = createWatchedSystem(files);
            const originalFileExists = host.fileExists;

            let fileExistsCalledForBar = false;
            host.fileExists = fileName => {
                if (fileName === "lib.d.ts") {
                    return false;
                }
                if (!fileExistsCalledForBar) {
                    fileExistsCalledForBar = fileName.indexOf("/bar.") !== -1;
                }

                return originalFileExists.call(host, fileName);
            };

            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { module: ModuleKind.AMD });

            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch.getCurrentProgram().getProgram(), root, "bar")
            ]);

            fileExistsCalledForBar = false;
            root.content = `import {y} from "bar"`;
            host.writeFile(root.path, root.content);
            host.writeFile(imported.path, imported.content);

            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
        });

        it("should compile correctly when resolved module goes missing and then comes back (module is not part of the root)", () => {
            const root = {
                path: `/a/foo.ts`,
                content: `import {x} from "bar"`
            };

            const imported = {
                path: `/a/bar.d.ts`,
                content: `export const y = 1;export const x = 10;`
            };

            const host = createWatchedSystem([root, libFile, imported]);
            const originalFileExists = host.fileExists;
            let fileExistsCalledForBar = false;
            host.fileExists = fileName => {
                if (fileName === "lib.d.ts") {
                    return false;
                }
                if (!fileExistsCalledForBar) {
                    fileExistsCalledForBar = fileName.indexOf("/bar.") !== -1;
                }
                return originalFileExists.call(host, fileName);
            };

            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { module: ModuleKind.AMD });

            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            checkOutputErrorsInitial(host, emptyArray);

            fileExistsCalledForBar = false;
            host.deleteFile(imported.path);
            host.runQueuedTimeoutCallbacks();
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
            checkOutputErrorsIncremental(host, [
                getDiagnosticModuleNotFoundOfFile(watch.getCurrentProgram().getProgram(), root, "bar")
            ]);

            fileExistsCalledForBar = false;
            host.writeFile(imported.path, imported.content);
            host.checkTimeoutQueueLengthAndRun(1); // Scheduled invalidation of resolutions
            host.checkTimeoutQueueLengthAndRun(1); // Actual update
            checkOutputErrorsIncremental(host, emptyArray);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
        });

        verifyTscWatch({
            scenario,
            subScenario: "works when module resolution changes to ambient module",
            commandLineArgs: ["-w", "/a/b/foo.ts"],
            sys: () => createWatchedSystem([{
                path: "/a/b/foo.ts",
                content: `import * as fs from "fs";`
            }, libFile], { currentDirectory: "/a/b" }),
            changes: [
                {
                    caption: "npm install node types",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: "/a/b/node_modules/@types/node/package.json",
                            content: `
{
  "main": ""
}
`
                        });
                        sys.ensureFileOrFolder({
                            path: "/a/b/node_modules/@types/node/index.d.ts",
                            content: `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}`
                        });
                    },
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "works when included file with ambient module changes",
            commandLineArgs: ["--w", "/a/b/foo.ts", "/a/b/bar.d.ts"],
            sys: () => {
                const root = {
                    path: "/a/b/foo.ts",
                    content: `
import * as fs from "fs";
import * as u from "url";
`
                };

                const file = {
                    path: "/a/b/bar.d.ts",
                    content: `
declare module "url" {
    export interface Url {
        href?: string;
    }
}
`
                };
                return createWatchedSystem([root, file, libFile], { currentDirectory: "/a/b" });
            },
            changes: [
                {
                    caption: "Add fs definition",
                    change: sys => sys.appendFile("/a/b/bar.d.ts", `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}
`),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "works when reusing program with files from external library",
            commandLineArgs: ["--w", "-p", "/a/b/projects/myProject/src"],
            sys: () => {
                const configDir = "/a/b/projects/myProject/src/";
                const file1: File = {
                    path: configDir + "file1.ts",
                    content: 'import module1 = require("module1");\nmodule1("hello");'
                };
                const file2: File = {
                    path: configDir + "file2.ts",
                    content: 'import module11 = require("module1");\nmodule11("hello");'
                };
                const module1: File = {
                    path: "/a/b/projects/myProject/node_modules/module1/index.js",
                    content: "module.exports = options => { return options.toString(); }"
                };
                const configFile: File = {
                    path: configDir + "tsconfig.json",
                    content: JSON.stringify({
                        compilerOptions: {
                            allowJs: true,
                            rootDir: ".",
                            outDir: "../dist",
                            moduleResolution: "node",
                            maxNodeModuleJsDepth: 1
                        }
                    })
                };
                return createWatchedSystem([file1, file2, module1, libFile, configFile], { currentDirectory: "/a/b/projects/myProject/" });
            },
            changes: [
                {
                    caption: "Add new line to file1",
                    change: sys => sys.appendFile("/a/b/projects/myProject/src/file1.ts", "\n;"),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "works when renaming node_modules folder that already contains @types folder",
            commandLineArgs: ["--w", `${projectRoot}/a.ts`],
            sys: () => {
                const file: File = {
                    path: `${projectRoot}/a.ts`,
                    content: `import * as q from "qqq";`
                };
                const module: File = {
                    path: `${projectRoot}/node_modules2/@types/qqq/index.d.ts`,
                    content: "export {}"
                };
                return createWatchedSystem([file, libFile, module], { currentDirectory: projectRoot });
            },
            changes: [
                {
                    caption: "npm install",
                    change: sys => sys.renameFolder(`${projectRoot}/node_modules2`, `${projectRoot}/node_modules`),
                    timeouts: runQueuedTimeoutCallbacks,
                }
            ]
        });

        describe("ignores files/folder changes in node_modules that start with '.'", () => {
            function verifyIgnore(subScenario: string, commandLineArgs: readonly string[]) {
                verifyTscWatch({
                    scenario,
                    subScenario: `ignores changes in node_modules that start with dot/${subScenario}`,
                    commandLineArgs,
                    sys: () => {
                        const file1: File = {
                            path: `${projectRoot}/test.ts`,
                            content: `import { x } from "somemodule";`
                        };
                        const file2: File = {
                            path: `${projectRoot}/node_modules/somemodule/index.d.ts`,
                            content: `export const x = 10;`
                        };
                        const config: File = {
                            path: `${projectRoot}/tsconfig.json`,
                            content: "{}"
                        };
                        return createWatchedSystem([libFile, file1, file2, config]);
                    },
                    changes: [
                        {
                            caption: "npm install file and folder that start with '.'",
                            change: sys => sys.ensureFileOrFolder({
                                path: `${projectRoot}/node_modules/.cache/babel-loader/89c02171edab901b9926470ba6d5677e.ts`,
                                content: JSON.stringify({ something: 10 })
                            }),
                            timeouts: sys => sys.checkTimeoutQueueLength(0),
                        }
                    ]
                });
            }
            verifyIgnore("watch without configFile", ["--w", `${projectRoot}/test.ts`]);
            verifyIgnore("watch with configFile", ["--w", "-p", `${projectRoot}/tsconfig.json`]);
        });

        verifyTscWatch({
            scenario,
            subScenario: "when types in compiler option are global and installed at later point",
            commandLineArgs: ["--w", "-p", `${projectRoot}/tsconfig.json`],
            sys: () => {
                const app: File = {
                    path: `${projectRoot}/lib/app.ts`,
                    content: `myapp.component("hello");`
                };
                const tsconfig: File = {
                    path: `${projectRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            module: "none",
                            types: ["@myapp/ts-types"]
                        }
                    })
                };
                return createWatchedSystem([app, tsconfig, libFile]);
            },
            changes: [
                {
                    caption: "npm install ts-types",
                    change: sys => {
                        sys.ensureFileOrFolder({
                            path: `${projectRoot}/node_modules/@myapp/ts-types/package.json`,
                            content: JSON.stringify({
                                version: "1.65.1",
                                types: "types/somefile.define.d.ts"
                            })
                        });
                        sys.ensureFileOrFolder({
                            path: `${projectRoot}/node_modules/@myapp/ts-types/types/somefile.define.d.ts`,
                            content: `
declare namespace myapp {
    function component(str: string): number;
}`
                        });
                    },
                    timeouts: sys => {
                        sys.checkTimeoutQueueLengthAndRun(2); // Scheduled invalidation of resolutions, update that gets cancelled and rescheduled by actual invalidation of resolution
                        sys.checkTimeoutQueueLengthAndRun(1); // Actual update
                    },
                },
                {
                    caption: "No change, just check program",
                    change: noop,
                    timeouts: (sys, [[oldProgram, oldBuilderProgram]], watchorSolution) => {
                        sys.checkTimeoutQueueLength(0);
                        const newProgram = (watchorSolution as Watch).getProgram();
                        assert.strictEqual(newProgram, oldBuilderProgram, "No change so builder program should be same");
                        assert.strictEqual(newProgram.getProgram(), oldProgram, "No change so program should be same");
                    }
                }
            ]
        });

        verifyTscWatch({
            scenario,
            subScenario: "with modules linked to sibling folder",
            commandLineArgs: ["-w"],
            sys: () => {
                const mainPackageRoot = `${projectRoot}/main`;
                const linkedPackageRoot = `${projectRoot}/linked-package`;
                const mainFile: File = {
                    path: `${mainPackageRoot}/index.ts`,
                    content: "import { Foo } from '@scoped/linked-package'"
                };
                const config: File = {
                    path: `${mainPackageRoot}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: { module: "commonjs", moduleResolution: "node", baseUrl: ".", rootDir: "." },
                        files: ["index.ts"]
                    })
                };
                const linkedPackageInMain: SymLink = {
                    path: `${mainPackageRoot}/node_modules/@scoped/linked-package`,
                    symLink: `${linkedPackageRoot}`
                };
                const linkedPackageJson: File = {
                    path: `${linkedPackageRoot}/package.json`,
                    content: JSON.stringify({ name: "@scoped/linked-package", version: "0.0.1", types: "dist/index.d.ts", main: "dist/index.js" })
                };
                const linkedPackageIndex: File = {
                    path: `${linkedPackageRoot}/dist/index.d.ts`,
                    content: "export * from './other';"
                };
                const linkedPackageOther: File = {
                    path: `${linkedPackageRoot}/dist/other.d.ts`,
                    content: 'export declare const Foo = "BAR";'
                };
                const files = [libFile, mainFile, config, linkedPackageInMain, linkedPackageJson, linkedPackageIndex, linkedPackageOther];
                return createWatchedSystem(files, { currentDirectory: mainPackageRoot });
            },
            changes: emptyArray
        });
    });
}
