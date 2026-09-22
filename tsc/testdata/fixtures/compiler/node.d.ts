declare const Buffer: {
    from(input: string, encoding?: string): {
        toString(encoding?: string): string;
    };
};
type Buffer = any;

declare const __filename: string;
declare const __dirname: string;
declare const console: {
    log(...args: any[]): void;
};
declare const global: any;
declare const process: {
    argv: string[];
    cwd(): string;
    env: Record<string, string | undefined>;
    execArgv: string[];
    exit(code?: number): never;
    memoryUsage(): { heapUsed: number; };
    nextTick: unknown;
    pid: number;
    platform: string;
    stdout: {
        columns: number;
        isTTY: boolean;
        write(text: string): void;
    };
};
declare function require(id: string): any;

declare module "crypto" {
    const crypto: any;
    export = crypto;
}

declare module "fs" {
    export interface Stats {
        mtime: Date;
        size: number;
        isDirectory(): boolean;
        isFile(): boolean;
    }

    const fs: any;
    export = fs;
}

declare module "inspector" {
    namespace Profiler {
        interface Profile {
            nodes: {
                callFrame: {
                    url: string;
                };
            }[];
        }
    }

    class Session {
        connect(): void;
        disconnect(): void;
        post(method: string, callback?: (...args: any[]) => void): void;
    }
}

declare module "os" {
    const os: any;
    export = os;
}

declare module "path" {
    const path: any;
    export = path;
}

declare module "perf_hooks" {
    export const performance: {
        clearMarks(name?: string): void;
        clearMeasures(name?: string): void;
        mark(name: string): void;
        measure(name: string, startMark?: string, endMark?: string): void;
        now(): number;
        timeOrigin: number;
    };
}

declare module "source-map-support" {
    export function install(): void;
}
