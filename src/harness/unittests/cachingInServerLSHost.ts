/// <reference path="..\harness.ts" />

namespace ts {
    interface File {
        name: string;
        content: string;
    }

    function createDefaultServerHost(fileMap: Map<string, File>): server.ServerHost {
        const existingDirectories = new StringSet();
        forEachKeyInMap(fileMap, name => {
            let dir = getDirectoryPath(name);
            let previous: string;
            do {
                existingDirectories.add(dir);
                previous = dir;
                dir = getDirectoryPath(dir);
            } while (dir !== previous);
        });
        return {
            args: <string[]>[],
            newLine: "\r\n",
            useCaseSensitiveFileNames: false,
            write: (s: string) => {
            },
            readFile: (path: string, encoding?: string): string => {
                const file = fileMap.get(path);
                return file !== undefined ? file.content : undefined;
            },
            writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => {
                throw new Error("NYI");
            },
            resolvePath: (path: string): string => {
                throw new Error("NYI");
            },
            fileExists: (path: string): boolean => {
                return fileMap.has(path);
            },
            directoryExists: (path: string): boolean => {
                return existingDirectories.has(path);
            },
            createDirectory: (path: string) => {
            },
            getExecutingFilePath: (): string => {
                return "";
            },
            getCurrentDirectory: (): string => {
                return "";
            },
            getDirectories: (path: string) => [],
            getEnvironmentVariable: (name: string) => "",
            readDirectory: (path: string, extension?: string[], exclude?: string[], include?: string[]): string[] => {
                throw new Error("NYI");
            },
            exit: (exitCode?: number) => {
            },
            watchFile: (path, callback) => {
                return {
                    close: () => { }
                };
            },
            watchDirectory: (path, callback, recursive?) => {
                return {
                    close: () => { }
                };
            },
            setTimeout,
            clearTimeout,
            setImmediate,
            clearImmediate
        };
    }

    function createProject(rootFile: string, serverHost: server.ServerHost): { project: server.Project, rootScriptInfo: server.ScriptInfo } {
        const logger: server.Logger = {
            close() { },
            hasLevel: () => false,
            loggingEnabled: () => false,
            perftrc: (s: string) => { },
            info: (s: string) => { },
            startGroup: () => { },
            endGroup: () => { },
            msg: (s: string, type?: string) => { },
            getLogFileName: (): string => undefined
        };

        const projectService = new server.ProjectService(serverHost, logger, { isCancellationRequested: () => false }, /*useOneInferredProject*/ false, /*typingsInstaller*/ undefined);
        const rootScriptInfo = projectService.getOrCreateScriptInfo(rootFile, /* openedByClient */true, /*containingProject*/ undefined);
        const project = projectService.createInferredProjectWithRootFileIfNecessary(rootScriptInfo);
        project.setCompilerOptions({ module: ts.ModuleKind.AMD } );
        return {
            project,
            rootScriptInfo
        };
    }

    describe("Caching in LSHost", () => {
        it("works using legacy resolution logic", () => {
            const root: File = {
                name: "c:/d/f0.ts",
                content: `import {x} from "f1"`
            };

            const imported: File = {
                name: "c:/f1.ts",
                content: `foo()`
            };

            const serverHost = createDefaultServerHost(mapOfMapLike({ [root.name]: root, [imported.name]: imported }));
            const { project, rootScriptInfo } = createProject(root.name, serverHost);

            // ensure that imported file was found
            let diags = project.getLanguageService().getSemanticDiagnostics(imported.name);
            assert.equal(diags.length, 1);


            const originalFileExists = serverHost.fileExists;
            {
                // patch fileExists to make sure that disk is not touched
                serverHost.fileExists = (fileName): boolean => {
                    assert.isTrue(false, "fileExists should not be called");
                    return false;
                };

                const newContent = `import {x} from "f1"
                var x: string = 1;`;
                rootScriptInfo.editContent(0, root.content.length, newContent);
                // trigger synchronization to make sure that import will be fetched from the cache
                diags = project.getLanguageService().getSemanticDiagnostics(imported.name);
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
                    assert.isTrue(fileName.indexOf("/f2.") !== -1);
                    return originalFileExists.call(serverHost, fileName);
                };
                const newContent = `import {x} from "f2"`;
                rootScriptInfo.editContent(0, root.content.length, newContent);

                try {
                    // trigger synchronization to make sure that LSHost will try to find 'f2' module on disk
                    project.getLanguageService().getSemanticDiagnostics(imported.name);
                    assert.isTrue(false, `should not find file '${imported.name}'`);
                }
                catch (e) {
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
                    assert.isTrue(fileName.indexOf("/f1.") !== -1);
                    return originalFileExists.call(serverHost, fileName);
                };

                const newContent = `import {x} from "f1"`;
                rootScriptInfo.editContent(0, root.content.length, newContent);
                project.getLanguageService().getSemanticDiagnostics(imported.name);
                assert.isTrue(fileExistsCalled);

                // setting compiler options discards module resolution cache
                fileExistsCalled = false;

                const compilerOptions = ts.clone(project.getCompilerOptions());
                compilerOptions.target = ts.ScriptTarget.ES5;
                project.setCompilerOptions(compilerOptions);

                project.getLanguageService().getSemanticDiagnostics(imported.name);
                assert.isTrue(fileExistsCalled);
            }
        });

        it("loads missing files from disk", () => {
            const root: File = {
                name: `c:/foo.ts`,
                content: `import {x} from "bar"`
            };

            const imported: File = {
                name: `c:/bar.d.ts`,
                content: `export var y = 1`
            };

            const fileMap = mapOfMapLike({ [root.name]: root });
            const serverHost = createDefaultServerHost(fileMap);
            const originalFileExists = serverHost.fileExists;

            let fileExistsCalledForBar = false;
            serverHost.fileExists = fileName => {
                if (fileName === "lib.d.ts") {
                    return false;
                }
                if (!fileExistsCalledForBar) {
                    fileExistsCalledForBar = fileName.indexOf("/bar.") !== -1;
                }

                return originalFileExists.call(serverHost, fileName);
            };

            const { project, rootScriptInfo } = createProject(root.name, serverHost);

            let diags = project.getLanguageService().getSemanticDiagnostics(root.name);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            assert.isTrue(diags.length === 1, "one diagnostic expected");
            assert.isTrue(typeof diags[0].messageText === "string" && ((<string>diags[0].messageText).indexOf("Cannot find module") === 0), "should be 'cannot find module' message");

            // assert that import will success once file appear on disk
            fileMap.set(imported.name, imported);
            fileExistsCalledForBar = false;
            rootScriptInfo.editContent(0, root.content.length, `import {y} from "bar"`);

            diags = project.getLanguageService().getSemanticDiagnostics(root.name);
            assert.isTrue(fileExistsCalledForBar, "'fileExists' should be called");
            assert.isTrue(diags.length === 0);
        });
    });
}