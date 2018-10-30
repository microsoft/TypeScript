namespace ts.server {
    export enum LogLevel {
        terse,
        normal,
        requestTime,
        verbose
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
    }

    // TODO: Use a const enum (https://github.com/Microsoft/TypeScript/issues/16804)
    export enum Msg {
        Err = "Err",
        Info = "Info",
        Perf = "Perf",
    }
    export namespace Msg {
        /** @deprecated Only here for backwards-compatibility. Prefer just `Msg`. */
        export type Types = Msg;
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
            kind: "discover"
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

    export type NormalizedPath = string & { __normalizedPathTag: any };

    export function toNormalizedPath(fileName: string): NormalizedPath {
        return <NormalizedPath>normalizePath(fileName);
    }

    export function normalizedPathToPath(normalizedPath: NormalizedPath, currentDirectory: string, getCanonicalFileName: (f: string) => string): Path {
        const f = isRootedDiskPath(normalizedPath) ? normalizedPath : getNormalizedAbsolutePath(normalizedPath, currentDirectory);
        return <Path>getCanonicalFileName(f);
    }

    export function asNormalizedPath(fileName: string): NormalizedPath {
        return <NormalizedPath>fileName;
    }

    export interface NormalizedPathMap<T> {
        get(path: NormalizedPath): T | undefined;
        set(path: NormalizedPath, value: T): void;
        contains(path: NormalizedPath): boolean;
        remove(path: NormalizedPath): void;
    }

    export function createNormalizedPathMap<T>(): NormalizedPathMap<T> {
        const map = createMap<T>();
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
            }
        };
    }

    /*@internal*/
    export interface ProjectOptions {
        configHasExtendsProperty: boolean;
        /**
         * true if config file explicitly listed files
         */
        configHasFilesProperty: boolean;
        configHasIncludeProperty: boolean;
        configHasExcludeProperty: boolean;
    }

    export function isInferredProjectName(name: string) {
        // POSIX defines /dev/null as a device - there should be no file with this prefix
        return /dev\/null\/inferredProject\d+\*/.test(name);
    }

    export function makeInferredProjectName(counter: number) {
        return `/dev/null/inferredProject${counter}*`;
    }

    export function createSortedArray<T>(): SortedArray<T> {
        return [] as any as SortedArray<T>; // TODO: GH#19873
    }
}

/* @internal */
namespace ts.server {
    export class ThrottledOperations {
        private readonly pendingTimeouts: Map<any> = createMap<any>();
        private readonly logger?: Logger | undefined;
        constructor(private readonly host: ServerHost, logger: Logger) {
            this.logger = logger.hasLevel(LogLevel.verbose) ? logger : undefined;
        }

        /**
         * Wait `number` milliseconds and then invoke `cb`.  If, while waiting, schedule
         * is called again with the same `operationId`, cancel this operation in favor
         * of the new one.  (Note that the amount of time the canceled operation had been
         * waiting does not affect the amount of time that the new operation waits.)
         */
        public schedule(operationId: string, delay: number, cb: () => void) {
            const pendingTimeout = this.pendingTimeouts.get(operationId);
            if (pendingTimeout) {
                // another operation was already scheduled for this id - cancel it
                this.host.clearTimeout(pendingTimeout);
            }
            // schedule new operation, pass arguments
            this.pendingTimeouts.set(operationId, this.host.setTimeout(ThrottledOperations.run, delay, this, operationId, cb));
            if (this.logger) {
                this.logger.info(`Scheduled: ${operationId}${pendingTimeout ? ", Cancelled earlier one" : ""}`);
            }
        }

        private static run(self: ThrottledOperations, operationId: string, cb: () => void) {
            self.pendingTimeouts.delete(operationId);
            if (self.logger) {
                self.logger.info(`Running: ${operationId}`);
            }
            cb();
        }
    }

    export class GcTimer {
        private timerId: any;
        constructor(private readonly host: ServerHost, private readonly delay: number, private readonly logger: Logger) {
        }

        public scheduleCollect() {
            if (!this.host.gc || this.timerId !== undefined) {
                // no global.gc or collection was already scheduled - skip this request
                return;
            }
            this.timerId = this.host.setTimeout(GcTimer.run, this.delay, this);
        }

        private static run(self: GcTimer) {
            self.timerId = undefined;

            const log = self.logger.hasLevel(LogLevel.requestTime);
            const before = log && self.host.getMemoryUsage!(); // TODO: GH#18217

            self.host.gc!(); // TODO: GH#18217
            if (log) {
                const after = self.host.getMemoryUsage!(); // TODO: GH#18217
                self.logger.perftrc(`GC::before ${before}, after ${after}`);
            }
        }
    }

    export function getBaseConfigFileName(configFilePath: NormalizedPath): "tsconfig.json" | "jsconfig.json" | undefined {
        const base = getBaseFileName(configFilePath);
        return base === "tsconfig.json" || base === "jsconfig.json" ? base : undefined;
    }

    export function removeSorted<T>(array: SortedArray<T>, remove: T, compare: Comparer<T>): void {
        if (!array || array.length === 0) {
            return;
        }

        if (array[0] === remove) {
            array.splice(0, 1);
            return;
        }

        const removeIndex = binarySearch(array, remove, identity, compare);
        if (removeIndex >= 0) {
            array.splice(removeIndex, 1);
        }
    }

    const indentStr = "\n    ";

    /* @internal */
    export function indent(str: string): string {
        return indentStr + str.replace(/\n/g, indentStr);
    }

    /** Put stringified JSON on the next line, indented. */
    /* @internal */
    export function stringifyIndented(json: {}): string {
        return indentStr + JSON.stringify(json);
    }
}
