import * as ts from "./_namespaces/ts";

export interface TypingInstallerResponse {
    readonly kind: ts.server.ActionSet | ts.server.ActionInvalidate | ts.server.EventTypesRegistry | ts.server.ActionPackageInstalled | ts.server.EventBeginInstallTypes | ts.server.EventEndInstallTypes | ts.server.EventInitializationFailed;
}

export interface TypingInstallerRequestWithProjectName {
    readonly projectName: string;
}

/* @internal */
export type TypingInstallerRequestUnion = DiscoverTypings | CloseProject | TypesRegistryRequest | InstallPackageRequest;

export interface DiscoverTypings extends TypingInstallerRequestWithProjectName {
    readonly fileNames: string[];
    readonly projectRootPath: ts.Path;
    readonly compilerOptions: ts.CompilerOptions;
    readonly watchOptions?: ts.WatchOptions;
    readonly typeAcquisition: ts.TypeAcquisition;
    readonly unresolvedImports: ts.SortedReadonlyArray<string>;
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
    readonly fileName: ts.Path;
    readonly packageName: string;
    readonly projectRootPath: ts.Path;
}

/* @internal */
export interface TypesRegistryResponse extends TypingInstallerResponse {
    readonly kind: ts.server.EventTypesRegistry;
    readonly typesRegistry: ts.MapLike<ts.MapLike<string>>;
}

export interface PackageInstalledResponse extends ProjectResponse {
    readonly kind: ts.server.ActionPackageInstalled;
    readonly success: boolean;
    readonly message: string;
}

export interface InitializationFailedResponse extends TypingInstallerResponse {
    readonly kind: ts.server.EventInitializationFailed;
    readonly message: string;
    readonly stack?: string;
}

export interface ProjectResponse extends TypingInstallerResponse {
    readonly projectName: string;
}

export interface InvalidateCachedTypings extends ProjectResponse {
    readonly kind: ts.server.ActionInvalidate;
}

export interface InstallTypes extends ProjectResponse {
    readonly kind: ts.server.EventBeginInstallTypes | ts.server.EventEndInstallTypes;
    readonly eventId: number;
    readonly typingsInstallerVersion: string;
    readonly packagesToInstall: readonly string[];
}

export interface BeginInstallTypes extends InstallTypes {
    readonly kind: ts.server.EventBeginInstallTypes;
}

export interface EndInstallTypes extends InstallTypes {
    readonly kind: ts.server.EventEndInstallTypes;
    readonly installSuccess: boolean;
}

/* @internal */
export interface InstallTypingHost extends ts.JsTyping.TypingResolutionHost {
    useCaseSensitiveFileNames: boolean;
    writeFile(path: string, content: string): void;
    createDirectory(path: string): void;
    getCurrentDirectory?(): string;
    watchFile?(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher;
    watchDirectory?(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher;
}

export interface SetTypings extends ProjectResponse {
    readonly typeAcquisition: ts.TypeAcquisition;
    readonly compilerOptions: ts.CompilerOptions;
    readonly typings: string[];
    readonly unresolvedImports: ts.SortedReadonlyArray<string>;
    readonly kind: ts.server.ActionSet;
}

/* @internal */
export type TypingInstallerResponseUnion = SetTypings | InvalidateCachedTypings | TypesRegistryResponse | PackageInstalledResponse | InstallTypes | InitializationFailedResponse;
