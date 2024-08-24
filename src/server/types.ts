import {
    ApplyCodeActionCommandResult,
    DirectoryWatcherCallback,
    FileWatcher,
    FileWatcherCallback,
    InstallPackageOptions,
    Path,
    SortedReadonlyArray,
    System,
    TypeAcquisition,
    WatchOptions,
} from "./_namespaces/ts.js";
import {
    Project,
    ProjectService,
} from "./_namespaces/ts.server.js";

export interface CompressedData {
    length: number;
    compressionKind: string;
    data: Uint8Array; // Changed to a more specific type
}

export type ModuleImportResult = 
    | { module: {}; error: undefined; }
    | { module: undefined; error: { stack?: string; message?: string; }; };

/** @deprecated Use {@link ModuleImportResult} instead. */
// Remove the deprecated type alias
// export type RequireResult = ModuleImportResult;

export interface Timer {
    setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    clearTimeout(timeoutId: any): void;
    setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
    clearImmediate(timeoutId: any): void;
}

export interface FileWatcherHost extends Timer {
    watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
    watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
    preferNonRecursiveWatch?: boolean;
}

export interface DebugHost {
    gc?(): void;
    trace?(s: string): void;
}

export interface ModuleLoader {
    require?(initialPath: string, moduleName: string): ModuleImportResult;
    importPlugin?(root: string, moduleName: string): Promise<ModuleImportResult>;
}

export type ServerHost = FileWatcherHost & DebugHost & ModuleLoader & System;

export interface InstallPackageOptionsWithProject extends InstallPackageOptions {
    projectName: string;
    projectRootPath: Path;
}

export interface TypingsInstaller {
    isKnownTypesPackageName(name: string): boolean;
    installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult>;
    enqueueInstallTypingsRequest(p: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string> | undefined): void;
    attach(projectService: ProjectService): void;
    onProjectClosed(p: Project): void;
    readonly globalTypingsCacheLocation: string | undefined;
}
