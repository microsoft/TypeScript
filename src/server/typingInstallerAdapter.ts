import {
    ApplyCodeActionCommandResult,
    assertType,
    createQueue,
    Debug,
    JsTyping,
    MapLike,
    server,
    SortedReadonlyArray,
    TypeAcquisition,
} from "./_namespaces/ts.js";
import {
    ActionInvalidate,
    ActionPackageInstalled,
    ActionSet,
    ActionWatchTypingLocations,
    BeginInstallTypes,
    createInstallTypingsRequest,
    DiscoverTypings,
    EndInstallTypes,
    Event,
    EventBeginInstallTypes,
    EventEndInstallTypes,
    EventInitializationFailed,
    EventTypesRegistry,
    InitializationFailedResponse,
    InstallPackageOptionsWithProject,
    InstallPackageRequest,
    InvalidateCachedTypings,
    ITypingsInstaller,
    Logger,
    LogLevel,
    PackageInstalledResponse,
    Project,
    ProjectService,
    protocol,
    ServerHost,
    SetTypings,
    stringifyIndented,
    TypesRegistryResponse,
    TypingInstallerRequestUnion,
} from "./_namespaces/ts.server.js";

/** @internal */
export interface TypingsInstallerWorkerProcess {
    send<T extends TypingInstallerRequestUnion>(rq: T): void;
}

interface PackageInstallPromise {
    resolve(value: ApplyCodeActionCommandResult): void;
    reject(reason: unknown): void;
}

/** @internal */
export abstract class TypingsInstallerAdapter implements ITypingsInstaller {
    protected installer!: TypingsInstallerWorkerProcess;
    private projectService!: ProjectService;
    protected activeRequestCount = 0;
    private requestQueue = createQueue<DiscoverTypings>();
    private requestMap = new Map<string, DiscoverTypings>(); // Maps project name to newest requestQueue entry for that project
    /** We will lazily request the types registry on the first call to `isKnownTypesPackageName` and store it in `typesRegistryCache`. */
    private requestedRegistry = false;
    private typesRegistryCache: Map<string, MapLike<string>> | undefined;

    // This number is essentially arbitrary.  Processing more than one typings request
    // at a time makes sense, but having too many in the pipe results in a hang
    // (see https://github.com/nodejs/node/issues/7657).
    // It would be preferable to base our limit on the amount of space left in the
    // buffer, but we have yet to find a way to retrieve that value.
    private static readonly requestDelayMillis = 100;
    private packageInstalledPromise: Map<number, PackageInstallPromise> | undefined;
    private packageInstallId = 0;

    constructor(
        protected readonly telemetryEnabled: boolean,
        protected readonly logger: Logger,
        protected readonly host: ServerHost,
        readonly globalTypingsCacheLocation: string,
        protected event: Event,
        private readonly maxActiveRequestCount: number,
    ) {
    }

    isKnownTypesPackageName(name: string): boolean {
        // We want to avoid looking this up in the registry as that is expensive. So first check that it's actually an NPM package.
        const validationResult = JsTyping.validatePackageName(name);
        if (validationResult !== JsTyping.NameValidationResult.Ok) {
            return false;
        }
        if (!this.requestedRegistry) {
            this.requestedRegistry = true;
            this.installer.send({ kind: "typesRegistry" });
        }
        return !!this.typesRegistryCache?.has(name);
    }

    installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult> {
        this.packageInstallId++;
        const request: InstallPackageRequest = { kind: "installPackage", ...options, id: this.packageInstallId };
        const promise = new Promise<ApplyCodeActionCommandResult>((resolve, reject) => {
            (this.packageInstalledPromise ??= new Map()).set(this.packageInstallId, { resolve, reject });
        });
        this.installer.send(request);
        return promise;
    }

    attach(projectService: ProjectService): void {
        this.projectService = projectService;
        this.installer = this.createInstallerProcess();
    }

    onProjectClosed(p: Project): void {
        this.installer.send({ projectName: p.getProjectName(), kind: "closeProject" });
    }

    enqueueInstallTypingsRequest(project: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>): void {
        const request = createInstallTypingsRequest(project, typeAcquisition, unresolvedImports);
        if (this.logger.hasLevel(LogLevel.verbose)) {
            this.logger.info(`TIAdapter:: Scheduling throttled operation:${stringifyIndented(request)}`);
        }

        if (this.activeRequestCount < this.maxActiveRequestCount) {
            this.scheduleRequest(request);
        }
        else {
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`TIAdapter:: Deferring request for: ${request.projectName}`);
            }
            this.requestQueue.enqueue(request);
            this.requestMap.set(request.projectName, request);
        }
    }

    handleMessage(response: TypesRegistryResponse | PackageInstalledResponse | SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes | InitializationFailedResponse | server.WatchTypingLocations): void {
        if (this.logger.hasLevel(LogLevel.verbose)) {
            this.logger.info(`TIAdapter:: Received response:${stringifyIndented(response)}`);
        }

        switch (response.kind) {
            case EventTypesRegistry:
                this.typesRegistryCache = new Map(Object.entries(response.typesRegistry));
                break;
            case ActionPackageInstalled: {
                const promise = this.packageInstalledPromise?.get(response.id);
                Debug.assertIsDefined(promise, "Should find the promise for package install");
                this.packageInstalledPromise?.delete(response.id);
                if (response.success) {
                    promise.resolve({ successMessage: response.message });
                }
                else {
                    promise.reject(response.message);
                }
                this.projectService.updateTypingsForProject(response);

                // The behavior is the same as for setTypings, so send the same event.
                this.event(response, "setTypings");
                break;
            }
            case EventInitializationFailed: {
                const body: protocol.TypesInstallerInitializationFailedEventBody = {
                    message: response.message,
                };
                const eventName: protocol.TypesInstallerInitializationFailedEventName = "typesInstallerInitializationFailed";
                this.event(body, eventName);
                break;
            }
            case EventBeginInstallTypes: {
                const body: protocol.BeginInstallTypesEventBody = {
                    eventId: response.eventId,
                    packages: response.packagesToInstall,
                };
                const eventName: protocol.BeginInstallTypesEventName = "beginInstallTypes";
                this.event(body, eventName);
                break;
            }
            case EventEndInstallTypes: {
                if (this.telemetryEnabled) {
                    const body: protocol.TypingsInstalledTelemetryEventBody = {
                        telemetryEventName: "typingsInstalled",
                        payload: {
                            installedPackages: response.packagesToInstall.join(","),
                            installSuccess: response.installSuccess,
                            typingsInstallerVersion: response.typingsInstallerVersion,
                        },
                    };
                    const eventName: protocol.TelemetryEventName = "telemetry";
                    this.event(body, eventName);
                }

                const body: protocol.EndInstallTypesEventBody = {
                    eventId: response.eventId,
                    packages: response.packagesToInstall,
                    success: response.installSuccess,
                };
                const eventName: protocol.EndInstallTypesEventName = "endInstallTypes";
                this.event(body, eventName);
                break;
            }
            case ActionInvalidate: {
                this.projectService.updateTypingsForProject(response);
                break;
            }
            case ActionSet: {
                if (this.activeRequestCount > 0) {
                    this.activeRequestCount--;
                }
                else {
                    Debug.fail("TIAdapter:: Received too many responses");
                }

                while (!this.requestQueue.isEmpty()) {
                    const queuedRequest = this.requestQueue.dequeue();
                    if (this.requestMap.get(queuedRequest.projectName) === queuedRequest) {
                        this.requestMap.delete(queuedRequest.projectName);
                        this.scheduleRequest(queuedRequest);
                        break;
                    }

                    if (this.logger.hasLevel(LogLevel.verbose)) {
                        this.logger.info(`TIAdapter:: Skipping defunct request for: ${queuedRequest.projectName}`);
                    }
                }

                this.projectService.updateTypingsForProject(response);
                this.event(response, "setTypings");

                break;
            }
            case ActionWatchTypingLocations:
                this.projectService.watchTypingLocations(response);
                break;
            default:
                assertType<never>(response);
        }
    }

    scheduleRequest(request: DiscoverTypings): void {
        if (this.logger.hasLevel(LogLevel.verbose)) {
            this.logger.info(`TIAdapter:: Scheduling request for: ${request.projectName}`);
        }
        this.activeRequestCount++;
        this.host.setTimeout(
            () => {
                if (this.logger.hasLevel(LogLevel.verbose)) {
                    this.logger.info(`TIAdapter:: Sending request:${stringifyIndented(request)}`);
                }
                this.installer.send(request);
            },
            TypingsInstallerAdapter.requestDelayMillis,
            `${request.projectName}::${request.kind}`,
        );
    }

    protected abstract createInstallerProcess(): TypingsInstallerWorkerProcess;
}
