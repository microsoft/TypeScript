import * as ts from "./_namespaces/ts";
import {
    DirectoryWatcherCallback,
    FileWatcher,
    FileWatcherCallback,
    System,
    WatchOptions,
} from "./_namespaces/ts";

export interface CompressedData {
    length: number;
    compressionKind: string;
    data: any;
}

/** @deprecated Use {@link ts.ModuleImportResult} instead. */
export type ModuleImportResult = ts.ModuleImportResult;

/** @deprecated Use {@link ts.ModuleImportResult} instead. */
export type RequireResult = ts.ModuleImportResult;

export interface ServerHost extends System {
    watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
    watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
    setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    clearTimeout(timeoutId: any): void;
    setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
    clearImmediate(timeoutId: any): void;
    gc?(): void;
    trace?(s: string): void;
    require?(initialPath: string, moduleName: string): ts.ModuleImportResult;
    /** @internal */
    importPlugin?(root: string, moduleName: string): Promise<ts.ModuleImportResult>;
}
