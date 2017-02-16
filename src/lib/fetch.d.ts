/// The fetch API standard can be found at https://fetch.spec.whatwg.org/
/// Definitions by: Ryan Graham <https://github.com/ryan-codingintrigue>, Kagami Sascha Rosylight <https://github.com/saschanaz>, Robin Van den Broeck <https://github.com/gamesmaxed>

/// <reference path="lib.streams.d.ts" />

interface Window {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
}
declare var fetch: typeof window.fetch;

declare type HeadersInit = Headers | string[][] | { [key: string]: string };
declare class Headers {
    constructor(init?: HeadersInit);

    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;

    // WebIDL pair iterator: iterable<ByteString, ByteString>
    entries(): IterableIterator<[string, string]>;
    forEach(callback: (value: string, index: number, headers: Headers) => void, thisArg?: any): void;
    keys(): IterableIterator<string>;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<[string, string]>;
}

declare type BodyInit = Blob | ArrayBufferView | ArrayBuffer | FormData | URLSearchParams | string;
interface Body {
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
}

declare type RequestInfo = Request | string;
declare class Request {
    constructor(input: RequestInfo, init?: RequestInit);

    readonly method: string;
    readonly url: string;
    readonly headers: Headers;

    readonly type: RequestType
    readonly destination: RequestDestination;
    readonly referrer: string;
    readonly referrerPolicy: ReferrerPolicy;
    readonly mode: RequestMode;
    readonly credentials: RequestCredentials;
    readonly cache: RequestCache;
    readonly redirect: RequestRedirect;
    readonly integrity: string;
    readonly keepalive: boolean;

    clone(): Request;
}

interface Request extends Body { }
interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    mode?: RequestMode;
    credentials?: RequestCredentials;
    cache?: RequestCache;
    redirect?: RequestRedirect;
    integrity?: string;
    window?: any;
}

type RequestType = "" | "audio" | "font" | "image" | "script" | "style" | "track" | "video";
type RequestDestination = "" | "document" | "embed" | "font" | "image" | "manifest" | "media" | "object" | "report" | "script" | "serviceworker" | "sharedworker" | "style" | "worker" | "xslt";
type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
type RequestCredentials = "omit" | "same-origin" | "include";
type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
type RequestRedirect = "follow" | "error" | "manual";
type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "same-origin" | "origin" | "strict-origin" | "origin-when-cross-origin" | "strict-origin-when-cross-origin" | "unsafe-url";

declare class Response {
    constructor(body?: BodyInit, init?: ResponseInit);

    static error(): Response;
    static redirect(url: string, status?: number): Response;

    readonly type: ResponseType;
    readonly url: string;
    readonly redirected: boolean;
    readonly status: number;
    readonly ok: boolean;
    readonly statusText: string;
    readonly headers: Headers;
    // TODO: Readable stream implementation (I could not find the definitions of this type)
    readonly body: ReadableStream | null;
    readonly trailer: Promise<Headers>;

    clone(): Response;
}
interface Response extends Body { }
interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: HeadersInit;
}

type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";

declare class URLSearchParams {
    constructor(init?: string);

    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | void;
    getAll(name: string): string[];
    has(name: string): boolean;
    set(name: string, value: string): void;

    entries(): IterableIterator<[string, string]>;
    forEach(callback: (value: string, index: number, params: URLSearchParams) => void, thisArg?: any): void;
    keys(): IterableIterator<string>;
    values(): IterableIterator<string>;
    [Symbol.iterator](): IterableIterator<[string, string]>;

    // TODO: stringifier
}
