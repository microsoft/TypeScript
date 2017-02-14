/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */



/// <reference no-default-lib="true"/>



/////////////////////////////
/// IE Worker APIs
/////////////////////////////

interface Algorithm {
    name: string;
}

interface CacheQueryOptions {
    ignoreSearch?: boolean;
    ignoreMethod?: boolean;
    ignoreVary?: boolean;
    cacheName?: string;
}

interface CloseEventInit extends EventInit {
    wasClean?: boolean;
    code?: number;
    reason?: string;
}

interface EventInit {
    scoped?: boolean;
    bubbles?: boolean;
    cancelable?: boolean;
}

interface GetNotificationOptions {
    tag?: string;
}

interface IDBIndexParameters {
    multiEntry?: boolean;
    unique?: boolean;
}

interface IDBObjectStoreParameters {
    autoIncrement?: boolean;
    keyPath?: IDBKeyPath;
}

interface KeyAlgorithm {
    name?: string;
}

interface MessageEventInit extends EventInit {
    lastEventId?: string;
    channel?: string;
    data?: any;
    origin?: string;
    source?: any;
    ports?: MessagePort[];
}

interface NotificationOptions {
    dir?: string;
    lang?: string;
    body?: string;
    tag?: string;
    icon?: string;
}

interface PushSubscriptionOptionsInit {
    userVisibleOnly?: boolean;
    applicationServerKey?: any;
}

interface RequestInit {
    method?: string;
    headers?: any;
    body?: any;
    referrer?: string;
    referrerPolicy?: string;
    mode?: string;
    credentials?: string;
    cache?: string;
    redirect?: string;
    integrity?: string;
    keepalive?: boolean;
    window?: any;
}

interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: any;
}

interface ClientQueryOptions {
    includeUncontrolled?: boolean;
    type?: string;
}

interface ExtendableEventInit extends EventInit {
}

interface ExtendableMessageEventInit extends ExtendableEventInit {
    data?: any;
    origin?: string;
    lastEventId?: string;
    source?: Client | ServiceWorker | MessagePort;
    ports?: MessagePort[];
}

interface FetchEventInit extends ExtendableEventInit {
    request?: Request;
    clientId?: string;
    isReload?: boolean;
}

interface NotificationEventInit extends ExtendableEventInit {
    notification?: Notification;
    action?: string;
}

interface PushEventInit extends ExtendableEventInit {
    data?: any;
}

interface SyncEventInit extends ExtendableEventInit {
    tag?: string;
    lastChance?: boolean;
}

interface EventListener {
    (evt: Event): void;
}

interface WebKitEntriesCallback {
    (evt: Event): void;
}

interface WebKitErrorCallback {
    (evt: Event): void;
}

interface WebKitFileCallback {
    (evt: Event): void;
}

interface AudioBuffer {
    readonly duration: number;
    readonly length: number;
    readonly numberOfChannels: number;
    readonly sampleRate: number;
    copyFromChannel(destination: Float32Array, channelNumber: number, startInChannel?: number): void;
    copyToChannel(source: Float32Array, channelNumber: number, startInChannel?: number): void;
    getChannelData(channel: number): Float32Array;
}

declare var AudioBuffer: {
    prototype: AudioBuffer;
    new(): AudioBuffer;
}

interface Blob {
    readonly size: number;
    readonly type: string;
    msClose(): void;
    msDetachStream(): any;
    slice(start?: number, end?: number, contentType?: string): Blob;
}

declare var Blob: {
    prototype: Blob;
    new (blobParts?: any[], options?: BlobPropertyBag): Blob;
}

interface Cache {
    add(request: RequestInfo): Promise<void>;
    addAll(requests: RequestInfo[]): Promise<void>;
    delete(request: RequestInfo, options?: CacheQueryOptions): Promise<boolean>;
    keys(request?: RequestInfo, options?: CacheQueryOptions): any;
    match(request: RequestInfo, options?: CacheQueryOptions): Promise<Response>;
    matchAll(request?: RequestInfo, options?: CacheQueryOptions): any;
    put(request: RequestInfo, response: Response): Promise<void>;
}

declare var Cache: {
    prototype: Cache;
    new(): Cache;
}

interface CacheStorage {
    delete(cacheName: string): Promise<boolean>;
    has(cacheName: string): Promise<boolean>;
    keys(): any;
    match(request: RequestInfo, options?: CacheQueryOptions): Promise<any>;
    open(cacheName: string): Promise<Cache>;
}

declare var CacheStorage: {
    prototype: CacheStorage;
    new(): CacheStorage;
}

interface CloseEvent extends Event {
    readonly code: number;
    readonly reason: string;
    readonly wasClean: boolean;
    initCloseEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, wasCleanArg: boolean, codeArg: number, reasonArg: string): void;
}

declare var CloseEvent: {
    prototype: CloseEvent;
    new(typeArg: string, eventInitDict?: CloseEventInit): CloseEvent;
}

interface Console {
    assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    clear(): void;
    count(countTitle?: string): void;
    debug(message?: any, ...optionalParams: any[]): void;
    dir(value?: any, ...optionalParams: any[]): void;
    dirxml(value: any): void;
    error(message?: any, ...optionalParams: any[]): void;
    exception(message?: string, ...optionalParams: any[]): void;
    group(groupTitle?: string): void;
    groupCollapsed(groupTitle?: string): void;
    groupEnd(): void;
    info(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    msIsIndependentlyComposed(element: any): boolean;
    profile(reportName?: string): void;
    profileEnd(): void;
    select(element: any): void;
    table(...data: any[]): void;
    time(timerName?: string): void;
    timeEnd(timerName?: string): void;
    trace(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
}

declare var Console: {
    prototype: Console;
    new(): Console;
}

interface Coordinates {
    readonly accuracy: number;
    readonly altitude: number | null;
    readonly altitudeAccuracy: number | null;
    readonly heading: number | null;
    readonly latitude: number;
    readonly longitude: number;
    readonly speed: number | null;
}

declare var Coordinates: {
    prototype: Coordinates;
    new(): Coordinates;
}

interface CryptoKey {
    readonly algorithm: KeyAlgorithm;
    readonly extractable: boolean;
    readonly type: string;
    readonly usages: string[];
}

declare var CryptoKey: {
    prototype: CryptoKey;
    new(): CryptoKey;
}

interface DOMError {
    readonly name: string;
    toString(): string;
}

declare var DOMError: {
    prototype: DOMError;
    new(): DOMError;
}

interface DOMException {
    readonly code: number;
    readonly message: string;
    readonly name: string;
    toString(): string;
    readonly ABORT_ERR: number;
    readonly DATA_CLONE_ERR: number;
    readonly DOMSTRING_SIZE_ERR: number;
    readonly HIERARCHY_REQUEST_ERR: number;
    readonly INDEX_SIZE_ERR: number;
    readonly INUSE_ATTRIBUTE_ERR: number;
    readonly INVALID_ACCESS_ERR: number;
    readonly INVALID_CHARACTER_ERR: number;
    readonly INVALID_MODIFICATION_ERR: number;
    readonly INVALID_NODE_TYPE_ERR: number;
    readonly INVALID_STATE_ERR: number;
    readonly NAMESPACE_ERR: number;
    readonly NETWORK_ERR: number;
    readonly NOT_FOUND_ERR: number;
    readonly NOT_SUPPORTED_ERR: number;
    readonly NO_DATA_ALLOWED_ERR: number;
    readonly NO_MODIFICATION_ALLOWED_ERR: number;
    readonly PARSE_ERR: number;
    readonly QUOTA_EXCEEDED_ERR: number;
    readonly SECURITY_ERR: number;
    readonly SERIALIZE_ERR: number;
    readonly SYNTAX_ERR: number;
    readonly TIMEOUT_ERR: number;
    readonly TYPE_MISMATCH_ERR: number;
    readonly URL_MISMATCH_ERR: number;
    readonly VALIDATION_ERR: number;
    readonly WRONG_DOCUMENT_ERR: number;
}

declare var DOMException: {
    prototype: DOMException;
    new(): DOMException;
    readonly ABORT_ERR: number;
    readonly DATA_CLONE_ERR: number;
    readonly DOMSTRING_SIZE_ERR: number;
    readonly HIERARCHY_REQUEST_ERR: number;
    readonly INDEX_SIZE_ERR: number;
    readonly INUSE_ATTRIBUTE_ERR: number;
    readonly INVALID_ACCESS_ERR: number;
    readonly INVALID_CHARACTER_ERR: number;
    readonly INVALID_MODIFICATION_ERR: number;
    readonly INVALID_NODE_TYPE_ERR: number;
    readonly INVALID_STATE_ERR: number;
    readonly NAMESPACE_ERR: number;
    readonly NETWORK_ERR: number;
    readonly NOT_FOUND_ERR: number;
    readonly NOT_SUPPORTED_ERR: number;
    readonly NO_DATA_ALLOWED_ERR: number;
    readonly NO_MODIFICATION_ALLOWED_ERR: number;
    readonly PARSE_ERR: number;
    readonly QUOTA_EXCEEDED_ERR: number;
    readonly SECURITY_ERR: number;
    readonly SERIALIZE_ERR: number;
    readonly SYNTAX_ERR: number;
    readonly TIMEOUT_ERR: number;
    readonly TYPE_MISMATCH_ERR: number;
    readonly URL_MISMATCH_ERR: number;
    readonly VALIDATION_ERR: number;
    readonly WRONG_DOCUMENT_ERR: number;
}

interface DOMStringList {
    readonly length: number;
    contains(str: string): boolean;
    item(index: number): string | null;
    [index: number]: string;
}

declare var DOMStringList: {
    prototype: DOMStringList;
    new(): DOMStringList;
}

interface ErrorEvent extends Event {
    readonly colno: number;
    readonly error: any;
    readonly filename: string;
    readonly lineno: number;
    readonly message: string;
    initErrorEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, messageArg: string, filenameArg: string, linenoArg: number): void;
}

declare var ErrorEvent: {
    prototype: ErrorEvent;
    new(type: string, errorEventInitDict?: ErrorEventInit): ErrorEvent;
}

interface Event {
    readonly bubbles: boolean;
    cancelBubble: boolean;
    readonly cancelable: boolean;
    readonly currentTarget: EventTarget;
    readonly defaultPrevented: boolean;
    readonly eventPhase: number;
    readonly isTrusted: boolean;
    returnValue: boolean;
    readonly srcElement: any;
    readonly target: EventTarget;
    readonly timeStamp: number;
    readonly type: string;
    readonly scoped: boolean;
    initEvent(eventTypeArg: string, canBubbleArg: boolean, cancelableArg: boolean): void;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    deepPath(): EventTarget[];
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
}

declare var Event: {
    prototype: Event;
    new(typeArg: string, eventInitDict?: EventInit): Event;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
}

interface EventTarget {
    addEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var EventTarget: {
    prototype: EventTarget;
    new(): EventTarget;
}

interface File extends Blob {
    readonly lastModifiedDate: any;
    readonly name: string;
    readonly webkitRelativePath: string;
}

declare var File: {
    prototype: File;
    new (parts: (ArrayBuffer | ArrayBufferView | Blob | string)[], filename: string, properties?: FilePropertyBag): File;
}

interface FileList {
    readonly length: number;
    item(index: number): File;
    [index: number]: File;
}

declare var FileList: {
    prototype: FileList;
    new(): FileList;
}

interface FileReader extends EventTarget, MSBaseReader {
    readonly error: DOMError;
    readAsArrayBuffer(blob: Blob): void;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): void;
    readAsText(blob: Blob, encoding?: string): void;
    addEventListener<K extends keyof MSBaseReaderEventMap>(type: K, listener: (this: FileReader, ev: MSBaseReaderEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var FileReader: {
    prototype: FileReader;
    new(): FileReader;
}

interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    forEach(callback: ForEachCallback): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
}

declare var Headers: {
    prototype: Headers;
    new(init?: any): Headers;
}

interface IDBCursor {
    readonly direction: string;
    key: IDBKeyRange | IDBValidKey;
    readonly primaryKey: any;
    source: IDBObjectStore | IDBIndex;
    advance(count: number): void;
    continue(key?: IDBKeyRange | IDBValidKey): void;
    delete(): IDBRequest;
    update(value: any): IDBRequest;
    readonly NEXT: string;
    readonly NEXT_NO_DUPLICATE: string;
    readonly PREV: string;
    readonly PREV_NO_DUPLICATE: string;
}

declare var IDBCursor: {
    prototype: IDBCursor;
    new(): IDBCursor;
    readonly NEXT: string;
    readonly NEXT_NO_DUPLICATE: string;
    readonly PREV: string;
    readonly PREV_NO_DUPLICATE: string;
}

interface IDBCursorWithValue extends IDBCursor {
    readonly value: any;
}

declare var IDBCursorWithValue: {
    prototype: IDBCursorWithValue;
    new(): IDBCursorWithValue;
}

interface IDBDatabaseEventMap {
    "abort": Event;
    "error": Event;
}

interface IDBDatabase extends EventTarget {
    readonly name: string;
    readonly objectStoreNames: DOMStringList;
    onabort: (this: IDBDatabase, ev: Event) => any;
    onerror: (this: IDBDatabase, ev: Event) => any;
    version: number;
    onversionchange: (ev: IDBVersionChangeEvent) => any;
    close(): void;
    createObjectStore(name: string, optionalParameters?: IDBObjectStoreParameters): IDBObjectStore;
    deleteObjectStore(name: string): void;
    transaction(storeNames: string | string[], mode?: string): IDBTransaction;
    addEventListener(type: "versionchange", listener: (ev: IDBVersionChangeEvent) => any, useCapture?: boolean): void;
    addEventListener<K extends keyof IDBDatabaseEventMap>(type: K, listener: (this: IDBDatabase, ev: IDBDatabaseEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBDatabase: {
    prototype: IDBDatabase;
    new(): IDBDatabase;
}

interface IDBFactory {
    cmp(first: any, second: any): number;
    deleteDatabase(name: string): IDBOpenDBRequest;
    open(name: string, version?: number): IDBOpenDBRequest;
}

declare var IDBFactory: {
    prototype: IDBFactory;
    new(): IDBFactory;
}

interface IDBIndex {
    keyPath: string | string[];
    readonly name: string;
    readonly objectStore: IDBObjectStore;
    readonly unique: boolean;
    multiEntry: boolean;
    count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
    get(key: IDBKeyRange | IDBValidKey): IDBRequest;
    getKey(key: IDBKeyRange | IDBValidKey): IDBRequest;
    openCursor(range?: IDBKeyRange | IDBValidKey, direction?: string): IDBRequest;
    openKeyCursor(range?: IDBKeyRange | IDBValidKey, direction?: string): IDBRequest;
}

declare var IDBIndex: {
    prototype: IDBIndex;
    new(): IDBIndex;
}

interface IDBKeyRange {
    readonly lower: any;
    readonly lowerOpen: boolean;
    readonly upper: any;
    readonly upperOpen: boolean;
}

declare var IDBKeyRange: {
    prototype: IDBKeyRange;
    new(): IDBKeyRange;
    bound(lower: any, upper: any, lowerOpen?: boolean, upperOpen?: boolean): IDBKeyRange;
    lowerBound(lower: any, open?: boolean): IDBKeyRange;
    only(value: any): IDBKeyRange;
    upperBound(upper: any, open?: boolean): IDBKeyRange;
}

interface IDBObjectStore {
    readonly indexNames: DOMStringList;
    keyPath: string | string[];
    readonly name: string;
    readonly transaction: IDBTransaction;
    autoIncrement: boolean;
    add(value: any, key?: IDBKeyRange | IDBValidKey): IDBRequest;
    clear(): IDBRequest;
    count(key?: IDBKeyRange | IDBValidKey): IDBRequest;
    createIndex(name: string, keyPath: string | string[], optionalParameters?: IDBIndexParameters): IDBIndex;
    delete(key: IDBKeyRange | IDBValidKey): IDBRequest;
    deleteIndex(indexName: string): void;
    get(key: any): IDBRequest;
    index(name: string): IDBIndex;
    openCursor(range?: IDBKeyRange | IDBValidKey, direction?: string): IDBRequest;
    put(value: any, key?: IDBKeyRange | IDBValidKey): IDBRequest;
}

declare var IDBObjectStore: {
    prototype: IDBObjectStore;
    new(): IDBObjectStore;
}

interface IDBOpenDBRequestEventMap extends IDBRequestEventMap {
    "blocked": Event;
    "upgradeneeded": IDBVersionChangeEvent;
}

interface IDBOpenDBRequest extends IDBRequest {
    onblocked: (this: IDBOpenDBRequest, ev: Event) => any;
    onupgradeneeded: (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any;
    addEventListener<K extends keyof IDBOpenDBRequestEventMap>(type: K, listener: (this: IDBOpenDBRequest, ev: IDBOpenDBRequestEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBOpenDBRequest: {
    prototype: IDBOpenDBRequest;
    new(): IDBOpenDBRequest;
}

interface IDBRequestEventMap {
    "error": Event;
    "success": Event;
}

interface IDBRequest extends EventTarget {
    readonly error: DOMError;
    onerror: (this: IDBRequest, ev: Event) => any;
    onsuccess: (this: IDBRequest, ev: Event) => any;
    readonly readyState: string;
    readonly result: any;
    source: IDBObjectStore | IDBIndex | IDBCursor;
    readonly transaction: IDBTransaction;
    addEventListener<K extends keyof IDBRequestEventMap>(type: K, listener: (this: IDBRequest, ev: IDBRequestEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBRequest: {
    prototype: IDBRequest;
    new(): IDBRequest;
}

interface IDBTransactionEventMap {
    "abort": Event;
    "complete": Event;
    "error": Event;
}

interface IDBTransaction extends EventTarget {
    readonly db: IDBDatabase;
    readonly error: DOMError;
    readonly mode: string;
    onabort: (this: IDBTransaction, ev: Event) => any;
    oncomplete: (this: IDBTransaction, ev: Event) => any;
    onerror: (this: IDBTransaction, ev: Event) => any;
    abort(): void;
    objectStore(name: string): IDBObjectStore;
    readonly READ_ONLY: string;
    readonly READ_WRITE: string;
    readonly VERSION_CHANGE: string;
    addEventListener<K extends keyof IDBTransactionEventMap>(type: K, listener: (this: IDBTransaction, ev: IDBTransactionEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var IDBTransaction: {
    prototype: IDBTransaction;
    new(): IDBTransaction;
    readonly READ_ONLY: string;
    readonly READ_WRITE: string;
    readonly VERSION_CHANGE: string;
}

interface IDBVersionChangeEvent extends Event {
    readonly newVersion: number | null;
    readonly oldVersion: number;
}

declare var IDBVersionChangeEvent: {
    prototype: IDBVersionChangeEvent;
    new(): IDBVersionChangeEvent;
}

interface ImageData {
    data: Uint8ClampedArray;
    readonly height: number;
    readonly width: number;
}

declare var ImageData: {
    prototype: ImageData;
    new(width: number, height: number): ImageData;
    new(array: Uint8ClampedArray, width: number, height: number): ImageData;
}

interface MessageChannel {
    readonly port1: MessagePort;
    readonly port2: MessagePort;
}

declare var MessageChannel: {
    prototype: MessageChannel;
    new(): MessageChannel;
}

interface MessageEvent extends Event {
    readonly data: any;
    readonly origin: string;
    readonly ports: any;
    readonly source: any;
    initMessageEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, dataArg: any, originArg: string, lastEventIdArg: string, sourceArg: any): void;
}

declare var MessageEvent: {
    prototype: MessageEvent;
    new(type: string, eventInitDict?: MessageEventInit): MessageEvent;
}

interface MessagePortEventMap {
    "message": MessageEvent;
}

interface MessagePort extends EventTarget {
    onmessage: (this: MessagePort, ev: MessageEvent) => any;
    close(): void;
    postMessage(message?: any, transfer?: any[]): void;
    start(): void;
    addEventListener<K extends keyof MessagePortEventMap>(type: K, listener: (this: MessagePort, ev: MessagePortEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var MessagePort: {
    prototype: MessagePort;
    new(): MessagePort;
}

interface NotificationEventMap {
    "click": Event;
    "close": Event;
    "error": Event;
    "show": Event;
}

interface Notification extends EventTarget {
    readonly body: string;
    readonly dir: string;
    readonly icon: string;
    readonly lang: string;
    onclick: (this: Notification, ev: Event) => any;
    onclose: (this: Notification, ev: Event) => any;
    onerror: (this: Notification, ev: Event) => any;
    onshow: (this: Notification, ev: Event) => any;
    readonly permission: string;
    readonly tag: string;
    readonly title: string;
    close(): void;
    addEventListener<K extends keyof NotificationEventMap>(type: K, listener: (this: Notification, ev: NotificationEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Notification: {
    prototype: Notification;
    new(title: string, options?: NotificationOptions): Notification;
    requestPermission(callback?: NotificationPermissionCallback): Promise<string>;
}

interface Performance {
    readonly navigation: PerformanceNavigation;
    readonly timing: PerformanceTiming;
    clearMarks(markName?: string): void;
    clearMeasures(measureName?: string): void;
    clearResourceTimings(): void;
    getEntries(): any;
    getEntriesByName(name: string, entryType?: string): any;
    getEntriesByType(entryType: string): any;
    getMarks(markName?: string): any;
    getMeasures(measureName?: string): any;
    mark(markName: string): void;
    measure(measureName: string, startMarkName?: string, endMarkName?: string): void;
    now(): number;
    setResourceTimingBufferSize(maxSize: number): void;
    toJSON(): any;
}

declare var Performance: {
    prototype: Performance;
    new(): Performance;
}

interface PerformanceNavigation {
    readonly redirectCount: number;
    readonly type: number;
    toJSON(): any;
    readonly TYPE_BACK_FORWARD: number;
    readonly TYPE_NAVIGATE: number;
    readonly TYPE_RELOAD: number;
    readonly TYPE_RESERVED: number;
}

declare var PerformanceNavigation: {
    prototype: PerformanceNavigation;
    new(): PerformanceNavigation;
    readonly TYPE_BACK_FORWARD: number;
    readonly TYPE_NAVIGATE: number;
    readonly TYPE_RELOAD: number;
    readonly TYPE_RESERVED: number;
}

interface PerformanceTiming {
    readonly connectEnd: number;
    readonly connectStart: number;
    readonly domComplete: number;
    readonly domContentLoadedEventEnd: number;
    readonly domContentLoadedEventStart: number;
    readonly domInteractive: number;
    readonly domLoading: number;
    readonly domainLookupEnd: number;
    readonly domainLookupStart: number;
    readonly fetchStart: number;
    readonly loadEventEnd: number;
    readonly loadEventStart: number;
    readonly msFirstPaint: number;
    readonly navigationStart: number;
    readonly redirectEnd: number;
    readonly redirectStart: number;
    readonly requestStart: number;
    readonly responseEnd: number;
    readonly responseStart: number;
    readonly unloadEventEnd: number;
    readonly unloadEventStart: number;
    readonly secureConnectionStart: number;
    toJSON(): any;
}

declare var PerformanceTiming: {
    prototype: PerformanceTiming;
    new(): PerformanceTiming;
}

interface Position {
    readonly coords: Coordinates;
    readonly timestamp: number;
}

declare var Position: {
    prototype: Position;
    new(): Position;
}

interface PositionError {
    readonly code: number;
    readonly message: string;
    toString(): string;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}

declare var PositionError: {
    prototype: PositionError;
    new(): PositionError;
    readonly PERMISSION_DENIED: number;
    readonly POSITION_UNAVAILABLE: number;
    readonly TIMEOUT: number;
}

interface ProgressEvent extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
    initProgressEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, lengthComputableArg: boolean, loadedArg: number, totalArg: number): void;
}

declare var ProgressEvent: {
    prototype: ProgressEvent;
    new(type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
}

interface PushManager {
    getSubscription(): Promise<PushSubscription>;
    permissionState(options?: PushSubscriptionOptionsInit): Promise<string>;
    subscribe(options?: PushSubscriptionOptionsInit): Promise<PushSubscription>;
}

declare var PushManager: {
    prototype: PushManager;
    new(): PushManager;
}

interface PushSubscription {
    readonly endpoint: USVString;
    readonly options: PushSubscriptionOptions;
    getKey(name: string): ArrayBuffer | null;
    toJSON(): any;
    unsubscribe(): Promise<boolean>;
}

declare var PushSubscription: {
    prototype: PushSubscription;
    new(): PushSubscription;
}

interface PushSubscriptionOptions {
    readonly applicationServerKey: ArrayBuffer | null;
    readonly userVisibleOnly: boolean;
}

declare var PushSubscriptionOptions: {
    prototype: PushSubscriptionOptions;
    new(): PushSubscriptionOptions;
}

interface ReadableStream {
    readonly locked: boolean;
    cancel(): Promise<void>;
    getReader(): ReadableStreamReader;
}

declare var ReadableStream: {
    prototype: ReadableStream;
    new(): ReadableStream;
}

interface ReadableStreamReader {
    cancel(): Promise<void>;
    read(): Promise<any>;
    releaseLock(): void;
}

declare var ReadableStreamReader: {
    prototype: ReadableStreamReader;
    new(): ReadableStreamReader;
}

interface Request extends Object, Body {
    readonly cache: string;
    readonly credentials: string;
    readonly destination: string;
    readonly headers: Headers;
    readonly integrity: string;
    readonly keepalive: boolean;
    readonly method: string;
    readonly mode: string;
    readonly redirect: string;
    readonly referrer: string;
    readonly referrerPolicy: string;
    readonly type: string;
    readonly url: string;
    clone(): Request;
}

declare var Request: {
    prototype: Request;
    new(input: Request | string, init?: RequestInit): Request;
}

interface Response extends Object, Body {
    readonly body: ReadableStream | null;
    readonly headers: Headers;
    readonly ok: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: string;
    readonly url: string;
    clone(): Response;
}

declare var Response: {
    prototype: Response;
    new(body?: any, init?: ResponseInit): Response;
}

interface ServiceWorkerEventMap extends AbstractWorkerEventMap {
    "statechange": Event;
}

interface ServiceWorker extends EventTarget, AbstractWorker {
    onstatechange: (this: ServiceWorker, ev: Event) => any;
    readonly scriptURL: USVString;
    readonly state: string;
    postMessage(message: any, transfer?: any[]): void;
    addEventListener<K extends keyof ServiceWorkerEventMap>(type: K, listener: (this: ServiceWorker, ev: ServiceWorkerEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var ServiceWorker: {
    prototype: ServiceWorker;
    new(): ServiceWorker;
}

interface ServiceWorkerRegistrationEventMap {
    "updatefound": Event;
}

interface ServiceWorkerRegistration extends EventTarget {
    readonly active: ServiceWorker | null;
    readonly installing: ServiceWorker | null;
    onupdatefound: (this: ServiceWorkerRegistration, ev: Event) => any;
    readonly pushManager: PushManager;
    readonly scope: USVString;
    readonly sync: SyncManager;
    readonly waiting: ServiceWorker | null;
    getNotifications(filter?: GetNotificationOptions): any;
    showNotification(title: string, options?: NotificationOptions): Promise<void>;
    unregister(): Promise<boolean>;
    update(): Promise<void>;
    addEventListener<K extends keyof ServiceWorkerRegistrationEventMap>(type: K, listener: (this: ServiceWorkerRegistration, ev: ServiceWorkerRegistrationEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var ServiceWorkerRegistration: {
    prototype: ServiceWorkerRegistration;
    new(): ServiceWorkerRegistration;
}

interface SyncManager {
    getTags(): any;
    register(tag: string): Promise<void>;
}

declare var SyncManager: {
    prototype: SyncManager;
    new(): SyncManager;
}

interface WebSocketEventMap {
    "close": CloseEvent;
    "error": Event;
    "message": MessageEvent;
    "open": Event;
}

interface WebSocket extends EventTarget {
    binaryType: string;
    readonly bufferedAmount: number;
    readonly extensions: string;
    onclose: (this: WebSocket, ev: CloseEvent) => any;
    onerror: (this: WebSocket, ev: Event) => any;
    onmessage: (this: WebSocket, ev: MessageEvent) => any;
    onopen: (this: WebSocket, ev: Event) => any;
    readonly protocol: string;
    readonly readyState: number;
    readonly url: string;
    close(code?: number, reason?: string): void;
    send(data: any): void;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var WebSocket: {
    prototype: WebSocket;
    new(url: string, protocols?: string | string[]): WebSocket;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
}

interface WorkerEventMap extends AbstractWorkerEventMap {
    "message": MessageEvent;
}

interface Worker extends EventTarget, AbstractWorker {
    onmessage: (this: Worker, ev: MessageEvent) => any;
    postMessage(message: any, transfer?: any[]): void;
    terminate(): void;
    addEventListener<K extends keyof WorkerEventMap>(type: K, listener: (this: Worker, ev: WorkerEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var Worker: {
    prototype: Worker;
    new(stringUrl: string): Worker;
}

interface XMLHttpRequestEventMap extends XMLHttpRequestEventTargetEventMap {
    "readystatechange": Event;
}

interface XMLHttpRequest extends EventTarget, XMLHttpRequestEventTarget {
    onreadystatechange: (this: XMLHttpRequest, ev: Event) => any;
    readonly readyState: number;
    readonly response: any;
    readonly responseText: string;
    responseType: string;
    readonly responseURL: string;
    readonly responseXML: any;
    readonly status: number;
    readonly statusText: string;
    timeout: number;
    readonly upload: XMLHttpRequestUpload;
    withCredentials: boolean;
    msCaching?: string;
    abort(): void;
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): string | null;
    msCachingEnabled(): boolean;
    open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
    overrideMimeType(mime: string): void;
    send(data?: string): void;
    send(data?: any): void;
    setRequestHeader(header: string, value: string): void;
    readonly DONE: number;
    readonly HEADERS_RECEIVED: number;
    readonly LOADING: number;
    readonly OPENED: number;
    readonly UNSENT: number;
    addEventListener<K extends keyof XMLHttpRequestEventMap>(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var XMLHttpRequest: {
    prototype: XMLHttpRequest;
    new(): XMLHttpRequest;
    readonly DONE: number;
    readonly HEADERS_RECEIVED: number;
    readonly LOADING: number;
    readonly OPENED: number;
    readonly UNSENT: number;
}

interface XMLHttpRequestUpload extends EventTarget, XMLHttpRequestEventTarget {
    addEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestUpload, ev: XMLHttpRequestEventTargetEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var XMLHttpRequestUpload: {
    prototype: XMLHttpRequestUpload;
    new(): XMLHttpRequestUpload;
}

interface AbstractWorkerEventMap {
    "error": ErrorEvent;
}

interface AbstractWorker {
    onerror: (this: AbstractWorker, ev: ErrorEvent) => any;
    addEventListener<K extends keyof AbstractWorkerEventMap>(type: K, listener: (this: AbstractWorker, ev: AbstractWorkerEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface Body {
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    json(): Promise<any>;
    text(): Promise<string>;
}

interface GlobalFetch {
    fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
}

interface MSBaseReaderEventMap {
    "abort": Event;
    "error": ErrorEvent;
    "load": Event;
    "loadend": ProgressEvent;
    "loadstart": Event;
    "progress": ProgressEvent;
}

interface MSBaseReader {
    onabort: (this: MSBaseReader, ev: Event) => any;
    onerror: (this: MSBaseReader, ev: ErrorEvent) => any;
    onload: (this: MSBaseReader, ev: Event) => any;
    onloadend: (this: MSBaseReader, ev: ProgressEvent) => any;
    onloadstart: (this: MSBaseReader, ev: Event) => any;
    onprogress: (this: MSBaseReader, ev: ProgressEvent) => any;
    readonly readyState: number;
    readonly result: any;
    abort(): void;
    readonly DONE: number;
    readonly EMPTY: number;
    readonly LOADING: number;
    addEventListener<K extends keyof MSBaseReaderEventMap>(type: K, listener: (this: MSBaseReader, ev: MSBaseReaderEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface NavigatorBeacon {
    sendBeacon(url: USVString, data?: BodyInit): boolean;
}

interface NavigatorConcurrentHardware {
    readonly hardwareConcurrency: number;
}

interface NavigatorID {
    readonly appCodeName: string;
    readonly appName: string;
    readonly appVersion: string;
    readonly platform: string;
    readonly product: string;
    readonly productSub: string;
    readonly userAgent: string;
    readonly vendor: string;
    readonly vendorSub: string;
}

interface NavigatorOnLine {
    readonly onLine: boolean;
}

interface WindowBase64 {
    atob(encodedString: string): string;
    btoa(rawString: string): string;
}

interface WindowConsole {
    readonly console: Console;
}

interface XMLHttpRequestEventTargetEventMap {
    "abort": Event;
    "error": ErrorEvent;
    "load": Event;
    "loadend": ProgressEvent;
    "loadstart": Event;
    "progress": ProgressEvent;
    "timeout": ProgressEvent;
}

interface XMLHttpRequestEventTarget {
    onabort: (this: XMLHttpRequestEventTarget, ev: Event) => any;
    onerror: (this: XMLHttpRequestEventTarget, ev: ErrorEvent) => any;
    onload: (this: XMLHttpRequestEventTarget, ev: Event) => any;
    onloadend: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    onloadstart: (this: XMLHttpRequestEventTarget, ev: Event) => any;
    onprogress: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    ontimeout: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    addEventListener<K extends keyof XMLHttpRequestEventTargetEventMap>(type: K, listener: (this: XMLHttpRequestEventTarget, ev: XMLHttpRequestEventTargetEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface Client {
    readonly frameType: string;
    readonly id: string;
    readonly url: USVString;
    postMessage(message: any, transfer?: any[]): void;
}

declare var Client: {
    prototype: Client;
    new(): Client;
}

interface Clients {
    claim(): Promise<void>;
    get(id: string): Promise<any>;
    matchAll(options?: ClientQueryOptions): any;
    openWindow(url: USVString): Promise<WindowClient>;
}

declare var Clients: {
    prototype: Clients;
    new(): Clients;
}

interface DedicatedWorkerGlobalScopeEventMap extends WorkerGlobalScopeEventMap {
    "message": MessageEvent;
}

interface DedicatedWorkerGlobalScope extends WorkerGlobalScope {
    onmessage: (this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any;
    close(): void;
    postMessage(message: any, transfer?: any[]): void;
    addEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(type: K, listener: (this: DedicatedWorkerGlobalScope, ev: DedicatedWorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var DedicatedWorkerGlobalScope: {
    prototype: DedicatedWorkerGlobalScope;
    new(): DedicatedWorkerGlobalScope;
}

interface ExtendableEvent extends Event {
    waitUntil(f: Promise<any>): void;
}

declare var ExtendableEvent: {
    prototype: ExtendableEvent;
    new(type: string, eventInitDict?: ExtendableEventInit): ExtendableEvent;
}

interface ExtendableMessageEvent extends ExtendableEvent {
    readonly data: any;
    readonly lastEventId: string;
    readonly origin: string;
    readonly ports: MessagePort[] | null;
    readonly source: Client | ServiceWorker | MessagePort | null;
}

declare var ExtendableMessageEvent: {
    prototype: ExtendableMessageEvent;
    new(type: string, eventInitDict?: ExtendableMessageEventInit): ExtendableMessageEvent;
}

interface FetchEvent extends ExtendableEvent {
    readonly clientId: string | null;
    readonly isReload: boolean;
    readonly request: Request;
    respondWith(r: Promise<Response>): void;
}

declare var FetchEvent: {
    prototype: FetchEvent;
    new(type: string, eventInitDict: FetchEventInit): FetchEvent;
}

interface FileReaderSync {
    readAsArrayBuffer(blob: Blob): any;
    readAsBinaryString(blob: Blob): void;
    readAsDataURL(blob: Blob): string;
    readAsText(blob: Blob, encoding?: string): string;
}

declare var FileReaderSync: {
    prototype: FileReaderSync;
    new(): FileReaderSync;
}

interface NotificationEvent extends ExtendableEvent {
    readonly action: string;
    readonly notification: Notification;
}

declare var NotificationEvent: {
    prototype: NotificationEvent;
    new(type: string, eventInitDict: NotificationEventInit): NotificationEvent;
}

interface PushEvent extends ExtendableEvent {
    readonly data: PushMessageData | null;
}

declare var PushEvent: {
    prototype: PushEvent;
    new(type: string, eventInitDict?: PushEventInit): PushEvent;
}

interface PushMessageData {
    arrayBuffer(): ArrayBuffer;
    blob(): Blob;
    json(): JSON;
    text(): USVString;
}

declare var PushMessageData: {
    prototype: PushMessageData;
    new(): PushMessageData;
}

interface ServiceWorkerGlobalScopeEventMap extends WorkerGlobalScopeEventMap {
    "activate": ExtendableEvent;
    "fetch": FetchEvent;
    "install": ExtendableEvent;
    "message": ExtendableMessageEvent;
    "notificationclick": NotificationEvent;
    "notificationclose": NotificationEvent;
    "push": PushEvent;
    "pushsubscriptionchange": ExtendableEvent;
    "sync": SyncEvent;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
    readonly clients: Clients;
    onactivate: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
    onfetch: (this: ServiceWorkerGlobalScope, ev: FetchEvent) => any;
    oninstall: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
    onmessage: (this: ServiceWorkerGlobalScope, ev: ExtendableMessageEvent) => any;
    onnotificationclick: (this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any;
    onnotificationclose: (this: ServiceWorkerGlobalScope, ev: NotificationEvent) => any;
    onpush: (this: ServiceWorkerGlobalScope, ev: PushEvent) => any;
    onpushsubscriptionchange: (this: ServiceWorkerGlobalScope, ev: ExtendableEvent) => any;
    onsync: (this: ServiceWorkerGlobalScope, ev: SyncEvent) => any;
    readonly registration: ServiceWorkerRegistration;
    skipWaiting(): Promise<void>;
    addEventListener<K extends keyof ServiceWorkerGlobalScopeEventMap>(type: K, listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var ServiceWorkerGlobalScope: {
    prototype: ServiceWorkerGlobalScope;
    new(): ServiceWorkerGlobalScope;
}

interface SyncEvent extends ExtendableEvent {
    readonly lastChance: boolean;
    readonly tag: string;
}

declare var SyncEvent: {
    prototype: SyncEvent;
    new(type: string, init: SyncEventInit): SyncEvent;
}

interface WindowClient extends Client {
    readonly focused: boolean;
    readonly visibilityState: string;
    focus(): Promise<WindowClient>;
    navigate(url: USVString): Promise<WindowClient>;
}

declare var WindowClient: {
    prototype: WindowClient;
    new(): WindowClient;
}

interface WorkerGlobalScopeEventMap {
    "error": ErrorEvent;
}

interface WorkerGlobalScope extends EventTarget, WorkerUtils, WindowConsole, GlobalFetch {
    readonly caches: CacheStorage;
    readonly isSecureContext: boolean;
    readonly location: WorkerLocation;
    onerror: (this: WorkerGlobalScope, ev: ErrorEvent) => any;
    readonly performance: Performance;
    readonly self: WorkerGlobalScope;
    msWriteProfilerMark(profilerMarkName: string): void;
    addEventListener<K extends keyof WorkerGlobalScopeEventMap>(type: K, listener: (this: WorkerGlobalScope, ev: WorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

declare var WorkerGlobalScope: {
    prototype: WorkerGlobalScope;
    new(): WorkerGlobalScope;
}

interface WorkerLocation {
    readonly hash: string;
    readonly host: string;
    readonly hostname: string;
    readonly href: string;
    readonly origin: string;
    readonly pathname: string;
    readonly port: string;
    readonly protocol: string;
    readonly search: string;
    toString(): string;
}

declare var WorkerLocation: {
    prototype: WorkerLocation;
    new(): WorkerLocation;
}

interface WorkerNavigator extends Object, NavigatorID, NavigatorOnLine, NavigatorBeacon, NavigatorConcurrentHardware {
    readonly hardwareConcurrency: number;
}

declare var WorkerNavigator: {
    prototype: WorkerNavigator;
    new(): WorkerNavigator;
}

interface WorkerUtils extends Object, WindowBase64 {
    readonly indexedDB: IDBFactory;
    readonly msIndexedDB: IDBFactory;
    readonly navigator: WorkerNavigator;
    clearImmediate(handle: number): void;
    clearInterval(handle: number): void;
    clearTimeout(handle: number): void;
    importScripts(...urls: string[]): void;
    setImmediate(handler: (...args: any[]) => void): number;
    setImmediate(handler: any, ...args: any[]): number;
    setInterval(handler: (...args: any[]) => void, timeout: number): number;
    setInterval(handler: any, timeout?: any, ...args: any[]): number;
    setTimeout(handler: (...args: any[]) => void, timeout: number): number;
    setTimeout(handler: any, timeout?: any, ...args: any[]): number;
}

interface ErrorEventInit {
    message?: string;
    filename?: string;
    lineno?: number;
    conlno?: number;
    error?: any;
}

interface BlobPropertyBag {
    type?: string;
    endings?: string;
}

interface FilePropertyBag {
    type?: string;
    lastModified?: number;
}

interface EventListenerObject {
    handleEvent(evt: Event): void;
}

interface ProgressEventInit extends EventInit {
    lengthComputable?: boolean;
    loaded?: number;
    total?: number;
}

interface IDBArrayKey extends Array<IDBValidKey> {
}

interface RsaKeyGenParams extends Algorithm {
    modulusLength: number;
    publicExponent: Uint8Array;
}

interface RsaHashedKeyGenParams extends RsaKeyGenParams {
    hash: AlgorithmIdentifier;
}

interface RsaKeyAlgorithm extends KeyAlgorithm {
    modulusLength: number;
    publicExponent: Uint8Array;
}

interface RsaHashedKeyAlgorithm extends RsaKeyAlgorithm {
    hash: AlgorithmIdentifier;
}

interface RsaHashedImportParams {
    hash: AlgorithmIdentifier;
}

interface RsaPssParams {
    saltLength: number;
}

interface RsaOaepParams extends Algorithm {
    label?: BufferSource;
}

interface EcdsaParams extends Algorithm {
    hash: AlgorithmIdentifier;
}

interface EcKeyGenParams extends Algorithm {
    namedCurve: string;
}

interface EcKeyAlgorithm extends KeyAlgorithm {
    typedCurve: string;
}

interface EcKeyImportParams {
    namedCurve: string;
}

interface EcdhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}

interface AesCtrParams extends Algorithm {
    counter: BufferSource;
    length: number;
}

interface AesKeyAlgorithm extends KeyAlgorithm {
    length: number;
}

interface AesKeyGenParams extends Algorithm {
    length: number;
}

interface AesDerivedKeyParams extends Algorithm {
    length: number;
}

interface AesCbcParams extends Algorithm {
    iv: BufferSource;
}

interface AesCmacParams extends Algorithm {
    length: number;
}

interface AesGcmParams extends Algorithm {
    iv: BufferSource;
    additionalData?: BufferSource;
    tagLength?: number;
}

interface AesCfbParams extends Algorithm {
    iv: BufferSource;
}

interface HmacImportParams extends Algorithm {
    hash?: AlgorithmIdentifier;
    length?: number;
}

interface HmacKeyAlgorithm extends KeyAlgorithm {
    hash: AlgorithmIdentifier;
    length: number;
}

interface HmacKeyGenParams extends Algorithm {
    hash: AlgorithmIdentifier;
    length?: number;
}

interface DhKeyGenParams extends Algorithm {
    prime: Uint8Array;
    generator: Uint8Array;
}

interface DhKeyAlgorithm extends KeyAlgorithm {
    prime: Uint8Array;
    generator: Uint8Array;
}

interface DhKeyDeriveParams extends Algorithm {
    public: CryptoKey;
}

interface DhImportKeyParams extends Algorithm {
    prime: Uint8Array;
    generator: Uint8Array;
}

interface ConcatParams extends Algorithm {
    hash?: AlgorithmIdentifier;
    algorithmId: Uint8Array;
    partyUInfo: Uint8Array;
    partyVInfo: Uint8Array;
    publicInfo?: Uint8Array;
    privateInfo?: Uint8Array;
}

interface HkdfCtrParams extends Algorithm {
    hash: AlgorithmIdentifier;
    label: BufferSource;
    context: BufferSource;
}

interface Pbkdf2Params extends Algorithm {
    salt: BufferSource;
    iterations: number;
    hash: AlgorithmIdentifier;
}

interface RsaOtherPrimesInfo {
    r: string;
    d: string;
    t: string;
}

interface JsonWebKey {
    kty: string;
    use?: string;
    key_ops?: string[];
    alg?: string;
    kid?: string;
    x5u?: string;
    x5c?: string;
    x5t?: string;
    ext?: boolean;
    crv?: string;
    x?: string;
    y?: string;
    d?: string;
    n?: string;
    e?: string;
    p?: string;
    q?: string;
    dp?: string;
    dq?: string;
    qi?: string;
    oth?: RsaOtherPrimesInfo[];
    k?: string;
}

declare type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

interface ErrorEventHandler {
    (message: string, filename?: string, lineno?: number, colno?: number, error?:Error): void;
}
interface PositionCallback {
    (position: Position): void;
}
interface PositionErrorCallback {
    (error: PositionError): void;
}
interface DecodeSuccessCallback {
    (decodedData: AudioBuffer): void;
}
interface DecodeErrorCallback {
    (error: DOMException): void;
}
interface FunctionStringCallback {
    (data: string): void;
}
interface ForEachCallback {
    (keyId: any, status: string): void;
}
interface NotificationPermissionCallback {
    (permission: string): void;
}
declare var onmessage: (this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any;
declare function close(): void;
declare function postMessage(message: any, transfer?: any[]): void;
declare var caches: CacheStorage;
declare var isSecureContext: boolean;
declare var location: WorkerLocation;
declare var onerror: (this: DedicatedWorkerGlobalScope, ev: ErrorEvent) => any;
declare var performance: Performance;
declare var self: WorkerGlobalScope;
declare function msWriteProfilerMark(profilerMarkName: string): void;
declare function dispatchEvent(evt: Event): boolean;
declare function removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
declare var indexedDB: IDBFactory;
declare var msIndexedDB: IDBFactory;
declare var navigator: WorkerNavigator;
declare function clearImmediate(handle: number): void;
declare function clearInterval(handle: number): void;
declare function clearTimeout(handle: number): void;
declare function importScripts(...urls: string[]): void;
declare function setImmediate(handler: (...args: any[]) => void): number;
declare function setImmediate(handler: any, ...args: any[]): number;
declare function setInterval(handler: (...args: any[]) => void, timeout: number): number;
declare function setInterval(handler: any, timeout?: any, ...args: any[]): number;
declare function setTimeout(handler: (...args: any[]) => void, timeout: number): number;
declare function setTimeout(handler: any, timeout?: any, ...args: any[]): number;
declare function atob(encodedString: string): string;
declare function btoa(rawString: string): string;
declare var console: Console;
declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
declare function dispatchEvent(evt: Event): boolean;
declare function removeEventListener(type: string, listener?: EventListenerOrEventListenerObject, useCapture?: boolean): void;
declare function addEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(type: K, listener: (this: DedicatedWorkerGlobalScope, ev: DedicatedWorkerGlobalScopeEventMap[K]) => any, useCapture?: boolean): void;
declare function addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
type AlgorithmIdentifier = string | Algorithm;
type BodyInit = any;
type IDBKeyPath = string;
type RequestInfo = Request | string;
type USVString = string;
type IDBValidKey = number | string | Date | IDBArrayKey;
type BufferSource = ArrayBuffer | ArrayBufferView;