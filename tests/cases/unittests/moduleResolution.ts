/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path='..\..\..\src\harness\harness.ts' />

declare namespace chai.assert {
    function deepEqual(actual: any, expected: any): void;
}

module ts {
   
    interface Directory {
        name: string;
        children: Map<File | Directory>;
    }
    
    interface File {
        name: string
        content?: string 
    }

    function createModuleResolutionHost(...files: File[]): ModuleResolutionHost {
        let root = makeFS(files);
        
        return { fileExists, readFile };
        
        function fileExists(path: string): boolean {
            return findFile(path, root) !== undefined;
        }
        
        function readFile(path: string): string {
            let f = findFile(path, root);
            return f && f.content;
        }
        
        function findFile(path: string, fse: File | Directory): File {
            if (!fse) {
                return undefined;
            }
            
            if (isDirectory(fse)) {
                let {dir, rel} = splitPath(path);
                return findFile(rel, (<Directory>fse).children[dir]);
            }
            else {
                return !path && <File>fse;
            }
        }
        
        function isDirectory(fse: Directory | File): boolean {
            return (<Directory>fse).children !== undefined;
        }
        
        function makeFS(files: File[]): Directory {
            // create root
            let {dir} = splitPath(files[0].name);
            let root: Directory = { name: dir, children: {} };
            
            for(let f of files) {
                addFile(f.name, f.content, root);
            }
            
            function addFile(path: string, content: string, parent: Directory) {
                Debug.assert(parent !== undefined);
                
                let {dir, rel} = splitPath(path);
                if (rel) {
                    let d = parent.children[dir] || (parent.children[dir] = { name: dir, children: {} });
                    Debug.assert(isDirectory(d))
                    addFile(rel, content, <Directory>d);
                }
                else {
                    parent.children[dir] = <File>{ name: dir, content };
                }
            }
            
            return root;
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
            {
                // loading only .d.ts files
                
                let containingFile = { name: containingFileName, content: ""}
                let moduleFile = { name: moduleFileNameNoExt + ".d.ts", content: "var x;"}
                let resolution = nodeModuleNameResolver(moduleName, containingFile.name, createModuleResolutionHost(containingFile, moduleFile));
                
                assert.equal(resolution.resolvedFileName, moduleFile.name);
                assert.isTrue(resolution.failedLookupLocations.length === 0);
            }
            {
                // does not try to load .ts files
                
                let containingFile = { name: containingFileName, content: ""}
                let moduleFile = { name: moduleFileNameNoExt + ".ts", content: "var x;"}
                let resolution = nodeModuleNameResolver(moduleName, containingFile.name, createModuleResolutionHost(containingFile, moduleFile));
                
                assert.equal(resolution.resolvedFileName, undefined);
                assert.equal(resolution.failedLookupLocations.length, 3);
                assert.deepEqual(resolution.failedLookupLocations, [
                    moduleFileNameNoExt + ".d.ts",
                    moduleFileNameNoExt + "/package.json",
                    moduleFileNameNoExt + "/index.d.ts"
                ])
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
        
        function testLoadingFromPackageJson(containingFileName: string, packageJsonFileName: string, fieldName: string, fieldRef: string, moduleFileName: string, moduleName: string): void {
            let containingFile = { name: containingFileName };
            let packageJson = { name: packageJsonFileName, content: JSON.stringify({ [fieldName]: fieldRef }) };
            let moduleFile = { name: moduleFileName };
            let resolution = nodeModuleNameResolver(moduleName, containingFile.name, createModuleResolutionHost(containingFile, packageJson, moduleFile));
            assert.equal(resolution.resolvedFileName, moduleFile.name);
            // expect one failed lookup location - attempt to load module as file
            assert.equal(resolution.failedLookupLocations.length, 1);
        }
        
        it("module name as directory - load from typings", () => {
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/b/c/bar/package.json", "typings", "c/d/e.d.ts", "/a/b/c/bar/c/d/e.d.ts", "./bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/bar/package.json", "typings", "e.d.ts", "/a/bar/e.d.ts", "../../bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/bar/package.json", "typings", "e.d.ts", "/bar/e.d.ts", "/bar");
            testLoadingFromPackageJson("c:/a/b/c/d.ts", "c:/bar/package.json", "typings", "e.d.ts", "c:/bar/e.d.ts", "c:/bar");
        });
        
        it("module name as directory - load from main", () => {
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/b/c/bar/package.json", "main", "c/d/e.d.ts", "/a/b/c/bar/c/d/e.d.ts", "./bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/a/bar/package.json", "main", "e.d.ts", "/a/bar/e.d.ts", "../../bar");
            testLoadingFromPackageJson("/a/b/c/d.ts", "/bar/package.json", "main", "e.d.ts", "/bar/e.d.ts", "/bar");
            testLoadingFromPackageJson("c:/a/b/c/d.ts", "c:/bar/package.json", "main", "e.d.ts", "c:/bar/e.d.ts", "c:/bar");
        });
        
        it ("module name as directory - load index.d.ts", () => {
            let containingFile = {name: "/a/b/c.ts"};
            let packageJson = {name: "/a/b/foo/package.json", content: JSON.stringify({main: "/c/d"})};
            let indexFile = { name: "/a/b/foo/index.d.ts" };
            let resolution = nodeModuleNameResolver("./foo", containingFile.name, createModuleResolutionHost(containingFile, packageJson, indexFile));
            assert.equal(resolution.resolvedFileName, indexFile.name);
            // expect 2 failed lookup locations:
            assert.deepEqual(resolution.failedLookupLocations, [
                "/a/b/foo.d.ts", 
                "/c/d.d.ts"
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