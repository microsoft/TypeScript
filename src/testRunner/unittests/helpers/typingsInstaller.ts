import {
    Logger,
    nowString,
    replaceAll,
    sanitizeLog,
} from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    ActionWatchTypingLocations,
    stringifyIndented,
} from "../../_namespaces/ts.server";
import {
    patchHostTimeouts,
    TestSessionAndServiceHost,
} from "./tsserver";
import {
    changeToHostTrackingWrittenFiles,
    File,
    TestServerHost,
} from "./virtualFileSystemWithWatch";

export const customTypesMap = {
    path: "/typesMap.json" as ts.Path,
    content: `{
            "typesMap": {
                "jquery": {
                    "match": "jquery(-(\\\\.?\\\\d+)+)?(\\\\.intellisense)?(\\\\.min)?\\\\.js$",
                    "types": ["jquery"]
                },
                "quack": {
                    "match": "/duckquack-(\\\\d+)\\\\.min\\\\.js",
                    "types": ["duck-types"]
                }
            },
            "simpleMap": {
                "Bacon": "baconjs",
                "bliss": "blissfuljs",
                "commander": "commander",
                "cordova": "cordova",
                "react": "react",
                "lodash": "lodash"
            }
        }`,
};

export interface PostExecAction {
    readonly success: boolean;
    requestId: number;
    readonly packageNames: readonly string[];
    readonly callback: ts.server.typingsInstaller.RequestCompletedAction;
}
export function loggerToTypingsInstallerLog(logger: Logger): ts.server.typingsInstaller.Log | undefined {
    return logger?.loggingEnabled() ? {
        isEnabled: ts.returnTrue,
        writeLine: s => {
            // This is a VERY VERY NAIVE sanitization strategy.
            // If a substring containing the exact TypeScript version is found,
            // even if it's unrelated to TypeScript itself, then it will be replaced,
            // leaving us with two options:
            //
            //  1. Deal with flip-flopping baselines.
            //  2. Change the TypeScript version until no matching substring is found.
            //
            const initialLog = sanitizeLog(s);
            const pseudoSanitizedLog = replaceAll(initialLog, `@ts${ts.versionMajorMinor}`, `@tsFakeMajor.Minor`);
            return logger.log(`TI:: [${nowString(logger)}] ${pseudoSanitizedLog}`);
        },
    } : undefined;
}
interface TypesRegistryFile {
    entries: ts.MapLike<ts.MapLike<string>>;
}
function loadTypesRegistryFile(typesRegistryFilePath: string, host: TestServerHost, log: ts.server.typingsInstaller.Log): Map<string, ts.MapLike<string>> {
    if (!host.fileExists(typesRegistryFilePath)) {
        if (log.isEnabled()) {
            log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
        }
        return new Map<string, ts.MapLike<string>>();
    }
    try {
        const content = JSON.parse(host.readFile(typesRegistryFilePath)!) as TypesRegistryFile;
        return new Map(Object.entries(content.entries));
    }
    catch (e) {
        if (log.isEnabled()) {
            log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(e as Error).message}, ${(e as Error).stack}`);
        }
        return new Map<string, ts.MapLike<string>>();
    }
}
const typesRegistryPackageName = "types-registry";
function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string {
    return ts.combinePaths(ts.normalizeSlashes(globalTypingsCacheLocation), `node_modules/${typesRegistryPackageName}/index.json`);
}

export type InstallActionThrowingError = string;
export type InstallActionWithTypingFiles = [installedTypings: string[] | string, typingFiles: File[]];
export type CustomInstallAction = (
    installer: TestTypingsInstallerWorker,
    requestId: number,
    packageNames: string[],
    cb: ts.server.typingsInstaller.RequestCompletedAction,
) => void;

export type InstallAction = InstallActionThrowingError | InstallActionWithTypingFiles | CustomInstallAction;
export class TestTypingsInstallerWorker extends ts.server.typingsInstaller.TypingsInstaller {
    readonly typesRegistry: Map<string, ts.MapLike<string>>;
    protected projectService!: ts.server.ProjectService;
    constructor(
        readonly globalTypingsCacheLocation: string,
        throttleLimit: number,
        installTypingHost: TestServerHost,
        logger: Logger,
        typesRegistry: string | readonly string[] | undefined,
        private installAction: InstallAction | undefined,
    ) {
        const log = loggerToTypingsInstallerLog(logger);
        if (log?.isEnabled()) {
            patchHostTimeouts(
                changeToHostTrackingWrittenFiles(installTypingHost),
                logger,
            );
            (installTypingHost as TestSessionAndServiceHost).baselineHost("TI:: Creating typing installer");
        }
        super(
            installTypingHost,
            globalTypingsCacheLocation,
            "/safeList.json" as ts.Path,
            customTypesMap.path,
            throttleLimit,
            log,
        );

        this.ensurePackageDirectoryExists(globalTypingsCacheLocation);

        if (this.log.isEnabled()) {
            this.log.writeLine(`Updating ${typesRegistryPackageName} npm package...`);
            this.log.writeLine(`npm install --ignore-scripts ${typesRegistryPackageName}@${this.latestDistTag}`);
        }
        installTypingHost.ensureFileOrFolder({
            path: getTypesRegistryFileLocation(globalTypingsCacheLocation),
            content: JSON.stringify(
                createTypesRegistryFileContent(
                    typesRegistry ?
                        ts.isString(typesRegistry) ?
                            [typesRegistry] :
                            typesRegistry :
                        ts.emptyArray,
                ),
                undefined,
                " ",
            ),
        });
        if (this.log.isEnabled()) {
            this.log.writeLine(`TI:: Updated ${typesRegistryPackageName} npm package`);
        }
        this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation), installTypingHost, this.log);
        if (this.log.isEnabled()) {
            (installTypingHost as TestSessionAndServiceHost).baselineHost("TI:: typing installer creation complete");
        }
    }

    protected postExecActions: PostExecAction[] = [];

    executePendingCommands() {
        const actionsToRun = this.postExecActions;
        this.postExecActions = [];
        for (const action of actionsToRun) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`#${action.requestId} with arguments'${JSON.stringify(action.packageNames)}':: ${action.success}`);
            }
            action.callback(action.success);
        }
    }

    attach(projectService: ts.server.ProjectService) {
        this.projectService = projectService;
    }

    getInstallTypingHost() {
        return this.installTypingHost;
    }

    installWorker(requestId: number, packageNames: string[], _cwd: string, cb: ts.server.typingsInstaller.RequestCompletedAction): void {
        if (this.log.isEnabled()) {
            this.log.writeLine(`#${requestId} with arguments'${JSON.stringify(packageNames)}'.`);
        }
        if (!this.installAction) {
            this.addPostExecAction("success", requestId, packageNames, cb);
        }
        else if (ts.isString(this.installAction)) {
            assert(false, this.installAction);
        }
        else if (ts.isArray(this.installAction)) {
            this.executeInstallWithTypingFiles(
                requestId,
                packageNames,
                this.installAction[0],
                this.installAction[1],
                cb,
            );
        }
        else {
            this.installAction(this, requestId, packageNames, cb);
        }
    }

    executeInstallWithTypingFiles(
        requestId: number,
        packageNames: string[],
        installedTypings: string[] | string,
        typingFiles: File[],
        cb: ts.server.typingsInstaller.RequestCompletedAction,
    ): void {
        this.addPostExecAction(installedTypings, requestId, packageNames, success => {
            const host = this.getInstallTypingHost() as TestSessionAndServiceHost;
            host.baselineHost("TI:: Before installWorker");
            for (const file of typingFiles) {
                host.ensureFileOrFolder(file);
            }
            host.baselineHost("TI:: After installWorker");
            cb(success);
        });
    }

    sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.WatchTypingLocations) {
        if (this.log.isEnabled()) {
            this.log.writeLine(`Sending response:${stringifyIndented(response)}`);
        }
        if (response.kind !== ActionWatchTypingLocations) this.projectService.updateTypingsForProject(response);
        else this.projectService.watchTypingLocations(response);
    }

    enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
        const request = ts.server.createInstallTypingsRequest(project, typeAcquisition, unresolvedImports, this.globalTypingsCacheLocation);
        this.install(request);
    }

    addPostExecAction(stdout: string | string[], requestId: number, packageNames: string[], cb: ts.server.typingsInstaller.RequestCompletedAction) {
        const out = ts.isString(stdout) ? stdout : createNpmPackageJsonString(stdout);
        const action: PostExecAction = {
            success: !!out,
            requestId,
            packageNames,
            callback: cb,
        };
        this.postExecActions.push(action);
    }
}

export interface TestTypingsInstallerOptions {
    globalTypingsCacheLocation?: string;
    throttleLimit?: number;
    installAction?: InstallAction;
    typesRegistry?: string | readonly string[];
}

export class TestTypingsInstaller implements ts.server.ITypingsInstaller {
    protected projectService!: ts.server.ProjectService;
    public installer!: TestTypingsInstallerWorker;
    readonly globalTypingsCacheLocation: string;
    private readonly throttleLimit: number;
    private installAction?: InstallAction;
    private typesRegistry?: string | readonly string[];

    constructor(
        private installTypingHost: TestServerHost,
        private logger: Logger,
        options?: TestTypingsInstallerOptions,
    ) {
        this.globalTypingsCacheLocation = options?.globalTypingsCacheLocation || this.installTypingHost.getHostSpecificPath("/a/data");
        this.throttleLimit = options?.throttleLimit || 5;
        this.installAction = options?.installAction;
        this.typesRegistry = options?.typesRegistry;
    }

    isKnownTypesPackageName = ts.notImplemented;
    installPackage = ts.notImplemented;

    attach(projectService: ts.server.ProjectService) {
        this.projectService = projectService;
    }

    onProjectClosed(p: ts.server.Project) {
        this.installer?.closeProject({ projectName: p.getProjectName(), kind: "closeProject" });
    }

    enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
        if (!this.installer) {
            this.installer = new TestTypingsInstallerWorker(
                this.globalTypingsCacheLocation,
                this.throttleLimit,
                this.installTypingHost,
                this.logger,
                this.typesRegistry,
                this.installAction,
            );
            this.installer.attach(this.projectService);
        }
        this.installer.enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
    }
}
function createNpmPackageJsonString(installedTypings: string[]): string {
    const dependencies: ts.MapLike<any> = {};
    for (const typing of installedTypings) {
        dependencies[typing] = "1.0.0";
    }
    return JSON.stringify({ dependencies });
}
function createTypesRegistryFileContent(list: readonly string[]): TypesRegistryFile {
    const versionMap = {
        "latest": "1.3.0",
        "ts2.0": "1.0.0",
        "ts2.1": "1.0.0",
        "ts2.2": "1.2.0",
        "ts2.3": "1.3.0",
        "ts2.4": "1.3.0",
        "ts2.5": "1.3.0",
        "ts2.6": "1.3.0",
        "ts2.7": "1.3.0",
    };
    const entries: ts.MapLike<ts.MapLike<string>> = {};
    for (const l of list) {
        entries[l] = versionMap;
    }
    return { entries };
}

export function createTypesRegistry(...list: string[]) {
    return new Map(Object.entries(createTypesRegistryFileContent(list).entries));
}
