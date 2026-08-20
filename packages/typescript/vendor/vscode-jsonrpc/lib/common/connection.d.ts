/// <reference path="../../typings/thenable.d.ts" preserve="true" />
import { Message, RequestMessage, RequestType, RequestType0, RequestType1, RequestType2, RequestType3, RequestType4, RequestType5, RequestType6, RequestType7, RequestType8, RequestType9, ResponseMessage, ResponseError, NotificationMessage, NotificationType, NotificationType0, NotificationType1, NotificationType2, NotificationType3, NotificationType4, NotificationType5, NotificationType6, NotificationType7, NotificationType8, NotificationType9, _EM, ParameterStructures } from './messages';
import type { Disposable } from './disposable';
import { Event } from './events';
import { CancellationToken, AbstractCancellationTokenSource } from './cancellation';
import { MessageReader } from './messageReader';
import { MessageWriter } from './messageWriter';
export type ProgressToken = number | string;
export declare namespace ProgressToken {
    function is(value: any): value is number | string;
}
interface ProgressParams<T> {
    /**
     * The progress token provided by the client or server.
     */
    token: ProgressToken;
    /**
     * The progress data.
     */
    value: T;
}
export declare class ProgressType<PR> {
    /**
     * Clients must not use these properties. They are here to ensure correct typing.
     * in TypeScript
     */
    readonly __: [PR, _EM] | undefined;
    readonly _pr: PR | undefined;
    constructor();
}
export type RequestParam<P> = P extends null ? P | undefined : P;
export type HandlerResult<R, E, _R = R extends null ? (R | undefined | void) : R> = _R | ResponseError<E> | Thenable<_R> | Thenable<ResponseError<E>> | Thenable<_R | ResponseError<E>>;
export interface StarRequestHandler {
    (method: string, params: any[] | object | undefined, token: CancellationToken): HandlerResult<any, any>;
}
export interface GenericRequestHandler<R, E> {
    (...params: any[]): HandlerResult<R, E>;
}
export interface RequestHandler0<R, E> {
    (token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler<P, R, E> {
    (params: P, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler1<P1, R, E> {
    (p1: P1, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler2<P1, P2, R, E> {
    (p1: P1, p2: P2, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler3<P1, P2, P3, R, E> {
    (p1: P1, p2: P2, p3: P3, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler4<P1, P2, P3, P4, R, E> {
    (p1: P1, p2: P2, p3: P3, p4: P4, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler5<P1, P2, P3, P4, P5, R, E> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler6<P1, P2, P3, P4, P5, P6, R, E> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler7<P1, P2, P3, P4, P5, P6, P7, R, E> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler8<P1, P2, P3, P4, P5, P6, P7, P8, R, E> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, token: CancellationToken): HandlerResult<R, E>;
}
export interface RequestHandler9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, token: CancellationToken): HandlerResult<R, E>;
}
export type NotificationResult = void | Promise<void>;
export interface StarNotificationHandler {
    (method: string, params: any[] | object | undefined): NotificationResult;
}
export interface GenericNotificationHandler {
    (...params: any[]): NotificationResult;
}
export interface NotificationHandler0 {
    (): NotificationResult;
}
export interface NotificationHandler<P> {
    (params: P): NotificationResult;
}
export interface NotificationHandler1<P1> {
    (p1: P1): NotificationResult;
}
export interface NotificationHandler2<P1, P2> {
    (p1: P1, p2: P2): NotificationResult;
}
export interface NotificationHandler3<P1, P2, P3> {
    (p1: P1, p2: P2, p3: P3): NotificationResult;
}
export interface NotificationHandler4<P1, P2, P3, P4> {
    (p1: P1, p2: P2, p3: P3, p4: P4): NotificationResult;
}
export interface NotificationHandler5<P1, P2, P3, P4, P5> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): NotificationResult;
}
export interface NotificationHandler6<P1, P2, P3, P4, P5, P6> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6): NotificationResult;
}
export interface NotificationHandler7<P1, P2, P3, P4, P5, P6, P7> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7): NotificationResult;
}
export interface NotificationHandler8<P1, P2, P3, P4, P5, P6, P7, P8> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8): NotificationResult;
}
export interface NotificationHandler9<P1, P2, P3, P4, P5, P6, P7, P8, P9> {
    (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9): NotificationResult;
}
export interface Logger {
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    log(message: string): void;
}
export declare const NullLogger: Logger;
export declare enum Trace {
    Off = 0,
    Messages = 1,
    Compact = 2,
    Verbose = 3
}
export declare namespace TraceValue {
    /**
     * Turn tracing off.
     */
    const Off: 'off';
    /**
     * Trace messages only.
     */
    const Messages: 'messages';
    /**
     * Compact message tracing.
     */
    const Compact: 'compact';
    /**
     * Verbose message tracing.
     */
    const Verbose: 'verbose';
}
export type TraceValue = 'off' | 'messages' | 'compact' | 'verbose';
/**
 * @deprecated Use TraceValue instead
 */
export declare const TraceValues: typeof TraceValue;
export type TraceValues = TraceValue;
export declare namespace Trace {
    function fromString(value: string): Trace;
    function toString(value: Trace): TraceValue;
}
export declare enum TraceFormat {
    Text = "text",
    JSON = "json"
}
export declare namespace TraceFormat {
    function fromString(value: string): TraceFormat;
}
export interface TraceOptions {
    sendNotification?: boolean;
    traceFormat?: TraceFormat;
}
export interface SetTraceParams {
    value: TraceValue;
}
export declare namespace SetTraceNotification {
    const type: NotificationType<SetTraceParams>;
}
export interface LogTraceParams {
    message: string;
    verbose?: string;
}
export declare namespace LogTraceNotification {
    const type: NotificationType<LogTraceParams>;
}
export interface Tracer {
    log(dataObject: any): void;
    log(message: string, data?: string): void;
}
export declare enum ConnectionErrors {
    /**
     * The connection is closed.
     */
    Closed = 1,
    /**
     * The connection got disposed.
     */
    Disposed = 2,
    /**
     * The connection is already in listening mode.
     */
    AlreadyListening = 3
}
export declare class ConnectionError extends Error {
    readonly code: ConnectionErrors;
    constructor(code: ConnectionErrors, message: string);
}
export type ConnectionStrategy = {
    cancelUndispatched?: (message: Message, next: (message: Message) => ResponseMessage | undefined) => ResponseMessage | undefined;
};
export declare namespace ConnectionStrategy {
    function is(value: any): value is ConnectionStrategy;
}
export type CancellationId = number | string;
export interface IdCancellationReceiverStrategy {
    kind?: 'id';
    /**
     * Creates a CancellationTokenSource from a cancellation id.
     *
     * @param id The cancellation id.
     */
    createCancellationTokenSource(id: CancellationId): AbstractCancellationTokenSource;
    /**
     * An optional method to dispose the strategy.
     */
    dispose?(): void;
}
export declare namespace IdCancellationReceiverStrategy {
    function is(value: any): value is IdCancellationReceiverStrategy;
}
export interface RequestCancellationReceiverStrategy {
    kind: 'request';
    /**
     * Create a cancellation token source from a given request message.
     *
     * @param requestMessage The request message.
     */
    createCancellationTokenSource(requestMessage: RequestMessage): AbstractCancellationTokenSource;
    /**
     * An optional method to dispose the strategy.
     */
    dispose?(): void;
}
export declare namespace RequestCancellationReceiverStrategy {
    function is(value: any): value is RequestCancellationReceiverStrategy;
}
export type CancellationReceiverStrategy = IdCancellationReceiverStrategy | RequestCancellationReceiverStrategy;
export declare namespace CancellationReceiverStrategy {
    const Message: CancellationReceiverStrategy;
    function is(value: any): value is CancellationReceiverStrategy;
}
export interface CancellationSenderStrategy {
    /**
     * Hook to enable cancellation for the given request.
     *
     * @param request The request to enable cancellation for.
     */
    enableCancellation?(request: RequestMessage): void;
    /**
     * Send cancellation for the given cancellation id
     *
     * @param conn The connection used.
     * @param id The cancellation id.
     */
    sendCancellation(conn: MessageConnection, id: CancellationId): Promise<void>;
    /**
     * Cleanup any cancellation state for the given cancellation id. After this
     * method has been call no cancellation will be sent anymore for the given id.
     *
     * @param id The cancellation id.
     */
    cleanup(id: CancellationId): void;
    /**
     * An optional method to dispose the strategy.
     */
    dispose?(): void;
}
export declare namespace CancellationSenderStrategy {
    const Message: CancellationSenderStrategy;
    function is(value: any): value is CancellationSenderStrategy;
}
export interface CancellationStrategy {
    receiver: CancellationReceiverStrategy | RequestCancellationReceiverStrategy;
    sender: CancellationSenderStrategy;
}
export declare namespace CancellationStrategy {
    const Message: CancellationStrategy;
    function is(value: any): value is CancellationStrategy;
}
export interface MessageStrategy {
    handleMessage(message: Message, next: (message: Message) => NotificationResult): NotificationResult;
}
export declare namespace MessageStrategy {
    function is(value: any): value is MessageStrategy;
}
/**
 * Connection options. A valid connection option must have at least a
 * `CancellationStrategy` or a `MessageStrategy` or a `ConnectionStrategy`.
 */
export interface ConnectionOptions {
    cancellationStrategy?: CancellationStrategy;
    connectionStrategy?: ConnectionStrategy;
    messageStrategy?: MessageStrategy;
    maxParallelism?: number;
}
export declare namespace ConnectionOptions {
    function is(value: any): value is ConnectionOptions;
}
export interface MessageConnection {
    sendRequest<R, E>(type: RequestType0<R, E>, token?: CancellationToken): Promise<R>;
    sendRequest<P, R, E>(type: RequestType<P, R, E>, params: NoInfer<RequestParam<P>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, R, E>(type: RequestType1<P1, R, E>, p1: NoInfer<RequestParam<P1>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, R, E>(type: RequestType2<P1, P2, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, P3, R, E>(type: RequestType3<P1, P2, P3, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, P3, P4, R, E>(type: RequestType4<P1, P2, P3, P4, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, P3, P4, P5, R, E>(type: RequestType5<P1, P2, P3, P4, P5, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, P3, P4, P5, P6, R, E>(type: RequestType6<P1, P2, P3, P4, P5, P6, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, P3, P4, P5, P6, P7, R, E>(type: RequestType7<P1, P2, P3, P4, P5, P6, P7, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>, p7: NoInfer<RequestParam<P7>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, P3, P4, P5, P6, P7, P8, R, E>(type: RequestType8<P1, P2, P3, P4, P5, P6, P7, P8, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>, p7: NoInfer<RequestParam<P7>>, p8: NoInfer<RequestParam<P8>>, token?: CancellationToken): Promise<R>;
    sendRequest<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E>(type: RequestType9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>, p7: NoInfer<RequestParam<P7>>, p8: NoInfer<RequestParam<P8>>, p9: NoInfer<RequestParam<P9>>, token?: CancellationToken): Promise<R>;
    sendRequest<R>(method: string, r0?: ParameterStructures | any, ...rest: any[]): Promise<R>;
    onRequest<R, E>(type: RequestType0<R, E>, handler: NoInfer<RequestHandler0<R, E>>): Disposable;
    onRequest<P, R, E>(type: RequestType<P, R, E>, handler: NoInfer<RequestHandler<P, R, E>>): Disposable;
    onRequest<P1, R, E>(type: RequestType1<P1, R, E>, handler: NoInfer<RequestHandler1<P1, R, E>>): Disposable;
    onRequest<P1, P2, R, E>(type: RequestType2<P1, P2, R, E>, handler: NoInfer<RequestHandler2<P1, P2, R, E>>): Disposable;
    onRequest<P1, P2, P3, R, E>(type: RequestType3<P1, P2, P3, R, E>, handler: NoInfer<RequestHandler3<P1, P2, P3, R, E>>): Disposable;
    onRequest<P1, P2, P3, P4, R, E>(type: RequestType4<P1, P2, P3, P4, R, E>, handler: NoInfer<RequestHandler4<P1, P2, P3, P4, R, E>>): Disposable;
    onRequest<P1, P2, P3, P4, P5, R, E>(type: RequestType5<P1, P2, P3, P4, P5, R, E>, handler: NoInfer<RequestHandler5<P1, P2, P3, P4, P5, R, E>>): Disposable;
    onRequest<P1, P2, P3, P4, P5, P6, R, E>(type: RequestType6<P1, P2, P3, P4, P5, P6, R, E>, handler: NoInfer<RequestHandler6<P1, P2, P3, P4, P5, P6, R, E>>): Disposable;
    onRequest<P1, P2, P3, P4, P5, P6, P7, R, E>(type: RequestType7<P1, P2, P3, P4, P5, P6, P7, R, E>, handler: NoInfer<RequestHandler7<P1, P2, P3, P4, P5, P6, P7, R, E>>): Disposable;
    onRequest<P1, P2, P3, P4, P5, P6, P7, P8, R, E>(type: RequestType8<P1, P2, P3, P4, P5, P6, P7, P8, R, E>, handler: NoInfer<RequestHandler8<P1, P2, P3, P4, P5, P6, P7, P8, R, E>>): Disposable;
    onRequest<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E>(type: RequestType9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E>, handler: NoInfer<RequestHandler9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E>>): Disposable;
    onRequest<R, E>(method: string, handler: GenericRequestHandler<R, E>): Disposable;
    onRequest(handler: StarRequestHandler): Disposable;
    hasPendingResponse(): boolean;
    sendNotification(type: NotificationType0): Promise<void>;
    sendNotification<P>(type: NotificationType<P>, params?: NoInfer<RequestParam<P>>): Promise<void>;
    sendNotification<P1>(type: NotificationType1<P1>, p1: NoInfer<RequestParam<P1>>): Promise<void>;
    sendNotification<P1, P2>(type: NotificationType2<P1, P2>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>): Promise<void>;
    sendNotification<P1, P2, P3>(type: NotificationType3<P1, P2, P3>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>): Promise<void>;
    sendNotification<P1, P2, P3, P4>(type: NotificationType4<P1, P2, P3, P4>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>): Promise<void>;
    sendNotification<P1, P2, P3, P4, P5>(type: NotificationType5<P1, P2, P3, P4, P5>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>): Promise<void>;
    sendNotification<P1, P2, P3, P4, P5, P6>(type: NotificationType6<P1, P2, P3, P4, P5, P6>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>): Promise<void>;
    sendNotification<P1, P2, P3, P4, P5, P6, P7>(type: NotificationType7<P1, P2, P3, P4, P5, P6, P7>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>, p7: NoInfer<RequestParam<P7>>): Promise<void>;
    sendNotification<P1, P2, P3, P4, P5, P6, P7, P8>(type: NotificationType8<P1, P2, P3, P4, P5, P6, P7, P8>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>, p7: NoInfer<RequestParam<P7>>, p8: NoInfer<RequestParam<P8>>): Promise<void>;
    sendNotification<P1, P2, P3, P4, P5, P6, P7, P8, P9>(type: NotificationType9<P1, P2, P3, P4, P5, P6, P7, P8, P9>, p1: NoInfer<RequestParam<P1>>, p2: NoInfer<RequestParam<P2>>, p3: NoInfer<RequestParam<P3>>, p4: NoInfer<RequestParam<P4>>, p5: NoInfer<RequestParam<P5>>, p6: NoInfer<RequestParam<P6>>, p7: NoInfer<RequestParam<P7>>, p8: NoInfer<RequestParam<P8>>, p9: NoInfer<RequestParam<P9>>): Promise<void>;
    sendNotification(method: string, r0?: ParameterStructures | any, ...rest: any[]): Promise<void>;
    onNotification(type: NotificationType0, handler: NotificationHandler0): Disposable;
    onNotification<P>(type: NotificationType<P>, handler: NoInfer<NotificationHandler<P>>): Disposable;
    onNotification<P1>(type: NotificationType1<P1>, handler: NoInfer<NotificationHandler1<P1>>): Disposable;
    onNotification<P1, P2>(type: NotificationType2<P1, P2>, handler: NoInfer<NotificationHandler2<P1, P2>>): Disposable;
    onNotification<P1, P2, P3>(type: NotificationType3<P1, P2, P3>, handler: NoInfer<NotificationHandler3<P1, P2, P3>>): Disposable;
    onNotification<P1, P2, P3, P4>(type: NotificationType4<P1, P2, P3, P4>, handler: NoInfer<NotificationHandler4<P1, P2, P3, P4>>): Disposable;
    onNotification<P1, P2, P3, P4, P5>(type: NotificationType5<P1, P2, P3, P4, P5>, handler: NoInfer<NotificationHandler5<P1, P2, P3, P4, P5>>): Disposable;
    onNotification<P1, P2, P3, P4, P5, P6>(type: NotificationType6<P1, P2, P3, P4, P5, P6>, handler: NoInfer<NotificationHandler6<P1, P2, P3, P4, P5, P6>>): Disposable;
    onNotification<P1, P2, P3, P4, P5, P6, P7>(type: NotificationType7<P1, P2, P3, P4, P5, P6, P7>, handler: NoInfer<NotificationHandler7<P1, P2, P3, P4, P5, P6, P7>>): Disposable;
    onNotification<P1, P2, P3, P4, P5, P6, P7, P8>(type: NotificationType8<P1, P2, P3, P4, P5, P6, P7, P8>, handler: NoInfer<NotificationHandler8<P1, P2, P3, P4, P5, P6, P7, P8>>): Disposable;
    onNotification<P1, P2, P3, P4, P5, P6, P7, P8, P9>(type: NotificationType9<P1, P2, P3, P4, P5, P6, P7, P8, P9>, handler: NoInfer<NotificationHandler9<P1, P2, P3, P4, P5, P6, P7, P8, P9>>): Disposable;
    onNotification(method: string, handler: GenericNotificationHandler): Disposable;
    onNotification(handler: StarNotificationHandler): Disposable;
    onUnhandledNotification: Event<NotificationMessage>;
    onProgress<P>(type: ProgressType<P>, token: string | number, handler: NoInfer<NotificationHandler<P>>): Disposable;
    sendProgress<P>(type: ProgressType<P>, token: string | number, value: NoInfer<RequestParam<P>>): Promise<void>;
    onUnhandledProgress: Event<ProgressParams<any>>;
    trace(value: Trace, tracer: Tracer, sendNotification?: boolean): Promise<void>;
    trace(value: Trace, tracer: Tracer, traceOptions?: TraceOptions): Promise<void>;
    onError: Event<[Error, Message | undefined, number | undefined]>;
    onClose: Event<void>;
    listen(): void;
    end(): void;
    onDispose: Event<void>;
    dispose(): void;
    inspect(): void;
}
export declare function createMessageConnection(messageReader: MessageReader, messageWriter: MessageWriter, _logger?: Logger, options?: ConnectionOptions): MessageConnection;
export {};
