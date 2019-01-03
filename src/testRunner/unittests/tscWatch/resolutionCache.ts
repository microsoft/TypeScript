namespace ts.tscWatch {
    describe("unittests:: tsc-watch:: resolutionCache:: tsc-watch module resolution caching", () => {
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

            const f1IsNotModule = getDiagnosticOfFileFromProgram(watch(), root.path, root.content.indexOf('"f1"'), '"f1"'.length, Diagnostics.File_0_is_not_a_module, imported.path);
            const cannotFindFoo = getDiagnosticOfFileFromProgram(watch(), imported.path, imported.content.indexOf("foo"), "foo".length, Diagnostics.Cannot_find_name_0, "foo");

            // ensure that imported file was found
            checkOutputErrorsInitial(host, [f1IsNotModule, cannotFindFoo]);

            const originalFileExists = host.fileExists;
            {
                const newContent = `import {x} from "f1"
                var x: string = 1;`;
                root.content = newContent;
                host.reloadFS(files);

                // patch fileExists to make sure that disk is not touched
                host.fileExists = notImplemented;

                // trigger synchronization to make sure that import will be fetched from the cache
                host.runQueuedTimeoutCallbacks();

                // ensure file has correct number of errors after edit
                checkOutputErrorsIncremental(host, [
                    f1IsNotModule,
                    getDiagnosticOfFileFromProgram(watch(), root.path, newContent.indexOf("var x") + "var ".length, "x".length, Diagnostics.Type_0_is_not_assignable_to_type_1, 1, "string"),
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
                host.reloadFS(files);

                // trigger synchronization to make sure that LSHost will try to find 'f2' module on disk
                host.runQueuedTimeoutCallbacks();

                // ensure file has correct number of errors after edit
                checkOutputErrorsIncremental(host, [
                    getDiagnosticModuleNotFoundOfFile(watch(), root, "f2")
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

                host.reloadFS(files);
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
                getDiagnosticModuleNotFoundOfFile(watch(), root, "bar")
            ]);

            fileExistsCalledForBar = false;
            root.content = `import {y} from "bar"`;
            host.reloadFS(files.concat(imported));

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

            const files = [root, libFile];
            const filesWithImported = files.concat(imported);
            const host = createWatchedSystem(filesWithImported);
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
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
            checkOutputErrorsIncremental(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), root, "bar")
            ]);

            fileExistsCalledForBar = false;
            host.reloadFS(filesWithImported);
            host.checkTimeoutQueueLengthAndRun(1);
            checkOutputErrorsIncremental(host, emptyArray);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called.");
        });

        it("works when module resolution changes to ambient module", () => {
            const root = {
                path: "/a/b/foo.ts",
                content: `import * as fs from "fs";`
            };

            const packageJson = {
                path: "/a/b/node_modules/@types/node/package.json",
                content: `
{
  "main": ""
}
`
            };

            const nodeType = {
                path: "/a/b/node_modules/@types/node/index.d.ts",
                content: `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}`
            };

            const files = [root, libFile];
            const filesWithNodeType = files.concat(packageJson, nodeType);
            const host = createWatchedSystem(files, { currentDirectory: "/a/b" });

            const watch = createWatchOfFilesAndCompilerOptions([root.path], host, { });

            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), root, "fs")
            ]);

            host.reloadFS(filesWithNodeType);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("works when included file with ambient module changes", () => {
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

            const fileContentWithFS = `
declare module "fs" {
    export interface Stats {
        isFile(): boolean;
    }
}
`;

            const files = [root, file, libFile];
            const host = createWatchedSystem(files, { currentDirectory: "/a/b" });

            const watch = createWatchOfFilesAndCompilerOptions([root.path, file.path], host, {});

            checkOutputErrorsInitial(host, [
                getDiagnosticModuleNotFoundOfFile(watch(), root, "fs")
            ]);

            file.content += fileContentWithFS;
            host.reloadFS(files);
            host.runQueuedTimeoutCallbacks();
            checkOutputErrorsIncremental(host, emptyArray);
        });

        it("works when reusing program with files from external library", () => {
            interface ExpectedFile { path: string; isExpectedToEmit?: boolean; content?: string; }
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
            const outDirFolder = "/a/b/projects/myProject/dist/";
            const programFiles = [file1, file2, module1, libFile];
            const host = createWatchedSystem(programFiles.concat(configFile), { currentDirectory: "/a/b/projects/myProject/" });
            const watch = createWatchOfConfigFile(configFile.path, host);
            checkProgramActualFiles(watch(), programFiles.map(f => f.path));
            checkOutputErrorsInitial(host, emptyArray);
            const expectedFiles: ExpectedFile[] = [
                createExpectedEmittedFile(file1),
                createExpectedEmittedFile(file2),
                createExpectedToNotEmitFile("index.js"),
                createExpectedToNotEmitFile("src/index.js"),
                createExpectedToNotEmitFile("src/file1.js"),
                createExpectedToNotEmitFile("src/file2.js"),
                createExpectedToNotEmitFile("lib.js"),
                createExpectedToNotEmitFile("lib.d.ts")
            ];
            verifyExpectedFiles(expectedFiles);

            file1.content += "\n;";
            expectedFiles[0].content += ";\n"; // Only emit file1 with this change
            expectedFiles[1].isExpectedToEmit = false;
            host.reloadFS(programFiles.concat(configFile));
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), programFiles.map(f => f.path));
            checkOutputErrorsIncremental(host, emptyArray);
            verifyExpectedFiles(expectedFiles);


            function verifyExpectedFiles(expectedFiles: ExpectedFile[]) {
                forEach(expectedFiles, f => {
                    assert.equal(!!host.fileExists(f.path), f.isExpectedToEmit, "File " + f.path + " is expected to " + (f.isExpectedToEmit ? "emit" : "not emit"));
                    if (f.isExpectedToEmit) {
                        assert.equal(host.readFile(f.path), f.content, "Expected contents of " + f.path);
                    }
                });
            }

            function createExpectedToNotEmitFile(fileName: string): ExpectedFile {
                return {
                    path: outDirFolder + fileName,
                    isExpectedToEmit: false
                };
            }

            function createExpectedEmittedFile(file: File): ExpectedFile {
                return {
                    path: removeFileExtension(file.path.replace(configDir, outDirFolder)) + Extension.Js,
                    isExpectedToEmit: true,
                    content: '"use strict";\nexports.__esModule = true;\n' + file.content.replace("import", "var") + "\n"
                };
            }
        });

        it("works when renaming node_modules folder that already contains @types folder", () => {
            const currentDirectory = "/user/username/projects/myproject";
            const file: File = {
                path: `${currentDirectory}/a.ts`,
                content: `import * as q from "qqq";`
            };
            const module: File = {
                path: `${currentDirectory}/node_modules2/@types/qqq/index.d.ts`,
                content: "export {}"
            };
            const files = [file, module, libFile];
            const host = createWatchedSystem(files, { currentDirectory });
            const watch = createWatchOfFilesAndCompilerOptions([file.path], host);

            checkProgramActualFiles(watch(), [file.path, libFile.path]);
            checkOutputErrorsInitial(host, [getDiagnosticModuleNotFoundOfFile(watch(), file, "qqq")]);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectories(host, [`${currentDirectory}/node_modules`, `${currentDirectory}/node_modules/@types`], /*recursive*/ true);

            host.renameFolder(`${currentDirectory}/node_modules2`, `${currentDirectory}/node_modules`);
            host.runQueuedTimeoutCallbacks();
            checkProgramActualFiles(watch(), [file.path, libFile.path, `${currentDirectory}/node_modules/@types/qqq/index.d.ts`]);
            checkOutputErrorsIncremental(host, emptyArray);
        });

        describe("ignores files/folder changes in node_modules that start with '.'", () => {
            const projectPath = "/user/username/projects/project";
            const npmCacheFile: File = {
                path: `${projectPath}/node_modules/.cache/babel-loader/89c02171edab901b9926470ba6d5677e.ts`,
                content: JSON.stringify({ something: 10 })
            };
            const file1: File = {
                path: `${projectPath}/test.ts`,
                content: `import { x } from "somemodule";`
            };
            const file2: File = {
                path: `${projectPath}/node_modules/somemodule/index.d.ts`,
                content: `export const x = 10;`
            };
            const files = [libFile, file1, file2];
            const expectedFiles = files.map(f => f.path);
            it("when watching node_modules in inferred project for failed lookup", () => {
                const host = createWatchedSystem(files);
                const watch = createWatchOfFilesAndCompilerOptions([file1.path], host, {}, /*maxNumberOfFilesToIterateForInvalidation*/ 1);
                checkProgramActualFiles(watch(), expectedFiles);
                host.checkTimeoutQueueLength(0);

                host.ensureFileOrFolder(npmCacheFile);
                host.checkTimeoutQueueLength(0);
            });
            it("when watching node_modules as part of wild card directories in config project", () => {
                const config: File = {
                    path: `${projectPath}/tsconfig.json`,
                    content: "{}"
                };
                const host = createWatchedSystem(files.concat(config));
                const watch = createWatchOfConfigFile(config.path, host);
                checkProgramActualFiles(watch(), expectedFiles);
                host.checkTimeoutQueueLength(0);

                host.ensureFileOrFolder(npmCacheFile);
                host.checkTimeoutQueueLength(0);
            });
        });
    });

    describe("unittests:: tsc-watch:: resolutionCache:: tsc-watch with modules linked to sibling folder", () => {
        const projectRoot = "/user/username/projects/project";
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

        it("verify watched directories", () => {
            const files = [libFile, mainFile, config, linkedPackageInMain, linkedPackageJson, linkedPackageIndex, linkedPackageOther];
            const host = createWatchedSystem(files, { currentDirectory: mainPackageRoot });
            createWatchOfConfigFile("tsconfig.json", host);
            checkWatchedFilesDetailed(host, [libFile.path, mainFile.path, config.path, linkedPackageIndex.path, linkedPackageOther.path], 1);
            checkWatchedDirectories(host, emptyArray, /*recursive*/ false);
            checkWatchedDirectoriesDetailed(host, [`${mainPackageRoot}/@scoped`, `${mainPackageRoot}/node_modules`, linkedPackageRoot, `${mainPackageRoot}/node_modules/@types`, `${projectRoot}/node_modules/@types`], 1, /*recursive*/ true);
        });
    });
}
