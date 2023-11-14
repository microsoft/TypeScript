import {
    LoggerWithInMemoryLogs,
    nowString,
} from "../../../harness/tsserverLogger";
import * as ts from "../../_namespaces/ts";
import {
    ActionInvalidate,
    ActionPackageInstalled,
    ActionSet,
    ActionWatchTypingLocations,
    EventBeginInstallTypes,
    EventEndInstallTypes,
    stringifyIndented,
} from "../../_namespaces/ts.server";
import {
    jsonToReadableText,
} from "../helpers";
import {
    TestSession,
} from "./tsserver";
import {
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

export function loggerToTypingsInstallerLog(logger: LoggerWithInMemoryLogs): ts.server.typingsInstaller.Log {
    ts.Debug.assert(logger.loggingEnabled());
    return {
        isEnabled: ts.returnTrue,
        writeLine: s => logger.log(`TI:: [${nowString(logger)}] ${s}`),
    };
}
interface TypesRegistryFile {
    entries: ts.MapLike<ts.MapLike<string>>;
}
function loadTypesRegistryFile(typesRegistryFilePath: string, host: TestServerHost, log: ts.server.typingsInstaller.Log): Map<string, ts.MapLike<string>> {
    if (!host.fileExists(typesRegistryFilePath)) {
        log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
        return new Map<string, ts.MapLike<string>>();
    }
    try {
        const content = JSON.parse(host.readFile(typesRegistryFilePath)!) as TypesRegistryFile;
        return new Map(Object.entries(content.entries));
    }
    catch (e) {
        log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(e as Error).message}, ${(e as Error).stack}`);
        return new Map<string, ts.MapLike<string>>();
    }
}
const typesRegistryPackageName = "types-registry";
function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string {
    return ts.combinePaths(ts.normalizeSlashes(globalTypingsCacheLocation), `node_modules/${typesRegistryPackageName}/index.json`);
}

export interface FileWithPackageName extends File {
    package?: string;
}
export type InstallActionThrowingError = string;
export type InstallActionWithSuccess = boolean;
export type InstallActionWithTypingFiles = readonly FileWithPackageName[];
export type InstallAction = InstallActionThrowingError | InstallActionWithSuccess | InstallActionWithTypingFiles;
export type PendingInstallCallback = (
    pendingInstallInfo: string,
    installedTypingsOrSuccess: string[] | string | boolean,
    typingFiles: readonly File[],
    onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction,
) => void;
export class TestTypingsInstallerWorker extends ts.server.typingsInstaller.TypingsInstaller {
    readonly typesRegistry: Map<string, ts.MapLike<string>>;
    constructor(readonly testTypingInstaller: TestTypingsInstaller) {
        const log = loggerToTypingsInstallerLog(testTypingInstaller.session.logger);
        ts.Debug.assert(testTypingInstaller.session.host.patched);
        testTypingInstaller.session.host.baselineHost("TI:: Creating typing installer");
        super(
            testTypingInstaller.session.host,
            testTypingInstaller.globalTypingsCacheLocation,
            "/safeList.json" as ts.Path,
            customTypesMap.path,
            testTypingInstaller.throttleLimit,
            log,
        );

        this.ensurePackageDirectoryExists(testTypingInstaller.globalTypingsCacheLocation);

        this.log.writeLine(`Updating ${typesRegistryPackageName} npm package...`);
        this.log.writeLine(`npm install --ignore-scripts ${typesRegistryPackageName}@${this.latestDistTag}`);
        testTypingInstaller.session.host.ensureFileOrFolder({
            path: getTypesRegistryFileLocation(testTypingInstaller.globalTypingsCacheLocation),
            content: jsonToReadableText(createTypesRegistryFileContent(
                testTypingInstaller.typesRegistry ?
                    ts.isString(testTypingInstaller.typesRegistry) ?
                        [testTypingInstaller.typesRegistry] :
                        testTypingInstaller.typesRegistry :
                    ts.emptyArray,
            )),
        });
        this.log.writeLine(`Updated ${typesRegistryPackageName} npm package`);

        this.typesRegistry = loadTypesRegistryFile(
            getTypesRegistryFileLocation(testTypingInstaller.globalTypingsCacheLocation),
            testTypingInstaller.session.host,
            this.log,
        );
        testTypingInstaller.session.host.baselineHost("TI:: typing installer creation complete");
    }

    installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction): void {
        this.log.writeLine(`#${requestId} with cwd: ${cwd} arguments: ${jsonToReadableText(packageNames)}`);
        if (typeof this.testTypingInstaller.installAction === "boolean") {
            this.scheduleInstall(
                requestId,
                packageNames,
                this.testTypingInstaller.installAction,
                ts.emptyArray,
                onRequestCompleted,
            );
        }
        else if (ts.isString(this.testTypingInstaller.installAction)) {
            assert(false, this.testTypingInstaller.installAction);
        }
        else {
            const typingFiles = this.testTypingInstaller.installAction.filter(f => !f.package || packageNames.includes(ts.server.typingsInstaller.typingsName(f.package)));
            this.scheduleInstall(
                requestId,
                packageNames,
                /*success*/ true,
                typingFiles,
                onRequestCompleted,
            );
        }
    }

    private scheduleInstall(
        requestId: number,
        packageNames: string[],
        success: boolean,
        typingFiles: readonly File[],
        onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction,
    ): void {
        this.testTypingInstaller.session.host.scheduleInstall(
            pendingInstallInfo => {
                for (const file of typingFiles) {
                    this.testTypingInstaller.session.host.ensureFileOrFolder(file);
                }
                this.testTypingInstaller.session.host.baselineHost(`TI:: Installation ${pendingInstallInfo} complete with success::${!!success}`);
                onRequestCompleted(!!success);
            },
            `#${requestId} with arguments:: ${jsonToReadableText(packageNames)}`,
        );
    }

    sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes | ts.server.WatchTypingLocations | ts.server.PackageInstalledResponse) {
        this.log.writeLine(`Sending response:${stringifyIndented(response)}`);
        this.testTypingInstaller.onResponse(response);
    }

    enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
        const request = ts.server.createInstallTypingsRequest(
            project,
            typeAcquisition,
            unresolvedImports,
            this.testTypingInstaller.globalTypingsCacheLocation,
        );
        this.install(request);
    }
}

export interface TestTypingsInstallerOptions {
    host: TestServerHost;
    logger?: LoggerWithInMemoryLogs;
    globalTypingsCacheLocation?: string;
    throttleLimit?: number;
    installAction?: InstallAction;
    typesRegistry?: string | readonly string[];
}

export class TestTypingsInstaller implements ts.server.ITypingsInstaller {
    protected projectService!: ts.server.ProjectService;
    public installer!: TestTypingsInstallerWorker;
    session!: TestSession;
    packageInstalledPromise: { resolve(value: ts.ApplyCodeActionCommandResult): void; reject(reason: unknown): void; } | undefined;

    // Options
    readonly globalTypingsCacheLocation: string;
    readonly throttleLimit: number;
    readonly installAction: InstallAction;
    readonly typesRegistry: string | readonly string[] | undefined;

    constructor(options: TestTypingsInstallerOptions) {
        this.globalTypingsCacheLocation = options.globalTypingsCacheLocation || options.host.getHostSpecificPath("/a/data");
        this.throttleLimit = options.throttleLimit || 5;
        this.installAction = options.installAction !== undefined ? options.installAction : true;
        this.typesRegistry = options.typesRegistry;
    }

    isKnownTypesPackageName(name: string): boolean {
        // We want to avoid looking this up in the registry as that is expensive. So first check that it's actually an NPM package.
        const validationResult = ts.JsTyping.validatePackageName(name);
        if (validationResult !== ts.JsTyping.NameValidationResult.Ok) {
            return false;
        }

        return this.ensureInstaller().typesRegistry.has(name);
    }

    installPackage(options: ts.server.InstallPackageOptionsWithProject): Promise<ts.ApplyCodeActionCommandResult> {
        this.ensureInstaller().installPackage({ kind: "installPackage", ...options });
        ts.Debug.assert(this.packageInstalledPromise === undefined);
        return new Promise<ts.ApplyCodeActionCommandResult>((resolve, reject) => {
            this.packageInstalledPromise = { resolve, reject };
        });
    }

    attach(projectService: ts.server.ProjectService) {
        this.projectService = projectService;
    }

    onProjectClosed(p: ts.server.Project) {
        this.installer?.closeProject({ projectName: p.getProjectName(), kind: "closeProject" });
    }

    enqueueInstallTypingsRequest(project: ts.server.Project, typeAcquisition: ts.TypeAcquisition, unresolvedImports: ts.SortedReadonlyArray<string>) {
        this.ensureInstaller().enqueueInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
    }

    private ensureInstaller() {
        return this.installer ??= new TestTypingsInstallerWorker(this);
    }

    onResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes | ts.server.WatchTypingLocations | ts.server.PackageInstalledResponse) {
        switch (response.kind) {
            case ActionPackageInstalled: {
                const { success, message } = response;
                if (success) {
                    this.packageInstalledPromise!.resolve({ successMessage: message });
                }
                else {
                    this.packageInstalledPromise!.reject(message);
                }
                this.packageInstalledPromise = undefined;

                this.projectService.updateTypingsForProject(response);
                // The behavior is the same as for setTypings, so send the same event.
                this.session.event(response, "setTypings");
                break;
            }
            case EventBeginInstallTypes: {
                const body: ts.server.protocol.BeginInstallTypesEventBody = {
                    eventId: response.eventId,
                    packages: response.packagesToInstall,
                };
                const eventName: ts.server.protocol.BeginInstallTypesEventName = "beginInstallTypes";
                this.session.event(body, eventName);
                break;
            }
            case EventEndInstallTypes: {
                const body: ts.server.protocol.EndInstallTypesEventBody = {
                    eventId: response.eventId,
                    packages: response.packagesToInstall,
                    success: response.installSuccess,
                };
                const eventName: ts.server.protocol.EndInstallTypesEventName = "endInstallTypes";
                this.session.event(body, eventName);
                break;
            }
            case ActionInvalidate: {
                this.projectService.updateTypingsForProject(response);
                break;
            }
            case ActionSet: {
                this.projectService.updateTypingsForProject(response);
                this.session.event(response, "setTypings");
                break;
            }
            case ActionWatchTypingLocations:
                this.projectService.watchTypingLocations(response);
                break;
            default:
                ts.assertType<never>(response);
        }
    }
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
