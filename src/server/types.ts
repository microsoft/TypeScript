/// <reference path="../compiler/types.ts"/>
/// <reference path="../compiler/sys.ts"/>
/// <reference path="../services/jsTyping.ts"/>

declare namespace ts.server {
    export interface CompressedData {
        length: number;
        compressionKind: string;
        data: any;
    }

    type RequireResult = { module: {}, error: undefined } | { module: undefined, error: { stack?: string, message?: string } };
    export interface ServerHost extends System {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
        clearImmediate(timeoutId: any): void;
        gc?(): void;
        trace?(s: string): void;
        require?(initialPath: string, moduleName: string): RequireResult;
    }

    export interface SortedArray<T> extends Array<T> {
        " __sortedArrayBrand": any;
    }

    export interface SortedReadonlyArray<T> extends ReadonlyArray<T> {
        " __sortedArrayBrand": any;
    }

    export interface TypingInstallerRequestWithProjectName {
        readonly projectName: string;
    }

    /* @internal */
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
    }

    export type ActionSet = "action::set";
    export type ActionInvalidate = "action::invalidate";
    export type ActionPackageInstalled = "action::packageInstalled";
    export type EventTypesRegistry = "event::typesRegistry";
    export type EventBeginInstallTypes = "event::beginInstallTypes";
    export type EventEndInstallTypes = "event::endInstallTypes";
    export type EventInitializationFailed = "event::initializationFailed";

    export interface TypingInstallerResponse {
        readonly kind: ActionSet | ActionInvalidate | EventTypesRegistry | ActionPackageInstalled | EventBeginInstallTypes | EventEndInstallTypes | EventInitializationFailed;
    }
    /* @internal */
    export type TypingInstallerResponseUnion = SetTypings | InvalidateCachedTypings | TypesRegistryResponse | PackageInstalledResponse | InstallTypes | InitializationFailedResponse;

    /* @internal */
    export interface TypesRegistryResponse extends TypingInstallerResponse {
        readonly kind: EventTypesRegistry;
        readonly typesRegistry: MapLike<void>;
    }

    export interface PackageInstalledResponse extends ProjectResponse {
        readonly kind: ActionPackageInstalled;
        readonly success: boolean;
        readonly message: string;
    }

    export interface InitializationFailedResponse extends TypingInstallerResponse {
        readonly kind: EventInitializationFailed;
        readonly message: string;
    }

    export interface ProjectResponse extends TypingInstallerResponse {
        readonly projectName: string;
    }

    export interface SetTypings extends ProjectResponse {
        readonly typeAcquisition: TypeAcquisition;
        readonly compilerOptions: CompilerOptions;
        readonly typings: string[];
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly kind: ActionSet;
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
        writeFile(path: string, content: string): void;
        createDirectory(path: string): void;
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number): FileWatcher;
    }
}