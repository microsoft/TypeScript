import {
    LoggerWithInMemoryLogs,
    nowString,
} from "../../../harness/tsserverLogger.js";
import * as ts from "../../_namespaces/ts.js";
import { stringifyIndented } from "../../_namespaces/ts.server.js";
import { jsonToReadableText } from "../helpers.js";
import { getPathForTypeScriptTestLocation } from "./contents.js";
import { TestSession } from "./tsserver.js";
import {
    File,
    TestServerHost,
} from "./virtualFileSystemWithWatch.js";

export const customTypesMap: File = {
    path: getPathForTypeScriptTestLocation("typesMap.json"),
    content: jsonToReadableText({
        typesMap: {
            jquery: {
                match: "jquery(-(\\.?\\d+)+)?(\\.intellisense)?(\\.min)?\\.js$",
                types: ["jquery"],
            },
            quack: {
                match: "/duckquack-(\\d+)\\.min\\.js",
                types: ["duck-types"],
            },
        },
        simpleMap: {
            Bacon: "baconjs",
            bliss: "blissfuljs",
            commander: "commander",
            cordova: "cordova",
            react: "react",
            lodash: "lodash",
        },
    }),
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
export function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string {
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
    constructor(readonly testTypingInstaller: TestTypingsInstallerAdapter) {
        const log = loggerToTypingsInstallerLog(testTypingInstaller.session.logger);
        ts.Debug.assert(testTypingInstaller.session.host.patched);
        testTypingInstaller.session.host.baselineHost("TI:: Creating typing installer");
        super(
            testTypingInstaller.session.host,
            testTypingInstaller.globalTypingsCacheLocation,
            getPathForTypeScriptTestLocation("typingSafeList.json") as ts.Path,
            customTypesMap.path as ts.Path,
            testTypingInstaller.throttleLimit,
            log,
        );

        this.ensurePackageDirectoryExists(testTypingInstaller.globalTypingsCacheLocation);

        this.log.writeLine(`Updating ${typesRegistryPackageName} npm package...`);
        this.log.writeLine(`npm install --ignore-scripts ${typesRegistryPackageName}@${this.latestDistTag}`);
        testTypingInstaller.session.host.ensureTypingRegistryFile();
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

    sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes | ts.server.WatchTypingLocations | ts.server.PackageInstalledResponse): void {
        this.log.writeLine(`Sending response:${stringifyIndented(response)}`);
        this.testTypingInstaller.handleMessage(response);
    }
}

export interface TestTypingsInstallerOptions {
    host: TestServerHost;
    logger?: LoggerWithInMemoryLogs;
    throttleLimit?: number;
    installAction?: InstallAction;
    throttledRequests?: number;
}

export class TestTypingsInstallerAdapter extends ts.server.TypingsInstallerAdapter {
    worker: TestTypingsInstallerWorker | undefined;
    session!: TestSession;
    // Options
    readonly throttleLimit: number;
    readonly installAction: InstallAction;
    readonly throttledRequests: number | undefined;

    constructor(options: TestTypingsInstallerOptions) {
        super(
            /*telemetryEnabled*/ false,
            options.throttledRequests === undefined ?
                { ...options.logger!, hasLevel: ts.returnFalse } :
                options.logger!,
            options.host,
            options.host.globalTypingsCacheLocation,
            (...args) => this.session.event(...args),
            // Some large number so requests arent throttled
            options.throttledRequests === undefined ? 10 : options.throttledRequests,
        );
        this.throttleLimit = options.throttleLimit || 5;
        this.installAction = options.installAction !== undefined ? options.installAction : true;
        this.throttledRequests = options.throttledRequests;
    }

    protected override createInstallerProcess(): ts.server.TypingsInstallerWorkerProcess {
        return {
            send: req => (this.worker ??= new TestTypingsInstallerWorker(this)).handleRequest(req),
        };
    }

    override scheduleRequest(request: ts.server.DiscoverTypings): void {
        if (this.throttledRequests === undefined) {
            this.activeRequestCount++;
            this.installer.send(request);
        }
        else {
            super.scheduleRequest(request);
        }
    }
}

export function createTypesRegistryFileContent(list: readonly string[]): TypesRegistryFile {
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

export function createTypesRegistry(...list: string[]): Map<string, ts.MapLike<string>> {
    return new Map(Object.entries(createTypesRegistryFileContent(list).entries));
}
