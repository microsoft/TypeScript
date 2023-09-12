import { Debug, isNodeLikeSystem, sys } from "./_namespaces/ts";
import "./sharing/structs/sharedStructsGlobals";

/** @internal */
export interface WorkerThreadsHost {
    readonly workerData: unknown;
    readonly parentPort: MessagePort | undefined;
    readonly threadId: number;
    isWorkerThread(): this is WorkerThreadWorkerThreadsHost;
    isMainThread(): this is MainThreadWorkerThreadsHost;
    createWorker(options?: WorkerOptions): Worker;
    createMessageChannel(): MessageChannel;
    getHostObject<T>(factory: (host: WorkerThreadsHost) => T): T;
    addMessageListener(source: MessagePort | Worker, handler: (value: unknown) => void): void;
    removeMessageListener(source: MessagePort | Worker, handler: (value: unknown) => void): void;
}

/** @internal */
export interface WorkerThreadWorkerThreadsHost extends WorkerThreadsHost {
    readonly parentPort: MessagePort;
    isMainThread(): false;
}

/** @internal */
export interface MainThreadWorkerThreadsHost extends WorkerThreadsHost {
    readonly parentPort: undefined;
    isWorkerThread(): false;
}

/** @internal */
export type Transferrable =
    | ArrayBuffer
    | MessagePort
    ;

/** @internal */
export interface WorkerOptions {
    /** The path to the worker script. If not provided, then the typescript runtime is assumed. */
    file?: string;
    /** Name of the worker for debugging purposes. */
    name?: string;
    /** Initial data to pass to the worker. */
    workerData?: unknown;
    /** Initial data to transfer to the worker. */
    transferList?: readonly Transferrable[];
}

/** @internal */
export interface Worker {
    postMessage(value: unknown, transferList?: readonly Transferrable[]): void;
    terminate(): Promise<void>;
}

/** @internal */
export interface MessageChannel {
    readonly nativeMessageChannel: unknown;
    readonly port1: MessagePort;
    readonly port2: MessagePort;
}

/** @internal */
export interface MessagePort {
    postMessage(value: unknown, transferList?: readonly Transferrable[]): void;
    close(): void;
}

function createNodeWorkerThreadHost(): WorkerThreadsHost {
    const fs: typeof import("fs") = require("fs");
    const path: typeof import("path") = require("path");
    const worker_threads: typeof import("worker_threads") = require("worker_threads");
    const hostObjectCircularitySentinel = {};
    const hostObjects = new WeakMap<object, unknown>();

    function isWorkerThread() {
        return !worker_threads.isMainThread;
    }

    function isMainThread() {
        return worker_threads.isMainThread;
    }

    function getEntrypointPath() {
        const file = sys.getExecutingFilePath();
        // The executing file path isn't valid when running unbundled, so try to use tsc.js if available.
        // See `executingFilePath` in sys.ts for more information.
        if (path.basename(file) === "__fake__.js") {
            const tscPath = path.join(path.dirname(file), "tsc.js");
            if (fs.existsSync(tscPath)) {
                return tscPath;
            }
            throw new Error("Cannot determine entrypoint path.");
        }
        return file;
    }

    function createWorker({ file = getEntrypointPath(), name, workerData, transferList, }: WorkerOptions = {}): Worker {
        const execArgv: string[] = [];
        if (Debug.isDebugging) {
            execArgv.push("--inspect");
        }
        if (process.execArgv.includes("--enable-source-maps")) {
            execArgv.push("--enable-source-maps");
        }
        const worker = new worker_threads.Worker(file, {
            name,
            execArgv,
            workerData,
            transferList: transferList as unknown as import("worker_threads").TransferListItem[],
            // stdout: true,
            // stderr: true,
            stdout: false,
            stderr: false,
            // ensure that we use the same seed value when hashing strings on all threads
            env: { ...process.env, TS_STRING_SEED: `${sys.stringSeed}` }
        });
        // worker.stdout.pipe(process.stdout, { end: false });
        // worker.stderr.pipe(process.stderr, { end: false });
        worker.unref();
        return worker as unknown as Worker;
    }

    function createMessageChannel(): MessageChannel {
        return new worker_threads.MessageChannel() as unknown as MessageChannel;
    }

    function getHostObject<T>(factory: (host: WorkerThreadsHost) => T): T {
        let value = hostObjects.get(factory);
        if (value === hostObjectCircularitySentinel) throw new TypeError("Circularity detected in host object allocation");
        if (value === undefined) {
            hostObjects.set(factory, hostObjectCircularitySentinel);
            hostObjects.set(factory, value = factory(workerThreads));
        }
        return value as T;
    }

    function addMessageListener(source: MessagePort | Worker, handler: (value: unknown) => void) {
        (source as import("worker_threads").MessagePort | import("worker_threads").Worker).addListener("message", handler);
    }

    function removeMessageListener(source: MessagePort | Worker, handler: (value: unknown) => void) {
        (source as import("worker_threads").MessagePort | import("worker_threads").Worker).removeListener("message", handler);
    }

    const workerThreads: WorkerThreadsHost = {
        workerData: worker_threads.workerData,
        parentPort: (worker_threads.parentPort ?? undefined) as MessagePort | undefined,
        threadId: worker_threads.threadId,
        isWorkerThread,
        isMainThread,
        createWorker,
        createMessageChannel,
        getHostObject,
        addMessageListener,
        removeMessageListener,
    };
    return workerThreads;
}

/** @internal */
export let workerThreads: WorkerThreadsHost | undefined = (() => {
    if (isNodeLikeSystem() && typeof SharedStructType === "function") {
        return createNodeWorkerThreadHost();
    }
})();

/** @internal */
export function setWorkerThreadsHost(value: WorkerThreadsHost | undefined) {
    workerThreads = value;
}
