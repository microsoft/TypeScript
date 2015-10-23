/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    interface File {
        name: string;
        content: string;
    }

    function createDefaultServerHost(fileMap: Map<File>): server.ServerHost  {
        return {
            args: <string[]>[],
            newLine: "\r\n",
            useCaseSensitiveFileNames: false,
            write: (s: string) => {
            },
            readFile: (path: string, encoding?: string): string => {
                return hasProperty(fileMap, path) && fileMap[path].content;
            },
            writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => {
                throw new Error("NYI");
            },
            resolvePath: (path: string): string => {
                throw new Error("NYI");
            },
            fileExists: (path: string): boolean => {
                return hasProperty(fileMap, path);
            },
            directoryExists: (path: string): boolean => {
                throw new Error("NYI");
            },
            createDirectory: (path: string) => {
            },
            getExecutingFilePath: (): string => {
                return "";
            },
            getCurrentDirectory: (): string => {
                return "";
            },
            readDirectory: (path: string, extension?: string, exclude?: string[]): string[] => {
                throw new Error("NYI");
            },
            exit: (exitCode?: number) => {
            },
            watchFile: (path, callback) => {
                return {
                    close: () => { }
                }
            },
            watchDirectory: (path, callback, recursive?) => {
                return {
                    close: () => { }
                }
            }
        };
    }

    function createProject(rootFile: string, serverHost: server.ServerHost): { project: server.Project, rootScriptInfo: server.ScriptInfo } {
        let logger: server.Logger = {
            close() { },
            isVerbose: () => false,
            loggingEnabled: () => false,
            perftrc: (s: string) => { },
            info: (s: string) => { },
            startGroup: () => { },
            endGroup: () => { },
            msg: (s: string, type?: string) => { }
        };

        let projectService = new server.ProjectService(serverHost, logger);
        let rootScriptInfo = projectService.openFile(rootFile, /* openedByClient */true);
        let project = projectService.createInferredProject(rootScriptInfo);
        project.setProjectOptions( {files: [rootScriptInfo.fileName], compilerOptions: {module: ts.ModuleKind.AMD} } ); 
        return { 
            project,
            rootScriptInfo
        };
    }

    describe("Caching in LSHost", () => {
        it("works using legacy resolution logic", () => {
            let root: File = {
                name: "c:/d/f0.ts",
                content: `import {x} from "f1"`
            };

            let imported: File = {
                name: "c:/f1.ts",
                content: `foo()`
            };
            
            let serverHost = createDefaultServerHost({ [root.name]: root, [imported.name]: imported });
            let { project, rootScriptInfo } = createProject(root.name, serverHost);

            // ensure that imported file was found
            let diags = project.compilerService.languageService.getSemanticDiagnostics(imported.name);
            assert.equal(diags.length, 1);
            
            let originalFileExists = serverHost.fileExists;
            {
                // patch fileExists to make sure that disk is not touched
                serverHost.fileExists = (fileName): boolean => {
                    assert.isTrue(false, "fileExists should not be called"); 
                    return false;
                };
                
                let newContent = `import {x} from "f1"
                var x: string = 1;`;
                rootScriptInfo.editContent(0, rootScriptInfo.content.length, newContent);
                // trigger synchronization to make sure that import will be fetched from the cache
                diags = project.compilerService.languageService.getSemanticDiagnostics(imported.name);
                // ensure file has correct number of errors after edit
                assert.equal(diags.length, 1);
            }
            {
                let fileExistsIsCalled = false;
                serverHost.fileExists = (fileName): boolean => {
                    if (fileName === "lib.d.ts") {
                        return false;
                    }
                    fileExistsIsCalled = true;
                    assert.isTrue(fileName.indexOf('/f2.') !== -1);
                    return originalFileExists(fileName);
                };
                let newContent = `import {x} from "f2"`;
                rootScriptInfo.editContent(0, rootScriptInfo.content.length, newContent);
                
                try {
                    // trigger synchronization to make sure that LSHost will try to find 'f2' module on disk
                    project.compilerService.languageService.getSemanticDiagnostics(imported.name);
                    assert.isTrue(false, `should not find file '${imported.name}'`)
                }
                catch(e) {
                    assert.isTrue(e.message.indexOf(`Could not find file: '${imported.name}'.`) === 0);
                }
                
                assert.isTrue(fileExistsIsCalled);
            }
            {
                let fileExistsCalled = false;
                serverHost.fileExists = (fileName): boolean => {
                    if (fileName === "lib.d.ts") {
                        return false;
                    }                    
                    fileExistsCalled = true;
                    assert.isTrue(fileName.indexOf('/f1.') !== -1);
                    return originalFileExists(fileName);
                };
                
                let newContent = `import {x} from "f1"`;
                rootScriptInfo.editContent(0, rootScriptInfo.content.length, newContent);
                project.compilerService.languageService.getSemanticDiagnostics(imported.name);
                assert.isTrue(fileExistsCalled);
                
                // setting compiler options discards module resolution cache
                fileExistsCalled = false;
                
                let opts = ts.clone(project.projectOptions);
                opts.compilerOptions = ts.clone(opts.compilerOptions);
                opts.compilerOptions.target = ts.ScriptTarget.ES5;
                project.setProjectOptions(opts);
                
                project.compilerService.languageService.getSemanticDiagnostics(imported.name);
                assert.isTrue(fileExistsCalled);
            }
        });
        
        it("loads missing files from disk", () => {
            let root: File = {
                name: 'c:/foo.ts',
                content: `import {x} from "bar"`
            };
            
            let imported: File = {
                name: 'c:/bar.d.ts',
                content: `export var y = 1`
            };            
            
            let fileMap: Map<File> = { [root.name]: root };
            let serverHost = createDefaultServerHost(fileMap);
            let originalFileExists = serverHost.fileExists;
            
            let fileExistsCalledForBar = false;
            serverHost.fileExists = fileName => {
                if (fileName === "lib.d.ts") {
                    return false;
                }
                if (!fileExistsCalledForBar) {
                    fileExistsCalledForBar = fileName.indexOf("/bar.") !== -1;
                }
                
                return originalFileExists(fileName);
            };
            
            let { project, rootScriptInfo } = createProject(root.name, serverHost);

            let diags = project.compilerService.languageService.getSemanticDiagnostics(root.name);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            assert.isTrue(diags.length === 1, "one diagnostic expected");
            assert.isTrue(typeof diags[0].messageText === "string" && ((<string>diags[0].messageText).indexOf("Cannot find module") === 0), "should be 'cannot find module' message");
            
            // assert that import will success once file appear on disk
            fileMap[imported.name] = imported;
            fileExistsCalledForBar = false;
            rootScriptInfo.editContent(0, rootScriptInfo.content.length, `import {y} from "bar"`)
            
            diags = project.compilerService.languageService.getSemanticDiagnostics(root.name);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            assert.isTrue(diags.length === 0);
        })
    });
}