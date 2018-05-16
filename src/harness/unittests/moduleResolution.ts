/// <reference path="..\harness.ts" />

namespace ts {
    export function checkResolvedModule(expected: ResolvedModuleFull, actual: ResolvedModuleFull): boolean {
        if (!expected === !actual) {
            if (expected) {
                assert.isTrue(expected.resolvedFileName === actual.resolvedFileName, `'resolvedFileName': expected '${expected.resolvedFileName}' to be equal to '${actual.resolvedFileName}'`);
                assert.isTrue(expected.extension === actual.extension, `'ext': expected '${expected.extension}' to be equal to '${actual.extension}'`);
                assert.isTrue(expected.isExternalLibraryImport === actual.isExternalLibraryImport, `'isExternalLibraryImport': expected '${expected.isExternalLibraryImport}' to be equal to '${actual.isExternalLibraryImport}'`);
            }
            return true;
        }
        return false;
    }

    export function checkResolvedModuleWithFailedLookupLocations(actual: ResolvedModuleWithFailedLookupLocations, expectedResolvedModule: ResolvedModuleFull, expectedFailedLookupLocations: string[]): void {
        assert.isTrue(actual.resolvedModule !== undefined, "module should be resolved");
        checkResolvedModule(actual.resolvedModule, expectedResolvedModule);
        assert.deepEqual(actual.failedLookupLocations, expectedFailedLookupLocations, `Failed lookup locations should match - expected has ${expectedFailedLookupLocations.length}, actual has ${actual.failedLookupLocations.length}`);
    }

    export function createResolvedModule(resolvedFileName: string, isExternalLibraryImport = false): ResolvedModuleFull {
        return { resolvedFileName, extension: extensionFromPath(resolvedFileName), isExternalLibraryImport };
    }

    interface File {
        name: string;
        content?: string;
        symlinks?: string[];
    }

    function createModuleResolutionHost(hasDirectoryExists: boolean, ...files: File[]): ModuleResolutionHost {
        const map = createMap<File>();
        for (const file of files) {
            map.set(file.name, file);
            if (file.symlinks) {
                for (const symlink of file.symlinks) {
                    map.set(symlink, file);
                }
            }
        }

        if (hasDirectoryExists) {
            const directories = createMap<string>();
            for (const f of files) {
                let name = getDirectoryPath(f.name);
                while (true) {
                    directories.set(name, name);
                    const baseName = getDirectoryPath(name);
                    if (baseName === name) {
                        break;
                    }
                    name = baseName;
                }
            }
            return {
                readFile,
                realpath,
                directoryExists: path => directories.has(path),
                fileExists: path => {
                    assert.isTrue(directories.has(getDirectoryPath(path)), `'fileExists' '${path}' request in non-existing directory`);
                    return map.has(path);
                }
            };
        }
        else {
            return { readFile, realpath, fileExists: path => map.has(path) };
        }
        function readFile(path: string): string | undefined {
            const file = map.get(path);
            return file && file.content;
        }
        function realpath(path: string): string {
            return map.get(path).name;
        }
    }

    describe("Node module resolution - relative paths", () => {

        function testLoadAsFile(containingFileName: string, moduleFileNameNoExt: string, moduleName: string): void {
            for (const ext of supportedTypeScriptExtensions) {
                test(ext, /*hasDirectoryExists*/ false);
                test(ext, /*hasDirectoryExists*/ true);
            }

            function test(ext: string, hasDirectoryExists: boolean) {
                const containingFile = { name: containingFileName };
                const moduleFile = { name: moduleFileNameNoExt + ext };
                const resolution = nodeModuleNameResolver(moduleName, containingFile.name, {}, createModuleResolutionHost(hasDirectoryExists, containingFile, moduleFile));
                checkResolvedModule(resolution.resolvedModule, createResolvedModule(moduleFile.name));

                const failedLookupLocations: string[] = [];
                const dir = getDirectoryPath(containingFileName);
                for (const e of supportedTypeScriptExtensions) {
                    if (e === ext) {
                        break;
                    }
                    else {
                        failedLookupLocations.push(normalizePath(getRootLength(moduleName) === 0 ? combinePaths(dir, moduleName) : moduleName) + e);
                    }
                }

                assert.deepEqual(resolution.failedLookupLocations, failedLookupLocations);

            }
        }

        it("module name that starts with './' resolved as relative file name", () => {
            testLoadAsFile("/foo/bar/baz.ts", "/foo/bar/foo", "./foo");
        });

        it("module name that starts with '../' resolved as relative file name", () => {
            testLoadAsFile("/foo/bar/baz.ts", "/foo/foo", "../foo");
        });

        it("module name that starts with '/' script extension resolved as relative file name", () => {
            testLoadAsFile("/foo/bar/baz.ts", "/foo", "/foo");
        });

        it("module name that starts with 'c:/' script extension resolved as relative file name", () => {
            testLoadAsFile("c:/foo/bar/baz.ts", "c:/foo", "c:/foo");
        });

        function testLoadingFromPackageJson(containingFileName: string, packageJsonFileName: string, fieldRef: string, moduleFileName: string, moduleName: string): void {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const containingFile = { name: containingFileName };
                const packageJson = { name: packageJsonFileName, content: JSON.stringify({ typings: fieldRef }) };
                const moduleFile = { name: moduleFileName };
                const resolution = nodeModuleNameResolver(moduleName, containingFile.name, {}, createModuleResolutionHost(hasDirectoryExists, containingFile, packageJson, moduleFile));
                checkResolvedModule(resolution.resolvedModule, createResolvedModule(moduleFile.name));
                // expect three failed lookup location - attempt to load module as file with all supported extensions
                assert.equal(resolution.failedLookupLocations.length, supportedTypeScriptExtensions.length);
            }
        }

        it("module name as directory - load from 'typings'", () => {
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/b/c/bar/package.json", "c/d/e.d.ts", "/a/b/c/bar/c/d/e.d.ts", "./bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/bar/package.json", "e.d.ts", "/a/bar/e.d.ts", "../../bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/bar/package.json", "e.d.ts", "/bar/e.d.ts", "/bar");
            testLoadingFromPackageJson("c:/a/b/c/d.ts", "c:/bar/package.json", "e.d.ts", "c:/bar/e.d.ts", "c:/bar");
        });

        function testTypingsIgnored(typings: any): void {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const containingFile = { name: "/a/b.ts" };
                const packageJson = { name: "/node_modules/b/package.json", content: JSON.stringify({ typings }) };
                const moduleFile = { name: "/a/b.d.ts" };

                const indexPath = "/node_modules/b/index.d.ts";
                const indexFile = { name: indexPath };

                const resolution = nodeModuleNameResolver("b", containingFile.name, {}, createModuleResolutionHost(hasDirectoryExists, containingFile, packageJson, moduleFile, indexFile));

                checkResolvedModule(resolution.resolvedModule, createResolvedModule(indexPath, /*isExternalLibraryImport*/ true));
            }
        }

        it("module name as directory - handle invalid 'typings'", () => {
            testTypingsIgnored(["a", "b"]);
            testTypingsIgnored({ a: "b" });
            testTypingsIgnored(/*typings*/ true);
            testTypingsIgnored(/*typings*/ null); // tslint:disable-line no-null-keyword
            testTypingsIgnored(/*typings*/ undefined);
        });
        it("module name as directory - load index.d.ts", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const containingFile = { name: "/a/b/c.ts" };
                const packageJson = { name: "/a/b/foo/package.json", content: JSON.stringify({ main: "/c/d" }) };
                const indexFile = { name: "/a/b/foo/index.d.ts" };
                const resolution = nodeModuleNameResolver("./foo", containingFile.name, {}, createModuleResolutionHost(hasDirectoryExists, containingFile, packageJson, indexFile));
                checkResolvedModuleWithFailedLookupLocations(resolution, createResolvedModule(indexFile.name), [
                    "/a/b/foo.ts",
                    "/a/b/foo.tsx",
                    "/a/b/foo.d.ts",
                    "/c/d",
                    "/c/d.ts",
                    "/c/d.tsx",
                    "/c/d.d.ts",
                    "/c/d/index.ts",
                    "/c/d/index.tsx",
                    "/c/d/index.d.ts",
                    "/a/b/foo/index.ts",
                    "/a/b/foo/index.tsx",
                ]);
            }
        });
    });

    describe("Node module resolution - non-relative paths", () => {
        it("load module as file - ts files not loaded", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const containingFile = { name: "/a/b/c/d/e.ts" };
                const moduleFile = { name: "/a/b/node_modules/foo.ts" };
                const resolution = nodeModuleNameResolver("foo", containingFile.name, {}, createModuleResolutionHost(hasDirectoryExists, containingFile, moduleFile));
                checkResolvedModuleWithFailedLookupLocations(resolution, createResolvedModule(moduleFile.name, /*isExternalLibraryImport*/ true), [
                    "/a/b/c/d/node_modules/foo/package.json",
                    "/a/b/c/d/node_modules/foo.ts",
                    "/a/b/c/d/node_modules/foo.tsx",
                    "/a/b/c/d/node_modules/foo.d.ts",

                    "/a/b/c/d/node_modules/foo/index.ts",
                    "/a/b/c/d/node_modules/foo/index.tsx",
                    "/a/b/c/d/node_modules/foo/index.d.ts",

                    "/a/b/c/d/node_modules/@types/foo/package.json",
                    "/a/b/c/d/node_modules/@types/foo.d.ts",

                    "/a/b/c/d/node_modules/@types/foo/index.d.ts",

                    "/a/b/c/node_modules/foo/package.json",
                    "/a/b/c/node_modules/foo.ts",
                    "/a/b/c/node_modules/foo.tsx",
                    "/a/b/c/node_modules/foo.d.ts",

                    "/a/b/c/node_modules/foo/index.ts",
                    "/a/b/c/node_modules/foo/index.tsx",
                    "/a/b/c/node_modules/foo/index.d.ts",

                    "/a/b/c/node_modules/@types/foo/package.json",
                    "/a/b/c/node_modules/@types/foo.d.ts",

                    "/a/b/c/node_modules/@types/foo/index.d.ts",
                    "/a/b/node_modules/foo/package.json",
                ]);
            }
        });

        it("load module as file", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const containingFile = { name: "/a/b/c/d/e.ts" };
                const moduleFile = { name: "/a/b/node_modules/foo.d.ts" };
                const resolution = nodeModuleNameResolver("foo", containingFile.name, {}, createModuleResolutionHost(hasDirectoryExists, containingFile, moduleFile));
                checkResolvedModule(resolution.resolvedModule, createResolvedModule(moduleFile.name, /*isExternalLibraryImport*/ true));
            }
        });

        it("load module as directory", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const containingFile: File = { name: "/a/node_modules/b/c/node_modules/d/e.ts" };
                const moduleFile: File = { name: "/a/node_modules/foo/index.d.ts" };
                const resolution = nodeModuleNameResolver("foo", containingFile.name, {}, createModuleResolutionHost(hasDirectoryExists, containingFile, moduleFile));
                checkResolvedModuleWithFailedLookupLocations(resolution, createResolvedModule(moduleFile.name, /*isExternalLibraryImport*/ true), [
                    "/a/node_modules/b/c/node_modules/d/node_modules/foo/package.json",
                    "/a/node_modules/b/c/node_modules/d/node_modules/foo.ts",
                    "/a/node_modules/b/c/node_modules/d/node_modules/foo.tsx",
                    "/a/node_modules/b/c/node_modules/d/node_modules/foo.d.ts",

                    "/a/node_modules/b/c/node_modules/d/node_modules/foo/index.ts",
                    "/a/node_modules/b/c/node_modules/d/node_modules/foo/index.tsx",
                    "/a/node_modules/b/c/node_modules/d/node_modules/foo/index.d.ts",

                    "/a/node_modules/b/c/node_modules/d/node_modules/@types/foo/package.json",
                    "/a/node_modules/b/c/node_modules/d/node_modules/@types/foo.d.ts",

                    "/a/node_modules/b/c/node_modules/d/node_modules/@types/foo/index.d.ts",

                    "/a/node_modules/b/c/node_modules/foo/package.json",
                    "/a/node_modules/b/c/node_modules/foo.ts",
                    "/a/node_modules/b/c/node_modules/foo.tsx",
                    "/a/node_modules/b/c/node_modules/foo.d.ts",

                    "/a/node_modules/b/c/node_modules/foo/index.ts",
                    "/a/node_modules/b/c/node_modules/foo/index.tsx",
                    "/a/node_modules/b/c/node_modules/foo/index.d.ts",

                    "/a/node_modules/b/c/node_modules/@types/foo/package.json",
                    "/a/node_modules/b/c/node_modules/@types/foo.d.ts",

                    "/a/node_modules/b/c/node_modules/@types/foo/index.d.ts",

                    "/a/node_modules/b/node_modules/foo/package.json",
                    "/a/node_modules/b/node_modules/foo.ts",
                    "/a/node_modules/b/node_modules/foo.tsx",
                    "/a/node_modules/b/node_modules/foo.d.ts",

                    "/a/node_modules/b/node_modules/foo/index.ts",
                    "/a/node_modules/b/node_modules/foo/index.tsx",
                    "/a/node_modules/b/node_modules/foo/index.d.ts",

                    "/a/node_modules/b/node_modules/@types/foo/package.json",
                    "/a/node_modules/b/node_modules/@types/foo.d.ts",

                    "/a/node_modules/b/node_modules/@types/foo/index.d.ts",

                    "/a/node_modules/foo/package.json",
                    "/a/node_modules/foo.ts",
                    "/a/node_modules/foo.tsx",
                    "/a/node_modules/foo.d.ts",

                    "/a/node_modules/foo/index.ts",
                    "/a/node_modules/foo/index.tsx"
                ]);
            }
        });

        testPreserveSymlinks(/*preserveSymlinks*/ false);
        testPreserveSymlinks(/*preserveSymlinks*/ true);
        function testPreserveSymlinks(preserveSymlinks: boolean) {
            it(`preserveSymlinks: ${preserveSymlinks}`, () => {
                const realFileName = "/linked/index.d.ts";
                const symlinkFileName = "/app/node_modulex/linked/index.d.ts";
                const host = createModuleResolutionHost(/*hasDirectoryExists*/ true, { name: realFileName, symlinks: [symlinkFileName] });
                const resolution = nodeModuleNameResolver("linked", "/app/app.ts", { preserveSymlinks }, host);
                const resolvedFileName = preserveSymlinks ? symlinkFileName : realFileName;
                checkResolvedModule(resolution.resolvedModule, createResolvedModule(resolvedFileName, /*isExternalLibraryImport*/ true));
            });
        }
    });

    describe("Module resolution - relative imports", () => {
        function test(files: Map<string>, currentDirectory: string, rootFiles: string[], expectedFilesCount: number, relativeNamesToCheck: string[]) {
            const options: CompilerOptions = { module: ModuleKind.CommonJS };
            const host: CompilerHost = {
                getSourceFile: (fileName: string, languageVersion: ScriptTarget) => {
                    const path = normalizePath(combinePaths(currentDirectory, fileName));
                    const file = files.get(path);
                    return file && createSourceFile(fileName, file, languageVersion);
                },
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: notImplemented,
                getCurrentDirectory: () => currentDirectory,
                getDirectories: () => [],
                getCanonicalFileName: fileName => fileName.toLowerCase(),
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => false,
                fileExists: fileName => {
                    const path = normalizePath(combinePaths(currentDirectory, fileName));
                    return files.has(path);
                },
                readFile: notImplemented,
            };

            const program = createProgram(rootFiles, options, host);

            assert.equal(program.getSourceFiles().length, expectedFilesCount);
            const syntacticDiagnostics = program.getSyntacticDiagnostics();
            assert.equal(syntacticDiagnostics.length, 0, `expect no syntactic diagnostics, got: ${JSON.stringify(Harness.Compiler.minimalDiagnosticsToString(syntacticDiagnostics))}`);
            const semanticDiagnostics = program.getSemanticDiagnostics();
            assert.equal(semanticDiagnostics.length, 0, `expect no semantic diagnostics, got: ${JSON.stringify(Harness.Compiler.minimalDiagnosticsToString(semanticDiagnostics))}`);

            // try to get file using a relative name
            for (const relativeFileName of relativeNamesToCheck) {
                assert.isTrue(program.getSourceFile(relativeFileName) !== undefined, `expected to get file by relative name, got undefined`);
            }
        }

        it("should find all modules", () => {
            const files = createMapFromTemplate({
                "/a/b/c/first/shared.ts": `
class A {}
export = A`,
                "/a/b/c/first/second/class_a.ts": `
import Shared = require('../shared');
import C = require('../../third/class_c');
class B {}
export = B;`,
                "/a/b/c/third/class_c.ts": `
import Shared = require('../first/shared');
class C {}
export = C;
                `
            });
            test(files, "/a/b/c/first/second", ["class_a.ts"], 3, ["../../../c/third/class_c.ts"]);
        });

        it("should find modules in node_modules", () => {
            const files = createMapFromTemplate({
                "/parent/node_modules/mod/index.d.ts": "export var x",
                "/parent/app/myapp.ts": `import {x} from "mod"`
            });
            test(files, "/parent/app", ["myapp.ts"], 2, []);
        });

        it("should find file referenced via absolute and relative names", () => {
            const files = createMapFromTemplate({
                "/a/b/c.ts": `/// <reference path="b.ts"/>`,
                "/a/b/b.ts": "var x"
            });
            test(files, "/a/b", ["c.ts", "/a/b/b.ts"], 2, []);
        });
    });

    describe("Files with different casing", () => {
        let library: SourceFile;
        function test(files: Map<string>, options: CompilerOptions, currentDirectory: string, useCaseSensitiveFileNames: boolean, rootFiles: string[], diagnosticCodes: number[]): void {
            const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            if (!useCaseSensitiveFileNames) {
                const oldFiles = files;
                files = createMap<string>();
                oldFiles.forEach((file, fileName) => {
                    files.set(getCanonicalFileName(fileName), file);
                });
            }

            const host: CompilerHost = {
                getSourceFile: (fileName: string, languageVersion: ScriptTarget) => {
                    if (fileName === "lib.d.ts") {
                        if (!library) {
                            library = createSourceFile("lib.d.ts", "", ScriptTarget.ES5);
                        }
                        return library;
                    }
                    const path = getCanonicalFileName(normalizePath(combinePaths(currentDirectory, fileName)));
                    const file = files.get(path);
                    return file && createSourceFile(fileName, file, languageVersion);
                },
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: notImplemented,
                getCurrentDirectory: () => currentDirectory,
                getDirectories: () => [],
                getCanonicalFileName,
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
                fileExists: fileName => {
                    const path = getCanonicalFileName(normalizePath(combinePaths(currentDirectory, fileName)));
                    return files.has(path);
                },
                readFile: notImplemented,
            };
            const program = createProgram(rootFiles, options, host);
            const diagnostics = sortAndDeduplicateDiagnostics([...program.getSemanticDiagnostics(), ...program.getOptionsDiagnostics()]);
            assert.equal(diagnostics.length, diagnosticCodes.length, `Incorrect number of expected diagnostics, expected ${diagnosticCodes.length}, got '${Harness.Compiler.minimalDiagnosticsToString(diagnostics)}'`);
            for (let i = 0; i < diagnosticCodes.length; i++) {
                assert.equal(diagnostics[i].code, diagnosticCodes[i], `Expected diagnostic code ${diagnosticCodes[i]}, got '${diagnostics[i].code}': '${diagnostics[i].messageText}'`);
            }
        }

        it("should succeed when the same file is referenced using absolute and relative names", () => {
            const files = createMapFromTemplate({
                "/a/b/c.ts": `/// <reference path="d.ts"/>`,
                "/a/b/d.ts": "var x"
            });
            test(files, { module: ModuleKind.AMD }, "/a/b", /*useCaseSensitiveFileNames*/ false, ["c.ts", "/a/b/d.ts"], []);
        });

        it("should fail when two files used in program differ only in casing (tripleslash references)", () => {
            const files = createMapFromTemplate({
                "/a/b/c.ts": `/// <reference path="D.ts"/>`,
                "/a/b/d.ts": "var x"
            });
            test(files, { module: ModuleKind.AMD, forceConsistentCasingInFileNames: true }, "/a/b", /*useCaseSensitiveFileNames*/ false, ["c.ts", "d.ts"], [1149]);
        });

        it("should fail when two files used in program differ only in casing (imports)", () => {
            const files = createMapFromTemplate({
                "/a/b/c.ts": `import {x} from "D"`,
                "/a/b/d.ts": "export var x"
            });
            test(files, { module: ModuleKind.AMD, forceConsistentCasingInFileNames: true }, "/a/b", /*useCaseSensitiveFileNames*/ false, ["c.ts", "d.ts"], [1149]);
        });

        it("should fail when two files used in program differ only in casing (imports, relative module names)", () => {
            const files = createMapFromTemplate({
                "moduleA.ts": `import {x} from "./ModuleB"`,
                "moduleB.ts": "export var x"
            });
            test(files, { module: ModuleKind.CommonJS, forceConsistentCasingInFileNames: true }, "", /*useCaseSensitiveFileNames*/ false, ["moduleA.ts", "moduleB.ts"], [1149]);
        });

        it("should fail when two files exist on disk that differs only in casing", () => {
            const files = createMapFromTemplate({
                "/a/b/c.ts": `import {x} from "D"`,
                "/a/b/D.ts": "export var x",
                "/a/b/d.ts": "export var y"
            });
            test(files, { module: ModuleKind.AMD }, "/a/b", /*useCaseSensitiveFileNames*/ true, ["c.ts", "d.ts"], [1149]);
        });

        it("should fail when module name in 'require' calls has inconsistent casing", () => {
            const files = createMapFromTemplate({
                "moduleA.ts": `import a = require("./ModuleC")`,
                "moduleB.ts": `import a = require("./moduleC")`,
                "moduleC.ts": "export var x"
            });
            test(files, { module: ModuleKind.CommonJS, forceConsistentCasingInFileNames: true }, "", /*useCaseSensitiveFileNames*/ false, ["moduleA.ts", "moduleB.ts", "moduleC.ts"], [1149, 1149]);
        });

        it("should fail when module names in 'require' calls has inconsistent casing and current directory has uppercase chars", () => {
            const files = createMapFromTemplate({
                "/a/B/c/moduleA.ts": `import a = require("./ModuleC")`,
                "/a/B/c/moduleB.ts": `import a = require("./moduleC")`,
                "/a/B/c/moduleC.ts": "export var x",
                "/a/B/c/moduleD.ts": `
import a = require("./moduleA");
import b = require("./moduleB");
                `
            });
            test(files, { module: ModuleKind.CommonJS, forceConsistentCasingInFileNames: true }, "/a/B/c", /*useCaseSensitiveFileNames*/ false, ["moduleD.ts"], [1149]);
        });
        it("should not fail when module names in 'require' calls has consistent casing and current directory has uppercase chars", () => {
            const files = createMapFromTemplate({
                "/a/B/c/moduleA.ts": `import a = require("./moduleC")`,
                "/a/B/c/moduleB.ts": `import a = require("./moduleC")`,
                "/a/B/c/moduleC.ts": "export var x",
                "/a/B/c/moduleD.ts": `
import a = require("./moduleA");
import b = require("./moduleB");
                `
            });
            test(files, { module: ModuleKind.CommonJS, forceConsistentCasingInFileNames: true }, "/a/B/c", /*useCaseSensitiveFileNames*/ false, ["moduleD.ts"], []);
        });
    });

    describe("baseUrl augmented module resolution", () => {

        it("module resolution without path mappings/rootDirs", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const file1: File = { name: "/root/folder1/file1.ts" };
                const file2: File = { name: "/root/folder2/file2.ts" };
                const file3: File = { name: "/root/folder2/file3.ts" };
                const host = createModuleResolutionHost(hasDirectoryExists, file1, file2, file3);
                for (const moduleResolution of [ ModuleResolutionKind.NodeJs, ModuleResolutionKind.Classic ]) {
                    const options: CompilerOptions = { moduleResolution, baseUrl: "/root" };
                    {
                        const result = resolveModuleName("folder2/file2", file1.name, options, host);
                        checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(file2.name), []);
                    }
                    {
                        const result = resolveModuleName("./file3", file2.name, options, host);
                        checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(file3.name), []);
                    }
                    {
                        const result = resolveModuleName("/root/folder1/file1", file2.name, options, host);
                        checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(file1.name), []);
                    }
                }
            }
            // add failure tests
        });

        it("node + baseUrl", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const main: File = { name: "/root/a/b/main.ts" };
                const m1: File = { name: "/root/m1.ts" }; // load file as module
                const m2: File = { name: "/root/m2/index.d.ts" }; // load folder as module
                const m3: File = { name: "/root/m3/package.json", content: JSON.stringify({ typings: "dist/typings.d.ts" }) };
                const m3Typings: File = { name: "/root/m3/dist/typings.d.ts" };
                const m4: File = { name: "/root/node_modules/m4.ts" }; // fallback to node

                const options: CompilerOptions = { moduleResolution: ModuleResolutionKind.NodeJs, baseUrl: "/root" };
                const host = createModuleResolutionHost(hasDirectoryExists, main, m1, m2, m3, m3Typings, m4);

                check("m1", main, m1);
                check("m2", main, m2);
                check("m3", main, m3Typings);
                check("m4", main, m4, /*isExternalLibraryImport*/ true);

                function check(name: string, caller: File, expected: File, isExternalLibraryImport = false) {
                    const result = resolveModuleName(name, caller.name, options, host);
                    checkResolvedModule(result.resolvedModule, createResolvedModule(expected.name, isExternalLibraryImport));
                }
            }
        });

        it("classic + baseUrl", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const main: File = { name: "/root/a/b/main.ts" };
                const m1: File = { name: "/root/x/m1.ts" }; // load from base url
                const m2: File = { name: "/m2.ts" }; // fallback to classic

                const options: CompilerOptions = { moduleResolution: ModuleResolutionKind.Classic, baseUrl: "/root/x", jsx: JsxEmit.React };
                const host = createModuleResolutionHost(hasDirectoryExists, main, m1, m2);

                check("m1", main, m1);
                check("m2", main, m2);

                function check(name: string, caller: File, expected: File) {
                    const result = resolveModuleName(name, caller.name, options, host);
                    checkResolvedModule(result.resolvedModule, createResolvedModule(expected.name));
                }
            }
        });

        it("node + baseUrl + path mappings", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const main: File = { name: "/root/folder1/main.ts" };

                const file1: File = { name: "/root/folder1/file1.ts" };
                const file2: File = { name: "/root/generated/folder1/file2.ts" }; // load remapped file as module
                const file3: File = { name: "/root/generated/folder2/file3/index.d.ts" }; // load folder a module
                const file4Typings: File = { name: "/root/generated/folder2/file4/package.json", content: JSON.stringify({ typings: "dist/types.d.ts" }) };
                const file4: File = { name: "/root/generated/folder2/file4/dist/types.d.ts" }; // load file pointed by typings
                const file5: File = { name: "/root/someanotherfolder/file5/index.d.ts" }; // load remapped module from folder
                const file6: File = { name: "/root/node_modules/file6.ts" }; // fallback to node
                const host = createModuleResolutionHost(hasDirectoryExists, file1, file2, file3, file4, file4Typings, file5, file6);

                const options: CompilerOptions = {
                    moduleResolution: ModuleResolutionKind.NodeJs,
                    baseUrl: "/root",
                    jsx: JsxEmit.React,
                    paths: {
                        "*": [
                            "*",
                            "generated/*"
                        ],
                        "somefolder/*": [
                            "someanotherfolder/*"
                        ]
                    }
                };
                check("folder1/file1", file1, []);
                check("folder1/file2", file2, [
                    // first try the '*'
                    "/root/folder1/file2.ts",
                    "/root/folder1/file2.tsx",
                    "/root/folder1/file2.d.ts",
                    "/root/folder1/file2/package.json",

                    "/root/folder1/file2/index.ts",
                    "/root/folder1/file2/index.tsx",
                    "/root/folder1/file2/index.d.ts",
                    // then first attempt on 'generated/*' was successful
                ]);
                check("folder2/file3", file3, [
                    // first try '*'
                    "/root/folder2/file3.ts",
                    "/root/folder2/file3.tsx",
                    "/root/folder2/file3.d.ts",
                    "/root/folder2/file3/package.json",

                    "/root/folder2/file3/index.ts",
                    "/root/folder2/file3/index.tsx",
                    "/root/folder2/file3/index.d.ts",

                    // then use remapped location
                    "/root/generated/folder2/file3.ts",
                    "/root/generated/folder2/file3.tsx",
                    "/root/generated/folder2/file3.d.ts",
                    "/root/generated/folder2/file3/package.json",

                    "/root/generated/folder2/file3/index.ts",
                    "/root/generated/folder2/file3/index.tsx",
                    // success on index.d.ts
                ]);
                check("folder2/file4", file4, [
                    // first try '*'
                    "/root/folder2/file4.ts",
                    "/root/folder2/file4.tsx",
                    "/root/folder2/file4.d.ts",
                    "/root/folder2/file4/package.json",

                    "/root/folder2/file4/index.ts",
                    "/root/folder2/file4/index.tsx",
                    "/root/folder2/file4/index.d.ts",

                    // try to load from file from remapped location
                    "/root/generated/folder2/file4.ts",
                    "/root/generated/folder2/file4.tsx",
                    "/root/generated/folder2/file4.d.ts",
                    // success on loading as from folder
                ]);
                check("somefolder/file5", file5, [
                    // load from remapped location
                    // first load from fle
                    "/root/someanotherfolder/file5.ts",
                    "/root/someanotherfolder/file5.tsx",
                    "/root/someanotherfolder/file5.d.ts",

                    // load from folder
                    "/root/someanotherfolder/file5/package.json",
                    "/root/someanotherfolder/file5/index.ts",
                    "/root/someanotherfolder/file5/index.tsx",
                    // success on index.d.ts
                ]);
                check("file6", file6, [
                    // first try *
                    // load from file
                    "/root/file6.ts",
                    "/root/file6.tsx",
                    "/root/file6.d.ts",

                    // load from folder
                    "/root/file6/package.json",
                    "/root/file6/index.ts",
                    "/root/file6/index.tsx",
                    "/root/file6/index.d.ts",

                    // then try 'generated/*'
                    // load from file
                    "/root/generated/file6.ts",
                    "/root/generated/file6.tsx",
                    "/root/generated/file6.d.ts",

                    // load from folder
                    "/root/generated/file6/package.json",
                    "/root/generated/file6/index.ts",
                    "/root/generated/file6/index.tsx",
                    "/root/generated/file6/index.d.ts",

                    // fallback to standard node behavior
                    "/root/folder1/node_modules/file6/package.json",

                    // load from file
                    "/root/folder1/node_modules/file6.ts",
                    "/root/folder1/node_modules/file6.tsx",
                    "/root/folder1/node_modules/file6.d.ts",

                    // load from folder
                    "/root/folder1/node_modules/file6/index.ts",
                    "/root/folder1/node_modules/file6/index.tsx",
                    "/root/folder1/node_modules/file6/index.d.ts",

                    "/root/folder1/node_modules/@types/file6/package.json",
                    "/root/folder1/node_modules/@types/file6.d.ts",
                    "/root/folder1/node_modules/@types/file6/index.d.ts",

                    "/root/node_modules/file6/package.json",
                    // success on /root/node_modules/file6.ts
                ], /*isExternalLibraryImport*/ true);

                function check(name: string, expected: File, expectedFailedLookups: string[], isExternalLibraryImport = false) {
                    const result = resolveModuleName(name, main.name, options, host);
                    checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(expected.name, isExternalLibraryImport), expectedFailedLookups);
                }
            }
        });

        it ("classic + baseUrl + path mappings", () => {
            // classic mode does not use directoryExists
            test(/*hasDirectoryExists*/ false);

            function test(hasDirectoryExists: boolean) {
                const main: File = { name: "/root/folder1/main.ts" };

                const file1: File = { name: "/root/folder1/file1.ts" };
                const file2: File = { name: "/root/generated/folder1/file2.ts" };
                const file3: File = { name: "/folder1/file3.ts" }; // fallback to classic
                const host = createModuleResolutionHost(hasDirectoryExists, file1, file2, file3);

                const options: CompilerOptions = {
                    moduleResolution: ModuleResolutionKind.Classic,
                    baseUrl: "/root",
                    jsx: JsxEmit.React,
                    paths: {
                        "*": [
                            "*",
                            "generated/*"
                        ],
                        "somefolder/*": [
                            "someanotherfolder/*"
                        ]
                    }
                };
                check("folder1/file1", file1, []);
                check("folder1/file2", file2, [
                    // first try '*'
                    "/root/folder1/file2.ts",
                    "/root/folder1/file2.tsx",
                    "/root/folder1/file2.d.ts",
                    // success when using 'generated/*'
                ]);
                check("folder1/file3", file3, [
                    // first try '*'
                    "/root/folder1/file3.ts",
                    "/root/folder1/file3.tsx",
                    "/root/folder1/file3.d.ts",
                    // then try 'generated/*'
                    "/root/generated/folder1/file3.ts",
                    "/root/generated/folder1/file3.tsx",
                    "/root/generated/folder1/file3.d.ts",
                    // fallback to classic
                    "/root/folder1/folder1/file3.ts",
                    "/root/folder1/folder1/file3.tsx",
                    "/root/folder1/folder1/file3.d.ts",
                    "/root/folder1/file3.ts",
                    "/root/folder1/file3.tsx",
                    "/root/folder1/file3.d.ts",
                ]);

                function check(name: string, expected: File, expectedFailedLookups: string[]) {
                    const result = resolveModuleName(name, main.name, options, host);
                    checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(expected.name), expectedFailedLookups);
                }
            }
        });

        it ("node + rootDirs", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const file1: File = { name: "/root/folder1/file1.ts" };
                const file1_1: File = { name: "/root/folder1/file1_1/index.d.ts" }; // tslint:disable-line variable-name
                const file2: File = { name: "/root/generated/folder1/file2.ts" };
                const file3: File = { name: "/root/generated/folder2/file3.ts" };
                const host = createModuleResolutionHost(hasDirectoryExists, file1, file1_1, file2, file3);
                const options: CompilerOptions = {
                    moduleResolution: ModuleResolutionKind.NodeJs,
                    rootDirs: [
                        "/root",
                        "/root/generated/"
                    ]
                };
                check("./file2", file1, file2, [
                    // first try current location
                    // load from file
                    "/root/folder1/file2.ts",
                    "/root/folder1/file2.tsx",
                    "/root/folder1/file2.d.ts",
                    // load from folder
                    "/root/folder1/file2/package.json",
                    "/root/folder1/file2/index.ts",
                    "/root/folder1/file2/index.tsx",
                    "/root/folder1/file2/index.d.ts",
                    // success after using alternative rootDir entry
                ]);
                check("../folder1/file1", file3, file1, [
                    // first try current location
                    // load from file
                    "/root/generated/folder1/file1.ts",
                    "/root/generated/folder1/file1.tsx",
                    "/root/generated/folder1/file1.d.ts",
                    // load from module
                    "/root/generated/folder1/file1/package.json",
                    "/root/generated/folder1/file1/index.ts",
                    "/root/generated/folder1/file1/index.tsx",
                    "/root/generated/folder1/file1/index.d.ts",
                    // success after using alternative rootDir entry
                ]);
                check("../folder1/file1_1", file3, file1_1, [
                    // first try current location
                    // load from file
                    "/root/generated/folder1/file1_1.ts",
                    "/root/generated/folder1/file1_1.tsx",
                    "/root/generated/folder1/file1_1.d.ts",
                    // load from folder
                    "/root/generated/folder1/file1_1/package.json",
                    "/root/generated/folder1/file1_1/index.ts",
                    "/root/generated/folder1/file1_1/index.tsx",
                    "/root/generated/folder1/file1_1/index.d.ts",
                    // try alternative rootDir entry
                    // load from file
                    "/root/folder1/file1_1.ts",
                    "/root/folder1/file1_1.tsx",
                    "/root/folder1/file1_1.d.ts",
                    // load from directory
                    "/root/folder1/file1_1/package.json",
                    "/root/folder1/file1_1/index.ts",
                    "/root/folder1/file1_1/index.tsx",
                    // success on loading '/root/folder1/file1_1/index.d.ts'
                ]);

                function check(name: string, container: File, expected: File, expectedFailedLookups: string[]) {
                    const result = resolveModuleName(name, container.name, options, host);
                    checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(expected.name), expectedFailedLookups);
                }
            }
        });

        it ("classic + rootDirs", () => {
            test(/*hasDirectoryExists*/ false);

            function test(hasDirectoryExists: boolean) {
                const file1: File = { name: "/root/folder1/file1.ts" };
                const file2: File = { name: "/root/generated/folder1/file2.ts" };
                const file3: File = { name: "/root/generated/folder2/file3.ts" };
                const file4: File = { name: "/folder1/file1_1.ts" };
                const host = createModuleResolutionHost(hasDirectoryExists, file1, file2, file3, file4);
                const options: CompilerOptions = {
                    moduleResolution: ModuleResolutionKind.Classic,
                    jsx: JsxEmit.React,
                    rootDirs: [
                        "/root",
                        "/root/generated/"
                    ]
                };
                check("./file2", file1, file2, [
                    // first load from current location
                    "/root/folder1/file2.ts",
                    "/root/folder1/file2.tsx",
                    "/root/folder1/file2.d.ts",
                    // then try alternative rootDir entry
                ]);
                check("../folder1/file1", file3, file1, [
                    // first load from current location
                    "/root/generated/folder1/file1.ts",
                    "/root/generated/folder1/file1.tsx",
                    "/root/generated/folder1/file1.d.ts",
                    // then try alternative rootDir entry
                ]);
                check("folder1/file1_1", file3, file4, [
                    // current location
                    "/root/generated/folder2/folder1/file1_1.ts",
                    "/root/generated/folder2/folder1/file1_1.tsx",
                    "/root/generated/folder2/folder1/file1_1.d.ts",
                    // other entry in rootDirs
                    "/root/generated/folder1/file1_1.ts",
                    "/root/generated/folder1/file1_1.tsx",
                    "/root/generated/folder1/file1_1.d.ts",
                    // fallback
                    "/root/folder1/file1_1.ts",
                    "/root/folder1/file1_1.tsx",
                    "/root/folder1/file1_1.d.ts",
                    // found one
                ]);

                function check(name: string, container: File, expected: File, expectedFailedLookups: string[]) {
                    const result = resolveModuleName(name, container.name, options, host);
                    checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(expected.name), expectedFailedLookups);
                }
            }
        });

        it ("nested node module", () => {
            test(/*hasDirectoryExists*/ false);
            test(/*hasDirectoryExists*/ true);

            function test(hasDirectoryExists: boolean) {
                const app: File = { name: "/root/src/app.ts" };
                const libsPackage: File = { name: "/root/src/libs/guid/package.json", content: JSON.stringify({ typings: "dist/guid.d.ts" }) };
                const libsTypings: File = { name: "/root/src/libs/guid/dist/guid.d.ts" };
                const host = createModuleResolutionHost(hasDirectoryExists, app, libsPackage, libsTypings);
                const options: CompilerOptions = {
                    moduleResolution: ModuleResolutionKind.NodeJs,
                    baseUrl: "/root",
                    paths: {
                        "libs/guid": [ "src/libs/guid" ]
                    }
                 };
                const result = resolveModuleName("libs/guid", app.name, options, host);
                checkResolvedModuleWithFailedLookupLocations(result, createResolvedModule(libsTypings.name), [
                    // first try to load module as file
                    "/root/src/libs/guid.ts",
                    "/root/src/libs/guid.tsx",
                    "/root/src/libs/guid.d.ts",
                ]);
            }
        });
    });

    describe("ModuleResolutionHost.directoryExists", () => {
        it("No 'fileExists' calls if containing directory is missing", () => {
            const host: ModuleResolutionHost = {
                readFile: notImplemented,
                fileExists: notImplemented,
                directoryExists: _ => false
            };

            const result = resolveModuleName("someName", "/a/b/c/d", { moduleResolution: ModuleResolutionKind.NodeJs }, host);
            assert(!result.resolvedModule);
        });
    });

    describe("Type reference directive resolution: ", () => {
        function test(typesRoot: string, typeDirective: string, primary: boolean, initialFile: File, targetFile: File, ...otherFiles: File[]) {
            const host = createModuleResolutionHost(/*hasDirectoryExists*/ false, ...[initialFile, targetFile].concat(...otherFiles));
            const result = resolveTypeReferenceDirective(typeDirective, initialFile.name, { typeRoots: [typesRoot] }, host);
            assert(result.resolvedTypeReferenceDirective.resolvedFileName !== undefined, "expected type directive to be resolved");
            assert.equal(result.resolvedTypeReferenceDirective.resolvedFileName, targetFile.name, "unexpected result of type reference resolution");
            assert.equal(result.resolvedTypeReferenceDirective.primary, primary, "unexpected 'primary' value");
        }

        it("Can be resolved from primary location", () => {
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/src/types/lib/index.d.ts" };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ true, f1, f2);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/src/types/lib/typings/lib.d.ts" };
                const packageFile = { name: "/root/src/types/lib/package.json", content: JSON.stringify({ types: "typings/lib.d.ts" }) };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ true, f1, f2, packageFile);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/src/node_modules/lib/index.d.ts" };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/src/node_modules/lib/typings/lib.d.ts" };
                const packageFile = { name: "/root/src/node_modules/lib/package.json", content: JSON.stringify({ types: "typings/lib.d.ts" }) };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2, packageFile);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/src/node_modules/@types/lib/index.d.ts" };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/src/node_modules/@types/lib/typings/lib.d.ts" };
                const packageFile = { name: "/root/src/node_modules/@types/lib/package.json", content: JSON.stringify({ types: "typings/lib.d.ts" }) };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2, packageFile);
            }
        });
        it("Can be resolved from secondary location", () => {
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/node_modules/lib.d.ts" };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/node_modules/lib/index.d.ts" };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/node_modules/lib/typings/lib.d.ts" };
                const packageFile = { name: "/root/node_modules/lib/package.json", content: JSON.stringify({ typings: "typings/lib.d.ts" }) };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2, packageFile);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/node_modules/@types/lib/index.d.ts" };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2);
            }
            {
                const f1 = { name: "/root/src/app.ts" };
                const f2 = { name: "/root/node_modules/@types/lib/typings/lib.d.ts" };
                const packageFile = { name: "/root/node_modules/@types/lib/package.json", content: JSON.stringify({ typings: "typings/lib.d.ts" }) };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ false, f1, f2, packageFile);
            }
        });
        it("Primary resolution overrides secondary resolutions", () => {
            {
                const f1 = { name: "/root/src/a/b/c/app.ts" };
                const f2 = { name: "/root/src/types/lib/index.d.ts" };
                const f3 = { name: "/root/src/a/b/node_modules/lib.d.ts" };
                test(/*typesRoot*/"/root/src/types", /* typeDirective */"lib", /*primary*/ true, f1, f2, f3);
            }
        });
        it("Reused program keeps errors", () => {
            const f1 = { name: "/root/src/a/b/c/d/e/app.ts", content: `/// <reference types="lib"/>` };
            const f2 = { name: "/root/src/a/b/c/d/node_modules/lib/index.d.ts", content: `declare var x: number;` };
            const f3 = { name: "/root/src/a/b/c/d/f/g/app.ts", content: `/// <reference types="lib"/>` };
            const f4 = { name: "/root/src/a/b/c/d/f/node_modules/lib/index.d.ts", content: `declare var x: number;` };
            const files = [f1, f2, f3, f4];

            const names = map(files, f => f.name);
            const sourceFiles = arrayToMap(map(files, f => createSourceFile(f.name, f.content, ScriptTarget.ES2015)), f => f.fileName);
            const compilerHost: CompilerHost = {
                fileExists : fileName => sourceFiles.has(fileName),
                getSourceFile: fileName => sourceFiles.get(fileName),
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: notImplemented,
                getCurrentDirectory: () => "/",
                getDirectories: () => [],
                getCanonicalFileName: f => f.toLowerCase(),
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => false,
                readFile: fileName => {
                    const file = sourceFiles.get(fileName);
                    return file && file.text;
                },
            };
            const program1 = createProgram(names, {}, compilerHost);
            const diagnostics1 = program1.getFileProcessingDiagnostics().getDiagnostics();
            assert.equal(diagnostics1.length, 1, "expected one diagnostic");

            createProgram(names, {}, compilerHost, program1);
            assert.isTrue(program1.structureIsReused === StructureIsReused.Completely);
            const diagnostics2 = program1.getFileProcessingDiagnostics().getDiagnostics();
            assert.equal(diagnostics2.length, 1, "expected one diagnostic");
            assert.equal(diagnostics1[0].messageText, diagnostics2[0].messageText, "expected one diagnostic");
        });

        it ("Modules in the same .d.ts file are preferred to external files", () => {
            const f = {
                name: "/a/b/c/c/app.d.ts",
                content: `
                declare module "fs" {
                    export interface Stat { id: number }
                }
                declare module "fs-client" {
                    import { Stat } from "fs";
                    export function foo(): Stat;
                }`
            };
            const file = createSourceFile(f.name, f.content, ScriptTarget.ES2015);
            const compilerHost: CompilerHost = {
                fileExists : fileName => fileName === file.fileName,
                getSourceFile: fileName => fileName === file.fileName ? file : undefined,
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: notImplemented,
                getCurrentDirectory: () => "/",
                getDirectories: () => [],
                getCanonicalFileName: f => f.toLowerCase(),
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => false,
                readFile: fileName => fileName === file.fileName ? file.text : undefined,
                resolveModuleNames() {
                    assert(false, "resolveModuleNames should not be called");
                    return undefined;
                }
            };
            createProgram([f.name], {}, compilerHost);
        });

        it ("Modules in .ts file are not checked in the same file", () => {
            const f = {
                name: "/a/b/c/c/app.ts",
                content: `
                declare module "fs" {
                    export interface Stat { id: number }
                }
                declare module "fs-client" {
                    import { Stat } from "fs";
                    export function foo(): Stat;
                }`
            };
            const file = createSourceFile(f.name, f.content, ScriptTarget.ES2015);
            const compilerHost: CompilerHost = {
                fileExists : fileName => fileName === file.fileName,
                getSourceFile: fileName => fileName === file.fileName ? file : undefined,
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: notImplemented,
                getCurrentDirectory: () => "/",
                getDirectories: () => [],
                getCanonicalFileName: f => f.toLowerCase(),
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => false,
                readFile: fileName => fileName === file.fileName ? file.text : undefined,
                resolveModuleNames(moduleNames: string[], _containingFile: string) {
                    assert.deepEqual(moduleNames, ["fs"]);
                    return [undefined];
                }
            };
            createProgram([f.name], {}, compilerHost);
        });
    });
}
