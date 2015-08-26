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
                assert.equal(resolution.resolvedFileName, moduleFile.name);
                
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
            assert.equal(resolution.resolvedFileName, moduleFile.name);
            // expect three failed lookup location - attempt to load module as file with all supported extensions
            assert.equal(resolution.failedLookupLocations.length, 3);
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
            assert.equal(resolution.resolvedFileName, indexFile.name);
            assert.deepEqual(resolution.failedLookupLocations, [
                "/a/b/foo.ts",
                "/a/b/foo.tsx",
                "/a/b/foo.d.ts",
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
            assert.equal(resolution.resolvedFileName, undefined);
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
            assert.equal(resolution.resolvedFileName, moduleFile.name);
        });
        
        it("load module as directory", () => {
            let containingFile = { name: "/a/node_modules/b/c/node_modules/d/e.ts" };
            let moduleFile = { name: "/a/node_modules/foo/index.d.ts" };
            let resolution = nodeModuleNameResolver("foo", containingFile.name, createModuleResolutionHost(containingFile, moduleFile));
            assert.equal(resolution.resolvedFileName, moduleFile.name);
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
    
    describe("BaseUrl mode", () => {

        it ("load module as relative url", () => {
            function test(containingFileName: string, moduleFileName: string, moduleName: string): void {
                let containingFile = {name: containingFileName };
                let moduleFile = { name: moduleFileName };
                let resolution = baseUrlModuleNameResolver(moduleName, containingFile.name, "<some-value>", createModuleResolutionHost(containingFile, moduleFile));
                assert.equal(resolution.resolvedFileName, moduleFile.name);
                let expectedFailedLookupLocations: string[] = [];
                
                let moduleNameHasExt = forEach(supportedExtensions, e => fileExtensionIs(moduleName, e));
                if (!moduleNameHasExt) {
                    let dir = getDirectoryPath(containingFileName);
                    
                    // add candidates with extensions that precede extension of the actual module name file in the list of supportd extensions
                    for (let ext of supportedExtensions) {
                        
                        let hasExtension = ext !== ".ts" 
                            ? fileExtensionIs(moduleFileName, ext) 
                            : fileExtensionIs(moduleFileName, ".ts") && !fileExtensionIs(moduleFileName, ".d.ts");
                             
                        if (hasExtension) {
                            break;
                        }
                        else {
                            expectedFailedLookupLocations.push(normalizePath(combinePaths(dir, moduleName + ext)));
                        }
                    }
                }
                
                assert.deepEqual(resolution.failedLookupLocations, expectedFailedLookupLocations)
            }
            
            test("/a/b/c/d.ts", "/foo.ts", "/foo");
            test("/a/b/c/d.ts", "/foo.d.ts", "/foo");
            test("/a/b/c/d.ts", "/foo.tsx", "/foo");
            
            test("/a/b/c/d.ts", "/a/b/c/foo.ts", "./foo");
            test("/a/b/c/d.ts", "/a/b/c/foo.d.ts", "./foo");
            test("/a/b/c/d.ts", "/a/b/c/foo.tsx", "./foo");

            test("/a/b/c/d.ts", "/a/b/foo.ts", "../foo");
            test("/a/b/c/d.ts", "/a/b/foo.d.ts", "../foo");
            test("/a/b/c/d.ts", "/a/b/foo.tsx", "../foo");
        });
        
        it ("load module using base url", () => {
            function test(containingFileName: string, moduleFileName: string, moduleName: string, baseUrl: string): void {
                let containingFile = { name: containingFileName };
                let moduleFile = { name: moduleFileName };
                let resolution = baseUrlModuleNameResolver(moduleName, containingFileName, baseUrl, createModuleResolutionHost(containingFile, moduleFile));
                assert.equal(resolution.resolvedFileName, moduleFile.name);
            }
            
            test("/a/base/c/d.ts", "/a/base/c/d/e.ts", "c/d/e", "/a/base");
            test("/a/base/c/d.ts", "/a/base/c/d/e.d.ts", "c/d/e", "/a/base");
            test("/a/base/c/d.ts", "/a/base/c/d/e.tsx", "c/d/e", "/a/base");
        });
    });
}