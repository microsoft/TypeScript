import type { WasmReactorInstance } from "./index.ts";

const errnoSuccess = 0;
const errnoBadFileDescriptor = 8;
const errnoInvalidArgument = 28;
const errnoIo = 29;
const errnoNoSys = 52;
const fileTypeCharacterDevice = 2;
const eventTypeClock = 0;
const subscriptionClockAbstime = 1;
const hostWriteFileFD = 0x7fff_fffe;

export interface InstantiateWasmOptions {
    stdout?: (text: string) => void;
    stderr?: (text: string) => void;
}

export interface WasmFileSystem {
    writeFile?(path: string, data: string): void;
}

interface WasmHost {
    setFileSystem(fs: WasmFileSystem | undefined): void;
}

const wasmHosts = new WeakMap<object, WasmHost>();

export function setWasmFileSystem(instance: WasmReactorInstance, fs: WasmFileSystem | undefined): void {
    const host = wasmHosts.get(instance);
    if (!host) {
        if (fs === undefined) return;
        throw new Error("The TypeScript WASM reactor was not created by instantiateWasm");
    }
    host.setFileSystem(fs);
}

/** Instantiate and initialize the TypeScript reactor with its minimal WASI host. */
export async function instantiateWasm(
    module: WebAssembly.Module,
    options: InstantiateWasmOptions = {},
): Promise<WasmReactorInstance> {
    const host = createWasiHost(options);
    const instance = await WebAssembly.instantiate(module, host.imports);
    return host.initialize(instance);
}

/** Synchronously instantiate and initialize the TypeScript reactor with its minimal WASI host. */
export function instantiateWasmSync(
    module: WebAssembly.Module,
    options: InstantiateWasmOptions = {},
): WasmReactorInstance {
    const host = createWasiHost(options);
    const instance = new WebAssembly.Instance(module, host.imports);
    return host.initialize(instance);
}

function createWasiHost(options: InstantiateWasmOptions): {
    imports: WebAssembly.Imports;
    initialize(instance: WebAssembly.Instance): WasmReactorInstance;
} {
    let instance: WebAssembly.Instance | undefined;
    const stdout = options.stdout ?? (text => console.log(text));
    const stderr = options.stderr ?? (text => console.error(text));
    const decoders = new Map<number, TextDecoder>();
    const encoder = new TextEncoder();
    let fileSystem: WasmFileSystem | undefined;

    function getMemory(): WebAssembly.Memory {
        const memory = instance?.exports.memory;
        if (!(memory instanceof WebAssembly.Memory)) {
            throw new Error("TypeScript WASM reactor did not export its memory");
        }
        return memory;
    }

    function getView(): DataView {
        return new DataView(getMemory().buffer);
    }

    function argsSizesGet(countPointer: number, sizePointer: number): number {
        countPointer >>>= 0;
        sizePointer >>>= 0;
        const view = getView();
        view.setUint32(countPointer, 0, true);
        view.setUint32(sizePointer, 0, true);
        return errnoSuccess;
    }

    function clockTimeGet(clockId: number, _precision: bigint, timePointer: number): number {
        timePointer >>>= 0;
        let nanoseconds: bigint;
        switch (clockId) {
            case 0:
                nanoseconds = BigInt(Date.now()) * 1_000_000n;
                break;
            case 1:
                nanoseconds = BigInt(Math.round(performance.now() * 1e6));
                break;
            default:
                return errnoInvalidArgument;
        }
        getView().setBigUint64(timePointer, nanoseconds, true);
        return errnoSuccess;
    }

    function fdFdstatGet(fd: number, statPointer: number): number {
        statPointer >>>= 0;
        if (fd < 0 || fd > 2) return errnoBadFileDescriptor;
        const memory = getMemory();
        new Uint8Array(memory.buffer, statPointer, 24).fill(0);
        const view = new DataView(memory.buffer);
        view.setUint8(statPointer, fileTypeCharacterDevice);
        const rights = fd === 0 ? 1n << 1n : 1n << 6n;
        view.setBigUint64(statPointer + 8, rights, true);
        return errnoSuccess;
    }

    function fdFdstatSetFlags(fd: number, _flags: number): number {
        return fd >= 0 && fd <= 2 ? errnoSuccess : errnoBadFileDescriptor;
    }

    function fdRead(fd: number, _iovsPointer: number, _iovsLength: number, readPointer: number): number {
        readPointer >>>= 0;
        if (fd !== 0) return errnoBadFileDescriptor;
        getView().setUint32(readPointer, 0, true);
        return errnoSuccess;
    }

    function fdWrite(fd: number, iovsPointer: number, iovsLength: number, writtenPointer: number): number {
        iovsPointer >>>= 0;
        writtenPointer >>>= 0;
        if (fd === hostWriteFileFD) {
            return hostWriteFile(iovsPointer, iovsLength, writtenPointer);
        }
        if (fd !== 1 && fd !== 2) return errnoBadFileDescriptor;
        const memory = getMemory();
        const view = new DataView(memory.buffer);
        const chunks: Uint8Array[] = [];
        let length = 0;
        for (let i = 0; i < iovsLength; i++) {
            const iovPointer = iovsPointer + i * 8;
            const chunkPointer = view.getUint32(iovPointer, true);
            const chunkLength = view.getUint32(iovPointer + 4, true);
            chunks.push(new Uint8Array(memory.buffer, chunkPointer, chunkLength));
            length += chunkLength;
        }
        const bytes = new Uint8Array(length);
        let offset = 0;
        for (const chunk of chunks) {
            bytes.set(chunk, offset);
            offset += chunk.length;
        }
        view.setUint32(writtenPointer, length, true);
        const decoder = decoders.get(fd) ?? new TextDecoder();
        decoders.set(fd, decoder);
        (fd === 1 ? stdout : stderr)(decoder.decode(bytes, { stream: true }));
        return errnoSuccess;
    }

    function randomGet(bufferPointer: number, bufferLength: number): number {
        bufferPointer >>>= 0;
        const buffer = new Uint8Array(getMemory().buffer, bufferPointer, bufferLength);
        for (let offset = 0; offset < buffer.length; offset += 65_536) {
            crypto.getRandomValues(buffer.subarray(offset, Math.min(offset + 65_536, buffer.length)));
        }
        return errnoSuccess;
    }

    function hostWriteFile(iovsPointer: number, iovsLength: number, writtenPointer: number): number {
        iovsPointer >>>= 0;
        writtenPointer >>>= 0;
        if (!fileSystem?.writeFile) return errnoBadFileDescriptor;
        if (iovsLength !== 1) return errnoInvalidArgument;
        const memory = getMemory();
        const view = new DataView(memory.buffer);
        const bufferPointer = view.getUint32(iovsPointer, true);
        const bufferLength = view.getUint32(iovsPointer + 4, true);
        if (bufferLength < 12) return errnoInvalidArgument;
        const pathLength = view.getUint32(bufferPointer, true);
        const dataLength = view.getUint32(bufferPointer + 4, true);
        const errorCapacity = view.getUint32(bufferPointer + 8, true);
        if (12 + pathLength + dataLength + errorCapacity !== bufferLength) return errnoInvalidArgument;
        const decoder = new TextDecoder();
        const pathPointer = bufferPointer + 12;
        const dataPointer = pathPointer + pathLength;
        const errorPointer = dataPointer + dataLength;
        const path = decoder.decode(new Uint8Array(memory.buffer, pathPointer, pathLength));
        const data = decoder.decode(new Uint8Array(memory.buffer, dataPointer, dataLength));
        try {
            fileSystem.writeFile(path, data);
            view.setUint32(writtenPointer, bufferLength, true);
            return errnoSuccess;
        }
        catch (error) {
            const errorBytes = encoder.encode(error instanceof Error ? error.message : String(error));
            const errorLength = Math.min(errorBytes.length, errorCapacity);
            new Uint8Array(memory.buffer, errorPointer, errorLength).set(errorBytes.subarray(0, errorLength));
            view.setUint32(bufferPointer + 8, errorLength, true);
            view.setUint32(writtenPointer, 0, true);
            return errnoIo;
        }
    }

    function pollOneoff(
        subscriptionsPointer: number,
        eventsPointer: number,
        subscriptionsLength: number,
        eventsLengthPointer: number,
    ): number {
        subscriptionsPointer >>>= 0;
        eventsPointer >>>= 0;
        eventsLengthPointer >>>= 0;
        if (subscriptionsLength === 0) return errnoInvalidArgument;
        const memory = getMemory();
        const view = new DataView(memory.buffer);
        let selected = -1;
        let shortestDelay = Number.POSITIVE_INFINITY;
        for (let i = 0; i < subscriptionsLength; i++) {
            const subscription = subscriptionsPointer + i * 48;
            if (view.getUint8(subscription + 8) !== eventTypeClock) continue;
            const clockId = view.getUint32(subscription + 16, true);
            if (clockId !== 0 && clockId !== 1) return errnoInvalidArgument;
            const timeout = view.getBigUint64(subscription + 24, true);
            const flags = view.getUint16(subscription + 40, true);
            const now = clockId === 0 ? Date.now() : performance.now();
            const delay = flags & subscriptionClockAbstime
                ? Number(timeout) / 1e6 - now
                : Number(timeout) / 1e6;
            if (delay < shortestDelay) {
                selected = subscription;
                shortestDelay = delay;
            }
        }
        if (selected < 0) return errnoNoSys;

        const deadline = performance.now() + Math.max(0, shortestDelay);
        while (performance.now() < deadline) {
            // WASI imports are synchronous, so a clock subscription must wait here.
        }

        new Uint8Array(memory.buffer, eventsPointer, 32).fill(0);
        view.setBigUint64(eventsPointer, view.getBigUint64(selected, true), true);
        view.setUint8(eventsPointer + 10, eventTypeClock);
        view.setUint32(eventsLengthPointer, 1, true);
        return errnoSuccess;
    }

    function unsupported(): number {
        return errnoNoSys;
    }

    const wasi = {
        args_get: () => errnoSuccess,
        args_sizes_get: argsSizesGet,
        clock_time_get: clockTimeGet,
        environ_get: () => errnoSuccess,
        environ_sizes_get: argsSizesGet,
        fd_close: (fd: number) => fd >= 0 && fd <= 2 ? errnoSuccess : errnoBadFileDescriptor,
        fd_fdstat_get: fdFdstatGet,
        fd_fdstat_set_flags: fdFdstatSetFlags,
        fd_filestat_get: unsupported,
        fd_pread: unsupported,
        fd_prestat_dir_name: unsupported,
        fd_prestat_get: () => errnoBadFileDescriptor,
        fd_read: fdRead,
        fd_readdir: unsupported,
        fd_write: fdWrite,
        path_create_directory: unsupported,
        path_filestat_get: unsupported,
        path_filestat_set_times: unsupported,
        path_open: unsupported,
        path_readlink: unsupported,
        path_remove_directory: unsupported,
        path_unlink_file: unsupported,
        poll_oneoff: pollOneoff,
        proc_exit: (code: number) => {
            throw new Error(`TypeScript WASM runtime exited with code ${code}`);
        },
        random_get: randomGet,
        sched_yield: () => errnoSuccess,
        sock_accept: unsupported,
    };

    return {
        imports: {
            wasi_snapshot_preview1: wasi,
        },
        initialize(value) {
            instance = value;
            const initialize = instance.exports.typescript_initialize;
            if (typeof initialize !== "function") {
                throw new Error("TypeScript WASM reactor did not export typescript_initialize");
            }
            initialize();
            wasmHosts.set(instance, {
                setFileSystem(value) {
                    fileSystem = value;
                },
            });
            return instance;
        },
    };
}
