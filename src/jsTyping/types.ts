import {
    CompilerOptions,
    DirectoryWatcherCallback,
    FileWatcher,
    FileWatcherCallback,
    JsTyping,
    MapLike,
    Path,
    SortedReadonlyArray,
    TypeAcquisition,
    WatchOptions,
} from "./_namespaces/ts";
import {
    ActionInvalidate,
    ActionPackageInstalled,
    ActionSet,
    EventBeginInstallTypes,
    EventEndInstallTypes,
    EventInitializationFailed,
    EventTypesRegistry,
} from "./_namespaces/ts.server";

export interface TypingInstallerResponse {
    readonly kind: ActionSet | ActionInvalidate | EventTypesRegistry | ActionPackageInstalled | EventBeginInstallTypes | EventEndInstallTypes | EventInitializationFailed;
}

export interface TypingInstallerRequestWithProjectName {
    readonly projectName: string;
}

/** @internal */
export type TypingInstallerRequestUnion = DiscoverTypings | CloseProject | TypesRegistryRequest | InstallPackageRequest;

export interface DiscoverTypings extends TypingInstallerRequestWithProjectName {
    readonly fileNames: string[];
    readonly projectRootPath: Path;
    readonly compilerOptions: CompilerOptions;
    readonly watchOptions?: WatchOptions;
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

/** @internal */
export interface TypesRegistryResponse extends TypingInstallerResponse {
    readonly kind: EventTypesRegistry;
    readonly typesRegistry: MapLike<MapLike<string>>;
}

export interface PackageInstalledResponse extends ProjectResponse {
    readonly kind: ActionPackageInstalled;
    readonly success: boolean;
    readonly message: string;
}

export interface InitializationFailedResponse extends TypingInstallerResponse {
    readonly kind: EventInitializationFailed;
    readonly message: string;
    readonly stack?: string;
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
    readonly packagesToInstall: readonly string[];
}

export interface BeginInstallTypes extends InstallTypes {
    readonly kind: EventBeginInstallTypes;
}

export interface EndInstallTypes extends InstallTypes {
    readonly kind: EventEndInstallTypes;
    readonly installSuccess: boolean;
}

export interface InstallTypingHost extends JsTyping.TypingResolutionHost {
    useCaseSensitiveFileNames: boolean;
    writeFile(path: string, content: string): void;
    createDirectory(path: string): void;
    getCurrentDirectory?(): string;
    watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
    watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
}

export interface SetTypings extends ProjectResponse {
    readonly typeAcquisition: TypeAcquisition;
    readonly compilerOptions: CompilerOptions;
    readonly typings: string[];
    readonly unresolvedImports: SortedReadonlyArray<string>;
    readonly kind: ActionSet;
}

/** @internal */
export type TypingInstallerResponseUnion = SetTypings | InvalidateCachedTypings | TypesRegistryResponse | PackageInstalledResponse | InstallTypes | InitializationFailedResponse;
