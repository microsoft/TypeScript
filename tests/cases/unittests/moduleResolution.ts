/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path='..\..\..\src\harness\harness.ts' />

declare namespace chai.assert {
    function deepEqual(actual: any, expected: any): void;
}

module ts {

    interface File {
        name: string
        content?: string 
    }

    function createModuleResolutionHost(...files: File[]): ModuleResolutionHost {
        let map = arrayToMap(files, f => f.name);
        
        return { fileExists, readFile };
        
        function fileExists(path: string): boolean {
            return hasProperty(map, path);
        }
        
        function readFile(path: string): string {
            return hasProperty(map, path) ? map[path].content : undefined;
        }
    }

    function splitPath(path: string): { dir: string; rel: string } {
        let index = path.indexOf(directorySeparator);
        return index === -1 
            ? { dir: path, rel: undefined }
            : { dir: path.substr(0, index), rel: path.substr(index + 1) };
    }

    describe("Node module resolution - relative paths", () => {
        
        function testLoadAsFile(containingFileName: string, moduleFileNameNoExt: string, moduleName: string): void {
            for (let ext of supportedExtensions) {
                let containingFile = { name: containingFileName }
                let moduleFile = { name: moduleFileNameNoExt + ext }
                let resolution = nodeModuleNameResolver(moduleName, containingFile.name, createModuleResolutionHost(containingFile, moduleFile));                
                assert.equal(resolution.resolvedModule.resolvedFileName, moduleFile.name);
                assert.equal(!!resolution.resolvedModule.isExternalLibraryImport, false);

                let failedLookupLocations: string[] = [];
                let dir = getDirectoryPath(containingFileName);
                for (let e of supportedExtensions) {
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
            let containingFile = { name: containingFileName };
            let packageJson = { name: packageJsonFileName, content: JSON.stringify({ "typings": fieldRef }) };
            let moduleFile = { name: moduleFileName };
            let resolution = nodeModuleNameResolver(moduleName, containingFile.name, createModuleResolutionHost(containingFile, packageJson, moduleFile));
            assert.equal(resolution.resolvedModule.resolvedFileName, moduleFile.name);
            assert.equal(!!resolution.resolvedModule.isExternalLibraryImport, false);
            // expect three failed lookup location - attempt to load module as file with all supported extensions
            assert.equal(resolution.failedLookupLocations.length, 5);
        }
        
        it("module name as directory - load from typings", () => {
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/b/c/bar/package.json", "c/d/e.d.ts", "/a/b/c/bar/c/d/e.d.ts", "./bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/bar/package.json", "e.d.ts", "/a/bar/e.d.ts", "../../bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/bar/package.json", "e.d.ts", "/bar/e.d.ts", "/bar");
            testLoadingFromPackageJson("c:/a/b/c/d.ts", "c:/bar/package.json", "e.d.ts", "c:/bar/e.d.ts", "c:/bar");
        });
        
        it ("module name as directory - load index.d.ts", () => {
            let containingFile = {name: "/a/b/c.ts"};
            let packageJson = {name: "/a/b/foo/package.json", content: JSON.stringify({main: "/c/d"})};
            let indexFile = { name: "/a/b/foo/index.d.ts" };
            let resolution = nodeModuleNameResolver("./foo", containingFile.name, createModuleResolutionHost(containingFile, packageJson, indexFile));
            assert.equal(resolution.resolvedModule.resolvedFileName, indexFile.name);
            assert.equal(!!resolution.resolvedModule.isExternalLibraryImport, false);
            assert.deepEqual(resolution.failedLookupLocations, [
                "/a/b/foo.ts",
                "/a/b/foo.tsx",
                "/a/b/foo.d.ts",
                "/a/b/foo.js",
                "/a/b/foo.jsx",
                "/a/b/foo/index.ts",
                "/a/b/foo/index.tsx",
            ]);
        });
    });
    
    describe("Node module resolution - non-relative paths", () => {
        it("load module as file - ts files not loaded", () => {
            let containingFile = { name: "/a/b/c/d/e.ts" };
            let moduleFile = { name: "/a/b/node_modules/foo.ts" };
            let resolution = nodeModuleNameResolver("foo", containingFile.name, createModuleResolutionHost(containingFile, moduleFile));
            assert.equal(resolution.resolvedModule, undefined);
            assert.deepEqual(resolution.failedLookupLocations, [
                "/a/b/c/d/node_modules/foo.d.ts",
                "/a/b/c/d/node_modules/foo/package.json",
                "/a/b/c/d/node_modules/foo/index.d.ts",
                "/a/b/c/node_modules/foo.d.ts",
                "/a/b/c/node_modules/foo/package.json",
                "/a/b/c/node_modules/foo/index.d.ts",
                "/a/b/node_modules/foo.d.ts",
                "/a/b/node_modules/foo/package.json",
                "/a/b/node_modules/foo/index.d.ts",
                "/a/node_modules/foo.d.ts",
                "/a/node_modules/foo/package.json",
                "/a/node_modules/foo/index.d.ts",
                "/node_modules/foo.d.ts",
                "/node_modules/foo/package.json",
                "/node_modules/foo/index.d.ts"
            ])
        });

        it("load module as file", () => {
            let containingFile = { name: "/a/b/c/d/e.ts" };
            let moduleFile = { name: "/a/b/node_modules/foo.d.ts" };
            let resolution = nodeModuleNameResolver("foo", containingFile.name, createModuleResolutionHost(containingFile, moduleFile));
            assert.equal(resolution.resolvedModule.resolvedFileName, moduleFile.name);
            assert.equal(resolution.resolvedModule.isExternalLibraryImport, true);
        });
        
        it("load module as directory", () => {
            let containingFile = { name: "/a/node_modules/b/c/node_modules/d/e.ts" };
            let moduleFile = { name: "/a/node_modules/foo/index.d.ts" };
            let resolution = nodeModuleNameResolver("foo", containingFile.name, createModuleResolutionHost(containingFile, moduleFile));
            assert.equal(resolution.resolvedModule.resolvedFileName, moduleFile.name);
            assert.equal(resolution.resolvedModule.isExternalLibraryImport, true);
            assert.deepEqual(resolution.failedLookupLocations, [
                "/a/node_modules/b/c/node_modules/d/node_modules/foo.d.ts",
                "/a/node_modules/b/c/node_modules/d/node_modules/foo/package.json",
                "/a/node_modules/b/c/node_modules/d/node_modules/foo/index.d.ts",
                "/a/node_modules/b/c/node_modules/foo.d.ts",
                "/a/node_modules/b/c/node_modules/foo/package.json",
                "/a/node_modules/b/c/node_modules/foo/index.d.ts",
                "/a/node_modules/b/node_modules/foo.d.ts",
                "/a/node_modules/b/node_modules/foo/package.json",
                "/a/node_modules/b/node_modules/foo/index.d.ts",
                "/a/node_modules/foo.d.ts",
                "/a/node_modules/foo/package.json"
            ]);
        });
    });
    
    describe("Module resolution - relative imports", () => {
       it("should find all modules", () => {
           const options: CompilerOptions = { module: ModuleKind.CommonJS };
           const files: Map<string> = {
               "/a/b/c/first/shared.ts": `
class A {}
export = A`,
               "/a/b/c/first/second/class_a.ts": `
import Shared = require('../shared');
import C = require('../../third/class_c');
class B {}
export = B;`,
               "/a/b/c/third/class_c.ts":`
import Shared = require('../first/shared');
class C {}
export = C;
                `
           };
           const currentDirectory = "/a/b/c/first/second";
           const host: CompilerHost = {
               getSourceFile: (fileName: string, languageVersion: ScriptTarget) => {
                   let path = normalizePath(combinePaths(currentDirectory, fileName));
                   return hasProperty(files, path) ? createSourceFile(fileName, files[path], languageVersion) : undefined;
               },
                getDefaultLibFileName: () => "lib.d.ts",
                writeFile: (fileName, content): void => { throw new Error("NotImplemented"); },
                getCurrentDirectory: () => currentDirectory,
                getCanonicalFileName: fileName => fileName.toLowerCase(),
                getNewLine: () => "\r\n",
                useCaseSensitiveFileNames: () => false,
                fileExists: fileName => {
                   let path = normalizePath(combinePaths(currentDirectory, fileName));
                   return hasProperty(files, path);
                },
                readFile: (fileName): string => { throw new Error("NotImplemented"); }
           };

           const program = createProgram(["class_a.ts"], options, host);

           assert.equal(program.getSourceFiles().length, 3);
           const syntacticDiagnostics = program.getSyntacticDiagnostics();
           assert.equal(syntacticDiagnostics.length, 0, `expect no syntactic diagnostics, got: ${JSON.stringify(syntacticDiagnostics.map(diagnosticToString))}`);
           const semanticDiagnostics = program.getSemanticDiagnostics();
           assert.equal(semanticDiagnostics.length, 0, `expect no semantic diagnostics, got: ${JSON.stringify(semanticDiagnostics.map(diagnosticToString))}`);

           // try to get file using a relative name
           const fileC = program.getSourceFile("../../../c/third/class_c.ts");
           assert.isTrue(fileC !== undefined, `expected to get file by relative name, got ${fileC}`);
       });
       
        function diagnosticToString(diagnostic: Diagnostic) {
            let output = "";
    
            if (diagnostic.file) {
                let loc = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
    
                output += `${ diagnostic.file.fileName }(${ loc.line + 1 },${ loc.character + 1 }): `;
            }
    
            let category = DiagnosticCategory[diagnostic.category].toLowerCase();
            output += `${ category } TS${ diagnostic.code }: ${ flattenDiagnosticMessageText(diagnostic.messageText, sys.newLine) }${ sys.newLine }`;
    
            return output;
        }
    });
}