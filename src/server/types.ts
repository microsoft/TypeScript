declare namespace ts.server {
    export interface CompressedData {
        length: number;
        compressionKind: string;
        data: any;
    }

    export type RequireResult = { module: {}, error: undefined } | { module: undefined, error: { stack?: string, message?: string } };
    export interface ServerHost extends System {
        watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: CompilerOptions): FileWatcher;
        watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: CompilerOptions): FileWatcher;
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout(timeoutId: any): void;
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
        clearImmediate(timeoutId: any): void;
        gc?(): void;
        trace?(s: string): void;
        require?(initialPath: string, moduleName: string): RequireResult;
    }
}
