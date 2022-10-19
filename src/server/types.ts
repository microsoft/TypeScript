import * as ts from "./_namespaces/ts";

export interface CompressedData {
    length: number;
    compressionKind: string;
    data: any;
}

export type ModuleImportResult = { module: {}, error: undefined } | { module: undefined, error: { stack?: string, message?: string } };

/** @deprecated Use {@link ModuleImportResult} instead. */
export type RequireResult = ModuleImportResult;

export interface ServerHost extends ts.System {
    watchFile(path: string, callback: ts.FileWatcherCallback, pollingInterval?: number, options?: ts.WatchOptions): ts.FileWatcher;
    watchDirectory(path: string, callback: ts.DirectoryWatcherCallback, recursive?: boolean, options?: ts.WatchOptions): ts.FileWatcher;
    setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    clearTimeout(timeoutId: any): void;
    setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
    clearImmediate(timeoutId: any): void;
    gc?(): void;
    trace?(s: string): void;
    require?(initialPath: string, moduleName: string): ModuleImportResult;
    /*@internal*/
    importPlugin?(root: string, moduleName: string): Promise<ModuleImportResult>;
}
