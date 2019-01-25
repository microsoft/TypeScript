declare namespace ts.server {
    export type ActionSet = "action::set";
    export type ActionInvalidate = "action::invalidate";
    export type ActionPackageInstalled = "action::packageInstalled";
    export type ActionValueInspected = "action::valueInspected";
    export type EventTypesRegistry = "event::typesRegistry";
    export type EventBeginInstallTypes = "event::beginInstallTypes";
    export type EventEndInstallTypes = "event::endInstallTypes";
    export type EventInitializationFailed = "event::initializationFailed";

    export interface TypingInstallerResponse {
        readonly kind: ActionSet | ActionInvalidate | EventTypesRegistry | ActionPackageInstalled | ActionValueInspected | EventBeginInstallTypes | EventEndInstallTypes | EventInitializationFailed;
    }

    export interface TypingInstallerRequestWithProjectName {
        readonly projectName: string;
    }

    /* @internal */
    export type TypingInstallerRequestUnion = DiscoverTypings | CloseProject | TypesRegistryRequest | InstallPackageRequest | InspectValueRequest;

    export interface DiscoverTypings extends TypingInstallerRequestWithProjectName {
        readonly fileNames: string[];
        readonly projectRootPath: Path;
        readonly compilerOptions: CompilerOptions;
        readonly typeAcquisition: TypeAcquisition;
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly cachePath?: string;
        readonly kind: "discover";
    }

    export interface CloseProject extends TypingInstallerRequestWithProjectName {
        readonly kind: "closeProject";
    }

    export interface TypesRegistryRequest {
        readonly kind: "typesRegistry";
    }

    export interface InstallPackageRequest extends TypingInstallerRequestWithProjectName {
        readonly kind: "installPackage";
        readonly fileName: Path;
        readonly packageName: string;
        readonly projectRootPath: Path;
    }

    /* @internal */
    export interface InspectValueRequest {
        readonly kind: "inspectValue";
        readonly options: InspectValueOptions;
    }

    /* @internal */
    export interface TypesRegistryResponse extends TypingInstallerResponse {
        readonly kind: EventTypesRegistry;
        readonly typesRegistry: MapLike<MapLike<string>>;
    }

    export interface PackageInstalledResponse extends ProjectResponse {
        readonly kind: ActionPackageInstalled;
        readonly success: boolean;
        readonly message: string;
    }

    /* @internal */
    export interface InspectValueResponse {
        readonly kind: ActionValueInspected;
        readonly result: ValueInfo;
    }

    export interface InitializationFailedResponse extends TypingInstallerResponse {
        readonly kind: EventInitializationFailed;
        readonly message: string;
    }

    export interface ProjectResponse extends TypingInstallerResponse {
        readonly projectName: string;
    }

    export interface InvalidateCachedTypings extends ProjectResponse {
        readonly kind: ActionInvalidate;
    }

    export interface InstallTypes extends ProjectResponse {
        readonly kind: EventBeginInstallTypes | EventEndInstallTypes;
        readonly eventId: number;
        readonly typingsInstallerVersion: string;
        readonly packagesToInstall: ReadonlyArray<string>;
    }

    export interface BeginInstallTypes extends InstallTypes {
        readonly kind: EventBeginInstallTypes;
    }

    export interface EndInstallTypes extends InstallTypes {
        readonly kind: EventEndInstallTypes;
        readonly installSuccess: boolean;
    }

    /* @internal */
    export interface InstallTypingHost extends JsTyping.TypingResolutionHost {
        useCaseSensitiveFileNames: boolean;
        writeFile(path: string, content: string): void;
        createDirectory(path: string): void;
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher;
    }

    export interface SetTypings extends ProjectResponse {
        readonly typeAcquisition: TypeAcquisition;
        readonly compilerOptions: CompilerOptions;
        readonly typings: string[];
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly kind: ActionSet;
    }

    /* @internal */
    export type TypingInstallerResponseUnion = SetTypings | InvalidateCachedTypings | TypesRegistryResponse | PackageInstalledResponse | InspectValueResponse | InstallTypes | InitializationFailedResponse;
}
