namespace ts.projectSystem {
    function getNumberOfWatchesInvokedForRecursiveWatches(recursiveWatchedDirs: string[], file: string) {
        return countWhere(recursiveWatchedDirs, dir => file.length > dir.length && startsWith(file, dir) && file[dir.length] === directorySeparator);
    }

    describe("unittests:: tsserver:: CachingFileSystemInformation:: tsserverProjectSystem CachingFileSystemInformation", () => {
        enum CalledMapsWithSingleArg {
            fileExists = "fileExists",
            directoryExists = "directoryExists",
            getDirectories = "getDirectories",
            readFile = "readFile"
        }
        enum CalledMapsWithFiveArgs {
            readDirectory = "readDirectory"
        }
        type CalledMaps = CalledMapsWithSingleArg | CalledMapsWithFiveArgs;
        type CalledWithFiveArgs = [readonly string[], readonly string[], readonly string[], number];
        function createCallsTrackingHost(host: TestServerHost) {
            const calledMaps: Record<CalledMapsWithSingleArg, MultiMap<string, true>> & Record<CalledMapsWithFiveArgs, MultiMap<string, CalledWithFiveArgs>> = {
                fileExists: setCallsTrackingWithSingleArgFn(CalledMapsWithSingleArg.fileExists),
                directoryExists: setCallsTrackingWithSingleArgFn(CalledMapsWithSingleArg.directoryExists),
                getDirectories: setCallsTrackingWithSingleArgFn(CalledMapsWithSingleArg.getDirectories),
                readFile: setCallsTrackingWithSingleArgFn(CalledMapsWithSingleArg.readFile),
                readDirectory: setCallsTrackingWithFiveArgFn(CalledMapsWithFiveArgs.readDirectory)
            };

            return {
                verifyNoCall,
                verifyCalledOnEachEntryNTimes,
                verifyCalledOnEachEntry,
                verifyNoHostCalls,
                verifyNoHostCallsExceptFileExistsOnce,
                verifyCalledOn,
                clear
            };

            function setCallsTrackingWithSingleArgFn(prop: CalledMapsWithSingleArg) {
                const calledMap = createMultiMap<true>();
                const cb = (<any>host)[prop].bind(host);
                (<any>host)[prop] = (f: string) => {
                    calledMap.add(f, /*value*/ true);
                    return cb(f);
                };
                return calledMap;
            }

            function setCallsTrackingWithFiveArgFn<U, V, W, X>(prop: CalledMapsWithFiveArgs) {
                const calledMap = createMultiMap<[U, V, W, X]>();
                const cb = (<any>host)[prop].bind(host);
                (<any>host)[prop] = (f: string, arg1?: U, arg2?: V, arg3?: W, arg4?: X) => {
                    calledMap.add(f, [arg1!, arg2!, arg3!, arg4!]); // TODO: GH#18217
                    return cb(f, arg1, arg2, arg3, arg4);
                };
                return calledMap;
            }

            function verifyCalledOn(callback: CalledMaps, name: string) {
                const calledMap = calledMaps[callback];
                const result = calledMap.get(name);
                assert.isTrue(result && !!result.length, `${callback} should be called with name: ${name}: ${arrayFrom(calledMap.keys())}`);
            }

            function verifyNoCall(callback: CalledMaps) {
                const calledMap = calledMaps[callback];
                assert.equal(calledMap.size, 0, `${callback} shouldn't be called: ${arrayFrom(calledMap.keys())}`);
            }

            function verifyCalledOnEachEntry(callback: CalledMaps, expectedKeys: Map<string, number>) {
                TestFSWithWatch.checkMap<true | CalledWithFiveArgs>(callback, calledMaps[callback], expectedKeys);
            }

            function verifyCalledOnEachEntryNTimes(callback: CalledMaps, expectedKeys: readonly string[], nTimes: number) {
                TestFSWithWatch.checkMap<true | CalledWithFiveArgs>(callback, calledMaps[callback], expectedKeys, nTimes);
            }

            function verifyNoHostCalls() {
                iterateOnCalledMaps(key => verifyNoCall(key));
            }

            function verifyNoHostCallsExceptFileExistsOnce(expectedKeys: readonly string[]) {
                verifyCalledOnEachEntryNTimes(CalledMapsWithSingleArg.fileExists, expectedKeys, 1);
                verifyNoCall(CalledMapsWithSingleArg.directoryExists);
                verifyNoCall(CalledMapsWithSingleArg.getDirectories);
                verifyNoCall(CalledMapsWithSingleArg.readFile);
                verifyNoCall(CalledMapsWithFiveArgs.readDirectory);
            }

            function clear() {
                iterateOnCalledMaps(key => calledMaps[key].clear());
            }

            function iterateOnCalledMaps(cb: (key: CalledMaps) => void) {
                for (const key in CalledMapsWithSingleArg) {
                    cb(key as CalledMapsWithSingleArg);
                }
                for (const key in CalledMapsWithFiveArgs) {
                    cb(key as CalledMapsWithFiveArgs);
                }
            }
        }

        it("works using legacy resolution logic", () => {
            let rootContent = `import {x} from "f1"`;
            const root: File = {
                path: "/c/d/f0.ts",
                content: rootContent
            };

            const imported: File = {
                path: "/c/f1.ts",
                content: `foo()`
            };

            const host = createServerHost([root, imported]);
            const projectService = createProjectService(host);
            projectService.setCompilerOptionsForInferredProjects({ module: ModuleKind.AMD, noLib: true });
            projectService.openClientFile(root.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const project = projectService.inferredProjects[0];
            const rootScriptInfo = project.getRootScriptInfos()[0];
            assert.equal(rootScriptInfo.fileName, root.path);

            // ensure that imported file was found
            verifyImportedDiagnostics();

            const callsTrackingHost = createCallsTrackingHost(host);

            // trigger synchronization to make sure that import will be fetched from the cache
            // ensure file has correct number of errors after edit
            editContent(`import {x} from "f1";
                 var x: string = 1;`);
            verifyImportedDiagnostics();
            callsTrackingHost.verifyNoHostCalls();

            // trigger synchronization to make sure that the host will try to find 'f2' module on disk
            editContent(`import {x} from "f2"`);
            try {
                // trigger synchronization to make sure that the host will try to find 'f2' module on disk
                verifyImportedDiagnostics();
                assert.isTrue(false, `should not find file '${imported.path}'`);
            }
            catch (e) {
                assert.isTrue(e.message.indexOf(`Could not find source file: '${imported.path}'.`) === 0, `Actual: ${e.message}`);
            }
            const f2Lookups = getLocationsForModuleLookup("f2");
            callsTrackingHost.verifyCalledOnEachEntryNTimes(CalledMapsWithSingleArg.fileExists, f2Lookups, 1);
            const f2DirLookups = getLocationsForDirectoryLookup();
            callsTrackingHost.verifyCalledOnEachEntry(CalledMapsWithSingleArg.directoryExists, f2DirLookups);
            callsTrackingHost.verifyNoCall(CalledMapsWithSingleArg.getDirectories);
            callsTrackingHost.verifyNoCall(CalledMapsWithSingleArg.readFile);
            callsTrackingHost.verifyNoCall(CalledMapsWithFiveArgs.readDirectory);

            editContent(`import {x} from "f1"`);
            verifyImportedDiagnostics();
            const f1Lookups = f2Lookups.map(s => s.replace("f2", "f1"));
            f1Lookups.length = f1Lookups.indexOf(imported.path) + 1;
            const f1DirLookups = ["/c/d", "/c", ...mapCombinedPathsInAncestor(getDirectoryPath(root.path), nodeModulesAtTypes, returnTrue)];
            vertifyF1Lookups();

            // setting compiler options discards module resolution cache
            callsTrackingHost.clear();
            projectService.setCompilerOptionsForInferredProjects({ module: ModuleKind.AMD, noLib: true, target: ScriptTarget.ES5 });
            verifyImportedDiagnostics();
            vertifyF1Lookups();

            function vertifyF1Lookups() {
                callsTrackingHost.verifyCalledOnEachEntryNTimes(CalledMapsWithSingleArg.fileExists, f1Lookups, 1);
                callsTrackingHost.verifyCalledOnEachEntryNTimes(CalledMapsWithSingleArg.directoryExists, f1DirLookups, 1);
                callsTrackingHost.verifyNoCall(CalledMapsWithSingleArg.getDirectories);
                callsTrackingHost.verifyNoCall(CalledMapsWithSingleArg.readFile);
                callsTrackingHost.verifyNoCall(CalledMapsWithFiveArgs.readDirectory);
            }

            function editContent(newContent: string) {
                callsTrackingHost.clear();
                rootScriptInfo.editContent(0, rootContent.length, newContent);
                rootContent = newContent;
            }

            function verifyImportedDiagnostics() {
                const diags = project.getLanguageService().getSemanticDiagnostics(imported.path);
                assert.equal(diags.length, 1);
                const diag = diags[0];
                assert.equal(diag.code, Diagnostics.Cannot_find_name_0.code);
                assert.equal(flattenDiagnosticMessageText(diag.messageText, "\n"), "Cannot find name 'foo'.");
            }

            function getLocationsForModuleLookup(module: string) {
                const locations: string[] = [];
                forEachAncestorDirectory(getDirectoryPath(root.path), ancestor => {
                    locations.push(
                        combinePaths(ancestor, `${module}.ts`),
                        combinePaths(ancestor, `${module}.tsx`),
                        combinePaths(ancestor, `${module}.d.ts`)
                    );
                });
                forEachAncestorDirectory(getDirectoryPath(root.path), ancestor => {
                    locations.push(
                        combinePaths(ancestor, `${module}.js`),
                        combinePaths(ancestor, `${module}.jsx`)
                    );
                });
                return locations;
            }

            function getLocationsForDirectoryLookup() {
                const result = new Map<string, number>();
                forEachAncestorDirectory(getDirectoryPath(root.path), ancestor => {
                    // To resolve modules
                    result.set(ancestor, 2);
                    // for type roots
                    result.set(combinePaths(ancestor, nodeModules), 1);
                    result.set(combinePaths(ancestor, nodeModulesAtTypes), 1);
                });
                return result;
            }
        });

        it("loads missing files from disk", () => {
            const root: File = {
                path: "/c/foo.ts",
                content: `import {y} from "bar"`
            };

            const imported: File = {
                path: "/c/bar.d.ts",
                content: `export var y = 1`
            };

            const host = createServerHost([root]);
            const projectService = createProjectService(host);
            projectService.setCompilerOptionsForInferredProjects({ module: ModuleKind.AMD, noLib: true });
            const callsTrackingHost = createCallsTrackingHost(host);
            projectService.openClientFile(root.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const project = projectService.inferredProjects[0];
            const rootScriptInfo = project.getRootScriptInfos()[0];
            assert.equal(rootScriptInfo.fileName, root.path);

            let diags = project.getLanguageService().getSemanticDiagnostics(root.path);
            assert.equal(diags.length, 1);
            const diag = diags[0];
            assert.equal(diag.code, Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations.code);
            assert.equal(flattenDiagnosticMessageText(diag.messageText, "\n"), "Cannot find module 'bar' or its corresponding type declarations.");
            callsTrackingHost.verifyCalledOn(CalledMapsWithSingleArg.fileExists, imported.path);


            callsTrackingHost.clear();
            host.writeFile(imported.path, imported.content);
            host.runQueuedTimeoutCallbacks();
            diags = project.getLanguageService().getSemanticDiagnostics(root.path);
            assert.equal(diags.length, 0);
            callsTrackingHost.verifyCalledOn(CalledMapsWithSingleArg.fileExists, imported.path);
        });

        it("when calling goto definition of module", () => {
            const clientFile: File = {
                path: "/a/b/controllers/vessels/client.ts",
                content: `
                    import { Vessel } from '~/models/vessel';
                    const v = new Vessel();
                `
            };
            const anotherModuleFile: File = {
                path: "/a/b/utils/db.ts",
                content: "export class Bookshelf { }"
            };
            const moduleFile: File = {
                path: "/a/b/models/vessel.ts",
                content: `
                    import { Bookshelf } from '~/utils/db';
                    export class Vessel extends Bookshelf {}
                `
            };
            const tsconfigFile: File = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        target: "es6",
                        module: "es6",
                        baseUrl: "./",  // all paths are relative to the baseUrl
                        paths: {
                            "~/*": ["*"]   // resolve any `~/foo/bar` to `<baseUrl>/foo/bar`
                        }
                    },
                    exclude: [
                        "api",
                        "build",
                        "node_modules",
                        "public",
                        "seeds",
                        "sql_updates",
                        "tests.build"
                    ]
                })
            };
            const projectFiles = [clientFile, anotherModuleFile, moduleFile, tsconfigFile];
            const host = createServerHost(projectFiles);
            const session = createSession(host);
            const projectService = session.getProjectService();
            const { configFileName } = projectService.openClientFile(clientFile.path);

            assert.isDefined(configFileName, `should find config`);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = projectService.configuredProjects.get(tsconfigFile.path)!;
            checkProjectActualFiles(project, map(projectFiles, f => f.path));

            const callsTrackingHost = createCallsTrackingHost(host);

            // Get definitions shouldnt make host requests
            const getDefinitionRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(protocol.CommandTypes.Definition, {
                file: clientFile.path,
                position: clientFile.content.indexOf("/vessel") + 1,
                line: undefined!, // TODO: GH#18217
                offset: undefined! // TODO: GH#18217
            });
            const response = session.executeCommand(getDefinitionRequest).response as server.protocol.FileSpan[];
            assert.equal(response[0].file, moduleFile.path, "Should go to definition of vessel: response: " + JSON.stringify(response));
            callsTrackingHost.verifyNoHostCalls();

            // Open the file should call only file exists on module directory and use cached value for parental directory
            const { configFileName: config2 } = projectService.openClientFile(moduleFile.path);
            assert.equal(config2, configFileName);
            callsTrackingHost.verifyNoHostCallsExceptFileExistsOnce(["/a/b/models/tsconfig.json", "/a/b/models/jsconfig.json"]);

            checkNumberOfConfiguredProjects(projectService, 1);
            assert.strictEqual(projectService.configuredProjects.get(tsconfigFile.path), project);
        });

        describe("WatchDirectories for config file with", () => {
            function verifyWatchDirectoriesCaseSensitivity(useCaseSensitiveFileNames: boolean) {
                const frontendDir = "/Users/someuser/work/applications/frontend";
                const toCanonical: (s: string) => Path = useCaseSensitiveFileNames ? s => s as Path : s => s.toLowerCase() as Path;
                const canonicalFrontendDir = toCanonical(frontendDir);
                const file1: File = {
                    path: `${frontendDir}/src/app/utils/Analytic.ts`,
                    content: "export class SomeClass { };"
                };
                const file2: File = {
                    path: `${frontendDir}/src/app/redux/configureStore.ts`,
                    content: "export class configureStore { }"
                };
                const file3: File = {
                    path: `${frontendDir}/src/app/utils/Cookie.ts`,
                    content: "export class Cookie { }"
                };
                const es2016LibFile: File = {
                    path: "/a/lib/lib.es2016.full.d.ts",
                    content: libFile.content
                };
                const typeRoots = ["types", "node_modules/@types"];
                const types = ["node", "jest"];
                const tsconfigFile: File = {
                    path: `${frontendDir}/tsconfig.json`,
                    content: JSON.stringify({
                        compilerOptions: {
                            strict: true,
                            strictNullChecks: true,
                            target: "es2016",
                            module: "commonjs",
                            moduleResolution: "node",
                            sourceMap: true,
                            noEmitOnError: true,
                            experimentalDecorators: true,
                            emitDecoratorMetadata: true,
                            types,
                            noUnusedLocals: true,
                            outDir: "./compiled",
                            typeRoots,
                            baseUrl: ".",
                            paths: {
                                "*": [
                                    "types/*"
                                ]
                            }
                        },
                        include: [
                            "src/**/*"
                        ],
                        exclude: [
                            "node_modules",
                            "compiled"
                        ]
                    })
                };
                const projectFiles = [file1, file2, es2016LibFile, tsconfigFile];
                const host = createServerHost(projectFiles, { useCaseSensitiveFileNames });
                const projectService = createProjectService(host);
                const canonicalConfigPath = toCanonical(tsconfigFile.path);
                const { configFileName } = projectService.openClientFile(file1.path);
                assert.equal(configFileName, tsconfigFile.path as server.NormalizedPath, `should find config`);
                checkNumberOfConfiguredProjects(projectService, 1);
                const watchingRecursiveDirectories = [`${canonicalFrontendDir}/src`, `${canonicalFrontendDir}/types`, `${canonicalFrontendDir}/node_modules`].concat(getNodeModuleDirectories(getDirectoryPath(canonicalFrontendDir)));

                const project = projectService.configuredProjects.get(canonicalConfigPath)!;
                verifyProjectAndWatchedDirectories();

                const callsTrackingHost = createCallsTrackingHost(host);

                // Create file cookie.ts
                projectFiles.push(file3);
                host.writeFile(file3.path, file3.content);
                host.runQueuedTimeoutCallbacks();

                const canonicalFile3Path = useCaseSensitiveFileNames ? file3.path : file3.path.toLocaleLowerCase();
                const numberOfTimesWatchInvoked = getNumberOfWatchesInvokedForRecursiveWatches(watchingRecursiveDirectories, canonicalFile3Path);
                callsTrackingHost.verifyCalledOnEachEntryNTimes(CalledMapsWithSingleArg.fileExists, [canonicalFile3Path], numberOfTimesWatchInvoked);
                callsTrackingHost.verifyCalledOnEachEntryNTimes(CalledMapsWithSingleArg.directoryExists, [canonicalFile3Path], numberOfTimesWatchInvoked);
                callsTrackingHost.verifyNoCall(CalledMapsWithSingleArg.getDirectories);
                callsTrackingHost.verifyCalledOnEachEntryNTimes(CalledMapsWithSingleArg.readFile, [file3.path], 1);
                callsTrackingHost.verifyNoCall(CalledMapsWithFiveArgs.readDirectory);

                checkNumberOfConfiguredProjects(projectService, 1);
                assert.strictEqual(projectService.configuredProjects.get(canonicalConfigPath), project);
                verifyProjectAndWatchedDirectories();

                callsTrackingHost.clear();

                const { configFileName: configFile2 } = projectService.openClientFile(file3.path);
                assert.equal(configFile2, configFileName);

                checkNumberOfConfiguredProjects(projectService, 1);
                assert.strictEqual(projectService.configuredProjects.get(canonicalConfigPath), project);
                verifyProjectAndWatchedDirectories();
                callsTrackingHost.verifyNoHostCalls();

                function getFilePathIfNotOpen(f: File) {
                    const path = toCanonical(f.path);
                    const info = projectService.getScriptInfoForPath(toCanonical(f.path));
                    return info && info.isScriptOpen() ? undefined : path;
                }

                function verifyProjectAndWatchedDirectories() {
                    checkProjectActualFiles(project, map(projectFiles, f => f.path));
                    checkWatchedFiles(host, mapDefined(projectFiles, getFilePathIfNotOpen));
                    checkWatchedDirectories(host, watchingRecursiveDirectories, /*recursive*/ true);
                    checkWatchedDirectories(host, [], /*recursive*/ false);
                }
            }

            it("case insensitive file system", () => {
                verifyWatchDirectoriesCaseSensitivity(/*useCaseSensitiveFileNames*/ false);
            });

            it("case sensitive file system", () => {
                verifyWatchDirectoriesCaseSensitivity(/*useCaseSensitiveFileNames*/ true);
            });
        });

        describe("Subfolder invalidations correctly include parent folder failed lookup locations", () => {
            function runFailedLookupTest(resolution: "Node" | "Classic") {
                const projectLocation = "/proj";
                const file1: File = {
                    path: `${projectLocation}/foo/boo/app.ts`,
                    content: `import * as debug from "debug"`
                };
                const file2: File = {
                    path: `${projectLocation}/foo/boo/moo/app.ts`,
                    content: `import * as debug from "debug"`
                };
                const tsconfig: File = {
                    path: `${projectLocation}/tsconfig.json`,
                    content: JSON.stringify({
                        files: ["foo/boo/app.ts", "foo/boo/moo/app.ts"],
                        moduleResolution: resolution
                    })
                };

                const files = [file1, file2, tsconfig, libFile];
                const host = createServerHost(files);
                const service = createProjectService(host);
                service.openClientFile(file1.path);

                const project = service.configuredProjects.get(tsconfig.path)!;
                checkProjectActualFiles(project, files.map(f => f.path));
                assert.deepEqual(project.getLanguageService().getSemanticDiagnostics(file1.path).map(diag => diag.messageText), ["Cannot find module 'debug' or its corresponding type declarations."]);
                assert.deepEqual(project.getLanguageService().getSemanticDiagnostics(file2.path).map(diag => diag.messageText), ["Cannot find module 'debug' or its corresponding type declarations."]);

                const debugTypesFile: File = {
                    path: `${projectLocation}/node_modules/debug/index.d.ts`,
                    content: "export {}"
                };
                files.push(debugTypesFile);
                host.writeFile(debugTypesFile.path, debugTypesFile.content);
                host.runQueuedTimeoutCallbacks(); // Scheduled invalidation of resolutions
                host.runQueuedTimeoutCallbacks(); // Actual update
                checkProjectActualFiles(project, files.map(f => f.path));
                assert.deepEqual(project.getLanguageService().getSemanticDiagnostics(file1.path).map(diag => diag.messageText), []);
                assert.deepEqual(project.getLanguageService().getSemanticDiagnostics(file2.path).map(diag => diag.messageText), []);
            }

            it("Includes the parent folder FLLs in node module resolution mode", () => {
                runFailedLookupTest("Node");
            });
            it("Includes the parent folder FLLs in classic module resolution mode", () => {
                runFailedLookupTest("Classic");
            });
        });

        describe("Verify npm install in directory with tsconfig file works when", () => {
            function verifyNpmInstall(timeoutDuringPartialInstallation: boolean) {
                const root = "/user/username/rootfolder/otherfolder";
                const getRootedFileOrFolder = (fileOrFolder: File) => {
                    fileOrFolder.path = root + fileOrFolder.path;
                    return fileOrFolder;
                };
                const app: File = getRootedFileOrFolder({
                    path: "/a/b/app.ts",
                    content: "import _ from 'lodash';"
                });
                const tsconfigJson: File = getRootedFileOrFolder({
                    path: "/a/b/tsconfig.json",
                    content: '{ "compilerOptions": { } }'
                });
                const packageJson: File = getRootedFileOrFolder({
                    path: "/a/b/package.json",
                    content: `
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "dependencies": {
    "lodash",
    "rxjs"
  },
  "devDependencies": {
    "@types/lodash",
    "typescript"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
`
                });
                const appFolder = getDirectoryPath(app.path);
                const projectFiles = [app, libFile, tsconfigJson];
                const typeRootDirectories = getTypeRootsFromLocation(getDirectoryPath(tsconfigJson.path));
                const otherFiles = [packageJson];
                const host = createServerHost(projectFiles.concat(otherFiles));
                const projectService = createProjectService(host);
                projectService.setHostConfiguration({ preferences: { includePackageJsonAutoImports: "none" } });
                const { configFileName } = projectService.openClientFile(app.path);
                assert.equal(configFileName, tsconfigJson.path as server.NormalizedPath, `should find config`); // TODO: GH#18217
                const recursiveWatchedDirectories: string[] = [`${appFolder}`, `${appFolder}/node_modules`].concat(getNodeModuleDirectories(getDirectoryPath(appFolder)));
                verifyProject();

                let npmInstallComplete = false;

                // Simulate npm install
                const filesAndFoldersToAdd: File[] = [
                    { path: "/a/b/node_modules" },
                    { path: "/a/b/node_modules/.staging/@types" },
                    { path: "/a/b/node_modules/.staging/lodash-b0733faa" },
                    { path: "/a/b/node_modules/.staging/@types/lodash-e56c4fe7" },
                    { path: "/a/b/node_modules/.staging/symbol-observable-24bcbbff" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61" },
                    { path: "/a/b/node_modules/.staging/typescript-8493ea5d" },
                    { path: "/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json", content: "{\n  \"name\": \"symbol-observable\",\n  \"version\": \"1.0.4\",\n  \"description\": \"Symbol.observable ponyfill\",\n  \"license\": \"MIT\",\n  \"repository\": \"blesh/symbol-observable\",\n  \"author\": {\n    \"name\": \"Ben Lesh\",\n    \"email\": \"ben@benlesh.com\"\n  },\n  \"engines\": {\n    \"node\": \">=0.10.0\"\n  },\n  \"scripts\": {\n    \"test\": \"npm run build && mocha && tsc ./ts-test/test.ts && node ./ts-test/test.js && check-es3-syntax -p lib/ --kill\",\n    \"build\": \"babel es --out-dir lib\",\n    \"prepublish\": \"npm test\"\n  },\n  \"files\": [\n    \"" },
                    { path: "/a/b/node_modules/.staging/lodash-b0733faa/package.json", content: "{\n  \"name\": \"lodash\",\n  \"version\": \"4.17.4\",\n  \"description\": \"Lodash modular utilities.\",\n  \"keywords\": \"modules, stdlib, util\",\n  \"homepage\": \"https://lodash.com/\",\n  \"repository\": \"lodash/lodash\",\n  \"icon\": \"https://lodash.com/icon.svg\",\n  \"license\": \"MIT\",\n  \"main\": \"lodash.js\",\n  \"author\": \"John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)\",\n  \"contributors\": [\n    \"John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)\",\n    \"Mathias Bynens <mathias@qiwi." },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/package.json", content: "{\n  \"name\": \"rxjs\",\n  \"version\": \"5.4.3\",\n  \"description\": \"Reactive Extensions for modern JavaScript\",\n  \"main\": \"Rx.js\",\n  \"config\": {\n    \"commitizen\": {\n      \"path\": \"cz-conventional-changelog\"\n    }\n  },\n  \"lint-staged\": {\n    \"*.@(js)\": [\n      \"eslint --fix\",\n      \"git add\"\n    ],\n    \"*.@(ts)\": [\n      \"eslint -c .eslintrc --ext .ts . --fix\",\n      \"git add\"\n    ]\n  },\n  \"scripts-info\": {\n    \"info\": \"List available script\",\n    \"build_all\": \"Build all packages (ES6, CJS, UMD) and generate packages\",\n    \"build_cjs\": \"Build CJS package with clean up existing build, copy source into dist\",\n    \"build_es6\": \"Build ES6 package with clean up existing build, copy source into dist\",\n    \"build_closure_core\": \"Minify Global core build using closure compiler\",\n    \"build_global\": \"Build Global package, then minify build\",\n    \"build_perf\": \"Build CJS & Global build, run macro performance test\",\n    \"build_test\": \"Build CJS package & test spec, execute mocha test runner\",\n    \"build_cover\": \"Run lint to current code, build CJS & test spec, execute test coverage\",\n    \"build_docs\": \"Build ES6 & global package, create documentation using it\",\n    \"build_spec\": \"Build test specs\",\n    \"check_circular_dependencies\": \"Check codebase has circular dependencies\",\n    \"clean_spec\": \"Clean up existing test spec build output\",\n    \"clean_dist_cjs\": \"Clean up existing CJS package output\",\n    \"clean_dist_es6\": \"Clean up existing ES6 package output\",\n    \"clean_dist_global\": \"Clean up existing Global package output\",\n    \"commit\": \"Run git commit wizard\",\n    \"compile_dist_cjs\": \"Compile codebase into CJS module\",\n    \"compile_module_es6\": \"Compile codebase into ES6\",\n    \"cover\": \"Execute test coverage\",\n    \"lint_perf\": \"Run lint against performance test suite\",\n    \"lint_spec\": \"Run lint against test spec\",\n    \"lint_src\": \"Run lint against source\",\n    \"lint\": \"Run lint against everything\",\n    \"perf\": \"Run macro performance benchmark\",\n    \"perf_micro\": \"Run micro performance benchmark\",\n    \"test_mocha\": \"Execute mocha test runner against existing test spec build\",\n    \"test_browser\": \"Execute mocha test runner on browser against existing test spec build\",\n    \"test\": \"Clean up existing test spec build, build test spec and execute mocha test runner\",\n    \"tests2png\": \"Generate marble diagram image from test spec\",\n    \"watch\": \"Watch codebase, trigger compile when source code changes\"\n  },\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git@github.com:ReactiveX/RxJS.git\"\n  },\n  \"keywords\": [\n    \"Rx\",\n    \"RxJS\",\n    \"ReactiveX\",\n    \"ReactiveExtensions\",\n    \"Streams\",\n    \"Observables\",\n    \"Observable\",\n    \"Stream\",\n    \"ES6\",\n    \"ES2015\"\n  ],\n  \"author\": \"Ben Lesh <ben@benlesh.com>\",\n  \"contributors\": [\n    {\n      \"name\": \"Ben Lesh\",\n      \"email\": \"ben@benlesh.com\"\n    },\n    {\n      \"name\": \"Paul Taylor\",\n      \"email\": \"paul.e.taylor@me.com\"\n    },\n    {\n      \"name\": \"Jeff Cross\",\n      \"email\": \"crossj@google.com\"\n    },\n    {\n      \"name\": \"Matthew Podwysocki\",\n      \"email\": \"matthewp@microsoft.com\"\n    },\n    {\n      \"name\": \"OJ Kwon\",\n      \"email\": \"kwon.ohjoong@gmail.com\"\n    },\n    {\n      \"name\": \"Andre Staltz\",\n      \"email\": \"andre@staltz.com\"\n    }\n  ],\n  \"license\": \"Apache-2.0\",\n  \"bugs\": {\n    \"url\": \"https://github.com/ReactiveX/RxJS/issues\"\n  },\n  \"homepage\": \"https://github.com/ReactiveX/RxJS\",\n  \"devDependencies\": {\n    \"babel-polyfill\": \"^6.23.0\",\n    \"benchmark\": \"^2.1.0\",\n    \"benchpress\": \"2.0.0-beta.1\",\n    \"chai\": \"^3.5.0\",\n    \"color\": \"^0.11.1\",\n    \"colors\": \"1.1.2\",\n    \"commitizen\": \"^2.8.6\",\n    \"coveralls\": \"^2.11.13\",\n    \"cz-conventional-changelog\": \"^1.2.0\",\n    \"danger\": \"^1.1.0\",\n    \"doctoc\": \"^1.0.0\",\n    \"escape-string-regexp\": \"^1.0.5 \",\n    \"esdoc\": \"^0.4.7\",\n    \"eslint\": \"^3.8.0\",\n    \"fs-extra\": \"^2.1.2\",\n    \"get-folder-size\": \"^1.0.0\",\n    \"glob\": \"^7.0.3\",\n    \"gm\": \"^1.22.0\",\n    \"google-closure-compiler-js\": \"^20170218.0.0\",\n    \"gzip-size\": \"^3.0.0\",\n    \"http-server\": \"^0.9.0\",\n    \"husky\": \"^0.13.3\",\n    \"lint-staged\": \"3.2.5\",\n    \"lodash\": \"^4.15.0\",\n    \"madge\": \"^1.4.3\",\n    \"markdown-doctest\": \"^0.9.1\",\n    \"minimist\": \"^1.2.0\",\n    \"mkdirp\": \"^0.5.1\",\n    \"mocha\": \"^3.0.2\",\n    \"mocha-in-sauce\": \"0.0.1\",\n    \"npm-run-all\": \"^4.0.2\",\n    \"npm-scripts-info\": \"^0.3.4\",\n    \"nyc\": \"^10.2.0\",\n    \"opn-cli\": \"^3.1.0\",\n    \"platform\": \"^1.3.1\",\n    \"promise\": \"^7.1.1\",\n    \"protractor\": \"^3.1.1\",\n    \"rollup\": \"0.36.3\",\n    \"rollup-plugin-inject\": \"^2.0.0\",\n    \"rollup-plugin-node-resolve\": \"^2.0.0\",\n    \"rx\": \"latest\",\n    \"rxjs\": \"latest\",\n    \"shx\": \"^0.2.2\",\n    \"sinon\": \"^2.1.0\",\n    \"sinon-chai\": \"^2.9.0\",\n    \"source-map-support\": \"^0.4.0\",\n    \"tslib\": \"^1.5.0\",\n    \"eslint\": \"^4.4.2\",\n    \"typescript\": \"~2.0.6\",\n    \"typings\": \"^2.0.0\",\n    \"validate-commit-msg\": \"^2.14.0\",\n    \"watch\": \"^1.0.1\",\n    \"webpack\": \"^1.13.1\",\n    \"xmlhttprequest\": \"1.8.0\"\n  },\n  \"engines\": {\n    \"npm\": \">=2.0.0\"\n  },\n  \"typings\": \"Rx.d.ts\",\n  \"dependencies\": {\n    \"symbol-observable\": \"^1.0.1\"\n  }\n}" },
                    { path: "/a/b/node_modules/.staging/typescript-8493ea5d/package.json", content: "{\n    \"name\": \"typescript\",\n    \"author\": \"Microsoft Corp.\",\n    \"homepage\": \"http://typescriptlang.org/\",\n    \"version\": \"2.4.2\",\n    \"license\": \"Apache-2.0\",\n    \"description\": \"TypeScript is a language for application scale JavaScript development\",\n    \"keywords\": [\n        \"TypeScript\",\n        \"Microsoft\",\n        \"compiler\",\n        \"language\",\n        \"javascript\"\n    ],\n    \"bugs\": {\n        \"url\": \"https://github.com/Microsoft/TypeScript/issues\"\n    },\n    \"repository\": {\n        \"type\": \"git\",\n        \"url\": \"https://github.com/Microsoft/TypeScript.git\"\n    },\n    \"main\": \"./lib/typescript.js\",\n    \"typings\": \"./lib/typescript.d.ts\",\n    \"bin\": {\n        \"tsc\": \"./bin/tsc\",\n        \"tsserver\": \"./bin/tsserver\"\n    },\n    \"engines\": {\n        \"node\": \">=4.2.0\"\n    },\n    \"devDependencies\": {\n        \"@types/browserify\": \"latest\",\n        \"@types/chai\": \"latest\",\n        \"@types/convert-source-map\": \"latest\",\n        \"@types/del\": \"latest\",\n        \"@types/glob\": \"latest\",\n        \"@types/gulp\": \"latest\",\n        \"@types/gulp-concat\": \"latest\",\n        \"@types/gulp-help\": \"latest\",\n        \"@types/gulp-newer\": \"latest\",\n        \"@types/gulp-sourcemaps\": \"latest\",\n        \"@types/merge2\": \"latest\",\n        \"@types/minimatch\": \"latest\",\n        \"@types/minimist\": \"latest\",\n        \"@types/mkdirp\": \"latest\",\n        \"@types/mocha\": \"latest\",\n        \"@types/node\": \"latest\",\n        \"@types/q\": \"latest\",\n        \"@types/run-sequence\": \"latest\",\n        \"@types/through2\": \"latest\",\n        \"browserify\": \"latest\",\n        \"chai\": \"latest\",\n        \"convert-source-map\": \"latest\",\n        \"del\": \"latest\",\n        \"gulp\": \"latest\",\n        \"gulp-clone\": \"latest\",\n        \"gulp-concat\": \"latest\",\n        \"gulp-help\": \"latest\",\n        \"gulp-insert\": \"latest\",\n        \"gulp-newer\": \"latest\",\n        \"gulp-sourcemaps\": \"latest\",\n        \"gulp-typescript\": \"latest\",\n        \"into-stream\": \"latest\",\n        \"istanbul\": \"latest\",\n        \"jake\": \"latest\",\n        \"merge2\": \"latest\",\n        \"minimist\": \"latest\",\n        \"mkdirp\": \"latest\",\n        \"mocha\": \"latest\",\n        \"mocha-fivemat-progress-reporter\": \"latest\",\n        \"q\": \"latest\",\n        \"run-sequence\": \"latest\",\n        \"sorcery\": \"latest\",\n        \"through2\": \"latest\",\n        \"travis-fold\": \"latest\",\n        \"ts-node\": \"latest\",\n        \"eslint\": \"5.16.0\",\n        \"typescript\": \"^2.4\"\n    },\n    \"scripts\": {\n        \"pretest\": \"jake tests\",\n        \"test\": \"jake runtests-parallel\",\n        \"build\": \"npm run build:compiler && npm run build:tests\",\n        \"build:compiler\": \"jake local\",\n        \"build:tests\": \"jake tests\",\n        \"start\": \"node lib/tsc\",\n        \"clean\": \"jake clean\",\n        \"gulp\": \"gulp\",\n        \"jake\": \"jake\",\n        \"lint\": \"jake lint\",\n        \"setup-hooks\": \"node scripts/link-hooks.js\"\n    },\n    \"browser\": {\n        \"buffer\": false,\n        \"fs\": false,\n        \"os\": false,\n        \"path\": false\n    }\n}" },
                    { path: "/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js", content: "module.exports = require('./lib/index');\n" },
                    { path: "/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts", content: "declare const observableSymbol: symbol;\nexport default observableSymbol;\n" },
                    { path: "/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib" },
                    { path: "/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js", content: "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _ponyfill = require('./ponyfill');\n\nvar _ponyfill2 = _interopRequireDefault(_ponyfill);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nvar root; /* global window */\n\n\nif (typeof self !== 'undefined') {\n  root = self;\n} else if (typeof window !== 'undefined') {\n  root = window;\n} else if (typeof global !== 'undefined') {\n  root = global;\n} else if (typeof module !== 'undefined') {\n  root = module;\n} else {\n  root = Function('return this')();\n}\n\nvar result = (0, _ponyfill2['default'])(root);\nexports['default'] = result;" },
                ].map(getRootedFileOrFolder);
                verifyAfterPartialOrCompleteNpmInstall(2);

                filesAndFoldersToAdd.push(...[
                    { path: "/a/b/node_modules/.staging/typescript-8493ea5d/lib" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/add/operator" },
                    { path: "/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json", content: "{\n    \"name\": \"@types/lodash\",\n    \"version\": \"4.14.74\",\n    \"description\": \"TypeScript definitions for Lo-Dash\",\n    \"license\": \"MIT\",\n    \"contributors\": [\n        {\n            \"name\": \"Brian Zengel\",\n            \"url\": \"https://github.com/bczengel\"\n        },\n        {\n            \"name\": \"Ilya Mochalov\",\n            \"url\": \"https://github.com/chrootsu\"\n        },\n        {\n            \"name\": \"Stepan Mikhaylyuk\",\n            \"url\": \"https://github.com/stepancar\"\n        },\n        {\n            \"name\": \"Eric L Anderson\",\n            \"url\": \"https://github.com/ericanderson\"\n        },\n        {\n            \"name\": \"AJ Richardson\",\n            \"url\": \"https://github.com/aj-r\"\n        },\n        {\n            \"name\": \"Junyoung Clare Jang\",\n            \"url\": \"https://github.com/ailrun\"\n        }\n    ],\n    \"main\": \"\",\n    \"repository\": {\n        \"type\": \"git\",\n        \"url\": \"https://www.github.com/DefinitelyTyped/DefinitelyTyped.git\"\n    },\n    \"scripts\": {},\n    \"dependencies\": {},\n    \"typesPublisherContentHash\": \"12af578ffaf8d86d2df37e591857906a86b983fa9258414326544a0fe6af0de8\",\n    \"typeScriptVersion\": \"2.2\"\n}" },
                    { path: "/a/b/node_modules/.staging/lodash-b0733faa/index.js", content: "module.exports = require('./lodash');" },
                    { path: "/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594", content: "" }
                ].map(getRootedFileOrFolder));
                // Since we added/removed in .staging no timeout
                verifyAfterPartialOrCompleteNpmInstall(0);

                // Remove file "/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594"
                host.deleteFile(last(filesAndFoldersToAdd).path);
                filesAndFoldersToAdd.length--;
                verifyAfterPartialOrCompleteNpmInstall(0);

                filesAndFoldersToAdd.push(...[
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/bundles" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/operator" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom" },
                    { path: "/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts", content: "\n// Stub for lodash\nexport = _;\nexport as namespace _;\ndeclare var _: _.LoDashStatic;\ndeclare namespace _ {\n    interface LoDashStatic {\n        someProp: string;\n    }\n    class SomeClass {\n        someMethod(): void;\n    }\n}" }
                ].map(getRootedFileOrFolder));
                verifyAfterPartialOrCompleteNpmInstall(0);

                filesAndFoldersToAdd.push(...[
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/src/util" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/symbol" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/testing" },
                    { path: "/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041", content: "{\n  \"_args\": [\n    [\n      {\n        \"raw\": \"rxjs@^5.4.2\",\n        \"scope\": null,\n        \"escapedName\": \"rxjs\",\n        \"name\": \"rxjs\",\n        \"rawSpec\": \"^5.4.2\",\n        \"spec\": \">=5.4.2 <6.0.0\",\n        \"type\": \"range\"\n      },\n      \"C:\\\\Users\\\\shkamat\\\\Desktop\\\\app\"\n    ]\n  ],\n  \"_from\": \"rxjs@>=5.4.2 <6.0.0\",\n  \"_id\": \"rxjs@5.4.3\",\n  \"_inCache\": true,\n  \"_location\": \"/rxjs\",\n  \"_nodeVersion\": \"7.7.2\",\n  \"_npmOperationalInternal\": {\n    \"host\": \"s3://npm-registry-packages\",\n    \"tmp\": \"tmp/rxjs-5.4.3.tgz_1502407898166_0.6800217325799167\"\n  },\n  \"_npmUser\": {\n    \"name\": \"blesh\",\n    \"email\": \"ben@benlesh.com\"\n  },\n  \"_npmVersion\": \"5.3.0\",\n  \"_phantomChildren\": {},\n  \"_requested\": {\n    \"raw\": \"rxjs@^5.4.2\",\n    \"scope\": null,\n    \"escapedName\": \"rxjs\",\n    \"name\": \"rxjs\",\n    \"rawSpec\": \"^5.4.2\",\n    \"spec\": \">=5.4.2 <6.0.0\",\n    \"type\": \"range\"\n  },\n  \"_requiredBy\": [\n    \"/\"\n  ],\n  \"_resolved\": \"https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz\",\n  \"_shasum\": \"0758cddee6033d68e0fd53676f0f3596ce3d483f\",\n  \"_shrinkwrap\": null,\n  \"_spec\": \"rxjs@^5.4.2\",\n  \"_where\": \"C:\\\\Users\\\\shkamat\\\\Desktop\\\\app\",\n  \"author\": {\n    \"name\": \"Ben Lesh\",\n    \"email\": \"ben@benlesh.com\"\n  },\n  \"bugs\": {\n    \"url\": \"https://github.com/ReactiveX/RxJS/issues\"\n  },\n  \"config\": {\n    \"commitizen\": {\n      \"path\": \"cz-conventional-changelog\"\n    }\n  },\n  \"contributors\": [\n    {\n      \"name\": \"Ben Lesh\",\n      \"email\": \"ben@benlesh.com\"\n    },\n    {\n      \"name\": \"Paul Taylor\",\n      \"email\": \"paul.e.taylor@me.com\"\n    },\n    {\n      \"name\": \"Jeff Cross\",\n      \"email\": \"crossj@google.com\"\n    },\n    {\n      \"name\": \"Matthew Podwysocki\",\n      \"email\": \"matthewp@microsoft.com\"\n    },\n    {\n      \"name\": \"OJ Kwon\",\n      \"email\": \"kwon.ohjoong@gmail.com\"\n    },\n    {\n      \"name\": \"Andre Staltz\",\n      \"email\": \"andre@staltz.com\"\n    }\n  ],\n  \"dependencies\": {\n    \"symbol-observable\": \"^1.0.1\"\n  },\n  \"description\": \"Reactive Extensions for modern JavaScript\",\n  \"devDependencies\": {\n    \"babel-polyfill\": \"^6.23.0\",\n    \"benchmark\": \"^2.1.0\",\n    \"benchpress\": \"2.0.0-beta.1\",\n    \"chai\": \"^3.5.0\",\n    \"color\": \"^0.11.1\",\n    \"colors\": \"1.1.2\",\n    \"commitizen\": \"^2.8.6\",\n    \"coveralls\": \"^2.11.13\",\n    \"cz-conventional-changelog\": \"^1.2.0\",\n    \"danger\": \"^1.1.0\",\n    \"doctoc\": \"^1.0.0\",\n    \"escape-string-regexp\": \"^1.0.5 \",\n    \"esdoc\": \"^0.4.7\",\n    \"eslint\": \"^3.8.0\",\n    \"fs-extra\": \"^2.1.2\",\n    \"get-folder-size\": \"^1.0.0\",\n    \"glob\": \"^7.0.3\",\n    \"gm\": \"^1.22.0\",\n    \"google-closure-compiler-js\": \"^20170218.0.0\",\n    \"gzip-size\": \"^3.0.0\",\n    \"http-server\": \"^0.9.0\",\n    \"husky\": \"^0.13.3\",\n    \"lint-staged\": \"3.2.5\",\n    \"lodash\": \"^4.15.0\",\n    \"madge\": \"^1.4.3\",\n    \"markdown-doctest\": \"^0.9.1\",\n    \"minimist\": \"^1.2.0\",\n    \"mkdirp\": \"^0.5.1\",\n    \"mocha\": \"^3.0.2\",\n    \"mocha-in-sauce\": \"0.0.1\",\n    \"npm-run-all\": \"^4.0.2\",\n    \"npm-scripts-info\": \"^0.3.4\",\n    \"nyc\": \"^10.2.0\",\n    \"opn-cli\": \"^3.1.0\",\n    \"platform\": \"^1.3.1\",\n    \"promise\": \"^7.1.1\",\n    \"protractor\": \"^3.1.1\",\n    \"rollup\": \"0.36.3\",\n    \"rollup-plugin-inject\": \"^2.0.0\",\n    \"rollup-plugin-node-resolve\": \"^2.0.0\",\n    \"rx\": \"latest\",\n    \"rxjs\": \"latest\",\n    \"shx\": \"^0.2.2\",\n    \"sinon\": \"^2.1.0\",\n    \"sinon-chai\": \"^2.9.0\",\n    \"source-map-support\": \"^0.4.0\",\n    \"tslib\": \"^1.5.0\",\n    \"eslint\": \"^5.16.0\",\n    \"typescript\": \"~2.0.6\",\n    \"typings\": \"^2.0.0\",\n    \"validate-commit-msg\": \"^2.14.0\",\n    \"watch\": \"^1.0.1\",\n    \"webpack\": \"^1.13.1\",\n    \"xmlhttprequest\": \"1.8.0\"\n  },\n  \"directories\": {},\n  \"dist\": {\n    \"integrity\": \"sha512-fSNi+y+P9ss+EZuV0GcIIqPUK07DEaMRUtLJvdcvMyFjc9dizuDjere+A4V7JrLGnm9iCc+nagV/4QdMTkqC4A==\",\n    \"shasum\": \"0758cddee6033d68e0fd53676f0f3596ce3d483f\",\n    \"tarball\": \"https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz\"\n  },\n  \"engines\": {\n    \"npm\": \">=2.0.0\"\n  },\n  \"homepage\": \"https://github.com/ReactiveX/RxJS\",\n  \"keywords\": [\n    \"Rx\",\n    \"RxJS\",\n    \"ReactiveX\",\n    \"ReactiveExtensions\",\n    \"Streams\",\n    \"Observables\",\n    \"Observable\",\n    \"Stream\",\n    \"ES6\",\n    \"ES2015\"\n  ],\n  \"license\": \"Apache-2.0\",\n  \"lint-staged\": {\n    \"*.@(js)\": [\n      \"eslint --fix\",\n      \"git add\"\n    ],\n    \"*.@(ts)\": [\n      \"eslint -c .eslintrc --ext .ts . --fix\",\n      \"git add\"\n    ]\n  },\n  \"main\": \"Rx.js\",\n  \"maintainers\": [\n    {\n      \"name\": \"blesh\",\n      \"email\": \"ben@benlesh.com\"\n    }\n  ],\n  \"name\": \"rxjs\",\n  \"optionalDependencies\": {},\n  \"readme\": \"ERROR: No README data found!\",\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git+ssh://git@github.com/ReactiveX/RxJS.git\"\n  },\n  \"scripts-info\": {\n    \"info\": \"List available script\",\n    \"build_all\": \"Build all packages (ES6, CJS, UMD) and generate packages\",\n    \"build_cjs\": \"Build CJS package with clean up existing build, copy source into dist\",\n    \"build_es6\": \"Build ES6 package with clean up existing build, copy source into dist\",\n    \"build_closure_core\": \"Minify Global core build using closure compiler\",\n    \"build_global\": \"Build Global package, then minify build\",\n    \"build_perf\": \"Build CJS & Global build, run macro performance test\",\n    \"build_test\": \"Build CJS package & test spec, execute mocha test runner\",\n    \"build_cover\": \"Run lint to current code, build CJS & test spec, execute test coverage\",\n    \"build_docs\": \"Build ES6 & global package, create documentation using it\",\n    \"build_spec\": \"Build test specs\",\n    \"check_circular_dependencies\": \"Check codebase has circular dependencies\",\n    \"clean_spec\": \"Clean up existing test spec build output\",\n    \"clean_dist_cjs\": \"Clean up existing CJS package output\",\n    \"clean_dist_es6\": \"Clean up existing ES6 package output\",\n    \"clean_dist_global\": \"Clean up existing Global package output\",\n    \"commit\": \"Run git commit wizard\",\n    \"compile_dist_cjs\": \"Compile codebase into CJS module\",\n    \"compile_module_es6\": \"Compile codebase into ES6\",\n    \"cover\": \"Execute test coverage\",\n    \"lint_perf\": \"Run lint against performance test suite\",\n    \"lint_spec\": \"Run lint against test spec\",\n    \"lint_src\": \"Run lint against source\",\n    \"lint\": \"Run lint against everything\",\n    \"perf\": \"Run macro performance benchmark\",\n    \"perf_micro\": \"Run micro performance benchmark\",\n    \"test_mocha\": \"Execute mocha test runner against existing test spec build\",\n    \"test_browser\": \"Execute mocha test runner on browser against existing test spec build\",\n    \"test\": \"Clean up existing test spec build, build test spec and execute mocha test runner\",\n    \"tests2png\": \"Generate marble diagram image from test spec\",\n    \"watch\": \"Watch codebase, trigger compile when source code changes\"\n  },\n  \"typings\": \"Rx.d.ts\",\n  \"version\": \"5.4.3\"\n}\n" }
                ].map(getRootedFileOrFolder));
                verifyAfterPartialOrCompleteNpmInstall(0);

                // remove /a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
                host.deleteFile(last(filesAndFoldersToAdd).path);
                filesAndFoldersToAdd.length--;
                // and add few more folders/files
                filesAndFoldersToAdd.push(...[
                    { path: "/a/b/node_modules/symbol-observable" },
                    { path: "/a/b/node_modules/@types" },
                    { path: "/a/b/node_modules/@types/lodash" },
                    { path: "/a/b/node_modules/lodash" },
                    { path: "/a/b/node_modules/rxjs" },
                    { path: "/a/b/node_modules/typescript" },
                    { path: "/a/b/node_modules/.bin" }
                ].map(getRootedFileOrFolder));
                // From the type root update
                verifyAfterPartialOrCompleteNpmInstall(2);

                forEach(filesAndFoldersToAdd, f => {
                    f.path = f.path
                        .replace("/a/b/node_modules/.staging", "/a/b/node_modules")
                        .replace(/[\-\.][\d\w][\d\w][\d\w][\d\w][\d\w][\d\w][\d\w][\d\w]/g, "");
                });

                host.deleteFolder(root + "/a/b/node_modules/.staging", /*recursive*/ true);
                const lodashIndexPath = root + "/a/b/node_modules/@types/lodash/index.d.ts";
                projectFiles.push(find(filesAndFoldersToAdd, f => f.path === lodashIndexPath)!);
                // we would now not have failed lookup in the parent of appFolder since lodash is available
                recursiveWatchedDirectories.length = 2;
                // npm installation complete, timeout after reload fs
                npmInstallComplete = true;
                verifyAfterPartialOrCompleteNpmInstall(2);

                function verifyAfterPartialOrCompleteNpmInstall(timeoutQueueLengthWhenRunningTimeouts: number) {
                    filesAndFoldersToAdd.forEach(f => host.ensureFileOrFolder(f));
                    if (npmInstallComplete || timeoutDuringPartialInstallation) {
                        if (timeoutQueueLengthWhenRunningTimeouts) {
                            // Expected project update
                            host.checkTimeoutQueueLengthAndRun(timeoutQueueLengthWhenRunningTimeouts + 1); // Scheduled invalidation of resolutions
                            host.runQueuedTimeoutCallbacks(); // Actual update
                        }
                        else {
                            host.checkTimeoutQueueLengthAndRun(timeoutQueueLengthWhenRunningTimeouts);
                        }
                    }
                    else {
                        host.checkTimeoutQueueLength(3);
                    }
                    verifyProject();
                }

                function verifyProject() {
                    checkNumberOfConfiguredProjects(projectService, 1);

                    const project = projectService.configuredProjects.get(tsconfigJson.path)!;
                    const projectFilePaths = map(projectFiles, f => f.path);
                    checkProjectActualFiles(project, projectFilePaths);

                    const filesWatched = filter(projectFilePaths, p => p !== app.path && p.indexOf("/a/b/node_modules") === -1);
                    checkWatchedFiles(host, filesWatched);
                    checkWatchedDirectories(host, typeRootDirectories.concat(recursiveWatchedDirectories), /*recursive*/ true);
                    checkWatchedDirectories(host, [], /*recursive*/ false);
                }
            }

            it("timeouts occur inbetween installation", () => {
                verifyNpmInstall(/*timeoutDuringPartialInstallation*/ true);
            });

            it("timeout occurs after installation", () => {
                verifyNpmInstall(/*timeoutDuringPartialInstallation*/ false);
            });
        });

        it("when node_modules dont receive event for the @types file addition", () => {
            const projectLocation = "/user/username/folder/myproject";
            const app: File = {
                path: `${projectLocation}/app.ts`,
                content: `import * as debug from "debug"`
            };
            const tsconfig: File = {
                path: `${projectLocation}/tsconfig.json`,
                content: ""
            };

            const files = [app, tsconfig, libFile];
            const host = createServerHost(files);
            const service = createProjectService(host);
            service.openClientFile(app.path);

            const project = service.configuredProjects.get(tsconfig.path)!;
            checkProjectActualFiles(project, files.map(f => f.path));
            assert.deepEqual(project.getLanguageService().getSemanticDiagnostics(app.path).map(diag => diag.messageText), ["Cannot find module 'debug' or its corresponding type declarations."]);

            const debugTypesFile: File = {
                path: `${projectLocation}/node_modules/@types/debug/index.d.ts`,
                content: "export {}"
            };
            files.push(debugTypesFile);
            // Do not invoke recursive directory watcher for anything other than node_module/@types
            const invoker = host.invokeFsWatchesRecursiveCallbacks;
            host.invokeFsWatchesRecursiveCallbacks = (fullPath, eventName, entryFullPath) => {
                if (fullPath.endsWith("@types")) {
                    invoker.call(host, fullPath, eventName, entryFullPath);
                }
            };
            host.writeFile(debugTypesFile.path, debugTypesFile.content);
            host.runQueuedTimeoutCallbacks();
            checkProjectActualFiles(project, files.map(f => f.path));
            assert.deepEqual(project.getLanguageService().getSemanticDiagnostics(app.path).map(diag => diag.messageText), []);
        });
    });
}
