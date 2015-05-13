// Type definitions for Node.js v0.10.1
// Project: http://nodejs.org/
// Definitions by: Microsoft TypeScript <http://typescriptlang.org>, DefinitelyTyped <https://github.com/borisyankov/DefinitelyTyped>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/************************************************
*                                               *
*               Node.js v0.10.1 API             *
*                                               *
************************************************/

/************************************************
*                                               *
*                   GLOBAL                      *
*                                               *
************************************************/
declare var process: NodeJS.Process;
declare var global: any;

declare var __filename: string;
declare var __dirname: string;

declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearTimeout(timeoutId: NodeJS.Timer): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearInterval(intervalId: NodeJS.Timer): void;
declare function setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
declare function clearImmediate(immediateId: any): void;

declare var require: {
    (id: string): any;
    resolve(id: string): string;
    cache: any;
    extensions: any;
    main: any;
};

declare var module: {
    exports: any;
    require(id: string): any;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
};

// Same as module.exports
declare var exports: any;
declare var SlowBuffer: {
    new (str: string, encoding?: string): Buffer;
    new (size: number): Buffer;
    new (size: Uint8Array): Buffer;
    new (array: any[]): Buffer;
    prototype: Buffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: Buffer[], totalLength?: number): Buffer;
};


// Buffer class
interface Buffer extends NodeBuffer { }
interface BufferConstructor {
    new (str: string, encoding ?: string): Buffer;
    new (size: number): Buffer;
    new (size: Uint8Array): Buffer;
    new (array: any[]): Buffer;
    prototype: Buffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding ?: string): number;
    concat(list: Buffer[], totalLength ?: number): Buffer;
}
declare var Buffer: BufferConstructor;

/************************************************
*                                               *
*               GLOBAL INTERFACES               *
*                                               *
************************************************/
declare module NodeJS {
    export interface ErrnoException extends Error {
        errno?: any;
        code?: string;
        path?: string;
        syscall?: string;
    }

    export interface EventEmitter {
        addListener(event: string, listener: Function): EventEmitter;
        on(event: string, listener: Function): EventEmitter;
        once(event: string, listener: Function): EventEmitter;
        removeListener(event: string, listener: Function): EventEmitter;
        removeAllListeners(event?: string): EventEmitter;
        setMaxListeners(n: number): void;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
    }

    export interface ReadableStream extends EventEmitter {
        readable: boolean;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends WritableStream>(destination?: T): void;
        unshift(chunk: string): void;
        unshift(chunk: Buffer): void;
        wrap(oldStream: ReadableStream): ReadableStream;
    }

    export interface WritableStream extends EventEmitter {
        writable: boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
    }

    export interface ReadWriteStream extends ReadableStream, WritableStream { }

    export interface Process extends EventEmitter {
        stdout: WritableStream;
        stderr: WritableStream;
        stdin: ReadableStream;
        argv: string[];
        execPath: string;
        abort(): void;
        chdir(directory: string): void;
        cwd(): string;
        env: any;
        exit(code?: number): void;
        getgid(): number;
        setgid(id: number): void;
        setgid(id: string): void;
        getuid(): number;
        setuid(id: number): void;
        setuid(id: string): void;
        version: string;
        versions: {
            http_parser: string;
            node: string;
            v8: string;
            ares: string;
            uv: string;
            zlib: string;
            openssl: string;
        };
        config: {
            target_defaults: {
                cflags: any[];
                default_configuration: string;
                defines: string[];
                include_dirs: string[];
                libraries: string[];
            };
            variables: {
                clang: number;
                host_arch: string;
                node_install_npm: boolean;
                node_install_waf: boolean;
                node_prefix: string;
                node_shared_openssl: boolean;
                node_shared_v8: boolean;
                node_shared_zlib: boolean;
                node_use_dtrace: boolean;
                node_use_etw: boolean;
                node_use_openssl: boolean;
                target_arch: string;
                v8_no_strict_aliasing: number;
                v8_use_snapshot: boolean;
                visibility: string;
            };
        };
        kill(pid: number, signal?: string): void;
        pid: number;
        title: string;
        arch: string;
        platform: string;
        memoryUsage(): { rss: number; heapTotal: number; heapUsed: number; };
        nextTick(callback: Function): void;
        umask(mask?: number): number;
        uptime(): number;
        hrtime(time?: number[]): number[];

        // Worker
        send? (message: any, sendHandle?: any): void;
    }

    export interface Timer {
        ref(): void;
        unref(): void;
    }
}


/**
 * @deprecated
 */
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): any;
    length: number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    readUInt8(offset: number, noAsset?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    writeUInt8(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt8(value: number, offset: number, noAssert?: boolean): void;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): void;
    fill(value: any, offset?: number, end?: number): void;
}

declare module NodeJS {
    export interface Path {
        normalize(p: string): string;
        join(...paths: any[]): string;
        resolve(...pathSegments: any[]): string;
        relative(from: string, to: string): string;
        dirname(p: string): string;
        basename(p: string, ext?: string): string;
        extname(p: string): string;
        sep: string;
    }
}

declare module NodeJS {
    export interface ReadLineInstance extends EventEmitter {
        setPrompt(prompt: string, length: number): void;
        prompt(preserveCursor?: boolean): void;
        question(query: string, callback: Function): void;
        pause(): void;
        resume(): void;
        close(): void;
        write(data: any, key?: any): void;
    }
    export interface ReadLineOptions {
        input: NodeJS.ReadableStream;
        output: NodeJS.WritableStream;
        completer?: Function;
        terminal?: boolean;
    }

    export interface ReadLine {
        createInterface(options: ReadLineOptions): ReadLineInstance;
    }
}

declare module NodeJS {
    module events {
        export class EventEmitter implements NodeJS.EventEmitter {
            static listenerCount(emitter: EventEmitter, event: string): number;

            addListener(event: string, listener: Function): EventEmitter;
            on(event: string, listener: Function): EventEmitter;
            once(event: string, listener: Function): EventEmitter;
            removeListener(event: string, listener: Function): EventEmitter;
            removeAllListeners(event?: string): EventEmitter;
            setMaxListeners(n: number): void;
            listeners(event: string): Function[];
            emit(event: string, ...args: any[]): boolean;
        }
    }
}

declare module NodeJS {
    module stream {

        export interface Stream extends events.EventEmitter {
            pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
        }

        export interface ReadableOptions {
            highWaterMark?: number;
            encoding?: string;
            objectMode?: boolean;
        }

        export class Readable extends events.EventEmitter implements NodeJS.ReadableStream {
            readable: boolean;
            constructor(opts?: ReadableOptions);
            _read(size: number): void;
            read(size?: number): any;
            setEncoding(encoding: string): void;
            pause(): void;
            resume(): void;
            pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
            unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
            unshift(chunk: string): void;
            unshift(chunk: Buffer): void;
            wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
            push(chunk: any, encoding?: string): boolean;
        }

        export interface WritableOptions {
            highWaterMark?: number;
            decodeStrings?: boolean;
        }

        export class Writable extends events.EventEmitter implements NodeJS.WritableStream {
            writable: boolean;
            constructor(opts?: WritableOptions);
            _write(data: Buffer, encoding: string, callback: Function): void;
            _write(data: string, encoding: string, callback: Function): void;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export interface DuplexOptions extends ReadableOptions, WritableOptions {
            allowHalfOpen?: boolean;
        }

        // Note: Duplex extends both Readable and Writable.
        export class Duplex extends Readable implements NodeJS.ReadWriteStream {
            writable: boolean;
            constructor(opts?: DuplexOptions);
            _write(data: Buffer, encoding: string, callback: Function): void;
            _write(data: string, encoding: string, callback: Function): void;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export interface TransformOptions extends ReadableOptions, WritableOptions { }

        // Note: Transform lacks the _read and _write methods of Readable/Writable.
        export class Transform extends events.EventEmitter implements NodeJS.ReadWriteStream {
            readable: boolean;
            writable: boolean;
            constructor(opts?: TransformOptions);
            _transform(chunk: Buffer, encoding: string, callback: Function): void;
            _transform(chunk: string, encoding: string, callback: Function): void;
            _flush(callback: Function): void;
            read(size?: number): any;
            setEncoding(encoding: string): void;
            pause(): void;
            resume(): void;
            pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
            unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
            unshift(chunk: string): void;
            unshift(chunk: Buffer): void;
            wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
            push(chunk: any, encoding?: string): boolean;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export class PassThrough extends Transform { }
    }
}

declare module NodeJS {
    module fs {
        interface Stats {
            isFile(): boolean;
            isDirectory(): boolean;
            isBlockDevice(): boolean;
            isCharacterDevice(): boolean;
            isSymbolicLink(): boolean;
            isFIFO(): boolean;
            isSocket(): boolean;
            dev: number;
            ino: number;
            mode: number;
            nlink: number;
            uid: number;
            gid: number;
            rdev: number;
            size: number;
            blksize: number;
            blocks: number;
            atime: Date;
            mtime: Date;
            ctime: Date;
        }
        interface FSWatcher extends events.EventEmitter {
            close(): void;
        }

        export interface ReadStream extends stream.Readable { }
        export interface WriteStream extends stream.Writable { }

        export function rename(oldPath: string, newPath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function renameSync(oldPath: string, newPath: string): void;
        export function truncate(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function truncate(path: string, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function truncateSync(path: string, len?: number): void;
        export function ftruncate(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function ftruncate(fd: number, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function ftruncateSync(fd: number, len?: number): void;
        export function chown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function chownSync(path: string, uid: number, gid: number): void;
        export function fchown(fd: number, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function fchownSync(fd: number, uid: number, gid: number): void;
        export function lchown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function lchownSync(path: string, uid: number, gid: number): void;
        export function chmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function chmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function chmodSync(path: string, mode: number): void;
        export function chmodSync(path: string, mode: string): void;
        export function fchmod(fd: number, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function fchmod(fd: number, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function fchmodSync(fd: number, mode: number): void;
        export function fchmodSync(fd: number, mode: string): void;
        export function lchmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function lchmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function lchmodSync(path: string, mode: number): void;
        export function lchmodSync(path: string, mode: string): void;
        export function stat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
        export function lstat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
        export function fstat(fd: number, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
        export function statSync(path: string): Stats;
        export function lstatSync(path: string): Stats;
        export function fstatSync(fd: number): Stats;
        export function link(srcpath: string, dstpath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function linkSync(srcpath: string, dstpath: string): void;
        export function symlink(srcpath: string, dstpath: string, type?: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function symlinkSync(srcpath: string, dstpath: string, type?: string): void;
        export function readlink(path: string, callback?: (err: NodeJS.ErrnoException, linkString: string) => any): void;
        export function readlinkSync(path: string): string;
        export function realpath(path: string, callback?: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
        export function realpath(path: string, cache: { [path: string]: string }, callback: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
        export function realpathSync(path: string, cache?: { [path: string]: string }): string;
        export function unlink(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function unlinkSync(path: string): void;
        export function rmdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function rmdirSync(path: string): void;
        export function mkdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function mkdir(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function mkdir(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function mkdirSync(path: string, mode?: number): void;
        export function mkdirSync(path: string, mode?: string): void;
        export function readdir(path: string, callback?: (err: NodeJS.ErrnoException, files: string[]) => void): void;
        export function readdirSync(path: string): string[];
        export function close(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function closeSync(fd: number): void;
        export function open(path: string, flags: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
        export function open(path: string, flags: string, mode: number, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
        export function open(path: string, flags: string, mode: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
        export function openSync(path: string, flags: string, mode?: number): number;
        export function openSync(path: string, flags: string, mode?: string): number;
        export function utimes(path: string, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function utimes(path: string, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function utimesSync(path: string, atime: number, mtime: number): void;
        export function utimesSync(path: string, atime: Date, mtime: Date): void;
        export function futimes(fd: number, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function futimes(fd: number, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function futimesSync(fd: number, atime: number, mtime: number): void;
        export function futimesSync(fd: number, atime: Date, mtime: Date): void;
        export function fsync(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
        export function fsyncSync(fd: number): void;
        export function write(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
        export function writeSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
        export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => void): void;
        export function readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
        export function readFile(filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
        export function readFile(filename: string, options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
        export function readFile(filename: string, options: { flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
        export function readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
        export function readFileSync(filename: string, encoding: string): string;
        export function readFileSync(filename: string, options: { encoding: string; flag?: string; }): string;
        export function readFileSync(filename: string, options?: { flag?: string; }): Buffer;
        export function writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
        export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
        export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
        export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
        export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
        export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
        export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
        export function appendFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
        export function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
        export function appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
        export function watchFile(filename: string, listener: (curr: Stats, prev: Stats) => void): void;
        export function watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: (curr: Stats, prev: Stats) => void): void;
        export function unwatchFile(filename: string, listener?: (curr: Stats, prev: Stats) => void): void;
        export function watch(filename: string, listener?: (event: string, filename: string) => any): FSWatcher;
        export function watch(filename: string, options: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): FSWatcher;
        export function exists(path: string, callback?: (exists: boolean) => void): void;
        export function existsSync(path: string): boolean;
        export function createReadStream(path: string, options?: {
            flags?: string;
            encoding?: string;
            fd?: string;
            mode?: number;
            bufferSize?: number;
        }): ReadStream;
        export function createReadStream(path: string, options?: {
            flags?: string;
            encoding?: string;
            fd?: string;
            mode?: string;
            bufferSize?: number;
        }): ReadStream;
        export function createWriteStream(path: string, options?: {
            flags?: string;
            encoding?: string;
            string?: string;
        }): WriteStream;
    }
}

declare module NodeJS {
    module path {
        export function normalize(p: string): string;
        export function join(...paths: any[]): string;
        export function resolve(...pathSegments: any[]): string;
        export function relative(from: string, to: string): string;
        export function dirname(p: string): string;
        export function basename(p: string, ext?: string): string;
        export function extname(p: string): string;
        export var sep: string;
    }
}

declare module NodeJS {
    module _debugger {
        export interface Packet {
            raw: string;
            headers: string[];
            body: Message;
        }

        export interface Message {
            seq: number;
            type: string;
        }

        export interface RequestInfo {
            command: string;
            arguments: any;
        }

        export interface Request extends Message, RequestInfo {
        }

        export interface Event extends Message {
            event: string;
            body?: any;
        }

        export interface Response extends Message {
            request_seq: number;
            success: boolean;
            /** Contains error message if success == false. */
            message?: string;
            /** Contains message body if success == true. */
            body?: any;
        }

        export interface BreakpointMessageBody {
            type: string;
            target: number;
            line: number;
        }

        export class Protocol {
            res: Packet;
            state: string;
            execute(data: string): void;
            serialize(rq: Request): string;
            onResponse: (pkt: Packet) => void;
        }

        export var NO_FRAME: number;
        export var port: number;

        export interface ScriptDesc {
            name: string;
            id: number;
            isNative?: boolean;
            handle?: number;
            type: string;
            lineOffset?: number;
            columnOffset?: number;
            lineCount?: number;
        }

        export interface Breakpoint {
            id: number;
            scriptId: number;
            script: ScriptDesc;
            line: number;
            condition?: string;
            scriptReq?: string;
        }

        export interface RequestHandler {
            (err: boolean, body: Message, res: Packet): void;
            request_seq?: number;
        }

        export interface ResponseBodyHandler {
            (err: boolean, body?: any): void;
            request_seq?: number;
        }

        export interface ExceptionInfo {
            text: string;
        }

        export interface BreakResponse {
            script?: ScriptDesc;
            exception?: ExceptionInfo;
            sourceLine: number;
            sourceLineText: string;
            sourceColumn: number;
        }

        export function SourceInfo(body: BreakResponse): string;

        export class Client extends events.EventEmitter {
            protocol: Protocol;
            scripts: ScriptDesc[];
            handles: ScriptDesc[];
            breakpoints: Breakpoint[];
            currentSourceLine: number;
            currentSourceColumn: number;
            currentSourceLineText: string;
            currentFrame: number;
            currentScript: string;

            connect(port: number, host: string): void;
            req(req: any, cb: RequestHandler): void;
            reqFrameEval(code: string, frame: number, cb: RequestHandler): void;
            mirrorObject(obj: any, depth: number, cb: ResponseBodyHandler): void;
            setBreakpoint(rq: BreakpointMessageBody, cb: RequestHandler): void;
            clearBreakpoint(rq: Request, cb: RequestHandler): void;
            listbreakpoints(cb: RequestHandler): void;
            reqSource(from: number, to: number, cb: RequestHandler): void;
            reqScripts(cb: any): void;
            reqContinue(cb: RequestHandler): void;
        }
    }
}