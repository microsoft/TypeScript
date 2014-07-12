/************************************************
*                                               *
*               Node.js v0.8.8 API              *
*                                               *
************************************************/

/************************************************
*                                               *
*                   GLOBAL                      *
*                                               *
************************************************/
declare var process: NodeProcess;
declare var global: any;

declare var __filename: string;
declare var __dirname: string;

declare function setTimeout(callback: () => void , ms: number): any;
declare function clearTimeout(timeoutId: any);
declare function setInterval(callback: () => void , ms: number): any;
declare function clearInterval(intervalId: any);

declare var require: {
    (id: string): any;
    resolve(): string;
    cache: any;
    extensions: any;
}

declare var module: {
    exports: any;
    require(id: string): any;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
}

// Same as module.exports
declare var exports: any;
declare var SlowBuffer: {
    new (str: string, encoding?: string): NodeBuffer;
    new (size: number): NodeBuffer;
    new (array: any[]): NodeBuffer;
    prototype: NodeBuffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: NodeBuffer[], totalLength?: number): NodeBuffer;
};
declare var Buffer: {
    new (str: string, encoding?: string): NodeBuffer;
    new (size: number): NodeBuffer;
    new (array: any[]): NodeBuffer;
    prototype: NodeBuffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: NodeBuffer[], totalLength?: number): NodeBuffer;
}

/************************************************
*                                               *
*                   INTERFACES                  *
*                                               *
************************************************/

declare class EventEmitter {
    addListener(event: string, listener: Function);
    on(event: string, listener: Function);
    once(event: string, listener: Function): void;
    removeListener(event: string, listener: Function): void;
    removeAllListener(event: string): void;
    setMaxListeners(n: number): void;
    listeners(event: string): { Function; }[];
    emit(event: string, arg1?: any, arg2?: any): void;
}

declare class WritableStream extends EventEmitter {
    writable: boolean;
    write(str: string, encoding?: string, fd?: string): boolean;
    write(buffer: NodeBuffer): boolean;
    end(): void;
    end(str: string, enconding: string): void;
    end(buffer: NodeBuffer): void;
    destroy(): void;
    destroySoon(): void;
}

declare class ReadableStream extends EventEmitter {
    readable: boolean;
    setEncoding(encoding: string): void;
    pause(): void;
    resume(): void;
    destroy(): void;
    pipe(destination: WritableStream, options?: { end?: boolean; }): void;
}

declare class NodeProcess extends EventEmitter {
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
    getuid(): number;
    setuid(id: number): void;
    version: string;
    versions: { http_parser: string; node: string; v8: string; ares: string; uv: string; zlib: string; openssl: string; };
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
    memoryUsage(): { rss: number; heapTotal; number; heapUsed: number; };
    nextTick(callback: Function): void;
    umask(mask?: number): number;
    uptime(): number;
    hrtime(): number[];
}

// Buffer class
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    length: number;
    copy(targetBuffer: NodeBuffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): void;
    slice(start?: number, end?: number): NodeBuffer;
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
    INSPECT_MAX_BYTES: number;
}

/************************************************
*                                               *
*                   MODULES                     *
*                                               *
************************************************/
declare module "querystring" {
    export function stringify(obj: any, sep?: string, eq?: string): string;
    export function parse(str: string, sep?: string, eq?: string, options?: { maxKeys?: number; }): any;
    export function escape(): any;
    export function unescape(): any;
}

declare module "events" {
    export class EventEmitter {
        addListener(event: string, listener: Function);
        on(event: string, listener: Function): any;
        once(event: string, listener: Function): void;
        removeListener(event: string, listener: Function): void;
        removeAllListener(event: string): void;
        setMaxListeners(n: number): void;
        listeners(event: string): { Function; }[];
        emit(event: string, arg1?: any, arg2?: any): void;
    }
}

declare module "http" {
    import events = require("events");
    import net = require("net");
    import stream = require("stream");

    export class Server extends events.EventEmitter {
        listen(port: number, hostname?: string, backlog?: number, callback?: Function): void;
        listen(path: string, callback?: Function): void;
        listen(handle: any, listeningListener?: Function): void;
        close(cb?: any): void;
        maxHeadersCount: number;
    }
    export class ServerRequest extends stream.ReadableStream {
        method: string;
        url: string;
        headers: string;
        trailers: string;
        httpVersion: string;
        setEncoding(encoding?: string): void;
        pause(): void;
        resume(): void;
        connection: net.NodeSocket;
    }
    export class ServerResponse extends stream.WritableStream {
        // Extended base methods
        write(str: string, encoding?: string, fd?: string): boolean;
        write(buffer: NodeBuffer): boolean;

        writeContinue(): void;
        writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void;
        writeHead(statusCode: number, headers?: any): void;
        statusCode: number;
        setHeader(name: string, value: string): void;
        sendDate: boolean;
        getHeader(name: string): string;
        removeHeader(name: string): void;
        write(chunk: any, encoding?: string): any;
        addTrailers(headers: any): void;
        end(data?: any, encoding?: string): void;
    }
    export class ClientRequest extends stream.WritableStream {
        // Extended base methods
        write(str: string, encoding?: string, fd?: string): boolean;
        write(buffer: NodeBuffer): boolean;

        write(chunk: any, encoding?: string): void;
        end(data?: any, encoding?: string): void;
        abort(): void;
        setTimeout(timeout: number, callback?: Function): void;
        setNoDelay(noDelay?: Function): void;
        setSocketKeepAlive(enable?: boolean, initialDelay?: number): void;
    }
    export class ClientResponse extends stream.ReadableStream {
        statusCode: number;
        httpVersion: string;
        headers: any;
        trailers: any;
        setEncoding(encoding?: string): void;
        pause(): void;
        resume(): void;
    }
    export interface Agent { maxSockets: number; sockets: any; requests: any; }

    export var STATUS_CODES;
    export function createServer(requestListener?: (request: ServerRequest, response: ServerResponse) =>void ): Server;
    export function createClient(port?: number, host?: string): any;
    export function request(options: any, callback?: Function): ClientRequest;
    export function get(options: any, callback?: Function): ClientRequest;
    export var globalAgent: Agent;
}

declare module "cluster" {
    import child_process = require("child_process");

    export interface ClusterSettings {
        exec: string;
        args: string[];
        silent: boolean;
    }
    export interface Worker {
        id: string;
        process: child_process.ChildProcess;
        suicide: boolean;
        send(message: any, sendHandle?: any): void;
        destroy(): void;
        disconnect(): void;
    }


    export var settings: ClusterSettings;
    export var isMaster: boolean;
    export var isWorker: boolean;
    export function setupMaster(settings?: ClusterSettings): void;
    export function fork(env?: any): Worker;
    export function disconnect(callback?: Function): void;
    export var workers: any;

    // Event emitter    
    export function addListener(event: string, listener: Function): void;
    export function on(event: string, listener: Function): any;
    export function once(event: string, listener: Function): void;
    export function removeListener(event: string, listener: Function): void;
    export function removeAllListener(event: string): void;
    export function setMaxListeners(n: number): void;
    export function listeners(event: string): { Function; }[];
    export function emit(event: string, arg1?: any, arg2?: any): void;
}

declare module "zlib" {
    import stream = require("stream");
    export interface ZlibOptions { chunkSize?: number; windowBits?: number; level?: number; memLevel?: number; strategy?: number; dictionary?: any; }

    export class Gzip extends stream.ReadWriteStream { }
    export class Gunzip extends stream.ReadWriteStream { }
    export class Deflate extends stream.ReadWriteStream { }
    export class Inflate extends stream.ReadWriteStream { }
    export class DeflateRaw extends stream.ReadWriteStream { }
    export class InflateRaw extends stream.ReadWriteStream { }
    export class Unzip extends stream.ReadWriteStream { }

    export function createGzip(options: ZlibOptions): Gzip;
    export function createGunzip(options: ZlibOptions): Gunzip;
    export function createDeflate(options: ZlibOptions): Deflate;
    export function createInflate(options: ZlibOptions): Inflate;
    export function createDeflateRaw(options: ZlibOptions): DeflateRaw;
    export function createInflateRaw(options: ZlibOptions): InflateRaw;
    export function createUnzip(options: ZlibOptions): Unzip;

    export function deflate(buf: NodeBuffer, callback: (error: Error, result) =>void ): void;
    export function deflateRaw(buf: NodeBuffer, callback: (error: Error, result) =>void ): void;
    export function gzip(buf: NodeBuffer, callback: (error: Error, result) =>void ): void;
    export function gunzip(buf: NodeBuffer, callback: (error: Error, result) =>void ): void;
    export function inflate(buf: NodeBuffer, callback: (error: Error, result) =>void ): void;
    export function inflateRaw(buf: NodeBuffer, callback: (error: Error, result) =>void ): void;
    export function unzip(buf: NodeBuffer, callback: (error: Error, result) =>void ): void;

    // Constants
    export var Z_NO_FLUSH: number;
    export var Z_PARTIAL_FLUSH: number;
    export var Z_SYNC_FLUSH: number;
    export var Z_FULL_FLUSH: number;
    export var Z_FINISH: number;
    export var Z_BLOCK: number;
    export var Z_TREES: number;
    export var Z_OK: number;
    export var Z_STREAM_END: number;
    export var Z_NEED_DICT: number;
    export var Z_ERRNO: number;
    export var Z_STREAM_ERROR: number;
    export var Z_DATA_ERROR: number;
    export var Z_MEM_ERROR: number;
    export var Z_BUF_ERROR: number;
    export var Z_VERSION_ERROR: number;
    export var Z_NO_COMPRESSION: number;
    export var Z_BEST_SPEED: number;
    export var Z_BEST_COMPRESSION: number;
    export var Z_DEFAULT_COMPRESSION: number;
    export var Z_FILTERED: number;
    export var Z_HUFFMAN_ONLY: number;
    export var Z_RLE: number;
    export var Z_FIXED: number;
    export var Z_DEFAULT_STRATEGY: number;
    export var Z_BINARY: number;
    export var Z_TEXT: number;
    export var Z_ASCII: number;
    export var Z_UNKNOWN: number;
    export var Z_DEFLATED: number;
    export var Z_NULL: number;
}

declare module "os" {
    export function tmpDir(): string;
    export function hostname(): string;
    export function type(): string;
    export function platform(): string;
    export function arch(): string;
    export function release(): string;
    export function uptime(): number;
    export function loadavg(): number[];
    export function totalmem(): number;
    export function freemem(): number;
    export function cpus(): { model: string; speed: number; times: { user: number; nice: number; sys: number; idle: number; irq: number; }; }[];
    export function networkInterfaces(): any;
    export var EOL: string;
}

declare module "https" {
    import tls = require("tls");
    import events = require("events");
    import http = require("http");

    export interface ServerOptions {
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        crl?: any;
        ciphers?: string;
        honorCipherOrder?: boolean;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;
        SNICallback?: (servername: string) => any;
    }

    export interface RequestOptions {
        host?: string;
        hostname?: string;
        port?: number;
        path?: string;
        method?: string;
        headers?: any;
        auth?: string;
        agent?: any;
        pfx?: any;
        key?: any;
        passphrase?: string;
        cert?: any;
        ca?: any;
        ciphers?: string;
        rejectUnauthorized?: boolean;
    }

    export interface NodeAgent {
        maxSockets: number;
        sockets: any;
        requests: any;
    }
    export var Agent: {
        new (options?: RequestOptions): NodeAgent;
    };
    export class Server extends tls.Server { }
    export function createServer(options: ServerOptions, requestListener?: Function): Server;
    export function request(options: RequestOptions, callback?: (res: events.EventEmitter) =>void ): http.ClientRequest;
    export function get(options: RequestOptions, callback?: (res: events.EventEmitter) =>void ): http.ClientRequest;
    export var globalAgent: NodeAgent;
}

declare module "punycode" {
    export function decode(string: string): string;
    export function encode(string: string): string;
    export function toUnicode(domain: string): string;
    export function toASCII(domain: string): string;
    export var ucs2: ucs2;
    export interface ucs2 {
        decode(string: string): string;
        encode(codePoints: number[]): string;
    }
    export var version;
}

declare module "repl" {
    import stream = require("stream");
    import events = require("events");

    export interface ReplOptions {
        prompt?: string;
        input?: stream.ReadableStream;
        output?: stream.WritableStream;
        terminal?: boolean;
        eval?: Function;
        useColors?: boolean;
        useGlobal?: boolean;
        ignoreUndefined?: boolean;
        writer?: Function;
    }
    export function start(options: ReplOptions): events.EventEmitter;
}

declare module "readline" {
    import events = require("events");
    import stream = require("stream");

    export class ReadLine extends events.EventEmitter {
        setPrompt(prompt: string, length: number): void;
        prompt(preserveCursor?: boolean): void;
        question(query: string, callback: Function): void;
        pause(): void;
        resume(): void;
        close(): void;
        write(data: any, key?: any): void;
    }
    export interface ReadLineOptions {
        input: stream.ReadableStream;
        output: stream.WritableStream;
        completer?: Function;
        terminal?: boolean;
    }
    export function createInterface(options: ReadLineOptions): ReadLine;
}

declare module "vm" {
    export interface Context { }
    export interface Script {
        runInThisContext(): void;
        runInNewContext(sandbox?: Context): void;
    }
    export function runInThisContext(code: string, filename?: string): void;
    export function runInNewContext(code: string, sandbox?: Context, filename?: string): void;
    export function runInContext(code: string, context: Context, filename?: string): void;
    export function createContext(initSandbox?: Context): Context;
    export function createScript(code: string, filename?: string): Script;
}

declare module "child_process" {
    import events = require("events");
    import stream = require("stream");

    export class ChildProcess extends events.EventEmitter {
        stdin: stream.WritableStream;
        stdout: stream.ReadableStream;
        stderr: stream.ReadableStream;
        pid: number;
        kill(signal?: string): void;
        send(message: any, sendHandle: any): void;
        disconnect(): void;
    }

    export function spawn(command: string, args?: string[], options?: {
        cwd?: string;
        stdio?: any;
        custom?: any;
        env?: any;
        detached?: boolean;
    }): ChildProcess;
    export function exec(command: string, options: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: number;
        killSignal?: string;
    }, callback: (error: Error, stdout: NodeBuffer, stderr: NodeBuffer) =>void ): ChildProcess;
    export function exec(command: string, callback: (error: Error, stdout: NodeBuffer, stderr: NodeBuffer) =>void ): ChildProcess;
    export function execFile(file: string, args: string[], options: {
        cwd?: string;
        stdio?: any;
        customFds?: any;
        env?: any;
        encoding?: string;
        timeout?: number;
        maxBuffer?: string;
        killSignal?: string;
    }, callback: (error: Error, stdout: NodeBuffer, stderr: NodeBuffer) =>void ): ChildProcess;
    export function fork(modulePath: string, args?: string[], options?: {
        cwd?: string;
        env?: any;
        encoding?: string;
    }): ChildProcess;
}

declare module "url" {
    export interface Url {
        href?: string;
        protocol?: string;
        auth?: string;
        hostname?: string;
        port?: string;
        host?: string;
        pathname?: string;
        search?: string;
        query?: string;
        slashes?: boolean;
        hash?: string;
    }

    export function parse(urlStr: string, parseQueryString? , slashesDenoteHost? ): Url;
    export function format(url: Url): string;
    export function resolve(from: string, to: string): string;
}

declare module "dns" {
    export function lookup(domain: string, family: number, callback: (err: Error, address: string, family: number) =>void ): string;
    export function lookup(domain: string, callback: (err: Error, address: string, family: number) =>void ): string;
    export function resolve(domain: string, rrtype: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve4(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolve6(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveMx(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveTxt(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveSrv(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveNs(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function resolveCname(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
    export function reverse(ip: string, callback: (err: Error, domains: string[]) =>void ): string[];
}

declare module "net" {
    import stream = require("stream");

    export class NodeSocket extends stream.ReadWriteStream {
        // Extended base methods
        write(str: string, encoding?: string, fd?: string): boolean;
        write(buffer: NodeBuffer): boolean;

        connect(port: number, host?: string, connectionListener?: Function): void;
        connect(path: string, connectionListener?: Function): void;
        bufferSize: number;
        setEncoding(encoding?: string): void;
        write(data: any, encoding?: string, callback?: Function): void;
        end(data?: any, encoding?: string): void;
        destroy(): void;
        pause(): void;
        resume(): void;
        setTimeout(timeout: number, callback?: Function); void;
        setNoDelay(noDelay?: boolean): void;
        setKeepAlive(enable?: boolean, initialDelay?: number): void;
        address(): { port: number; family: string; address: string; };
        remoteAddress: string;
        remotePort: number;
        bytesRead: number;
        bytesWritten: number;
    }

    export var Socket: {
        new (options?: { fd?: string; type?: string; allowHalfOpen?: boolean; }): NodeSocket;
    };

    export class Server extends NodeSocket {
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): void;
        listen(path: string, listeningListener?: Function): void;
        listen(handle: any, listeningListener?: Function): void;
        close(callback?: Function): void;
        address(): { port: number; family: string; address: string; };
        maxConnections: number;
        connections: number;
    }
    export function createServer(connectionListener?: (socket: NodeSocket) =>void ): Server;
    export function createServer(options?: { allowHalfOpen?: boolean; }, connectionListener?: (socket: NodeSocket) =>void ): Server;
    export function connect(options: { allowHalfOpen?: boolean; }, connectionListener?: Function): void;
    export function connect(port: number, host?: string, connectionListener?: Function): void;
    export function connect(path: string, connectionListener?: Function): void;
    export function createConnection(options: { allowHalfOpen?: boolean; }, connectionListener?: Function): void;
    export function createConnection(port: number, host?: string, connectionListener?: Function): void;
    export function createConnection(path: string, connectionListener?: Function): void;
    export function isIP(input: string): number;
    export function isIPv4(input: string): boolean;
    export function isIPv6(input: string): boolean;
}

declare module "dgram" {
    import events = require("events");

    export function createSocket(type: string, callback?: Function): Socket;

    export class Socket extends events.EventEmitter {
        send(buf: NodeBuffer, offset: number, length: number, port: number, address: string, callback?: Function): void;
        bind(port: number, address?: string): void;
        close(): void;
        address: { address: string; family: string; port: number; };
        setBroadcast(flag: boolean): void;
        setMulticastTTL(ttl: number): void;
        setMulticastLoopback(flag: boolean): void;
        addMembership(multicastAddress: string, multicastInterface?: string): void;
        dropMembership(multicastAddress: string, multicastInterface?: string): void;
    }
}

declare module "fs" {
    import stream = require("stream");

    export interface Stats {
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

    export interface FSWatcher {
        close(): void;
    }

    export class ReadStream extends stream.ReadableStream { }
    export class WriteStream extends stream.WritableStream { }

    export function rename(oldPath: string, newPath: string, callback?: Function): void;
    export function renameSync(oldPath: string, newPath: string): void;
    export function truncate(fd: number, len: number, callback?: Function): void;
    export function truncateSync(fd: number, len: number): void;
    export function chown(path: string, uid: number, gid: number, callback?: Function): void;
    export function chownSync(path: string, uid: number, gid: number): void;
    export function fchown(fd: number, uid: number, gid: number, callback?: Function): void;
    export function fchownSync(fd: number, uid: number, gid: number): void;
    export function lchown(path: string, uid: number, gid: number, callback?: Function): void;
    export function lchownSync(path: string, uid: number, gid: number): void;
    export function chmod(path: string, mode: number, callback?: Function): void;
    export function chmod(path: string, mode: string, callback?: Function): void;
    export function chmodSync(path: string, mode: number): void;
    export function chmodSync(path: string, mode: string): void;
    export function fchmod(fd: number, mode: number, callback?: Function): void;
    export function fchmod(fd: number, mode: string, callback?: Function): void;
    export function fchmodSync(fd: number, mode: number): void;
    export function fchmodSync(fd: number, mode: string): void;
    export function lchmod(path: string, mode: string, callback?: Function): void;
    export function lchmod(path: string, mode: number, callback?: Function): void;
    export function lchmodSync(path: string, mode: number): void;
    export function lchmodSync(path: string, mode: string): void;
    export function stat(path: string, callback?: (err: Error, stats: Stats) =>any): Stats;
    export function lstat(path: string, callback?: (err: Error, stats: Stats) =>any): Stats;
    export function fstat(fd: number, callback?: (err: Error, stats: Stats) =>any): Stats;
    export function statSync(path: string): Stats;
    export function lstatSync(path: string): Stats;
    export function fstatSync(fd: number): Stats;
    export function link(srcpath: string, dstpath: string, callback?: Function): void;
    export function linkSync(srcpath: string, dstpath: string): void;
    export function symlink(srcpath: string, dstpath: string, type?: string, callback?: Function): void;
    export function symlinkSync(srcpath: string, dstpath: string, type?: string): void;
    export function readlink(path: string, callback?: (err: Error, linkString: string) =>any): void;
    export function realpath(path: string, callback?: (err: Error, resolvedPath: string) =>any): void;
    export function realpath(path: string, cache: string, callback: (err: Error, resolvedPath: string) =>any): void;
    export function realpathSync(path: string, cache?: string): string;
    export function unlink(path: string, callback?: Function): void;
    export function unlinkSync(path: string): void;
    export function rmdir(path: string, callback?: Function): void;
    export function rmdirSync(path: string): void;
    export function mkdir(path: string, mode?: number, callback?: Function): void;
    export function mkdir(path: string, mode?: string, callback?: Function): void;
    export function mkdirSync(path: string, mode?: number): void;
    export function mkdirSync(path: string, mode?: string): void;
    export function readdir(path: string, callback?: (err: Error, files: string[]) => void): void;
    export function readdirSync(path: string): string[];
    export function close(fd: number, callback?: Function): void;
    export function closeSync(fd: number): void;
    export function open(path: string, flags: string, mode?: string, callback?: (err: Error, fd: number) =>any): void;
    export function openSync(path: string, flags: string, mode?: string): number;
    export function utimes(path: string, atime: number, mtime: number, callback?: Function): void;
    export function utimesSync(path: string, atime: number, mtime: number): void;
    export function futimes(fd: number, atime: number, mtime: number, callback?: Function): void;
    export function futimesSync(fd: number, atime: number, mtime: number): void;
    export function fsync(fd: number, callback?: Function): void;
    export function fsyncSync(fd: number): void;
    export function write(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number, callback?: (err: Error, written: number, buffer: NodeBuffer) =>any): void;
    export function writeSync(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number): number;
    export function read(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number, callback?: (err: Error, bytesRead: number, buffer: NodeBuffer) => void): void;
    export function readSync(fd: number, buffer: NodeBuffer, offset: number, length: number, position: number): number;
    export function readFile(filename: string, encoding: string, callback: (err: Error, data: string) => void ): void;
    export function readFile(filename: string, callback: (err: Error, data: NodeBuffer) => void ): void;
    export function readFileSync(filename: string): NodeBuffer;
    export function readFileSync(filename: string, encoding: string): string;
    export function writeFile(filename: string, data: any, encoding?: string, callback?: Function): void;
    export function writeFileSync(filename: string, data: any, encoding?: string): void;
    export function appendFile(filename: string, data: any, encoding?: string, callback?: Function): void;
    export function appendFileSync(filename: string, data: any, encoding?: string): void;
    export function watchFile(filename: string, listener: { curr: Stats; prev: Stats; }): void;
    export function watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: { curr: Stats; prev: Stats; }): void;
    export function unwatchFile(filename: string, listener?: Stats): void;
    export function watch(filename: string, options?: { persistent?: boolean; }, listener?: (event: string, filename: string) =>any): FSWatcher;
    export function exists(path: string, callback?: (exists: boolean) =>void ): void;
    export function existsSync(path: string): boolean;
    export function createReadStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        fd?: string;
        mode?: number;
        bufferSize?: number;
    }): ReadStream;
    export function createWriteStream(path: string, options?: {
        flags?: string;
        encoding?: string;
        string?: string;
    }): WriteStream;
}

declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export function resolve(from: string, to: string): string;
    export function resolve(from: string, from2: string, to: string): string;
    export function resolve(from: string, from2: string, from3: string, to: string): string;
    export function resolve(from: string, from2: string, from3: string, from4: string, to: string): string;
    export function resolve(from: string, from2: string, from3: string, from4: string, from5: string, to: string): string;
    export function relative(from: string, to: string): string;
    export function dirname(p: string): string;
    export function basename(p: string, ext?: string): string;
    export function extname(p: string): string;
    export var sep: string;
}

declare module "string_decoder" {
    export interface NodeStringDecoder {
        write(buffer: NodeBuffer): string;
        detectIncompleteChar(buffer: NodeBuffer): number;
    }
    export var StringDecoder: {
        new (encoding: string): NodeStringDecoder;
    };
}

declare module "tls" {
    import crypto = require("crypto");
    import net = require("net");
    import stream = require("stream");

    export var CLIENT_RENEG_LIMIT: number;
    export var CLIENT_RENEG_WINDOW: number;

    export interface TlsOptions {
        pfx?: any;   //string or buffer
        key?: any;   //string or buffer
        passphrase?: string;
        cert?: any;
        ca?: any;    //string or buffer
        crl?: any;   //string or string array
        ciphers?: string;
        honorCipherOrder?: any;
        requestCert?: boolean;
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //array or Buffer;
        SNICallback?: (servername: string) => any;
    }

    export interface ConnectionOptions {
        host?: string;
        port?: number;
        socket?: net.NodeSocket;
        pfx?: any;   //string | Buffer
        key?: any;   //string | Buffer
        passphrase?: string;
        cert?: any;  //string | Buffer
        ca?: any;    //Array of string | Buffer
        rejectUnauthorized?: boolean;
        NPNProtocols?: any;  //Array of string | Buffer
        servername?: string;
    }

    export class Server extends net.Server {
        // Extended base methods
        listen(port: number, host?: string, backlog?: number, listeningListener?: Function): void;
        listen(path: string, listeningListener?: Function): void;
        listen(handle: any, listeningListener?: Function): void;

        listen(port: number, host?: string, callback?: Function): void;
        close(): void;
        address(): { port: number; family: string; address: string; };
        addContext(hostName: string, credentials: {
            key: string;
            cert: string;
            ca: string;
        }): void;
        maxConnections: number;
        connections: number;
    }

    export class ClearTextStream extends stream.ReadWriteStream {
        authorized: boolean;
        authorizationError: Error;
        getPeerCertificate(): any;
        getCipher: {
            name: string;
            version: string;
        };
        address: {
            port: number;
            family: string;
            address: string;
        };
        remoteAddress: string;
        remotePort: number;
    }

    export interface SecurePair {
        encrypted: any;
        cleartext: any;
    }

    export function createServer(options: TlsOptions, secureConnectionListener?: (cleartextStream: ClearTextStream) =>void ): Server;
    export function connect(options: TlsOptions, secureConnectionListener?: () =>void ): ClearTextStream;
    export function connect(port: number, host?: string, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    export function connect(port: number, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
    export function createSecurePair(credentials?: crypto.Credentials, isServer?: boolean, requestCert?: boolean, rejectUnauthorized?: boolean): SecurePair;
}

declare module "crypto" {
    export interface CredentialDetails {
        pfx: string;
        key: string;
        passphrase: string;
        cert: string;
        ca: any;    //string | string array
        crl: any;   //string | string array
        ciphers: string;
    }
    export interface Credentials { context?: any; }
    export function createCredentials(details: CredentialDetails): Credentials;
    export function createHash(algorithm: string): Hash;
    export function createHmac(algorithm: string, key: string): Hmac;
    export interface Hash {
        update(data: any, input_encoding?: string): void;
        digest(encoding?: string): string;
    }
    export interface Hmac {
        update(data: any): void;
        digest(encoding?: string): void;
    }
    export function createCipher(algorithm: string, password: any): Cipher;
    export function createCipheriv(algorithm: string, key: any, iv: any): Cipher;
    export interface Cipher {
        update(data: any, input_encoding?: string, output_encoding?: string): string;
        final(output_encoding?: string): string;
        setAutoPadding(auto_padding: boolean): void;
        createDecipher(algorithm: string, password: any): Decipher;
        createDecipheriv(algorithm: string, key: any, iv: any): Decipher;
    }
    export interface Decipher {
        update(data: any, input_encoding?: string, output_encoding?: string): void;
        final(output_encoding?: string): string;
        setAutoPadding(auto_padding: boolean): void;
    }
    export function createSign(algorithm: string): Signer;
    export interface Signer {
        update(data: any): void;
        sign(private_key: string, output_format: string): string;
    }
    export function createVerify(algorith: string): Verify;
    export interface Verify {
        update(data: any): void;
        verify(object: string, signature: string, signature_format?: string): boolean;
    }
    export function createDiffieHellman(prime_length: number): DiffieHellman;
    export function createDiffieHellman(prime: number, encoding?: string): DiffieHellman;
    export interface DiffieHellman {
        generateKeys(encoding?: string): string;
        computeSecret(other_public_key: string, input_encoding?: string, output_encoding?: string): string;
        getPrime(encoding?: string): string;
        getGenerator(encoding: string): string;
        getPublicKey(encoding?: string): string;
        getPrivateKey(encoding?: string): string;
        setPublicKey(public_key: string, encoding?: string): void;
        setPrivateKey(public_key: string, encoding?: string): void;
    }
    export function getDiffieHellman(group_name: string): DiffieHellman;
    export function pbkdf2(password: string, salt: string, iterations: number, keylen: number, callback: (err: Error, derivedKey: string) => any): void;
    export function randomBytes(size: number, callback?: (err: Error, buf: NodeBuffer) =>void );
}

declare module "stream" {
    import events = require("events");

    export interface WriteStream {
        writable: boolean;
        write(str: string, encoding?: string, fd?: string): boolean;
        write(buffer: NodeBuffer): boolean;
        end(): void;
        end(str: string, enconding: string): void;
        end(buffer: NodeBuffer): void;
        destroy(): void;
        destroySoon(): void;
    }

    export class WritableStream extends events.EventEmitter implements WriteStream {
        writable: boolean;
        write(str: string, encoding?: string, fd?: string): boolean;
        write(buffer: NodeBuffer): boolean;
        end(): void;
        end(str: string, enconding: string): void;
        end(buffer: NodeBuffer): void;
        destroy(): void;
        destroySoon(): void;
    }

    export class ReadableStream extends events.EventEmitter {
        readable: boolean;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        destroy(): void;
        pipe(destination: WriteStream, options?: { end?: boolean; }): void;
    }

    export class ReadWriteStream extends events.EventEmitter implements WriteStream {
        readable: boolean;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe(destination: WriteStream, options?: { end?: boolean; }): void;

        writable: boolean;
        write(str: string, encoding?: string, fd?: string): boolean;
        write(buffer: NodeBuffer): boolean;
        end(): void;
        end(str: string, enconding: string): void;
        end(buffer: NodeBuffer): void;
        destroy(): void;
        destroySoon(): void;
    }
}

declare module "util" {
    export function format(format: any, ...param: any[]): string;
    export function debug(string: string): void;
    export function error(...param: any[]): void;
    export function puts(...param: any[]): void;
    export function print(...param: any[]): void;
    export function log(string: string): void;
    export function inspect(object: any, showHidden?: boolean, depth?: number, color?: boolean): void;
    export function isArray(object: any): boolean;
    export function isRegExp(object: any): boolean;
    export function isDate(object: any): boolean;
    export function isError(object: any): boolean;
    export function inherits(constructor: any, superConstructor: any): void;
}

declare module "assert" {
    export function fail(actual: any, expected: any, message: string, operator: string): void;
    export function assert(value: any, message: string): void;
    export function ok(value: any, message?: string): void;
    export function equal(actual: any, expected: any, message?: string): void;
    export function notEqual(actual: any, expected: any, message?: string): void;
    export function deepEqual(actual: any, expected: any, message?: string): void;
    export function notDeepEqual(acutal: any, expected: any, message?: string): void;
    export function strictEqual(actual: any, expected: any, message?: string): void;
    export function notStrictEqual(actual: any, expected: any, message?: string): void;
    export function throws(block: any, error?: any, messsage?: string): void;
    export function doesNotThrow(block: any, error?: any, messsage?: string): void;
    export function ifError(value: any): void;
}

declare module "tty" {
    import net = require("net");

    export function isatty(fd: string): boolean;
    export class ReadStream extends net.NodeSocket {
        isRaw: boolean;
        setRawMode(mode: boolean): void;
    }
    export class WriteStream extends net.NodeSocket {
        columns: number;
        rows: number;
    }
}

declare module "domain" {
    import events = require("events");

    export class Domain extends events.EventEmitter { }

    export function create(): Domain;
    export function run(fn: Function): void;
    export function add(emitter: events.EventEmitter): void;
    export function remove(emitter: events.EventEmitter): void;
    export function bind(cb: (er: Error, data: any) =>any): any;
    export function intercept(cb: (data: any) => any): any;
    export function dispose(): void;
}