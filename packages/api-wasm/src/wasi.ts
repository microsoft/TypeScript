import type { WasmReactorInstance } from "./index.ts";

const errnoSuccess = 0;
const errnoBadFileDescriptor = 8;
const errnoInvalidArgument = 28;
const errnoNoSys = 52;
const fileTypeCharacterDevice = 2;

export interface InstantiateWasmOptions {
    stdout?: (text: string) => void;
    stderr?: (text: string) => void;
}

/** Instantiate and initialize the TypeScript reactor with its minimal WASI host. */
export async function instantiateWasm(
    module: WebAssembly.Module,
    options: InstantiateWasmOptions = {},
): Promise<WasmReactorInstance> {
    let instance: WebAssembly.Instance | undefined;
    const stdout = options.stdout ?? (text => console.log(text));
    const stderr = options.stderr ?? (text => console.error(text));
    const decoders = new Map<number, TextDecoder>();

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
        path_open: unsupported,
        path_remove_directory: unsupported,
        path_unlink_file: unsupported,
        poll_oneoff: unsupported,
        proc_exit: (code: number) => {
            throw new Error(`TypeScript WASM runtime exited with code ${code}`);
        },
        random_get: randomGet,
        sched_yield: () => errnoSuccess,
    };

    instance = await WebAssembly.instantiate(module, {
        wasi_snapshot_preview1: wasi,
    });
    const initialize = instance.exports._initialize;
    if (typeof initialize !== "function") {
        throw new Error("TypeScript WASM reactor did not export _initialize");
    }
    initialize();
    return instance;
}
