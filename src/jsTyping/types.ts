import {
    CompilerOptions,
    JsTyping,
    MapLike,
    Path,
    SortedReadonlyArray,
    TypeAcquisition,
} from "./_namespaces/ts.js";
import {
    ActionInvalidate,
    ActionPackageInstalled,
    ActionSet,
    ActionWatchTypingLocations,
    EventBeginInstallTypes,
    EventEndInstallTypes,
    EventInitializationFailed,
    EventTypesRegistry,
} from "./_namespaces/ts.server.js";

export interface TypingInstallerResponse {
    readonly kind: ActionSet | ActionInvalidate | EventTypesRegistry | ActionPackageInstalled | EventBeginInstallTypes | EventEndInstallTypes | EventInitializationFailed | ActionWatchTypingLocations;
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
    readonly id: number;
}

/** @internal */
export interface TypesRegistryResponse extends TypingInstallerResponse {
    readonly kind: EventTypesRegistry;
    readonly typesRegistry: MapLike<MapLike<string>>;
}

export interface PackageInstalledResponse extends ProjectResponse {
    readonly kind: ActionPackageInstalled;
    readonly id: number;
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
}

export interface SetTypings extends ProjectResponse {
    readonly typeAcquisition: TypeAcquisition;
    readonly compilerOptions: CompilerOptions;
    readonly typings: string[];
    readonly unresolvedImports: SortedReadonlyArray<string>;
    readonly kind: ActionSet;
}

export interface WatchTypingLocations extends ProjectResponse {
    /** if files is undefined, retain same set of watchers */
    readonly files: readonly string[] | undefined;
    readonly kind: ActionWatchTypingLocations;
}

/** @internal */
export type TypingInstallerResponseUnion = SetTypings | InvalidateCachedTypings | TypesRegistryResponse | PackageInstalledResponse | InstallTypes | InitializationFailedResponse | WatchTypingLocations;
