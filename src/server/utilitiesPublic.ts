import {
    getNormalizedAbsolutePath,
    isRootedDiskPath,
    normalizePath,
    Path,
    SortedArray,
    SortedReadonlyArray,
    TypeAcquisition,
} from "./_namespaces/ts.js";
import {
    DiscoverTypings,
    Project,
} from "./_namespaces/ts.server.js";

export enum LogLevel {
    terse,
    normal,
    requestTime,
    verbose,
}

export const emptyArray: SortedReadonlyArray<never> = createSortedArray<never>();

export interface Logger {
    close(): void;
    hasLevel(level: LogLevel): boolean;
    loggingEnabled(): boolean;
    perftrc(s: string): void;
    info(s: string): void;
    startGroup(): void;
    endGroup(): void;
    msg(s: string, type?: Msg): void;
    getLogFileName(): string | undefined;
    /** @internal*/ isTestLogger?: boolean;
}

// TODO: Use a const enum (https://github.com/Microsoft/TypeScript/issues/16804)
export enum Msg {
    Err = "Err",
    Info = "Info",
    Perf = "Perf",
}

export function createInstallTypingsRequest(project: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, cachePath?: string): DiscoverTypings {
    return {
        projectName: project.getProjectName(),
        fileNames: project.getFileNames(/*excludeFilesFromExternalLibraries*/ true, /*excludeConfigFiles*/ true).concat(project.getExcludedFiles() as NormalizedPath[]),
        compilerOptions: project.getCompilationSettings(),
        typeAcquisition,
        unresolvedImports,
        projectRootPath: project.getCurrentDirectory() as Path,
        cachePath,
        kind: "discover",
    };
}

export namespace Errors {
    export function ThrowNoProject(): never {
        throw new Error("No Project.");
    }
    export function ThrowProjectLanguageServiceDisabled(): never {
        throw new Error("The project's language service is disabled.");
    }
    export function ThrowProjectDoesNotContainDocument(fileName: string, project: Project): never {
        throw new Error(`Project '${project.getProjectName()}' does not contain document '${fileName}'`);
    }
}

export type NormalizedPath = string & { __normalizedPathTag: any; };

export function toNormalizedPath(fileName: string): NormalizedPath {
    return normalizePath(fileName) as NormalizedPath;
}

export function normalizedPathToPath(normalizedPath: NormalizedPath, currentDirectory: string, getCanonicalFileName: (f: string) => string): Path {
    const f = isRootedDiskPath(normalizedPath) ? normalizedPath : getNormalizedAbsolutePath(normalizedPath, currentDirectory);
    return getCanonicalFileName(f) as Path;
}

export function asNormalizedPath(fileName: string): NormalizedPath {
    return fileName as NormalizedPath;
}

export interface NormalizedPathMap<T> {
    get(path: NormalizedPath): T | undefined;
    set(path: NormalizedPath, value: T): void;
    contains(path: NormalizedPath): boolean;
    remove(path: NormalizedPath): void;
}

export function createNormalizedPathMap<T>(): NormalizedPathMap<T> {
    const map = new Map<string, T>();
    return {
        get(path) {
            return map.get(path);
        },
        set(path, value) {
            map.set(path, value);
        },
        contains(path) {
            return map.has(path);
        },
        remove(path) {
            map.delete(path);
        },
    };
}

/** @internal */
export interface ProjectOptions {
    configHasExtendsProperty: boolean;
    /**
     * true if config file explicitly listed files
     */
    configHasFilesProperty: boolean;
    configHasIncludeProperty: boolean;
    configHasExcludeProperty: boolean;
}

export function isInferredProjectName(name: string): boolean {
    // POSIX defines /dev/null as a device - there should be no file with this prefix
    return /dev\/null\/inferredProject\d+\*/.test(name);
}

export function makeInferredProjectName(counter: number): string {
    return `/dev/null/inferredProject${counter}*`;
}

/** @internal */
export function makeAutoImportProviderProjectName(counter: number): string {
    return `/dev/null/autoImportProviderProject${counter}*`;
}

/** @internal */
export function makeAuxiliaryProjectName(counter: number): string {
    return `/dev/null/auxiliaryProject${counter}*`;
}

export function createSortedArray<T>(): SortedArray<T> {
    return [] as any as SortedArray<T>; // TODO: GH#19873
}
