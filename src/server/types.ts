/// <reference path="../compiler/types.ts"/>
/// <reference path="../compiler/sys.ts"/>
/// <reference path="../services/jsTyping.ts"/>

declare namespace ts.server {
    export interface CompressedData {
        length: number;
        compressionKind: string;
        data: any;
    }

    type RequireResult = { module: {}, error: undefined } | { module: undefined, error: {} };
    export interface ServerHost extends System {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
        clearImmediate(timeoutId: any): void;
        gc?(): void;
        trace?(s: string): void;
        require?(initialPath: string, moduleName: string): RequireResult;
    }

    export interface SortedReadonlyArray<T> extends ReadonlyArray<T> {
        " __sortedReadonlyArrayBrand": any;
    }

    export interface TypingInstallerRequest {
        readonly projectName: string;
        readonly kind: "discover" | "closeProject";
    }

    export interface DiscoverTypings extends TypingInstallerRequest {
        readonly fileNames: string[];
        readonly projectRootPath: Path;
        readonly compilerOptions: CompilerOptions;
        readonly typeAcquisition: TypeAcquisition;
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly cachePath?: string;
        readonly kind: "discover";
    }

    export interface CloseProject extends TypingInstallerRequest {
        readonly kind: "closeProject";
    }

    export type ActionSet = "action::set";
    export type ActionInvalidate = "action::invalidate";
    export type EventBeginInstallTypes = "event::beginInstallTypes";
    export type EventEndInstallTypes = "event::endInstallTypes";
    export type EventInitializationFailed = "event::initializationFailed";

    export interface TypingInstallerResponse {
        readonly kind: ActionSet | ActionInvalidate | EventBeginInstallTypes | EventEndInstallTypes | EventInitializationFailed;
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