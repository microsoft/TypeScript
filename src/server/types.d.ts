/// <reference path="../compiler/types.ts"/>
/// <reference path="../compiler/sys.ts"/>
/// <reference path="../services/jsTyping.ts"/>

declare namespace ts.server {
    export interface CompressedData {
        length: number;
        compressionKind: string;
        data: any;
    }

    export interface ServerHost extends System {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
        clearImmediate(timeoutId: any): void;
        gc?(): void;
        trace?(s: string): void;
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
        readonly projectRootPath: ts.Path;
        readonly compilerOptions: ts.CompilerOptions;
        readonly typingOptions: ts.TypingOptions;
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly cachePath?: string;
        readonly kind: "discover";
    }

    export interface CloseProject extends TypingInstallerRequest {
        readonly kind: "closeProject";
    }

    export type SetRequest = "set";
    export type InvalidateRequest = "invalidate";
    export interface TypingInstallerResponse {
        readonly projectName: string;
        readonly kind: SetRequest | InvalidateRequest;
    }

    export interface SetTypings extends TypingInstallerResponse {
        readonly typingOptions: ts.TypingOptions;
        readonly compilerOptions: ts.CompilerOptions;
        readonly typings: string[];
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly kind: SetRequest;
    }

    export interface InvalidateCachedTypings extends TypingInstallerResponse {
        readonly kind: InvalidateRequest;
    }

    export interface InstallTypingHost extends JsTyping.TypingResolutionHost {
        writeFile(path: string, content: string): void;
        createDirectory(path: string): void;
        watchFile?(path: string, callback: FileWatcherCallback): FileWatcher;
    }
}