/*@internal*/

/// <reference lib="webworker" />

namespace ts.server {
    export interface HostWithWriteMessage {
        writeMessage(s: any): void;
    }
    export interface WebHost extends HostWithWriteMessage {
        readFile(path: string): string | undefined;
        fileExists(path: string): boolean;
    }

    export class BaseLogger implements Logger {
        private seq = 0;
        private inGroup = false;
        private firstInGroup = true;
        constructor(protected readonly level: LogLevel) {
        }
        static padStringRight(str: string, padding: string) {
            return (str + padding).slice(0, padding.length);
        }
        close() {
        }
        getLogFileName(): string | undefined {
            return undefined;
        }
        perftrc(s: string) {
            this.msg(s, Msg.Perf);
        }
        info(s: string) {
            this.msg(s, Msg.Info);
        }
        err(s: string) {
            this.msg(s, Msg.Err);
        }
        startGroup() {
            this.inGroup = true;
            this.firstInGroup = true;
        }
        endGroup() {
            this.inGroup = false;
        }
        loggingEnabled() {
            return true;
        }
        hasLevel(level: LogLevel) {
            return this.loggingEnabled() && this.level >= level;
        }
        msg(s: string, type: Msg = Msg.Err) {
            switch (type) {
                case Msg.Info:
                    perfLogger.logInfoEvent(s);
                    break;
                case Msg.Perf:
                    perfLogger.logPerfEvent(s);
                    break;
                default: // Msg.Err
                    perfLogger.logErrEvent(s);
                    break;
            }

            if (!this.canWrite()) return;

            s = `[${nowString()}] ${s}\n`;
            if (!this.inGroup || this.firstInGroup) {
                const prefix = BaseLogger.padStringRight(type + " " + this.seq.toString(), "          ");
                s = prefix + s;
            }
            this.write(s, type);
            if (!this.inGroup) {
                this.seq++;
            }
        }
        protected canWrite() {
            return true;
        }
        protected write(_s: string, _type: Msg) {
        }
    }

    export type MessageLogLevel = "info" | "perf" | "error";
    export interface LoggingMessage {
        readonly type: "log";
        readonly level: MessageLogLevel;
        readonly body: string
    }
    export class MainProcessLogger extends BaseLogger {
        constructor(level: LogLevel, private host: HostWithWriteMessage) {
            super(level);
        }
        protected write(body: string, type: Msg) {
            let level: MessageLogLevel;
            switch (type) {
                case Msg.Info:
                    level = "info";
                    break;
                case Msg.Perf:
                    level = "perf";
                    break;
                case Msg.Err:
                    level = "error";
                    break;
                default:
                    Debug.assertNever(type);
            }
            this.host.writeMessage({
                type: "log",
                level,
                body,
            } as LoggingMessage);
        }
    }

    export function createWebSystem(host: WebHost, args: string[], getExecutingFilePath: () => string): ServerHost {
        const returnEmptyString = () => "";
        const getExecutingDirectoryPath = memoize(() => memoize(() => ensureTrailingDirectorySeparator(getDirectoryPath(getExecutingFilePath()))));
        // Later we could map ^memfs:/ to do something special if we want to enable more functionality like module resolution or something like that
        const getWebPath = (path: string) => startsWith(path, directorySeparator) ? path.replace(directorySeparator, getExecutingDirectoryPath()) : undefined;
        return {
            args,
            newLine: "\r\n", // This can be configured by clients
            useCaseSensitiveFileNames: false, // Use false as the default on web since that is the safest option
            readFile: path => {
                const webPath = getWebPath(path);
                return webPath && host.readFile(webPath);
            },
            write: host.writeMessage.bind(host),
            watchFile: returnNoopFileWatcher,
            watchDirectory: returnNoopFileWatcher,

            getExecutingFilePath: () => directorySeparator,
            getCurrentDirectory: returnEmptyString, // For inferred project root if projectRoot path is not set, normalizing the paths

            /* eslint-disable no-restricted-globals */
            setTimeout: (cb, ms, ...args) => setTimeout(cb, ms, ...args),
            clearTimeout: handle => clearTimeout(handle),
            setImmediate: x => setTimeout(x, 0),
            clearImmediate: handle => clearTimeout(handle),
            /* eslint-enable no-restricted-globals */

            require: () => ({ module: undefined, error: new Error("Not implemented") }),
            exit: notImplemented,

            // Debugging related
            getEnvironmentVariable: returnEmptyString, // TODO:: Used to enable debugging info
            // tryEnableSourceMapsForHost?(): void;
            // debugMode?: boolean;

            // For semantic server mode
            fileExists: path => {
                const webPath = getWebPath(path);
                return !!webPath && host.fileExists(webPath);
            },
            directoryExists: returnFalse, // Module resolution
            readDirectory: notImplemented, // Configured project, typing installer
            getDirectories: () => [], // For automatic type reference directives
            createDirectory: notImplemented, // compile On save
            writeFile: notImplemented, // compile on save
            resolvePath: identity, // Plugins
            // realpath? // Module resolution, symlinks
            // getModifiedTime // File watching
            // createSHA256Hash // telemetry of the project

            // Logging related
            // /*@internal*/ bufferFrom?(input: string, encoding?: string): Buffer;
            // gc?(): void;
            // getMemoryUsage?(): number;
        };
    }

    export interface StartSessionOptions {
        globalPlugins: SessionOptions["globalPlugins"];
        pluginProbeLocations: SessionOptions["pluginProbeLocations"];
        allowLocalPluginLoads: SessionOptions["allowLocalPluginLoads"];
        useSingleInferredProject: SessionOptions["useSingleInferredProject"];
        useInferredProjectPerProjectRoot: SessionOptions["useInferredProjectPerProjectRoot"];
        suppressDiagnosticEvents: SessionOptions["suppressDiagnosticEvents"];
        noGetErrOnBackgroundUpdate: SessionOptions["noGetErrOnBackgroundUpdate"];
        syntaxOnly: SessionOptions["syntaxOnly"];
        serverMode: SessionOptions["serverMode"];
    }

    interface ATADownload {
        readonly moduleName: string
        readonly moduleVersion: string
        readonly vfsPath: string
        readonly path: string
    }

    interface NPMTreeMeta {
        readonly default: string;
        readonly files: readonly { readonly name: string }[];
        readonly moduleName: string;
        readonly version: string;
    }

    interface ATAError {
        readonly error: Error;
        readonly userFacingMessage: string;
    }


    /**
     * Typings installer that runs in browsers. Stores typings files in memory.
     *
     * Code modified from: https://www.npmjs.com/package/@typescript/ata
     */
    class WebTypingsInstaller implements ITypingsInstaller {

        private projectService?: ProjectService;

        private readonly fsMap = new Map<string, string>();

        private readonly acquiredTypings = new Map<string, Promise<NPMTreeMeta | ATAError>>();

        constructor(
            private readonly logger: Logger
        ) { }

        //#region ITypingsInstaller

        // TODO: What should this be?
        public readonly globalTypingsCacheLocation: string | undefined;

        public isKnownTypesPackageName(name: string): boolean {
            // TODO: implement this
            this.logger.info(`isKnownTypesPackageName ${name}`);
            return false;
        }

        public async installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult> {
            if (!this.projectService) {
                throw new Error("No project service");
            }

            // TODO: Can this be implemented on web? Probably not but is throwing an error ok here?

            console.log("install", options.projectName);

            return {
                successMessage: "test",
            };
        }

        public async enqueueInstallTypingsRequest(p: Project, _typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string> | undefined): Promise<void> {
            if (!unresolvedImports?.length) {
                return;
            }

            const allDeps = unresolvedImports.map(x => ({ module: x, version: undefined }));
            await this.installDeps(p, allDeps);

            // TODO: proper response
            const response: PackageInstalledResponse = {
                kind: "action::packageInstalled",
                success: true,
                message: "",
                projectName: ""
            };

            this.projectService!.updateTypingsForProject(response);
        }

        public attach(projectService: ProjectService): void {
            this.projectService = projectService;
        }

        public onProjectClosed(_p: Project): void {
            // noop
        }

        // #endregion

        private async installDeps(p: Project, depsToGet: readonly { readonly module: string; readonly version: undefined; }[]) {
            const existingDepsTasks = depsToGet.map(async dep => {
                await this.acquiredTypings.get(dep.module);
            });

            const newDeps = depsToGet.filter(dep => !this.acquiredTypings.has(dep.module));

            const installTasks: Promise<NPMTreeMeta | ATAError>[] = [];
            for (const dep of newDeps) {
                const task = this.getFileTreeForModuleWithTag(dep.module, dep.version);
                installTasks.push(task);
                this.acquiredTypings.set(dep.module, task);
            }

            // Grab the module trees which gives us a list of files to download
            const trees = await Promise.all(installTasks);
            const treesOnly = trees.filter(t => !("error" in t)) as NPMTreeMeta[];

            // These are the modules which we can grab directly
            const hasDTS = treesOnly.filter(t => t.files.find(f => f.name.endsWith(".d.ts")));
            const dtsFilesFromNPM = hasDTS.map(t => this.treeToDTSFiles(t, `/node_modules/${t.moduleName}`));

            // These are ones we need to look on DT for (which may not be there, who knows)
            const mightBeOnDT = treesOnly.filter(t => !hasDTS.includes(t));
            const dtTrees = await Promise.all(
                // TODO: Switch from 'latest' to the version from the original tree which is user-controlled
                mightBeOnDT.map(f => this.getFileTreeForModuleWithTag(`@types/${this.getDTName(f.moduleName)}`, "latest"))
            );

            const dtTreesOnly = dtTrees.filter(t => !("error" in t)) as NPMTreeMeta[];
            const dtsFilesFromDT = dtTreesOnly.map(t => this.treeToDTSFiles(t, `/node_modules/@types/${this.getDTName(t.moduleName).replace("types__", "")}`));

            // Collect all the npm and DT DTS requests and flatten their arrays
            const allDTSFiles = dtsFilesFromNPM.concat(dtsFilesFromDT).reduce((p, c) => p.concat(c), []);

            // Grab the package.jsons for each dependency
            for (const tree of treesOnly) {
                let prefix = `/node_modules/${tree.moduleName}`;
                if (dtTreesOnly.includes(tree)) {
                    prefix = `/node_modules/@types/${this.getDTName(tree.moduleName).replace("types__", "")}`;
                }

                const path = prefix + "/package.json";
                const pkgJSON = await this.getDTSFileForModuleWithVersion(tree.moduleName, tree.version, "/package.json");

                if (typeof pkgJSON === "string") {
                    this.fsMap.set(path, pkgJSON);
                }
                else {
                    this.logger.info(`Could not download package.json for ${tree.moduleName}`);
                }
            }

            // Grab all dts files
            await Promise.all([
                ...existingDepsTasks,
                ...allDTSFiles.map(async (dts) => {
                    const dtsCode = await this.getDTSFileForModuleWithVersion(dts.moduleName, dts.moduleVersion, dts.path);
                    if (dtsCode instanceof Error) {
                        this.logger.info(`Had an issue getting ${dts.path} for ${dts.moduleName}`);
                    }
                    else {
                        const root = p.getRootFiles();

                        // TODO: Not sure how to get the d.ts into the project correctly.
                        const path = root[0].replace(/\/\w+.js/, dts.vfsPath);
                        this.projectService!.openClientFile(path, dtsCode, ScriptKind.TS, "/sample-folder");

                        this.fsMap.set(dts.vfsPath, dtsCode);
                    }
                })
            ]);
        }

        private async getDTSFileForModuleWithVersion(moduleName: string, version: string, file: string) {
            // file comes with a prefix /
            const url = `https://cdn.jsdelivr.net/npm/${moduleName}@${version}${file}`;
            const f = fetch;
            const res = await f(url);
            if (res.ok) {
                return res.text();
            }
            else {
                return new Error("OK");
            }
        }

        private api<T>(url: string, init?: any /*RequestInit*/): Promise<T | Error> {
            const f = fetch;

            return f(url, init).then((res: any) => {
                if (res.ok) {
                    return res.json().then((f: any) => f as T);
                }
                else {
                    return new Error("OK");
                }
            });
        }

        // Taken from dts-gen: https://github.com/microsoft/dts-gen/blob/master/lib/names.ts
        private getDTName(s: string) {
            if (s.indexOf("@") === 0 && s.indexOf("/") !== -1) {
                // we have a scoped module, e.g. @bla/foo
                // which should be converted to   bla__foo
                s = s.substr(1).replace("/", "__");
            }
            return s;
        }

        private async getFileTreeForModuleWithTag(moduleName: string, tag: string | undefined
        ): Promise<NPMTreeMeta | ATAError> {
            let toDownload = tag || "latest";

            // I think having at least 2 dots is a reasonable approx for being a semver and not a tag,
            // we can skip an API request, TBH this is probably rare
            if (toDownload.split(".").length < 2) {
                // The jsdelivr API needs a _version_ not a tag. So, we need to switch out
                // the tag to the version via an API request.
                const response = await this.getNPMVersionForModuleReference(moduleName, toDownload);
                if (response instanceof Error) {
                    return {
                        error: response,
                        userFacingMessage: `Could not go from a tag to version on npm for ${moduleName} - possible typo?`,
                    };
                }

                const neededVersion = response.version;
                if (!neededVersion) {
                    const versions = await this.getNPMVersionsForModule(moduleName);
                    if (versions instanceof Error) {
                        return {
                            error: versions,
                            userFacingMessage: `Could not get versions on npm for ${moduleName} - possible typo?`,
                        };
                    }

                    const tags = Object.entries(versions.tags).join(", ");
                    return {
                        error: new Error("Could not find tag for module"),
                        userFacingMessage: `Could not find a tag for ${moduleName} called ${tag}. Did find ${tags}`,
                    };
                }

                toDownload = neededVersion;
            }

            const res = await this.getFiletreeForModuleWithVersion(moduleName, toDownload);
            if (res instanceof Error) {
                return {
                    error: res,
                    userFacingMessage: `Could not get the files for ${moduleName}@${toDownload}. Is it possibly a typo?`,
                };
            }

            return res;
        }

        private async getFiletreeForModuleWithVersion(moduleName: string, version: string) {
            const url = `https://data.jsdelivr.com/v1/package/npm/${moduleName}@${version}/flat`;
            const res = await this.api<NPMTreeMeta>(url);
            if (res instanceof Error) {
                return res;
            }
            else {
                return {
                    ...res,
                    moduleName,
                    version,
                };
            }
        }

        private treeToDTSFiles(tree: NPMTreeMeta, vfsPrefix: string) {
            const dtsRefs: ATADownload[] = [];

            for (const file of tree.files) {
                if (file.name.endsWith(".d.ts")) {
                    dtsRefs.push({
                        moduleName: tree.moduleName,
                        moduleVersion: tree.version,
                        vfsPath: `${vfsPrefix}${file.name}`,
                        path: file.name,
                    });
                }
            }
            return dtsRefs;
        }

        //  https://github.com/jsdelivr/data.jsdelivr.com

        private getNPMVersionsForModule(moduleName: string) {
            const url = `https://data.jsdelivr.com/v1/package/npm/${moduleName}`;
            return this.api<{ tags: Record<string, string>; versions: string[] }>(url, { cache: "no-store" });
        }

        private getNPMVersionForModuleReference(moduleName: string, reference: string) {
            const url = `https://data.jsdelivr.com/v1/package/resolve/npm/${moduleName}@${reference}`;
            return this.api<{ version: string | null }>(url);
        }
    }

    export class WorkerSession extends Session<{}> {
        constructor(host: ServerHost, private webHost: HostWithWriteMessage, options: StartSessionOptions, logger: Logger, cancellationToken: ServerCancellationToken, hrtime: SessionOptions["hrtime"]) {
            super({
                host,
                cancellationToken,
                ...options,
                typingsInstaller: new WebTypingsInstaller(logger),
                byteLength: notImplemented, // Formats the message text in send of Session which is overriden in this class so not needed
                hrtime,
                logger,
                canUseEvents: true,
            });
        }

        public send(msg: protocol.Message) {
            if (msg.type === "event" && !this.canUseEvents) {
                if (this.logger.hasLevel(LogLevel.verbose)) {
                    this.logger.info(`Session does not support events: ignored event: ${JSON.stringify(msg)}`);
                }
                return;
            }
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`${msg.type}:${indent(JSON.stringify(msg))}`);
            }
            this.webHost.writeMessage(msg);
        }

        protected parseMessage(message: {}): protocol.Request {
            return message as protocol.Request;
        }

        protected toStringMessage(message: {}) {
            return JSON.stringify(message, undefined, 2);
        }
    }
}
