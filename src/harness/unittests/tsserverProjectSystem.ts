/// <reference path="..\harness.ts" />
/// <reference path="..\virtualFileSystemWithWatch.ts" />
/// <reference path="../../server/typingsInstaller/typingsInstaller.ts" />

namespace ts.projectSystem {
    import TI = server.typingsInstaller;
    import protocol = server.protocol;
    import CommandNames = server.CommandNames;

    export import TestServerHost = ts.TestFSWithWatch.TestServerHost;
    export type FileOrFolder = ts.TestFSWithWatch.FileOrFolder;
    export import createServerHost = ts.TestFSWithWatch.createServerHost;
    export import checkFileNames = ts.TestFSWithWatch.checkFileNames;
    export import libFile = ts.TestFSWithWatch.libFile;
    export import checkWatchedFiles = ts.TestFSWithWatch.checkWatchedFiles;
    import checkWatchedDirectories = ts.TestFSWithWatch.checkWatchedDirectories;
    import safeList = ts.TestFSWithWatch.safeList;

    const customSafeList = {
        path: <Path>"/typeMapList.json",
        content: JSON.stringify({
            "quack": {
                "match": "/duckquack-(\\d+)\\.min\\.js",
                "types": ["duck-types"]
            },
        })
    };

    export interface PostExecAction {
        readonly success: boolean;
        readonly callback: TI.RequestCompletedAction;
    }

    export const nullLogger: server.Logger = {
        close: noop,
        hasLevel: () => false,
        loggingEnabled: () => false,
        perftrc: noop,
        info: noop,
        msg: noop,
        startGroup: noop,
        endGroup: noop,
        getLogFileName: (): string => undefined
    };

    export class TestTypingsInstaller extends TI.TypingsInstaller implements server.ITypingsInstaller {
        protected projectService: server.ProjectService;
        constructor(
            readonly globalTypingsCacheLocation: string,
            throttleLimit: number,
            installTypingHost: server.ServerHost,
            readonly typesRegistry = createMap<void>(),
            log?: TI.Log) {
            super(installTypingHost, globalTypingsCacheLocation, safeList.path, throttleLimit, log);
        }

        protected postExecActions: PostExecAction[] = [];

        executePendingCommands() {
            const actionsToRun = this.postExecActions;
            this.postExecActions = [];
            for (const action of actionsToRun) {
                action.callback(action.success);
            }
        }

        checkPendingCommands(expectedCount: number) {
            assert.equal(this.postExecActions.length, expectedCount, `Expected ${expectedCount} post install actions`);
        }

        onProjectClosed() {
        }

        attach(projectService: server.ProjectService) {
            this.projectService = projectService;
        }

        getInstallTypingHost() {
            return this.installTypingHost;
        }

        installWorker(_requestId: number, _args: string[], _cwd: string, cb: TI.RequestCompletedAction): void {
            this.addPostExecAction("success", cb);
        }

        sendResponse(response: server.SetTypings | server.InvalidateCachedTypings) {
            this.projectService.updateTypingsForProject(response);
        }

        enqueueInstallTypingsRequest(project: server.Project, typeAcquisition: TypeAcquisition, unresolvedImports: server.SortedReadonlyArray<string>) {
            const request = server.createInstallTypingsRequest(project, typeAcquisition, unresolvedImports, this.globalTypingsCacheLocation);
            this.install(request);
        }

        addPostExecAction(stdout: string | string[], cb: TI.RequestCompletedAction) {
            const out = isString(stdout) ? stdout : createNpmPackageJsonString(stdout);
            const action: PostExecAction = {
                success: !!out,
                callback: cb
            };
            this.postExecActions.push(action);
        }
    }

    function createNpmPackageJsonString(installedTypings: string[]): string {
        const dependencies: MapLike<any> = {};
        for (const typing of installedTypings) {
            dependencies[typing] = "1.0.0";
        }
        return JSON.stringify({ dependencies });
    }

    export function toExternalFile(fileName: string): protocol.ExternalFile {
        return { fileName };
    }

    export function toExternalFiles(fileNames: string[]) {
        return map(fileNames, toExternalFile);
    }

    class TestServerEventManager {
        public events: server.ProjectServiceEvent[] = [];

        handler: server.ProjectServiceEventHandler = (event: server.ProjectServiceEvent) => {
            this.events.push(event);
        }

        checkEventCountOfType(eventType: "configFileDiag", expectedCount: number) {
            const eventsOfType = filter(this.events, e => e.eventName === eventType);
            assert.equal(eventsOfType.length, expectedCount, `The actual event counts of type ${eventType} is ${eventsOfType.length}, while expected ${expectedCount}`);
        }
    }

    class TestSession extends server.Session {
        private seq = 0;

        getProjectService() {
            return this.projectService;
        }

        public getSeq() {
            return this.seq;
        }

        public getNextSeq() {
            return this.seq + 1;
        }

        public executeCommandSeq<T extends server.protocol.Request>(request: Partial<T>) {
            this.seq++;
            request.seq = this.seq;
            request.type = "request";
            return this.executeCommand(<T>request);
        }
    }

    export function createSession(host: server.ServerHost, opts: Partial<server.SessionOptions> = {}) {
        if (opts.typingsInstaller === undefined) {
            opts.typingsInstaller = new TestTypingsInstaller("/a/data/", /*throttleLimit*/ 5, host);
        }

        if (opts.eventHandler !== undefined) {
            opts.canUseEvents = true;
        }

        const sessionOptions: server.SessionOptions = {
            host,
            cancellationToken: server.nullCancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            typingsInstaller: undefined,
            byteLength: Utils.byteLength,
            hrtime: process.hrtime,
            logger: opts.logger || nullLogger,
            canUseEvents: false
        };

        return new TestSession({ ...sessionOptions, ...opts });
    }

    interface CreateProjectServiceParameters {
        cancellationToken?: HostCancellationToken;
        logger?: server.Logger;
        useSingleInferredProject?: boolean;
        typingsInstaller?: server.ITypingsInstaller;
        eventHandler?: server.ProjectServiceEventHandler;
    }

    export class TestProjectService extends server.ProjectService {
        constructor(host: server.ServerHost, logger: server.Logger, cancellationToken: HostCancellationToken, useSingleInferredProject: boolean,
            typingsInstaller: server.ITypingsInstaller, eventHandler: server.ProjectServiceEventHandler, opts: Partial<server.ProjectServiceOptions> = {}) {
            super({
                host,
                logger,
                cancellationToken,
                useSingleInferredProject,
                useInferredProjectPerProjectRoot: false,
                typingsInstaller,
                eventHandler,
                ...opts
            });
        }

        checkNumberOfProjects(count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
            checkNumberOfProjects(this, count);
        }
    }
    export function createProjectService(host: server.ServerHost, parameters: CreateProjectServiceParameters = {}) {
        const cancellationToken = parameters.cancellationToken || server.nullCancellationToken;
        const logger = parameters.logger || nullLogger;
        const useSingleInferredProject = parameters.useSingleInferredProject !== undefined ? parameters.useSingleInferredProject : false;
        return new TestProjectService(host, logger, cancellationToken, useSingleInferredProject, parameters.typingsInstaller, parameters.eventHandler);
    }

    export function checkNumberOfConfiguredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.configuredProjects.size, expected, `expected ${expected} configured project(s)`);
    }

    function checkNumberOfExternalProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.externalProjects.length, expected, `expected ${expected} external project(s)`);
    }

    function checkNumberOfInferredProjects(projectService: server.ProjectService, expected: number) {
        assert.equal(projectService.inferredProjects.length, expected, `expected ${expected} inferred project(s)`);
    }

    export function checkNumberOfProjects(projectService: server.ProjectService, count: { inferredProjects?: number, configuredProjects?: number, externalProjects?: number }) {
        checkNumberOfConfiguredProjects(projectService, count.configuredProjects || 0);
        checkNumberOfExternalProjects(projectService, count.externalProjects || 0);
        checkNumberOfInferredProjects(projectService, count.inferredProjects || 0);
    }

    export function configuredProjectAt(projectService: server.ProjectService, index: number) {
        const values = projectService.configuredProjects.values();
        while (index > 0) {
            values.next();
            index--;
        }
        return values.next().value;
    }

    export function checkProjectActualFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames(`${server.ProjectKind[project.projectKind]} project, actual files`, project.getFileNames(), expectedFiles);
    }

    function checkProjectRootFiles(project: server.Project, expectedFiles: string[]) {
        checkFileNames(`${server.ProjectKind[project.projectKind]} project, rootFileNames`, project.getRootFiles(), expectedFiles);
    }

    /**
     * Test server cancellation token used to mock host token cancellation requests.
     * The cancelAfterRequest constructor param specifies how many isCancellationRequested() calls
     * should be made before canceling the token. The id of the request to cancel should be set with
     * setRequestToCancel();
     */
    export class TestServerCancellationToken implements server.ServerCancellationToken {
        private currentId = -1;
        private requestToCancel = -1;
        private isCancellationRequestedCount = 0;

        constructor(private cancelAfterRequest = 0) {
        }

        setRequest(requestId: number) {
            this.currentId = requestId;
        }

        setRequestToCancel(requestId: number) {
            this.resetToken();
            this.requestToCancel = requestId;
        }

        resetRequest(requestId: number) {
            assert.equal(requestId, this.currentId, "unexpected request id in cancellation");
            this.currentId = undefined;
        }

        isCancellationRequested() {
            this.isCancellationRequestedCount++;
            // If the request id is the request to cancel and isCancellationRequestedCount
            // has been met then cancel the request. Ex: cancel the request if it is a
            // nav bar request & isCancellationRequested() has already been called three times.
            return this.requestToCancel === this.currentId && this.isCancellationRequestedCount >= this.cancelAfterRequest;
        }

        resetToken() {
            this.currentId = -1;
            this.isCancellationRequestedCount = 0;
            this.requestToCancel = -1;
        }
    }

    export function makeSessionRequest<T>(command: string, args: T) {
        const newRequest: protocol.Request = {
            seq: 0,
            type: "request",
            command,
            arguments: args
        };
        return newRequest;
    }

    export function openFilesForSession(files: FileOrFolder[], session: server.Session) {
        for (const file of files) {
            const request = makeSessionRequest<protocol.OpenRequestArgs>(CommandNames.Open, { file: file.path });
            session.executeCommand(request);
        }
    }

    type ErrorInformation = { diagnosticMessage: DiagnosticMessage, errorTextArguments?: string[] };
    function getProtocolDiagnosticMessage({ diagnosticMessage, errorTextArguments = [] }: ErrorInformation) {
        return formatStringFromArgs(diagnosticMessage.message, errorTextArguments);
    }

    function verifyDiagnostics(actual: server.protocol.Diagnostic[], expected: ErrorInformation[]) {
        const expectedErrors = expected.map(getProtocolDiagnosticMessage);
        assert.deepEqual(actual.map(diag => flattenDiagnosticMessageText(diag.text, "\n")), expectedErrors);
    }

    function verifyNoDiagnostics(actual: server.protocol.Diagnostic[]) {
        verifyDiagnostics(actual, []);
    }

    describe("tsserverProjectSystem", () => {
        const commonFile1: FileOrFolder = {
            path: "/a/b/commonFile1.ts",
            content: "let x = 1"
        };
        const commonFile2: FileOrFolder = {
            path: "/a/b/commonFile2.ts",
            content: "let y = 1"
        };

        it("create inferred project", () => {
            const appFile: FileOrFolder = {
                path: "/a/b/c/app.ts",
                content: `
                import {f} from "./module"
                console.log(f)
                `
            };

            const moduleFile: FileOrFolder = {
                path: "/a/b/c/module.d.ts",
                content: `export let x: number`
            };
            const host = createServerHost([appFile, moduleFile, libFile]);
            const projectService = createProjectService(host);
            const { configFileName } = projectService.openClientFile(appFile.path);

            assert(!configFileName, `should not find config, got: '${configFileName}`);
            checkNumberOfConfiguredProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 1);

            const project = projectService.inferredProjects[0];

            checkFileNames("inferred project", project.getFileNames(), [appFile.path, libFile.path, moduleFile.path]);
            const configFileLocations = ["/a/b/c/", "/a/b/", "/a/", "/"];
            const configFiles = flatMap(configFileLocations, location => [location + "tsconfig.json", location + "jsconfig.json"]);
            const moduleLookupLocations = ["/a/b/c/module.ts", "/a/b/c/module.tsx"];
            checkWatchedFiles(host, configFiles.concat(libFile.path, moduleFile.path, ...moduleLookupLocations));
        });

        it("can handle tsconfig file name with difference casing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    include: []
                })
            };

            const host = createServerHost([f1, config], { useCaseSensitiveFileNames: false });
            const service = createProjectService(host);
            const upperCaseConfigFilePath = combinePaths(getDirectoryPath(config.path).toUpperCase(), getBaseFileName(config.path));
            service.openExternalProject(<protocol.ExternalProject>{
                projectFileName: "/a/b/project.csproj",
                rootFiles: toExternalFiles([f1.path, upperCaseConfigFilePath]),
                options: {}
            });
            service.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(service, 0), [upperCaseConfigFilePath]);

            service.openClientFile(f1.path);
            service.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });

            checkProjectActualFiles(configuredProjectAt(service, 0), [upperCaseConfigFilePath]);
            checkProjectActualFiles(service.inferredProjects[0], [f1.path]);
        });

        it("create configured project without file list", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }`
            };
            const file1: FileOrFolder = {
                path: "/a/b/c/f1.ts",
                content: "let x = 1"
            };
            const file2: FileOrFolder = {
                path: "/a/b/d/f2.ts",
                content: "let y = 1"
            };
            const file3: FileOrFolder = {
                path: "/a/b/e/f3.ts",
                content: "let z = 1"
            };

            const host = createServerHost([configFile, libFile, file1, file2, file3]);
            const projectService = createProjectService(host);
            const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

            assert(configFileName, "should find config file");
            assert.isTrue(!configFileErrors, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);
            checkNumberOfInferredProjects(projectService, 0);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(project, [file1.path, libFile.path, file2.path, configFile.path]);
            checkProjectRootFiles(project, [file1.path, file2.path]);
            // watching all files except one that was open
            checkWatchedFiles(host, [configFile.path, file2.path, libFile.path]);
            checkWatchedDirectories(host, [getDirectoryPath(configFile.path)], /*recursive*/ true);
        });

        it("create configured project with the file list", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `
                {
                    "compilerOptions": {},
                    "include": ["*.ts"]
                }`
            };
            const file1: FileOrFolder = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2: FileOrFolder = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const file3: FileOrFolder = {
                path: "/a/b/c/f3.ts",
                content: "let z = 1"
            };

            const host = createServerHost([configFile, libFile, file1, file2, file3]);
            const projectService = createProjectService(host);
            const { configFileName, configFileErrors } = projectService.openClientFile(file1.path);

            assert(configFileName, "should find config file");
            assert.isTrue(!configFileErrors, `expect no errors in config file, got ${JSON.stringify(configFileErrors)}`);
            checkNumberOfInferredProjects(projectService, 0);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(project, [file1.path, libFile.path, file2.path, configFile.path]);
            checkProjectRootFiles(project, [file1.path, file2.path]);
            // watching all files except one that was open
            checkWatchedFiles(host, [configFile.path, file2.path, libFile.path]);
            checkWatchedDirectories(host, [getDirectoryPath(configFile.path)], /*recursive*/ false);
        });

        it("add and then remove a config file in a folder with loose files", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "files": ["commonFile1.ts"]
                }`
            };
            const filesWithoutConfig = [libFile, commonFile1, commonFile2];
            const host = createServerHost(filesWithoutConfig);

            const filesWithConfig = [libFile, commonFile1, commonFile2, configFile];
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            checkNumberOfInferredProjects(projectService, 2);
            const configFileLocations = ["/", "/a/", "/a/b/"];
            const watchedFiles = flatMap(configFileLocations, location => [location + "tsconfig.json", location + "jsconfig.json"]).concat(libFile.path);
            checkWatchedFiles(host, watchedFiles);

            // Add a tsconfig file
            host.reloadFS(filesWithConfig);
            host.checkTimeoutQueueLengthAndRun(1);
            checkNumberOfInferredProjects(projectService, 1);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkWatchedFiles(host, watchedFiles);

            // remove the tsconfig file
            host.reloadFS(filesWithoutConfig);

            checkNumberOfInferredProjects(projectService, 1);
            host.checkTimeoutQueueLengthAndRun(1); // Refresh inferred projects

            checkNumberOfInferredProjects(projectService, 2);
            checkNumberOfConfiguredProjects(projectService, 0);
            checkWatchedFiles(host, watchedFiles);
        });

        it("add new files to a configured project without file list", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([commonFile1, libFile, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            checkWatchedDirectories(host, ["/a/b"], /*recursive*/ true);
            checkNumberOfConfiguredProjects(projectService, 1);

            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path]);

            // add a new ts file
            host.reloadFS([commonFile1, commonFile2, libFile, configFile]);
            host.checkTimeoutQueueLengthAndRun(2);
            // project service waits for 250ms to update the project structure, therefore the assertion needs to wait longer.
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
        });

        it("should ignore non-existing files specified in the config file", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": [
                        "commonFile1.ts",
                        "commonFile3.ts"
                    ]
                }`
            };
            const host = createServerHost([commonFile1, commonFile2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            projectService.openClientFile(commonFile2.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path]);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("remove not-listed external projects", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/b/app.ts",
                content: "let x = 1"
            };
            const f3 = {
                path: "/c/app.ts",
                content: "let x = 1"
            };
            const makeProject = (f: FileOrFolder) => ({ projectFileName: f.path + ".csproj", rootFiles: [toExternalFile(f.path)], options: {} });
            const p1 = makeProject(f1);
            const p2 = makeProject(f2);
            const p3 = makeProject(f3);

            const host = createServerHost([f1, f2, f3]);
            const session = createSession(host);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 1,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p1, p2] }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { externalProjects: 2 });
            assert.equal(projectService.externalProjects[0].getProjectName(), p1.projectFileName);
            assert.equal(projectService.externalProjects[1].getProjectName(), p2.projectFileName);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 2,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p1, p3] }
            });
            checkNumberOfProjects(projectService, { externalProjects: 2 });
            assert.equal(projectService.externalProjects[0].getProjectName(), p1.projectFileName);
            assert.equal(projectService.externalProjects[1].getProjectName(), p3.projectFileName);

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 3,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [] }
            });
            checkNumberOfProjects(projectService, { externalProjects: 0 });

            session.executeCommand(<protocol.OpenExternalProjectsRequest>{
                seq: 3,
                type: "request",
                command: "openExternalProjects",
                arguments: { projects: [p2] }
            });
            assert.equal(projectService.externalProjects[0].getProjectName(), p2.projectFileName);
        });

        it("handle recreated files correctly", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([commonFile1, commonFile2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);

            // delete commonFile2
            host.reloadFS([commonFile1, configFile]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectRootFiles(project, [commonFile1.path]);

            // re-add commonFile2
            host.reloadFS([commonFile1, commonFile2, configFile]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
        });

        it("handles the missing files - that were added to program because they were added with ///<ref", () => {
            const file1: FileOrFolder = {
                path: "/a/b/commonFile1.ts",
                content: `/// <reference path="commonFile2.ts"/>
                    let x = y`
            };
            const host = createServerHost([file1, libFile]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            checkNumberOfInferredProjects(projectService, 1);
            const project = projectService.inferredProjects[0];
            checkProjectRootFiles(project, [file1.path]);
            checkProjectActualFiles(project, [file1.path, libFile.path]);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );

            // Two errors: CommonFile2 not found and cannot find name y
            let diags: server.protocol.Diagnostic[] = session.executeCommand(getErrRequest).response;
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_name_0, errorTextArguments: ["y"] },
                { diagnosticMessage: Diagnostics.File_0_not_found, errorTextArguments: [commonFile2.path] }
            ]);

            host.reloadFS([file1, commonFile2, libFile]);
            host.runQueuedTimeoutCallbacks();
            checkNumberOfInferredProjects(projectService, 1);
            assert.strictEqual(projectService.inferredProjects[0], project, "Inferred project should be same");
            checkProjectRootFiles(project, [file1.path]);
            checkProjectActualFiles(project, [file1.path, libFile.path, commonFile2.path]);
            diags = session.executeCommand(getErrRequest).response;
            verifyNoDiagnostics(diags);
        });

        it("should create new inferred projects for files excluded from a configured project", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "files": ["${commonFile1.path}", "${commonFile2.path}"]
                }`
            };
            const files = [commonFile1, commonFile2, configFile];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);

            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            configFile.content = `{
                "compilerOptions": {},
                "files": ["${commonFile1.path}"]
            }`;
            host.reloadFS(files);

            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            host.checkTimeoutQueueLengthAndRun(2); // Update the configured project + refresh inferred projects
            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(project, [commonFile1.path]);

            projectService.openClientFile(commonFile2.path);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("files explicitly excluded in config file", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "exclude": ["/a/c"]
                }`
            };
            const excludedFile1: FileOrFolder = {
                path: "/a/c/excluedFile1.ts",
                content: `let t = 1;`
            };

            const host = createServerHost([commonFile1, commonFile2, excludedFile1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(commonFile1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            const project = configuredProjectAt(projectService, 0);
            checkProjectRootFiles(project, [commonFile1.path, commonFile2.path]);
            projectService.openClientFile(excludedFile1.path);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("should properly handle module resolution changes in config file", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.ts",
                content: `import { T } from "module1";`
            };
            const nodeModuleFile: FileOrFolder = {
                path: "/a/b/node_modules/module1.ts",
                content: `export interface T {}`
            };
            const classicModuleFile: FileOrFolder = {
                path: "/a/module1.ts",
                content: `export interface T {}`
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "moduleResolution": "node"
                    },
                    "files": ["${file1.path}"]
                }`
            };
            const files = [file1, nodeModuleFile, classicModuleFile, configFile];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.openClientFile(nodeModuleFile.path);
            projectService.openClientFile(classicModuleFile.path);

            checkNumberOfConfiguredProjects(projectService, 1);
            const project = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(project, [file1.path, nodeModuleFile.path, configFile.path]);
            checkNumberOfInferredProjects(projectService, 1);

            configFile.content = `{
                "compilerOptions": {
                    "moduleResolution": "classic"
                },
                "files": ["${file1.path}"]
            }`;
            host.reloadFS(files);
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectActualFiles(project, [file1.path, classicModuleFile.path, configFile.path]);
            checkNumberOfInferredProjects(projectService, 1);
        });

        it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
            const file1: FileOrFolder = {
                path: "/a/b/main.ts",
                content: "import { objA } from './obj-a';"
            };
            const file2: FileOrFolder = {
                path: "/a/b/obj-a.ts",
                content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.closeClientFile(file1.path);
            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);
        });

        it("should keep the configured project when the opened file is referenced by the project but not its root", () => {
            const file1: FileOrFolder = {
                path: "/a/b/main.ts",
                content: "import { objA } from './obj-a';"
            };
            const file2: FileOrFolder = {
                path: "/a/b/obj-a.ts",
                content: `export const objA = Object.assign({foo: "bar"}, {bar: "baz"});`
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            projectService.closeClientFile(file1.path);
            projectService.openClientFile(file2.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);
        });
        it("should tolerate config file errors and still try to build a project", () => {
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6",
                        "allowAnything": true
                    },
                    "someOtherProperty": {}
                }`
            };
            const host = createServerHost([commonFile1, commonFile2, libFile, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(commonFile1.path);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [commonFile1.path, commonFile2.path]);
        });

        it("should disable features when the files are too large", () => {
            const file1 = {
                path: "/a/b/f1.js",
                content: "let x =1;",
                fileSize: 10 * 1024 * 1024
            };
            const file2 = {
                path: "/a/b/f2.js",
                content: "let y =1;",
                fileSize: 6 * 1024 * 1024
            };
            const file3 = {
                path: "/a/b/f3.js",
                content: "let y =1;",
                fileSize: 6 * 1024 * 1024
            };

            const proj1name = "proj1", proj2name = "proj2", proj3name = "proj3";

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file1.path]), options: {}, projectFileName: proj1name });
            const proj1 = projectService.findProject(proj1name);
            assert.isTrue(proj1.languageServiceEnabled);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file2.path]), options: {}, projectFileName: proj2name });
            const proj2 = projectService.findProject(proj2name);
            assert.isTrue(proj2.languageServiceEnabled);

            projectService.openExternalProject({ rootFiles: toExternalFiles([file3.path]), options: {}, projectFileName: proj3name });
            const proj3 = projectService.findProject(proj3name);
            assert.isFalse(proj3.languageServiceEnabled);
        });

        it("should use only one inferred project if 'useOneInferredProject' is set", () => {
            const file1 = {
                path: "/a/b/main.ts",
                content: "let x =1;"
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const file2 = {
                path: "/a/c/main.ts",
                content: "let x =1;"
            };

            const file3 = {
                path: "/a/d/main.ts",
                content: "let x =1;"
            };

            const host = createServerHost([file1, file2, file3, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);
            projectService.openClientFile(file3.path);

            checkNumberOfConfiguredProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path, libFile.path]);


            host.reloadFS([file1, configFile, file2, file3, libFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path, file3.path, libFile.path]);
        });

        it("should close configured project after closing last open file", () => {
            const file1 = {
                path: "/a/b/main.ts",
                content: "let x =1;"
            };
            const configFile: FileOrFolder = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "target": "es6"
                    },
                    "files": [ "main.ts" ]
                }`
            };
            const host = createServerHost([file1, configFile, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.openClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 1);

            projectService.closeClientFile(file1.path);
            checkNumberOfConfiguredProjects(projectService, 0);
        });

        it("should not close external project with no open files", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y =1;"
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                rootFiles: toExternalFiles([file1.path, file2.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            // open client file - should not lead to creation of inferred project
            projectService.openClientFile(file1.path, file1.content);
            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            // close client file - external project should still exists
            projectService.closeClientFile(file1.path);
            checkNumberOfExternalProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 0);

            projectService.closeExternalProject(externalProjectName);
            checkNumberOfExternalProjects(projectService, 0);
            checkNumberOfInferredProjects(projectService, 0);
        });

        it("external project that included config files", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x =1;"
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {},
                        files: ["f1.ts"]
                    }
                )
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: "let y =1;"
            };
            const config2 = {
                path: "/a/c/tsconfig.json",
                content: JSON.stringify(
                    {
                        compilerOptions: {},
                        files: ["f2.ts"]
                    }
                )
            };
            const file3 = {
                path: "/a/d/f3.ts",
                content: "let z =1;"
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, file2, file3, config1, config2]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                rootFiles: toExternalFiles([config1.path, config2.path, file3.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 2 });

            // open client file - should not lead to creation of inferred project
            projectService.openClientFile(file1.path, file1.content);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });

            projectService.openClientFile(file3.path, file3.content);
            checkNumberOfProjects(projectService, { configuredProjects: 2, inferredProjects: 1 });

            projectService.closeExternalProject(externalProjectName);
            // open file 'file1' from configured project keeps project alive
            checkNumberOfProjects(projectService, { configuredProjects: 1, inferredProjects: 1 });

            projectService.closeClientFile(file3.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, {});
        });

        it("reload regular file after closing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "x."
            };
            const f2 = {
                path: "/a/b/lib.ts",
                content: "let x: number;"
            };

            const host = createServerHost([f1, f2, libFile]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "/a/b/project", rootFiles: toExternalFiles([f1.path, f2.path]), options: {} });

            service.openClientFile(f1.path);
            service.openClientFile(f2.path, "let x: string");

            service.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(service.externalProjects[0], [f1.path, f2.path, libFile.path]);

            const completions1 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 2);
            // should contain completions for string
            assert.isTrue(completions1.entries.some(e => e.name === "charAt"), "should contain 'charAt'");
            assert.isFalse(completions1.entries.some(e => e.name === "toExponential"), "should not contain 'toExponential'");

            service.closeClientFile(f2.path);
            const completions2 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 2);
            // should contain completions for string
            assert.isFalse(completions2.entries.some(e => e.name === "charAt"), "should not contain 'charAt'");
            assert.isTrue(completions2.entries.some(e => e.name === "toExponential"), "should contain 'toExponential'");
        });

        it("clear mixed content file after closing", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: " "
            };
            const f2 = {
                path: "/a/b/lib.html",
                content: "<html/>"
            };

            const host = createServerHost([f1, f2, libFile]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "/a/b/project", rootFiles: [{ fileName: f1.path }, { fileName: f2.path, hasMixedContent: true }], options: {} });

            service.openClientFile(f1.path);
            service.openClientFile(f2.path, "let somelongname: string");

            service.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(service.externalProjects[0], [f1.path, f2.path, libFile.path]);

            const completions1 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 0);
            assert.isTrue(completions1.entries.some(e => e.name === "somelongname"), "should contain 'somelongname'");

            service.closeClientFile(f2.path);
            const completions2 = service.externalProjects[0].getLanguageService().getCompletionsAtPosition(f1.path, 0);
            assert.isFalse(completions2.entries.some(e => e.name === "somelongname"), "should not contain 'somelongname'");
            const sf2 = service.externalProjects[0].getLanguageService().getProgram().getSourceFile(f2.path);
            assert.equal(sf2.text, "");
        });


        it("external project with included config file opened after configured project", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.openExternalProject({
                rootFiles: toExternalFiles([configFile.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeClientFile(file1.path);
            // configured project is alive since it is opened as part of external project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeExternalProject(externalProjectName);
            checkNumberOfProjects(projectService, { configuredProjects: 0 });
        });

        it("external project with included config file opened after configured project and then closed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const externalProjectName = "externalproject";
            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.openExternalProject({
                rootFiles: toExternalFiles([configFile.path]),
                options: {},
                projectFileName: externalProjectName
            });

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeExternalProject(externalProjectName);
            // configured project is alive since file is still open
            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, {});
        });

        it("changes in closed files are reflected in project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export let x = 1`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);

            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfInferredProjects(projectService, 2);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            const modifiedFile2 = {
                path: file2.path,
                content: `export * from "../c/f3"` // now inferred project should inclule file3
            };

            host.reloadFS([file1, modifiedFile2, file3]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfInferredProjects(projectService, 1);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, modifiedFile2.path, file3.path]);
        });

        it("deleted files affect project structure", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: `export * from "../c/f3"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: `export let y = 1;`
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });

            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });

            host.reloadFS([file1, file3]);
            host.checkTimeoutQueueLengthAndRun(2);

            checkNumberOfProjects(projectService, { inferredProjects: 2 });

            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);
        });

        it("ignores files excluded by a custom safe type list", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const office = {
                path: "/lib/duckquack-3.min.js",
                content: "whoa do @@ not parse me ok thanks!!!"
            };
            const host = createServerHost([customSafeList, file1, office]);
            const projectService = createProjectService(host);
            projectService.loadSafeList(customSafeList.path);
            try {
                projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, office.path]) });
                const proj = projectService.externalProjects[0];
                assert.deepEqual(proj.getFileNames(/*excludeFilesFromExternalLibraries*/ true), [file1.path]);
                assert.deepEqual(proj.getTypeAcquisition().include, ["duck-types"]);
            } finally {
                projectService.resetSafeList();
            }
        });

        it("ignores files excluded by the default type list", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const minFile = {
                path: "/c/moment.min.js",
                content: "unspecified"
            };
            const kendoFile1 = {
                path: "/q/lib/kendo/kendo.all.min.js",
                content: "unspecified"
            };
            const kendoFile2 = {
                path: "/q/lib/kendo/kendo.ui.min.js",
                content: "unspecified"
            };
            const officeFile1 = {
                path: "/scripts/Office/1/excel-15.debug.js",
                content: "unspecified"
            };
            const officeFile2 = {
                path: "/scripts/Office/1/powerpoint.js",
                content: "unspecified"
            };
            const files = [file1, minFile, kendoFile1, kendoFile2, officeFile1, officeFile2];
            const host = createServerHost(files);
            const projectService = createProjectService(host);
            try {
                projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles(files.map(f => f.path)) });
                const proj = projectService.externalProjects[0];
                assert.deepEqual(proj.getFileNames(/*excludeFilesFromExternalLibraries*/ true), [file1.path]);
                assert.deepEqual(proj.getTypeAcquisition().include, ["kendo-ui", "office"]);
            } finally {
                projectService.resetSafeList();
            }
        });

        it("open file become a part of configured project if it is referenced from root file", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "export let x = 5"
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: `import {x} from "../b/f1"`
            };
            const file3 = {
                path: "/a/c/f3.ts",
                content: "export let y = 1"
            };
            const configFile = {
                path: "/a/c/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f2.ts", "f3.ts"] })
            };

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            host.reloadFS([file1, file2, file3, configFile]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, file3.path, configFile.path]);
        });

        it("correctly migrate files between projects", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `
                export * from "../c/f2";
                export * from "../d/f3";`
            };
            const file2 = {
                path: "/a/c/f2.ts",
                content: "export let x = 1;"
            };
            const file3 = {
                path: "/a/d/f3.ts",
                content: "export let y = 1;"
            };
            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path]);

            projectService.openClientFile(file3.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file2.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file3.path]);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectRootFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path, file2.path, file3.path]);

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
        });

        it("can correctly update configured project when set of root files has changed (new file on disk)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };

            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, configFile.path]);

            host.reloadFS([file1, file2, configFile]);

            host.checkTimeoutQueueLengthAndRun(2);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
        });

        it("can correctly update configured project when set of root files has changed (new file in list of files)", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts"] })
            };

            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, configFile.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            host.checkTimeoutQueueLengthAndRun(2);
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
        });

        it("can update configured project when set of root files was not changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {}, files: ["f1.ts", "f2.ts"] })
            };

            const host = createServerHost([file1, file2, configFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, configFile.path]);

            const modifiedConfigFile = {
                path: configFile.path,
                content: JSON.stringify({ compilerOptions: { outFile: "out.js" }, files: ["f1.ts", "f2.ts"] })
            };

            host.reloadFS([file1, file2, modifiedConfigFile]);

            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectRootFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path]);
        });

        it("can correctly update external project when set of root files has changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 1"
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);

            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path]);

            projectService.openExternalProject({ projectFileName: "project", options: {}, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
        });

        it("can update external project when set of root files was not changed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `export * from "m"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "export let y = 1"
            };
            const file3 = {
                path: "/a/m.ts",
                content: "export let y = 1"
            };

            const host = createServerHost([file1, file2, file3]);
            const projectService = createProjectService(host);

            projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ModuleResolutionKind.NodeJs }, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path, file2.path]);

            projectService.openExternalProject({ projectFileName: "project", options: { moduleResolution: ModuleResolutionKind.Classic }, rootFiles: toExternalFiles([file1.path, file2.path]) });
            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkProjectRootFiles(projectService.externalProjects[0], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.externalProjects[0], [file1.path, file2.path, file3.path]);
        });

        it("config file is deleted", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "let y = 2;"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const host = createServerHost([file1, file2, config]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            host.reloadFS([file1, file2]);
            host.checkTimeoutQueueLengthAndRun(1);
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file1.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file2.path]);
        });

        it("loading files with correct priority", () => {
            const f1 = {
                path: "/a/main.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/main.js",
                content: "var y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: { allowJs: true }
                })
            };
            const host = createServerHost([f1, f2, config]);
            const projectService = createProjectService(host);
            projectService.setHostConfiguration({
                extraFileExtensions: [
                    { extension: ".js", isMixedContent: false },
                    { extension: ".html", isMixedContent: true }
                ]
            });
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, config.path]);

            projectService.closeClientFile(f1.path);

            projectService.openClientFile(f2.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, config.path]);
            checkProjectActualFiles(projectService.inferredProjects[0], [f2.path]);
        });

        it("tsconfig script block support", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: ` `
            };
            const file2 = {
                path: "/a/b/f2.html",
                content: `var hello = "hello";`
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };
            const host = createServerHost([file1, file2, config]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const projectService = session.getProjectService();

            // HTML file will not be included in any projects yet
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const configuredProj = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(configuredProj, [file1.path, config.path]);

            // Specify .html extension as mixed content
            const extraFileExtensions = [{ extension: ".html", scriptKind: ScriptKind.JS, isMixedContent: true }];
            const configureHostRequest = makeSessionRequest<protocol.ConfigureRequestArguments>(CommandNames.Configure, { extraFileExtensions });
            session.executeCommand(configureHostRequest).response;

            // The configured project should now be updated to include html file
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.strictEqual(configuredProjectAt(projectService, 0), configuredProj, "Same configured project should be updated");
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            // Open HTML file
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ [{ fileName: file2.path, hasMixedContent: true, scriptKind: ScriptKind.JS, content: `var hello = "hello";` }],
                /*changedFiles*/ undefined,
                /*closedFiles*/ undefined);

            // Now HTML file is included in the project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            // Check identifiers defined in HTML content are available in .ts file
            const project = configuredProjectAt(projectService, 0);
            let completions = project.getLanguageService().getCompletionsAtPosition(file1.path, 1);
            assert(completions && completions.entries[0].name === "hello", `expected entry hello to be in completion list`);

            // Close HTML file
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ undefined,
                /*changedFiles*/ undefined,
                /*closedFiles*/ [file2.path]);

            // HTML file is still included in project
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [file1.path, file2.path, config.path]);

            // Check identifiers defined in HTML content are not available in .ts file
            completions = project.getLanguageService().getCompletionsAtPosition(file1.path, 5);
            assert(completions && completions.entries[0].name !== "hello", `unexpected hello entry in completion list`);
        });

        it("no tsconfig script block diagnostic errors", () => {

            //  #1. Ensure no diagnostic errors when allowJs is true
            const file1 = {
                path: "/a/b/f1.ts",
                content: ` `
            };
            const file2 = {
                path: "/a/b/f2.html",
                content: `var hello = "hello";`
            };
            const config1 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };

            let host = createServerHost([file1, file2, config1, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            let session = createSession(host);

            // Specify .html extension as mixed content in a configure host request
            const extraFileExtensions = [{ extension: ".html", scriptKind: ScriptKind.JS, isMixedContent: true }];
            const configureHostRequest = makeSessionRequest<protocol.ConfigureRequestArguments>(CommandNames.Configure, { extraFileExtensions });
            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            let projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            let diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #2. Ensure no errors when allowJs is false
            const config2 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: false } })
            };

            host = createServerHost([file1, file2, config2, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #3. Ensure no errors when compiler options aren't specified
            const config3 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({})
            };

            host = createServerHost([file1, file2, config3, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #4. Ensure no errors when files are explicitly specified in tsconfig
            const config4 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, files: [file1.path, file2.path] })
            };

            host = createServerHost([file1, file2, config4, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);

            //  #4. Ensure no errors when files are explicitly excluded in tsconfig
            const config5 = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: [file2.path] })
            };

            host = createServerHost([file1, file2, config5, libFile], { executingFilePath: combinePaths(getDirectoryPath(libFile.path), "tsc.js") });
            session = createSession(host);

            session.executeCommand(configureHostRequest).response;

            openFilesForSession([file1], session);
            projectService = session.getProjectService();

            checkNumberOfProjects(projectService, { configuredProjects: 1 });

            diagnostics = configuredProjectAt(projectService, 0).getLanguageService().getCompilerOptionsDiagnostics();
            assert.deepEqual(diagnostics, []);
        });

        it("project structure update is deferred if files are not added\removed", () => {
            const file1 = {
                path: "/a/b/f1.ts",
                content: `import {x} from "./f2"`
            };
            const file2 = {
                path: "/a/b/f2.ts",
                content: "export let x = 1"
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(file2.path);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            projectService.applyChangesInOpenFiles(
                /*openFiles*/ undefined,
                /*changedFiles*/[{ fileName: file1.path, changes: [{ span: createTextSpan(0, file1.path.length), newText: "let y = 1" }] }],
                /*closedFiles*/ undefined);

            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const changedFiles = projectService.getChangedFiles_TestOnly();
            assert(changedFiles && changedFiles.length === 1, `expected 1 changed file, got ${JSON.stringify(changedFiles && changedFiles.length || 0)}`);

            projectService.ensureInferredProjectsUpToDate_TestOnly();
            checkNumberOfProjects(projectService, { inferredProjects: 2 });
        });

        it("files with mixed content are handled correctly", () => {
            const file1 = {
                path: "/a/b/f1.html",
                content: `<html><script language="javascript">var x = 1;</></html>`
            };
            const host = createServerHost([file1]);
            const projectService = createProjectService(host);
            const projectFileName = "projectFileName";
            projectService.openExternalProject({ projectFileName, options: {}, rootFiles: [{ fileName: file1.path, scriptKind: ScriptKind.JS, hasMixedContent: true }] });

            checkNumberOfProjects(projectService, { externalProjects: 1 });
            checkWatchedFiles(host, [libFile.path]); // watching the "missing" lib file

            const project = projectService.externalProjects[0];

            const scriptInfo = project.getScriptInfo(file1.path);
            const snap = scriptInfo.getSnapshot();
            const actualText = snap.getText(0, snap.getLength());
            assert.equal(actualText, "", `expected content to be empty string, got "${actualText}"`);

            projectService.openClientFile(file1.path, `var x = 1;`);
            project.updateGraph();

            const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file1.path, 4);
            assert.equal(quickInfo.kind, ScriptElementKind.variableElement);

            projectService.closeClientFile(file1.path);

            const scriptInfo2 = project.getScriptInfo(file1.path);
            const snap2 = scriptInfo2.getSnapshot();
            const actualText2 = snap2.getText(0, snap.getLength());
            assert.equal(actualText2, "", `expected content to be empty string, got "${actualText2}"`);
        });

        it("project settings for inferred projects", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: `import {x} from "mod"`
            };
            const modFile = {
                path: "/a/mod.ts",
                content: "export let x: number"
            };
            const host = createServerHost([file1, modFile]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.openClientFile(modFile.path);

            checkNumberOfProjects(projectService, { inferredProjects: 2 });

            projectService.setCompilerOptionsForInferredProjects({ moduleResolution: ModuleResolutionKind.Classic });
            host.checkTimeoutQueueLengthAndRun(3);
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
        });

        it("syntax tree cache handles changes in project settings", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: "{x: 1}"
            };
            const host = createServerHost([file1]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES5, allowJs: false });
            projectService.openClientFile(file1.path);
            projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES5, allowJs: true });
            projectService.getScriptInfo(file1.path).editContent(0, 0, " ");
            projectService.inferredProjects[0].getLanguageService(/*ensureSynchronized*/ false).getOutliningSpans(file1.path);
            projectService.closeClientFile(file1.path);
        });

        it("File in multiple projects at opened and closed correctly", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const file2 = {
                path: "/a/c/f.ts",
                content: `/// <reference path="../b/app.ts"/>`
            };
            const tsconfig1 = {
                path: "/a/c/tsconfig.json",
                content: "{}"
            };
            const tsconfig2 = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([file1, file2, tsconfig1, tsconfig2]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project1 = configuredProjectAt(projectService, 0);
            assert.equal(project1.openRefCount, 1, "Open ref count in project1 - 1");
            assert.equal(project1.getScriptInfo(file2.path).containingProjects.length, 1, "containing projects count");

            projectService.openClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.equal(project1.openRefCount, 2, "Open ref count in project1 - 2");

            const project2 = configuredProjectAt(projectService, 1);
            assert.equal(project2.openRefCount, 1, "Open ref count in project2 - 2");

            assert.equal(project1.getScriptInfo(file1.path).containingProjects.length, 2, `${file1.path} containing projects count`);
            assert.equal(project1.getScriptInfo(file2.path).containingProjects.length, 1, `${file2.path} containing projects count`);

            projectService.closeClientFile(file2.path);
            checkNumberOfProjects(projectService, { configuredProjects: 2 });
            assert.equal(project1.openRefCount, 1, "Open ref count in project1 - 3");
            assert.equal(project2.openRefCount, 1, "Open ref count in project2 - 3");

            projectService.closeClientFile(file1.path);
            checkNumberOfProjects(projectService, { configuredProjects: 0 });
        });

        it("language service disabled state is updated in external projects", () => {
            const f1 = {
                path: "/a/app.js",
                content: "var x = 1"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const host = createServerHost([f1, f2]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const service = createProjectService(host);
            const projectFileName = "/a/proj.csproj";

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 1");

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isTrue(service.externalProjects[0].languageServiceEnabled, "language service should be enabled");

            service.openExternalProject({
                projectFileName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            service.checkNumberOfProjects({ externalProjects: 1 });
            assert.isFalse(service.externalProjects[0].languageServiceEnabled, "language service should be disabled - 2");
        });

        it("files are properly detached when language service is disabled", () => {
            const f1 = {
                path: "/a/app.js",
                content: "var x = 1"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const f3 = {
                path: "/a/lib.js",
                content: "var x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true } })
            };
            const host = createServerHost([f1, f2, f3, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            projectService.closeClientFile(f1.path);
            projectService.checkNumberOfProjects({});

            for (const f of [f1, f2, f3]) {
                // There shouldnt be any script info as we closed the file that resulted in creation of it
                const scriptInfo = projectService.getScriptInfoForNormalizedPath(server.toNormalizedPath(f.path));
                assert.equal(scriptInfo.containingProjects.length, 0, `expect 0 containing projects for '${f.path}'`);
            }
        });

        it("language service disabled events are triggered", () => {
            const f1 = {
                path: "/a/app.js",
                content: "let x = 1;"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const config = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const configWithExclude = {
                path: config.path,
                content: JSON.stringify({ exclude: ["largefile.js"] })
            };
            const host = createServerHost([f1, f2, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);

            let lastEvent: server.ProjectLanguageServiceStateEvent;
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: e => {
                    if (e.eventName === server.ConfigFileDiagEvent || e.eventName === server.ProjectChangedEvent || e.eventName === server.ProjectInfoTelemetryEvent) {
                        return;
                    }
                    assert.equal(e.eventName, server.ProjectLanguageServiceStateEvent);
                    assert.equal(e.data.project.getProjectName(), config.path, "project name");
                    lastEvent = <server.ProjectLanguageServiceStateEvent>e;
                }
            });
            session.executeCommand(<protocol.OpenRequest>{
                seq: 0,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            assert.isFalse(project.languageServiceEnabled, "Language service enabled");
            assert.isTrue(!!lastEvent, "should receive event");
            assert.equal(lastEvent.data.project, project, "project name");
            assert.equal(lastEvent.data.project.getProjectName(), config.path, "config path");
            assert.isFalse(lastEvent.data.languageServiceEnabled, "Language service state");

            host.reloadFS([f1, f2, configWithExclude]);
            host.checkTimeoutQueueLengthAndRun(2);
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            assert.isTrue(project.languageServiceEnabled, "Language service enabled");
            assert.equal(lastEvent.data.project, project, "project");
            assert.isTrue(lastEvent.data.languageServiceEnabled, "Language service state");
        });

        it("syntactic features work even if language service is disabled", () => {
            const f1 = {
                path: "/a/app.js",
                content: "let x =   1;"
            };
            const f2 = {
                path: "/a/largefile.js",
                content: ""
            };
            const config = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, f2, config]);
            const originalGetFileSize = host.getFileSize;
            host.getFileSize = (filePath: string) =>
                filePath === f2.path ? server.maxProgramSizeForNonTsFiles + 1 : originalGetFileSize.call(host, filePath);
            let lastEvent: server.ProjectLanguageServiceStateEvent;
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: e => {
                    if (e.eventName === server.ConfigFileDiagEvent || e.eventName === server.ProjectInfoTelemetryEvent) {
                        return;
                    }
                    assert.equal(e.eventName, server.ProjectLanguageServiceStateEvent);
                    lastEvent = <server.ProjectLanguageServiceStateEvent>e;
                }
            });
            session.executeCommand(<protocol.OpenRequest>{
                seq: 0,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const project = configuredProjectAt(projectService, 0);
            assert.isFalse(project.languageServiceEnabled, "Language service enabled");
            assert.isTrue(!!lastEvent, "should receive event");
            assert.equal(lastEvent.data.project, project, "project name");
            assert.isFalse(lastEvent.data.languageServiceEnabled, "Language service state");

            const options = projectService.getFormatCodeOptions();
            const edits = project.getLanguageService().getFormattingEditsForDocument(f1.path, options);
            assert.deepEqual(edits, [{ span: createTextSpan(/*start*/ 7, /*length*/ 3), newText: " " }]);
        });

        it("snapshot from different caches are incompatible", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const host = createServerHost([f1]);
            const projectFileName = "/a/b/proj.csproj";
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                projectFileName,
                rootFiles: [toExternalFile(f1.path)],
                options: {}
            });
            projectService.openClientFile(f1.path, "let x = 1;\nlet y = 2;");

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            projectService.externalProjects[0].getLanguageService(/*ensureSynchronized*/ false).getNavigationBarItems(f1.path);
            projectService.closeClientFile(f1.path);

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            const navbar = projectService.externalProjects[0].getLanguageService(/*ensureSynchronized*/ false).getNavigationBarItems(f1.path);
            assert.equal(navbar[0].spans[0].length, f1.content.length);
        });

        it("deleting config file opened from the external project works", () => {
            const site = {
                path: "/user/someuser/project/js/site.js",
                content: ""
            };
            const configFile = {
                path: "/user/someuser/project/tsconfig.json",
                content: "{}"
            };
            const projectFileName = "/user/someuser/project/WebApplication6.csproj";
            const host = createServerHost([libFile, site, configFile]);
            const projectService = createProjectService(host);

            const externalProject: protocol.ExternalProject = {
                projectFileName,
                rootFiles: [toExternalFile(site.path), toExternalFile(configFile.path)],
                options: { allowJs: false },
                typeAcquisition: { "include": [] }
            };

            projectService.openExternalProjects([externalProject]);

            let knownProjects = projectService.synchronizeProjectList([]);
            checkNumberOfProjects(projectService, { configuredProjects: 1, externalProjects: 0, inferredProjects: 0 });

            const configProject = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(configProject, [libFile.path, configFile.path]);

            const diagnostics = configProject.getAllProjectErrors();
            assert.equal(diagnostics[0].code, Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code);

            host.reloadFS([libFile, site]);
            host.checkTimeoutQueueLengthAndRun(1);

            knownProjects = projectService.synchronizeProjectList(map(knownProjects, proj => proj.info));
            checkNumberOfProjects(projectService, { configuredProjects: 0, externalProjects: 0, inferredProjects: 0 });

            externalProject.rootFiles.length = 1;
            projectService.openExternalProjects([externalProject]);

            checkNumberOfProjects(projectService, { configuredProjects: 0, externalProjects: 1, inferredProjects: 0 });
            checkProjectActualFiles(projectService.externalProjects[0], [site.path, libFile.path]);
        });

        it("Getting errors from closed script info does not throw exception (because of getting project from orphan script info)", () => {
            let hasErrorMsg = false;
            const { close, hasLevel, loggingEnabled, startGroup, endGroup, info, getLogFileName, perftrc } = nullLogger;
            const logger: server.Logger = {
                close, hasLevel, loggingEnabled, startGroup, endGroup, info, getLogFileName, perftrc,
                msg: () => {
                    hasErrorMsg = true;
                }
            };
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: {} })
            };
            const host = createServerHost([f1, libFile, config]);
            const session = createSession(host, { logger });
            session.executeCommandSeq(<protocol.OpenRequest>{
                command: server.CommandNames.Open,
                arguments: {
                    file: f1.path
                }
            });
            session.executeCommandSeq(<protocol.CloseRequest>{
                command: server.CommandNames.Close,
                arguments: {
                    file: f1.path
                }
            });
            session.executeCommandSeq(<protocol.GeterrRequest>{
                command: server.CommandNames.Geterr,
                arguments: {
                    delay: 0,
                    files: [f1.path]
                }
            });
            assert.isFalse(hasErrorMsg);
        });
    });

    describe("Proper errors", () => {
        it("document is not contained in project", () => {
            const file1 = {
                path: "/a/b/app.ts",
                content: ""
            };
            const corruptedConfig = {
                path: "/a/b/tsconfig.json",
                content: "{"
            };
            const host = createServerHost([file1, corruptedConfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            const project = projectService.findProject(corruptedConfig.path);
            checkProjectRootFiles(project, [file1.path]);
        });
    });

    describe("autoDiscovery", () => {
        it("does not depend on extension", () => {
            const file1 = {
                path: "/a/b/app.html",
                content: ""
            };
            const file2 = {
                path: "/a/b/app.d.ts",
                content: ""
            };
            const host = createServerHost([file1, file2]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({
                projectFileName: "/a/b/proj.csproj",
                rootFiles: [toExternalFile(file2.path), { fileName: file1.path, hasMixedContent: true, scriptKind: ScriptKind.JS }],
                options: {}
            });
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            const typeAcquisition = projectService.externalProjects[0].getTypeAcquisition();
            assert.isTrue(typeAcquisition.enable, "Typine acquisition should be enabled");
        });
    });

    describe("extra resolution pass in lshost", () => {
        it("can load typings that are proper modules", () => {
            const file1 = {
                path: "/a/b/app.js",
                content: `var x = require("lib")`
            };
            const lib = {
                path: "/a/cache/node_modules/@types/lib/index.d.ts",
                content: "export let x = 1"
            };
            const host: TestServerHost & ModuleResolutionHost = createServerHost([file1, lib]);
            const resolutionTrace: string[] = [];
            host.trace = resolutionTrace.push.bind(resolutionTrace);
            const projectService = createProjectService(host, { typingsInstaller: new TestTypingsInstaller("/a/cache", /*throttleLimit*/5, host) });

            projectService.setCompilerOptionsForInferredProjects({ traceResolution: true, allowJs: true });
            projectService.openClientFile(file1.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            const proj = projectService.inferredProjects[0];

            assert.deepEqual(resolutionTrace, [
                "======== Resolving module 'lib' from '/a/b/app.js'. ========",
                "Module resolution kind is not specified, using 'NodeJs'.",
                "Loading module 'lib' from 'node_modules' folder, target file type 'TypeScript'.",
                "Directory '/a/b/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/a/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/node_modules' does not exist, skipping all lookups in it.",
                "Loading module 'lib' from 'node_modules' folder, target file type 'JavaScript'.",
                "Directory '/a/b/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/a/node_modules' does not exist, skipping all lookups in it.",
                "Directory '/node_modules' does not exist, skipping all lookups in it.",
                "======== Module name 'lib' was not resolved. ========",
                `Auto discovery for typings is enabled in project '${proj.getProjectName()}'. Running extra resolution pass for module 'lib' using cache location '/a/cache'.`,
                "File '/a/cache/node_modules/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib.d.ts' does not exist.",
                "File '/a/cache/node_modules/@types/lib/package.json' does not exist.",
                "File '/a/cache/node_modules/@types/lib/index.d.ts' exist - use it as a name resolution result.",
            ]);
            checkProjectActualFiles(proj, [file1.path, lib.path]);
        });
    });

    describe("navigate-to for javascript project", () => {
        function containsNavToItem(items: protocol.NavtoItem[], itemName: string, itemKind: string) {
            return find(items, item => item.name === itemName && item.kind === itemKind) !== undefined;
        }

        it("should not include type symbols", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.js",
                content: "function foo() {}"
            };
            const configFile: FileOrFolder = {
                path: "/a/b/jsconfig.json",
                content: "{}"
            };
            const host = createServerHost([file1, configFile, libFile]);
            const session = createSession(host);
            openFilesForSession([file1], session);

            // Try to find some interface type defined in lib.d.ts
            const libTypeNavToRequest = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "Document", file: file1.path, projectFileName: configFile.path });
            const items: protocol.NavtoItem[] = session.executeCommand(libTypeNavToRequest).response;
            assert.isFalse(containsNavToItem(items, "Document", "interface"), `Found lib.d.ts symbol in JavaScript project nav to request result.`);

            const localFunctionNavToRequst = makeSessionRequest<protocol.NavtoRequestArgs>(CommandNames.Navto, { searchValue: "foo", file: file1.path, projectFileName: configFile.path });
            const items2: protocol.NavtoItem[] = session.executeCommand(localFunctionNavToRequst).response;
            assert.isTrue(containsNavToItem(items2, "foo", "function"), `Cannot find function symbol "foo".`);
        });
    });

    describe("external projects", () => {
        it("correctly handling add/remove tsconfig - 1", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const f2 = {
                path: "/a/b/lib.ts",
                content: ""
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: ""
            };
            const host = createServerHost([f1, f2]);
            const projectService = createProjectService(host);

            // open external project
            const projectName = "/a/b/proj1";
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path, f2.path]);

            // rename lib.ts to tsconfig.json
            host.reloadFS([f1, tsconfig]);
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, tsconfig.path]),
                options: {}
            });
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, tsconfig.path]);

            // rename tsconfig.json back to lib.ts
            host.reloadFS([f1, f2]);
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, f2.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path, f2.path]);
        });


        it("correctly handling add/remove tsconfig - 2", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const cLib = {
                path: "/a/b/c/lib.ts",
                content: ""
            };
            const cTsconfig = {
                path: "/a/b/c/tsconfig.json",
                content: "{}"
            };
            const dLib = {
                path: "/a/b/d/lib.ts",
                content: ""
            };
            const dTsconfig = {
                path: "/a/b/d/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, cLib, cTsconfig, dLib, dTsconfig]);
            const projectService = createProjectService(host);

            // open external project
            const projectName = "/a/b/proj1";
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path]);

            // add two config file as root files
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {}
            });
            projectService.checkNumberOfProjects({ configuredProjects: 2 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [cLib.path, cTsconfig.path]);
            checkProjectActualFiles(configuredProjectAt(projectService, 1), [dLib.path, dTsconfig.path]);

            // remove one config file
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, dTsconfig.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [dLib.path, dTsconfig.path]);

            // remove second config file
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path]),
                options: {}
            });

            projectService.checkNumberOfProjects({ externalProjects: 1 });
            checkProjectActualFiles(projectService.externalProjects[0], [f1.path]);

            // open two config files
            // add two config file as root files
            projectService.openExternalProject({
                projectFileName: projectName,
                rootFiles: toExternalFiles([f1.path, cTsconfig.path, dTsconfig.path]),
                options: {}
            });
            projectService.checkNumberOfProjects({ configuredProjects: 2 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [cLib.path, cTsconfig.path]);
            checkProjectActualFiles(configuredProjectAt(projectService, 1), [dLib.path, dTsconfig.path]);

            // close all projects - no projects should be opened
            projectService.closeExternalProject(projectName);
            projectService.checkNumberOfProjects({});
        });

        it("correctly handles changes in lib section of config file", () => {
            const libES5 = {
                path: "/compiler/lib.es5.d.ts",
                content: "declare const eval: any"
            };
            const libES2015Promise = {
                path: "/compiler/lib.es2015.promise.d.ts",
                content: "declare class Promise<T> {}"
            };
            const app = {
                path: "/src/app.ts",
                content: "var x: Promise<string>;"
            };
            const config1 = {
                path: "/src/tsconfig.json",
                content: JSON.stringify(
                    {
                        "compilerOptions": {
                            "module": "commonjs",
                            "target": "es5",
                            "noImplicitAny": true,
                            "sourceMap": false,
                            "lib": [
                                "es5"
                            ]
                        }
                    })
            };
            const config2 = {
                path: config1.path,
                content: JSON.stringify(
                    {
                        "compilerOptions": {
                            "module": "commonjs",
                            "target": "es5",
                            "noImplicitAny": true,
                            "sourceMap": false,
                            "lib": [
                                "es5",
                                "es2015.promise"
                            ]
                        }
                    })
            };
            const host = createServerHost([libES5, libES2015Promise, app, config1], { executingFilePath: "/compiler/tsc.js" });
            const projectService = createProjectService(host);
            projectService.openClientFile(app.path);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [libES5.path, app.path, config1.path]);

            host.reloadFS([libES5, libES2015Promise, app, config2]);
            host.checkTimeoutQueueLengthAndRun(2);

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [libES5.path, libES2015Promise.path, app.path, config2.path]);
        });

        it("should handle non-existing directories in config file", () => {
            const f = {
                path: "/a/src/app.ts",
                content: "let x = 1;"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {},
                    include: [
                        "src/**/*",
                        "notexistingfolder/*"
                    ]
                })
            };
            const host = createServerHost([f, config]);
            const projectService = createProjectService(host);
            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });

            projectService.closeClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 0 });

            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
        });
    });

    describe("prefer typings to js", () => {
        it("during second resolution pass", () => {
            const typingsCacheLocation = "/a/typings";
            const f1 = {
                path: "/a/b/app.js",
                content: "var x = require('bar')"
            };
            const barjs = {
                path: "/a/b/node_modules/bar/index.js",
                content: "export let x = 1"
            };
            const barTypings = {
                path: `${typingsCacheLocation}/node_modules/@types/bar/index.d.ts`,
                content: "export let y: number"
            };
            const config = {
                path: "/a/b/jsconfig.json",
                content: JSON.stringify({ compilerOptions: { allowJs: true }, exclude: ["node_modules"] })
            };
            const host = createServerHost([f1, barjs, barTypings, config]);
            const projectService = createProjectService(host, { typingsInstaller: new TestTypingsInstaller(typingsCacheLocation, /*throttleLimit*/ 5, host) });

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, barTypings.path, config.path]);
        });
    });

    describe("format settings", () => {
        it("can be set globally", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x;"
            };
            const host = createServerHost([f1]);
            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);

            const defaultSettings = projectService.getFormatCodeOptions();

            // set global settings
            const newGlobalSettings1 = clone(defaultSettings);
            newGlobalSettings1.placeOpenBraceOnNewLineForControlBlocks = !newGlobalSettings1.placeOpenBraceOnNewLineForControlBlocks;
            projectService.setHostConfiguration({ formatOptions: newGlobalSettings1 });

            // get format options for file - should be equal to new global settings
            const s1 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s1, newGlobalSettings1, "file settings should be the same with global settings");

            // set per file format options
            const newPerFileSettings = clone(defaultSettings);
            newPerFileSettings.insertSpaceAfterCommaDelimiter = !newPerFileSettings.insertSpaceAfterCommaDelimiter;
            projectService.setHostConfiguration({ formatOptions: newPerFileSettings, file: f1.path });

            // get format options for file - should be equal to new per-file settings
            const s2 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s2, newPerFileSettings, "file settings should be the same with per-file settings");

            // set new global settings - they should not affect ones that were set per-file
            const newGlobalSettings2 = clone(defaultSettings);
            newGlobalSettings2.insertSpaceAfterSemicolonInForStatements = !newGlobalSettings2.insertSpaceAfterSemicolonInForStatements;
            projectService.setHostConfiguration({ formatOptions: newGlobalSettings2 });

            // get format options for file - should be equal to new per-file settings
            const s3 = projectService.getFormatCodeOptions(server.toNormalizedPath(f1.path));
            assert.deepEqual(s3, newPerFileSettings, "file settings should still be the same with per-file settings");
        });
    });

    describe("watching @types", () => {
        it("works correctly when typings are added or removed", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const t1 = {
                path: "/a/b/node_modules/@types/lib1/index.d.ts",
                content: "export let a: number"
            };
            const t2 = {
                path: "/a/b/node_modules/@types/lib2/index.d.ts",
                content: "export let b: number"
            };
            const tsconfig = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {},
                    exclude: ["node_modules"]
                })
            };
            const host = createServerHost([f1, t1, tsconfig]);
            const projectService = createProjectService(host);

            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, t1.path, tsconfig.path]);

            // delete t1
            host.reloadFS([f1, tsconfig]);
            // run throttled operation
            host.runQueuedTimeoutCallbacks();

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, tsconfig.path]);

            // create t2
            host.reloadFS([f1, tsconfig, t2]);
            // run throttled operation
            host.runQueuedTimeoutCallbacks();

            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, t2.path, tsconfig.path]);
        });
    });

    describe("Open-file", () => {
        it("can be reloaded with empty content", () => {
            const f = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const projectFileName = "externalProject";
            const host = createServerHost([f]);
            const projectService = createProjectService(host);
            // create a project
            projectService.openExternalProject({ projectFileName, rootFiles: [toExternalFile(f.path)], options: {} });
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            const p = projectService.externalProjects[0];
            // force to load the content of the file
            p.updateGraph();

            const scriptInfo = p.getScriptInfo(f.path);
            checkSnapLength(scriptInfo.getSnapshot(), f.content.length);

            // open project and replace its content with empty string
            projectService.openClientFile(f.path, "");
            checkSnapLength(scriptInfo.getSnapshot(), 0);
        });
        function checkSnapLength(snap: IScriptSnapshot, expectedLength: number) {
            assert.equal(snap.getLength(), expectedLength, "Incorrect snapshot size");
        }
    });

    describe("Language service", () => {
        it("should work correctly on case-sensitive file systems", () => {
            const lib = {
                path: "/a/Lib/lib.d.ts",
                content: "let x: number"
            };
            const f = {
                path: "/a/b/app.ts",
                content: "let x = 1;"
            };
            const host = createServerHost([lib, f], { executingFilePath: "/a/Lib/tsc.js", useCaseSensitiveFileNames: true });
            const projectService = createProjectService(host);
            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ inferredProjects: 1 });
            projectService.inferredProjects[0].getLanguageService().getProgram();
        });
    });

    describe("rename a module file and rename back", () => {
        it("should restore the states for inferred projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createServerHost([moduleFile, file1]);
            const session = createSession(host);

            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags: server.protocol.Diagnostic[] = session.executeCommand(getErrRequest).response;
            verifyNoDiagnostics(diags);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1]);
            host.runQueuedTimeoutCallbacks();
            diags = session.executeCommand(getErrRequest).response;
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_module_0, errorTextArguments: ["./moduleFile"] }
            ]);
            assert.equal(diags.length, 1);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1]);
            host.runQueuedTimeoutCallbacks();

            // Make a change to trigger the program rebuild
            const changeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(
                server.CommandNames.Change,
                { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" }
            );
            session.executeCommand(changeRequest);
            host.runQueuedTimeoutCallbacks();

            diags = session.executeCommand(getErrRequest).response;
            verifyNoDiagnostics(diags);
        });

        it("should restore the states for configured projects", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{}`
            };
            const host = createServerHost([moduleFile, file1, configFile]);
            const session = createSession(host);

            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags: server.protocol.Diagnostic[] = session.executeCommand(getErrRequest).response;
            verifyNoDiagnostics(diags);

            const moduleFileOldPath = moduleFile.path;
            const moduleFileNewPath = "/a/b/moduleFile1.ts";
            moduleFile.path = moduleFileNewPath;
            host.reloadFS([moduleFile, file1, configFile]);
            host.runQueuedTimeoutCallbacks();
            diags = session.executeCommand(getErrRequest).response;
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_module_0, errorTextArguments: ["./moduleFile"] }
            ]);

            moduleFile.path = moduleFileOldPath;
            host.reloadFS([moduleFile, file1, configFile]);
            host.runQueuedTimeoutCallbacks();
            diags = session.executeCommand(getErrRequest).response;
            verifyNoDiagnostics(diags);
        });

        it("should property handle missing config files", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: "{}"
            };
            const projectName = "project1";
            const host = createServerHost([f1]);
            const projectService = createProjectService(host);
            projectService.openExternalProject({ rootFiles: toExternalFiles([f1.path, config.path]), options: {}, projectFileName: projectName });

            // should have one external project since config file is missing
            projectService.checkNumberOfProjects({ externalProjects: 1 });

            host.reloadFS([f1, config]);
            projectService.openExternalProject({ rootFiles: toExternalFiles([f1.path, config.path]), options: {}, projectFileName: projectName });
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
        });

        it("types should load from config file path if config exists", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/b/tsconfig.json",
                content: JSON.stringify({ compilerOptions: { types: ["node"], typeRoots: [] } })
            };
            const node = {
                path: "/a/b/node_modules/@types/node/index.d.ts",
                content: "declare var process: any"
            };
            const cwd = {
                path: "/a/c"
            };
            const host = createServerHost([f1, config, node, cwd], { currentDirectory: cwd.path });
            const projectService = createProjectService(host);
            projectService.openClientFile(f1.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1 });
            checkProjectActualFiles(configuredProjectAt(projectService, 0), [f1.path, node.path, config.path]);
        });
    });

    describe("add the missing module file for inferred project", () => {
        it("should remove the `module not found` error", () => {
            const moduleFile = {
                path: "/a/b/moduleFile.ts",
                content: "export function bar() { };"
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "import * as T from './moduleFile'; T.bar();"
            };
            const host = createServerHost([file1]);
            const session = createSession(host);
            openFilesForSession([file1], session);
            const getErrRequest = makeSessionRequest<server.protocol.SemanticDiagnosticsSyncRequestArgs>(
                server.CommandNames.SemanticDiagnosticsSync,
                { file: file1.path }
            );
            let diags: server.protocol.Diagnostic[] = session.executeCommand(getErrRequest).response;
            verifyDiagnostics(diags, [
                { diagnosticMessage: Diagnostics.Cannot_find_module_0, errorTextArguments: ["./moduleFile"] }
            ]);

            host.reloadFS([file1, moduleFile]);
            host.runQueuedTimeoutCallbacks();

            // Make a change to trigger the program rebuild
            const changeRequest = makeSessionRequest<server.protocol.ChangeRequestArgs>(
                server.CommandNames.Change,
                { file: file1.path, line: 1, offset: 44, endLine: 1, endOffset: 44, insertString: "\n" }
            );
            session.executeCommand(changeRequest);

            // Recheck
            diags = session.executeCommand(getErrRequest).response;
            verifyNoDiagnostics(diags);
        });
    });

    describe("Configure file diagnostics events", () => {

        it("are generated when the config file has errors", () => {
            const serverEventManager = new TestServerEventManager();
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {
                        "foo": "bar",
                        "allowJS": true
                    }
                }`
            };

            const host = createServerHost([file, configFile]);
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: serverEventManager.handler
            });
            openFilesForSession([file], session);
            serverEventManager.checkEventCountOfType("configFileDiag", 1);

            for (const event of serverEventManager.events) {
                if (event.eventName === "configFileDiag") {
                    assert.equal(event.data.configFileName, configFile.path);
                    assert.equal(event.data.triggerFile, file.path);
                    return;
                }
            }
        });

        it("are generated when the config file doesn't have errors", () => {
            const serverEventManager = new TestServerEventManager();
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {}
                }`
            };

            const host = createServerHost([file, configFile]);
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: serverEventManager.handler
            });
            openFilesForSession([file], session);
            serverEventManager.checkEventCountOfType("configFileDiag", 1);
        });

        it("are generated when the config file changes", () => {
            const serverEventManager = new TestServerEventManager();
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {}
                }`
            };

            const host = createServerHost([file, configFile]);
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: serverEventManager.handler
            });
            openFilesForSession([file], session);
            serverEventManager.checkEventCountOfType("configFileDiag", 1);

            configFile.content = `{
                "compilerOptions": {
                    "haha": 123
                }
            }`;
            host.reloadFS([file, configFile]);
            host.runQueuedTimeoutCallbacks();
            serverEventManager.checkEventCountOfType("configFileDiag", 2);

            configFile.content = `{
                "compilerOptions": {}
            }`;
            host.reloadFS([file, configFile]);
            host.runQueuedTimeoutCallbacks();
            serverEventManager.checkEventCountOfType("configFileDiag", 3);
        });
    });

    describe("skipLibCheck", () => {
        it("should be turned on for js-only inferred projects", () => {
            const file1 = {
                path: "/a/b/file1.js",
                content: `
                /// <reference path="file2.d.ts" />
                var x = 1;`
            };
            const file2 = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([file1, file2]);
            const session = createSession(host);
            openFilesForSession([file1, file2], session);

            const file2GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: file2.path }
            );
            let errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length === 0);

            const closeFileRequest = makeSessionRequest<protocol.FileRequestArgs>(CommandNames.Close, { file: file1.path });
            session.executeCommand(closeFileRequest);
            errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length !== 0);

            openFilesForSession([file1], session);
            errorResult = <protocol.Diagnostic[]>session.executeCommand(file2GetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });

        it("should be turned on for js-only external projects", () => {
            const jsFile = {
                path: "/a/b/file1.js",
                content: "let x =1;"
            };
            const dTsFile = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([jsFile, dTsFile]);
            const session = createSession(host);

            const openExternalProjectRequest = makeSessionRequest<protocol.OpenExternalProjectArgs>(
                CommandNames.OpenExternalProject,
                {
                    projectFileName: "project1",
                    rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
                    options: {}
                }
            );
            session.executeCommand(openExternalProjectRequest);

            const dTsFileGetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(dTsFileGetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });

        it("should be turned on for js-only external projects with skipLibCheck=false", () => {
            const jsFile = {
                path: "/a/b/file1.js",
                content: "let x =1;"
            };
            const dTsFile = {
                path: "/a/b/file2.d.ts",
                content: `
                interface T {
                    name: string;
                };
                interface T {
                    name: number;
                };`
            };
            const host = createServerHost([jsFile, dTsFile]);
            const session = createSession(host);

            const openExternalProjectRequest = makeSessionRequest<protocol.OpenExternalProjectArgs>(
                CommandNames.OpenExternalProject,
                {
                    projectFileName: "project1",
                    rootFiles: toExternalFiles([jsFile.path, dTsFile.path]),
                    options: { skipLibCheck: false }
                }
            );
            session.executeCommand(openExternalProjectRequest);

            const dTsFileGetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(dTsFileGetErrRequest).response;
            assert.isTrue(errorResult.length === 0);
        });

        it("should not report bind errors for declaration files with skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: "{}"
            };
            const jsFile = {
                path: "/a/jsFile.js",
                content: "let x = 1;"
            };
            const dTsFile1 = {
                path: "/a/dTsFile1.d.ts",
                content: `
                declare var x: number;`
            };
            const dTsFile2 = {
                path: "/a/dTsFile2.d.ts",
                content: `
                declare var x: string;`
            };
            const host = createServerHost([jsconfigFile, jsFile, dTsFile1, dTsFile2]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const dTsFile1GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile1.path }
            );
            const error1Result = <protocol.Diagnostic[]>session.executeCommand(dTsFile1GetErrRequest).response;
            assert.isTrue(error1Result.length === 0);

             const dTsFile2GetErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: dTsFile2.path }
            );
            const error2Result = <protocol.Diagnostic[]>session.executeCommand(dTsFile2GetErrRequest).response;
            assert.isTrue(error2Result.length === 0);
        });

        it("should report semanitc errors for loose JS files with '// @ts-check' and skipLibCheck=true", () => {
            const jsFile = {
                path: "/a/jsFile.js",
                content: `
                // @ts-check
                let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code);
        });

        it("should report semanitc errors for configured js project with '// @ts-check' and skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: "{}"
            };

            const jsFile = {
                path: "/a/jsFile.js",
                content: `
                // @ts-check
                let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsconfigFile, jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code);
        });

        it("should report semanitc errors for configured js project with checkJs=true and skipLibCheck=true", () => {
            const jsconfigFile = {
                path: "/a/jsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {
                        checkJs: true,
                        skipLibCheck: true
                    },
                })
            };
            const jsFile = {
                path: "/a/jsFile.js",
                content: `let x = 1;
                x === "string";`
            };

            const host = createServerHost([jsconfigFile, jsFile]);
            const session = createSession(host);
            openFilesForSession([jsFile], session);

            const getErrRequest = makeSessionRequest<protocol.SemanticDiagnosticsSyncRequestArgs>(
                CommandNames.SemanticDiagnosticsSync,
                { file: jsFile.path }
            );
            const errorResult = <protocol.Diagnostic[]>session.executeCommand(getErrRequest).response;
            assert.isTrue(errorResult.length === 1);
            assert.equal(errorResult[0].code, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2.code);
        });
    });

    describe("non-existing directories listed in config file input array", () => {
        it("should be tolerated without crashing the server", () => {
            const configFile = {
                path: "/a/b/tsconfig.json",
                content: `{
                    "compilerOptions": {},
                    "include": ["app/*", "test/**/*", "something"]
                }`
            };
            const file1 = {
                path: "/a/b/file1.ts",
                content: "let t = 10;"
            };

            const host = createServerHost([file1, configFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);
            host.runQueuedTimeoutCallbacks();
            checkNumberOfConfiguredProjects(projectService, 1);
            checkNumberOfInferredProjects(projectService, 1);

            const configuredProject = configuredProjectAt(projectService, 0);
            checkProjectActualFiles(configuredProject, [configFile.path]);

            const inferredProject = projectService.inferredProjects[0];
            assert.isTrue(inferredProject.containsFile(<server.NormalizedPath>file1.path));
        });

        it("should be able to handle @types if input file list is empty", () => {
            const f = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compiler: {},
                    files: []
                })
            };
            const t1 = {
                path: "/a/node_modules/@types/typings/index.d.ts",
                content: `export * from "./lib"`
            };
            const t2 = {
                path: "/a/node_modules/@types/typings/lib.d.ts",
                content: `export const x: number`
            };
            const host = createServerHost([f, config, t1, t2], { currentDirectory: getDirectoryPath(f.path) });
            const projectService = createProjectService(host);

            projectService.openClientFile(f.path);
            projectService.checkNumberOfProjects({ configuredProjects: 1, inferredProjects: 1 });
        });
    });

    describe("reload", () => {
        it("should work with temp file", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let x = 1"
            };
            const tmp = {
                path: "/a/b/app.tmp",
                content: "const y = 42"
            };
            const host = createServerHost([f1, tmp]);
            const session = createSession(host);

            // send open request
            session.executeCommand(<server.protocol.OpenRequest>{
                type: "request",
                command: "open",
                seq: 1,
                arguments: { file: f1.path }
            });

            // reload from tmp file
            session.executeCommand(<server.protocol.ReloadRequest>{
                type: "request",
                command: "reload",
                seq: 2,
                arguments: { file: f1.path, tmpfile: tmp.path }
            });

            // verify content
            const projectServiice = session.getProjectService();
            const snap1 = projectServiice.getScriptInfo(f1.path).getSnapshot();
            assert.equal(snap1.getText(0, snap1.getLength()), tmp.content, "content should be equal to the content of temp file");

            // reload from original file file
            session.executeCommand(<server.protocol.ReloadRequest>{
                type: "request",
                command: "reload",
                seq: 2,
                arguments: { file: f1.path }
            });

            // verify content
            const snap2 = projectServiice.getScriptInfo(f1.path).getSnapshot();
            assert.equal(snap2.getText(0, snap2.getLength()), f1.content, "content should be equal to the content of original file");

        });
    });

    describe("Inferred projects", () => {
        it("should support files without extensions", () => {
            const f = {
                path: "/a/compile",
                content: "let x = 1"
            };
            const host = createServerHost([f]);
            const session = createSession(host);
            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                seq: 1,
                type: "request",
                command: "compilerOptionsForInferredProjects",
                arguments: {
                    options: {
                        allowJs: true
                    }
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 2,
                type: "request",
                command: "open",
                arguments: {
                    file: f.path,
                    fileContent: f.content,
                    scriptKindName: "JS"
                }
            });
            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            checkProjectActualFiles(projectService.inferredProjects[0], [f.path]);
        });

        it("inferred projects per project root", () => {
            const file1 = { path: "/a/file1.ts", content: "let x = 1;", projectRootPath: "/a" };
            const file2 = { path: "/a/file2.ts", content: "let y = 2;", projectRootPath: "/a" };
            const file3 = { path: "/b/file2.ts", content: "let x = 3;", projectRootPath: "/b" };
            const file4 = { path: "/c/file3.ts", content: "let z = 4;" };
            const host = createServerHost([file1, file2, file3, file4]);
            const session = createSession(host, {
                useSingleInferredProject: true,
                useInferredProjectPerProjectRoot: true
            });
            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                seq: 1,
                type: "request",
                command: CommandNames.CompilerOptionsForInferredProjects,
                arguments: {
                    options: {
                        allowJs: true,
                        target: ScriptTarget.ESNext
                    }
                }
            });
            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                seq: 2,
                type: "request",
                command: CommandNames.CompilerOptionsForInferredProjects,
                arguments: {
                    options: {
                        allowJs: true,
                        target: ScriptTarget.ES2015
                    },
                    projectRootPath: "/b"
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 3,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file1.path,
                    fileContent: file1.content,
                    scriptKindName: "JS",
                    projectRootPath: file1.projectRootPath
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 4,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file2.path,
                    fileContent: file2.content,
                    scriptKindName: "JS",
                    projectRootPath: file2.projectRootPath
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 5,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file3.path,
                    fileContent: file3.content,
                    scriptKindName: "JS",
                    projectRootPath: file3.projectRootPath
                }
            });
            session.executeCommand(<server.protocol.OpenRequest>{
                seq: 6,
                type: "request",
                command: CommandNames.Open,
                arguments: {
                    file: file4.path,
                    fileContent: file4.content,
                    scriptKindName: "JS"
                }
            });

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 3 });
            checkProjectActualFiles(projectService.inferredProjects[0], [file4.path]);
            checkProjectActualFiles(projectService.inferredProjects[1], [file1.path, file2.path]);
            checkProjectActualFiles(projectService.inferredProjects[2], [file3.path]);
            assert.equal(projectService.inferredProjects[0].getCompilerOptions().target, ScriptTarget.ESNext);
            assert.equal(projectService.inferredProjects[1].getCompilerOptions().target, ScriptTarget.ESNext);
            assert.equal(projectService.inferredProjects[2].getCompilerOptions().target, ScriptTarget.ES2015);
        });
    });

    describe("No overwrite emit error", () => {
        it("for inferred project", () => {
            const f1 = {
                path: "/a/b/f1.js",
                content: "function test1() { }"
            };
            const host = createServerHost([f1, libFile]);
            const session = createSession(host);
            openFilesForSession([f1], session);

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { inferredProjects: 1 });
            const projectName = projectService.inferredProjects[0].getProjectName();

            const diags = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName: projectName }
            }).response;
            assert.isTrue(diags.length === 0);

            session.executeCommand(<server.protocol.SetCompilerOptionsForInferredProjectsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsForInferredProjects,
                seq: 3,
                arguments: { options: { module: ModuleKind.CommonJS } }
            });
            const diagsAfterUpdate = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 4,
                arguments: { projectFileName: projectName }
            }).response;
            assert.isTrue(diagsAfterUpdate.length === 0);
        });

        it("for external project", () => {
            const f1 = {
                path: "/a/b/f1.js",
                content: "function test1() { }"
            };
            const host = createServerHost([f1, libFile]);
            const session = createSession(host);
            const projectService = session.getProjectService();
            const projectFileName = "/a/b/project.csproj";
            const externalFiles = toExternalFiles([f1.path]);
            projectService.openExternalProject(<protocol.ExternalProject>{
                projectFileName,
                rootFiles: externalFiles,
                options: {}
            });

            checkNumberOfProjects(projectService, { externalProjects: 1 });

            const diags = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 2,
                arguments: { projectFileName }
            }).response;
            assert.isTrue(diags.length === 0);

            session.executeCommand(<server.protocol.OpenExternalProjectRequest>{
                type: "request",
                command: server.CommandNames.OpenExternalProject,
                seq: 3,
                arguments: {
                    projectFileName,
                    rootFiles: externalFiles,
                    options: { module: ModuleKind.CommonJS }
                }
            });
            const diagsAfterUpdate = session.executeCommand(<server.protocol.CompilerOptionsDiagnosticsRequest>{
                type: "request",
                command: server.CommandNames.CompilerOptionsDiagnosticsFull,
                seq: 4,
                arguments: { projectFileName }
            }).response;
            assert.isTrue(diagsAfterUpdate.length === 0);
        });
    });

    describe("emit with outFile or out setting", () => {
        function test(opts: CompilerOptions, expectedUsesOutFile: boolean) {
            const f1 = {
                path: "/a/a.ts",
                content: "let x = 1"
            };
            const f2 = {
                path: "/a/b.ts",
                content: "let y = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: opts,
                    compileOnSave: true
                })
            };
            const host = createServerHost([f1, f2, config]);
            const session = createSession(host);
            session.executeCommand(<protocol.OpenRequest>{
                seq: 1,
                type: "request",
                command: "open",
                arguments: { file: f1.path }
            });
            checkNumberOfProjects(session.getProjectService(), { configuredProjects: 1 });
            const { response } = session.executeCommand(<protocol.CompileOnSaveAffectedFileListRequest>{
                seq: 2,
                type: "request",
                command: "compileOnSaveAffectedFileList",
                arguments: { file: f1.path }
            });
            assert.equal((<protocol.CompileOnSaveAffectedFileListSingleProject[]>response).length, 1, "expected output for 1 project");
            assert.equal((<protocol.CompileOnSaveAffectedFileListSingleProject[]>response)[0].fileNames.length, 2, "expected output for 1 project");
            assert.equal((<protocol.CompileOnSaveAffectedFileListSingleProject[]>response)[0].projectUsesOutFile, expectedUsesOutFile, "usesOutFile");
        }

        it("projectUsesOutFile should not be returned if not set", () => {
            test({}, /*expectedUsesOutFile*/ false);
        });
        it("projectUsesOutFile should be true if outFile is set", () => {
            test({ outFile: "/a/out.js" }, /*expectedUsesOutFile*/ true);
        });
        it("projectUsesOutFile should be true if out is set", () => {
            test({ out: "/a/out.js" }, /*expectedUsesOutFile*/ true);
        });
    });

    describe("import helpers", () => {
        it("should not crash in tsserver", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "export async function foo() { return 100; }"
            };
            const tslib = {
                path: "/a/node_modules/tslib/index.d.ts",
                content: ""
            };
            const host = createServerHost([f1, tslib]);
            const service = createProjectService(host);
            service.openExternalProject({ projectFileName: "p", rootFiles: [toExternalFile(f1.path)], options: { importHelpers: true } });
            service.checkNumberOfProjects({ externalProjects: 1 });
        });
    });

    describe("searching for config file", () => {
        it("should stop at projectRootPath if given", () => {
            const f1 = {
                path: "/a/file1.ts",
                content: ""
            };
            const configFile = {
                path: "/tsconfig.json",
                content: "{}"
            };
            const host = createServerHost([f1, configFile]);
            const service = createProjectService(host);
            service.openClientFile(f1.path, /*fileContent*/ undefined, /*scriptKind*/ undefined, "/a");

            checkNumberOfConfiguredProjects(service, 0);
            checkNumberOfInferredProjects(service, 1);

            service.closeClientFile(f1.path);
            service.openClientFile(f1.path);
            checkNumberOfConfiguredProjects(service, 1);
            checkNumberOfInferredProjects(service, 0);
        });
    });

    describe("cancellationToken", () => {
        it("is attached to request", () => {
            const f1 = {
                path: "/a/b/app.ts",
                content: "let xyz = 1;"
            };
            const host = createServerHost([f1]);
            let expectedRequestId: number;
            const cancellationToken: server.ServerCancellationToken = {
                isCancellationRequested: () => false,
                setRequest: requestId => {
                    if (expectedRequestId === undefined) {
                        assert.isTrue(false, "unexpected call");
                    }
                    assert.equal(requestId, expectedRequestId);
                },
                resetRequest: noop
            };

            const session = createSession(host, { cancellationToken });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.OpenRequest>{
                command: "open",
                arguments: { file: f1.path }
            });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.GeterrRequest>{
                command: "geterr",
                arguments: { files: [f1.path] }
            });

            expectedRequestId = session.getNextSeq();
            session.executeCommandSeq(<server.protocol.OccurrencesRequest>{
                command: "occurrences",
                arguments: { file: f1.path, line: 1, offset: 6 }
            });

            expectedRequestId = 2;
            host.runQueuedImmediateCallbacks();
            expectedRequestId = 2;
            host.runQueuedImmediateCallbacks();
        });

        it("Geterr is cancellable", () => {
            const f1 = {
                path: "/a/app.ts",
                content: "let x = 1"
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {}
                })
            };

            const cancellationToken = new TestServerCancellationToken();
            const host = createServerHost([f1, config]);
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: () => { },
                cancellationToken
            });
            {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: "open",
                    arguments: { file: f1.path }
                });
                // send geterr for missing file
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: ["/a/missing"] }
                });
                // no files - expect 'completed' event
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(session.getSeq(), 0);
            }
            {
                const getErrId = session.getNextSeq();
                // send geterr for a valid file
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });

                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run new request
                session.executeCommandSeq(<protocol.ProjectInfoRequest>{
                    command: "projectInfo",
                    arguments: { file: f1.path }
                });
                host.clearOutput();

                // cancel previously issued Geterr
                cancellationToken.setRequestToCancel(getErrId);
                host.runQueuedTimeoutCallbacks();

                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(getErrId, 0);

                cancellationToken.resetToken();
            }
            {
                const getErrId = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                host.clearOutput();

                cancellationToken.setRequestToCancel(getErrId);
                host.runQueuedImmediateCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                verifyRequestCompleted(getErrId, 0);

                cancellationToken.resetToken();
            }
            {
                const getErrId = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");

                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                host.clearOutput();

                // the semanticDiag message
                host.runQueuedImmediateCallbacks();
                assert.equal(host.getOutput().length, 2, "expect 2 messages");
                const e2 = <protocol.Event>getMessage(0);
                assert.equal(e2.event, "semanticDiag");
                verifyRequestCompleted(getErrId, 1);

                cancellationToken.resetToken();
            }
            {
                const getErr1 = session.getNextSeq();
                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                assert.equal(host.getOutput().length, 0, "expect 0 messages");
                // run first step
                host.runQueuedTimeoutCallbacks();
                assert.equal(host.getOutput().length, 1, "expect 1 message");
                const e1 = <protocol.Event>getMessage(0);
                assert.equal(e1.event, "syntaxDiag");
                host.clearOutput();

                session.executeCommandSeq(<protocol.GeterrRequest>{
                    command: "geterr",
                    arguments: { files: [f1.path] }
                });
                // make sure that getErr1 is completed
                verifyRequestCompleted(getErr1, 0);
            }

            function verifyRequestCompleted(expectedSeq: number, n: number) {
                const event = <protocol.RequestCompletedEvent>getMessage(n);
                assert.equal(event.event, "requestCompleted");
                assert.equal(event.body.request_seq, expectedSeq, "expectedSeq");
                host.clearOutput();
            }

            function getMessage(n: number) {
                return JSON.parse(server.extractMessage(host.getOutput()[n]));
            }
        });
        it("Lower priority tasks are cancellable", () => {
            const f1 = {
                path: "/a/app.ts",
                content: `{ let x = 1; } var foo = "foo"; var bar = "bar"; var fooBar = "fooBar";`
            };
            const config = {
                path: "/a/tsconfig.json",
                content: JSON.stringify({
                    compilerOptions: {}
                })
            };
            const cancellationToken = new TestServerCancellationToken(/*cancelAfterRequest*/ 3);
            const host = createServerHost([f1, config]);
            const session = createSession(host, {
                canUseEvents: true,
                eventHandler: () => { },
                cancellationToken,
                throttleWaitMilliseconds: 0
            });
            {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: "open",
                    arguments: { file: f1.path }
                });

                // send navbar request (normal priority)
                session.executeCommandSeq(<protocol.NavBarRequest>{
                    command: "navbar",
                    arguments: { file: f1.path }
                });

                // ensure the nav bar request can be canceled
                verifyExecuteCommandSeqIsCancellable(<protocol.NavBarRequest>{
                    command: "navbar",
                    arguments: { file: f1.path }
                });

                // send outlining spans request (normal priority)
                session.executeCommandSeq(<protocol.OutliningSpansRequest>{
                    command: "outliningSpans",
                    arguments: { file: f1.path }
                });

                // ensure the outlining spans request can be canceled
                verifyExecuteCommandSeqIsCancellable(<protocol.OutliningSpansRequest>{
                    command: "outliningSpans",
                    arguments: { file: f1.path }
                });
            }

            function verifyExecuteCommandSeqIsCancellable<T extends server.protocol.Request>(request: Partial<T>) {
                // Set the next request to be cancellable
                // The cancellation token will cancel the request the third time
                // isCancellationRequested() is called.
                cancellationToken.setRequestToCancel(session.getNextSeq());
                let operationCanceledExceptionThrown = false;

                try {
                    session.executeCommandSeq(request);
                }
                catch (e) {
                    assert(e instanceof OperationCanceledException);
                    operationCanceledExceptionThrown = true;
                }
                assert(operationCanceledExceptionThrown, "Operation Canceled Exception not thrown for request: " + JSON.stringify(request));
            }
        });
    });

    describe("occurence highlight on string", () => {
        it("should be marked if only on string values", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.ts",
                content: `let t1 = "div";\nlet t2 = "div";\nlet t3 = { "div": 123 };\nlet t4 = t3["div"];`
            };

            const host = createServerHost([file1]);
            const session = createSession(host);
            const projectService = session.getProjectService();

            projectService.openClientFile(file1.path);
            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 1, offset: 11 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                const firstOccurence = highlightResponse[0];
                assert.isTrue(firstOccurence.isInString, "Highlights should be marked with isInString");
            }

            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 3, offset: 13 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                assert.isTrue(highlightResponse.length === 2);
                const firstOccurence = highlightResponse[0];
                assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on property name");
            }

            {
                const highlightRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(
                    CommandNames.Occurrences,
                    { file: file1.path, line: 4, offset: 14 }
                );
                const highlightResponse = session.executeCommand(highlightRequest).response as protocol.OccurrencesResponseItem[];
                assert.isTrue(highlightResponse.length === 2);
                const firstOccurence = highlightResponse[0];
                assert.isUndefined(firstOccurence.isInString, "Highlights should not be marked with isInString if on indexer");
            }
        });
    });

    describe("maxNodeModuleJsDepth for inferred projects", () => {
        it("should be set to 2 if the project has js root files", () => {
            const file1: FileOrFolder = {
                path: "/a/b/file1.js",
                content: `var t = require("test"); t.`
            };
            const moduleFile: FileOrFolder = {
                path: "/a/b/node_modules/test/index.js",
                content: `var v = 10; module.exports = v;`
            };

            const host = createServerHost([file1, moduleFile]);
            const projectService = createProjectService(host);
            projectService.openClientFile(file1.path);

            let project = projectService.inferredProjects[0];
            let options = project.getCompilerOptions();
            assert.isTrue(options.maxNodeModuleJsDepth === 2);

            // Assert the option sticks
            projectService.setCompilerOptionsForInferredProjects({ target: ScriptTarget.ES2016 });
            project = projectService.inferredProjects[0];
            options = project.getCompilerOptions();
            assert.isTrue(options.maxNodeModuleJsDepth === 2);
        });

        it("should return to normal state when all js root files are removed from project", () => {
            const file1 = {
                path: "/a/file1.ts",
                content: "let x =1;"
            };
            const file2 = {
                path: "/a/file2.js",
                content: "let x =1;"
            };

            const host = createServerHost([file1, file2, libFile]);
            const projectService = createProjectService(host, { useSingleInferredProject: true });

            projectService.openClientFile(file1.path);
            checkNumberOfInferredProjects(projectService, 1);
            let project = projectService.inferredProjects[0];
            assert.isUndefined(project.getCompilerOptions().maxNodeModuleJsDepth);

            projectService.openClientFile(file2.path);
            project = projectService.inferredProjects[0];
            assert.isTrue(project.getCompilerOptions().maxNodeModuleJsDepth === 2);

            projectService.closeClientFile(file2.path);
            project = projectService.inferredProjects[0];
            assert.isUndefined(project.getCompilerOptions().maxNodeModuleJsDepth);
        });
    });

    describe("Options Diagnostic locations reported correctly with changes in configFile contents", () => {
        it("when options change", () => {
            const file = {
                path: "/a/b/app.ts",
                content: "let x = 10"
            };
            const configFileContentBeforeComment = `{`;
            const configFileContentComment = `
                // comment`;
            const configFileContentAfterComment = `
                "compilerOptions": {
                    "allowJs": true,
                    "declaration": true
                }
            }`;
            const configFileContentWithComment = configFileContentBeforeComment + configFileContentComment + configFileContentAfterComment;
            const configFileContentWithoutCommentLine = configFileContentBeforeComment + configFileContentAfterComment;

            const configFile = {
                path: "/a/b/tsconfig.json",
                content: configFileContentWithComment
            };
            const host = createServerHost([file, libFile, configFile]);
            const session = createSession(host);
            openFilesForSession([file], session);

            const projectService = session.getProjectService();
            checkNumberOfProjects(projectService, { configuredProjects: 1 });
            const projectName = configuredProjectAt(projectService, 0).getProjectName();

            const diags = session.executeCommand(<server.protocol.SemanticDiagnosticsSyncRequest>{
                type: "request",
                command: server.CommandNames.SemanticDiagnosticsSync,
                seq: 2,
                arguments: { file: configFile.path, projectFileName: projectName, includeLinePosition: true }
            }).response;
            assert.isTrue(diags.length === 2);

            configFile.content = configFileContentWithoutCommentLine;
            host.reloadFS([file, configFile]);

            const diagsAfterEdit = session.executeCommand(<server.protocol.SemanticDiagnosticsSyncRequest>{
                type: "request",
                command: server.CommandNames.SemanticDiagnosticsSync,
                seq: 2,
                arguments: { file: configFile.path, projectFileName: projectName, includeLinePosition: true }
            }).response;
            assert.isTrue(diagsAfterEdit.length === 2);

            verifyDiagnostic(diags[0], diagsAfterEdit[0]);
            verifyDiagnostic(diags[1], diagsAfterEdit[1]);

            function verifyDiagnostic(beforeEditDiag: server.protocol.DiagnosticWithLinePosition, afterEditDiag: server.protocol.DiagnosticWithLinePosition) {
                assert.equal(beforeEditDiag.message, afterEditDiag.message);
                assert.equal(beforeEditDiag.code, afterEditDiag.code);
                assert.equal(beforeEditDiag.category, afterEditDiag.category);
                assert.equal(beforeEditDiag.startLocation.line, afterEditDiag.startLocation.line + 1);
                assert.equal(beforeEditDiag.startLocation.offset, afterEditDiag.startLocation.offset);
                assert.equal(beforeEditDiag.endLocation.line, afterEditDiag.endLocation.line + 1);
                assert.equal(beforeEditDiag.endLocation.offset, afterEditDiag.endLocation.offset);
            }
        });
    });

    describe("CachingFileSystemInformation", () => {
        type CalledMaps = {
            fileExists: MultiMap<true>;
            directoryExists: MultiMap<true>;
            getDirectories: MultiMap<true>;
            readFile: MultiMap<true>;
            readDirectory: MultiMap<[ReadonlyArray<string>, ReadonlyArray<string>, ReadonlyArray<string>, number]>;
        };

        function createCallsTrackingHost(host: TestServerHost) {
            const keys: Array<keyof CalledMaps> = ["fileExists", "directoryExists", "getDirectories", "readFile", "readDirectory"];
            const calledMaps = getCallsTrackingMap();
            return {
                verifyNoCall,
                verifyCalledOnEachEntryOnce,
                verifyCalledOnEachEntry,
                verifyNoHostCalls,
                verifyNoHostCallsExceptFileExistsOnce,
                clear
            };

            function getCallsTrackingMap() {
                const calledMaps: { [s: string]: Map<any> } = {};
                for (let i = 0; i < keys.length - 1; i++) {
                    setCallsTrackingWithSingleArgFn(keys[i]);
                }
                setCallsTrackingWithFiveArgFn(keys[keys.length - 1]);
                return calledMaps as CalledMaps;

                function setCallsTrackingWithSingleArgFn(prop: keyof CalledMaps) {
                    const calledMap = createMultiMap<true>();
                    const cb = (<any>host)[prop].bind(host);
                    (<any>host)[prop] = (f: string) => {
                        calledMap.add(f, /*value*/ true);
                        return cb(f);
                    };
                    calledMaps[prop] = calledMap;
                }

                function setCallsTrackingWithFiveArgFn<U, V, W, X>(prop: keyof CalledMaps) {
                    const calledMap = createMultiMap<[U, V, W, X]>();
                    const cb = (<any>host)[prop].bind(host);
                    (<any>host)[prop] = (f: string, arg1?: U, arg2?: V, arg3?: W, arg4?: X) => {
                        calledMap.add(f, [arg1, arg2, arg3, arg4]);
                        return cb(f, arg1, arg2, arg3, arg4);
                    };
                    calledMaps[prop] = calledMap;
                }
            }

            function verifyNoCall(callback: keyof CalledMaps) {
                const calledMap = calledMaps[callback];
                assert.equal(calledMap.size, 0, `${callback} shouldnt be called: ${arrayFrom(calledMap.keys())}`);
            }

            function verifyCalledOnEachEntry(callback: keyof CalledMaps, expectedKeys: Map<number>) {
                const calledMap = calledMaps[callback];
                assert.equal(calledMap.size, expectedKeys.size, `${callback}: incorrect size of map: Actual keys: ${arrayFrom(calledMap.keys())} Expected: ${arrayFrom(expectedKeys.keys())}`);
                expectedKeys.forEach((called, name) => {
                    assert.isTrue(calledMap.has(name), `${callback} is expected to contain ${name}, actual keys: ${arrayFrom(calledMap.keys())}`);
                    assert.equal(calledMap.get(name).length, called, `${callback} is expected to be called ${called} times with ${name}. Actual entry: ${calledMap.get(name)}`);
                });
            }

            function verifyCalledOnEachEntryOnce(callback: keyof CalledMaps, expectedKeys: string[]) {
                return verifyCalledOnEachEntry(callback, zipToMap(expectedKeys, expectedKeys.map(() => 1)));
            }

            function verifyNoHostCalls() {
                for (const key of keys) {
                    verifyNoCall(key);
                }
            }

            function verifyNoHostCallsExceptFileExistsOnce(expectedKeys: string[]) {
                verifyCalledOnEachEntryOnce("fileExists", expectedKeys);
                verifyNoCall("directoryExists");
                verifyNoCall("getDirectories");
                verifyNoCall("readFile");
                verifyNoCall("readDirectory");
            }

            function clear() {
                for (const key of keys) {
                    calledMaps[key].clear();
                }
            }
        }

        it("when calling goto definition of module", () => {
            const clientFile: FileOrFolder = {
                path: "/a/b/controllers/vessels/client.ts",
                content: `
                    import { Vessel } from '~/models/vessel';
                    const v = new Vessel();
                `
            };
            const anotherModuleFile: FileOrFolder = {
                path: "/a/b/utils/db.ts",
                content: "export class Bookshelf { }"
            };
            const moduleFile: FileOrFolder = {
                path: "/a/b/models/vessel.ts",
                content: `
                    import { Bookshelf } from '~/utils/db';
                    export class Vessel extends Bookshelf {}
                `
            };
            const tsconfigFile: FileOrFolder = {
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

            const project = projectService.configuredProjects.get(tsconfigFile.path);
            checkProjectActualFiles(project, map(projectFiles, f => f.path));

            const callsTrackingHost = createCallsTrackingHost(host);

            // Get definitions shouldnt make host requests
            const getDefinitionRequest = makeSessionRequest<protocol.FileLocationRequestArgs>(protocol.CommandTypes.Definition, {
                file: clientFile.path,
                position: clientFile.content.indexOf("/vessel") + 1,
                line: undefined,
                offset: undefined
            });
            const { response } = session.executeCommand(getDefinitionRequest);
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
                const canonicalFrontendDir = useCaseSensitiveFileNames ? frontendDir : frontendDir.toLowerCase();
                const file1: FileOrFolder = {
                    path: `${frontendDir}/src/app/utils/Analytic.ts`,
                    content: "export class SomeClass { };"
                };
                const file2: FileOrFolder = {
                    path: `${frontendDir}/src/app/redux/configureStore.ts`,
                    content: "export class configureStore { }"
                };
                const file3: FileOrFolder = {
                    path: `${frontendDir}/src/app/utils/Cookie.ts`,
                    content: "export class Cookie { }"
                };
                const es2016LibFile: FileOrFolder = {
                    path: "/a/lib/lib.es2016.full.d.ts",
                    content: libFile.content
                };
                const tsconfigFile: FileOrFolder = {
                    path: `${frontendDir}/tsconfig.json`,
                    content: JSON.stringify({
                        "compilerOptions": {
                            "strict": true,
                            "strictNullChecks": true,
                            "target": "es2016",
                            "module": "commonjs",
                            "moduleResolution": "node",
                            "sourceMap": true,
                            "noEmitOnError": true,
                            "experimentalDecorators": true,
                            "emitDecoratorMetadata": true,
                            "types": [
                                "node",
                                "jest"
                            ],
                            "noUnusedLocals": true,
                            "outDir": "./compiled",
                            "typeRoots": [
                                "types",
                                "node_modules/@types"
                            ],
                            "baseUrl": ".",
                            "paths": {
                                "*": [
                                    "types/*"
                                ]
                            }
                        },
                        "include": [
                            "src/**/*"
                        ],
                        "exclude": [
                            "node_modules",
                            "compiled"
                        ]
                    })
                };
                const projectFiles = [file1, file2, es2016LibFile, tsconfigFile];
                const host = createServerHost(projectFiles, { useCaseSensitiveFileNames });
                const projectService = createProjectService(host);
                const canonicalConfigPath = useCaseSensitiveFileNames ? tsconfigFile.path : tsconfigFile.path.toLowerCase();
                const { configFileName } = projectService.openClientFile(file1.path);
                assert.equal(configFileName, tsconfigFile.path, `should find config`);
                checkNumberOfConfiguredProjects(projectService, 1);

                const project = projectService.configuredProjects.get(canonicalConfigPath);
                verifyProjectAndWatchedDirectories();

                const callsTrackingHost = createCallsTrackingHost(host);

                // Create file cookie.ts
                projectFiles.push(file3);
                host.reloadFS(projectFiles);
                host.runQueuedTimeoutCallbacks();

                const canonicalFile3Path = useCaseSensitiveFileNames ? file3.path : file3.path.toLocaleLowerCase();
                callsTrackingHost.verifyCalledOnEachEntryOnce("fileExists", [canonicalFile3Path]);

                // Called for type root resolution
                const directoryExistsCalled = createMap<number>();
                for (let dir = frontendDir; dir !== "/"; dir = getDirectoryPath(dir)) {
                    directoryExistsCalled.set(`${dir}/node_modules`, 2);
                }
                directoryExistsCalled.set(`/node_modules`, 2);
                directoryExistsCalled.set(`${frontendDir}/types`, 2);
                directoryExistsCalled.set(`${frontendDir}/node_modules/@types`, 2);
                directoryExistsCalled.set(canonicalFile3Path, 1);
                callsTrackingHost.verifyCalledOnEachEntry("directoryExists", directoryExistsCalled);

                callsTrackingHost.verifyNoCall("getDirectories");
                callsTrackingHost.verifyCalledOnEachEntryOnce("readFile", [file3.path]);
                callsTrackingHost.verifyNoCall("readDirectory");

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

                function verifyProjectAndWatchedDirectories() {
                    checkProjectActualFiles(project, map(projectFiles, f => f.path));
                    checkWatchedDirectories(host, [`${canonicalFrontendDir}/src`], /*recursive*/ true);
                    checkWatchedDirectories(host, [`${canonicalFrontendDir}/types`, `${canonicalFrontendDir}/node_modules/@types`], /*recursive*/ false);
                }
            }

            it("case insensitive file system", () => {
                verifyWatchDirectoriesCaseSensitivity(/*useCaseSensitiveFileNames*/ false);
            });

            it("case sensitive file system", () => {
                verifyWatchDirectoriesCaseSensitivity(/*useCaseSensitiveFileNames*/ true);
            });
        });

        describe("Verify npm install in directory with tsconfig file works when", () => {
            function verifyNpmInstall(timeoutDuringPartialInstallation: boolean) {
                const app: FileOrFolder = {
                    path: "/a/b/app.ts",
                    content: "import _ from 'lodash';"
                };
                const tsconfigJson: FileOrFolder = {
                    path: "/a/b/tsconfig.json",
                    content: '{ "compilerOptions": { } }'
                };
                const packageJson: FileOrFolder = {
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
                };
                const appFolder = getDirectoryPath(app.path);
                const projectFiles = [app, libFile, tsconfigJson];
                const otherFiles = [packageJson];
                const host = createServerHost(projectFiles.concat(otherFiles));
                const projectService = createProjectService(host);
                const { configFileName } = projectService.openClientFile(app.path);
                assert.equal(configFileName, tsconfigJson.path, `should find config`);
                const watchedModuleLocations = getNodeModulesWatchedDirectories(appFolder, "lodash");
                verifyProject();

                let timeoutAfterReloadFs = timeoutDuringPartialInstallation;

                // Simulate npm install
                const filesAndFoldersToAdd: FileOrFolder[] = [
                    { "path": "/a/b/node_modules" },
                    { "path": "/a/b/node_modules/.staging/@types" },
                    { "path": "/a/b/node_modules/.staging/lodash-b0733faa" },
                    { "path": "/a/b/node_modules/.staging/@types/lodash-e56c4fe7" },
                    { "path": "/a/b/node_modules/.staging/symbol-observable-24bcbbff" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61" },
                    { "path": "/a/b/node_modules/.staging/typescript-8493ea5d" },
                    { "path": "/a/b/node_modules/.staging/symbol-observable-24bcbbff/package.json", "content": "{\n  \"name\": \"symbol-observable\",\n  \"version\": \"1.0.4\",\n  \"description\": \"Symbol.observable ponyfill\",\n  \"license\": \"MIT\",\n  \"repository\": \"blesh/symbol-observable\",\n  \"author\": {\n    \"name\": \"Ben Lesh\",\n    \"email\": \"ben@benlesh.com\"\n  },\n  \"engines\": {\n    \"node\": \">=0.10.0\"\n  },\n  \"scripts\": {\n    \"test\": \"npm run build && mocha && tsc ./ts-test/test.ts && node ./ts-test/test.js && check-es3-syntax -p lib/ --kill\",\n    \"build\": \"babel es --out-dir lib\",\n    \"prepublish\": \"npm test\"\n  },\n  \"files\": [\n    \"" },
                    { "path": "/a/b/node_modules/.staging/lodash-b0733faa/package.json", "content": "{\n  \"name\": \"lodash\",\n  \"version\": \"4.17.4\",\n  \"description\": \"Lodash modular utilities.\",\n  \"keywords\": \"modules, stdlib, util\",\n  \"homepage\": \"https://lodash.com/\",\n  \"repository\": \"lodash/lodash\",\n  \"icon\": \"https://lodash.com/icon.svg\",\n  \"license\": \"MIT\",\n  \"main\": \"lodash.js\",\n  \"author\": \"John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)\",\n  \"contributors\": [\n    \"John-David Dalton <john.david.dalton@gmail.com> (http://allyoucanleet.com/)\",\n    \"Mathias Bynens <mathias@qiwi." },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/package.json", "content": "{\n  \"name\": \"rxjs\",\n  \"version\": \"5.4.3\",\n  \"description\": \"Reactive Extensions for modern JavaScript\",\n  \"main\": \"Rx.js\",\n  \"config\": {\n    \"commitizen\": {\n      \"path\": \"cz-conventional-changelog\"\n    }\n  },\n  \"lint-staged\": {\n    \"*.@(js)\": [\n      \"eslint --fix\",\n      \"git add\"\n    ],\n    \"*.@(ts)\": [\n      \"tslint --fix\",\n      \"git add\"\n    ]\n  },\n  \"scripts-info\": {\n    \"info\": \"List available script\",\n    \"build_all\": \"Build all packages (ES6, CJS, UMD) and generate packages\",\n    \"build_cjs\": \"Build CJS package with clean up existing build, copy source into dist\",\n    \"build_es6\": \"Build ES6 package with clean up existing build, copy source into dist\",\n    \"build_closure_core\": \"Minify Global core build using closure compiler\",\n    \"build_global\": \"Build Global package, then minify build\",\n    \"build_perf\": \"Build CJS & Global build, run macro performance test\",\n    \"build_test\": \"Build CJS package & test spec, execute mocha test runner\",\n    \"build_cover\": \"Run lint to current code, build CJS & test spec, execute test coverage\",\n    \"build_docs\": \"Build ES6 & global package, create documentation using it\",\n    \"build_spec\": \"Build test specs\",\n    \"check_circular_dependencies\": \"Check codebase has circular dependencies\",\n    \"clean_spec\": \"Clean up existing test spec build output\",\n    \"clean_dist_cjs\": \"Clean up existing CJS package output\",\n    \"clean_dist_es6\": \"Clean up existing ES6 package output\",\n    \"clean_dist_global\": \"Clean up existing Global package output\",\n    \"commit\": \"Run git commit wizard\",\n    \"compile_dist_cjs\": \"Compile codebase into CJS module\",\n    \"compile_module_es6\": \"Compile codebase into ES6\",\n    \"cover\": \"Execute test coverage\",\n    \"lint_perf\": \"Run lint against performance test suite\",\n    \"lint_spec\": \"Run lint against test spec\",\n    \"lint_src\": \"Run lint against source\",\n    \"lint\": \"Run lint against everything\",\n    \"perf\": \"Run macro performance benchmark\",\n    \"perf_micro\": \"Run micro performance benchmark\",\n    \"test_mocha\": \"Execute mocha test runner against existing test spec build\",\n    \"test_browser\": \"Execute mocha test runner on browser against existing test spec build\",\n    \"test\": \"Clean up existing test spec build, build test spec and execute mocha test runner\",\n    \"tests2png\": \"Generate marble diagram image from test spec\",\n    \"watch\": \"Watch codebase, trigger compile when source code changes\"\n  },\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git@github.com:ReactiveX/RxJS.git\"\n  },\n  \"keywords\": [\n    \"Rx\",\n    \"RxJS\",\n    \"ReactiveX\",\n    \"ReactiveExtensions\",\n    \"Streams\",\n    \"Observables\",\n    \"Observable\",\n    \"Stream\",\n    \"ES6\",\n    \"ES2015\"\n  ],\n  \"author\": \"Ben Lesh <ben@benlesh.com>\",\n  \"contributors\": [\n    {\n      \"name\": \"Ben Lesh\",\n      \"email\": \"ben@benlesh.com\"\n    },\n    {\n      \"name\": \"Paul Taylor\",\n      \"email\": \"paul.e.taylor@me.com\"\n    },\n    {\n      \"name\": \"Jeff Cross\",\n      \"email\": \"crossj@google.com\"\n    },\n    {\n      \"name\": \"Matthew Podwysocki\",\n      \"email\": \"matthewp@microsoft.com\"\n    },\n    {\n      \"name\": \"OJ Kwon\",\n      \"email\": \"kwon.ohjoong@gmail.com\"\n    },\n    {\n      \"name\": \"Andre Staltz\",\n      \"email\": \"andre@staltz.com\"\n    }\n  ],\n  \"license\": \"Apache-2.0\",\n  \"bugs\": {\n    \"url\": \"https://github.com/ReactiveX/RxJS/issues\"\n  },\n  \"homepage\": \"https://github.com/ReactiveX/RxJS\",\n  \"devDependencies\": {\n    \"babel-polyfill\": \"^6.23.0\",\n    \"benchmark\": \"^2.1.0\",\n    \"benchpress\": \"2.0.0-beta.1\",\n    \"chai\": \"^3.5.0\",\n    \"color\": \"^0.11.1\",\n    \"colors\": \"1.1.2\",\n    \"commitizen\": \"^2.8.6\",\n    \"coveralls\": \"^2.11.13\",\n    \"cz-conventional-changelog\": \"^1.2.0\",\n    \"danger\": \"^1.1.0\",\n    \"doctoc\": \"^1.0.0\",\n    \"escape-string-regexp\": \"^1.0.5 \",\n    \"esdoc\": \"^0.4.7\",\n    \"eslint\": \"^3.8.0\",\n    \"fs-extra\": \"^2.1.2\",\n    \"get-folder-size\": \"^1.0.0\",\n    \"glob\": \"^7.0.3\",\n    \"gm\": \"^1.22.0\",\n    \"google-closure-compiler-js\": \"^20170218.0.0\",\n    \"gzip-size\": \"^3.0.0\",\n    \"http-server\": \"^0.9.0\",\n    \"husky\": \"^0.13.3\",\n    \"lint-staged\": \"3.2.5\",\n    \"lodash\": \"^4.15.0\",\n    \"madge\": \"^1.4.3\",\n    \"markdown-doctest\": \"^0.9.1\",\n    \"minimist\": \"^1.2.0\",\n    \"mkdirp\": \"^0.5.1\",\n    \"mocha\": \"^3.0.2\",\n    \"mocha-in-sauce\": \"0.0.1\",\n    \"npm-run-all\": \"^4.0.2\",\n    \"npm-scripts-info\": \"^0.3.4\",\n    \"nyc\": \"^10.2.0\",\n    \"opn-cli\": \"^3.1.0\",\n    \"platform\": \"^1.3.1\",\n    \"promise\": \"^7.1.1\",\n    \"protractor\": \"^3.1.1\",\n    \"rollup\": \"0.36.3\",\n    \"rollup-plugin-inject\": \"^2.0.0\",\n    \"rollup-plugin-node-resolve\": \"^2.0.0\",\n    \"rx\": \"latest\",\n    \"rxjs\": \"latest\",\n    \"shx\": \"^0.2.2\",\n    \"sinon\": \"^2.1.0\",\n    \"sinon-chai\": \"^2.9.0\",\n    \"source-map-support\": \"^0.4.0\",\n    \"tslib\": \"^1.5.0\",\n    \"tslint\": \"^4.4.2\",\n    \"typescript\": \"~2.0.6\",\n    \"typings\": \"^2.0.0\",\n    \"validate-commit-msg\": \"^2.14.0\",\n    \"watch\": \"^1.0.1\",\n    \"webpack\": \"^1.13.1\",\n    \"xmlhttprequest\": \"1.8.0\"\n  },\n  \"engines\": {\n    \"npm\": \">=2.0.0\"\n  },\n  \"typings\": \"Rx.d.ts\",\n  \"dependencies\": {\n    \"symbol-observable\": \"^1.0.1\"\n  }\n}" },
                    { "path": "/a/b/node_modules/.staging/typescript-8493ea5d/package.json", "content": "{\n    \"name\": \"typescript\",\n    \"author\": \"Microsoft Corp.\",\n    \"homepage\": \"http://typescriptlang.org/\",\n    \"version\": \"2.4.2\",\n    \"license\": \"Apache-2.0\",\n    \"description\": \"TypeScript is a language for application scale JavaScript development\",\n    \"keywords\": [\n        \"TypeScript\",\n        \"Microsoft\",\n        \"compiler\",\n        \"language\",\n        \"javascript\"\n    ],\n    \"bugs\": {\n        \"url\": \"https://github.com/Microsoft/TypeScript/issues\"\n    },\n    \"repository\": {\n        \"type\": \"git\",\n        \"url\": \"https://github.com/Microsoft/TypeScript.git\"\n    },\n    \"main\": \"./lib/typescript.js\",\n    \"typings\": \"./lib/typescript.d.ts\",\n    \"bin\": {\n        \"tsc\": \"./bin/tsc\",\n        \"tsserver\": \"./bin/tsserver\"\n    },\n    \"engines\": {\n        \"node\": \">=4.2.0\"\n    },\n    \"devDependencies\": {\n        \"@types/browserify\": \"latest\",\n        \"@types/chai\": \"latest\",\n        \"@types/convert-source-map\": \"latest\",\n        \"@types/del\": \"latest\",\n        \"@types/glob\": \"latest\",\n        \"@types/gulp\": \"latest\",\n        \"@types/gulp-concat\": \"latest\",\n        \"@types/gulp-help\": \"latest\",\n        \"@types/gulp-newer\": \"latest\",\n        \"@types/gulp-sourcemaps\": \"latest\",\n        \"@types/merge2\": \"latest\",\n        \"@types/minimatch\": \"latest\",\n        \"@types/minimist\": \"latest\",\n        \"@types/mkdirp\": \"latest\",\n        \"@types/mocha\": \"latest\",\n        \"@types/node\": \"latest\",\n        \"@types/q\": \"latest\",\n        \"@types/run-sequence\": \"latest\",\n        \"@types/through2\": \"latest\",\n        \"browserify\": \"latest\",\n        \"chai\": \"latest\",\n        \"convert-source-map\": \"latest\",\n        \"del\": \"latest\",\n        \"gulp\": \"latest\",\n        \"gulp-clone\": \"latest\",\n        \"gulp-concat\": \"latest\",\n        \"gulp-help\": \"latest\",\n        \"gulp-insert\": \"latest\",\n        \"gulp-newer\": \"latest\",\n        \"gulp-sourcemaps\": \"latest\",\n        \"gulp-typescript\": \"latest\",\n        \"into-stream\": \"latest\",\n        \"istanbul\": \"latest\",\n        \"jake\": \"latest\",\n        \"merge2\": \"latest\",\n        \"minimist\": \"latest\",\n        \"mkdirp\": \"latest\",\n        \"mocha\": \"latest\",\n        \"mocha-fivemat-progress-reporter\": \"latest\",\n        \"q\": \"latest\",\n        \"run-sequence\": \"latest\",\n        \"sorcery\": \"latest\",\n        \"through2\": \"latest\",\n        \"travis-fold\": \"latest\",\n        \"ts-node\": \"latest\",\n        \"tslint\": \"latest\",\n        \"typescript\": \"^2.4\"\n    },\n    \"scripts\": {\n        \"pretest\": \"jake tests\",\n        \"test\": \"jake runtests-parallel\",\n        \"build\": \"npm run build:compiler && npm run build:tests\",\n        \"build:compiler\": \"jake local\",\n        \"build:tests\": \"jake tests\",\n        \"start\": \"node lib/tsc\",\n        \"clean\": \"jake clean\",\n        \"gulp\": \"gulp\",\n        \"jake\": \"jake\",\n        \"lint\": \"jake lint\",\n        \"setup-hooks\": \"node scripts/link-hooks.js\"\n    },\n    \"browser\": {\n        \"buffer\": false,\n        \"fs\": false,\n        \"os\": false,\n        \"path\": false\n    }\n}" },
                    { "path": "/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.js", "content": "module.exports = require('./lib/index');\n" },
                    { "path": "/a/b/node_modules/.staging/symbol-observable-24bcbbff/index.d.ts", "content": "declare const observableSymbol: symbol;\nexport default observableSymbol;\n" },
                    { "path": "/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib" },
                    { "path": "/a/b/node_modules/.staging/symbol-observable-24bcbbff/lib/index.js", "content": "'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _ponyfill = require('./ponyfill');\n\nvar _ponyfill2 = _interopRequireDefault(_ponyfill);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nvar root; /* global window */\n\n\nif (typeof self !== 'undefined') {\n  root = self;\n} else if (typeof window !== 'undefined') {\n  root = window;\n} else if (typeof global !== 'undefined') {\n  root = global;\n} else if (typeof module !== 'undefined') {\n  root = module;\n} else {\n  root = Function('return this')();\n}\n\nvar result = (0, _ponyfill2['default'])(root);\nexports['default'] = result;" },
                ];
                verifyAfterPartialOrCompleteNpmInstall(2);

                filesAndFoldersToAdd.push(
                    { "path": "/a/b/node_modules/.staging/typescript-8493ea5d/lib" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/add/operator" },
                    { "path": "/a/b/node_modules/.staging/@types/lodash-e56c4fe7/package.json", "content": "{\n    \"name\": \"@types/lodash\",\n    \"version\": \"4.14.74\",\n    \"description\": \"TypeScript definitions for Lo-Dash\",\n    \"license\": \"MIT\",\n    \"contributors\": [\n        {\n            \"name\": \"Brian Zengel\",\n            \"url\": \"https://github.com/bczengel\"\n        },\n        {\n            \"name\": \"Ilya Mochalov\",\n            \"url\": \"https://github.com/chrootsu\"\n        },\n        {\n            \"name\": \"Stepan Mikhaylyuk\",\n            \"url\": \"https://github.com/stepancar\"\n        },\n        {\n            \"name\": \"Eric L Anderson\",\n            \"url\": \"https://github.com/ericanderson\"\n        },\n        {\n            \"name\": \"AJ Richardson\",\n            \"url\": \"https://github.com/aj-r\"\n        },\n        {\n            \"name\": \"Junyoung Clare Jang\",\n            \"url\": \"https://github.com/ailrun\"\n        }\n    ],\n    \"main\": \"\",\n    \"repository\": {\n        \"type\": \"git\",\n        \"url\": \"https://www.github.com/DefinitelyTyped/DefinitelyTyped.git\"\n    },\n    \"scripts\": {},\n    \"dependencies\": {},\n    \"typesPublisherContentHash\": \"12af578ffaf8d86d2df37e591857906a86b983fa9258414326544a0fe6af0de8\",\n    \"typeScriptVersion\": \"2.2\"\n}" },
                    { "path": "/a/b/node_modules/.staging/lodash-b0733faa/index.js", "content": "module.exports = require('./lodash');" },
                    { "path": "/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594" }
                );
                // Since we didnt add any supported extension file, there wont be any timeout scheduled
                verifyAfterPartialOrCompleteNpmInstall(0);

                // Remove file "/a/b/node_modules/.staging/typescript-8493ea5d/package.json.3017591594"
                filesAndFoldersToAdd.length--;
                verifyAfterPartialOrCompleteNpmInstall(0);

                filesAndFoldersToAdd.push(
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/bundles" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/operator" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/src/add/observable/dom" },
                    { "path": "/a/b/node_modules/.staging/@types/lodash-e56c4fe7/index.d.ts", "content": "// Type definitions for Lo-Dash 4.14\n// Project: http://lodash.com/\n// Definitions by: Brian Zengel <https://github.com/bczengel>,\n//                 Ilya Mochalov <https://github.com/chrootsu>,\n//                 Stepan Mikhaylyuk <https://github.com/stepancar>,\n//                 Eric L Anderson <https://github.com/ericanderson>,\n//                 AJ Richardson <https://github.com/aj-r>,\n//                 Junyoung Clare Jang <https://github.com/ailrun>\n// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped\n// TypeScript Version: 2.2\n\n/**\n### 4.0.0 Changelog (https://github.com/lodash/lodash/wiki/Changelog)\n\n#### TODO:\nremoved:\n- [x] Removed _.support\n- [x] Removed _.findWhere in favor of _.find with iteratee shorthand\n- [x] Removed _.where in favor of _.filter with iteratee shorthand\n- [x] Removed _.pluck in favor of _.map with iteratee shorthand\n\nrenamed:\n- [x] Renamed _.first to _.head\n- [x] Renamed _.indexBy to _.keyBy\n- [x] Renamed _.invoke to _.invokeMap\n- [x] Renamed _.overArgs to _.overArgs\n- [x] Renamed _.padLeft & _.padRight to _.padStart & _.padEnd\n- [x] Renamed _.pairs to _.toPairs\n- [x] Renamed _.rest to _.tail\n- [x] Renamed _.restParam to _.rest\n- [x] Renamed _.sortByOrder to _.orderBy\n- [x] Renamed _.trimLeft & _.trimRight to _.trimStart & _.trimEnd\n- [x] Renamed _.trunc to _.truncate\n\nsplit:\n- [x] Split _.indexOf & _.lastIndexOf into _.sortedIndexOf & _.sortedLastIndexOf\n- [x] Split _.max & _.min into _.maxBy & _.minBy\n- [x] Split _.omit & _.pick into _.omitBy & _.pickBy\n- [x] Split _.sample into _.sampleSize\n- [x] Split _.sortedIndex into _.sortedIndexBy\n- [x] Split _.sortedLastIndex into _.sortedLastIndexBy\n- [x] Split _.uniq into _.sortedUniq, _.sortedUniqBy, & _.uniqBy\n\nchanges:\n- [x] Absorbed _.sortByAll into _.sortBy\n- [x] Changed the category of _.at to “Object”\n- [x] Changed the category of _.bindAll to “Utility”\n- [x] Made _.capitalize uppercase the first character & lowercase the rest\n- [x] Made _.functions return only own method names\n\nadded 23 array methods:\n- [x] _.concat\n- [x] _.differenceBy\n- [x] _.differenceWith\n- [x] _.flatMap\n- [x] _.fromPairs\n- [x] _.intersectionBy\n- [x] _.intersectionWith\n- [x] _.join\n- [x] _.pullAll\n- [x] _.pullAllBy\n- [x] _.reverse\n- [x] _.sortedIndexBy\n- [x] _.sortedIndexOf\n- [x] _.sortedLastIndexBy\n- [x] _.sortedLastIndexOf\n- [x] _.sortedUniq\n- [x] _.sortedUniqBy\n- [x] _.unionBy\n- [x] _.unionWith\n- [x] _.uniqBy\n- [x] _.uniqWith\n- [x] _.xorBy\n- [x] _.xorWith\n\nadded 20 lang methods:\n- [x] _.cloneDeepWith\n- [x] _.cloneWith\n- [x] _.eq\n- [x] _.isArrayLike\n- [x] _.isArrayLikeObject\n- [x] _.isEqualWith\n- [x] _.isInteger\n- [x] _.isLength\n- [x] _.isMatchWith\n- [x] _.isNil\n- [x] _.isObjectLike\n- [x] _.isSafeInteger\n- [x] _.isSymbol\n- [x] _.toInteger\n- [x] _.toLength\n- [x] _.toNumber\n- [x] _.toSafeInteger\n- [x] _.toString\n- [X] _.conforms\n- [X] _.conformsTo\n\nadded 13 object methods:\n- [x] _.assignIn\n- [x] _.assignInWith\n- [x] _.assignWith\n- [x] _.functionsIn\n- [x] _.hasIn\n- [x] _.mergeWith\n- [x] _.omitBy\n- [x] _.pickBy\n\nadded 8 string methods:\n- [x] _.lowerCase\n- [x] _.lowerFirst\n- [x] _.upperCase\n- [x] _.upperFirst\n- [x] _.toLower\n- [x] _.toUpper\n\nadded 8 utility methods:\n- [x] _.toPath\n\nadded 4 math methods:\n- [x] _.maxBy\n- [x] _.mean\n- [x] _.minBy\n- [x] _.sumBy\n\nadded 2 function methods:\n- [x] _.flip\n- [x] _.unary\n\nadded 2 number methods:\n- [x] _.clamp\n- [x] _.subtract\n\nadded collection method:\n- [x] _.sampleSize\n\nAdded 3 aliases\n\n- [x] _.first as an alias of _.head\n\nRemoved 17 aliases\n- [x] Removed aliase _.all\n- [x] Removed aliase _.any\n- [x] Removed aliase _.backflow\n- [x] Removed aliase _.callback\n- [x] Removed aliase _.collect\n- [x] Removed aliase _.compose\n- [x] Removed aliase _.contains\n- [x] Removed aliase _.detect\n- [x] Removed aliase _.foldl\n- [x] Removed aliase _.foldr\n- [x] Removed aliase _.include\n- [x] Removed aliase _.inject\n- [x] Removed aliase _.methods\n- [x] Removed aliase _.object\n- [x] Removed aliase _.run\n- [x] Removed aliase _.select\n- [x] Removed aliase _.unique\n\nOther changes\n- [x] Added support for array buffers to _.isEqual\n- [x] Added support for converting iterators to _.toArray\n- [x] Added support for deep paths to _.zipObject\n- [x] Changed UMD to export to window or self when available regardless of other exports\n- [x] Ensured debounce cancel clears args & thisArg references\n- [x] Ensured _.add, _.subtract, & _.sum don’t skip NaN values\n- [x] Ensured _.clone treats generators like functions\n- [x] Ensured _.clone produces clones with the source’s [[Prototype]]\n- [x] Ensured _.defaults assigns properties that shadow Object.prototype\n- [x] Ensured _.defaultsDeep doesn’t merge a string into an array\n- [x] Ensured _.defaultsDeep & _.merge don’t modify sources\n- [x] Ensured _.defaultsDeep works with circular references\n- [x] Ensured _.keys skips “length” on strict mode arguments objects in Safari 9\n- [x] Ensured _.merge doesn’t convert strings to arrays\n- [x] Ensured _.merge merges plain-objects onto non plain-objects\n- [x] Ensured _#plant resets iterator data of cloned sequences\n- [x] Ensured _.random swaps min & max if min is greater than max\n- [x] Ensured _.range preserves the sign of start of -0\n- [x] Ensured _.reduce & _.reduceRight use getIteratee in their array branch\n- [x] Fixed rounding issue with the precision param of _.floor\n- [x] Added flush method to debounced & throttled functions\n\n** LATER **\nMisc:\n- [ ] Made _.forEach, _.forIn, _.forOwn, & _.times implicitly end a chain sequence\n- [ ] Removed thisArg params from most methods\n- [ ] Made “By” methods provide a single param to iteratees\n- [ ] Made _.words chainable by default\n- [ ] Removed isDeep params from _.clone & _.flatten\n- [ ] Removed _.bindAll support for binding all methods when no names are provided\n- [ ] Removed func-first param signature from _.before & _.after\n- [ ] _.extend as an alias of _.assignIn\n- [ ] _.extendWith as an alias of _.assignInWith\n- [ ] Added clear method to _.memoize.Cache\n- [ ] Added support for ES6 maps, sets, & symbols to _.clone, _.isEqual, & _.toArray\n- [x] Enabled _.flow & _.flowRight to accept an array of functions\n- [ ] Ensured “Collection” methods treat functions as objects\n- [ ] Ensured _.assign, _.defaults, & _.merge coerce object values to objects\n- [ ] Ensured _.bindKey bound functions call object[key] when called with the new operator\n- [ ] Ensured _.isFunction returns true for generator functions\n- [ ] Ensured _.merge assigns typed arrays directly\n- [ ] Made _(...) an iterator & iterable\n- [ ] Made _.drop, _.take, & right forms coerce n of undefined to 0\n\nMethods:\n- [ ] _.concat\n- [ ] _.differenceBy\n- [ ] _.differenceWith\n- [ ] _.flatMap\n- [ ] _.fromPairs\n- [ ] _.intersectionBy\n- [ ] _.intersectionWith\n- [ ] _.join\n- [ ] _.pullAll\n- [ ] _.pullAllBy\n- [ ] _.reverse\n- [ ] _.sortedLastIndexOf\n- [ ] _.unionBy\n- [ ] _.unionWith\n- [ ] _.uniqWith\n- [ ] _.xorBy\n- [ ] _.xorWith\n- [ ] _.toString\n\n- [ ] _.invoke\n- [ ] _.setWith\n- [ ] _.toPairs\n- [ ] _.toPairsIn\n- [ ] _.unset\n\n- [ ] _.replace\n- [ ] _.split\n\n- [ ] _.cond\n- [ ] _.nthArg\n- [ ] _.over\n- [ ] _.overEvery\n- [ ] _.overSome\n- [ ] _.rangeRight\n\n- [ ] _.next\n*/\n\nexport = _;\nexport as namespace _;\n\ndeclare var _: _.LoDashStatic;\n\ntype PartialObject<T> = Partial<T>;\n\ndeclare namespace _ {\n    type Many<T> = T | T[];\n\n    interface LoDashStatic {\n        /**\n        * Creates a lodash object which wraps the given value to enable intuitive method chaining.\n        *\n        * In addition to Lo-Dash methods, wrappers also have the following Array methods:\n        * concat, join, pop, push, reverse, shift, slice, sort, splice, and unshift\n        *\n        * Chaining is supported in custom builds as long as the value method is implicitly or\n        * explicitly included in the build.\n        *\n        * The chainable wrapper functions are:\n        * after, assign, bind, bindAll, bindKey, chain, chunk, compact, compose, concat, countBy,\n        * createCallback, curry, debounce, defaults, defer, delay, difference, filter, flatten,\n        * forEach, forEachRight, forIn, forInRight, forOwn, forOwnRight, functions, groupBy,\n        * keyBy, initial, intersection, invert, invoke, keys, map, max, memoize, merge, min,\n        * object, omit, once, pairs, partial, partialRight, pick, pluck, pull, push, range, reject,\n        * remove, rest, reverse, sample, shuffle, slice, sort, sortBy, splice, tap, throttle, times,\n        * toArray, transform, union, uniq, unset, unshift, unzip, values, where, without, wrap, and zip\n        *\n        * The non-chainable wrapper functions are:\n        * clone, cloneDeep, contains, escape, every, find, findIndex, findKey, findLast,\n        * findLastIndex, findLastKey, has, identity, indexOf, isArguments, isArray, isBoolean,\n        * isDate, isElement, isEmpty, isEqual, isFinite, isFunction, isNaN, isNull, isNumber,\n        * isObject, isPlainObject, isRegExp, isString, isUndefined, join, lastIndexOf, mixin,\n        * noConflict, parseInt, pop, random, reduce, reduceRight, result, shift, size, some,\n        * sortedIndex, runInContext, template, unescape, uniqueId, and value\n        *\n        * The wrapper functions first and last return wrapped values when n is provided, otherwise\n        * they return unwrapped values.\n        *\n        * Explicit chaining can be enabled by using the _.chain method.\n        **/\n        (value: number): LoDashImplicitWrapper<number>;\n        (value: string): LoDashImplicitStringWrapper;\n        (value: boolean): LoDashImplicitWrapper<boolean>;\n        (value: null | undefined): LoDashImplicitWrapper<null | undefined>;\n        (value: number[]): LoDashImplicitNumberArrayWrapper;\n        <T>(value: T[]): LoDashImplicitArrayWrapper<T>;\n        <T>(value: T[] | null | undefined): LoDashImplicitNillableArrayWrapper<T>;\n        <T extends {}>(value: T): LoDashImplicitObjectWrapper<T>;\n        <T extends {}>(value: T | null | undefined): LoDashImplicitNillableObjectWrapper<T>;\n        (value: any): LoDashImplicitWrapper<any>;\n\n        /**\n        * The semantic version number.\n        **/\n        VERSION: string;\n\n        /**\n        * By default, the template delimiters used by Lo-Dash are similar to those in embedded Ruby\n        * (ERB). Change the following template settings to use alternative delimiters.\n        **/\n        templateSettings: TemplateSettings;\n    }\n\n    /**\n    * By default, the template delimiters used by Lo-Dash are similar to those in embedded Ruby\n    * (ERB). Change the following template settings to use alternative delimiters.\n    **/\n    interface TemplateSettings {\n        /**\n        * The \"escape\" delimiter.\n        **/\n        escape?: RegExp;\n\n        /**\n        * The \"evaluate\" delimiter.\n        **/\n        evaluate?: RegExp;\n\n        /**\n        * An object to import into the template as local variables.\n        **/\n        imports?: Dictionary<any>;\n\n        /**\n        * The \"interpolate\" delimiter.\n        **/\n        interpolate?: RegExp;\n\n        /**\n        * Used to reference the data object in the template text.\n        **/\n        variable?: string;\n    }\n\n    /**\n     * Creates a cache object to store key/value pairs.\n     */\n    interface MapCache {\n        /**\n         * Removes `key` and its value from the cache.\n         * @param key The key of the value to remove.\n         * @return Returns `true` if the entry was removed successfully, else `false`.\n         */\n        delete(key: string): boolean;\n\n        /**\n         * Gets the cached value for `key`.\n         * @param key The key of the value to get.\n         * @return Returns the cached value.\n         */\n        get(key: string): any;\n\n        /**\n         * Checks if a cached value for `key` exists.\n         * @param key The key of the entry to check.\n         * @return Returns `true` if an entry for `key` exists, else `false`.\n         */\n        has(key: string): boolean;\n\n        /**\n         * Sets `value` to `key` of the cache.\n         * @param key The key of the value to cache.\n         * @param value The value to cache.\n         * @return Returns the cache object.\n         */\n        set(key: string, value: any): _.Dictionary<any>;\n\n        /**\n         * Removes all key-value entries from the map.\n         */\n        clear(): void;\n    }\n    interface MapCacheConstructor {\n        new (): MapCache;\n    }\n\n    interface LoDashWrapperBase<T, TWrapper> { }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> extends LoDashWrapperBase<T, TWrapper> { }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> extends LoDashWrapperBase<T, TWrapper> { }\n\n    interface LoDashImplicitWrapper<T> extends LoDashImplicitWrapperBase<T, LoDashImplicitWrapper<T>> { }\n\n    interface LoDashExplicitWrapper<T> extends LoDashExplicitWrapperBase<T, LoDashExplicitWrapper<T>> { }\n\n    interface LoDashImplicitStringWrapper extends LoDashImplicitWrapper<string> { }\n\n    interface LoDashExplicitStringWrapper extends LoDashExplicitWrapper<string> { }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> extends LoDashImplicitWrapperBase<TObject, TWrapper> { }\n\n    interface LoDashImplicitObjectWrapper<T> extends LoDashImplicitObjectWrapperBase<T, T, LoDashImplicitObjectWrapper<T>> { }\n\n    interface LoDashImplicitNillableObjectWrapper<T> extends LoDashImplicitObjectWrapperBase<T, T | null | undefined, LoDashImplicitNillableObjectWrapper<T>> { }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> extends LoDashExplicitWrapperBase<TObject, TWrapper> { }\n\n    interface LoDashExplicitObjectWrapper<T> extends LoDashExplicitObjectWrapperBase<T, T, LoDashExplicitObjectWrapper<T>> { }\n\n    interface LoDashExplicitNillableObjectWrapper<T> extends LoDashExplicitObjectWrapperBase<T, T | null | undefined, LoDashExplicitNillableObjectWrapper<T>> { }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> extends LoDashImplicitWrapperBase<TArray, TWrapper> {\n        pop(): T | undefined;\n        push(...items: T[]): TWrapper;\n        shift(): T | undefined;\n        sort(compareFn?: (a: T, b: T) => number): TWrapper;\n        splice(start: number): TWrapper;\n        splice(start: number, deleteCount: number, ...items: T[]): TWrapper;\n        unshift(...items: T[]): TWrapper;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> extends LoDashImplicitArrayWrapperBase<T, T[], LoDashImplicitArrayWrapper<T>> { }\n\n    interface LoDashImplicitNillableArrayWrapper<T> extends LoDashImplicitArrayWrapperBase<T, T[] | null | undefined, LoDashImplicitNillableArrayWrapper<T>> { }\n\n    interface LoDashImplicitNumberArrayWrapperBase<TArray extends number[] | null | undefined, TWrapper> extends LoDashImplicitArrayWrapperBase<number, TArray, TWrapper> { }\n\n    interface LoDashImplicitNumberArrayWrapper extends LoDashImplicitArrayWrapper<number> { }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> extends LoDashExplicitWrapperBase<TArray, TWrapper> {\n        pop(): LoDashExplicitObjectWrapper<T | undefined>;\n        push(...items: T[]): TWrapper;\n        shift(): LoDashExplicitObjectWrapper<T | undefined>;\n        sort(compareFn?: (a: T, b: T) => number): TWrapper;\n        splice(start: number): TWrapper;\n        splice(start: number, deleteCount: number, ...items: T[]): TWrapper;\n        unshift(...items: T[]): TWrapper;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> extends LoDashExplicitArrayWrapperBase<T, T[], LoDashExplicitArrayWrapper<T>> { }\n\n    interface LoDashExplicitNillableArrayWrapper<T> extends LoDashExplicitArrayWrapperBase<T, T[] | null | undefined, LoDashExplicitNillableArrayWrapper<T>> { }\n\n    interface LoDashExplicitNumberArrayWrapper extends LoDashExplicitArrayWrapper<number> { }\n\n    /*********\n     * Array *\n     *********/\n\n    //_.chunk\n    interface LoDashStatic {\n        /**\n         * Creates an array of elements split into groups the length of size. If collection can’t be split evenly, the\n         * final chunk will be the remaining elements.\n         *\n         * @param array The array to process.\n         * @param size The length of each chunk.\n         * @return Returns the new array containing chunks.\n         */\n        chunk<T>(\n            array: List<T> | null | undefined,\n            size?: number\n        ): T[][];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.chunk\n         */\n        chunk(size?: number): LoDashImplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.chunk\n         */\n        chunk<TResult>(size?: number): LoDashImplicitArrayWrapper<TResult[]>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.chunk\n         */\n        chunk(size?: number): LoDashExplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.chunk\n         */\n        chunk<TResult>(size?: number): LoDashExplicitArrayWrapper<TResult[]>;\n    }\n\n    //_.compact\n    interface LoDashStatic {\n        /**\n         * Creates an array with all falsey values removed. The values false, null, 0, \"\", undefined, and NaN are\n         * falsey.\n         *\n         * @param array The array to compact.\n         * @return (Array) Returns the new array of filtered values.\n         */\n        compact<T>(array?: List<T | null | undefined | false | \"\" | 0> | null | undefined): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.compact\n         */\n        compact(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.compact\n         */\n        compact<TResult>(): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.compact\n         */\n        compact(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.compact\n         */\n        compact<TResult>(): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.concat DUMMY\n    interface LoDashStatic {\n        /**\n         * Creates a new array concatenating `array` with any additional arrays\n         * and/or values.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to concatenate.\n         * @param {...*} [values] The values to concatenate.\n         * @returns {Array} Returns the new concatenated array.\n         * @example\n         *\n         * var array = [1];\n         * var other = _.concat(array, 2, [3], [[4]]);\n         *\n         * console.log(other);\n         * // => [1, 2, 3, [4]]\n         *\n         * console.log(array);\n         * // => [1]\n         */\n         concat<T>(array: List<T>, ...values: Array<T|List<T>>): T[];\n    }\n\n    //_.difference\n    interface LoDashStatic {\n        /**\n         * Creates an array of unique array values not included in the other provided arrays using SameValueZero for\n         * equality comparisons.\n         *\n         * @param array The array to inspect.\n         * @param values The arrays of values to exclude.\n         * @return Returns the new array of filtered values.\n         */\n        difference<T>(\n            array: List<T> | null | undefined,\n            ...values: Array<List<T>>\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.difference\n         */\n        difference(...values: Array<List<T>>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.difference\n         */\n        difference<TValue>(...values: Array<List<TValue>>): LoDashImplicitArrayWrapper<TValue>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.difference\n         */\n        difference(...values: Array<List<T>>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.difference\n         */\n        difference<TValue>(...values: Array<List<TValue>>): LoDashExplicitArrayWrapper<TValue>;\n    }\n\n    //_.differenceBy\n    interface LoDashStatic {\n        /**\n         * This method is like _.difference except that it accepts iteratee which is invoked for each element of array\n         * and values to generate the criterion by which uniqueness is computed. The iteratee is invoked with one\n         * argument: (value).\n         *\n         * @param array The array to inspect.\n         * @param values The values to exclude.\n         * @param iteratee The iteratee invoked per element.\n         * @returns Returns the new array of filtered values.\n         */\n        differenceBy<T>(\n            array: List<T> | null | undefined,\n            values?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            array: List<T> | null | undefined,\n            values?: List<T>,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            array: List<T> | null | undefined,\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            array: List<T> | null | undefined,\n            ...values: any[]\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            ...values: any[]\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            ...values: any[]\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            ...values: any[]\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: ((value: T) => any)|string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T, W extends Object>(\n            values1?: List<T>,\n            values2?: List<T>,\n            values3?: List<T>,\n            values4?: List<T>,\n            values5?: List<T>,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.differenceBy\n         */\n        differenceBy<T>(\n            ...values: any[]\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.differenceWith DUMMY\n    interface LoDashStatic {\n        /**\n         * Creates an array of unique `array` values not included in the other\n         * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)\n         * for equality comparisons.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to inspect.\n         * @param {...Array} [values] The values to exclude.\n         * @returns {Array} Returns the new array of filtered values.\n         * @example\n         *\n         * _.difference([3, 2, 1], [4, 2]);\n         * // => [3, 1]\n         */\n        differenceWith(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.drop\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array with n elements dropped from the beginning.\n         *\n         * @param array The array to query.\n         * @param n The number of elements to drop.\n         * @return Returns the slice of array.\n         */\n        drop<T>(array: List<T> | null | undefined, n?: number): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.drop\n         */\n        drop(n?: number): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.drop\n         */\n        drop<T>(n?: number): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.drop\n         */\n        drop(n?: number): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.drop\n         */\n        drop<T>(n?: number): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.dropRight\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array with n elements dropped from the end.\n         *\n         * @param array The array to query.\n         * @param n The number of elements to drop.\n         * @return Returns the slice of array.\n         */\n        dropRight<T>(\n            array: List<T> | null | undefined,\n            n?: number\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRight\n         */\n        dropRight(n?: number): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRight\n         */\n        dropRight<TResult>(n?: number): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRight\n         */\n        dropRight(n?: number): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRight\n         */\n        dropRight<TResult>(n?: number): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.dropRightWhile\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array excluding elements dropped from the end. Elements are dropped until predicate\n         * returns falsey. The predicate is bound to thisArg and invoked with three arguments: (value, index, array).\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * match the properties of the given object, else false.\n         *\n         * @param array The array to query.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the slice of array.\n         */\n        dropRightWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: ListIterator<TValue, boolean>\n        ): TValue[];\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: string\n        ): TValue[];\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TWhere, TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: TWhere\n        ): TValue[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TValue>(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<TValue>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TValue>(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropRightWhile\n         */\n        dropRightWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<TValue>;\n    }\n\n    //_.dropWhile\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array excluding elements dropped from the beginning. Elements are dropped until predicate\n         * returns falsey. The predicate is bound to thisArg and invoked with three arguments: (value, index, array).\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param array The array to query.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the slice of array.\n         */\n        dropWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: ListIterator<TValue, boolean>\n        ): TValue[];\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: string\n        ): TValue[];\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TWhere, TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: TWhere\n        ): TValue[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TValue>(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<TValue>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TValue>(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.dropWhile\n         */\n        dropWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<TValue>;\n    }\n\n    //_.fill\n    interface LoDashStatic {\n        /**\n         * Fills elements of array with value from start up to, but not including, end.\n         *\n         * Note: This method mutates array.\n         *\n         * @param array The array to fill.\n         * @param value The value to fill array with.\n         * @param start The start position.\n         * @param end The end position.\n         * @return Returns array.\n         */\n        fill<T>(\n            array: any[] | null | undefined,\n            value: T,\n            start?: number,\n            end?: number\n        ): T[];\n\n        /**\n         * @see _.fill\n         */\n        fill<T>(\n            array: List<any> | null | undefined,\n            value: T,\n            start?: number,\n            end?: number\n        ): List<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.fill\n         */\n        fill<T>(\n            value: T,\n            start?: number,\n            end?: number\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.fill\n         */\n        fill<T>(\n            value: T,\n            start?: number,\n            end?: number\n        ): LoDashImplicitObjectWrapper<List<T>>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.fill\n         */\n        fill<T>(\n            value: T,\n            start?: number,\n            end?: number\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.fill\n         */\n        fill<T>(\n            value: T,\n            start?: number,\n            end?: number\n        ): LoDashExplicitObjectWrapper<List<T>>;\n    }\n\n    //_.findIndex\n    interface LoDashStatic {\n        /**\n         * This method is like _.find except that it returns the index of the first element predicate returns truthy\n         * for instead of the element itself.\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param array The array to search.\n         * @param predicate The function invoked per iteration.\n         * @param fromIndex The index to search from.\n         * @return Returns the index of the found element, else -1.\n         */\n        findIndex<T>(\n            array: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex<T>(\n            array: List<T> | null | undefined,\n            predicate?: string,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex<W, T>(\n            array: List<T> | null | undefined,\n            predicate?: W,\n            fromIndex?: number\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.findIndex\n         */\n        findIndex(\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findIndex\n         */\n        findIndex<TResult>(\n            predicate?: ListIterator<TResult, boolean>,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): number;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.findIndex\n         */\n        findIndex(\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findIndex\n         */\n        findIndex<TResult>(\n            predicate?: ListIterator<TResult, boolean>,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findIndex\n         */\n        findIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.findLastIndex\n    interface LoDashStatic {\n        /**\n         * This method is like _.findIndex except that it iterates over elements of collection from right to left.\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param array The array to search.\n         * @param predicate The function invoked per iteration.\n         * @param fromIndex The index to search from.\n         * @return Returns the index of the found element, else -1.\n         */\n        findLastIndex<T>(\n            array: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<T>(\n            array: List<T> | null | undefined,\n            predicate?: string,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<W, T>(\n            array: List<T> | null | undefined,\n            predicate?: W,\n            fromIndex?: number\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex(\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<TResult>(\n            predicate?: ListIterator<TResult, boolean>,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): number;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): number;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex(\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<TResult>(\n            predicate?: ListIterator<TResult, boolean>,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex(\n            predicate?: string,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.findLastIndex\n         */\n        findLastIndex<W>(\n            predicate?: W,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.first\n    interface LoDashStatic {\n        /**\n         * @see _.head\n         */\n        first<T>(array: List<T> | null | undefined): T | undefined;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.head\n         */\n        first(): string | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        first(): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        first<T>(): T | undefined;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.head\n         */\n        first(): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        first<T>(): T;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        first<T>(): T;\n    }\n\n    interface RecursiveArray<T> extends Array<T|RecursiveArray<T>> {}\n    interface ListOfRecursiveArraysOrValues<T> extends List<T|RecursiveArray<T>> {}\n\n    //_.flatten\n    interface LoDashStatic {\n        /**\n         * Flattens a nested array. If isDeep is true the array is recursively flattened, otherwise it’s only\n         * flattened a single level.\n         *\n         * @param array The array to flatten.\n         * @param isDeep Specify a deep flatten.\n         * @return Returns the new flattened array.\n         */\n        flatten<T>(array: ListOfRecursiveArraysOrValues<T> | null | undefined, isDeep: boolean): T[];\n\n        /**\n         * @see _.flatten\n         */\n        flatten<T>(array: List<Many<T>> | null | undefined): T[];\n\n        /**\n         * @see _.flatten\n         */\n        flatten<T>(array: ListOfRecursiveArraysOrValues<T> | null | undefined): RecursiveArray<T>;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.flatten\n         */\n        flatten(): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.flatten\n         */\n        flatten<TResult>(isDeep?: boolean): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.flatten\n         */\n        flatten<TResult>(isDeep?: boolean): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.flatten\n         */\n        flatten(): LoDashExplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.flatten\n         */\n        flatten<TResult>(isDeep?: boolean): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.flatten\n         */\n        flatten<TResult>(isDeep?: boolean): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.flattenDeep\n    interface LoDashStatic {\n        /**\n         * Recursively flattens a nested array.\n         *\n         * @param array The array to recursively flatten.\n         * @return Returns the new flattened array.\n         */\n        flattenDeep<T>(array: ListOfRecursiveArraysOrValues<T> | null | undefined): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.flattenDeep\n         */\n        flattenDeep(): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.flattenDeep\n         */\n        flattenDeep<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.flattenDeep\n         */\n        flattenDeep<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.flattenDeep\n         */\n        flattenDeep(): LoDashExplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.flattenDeep\n         */\n        flattenDeep<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.flattenDeep\n         */\n        flattenDeep<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    // _.flattenDepth\n    interface LoDashStatic {\n        /**\n        * Recursively flatten array up to depth times.\n        *\n        * @param array The array to recursively flatten.\n        * @param number The maximum recursion depth.\n        * @return Returns the new flattened array.\n        */\n        flattenDepth<T>(array: ListOfRecursiveArraysOrValues<T> | null | undefined, depth?: number): T[];\n     }\n\n    //_.fromPairs\n    interface LoDashStatic {\n        /**\n         * The inverse of `_.toPairs`; this method returns an object composed\n         * from key-value `pairs`.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} pairs The key-value pairs.\n         * @returns {Object} Returns the new object.\n         * @example\n         *\n         * _.fromPairs([['fred', 30], ['barney', 40]]);\n         * // => { 'fred': 30, 'barney': 40 }\n         */\n        fromPairs<T>(\n          array: List<[_.StringRepresentable, T]> | null | undefined\n        ): Dictionary<T>;\n\n        /**\n         @see _.fromPairs\n         */\n        fromPairs(\n            array: List<any[]> | null | undefined\n        ): Dictionary<any>;\n    }\n\n    //_.fromPairs DUMMY\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.fromPairs\n         */\n        fromPairs(): LoDashImplicitObjectWrapper<any>;\n    }\n\n    //_.fromPairs DUMMY\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.fromPairs\n         */\n        fromPairs(): LoDashExplicitObjectWrapper<any>;\n    }\n\n    //_.head\n    interface LoDashStatic {\n        /**\n         * Gets the first element of array.\n         *\n         * @alias _.first\n         *\n         * @param array The array to query.\n         * @return Returns the first element of array.\n         */\n        head<T>(array: List<T> | null | undefined): T | undefined;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.head\n         */\n        head(): string | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        head(): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        head<T>(): T | undefined;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.head\n         */\n        head(): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        head<T>(): T;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.head\n         */\n        head<T>(): T;\n    }\n\n    //_.indexOf\n    interface LoDashStatic {\n        /**\n         * Gets the index at which the first occurrence of `value` is found in `array`\n         * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)\n         * for equality comparisons. If `fromIndex` is negative, it's used as the offset\n         * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`\n         * performs a faster binary search.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to search.\n         * @param {*} value The value to search for.\n         * @param {number} [fromIndex=0] The index to search from.\n         * @returns {number} Returns the index of the matched value, else `-1`.\n         * @example\n         *\n         * _.indexOf([1, 2, 1, 2], 2);\n         * // => 1\n         *\n         * // using `fromIndex`\n         * _.indexOf([1, 2, 1, 2], 2, 2);\n         * // => 3\n         */\n        indexOf<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            fromIndex?: boolean|number\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.indexOf\n         */\n        indexOf(\n            value: T,\n            fromIndex?: boolean|number\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.indexOf\n         */\n        indexOf<TValue>(\n            value: TValue,\n            fromIndex?: boolean|number\n        ): number;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.indexOf\n         */\n        indexOf(\n            value: T,\n            fromIndex?: boolean|number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.indexOf\n         */\n        indexOf<TValue>(\n            value: TValue,\n            fromIndex?: boolean|number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.intersectionBy DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.intersection` except that it accepts `iteratee`\n         * which is invoked for each element of each `arrays` to generate the criterion\n         * by which uniqueness is computed. The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {...Array} [arrays] The arrays to inspect.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {Array} Returns the new array of shared values.\n         * @example\n         *\n         * _.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);\n         * // => [2.1]\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');\n         * // => [{ 'x': 1 }]\n         */\n        intersectionBy(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.intersectionWith DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.intersection` except that it accepts `comparator`\n         * which is invoked to compare elements of `arrays`. The comparator is invoked\n         * with two arguments: (arrVal, othVal).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {...Array} [arrays] The arrays to inspect.\n         * @param {Function} [comparator] The comparator invoked per element.\n         * @returns {Array} Returns the new array of shared values.\n         * @example\n         *\n         * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];\n         * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];\n         *\n         * _.intersectionWith(objects, others, _.isEqual);\n         * // => [{ 'x': 1, 'y': 2 }]\n         */\n        intersectionWith(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.join\n    interface LoDashStatic {\n        /**\n         * Converts all elements in `array` into a string separated by `separator`.\n         *\n         * @param array The array to convert.\n         * @param separator The element separator.\n         * @returns Returns the joined string.\n         */\n        join(\n            array: List<any> | null | undefined,\n            separator?: string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.join\n         */\n        join(separator?: string): string;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.join\n         */\n        join(separator?: string): string;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.join\n         */\n        join(separator?: string): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.join\n         */\n        join(separator?: string): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.join\n         */\n        join(separator?: string): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.join\n         */\n        join(separator?: string): LoDashExplicitWrapper<string>;\n    }\n\n    //_.pullAll DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.pull` except that it accepts an array of values to remove.\n         *\n         * **Note:** Unlike `_.difference`, this method mutates `array`.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to modify.\n         * @param {Array} values The values to remove.\n         * @returns {Array} Returns `array`.\n         * @example\n         *\n         * var array = [1, 2, 3, 1, 2, 3];\n         *\n         * _.pull(array, [2, 3]);\n         * console.log(array);\n         * // => [1, 1]\n         */\n        pullAll(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.pullAllBy DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.pullAll` except that it accepts `iteratee` which is\n         * invoked for each element of `array` and `values` to to generate the criterion\n         * by which uniqueness is computed. The iteratee is invoked with one argument: (value).\n         *\n         * **Note:** Unlike `_.differenceBy`, this method mutates `array`.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to modify.\n         * @param {Array} values The values to remove.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {Array} Returns `array`.\n         * @example\n         *\n         * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];\n         *\n         * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');\n         * console.log(array);\n         * // => [{ 'x': 2 }]\n         */\n        pullAllBy(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.reverse DUMMY\n    interface LoDashStatic {\n        /**\n         * Reverses `array` so that the first element becomes the last, the second\n         * element becomes the second to last, and so on.\n         *\n         * **Note:** This method mutates `array` and is based on\n         * [`Array#reverse`](https://mdn.io/Array/reverse).\n         *\n         * @memberOf _\n         * @category Array\n         * @returns {Array} Returns `array`.\n         * @example\n         *\n         * var array = [1, 2, 3];\n         *\n         * _.reverse(array);\n         * // => [3, 2, 1]\n         *\n         * console.log(array);\n         * // => [3, 2, 1]\n         */\n        reverse(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.sortedIndexOf\n    interface LoDashStatic {\n        /**\n         * This method is like `_.indexOf` except that it performs a binary\n         * search on a sorted `array`.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to search.\n         * @param {*} value The value to search for.\n         * @returns {number} Returns the index of the matched value, else `-1`.\n         * @example\n         *\n         * _.sortedIndexOf([1, 1, 2, 2], 2);\n         * // => 2\n         */\n        sortedIndexOf<T>(\n            array: List<T> | null | undefined,\n            value: T\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexOf\n         */\n        sortedIndexOf(\n            value: T\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexOf\n         */\n        sortedIndexOf<TValue>(\n            value: TValue\n        ): number;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexOf\n         */\n        sortedIndexOf(\n            value: T\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexOf\n         */\n        sortedIndexOf<TValue>(\n            value: TValue\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.initial\n    interface LoDashStatic {\n        /**\n         * Gets all but the last element of array.\n         *\n         * @param array The array to query.\n         * @return Returns the slice of array.\n         */\n        initial<T>(array: List<T> | null | undefined): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.initial\n         */\n        initial(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.initial\n         */\n        initial<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.initial\n         */\n        initial(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.initial\n         */\n        initial<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.intersection\n    interface LoDashStatic {\n        /**\n         * Creates an array of unique values that are included in all of the provided arrays using SameValueZero for\n         * equality comparisons.\n         *\n         * @param arrays The arrays to inspect.\n         * @return Returns the new array of shared values.\n         */\n        intersection<T>(...arrays: Array<List<T> | null | undefined>): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.intersection\n         */\n        intersection<TResult>(...arrays: Array<List<TResult>>): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.intersection\n         */\n        intersection<TResult>(...arrays: Array<List<TResult>>): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.intersection\n         */\n        intersection<TResult>(...arrays: Array<List<TResult>>): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.intersection\n         */\n        intersection<TResult>(...arrays: Array<List<TResult>>): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.last\n    interface LoDashStatic {\n        /**\n         * Gets the last element of array.\n         *\n         * @param array The array to query.\n         * @return Returns the last element of array.\n         */\n        last<T>(array: List<T> | null | undefined): T | undefined;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.last\n         */\n        last(): string | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.last\n         */\n        last(): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.last\n         */\n        last<T>(): T | undefined;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.last\n         */\n        last(): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.last\n         */\n        last<T>(): T;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.last\n         */\n        last<T>(): T;\n    }\n\n    //_.lastIndexOf\n    interface LoDashStatic {\n        /**\n         * This method is like _.indexOf except that it iterates over elements of array from right to left.\n         *\n         * @param array The array to search.\n         * @param value The value to search for.\n         * @param fromIndex The index to search from or true to perform a binary search on a sorted array.\n         * @return Returns the index of the matched value, else -1.\n         */\n        lastIndexOf<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            fromIndex?: boolean|number\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.lastIndexOf\n         */\n        lastIndexOf(\n            value: T,\n            fromIndex?: boolean|number\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.lastIndexOf\n         */\n        lastIndexOf<TResult>(\n            value: TResult,\n            fromIndex?: boolean|number\n        ): number;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.lastIndexOf\n         */\n        lastIndexOf(\n            value: T,\n            fromIndex?: boolean|number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.lastIndexOf\n         */\n        lastIndexOf<TResult>(\n            value: TResult,\n            fromIndex?: boolean|number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.nth\n    interface LoDashStatic {\n        /**\n         * Gets the element at index `n` of `array`. If `n` is negative, the nth element from the end is returned.\n         *\n         * @param array array The array to query.\n         * @param value The index of the element to return.\n         * @return Returns the nth element of `array`.\n         */\n        nth<T>(\n            array: List<T> | null | undefined,\n            n?: number\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.nth\n         */\n        nth(\n            n?: number\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.nth\n         */\n        nth<TResult>(\n            n?:number\n        ): TResult | undefined;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.nth\n         */\n        nth(\n            n?:number\n        ): LoDashExplicitWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.nth\n         */\n        nth<TResult>(\n            n?:number\n        ): LoDashExplicitWrapper<TResult>;\n    }\n\n    //_.pull\n    interface LoDashStatic {\n        /**\n         * Removes all provided values from array using SameValueZero for equality comparisons.\n         *\n         * Note: Unlike _.without, this method mutates array.\n         *\n         * @param array The array to modify.\n         * @param values The values to remove.\n         * @return Returns array.\n         */\n        pull<T>(\n            array: T[],\n            ...values: T[]\n        ): T[];\n\n        /**\n         * @see _.pull\n         */\n        pull<T>(\n            array: List<T>,\n            ...values: T[]\n        ): List<T>;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.pull\n         */\n        pull(...values: T[]): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.pull\n         */\n        pull<TValue>(...values: TValue[]): LoDashImplicitObjectWrapper<List<TValue>>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.pull\n         */\n        pull(...values: T[]): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.pull\n         */\n        pull<TValue>(...values: TValue[]): LoDashExplicitObjectWrapper<List<TValue>>;\n    }\n\n    //_.pullAt\n    interface LoDashStatic {\n        /**\n         * Removes elements from array corresponding to the given indexes and returns an array of the removed elements.\n         * Indexes may be specified as an array of indexes or as individual arguments.\n         *\n         * Note: Unlike _.at, this method mutates array.\n         *\n         * @param array The array to modify.\n         * @param indexes The indexes of elements to remove, specified as individual indexes or arrays of indexes.\n         * @return Returns the new array of removed elements.\n         */\n        pullAt<T>(\n            array: List<T>,\n            ...indexes: Array<Many<number>>\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.pullAt\n         */\n        pullAt(...indexes: Array<Many<number>>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.pullAt\n         */\n        pullAt<T>(...indexes: Array<Many<number>>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.pullAt\n         */\n        pullAt(...indexes: Array<Many<number>>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.pullAt\n         */\n        pullAt<T>(...indexes: Array<Many<number>>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.remove\n    interface LoDashStatic {\n        /**\n         * Removes all elements from array that predicate returns truthy for and returns an array of the removed\n         * elements. The predicate is bound to thisArg and invoked with three arguments: (value, index, array).\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * Note: Unlike _.filter, this method mutates array.\n         *\n         * @param array The array to modify.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the new array of removed elements.\n         */\n        remove<T>(\n            array: List<T>,\n            predicate?: ListIterator<T, boolean>\n        ): T[];\n\n        /**\n         * @see _.remove\n         */\n        remove<T>(\n            array: List<T>,\n            predicate?: string\n        ): T[];\n\n        /**\n         * @see _.remove\n         */\n        remove<W, T>(\n            array: List<T>,\n            predicate?: W\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.remove\n         */\n        remove(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.remove\n         */\n        remove(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.remove\n         */\n        remove<W>(\n            predicate?: W\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.remove\n         */\n        remove<TResult>(\n            predicate?: ListIterator<TResult, boolean>\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.remove\n         */\n        remove<TResult>(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.remove\n         */\n        remove<W, TResult>(\n            predicate?: W\n        ): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.remove\n         */\n        remove(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.remove\n         */\n        remove(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.remove\n         */\n        remove<W>(\n            predicate?: W\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.remove\n         */\n        remove<TResult>(\n            predicate?: ListIterator<TResult, boolean>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.remove\n         */\n        remove<TResult>(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.remove\n         */\n        remove<W, TResult>(\n            predicate?: W\n        ): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.tail\n    interface LoDashStatic {\n        /**\n         * Gets all but the first element of array.\n         *\n         * @alias _.tail\n         *\n         * @param array The array to query.\n         * @return Returns the slice of array.\n         */\n        tail<T>(array: List<T> | null | undefined): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.tail\n         */\n        tail(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.tail\n         */\n        tail<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.tail\n         */\n        tail(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.tail\n         */\n        tail<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.slice\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array from start up to, but not including, end.\n         *\n         * @param array The array to slice.\n         * @param start The start position.\n         * @param end The end position.\n         * @return Returns the slice of array.\n         */\n        slice<T>(\n            array: T[] | null | undefined,\n            start?: number,\n            end?: number\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.slice\n         */\n        slice(\n            start?: number,\n            end?: number\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.slice\n         */\n        slice(\n            start?: number,\n            end?: number\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.sortedIndex\n    interface LoDashStatic {\n        /**\n         * Uses a binary search to determine the lowest index at which `value` should\n         * be inserted into `array` in order to maintain its sort order.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The sorted array to inspect.\n         * @param {*} value The value to evaluate.\n         * @returns {number} Returns the index at which `value` should be inserted into `array`.\n         * @example\n         *\n         * _.sortedIndex([30, 50], 40);\n         * // => 1\n         *\n         * _.sortedIndex([4, 5], 4);\n         * // => 0\n         */\n        sortedIndex<T>(\n            array: List<T> | null | undefined,\n            value: T\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sortedIndex\n         */\n        sortedIndex<TSort>(\n            value: string\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndex\n         */\n        sortedIndex(\n            value: T\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndex\n         */\n        sortedIndex<T>(\n            value: T\n        ): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sortedIndex\n         */\n        sortedIndex<TSort>(\n            value: string\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndex\n         */\n        sortedIndex(\n            value: T\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndex\n         */\n        sortedIndex<T>(\n            value: T\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    // _.sortedIndexBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.sortedIndex` except that it accepts `iteratee`\n         * which is invoked for `value` and each element of `array` to compute their\n         * sort ranking. The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The sorted array to inspect.\n         * @param {*} value The value to evaluate.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {number} Returns the index at which `value` should be inserted into `array`.\n         * @example\n         *\n         * var dict = { 'thirty': 30, 'forty': 40, 'fifty': 50 };\n         *\n         * _.sortedIndexBy(['thirty', 'fifty'], 'forty', _.propertyOf(dict));\n         * // => 1\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');\n         * // => 0\n         */\n        sortedIndexBy<T, TSort>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: (x: T) => TSort\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: (x: T) => any\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: string\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<W, T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: W\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: Object\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<TSort>(\n            value: string,\n            iteratee: (x: string) => TSort\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy(\n            value: T,\n            iteratee: string\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<W>(\n            value: T,\n            iteratee: W\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T, TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            value: T,\n            iteratee: (x: T) => any\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            value: T,\n            iteratee: string\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<W, T>(\n            value: T,\n            iteratee: W\n        ): number;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            value: T,\n            iteratee: Object\n        ): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<TSort>(\n            value: string,\n            iteratee: (x: string) => TSort\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy(\n            value: T,\n            iteratee: string\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<W>(\n            value: T,\n            iteratee: W\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T, TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            value: T,\n            iteratee: (x: T) => any\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            value: T,\n            iteratee: string\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<W, T>(\n            value: T,\n            iteratee: W\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedIndexBy\n         */\n        sortedIndexBy<T>(\n            value: T,\n            iteratee: Object\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.sortedLastIndex\n    interface LoDashStatic {\n        /**\n         * This method is like `_.sortedIndex` except that it returns the highest\n         * index at which `value` should be inserted into `array` in order to\n         * maintain its sort order.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The sorted array to inspect.\n         * @param {*} value The value to evaluate.\n         * @returns {number} Returns the index at which `value` should be inserted into `array`.\n         * @example\n         *\n         * _.sortedLastIndex([4, 5], 4);\n         * // => 1\n         */\n        sortedLastIndex<T>(\n            array: List<T> | null | undefined,\n            value: T\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sortedLastIndex\n         */\n        sortedLastIndex(\n            value: string\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndex\n         */\n        sortedLastIndex(\n            value: T\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndex\n         */\n        sortedLastIndex<T>(\n            value: T\n        ): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sortedLastIndex\n         */\n        sortedLastIndex(\n            value: string\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndex\n         */\n        sortedLastIndex(\n            value: T\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndex\n         */\n        sortedLastIndex<T>(\n            value: T\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.sortedLastIndexBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.sortedLastIndex` except that it accepts `iteratee`\n         * which is invoked for `value` and each element of `array` to compute their\n         * sort ranking. The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The sorted array to inspect.\n         * @param {*} value The value to evaluate.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {number} Returns the index at which `value` should be inserted into `array`.\n         * @example\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.sortedLastIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');\n         * // => 1\n         */\n        sortedLastIndexBy<T, TSort>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: (x: T) => TSort\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: (x: T) => any\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: string\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<W, T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: W\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            array: List<T> | null | undefined,\n            value: T,\n            iteratee: Object\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<TSort>(\n            value: string,\n            iteratee: (x: string) => TSort\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy(\n            value: T,\n            iteratee: string\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<W>(\n            value: T,\n            iteratee: W\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T, TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            value: T,\n            iteratee: (x: T) => any\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            value: T,\n            iteratee: string\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<W, T>(\n            value: T,\n            iteratee: W\n        ): number;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            value: T,\n            iteratee: Object\n        ): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<TSort>(\n            value: string,\n            iteratee: (x: string) => TSort\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy(\n            value: T,\n            iteratee: string\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<W>(\n            value: T,\n            iteratee: W\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T, TSort>(\n            value: T,\n            iteratee: (x: T) => TSort\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            value: T,\n            iteratee: (x: T) => any\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            value: T,\n            iteratee: string\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<W, T>(\n            value: T,\n            iteratee: W\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sortedLastIndexBy\n         */\n        sortedLastIndexBy<T>(\n            value: T,\n            iteratee: Object\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.sortedLastIndexOf DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.lastIndexOf` except that it performs a binary\n         * search on a sorted `array`.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to search.\n         * @param {*} value The value to search for.\n         * @returns {number} Returns the index of the matched value, else `-1`.\n         * @example\n         *\n         * _.sortedLastIndexOf([1, 1, 2, 2], 2);\n         * // => 3\n         */\n        sortedLastIndexOf<T>(\n            array: List<T> | null | undefined,\n            value: T\n        ): number;\n    }\n\n    //_.tail\n    interface LoDashStatic {\n        /**\n         * @see _.rest\n         */\n        tail<T>(array: List<T> | null | undefined): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.rest\n         */\n        tail(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.rest\n         */\n        tail<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.rest\n         */\n        tail(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.rest\n         */\n        tail<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.take\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array with n elements taken from the beginning.\n         *\n         * @param array The array to query.\n         * @param n The number of elements to take.\n         * @return Returns the slice of array.\n         */\n        take<T>(\n            array: List<T> | null | undefined,\n            n?: number\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.take\n         */\n        take(n?: number): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.take\n         */\n        take<TResult>(n?: number): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.take\n         */\n        take(n?: number): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.take\n         */\n        take<TResult>(n?: number): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.takeRight\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array with n elements taken from the end.\n         *\n         * @param array The array to query.\n         * @param n The number of elements to take.\n         * @return Returns the slice of array.\n         */\n        takeRight<T>(\n            array: List<T> | null | undefined,\n            n?: number\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRight\n         */\n        takeRight(n?: number): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRight\n         */\n        takeRight<TResult>(n?: number): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRight\n         */\n        takeRight(n?: number): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRight\n         */\n        takeRight<TResult>(n?: number): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.takeRightWhile\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array with elements taken from the end. Elements are taken until predicate returns\n         * falsey. The predicate is bound to thisArg and invoked with three arguments: (value, index, array).\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param array The array to query.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the slice of array.\n         */\n        takeRightWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: ListIterator<TValue, boolean>\n        ): TValue[];\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: string\n        ): TValue[];\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TWhere, TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: TWhere\n        ): TValue[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TValue>(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<TValue>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TValue>(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeRightWhile\n         */\n        takeRightWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<TValue>;\n    }\n\n    //_.takeWhile\n    interface LoDashStatic {\n        /**\n         * Creates a slice of array with elements taken from the beginning. Elements are taken until predicate returns\n         * falsey. The predicate is bound to thisArg and invoked with three arguments: (value, index, array).\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param array The array to query.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the slice of array.\n         */\n        takeWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: ListIterator<TValue, boolean>\n        ): TValue[];\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: string\n        ): TValue[];\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TWhere, TValue>(\n            array: List<TValue> | null | undefined,\n            predicate?: TWhere\n        ): TValue[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TValue>(\n            predicate?: string\n        ): LoDashImplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashImplicitArrayWrapper<TValue>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile(\n            predicate?: ListIterator<T, boolean>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TWhere>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TValue>(\n            predicate?: ListIterator<TValue, boolean>\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TValue>(\n            predicate?: string\n        ): LoDashExplicitArrayWrapper<TValue>;\n\n        /**\n         * @see _.takeWhile\n         */\n        takeWhile<TWhere, TValue>(\n            predicate?: TWhere\n        ): LoDashExplicitArrayWrapper<TValue>;\n    }\n\n    //_.union\n    interface LoDashStatic {\n        /**\n         * Creates an array of unique values, in order, from all of the provided arrays using SameValueZero for\n         * equality comparisons.\n         *\n         * @param arrays The arrays to inspect.\n         * @return Returns the new array of combined values.\n         */\n        union<T>(...arrays: Array<List<T> | null | undefined>): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.union\n         */\n        union(...arrays: Array<List<T> | null | undefined>): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.union\n         */\n        union<T>(...arrays: Array<List<T> | null | undefined>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.union\n         */\n        union<T>(...arrays: Array<List<T> | null | undefined>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.union\n         */\n        union(...arrays: Array<List<T> | null | undefined>): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.union\n         */\n        union<T>(...arrays: Array<List<T> | null | undefined>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.union\n         */\n        union<T>(...arrays: Array<List<T> | null | undefined>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.unionBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.union` except that it accepts `iteratee` which is\n         * invoked for each element of each `arrays` to generate the criterion by which\n         * uniqueness is computed. The iteratee is invoked with one argument: (value).\n         *\n         * @param arrays The arrays to inspect.\n         * @param iteratee The iteratee invoked per element.\n         * @return Returns the new array of combined values.\n         */\n        unionBy<T>(\n            arrays: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays: List<T> | null | undefined,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays1: List<T> | null | undefined,\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: W\n        ): T[];\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays: List<T> | null | undefined,\n            ...iteratee: any[]\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            ...iteratee: any[]\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            ...iteratee: any[]\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            ...iteratee: any[]\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: (value: T) => any\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T, W extends Object>(\n            arrays2: List<T> | null | undefined,\n            arrays3: List<T> | null | undefined,\n            arrays4: List<T> | null | undefined,\n            arrays5: List<T> | null | undefined,\n            iteratee?: W\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.unionBy\n         */\n        unionBy<T>(\n            ...iteratee: any[]\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.uniq\n    interface LoDashStatic {\n        /**\n         * Creates a duplicate-free version of an array, using\n         * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)\n         * for equality comparisons, in which only the first occurrence of each element\n         * is kept.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to inspect.\n         * @returns {Array} Returns the new duplicate free array.\n         * @example\n         *\n         * _.uniq([2, 1, 2]);\n         * // => [2, 1]\n         */\n        uniq<T>(\n            array: List<T> | null | undefined\n        ): T[];\n\n        /**\n         * @see _.uniq\n         */\n        uniq<T, TSort>(\n            array: List<T> | null | undefined\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.uniq\n         */\n        uniq<TSort>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.uniq\n         */\n        uniq<TSort>(): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniq\n         */\n        uniq(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        uniq<T>(): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniq\n         */\n        uniq<T, TSort>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.uniq\n         */\n        uniq<TSort>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.uniq\n         */\n        uniq<TSort>(): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniq\n         */\n        uniq(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.uniq\n         */\n        uniq<T>(): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniq\n         */\n        uniq<T, TSort>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.uniqBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.uniq` except that it accepts `iteratee` which is\n         * invoked for each element in `array` to generate the criterion by which\n         * uniqueness is computed. The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to inspect.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {Array} Returns the new duplicate free array.\n         * @example\n         *\n         * _.uniqBy([2.1, 1.2, 2.3], Math.floor);\n         * // => [2.1, 1.2]\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');\n         * // => [{ 'x': 1 }, { 'x': 2 }]\n         */\n        uniqBy<T>(\n            array: List<T> | null | undefined,\n            iteratee: ListIterator<T, any>\n        ): T[];\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T, TSort>(\n            array: List<T> | null | undefined,\n            iteratee: ListIterator<T, TSort>\n        ): T[];\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            array: List<T> | null | undefined,\n            iteratee: string\n        ): T[];\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            array: List<T> | null | undefined,\n            iteratee: Object\n        ): T[];\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TWhere extends {}, T>(\n            array: List<T> | null | undefined,\n            iteratee: TWhere\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy(\n            iteratee: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TWhere extends {}>(\n            iteratee: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            iteratee: ListIterator<T, any>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T, TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            iteratee: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            iteratee: Object\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TWhere extends {}, T>(\n            iteratee: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy(\n            iteratee: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TWhere extends {}>(\n            iteratee: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            iteratee: ListIterator<T, any>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T, TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            iteratee: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<T>(\n            iteratee: Object\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.uniqBy\n         */\n        uniqBy<TWhere extends {}, T>(\n            iteratee: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.sortedUniq\n    interface LoDashStatic {\n        /**\n         * This method is like `_.uniq` except that it's designed and optimized\n         * for sorted arrays.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to inspect.\n         * @returns {Array} Returns the new duplicate free array.\n         * @example\n         *\n         * _.sortedUniq([1, 1, 2]);\n         * // => [1, 2]\n         */\n        sortedUniq<T>(\n            array: List<T> | null | undefined\n        ): T[];\n\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<T, TSort>(\n            array: List<T> | null | undefined\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<TSort>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<TSort>(): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        sortedUniq<T>(): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<T, TSort>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<TSort>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<TSort>(): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<T>(): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniq\n         */\n        sortedUniq<T, TSort>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.sortedUniqBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.uniqBy` except that it's designed and optimized\n         * for sorted arrays.\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to inspect.\n         * @param {Function} [iteratee] The iteratee invoked per element.\n         * @returns {Array} Returns the new duplicate free array.\n         * @example\n         *\n         * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);\n         * // => [1.1, 2.2]\n         */\n        sortedUniqBy<T>(\n            array: List<T> | null | undefined,\n            iteratee: ListIterator<T, any>\n        ): T[];\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T, TSort>(\n            array: List<T> | null | undefined,\n            iteratee: ListIterator<T, TSort>\n        ): T[];\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            array: List<T> | null | undefined,\n            iteratee: string\n        ): T[];\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            array: List<T> | null | undefined,\n            iteratee: Object\n        ): T[];\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TWhere extends {}, T>(\n            array: List<T> | null | undefined,\n            iteratee: TWhere\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy(\n            iteratee: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TWhere extends {}>(\n            iteratee: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            iteratee: ListIterator<T, any>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T, TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            iteratee: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            iteratee: Object\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TWhere extends {}, T>(\n            iteratee: TWhere\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy(\n            iteratee: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TWhere extends {}>(\n            iteratee: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            iteratee: ListIterator<T, any>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T, TSort>(\n            iteratee: ListIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            iteratee: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<T>(\n            iteratee: Object\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortedUniqBy\n         */\n        sortedUniqBy<TWhere extends {}, T>(\n            iteratee: TWhere\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.unionWith DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.union` except that it accepts `comparator` which\n         * is invoked to compare elements of `arrays`. The comparator is invoked\n         * with two arguments: (arrVal, othVal).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {...Array} [arrays] The arrays to inspect.\n         * @param {Function} [comparator] The comparator invoked per element.\n         * @returns {Array} Returns the new array of combined values.\n         * @example\n         *\n         * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];\n         * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];\n         *\n         * _.unionWith(objects, others, _.isEqual);\n         * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]\n         */\n        unionWith(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.uniqWith DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.uniq` except that it accepts `comparator` which\n         * is invoked to compare elements of `array`. The comparator is invoked with\n         * two arguments: (arrVal, othVal).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {Array} array The array to inspect.\n         * @param {Function} [comparator] The comparator invoked per element.\n         * @returns {Array} Returns the new duplicate free array.\n         * @example\n         *\n         * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 },  { 'x': 1, 'y': 2 }];\n         *\n         * _.uniqWith(objects, _.isEqual);\n         * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]\n         */\n        uniqWith(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.unzip\n    interface LoDashStatic {\n        /**\n         * This method is like _.zip except that it accepts an array of grouped elements and creates an array\n         * regrouping the elements to their pre-zip configuration.\n         *\n         * @param array The array of grouped elements to process.\n         * @return Returns the new array of regrouped elements.\n         */\n        unzip<T>(array: List<List<T>> | null | undefined): T[][];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.unzip\n         */\n        unzip<T>(): LoDashImplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.unzip\n         */\n        unzip<T>(): LoDashImplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.unzip\n         */\n        unzip<T>(): LoDashExplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.unzip\n         */\n        unzip<T>(): LoDashExplicitArrayWrapper<T[]>;\n    }\n\n    //_.unzipWith\n    interface LoDashStatic {\n        /**\n         * This method is like _.unzip except that it accepts an iteratee to specify how regrouped values should be\n         * combined. The iteratee is bound to thisArg and invoked with four arguments: (accumulator, value, index,\n         * group).\n         *\n         * @param array The array of grouped elements to process.\n         * @param iteratee The function to combine regrouped values.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns the new array of regrouped elements.\n         */\n        unzipWith<TArray, TResult>(\n            array: List<List<TArray>> | null | undefined,\n            iteratee?: MemoIterator<TArray, TResult>\n        ): TResult[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.unzipWith\n         */\n        unzipWith<TArr, TResult>(\n            iteratee?: MemoIterator<TArr, TResult>\n        ): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.unzipWith\n         */\n        unzipWith<TArr, TResult>(\n            iteratee?: MemoIterator<TArr, TResult>\n        ): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    //_.without\n    interface LoDashStatic {\n        /**\n         * Creates an array excluding all provided values using SameValueZero for equality comparisons.\n         *\n         * @param array The array to filter.\n         * @param values The values to exclude.\n         * @return Returns the new array of filtered values.\n         */\n        without<T>(\n            array: List<T> | null | undefined,\n            ...values: T[]\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.without\n         */\n        without(...values: T[]): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.without\n         */\n        without<T>(...values: T[]): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.without\n         */\n        without(...values: T[]): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.without\n         */\n        without<T>(...values: T[]): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.xor\n    interface LoDashStatic {\n        /**\n         * Creates an array of unique values that is the symmetric difference of the provided arrays.\n         *\n         * @param arrays The arrays to inspect.\n         * @return Returns the new array of values.\n         */\n        xor<T>(...arrays: Array<List<T> | null | undefined>): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.xor\n         */\n        xor(...arrays: Array<List<T> | null | undefined>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.xor\n         */\n        xor<T>(...arrays: Array<List<T> | null | undefined>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.xor\n         */\n        xor(...arrays: Array<List<T> | null | undefined>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.xor\n         */\n        xor<T>(...arrays: Array<List<T> | null | undefined>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.xorBy DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.xor` except that it accepts `iteratee` which is\n         * invoked for each element of each `arrays` to generate the criterion by which\n         * uniqueness is computed. The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {...Array} [arrays] The arrays to inspect.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {Array} Returns the new array of values.\n         * @example\n         *\n         * _.xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);\n         * // => [1.2, 4.3]\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');\n         * // => [{ 'x': 2 }]\n         */\n        xorBy(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.xorWith DUMMY\n    interface LoDashStatic {\n        /**\n         * This method is like `_.xor` except that it accepts `comparator` which is\n         * invoked to compare elements of `arrays`. The comparator is invoked with\n         * two arguments: (arrVal, othVal).\n         *\n         * @static\n         * @memberOf _\n         * @category Array\n         * @param {...Array} [arrays] The arrays to inspect.\n         * @param {Function} [comparator] The comparator invoked per element.\n         * @returns {Array} Returns the new array of values.\n         * @example\n         *\n         * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];\n         * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];\n         *\n         * _.xorWith(objects, others, _.isEqual);\n         * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]\n         */\n        xorWith(\n            array: List<any>,\n            ...values: any[]\n        ): any[];\n    }\n\n    //_.zip\n    interface LoDashStatic {\n        /**\n         * Creates an array of grouped elements, the first of which contains the first elements of the given arrays,\n         * the second of which contains the second elements of the given arrays, and so on.\n         *\n         * @param arrays The arrays to process.\n         * @return Returns the new array of grouped elements.\n         */\n        zip<T>(...arrays: Array<List<T> | null | undefined>): T[][];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.zip\n         */\n        zip<T>(...arrays: Array<List<T> | null | undefined>): _.LoDashImplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.zip\n         */\n        zip<T>(...arrays: Array<List<T> | null | undefined>): _.LoDashImplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.zip\n         */\n        zip<T>(...arrays: Array<List<T> | null | undefined>): _.LoDashExplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.zip\n         */\n        zip<T>(...arrays: Array<List<T> | null | undefined>): _.LoDashExplicitArrayWrapper<T[]>;\n    }\n\n    //_.zipObject\n    interface LoDashStatic {\n        /**\n         * This method is like _.fromPairs except that it accepts two arrays, one of property\n         * identifiers and one of corresponding values.\n         *\n         * @param props The property names.\n         * @param values The property values.\n         * @return Returns the new object.\n         */\n        zipObject<TValues, TResult extends {}>(\n            props: List<StringRepresentable>|List<List<any>>,\n            values?: List<TValues>\n        ): TResult;\n        /**\n         * This method is like _.zipObject except that it supports property paths.\n         *\n         * @param props The property names.\n         * @param values The property values.\n         * @return Returns the new object.\n         */\n        zipObjectDeep<TValues, TResult extends {}>(\n            props: List<StringRepresentable>|List<List<any>>,\n            values?: List<TValues>\n        ): TResult;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TResult extends {}>(\n            props: List<StringRepresentable>|List<List<any>>,\n            values?: List<any>\n        ): TResult;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TResult extends {}>(\n            props: List<StringRepresentable>|List<List<any>>,\n            values?: List<any>\n        ): TResult;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject(\n            props: List<StringRepresentable>|List<List<any>>,\n            values?: List<any>\n        ): _.Dictionary<any>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep(\n            props: List<StringRepresentable>|List<List<any>>,\n            values?: List<any>\n        ): _.Dictionary<any>;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<_.Dictionary<any>>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<_.Dictionary<any>>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<_.Dictionary<any>>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep(\n            values?: List<any>\n        ): _.LoDashImplicitObjectWrapper<_.Dictionary<any>>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<_.Dictionary<any>>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<_.Dictionary<any>>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TValues, TResult extends {}>(\n            values?: List<TValues>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep<TResult extends {}>(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.zipObject\n         */\n        zipObject(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<_.Dictionary<any>>;\n        /**\n         * @see _.zipObjectDeep\n         */\n        zipObjectDeep(\n            values?: List<any>\n        ): _.LoDashExplicitObjectWrapper<_.Dictionary<any>>;\n    }\n\n    //_.zipWith\n    interface LoDashStatic {\n        /**\n         * This method is like _.zip except that it accepts an iteratee to specify how grouped values should be\n         * combined. The iteratee is bound to thisArg and invoked with four arguments: (accumulator, value, index,\n         * group).\n         * @param {...Array} [arrays] The arrays to process.\n         * @param {Function} [iteratee] The function to combine grouped values.\n         * @param {*} [thisArg] The `this` binding of `iteratee`.\n         * @return Returns the new array of grouped elements.\n         */\n        zipWith<TResult>(...args: any[]): TResult[];\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.zipWith\n         */\n        zipWith<TResult>(...args: any[]): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    /*********\n     * Chain *\n     *********/\n\n    //_.chain\n    interface LoDashStatic {\n        /**\n         * Creates a lodash object that wraps value with explicit method chaining enabled.\n         *\n         * @param value The value to wrap.\n         * @return Returns the new lodash wrapper instance.\n         */\n        chain(value: number): LoDashExplicitWrapper<number>;\n        chain(value: string): LoDashExplicitWrapper<string>;\n        chain(value: boolean): LoDashExplicitWrapper<boolean>;\n        chain(value: null | undefined): LoDashExplicitWrapper<null | undefined>;\n        chain<T>(value: T[]): LoDashExplicitArrayWrapper<T>;\n        chain<T>(value: ReadonlyArray<T>): LoDashExplicitArrayWrapper<T>;\n        chain<T>(value: T[] | null | undefined): LoDashExplicitNillableArrayWrapper<T>;\n        chain<T>(value: ReadonlyArray<T> | null | undefined): LoDashExplicitNillableArrayWrapper<T>;\n        chain<T extends {}>(value: T): LoDashExplicitObjectWrapper<T>;\n        chain<T extends {}>(value: T | null | undefined): LoDashExplicitObjectWrapper<T | null | undefined>;\n        chain(value: any): LoDashExplicitWrapper<any>;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.chain\n         */\n        chain(): LoDashExplicitWrapper<T>;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.chain\n         */\n        chain(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitNillableArrayWrapper<T> {\n        /**\n         * @see _.chain\n         */\n        chain(): LoDashExplicitNillableArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.chain\n         */\n        chain(): LoDashExplicitObjectWrapper<T>;\n    }\n\n    interface LoDashImplicitNillableObjectWrapper<T> {\n        /**\n         * @see _.chain\n         */\n        chain(): LoDashExplicitNillableObjectWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.chain\n         */\n        chain(): TWrapper;\n    }\n\n    //_.tap\n    interface LoDashStatic {\n        /**\n         * This method invokes interceptor and returns value. The interceptor is bound to thisArg and invoked with one\n         * argument; (value). The purpose of this method is to \"tap into\" a method chain in order to perform operations\n         * on intermediate results within the chain.\n         *\n         * @param value The value to provide to interceptor.\n         * @param interceptor The function to invoke.\n         * @parem thisArg The this binding of interceptor.\n         * @return Returns value.\n         **/\n        tap<T>(\n            value: T,\n            interceptor: (value: T) => void\n        ): T;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.tap\n         */\n        tap(\n            interceptor: (value: T) => void\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.tap\n         */\n        tap(\n            interceptor: (value: T) => void\n        ): TWrapper;\n    }\n\n    //_.thru\n    interface LoDashStatic {\n        /**\n         * This method is like _.tap except that it returns the result of interceptor.\n         *\n         * @param value The value to provide to interceptor.\n         * @param interceptor The function to invoke.\n         * @param thisArg The this binding of interceptor.\n         * @return Returns the result of interceptor.\n         */\n        thru<T, TResult>(\n            value: T,\n            interceptor: (value: T) => TResult\n        ): TResult;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends number>(\n            interceptor: (value: T) => TResult): LoDashImplicitWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends string>(\n            interceptor: (value: T) => TResult): LoDashImplicitWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends boolean>(\n            interceptor: (value: T) => TResult): LoDashImplicitWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends {}>(\n            interceptor: (value: T) => TResult): LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult>(\n            interceptor: (value: T) => TResult[]): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends number>(\n            interceptor: (value: T) => TResult\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends string>(\n            interceptor: (value: T) => TResult\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends boolean>(\n            interceptor: (value: T) => TResult\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult extends {}>(\n            interceptor: (value: T) => TResult\n        ): LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.thru\n         */\n        thru<TResult>(\n            interceptor: (value: T) => TResult[]\n        ): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.prototype.commit\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * Executes the chained sequence and returns the wrapped result.\n         *\n         * @return Returns the new lodash wrapper instance.\n         */\n        commit(): TWrapper;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.commit\n         */\n        commit(): TWrapper;\n    }\n\n    //_.prototype.concat\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * Creates a new array joining a wrapped array with any additional arrays and/or values.\n         *\n         * @param items\n         * @return Returns the new concatenated array.\n         */\n        concat<TItem>(...items: Array<Many<TItem>>): LoDashImplicitArrayWrapper<TItem>;\n\n        /**\n         * @see _.concat\n         */\n        concat(...items: Array<Many<T>>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.concat\n         */\n        concat<TItem>(...items: Array<Many<TItem>>): LoDashExplicitArrayWrapper<TItem>;\n\n        /**\n         * @see _.concat\n         */\n        concat(...items: Array<Many<T>>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.prototype.plant\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * Creates a clone of the chained sequence planting value as the wrapped value.\n         * @param value The value to plant as the wrapped value.\n         * @return Returns the new lodash wrapper instance.\n         */\n        plant(value: number): LoDashImplicitWrapper<number>;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: string): LoDashImplicitStringWrapper;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: boolean): LoDashImplicitWrapper<boolean>;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: number[]): LoDashImplicitNumberArrayWrapper;\n\n        /**\n         * @see _.plant\n         */\n        plant<T>(value: T[]): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.plant\n         */\n        plant<T>(value: ReadonlyArray<T>): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.plant\n         */\n        plant<T extends {}>(value: T): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: any): LoDashImplicitWrapper<any>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.plant\n         */\n        plant(value: number): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: string): LoDashExplicitStringWrapper;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: boolean): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: number[]): LoDashExplicitNumberArrayWrapper;\n\n        /**\n         * @see _.plant\n         */\n        plant<T>(value: T[]): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.plant\n         */\n        plant<T>(value: ReadonlyArray<T>): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.plant\n         */\n        plant<T extends {}>(value: T): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.plant\n         */\n        plant(value: any): LoDashExplicitWrapper<any>;\n    }\n\n    //_.prototype.reverse\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * Reverses the wrapped array so the first element becomes the last, the second element becomes the second to\n         * last, and so on.\n         *\n         * Note: This method mutates the wrapped array.\n         *\n         * @return Returns the new reversed lodash wrapper instance.\n         */\n        reverse(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.reverse\n         */\n        reverse(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.prototype.toJSON\n    interface LoDashWrapperBase<T, TWrapper> {\n        /**\n         * @see _.value\n         */\n        toJSON(): T;\n    }\n\n    //_.prototype.toString\n    interface LoDashWrapperBase<T, TWrapper> {\n        /**\n         * Produces the result of coercing the unwrapped value to a string.\n         *\n         * @return Returns the coerced string value.\n         */\n        toString(): string;\n    }\n\n    //_.prototype.value\n    interface LoDashWrapperBase<T, TWrapper> {\n        /**\n         * Executes the chained sequence to extract the unwrapped value.\n         *\n         * @alias _.toJSON, _.valueOf\n         *\n         * @return Returns the resolved unwrapped value.\n         */\n        value(): T;\n    }\n\n    //_.valueOf\n    interface LoDashWrapperBase<T, TWrapper> {\n        /**\n         * @see _.value\n         */\n        valueOf(): T;\n    }\n\n    /**************\n     * Collection *\n     **************/\n\n    //_.at\n    interface LoDashStatic {\n        /**\n         * Creates an array of elements corresponding to the given keys, or indexes, of collection. Keys may be\n         * specified as individual arguments or as arrays of keys.\n         *\n         * @param collection The collection to iterate over.\n         * @param props The property names or indexes of elements to pick, specified individually or in arrays.\n         * @return Returns the new array of picked elements.\n         */\n        at<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            ...props: Array<Many<number|string>>\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.at\n         */\n        at(...props: Array<Many<number|string>>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.at\n         */\n        at<T>(...props: Array<Many<number|string>>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.at\n         */\n        at(...props: Array<Many<number|string>>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.at\n         */\n        at<T>(...props: Array<Many<number|string>>): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.countBy\n    interface LoDashStatic {\n        /**\n         * Creates an object composed of keys generated from the results of running each element of collection through\n         * iteratee. The corresponding value of each key is the number of times the key was returned by iteratee. The\n         * iteratee is bound to thisArg and invoked with three arguments:\n         * (value, index|key, collection).\n         *\n         * If a property name is provided for iteratee the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for iteratee the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param collection The collection to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns the composed aggregate object.\n         */\n        countBy<T>(\n            collection: List<T> | null | undefined,\n            iteratee?: ListIterator<T, any>\n        ): Dictionary<number>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<T>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<number>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<T>(\n            collection: NumericDictionary<T> | null | undefined,\n            iteratee?: NumericDictionaryIterator<T, any>\n        ): Dictionary<number>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            iteratee?: string\n        ): Dictionary<number>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<W, T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            iteratee?: W\n        ): Dictionary<number>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            iteratee?: Object\n        ): Dictionary<number>;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashImplicitObjectWrapper<Dictionary<number>>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashImplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<W>(\n            iteratee?: W\n        ): LoDashImplicitObjectWrapper<Dictionary<number>>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.countBy\n         */\n        countBy<T>(\n            iteratee?: ListIterator<T, any>|DictionaryIterator<T, any>|NumericDictionaryIterator<T, any>\n        ): LoDashImplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<W>(\n            iteratee?: W\n        ): LoDashImplicitObjectWrapper<Dictionary<number>>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashExplicitObjectWrapper<Dictionary<number>>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashExplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<W>(\n            iteratee?: W\n        ): LoDashExplicitObjectWrapper<Dictionary<number>>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.countBy\n         */\n        countBy<T>(\n            iteratee?: ListIterator<T, any>|DictionaryIterator<T, any>|NumericDictionaryIterator<T, any>\n        ): LoDashExplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<number>>;\n\n        /**\n         * @see _.countBy\n         */\n        countBy<W>(\n            iteratee?: W\n        ): LoDashExplicitObjectWrapper<Dictionary<number>>;\n    }\n\n    //_.each\n    interface LoDashStatic {\n        each: typeof _.forEach;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.forEach\n         */\n        each(\n            iteratee: StringIterator<any>\n        ): LoDashImplicitWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        each(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        each<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.forEach\n         */\n        each(\n            iteratee: StringIterator<any>\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        each(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        each<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.eachRight\n    interface LoDashStatic {\n        eachRight: typeof _.forEachRight;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.forEachRight\n         */\n        eachRight(\n            iteratee: StringIterator<any>\n        ): LoDashImplicitWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        eachRight(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        eachRight<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.forEachRight\n         */\n        eachRight(\n            iteratee: StringIterator<any>\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        eachRight(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        eachRight<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.every\n    interface LoDashStatic {\n        /**\n         * Checks if predicate returns truthy for all elements of collection. Iteration is stopped once predicate\n         * returns falsey. The predicate is invoked with three arguments: (value, index|key, collection).\n         *\n         * @param collection The collection to iterate over.\n         * @param predicate The function invoked per iteration.\n         * @return Returns true if all elements pass the predicate check, else false.\n         */\n        every<T>(\n            collection: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.every\n         */\n        every<T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate?: DictionaryIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.every\n         */\n        every<T>(\n            collection: NumericDictionary<T> | null | undefined,\n            predicate?: NumericDictionaryIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.every\n         */\n        every<T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            predicate?: string|any[]|PartialObject<T>\n        ): boolean;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: ListIterator<T, boolean>|NumericDictionaryIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: string|any[]\n        ): boolean;\n\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: PartialObject<T>\n        ): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.every\n         */\n        every<TResult>(\n            predicate?: ListIterator<TResult, boolean>|DictionaryIterator<TResult, boolean>|NumericDictionaryIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: string|any[]\n        ): boolean;\n\n        /**\n         * @see _.every\n         */\n        every<TResult>(\n            predicate?: PartialObject<TResult>\n        ): boolean;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: ListIterator<T, boolean>|NumericDictionaryIterator<T, boolean>\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: string|any[]\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: PartialObject<T>\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.every\n         */\n        every<TResult>(\n            predicate?: ListIterator<TResult, boolean>|DictionaryIterator<TResult, boolean>|NumericDictionaryIterator<T, boolean>\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.every\n         */\n        every(\n            predicate?: string|any[]\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.every\n         */\n        every<TResult>(\n            predicate?: PartialObject<TResult>\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.filter\n    interface LoDashStatic {\n        /**\n         * Iterates over elements of collection, returning an array of all elements predicate returns truthy for. The\n         * predicate is bound to thisArg and invoked with three arguments: (value, index|key, collection).\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param collection The collection to iterate over.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the new filtered array.\n         */\n        filter<T, S extends T>(\n            collection: List<T> | null | undefined,\n            predicate: ListIteratorTypeGuard<T, S>\n        ): S[];\n\n        /**\n         * @see _.filter\n         */\n        filter<T>(\n            collection: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>\n        ): T[];\n\n        /**\n         * @see _.filter\n         */\n        filter<T, S extends T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate: DictionaryIteratorTypeGuard<T, S>\n        ): S[];\n\n        /**\n         * @see _.filter\n         */\n        filter<T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate?: DictionaryIterator<T, boolean>\n        ): T[];\n\n        /**\n         * @see _.filter\n         */\n        filter(\n            collection: string | null | undefined,\n            predicate?: StringIterator<boolean>\n        ): string[];\n\n        /**\n         * @see _.filter\n         */\n        filter<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            predicate: string | [string, any] | RegExp | PartialObject<T>\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.filter\n         */\n        filter(\n            predicate?: StringIterator<boolean>\n        ): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.filter\n         */\n        filter<S extends T>(\n            predicate: ListIteratorTypeGuard<T, S>\n        ): LoDashImplicitArrayWrapper<S>;\n\n        /**\n         * @see _.filter\n         */\n        filter(\n            predicate: ListIterator<T, boolean> | string | [string, any] | RegExp | PartialObject<T>\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.filter\n         */\n        filter<T, S extends T>(\n            predicate: ListIteratorTypeGuard<T, S>\n        ): LoDashImplicitArrayWrapper<S>;\n\n        /**\n         * @see _.filter\n         */\n        filter<T>(\n            predicate: ListIterator<T, boolean> | DictionaryIterator<T, boolean> | string | [string, any] | RegExp | PartialObject<T>\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.filter\n         */\n        filter(\n            predicate?: StringIterator<boolean>\n        ): LoDashExplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.filter\n         */\n        filter<S extends T>(\n            predicate: ListIteratorTypeGuard<T, S>\n        ): LoDashExplicitArrayWrapper<S>;\n\n        /**\n         * @see _.filter\n         */\n        filter(\n            predicate: ListIterator<T, boolean> | string | [string, any] | RegExp | PartialObject<T>\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.filter\n         */\n        filter<T, S extends T>(\n            predicate: ListIteratorTypeGuard<T, S>\n        ): LoDashExplicitArrayWrapper<S>;\n\n        /**\n         * @see _.filter\n         */\n        filter<T>(\n            predicate: ListIterator<T, boolean> | DictionaryIterator<T, boolean> | string | [string, any] | RegExp | PartialObject<T>\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.find\n    interface LoDashStatic {\n        /**\n         * Iterates over elements of collection, returning the first element predicate returns truthy for.\n         * The predicate is bound to thisArg and invoked with three arguments: (value, index|key, collection).\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param collection The collection to search.\n         * @param predicate The function invoked per iteration.\n         * @param fromIndex The index to search from.\n         * @return Returns the matched element, else undefined.\n         */\n        find<T, S extends T>(\n            collection: List<T> | null | undefined,\n            predicate: ListIteratorTypeGuard<T, S>,\n            fromIndex?: number\n        ): S|undefined;\n        \n        /**\n         * @see _.find\n         */\n        find<T>(\n            collection: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): T|undefined;\n\n        /**\n         * @see _.find\n         */\n        find<T, S extends T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate: DictionaryIteratorTypeGuard<T, S>,\n            fromIndex?: number\n        ): S|undefined;\n\n        /**\n         * @see _.find\n         */\n        find<T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate?: DictionaryIterator<T, boolean>,\n            fromIndex?: number\n        ): T|undefined;\n\n        /**\n         * @see _.find\n         */\n        find<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            predicate?: string | PartialObject<T> | [string, any],\n            fromIndex?: number\n        ): T|undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.find\n         */\n        find<S extends T>(\n            predicate: ListIteratorTypeGuard<T, S>,\n            fromIndex?: number\n        ): S|undefined;\n\n        /**\n         * @see _.find\n         */\n        find(\n            predicate?: ListIterator<T, boolean> | string | PartialObject<T> | [string, any],\n            fromIndex?: number\n        ): T|undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.find\n         */\n        find<TResult>(\n            predicate?: ListIterator<TResult, boolean> | DictionaryIterator<TResult, boolean> | string | PartialObject<TResult> | [string, any],\n            fromIndex?: number\n        ): TResult|undefined;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.find\n         */\n        find(\n            predicate?: ListIterator<T, boolean> | string | PartialObject<T> | [string, any],\n            fromIndex?: number\n        ): any;\n    }\n\n    //_.findLast\n    interface LoDashStatic {\n        /**\n        * This method is like _.find except that it iterates over elements of a collection from\n        * right to left.\n        * @param collection Searches for a value in this list.\n        * @param predicate The function called per iteration.\n        * @param fromIndex The index to search from.\n        * @return The found element, else undefined.\n        **/\n        findLast<T, S extends T>(\n            collection: List<T> | null | undefined,\n            predicate: ListIteratorTypeGuard<T, S>,\n            fromIndex?: number\n        ): S|undefined;\n        \n        /**\n         * @see _.findLast\n         */\n        findLast<T>(\n            collection: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>,\n            fromIndex?: number\n        ): T|undefined;\n\n        /**\n         * @see _.findLast\n         */\n        findLast<T, S extends T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate: DictionaryIteratorTypeGuard<T, S>,\n            fromIndex?: number\n        ): S|undefined;\n\n        /**\n         * @see _.findLast\n         */\n        findLast<T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate?: DictionaryIterator<T, boolean>,\n            fromIndex?: number\n        ): T|undefined;\n\n        /**\n         * @see _.findLast\n         */\n        findLast<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            predicate?: string | PartialObject<T> | [string, any],\n            fromIndex?: number\n        ): T|undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.findLast\n         */\n        findLast<S extends T>(\n            predicate: ListIteratorTypeGuard<T, S>,\n            fromIndex?: number\n        ): S|undefined;\n\n        /**\n         * @see _.findLast\n         */\n        findLast(\n            predicate?: ListIterator<T, boolean> | string | PartialObject<T> | [string, any],\n            fromIndex?: number\n        ): T|undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findLast\n         */\n        findLast<TResult>(\n            predicate?: ListIterator<TResult, boolean> | DictionaryIterator<TResult, boolean> | string | PartialObject<TResult> | [string, any],\n            fromIndex?: number\n        ): TResult|undefined;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.findLast\n         */\n        findLast(\n            predicate?: ListIterator<T, boolean> | string | PartialObject<T> | [string, any],\n            fromIndex?: number\n        ): any;\n    }\n\n    //_.flatMap\n    interface LoDashStatic {\n        /**\n         * Creates an array of flattened values by running each element in collection through iteratee\n         * and concating its result to the other mapped values. The iteratee is invoked with three arguments:\n         * (value, index|key, collection).\n         *\n         * @param collection The collection to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @return Returns the new flattened array.\n         */\n        flatMap<T>(\n            collection: List<Many<T>> | Dictionary<Many<T>> | NumericDictionary<Many<T>> | null | undefined\n        ): T[];\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<T, TResult>(\n            collection: List<T> | null | undefined,\n            iteratee: ListIterator<T, Many<TResult>> | string\n        ): TResult[];\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<T, TResult>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee: DictionaryIterator<T, Many<TResult>> | string\n        ): TResult[];\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<T, TResult>(\n            collection: NumericDictionary<T> | null | undefined,\n            iteratee: NumericDictionaryIterator<T, Many<TResult>> | string\n        ): TResult[];\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(\n            collection: object | null | undefined,\n            iteratee?: ObjectIterator<any, Many<TResult>> | string\n        ): TResult[];\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap(\n            collection: object | null | undefined,\n            iteratee: object\n        ): boolean[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(\n            iteratee: StringIterator<Many<TResult>>\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap(): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(\n            iteratee: ListIterator<T, Many<TResult>>|string\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap(\n            iteratee: object\n        ): LoDashImplicitArrayWrapper<boolean>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.flatMap\n         */\n        flatMap<T, TResult>(\n            iteratee: ListIterator<T, Many<TResult>>|DictionaryIterator<T, Many<TResult>>|NumericDictionaryIterator<T, Many<TResult>>\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(\n            iteratee: ObjectIterator<any, Many<TResult>>|string\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap(\n            iteratee: object\n        ): LoDashImplicitArrayWrapper<boolean>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(\n            iteratee: StringIterator<Many<TResult>>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap(): LoDashExplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(\n            iteratee: ListIterator<T, Many<TResult>>|string\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap(\n            iteratee: object\n        ): LoDashExplicitArrayWrapper<boolean>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.flatMap\n         */\n        flatMap<T, TResult>(\n            iteratee: ListIterator<T, Many<TResult>>|DictionaryIterator<T, Many<TResult>>|NumericDictionaryIterator<T, Many<TResult>>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(\n            iteratee: ObjectIterator<any, Many<TResult>>|string\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap(\n            iteratee: object\n        ): LoDashExplicitArrayWrapper<boolean>;\n\n        /**\n         * @see _.flatMap\n         */\n        flatMap<TResult>(): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.forEach\n    interface LoDashStatic {\n        /**\n         * Iterates over elements of collection invoking iteratee for each element. The iteratee is bound to thisArg\n         * and invoked with three arguments:\n         * (value, index|key, collection). Iteratee functions may exit iteration early by explicitly returning false.\n         *\n         * Note: As with other \"Collections\" methods, objects with a \"length\" property are iterated like arrays. To\n         * avoid this behavior _.forIn or _.forOwn may be used for object iteration.\n         *\n         * @alias _.each\n         *\n         * @param collection The collection to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         */\n        forEach<TString extends string | null | undefined>(\n            collection: TString,\n            iteratee?: StringIterator<any>\n        ): TString;\n\n        /**\n         * @see _.forEach\n         */\n        forEach<T, TList extends List<T> | null | undefined>(\n            collection: TList & (List<T> | null | undefined),\n            iteratee?: ListIterator<T, any>\n        ): TList;\n\n        /**\n         * @see _.forEach\n         */\n        forEach<T, TDictionary extends Dictionary<T> | null | undefined>(\n            collection: TDictionary & (Dictionary<T> | null | undefined),\n            iteratee?: DictionaryIterator<T, any>\n        ): TDictionary;\n\n        /**\n         * @see _.forEach\n         */\n        forEach<T extends {} | null | undefined>(\n            collection: T,\n            iteratee?: ObjectIterator<any, any>\n        ): T;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.forEach\n         */\n        forEach(\n            iteratee: StringIterator<any>\n        ): LoDashImplicitWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        forEach(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        forEach<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.forEach\n         */\n        forEach(\n            iteratee: StringIterator<any>\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        forEach(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEach\n         */\n        forEach<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.forEachRight\n    interface LoDashStatic {\n        /**\n         * This method is like _.forEach except that it iterates over elements of collection from right to left.\n         *\n         * @alias _.eachRight\n         *\n         * @param collection The collection to iterate over.\n         * @param iteratee The function called per iteration.\n         * @param thisArg The this binding of callback.\n         */\n        forEachRight<TString extends string | null | undefined>(\n            collection: TString,\n            iteratee?: StringIterator<any>\n        ): TString;\n\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight<T, TList extends List<T> | null | undefined>(\n            collection: TList & (List<T> | null | undefined),\n            iteratee?: ListIterator<T, any>\n        ): TList;\n\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight<T, TDictionary extends Dictionary<T> | null | undefined>(\n            collection: TDictionary & (Dictionary<T> | null | undefined),\n            iteratee?: DictionaryIterator<T, any>\n        ): TDictionary;\n\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight<T extends {} | null | undefined>(\n            collection: T,\n            iteratee?: ObjectIterator<any, any>\n        ): T;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight(\n            iteratee: StringIterator<any>\n        ): LoDashImplicitWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight(\n            iteratee: StringIterator<any>\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight(\n            iteratee: ListIterator<T, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forEachRight\n         */\n        forEachRight<TValue>(\n            iteratee?: ListIterator<TValue, any>|DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.groupBy\n    interface LoDashStatic {\n        /**\n         * Creates an object composed of keys generated from the results of running each element of collection through\n         * iteratee. The corresponding value of each key is an array of the elements responsible for generating the\n         * key. The iteratee is bound to thisArg and invoked with three arguments:\n         * (value, index|key, collection).\n         *\n         * If a property name is provided for iteratee the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for iteratee the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param collection The collection to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns the composed aggregate object.\n         */\n        groupBy<T, TKey>(\n            collection: List<T> | null | undefined,\n            iteratee?: ListIterator<T, TKey>\n        ): Dictionary<T[]>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            collection: List<any> | null | undefined,\n            iteratee?: ListIterator<T, any>\n        ): Dictionary<T[]>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T, TKey>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, TKey>\n        ): Dictionary<T[]>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            collection: Dictionary<any> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T[]>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T, TValue>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: string\n        ): Dictionary<T[]>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: string\n        ): Dictionary<T[]>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TWhere, T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: TWhere\n        ): Dictionary<T[]>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: Object\n        ): Dictionary<T[]>;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TKey>(\n            iteratee?: ListIterator<T, TKey>\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TKey>(\n            iteratee?: ListIterator<T, TKey>\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TValue>(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TWhere>(\n            iteratee?: TWhere\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T, TKey>(\n            iteratee?: ListIterator<T, TKey>|DictionaryIterator<T, TKey>\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            iteratee?: ListIterator<T, any>|DictionaryIterator<T, any>\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T, TValue>(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TWhere, T>(\n            iteratee?: TWhere\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            iteratee?: Object\n        ): LoDashImplicitObjectWrapper<Dictionary<T[]>>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TKey>(\n            iteratee?: ListIterator<T, TKey>\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TKey>(\n            iteratee?: ListIterator<T, TKey>\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TValue>(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TWhere>(\n            iteratee?: TWhere\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T, TKey>(\n            iteratee?: ListIterator<T, TKey>|DictionaryIterator<T, TKey>\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            iteratee?: ListIterator<T, any>|DictionaryIterator<T, any>\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T, TValue>(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<TWhere, T>(\n            iteratee?: TWhere\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n\n        /**\n         * @see _.groupBy\n         */\n        groupBy<T>(\n            iteratee?: Object\n        ): LoDashExplicitObjectWrapper<Dictionary<T[]>>;\n    }\n\n    //_.includes\n    interface LoDashStatic {\n        /**\n         * Checks if target is in collection using SameValueZero for equality comparisons. If fromIndex is negative,\n         * it’s used as the offset from the end of collection.\n         *\n         * @param collection The collection to search.\n         * @param target The value to search for.\n         * @param fromIndex The index to search from.\n         * @return True if the target element is found, else false.\n         */\n        includes<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            target: T,\n            fromIndex?: number\n        ): boolean;\n\n        /**\n         * @see _.includes\n         */\n        includes(\n            collection: string | null | undefined,\n            target: string,\n            fromIndex?: number\n        ): boolean;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.includes\n         */\n        includes(\n            target: T,\n            fromIndex?: number\n        ): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.includes\n         */\n        includes<TValue>(\n            target: TValue,\n            fromIndex?: number\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.includes\n         */\n        includes(\n            target: string,\n            fromIndex?: number\n        ): boolean;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.includes\n         */\n        includes(\n            target: T,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.includes\n         */\n        includes<TValue>(\n            target: TValue,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.includes\n         */\n        includes(\n            target: string,\n            fromIndex?: number\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.keyBy\n    interface LoDashStatic {\n        /**\n         * Creates an object composed of keys generated from the results of running each element of collection through\n         * iteratee. The corresponding value of each key is the last element responsible for generating the key. The\n         * iteratee function is bound to thisArg and invoked with three arguments:\n         * (value, index|key, collection).\n         *\n         * If a property name is provided for iteratee the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for iteratee the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param collection The collection to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns the composed aggregate object.\n         */\n        keyBy<T>(\n            collection: List<T> | null | undefined,\n            iteratee?: ListIterator<T, any>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            collection: NumericDictionary<T> | null | undefined,\n            iteratee?: NumericDictionaryIterator<T, any>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            collection: List<T>|NumericDictionary<T>|Dictionary<T> | null | undefined,\n            iteratee?: string\n        ): Dictionary<T>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<W extends Object, T>(\n            collection: List<T>|NumericDictionary<T>|Dictionary<T> | null | undefined,\n            iteratee?: W\n        ): Dictionary<T>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            collection: List<T>|NumericDictionary<T>|Dictionary<T> | null | undefined,\n            iteratee?: Object\n        ): Dictionary<T>;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.keyBy\n         */\n        keyBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.keyBy\n         */\n        keyBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<W extends Object>(\n            iteratee?: W\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            iteratee?: ListIterator<T, any>|NumericDictionaryIterator<T, any>|DictionaryIterator<T, any>\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<W extends Object, T>(\n            iteratee?: W\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            iteratee?: Object\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.keyBy\n         */\n        keyBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.keyBy\n         */\n        keyBy(\n            iteratee?: ListIterator<T, any>\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<W extends Object>(\n            iteratee?: W\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            iteratee?: ListIterator<T, any>|NumericDictionaryIterator<T, any>|DictionaryIterator<T, any>\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<W extends Object, T>(\n            iteratee?: W\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.keyBy\n         */\n        keyBy<T>(\n            iteratee?: Object\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    //_.invoke\n    interface LoDashStatic {\n        /**\n        * Invokes the method at path of object.\n        * @param object The object to query.\n        * @param path The path of the method to invoke.\n        * @param args The arguments to invoke the method with.\n        **/\n        invoke<TObject extends Object, TResult>(\n            object: TObject,\n            path: Many<StringRepresentable>,\n            ...args: any[]): TResult;\n\n        /**\n        * @see _.invoke\n        **/\n        invoke<TValue, TResult>(\n            object: Dictionary<TValue>|TValue[],\n            path: Many<StringRepresentable>,\n            ...args: any[]): TResult;\n\n        /**\n        * @see _.invoke\n        **/\n        invoke<TResult>(\n            object: any,\n            path: Many<StringRepresentable>,\n            ...args: any[]): TResult;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n        * @see _.invoke\n        **/\n        invoke<TResult>(\n            path: Many<StringRepresentable>,\n            ...args: any[]): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n        * @see _.invoke\n        **/\n        invoke<TResult>(\n            path: Many<StringRepresentable>,\n            ...args: any[]): TResult;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n        * @see _.invoke\n        **/\n        invoke<TResult>(\n            path: Many<StringRepresentable>,\n            ...args: any[]): TResult;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n        * @see _.invoke\n        **/\n        invoke<TResult>(\n            path: Many<StringRepresentable>,\n            ...args: any[]): TResult;\n    }\n\n    //_.invokeMap\n    interface LoDashStatic {\n        /**\n        * Invokes the method named by methodName on each element in the collection returning\n        * an array of the results of each invoked method. Additional arguments will be provided\n        * to each invoked method. If methodName is a function it will be invoked for, and this\n        * bound to, each element in the collection.\n        * @param collection The collection to iterate over.\n        * @param methodName The name of the method to invoke.\n        * @param args Arguments to invoke the method with.\n        **/\n        invokeMap<TValue extends {}, TResult>(\n            collection: TValue[] | null | undefined,\n            methodName: string,\n            ...args: any[]): TResult[];\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TValue extends {}, TResult>(\n            collection: Dictionary<TValue> | null | undefined,\n            methodName: string,\n            ...args: any[]): TResult[];\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            collection: Array<{}> | null | undefined,\n            methodName: string,\n            ...args: any[]): TResult[];\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            collection: Dictionary<{}> | null | undefined,\n            methodName: string,\n            ...args: any[]): TResult[];\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TValue extends {}, TResult>(\n            collection: TValue[] | null | undefined,\n            method: (...args: any[]) => TResult,\n            ...args: any[]): TResult[];\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TValue extends {}, TResult>(\n            collection: Dictionary<TValue> | null | undefined,\n            method: (...args: any[]) => TResult,\n            ...args: any[]): TResult[];\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            collection: Array<{}> | null | undefined,\n            method: (...args: any[]) => TResult,\n            ...args: any[]): TResult[];\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            collection: Dictionary<{}> | null | undefined,\n            method: (...args: any[]) => TResult,\n            ...args: any[]): TResult[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            methodName: string,\n            ...args: any[]): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            method: (...args: any[]) => TResult,\n            ...args: any[]): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            methodName: string,\n            ...args: any[]): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            method: (...args: any[]) => TResult,\n            ...args: any[]): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            methodName: string,\n            ...args: any[]): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            method: (...args: any[]) => TResult,\n            ...args: any[]): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            methodName: string,\n            ...args: any[]): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n        * @see _.invokeMap\n        **/\n        invokeMap<TResult>(\n            method: (...args: any[]) => TResult,\n            ...args: any[]): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.map\n    interface LoDashStatic {\n        /**\n         * Creates an array of values by running each element in collection through iteratee. The iteratee is bound to\n         * thisArg and invoked with three arguments: (value, index|key, collection).\n         *\n         * If a property name is provided for iteratee the created _.property style callback returns the property value\n         * of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for iteratee the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * Many lodash methods are guarded to work as iteratees for methods like _.every, _.filter, _.map, _.mapValues,\n         * _.reject, and _.some.\n         *\n         * The guarded methods are:\n         * ary, callback, chunk, clone, create, curry, curryRight, drop, dropRight, every, fill, flatten, invert, max,\n         * min, parseInt, slice, sortBy, take, takeRight, template, trim, trimLeft, trimRight, trunc, random, range,\n         * sample, some, sum, uniq, and words\n         *\n         * @param collection The collection to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns the new mapped array.\n         */\n        map<T, TResult>(\n            collection: List<T> | null | undefined,\n            iteratee: ListIterator<T, TResult>\n        ): TResult[];\n\n        /**\n         * @see _.map\n         */\n        map<T>(collection: List<T> | null | undefined): T[];\n\n        /**\n         * @see _.map\n         */\n        map<T extends {}, TResult>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee: DictionaryIterator<T, TResult>\n        ): TResult[];\n\n        /** @see _.map */\n        map<T, K extends keyof T>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee: K\n        ): T[K][];\n\n        /** @see _.map */\n        map<T>(collection: Dictionary<T> | null | undefined): T[];\n\n        map<T extends {}, TResult>(\n            collection: NumericDictionary<T> | null | undefined,\n            iteratee?: NumericDictionaryIterator<T, TResult>\n        ): TResult[];\n\n        /** @see _.map */\n        map<T, K extends keyof T>(collection: List<T> | null | undefined, iteratee: K): T[K][];\n\n        /**\n         * @see _.map\n         */\n        map<T, TResult>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            iteratee?: string\n        ): TResult[];\n\n        /**\n         * @see _.map\n         */\n        map<T, TObject extends {}>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            iteratee?: TObject\n        ): boolean[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.map\n         */\n        map<TResult>(\n            iteratee: ListIterator<T, TResult>\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.map\n         */\n        map(): LoDashImplicitArrayWrapper<T>;\n\n        /** @see _.map */\n        map<K extends keyof T>(iteratee: K): LoDashImplicitArrayWrapper<T[K]>;\n\n        /**\n         * @see _.map\n         */\n        map<TResult>(\n            iteratee: string\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.map\n         */\n        map<TObject extends {}>(\n            iteratee: TObject\n        ): LoDashImplicitArrayWrapper<boolean>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.map\n         */\n        map<TValue, TResult>(\n            iteratee: ListIterator<TValue, TResult>|DictionaryIterator<TValue, TResult>\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /** @see _.map */\n        map(): LoDashImplicitArrayWrapper<T[keyof T]>;\n\n        /** @see _.map */\n        map<K extends keyof T>(iteratee: K): LoDashImplicitArrayWrapper<T[K]>;\n\n        /**\n         * @see _.map\n         */\n        map<TValue, TResult>(\n            iteratee: string\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.map\n         */\n        map<TObject extends {}>(\n            iteratee: TObject\n        ): LoDashImplicitArrayWrapper<boolean>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.map\n         */\n        map<TResult>(\n            iteratee: ListIterator<T, TResult>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /** @see _.map */\n        map(): LoDashExplicitArrayWrapper<T>;\n\n        /** @see _.map */\n        map<K extends keyof T>(iteratee: K): LoDashExplicitArrayWrapper<T[K]>;\n\n        /**\n         * @see _.map\n         */\n        map<TResult>(\n            iteratee: string\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.map\n         */\n        map<TObject extends {}>(\n            iteratee: TObject\n        ): LoDashExplicitArrayWrapper<boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.map\n         */\n        map<TValue, TResult>(\n            iteratee: ListIterator<TValue, TResult>|DictionaryIterator<TValue, TResult>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /** @see _.map */\n        map(): LoDashExplicitArrayWrapper<T[keyof T]>;\n\n        /**\n         * @see _.map\n         */\n        map<TValue, TResult>(\n            iteratee: string\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.map\n         */\n        map<TObject extends {}>(\n            iteratee: TObject\n        ): LoDashExplicitArrayWrapper<boolean>;\n    }\n\n    //_.partition\n    interface LoDashStatic {\n        /**\n        * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for,\n        * while the second of which contains elements predicate returns falsey for.\n        * The predicate is bound to thisArg and invoked with three arguments: (value, index|key, collection).\n        *\n        * If a property name is provided for predicate the created _.property style callback\n        * returns the property value of the given element.\n        *\n        * If a value is also provided for thisArg the created _.matchesProperty style callback\n        * returns true for elements that have a matching property value, else false.\n        *\n        * If an object is provided for predicate the created _.matches style callback returns\n        * true for elements that have the properties of the given object, else false.\n        *\n        * @param collection The collection to iterate over.\n        * @param callback The function called per iteration.\n        * @param thisArg The this binding of predicate.\n        * @return Returns the array of grouped elements.\n        **/\n        partition<T>(\n            collection: List<T> | null | undefined,\n            callback: ListIterator<T, boolean>): T[][];\n\n        /**\n         * @see _.partition\n         **/\n        partition<T>(\n            collection: Dictionary<T> | null | undefined,\n            callback: DictionaryIterator<T, boolean>): T[][];\n\n        /**\n         * @see _.partition\n         **/\n        partition<W, T>(\n            collection: List<T> | null | undefined,\n            whereValue: W): T[][];\n\n        /**\n         * @see _.partition\n         **/\n        partition<W, T>(\n            collection: Dictionary<T> | null | undefined,\n            whereValue: W): T[][];\n\n        /**\n         * @see _.partition\n         **/\n        partition<T>(\n            collection: List<T> | null | undefined,\n            path: string,\n            srcValue: any): T[][];\n\n        /**\n         * @see _.partition\n         **/\n        partition<T>(\n            collection: Dictionary<T> | null | undefined,\n            path: string,\n            srcValue: any): T[][];\n\n        /**\n         * @see _.partition\n         **/\n        partition<T>(\n            collection: List<T> | null | undefined,\n            pluckValue: string): T[][];\n\n        /**\n         * @see _.partition\n         **/\n        partition<T>(\n            collection: Dictionary<T> | null | undefined,\n            pluckValue: string): T[][];\n    }\n\n    interface LoDashImplicitStringWrapper {\n        /**\n         * @see _.partition\n         */\n        partition(\n            callback: ListIterator<string, boolean>): LoDashImplicitArrayWrapper<string[]>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.partition\n         */\n        partition(\n            callback: ListIterator<T, boolean>): LoDashImplicitArrayWrapper<T[]>;\n        /**\n         * @see _.partition\n         */\n        partition<W>(\n            whereValue: W): LoDashImplicitArrayWrapper<T[]>;\n        /**\n         * @see _.partition\n         */\n        partition(\n            path: string,\n            srcValue: any): LoDashImplicitArrayWrapper<T[]>;\n        /**\n         * @see _.partition\n         */\n        partition(\n            pluckValue: string): LoDashImplicitArrayWrapper<T[]>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.partition\n         */\n        partition<TResult>(\n            callback: ListIterator<TResult, boolean>): LoDashImplicitArrayWrapper<TResult[]>;\n\n        /**\n         * @see _.partition\n         */\n        partition<TResult>(\n            callback: DictionaryIterator<TResult, boolean>): LoDashImplicitArrayWrapper<TResult[]>;\n\n        /**\n         * @see _.partition\n         */\n        partition<W, TResult>(\n            whereValue: W): LoDashImplicitArrayWrapper<TResult[]>;\n\n        /**\n         * @see _.partition\n         */\n        partition<TResult>(\n            path: string,\n            srcValue: any): LoDashImplicitArrayWrapper<TResult[]>;\n\n        /**\n         * @see _.partition\n         */\n        partition<TResult>(\n            pluckValue: string): LoDashImplicitArrayWrapper<TResult[]>;\n    }\n\n    //_.reduce\n    interface LoDashStatic {\n        /**\n        * Reduces a collection to a value which is the accumulated result of running each\n        * element in the collection through the callback, where each successive callback execution\n        * consumes the return value of the previous execution. If accumulator is not provided the\n        * first element of the collection will be used as the initial accumulator value. The callback\n        * is bound to thisArg and invoked with four arguments; (accumulator, value, index|key, collection).\n        * @param collection The collection to iterate over.\n        * @param callback The function called per iteration.\n        * @param accumulator Initial value of the accumulator.\n        * @param thisArg The this binding of callback.\n        * @return Returns the accumulated value.\n        **/\n        reduce<T, TResult>(\n            collection: T[] | null | undefined,\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<T, TResult>(\n            collection: List<T> | null | undefined,\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<T, TResult>(\n            collection: Dictionary<T> | null | undefined,\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<T, TResult>(\n            collection: NumericDictionary<T> | null | undefined,\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<T, TResult>(\n            collection: T[] | null | undefined,\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<T, TResult>(\n            collection: List<T> | null | undefined,\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<T, TResult>(\n            collection: Dictionary<T> | null | undefined,\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<T, TResult>(\n            collection: NumericDictionary<T> | null | undefined,\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n         /**\n        * @see _.reduce\n        **/\n        reduce<TResult>(\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<TResult>(\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n         /**\n        * @see _.reduce\n        **/\n        reduce<TValue, TResult>(\n            callback: MemoIterator<TValue, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<TValue, TResult>(\n            callback: MemoIterator<TValue, TResult>): TResult | undefined;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n        * @see _.reduce\n        **/\n        reduce<TValue, TResult>(\n            callback: MemoIterator<TValue, TResult>,\n            accumulator: TResult): LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n        * @see _.reduce\n        **/\n        reduce<TValue, TResult>(\n            callback: MemoIterator<TValue, TResult>): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**LoDashExplicitWrapper\n         * @see _.reduce\n         */\n        reduce<TResult>(\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.reduce\n         */\n        reduce<TResult>(\n            callback: MemoIterator<T, TResult>): LoDashExplicitWrapper<TResult>;\n    }\n\n    //_.reduceRight\n    interface LoDashStatic {\n        /**\n        * This method is like _.reduce except that it iterates over elements of a collection from\n        * right to left.\n        * @param collection The collection to iterate over.\n        * @param callback The function called per iteration.\n        * @param accumulator Initial value of the accumulator.\n        * @param thisArg The this binding of callback.\n        * @return The accumulated value.\n        **/\n        reduceRight<T, TResult>(\n            collection: T[] | null | undefined,\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduceRight\n        **/\n        reduceRight<T, TResult>(\n            collection: List<T> | null | undefined,\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduceRight\n        **/\n        reduceRight<T, TResult>(\n            collection: Dictionary<T> | null | undefined,\n            callback: MemoIterator<T, TResult>,\n            accumulator: TResult): TResult;\n\n        /**\n        * @see _.reduceRight\n        **/\n        reduceRight<T, TResult>(\n            collection: T[] | null | undefined,\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n\n        /**\n        * @see _.reduceRight\n        **/\n        reduceRight<T, TResult>(\n            collection: List<T> | null | undefined,\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n\n        /**\n        * @see _.reduceRight\n        **/\n        reduceRight<T, TResult>(\n            collection: Dictionary<T> | null | undefined,\n            callback: MemoIterator<T, TResult>): TResult | undefined;\n    }\n\n    //_.reject\n    interface LoDashStatic {\n        /**\n         * The opposite of _.filter; this method returns the elements of collection that predicate does not return\n         * truthy for.\n         *\n         * @param collection The collection to iterate over.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the new filtered array.\n         */\n        reject<T>(\n            collection: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>\n        ): T[];\n\n        /**\n         * @see _.reject\n         */\n        reject<T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate?: DictionaryIterator<T, boolean>\n        ): T[];\n\n        /**\n         * @see _.reject\n         */\n        reject(\n            collection: string | null | undefined,\n            predicate?: StringIterator<boolean>\n        ): string[];\n\n        /**\n         * @see _.reject\n         */\n        reject<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            predicate: string\n        ): T[];\n\n        /**\n         * @see _.reject\n         */\n        reject<W extends {}, T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            predicate: W\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.reject\n         */\n        reject(\n            predicate?: StringIterator<boolean>\n        ): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.reject\n         */\n        reject(\n            predicate: ListIterator<T, boolean>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject(\n            predicate: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject<W>(predicate: W): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.reject\n         */\n        reject<T>(\n            predicate: ListIterator<T, boolean>|DictionaryIterator<T, boolean>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject<T>(\n            predicate: string\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject<W, T>(predicate: W): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.reject\n         */\n        reject(\n            predicate?: StringIterator<boolean>\n        ): LoDashExplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.reject\n         */\n        reject(\n            predicate: ListIterator<T, boolean>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject(\n            predicate: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject<W>(predicate: W): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.reject\n         */\n        reject<T>(\n            predicate: ListIterator<T, boolean>|DictionaryIterator<T, boolean>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject<T>(\n            predicate: string\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.reject\n         */\n        reject<W, T>(predicate: W): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.sample\n    interface LoDashStatic {\n        /**\n         * Gets a random element from collection.\n         *\n         * @param collection The collection to sample.\n         * @return Returns the random element.\n         */\n        sample<T>(\n            collection: List<T> | Dictionary<T> | NumericDictionary<T> | object | null | undefined\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sample\n         */\n        sample(): string | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sample\n         */\n        sample(): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sample\n         */\n        sample<T>(): T | undefined;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sample\n         */\n        sample(): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sample\n         */\n        sample<TWrapper>(): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sample\n         */\n        sample<TWrapper>(): TWrapper;\n    }\n\n    //_.sampleSize\n    interface LoDashStatic {\n        /**\n         * Gets n random elements at unique keys from collection up to the size of collection.\n         *\n         * @param collection The collection to sample.\n         * @param n The number of elements to sample.\n         * @return Returns the random elements.\n         */\n        sampleSize<T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            n?: number\n        ): T[];\n\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize<O extends Object, T>(\n            collection: O | null | undefined,\n            n?: number\n        ): T[];\n\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize<T>(\n            collection: Object | null | undefined,\n            n?: number\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize(\n            n?: number\n        ): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize(\n            n?: number\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize<T>(\n            n?: number\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize(\n            n?: number\n        ): LoDashExplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize(\n            n?: number\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sampleSize\n         */\n        sampleSize<T>(\n            n?: number\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.shuffle\n    interface LoDashStatic {\n        /**\n         * Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.\n         *\n         * @param collection The collection to shuffle.\n         * @return Returns the new shuffled array.\n         */\n        shuffle<T>(collection: List<T>|Dictionary<T> | null | undefined): T[];\n\n        /**\n         * @see _.shuffle\n         */\n        shuffle(collection: string | null | undefined): string[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.shuffle\n         */\n        shuffle(): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.shuffle\n         */\n        shuffle(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.shuffle\n         */\n        shuffle<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.shuffle\n         */\n        shuffle(): LoDashExplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.shuffle\n         */\n        shuffle(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.shuffle\n         */\n        shuffle<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.size\n    interface LoDashStatic {\n        /**\n         * Gets the size of collection by returning its length for array-like values or the number of own enumerable\n         * properties for objects.\n         *\n         * @param collection The collection to inspect.\n         * @return Returns the size of collection.\n         */\n        size<T>(collection: List<T>|Dictionary<T> | null | undefined): number;\n\n        /**\n         * @see _.size\n         */\n        size(collection: string | null | undefined): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.size\n         */\n        size(): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.size\n         */\n        size(): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.size\n         */\n        size(): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.size\n         */\n        size(): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.size\n         */\n        size(): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.size\n         */\n        size(): LoDashExplicitWrapper<number>;\n    }\n\n    //_.some\n    interface LoDashStatic {\n        /**\n         * Checks if predicate returns truthy for any element of collection. Iteration is stopped once predicate\n         * returns truthy. The predicate is invoked with three arguments: (value, index|key, collection).\n         *\n         * @param collection The collection to iterate over.\n         * @param predicate The function invoked per iteration.\n         * @return Returns true if any element passes the predicate check, else false.\n         */\n        some<T>(\n            collection: List<T> | null | undefined,\n            predicate?: ListIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some<T>(\n            collection: Dictionary<T> | null | undefined,\n            predicate?: DictionaryIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some<T>(\n            collection: NumericDictionary<T> | null | undefined,\n            predicate?: NumericDictionaryIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some(\n            collection: Object | null | undefined,\n            predicate?: ObjectIterator<any, boolean>\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some<T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            predicate?: string|[string, any]\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some(\n            collection: Object | null | undefined,\n            predicate?: string|[string, any]\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some<T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            predicate?: PartialObject<T>\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some<T>(\n            collection: List<T>|Dictionary<T>|NumericDictionary<T> | null | undefined,\n            predicate?: PartialObject<T>\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some<T>(\n            collection: Object | null | undefined,\n            predicate?: PartialObject<T>\n        ): boolean;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: ListIterator<T, boolean>|NumericDictionaryIterator<T, boolean>\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: string|[string, any]\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: PartialObject<T>\n        ): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.some\n         */\n        some<TResult>(\n            predicate?: ListIterator<TResult, boolean>|DictionaryIterator<TResult, boolean>|NumericDictionaryIterator<T, boolean>|ObjectIterator<any, boolean>\n        ): boolean;\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: string|[string, any]\n        ): boolean;\n\n        /**\n         * @see _.some\n         */\n        some<TResult>(\n            predicate?: PartialObject<TResult>\n        ): boolean;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: ListIterator<T, boolean>|NumericDictionaryIterator<T, boolean>\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: string|[string, any]\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: PartialObject<T>\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.some\n         */\n        some<TResult>(\n            predicate?: ListIterator<TResult, boolean>|DictionaryIterator<TResult, boolean>|NumericDictionaryIterator<T, boolean>|ObjectIterator<any, boolean>\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.some\n         */\n        some(\n            predicate?: string|[string, any]\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.some\n         */\n        some<TResult>(\n            predicate?: PartialObject<TResult>\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.sortBy\n    interface LoDashStatic {\n        /**\n         * Creates an array of elements, sorted in ascending order by the results of\n         * running each element in a collection through each iteratee. This method\n         * performs a stable sort, that is, it preserves the original sort order of\n         * equal elements. The iteratees are invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Collection\n         * @param {Array|Object} collection The collection to iterate over.\n         * @param {...(Function|Function[]|Object|Object[]|string|string[])} [iteratees=[_.identity]]\n         *  The iteratees to sort by, specified individually or in arrays.\n         * @returns {Array} Returns the new sorted array.\n         * @example\n         *\n         * var users = [\n         *   { 'user': 'fred',   'age': 48 },\n         *   { 'user': 'barney', 'age': 36 },\n         *   { 'user': 'fred',   'age': 42 },\n         *   { 'user': 'barney', 'age': 34 }\n         * ];\n         *\n         * _.sortBy(users, function(o) { return o.user; });\n         * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]\n         *\n         * _.sortBy(users, ['user', 'age']);\n         * // => objects for [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]\n         *\n         * _.sortBy(users, 'user', function(o) {\n         *   return Math.floor(o.age / 10);\n         * });\n         * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]\n         */\n        sortBy<T, TSort>(\n            collection: List<T> | null | undefined,\n            iteratee?: ListIterator<T, TSort>\n        ): T[];\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T, TSort>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, TSort>\n        ): T[];\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            iteratee: string\n        ): T[];\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<W extends {}, T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            whereValue: W\n        ): T[];\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(\n            collection: List<T>|Dictionary<T> | null | undefined\n        ): T[];\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(\n            collection: List<T> | null | undefined,\n            iteratees: Array<ListIterator<T, any>|string|Object>\n        ): T[];\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(\n            collection: List<T> | null | undefined,\n            ...iteratees: Array<ListIterator<T, boolean>|Object|string>\n        ): T[];\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortBy\n         */\n        sortBy<TSort>(\n            iteratee?: ListIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy(iteratee: string): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<W extends {}>(whereValue: W): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy(): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy(...iteratees: Array<ListIterator<T, boolean>|Object|string>): LoDashImplicitArrayWrapper<T>;\n\n        /**\n        * @see _.sortBy\n        **/\n        sortBy(iteratees: Array<ListIterator<T, any>|string|Object>): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T, TSort>(\n            iteratee?: ListIterator<T, TSort>|DictionaryIterator<T, TSort>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(iteratee: string): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<W extends {}, T>(whereValue: W): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sortBy\n         */\n        sortBy<TSort>(\n            iteratee?: ListIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy(iteratee: string): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<W extends {}>(whereValue: W): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T, TSort>(\n            iteratee?: ListIterator<T, TSort>|DictionaryIterator<T, TSort>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(iteratee: string): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<W extends {}, T>(whereValue: W): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.sortBy\n         */\n        sortBy<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.orderBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.sortBy` except that it allows specifying the sort\n         * orders of the iteratees to sort by. If `orders` is unspecified, all values\n         * are sorted in ascending order. Otherwise, specify an order of \"desc\" for\n         * descending or \"asc\" for ascending sort order of corresponding values.\n         *\n         * @static\n         * @memberOf _\n         * @category Collection\n         * @param {Array|Object} collection The collection to iterate over.\n         * @param {Function[]|Object[]|string[]} [iteratees=[_.identity]] The iteratees to sort by.\n         * @param {string[]} [orders] The sort orders of `iteratees`.\n         * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.\n         * @returns {Array} Returns the new sorted array.\n         * @example\n         *\n         * var users = [\n         *   { 'user': 'fred',   'age': 48 },\n         *   { 'user': 'barney', 'age': 34 },\n         *   { 'user': 'fred',   'age': 42 },\n         *   { 'user': 'barney', 'age': 36 }\n         * ];\n         *\n         * // sort by `user` in ascending order and by `age` in descending order\n         * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);\n         * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]\n         */\n        orderBy<W extends Object, T>(\n            collection: List<T> | null | undefined,\n            iteratees?: Many<ListIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): T[];\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            collection: List<T> | null | undefined,\n            iteratees?: Many<ListIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): T[];\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            collection: NumericDictionary<T> | null | undefined,\n            iteratees?: Many<NumericDictionaryIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): T[];\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            collection: NumericDictionary<T> | null | undefined,\n            iteratees?: Many<NumericDictionaryIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): T[];\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            collection: Dictionary<T> | null | undefined,\n            iteratees?: Many<DictionaryIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): T[];\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            collection: Dictionary<T> | null | undefined,\n            iteratees?: Many<DictionaryIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.orderBy\n         */\n        orderBy(\n            iteratees?: Many<ListIterator<T, any>|string>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object>(\n            iteratees?: Many<ListIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            iteratees?: Many<ListIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            iteratees?: Many<ListIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            iteratees?: Many<NumericDictionaryIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            iteratees?: Many<NumericDictionaryIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            iteratees?: Many<DictionaryIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            iteratees?: Many<DictionaryIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.orderBy\n         */\n        orderBy(\n            iteratees?: Many<ListIterator<T, any>|string>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object>(\n            iteratees?: Many<ListIterator<T, any>|string|W|(ListIterator<T, any>|string|W)>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            iteratees?: Many<ListIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            iteratees?: Many<ListIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            iteratees?: Many<NumericDictionaryIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            iteratees?: Many<NumericDictionaryIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<W extends Object, T>(\n            iteratees?: Many<DictionaryIterator<T, any>|string|W>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n\n        /**\n         * @see _.orderBy\n         */\n        orderBy<T>(\n            iteratees?: Many<DictionaryIterator<T, any>|string|Object>,\n            orders?: Many<boolean|string>\n        ): LoDashExplicitArrayWrapper<T>;\n    }\n\n    /********\n     * Date *\n     ********/\n\n    //_.now\n    interface LoDashStatic {\n        /**\n         * Gets the number of milliseconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).\n         *\n         * @return The number of milliseconds.\n         */\n        now(): number;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.now\n         */\n        now(): number;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.now\n         */\n        now(): LoDashExplicitWrapper<number>;\n    }\n\n    /*************\n     * Functions *\n     *************/\n\n    //_.after\n    interface LoDashStatic {\n        /**\n         * The opposite of _.before; this method creates a function that invokes func once it’s called n or more times.\n         *\n         * @param n The number of calls before func is invoked.\n         * @param func The function to restrict.\n         * @return Returns the new restricted function.\n         */\n        after<TFunc extends Function>(\n            n: number,\n            func: TFunc\n        ): TFunc;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n        * @see _.after\n        **/\n        after<TFunc extends Function>(func: TFunc): LoDashImplicitObjectWrapper<TFunc>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.after\n         **/\n        after<TFunc extends Function>(func: TFunc): LoDashExplicitObjectWrapper<TFunc>;\n    }\n\n    //_.ary\n    interface LoDashStatic {\n        /**\n         * Creates a function that accepts up to n arguments ignoring any additional arguments.\n         *\n         * @param func The function to cap arguments for.\n         * @param n The arity cap.\n         * @returns Returns the new function.\n         */\n        ary<TResult extends Function>(\n            func: Function,\n            n?: number\n        ): TResult;\n\n        ary<T extends Function, TResult extends Function>(\n            func: T,\n            n?: number\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.ary\n         */\n        ary<TResult extends Function>(n?: number): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.ary\n         */\n        ary<TResult extends Function>(n?: number): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.before\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes func, with the this binding and arguments of the created function, while\n         * it’s called less than n times. Subsequent calls to the created function return the result of the last func\n         * invocation.\n         *\n         * @param n The number of calls at which func is no longer invoked.\n         * @param func The function to restrict.\n         * @return Returns the new restricted function.\n         */\n        before<TFunc extends Function>(\n            n: number,\n            func: TFunc\n        ): TFunc;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.before\n         **/\n        before<TFunc extends Function>(func: TFunc): LoDashImplicitObjectWrapper<TFunc>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.before\n         **/\n        before<TFunc extends Function>(func: TFunc): LoDashExplicitObjectWrapper<TFunc>;\n    }\n\n    //_.bind\n    interface FunctionBind {\n        placeholder: any;\n\n        <T extends Function, TResult extends Function>(\n            func: T,\n            thisArg: any,\n            ...partials: any[]\n        ): TResult;\n\n        <TResult extends Function>(\n            func: Function,\n            thisArg: any,\n            ...partials: any[]\n        ): TResult;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes func with the this binding of thisArg and prepends any additional _.bind\n         * arguments to those provided to the bound function.\n         *\n         * The _.bind.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder for\n         * partially applied arguments.\n         *\n         * Note: Unlike native Function#bind this method does not set the \"length\" property of bound functions.\n         *\n         * @param func The function to bind.\n         * @param thisArg The this binding of func.\n         * @param partials The arguments to be partially applied.\n         * @return Returns the new bound function.\n         */\n        bind: FunctionBind;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.bind\n         */\n        bind<TResult extends Function>(\n            thisArg: any,\n            ...partials: any[]\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.bind\n         */\n        bind<TResult extends Function>(\n            thisArg: any,\n            ...partials: any[]\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.bindAll\n    interface LoDashStatic {\n        /**\n         * Binds methods of an object to the object itself, overwriting the existing method. Method names may be\n         * specified as individual arguments or as arrays of method names. If no method names are provided all\n         * enumerable function properties, own and inherited, of object are bound.\n         *\n         * Note: This method does not set the \"length\" property of bound functions.\n         *\n         * @param object The object to bind and assign the bound methods to.\n         * @param methodNames The object method names to bind, specified as individual method names or arrays of\n         * method names.\n         * @return Returns object.\n         */\n        bindAll<T>(\n            object: T,\n            ...methodNames: Array<Many<string>>\n        ): T;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.bindAll\n         */\n        bindAll(...methodNames: Array<Many<string>>): LoDashImplicitObjectWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.bindAll\n         */\n        bindAll(...methodNames: Array<Many<string>>): LoDashExplicitObjectWrapper<T>;\n    }\n\n    //_.bindKey\n    interface FunctionBindKey {\n        placeholder: any;\n\n        <T extends Object, TResult extends Function>(\n            object: T,\n            key: any,\n            ...partials: any[]\n        ): TResult;\n\n        <TResult extends Function>(\n            object: Object,\n            key: any,\n            ...partials: any[]\n        ): TResult;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes the method at object[key] and prepends any additional _.bindKey arguments\n         * to those provided to the bound function.\n         *\n         * This method differs from _.bind by allowing bound functions to reference methods that may be redefined\n         * or don’t yet exist. See Peter Michaux’s article for more details.\n         *\n         * The _.bindKey.placeholder value, which defaults to _ in monolithic builds, may be used as a placeholder\n         * for partially applied arguments.\n         *\n         * @param object The object the method belongs to.\n         * @param key The key of the method.\n         * @param partials The arguments to be partially applied.\n         * @return Returns the new bound function.\n         */\n        bindKey: FunctionBindKey;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.bindKey\n         */\n        bindKey<TResult extends Function>(\n            key: any,\n            ...partials: any[]\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.bindKey\n         */\n        bindKey<TResult extends Function>(\n            key: any,\n            ...partials: any[]\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.createCallback\n    interface LoDashStatic {\n        /**\n        * Produces a callback bound to an optional thisArg. If func is a property name the created\n        * callback will return the property value for a given element. If func is an object the created\n        * callback will return true for elements that contain the equivalent object properties,\n        * otherwise it will return false.\n        * @param func The value to convert to a callback.\n        * @param thisArg The this binding of the created callback.\n        * @param argCount The number of arguments the callback accepts.\n        * @return A callback function.\n        **/\n        createCallback(\n            func: string,\n            argCount?: number): () => any;\n\n        /**\n        * @see _.createCallback\n        **/\n        createCallback(\n            func: Dictionary<any>,\n            argCount?: number): () => boolean;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n        * @see _.createCallback\n        **/\n        createCallback(\n            argCount?: number): LoDashImplicitObjectWrapper<() => any>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n        * @see _.createCallback\n        **/\n        createCallback(\n            argCount?: number): LoDashImplicitObjectWrapper<() => any>;\n    }\n\n    //_.curry\n    interface LoDashStatic {\n        /**\n         * Creates a function that accepts one or more arguments of func that when called either invokes func returning\n         * its result, if all func arguments have been provided, or returns a function that accepts one or more of the\n         * remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curry<T1, R>(func: (t1: T1) => R):\n            CurriedFunction1<T1, R>;\n        /**\n         * Creates a function that accepts one or more arguments of func that when called either invokes func returning\n         * its result, if all func arguments have been provided, or returns a function that accepts one or more of the\n         * remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curry<T1, T2, R>(func: (t1: T1, t2: T2) => R):\n            CurriedFunction2<T1, T2, R>;\n        /**\n         * Creates a function that accepts one or more arguments of func that when called either invokes func returning\n         * its result, if all func arguments have been provided, or returns a function that accepts one or more of the\n         * remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curry<T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R):\n            CurriedFunction3<T1, T2, T3, R>;\n        /**\n         * Creates a function that accepts one or more arguments of func that when called either invokes func returning\n         * its result, if all func arguments have been provided, or returns a function that accepts one or more of the\n         * remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curry<T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R):\n            CurriedFunction4<T1, T2, T3, T4, R>;\n        /**\n         * Creates a function that accepts one or more arguments of func that when called either invokes func returning\n         * its result, if all func arguments have been provided, or returns a function that accepts one or more of the\n         * remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curry<T1, T2, T3, T4, T5, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R):\n            CurriedFunction5<T1, T2, T3, T4, T5, R>;\n        /**\n         * Creates a function that accepts one or more arguments of func that when called either invokes func returning\n         * its result, if all func arguments have been provided, or returns a function that accepts one or more of the\n         * remaining func arguments, and so on. The arity of func may be specified if func.length is not sufficient.\n         * @param func The function to curry.\n         * @param arity The arity of func.\n         * @return Returns the new curried function.\n         */\n        curry<TResult extends Function>(\n          func: Function,\n          arity?: number): TResult;\n    }\n\n    interface CurriedFunction1<T1, R> {\n        (): CurriedFunction1<T1, R>;\n        (t1: T1): R;\n    }\n\n    interface CurriedFunction2<T1, T2, R> {\n        (): CurriedFunction2<T1, T2, R>;\n        (t1: T1): CurriedFunction1<T2, R>;\n        (t1: T1, t2: T2): R;\n    }\n\n    interface CurriedFunction3<T1, T2, T3, R> {\n        (): CurriedFunction3<T1, T2, T3, R>;\n        (t1: T1): CurriedFunction2<T2, T3, R>;\n        (t1: T1, t2: T2): CurriedFunction1<T3, R>;\n        (t1: T1, t2: T2, t3: T3): R;\n    }\n\n    interface CurriedFunction4<T1, T2, T3, T4, R> {\n        (): CurriedFunction4<T1, T2, T3, T4, R>;\n        (t1: T1): CurriedFunction3<T2, T3, T4, R>;\n        (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;\n        (t1: T1, t2: T2, t3: T3): CurriedFunction1<T4, R>;\n        (t1: T1, t2: T2, t3: T3, t4: T4): R;\n    }\n\n    interface CurriedFunction5<T1, T2, T3, T4, T5, R> {\n        (): CurriedFunction5<T1, T2, T3, T4, T5, R>;\n        (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;\n        (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;\n        (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;\n        (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction1<T5, R>;\n        (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;\n    }\n    interface RightCurriedFunction1<T1, R>{\n        ():RightCurriedFunction1<T1, R>\n        (t1:T1):R\n        }\n    interface RightCurriedFunction2<T1,T2, R>{\n        ():RightCurriedFunction2<T1,T2, R>\n        (t2:T2):RightCurriedFunction1<T1, R>\n        (t1:T1,t2:T2):R\n    }\n    interface RightCurriedFunction3<T1,T2,T3, R>{\n        ():RightCurriedFunction3<T1,T2,T3, R>\n        (t3:T3):RightCurriedFunction2<T1,T2, R>\n        (t2:T2,t3:T3):RightCurriedFunction1<T1, R>\n        (t1:T1,t2:T2,t3:T3):R\n    }\n    interface RightCurriedFunction4<T1,T2,T3,T4, R>{\n        ():RightCurriedFunction4<T1,T2,T3,T4, R>\n        (t4:T4):RightCurriedFunction3<T1,T2,T3, R>\n        (t3:T3,t4:T4):RightCurriedFunction2<T1,T2, R>\n        (t2:T2,t3:T3,t4:T4):RightCurriedFunction1<T1, R>\n        (t1:T1,t2:T2,t3:T3,t4:T4):R\n    }\n    interface RightCurriedFunction5<T1,T2,T3,T4,T5, R>{\n        ():RightCurriedFunction5<T1,T2,T3,T4,T5, R>\n        (t5:T5):RightCurriedFunction4<T1,T2,T3,T4, R>\n        (t4:T4,t5:T5):RightCurriedFunction3<T1,T2,T3, R>\n        (t3:T3,t4:T4,t5:T5):RightCurriedFunction2<T1,T2, R>\n        (t2:T2,t3:T3,t4:T4,t5:T5):RightCurriedFunction1<T1, R>\n        (t1:T1,t2:T2,t3:T3,t4:T4,t5:T5):R\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n        * @see _.curry\n        **/\n        curry<TResult extends Function>(arity?: number): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    //_.curryRight\n    interface LoDashStatic {\n        /**\n         * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight\n         * instead of _.partial.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curryRight<T1, R>(func: (t1: T1) => R):\n            RightCurriedFunction1<T1, R>;\n        /**\n         * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight\n         * instead of _.partial.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curryRight<T1, T2, R>(func: (t1: T1, t2: T2) => R):\n            RightCurriedFunction2<T1, T2, R>;\n        /**\n         * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight\n         * instead of _.partial.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curryRight<T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R):\n            RightCurriedFunction3<T1, T2, T3, R>;\n        /**\n         * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight\n         * instead of _.partial.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curryRight<T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R):\n            RightCurriedFunction4<T1, T2, T3, T4, R>;\n        /**\n         * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight\n         * instead of _.partial.\n         * @param func The function to curry.\n         * @return Returns the new curried function.\n         */\n        curryRight<T1, T2, T3, T4, T5, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R):\n            RightCurriedFunction5<T1, T2, T3, T4, T5, R>;\n        /**\n         * This method is like _.curry except that arguments are applied to func in the manner of _.partialRight\n         * instead of _.partial.\n         * @param func The function to curry.\n         * @param arity The arity of func.\n         * @return Returns the new curried function.\n         */\n        curryRight<TResult extends Function>(\n          func: Function,\n          arity?: number): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.curryRight\n         **/\n        curryRight<TResult extends Function>(arity?: number): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    //_.debounce\n    interface DebounceSettings {\n        /**\n         * Specify invoking on the leading edge of the timeout.\n         */\n        leading?: boolean;\n\n        /**\n         * The maximum time func is allowed to be delayed before it’s invoked.\n         */\n        maxWait?: number;\n\n        /**\n         * Specify invoking on the trailing edge of the timeout.\n         */\n        trailing?: boolean;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since\n         * the last time the debounced function was invoked. The debounced function comes with a cancel method to\n         * cancel delayed invocations and a flush method to immediately invoke them. Provide an options object to\n         * indicate that func should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent\n         * calls to the debounced function return the result of the last func invocation.\n         *\n         * Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only\n         * if the the debounced function is invoked more than once during the wait timeout.\n         *\n         * See David Corbacho’s article for details over the differences between _.debounce and _.throttle.\n         *\n         * @param func The function to debounce.\n         * @param wait The number of milliseconds to delay.\n         * @param options The options object.\n         * @param options.leading Specify invoking on the leading edge of the timeout.\n         * @param options.maxWait The maximum time func is allowed to be delayed before it’s invoked.\n         * @param options.trailing Specify invoking on the trailing edge of the timeout.\n         * @return Returns the new debounced function.\n         */\n        debounce<T extends Function>(\n            func: T,\n            wait?: number,\n            options?: DebounceSettings\n        ): T & Cancelable;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.debounce\n         */\n        debounce(\n            wait?: number,\n            options?: DebounceSettings\n        ): LoDashImplicitObjectWrapper<T & Cancelable>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.debounce\n         */\n        debounce(\n            wait?: number,\n            options?: DebounceSettings\n        ): LoDashExplicitObjectWrapper<T & Cancelable>;\n    }\n\n    //_.defer\n    interface LoDashStatic {\n        /**\n         * Defers invoking the func until the current call stack has cleared. Any additional arguments are provided to\n         * func when it’s invoked.\n         *\n         * @param func The function to defer.\n         * @param args The arguments to invoke the function with.\n         * @return Returns the timer id.\n         */\n        defer<T extends Function>(\n            func: T,\n            ...args: any[]\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.defer\n         */\n        defer(...args: any[]): LoDashImplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.defer\n         */\n        defer(...args: any[]): LoDashExplicitWrapper<number>;\n    }\n\n    //_.delay\n    interface LoDashStatic {\n        /**\n         * Invokes func after wait milliseconds. Any additional arguments are provided to func when it’s invoked.\n         *\n         * @param func The function to delay.\n         * @param wait The number of milliseconds to delay invocation.\n         * @param args The arguments to invoke the function with.\n         * @return Returns the timer id.\n         */\n        delay<T extends Function>(\n            func: T,\n            wait: number,\n            ...args: any[]\n        ): number;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.delay\n         */\n        delay(\n            wait: number,\n            ...args: any[]\n        ): LoDashImplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.delay\n         */\n        delay(\n            wait: number,\n            ...args: any[]\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes `func` with arguments reversed.\n         *\n         * @static\n         * @memberOf _\n         * @category Function\n         * @param {Function} func The function to flip arguments for.\n         * @returns {Function} Returns the new function.\n         * @example\n         *\n         * var flipped = _.flip(function() {\n         *   return _.toArray(arguments);\n         * });\n         *\n         * flipped('a', 'b', 'c', 'd');\n         * // => ['d', 'c', 'b', 'a']\n         */\n        flip<T extends Function>(func: T): T;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.flip\n         */\n        flip(): LoDashImplicitObjectWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.flip\n         */\n        flip(): LoDashExplicitObjectWrapper<T>;\n    }\n\n    //_.flow\n    interface LoDashStatic {\n        /**\n         * Creates a function that returns the result of invoking the provided functions with the this binding of the\n         * created function, where each successive invocation is supplied the return value of the previous.\n         *\n         * @param funcs Functions to invoke.\n         * @return Returns the new function.\n         */\n        // 0-argument first function\n        flow<R1, R2>(f1: () => R1, f2: (a: R1) => R2): () => R2;\n        flow<R1, R2, R3>(f1: () => R1, f2: (a: R1) => R2, f3: (a: R2) => R3): () => R3;\n        flow<R1, R2, R3, R4>(f1: () => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4): () => R4;\n        flow<R1, R2, R3, R4, R5>(f1: () => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5): () => R5;\n        flow<R1, R2, R3, R4, R5, R6>(f1: () => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6): () => R6;\n        flow<R1, R2, R3, R4, R5, R6, R7>(f1: () => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6, f7: (a: R6) => R7): () => R7;\n        // 1-argument first function\n        flow<A1, R1, R2>(f1: (a1: A1) => R1, f2: (a: R1) => R2): (a1: A1) => R2;\n        flow<A1, R1, R2, R3>(f1: (a1: A1) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3): (a1: A1) => R3;\n        flow<A1, R1, R2, R3, R4>(f1: (a1: A1) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4): (a1: A1) => R4;\n        flow<A1, R1, R2, R3, R4, R5>(f1: (a1: A1) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5): (a1: A1) => R5;\n        flow<A1, R1, R2, R3, R4, R5, R6>(f1: (a1: A1) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6): (a1: A1) => R6;\n        flow<A1, R1, R2, R3, R4, R5, R6, R7>(f1: (a1: A1) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6, f7: (a: R6) => R7): (a1: A1) => R7;\n        // 2-argument first function\n        flow<A1, A2, R1, R2>(f1: (a1: A1, a2: A2) => R1, f2: (a: R1) => R2): (a1: A1, a2: A2) => R2;\n        flow<A1, A2, R1, R2, R3>(f1: (a1: A1, a2: A2) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3): (a1: A1, a2: A2) => R3;\n        flow<A1, A2, R1, R2, R3, R4>(f1: (a1: A1, a2: A2) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4): (a1: A1, a2: A2) => R4;\n        flow<A1, A2, R1, R2, R3, R4, R5>(f1: (a1: A1, a2: A2) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5): (a1: A1, a2: A2) => R5;\n        flow<A1, A2, R1, R2, R3, R4, R5, R6>(f1: (a1: A1, a2: A2) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6): (a1: A1, a2: A2) => R6;\n        flow<A1, A2, R1, R2, R3, R4, R5, R6, R7>(f1: (a1: A1, a2: A2) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6, f7: (a: R6) => R7): (a1: A1, a2: A2) => R7;\n        // 3-argument first function\n        flow<A1, A2, A3, R1, R2>(f1: (a1: A1, a2: A2, a3: A3) => R1, f2: (a: R1) => R2): (a1: A1, a2: A2, a3: A3) => R2;\n        flow<A1, A2, A3, R1, R2, R3>(f1: (a1: A1, a2: A2, a3: A3) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3): (a1: A1, a2: A2, a3: A3) => R3;\n        flow<A1, A2, A3, R1, R2, R3, R4>(f1: (a1: A1, a2: A2, a3: A3) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4): (a1: A1, a2: A2, a3: A3) => R4;\n        flow<A1, A2, A3, R1, R2, R3, R4, R5>(f1: (a1: A1, a2: A2, a3: A3) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5): (a1: A1, a2: A2, a3: A3) => R5;\n        flow<A1, A2, A3, R1, R2, R3, R4, R5, R6>(f1: (a1: A1, a2: A2, a3: A3) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6): (a1: A1, a2: A2, a3: A3) => R6;\n        flow<A1, A2, A3, R1, R2, R3, R4, R5, R6, R7>(f1: (a1: A1, a2: A2, a3: A3) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6, f7: (a: R6) => R7): (a1: A1, a2: A2, a3: A3) => R7;\n        // 4-argument first function\n        flow<A1, A2, A3, A4, R1, R2>(f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1, f2: (a: R1) => R2): (a1: A1, a2: A2, a3: A3, a4: A4) => R2;\n        flow<A1, A2, A3, A4, R1, R2, R3>(f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3): (a1: A1, a2: A2, a3: A3, a4: A4) => R3;\n        flow<A1, A2, A3, A4, R1, R2, R3, R4>(f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4): (a1: A1, a2: A2, a3: A3, a4: A4) => R4;\n        flow<A1, A2, A3, A4, R1, R2, R3, R4, R5>(f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5): (a1: A1, a2: A2, a3: A3, a4: A4) => R5;\n        flow<A1, A2, A3, A4, R1, R2, R3, R4, R5, R6>(f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6): (a1: A1, a2: A2, a3: A3, a4: A4) => R6;\n        flow<A1, A2, A3, A4, R1, R2, R3, R4, R5, R6, R7>(f1: (a1: A1, a2: A2, a3: A3, a4: A4) => R1, f2: (a: R1) => R2, f3: (a: R2) => R3, f4: (a: R3) => R4, f5: (a: R4) => R5, f6: (a: R5) => R6, f7: (a: R6) => R7): (a1: A1, a2: A2, a3: A3, a4: A4) => R7;\n        // generic function\n        flow<TResult extends Function>(...funcs: Function[]): TResult;\n        flow<TResult extends Function>(funcs: Function[]): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.flow\n         */\n        flow<TResult extends Function>(...funcs: Function[]): LoDashImplicitObjectWrapper<TResult>;\n        /**\n         * @see _.flow\n         */\n        flow<TResult extends Function>(funcs: Function[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.flow\n         */\n        flow<TResult extends Function>(...funcs: Function[]): LoDashExplicitObjectWrapper<TResult>;\n        /**\n         * @see _.flow\n         */\n        flow<TResult extends Function>(funcs: Function[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.flowRight\n    interface LoDashStatic {\n        /**\n         * This method is like _.flow except that it creates a function that invokes the provided functions from right\n         * to left.\n         *\n         * @param funcs Functions to invoke.\n         * @return Returns the new function.\n         */\n        flowRight<TResult extends Function>(...funcs: Function[]): TResult;\n        /**\n         * @see _.flowRight\n         */\n        flowRight<TResult extends Function>(funcs: Function[]): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.flowRight\n         */\n        flowRight<TResult extends Function>(...funcs: Function[]): LoDashImplicitObjectWrapper<TResult>;\n        /**\n         * @see _.flowRight\n         */\n        flowRight<TResult extends Function>(funcs: Function[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.flowRight\n         */\n        flowRight<TResult extends Function>(...funcs: Function[]): LoDashExplicitObjectWrapper<TResult>;\n        /**\n         * @see _.flowRight\n         */\n        flowRight<TResult extends Function>(funcs: Function[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.memoize\n    interface MemoizedFunction extends Function {\n        cache: MapCache;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Creates a function that memoizes the result of func. If resolver is provided it determines the cache key for\n         * storing the result based on the arguments provided to the memoized function. By default, the first argument\n         * provided to the memoized function is coerced to a string and used as the cache key. The func is invoked with\n         * the this binding of the memoized function.\n         *\n         * @param func The function to have its output memoized.\n         * @param resolver The function to resolve the cache key.\n         * @return Returns the new memoizing function.\n         */\n        memoize: {\n            <T extends Function>(func: T, resolver?: Function): T & MemoizedFunction;\n            Cache: MapCacheConstructor;\n        };\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.memoize\n         */\n        memoize(resolver?: Function): LoDashImplicitObjectWrapper<T & MemoizedFunction>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.memoize\n         */\n        memoize(resolver?: Function): LoDashExplicitObjectWrapper<T & MemoizedFunction>;\n    }\n\n    //_.overArgs (was _.modArgs)\n    interface LoDashStatic {\n        /**\n         * Creates a function that runs each argument through a corresponding transform function.\n         *\n         * @param func The function to wrap.\n         * @param transforms The functions to transform arguments, specified as individual functions or arrays\n         * of functions.\n         * @return Returns the new function.\n         */\n        overArgs<T extends Function, TResult extends Function>(\n            func: T,\n            ...transforms: Function[]\n        ): TResult;\n\n        /**\n         * @see _.overArgs\n         */\n        overArgs<T extends Function, TResult extends Function>(\n            func: T,\n            transforms: Function[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.overArgs\n         */\n        overArgs<TResult extends Function>(...transforms: Function[]): LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.overArgs\n         */\n        overArgs<TResult extends Function>(transforms: Function[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.overArgs\n         */\n        overArgs<TResult extends Function>(...transforms: Function[]): LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.overArgs\n         */\n        overArgs<TResult extends Function>(transforms: Function[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.negate\n    interface LoDashStatic {\n        /**\n         * Creates a function that negates the result of the predicate func. The func predicate is invoked with\n         * the this binding and arguments of the created function.\n         *\n         * @param predicate The predicate to negate.\n         * @return Returns the new function.\n         */\n        negate<T extends Function>(predicate: T): (...args: any[]) => boolean;\n\n        /**\n         * @see _.negate\n         */\n        negate<T extends Function, TResult extends Function>(predicate: T): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.negate\n         */\n        negate(): LoDashImplicitObjectWrapper<(...args: any[]) => boolean>;\n\n        /**\n         * @see _.negate\n         */\n        negate<TResult extends Function>(): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.negate\n         */\n        negate(): LoDashExplicitObjectWrapper<(...args: any[]) => boolean>;\n\n        /**\n         * @see _.negate\n         */\n        negate<TResult extends Function>(): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.once\n    interface LoDashStatic {\n        /**\n         * Creates a function that is restricted to invoking func once. Repeat calls to the function return the value\n         * of the first call. The func is invoked with the this binding and arguments of the created function.\n         *\n         * @param func The function to restrict.\n         * @return Returns the new restricted function.\n         */\n        once<T extends Function>(func: T): T;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.once\n         */\n        once(): LoDashImplicitObjectWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.once\n         */\n        once(): LoDashExplicitObjectWrapper<T>;\n    }\n\n    //_.partial\n    interface LoDashStatic {\n        /**\n        * Creates a function that, when called, invokes func with any additional partial arguments\n        * prepended to those provided to the new function. This method is similar to _.bind except\n        * it does not alter the this binding.\n        * @param func The function to partially apply arguments to.\n        * @param args Arguments to be partially applied.\n        * @return The new partially applied function.\n        **/\n        partial: Partial;\n    }\n\n    type PH = LoDashStatic;\n\n    type Function0<R> = () => R;\n    type Function1<T1, R> = (t1: T1) => R;\n    type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;\n    type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;\n    type Function4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;\n\n    interface Partial {\n        // arity 0\n        <R>(func: Function0<R>): Function0<R>;\n        // arity 1\n        <T1, R>(func: Function1<T1, R>): Function1<T1, R>;\n        <T1, R>(func: Function1<T1, R>, arg1: T1): Function0<R>;\n        // arity 2\n        <T1, T2, R>(func: Function2<T1, T2, R>):                      Function2<T1, T2, R>;\n        <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1):            Function1<    T2, R>;\n        <T1, T2, R>(func: Function2<T1, T2, R>, plc1: PH, arg2: T2):  Function1<T1,     R>;\n        <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1, arg2: T2):  Function0<        R>;\n        // arity 3\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>):                                Function3<T1, T2, T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1):                      Function2<    T2, T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: PH, arg2: T2):            Function2<T1,     T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2):            Function1<        T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: PH, plc2: PH, arg3: T3):  Function2<T1, T2,     R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, plc2: PH, arg3: T3):  Function1<    T2,     R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, plc1: PH, arg2: T2, arg3: T3):  Function1<T1,         R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2, arg3: T3):  Function0<            R>;\n        // arity 4\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>):                                          Function4<T1, T2, T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1):                                Function3<    T2, T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: PH, arg2: T2):                      Function3<T1,     T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2):                      Function2<        T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: PH, plc2: PH, arg3: T3):            Function3<T1, T2,     T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: PH, arg3: T3):            Function2<    T2,     T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: PH, arg2: T2, arg3: T3):            Function2<T1,         T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3):            Function1<            T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: PH, plc2: PH, plc3: PH, arg4: T4):  Function3<T1, T2, T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: PH, plc3: PH, arg4: T4):  Function2<    T2, T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: PH, arg2: T2, plc3: PH, arg4: T4):  Function2<T1,     T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, plc3: PH, arg4: T4):  Function1<        T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: PH, plc2: PH, arg3: T3, arg4: T4):  Function2<T1, T2,         R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: PH, arg3: T3, arg4: T4):  Function1<    T2,         R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, plc1: PH, arg2: T2, arg3: T3, arg4: T4):  Function1<T1,             R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3, arg4: T4):  Function0<                R>;\n        // catch-all\n        (func: Function, ...args: any[]): Function;\n    }\n\n    //_.partialRight\n    interface LoDashStatic {\n        /**\n        * This method is like _.partial except that partial arguments are appended to those provided\n        * to the new function.\n        * @param func The function to partially apply arguments to.\n        * @param args Arguments to be partially applied.\n        * @return The new partially applied function.\n        **/\n        partialRight: PartialRight;\n    }\n\n    interface PartialRight {\n        // arity 0\n        <R>(func: Function0<R>): Function0<R>;\n        // arity 1\n        <T1, R>(func: Function1<T1, R>): Function1<T1, R>;\n        <T1, R>(func: Function1<T1, R>, arg1: T1): Function0<R>;\n        // arity 2\n        <T1, T2, R>(func: Function2<T1, T2, R>):                      Function2<T1, T2, R>;\n        <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1, plc2: PH):  Function1<    T2, R>;\n        <T1, T2, R>(func: Function2<T1, T2, R>,           arg2: T2):  Function1<T1,     R>;\n        <T1, T2, R>(func: Function2<T1, T2, R>, arg1: T1, arg2: T2):  Function0<        R>;\n        // arity 3\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>):                                Function3<T1, T2, T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, plc2: PH, plc3: PH):  Function2<    T2, T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>,           arg2: T2, plc3: PH):  Function2<T1,     T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2, plc3: PH):  Function1<        T3, R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>,                     arg3: T3):  Function2<T1, T2,     R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, plc2: PH, arg3: T3):  Function1<    T2,     R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>,           arg2: T2, arg3: T3):  Function1<T1,         R>;\n        <T1, T2, T3, R>(func: Function3<T1, T2, T3, R>, arg1: T1, arg2: T2, arg3: T3):  Function0<            R>;\n        // arity 4\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>):                                          Function4<T1, T2, T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: PH, plc3: PH, plc4: PH):  Function3<    T2, T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>,           arg2: T2, plc3: PH, plc4: PH):  Function3<T1,     T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, plc3: PH, plc4: PH):  Function2<        T3, T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>,                     arg3: T3, plc4: PH):  Function3<T1, T2,     T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: PH, arg3: T3, plc4: PH):  Function2<    T2,     T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>,           arg2: T2, arg3: T3, plc4: PH):  Function2<T1,         T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3, plc4: PH):  Function1<            T4, R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>,                               arg4: T4):  Function3<T1, T2, T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: PH, plc3: PH, arg4: T4):  Function2<    T2, T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>,           arg2: T2, plc3: PH, arg4: T4):  Function2<T1,     T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, plc3: PH, arg4: T4):  Function1<        T3,     R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>,                     arg3: T3, arg4: T4):  Function2<T1, T2,         R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, plc2: PH, arg3: T3, arg4: T4):  Function1<    T2,         R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>,           arg2: T2, arg3: T3, arg4: T4):  Function1<T1,             R>;\n        <T1, T2, T3, T4, R>(func: Function4<T1, T2, T3, T4, R>, arg1: T1, arg2: T2, arg3: T3, arg4: T4):  Function0<                R>;\n        // catch-all\n        (func: Function, ...args: any[]): Function;\n    }\n\n    //_.rearg\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes func with arguments arranged according to the specified indexes where the\n         * argument value at the first index is provided as the first argument, the argument value at the second index\n         * is provided as the second argument, and so on.\n         * @param func The function to rearrange arguments for.\n         * @param indexes The arranged argument indexes, specified as individual indexes or arrays of indexes.\n         * @return Returns the new function.\n         */\n        rearg<TResult extends Function>(func: Function, indexes: number[]): TResult;\n\n        /**\n         * @see _.rearg\n         */\n        rearg<TResult extends Function>(func: Function, ...indexes: number[]): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.rearg\n         */\n        rearg<TResult extends Function>(indexes: number[]): LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.rearg\n         */\n        rearg<TResult extends Function>(...indexes: number[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    //_.rest\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes func with the this binding of the created function and arguments from start\n         * and beyond provided as an array.\n         *\n         * Note: This method is based on the rest parameter.\n         *\n         * @param func The function to apply a rest parameter to.\n         * @param start The start position of the rest parameter.\n         * @return Returns the new function.\n         */\n        rest<TResult extends Function>(\n            func: Function,\n            start?: number\n        ): TResult;\n\n        /**\n         * @see _.rest\n         */\n        rest<TResult extends Function, TFunc extends Function>(\n            func: TFunc,\n            start?: number\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.rest\n         */\n        rest<TResult extends Function>(start?: number): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.rest\n         */\n        rest<TResult extends Function>(start?: number): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.spread\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes func with the this binding of the created function and an array of arguments\n         * much like Function#apply.\n         *\n         * Note: This method is based on the spread operator.\n         *\n         * @param func The function to spread arguments over.\n         * @return Returns the new function.\n         */\n        spread<F extends Function, T extends Function>(func: F): T;\n\n        /**\n         * @see _.spread\n         */\n        spread<T extends Function>(func: Function): T;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.spread\n         */\n        spread<T extends Function>(): LoDashImplicitObjectWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.spread\n         */\n        spread<T extends Function>(): LoDashExplicitObjectWrapper<T>;\n    }\n\n    //_.throttle\n    interface ThrottleSettings {\n        /**\n         * If you'd like to disable the leading-edge call, pass this as false.\n         */\n        leading?: boolean;\n\n        /**\n         * If you'd like to disable the execution on the trailing-edge, pass false.\n         */\n        trailing?: boolean;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Creates a throttled function that only invokes func at most once per every wait milliseconds. The throttled\n         * function comes with a cancel method to cancel delayed invocations and a flush method to immediately invoke\n         * them. Provide an options object to indicate that func should be invoked on the leading and/or trailing edge\n         * of the wait timeout. Subsequent calls to the throttled function return the result of the last func call.\n         *\n         * Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only if\n         * the the throttled function is invoked more than once during the wait timeout.\n         *\n         * @param func The function to throttle.\n         * @param wait The number of milliseconds to throttle invocations to.\n         * @param options The options object.\n         * @param options.leading Specify invoking on the leading edge of the timeout.\n         * @param options.trailing Specify invoking on the trailing edge of the timeout.\n         * @return Returns the new throttled function.\n         */\n        throttle<T extends Function>(\n            func: T,\n            wait?: number,\n            options?: ThrottleSettings\n        ): T & Cancelable;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.throttle\n         */\n        throttle(\n            wait?: number,\n            options?: ThrottleSettings\n        ): LoDashImplicitObjectWrapper<T & Cancelable>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.throttle\n         */\n        throttle(\n            wait?: number,\n            options?: ThrottleSettings\n        ): LoDashExplicitObjectWrapper<T & Cancelable>;\n    }\n\n    //_.unary\n    interface LoDashStatic {\n        /**\n         * Creates a function that accepts up to one argument, ignoring any\n         * additional arguments.\n         *\n         * @static\n         * @memberOf _\n         * @category Function\n         * @param {Function} func The function to cap arguments for.\n         * @returns {Function} Returns the new function.\n         * @example\n         *\n         * _.map(['6', '8', '10'], _.unary(parseInt));\n         * // => [6, 8, 10]\n         */\n        unary<T extends Function>(func: T): T;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.unary\n         */\n        unary(): LoDashImplicitObjectWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.unary\n         */\n        unary(): LoDashExplicitObjectWrapper<T>;\n    }\n\n    //_.wrap\n    interface LoDashStatic {\n        /**\n         * Creates a function that provides value to the wrapper function as its first argument. Any additional\n         * arguments provided to the function are appended to those provided to the wrapper function. The wrapper is\n         * invoked with the this binding of the created function.\n         *\n         * @param value The value to wrap.\n         * @param wrapper The wrapper function.\n         * @return Returns the new function.\n         */\n        wrap<V, W extends Function, R extends Function>(\n            value: V,\n            wrapper: W\n        ): R;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<V, R extends Function>(\n            value: V,\n            wrapper: Function\n        ): R;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<R extends Function>(\n            value: any,\n            wrapper: Function\n        ): R;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.wrap\n         */\n        wrap<W extends Function, R extends Function>(wrapper: W): LoDashImplicitObjectWrapper<R>;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<R extends Function>(wrapper: Function): LoDashImplicitObjectWrapper<R>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.wrap\n         */\n        wrap<W extends Function, R extends Function>(wrapper: W): LoDashImplicitObjectWrapper<R>;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<R extends Function>(wrapper: Function): LoDashImplicitObjectWrapper<R>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.wrap\n         */\n        wrap<W extends Function, R extends Function>(wrapper: W): LoDashImplicitObjectWrapper<R>;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<R extends Function>(wrapper: Function): LoDashImplicitObjectWrapper<R>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.wrap\n         */\n        wrap<W extends Function, R extends Function>(wrapper: W): LoDashExplicitObjectWrapper<R>;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<R extends Function>(wrapper: Function): LoDashExplicitObjectWrapper<R>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.wrap\n         */\n        wrap<W extends Function, R extends Function>(wrapper: W): LoDashExplicitObjectWrapper<R>;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<R extends Function>(wrapper: Function): LoDashExplicitObjectWrapper<R>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.wrap\n         */\n        wrap<W extends Function, R extends Function>(wrapper: W): LoDashExplicitObjectWrapper<R>;\n\n        /**\n         * @see _.wrap\n         */\n        wrap<R extends Function>(wrapper: Function): LoDashExplicitObjectWrapper<R>;\n    }\n\n    /********\n     * Lang *\n     ********/\n\n    //_.castArray\n    interface LoDashStatic {\n        /**\n         * Casts value as an array if it’s not one.\n         *\n         * @param value The value to inspect.\n         * @return Returns the cast array.\n         */\n        castArray<T>(value?: Many<T>): T[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.castArray\n         */\n        castArray(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.castArray\n         */\n        castArray(): TWrapper;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.castArray\n         */\n        castArray(): LoDashImplicitArrayWrapper<TObject>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.castArray\n         */\n        castArray(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.castArray\n         */\n        castArray(): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.castArray\n         */\n        castArray(): LoDashExplicitArrayWrapper<TObject>;\n    }\n\n    //_.clone\n    interface LoDashStatic {\n        /**\n         * Creates a shallow clone of value.\n         *\n         * Note: This method is loosely based on the structured clone algorithm and supports cloning arrays,\n         * array buffers, booleans, date objects, maps, numbers, Object objects, regexes, sets, strings, symbols,\n         * and typed arrays. The own enumerable properties of arguments objects are cloned as plain objects. An empty\n         * object is returned for uncloneable values such as error objects, functions, DOM nodes, and WeakMaps.\n         *\n         * @param value The value to clone.\n         * @return Returns the cloned value.\n         */\n        clone<T>(value: T): T;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.clone\n         */\n        clone(): T;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.clone\n         */\n        clone(): TArray;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.clone\n         */\n        clone(): TObject;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.clone\n         */\n        clone(): LoDashExplicitWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.clone\n         */\n        clone(): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.clone\n         */\n        clone(): TWrapper;\n    }\n\n    //_.cloneDeep\n    interface LoDashStatic {\n        /**\n         * This method is like _.clone except that it recursively clones value.\n         *\n         * @param value The value to recursively clone.\n         * @return Returns the deep cloned value.\n         */\n        cloneDeep<T>(value: T): T;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.cloneDeep\n         */\n        cloneDeep(): T;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeep\n         */\n        cloneDeep(): TArray;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeep\n         */\n        cloneDeep(): TObject;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.cloneDeep\n         */\n        cloneDeep(): LoDashExplicitWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeep\n         */\n        cloneDeep(): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeep\n         */\n        cloneDeep(): TWrapper;\n    }\n\n    //_.cloneDeepWith\n    type CloneDeepWithCustomizer<TValue, TResult> = (value: TValue, key?: number|string, object?: any, stack?: any) => TResult;\n\n    interface LoDashStatic {\n        /**\n         * This method is like _.cloneWith except that it recursively clones value.\n         *\n         * @param value The value to recursively clone.\n         * @param customizer The function to customize cloning.\n         * @return Returns the deep cloned value.\n         */\n        cloneDeepWith<TResult>(\n            value: any,\n            customizer?: CloneDeepWithCustomizer<any, TResult>\n        ): TResult;\n\n        /**\n         * @see _.clonDeepeWith\n         */\n        cloneDeepWith<T, TResult>(\n            value: T,\n            customizer?: CloneDeepWithCustomizer<T, TResult>\n        ): TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult>(\n            customizer?: CloneDeepWithCustomizer<T, TResult>\n        ): TResult;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult>(\n            customizer?: CloneDeepWithCustomizer<TArray, TResult>\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult>(\n            customizer?: CloneDeepWithCustomizer<TObject, TResult>\n        ): TResult;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult extends (number|string|boolean)>(\n            customizer?: CloneDeepWithCustomizer<T, TResult>\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult>(\n            customizer?: CloneDeepWithCustomizer<T, TResult[]>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult extends Object>(\n            customizer?: CloneDeepWithCustomizer<T, TResult>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult extends (number|string|boolean)>(\n            customizer?: CloneDeepWithCustomizer<TArray, TResult>\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult>(\n            customizer?: CloneDeepWithCustomizer<T[], TResult[]>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult extends Object>(\n            customizer?: CloneDeepWithCustomizer<T[], TResult>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult extends (number|string|boolean)>(\n            customizer?: CloneDeepWithCustomizer<T, TResult>\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult>(\n            customizer?: CloneDeepWithCustomizer<T, TResult[]>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.cloneDeepWith\n         */\n        cloneDeepWith<TResult extends Object>(\n            customizer?: CloneDeepWithCustomizer<T, TResult>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.cloneWith\n    type CloneWithCustomizer<TValue, TResult> = (value: TValue, key?: number|string, object?: any, stack?: any) => TResult;\n\n    interface LoDashStatic {\n        /**\n         * This method is like _.clone except that it accepts customizer which is invoked to produce the cloned value.\n         * If customizer returns undefined cloning is handled by the method instead.\n         *\n         * @param value The value to clone.\n         * @param customizer The function to customize cloning.\n         * @return Returns the cloned value.\n         */\n        cloneWith<TResult>(\n            value: any,\n            customizer?: CloneWithCustomizer<any, TResult>\n        ): TResult;\n\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<T, TResult>(\n            value: T,\n            customizer?: CloneWithCustomizer<T, TResult>\n        ): TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult>(\n            customizer?: CloneWithCustomizer<T, TResult>\n        ): TResult;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult>(\n            customizer?: CloneWithCustomizer<TArray, TResult>\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult>(\n            customizer?: CloneWithCustomizer<TObject, TResult>\n        ): TResult;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult extends (number|string|boolean)>(\n            customizer?: CloneWithCustomizer<T, TResult>\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult>(\n            customizer?: CloneWithCustomizer<T, TResult[]>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult extends Object>(\n            customizer?: CloneWithCustomizer<T, TResult>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult extends (number|string|boolean)>(\n            customizer?: CloneWithCustomizer<TArray, TResult>\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult>(\n            customizer?: CloneWithCustomizer<T[], TResult[]>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult extends Object>(\n            customizer?: CloneWithCustomizer<T[], TResult>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult extends (number|string|boolean)>(\n            customizer?: CloneWithCustomizer<T, TResult>\n        ): LoDashExplicitWrapper<TResult>;\n\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult>(\n            customizer?: CloneWithCustomizer<T, TResult[]>\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.cloneWith\n         */\n        cloneWith<TResult extends Object>(\n            customizer?: CloneWithCustomizer<T, TResult>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    /**\n     * An object containing predicate functions for each property of T\n     */\n    type ConformsPredicateObject<T> = {\n        [P in keyof T]: (val: T[P]) => boolean;\n    };\n\n    //_.conforms\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes the predicate properties of `source` with the corresponding\n         * property values of a given object, returning true if all predicates return truthy, else false.\n         */\n        conforms<T>(source: ConformsPredicateObject<T>): (Target: T) => boolean;\n    }\n\n    //_.conformsTo\n    interface LoDashStatic {\n        /**\n         * Checks if object conforms to source by invoking the predicate properties of source with the\n         * corresponding property values of object.\n         *\n         * Note: This method is equivalent to _.conforms when source is partially applied.\n         */\n        conformsTo<T>(object: T, source: ConformsPredicateObject<T>): boolean;\n    }\n\n    //_.eq\n    interface LoDashStatic {\n        /**\n         * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)\n         * comparison between two values to determine if they are equivalent.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to compare.\n         * @param {*} other The other value to compare.\n         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n         * @example\n         *\n         * var object = { 'user': 'fred' };\n         * var other = { 'user': 'fred' };\n         *\n         * _.eq(object, object);\n         * // => true\n         *\n         * _.eq(object, other);\n         * // => false\n         *\n         * _.eq('a', 'a');\n         * // => true\n         *\n         * _.eq('a', Object('a'));\n         * // => false\n         *\n         * _.eq(NaN, NaN);\n         * // => true\n         */\n        eq(\n            value: any,\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEqual\n         */\n        eq(\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEqual\n         */\n        eq(\n            other: any\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.gt\n    interface LoDashStatic {\n        /**\n         * Checks if value is greater than other.\n         *\n         * @param value The value to compare.\n         * @param other The other value to compare.\n         * @return Returns true if value is greater than other, else false.\n         */\n        gt(\n            value: any,\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.gt\n         */\n        gt(other: any): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.gt\n         */\n        gt(other: any): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.gte\n    interface LoDashStatic {\n        /**\n         * Checks if value is greater than or equal to other.\n         *\n         * @param value The value to compare.\n         * @param other The other value to compare.\n         * @return Returns true if value is greater than or equal to other, else false.\n         */\n        gte(\n            value: any,\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.gte\n         */\n        gte(other: any): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.gte\n         */\n        gte(other: any): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isArguments\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as an arguments object.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isArguments(value?: any): value is IArguments;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArguments\n         */\n        isArguments(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArguments\n         */\n        isArguments(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isArray\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as an Array object.\n         * @param value The value to check.\n         *\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isArray(value?: any): value is any[];\n\n        /**\n         * DEPRECATED\n         */\n        isArray<T>(value?: any): value is any[];\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArray\n         */\n        isArray(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArray\n         */\n        isArray(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isArrayBuffer\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as an ArrayBuffer object.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isArrayBuffer(value?: any): value is ArrayBuffer;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArrayBuffer\n         */\n        isArrayBuffer(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArrayBuffer\n         */\n        isArrayBuffer(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isArrayLike\n    interface LoDashStatic {\n        /**\n         * Checks if `value` is array-like. A value is considered array-like if it's\n         * not a function and has a `value.length` that's an integer greater than or\n         * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n         *\n         * @static\n         * @memberOf _\n         * @type Function\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n         * @example\n         *\n         * _.isArrayLike([1, 2, 3]);\n         * // => true\n         *\n         * _.isArrayLike(document.body.children);\n         * // => true\n         *\n         * _.isArrayLike('abc');\n         * // => true\n         *\n         * _.isArrayLike(_.noop);\n         * // => false\n         */\n        isArrayLike<T>(value: T & string & number): boolean; // should only match if T = any\n\n        /**\n         * @see _.isArrayLike\n         */\n        isArrayLike(value?: Function): value is never;\n\n        /**\n         * @see _.isArrayLike\n         */\n        isArrayLike<T>(value: T | Function): value is T & { length: number };\n\n        /**\n         * DEPRECATED\n         */\n        isArrayLike<T>(value?: any): value is any[];\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArrayLike\n         */\n        isArrayLike(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArrayLike\n         */\n        isArrayLike(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isArrayLikeObject\n    interface LoDashStatic {\n        /**\n         * This method is like `_.isArrayLike` except that it also checks if `value`\n         * is an object.\n         *\n         * @static\n         * @memberOf _\n         * @type Function\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.\n         * @example\n         *\n         * _.isArrayLikeObject([1, 2, 3]);\n         * // => true\n         *\n         * _.isArrayLikeObject(document.body.children);\n         * // => true\n         *\n         * _.isArrayLikeObject('abc');\n         * // => false\n         *\n         * _.isArrayLikeObject(_.noop);\n         * // => false\n         */\n        isArrayLikeObject<T>(value: T & string & number): boolean; // should only match if T = any\n\n        /**\n         * @see _.isArrayLike\n         */\n        isArrayLikeObject(value?: Function | string | boolean | number): value is never;\n\n        /**\n         * @see _.isArrayLike\n         */\n        isArrayLikeObject<T>(value: T | Function | string | boolean | number): value is T & { length: number };\n\n        /**\n         * DEPRECATED\n         */\n        isArrayLikeObject<T>(value?: any): value is any[];\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArrayLikeObject\n         */\n        isArrayLikeObject(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isArrayLikeObject\n         */\n        isArrayLikeObject(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isBoolean\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a boolean primitive or object.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isBoolean(value?: any): value is boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isBoolean\n         */\n        isBoolean(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isBoolean\n         */\n        isBoolean(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isBuffer\n    interface LoDashStatic {\n        /**\n         * Checks if value is a buffer.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is a buffer, else false.\n         */\n        isBuffer(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isBuffer\n         */\n        isBuffer(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isBuffer\n         */\n        isBuffer(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isDate\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a Date object.\n         * @param value The value to check.\n         *\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isDate(value?: any): value is Date;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isDate\n         */\n        isDate(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isDate\n         */\n        isDate(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isElement\n    interface LoDashStatic {\n        /**\n         * Checks if value is a DOM element.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is a DOM element, else false.\n         */\n        isElement(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isElement\n         */\n        isElement(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isElement\n         */\n        isElement(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isEmpty\n    interface LoDashStatic {\n        /**\n         * Checks if value is empty. A value is considered empty unless it’s an arguments object, array, string, or\n         * jQuery-like collection with a length greater than 0 or an object with own enumerable properties.\n         *\n         * @param value The value to inspect.\n         * @return Returns true if value is empty, else false.\n         */\n        isEmpty(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEmpty\n         */\n        isEmpty(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEmpty\n         */\n        isEmpty(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isEqual\n    interface LoDashStatic {\n        /**\n         * Performs a deep comparison between two values to determine if they are\n         * equivalent.\n         *\n         * **Note:** This method supports comparing arrays, array buffers, booleans,\n         * date objects, error objects, maps, numbers, `Object` objects, regexes,\n         * sets, strings, symbols, and typed arrays. `Object` objects are compared\n         * by their own, not inherited, enumerable properties. Functions and DOM\n         * nodes are **not** supported.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to compare.\n         * @param {*} other The other value to compare.\n         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n         * @example\n         *\n         * var object = { 'user': 'fred' };\n         * var other = { 'user': 'fred' };\n         *\n         * _.isEqual(object, other);\n         * // => true\n         *\n         * object === other;\n         * // => false\n         */\n        isEqual(\n            value: any,\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEqual\n         */\n        isEqual(\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEqual\n         */\n        isEqual(\n            other: any\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    // _.isEqualWith\n    type IsEqualCustomizer = (value: any, other: any, indexOrKey: number|string|undefined, parent: any, otherParent: any, stack: any) => boolean|undefined;\n\n    interface LoDashStatic {\n        /**\n         * This method is like `_.isEqual` except that it accepts `customizer` which is\n         * invoked to compare values. If `customizer` returns `undefined` comparisons are\n         * handled by the method instead. The `customizer` is invoked with up to seven arguments:\n         * (objValue, othValue [, index|key, object, other, stack]).\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to compare.\n         * @param {*} other The other value to compare.\n         * @param {Function} [customizer] The function to customize comparisons.\n         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n         * @example\n         *\n         * function isGreeting(value) {\n         *   return /^h(?:i|ello)$/.test(value);\n         * }\n         *\n         * function customizer(objValue, othValue) {\n         *   if (isGreeting(objValue) && isGreeting(othValue)) {\n         *     return true;\n         *   }\n         * }\n         *\n         * var array = ['hello', 'goodbye'];\n         * var other = ['hi', 'goodbye'];\n         *\n         * _.isEqualWith(array, other, customizer);\n         * // => true\n         */\n        isEqualWith(\n            value: any,\n            other: any,\n            customizer?: IsEqualCustomizer\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEqualWith\n         */\n        isEqualWith(\n            other: any,\n            customizer?: IsEqualCustomizer\n        ): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isEqualWith\n         */\n        isEqualWith(\n            other: any,\n            customizer?: IsEqualCustomizer\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isError\n    interface LoDashStatic {\n        /**\n         * Checks if value is an Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, or URIError\n         * object.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is an error object, else false.\n         */\n        isError(value: any): value is Error;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isError\n         */\n        isError(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isError\n         */\n        isError(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isFinite\n    interface LoDashStatic {\n        /**\n         * Checks if value is a finite primitive number.\n         *\n         * Note: This method is based on Number.isFinite.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is a finite number, else false.\n         */\n        isFinite(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isFinite\n         */\n        isFinite(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isFinite\n         */\n        isFinite(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isFunction\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a Function object.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isFunction(value?: any): value is Function;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isFunction\n         */\n        isFunction(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isFunction\n         */\n        isFunction(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isInteger\n    interface LoDashStatic {\n        /**\n         * Checks if `value` is an integer.\n         *\n         * **Note:** This method is based on [`Number.isInteger`](https://mdn.io/Number/isInteger).\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is an integer, else `false`.\n         * @example\n         *\n         * _.isInteger(3);\n         * // => true\n         *\n         * _.isInteger(Number.MIN_VALUE);\n         * // => false\n         *\n         * _.isInteger(Infinity);\n         * // => false\n         *\n         * _.isInteger('3');\n         * // => false\n         */\n        isInteger(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isInteger\n         */\n        isInteger(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isInteger\n         */\n        isInteger(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isLength\n    interface LoDashStatic {\n        /**\n         * Checks if `value` is a valid array-like length.\n         *\n         * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n         * @example\n         *\n         * _.isLength(3);\n         * // => true\n         *\n         * _.isLength(Number.MIN_VALUE);\n         * // => false\n         *\n         * _.isLength(Infinity);\n         * // => false\n         *\n         * _.isLength('3');\n         * // => false\n         */\n        isLength(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isLength\n         */\n        isLength(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isLength\n         */\n        isLength(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isMap\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a Map object.\n         *\n         * @param value The value to check.\n         * @returns Returns true if value is correctly classified, else false.\n         */\n        isMap<K, V>(value?: any): value is Map<K, V>;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isMap\n         */\n        isMap(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isMap\n         */\n        isMap(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isMatch\n    type isMatchCustomizer = (value: any, other: any, indexOrKey?: number|string) => boolean;\n\n    interface LoDashStatic {\n        /**\n         * Performs a deep comparison between `object` and `source` to determine if\n         * `object` contains equivalent property values.\n         *\n         * **Note:** This method supports comparing the same values as `_.isEqual`.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {Object} object The object to inspect.\n         * @param {Object} source The object of property values to match.\n         * @returns {boolean} Returns `true` if `object` is a match, else `false`.\n         * @example\n         *\n         * var object = { 'user': 'fred', 'age': 40 };\n         *\n         * _.isMatch(object, { 'age': 40 });\n         * // => true\n         *\n         * _.isMatch(object, { 'age': 36 });\n         * // => false\n         */\n        isMatch(object: Object, source: Object): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.isMatch\n         */\n        isMatch(source: Object): boolean;\n    }\n\n    //_.isMatchWith\n    type isMatchWithCustomizer = (value: any, other: any, indexOrKey?: number|string) => boolean;\n\n    interface LoDashStatic {\n        /**\n         * This method is like `_.isMatch` except that it accepts `customizer` which\n         * is invoked to compare values. If `customizer` returns `undefined` comparisons\n         * are handled by the method instead. The `customizer` is invoked with three\n         * arguments: (objValue, srcValue, index|key, object, source).\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {Object} object The object to inspect.\n         * @param {Object} source The object of property values to match.\n         * @param {Function} [customizer] The function to customize comparisons.\n         * @returns {boolean} Returns `true` if `object` is a match, else `false`.\n         * @example\n         *\n         * function isGreeting(value) {\n         *   return /^h(?:i|ello)$/.test(value);\n         * }\n         *\n         * function customizer(objValue, srcValue) {\n         *   if (isGreeting(objValue) && isGreeting(srcValue)) {\n         *     return true;\n         *   }\n         * }\n         *\n         * var object = { 'greeting': 'hello' };\n         * var source = { 'greeting': 'hi' };\n         *\n         * _.isMatchWith(object, source, customizer);\n         * // => true\n         */\n        isMatchWith(object: Object, source: Object, customizer: isMatchWithCustomizer): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.isMatchWith\n         */\n        isMatchWith(source: Object, customizer: isMatchWithCustomizer): boolean;\n    }\n\n    //_.isNaN\n    interface LoDashStatic {\n        /**\n         * Checks if value is NaN.\n         *\n         * Note: This method is not the same as isNaN which returns true for undefined and other non-numeric values.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is NaN, else false.\n         */\n        isNaN(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isNaN\n         */\n        isNaN(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isNaN\n         */\n        isNaN(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isNative\n    interface LoDashStatic {\n        /**\n         * Checks if value is a native function.\n         * @param value The value to check.\n         *\n         * @retrun Returns true if value is a native function, else false.\n         */\n        isNative(value: any): value is Function;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNative\n         */\n        isNative(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNative\n         */\n        isNative(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isNil\n    interface LoDashStatic {\n        /**\n         * Checks if `value` is `null` or `undefined`.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is nullish, else `false`.\n         * @example\n         *\n         * _.isNil(null);\n         * // => true\n         *\n         * _.isNil(void 0);\n         * // => true\n         *\n         * _.isNil(NaN);\n         * // => false\n         */\n        isNil(value: any): value is null | undefined;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNil\n         */\n        isNil(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNil\n         */\n        isNil(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isNull\n    interface LoDashStatic {\n        /**\n         * Checks if value is null.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is null, else false.\n         */\n        isNull(value: any): value is null;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNull\n         */\n        isNull(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNull\n         */\n        isNull(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isNumber\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a Number primitive or object.\n         *\n         * Note: To exclude Infinity, -Infinity, and NaN, which are classified as numbers, use the _.isFinite method.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isNumber(value?: any): value is number;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNumber\n         */\n        isNumber(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isNumber\n         */\n        isNumber(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isObject\n    interface LoDashStatic {\n        /**\n         * Checks if value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0),\n         * and new String(''))\n         *\n         * @param value The value to check.\n         * @return Returns true if value is an object, else false.\n         */\n        isObject(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isObject\n         */\n        isObject(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isObject\n         */\n        isObject(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isObjectLike\n    interface LoDashStatic {\n        /**\n         * Checks if `value` is object-like. A value is object-like if it's not `null`\n         * and has a `typeof` result of \"object\".\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n         * @example\n         *\n         * _.isObjectLike({});\n         * // => true\n         *\n         * _.isObjectLike([1, 2, 3]);\n         * // => true\n         *\n         * _.isObjectLike(_.noop);\n         * // => false\n         *\n         * _.isObjectLike(null);\n         * // => false\n         */\n        isObjectLike(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isObjectLike\n         */\n        isObjectLike(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isObjectLike\n         */\n        isObjectLike(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isPlainObject\n    interface LoDashStatic {\n        /**\n         * Checks if value is a plain object, that is, an object created by the Object constructor or one with a\n         * [[Prototype]] of null.\n         *\n         * Note: This method assumes objects created by the Object constructor have no inherited enumerable properties.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is a plain object, else false.\n         */\n        isPlainObject(value?: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isPlainObject\n         */\n        isPlainObject(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isPlainObject\n         */\n        isPlainObject(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isRegExp\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a RegExp object.\n         * @param value The value to check.\n         *\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isRegExp(value?: any): value is RegExp;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isRegExp\n         */\n        isRegExp(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isRegExp\n         */\n        isRegExp(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isSafeInteger\n    interface LoDashStatic {\n        /**\n         * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754\n         * double precision number which isn't the result of a rounded unsafe integer.\n         *\n         * **Note:** This method is based on [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.\n         * @example\n         *\n         * _.isSafeInteger(3);\n         * // => true\n         *\n         * _.isSafeInteger(Number.MIN_VALUE);\n         * // => false\n         *\n         * _.isSafeInteger(Infinity);\n         * // => false\n         *\n         * _.isSafeInteger('3');\n         * // => false\n         */\n        isSafeInteger(value: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isSafeInteger\n         */\n        isSafeInteger(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isSafeInteger\n         */\n        isSafeInteger(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isSet\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a Set object.\n         *\n         * @param value The value to check.\n         * @returns Returns true if value is correctly classified, else false.\n         */\n        isSet<T>(value?: any): value is Set<T>;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isSet\n         */\n        isSet(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isSet\n         */\n        isSet(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isString\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a String primitive or object.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isString(value?: any): value is string;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isString\n         */\n        isString(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isString\n         */\n        isString(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isSymbol\n    interface LoDashStatic {\n        /**\n         * Checks if `value` is classified as a `Symbol` primitive or object.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to check.\n         * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.\n         * @example\n         *\n         * _.isSymbol(Symbol.iterator);\n         * // => true\n         *\n         * _.isSymbol('abc');\n         * // => false\n         */\n        isSymbol(value: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isSymbol\n         */\n        isSymbol(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isSymbol\n         */\n        isSymbol(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isTypedArray\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a typed array.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is correctly classified, else false.\n         */\n        isTypedArray(value: any): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isTypedArray\n         */\n        isTypedArray(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isTypedArray\n         */\n        isTypedArray(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isUndefined\n    interface LoDashStatic {\n        /**\n         * Checks if value is undefined.\n         *\n         * @param value The value to check.\n         * @return Returns true if value is undefined, else false.\n         */\n        isUndefined(value: any): value is undefined;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isUndefined\n         */\n        isUndefined(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * see _.isUndefined\n         */\n        isUndefined(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isWeakMap\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a WeakMap object.\n         *\n         * @param value The value to check.\n         * @returns Returns true if value is correctly classified, else false.\n         */\n        isWeakMap<K extends object, V>(value?: any): value is WeakMap<K, V>;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isSet\n         */\n        isWeakMap(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isSet\n         */\n        isWeakMap(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.isWeakSet\n    interface LoDashStatic {\n        /**\n         * Checks if value is classified as a WeakSet object.\n         *\n         * @param value The value to check.\n         * @returns Returns true if value is correctly classified, else false.\n         */\n        isWeakSet<T>(value?: any): value is WeakSet<T>;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isWeakSet\n         */\n        isWeakSet(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.isWeakSet\n         */\n        isWeakSet(): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.lt\n    interface LoDashStatic {\n        /**\n         * Checks if value is less than other.\n         *\n         * @param value The value to compare.\n         * @param other The other value to compare.\n         * @return Returns true if value is less than other, else false.\n         */\n        lt(\n            value: any,\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.lt\n         */\n        lt(other: any): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.lt\n         */\n        lt(other: any): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.lte\n    interface LoDashStatic {\n        /**\n         * Checks if value is less than or equal to other.\n         *\n         * @param value The value to compare.\n         * @param other The other value to compare.\n         * @return Returns true if value is less than or equal to other, else false.\n         */\n        lte(\n            value: any,\n            other: any\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.lte\n         */\n        lte(other: any): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.lte\n         */\n        lte(other: any): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.toArray\n    interface LoDashStatic {\n        /**\n         * Converts value to an array.\n         *\n         * @param value The value to convert.\n         * @return Returns the converted array.\n         */\n        toArray<T>(value: List<T>|Dictionary<T>|NumericDictionary<T>): T[];\n\n        /**\n         * @see _.toArray\n         */\n        toArray<TValue, TResult>(value: TValue): TResult[];\n\n        /**\n         * @see _.toArray\n         */\n        toArray<TResult>(value?: any): TResult[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.toArray\n         */\n        toArray<TResult>(): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.toArray\n         */\n        toArray(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.toArray\n         */\n        toArray<TResult>(): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.toArray\n         */\n        toArray<TResult>(): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.toArray\n         */\n        toArray(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.toArray\n         */\n        toArray<TResult>(): LoDashExplicitArrayWrapper<TResult>;\n    }\n\n    //_.toPlainObject\n    interface LoDashStatic {\n        /**\n         * Converts value to a plain object flattening inherited enumerable properties of value to own properties\n         * of the plain object.\n         *\n         * @param value The value to convert.\n         * @return Returns the converted plain object.\n         */\n        toPlainObject<TResult extends {}>(value?: any): TResult;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toPlainObject\n         */\n        toPlainObject<TResult extends {}>(): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    //_.toFinite\n    interface LoDashStatic {\n        /**\n         * Converts `value` to a finite number.\n         *\n         * @static\n         * @memberOf _\n         * @since 4.12.0\n         * @category Lang\n         * @param {*} value The value to convert.\n         * @returns {number} Returns the converted number.\n         * @example\n         *\n         * _.toFinite(3.2);\n         * // => 3.2\n         *\n         * _.toFinite(Number.MIN_VALUE);\n         * // => 5e-324\n         *\n         * _.toFinite(Infinity);\n         * // => 1.7976931348623157e+308\n         *\n         * _.toFinite('3.2');\n         * // => 3.2\n         */\n        toFinite(value: any): number;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toFinite\n         */\n        toFinite(): LoDashImplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toFinite\n         */\n        toFinite(): LoDashExplicitWrapper<number>;\n    }\n\n    //_.toInteger\n    interface LoDashStatic {\n        /**\n         * Converts `value` to an integer.\n         *\n         * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to convert.\n         * @returns {number} Returns the converted integer.\n         * @example\n         *\n         * _.toInteger(3);\n         * // => 3\n         *\n         * _.toInteger(Number.MIN_VALUE);\n         * // => 0\n         *\n         * _.toInteger(Infinity);\n         * // => 1.7976931348623157e+308\n         *\n         * _.toInteger('3');\n         * // => 3\n         */\n        toInteger(value: any): number;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toInteger\n         */\n        toInteger(): LoDashImplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toInteger\n         */\n        toInteger(): LoDashExplicitWrapper<number>;\n    }\n\n    //_.toLength\n    interface LoDashStatic {\n        /**\n         * Converts `value` to an integer suitable for use as the length of an\n         * array-like object.\n         *\n         * **Note:** This method is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to convert.\n         * @return {number} Returns the converted integer.\n         * @example\n         *\n         * _.toLength(3);\n         * // => 3\n         *\n         * _.toLength(Number.MIN_VALUE);\n         * // => 0\n         *\n         * _.toLength(Infinity);\n         * // => 4294967295\n         *\n         * _.toLength('3');\n         * // => 3\n         */\n        toLength(value: any): number;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toLength\n         */\n        toLength(): LoDashImplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toLength\n         */\n        toLength(): LoDashExplicitWrapper<number>;\n    }\n\n    //_.toNumber\n    interface LoDashStatic {\n        /**\n         * Converts `value` to a number.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to process.\n         * @returns {number} Returns the number.\n         * @example\n         *\n         * _.toNumber(3);\n         * // => 3\n         *\n         * _.toNumber(Number.MIN_VALUE);\n         * // => 5e-324\n         *\n         * _.toNumber(Infinity);\n         * // => Infinity\n         *\n         * _.toNumber('3');\n         * // => 3\n         */\n        toNumber(value: any): number;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toNumber\n         */\n        toNumber(): LoDashImplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toNumber\n         */\n        toNumber(): LoDashExplicitWrapper<number>;\n    }\n\n    //_.toSafeInteger\n    interface LoDashStatic {\n        /**\n         * Converts `value` to a safe integer. A safe integer can be compared and\n         * represented correctly.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to convert.\n         * @returns {number} Returns the converted integer.\n         * @example\n         *\n         * _.toSafeInteger(3);\n         * // => 3\n         *\n         * _.toSafeInteger(Number.MIN_VALUE);\n         * // => 0\n         *\n         * _.toSafeInteger(Infinity);\n         * // => 9007199254740991\n         *\n         * _.toSafeInteger('3');\n         * // => 3\n         */\n        toSafeInteger(value: any): number;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toSafeInteger\n         */\n        toSafeInteger(): LoDashImplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toSafeInteger\n         */\n        toSafeInteger(): LoDashExplicitWrapper<number>;\n    }\n\n    //_.toString DUMMY\n    interface LoDashStatic {\n        /**\n         * Converts `value` to a string if it's not one. An empty string is returned\n         * for `null` and `undefined` values. The sign of `-0` is preserved.\n         *\n         * @static\n         * @memberOf _\n         * @category Lang\n         * @param {*} value The value to process.\n         * @returns {string} Returns the string.\n         * @example\n         *\n         * _.toString(null);\n         * // => ''\n         *\n         * _.toString(-0);\n         * // => '-0'\n         *\n         * _.toString([1, 2, 3]);\n         * // => '1,2,3'\n         */\n        toString(value: any): string;\n    }\n\n    /********\n     * Math *\n     ********/\n\n    //_.add\n    interface LoDashStatic {\n        /**\n         * Adds two numbers.\n         *\n         * @param augend The first number to add.\n         * @param addend The second number to add.\n         * @return Returns the sum.\n         */\n        add(\n            augend: number,\n            addend: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.add\n         */\n        add(addend: number): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.add\n         */\n        add(addend: number): LoDashExplicitWrapper<number>;\n    }\n\n    //_.ceil\n    interface LoDashStatic {\n        /**\n         * Calculates n rounded up to precision.\n         *\n         * @param n The number to round up.\n         * @param precision The precision to round up to.\n         * @return Returns the rounded up number.\n         */\n        ceil(\n            n: number,\n            precision?: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.ceil\n         */\n        ceil(precision?: number): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.ceil\n         */\n        ceil(precision?: number): LoDashExplicitWrapper<number>;\n    }\n\n    //_.divide\n    interface LoDashStatic {\n       /**\n        * Divide two numbers.\n        *\n        * @param dividend The first number in a division.\n        * @param divisor The second number in a division.\n        * @returns Returns the quotient.\n        */\n        divide(\n            dividend: number,\n            divisor: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.divide\n         */\n        divide(divisor: number): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.divide\n         */\n        divide(divisor: number): LoDashExplicitWrapper<number>;\n    }\n\n    //_.floor\n    interface LoDashStatic {\n        /**\n         * Calculates n rounded down to precision.\n         *\n         * @param n The number to round down.\n         * @param precision The precision to round down to.\n         * @return Returns the rounded down number.\n         */\n        floor(\n            n: number,\n            precision?: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.floor\n         */\n        floor(precision?: number): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.floor\n         */\n        floor(precision?: number): LoDashExplicitWrapper<number>;\n    }\n\n    //_.max\n    interface LoDashStatic {\n         /**\n          * Computes the maximum value of `array`. If `array` is empty or falsey\n          * `undefined` is returned.\n          *\n          * @static\n          * @memberOf _\n          * @category Math\n          * @param {Array} array The array to iterate over.\n          * @returns {*} Returns the maximum value.\n          */\n        max<T>(\n            collection: List<T> | null | undefined\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.max\n         */\n        max(): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.max\n         */\n        max<T>(): T | undefined;\n    }\n\n    //_.maxBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.max` except that it accepts `iteratee` which is\n         * invoked for each element in `array` to generate the criterion by which\n         * the value is ranked. The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Math\n         * @param {Array} array The array to iterate over.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {*} Returns the maximum value.\n         * @example\n         *\n         * var objects = [{ 'n': 1 }, { 'n': 2 }];\n         *\n         * _.maxBy(objects, function(o) { return o.a; });\n         * // => { 'n': 2 }\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.maxBy(objects, 'n');\n         * // => { 'n': 2 }\n         */\n        maxBy<T>(\n            collection: List<T> | null | undefined,\n            iteratee?: ListIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.maxBy\n         */\n        maxBy<T>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.maxBy\n         */\n        maxBy<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: string\n        ): T | undefined;\n\n        /**\n         * @see _.maxBy\n         */\n        maxBy<TObject extends {}, T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            whereValue?: TObject\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.maxBy\n         */\n        maxBy(\n            iteratee?: ListIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.maxBy\n         */\n        maxBy(\n            iteratee?: string\n        ): T | undefined;\n\n        /**\n         * @see _.maxBy\n         */\n        maxBy<TObject extends {}>(\n            whereValue?: TObject\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.maxBy\n         */\n        maxBy<T>(\n            iteratee?: ListIterator<T, any>|DictionaryIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.maxBy\n         */\n        maxBy<T>(\n            iteratee?: string\n        ): T | undefined;\n\n        /**\n         * @see _.maxBy\n         */\n        maxBy<TObject extends {}, T>(\n            whereValue?: TObject\n        ): T | undefined;\n    }\n\n    //_.mean\n    interface LoDashStatic {\n        /**\n         * Computes the mean of the values in `array`.\n         *\n         * @static\n         * @memberOf _\n         * @category Math\n         * @param {Array} array The array to iterate over.\n         * @returns {number} Returns the mean.\n         * @example\n         *\n         * _.mean([4, 2, 8, 6]);\n         * // => 5\n         */\n        mean<T>(\n            collection: List<T> | null | undefined\n        ): number;\n    }\n\n    //_.meanBy\n    interface LoDashStatic {\n      /**\n       * Computes the mean of the provided propties of the objects in the `array`\n       *\n       * @static\n       * @memberOf _\n       * @category Math\n       * @param {Array} array The array to iterate over.\n       * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n       * @returns {number} Returns the mean.\n       * @example\n       *\n       * _.mean([{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }], 'n');\n       * // => 5\n       */\n      meanBy<T>(\n        collection: List<T> | null | undefined,\n        iteratee?: ListIterator<T, any> | string\n      ): number;\n\n      meanBy<T>(\n        collection: Dictionary<T> | null | undefined,\n        iteratee?: DictionaryIterator<T, any> | string\n      ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.mean\n         */\n        mean<T>(): number;\n\n        /**\n         * @see _.mean\n         */\n        mean(): number;\n    }\n\n    //_.min\n    interface LoDashStatic {\n        /**\n         * Computes the minimum value of `array`. If `array` is empty or falsey\n         * `undefined` is returned.\n         *\n         * @static\n         * @memberOf _\n         * @category Math\n         * @param {Array} array The array to iterate over.\n         * @returns {*} Returns the minimum value.\n         */\n        min<T>(\n            collection: List<T> | null | undefined\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.min\n         */\n        min(): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.min\n         */\n        min<T>(): T | undefined;\n    }\n\n    //_.minBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.min` except that it accepts `iteratee` which is\n         * invoked for each element in `array` to generate the criterion by which\n         * the value is ranked. The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Math\n         * @param {Array} array The array to iterate over.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {*} Returns the minimum value.\n         * @example\n         *\n         * var objects = [{ 'n': 1 }, { 'n': 2 }];\n         *\n         * _.minBy(objects, function(o) { return o.a; });\n         * // => { 'n': 1 }\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.minBy(objects, 'n');\n         * // => { 'n': 1 }\n         */\n        minBy<T>(\n            collection: List<T> | null | undefined,\n            iteratee?: ListIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.minBy\n         */\n        minBy<T>(\n            collection: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.minBy\n         */\n        minBy<T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: string\n        ): T | undefined;\n\n        /**\n         * @see _.minBy\n         */\n        minBy<TObject extends {}, T>(\n            collection: List<T>|Dictionary<T> | null | undefined,\n            whereValue?: TObject\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.minBy\n         */\n        minBy(\n            iteratee?: ListIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.minBy\n         */\n        minBy(\n            iteratee?: string\n        ): T | undefined;\n\n        /**\n         * @see _.minBy\n         */\n        minBy<TObject extends {}>(\n            whereValue?: TObject\n        ): T | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.minBy\n         */\n        minBy<T>(\n            iteratee?: ListIterator<T, any>|DictionaryIterator<T, any>\n        ): T | undefined;\n\n        /**\n         * @see _.minBy\n         */\n        minBy<T>(\n            iteratee?: string\n        ): T | undefined;\n\n        /**\n         * @see _.minBy\n         */\n        minBy<TObject extends {}, T>(\n            whereValue?: TObject\n        ): T | undefined;\n    }\n\n    //_.multiply\n    interface LoDashStatic {\n        /**\n         * Multiply two numbers.\n         * @param multiplier The first number in a multiplication.\n         * @param multiplicand The second number in a multiplication.\n         * @returns Returns the product.\n         */\n        multiply(\n            multiplier: number,\n            multiplicand: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.multiply\n         */\n        multiply(multiplicand: number): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.multiply\n         */\n        multiply(multiplicand: number): LoDashExplicitWrapper<number>;\n    }\n\n    //_.round\n    interface LoDashStatic {\n        /**\n         * Calculates n rounded to precision.\n         *\n         * @param n The number to round.\n         * @param precision The precision to round to.\n         * @return Returns the rounded number.\n         */\n        round(\n            n: number,\n            precision?: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.round\n         */\n        round(precision?: number): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.round\n         */\n        round(precision?: number): LoDashExplicitWrapper<number>;\n    }\n\n    //_.sum\n    interface LoDashStatic {\n        /**\n         * Computes the sum of the values in `array`.\n         *\n         * @static\n         * @memberOf _\n         * @category Math\n         * @param {Array} array The array to iterate over.\n         * @returns {number} Returns the sum.\n         * @example\n         *\n         * _.sum([4, 2, 8, 6]);\n         * // => 20\n         */\n        sum<T>(collection: List<T> | null | undefined): number;\n\n        /**\n         * @see _.sum\n         */\n        sum(collection: List<number>|Dictionary<number> | null | undefined): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sum\n         */\n        sum(): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sum\n         **/\n        sum<TValue>(): number;\n\n        /**\n         * @see _.sum\n         */\n        sum(): number;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sum\n         */\n        sum(): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sum\n         */\n        sum<TValue>(): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sum\n         */\n        sum(): LoDashExplicitWrapper<number>;\n    }\n\n    //_.sumBy\n    interface LoDashStatic {\n        /**\n         * This method is like `_.sum` except that it accepts `iteratee` which is\n         * invoked for each element in `array` to generate the value to be summed.\n         * The iteratee is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Math\n         * @param {Array} array The array to iterate over.\n         * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.\n         * @returns {number} Returns the sum.\n         * @example\n         *\n         * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];\n         *\n         * _.sumBy(objects, function(o) { return o.n; });\n         * // => 20\n         *\n         * // using the `_.property` iteratee shorthand\n         * _.sumBy(objects, 'n');\n         * // => 20\n         */\n        sumBy<T>(\n            collection: List<T> | null | undefined,\n            iteratee: ListIterator<T, number>\n        ): number;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(\n            collection: List<{}> | null | undefined,\n            iteratee: string\n        ): number;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(\n            collection: List<number> | null | undefined\n        ): number;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(\n            collection: List<{}> | null | undefined,\n            iteratee: Dictionary<{}>\n        ): number;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sumBy\n         */\n        sumBy(\n            iteratee: ListIterator<T, number>\n        ): number;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: string): number;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: Dictionary<{}>): number;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sumBy\n         */\n        sumBy(\n            iteratee: ListIterator<{}, number>\n        ): number;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: string): number;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: Dictionary<{}>): number;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.sumBy\n         */\n        sumBy(\n            iteratee: ListIterator<T, number>\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: string): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: Dictionary<{}>): LoDashExplicitWrapper<number>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.sumBy\n         */\n        sumBy(\n            iteratee: ListIterator<{}, number>\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: string): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.sumBy\n         */\n        sumBy(iteratee: Dictionary<{}>): LoDashExplicitWrapper<number>;\n    }\n\n    /**********\n     * Number *\n     **********/\n\n    //_.subtract\n    interface LoDashStatic {\n        /**\n         * Subtract two numbers.\n         *\n         * @static\n         * @memberOf _\n         * @category Math\n         * @param {number} minuend The first number in a subtraction.\n         * @param {number} subtrahend The second number in a subtraction.\n         * @returns {number} Returns the difference.\n         * @example\n         *\n         * _.subtract(6, 4);\n         * // => 2\n         */\n        subtract(\n            minuend: number,\n            subtrahend: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.subtract\n         */\n        subtract(\n            subtrahend: number\n        ): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.subtract\n         */\n        subtract(\n            subtrahend: number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.clamp\n    interface LoDashStatic {\n        /**\n         * Clamps `number` within the inclusive `lower` and `upper` bounds.\n         *\n         * @static\n         * @memberOf _\n         * @category Number\n         * @param {number} number The number to clamp.\n         * @param {number} [lower] The lower bound.\n         * @param {number} upper The upper bound.\n         * @returns {number} Returns the clamped number.\n         * @example\n         *\n         * _.clamp(-10, -5, 5);\n         * // => -5\n         *\n         * _.clamp(10, -5, 5);\n         * // => 5\n         */\n        clamp(\n            number: number,\n            lower: number,\n            upper: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.clamp\n         */\n        clamp(\n            lower: number,\n            upper: number\n        ): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.clamp\n         */\n        clamp(\n            lower: number,\n            upper: number\n        ): LoDashExplicitWrapper<number>;\n    }\n\n    //_.inRange\n    interface LoDashStatic {\n        /**\n         * Checks if n is between start and up to but not including, end. If end is not specified it’s set to start\n         * with start then set to 0.\n         *\n         * @param n The number to check.\n         * @param start The start of the range.\n         * @param end The end of the range.\n         * @return Returns true if n is in the range, else false.\n         */\n        inRange(\n            n: number,\n            start: number,\n            end: number\n        ): boolean;\n\n        /**\n         * @see _.inRange\n         */\n        inRange(\n            n: number,\n            end: number\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.inRange\n         */\n        inRange(\n            start: number,\n            end: number\n        ): boolean;\n\n        /**\n         * @see _.inRange\n         */\n        inRange(end: number): boolean;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.inRange\n         */\n        inRange(\n            start: number,\n            end: number\n        ): LoDashExplicitWrapper<boolean>;\n\n        /**\n         * @see _.inRange\n         */\n        inRange(end: number): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.random\n    interface LoDashStatic {\n        /**\n         * Produces a random number between min and max (inclusive). If only one argument is provided a number between\n         * 0 and the given number is returned. If floating is true, or either min or max are floats, a floating-point\n         * number is returned instead of an integer.\n         *\n         * @param min The minimum possible value.\n         * @param max The maximum possible value.\n         * @param floating Specify returning a floating-point number.\n         * @return Returns the random number.\n         */\n        random(\n            min?: number,\n            max?: number,\n            floating?: boolean\n        ): number;\n\n        /**\n         * @see _.random\n         */\n        random(\n            min?: number,\n            floating?: boolean\n        ): number;\n\n        /**\n         * @see _.random\n         */\n        random(floating?: boolean): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.random\n         */\n        random(\n            max?: number,\n            floating?: boolean\n        ): number;\n\n        /**\n         * @see _.random\n         */\n        random(floating?: boolean): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.random\n         */\n        random(\n            max?: number,\n            floating?: boolean\n        ): LoDashExplicitWrapper<number>;\n\n        /**\n         * @see _.random\n         */\n        random(floating?: boolean): LoDashExplicitWrapper<number>;\n    }\n\n    /**********\n     * Object *\n     **********/\n\n    //_.assign\n    interface LoDashStatic {\n        /**\n         * Assigns own enumerable properties of source objects to the destination\n         * object. Source objects are applied from left to right. Subsequent sources\n         * overwrite property assignments of previous sources.\n         *\n         * **Note:** This method mutates `object` and is loosely based on\n         * [`Object.assign`](https://mdn.io/Object/assign).\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The destination object.\n         * @param {...Object} [sources] The source objects.\n         * @returns {Object} Returns `object`.\n         * @example\n         *\n         * function Foo() {\n         *   this.c = 3;\n         * }\n         *\n         * function Bar() {\n         *   this.e = 5;\n         * }\n         *\n         * Foo.prototype.d = 4;\n         * Bar.prototype.f = 6;\n         *\n         * _.assign({ 'a': 1 }, new Foo, new Bar);\n         * // => { 'a': 1, 'c': 3, 'e': 5 }\n         */\n        assign<TObject, TSource>(\n            object: TObject,\n            source: TSource\n        ): TObject & TSource;\n\n        /**\n         * @see assign\n         */\n        assign<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see assign\n         */\n        assign<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see assign\n         */\n        assign<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.assign\n         */\n        assign<TObject>(object: TObject): TObject;\n\n        /**\n         * @see _.assign\n         */\n        assign<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.assign\n         */\n        assign<TSource>(\n            source: TSource\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assign\n         */\n        assign<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assign\n         */\n        assign<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assign\n         */\n        assign<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assign\n         */\n        assign(): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assign\n         */\n        assign<TResult>(...otherArgs: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.assign\n         */\n        assign<TSource>(\n            source: TSource\n        ): LoDashExplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assign\n         */\n        assign<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assign\n         */\n        assign<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assign\n         */\n        assign<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assign\n         */\n        assign(): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assign\n         */\n        assign<TResult>(...otherArgs: any[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashStatic {\n        /**\n         * This method is like `_.assign` except that it accepts `customizer` which\n         * is invoked to produce the assigned values. If `customizer` returns `undefined`\n         * assignment is handled by the method instead. The `customizer` is invoked\n         * with five arguments: (objValue, srcValue, key, object, source).\n         *\n         * **Note:** This method mutates `object`.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The destination object.\n         * @param {...Object} sources The source objects.\n         * @param {Function} [customizer] The function to customize assigned values.\n         * @returns {Object} Returns `object`.\n         * @example\n         *\n         * function customizer(objValue, srcValue) {\n         *   return _.isUndefined(objValue) ? srcValue : objValue;\n         * }\n         *\n         * var defaults = _.partialRight(_.assignWith, customizer);\n         *\n         * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });\n         * // => { 'a': 1, 'b': 2 }\n         */\n        assignWith<TObject, TSource>(\n            object: TObject,\n            source: TSource,\n            customizer: AssignCustomizer\n        ): TObject & TSource;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.assignWith\n         */\n        assignWith<TObject>(object: TObject): TObject;\n\n        /**\n         * @see _.assignWith\n         */\n        assignWith<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.assignWith\n         */\n        assignWith<TSource>(\n            source: TSource,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignWith\n         */\n        assignWith(): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignWith\n         */\n        assignWith<TResult>(...otherArgs: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.assignWith\n         */\n        assignWith<TSource>(\n            source: TSource,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assignWith\n         */\n        assignWith<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignWith\n         */\n        assignWith(): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignWith\n         */\n        assignWith<TResult>(...otherArgs: any[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.assignIn\n    interface LoDashStatic {\n        /**\n         * This method is like `_.assign` except that it iterates over own and\n         * inherited source properties.\n         *\n         * **Note:** This method mutates `object`.\n         *\n         * @static\n         * @memberOf _\n         * @alias extend\n         * @category Object\n         * @param {Object} object The destination object.\n         * @param {...Object} [sources] The source objects.\n         * @returns {Object} Returns `object`.\n         * @example\n         *\n         * function Foo() {\n         *   this.b = 2;\n         * }\n         *\n         * function Bar() {\n         *   this.d = 4;\n         * }\n         *\n         * Foo.prototype.c = 3;\n         * Bar.prototype.e = 5;\n         *\n         * _.assignIn({ 'a': 1 }, new Foo, new Bar);\n         * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }\n         */\n        assignIn<TObject, TSource>(\n            object: TObject,\n            source: TSource\n        ): TObject & TSource;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.assignIn\n         */\n        assignIn<TObject>(object: TObject): TObject;\n\n        /**\n         * @see _.assignIn\n         */\n        assignIn<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.assignIn\n         */\n        assignIn<TSource>(\n            source: TSource\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignIn\n         */\n        assignIn(): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignIn\n         */\n        assignIn<TResult>(...otherArgs: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.assignIn\n         */\n        assignIn<TSource>(\n            source: TSource\n        ): LoDashExplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assignIn\n         */\n        assignIn<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignIn\n         */\n        assignIn(): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignIn\n         */\n        assignIn<TResult>(...otherArgs: any[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.assignInWith\n    type AssignCustomizer = (objectValue: any, sourceValue: any, key?: string, object?: {}, source?: {}) => any;\n\n    interface LoDashStatic {\n        /**\n         * This method is like `_.assignIn` except that it accepts `customizer` which\n         * is invoked to produce the assigned values. If `customizer` returns `undefined`\n         * assignment is handled by the method instead. The `customizer` is invoked\n         * with five arguments: (objValue, srcValue, key, object, source).\n         *\n         * **Note:** This method mutates `object`.\n         *\n         * @static\n         * @memberOf _\n         * @alias extendWith\n         * @category Object\n         * @param {Object} object The destination object.\n         * @param {...Object} sources The source objects.\n         * @param {Function} [customizer] The function to customize assigned values.\n         * @returns {Object} Returns `object`.\n         * @example\n         *\n         * function customizer(objValue, srcValue) {\n         *   return _.isUndefined(objValue) ? srcValue : objValue;\n         * }\n         *\n         * var defaults = _.partialRight(_.assignInWith, customizer);\n         *\n         * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });\n         * // => { 'a': 1, 'b': 2 }\n         */\n        assignInWith<TObject, TSource>(\n            object: TObject,\n            source: TSource,\n            customizer: AssignCustomizer\n        ): TObject & TSource;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith<TObject>(object: TObject): TObject;\n\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith<TSource>(\n            source: TSource,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith(): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith<TResult>(...otherArgs: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith<TSource>(\n            source: TSource,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see assignInWith\n         */\n        assignInWith<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith(): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignInWith\n         */\n        assignInWith<TResult>(...otherArgs: any[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.create\n    interface LoDashStatic {\n        /**\n         * Creates an object that inherits from the given prototype object. If a properties object is provided its own\n         * enumerable properties are assigned to the created object.\n         *\n         * @param prototype The object to inherit from.\n         * @param properties The properties to assign to the object.\n         * @return Returns the new object.\n         */\n        create<T extends Object, U extends Object>(\n            prototype: T,\n            properties?: U\n        ): T & U;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.create\n         */\n        create<U extends Object>(properties?: U): LoDashImplicitObjectWrapper<T & U>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.create\n         */\n        create<U extends Object>(properties?: U): LoDashExplicitObjectWrapper<T & U>;\n    }\n\n    //_.defaults\n    interface LoDashStatic {\n        /**\n         * Assigns own enumerable properties of source object(s) to the destination object for all destination\n         * properties that resolve to undefined. Once a property is set, additional values of the same property are\n         * ignored.\n         *\n         * Note: This method mutates object.\n         *\n         * @param object The destination object.\n         * @param sources The source objects.\n         * @return The destination object.\n         */\n        defaults<TObject, TSource>(\n            object: TObject,\n            source: TSource\n        ): TSource & TObject;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2\n        ): TSource2 & TSource1 & TObject;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): TSource3 & TSource2 & TSource1 & TObject;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): TSource4 & TSource3 & TSource2 & TSource1 & TObject;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TObject>(object: TObject): TObject;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TResult>(\n            object: any,\n            ...sources: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource>(\n            source: TSource\n        ): LoDashImplicitObjectWrapper<TSource & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashImplicitObjectWrapper<TSource2 & TSource1 & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashImplicitObjectWrapper<TSource3 & TSource2 & TSource1 & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashImplicitObjectWrapper<TSource4 & TSource3 & TSource2 & TSource1 & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults(): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TResult>(...sources: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource>(\n            source: TSource\n        ): LoDashExplicitObjectWrapper<TSource & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashExplicitObjectWrapper<TSource2 & TSource1 & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashExplicitObjectWrapper<TSource3 & TSource2 & TSource1 & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashExplicitObjectWrapper<TSource4 & TSource3 & TSource2 & TSource1 & T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults(): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.defaults\n         */\n        defaults<TResult>(...sources: any[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.defaultsDeep\n    interface LoDashStatic {\n        /**\n         * This method is like _.defaults except that it recursively assigns default properties.\n         * @param object The destination object.\n         * @param sources The source objects.\n         * @return Returns object.\n         **/\n        defaultsDeep<T, TResult>(\n            object: T,\n            ...sources: any[]): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.defaultsDeep\n         **/\n        defaultsDeep<TResult>(...sources: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    // _.extend\n    interface LoDashStatic {\n        /**\n         * @see _.assignIn\n         */\n        extend<TObject, TSource>(\n            object: TObject,\n            source: TSource\n        ): TObject & TSource;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TObject>(object: TObject): TObject;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource>(\n            source: TSource\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend(): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TResult>(...otherArgs: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource>(\n            source: TSource\n        ): LoDashExplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend(): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignIn\n         */\n        extend<TResult>(...otherArgs: any[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashStatic {\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TObject, TSource>(\n            object: TObject,\n            source: TSource,\n            customizer: AssignCustomizer\n        ): TObject & TSource;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TObject>(object: TObject): TObject;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource>(\n            source: TSource,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith(): LoDashImplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TResult>(...otherArgs: any[]): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource>(\n            source: TSource,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: AssignCustomizer\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith(): LoDashExplicitObjectWrapper<T>;\n\n        /**\n         * @see _.assignInWith\n         */\n        extendWith<TResult>(...otherArgs: any[]): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.findKey\n    interface LoDashStatic {\n        /**\n         * This method is like _.find except that it returns the key of the first element predicate returns truthy for\n         * instead of the element itself.\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param object The object to search.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the key of the matched element, else undefined.\n         */\n        findKey<TValues, TObject>(\n            object: TObject,\n            predicate?: DictionaryIterator<TValues, boolean>\n        ): string | undefined;\n\n        /**\n         * @see _.findKey\n         */\n        findKey<TObject>(\n            object: TObject,\n            predicate?: ObjectIterator<any, boolean>\n        ): string | undefined;\n\n        /**\n         * @see _.findKey\n         */\n        findKey<TObject>(\n            object: TObject,\n            predicate?: string\n        ): string | undefined;\n\n        /**\n         * @see _.findKey\n         */\n        findKey<TWhere extends Dictionary<any>, TObject>(\n            object: TObject,\n            predicate?: TWhere\n        ): string | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findKey\n         */\n        findKey<TValues>(\n            predicate?: DictionaryIterator<TValues, boolean>\n        ): string | undefined;\n\n        /**\n         * @see _.findKey\n         */\n        findKey(\n            predicate?: ObjectIterator<any, boolean>\n        ): string | undefined;\n\n        /**\n         * @see _.findKey\n         */\n        findKey(\n            predicate?: string\n        ): string | undefined;\n\n        /**\n         * @see _.findKey\n         */\n        findKey<TWhere extends Dictionary<any>>(\n            predicate?: TWhere\n        ): string | undefined;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findKey\n         */\n        findKey<TValues>(\n            predicate?: DictionaryIterator<TValues, boolean>\n        ): LoDashExplicitWrapper<string | undefined>;\n\n        /**\n         * @see _.findKey\n         */\n        findKey(\n            predicate?: ObjectIterator<any, boolean>\n        ): LoDashExplicitWrapper<string | undefined>;\n\n        /**\n         * @see _.findKey\n         */\n        findKey(\n            predicate?: string\n        ): LoDashExplicitWrapper<string | undefined>;\n\n        /**\n         * @see _.findKey\n         */\n        findKey<TWhere extends Dictionary<any>>(\n            predicate?: TWhere\n        ): LoDashExplicitWrapper<string | undefined>;\n    }\n\n    //_.findLastKey\n    interface LoDashStatic {\n        /**\n         * This method is like _.findKey except that it iterates over elements of a collection in the opposite order.\n         *\n         * If a property name is provided for predicate the created _.property style callback returns the property\n         * value of the given element.\n         *\n         * If a value is also provided for thisArg the created _.matchesProperty style callback returns true for\n         * elements that have a matching property value, else false.\n         *\n         * If an object is provided for predicate the created _.matches style callback returns true for elements that\n         * have the properties of the given object, else false.\n         *\n         * @param object The object to search.\n         * @param predicate The function invoked per iteration.\n         * @param thisArg The this binding of predicate.\n         * @return Returns the key of the matched element, else undefined.\n         */\n        findLastKey<TValues, TObject>(\n            object: TObject,\n            predicate?: DictionaryIterator<TValues, boolean>\n        ): string | undefined;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey<TObject>(\n            object: TObject,\n            predicate?: ObjectIterator<any, boolean>\n        ): string | undefined;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey<TObject>(\n            object: TObject,\n            predicate?: string\n        ): string;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey<TWhere extends Dictionary<any>, TObject>(\n            object: TObject,\n            predicate?: TWhere\n        ): string | undefined;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey<TValues>(\n            predicate?: DictionaryIterator<TValues, boolean>\n        ): string;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey(\n            predicate?: ObjectIterator<any, boolean>\n        ): string | undefined;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey(\n            predicate?: string\n        ): string | undefined;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey<TWhere extends Dictionary<any>>(\n            predicate?: TWhere\n        ): string | undefined;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey<TValues>(\n            predicate?: DictionaryIterator<TValues, boolean>\n        ): LoDashExplicitWrapper<string | undefined>;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey(\n            predicate?: ObjectIterator<any, boolean>\n        ): LoDashExplicitWrapper<string | undefined>;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey(\n            predicate?: string\n        ): LoDashExplicitWrapper<string | undefined>;\n\n        /**\n         * @see _.findLastKey\n         */\n        findLastKey<TWhere extends Dictionary<any>>(\n            predicate?: TWhere\n        ): LoDashExplicitWrapper<string | undefined>;\n    }\n\n    //_.forIn\n    interface LoDashStatic {\n        /**\n         * Iterates over own and inherited enumerable properties of an object invoking iteratee for each property. The\n         * iteratee is bound to thisArg and invoked with three arguments: (value, key, object). Iteratee functions may\n         * exit iteration early by explicitly returning false.\n         *\n         * @param object The object to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns object.\n         */\n        forIn<T>(\n            object: Dictionary<T>,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.forIn\n         */\n        forIn<T>(\n            object: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T> | null | undefined;\n\n        /**\n         * @see _.forIn\n         */\n        forIn<T extends {} | null | undefined>(\n            object: T,\n            iteratee?: ObjectIterator<any, any>\n        ): T;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forIn\n         */\n        forIn<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forIn\n         */\n        forIn<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.forInRight\n    interface LoDashStatic {\n        /**\n         * This method is like _.forIn except that it iterates over properties of object in the opposite order.\n         *\n         * @param object The object to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns object.\n         */\n        forInRight<T>(\n            object: Dictionary<T>,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.forInRight\n         */\n        forInRight<T>(\n            object: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T> | null | undefined;\n\n        /**\n         * @see _.forInRight\n         */\n        forInRight<T extends {} | null | undefined>(\n            object: T,\n            iteratee?: ObjectIterator<any, any>\n        ): T;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forInRight\n         */\n        forInRight<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forInRight\n         */\n        forInRight<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.forOwn\n    interface LoDashStatic {\n        /**\n         * Iterates over own enumerable properties of an object invoking iteratee for each property. The iteratee is\n         * bound to thisArg and invoked with three arguments: (value, key, object). Iteratee functions may exit\n         * iteration early by explicitly returning false.\n         *\n         * @param object The object to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns object.\n         */\n        forOwn<T>(\n            object: Dictionary<T>,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.forOwn\n         */\n        forOwn<T>(\n            object: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T> | null | undefined;\n\n        /**\n         * @see _.forOwn\n         */\n        forOwn<T extends {} | null | undefined>(\n            object: T,\n            iteratee?: ObjectIterator<any, any>\n        ): T;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forOwn\n         */\n        forOwn<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forOwn\n         */\n        forOwn<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.forOwnRight\n    interface LoDashStatic {\n        /**\n         * This method is like _.forOwn except that it iterates over properties of object in the opposite order.\n         *\n         * @param object The object to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns object.\n         */\n        forOwnRight<T>(\n            object: Dictionary<T>,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.forOwnRight\n         */\n        forOwnRight<T>(\n            object: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, any>\n        ): Dictionary<T> | null | undefined;\n\n        /**\n         * @see _.forOwnRight\n         */\n        forOwnRight<T extends {} | null | undefined>(\n            object: T,\n            iteratee?: ObjectIterator<any, any>\n        ): T;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forOwnRight\n         */\n        forOwnRight<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.forOwnRight\n         */\n        forOwnRight<TValue>(\n            iteratee?: DictionaryIterator<TValue, any>\n        ): TWrapper;\n    }\n\n    //_.functions\n    interface LoDashStatic {\n        /**\n         * Creates an array of function property names from own enumerable properties\n         * of `object`.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The object to inspect.\n         * @returns {Array} Returns the new array of property names.\n         * @example\n         *\n         * function Foo() {\n         *   this.a = _.constant('a');\n         *   this.b = _.constant('b');\n         * }\n         *\n         * Foo.prototype.c = _.constant('c');\n         *\n         * _.functions(new Foo);\n         * // => ['a', 'b']\n         */\n        functions<T extends {}>(object: any): string[];\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.functions\n         */\n        functions(): _.LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.functions\n         */\n        functions(): _.LoDashExplicitArrayWrapper<string>;\n    }\n\n    //_.functionsIn\n    interface LoDashStatic {\n        /**\n         * Creates an array of function property names from own and inherited\n         * enumerable properties of `object`.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The object to inspect.\n         * @returns {Array} Returns the new array of property names.\n         * @example\n         *\n         * function Foo() {\n         *   this.a = _.constant('a');\n         *   this.b = _.constant('b');\n         * }\n         *\n         * Foo.prototype.c = _.constant('c');\n         *\n         * _.functionsIn(new Foo);\n         * // => ['a', 'b', 'c']\n         */\n        functionsIn<T extends {}>(object: any): string[];\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.functionsIn\n         */\n        functionsIn(): _.LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.functionsIn\n         */\n        functionsIn(): _.LoDashExplicitArrayWrapper<string>;\n    }\n\n    //_.get\n    interface LoDashStatic {\n        /**\n         * Gets the property value at path of object. If the resolved value is undefined the defaultValue is used\n         * in its place.\n         *\n         * @param object The object to query.\n         * @param path The path of the property to get.\n         * @param defaultValue The value returned if the resolved value is undefined.\n         * @return Returns the resolved value.\n         */\n        get<TObject, TResult>(\n            object: TObject,\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult\n        ): TResult;\n\n        /**\n         * @see _.get\n         */\n        get<TResult>(\n            object: any,\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult\n        ): TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.get\n         */\n        get<TResult>(\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult\n        ): TResult;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.get\n         */\n        get<TResult>(\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.get\n         */\n        get<TResult>(\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult\n        ): TResult;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.get\n         */\n        get<TResultWrapper>(\n            path: Many<StringRepresentable>,\n            defaultValue?: any\n        ): TResultWrapper;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.get\n         */\n        get<TResultWrapper>(\n            path: Many<StringRepresentable>,\n            defaultValue?: any\n        ): TResultWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.get\n         */\n        get<TResultWrapper>(\n            path: Many<StringRepresentable>,\n            defaultValue?: any\n        ): TResultWrapper;\n    }\n\n    //_.has\n    interface LoDashStatic {\n        /**\n         * Checks if `path` is a direct property of `object`.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The object to query.\n         * @param {Array|string} path The path to check.\n         * @returns {boolean} Returns `true` if `path` exists, else `false`.\n         * @example\n         *\n         * var object = { 'a': { 'b': { 'c': 3 } } };\n         * var other = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });\n         *\n         * _.has(object, 'a');\n         * // => true\n         *\n         * _.has(object, 'a.b.c');\n         * // => true\n         *\n         * _.has(object, ['a', 'b', 'c']);\n         * // => true\n         *\n         * _.has(other, 'a');\n         * // => false\n         */\n        has<T extends {}>(\n            object: T,\n            path: Many<StringRepresentable>\n        ): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.has\n         */\n        has(path: Many<StringRepresentable>): boolean;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.has\n         */\n        has(path: Many<StringRepresentable>): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.hasIn\n    interface LoDashStatic {\n        /**\n         * Checks if `path` is a direct or inherited property of `object`.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The object to query.\n         * @param {Array|string} path The path to check.\n         * @returns {boolean} Returns `true` if `path` exists, else `false`.\n         * @example\n         *\n         * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });\n         *\n         * _.hasIn(object, 'a');\n         * // => true\n         *\n         * _.hasIn(object, 'a.b.c');\n         * // => true\n         *\n         * _.hasIn(object, ['a', 'b', 'c']);\n         * // => true\n         *\n         * _.hasIn(object, 'b');\n         * // => false\n         */\n        hasIn<T extends {}>(\n            object: T,\n            path: Many<StringRepresentable>\n        ): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.hasIn\n         */\n        hasIn(path: Many<StringRepresentable>): boolean;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.hasIn\n         */\n        hasIn(path: Many<StringRepresentable>): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.invert\n    interface LoDashStatic {\n        /**\n         * Creates an object composed of the inverted keys and values of object. If object contains duplicate values,\n         * subsequent values overwrite property assignments of previous values unless multiValue is true.\n         *\n         * @param object The object to invert.\n         * @param multiValue Allow multiple values per key.\n         * @return Returns the new inverted object.\n         */\n        invert<T extends {}, TResult extends {}>(\n            object: T,\n            multiValue?: boolean\n        ): TResult;\n\n        /**\n         * @see _.invert\n         */\n        invert<TResult extends {}>(\n            object: Object,\n            multiValue?: boolean\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.invert\n         */\n        invert<TResult extends {}>(multiValue?: boolean): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.invert\n         */\n        invert<TResult extends {}>(multiValue?: boolean): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.inverBy\n    type InvertByIterator<T> = (value: T) => any;\n\n    interface LoDashStatic {\n        /**\n         * This method is like _.invert except that the inverted object is generated from the results of running each\n         * element of object through iteratee. The corresponding inverted value of each inverted key is an array of\n         * keys responsible for generating the inverted value. The iteratee is invoked with one argument: (value).\n         *\n         * @param object The object to invert.\n         * @param interatee The iteratee invoked per element.\n         * @return Returns the new inverted object.\n         */\n        invertBy(\n            object: Object,\n            interatee?: InvertByIterator<any>|string\n        ): Dictionary<string[]>;\n\n        /**\n         * @see _.invertBy\n         */\n        invertBy<T>(\n            object: _.Dictionary<T>|_.NumericDictionary<T>,\n            interatee?: InvertByIterator<T>|string\n        ): Dictionary<string[]>;\n\n        /**\n         * @see _.invertBy\n         */\n        invertBy<W>(\n            object: Object,\n            interatee?: W\n        ): Dictionary<string[]>;\n\n        /**\n         * @see _.invertBy\n         */\n        invertBy<T, W>(\n            object: _.Dictionary<T>,\n            interatee?: W\n        ): Dictionary<string[]>;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.invertBy\n         */\n        invertBy(\n            interatee?: InvertByIterator<any>\n        ): LoDashImplicitObjectWrapper<Dictionary<string[]>>;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.invertBy\n         */\n        invertBy(\n            interatee?: InvertByIterator<T>|string\n        ): LoDashImplicitObjectWrapper<Dictionary<string[]>>;\n\n        /**\n         * @see _.invertBy\n         */\n        invertBy<W>(\n            interatee?: W\n        ): LoDashImplicitObjectWrapper<Dictionary<string[]>>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.invertBy\n         */\n        invertBy(\n            interatee?: InvertByIterator<any>|string\n        ): LoDashImplicitObjectWrapper<Dictionary<string[]>>;\n\n        /**\n         * @see _.invertBy\n         */\n        invertBy<W>(\n            interatee?: W\n        ): LoDashImplicitObjectWrapper<Dictionary<string[]>>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.invertBy\n         */\n        invertBy(\n            interatee?: InvertByIterator<any>\n        ): LoDashExplicitObjectWrapper<Dictionary<string[]>>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.invertBy\n         */\n        invertBy(\n            interatee?: InvertByIterator<T>|string\n        ): LoDashExplicitObjectWrapper<Dictionary<string[]>>;\n\n        /**\n         * @see _.invertBy\n         */\n        invertBy<W>(\n            interatee?: W\n        ): LoDashExplicitObjectWrapper<Dictionary<string[]>>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.invertBy\n         */\n        invertBy(\n            interatee?: InvertByIterator<any>|string\n        ): LoDashExplicitObjectWrapper<Dictionary<string[]>>;\n\n        /**\n         * @see _.invertBy\n         */\n        invertBy<W>(\n            interatee?: W\n        ): LoDashExplicitObjectWrapper<Dictionary<string[]>>;\n    }\n\n    //_.keys\n    interface LoDashStatic {\n        /**\n         * Creates an array of the own enumerable property names of object.\n         *\n         * Note: Non-object values are coerced to objects. See the ES spec for more details.\n         *\n         * @param object The object to query.\n         * @return Returns the array of property names.\n         */\n        keys(object?: any): string[];\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.keys\n         */\n        keys(): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.keys\n         */\n        keys(): LoDashExplicitArrayWrapper<string>;\n    }\n\n    //_.keysIn\n    interface LoDashStatic {\n        /**\n         * Creates an array of the own and inherited enumerable property names of object.\n         *\n         * Note: Non-object values are coerced to objects.\n         *\n         * @param object The object to query.\n         * @return An array of property names.\n         */\n        keysIn(object?: any): string[];\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.keysIn\n         */\n        keysIn(): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.keysIn\n         */\n        keysIn(): LoDashExplicitArrayWrapper<string>;\n    }\n\n    //_.mapKeys\n    interface LoDashStatic {\n        /**\n         * The opposite of _.mapValues; this method creates an object with the same values as object and keys generated\n         * by running each own enumerable property of object through iteratee.\n         *\n         * @param object The object to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns the new mapped object.\n         */\n        mapKeys<T, TKey>(\n            object: List<T> | null | undefined,\n            iteratee?: ListIterator<T, TKey>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<T, TKey>(\n            object: Dictionary<T> | null | undefined,\n            iteratee?: DictionaryIterator<T, TKey>\n        ): Dictionary<T>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<T, TObject extends {}>(\n            object: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: TObject\n        ): Dictionary<T>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<T>(\n            object: List<T>|Dictionary<T> | null | undefined,\n            iteratee?: string\n        ): Dictionary<T>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TKey>(\n            iteratee?: ListIterator<T, TKey>\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TObject extends {}>(\n            iteratee?: TObject\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TResult, TKey>(\n            iteratee?: ListIterator<TResult, TKey>|DictionaryIterator<TResult, TKey>\n        ): LoDashImplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TResult, TObject extends {}>(\n            iteratee?: TObject\n        ): LoDashImplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TResult>(\n            iteratee?: string\n        ): LoDashImplicitObjectWrapper<Dictionary<TResult>>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TKey>(\n            iteratee?: ListIterator<T, TKey>\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TObject extends {}>(\n            iteratee?: TObject\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<T>>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TResult, TKey>(\n            iteratee?: ListIterator<TResult, TKey>|DictionaryIterator<TResult, TKey>\n        ): LoDashExplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TResult, TObject extends {}>(\n            iteratee?: TObject\n        ): LoDashExplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapKeys\n         */\n        mapKeys<TResult>(\n            iteratee?: string\n        ): LoDashExplicitObjectWrapper<Dictionary<TResult>>;\n    }\n\n    //_.mapValues\n    interface LoDashStatic {\n        /**\n        * Creates an object with the same keys as object and values generated by running each own\n        * enumerable property of object through iteratee. The iteratee function is bound to thisArg\n        * and invoked with three arguments: (value, key, object).\n        *\n        * If a property name is provided iteratee the created \"_.property\" style callback returns\n        * the property value of the given element.\n        *\n        * If a value is also provided for thisArg the creted \"_.matchesProperty\" style callback returns\n        * true for elements that have a matching property value, else false;.\n        *\n        * If an object is provided for iteratee the created \"_.matches\" style callback returns true\n        * for elements that have the properties of the given object, else false.\n        *\n        * @param {Object} object The object to iterate over.\n        * @param {Function|Object|string} [iteratee=_.identity]  The function invoked per iteration.\n        * @param {Object} [thisArg] The `this` binding of `iteratee`.\n        * @return {Object} Returns the new mapped object.\n        */\n        mapValues<T, TResult>(obj: Dictionary<T> | null | undefined, callback: ObjectIterator<T, TResult>): Dictionary<TResult>;\n        mapValues<T>(obj: Dictionary<T> | null | undefined, where: Dictionary<T>): Dictionary<boolean>;\n        mapValues<T, TMapped>(obj: T | null | undefined, pluck: string): TMapped;\n        mapValues<T>(obj: T | null | undefined, callback: ObjectIterator<any, any>): T;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.mapValues\n         * TValue is the type of the property values of T.\n         * TResult is the type output by the ObjectIterator function\n         */\n        mapValues<TValue, TResult>(callback: ObjectIterator<TValue, TResult>): LoDashImplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapValues\n         * TResult is the type of the property specified by pluck.\n         * T should be a Dictionary<Dictionary<TResult>>\n         */\n        mapValues<TResult>(pluck: string): LoDashImplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapValues\n         * TResult is the type of the properties of each object in the values of T\n         * T should be a Dictionary<Dictionary<TResult>>\n         */\n        mapValues<TResult>(where: Dictionary<TResult>): LoDashImplicitArrayWrapper<boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.mapValues\n         * TValue is the type of the property values of T.\n         * TResult is the type output by the ObjectIterator function\n         */\n        mapValues<TValue, TResult>(callback: ObjectIterator<TValue, TResult>): LoDashExplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapValues\n         * TResult is the type of the property specified by pluck.\n         * T should be a Dictionary<Dictionary<TResult>>\n         */\n        mapValues<TResult>(pluck: string): LoDashExplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.mapValues\n         * TResult is the type of the properties of each object in the values of T\n         * T should be a Dictionary<Dictionary<TResult>>\n         */\n        mapValues<TResult>(where: Dictionary<TResult>): LoDashExplicitObjectWrapper<boolean>;\n    }\n\n    //_.merge\n    interface LoDashStatic {\n        /**\n         * Recursively merges own and inherited enumerable properties of source\n         * objects into the destination object, skipping source properties that resolve\n         * to `undefined`. Array and plain object properties are merged recursively.\n         * Other objects and value types are overridden by assignment. Source objects\n         * are applied from left to right. Subsequent sources overwrite property\n         * assignments of previous sources.\n         *\n         * **Note:** This method mutates `object`.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The destination object.\n         * @param {...Object} [sources] The source objects.\n         * @returns {Object} Returns `object`.\n         * @example\n         *\n         * var users = {\n         *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]\n         * };\n         *\n         * var ages = {\n         *   'data': [{ 'age': 36 }, { 'age': 40 }]\n         * };\n         *\n         * _.merge(users, ages);\n         * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }\n         */\n        merge<TObject, TSource>(\n            object: TObject,\n            source: TSource\n        ): TObject & TSource;\n\n        /**\n         * @see _.merge\n         */\n        merge<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see _.merge\n         */\n        merge<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see _.merge\n         */\n        merge<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.merge\n         */\n        merge<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.merge\n         */\n        merge<TSource>(\n            source: TSource\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TResult>(\n            ...otherArgs: any[]\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.merge\n         */\n        merge<TSource>(\n            source: TSource\n        ): LoDashExplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TSource1, TSource2, TSource3, TSource4>(\n        ): LoDashExplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.merge\n         */\n        merge<TResult>(\n            ...otherArgs: any[]\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.mergeWith\n    type MergeWithCustomizer = (value: any, srcValue: any, key?: string, object?: Object, source?: Object) => any;\n\n    interface LoDashStatic {\n        /**\n         * This method is like `_.merge` except that it accepts `customizer` which\n         * is invoked to produce the merged values of the destination and source\n         * properties. If `customizer` returns `undefined` merging is handled by the\n         * method instead. The `customizer` is invoked with seven arguments:\n         * (objValue, srcValue, key, object, source, stack).\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The destination object.\n         * @param {...Object} sources The source objects.\n         * @param {Function} customizer The function to customize assigned values.\n         * @returns {Object} Returns `object`.\n         * @example\n         *\n         * function customizer(objValue, srcValue) {\n         *   if (_.isArray(objValue)) {\n         *     return objValue.concat(srcValue);\n         *   }\n         * }\n         *\n         * var object = {\n         *   'fruits': ['apple'],\n         *   'vegetables': ['beet']\n         * };\n         *\n         * var other = {\n         *   'fruits': ['banana'],\n         *   'vegetables': ['carrot']\n         * };\n         *\n         * _.merge(object, other, customizer);\n         * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }\n         */\n        mergeWith<TObject, TSource>(\n            object: TObject,\n            source: TSource,\n            customizer: MergeWithCustomizer\n        ): TObject & TSource;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TObject, TSource1, TSource2>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            customizer: MergeWithCustomizer\n        ): TObject & TSource1 & TSource2;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TObject, TSource1, TSource2, TSource3>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: MergeWithCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TObject, TSource1, TSource2, TSource3, TSource4>(\n            object: TObject,\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: MergeWithCustomizer\n        ): TObject & TSource1 & TSource2 & TSource3 & TSource4;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TResult>(\n            object: any,\n            ...otherArgs: any[]\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TSource>(\n            source: TSource,\n            customizer: MergeWithCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource>;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TSource1, TSource2>(\n            source1: TSource1,\n            source2: TSource2,\n            customizer: MergeWithCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2>;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TSource1, TSource2, TSource3>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            customizer: MergeWithCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3>;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TSource1, TSource2, TSource3, TSource4>(\n            source1: TSource1,\n            source2: TSource2,\n            source3: TSource3,\n            source4: TSource4,\n            customizer: MergeWithCustomizer\n        ): LoDashImplicitObjectWrapper<T & TSource1 & TSource2 & TSource3 & TSource4>;\n\n        /**\n         * @see _.mergeWith\n         */\n        mergeWith<TResult>(\n            ...otherArgs: any[]\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    //_.omit\n    interface LoDashStatic {\n        /**\n         * The opposite of `_.pick`; this method creates an object composed of the\n         * own and inherited enumerable properties of `object` that are not omitted.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The source object.\n         * @param {...(string|string[])} [props] The property names to omit, specified\n         *  individually or in arrays..\n         * @returns {Object} Returns the new object.\n         * @example\n         *\n         * var object = { 'a': 1, 'b': '2', 'c': 3 };\n         *\n         * _.omit(object, ['a', 'c']);\n         * // => { 'b': '2' }\n         */\n\n        omit<TResult extends {}, T extends {}>(\n            object: T | null | undefined,\n            ...predicate: Array<Many<StringRepresentable>>\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.omit\n         */\n        omit<TResult extends {}>(\n            ...predicate: Array<Many<StringRepresentable>>\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.omit\n         */\n        omit<TResult extends {}>(\n            ...predicate: Array<Many<StringRepresentable>>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.omitBy\n    interface LoDashStatic {\n        /**\n         * The opposite of `_.pickBy`; this method creates an object composed of the\n         * own and inherited enumerable properties of `object` that `predicate`\n         * doesn't return truthy for.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The source object.\n         * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.\n         * @returns {Object} Returns the new object.\n         * @example\n         *\n         * var object = { 'a': 1, 'b': '2', 'c': 3 };\n         *\n         * _.omitBy(object, _.isNumber);\n         * // => { 'b': '2' }\n         */\n        omitBy<TResult extends {}, T extends {}>(\n            object: T | null | undefined,\n            predicate: ObjectIterator<any, boolean>\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.omitBy\n         */\n        omitBy<TResult extends {}>(\n            predicate: ObjectIterator<any, boolean>\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.omitBy\n         */\n        omitBy<TResult extends {}>(\n            predicate: ObjectIterator<any, boolean>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.pick\n    interface LoDashStatic {\n        /**\n         * Creates an object composed of the picked `object` properties.\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The source object.\n         * @param {...(string|string[])} [props] The property names to pick, specified\n         *  individually or in arrays.\n         * @returns {Object} Returns the new object.\n         * @example\n         *\n         * var object = { 'a': 1, 'b': '2', 'c': 3 };\n         *\n         * _.pick(object, ['a', 'c']);\n         * // => { 'a': 1, 'c': 3 }\n         */\n        pick<TResult extends {}, T extends {}>(\n            object: T | null | undefined,\n            ...predicate: Array<Many<StringRepresentable>>\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.pick\n         */\n        pick<TResult extends {}>(\n            ...predicate: Array<Many<StringRepresentable>>\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.pick\n         */\n        pick<TResult extends {}>(\n            ...predicate: Array<Many<StringRepresentable>>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.pickBy\n    interface LoDashStatic {\n        /**\n         * Creates an object composed of the `object` properties `predicate` returns\n         * truthy for. The predicate is invoked with one argument: (value).\n         *\n         * @static\n         * @memberOf _\n         * @category Object\n         * @param {Object} object The source object.\n         * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.\n         * @returns {Object} Returns the new object.\n         * @example\n         *\n         * var object = { 'a': 1, 'b': '2', 'c': 3 };\n         *\n         * _.pickBy(object, _.isNumber);\n         * // => { 'a': 1, 'c': 3 }\n         */\n        pickBy<TResult extends {}, T extends {}>(\n            object: T | null | undefined,\n            predicate?: ObjectIterator<any, boolean>\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.pickBy\n         */\n        pickBy<TResult extends {}>(\n            predicate?: ObjectIterator<any, boolean>\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.pickBy\n         */\n        pickBy<TResult extends {}>(\n            predicate?: ObjectIterator<any, boolean>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.result\n    interface LoDashStatic {\n        /**\n         * This method is like _.get except that if the resolved value is a function it’s invoked with the this binding\n         * of its parent object and its result is returned.\n         *\n         * @param object The object to query.\n         * @param path The path of the property to resolve.\n         * @param defaultValue The value returned if the resolved value is undefined.\n         * @return Returns the resolved value.\n         */\n        result<TObject, TResult>(\n            object: TObject,\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult|((...args: any[]) => TResult)\n        ): TResult;\n\n        /**\n         * @see _.result\n         */\n        result<TResult>(\n            object: any,\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult|((...args: any[]) => TResult)\n        ): TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.result\n         */\n        result<TResult>(\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult|((...args: any[]) => TResult)\n        ): TResult;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.result\n         */\n        result<TResult>(\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult|((...args: any[]) => TResult)\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.result\n         */\n        result<TResult>(\n            path: Many<StringRepresentable>,\n            defaultValue?: TResult|((...args: any[]) => TResult)\n        ): TResult;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.result\n         */\n        result<TResultWrapper>(\n            path: Many<StringRepresentable>,\n            defaultValue?: any\n        ): TResultWrapper;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.result\n         */\n        result<TResultWrapper>(\n            path: Many<StringRepresentable>,\n            defaultValue?: any\n        ): TResultWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.result\n         */\n        result<TResultWrapper>(\n            path: Many<StringRepresentable>,\n            defaultValue?: any\n        ): TResultWrapper;\n    }\n\n    //_.set\n    interface LoDashStatic {\n        /**\n         * Sets the value at path of object. If a portion of path doesn’t exist it’s created. Arrays are created for\n         * missing index properties while objects are created for all other missing properties. Use _.setWith to\n         * customize path creation.\n         *\n         * @param object The object to modify.\n         * @param path The path of the property to set.\n         * @param value The value to set.\n         * @return Returns object.\n         */\n        set<TResult>(\n            object: Object,\n            path: Many<StringRepresentable>,\n            value: any\n        ): TResult;\n\n        /**\n         * @see _.set\n         */\n        set<V, TResult>(\n            object: Object,\n            path: Many<StringRepresentable>,\n            value: V\n        ): TResult;\n\n        /**\n         * @see _.set\n         */\n        set<O, V, TResult>(\n            object: O,\n            path: Many<StringRepresentable>,\n            value: V\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.set\n         */\n        set<TResult>(\n            path: Many<StringRepresentable>,\n            value: any\n        ): LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.set\n         */\n        set<V, TResult>(\n            path: Many<StringRepresentable>,\n            value: V\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.set\n         */\n        set<TResult>(\n            path: Many<StringRepresentable>,\n            value: any\n        ): LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.set\n         */\n        set<V, TResult>(\n            path: Many<StringRepresentable>,\n            value: V\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.setWith\n    type SetWithCustomizer<T> = (nsValue: any, key: string, nsObject: T) => any;\n\n    interface LoDashStatic {\n        /**\n         * This method is like _.set except that it accepts customizer which is invoked to produce the objects of\n         * path. If customizer returns undefined path creation is handled by the method instead. The customizer is\n         * invoked with three arguments: (nsValue, key, nsObject).\n         *\n         * @param object The object to modify.\n         * @param path The path of the property to set.\n         * @param value The value to set.\n         * @parem customizer The function to customize assigned values.\n         * @return Returns object.\n         */\n        setWith<TResult>(\n            object: Object,\n            path: Many<StringRepresentable>,\n            value: any,\n            customizer?: SetWithCustomizer<Object>\n        ): TResult;\n\n        /**\n         * @see _.setWith\n         */\n        setWith<V, TResult>(\n            object: Object,\n            path: Many<StringRepresentable>,\n            value: V,\n            customizer?: SetWithCustomizer<Object>\n        ): TResult;\n\n        /**\n         * @see _.setWith\n         */\n        setWith<O, V, TResult>(\n            object: O,\n            path: Many<StringRepresentable>,\n            value: V,\n            customizer?: SetWithCustomizer<O>\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.setWith\n         */\n        setWith<TResult>(\n            path: Many<StringRepresentable>,\n            value: any,\n            customizer?: SetWithCustomizer<T>\n        ): LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.setWith\n         */\n        setWith<V, TResult>(\n            path: Many<StringRepresentable>,\n            value: V,\n            customizer?: SetWithCustomizer<T>\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.setWith\n         */\n        setWith<TResult>(\n            path: Many<StringRepresentable>,\n            value: any,\n            customizer?: SetWithCustomizer<T>\n        ): LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.setWith\n         */\n        setWith<V, TResult>(\n            path: Many<StringRepresentable>,\n            value: V,\n            customizer?: SetWithCustomizer<T>\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.toPairs\n    interface LoDashStatic {\n        /**\n         * Creates an array of own enumerable key-value pairs for object.\n         *\n         * @param object The object to query.\n         * @return Returns the new array of key-value pairs.\n         */\n        toPairs<T extends {}>(object?: T): [string, any][];\n\n        toPairs<T extends {}, TResult>(object?: T): [string, TResult][];\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.toPairs\n         */\n        toPairs<TResult>(): LoDashImplicitArrayWrapper<[string, TResult]>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.toPairs\n         */\n        toPairs<TResult>(): LoDashExplicitArrayWrapper<[string, TResult]>;\n    }\n\n    //_.toPairsIn\n    interface LoDashStatic {\n        /**\n         * Creates an array of own and inherited enumerable key-value pairs for object.\n         *\n         * @param object The object to query.\n         * @return Returns the new array of key-value pairs.\n         */\n        toPairsIn<T extends {}>(object?: T): [string, any][];\n\n        toPairsIn<T extends {}, TResult>(object?: T): [string, TResult][];\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.toPairsIn\n         */\n        toPairsIn<TResult>(): LoDashImplicitArrayWrapper<[string, TResult]>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.toPairsIn\n         */\n        toPairsIn<TResult>(): LoDashExplicitArrayWrapper<[string, TResult]>;\n    }\n\n    //_.transform\n    interface LoDashStatic {\n        /**\n         * An alternative to _.reduce; this method transforms object to a new accumulator object which is the result of\n         * running each of its own enumerable properties through iteratee, with each invocation potentially mutating\n         * the accumulator object. The iteratee is bound to thisArg and invoked with four arguments: (accumulator,\n         * value, key, object). Iteratee functions may exit iteration early by explicitly returning false.\n         *\n         * @param object The object to iterate over.\n         * @param iteratee The function invoked per iteration.\n         * @param accumulator The custom accumulator value.\n         * @param thisArg The this binding of iteratee.\n         * @return Returns the accumulated value.\n         */\n        transform<T, TResult>(\n            object: T[],\n            iteratee?: MemoVoidArrayIterator<T, TResult[]>,\n            accumulator?: TResult[]\n        ): TResult[];\n\n        /**\n         * @see _.transform\n         */\n        transform<T, TResult>(\n            object: T[],\n            iteratee?: MemoVoidArrayIterator<T, Dictionary<TResult>>,\n            accumulator?: Dictionary<TResult>\n        ): Dictionary<TResult>;\n\n        /**\n         * @see _.transform\n         */\n        transform<T, TResult>(\n            object: Dictionary<T>,\n            iteratee?: MemoVoidDictionaryIterator<T, Dictionary<TResult>>,\n            accumulator?: Dictionary<TResult>\n        ): Dictionary<TResult>;\n\n        /**\n         * @see _.transform\n         */\n        transform<T, TResult>(\n            object: Dictionary<T>,\n            iteratee?: MemoVoidDictionaryIterator<T, TResult[]>,\n            accumulator?: TResult[]\n        ): TResult[];\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.transform\n         */\n        transform<TResult>(\n            iteratee?: MemoVoidArrayIterator<T, TResult[]>,\n            accumulator?: TResult[]\n        ): LoDashImplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.transform\n         */\n        transform<TResult>(\n            iteratee?: MemoVoidArrayIterator<T, Dictionary<TResult>>,\n            accumulator?: Dictionary<TResult>\n        ): LoDashImplicitObjectWrapper<Dictionary<TResult>>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.transform\n         */\n        transform<T, TResult>(\n            iteratee?: MemoVoidDictionaryIterator<T, Dictionary<TResult>>,\n            accumulator?: Dictionary<TResult>\n        ): LoDashImplicitObjectWrapper<Dictionary<TResult>>;\n\n        /**\n         * @see _.transform\n         */\n        transform<T, TResult>(\n            iteratee?: MemoVoidDictionaryIterator<T, TResult[]>,\n            accumulator?: TResult[]\n        ): LoDashImplicitArrayWrapper<TResult>;\n    }\n\n    //_.unset\n    interface LoDashStatic {\n        /**\n         * Removes the property at path of object.\n         *\n         * Note: This method mutates object.\n         *\n         * @param object The object to modify.\n         * @param path The path of the property to unset.\n         * @return Returns true if the property is deleted, else false.\n         */\n        unset<T>(\n            object: T,\n            path: Many<StringRepresentable>\n        ): boolean;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.unset\n         */\n        unset(path: Many<StringRepresentable>): LoDashImplicitWrapper<boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.unset\n         */\n        unset(path: Many<StringRepresentable>): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.update\n    interface LoDashStatic {\n        /**\n         * This method is like _.set except that accepts updater to produce the value to set. Use _.updateWith to\n         * customize path creation. The updater is invoked with one argument: (value).\n         *\n         * @param object The object to modify.\n         * @param path The path of the property to set.\n         * @param updater The function to produce the updated value.\n         * @return Returns object.\n         */\n        update<TResult>(\n            object: Object,\n            path: Many<StringRepresentable>,\n            updater: Function\n        ): TResult;\n\n        /**\n         * @see _.update\n         */\n        update<U extends Function, TResult>(\n            object: Object,\n            path: Many<StringRepresentable>,\n            updater: U\n        ): TResult;\n\n        /**\n         * @see _.update\n         */\n        update<O extends {}, TResult>(\n            object: O,\n            path: Many<StringRepresentable>,\n            updater: Function\n        ): TResult;\n\n        /**\n         * @see _.update\n         */\n        update<O, U extends Function, TResult>(\n            object: O,\n            path: Many<StringRepresentable>,\n            updater: U\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.update\n         */\n        update<TResult>(\n            path: Many<StringRepresentable>,\n            updater: any\n        ): LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.update\n         */\n        update<U extends Function, TResult>(\n            path: Many<StringRepresentable>,\n            updater: U\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.update\n         */\n        update<TResult>(\n            path: Many<StringRepresentable>,\n            updater: any\n        ): LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.update\n         */\n        update<U extends Function, TResult>(\n            path: Many<StringRepresentable>,\n            updater: U\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.values\n    interface LoDashStatic {\n        /**\n         * Creates an array of the own enumerable property values of object.\n         *\n         * @param object The object to query.\n         * @return Returns an array of property values.\n         */\n        values<T>(object?: Dictionary<T>|NumericDictionary<T>|List<T> | null | undefined): T[];\n\n        /**\n         * @see _.values\n         */\n        values<T>(object?: any): T[];\n    }\n\n    interface LoDashImplicitStringWrapper {\n        /**\n         * @see _.values\n         */\n        values(): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.values\n         */\n        values(): LoDashImplicitArrayWrapper<any>;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.values\n         */\n        values(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.values\n         */\n        values<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.values\n         */\n        values<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.values\n         */\n        values(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.values\n         */\n        values<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    //_.valuesIn\n    interface LoDashStatic {\n        /**\n         * Creates an array of the own and inherited enumerable property values of object.\n         *\n         * @param object The object to query.\n         * @return Returns the array of property values.\n         */\n        valuesIn<T>(object?: Dictionary<T>): T[];\n\n        /**\n         * @see _.valuesIn\n         */\n        valuesIn<T>(object?: any): T[];\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.valuesIn\n         */\n        valuesIn<T>(): LoDashImplicitArrayWrapper<T>;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.valuesIn\n         */\n        valuesIn<T>(): LoDashExplicitArrayWrapper<T>;\n    }\n\n    /**********\n     * String *\n     **********/\n\n    //_.camelCase\n    interface LoDashStatic {\n        /**\n         * Converts string to camel case.\n         *\n         * @param string The string to convert.\n         * @return Returns the camel cased string.\n         */\n        camelCase(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.camelCase\n         */\n        camelCase(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.camelCase\n         */\n        camelCase(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.capitalize\n    interface LoDashStatic {\n        /**\n         * Converts the first character of string to upper case and the remaining to lower case.\n         *\n         * @param string The string to capitalize.\n         * @return Returns the capitalized string.\n         */\n        capitalize(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.capitalize\n         */\n        capitalize(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.capitalize\n         */\n        capitalize(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.deburr\n    interface LoDashStatic {\n        /**\n         * Deburrs string by converting latin-1 supplementary letters to basic latin letters and removing combining\n         * diacritical marks.\n         *\n         * @param string The string to deburr.\n         * @return Returns the deburred string.\n         */\n        deburr(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.deburr\n         */\n        deburr(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.deburr\n         */\n        deburr(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.endsWith\n    interface LoDashStatic {\n        /**\n         * Checks if string ends with the given target string.\n         *\n         * @param string The string to search.\n         * @param target The string to search for.\n         * @param position The position to search from.\n         * @return Returns true if string ends with target, else false.\n         */\n        endsWith(\n            string?: string,\n            target?: string,\n            position?: number\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.endsWith\n         */\n        endsWith(\n            target?: string,\n            position?: number\n        ): boolean;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.endsWith\n         */\n        endsWith(\n            target?: string,\n            position?: number\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    // _.escape\n    interface LoDashStatic {\n        /**\n         * Converts the characters \"&\", \"<\", \">\", '\"', \"'\", and \"`\" in string to their corresponding HTML entities.\n         *\n         * Note: No other characters are escaped. To escape additional characters use a third-party library like he.\n         *\n         * hough the \">\" character is escaped for symmetry, characters like \">\" and \"/\" don’t need escaping in HTML\n         * and have no special meaning unless they're part of a tag or unquoted attribute value. See Mathias Bynens’s\n         * article (under \"semi-related fun fact\") for more details.\n         *\n         * Backticks are escaped because in IE < 9, they can break out of attribute values or HTML comments. See #59,\n         * #102, #108, and #133 of the HTML5 Security Cheatsheet for more details.\n         *\n         * When working with HTML you should always quote attribute values to reduce XSS vectors.\n         *\n         * @param string The string to escape.\n         * @return Returns the escaped string.\n         */\n        escape(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.escape\n         */\n        escape(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.escape\n         */\n        escape(): LoDashExplicitWrapper<string>;\n    }\n\n    // _.escapeRegExp\n    interface LoDashStatic {\n        /**\n         * Escapes the RegExp special characters \"^\", \"$\", \"\\\", \".\", \"*\", \"+\", \"?\", \"(\", \")\", \"[\", \"]\",\n         * \"{\", \"}\", and \"|\" in string.\n         *\n         * @param string The string to escape.\n         * @return Returns the escaped string.\n         */\n        escapeRegExp(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.escapeRegExp\n         */\n        escapeRegExp(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.escapeRegExp\n         */\n        escapeRegExp(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.kebabCase\n    interface LoDashStatic {\n        /**\n         * Converts string to kebab case.\n         *\n         * @param string The string to convert.\n         * @return Returns the kebab cased string.\n         */\n        kebabCase(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.kebabCase\n         */\n        kebabCase(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.kebabCase\n         */\n        kebabCase(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.lowerCase\n    interface LoDashStatic {\n        /**\n         * Converts `string`, as space separated words, to lower case.\n         *\n         * @param string The string to convert.\n         * @return Returns the lower cased string.\n         */\n        lowerCase(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.lowerCase\n         */\n        lowerCase(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.lowerCase\n         */\n        lowerCase(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.lowerFirst\n    interface LoDashStatic {\n        /**\n         * Converts the first character of `string` to lower case.\n         *\n         * @param string The string to convert.\n         * @return Returns the converted string.\n         */\n        lowerFirst(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.lowerFirst\n         */\n        lowerFirst(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.lowerFirst\n         */\n        lowerFirst(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.pad\n    interface LoDashStatic {\n        /**\n         * Pads string on the left and right sides if it’s shorter than length. Padding characters are truncated if\n         * they can’t be evenly divided by length.\n         *\n         * @param string The string to pad.\n         * @param length The padding length.\n         * @param chars The string used as padding.\n         * @return Returns the padded string.\n         */\n        pad(\n            string?: string,\n            length?: number,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.pad\n         */\n        pad(\n            length?: number,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.pad\n         */\n        pad(\n            length?: number,\n            chars?: string\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    //_.padEnd\n    interface LoDashStatic {\n        /**\n         * Pads string on the right side if it’s shorter than length. Padding characters are truncated if they exceed\n         * length.\n         *\n         * @param string The string to pad.\n         * @param length The padding length.\n         * @param chars The string used as padding.\n         * @return Returns the padded string.\n         */\n        padEnd(\n            string?: string,\n            length?: number,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.padEnd\n         */\n        padEnd(\n            length?: number,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.padEnd\n         */\n        padEnd(\n            length?: number,\n            chars?: string\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    //_.padStart\n    interface LoDashStatic {\n        /**\n         * Pads string on the left side if it’s shorter than length. Padding characters are truncated if they exceed\n         * length.\n         *\n         * @param string The string to pad.\n         * @param length The padding length.\n         * @param chars The string used as padding.\n         * @return Returns the padded string.\n         */\n        padStart(\n            string?: string,\n            length?: number,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.padStart\n         */\n        padStart(\n            length?: number,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.padStart\n         */\n        padStart(\n            length?: number,\n            chars?: string\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    //_.parseInt\n    interface LoDashStatic {\n        /**\n         * Converts string to an integer of the specified radix. If radix is undefined or 0, a radix of 10 is used\n         * unless value is a hexadecimal, in which case a radix of 16 is used.\n         *\n         * Note: This method aligns with the ES5 implementation of parseInt.\n         *\n         * @param string The string to convert.\n         * @param radix The radix to interpret value by.\n         * @return Returns the converted integer.\n         */\n        parseInt(\n            string: string,\n            radix?: number\n        ): number;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.parseInt\n         */\n        parseInt(radix?: number): number;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.parseInt\n         */\n        parseInt(radix?: number): LoDashExplicitWrapper<number>;\n    }\n\n    //_.repeat\n    interface LoDashStatic {\n        /**\n         * Repeats the given string n times.\n         *\n         * @param string The string to repeat.\n         * @param n The number of times to repeat the string.\n         * @return Returns the repeated string.\n         */\n        repeat(\n            string?: string,\n            n?: number\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.repeat\n         */\n        repeat(n?: number): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.repeat\n         */\n        repeat(n?: number): LoDashExplicitWrapper<string>;\n    }\n\n    //_.replace\n    interface LoDashStatic {\n        /**\n         * Replaces matches for pattern in string with replacement.\n         *\n         * Note: This method is based on String#replace.\n         *\n         * @param string\n         * @param pattern\n         * @param replacement\n         * @return Returns the modified string.\n         */\n        replace(\n            string: string,\n            pattern: RegExp|string,\n            replacement: Function|string\n        ): string;\n\n        /**\n         * @see _.replace\n         */\n        replace(\n            pattern?: RegExp|string,\n            replacement?: Function|string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.replace\n         */\n        replace(\n            pattern?: RegExp|string,\n            replacement?: Function|string\n        ): string;\n\n        /**\n         * @see _.replace\n         */\n        replace(\n            replacement?: Function|string\n        ): string;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.replace\n         */\n        replace(\n            pattern?: RegExp|string,\n            replacement?: Function|string\n        ): string;\n\n        /**\n         * @see _.replace\n         */\n        replace(\n            replacement?: Function|string\n        ): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.replace\n         */\n        replace(\n            pattern?: RegExp|string,\n            replacement?: Function|string\n        ): LoDashExplicitWrapper<string>;\n\n        /**\n         * @see _.replace\n         */\n        replace(\n            replacement?: Function|string\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.replace\n         */\n        replace(\n            pattern?: RegExp|string,\n            replacement?: Function|string\n        ): LoDashExplicitWrapper<string>;\n\n        /**\n         * @see _.replace\n         */\n        replace(\n            replacement?: Function|string\n        ): LoDashExplicitWrapper<string>;\n    }\n\n    //_.snakeCase\n    interface LoDashStatic {\n        /**\n         * Converts string to snake case.\n         *\n         * @param string The string to convert.\n         * @return Returns the snake cased string.\n         */\n        snakeCase(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.snakeCase\n         */\n        snakeCase(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.snakeCase\n         */\n        snakeCase(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.split\n    interface LoDashStatic {\n        /**\n         * Splits string by separator.\n         *\n         * Note: This method is based on String#split.\n         *\n         * @param string\n         * @param separator\n         * @param limit\n         * @return Returns the new array of string segments.\n         */\n        split(\n            string: string,\n            separator?: RegExp|string,\n            limit?: number\n        ): string[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.split\n         */\n        split(\n            separator?: RegExp|string,\n            limit?: number\n        ): LoDashImplicitArrayWrapper<string>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.split\n         */\n        split(\n            separator?: RegExp|string,\n            limit?: number\n        ): LoDashExplicitArrayWrapper<string>;\n    }\n\n    //_.startCase\n    interface LoDashStatic {\n        /**\n         * Converts string to start case.\n         *\n         * @param string The string to convert.\n         * @return Returns the start cased string.\n         */\n        startCase(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.startCase\n         */\n        startCase(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.startCase\n         */\n        startCase(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.startsWith\n    interface LoDashStatic {\n        /**\n         * Checks if string starts with the given target string.\n         *\n         * @param string The string to search.\n         * @param target The string to search for.\n         * @param position The position to search from.\n         * @return Returns true if string starts with target, else false.\n         */\n        startsWith(\n            string?: string,\n            target?: string,\n            position?: number\n        ): boolean;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.startsWith\n         */\n        startsWith(\n            target?: string,\n            position?: number\n        ): boolean;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.startsWith\n         */\n        startsWith(\n            target?: string,\n            position?: number\n        ): LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.template\n    interface TemplateOptions extends TemplateSettings {\n        /**\n         * The sourceURL of the template's compiled source.\n         */\n        sourceURL?: string;\n    }\n\n    interface TemplateExecutor {\n        (data?: Object): string;\n        source: string;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Creates a compiled template function that can interpolate data properties in \"interpolate\" delimiters,\n         * HTML-escape interpolated data properties in \"escape\" delimiters, and execute JavaScript in \"evaluate\"\n         * delimiters. Data properties may be accessed as free variables in the template. If a setting object is\n         * provided it takes precedence over _.templateSettings values.\n         *\n         * Note: In the development build _.template utilizes\n         * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl) for easier\n         * debugging.\n         *\n         * For more information on precompiling templates see\n         * [lodash's custom builds documentation](https://lodash.com/custom-builds).\n         *\n         * For more information on Chrome extension sandboxes see\n         * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).\n         *\n         * @param string The template string.\n         * @param options The options object.\n         * @param options.escape The HTML \"escape\" delimiter.\n         * @param options.evaluate The \"evaluate\" delimiter.\n         * @param options.imports An object to import into the template as free variables.\n         * @param options.interpolate The \"interpolate\" delimiter.\n         * @param options.sourceURL The sourceURL of the template's compiled source.\n         * @param options.variable The data object variable name.\n         * @return Returns the compiled template function.\n         */\n        template(\n            string: string,\n            options?: TemplateOptions\n        ): TemplateExecutor;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.template\n         */\n        template(options?: TemplateOptions): TemplateExecutor;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.template\n         */\n        template(options?: TemplateOptions): LoDashExplicitObjectWrapper<TemplateExecutor>;\n    }\n\n    //_.toLower\n    interface LoDashStatic {\n        /**\n         * Converts `string`, as a whole, to lower case.\n         *\n         * @param string The string to convert.\n         * @return Returns the lower cased string.\n         */\n        toLower(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.toLower\n         */\n        toLower(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.toLower\n         */\n        toLower(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.toUpper\n    interface LoDashStatic {\n        /**\n         * Converts `string`, as a whole, to upper case.\n         *\n         * @param string The string to convert.\n         * @return Returns the upper cased string.\n         */\n        toUpper(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.toUpper\n         */\n        toUpper(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.toUpper\n         */\n        toUpper(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.trim\n    interface LoDashStatic {\n        /**\n         * Removes leading and trailing whitespace or specified characters from string.\n         *\n         * @param string The string to trim.\n         * @param chars The characters to trim.\n         * @return Returns the trimmed string.\n         */\n        trim(\n            string?: string,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.trim\n         */\n        trim(chars?: string): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.trim\n         */\n        trim(chars?: string): LoDashExplicitWrapper<string>;\n    }\n\n    //_.trimEnd\n    interface LoDashStatic {\n        /**\n         * Removes trailing whitespace or specified characters from string.\n         *\n         * @param string The string to trim.\n         * @param chars The characters to trim.\n         * @return Returns the trimmed string.\n         */\n        trimEnd(\n            string?: string,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.trimEnd\n         */\n        trimEnd(chars?: string): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.trimEnd\n         */\n        trimEnd(chars?: string): LoDashExplicitWrapper<string>;\n    }\n\n    //_.trimStart\n    interface LoDashStatic {\n        /**\n         * Removes leading whitespace or specified characters from string.\n         *\n         * @param string The string to trim.\n         * @param chars The characters to trim.\n         * @return Returns the trimmed string.\n         */\n        trimStart(\n            string?: string,\n            chars?: string\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.trimStart\n         */\n        trimStart(chars?: string): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.trimStart\n         */\n        trimStart(chars?: string): LoDashExplicitWrapper<string>;\n    }\n\n    //_.truncate\n    interface TruncateOptions {\n        /** The maximum string length. */\n        length?: number;\n        /** The string to indicate text is omitted. */\n        omission?: string;\n        /** The separator pattern to truncate to. */\n        separator?: string|RegExp;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Truncates string if it’s longer than the given maximum string length. The last characters of the truncated\n         * string are replaced with the omission string which defaults to \"…\".\n         *\n         * @param string The string to truncate.\n         * @param options The options object or maximum string length.\n         * @return Returns the truncated string.\n         */\n        truncate(\n            string?: string,\n            options?: TruncateOptions\n        ): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.truncate\n         */\n        truncate(options?: TruncateOptions): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.truncate\n         */\n        truncate(options?: TruncateOptions): LoDashExplicitWrapper<string>;\n    }\n\n    //_.unescape\n    interface LoDashStatic {\n        /**\n         * The inverse of _.escape; this method converts the HTML entities &amp;, &lt;, &gt;, &quot;, &#39;, and &#96;\n         * in string to their corresponding characters.\n         *\n         * Note: No other HTML entities are unescaped. To unescape additional HTML entities use a third-party library\n         * like he.\n         *\n         * @param string The string to unescape.\n         * @return Returns the unescaped string.\n         */\n        unescape(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.unescape\n         */\n        unescape(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.unescape\n         */\n        unescape(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.upperCase\n    interface LoDashStatic {\n        /**\n         * Converts `string`, as space separated words, to upper case.\n         *\n         * @param string The string to convert.\n         * @return Returns the upper cased string.\n         */\n        upperCase(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.upperCase\n         */\n        upperCase(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.upperCase\n         */\n        upperCase(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.upperFirst\n    interface LoDashStatic {\n        /**\n         * Converts the first character of `string` to upper case.\n         *\n         * @param string The string to convert.\n         * @return Returns the converted string.\n         */\n        upperFirst(string?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.upperFirst\n         */\n        upperFirst(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.upperFirst\n         */\n        upperFirst(): LoDashExplicitWrapper<string>;\n    }\n\n    //_.words\n    interface LoDashStatic {\n        /**\n         * Splits `string` into an array of its words.\n         *\n         * @param string The string to inspect.\n         * @param pattern The pattern to match words.\n         * @return Returns the words of `string`.\n         */\n        words(\n            string?: string,\n            pattern?: string|RegExp\n        ): string[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.words\n         */\n        words(pattern?: string|RegExp): string[];\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.words\n         */\n        words(pattern?: string|RegExp): LoDashExplicitArrayWrapper<string>;\n    }\n\n    /***********\n     * Utility *\n     ***********/\n\n    //_.attempt\n    interface LoDashStatic {\n        /**\n         * Attempts to invoke func, returning either the result or the caught error object. Any additional arguments\n         * are provided to func when it’s invoked.\n         *\n         * @param func The function to attempt.\n         * @return Returns the func result or error object.\n         */\n        attempt<TResult>(func: (...args: any[]) => TResult, ...args: any[]): TResult|Error;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.attempt\n         */\n        attempt<TResult>(...args: any[]): TResult|Error;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.attempt\n         */\n        attempt<TResult>(...args: any[]): LoDashExplicitObjectWrapper<TResult|Error>;\n    }\n\n    //_.constant\n    interface LoDashStatic {\n        /**\n         * Creates a function that returns value.\n         *\n         * @param value The value to return from the new function.\n         * @return Returns the new function.\n         */\n        constant<T>(value: T): () => T;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.constant\n         */\n        constant<TResult>(): LoDashImplicitObjectWrapper<() => TResult>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.constant\n         */\n        constant<TResult>(): LoDashExplicitObjectWrapper<() => TResult>;\n    }\n\n    //_.defaultTo\n    interface LoDashStatic {\n        /**\n         * Checks `value` to determine whether a default value should be returned in\n         * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,\n         * or `undefined`.\n         *\n         * @param value The value to check.\n         * @param defaultValue The default value.\n         * @returns Returns the resolved value.\n         */\n        defaultTo<T>(value: T | null | undefined, defaultValue: T): T;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.defaultTo\n         */\n        defaultTo<TResult>(value: TResult): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.defaultTo\n         */\n        defaultTo<TResult>(value: TResult): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.identity\n    interface LoDashStatic {\n        /**\n         * This method returns the first argument provided to it.\n         *\n         * @param value Any value.\n         * @return Returns value.\n         */\n        identity<T>(value: T): T;\n\n        /**\n         * @see _.identity\n         */\n        identity(): undefined;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.identity\n         */\n        identity(): T;\n    }\n\n    interface LoDashImplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.identity\n         */\n        identity(): TArray;\n    }\n\n    interface LoDashImplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.identity\n         */\n        identity(): TObject;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.identity\n         */\n        identity(): LoDashExplicitWrapper<T>;\n    }\n\n    interface LoDashExplicitArrayWrapperBase<T, TArray extends T[] | null | undefined, TWrapper> {\n        /**\n         * @see _.identity\n         */\n        identity(): TWrapper;\n    }\n\n    interface LoDashExplicitObjectWrapperBase<T, TObject extends T | null | undefined, TWrapper> {\n        /**\n         * @see _.identity\n         */\n        identity(): TWrapper;\n    }\n\n    //_.iteratee\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes `func` with the arguments of the created\n         * function. If `func` is a property name the created callback returns the\n         * property value for a given element. If `func` is an object the created\n         * callback returns `true` for elements that contain the equivalent object properties, otherwise it returns `false`.\n         *\n         * @static\n         * @memberOf _\n         * @category Util\n         * @param {*} [func=_.identity] The value to convert to a callback.\n         * @returns {Function} Returns the callback.\n         * @example\n         *\n         * var users = [\n         *   { 'user': 'barney', 'age': 36 },\n         *   { 'user': 'fred',   'age': 40 }\n         * ];\n         *\n         * // create custom iteratee shorthands\n         * _.iteratee = _.wrap(_.iteratee, function(callback, func) {\n         *   var p = /^(\\S+)\\s*([<>])\\s*(\\S+)$/.exec(func);\n         *   return !p ? callback(func) : function(object) {\n         *     return (p[2] == '>' ? object[p[1]] > p[3] : object[p[1]] < p[3]);\n         *   };\n         * });\n         *\n         * _.filter(users, 'age > 36');\n         * // => [{ 'user': 'fred', 'age': 40 }]\n         */\n        iteratee<TFunction extends Function>(\n            func: TFunction\n        ): TFunction;\n\n        /**\n         * @see _.iteratee\n         */\n        iteratee<TResult>(\n            func: string\n        ): (object: any) => TResult;\n\n        /**\n         * @see _.iteratee\n         */\n        iteratee(\n            func: Object\n        ): (object: any) => boolean;\n\n        /**\n         * @see _.iteratee\n         */\n        iteratee<TResult>(): (value: TResult) => TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.iteratee\n         */\n        iteratee<TResult>(): LoDashImplicitObjectWrapper<(object: any) => TResult>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.iteratee\n         */\n        iteratee(): LoDashImplicitObjectWrapper<(object: any) => boolean>;\n\n        /**\n         * @see _.iteratee\n         */\n        iteratee<TResult>(): LoDashImplicitObjectWrapper<(...args: any[]) => TResult>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.iteratee\n         */\n        iteratee<TResult>(): LoDashExplicitObjectWrapper<(object: any) => TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.iteratee\n         */\n        iteratee(): LoDashExplicitObjectWrapper<(object: any) => boolean>;\n\n        /**\n         * @see _.iteratee\n         */\n        iteratee<TResult>(): LoDashExplicitObjectWrapper<(...args: any[]) => TResult>;\n    }\n\n    //_.matches\n    interface LoDashStatic {\n        /**\n         * Creates a function that performs a deep comparison between a given object and source, returning true if the\n         * given object has equivalent property values, else false.\n         *\n         * Note: This method supports comparing arrays, booleans, Date objects, numbers, Object objects, regexes, and\n         * strings. Objects are compared by their own, not inherited, enumerable properties. For comparing a single own\n         * or inherited property value see _.matchesProperty.\n         *\n         * @param source The object of property values to match.\n         * @return Returns the new function.\n         */\n        matches<T>(source: T): (value: any) => boolean;\n\n        /**\n         * @see _.matches\n         */\n        matches<T, V>(source: T): (value: V) => boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.matches\n         */\n        matches<V>(): LoDashImplicitObjectWrapper<(value: V) => boolean>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.matches\n         */\n        matches<V>(): LoDashExplicitObjectWrapper<(value: V) => boolean>;\n    }\n\n    //_.matchesProperty\n    interface LoDashStatic {\n        /**\n         * Creates a function that compares the property value of path on a given object to value.\n         *\n         * Note: This method supports comparing arrays, booleans, Date objects, numbers, Object objects, regexes, and\n         * strings. Objects are compared by their own, not inherited, enumerable properties.\n         *\n         * @param path The path of the property to get.\n         * @param srcValue The value to match.\n         * @return Returns the new function.\n         */\n        matchesProperty<T>(\n            path: Many<StringRepresentable>,\n            srcValue: T\n        ): (value: any) => boolean;\n\n        /**\n         * @see _.matchesProperty\n         */\n        matchesProperty<T, V>(\n            path: Many<StringRepresentable>,\n            srcValue: T\n        ): (value: V) => boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.matchesProperty\n         */\n        matchesProperty<SrcValue>(\n            srcValue: SrcValue\n        ): LoDashImplicitObjectWrapper<(value: any) => boolean>;\n\n        /**\n         * @see _.matchesProperty\n         */\n        matchesProperty<SrcValue, Value>(\n            srcValue: SrcValue\n        ): LoDashImplicitObjectWrapper<(value: Value) => boolean>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.matchesProperty\n         */\n        matchesProperty<SrcValue>(\n            srcValue: SrcValue\n        ): LoDashExplicitObjectWrapper<(value: any) => boolean>;\n\n        /**\n         * @see _.matchesProperty\n         */\n        matchesProperty<SrcValue, Value>(\n            srcValue: SrcValue\n        ): LoDashExplicitObjectWrapper<(value: Value) => boolean>;\n    }\n\n    //_.method\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes the method at path on a given object. Any additional arguments are provided\n         * to the invoked method.\n         *\n         * @param path The path of the method to invoke.\n         * @param args The arguments to invoke the method with.\n         * @return Returns the new function.\n         */\n        method<TObject, TResult>(\n            path: string|StringRepresentable[],\n            ...args: any[]\n        ): (object: TObject) => TResult;\n\n        /**\n         * @see _.method\n         */\n        method<TResult>(\n            path: string|StringRepresentable[],\n            ...args: any[]\n        ): (object: any) => TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.method\n         */\n        method<TObject, TResult>(...args: any[]): LoDashImplicitObjectWrapper<(object: TObject) => TResult>;\n\n        /**\n         * @see _.method\n         */\n        method<TResult>(...args: any[]): LoDashImplicitObjectWrapper<(object: any) => TResult>;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.method\n         */\n        method<TObject, TResult>(...args: any[]): LoDashImplicitObjectWrapper<(object: TObject) => TResult>;\n\n        /**\n         * @see _.method\n         */\n        method<TResult>(...args: any[]): LoDashImplicitObjectWrapper<(object: any) => TResult>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.method\n         */\n        method<TObject, TResult>(...args: any[]): LoDashExplicitObjectWrapper<(object: TObject) => TResult>;\n\n        /**\n         * @see _.method\n         */\n        method<TResult>(...args: any[]): LoDashExplicitObjectWrapper<(object: any) => TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.method\n         */\n        method<TObject, TResult>(...args: any[]): LoDashExplicitObjectWrapper<(object: TObject) => TResult>;\n\n        /**\n         * @see _.method\n         */\n        method<TResult>(...args: any[]): LoDashExplicitObjectWrapper<(object: any) => TResult>;\n    }\n\n    //_.methodOf\n    interface LoDashStatic {\n        /**\n         * The opposite of _.method; this method creates a function that invokes the method at a given path on object.\n         * Any additional arguments are provided to the invoked method.\n         *\n         * @param object The object to query.\n         * @param args The arguments to invoke the method with.\n         * @return Returns the new function.\n         */\n        methodOf<TObject extends {}, TResult>(\n            object: TObject,\n            ...args: any[]\n        ): (path: Many<StringRepresentable>) => TResult;\n\n        /**\n         * @see _.methodOf\n         */\n        methodOf<TResult>(\n            object: {},\n            ...args: any[]\n        ): (path: Many<StringRepresentable>) => TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.methodOf\n         */\n        methodOf<TResult>(\n            ...args: any[]\n        ): LoDashImplicitObjectWrapper<(path: Many<StringRepresentable>) => TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.methodOf\n         */\n        methodOf<TResult>(\n            ...args: any[]\n        ): LoDashExplicitObjectWrapper<(path: Many<StringRepresentable>) => TResult>;\n    }\n\n    //_.mixin\n    interface MixinOptions {\n        chain?: boolean;\n    }\n\n    interface LoDashStatic {\n        /**\n         * Adds all own enumerable function properties of a source object to the destination object. If object is a\n         * function then methods are added to its prototype as well.\n         *\n         * Note: Use _.runInContext to create a pristine lodash function to avoid conflicts caused by modifying\n         * the original.\n         *\n         * @param object The destination object.\n         * @param source The object of functions to add.\n         * @param options The options object.\n         * @param options.chain Specify whether the functions added are chainable.\n         * @return Returns object.\n         */\n        mixin<TResult, TObject>(\n            object: TObject,\n            source: Dictionary<Function>,\n            options?: MixinOptions\n        ): TResult;\n\n        /**\n         * @see _.mixin\n         */\n        mixin<TResult>(\n            source: Dictionary<Function>,\n            options?: MixinOptions\n        ): TResult;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.mixin\n         */\n        mixin<TResult>(\n            source: Dictionary<Function>,\n            options?: MixinOptions\n        ): LoDashImplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.mixin\n         */\n        mixin<TResult>(\n            options?: MixinOptions\n        ): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.mixin\n         */\n        mixin<TResult>(\n            source: Dictionary<Function>,\n            options?: MixinOptions\n        ): LoDashExplicitObjectWrapper<TResult>;\n\n        /**\n         * @see _.mixin\n         */\n        mixin<TResult>(\n            options?: MixinOptions\n        ): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.noConflict\n    interface LoDashStatic {\n        /**\n         * Reverts the _ variable to its previous value and returns a reference to the lodash function.\n         *\n         * @return Returns the lodash function.\n         */\n        noConflict(): typeof _;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.noConflict\n         */\n        noConflict(): typeof _;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.noConflict\n         */\n        noConflict(): LoDashExplicitObjectWrapper<typeof _>;\n    }\n\n    //_.noop\n    interface LoDashStatic {\n        /**\n         * A no-operation function that returns undefined regardless of the arguments it receives.\n         *\n         * @return undefined\n         */\n        noop(...args: any[]): void;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.noop\n         */\n        noop(...args: any[]): void;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.noop\n         */\n        noop(...args: any[]): _.LoDashExplicitWrapper<void>;\n    }\n\n    //_.nthArg\n    interface LoDashStatic {\n        /**\n         * Creates a function that returns its nth argument.\n         *\n         * @param n The index of the argument to return.\n         * @return Returns the new function.\n         */\n        nthArg<TResult extends Function>(n?: number): TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.nthArg\n         */\n        nthArg<TResult extends Function>(): LoDashImplicitObjectWrapper<TResult>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.nthArg\n         */\n        nthArg<TResult extends Function>(): LoDashExplicitObjectWrapper<TResult>;\n    }\n\n    //_.over\n    interface LoDashStatic {\n        /**\n         * Creates a function that invokes iteratees with the arguments provided to the created function and returns\n         * their results.\n         *\n         * @param iteratees The iteratees to invoke.\n         * @return Returns the new function.\n         */\n        over<TResult>(...iteratees: Array<Many<Function>>): (...args: any[]) => TResult[];\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.over\n         */\n        over<TResult>(...iteratees: Array<Many<Function>>): LoDashImplicitObjectWrapper<(...args: any[]) => TResult[]>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.over\n         */\n        over<TResult>(...iteratees: Array<Many<Function>>): LoDashImplicitObjectWrapper<(...args: any[]) => TResult[]>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.over\n         */\n        over<TResult>(...iteratees: Array<Many<Function>>): LoDashExplicitObjectWrapper<(...args: any[]) => TResult[]>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.over\n         */\n        over<TResult>(...iteratees: Array<Many<Function>>): LoDashExplicitObjectWrapper<(...args: any[]) => TResult[]>;\n    }\n\n    //_.overEvery\n    interface LoDashStatic {\n        /**\n         * Creates a function that checks if all of the predicates return truthy when invoked with the arguments\n         * provided to the created function.\n         *\n         * @param predicates The predicates to check.\n         * @return Returns the new function.\n         */\n        overEvery(...predicates: Array<Many<Function>>): (...args: any[]) => boolean;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.overEvery\n         */\n        overEvery(...predicates: Array<Many<Function>>): LoDashImplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.overEvery\n         */\n        overEvery(...predicates: Array<Many<Function>>): LoDashImplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.overEvery\n         */\n        overEvery(...predicates: Array<Many<Function>>): LoDashExplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.overEvery\n         */\n        overEvery(...predicates: Array<Many<Function>>): LoDashExplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    //_.overSome\n    interface LoDashStatic {\n        /**\n         * Creates a function that checks if any of the predicates return truthy when invoked with the arguments\n         * provided to the created function.\n         *\n         * @param predicates The predicates to check.\n         * @return Returns the new function.\n         */\n        overSome(...predicates: Array<Many<Function>>): (...args: any[]) => boolean;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.overSome\n         */\n        overSome(...predicates: Array<Many<Function>>): LoDashImplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.overSome\n         */\n        overSome(...predicates: Array<Many<Function>>): LoDashImplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.overSome\n         */\n        overSome(...predicates: Array<Many<Function>>): LoDashExplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.overSome\n         */\n        overSome(...predicates: Array<Many<Function>>): LoDashExplicitObjectWrapper<(...args: any[]) => boolean>;\n    }\n\n    //_.property\n    interface LoDashStatic {\n        /**\n         * Creates a function that returns the property value at path on a given object.\n         *\n         * @param path The path of the property to get.\n         * @return Returns the new function.\n         */\n        property<TObj, TResult>(path: Many<StringRepresentable>): (obj: TObj) => TResult;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.property\n         */\n        property<TObj, TResult>(): LoDashImplicitObjectWrapper<(obj: TObj) => TResult>;\n    }\n\n    interface LoDashImplicitArrayWrapper<T> {\n        /**\n         * @see _.property\n         */\n        property<TObj, TResult>(): LoDashImplicitObjectWrapper<(obj: TObj) => TResult>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.property\n         */\n        property<TObj, TResult>(): LoDashExplicitObjectWrapper<(obj: TObj) => TResult>;\n    }\n\n    interface LoDashExplicitArrayWrapper<T> {\n        /**\n         * @see _.property\n         */\n        property<TObj, TResult>(): LoDashExplicitObjectWrapper<(obj: TObj) => TResult>;\n    }\n\n    //_.propertyOf\n    interface LoDashStatic {\n        /**\n         * The opposite of _.property; this method creates a function that returns the property value at a given path\n         * on object.\n         *\n         * @param object The object to query.\n         * @return Returns the new function.\n         */\n        propertyOf<T extends {}>(object: T): (path: Many<string>) => any;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.propertyOf\n         */\n        propertyOf(): LoDashImplicitObjectWrapper<(path: Many<string>) => any>;\n    }\n\n    interface LoDashExplicitObjectWrapper<T> {\n        /**\n         * @see _.propertyOf\n         */\n        propertyOf(): LoDashExplicitObjectWrapper<(path: Many<string>) => any>;\n    }\n\n    //_.range\n    interface LoDashStatic {\n        /**\n         * Creates an array of numbers (positive and/or negative) progressing from start up to, but not including, end.\n         * If end is not specified it’s set to start with start then set to 0. If end is less than start a zero-length\n         * range is created unless a negative step is specified.\n         *\n         * @param start The start of the range.\n         * @param end The end of the range.\n         * @param step The value to increment or decrement by.\n         * @return Returns a new range array.\n         */\n        range(\n            start: number,\n            end: number,\n            step?: number\n        ): number[];\n\n        /**\n         * @see _.range\n         */\n        range(\n            end: number,\n            step?: number\n        ): number[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.range\n         */\n        range(\n            end?: number,\n            step?: number\n        ): LoDashImplicitArrayWrapper<number>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.range\n         */\n        range(\n            end?: number,\n            step?: number\n        ): LoDashExplicitArrayWrapper<number>;\n    }\n\n    //_.rangeRight\n    interface LoDashStatic {\n        /**\n         * This method is like `_.range` except that it populates values in\n         * descending order.\n         *\n         * @static\n         * @memberOf _\n         * @category Util\n         * @param {number} [start=0] The start of the range.\n         * @param {number} end The end of the range.\n         * @param {number} [step=1] The value to increment or decrement by.\n         * @returns {Array} Returns the new array of numbers.\n         * @example\n         *\n         * _.rangeRight(4);\n         * // => [3, 2, 1, 0]\n         *\n         * _.rangeRight(-4);\n         * // => [-3, -2, -1, 0]\n         *\n         * _.rangeRight(1, 5);\n         * // => [4, 3, 2, 1]\n         *\n         * _.rangeRight(0, 20, 5);\n         * // => [15, 10, 5, 0]\n         *\n         * _.rangeRight(0, -4, -1);\n         * // => [-3, -2, -1, 0]\n         *\n         * _.rangeRight(1, 4, 0);\n         * // => [1, 1, 1]\n         *\n         * _.rangeRight(0);\n         * // => []\n         */\n        rangeRight(\n            start: number,\n            end: number,\n            step?: number\n        ): number[];\n\n        /**\n         * @see _.rangeRight\n         */\n        rangeRight(\n            end: number,\n            step?: number\n        ): number[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.rangeRight\n         */\n        rangeRight(\n            end?: number,\n            step?: number\n        ): LoDashImplicitArrayWrapper<number>;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.rangeRight\n         */\n        rangeRight(\n            end?: number,\n            step?: number\n        ): LoDashExplicitArrayWrapper<number>;\n    }\n\n    //_.runInContext\n    interface LoDashStatic {\n        /**\n         * Create a new pristine lodash function using the given context object.\n         *\n         * @param context The context object.\n         * @return Returns a new lodash function.\n         */\n        runInContext(context?: Object): typeof _;\n    }\n\n    interface LoDashImplicitObjectWrapper<T> {\n        /**\n         * @see _.runInContext\n         */\n        runInContext(): typeof _;\n    }\n\n    // _.stubArray\n    interface LoDashStatic {\n        /**\n         * This method returns a new empty array.\n         *\n         * @returns Returns the new empty array.\n         */\n        stubArray(): any[];\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubArray\n         */\n        stubArray(): any[];\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubArray\n         */\n        stubArray(): _.LoDashExplicitArrayWrapper<any>;\n    }\n\n    // _.stubFalse\n    interface LoDashStatic {\n        /**\n         * This method returns `false`.\n         *\n         * @returns Returns `false`.\n         */\n        stubFalse(): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubFalse\n         */\n        stubFalse(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubFalse\n         */\n        stubFalse(): _.LoDashExplicitWrapper<boolean>;\n    }\n\n    interface LoDashStatic {\n        /**\n         * This method returns a new empty object.\n         *\n         * @returns Returns the new empty object.\n         */\n        stubObject(): Object;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubObject\n         */\n        stubObject(): Object;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubObject\n         */\n        stubObject(): _.LoDashExplicitObjectWrapper<Object>;\n    }\n\n    interface LoDashStatic {\n        /**\n         * This method returns an empty string.\n         *\n         * @returns Returns the empty string.\n         */\n        stubString(): string;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubString\n         */\n        stubString(): string;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubString\n         */\n        stubString(): _.LoDashExplicitWrapper<string>;\n    }\n\n    interface LoDashStatic {\n        /**\n         * This method returns `true`.\n         *\n         * @returns Returns `true`.\n         */\n        stubTrue(): boolean;\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubTrue\n         */\n        stubTrue(): boolean;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.stubTrue\n         */\n        stubTrue(): _.LoDashExplicitWrapper<boolean>;\n    }\n\n    //_.times\n    interface LoDashStatic {\n        /**\n         * Invokes the iteratee function n times, returning an array of the results of each invocation. The iteratee\n         * is invoked with one argument; (index).\n         *\n         * @param n The number of times to invoke iteratee.\n         * @param iteratee The function invoked per iteration.\n         * @return Returns the array of results.\n         */\n        times<TResult>(\n            n: number,\n            iteratee: (num: number) => TResult\n        ): TResult[];\n\n        /**\n         * @see _.times\n         */\n        times(n: number): number[];\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.times\n         */\n        times<TResult>(\n            iteratee: (num: number) => TResult\n        ): TResult[];\n\n        /**\n         * @see _.times\n         */\n        times(): number[];\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.times\n         */\n        times<TResult>(\n            iteratee: (num: number) => TResult\n        ): LoDashExplicitArrayWrapper<TResult>;\n\n        /**\n         * @see _.times\n         */\n        times(): LoDashExplicitArrayWrapper<number>;\n    }\n\n    //_.toPath\n    interface LoDashStatic {\n        /**\n         * Converts `value` to a property path array.\n         *\n         * @static\n         * @memberOf _\n         * @category Util\n         * @param {*} value The value to convert.\n         * @returns {Array} Returns the new property path array.\n         * @example\n         *\n         * _.toPath('a.b.c');\n         * // => ['a', 'b', 'c']\n         *\n         * _.toPath('a[0].b.c');\n         * // => ['a', '0', 'b', 'c']\n         *\n         * var path = ['a', 'b', 'c'],\n         *     newPath = _.toPath(path);\n         *\n         * console.log(newPath);\n         * // => ['a', 'b', 'c']\n         *\n         * console.log(path === newPath);\n         * // => false\n         */\n        toPath(value: any): string[];\n    }\n\n    interface LoDashImplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toPath\n         */\n        toPath(): LoDashImplicitWrapper<string[]>;\n    }\n\n    interface LoDashExplicitWrapperBase<T, TWrapper> {\n        /**\n         * @see _.toPath\n         */\n        toPath(): LoDashExplicitWrapper<string[]>;\n    }\n\n    //_.uniqueId\n    interface LoDashStatic {\n        /**\n         * Generates a unique ID. If prefix is provided the ID is appended to it.\n         *\n         * @param prefix The value to prefix the ID with.\n         * @return Returns the unique ID.\n         */\n        uniqueId(prefix?: string): string;\n    }\n\n    interface LoDashImplicitWrapper<T> {\n        /**\n         * @see _.uniqueId\n         */\n        uniqueId(): string;\n    }\n\n    interface LoDashExplicitWrapper<T> {\n        /**\n         * @see _.uniqueId\n         */\n        uniqueId(): LoDashExplicitWrapper<string>;\n    }\n\n    type ListIterator<T, TResult> = (value: T, index: number, collection: List<T>) => TResult;\n\n    type ListIteratorTypeGuard<T, S extends T> = (value: T, index: number, collection: List<T>) => value is S;\n\n    type DictionaryIterator<T, TResult> = (value: T, key: string, collection: Dictionary<T>) => TResult;\n\n    type DictionaryIteratorTypeGuard<T, S extends T> = (value: T, key: string, collection: Dictionary<T>) => value is S;\n\n    type NumericDictionaryIterator<T, TResult> = (value: T, key: number, collection: Dictionary<T>) => TResult;\n\n    type ObjectIterator<T, TResult> = (element: T, key: string, collection: any) => TResult;\n\n    type StringIterator<TResult> = (char: string, index: number, string: string) => TResult;\n\n    type MemoVoidIterator<T, TResult> = (prev: TResult, curr: T, indexOrKey: any, list: T[]) => void;\n\n    type MemoIterator<T, TResult> = (prev: TResult, curr: T, indexOrKey: any, list: T[]) => TResult;\n\n    type MemoVoidArrayIterator<T, TResult> = (acc: TResult, curr: T, index: number, arr: T[]) => void;\n    type MemoVoidDictionaryIterator<T, TResult> = (acc: TResult, curr: T, key: string, dict: Dictionary<T>) => void;\n\n    /** Common interface between Arrays and jQuery objects */\n    type List<T> = ArrayLike<T>;\n\n    interface Dictionary<T> {\n        [index: string]: T;\n    }\n\n    interface NumericDictionary<T> {\n        [index: number]: T;\n    }\n\n    interface StringRepresentable {\n        toString(): string;\n    }\n\n    interface Cancelable {\n        cancel(): void;\n        flush(): void;\n    }\n}\n\n// Backward compatibility with --target es5\ndeclare global {\n    interface Set<T> { }\n    interface Map<K, V> { }\n    interface WeakSet<T> { }\n    interface WeakMap<K extends object, V> { }\n}\n" }
                );
                verifyAfterPartialOrCompleteNpmInstall(2);

                filesAndFoldersToAdd.push(
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/src/scheduler" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/src/util" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/symbol" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/testing" },
                    { "path": "/a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041", "content": "{\n  \"_args\": [\n    [\n      {\n        \"raw\": \"rxjs@^5.4.2\",\n        \"scope\": null,\n        \"escapedName\": \"rxjs\",\n        \"name\": \"rxjs\",\n        \"rawSpec\": \"^5.4.2\",\n        \"spec\": \">=5.4.2 <6.0.0\",\n        \"type\": \"range\"\n      },\n      \"C:\\\\Users\\\\shkamat\\\\Desktop\\\\app\"\n    ]\n  ],\n  \"_from\": \"rxjs@>=5.4.2 <6.0.0\",\n  \"_id\": \"rxjs@5.4.3\",\n  \"_inCache\": true,\n  \"_location\": \"/rxjs\",\n  \"_nodeVersion\": \"7.7.2\",\n  \"_npmOperationalInternal\": {\n    \"host\": \"s3://npm-registry-packages\",\n    \"tmp\": \"tmp/rxjs-5.4.3.tgz_1502407898166_0.6800217325799167\"\n  },\n  \"_npmUser\": {\n    \"name\": \"blesh\",\n    \"email\": \"ben@benlesh.com\"\n  },\n  \"_npmVersion\": \"5.3.0\",\n  \"_phantomChildren\": {},\n  \"_requested\": {\n    \"raw\": \"rxjs@^5.4.2\",\n    \"scope\": null,\n    \"escapedName\": \"rxjs\",\n    \"name\": \"rxjs\",\n    \"rawSpec\": \"^5.4.2\",\n    \"spec\": \">=5.4.2 <6.0.0\",\n    \"type\": \"range\"\n  },\n  \"_requiredBy\": [\n    \"/\"\n  ],\n  \"_resolved\": \"https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz\",\n  \"_shasum\": \"0758cddee6033d68e0fd53676f0f3596ce3d483f\",\n  \"_shrinkwrap\": null,\n  \"_spec\": \"rxjs@^5.4.2\",\n  \"_where\": \"C:\\\\Users\\\\shkamat\\\\Desktop\\\\app\",\n  \"author\": {\n    \"name\": \"Ben Lesh\",\n    \"email\": \"ben@benlesh.com\"\n  },\n  \"bugs\": {\n    \"url\": \"https://github.com/ReactiveX/RxJS/issues\"\n  },\n  \"config\": {\n    \"commitizen\": {\n      \"path\": \"cz-conventional-changelog\"\n    }\n  },\n  \"contributors\": [\n    {\n      \"name\": \"Ben Lesh\",\n      \"email\": \"ben@benlesh.com\"\n    },\n    {\n      \"name\": \"Paul Taylor\",\n      \"email\": \"paul.e.taylor@me.com\"\n    },\n    {\n      \"name\": \"Jeff Cross\",\n      \"email\": \"crossj@google.com\"\n    },\n    {\n      \"name\": \"Matthew Podwysocki\",\n      \"email\": \"matthewp@microsoft.com\"\n    },\n    {\n      \"name\": \"OJ Kwon\",\n      \"email\": \"kwon.ohjoong@gmail.com\"\n    },\n    {\n      \"name\": \"Andre Staltz\",\n      \"email\": \"andre@staltz.com\"\n    }\n  ],\n  \"dependencies\": {\n    \"symbol-observable\": \"^1.0.1\"\n  },\n  \"description\": \"Reactive Extensions for modern JavaScript\",\n  \"devDependencies\": {\n    \"babel-polyfill\": \"^6.23.0\",\n    \"benchmark\": \"^2.1.0\",\n    \"benchpress\": \"2.0.0-beta.1\",\n    \"chai\": \"^3.5.0\",\n    \"color\": \"^0.11.1\",\n    \"colors\": \"1.1.2\",\n    \"commitizen\": \"^2.8.6\",\n    \"coveralls\": \"^2.11.13\",\n    \"cz-conventional-changelog\": \"^1.2.0\",\n    \"danger\": \"^1.1.0\",\n    \"doctoc\": \"^1.0.0\",\n    \"escape-string-regexp\": \"^1.0.5 \",\n    \"esdoc\": \"^0.4.7\",\n    \"eslint\": \"^3.8.0\",\n    \"fs-extra\": \"^2.1.2\",\n    \"get-folder-size\": \"^1.0.0\",\n    \"glob\": \"^7.0.3\",\n    \"gm\": \"^1.22.0\",\n    \"google-closure-compiler-js\": \"^20170218.0.0\",\n    \"gzip-size\": \"^3.0.0\",\n    \"http-server\": \"^0.9.0\",\n    \"husky\": \"^0.13.3\",\n    \"lint-staged\": \"3.2.5\",\n    \"lodash\": \"^4.15.0\",\n    \"madge\": \"^1.4.3\",\n    \"markdown-doctest\": \"^0.9.1\",\n    \"minimist\": \"^1.2.0\",\n    \"mkdirp\": \"^0.5.1\",\n    \"mocha\": \"^3.0.2\",\n    \"mocha-in-sauce\": \"0.0.1\",\n    \"npm-run-all\": \"^4.0.2\",\n    \"npm-scripts-info\": \"^0.3.4\",\n    \"nyc\": \"^10.2.0\",\n    \"opn-cli\": \"^3.1.0\",\n    \"platform\": \"^1.3.1\",\n    \"promise\": \"^7.1.1\",\n    \"protractor\": \"^3.1.1\",\n    \"rollup\": \"0.36.3\",\n    \"rollup-plugin-inject\": \"^2.0.0\",\n    \"rollup-plugin-node-resolve\": \"^2.0.0\",\n    \"rx\": \"latest\",\n    \"rxjs\": \"latest\",\n    \"shx\": \"^0.2.2\",\n    \"sinon\": \"^2.1.0\",\n    \"sinon-chai\": \"^2.9.0\",\n    \"source-map-support\": \"^0.4.0\",\n    \"tslib\": \"^1.5.0\",\n    \"tslint\": \"^4.4.2\",\n    \"typescript\": \"~2.0.6\",\n    \"typings\": \"^2.0.0\",\n    \"validate-commit-msg\": \"^2.14.0\",\n    \"watch\": \"^1.0.1\",\n    \"webpack\": \"^1.13.1\",\n    \"xmlhttprequest\": \"1.8.0\"\n  },\n  \"directories\": {},\n  \"dist\": {\n    \"integrity\": \"sha512-fSNi+y+P9ss+EZuV0GcIIqPUK07DEaMRUtLJvdcvMyFjc9dizuDjere+A4V7JrLGnm9iCc+nagV/4QdMTkqC4A==\",\n    \"shasum\": \"0758cddee6033d68e0fd53676f0f3596ce3d483f\",\n    \"tarball\": \"https://registry.npmjs.org/rxjs/-/rxjs-5.4.3.tgz\"\n  },\n  \"engines\": {\n    \"npm\": \">=2.0.0\"\n  },\n  \"homepage\": \"https://github.com/ReactiveX/RxJS\",\n  \"keywords\": [\n    \"Rx\",\n    \"RxJS\",\n    \"ReactiveX\",\n    \"ReactiveExtensions\",\n    \"Streams\",\n    \"Observables\",\n    \"Observable\",\n    \"Stream\",\n    \"ES6\",\n    \"ES2015\"\n  ],\n  \"license\": \"Apache-2.0\",\n  \"lint-staged\": {\n    \"*.@(js)\": [\n      \"eslint --fix\",\n      \"git add\"\n    ],\n    \"*.@(ts)\": [\n      \"tslint --fix\",\n      \"git add\"\n    ]\n  },\n  \"main\": \"Rx.js\",\n  \"maintainers\": [\n    {\n      \"name\": \"blesh\",\n      \"email\": \"ben@benlesh.com\"\n    }\n  ],\n  \"name\": \"rxjs\",\n  \"optionalDependencies\": {},\n  \"readme\": \"ERROR: No README data found!\",\n  \"repository\": {\n    \"type\": \"git\",\n    \"url\": \"git+ssh://git@github.com/ReactiveX/RxJS.git\"\n  },\n  \"scripts-info\": {\n    \"info\": \"List available script\",\n    \"build_all\": \"Build all packages (ES6, CJS, UMD) and generate packages\",\n    \"build_cjs\": \"Build CJS package with clean up existing build, copy source into dist\",\n    \"build_es6\": \"Build ES6 package with clean up existing build, copy source into dist\",\n    \"build_closure_core\": \"Minify Global core build using closure compiler\",\n    \"build_global\": \"Build Global package, then minify build\",\n    \"build_perf\": \"Build CJS & Global build, run macro performance test\",\n    \"build_test\": \"Build CJS package & test spec, execute mocha test runner\",\n    \"build_cover\": \"Run lint to current code, build CJS & test spec, execute test coverage\",\n    \"build_docs\": \"Build ES6 & global package, create documentation using it\",\n    \"build_spec\": \"Build test specs\",\n    \"check_circular_dependencies\": \"Check codebase has circular dependencies\",\n    \"clean_spec\": \"Clean up existing test spec build output\",\n    \"clean_dist_cjs\": \"Clean up existing CJS package output\",\n    \"clean_dist_es6\": \"Clean up existing ES6 package output\",\n    \"clean_dist_global\": \"Clean up existing Global package output\",\n    \"commit\": \"Run git commit wizard\",\n    \"compile_dist_cjs\": \"Compile codebase into CJS module\",\n    \"compile_module_es6\": \"Compile codebase into ES6\",\n    \"cover\": \"Execute test coverage\",\n    \"lint_perf\": \"Run lint against performance test suite\",\n    \"lint_spec\": \"Run lint against test spec\",\n    \"lint_src\": \"Run lint against source\",\n    \"lint\": \"Run lint against everything\",\n    \"perf\": \"Run macro performance benchmark\",\n    \"perf_micro\": \"Run micro performance benchmark\",\n    \"test_mocha\": \"Execute mocha test runner against existing test spec build\",\n    \"test_browser\": \"Execute mocha test runner on browser against existing test spec build\",\n    \"test\": \"Clean up existing test spec build, build test spec and execute mocha test runner\",\n    \"tests2png\": \"Generate marble diagram image from test spec\",\n    \"watch\": \"Watch codebase, trigger compile when source code changes\"\n  },\n  \"typings\": \"Rx.d.ts\",\n  \"version\": \"5.4.3\"\n}\n" }
                );
                verifyAfterPartialOrCompleteNpmInstall(0);

                // remove /a/b/node_modules/.staging/rxjs-22375c61/package.json.2252192041
                filesAndFoldersToAdd.length--;
                // and add few more folders/files
                filesAndFoldersToAdd.push(
                    { "path": "/a/b/node_modules/symbol-observable" },
                    { "path": "/a/b/node_modules/@types" },
                    { "path": "/a/b/node_modules/@types/lodash" },
                    { "path": "/a/b/node_modules/lodash" },
                    { "path": "/a/b/node_modules/rxjs" },
                    { "path": "/a/b/node_modules/typescript" },
                    { "path": "/a/b/node_modules/.bin" }
                );
                verifyAfterPartialOrCompleteNpmInstall(0);

                forEach(filesAndFoldersToAdd, f => {
                    f.path = f.path
                        .replace("/a/b/node_modules/.staging", "/a/b/node_modules")
                        .replace(/[\-\.][\d\w][\d\w][\d\w][\d\w][\d\w][\d\w][\d\w][\d\w]/g, "");
                });

                const lodashIndexPath = "/a/b/node_modules/@types/lodash/index.d.ts";
                projectFiles.push(find(filesAndFoldersToAdd, f => f.path === lodashIndexPath));
                watchedModuleLocations.length = watchedModuleLocations.indexOf(lodashIndexPath);
                // npm installation complete, timeout after reload fs
                timeoutAfterReloadFs = true;
                verifyAfterPartialOrCompleteNpmInstall(2);

                function verifyAfterPartialOrCompleteNpmInstall(timeoutQueueLengthWhenRunningTimeouts: number) {
                    host.reloadFS(projectFiles.concat(otherFiles, filesAndFoldersToAdd));
                    if (timeoutAfterReloadFs) {
                        host.checkTimeoutQueueLengthAndRun(timeoutQueueLengthWhenRunningTimeouts);
                    }
                    else {
                        host.checkTimeoutQueueLength(2);
                    }
                    verifyProject();
                }

                function verifyProject() {
                    checkNumberOfConfiguredProjects(projectService, 1);

                    const project = projectService.configuredProjects.get(tsconfigJson.path);
                    const projectFilePaths = map(projectFiles, f => f.path);
                    checkProjectActualFiles(project, projectFilePaths);

                    const filesWatched = filter(projectFilePaths, p => p !== app.path).concat(watchedModuleLocations);
                    checkWatchedFiles(host, filesWatched);
                    checkWatchedDirectories(host, [appFolder], /*recursive*/ true);
                    checkWatchedDirectories(host, [], /*recursive*/ false);
                }

                function getNodeModulesWatchedDirectories(path: string, module: string): string[] {
                    const nodeModulesDir = combinePaths(path, "node_modules/");
                    const parentDir = getDirectoryPath(path);
                    const parentNodeModules = parentDir !== path ? getNodeModulesWatchedDirectories(parentDir, module) : [];
                    return [
                        `${nodeModulesDir}${module}.ts`,
                        `${nodeModulesDir}${module}.tsx`,
                        `${nodeModulesDir}${module}.d.ts`,
                        `${nodeModulesDir}${module}/index.ts`,
                        `${nodeModulesDir}${module}/index.tsx`,
                        `${nodeModulesDir}${module}/index.d.ts`,
                        `${nodeModulesDir}@types/${module}.d.ts`,
                        `${nodeModulesDir}@types/${module}/index.d.ts`,
                        `${nodeModulesDir}@types/${module}/package.json`,
                        `${nodeModulesDir}${module}.js`,
                        `${nodeModulesDir}${module}.jsx`,
                        `${nodeModulesDir}${module}/package.json`,
                        `${nodeModulesDir}${module}/index.js`,
                        `${nodeModulesDir}${module}/index.jsx`,
                    ].concat(parentNodeModules);
                }
            }

            it("timeouts occur inbetween installation", () => {
                verifyNpmInstall(/*timeoutDuringPartialInstallation*/ true);
            });

            it("timeout occurs after installation", () => {
                verifyNpmInstall(/*timeoutDuringPartialInstallation*/ false);
            });
        });
    });

    describe("ProjectChangedEvent", () => {
        function verifyFiles(caption: string, actual: ReadonlyArray<string>, expected: ReadonlyArray<string>) {
            assert.equal(actual.length, expected.length, `Incorrect number of ${caption}. Actual: ${actual} Expected: ${expected}`);
            const seen = createMap<true>();
            forEach(actual, f => {
                assert.isFalse(seen.has(f), `${caption}: Found duplicate ${f}. Actual: ${actual} Expected: ${expected}`);
                seen.set(f, true);
                assert.isTrue(contains(expected, f), `${caption}: Expected not to contain ${f}. Actual: ${actual} Expected: ${expected}`);
            });
        }

        function createVerifyInitialOpen(session: TestSession, verifyProjectChangedEventHandler: (events: server.ProjectChangedEvent[]) => void) {
            return (file: FileOrFolder) => {
                session.executeCommandSeq(<protocol.OpenRequest>{
                    command: server.CommandNames.Open,
                    arguments: {
                        file: file.path
                    }
                });
                verifyProjectChangedEventHandler([]);
            };
        }

        interface ProjectChangeEventVerifier {
            session: TestSession;
            verifyProjectChangedEventHandler(events: server.ProjectChangedEvent[]): void;
            verifyInitialOpen(file: FileOrFolder): void;
        }

        function verifyProjectChangedEvent(createSession: (host: TestServerHost) => ProjectChangeEventVerifier) {
            it("when adding new file", () => {
                const commonFile1: FileOrFolder = {
                    path: "/a/b/file1.ts",
                    content: "export var x = 10;"
                };
                const commonFile2: FileOrFolder = {
                    path: "/a/b/file2.ts",
                    content: "export var y = 10;"
                };
                const commonFile3: FileOrFolder = {
                    path: "/a/b/file3.ts",
                    content: "export var z = 10;"
                };
                const configFile: FileOrFolder = {
                    path: "/a/b/tsconfig.json",
                    content: `{}`
                };
                const host = createServerHost([commonFile1, libFile, configFile]);
                const { session, verifyProjectChangedEventHandler, verifyInitialOpen } = createSession(host, );
                const projectService = session.getProjectService();
                verifyInitialOpen(commonFile1);

                host.reloadFS([commonFile1, libFile, configFile, commonFile2]);
                host.runQueuedTimeoutCallbacks();
                // Since this is first event
                const project = projectService.configuredProjects.get(configFile.path);
                verifyProjectChangedEventHandler([{
                    eventName: server.ProjectChangedEvent,
                    data: {
                        project,
                        changedFiles: [libFile.path, commonFile1.path, commonFile2.path],
                        filesToEmit: [commonFile1.path, commonFile2.path]
                    }
                }]);

                host.reloadFS([commonFile1, commonFile2, libFile, configFile, commonFile3]);
                host.runQueuedTimeoutCallbacks();
                verifyProjectChangedEventHandler([{
                    eventName: server.ProjectChangedEvent,
                    data: {
                        project,
                        changedFiles: [commonFile3.path],
                        filesToEmit: [commonFile3.path]
                    }
                }]);
            });

            describe("with --out or --outFile setting", () => {
                function verifyEventWithOutSettings(compilerOptions: CompilerOptions = {}) {
                    const config: FileOrFolder = {
                        path: "/a/tsconfig.json",
                        content: JSON.stringify({
                            compilerOptions
                        })
                    };

                    const f1: FileOrFolder = {
                        path: "/a/a.ts",
                        content: "export let x = 1"
                    };
                    const f2: FileOrFolder = {
                        path: "/a/b.ts",
                        content: "export let y = 1"
                    };

                    const files = [f1, config, libFile];
                    const host = createServerHost(files);
                    const { session, verifyInitialOpen, verifyProjectChangedEventHandler } = createSession(host);
                    const projectService = session.getProjectService();
                    verifyInitialOpen(f1);

                    files.push(f2);
                    host.reloadFS(files);
                    host.runQueuedTimeoutCallbacks();

                    // Since this is first event
                    const project = projectService.configuredProjects.get(config.path);
                    verifyProjectChangedEventHandler([{
                        eventName: server.ProjectChangedEvent,
                        data: {
                            project,
                            changedFiles: [libFile.path, f1.path, f2.path],
                            filesToEmit: [f1.path, f2.path]
                        }
                    }]);

                    f2.content = "export let x = 11";
                    host.reloadFS(files);
                    host.runQueuedTimeoutCallbacks();
                    verifyProjectChangedEventHandler([{
                        eventName: server.ProjectChangedEvent,
                        data: {
                            project,
                            changedFiles: [f2.path],
                            filesToEmit: [f2.path]
                        }
                    }]);
                }

                it("when both options are not set", () => {
                    verifyEventWithOutSettings();
                });

                it("when --out is set", () => {
                    const outJs = "/a/out.js";
                    verifyEventWithOutSettings({ out: outJs });
                });

                it("when --outFile is set", () => {
                    const outJs = "/a/out.js";
                    verifyEventWithOutSettings({ outFile: outJs });
                });
            });

            describe("with modules and configured project", () => {
                const file1Consumer1Path = "/a/b/file1Consumer1.ts";
                const moduleFile1Path = "/a/b/moduleFile1.ts";
                const configFilePath = "/a/b/tsconfig.json";
                type InitialStateParams = {
                    /** custom config file options */
                    configObj?: any;
                    /** list of files emitted/changed on first update graph */
                    firstCompilationEmitFiles?: string[];
                    /** Additional files and folders to add */
                    getAdditionalFileOrFolder?(): FileOrFolder[];
                    /** initial list of files to reload in fs and first file in this list being the file to open */
                    firstReloadFileList?: string[];
                };
                function getInitialState({ configObj = {}, getAdditionalFileOrFolder, firstReloadFileList, firstCompilationEmitFiles }: InitialStateParams = {}) {
                    const moduleFile1: FileOrFolder = {
                        path: moduleFile1Path,
                        content: "export function Foo() { };",
                    };

                    const file1Consumer1: FileOrFolder = {
                        path: file1Consumer1Path,
                        content: `import {Foo} from "./moduleFile1"; export var y = 10;`,
                    };

                    const file1Consumer2: FileOrFolder = {
                        path: "/a/b/file1Consumer2.ts",
                        content: `import {Foo} from "./moduleFile1"; let z = 10;`,
                    };

                    const moduleFile2: FileOrFolder = {
                        path: "/a/b/moduleFile2.ts",
                        content: `export var Foo4 = 10;`,
                    };

                    const globalFile3: FileOrFolder = {
                        path: "/a/b/globalFile3.ts",
                        content: `interface GlobalFoo { age: number }`
                    };

                    const additionalFiles = getAdditionalFileOrFolder ? getAdditionalFileOrFolder() : [];
                    const configFile = {
                        path: configFilePath,
                        content: JSON.stringify(configObj || { compilerOptions: {} })
                    };

                    const files = [file1Consumer1, moduleFile1, file1Consumer2, moduleFile2, ...additionalFiles, globalFile3, libFile, configFile];

                    const filesToReload = firstReloadFileList && getFiles(firstReloadFileList) || files;
                    const host = createServerHost([filesToReload[0], configFile]);

                    // Initial project creation
                    const { session, verifyProjectChangedEventHandler, verifyInitialOpen } = createSession(host);
                    const projectService = session.getProjectService();
                    verifyInitialOpen(filesToReload[0]);

                    // Since this is first event, it will have all the files
                    const firstFilesExpected = firstCompilationEmitFiles && getFiles(firstCompilationEmitFiles) || filesToReload;
                    verifyProjectChangedEvent(firstFilesExpected, filesToReload);

                    return {
                        moduleFile1, file1Consumer1, file1Consumer2, moduleFile2, globalFile3, configFile,
                        files,
                        updateContentOfOpenFile,
                        verifyProjectChangedEvent,
                        verifyAffectedAllFiles,
                    };

                    function getFiles(filelist: string[]) {
                        return map(filelist, getFile);
                    }

                    function getFile(fileName: string) {
                        return find(files, file => file.path === fileName);
                    }

                    function verifyAffectedAllFiles() {
                        verifyProjectChangedEvent(filter(files, f => f !== libFile));
                    }

                    function verifyProjectChangedEvent(filesToEmit: FileOrFolder[], filesToReload?: FileOrFolder[], additionalChangedFiles?: FileOrFolder[]) {
                        const changedFiles = mapDefined(additionalChangedFiles ? filesToEmit.concat(additionalChangedFiles) : filesToEmit, f => f !== configFile ? f.path : undefined);
                        host.reloadFS(filesToReload || files);
                        host.runQueuedTimeoutCallbacks();
                        const project = projectService.configuredProjects.get(configFile.path);
                        verifyProjectChangedEventHandler([{
                            eventName: server.ProjectChangedEvent,
                            data: {
                                project,
                                changedFiles,
                                filesToEmit: mapDefined(filesToEmit, f => f !== libFile && f !== configFile ? f.path : undefined)
                            }
                        }]);
                    }

                    function updateContentOfOpenFile(file: FileOrFolder, newContent: string) {
                        session.executeCommandSeq<protocol.ChangeRequest>({
                            command: server.CommandNames.Change,
                            arguments: {
                                file: file.path,
                                insertString: newContent,
                                endLine: 1,
                                endOffset: file.content.length,
                                line: 1,
                                offset: 1
                            }
                        });
                        file.content = newContent;
                    }
                }

                it("should contains only itself if a module file's shape didn't change, and all files referencing it if its shape changed", () => {
                    const { moduleFile1, file1Consumer1, file1Consumer2, verifyProjectChangedEvent } = getInitialState();

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer1, file1Consumer2]);

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { console.log('hi'); };`
                    moduleFile1.content = `export var T: number;export function Foo() { console.log('hi'); };`;
                    verifyProjectChangedEvent([moduleFile1]);
                });

                it("should be up-to-date with the reference map changes", () => {
                    const { moduleFile1, file1Consumer1, file1Consumer2, updateContentOfOpenFile, verifyProjectChangedEvent } = getInitialState();

                    // Change file1Consumer1 content to `export let y = Foo();`
                    updateContentOfOpenFile(file1Consumer1, "export let y = Foo();");
                    verifyProjectChangedEvent([file1Consumer1]);

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer2]);

                    // Add the import statements back to file1Consumer1
                    updateContentOfOpenFile(file1Consumer1, `import {Foo} from "./moduleFile1";let y = Foo();`);
                    verifyProjectChangedEvent([file1Consumer1]);

                    // Change the content of moduleFile1 to `export var T: number;export var T2: string;export function Foo() { };`
                    moduleFile1.content = `export var T: number;export var T2: string;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer2, file1Consumer1]);

                    // Multiple file edits in one go:

                    // Change file1Consumer1 content to `export let y = Foo();`
                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    updateContentOfOpenFile(file1Consumer1, `export let y = Foo();`);
                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer1, file1Consumer2]);
                });

                it("should be up-to-date with deleted files", () => {
                    const { moduleFile1, file1Consumer1, file1Consumer2, files, verifyProjectChangedEvent } = getInitialState();

                    // Change the content of moduleFile1 to `export var T: number;export function Foo() { };`
                    moduleFile1.content = `export var T: number;export function Foo() { };`;

                    // Delete file1Consumer2
                    const filesToLoad = filter(files, file => file !== file1Consumer2);
                    verifyProjectChangedEvent([moduleFile1, file1Consumer1], filesToLoad, [file1Consumer2]);
                });

                it("should be up-to-date with newly created files", () => {
                    const { moduleFile1, file1Consumer1, file1Consumer2, files, verifyProjectChangedEvent, } = getInitialState();

                    const file1Consumer3: FileOrFolder = {
                        path: "/a/b/file1Consumer3.ts",
                        content: `import {Foo} from "./moduleFile1"; let y = Foo();`
                    };
                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer1, file1Consumer3, file1Consumer2], files.concat(file1Consumer3));
                });

                it("should detect changes in non-root files", () => {
                    const { moduleFile1, file1Consumer1, verifyProjectChangedEvent } = getInitialState({
                        configObj: { files: [file1Consumer1Path] },
                        firstCompilationEmitFiles: [file1Consumer1Path, moduleFile1Path, libFile.path]
                    });

                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer1]);

                    // change file1 internal, and verify only file1 is affected
                    moduleFile1.content += "var T1: number;";
                    verifyProjectChangedEvent([moduleFile1]);
                });

                it("should return all files if a global file changed shape", () => {
                    const { globalFile3, verifyAffectedAllFiles } = getInitialState();

                    globalFile3.content += "var T2: string;";
                    verifyAffectedAllFiles();
                });

                it("should always return the file itself if '--isolatedModules' is specified", () => {
                    const { moduleFile1, verifyProjectChangedEvent } = getInitialState({
                        configObj: { compilerOptions: { isolatedModules: true } }
                    });

                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1]);
                });

                it("should always return the file itself if '--out' or '--outFile' is specified", () => {
                    const outFilePath = "/a/b/out.js";
                    const { moduleFile1, verifyProjectChangedEvent } = getInitialState({
                        configObj: { compilerOptions: { module: "system", outFile: outFilePath } }
                    });

                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1]);
                });

                it("should return cascaded affected file list", () => {
                    const file1Consumer1Consumer1: FileOrFolder = {
                        path: "/a/b/file1Consumer1Consumer1.ts",
                        content: `import {y} from "./file1Consumer1";`
                    };
                    const { moduleFile1, file1Consumer1, file1Consumer2, updateContentOfOpenFile, verifyProjectChangedEvent } = getInitialState({
                        getAdditionalFileOrFolder: () => [file1Consumer1Consumer1]
                    });

                    updateContentOfOpenFile(file1Consumer1, file1Consumer1.content + "export var T: number;");
                    verifyProjectChangedEvent([file1Consumer1, file1Consumer1Consumer1]);

                    // Doesnt change the shape of file1Consumer1
                    moduleFile1.content = `export var T: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer1, file1Consumer2]);

                    // Change both files before the timeout
                    updateContentOfOpenFile(file1Consumer1, file1Consumer1.content + "export var T2: number;");
                    moduleFile1.content = `export var T2: number;export function Foo() { };`;
                    verifyProjectChangedEvent([moduleFile1, file1Consumer1, file1Consumer2, file1Consumer1Consumer1]);
                });

                it("should work fine for files with circular references", () => {
                    const file1: FileOrFolder = {
                        path: "/a/b/file1.ts",
                        content: `
                    /// <reference path="./file2.ts" />
                    export var t1 = 10;`
                    };
                    const file2: FileOrFolder = {
                        path: "/a/b/file2.ts",
                        content: `
                    /// <reference path="./file1.ts" />
                    export var t2 = 10;`
                    };
                    const { configFile, verifyProjectChangedEvent, updateContentOfOpenFile } = getInitialState({
                        getAdditionalFileOrFolder: () => [file1, file2],
                        firstReloadFileList: [file1.path, libFile.path, file2.path, configFilePath]
                    });

                    updateContentOfOpenFile(file1, file1.content + "export var t3 = 10;");
                    verifyProjectChangedEvent([file1, file2], [file1, file2, libFile, configFile]);
                });

                it("should detect removed code file", () => {
                    const referenceFile1: FileOrFolder = {
                        path: "/a/b/referenceFile1.ts",
                        content: `
                    /// <reference path="./moduleFile1.ts" />
                    export var x = Foo();`
                    };
                    const { configFile, verifyProjectChangedEvent, moduleFile1 } = getInitialState({
                        getAdditionalFileOrFolder: () => [referenceFile1],
                        firstReloadFileList: [referenceFile1.path, libFile.path, moduleFile1Path, configFilePath]
                    });

                    verifyProjectChangedEvent([referenceFile1], [libFile, referenceFile1, configFile], [moduleFile1]);
                });

                it("should detect non-existing code file", () => {
                    const referenceFile1: FileOrFolder = {
                        path: "/a/b/referenceFile1.ts",
                        content: `
                    /// <reference path="./moduleFile2.ts" />
                    export var x = Foo();`
                    };
                    const { configFile, moduleFile2, updateContentOfOpenFile, verifyProjectChangedEvent } = getInitialState({
                        getAdditionalFileOrFolder: () => [referenceFile1],
                        firstReloadFileList: [referenceFile1.path, libFile.path, configFilePath]
                    });

                    updateContentOfOpenFile(referenceFile1, referenceFile1.content + "export var yy = Foo();");
                    verifyProjectChangedEvent([referenceFile1], [libFile, referenceFile1, configFile]);

                    // Create module File2 and see both files are saved
                    verifyProjectChangedEvent([referenceFile1, moduleFile2], [libFile, moduleFile2, referenceFile1, configFile]);
                });
            });
        }

        describe("when event handler is set in the session", () => {
            verifyProjectChangedEvent(createSessionWithProjectChangedEventHandler);

            function createSessionWithProjectChangedEventHandler(host: TestServerHost): ProjectChangeEventVerifier {
                const projectChangedEvents: server.ProjectChangedEvent[] = [];
                const session = createSession(host, {
                    eventHandler: e => {
                        if (e.eventName === server.ProjectChangedEvent) {
                            projectChangedEvents.push(e);
                        }
                    }
                });

                return {
                    session,
                    verifyProjectChangedEventHandler,
                    verifyInitialOpen: createVerifyInitialOpen(session, verifyProjectChangedEventHandler)
                };

                function eventToString(event: server.ProjectChangedEvent) {
                    const eventToModify = event && {
                        eventName: event.eventName,
                        data: {
                            project: event.data.project.getProjectName(),
                            changedFiles: event.data.changedFiles,
                            filesToEmit: event.data.filesToEmit
                        }
                    };
                    return JSON.stringify(eventToModify);
                }

                function eventsToString(events: ReadonlyArray<server.ProjectChangedEvent>) {
                    return "[" + map(events, eventToString).join(",") + "]";
                }

                function verifyProjectChangedEventHandler(expectedEvents: ReadonlyArray<server.ProjectChangedEvent>) {
                    assert.equal(projectChangedEvents.length, expectedEvents.length, `Incorrect number of events Actual: ${eventsToString(projectChangedEvents)} Expected: ${eventsToString(expectedEvents)}`);
                    forEach(projectChangedEvents, (actualEvent, i) => {
                        const expectedEvent = expectedEvents[i];
                        assert.strictEqual(actualEvent.eventName, expectedEvent.eventName);
                        assert.strictEqual(actualEvent.data.project, expectedEvent.data.project);
                        verifyFiles("changedFiles", actualEvent.data.changedFiles, expectedEvent.data.changedFiles);
                        verifyFiles("filesToEmit", actualEvent.data.filesToEmit, expectedEvent.data.filesToEmit);
                    });

                    // Verified the events, reset them
                    projectChangedEvents.length = 0;
                }
            }
        });

        describe("when event handler is not set but session is created with canUseEvents = true", () => {
            verifyProjectChangedEvent(createSessionThatUsesEvents);

            function createSessionThatUsesEvents(host: TestServerHost): ProjectChangeEventVerifier {
                const session = createSession(host, { canUseEvents: true });

                return {
                    session,
                    verifyProjectChangedEventHandler,
                    verifyInitialOpen: createVerifyInitialOpen(session, verifyProjectChangedEventHandler)
                };

                function verifyProjectChangedEventHandler(expected: ReadonlyArray<server.ProjectChangedEvent>) {
                    const expectedEvents: protocol.ProjectChangedEventBody[] = map(expected, e => {
                        return {
                            projectName: e.data.project.getProjectName(),
                            changedFiles: e.data.changedFiles,
                            fileNamesToEmit: e.data.filesToEmit
                        };
                    });
                    const outputEventRegex = /Content\-Length: [\d]+\r\n\r\n/;
                    const events: protocol.ProjectStructureChangedEvent[] = filter(
                        map(
                            host.getOutput(), s => convertToObject(
                                ts.parseJsonText("json.json", s.replace(outputEventRegex, "")),
                                []
                            )
                        ),
                        e => e.event === server.ProjectChangedEvent
                    );
                    assert.equal(events.length, expectedEvents.length, `Incorrect number of events Actual: ${map(events, e => e.body)} Expected: ${expectedEvents}`);
                    forEach(events, (actualEvent, i) => {
                        const expectedEvent = expectedEvents[i];
                        assert.strictEqual(actualEvent.body.projectName, expectedEvent.projectName);
                        verifyFiles("changedFiles", actualEvent.body.changedFiles, expectedEvent.changedFiles);
                        verifyFiles("fileNamesToEmit", actualEvent.body.fileNamesToEmit, expectedEvent.fileNamesToEmit);
                    });

                    // Verified the events, reset them
                    host.clearOutput();
                }
            }
        });
    });
}
