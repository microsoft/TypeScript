import * as Harness from "../_namespaces/Harness.js";
import * as ts from "../_namespaces/ts.js";
import { jsonToReadableText } from "./helpers.js";

interface File {
    name: string;
    content?: string;
    symlinks?: string[];
}

function createModuleResolutionHost(baselines: string[], hasDirectoryExists: boolean, ...files: File[]): ts.ModuleResolutionHost {
    const map = new Map<string, File>();
    for (const file of files) {
        map.set(file.name, file);
        baselines.push(`//// [${file.name}]\n${file.content || ""}`, "");
        if (file.symlinks) {
            for (const symlink of file.symlinks) {
                map.set(symlink, file);
                baselines.push(`//// [${symlink}] symlink(${file.name})`, "");
            }
        }
    }

    if (hasDirectoryExists) {
        const directories = new Map<string, string>();
        for (const f of files) {
            let name = ts.getDirectoryPath(f.name);
            while (true) {
                directories.set(name, name);
                const baseName = ts.getDirectoryPath(name);
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
                assert.isTrue(directories.has(ts.getDirectoryPath(path)), `'fileExists' '${path}' request in non-existing directory`);
                return map.has(path);
            },
            useCaseSensitiveFileNames: true,
        };
    }
    else {
        return { readFile, realpath, fileExists: path => map.has(path), useCaseSensitiveFileNames: true };
    }
    function readFile(path: string): string | undefined {
        const file = map.get(path);
        return file && file.content;
    }
    function realpath(path: string): string {
        return map.get(path)!.name;
    }
}

function runBaseline(scenario: string, baselines: readonly string[]) {
    Harness.Baseline.runBaseline(`moduleResolution/${scenario.split(" ").join("-")}.js`, baselines.join("\n"));
}

describe("unittests:: moduleResolution:: Node module resolution - relative paths", () => {
    // node module resolution does _not_ implicitly append these extensions to an extensionless path (though will still attempt to load them if explicitly)
    const nonImplicitExtensions = [ts.Extension.Mts, ts.Extension.Dmts, ts.Extension.Mjs, ts.Extension.Cts, ts.Extension.Dcts, ts.Extension.Cjs];
    const autoExtensions = ts.filter(ts.supportedTSExtensionsFlat, e => !nonImplicitExtensions.includes(e));

    it("load as file", () => {
        const baselines: string[] = [];
        testLoadAsFile("load as file with relative name in current directory", "/foo/bar/baz.ts", "/foo/bar/foo", "./foo");
        testLoadAsFile("load as file with relative name in parent directory", "/foo/bar/baz.ts", "/foo/foo", "../foo");
        testLoadAsFile("load as file with name starting with directory seperator", "/foo/bar/baz.ts", "/foo", "/foo");
        testLoadAsFile("load as file with name starting with window root", "c:/foo/bar/baz.ts", "c:/foo", "c:/foo");
        runBaseline("relative module name as file", baselines);
        function testLoadAsFile(scenario: string, containingFileName: string, moduleFileNameNoExt: string, moduleName: string): void {
            baselines.push(scenario);
            for (const ext of autoExtensions) {
                test(ext, /*hasDirectoryExists*/ true);
                test(ext, /*hasDirectoryExists*/ false);
            }
            baselines.push("");
            function test(ext: string, hasDirectoryExists: boolean) {
                const containingFile = { name: containingFileName };
                const moduleFile = { name: moduleFileNameNoExt + ext };
                baselines.push(`Resolving "${moduleName}" from ${containingFile.name} when module has extension: ${ext}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const resolution = ts.nodeModuleNameResolver(moduleName, containingFile.name, {}, createModuleResolutionHost(baselines, hasDirectoryExists, containingFile, moduleFile));
                baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
                baselines.push("");
            }
        }
    });

    it("module name as directory - load from 'typings'", () => {
        const baselines: string[] = [];
        testLoadingFromPackageJson("/a/b/c/d.ts", "/a/b/c/bar/package.json", "c/d/e.d.ts", "/a/b/c/bar/c/d/e.d.ts", "./bar");
        testLoadingFromPackageJson("/a/b/c/d.ts", "/a/bar/package.json", "e.d.ts", "/a/bar/e.d.ts", "../../bar");
        testLoadingFromPackageJson("/a/b/c/d.ts", "/bar/package.json", "e.d.ts", "/bar/e.d.ts", "/bar");
        testLoadingFromPackageJson("c:/a/b/c/d.ts", "c:/bar/package.json", "e.d.ts", "c:/bar/e.d.ts", "c:/bar");
        runBaseline("relative module name as directory", baselines);

        function testLoadingFromPackageJson(containingFileName: string, packageJsonFileName: string, fieldRef: string, moduleFileName: string, moduleName: string): void {
            test(/*hasDirectoryExists*/ true);
            test(/*hasDirectoryExists*/ false);

            function test(hasDirectoryExists: boolean) {
                const containingFile = { name: containingFileName };
                const packageJson = { name: packageJsonFileName, content: jsonToReadableText({ typings: fieldRef }) };
                const moduleFile = { name: moduleFileName };
                baselines.push(`Resolving "${moduleName}" from ${containingFile.name} with typings: ${fieldRef}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const resolution = ts.nodeModuleNameResolver(moduleName, containingFile.name, {}, createModuleResolutionHost(baselines, hasDirectoryExists, containingFile, packageJson, moduleFile));
                baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
                baselines.push("");
            }
        }
    });

    it("module name as directory - handle invalid 'typings'", () => {
        const baselines: string[] = [];
        testTypingsIgnored(["a", "b"]);
        testTypingsIgnored({ a: "b" });
        testTypingsIgnored(/*typings*/ true);
        testTypingsIgnored(/*typings*/ null); // eslint-disable-line no-restricted-syntax
        testTypingsIgnored(/*typings*/ undefined);
        runBaseline("relative module name as directory with invalid typings", baselines);

        function testTypingsIgnored(typings: any): void {
            test(/*hasDirectoryExists*/ true);
            test(/*hasDirectoryExists*/ false);
            function test(hasDirectoryExists: boolean) {
                const containingFile = { name: "/a/b.ts" };
                const packageJson = { name: "/node_modules/b/package.json", content: jsonToReadableText({ typings }) };
                const moduleFile = { name: "/a/b.d.ts" };

                const indexPath = "/node_modules/b/index.d.ts";
                const indexFile = { name: indexPath };

                baselines.push(`Resolving "b" from ${containingFile.name} with typings: ${jsonToReadableText(typings)}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const resolution = ts.nodeModuleNameResolver("b", containingFile.name, {}, createModuleResolutionHost(baselines, hasDirectoryExists, containingFile, packageJson, moduleFile, indexFile));
                baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
                baselines.push("");
            }
        }
    });
    it("module name as directory - load index.d.ts", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("relative module name as directory load index", baselines);

        function test(hasDirectoryExists: boolean) {
            const containingFile = { name: "/a/b/c.ts" };
            const packageJson = { name: "/a/b/foo/package.json", content: jsonToReadableText({ main: "/c/d" }) };
            const indexFile = { name: "/a/b/foo/index.d.ts" };
            baselines.push(`Resolving "./foo" from ${containingFile.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
            const resolution = ts.nodeModuleNameResolver("./foo", containingFile.name, {}, createModuleResolutionHost(baselines, hasDirectoryExists, containingFile, packageJson, indexFile));
            baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
            baselines.push("");
        }
    });
});

describe("unittests:: moduleResolution:: Node module resolution - non-relative paths", () => {
    it("computes correct commonPrefix for moduleName cache", () => {
        const resolutionCache = ts.createModuleResolutionCache("/", f => f);
        let cache = resolutionCache.getOrCreateCacheForNonRelativeName("a", /*mode*/ undefined);
        cache.set("/sub", {
            resolvedModule: {
                originalPath: undefined,
                resolvedFileName: "/sub/node_modules/a/index.ts",
                isExternalLibraryImport: true,
                extension: ts.Extension.Ts,
            },
            failedLookupLocations: [],
            affectingLocations: [],
            resolutionDiagnostics: [],
        });
        assert.isDefined(cache.get("/sub"));
        assert.isUndefined(cache.get("/"));

        cache = resolutionCache.getOrCreateCacheForNonRelativeName("b", /*mode*/ undefined);
        cache.set("/sub/dir/foo", {
            resolvedModule: {
                originalPath: undefined,
                resolvedFileName: "/sub/directory/node_modules/b/index.ts",
                isExternalLibraryImport: true,
                extension: ts.Extension.Ts,
            },
            failedLookupLocations: [],
            affectingLocations: [],
            resolutionDiagnostics: [],
        });
        assert.isDefined(cache.get("/sub/dir/foo"));
        assert.isDefined(cache.get("/sub/dir"));
        assert.isDefined(cache.get("/sub"));
        assert.isUndefined(cache.get("/"));

        cache = resolutionCache.getOrCreateCacheForNonRelativeName("c", /*mode*/ undefined);
        cache.set("/foo/bar", {
            resolvedModule: {
                originalPath: undefined,
                resolvedFileName: "/bar/node_modules/c/index.ts",
                isExternalLibraryImport: true,
                extension: ts.Extension.Ts,
            },
            failedLookupLocations: [],
            affectingLocations: [],
            resolutionDiagnostics: [],
        });
        assert.isDefined(cache.get("/foo/bar"));
        assert.isDefined(cache.get("/foo"));
        assert.isDefined(cache.get("/"));

        cache = resolutionCache.getOrCreateCacheForNonRelativeName("d", /*mode*/ undefined);
        cache.set("/foo", {
            resolvedModule: {
                originalPath: undefined,
                resolvedFileName: "/foo/index.ts",
                isExternalLibraryImport: true,
                extension: ts.Extension.Ts,
            },
            failedLookupLocations: [],
            affectingLocations: [],
            resolutionDiagnostics: [],
        });
        assert.isDefined(cache.get("/foo"));
        assert.isUndefined(cache.get("/"));

        cache = resolutionCache.getOrCreateCacheForNonRelativeName("e", /*mode*/ undefined);
        cache.set("c:/foo", {
            resolvedModule: {
                originalPath: undefined,
                resolvedFileName: "d:/bar/node_modules/e/index.ts",
                isExternalLibraryImport: true,
                extension: ts.Extension.Ts,
            },
            failedLookupLocations: [],
            affectingLocations: [],
            resolutionDiagnostics: [],
        });
        assert.isDefined(cache.get("c:/foo"));
        assert.isDefined(cache.get("c:/"));
        assert.isUndefined(cache.get("d:/"));

        cache = resolutionCache.getOrCreateCacheForNonRelativeName("f", /*mode*/ undefined);
        cache.set("/foo/bar/baz", {
            resolvedModule: undefined,
            failedLookupLocations: [],
            affectingLocations: [],
            resolutionDiagnostics: [],
        });
        assert.isDefined(cache.get("/foo/bar/baz"));
        assert.isDefined(cache.get("/foo/bar"));
        assert.isDefined(cache.get("/foo"));
        assert.isDefined(cache.get("/"));
    });

    it("load module as file - ts files not loaded", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("non relative module name as file ts files not loaded", baselines);

        function test(hasDirectoryExists: boolean) {
            const containingFile = { name: "/a/b/c/d/e.ts" };
            const moduleFile = { name: "/a/b/node_modules/foo.ts" };
            baselines.push(`Resolving "foo" from ${containingFile.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
            const resolution = ts.nodeModuleNameResolver("foo", containingFile.name, {}, createModuleResolutionHost(baselines, hasDirectoryExists, containingFile, moduleFile));
            baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
            baselines.push("");
        }
    });

    it("load module as file", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("non relative module name as file", baselines);

        function test(hasDirectoryExists: boolean) {
            const containingFile = { name: "/a/b/c/d/e.ts" };
            const moduleFile = { name: "/a/b/node_modules/foo.d.ts" };
            baselines.push(`Resolving "foo" from ${containingFile.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
            const resolution = ts.nodeModuleNameResolver("foo", containingFile.name, {}, createModuleResolutionHost(baselines, hasDirectoryExists, containingFile, moduleFile));
            baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
            baselines.push("");
        }
    });

    it("load module as directory", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("non relative module name as directory", baselines);

        function test(hasDirectoryExists: boolean) {
            const containingFile: File = { name: "/a/node_modules/b/c/node_modules/d/e.ts" };
            const moduleFile: File = { name: "/a/node_modules/foo/index.d.ts" };
            baselines.push(`Resolving "foo" from ${containingFile.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
            const resolution = ts.nodeModuleNameResolver("foo", containingFile.name, {}, createModuleResolutionHost(baselines, hasDirectoryExists, containingFile, moduleFile));
            baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
            baselines.push("");
        }
    });

    it("preserveSymlinks", () => {
        const baselines: string[] = [];
        testPreserveSymlinks(/*preserveSymlinks*/ false);
        testPreserveSymlinks(/*preserveSymlinks*/ true);
        runBaseline("non relative preserveSymlinks", baselines);
        function testPreserveSymlinks(preserveSymlinks: boolean) {
            const realFileName = "/linked/index.d.ts";
            const symlinkFileName = "/app/node_modules/linked/index.d.ts";
            const host = createModuleResolutionHost(
                baselines,
                /*hasDirectoryExists*/ true,
                { name: realFileName, symlinks: [symlinkFileName] },
                { name: "/app/node_modules/linked/package.json", content: jsonToReadableText({ version: "0.0.0", main: "./index" }) },
            );
            baselines.push(`Resolving "linked" from /app/app.ts when preserveSymlinks is ${preserveSymlinks}`);
            const resolution = ts.nodeModuleNameResolver("linked", "/app/app.ts", { preserveSymlinks }, host);
            baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
            baselines.push("");
        }
    });

    it("uses originalPath for caching", () => {
        const baselines: string[] = [];
        const host = createModuleResolutionHost(
            baselines,
            /*hasDirectoryExists*/ true,
            {
                name: "/modules/a.ts",
                symlinks: ["/sub/node_modules/a/index.ts"],
            },
            {
                name: "/sub/node_modules/a/package.json",
                content: jsonToReadableText({ version: "0.0.0", main: "./index" }),
            },
        );
        const compilerOptions: ts.CompilerOptions = { moduleResolution: ts.ModuleResolutionKind.Node10 };
        const cache = ts.createModuleResolutionCache("/", f => f);
        baselines.push(`Resolving "a" from /sub/dir/foo.ts`);
        let resolution = ts.resolveModuleName("a", "/sub/dir/foo.ts", compilerOptions, host, cache);
        baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
        baselines.push("");

        baselines.push(`Resolving "a" from /sub/foo.ts`);
        resolution = ts.resolveModuleName("a", "/sub/foo.ts", compilerOptions, host, cache);
        baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
        baselines.push("");

        baselines.push(`Resolving "a" from /foo.ts`);
        resolution = ts.resolveModuleName("a", "/foo.ts", compilerOptions, host, cache);
        baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
        baselines.push("");
        runBaseline("non relative uses originalPath for caching", baselines);
    });

    it("preserves originalPath on cache hit", () => {
        const baselines: string[] = [];
        const host = createModuleResolutionHost(
            baselines,
            /*hasDirectoryExists*/ true,
            { name: "/linked/index.d.ts", symlinks: ["/app/node_modules/linked/index.d.ts"] },
            { name: "/app/node_modules/linked/package.json", content: jsonToReadableText({ version: "0.0.0", main: "./index" }) },
        );
        const cache = ts.createModuleResolutionCache("/", f => f);
        const compilerOptions: ts.CompilerOptions = { moduleResolution: ts.ModuleResolutionKind.Node10 };
        baselineResolution("/app/src/app.ts");
        baselineResolution("/app/lib/main.ts");
        runBaseline("non relative preserves originalPath on cache hit", baselines);

        function baselineResolution(containingFile: string) {
            baselines.push(`Resolving "linked" from ${containingFile}`);
            const resolution = ts.resolveModuleName("linked", containingFile, compilerOptions, host, cache);
            baselines.push(`Resolution:: ${jsonToReadableText(resolution)}`);
            baselines.push("");
        }
    });
});

describe("unittests:: moduleResolution:: Relative imports", () => {
    function test(scenario: string, filesMapLike: ts.MapLike<string>, currentDirectory: string, rootFiles: string[], relativeNamesToCheck: string[]) {
        it(scenario, () => {
            const files = new Map(Object.entries(filesMapLike));
            const baselines: string[] = [];
            files.forEach((content, file) => baselines.push(`//// [${file}]\n${content}`, ""));
            const options: ts.CompilerOptions = { module: ts.ModuleKind.CommonJS };
            const host: ts.CompilerHost = {
                getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget) => {
                    const path = ts.normalizePath(ts.combinePaths(currentDirectory, fileName));
                    const file = files.get(path);
                    return file ? ts.createSourceFile(fileName, file, languageVersion) : undefined;
                },
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: ts.notImplemented,
                getCurrentDirectory: () => currentDirectory,
                getDirectories: () => [],
                getCanonicalFileName: fileName => fileName.toLowerCase(),
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => false,
                fileExists: fileName => {
                    const path = ts.normalizePath(ts.combinePaths(currentDirectory, fileName));
                    return files.has(path);
                },
                readFile: ts.notImplemented,
            };

            const program = ts.createProgram(rootFiles, options, host);
            baselines.push("Program files::");
            program.getSourceFiles().forEach(file => baselines.push(file.fileName));

            baselines.push("", "Syntactic Diagnostics::");
            baselines.push(ts.formatDiagnostics(program.getSyntacticDiagnostics(), host), "");

            baselines.push("Semantic Diagnostics::");
            baselines.push(ts.formatDiagnostics(program.getSemanticDiagnostics(), host), "");

            // try to get file using a relative name
            for (const relativeFileName of relativeNamesToCheck) {
                baselines.push(`getSourceFile by ${relativeFileName}: ${program.getSourceFile(relativeFileName)?.fileName}`);
            }

            runBaseline(scenario, baselines);
        });
    }

    test(
        "should file all modules",
        {
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
                `,
        },
        "/a/b/c/first/second",
        ["class_a.ts"],
        ["../../../c/third/class_c.ts"],
    );

    test(
        "should find modules in node_modules",
        {
            "/parent/node_modules/mod/index.d.ts": "export var x",
            "/parent/app/myapp.ts": `import {x} from "mod"`,
        },
        "/parent/app",
        ["myapp.ts"],
        [],
    );

    test(
        "should find file referenced via absolute and relative names",
        {
            "/a/b/c.ts": `/// <reference path="b.ts"/>`,
            "/a/b/b.ts": "var x",
        },
        "/a/b",
        ["c.ts", "/a/b/b.ts"],
        [],
    );
});

describe("unittests:: moduleResolution:: Files with different casing with forceConsistentCasingInFileNames", () => {
    let library: ts.SourceFile;
    function test(
        scenario: string,
        filesMapLike: ts.MapLike<string>,
        options: ts.CompilerOptions,
        currentDirectory: string,
        useCaseSensitiveFileNames: boolean,
        rootFiles: string[],
    ): void {
        it(scenario, () => {
            const getCanonicalFileName = ts.createGetCanonicalFileName(useCaseSensitiveFileNames);
            let files = new Map(Object.entries(filesMapLike));
            if (!useCaseSensitiveFileNames) {
                const oldFiles = files;
                files = new Map<string, string>();
                oldFiles.forEach((file, fileName) => {
                    files.set(getCanonicalFileName(fileName), file);
                });
            }

            const baselines: string[] = [];
            files.forEach((content, file) => baselines.push(`//// [${file}]\n${content}`, ""));
            const host: ts.CompilerHost = {
                getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget) => {
                    if (fileName === "lib.d.ts") {
                        if (!library) {
                            library = ts.createSourceFile("lib.d.ts", "", ts.ScriptTarget.ES5);
                        }
                        return library;
                    }
                    const path = getCanonicalFileName(ts.normalizePath(ts.combinePaths(currentDirectory, fileName)));
                    const file = files.get(path);
                    return file ? ts.createSourceFile(fileName, file, languageVersion) : undefined;
                },
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: ts.notImplemented,
                getCurrentDirectory: () => currentDirectory,
                getDirectories: () => [],
                getCanonicalFileName,
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
                fileExists: fileName => {
                    const path = getCanonicalFileName(ts.normalizePath(ts.combinePaths(currentDirectory, fileName)));
                    return files.has(path);
                },
                readFile: ts.notImplemented,
            };
            const program = ts.createProgram(rootFiles, options, host);
            const diagnostics = ts.sortAndDeduplicateDiagnostics([...program.getSemanticDiagnostics(), ...program.getOptionsDiagnostics()]);
            baselines.push("Diagnostics::");
            baselines.push(ts.formatDiagnostics(diagnostics, host), "");
            runBaseline(scenario, baselines);
        });
    }

    test(
        "same file is referenced using absolute and relative names",
        {
            "/a/b/c.ts": `/// <reference path="d.ts"/>`,
            "/a/b/d.ts": "var x",
        },
        { module: ts.ModuleKind.AMD },
        "/a/b",
        /*useCaseSensitiveFileNames*/ false,
        ["c.ts", "/a/b/d.ts"],
    );
    test(
        "two files used in program differ only in casing (tripleslash references)",
        {
            "/a/b/c.ts": `/// <reference path="D.ts"/>`,
            "/a/b/d.ts": "var x",
        },
        { module: ts.ModuleKind.AMD, forceConsistentCasingInFileNames: true },
        "/a/b",
        /*useCaseSensitiveFileNames*/ false,
        ["c.ts", "d.ts"],
    );
    test(
        "two files used in program differ only in casing (imports)",
        {
            "/a/b/c.ts": `import {x} from "D"`,
            "/a/b/d.ts": "export var x",
        },
        { module: ts.ModuleKind.AMD, forceConsistentCasingInFileNames: true },
        "/a/b",
        /*useCaseSensitiveFileNames*/ false,
        ["c.ts", "d.ts"],
    );
    test(
        "two files used in program differ only in casing (imports, relative module names)",
        {
            "moduleA.ts": `import {x} from "./ModuleB"`,
            "moduleB.ts": "export var x",
        },
        { module: ts.ModuleKind.CommonJS, forceConsistentCasingInFileNames: true },
        "",
        /*useCaseSensitiveFileNames*/ false,
        ["moduleA.ts", "moduleB.ts"],
    );
    test(
        "two files exist on disk that differs only in casing",
        {
            "/a/b/c.ts": `import {x} from "D"`,
            "/a/b/D.ts": "export var x",
            "/a/b/d.ts": "export var y",
        },
        { module: ts.ModuleKind.AMD },
        "/a/b",
        /*useCaseSensitiveFileNames*/ true,
        ["c.ts", "d.ts"],
    );
    test(
        "module name in require calls has inconsistent casing",
        {
            "moduleA.ts": `import a = require("./ModuleC")`,
            "moduleB.ts": `import a = require("./moduleC")`,
            "moduleC.ts": "export var x",
        },
        { module: ts.ModuleKind.CommonJS, forceConsistentCasingInFileNames: true },
        "",
        /*useCaseSensitiveFileNames*/ false,
        ["moduleA.ts", "moduleB.ts", "moduleC.ts"],
    );
    test(
        "module names in require calls has inconsistent casing and current directory has uppercase chars",
        {
            "/a/B/c/moduleA.ts": `import a = require("./ModuleC")`,
            "/a/B/c/moduleB.ts": `import a = require("./moduleC")`,
            "/a/B/c/moduleC.ts": "export var x",
            "/a/B/c/moduleD.ts": `
import a = require("./moduleA");
import b = require("./moduleB");
                `,
        },
        { module: ts.ModuleKind.CommonJS, forceConsistentCasingInFileNames: true },
        "/a/B/c",
        /*useCaseSensitiveFileNames*/ false,
        ["moduleD.ts"],
    );
    test(
        "module names in require calls has consistent casing and current directory has uppercase chars",
        {
            "/a/B/c/moduleA.ts": `import a = require("./moduleC")`,
            "/a/B/c/moduleB.ts": `import a = require("./moduleC")`,
            "/a/B/c/moduleC.ts": "export var x",
            "/a/B/c/moduleD.ts": `
import a = require("./moduleA");
import b = require("./moduleB");
                `,
        },
        { module: ts.ModuleKind.CommonJS, forceConsistentCasingInFileNames: true },
        "/a/B/c",
        /*useCaseSensitiveFileNames*/ false,
        ["moduleD.ts"],
    );
    test(
        "two files in program differ only in drive letter in their names",
        {
            "d:/someFolder/moduleA.ts": `import a = require("D:/someFolder/moduleC")`,
            "d:/someFolder/moduleB.ts": `import a = require("./moduleC")`,
            "D:/someFolder/moduleC.ts": "export const x = 10",
        },
        { module: ts.ModuleKind.CommonJS, forceConsistentCasingInFileNames: true },
        "d:/someFolder",
        /*useCaseSensitiveFileNames*/ false,
        ["d:/someFolder/moduleA.ts", "d:/someFolder/moduleB.ts"],
    );
});

describe("unittests:: moduleResolution:: baseUrl augmented module resolution", () => {
    it("module resolution without path mappings/rootDirs", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("baseUrl without path mappings or rootDirs", baselines);

        function test(hasDirectoryExists: boolean) {
            const file1: File = { name: "/root/folder1/file1.ts" };
            const file2: File = { name: "/root/folder2/file2.ts" };
            const file3: File = { name: "/root/folder2/file3.ts" };
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, file1, file2, file3);
            for (const moduleResolution of [ts.ModuleResolutionKind.Node10, ts.ModuleResolutionKind.Classic]) {
                const options: ts.CompilerOptions = { moduleResolution, baseUrl: "/root" };
                {
                    baselines.push(`Resolving "folder2/file2" from ${file1.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                    const result = ts.resolveModuleName("folder2/file2", file1.name, options, host);
                    baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                    baselines.push("");
                }
                {
                    baselines.push(`Resolving "./file3" from ${file2.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                    const result = ts.resolveModuleName("./file3", file2.name, options, host);
                    baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                    baselines.push("");
                }
                {
                    baselines.push(`Resolving "/root/folder1/file1" from ${file2.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                    const result = ts.resolveModuleName("/root/folder1/file1", file2.name, options, host);
                    baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                    baselines.push("");
                }
            }
        }
        // add failure tests
    });

    it("node + baseUrl", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("node baseUrl", baselines);

        function test(hasDirectoryExists: boolean) {
            const main: File = { name: "/root/a/b/main.ts" };
            const m1: File = { name: "/root/m1.ts" }; // load file as module
            const m2: File = { name: "/root/m2/index.d.ts" }; // load folder as module
            const m3: File = { name: "/root/m3/package.json", content: jsonToReadableText({ typings: "dist/typings.d.ts" }) };
            const m3Typings: File = { name: "/root/m3/dist/typings.d.ts" };
            const m4: File = { name: "/root/node_modules/m4.ts" }; // fallback to node

            const options: ts.CompilerOptions = { moduleResolution: ts.ModuleResolutionKind.Node10, baseUrl: "/root" };
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, main, m1, m2, m3, m3Typings, m4);

            check("m1", main);
            check("m2", main);
            check("m3", main);
            check("m4", main);

            function check(name: string, caller: File) {
                baselines.push(`Resolving "${name}" from ${caller.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const result = ts.resolveModuleName(name, caller.name, options, host);
                baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                baselines.push("");
            }
        }
    });

    it("classic + baseUrl", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("classic baseUrl", baselines);

        function test(hasDirectoryExists: boolean) {
            const main: File = { name: "/root/a/b/main.ts" };
            const m1: File = { name: "/root/x/m1.ts" }; // load from base url
            const m2: File = { name: "/m2.ts" }; // fallback to classic

            const options: ts.CompilerOptions = { moduleResolution: ts.ModuleResolutionKind.Classic, baseUrl: "/root/x", jsx: ts.JsxEmit.React };
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, main, m1, m2);

            check("m1", main);
            check("m2", main);

            function check(name: string, caller: File) {
                baselines.push(`Resolving "${name}" from ${caller.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const result = ts.resolveModuleName(name, caller.name, options, host);
                baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                baselines.push("");
            }
        }
    });

    it("node + baseUrl + path mappings", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("node baseUrl path mappings", baselines);

        function test(hasDirectoryExists: boolean) {
            const main: File = { name: "/root/folder1/main.ts" };

            const file1: File = { name: "/root/folder1/file1.ts" };
            const file2: File = { name: "/root/generated/folder1/file2.ts" }; // load remapped file as module
            const file3: File = { name: "/root/generated/folder2/file3/index.d.ts" }; // load folder a module
            const file4Typings: File = { name: "/root/generated/folder2/file4/package.json", content: jsonToReadableText({ typings: "dist/types.d.ts" }) };
            const file4: File = { name: "/root/generated/folder2/file4/dist/types.d.ts" }; // load file pointed by typings
            const file5: File = { name: "/root/someanotherfolder/file5/index.d.ts" }; // load remapped module from folder
            const file6: File = { name: "/root/node_modules/file6.ts" }; // fallback to node
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, file1, file2, file3, file4, file4Typings, file5, file6);

            const options: ts.CompilerOptions = {
                moduleResolution: ts.ModuleResolutionKind.Node10,
                baseUrl: "/root",
                jsx: ts.JsxEmit.React,
                paths: {
                    "*": [
                        "*",
                        "generated/*",
                    ],
                    "somefolder/*": [
                        "someanotherfolder/*",
                    ],
                    "/rooted/*": [
                        "generated/*",
                    ],
                },
            };
            check("folder1/file1");
            check("folder1/file2");
            check("/rooted/folder1/file2");
            check("folder2/file3");
            check("folder2/file4");
            check("somefolder/file5");
            check("file6");

            function check(name: string) {
                baselines.push(`Resolving "${name}" from ${main.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const result = ts.resolveModuleName(name, main.name, options, host);
                baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                baselines.push("");
            }
        }
    });

    it("classic + baseUrl + path mappings", () => {
        const baselines: string[] = [];
        // classic mode does not use directoryExists
        test(/*hasDirectoryExists*/ false);
        runBaseline("classic baseUrl path mappings", baselines);

        function test(hasDirectoryExists: boolean) {
            const main: File = { name: "/root/folder1/main.ts" };

            const file1: File = { name: "/root/folder1/file1.ts" };
            const file2: File = { name: "/root/generated/folder1/file2.ts" };
            const file3: File = { name: "/folder1/file3.ts" }; // fallback to classic
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, file1, file2, file3);

            const options: ts.CompilerOptions = {
                moduleResolution: ts.ModuleResolutionKind.Classic,
                baseUrl: "/root",
                jsx: ts.JsxEmit.React,
                paths: {
                    "*": [
                        "*",
                        "generated/*",
                    ],
                    "somefolder/*": [
                        "someanotherfolder/*",
                    ],
                    "/rooted/*": [
                        "generated/*",
                    ],
                },
            };
            check("folder1/file1");
            check("folder1/file2");
            check("/rooted/folder1/file2");
            check("folder1/file3");

            function check(name: string) {
                baselines.push(`Resolving "${name}" from ${main.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const result = ts.resolveModuleName(name, main.name, options, host);
                baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                baselines.push("");
            }
        }
    });

    it("node + rootDirs", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("node rootDirs", baselines);

        function test(hasDirectoryExists: boolean) {
            const file1: File = { name: "/root/folder1/file1.ts" };
            const file1_1: File = { name: "/root/folder1/file1_1/index.d.ts" }; // eslint-disable-line @typescript-eslint/naming-convention
            const file2: File = { name: "/root/generated/folder1/file2.ts" };
            const file3: File = { name: "/root/generated/folder2/file3.ts" };
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, file1, file1_1, file2, file3);
            const options: ts.CompilerOptions = {
                moduleResolution: ts.ModuleResolutionKind.Node10,
                rootDirs: [
                    "/root",
                    "/root/generated/",
                ],
            };
            check("./file2", file1);
            check("../folder1/file1", file3);
            check("../folder1/file1_1", file3);

            function check(name: string, container: File) {
                baselines.push(`Resolving "${name}" from ${container.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const result = ts.resolveModuleName(name, container.name, options, host);
                baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                baselines.push("");
            }
        }
    });

    it("classic + rootDirs", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ false);
        runBaseline("classic rootDirs", baselines);

        function test(hasDirectoryExists: boolean) {
            const file1: File = { name: "/root/folder1/file1.ts" };
            const file2: File = { name: "/root/generated/folder1/file2.ts" };
            const file3: File = { name: "/root/generated/folder2/file3.ts" };
            const file4: File = { name: "/folder1/file1_1.ts" };
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, file1, file2, file3, file4);
            const options: ts.CompilerOptions = {
                moduleResolution: ts.ModuleResolutionKind.Classic,
                jsx: ts.JsxEmit.React,
                rootDirs: [
                    "/root",
                    "/root/generated/",
                ],
            };
            check("./file2", file1);
            check("../folder1/file1", file3);
            check("folder1/file1_1", file3);

            function check(name: string, container: File) {
                baselines.push(`Resolving "${name}" from ${container.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
                const result = ts.resolveModuleName(name, container.name, options, host);
                baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
                baselines.push("");
            }
        }
    });

    it("nested node module", () => {
        const baselines: string[] = [];
        test(/*hasDirectoryExists*/ true);
        test(/*hasDirectoryExists*/ false);
        runBaseline("nested node module", baselines);

        function test(hasDirectoryExists: boolean) {
            const app: File = { name: "/root/src/app.ts" };
            const libsPackage: File = { name: "/root/src/libs/guid/package.json", content: jsonToReadableText({ typings: "dist/guid.d.ts" }) };
            const libsTypings: File = { name: "/root/src/libs/guid/dist/guid.d.ts" };
            const host = createModuleResolutionHost(baselines, hasDirectoryExists, app, libsPackage, libsTypings);
            const options: ts.CompilerOptions = {
                moduleResolution: ts.ModuleResolutionKind.Node10,
                baseUrl: "/root",
                paths: {
                    "libs/guid": ["src/libs/guid"],
                },
            };
            baselines.push(`Resolving "libs/guid" from ${app.name}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
            const result = ts.resolveModuleName("libs/guid", app.name, options, host);
            baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
            baselines.push("");
        }
    });
});

describe("unittests:: moduleResolution:: ModuleResolutionHost.directoryExists", () => {
    it("No 'fileExists' calls if containing directory is missing", () => {
        const host: ts.ModuleResolutionHost = {
            readFile: ts.notImplemented,
            fileExists: ts.notImplemented,
            directoryExists: _ => false,
        };

        const result = ts.resolveModuleName("someName", "/a/b/c/d", { moduleResolution: ts.ModuleResolutionKind.Node10 }, host);
        assert(!result.resolvedModule);
    });
});

describe("unittests:: moduleResolution:: Type reference directive resolution: ", () => {
    function testWorker(baselines: string[], hasDirectoryExists: boolean, typesRoot: string | undefined, typeDirective: string, initialFile: File, targetFile: File, ...otherFiles: File[]) {
        const host = createModuleResolutionHost(baselines, hasDirectoryExists, ...[initialFile, targetFile].concat(...otherFiles));
        baselines.push(`Resolving "${typeDirective}" from ${initialFile.name} typesRoots: ${typesRoot ? `[${typesRoot}]` : undefined}${hasDirectoryExists ? "" : " with host that doesnt have directoryExists"}`);
        const result = ts.resolveTypeReferenceDirective(typeDirective, initialFile.name, typesRoot ? { typeRoots: [typesRoot] } : {}, host);
        baselines.push(`Resolution:: ${jsonToReadableText(result)}`);
        baselines.push("");
    }

    function test(baselines: string[], typesRoot: string, typeDirective: string, initialFile: File, targetFile: File, ...otherFiles: File[]) {
        testWorker(baselines, /*hasDirectoryExists*/ false, typesRoot, typeDirective, initialFile, targetFile, ...otherFiles);
    }

    it("Can be resolved from primary location", () => {
        const baselines: string[] = [];
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/src/types/lib/index.d.ts" };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/src/types/lib/typings/lib.d.ts" };
            const packageFile = { name: "/root/src/types/lib/package.json", content: jsonToReadableText({ types: "typings/lib.d.ts" }) };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2, packageFile);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/src/node_modules/lib/index.d.ts" };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/src/node_modules/lib/typings/lib.d.ts" };
            const packageFile = { name: "/root/src/node_modules/lib/package.json", content: jsonToReadableText({ types: "typings/lib.d.ts" }) };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2, packageFile);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/src/node_modules/@types/lib/index.d.ts" };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/src/node_modules/@types/lib/typings/lib.d.ts" };
            const packageFile = { name: "/root/src/node_modules/@types/lib/package.json", content: jsonToReadableText({ types: "typings/lib.d.ts" }) };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2, packageFile);
        }
        runBaseline("type reference from primary location", baselines);
    });
    it("Can be resolved from secondary location", () => {
        const baselines: string[] = [];
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/node_modules/lib.d.ts" };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/node_modules/lib/index.d.ts" };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/node_modules/lib/typings/lib.d.ts" };
            const packageFile = { name: "/root/node_modules/lib/package.json", content: jsonToReadableText({ typings: "typings/lib.d.ts" }) };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2, packageFile);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/node_modules/@types/lib/index.d.ts" };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2);
        }
        {
            const f1 = { name: "/root/src/app.ts" };
            const f2 = { name: "/root/node_modules/@types/lib/typings/lib.d.ts" };
            const packageFile = { name: "/root/node_modules/@types/lib/package.json", content: jsonToReadableText({ typings: "typings/lib.d.ts" }) };
            test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2, packageFile);
        }
        runBaseline("type reference from secondary location", baselines);
    });
    it("Primary resolution overrides secondary resolutions", () => {
        const baselines: string[] = [];
        const f1 = { name: "/root/src/a/b/c/app.ts" };
        const f2 = { name: "/root/src/types/lib/index.d.ts" };
        const f3 = { name: "/root/src/a/b/node_modules/lib.d.ts" };
        test(baselines, /*typesRoot*/ "/root/src/types", /* typeDirective */ "lib", f1, f2, f3);
        runBaseline("type reference overrides secondary location", baselines);
    });
    it("Reused program keeps errors", () => {
        const baselines: string[] = [];
        const f1 = { name: "/root/src/a/b/c/d/e/app.ts", content: `/// <reference types="lib"/>` };
        const f2 = { name: "/root/src/a/b/c/d/node_modules/lib/index.d.ts", content: `declare var x: number;` };
        const f3 = { name: "/root/src/a/b/c/d/f/g/app.ts", content: `/// <reference types="lib"/>` };
        const f4 = { name: "/root/src/a/b/c/d/f/node_modules/lib/index.d.ts", content: `declare var x: number;` };
        const files = [f1, f2, f3, f4];
        files.forEach(file => baselines.push(`//// [${file.name}]\n${file.content || ""}`, ""));

        const names = ts.map(files, f => f.name);
        const sourceFiles = ts.arrayToMap(ts.map(files, f => ts.createSourceFile(f.name, f.content, ts.ScriptTarget.ES2015)), f => f.fileName);
        const compilerHost: ts.CompilerHost = {
            fileExists: fileName => sourceFiles.has(fileName),
            getSourceFile: fileName => sourceFiles.get(fileName),
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: ts.notImplemented,
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
        const program1 = ts.createProgram(names, {}, compilerHost);
        baselines.push("", "Program1 Options Diagnostics::");
        baselines.push(ts.formatDiagnostics(program1.getOptionsDiagnostics(), compilerHost), "");

        const program2 = ts.createProgram(names, {}, compilerHost, program1);
        baselines.push(`Program Reused:: ${(ts as any).StructureIsReused[program2.structureIsReused]}`);
        baselines.push("", "Program2 Options Diagnostics::");
        baselines.push(ts.formatDiagnostics(program2.getOptionsDiagnostics(), compilerHost), "");
        runBaseline("reused program keeps errors", baselines);
    });

    it("Modules in the same .d.ts file are preferred to external files", () => {
        const f = {
            name: "/a/b/c/c/app.d.ts",
            content: `
                declare module "fs" {
                    export interface Stat { id: number }
                }
                declare module "fs-client" {
                    import { Stat } from "fs";
                    export function foo(): Stat;
                }`,
        };
        const file = ts.createSourceFile(f.name, f.content, ts.ScriptTarget.ES2015);
        const compilerHost: ts.CompilerHost = {
            fileExists: fileName => fileName === file.fileName,
            getSourceFile: fileName => fileName === file.fileName ? file : undefined,
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: ts.notImplemented,
            getCurrentDirectory: () => "/",
            getDirectories: () => [],
            getCanonicalFileName: f => f.toLowerCase(),
            getNewLine: () => "\r\n",
            useCaseSensitiveFileNames: () => false,
            readFile: fileName => fileName === file.fileName ? file.text : undefined,
            resolveModuleNames: ts.notImplemented,
        };
        ts.createProgram([f.name], {}, compilerHost);
    });

    it("Modules in .ts file are not checked in the same file", () => {
        const f = {
            name: "/a/b/c/c/app.ts",
            content: `
                declare module "fs" {
                    export interface Stat { id: number }
                }
                declare module "fs-client" {
                    import { Stat } from "fs";
                    export function foo(): Stat;
                }`,
        };
        const file = ts.createSourceFile(f.name, f.content, ts.ScriptTarget.ES2015);
        const compilerHost: ts.CompilerHost = {
            fileExists: fileName => fileName === file.fileName,
            getSourceFile: fileName => fileName === file.fileName ? file : undefined,
            getDefaultLibFileName: () => "lib.d.ts",
            writeFile: ts.notImplemented,
            getCurrentDirectory: () => "/",
            getDirectories: () => [],
            getCanonicalFileName: f => f.toLowerCase(),
            getNewLine: () => "\r\n",
            useCaseSensitiveFileNames: () => false,
            readFile: fileName => fileName === file.fileName ? file.text : undefined,
            resolveModuleNames(moduleNames: string[], _containingFile: string) {
                assert.deepEqual(moduleNames, ["fs"]);
                return [undefined!]; // TODO: GH#18217
            },
        };
        ts.createProgram([f.name], {}, compilerHost);
    });
    it("can be resolved when typeReferenceDirective is relative and in a sibling folder", () => {
        const baselines: string[] = [];
        const initialFile = { name: "/root/src/background/app.ts" };
        const targetFile = { name: "/root/src/typedefs/filesystem.d.ts" };
        testWorker(baselines, /*hasDirectoryExists*/ true, /*typesRoot*/ undefined, /*typeDirective*/ "../typedefs/filesystem", initialFile, targetFile);
        testWorker(baselines, /*hasDirectoryExists*/ false, /*typesRoot*/ undefined, /*typeDirective*/ "../typedefs/filesystem", initialFile, targetFile);
        runBaseline("typeReferenceDirective is relative and in a sibling folder", baselines);
    });
});
