/**
 * A language server message
 */
export interface Message {
    jsonrpc: string;
}
/**
 * Request message
 */
export interface RequestMessage extends Message {
    /**
     * The request id.
     */
    id: number | string | null;
    /**
     * The method to be invoked.
     */
    method: string;
    /**
     * The method's params.
     */
    params?: any[] | object;
}
/**
 * Predefined error codes.
 */
export declare namespace ErrorCodes {
    const ParseError: -32700;
    const InvalidRequest: -32600;
    const MethodNotFound: -32601;
    const InvalidParams: -32602;
    const InternalError: -32603;
    /**
     * This is the start range of JSON RPC reserved error codes.
     * It doesn't denote a real error code. No application error codes should
     * be defined between the start and end range. For backwards
     * compatibility the `ServerNotInitialized` and the `UnknownErrorCode`
     * are left in the range.
     *
     * @since 3.16.0
    */
    const jsonrpcReservedErrorRangeStart: -32099;
    /** @deprecated use  jsonrpcReservedErrorRangeStart */
    const serverErrorStart: -32099;
    /**
     * An error occurred when write a message to the transport layer.
     */
    const MessageWriteError: -32099;
    /**
     * An error occurred when reading a message from the transport layer.
     */
    const MessageReadError: -32098;
    /**
     * The connection got disposed or lost and all pending responses got
     * rejected.
     */
    const PendingResponseRejected: -32097;
    /**
     * The connection is inactive and a use of it failed.
     */
    const ConnectionInactive: -32096;
    /**
     * Error code indicating that a server received a notification or
     * request before the server has received the `initialize` request.
     */
    const ServerNotInitialized: -32002;
    const UnknownErrorCode: -32001;
    /**
     * This is the end range of JSON RPC reserved error codes.
     * It doesn't denote a real error code.
     *
     * @since 3.16.0
    */
    const jsonrpcReservedErrorRangeEnd: -32000;
    /** @deprecated use  jsonrpcReservedErrorRangeEnd */
    const serverErrorEnd: -32000;
}
type integer = number;
export type ErrorCodes = integer;
export interface ResponseErrorLiteral<D = void> {
    /**
     * A number indicating the error type that occurred.
     */
    code: number;
    /**
     * A string providing a short description of the error.
     */
    message: string;
    /**
     * A Primitive or Structured value that contains additional
     * information about the error. Can be omitted.
     */
    data?: D;
}
/**
 * An error object return in a response in case a request
 * has failed.
 */
export declare class ResponseError<D = void> extends Error {
    readonly code: number;
    readonly data: D | undefined;
    constructor(code: number, message: string, data?: D);
    toJson(): ResponseErrorLiteral<D>;
}
/**
 * A response message.
 */
export interface ResponseMessage extends Message {
    /**
     * The request id.
     */
    id: number | string | null;
    /**
     * The result of a request. This member is REQUIRED on success.
     * This member MUST NOT exist if there was an error invoking the method.
     */
    result?: string | number | boolean | object | any[] | null;
    /**
     * The error object in case a request fails.
     */
    error?: ResponseErrorLiteral<any>;
}
/**
 * A LSP Log Entry.
 */
export type LSPMessageType = 'send-request' | 'receive-request' | 'send-response' | 'receive-response' | 'send-notification' | 'receive-notification';
export interface LSPLogMessage {
    type: LSPMessageType;
    message: RequestMessage | ResponseMessage | NotificationMessage;
    timestamp: number;
}
export declare class ParameterStructures {
    private readonly kind;
    /**
     * The parameter structure is automatically inferred on the number of parameters
     * and the parameter type in case of a single param.
     */
    static readonly auto: ParameterStructures;
    /**
     * Forces `byPosition` parameter structure. This is useful if you have a single
     * parameter which has a literal type.
     */
    static readonly byPosition: ParameterStructures;
    /**
     * Forces `byName` parameter structure. This is only useful when having a single
     * parameter. The library will report errors if used with a different number of
     * parameters.
     */
    static readonly byName: ParameterStructures;
    private constructor();
    static is(value: any): value is ParameterStructures;
    toString(): string;
}
/**
 * An interface to type messages.
 */
export interface MessageSignature {
    readonly method: string;
    readonly numberOfParams: number;
    readonly parameterStructures: ParameterStructures;
}
/**
 * An abstract implementation of a MessageType.
 */
export declare abstract class AbstractMessageSignature implements MessageSignature {
    readonly method: string;
    readonly numberOfParams: number;
    constructor(method: string, numberOfParams: number);
    get parameterStructures(): ParameterStructures;
}
/**
 * End marker interface for request and notification types.
 */
export interface _EM {
    _$endMarker$_: number;
}
/**
 * Classes to type request response pairs
 */
export declare class RequestType0<R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType<P, R, E> extends AbstractMessageSignature {
    private _parameterStructures;
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P, R, E, _EM] | undefined;
    constructor(method: string, _parameterStructures?: ParameterStructures);
    get parameterStructures(): ParameterStructures;
}
export declare class RequestType1<P1, R, E> extends AbstractMessageSignature {
    private _parameterStructures;
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, R, E, _EM] | undefined;
    constructor(method: string, _parameterStructures?: ParameterStructures);
    get parameterStructures(): ParameterStructures;
}
export declare class RequestType2<P1, P2, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType3<P1, P2, P3, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType4<P1, P2, P3, P4, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType5<P1, P2, P3, P4, P5, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType6<P1, P2, P3, P4, P5, P6, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType7<P1, P2, P3, P4, P5, P6, P7, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, P7, R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType8<P1, P2, P3, P4, P5, P6, P7, P8, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, R, E, _EM] | undefined;
    constructor(method: string);
}
export declare class RequestType9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E, _EM] | undefined;
    constructor(method: string);
}
/**
 * Notification Message
 */
export interface NotificationMessage extends Message {
    /**
     * The method to be invoked.
     */
    method: string;
    /**
     * The notification's params.
     */
    params?: any[] | object;
}
export declare class NotificationType<P> extends AbstractMessageSignature {
    private _parameterStructures;
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P, _EM] | undefined;
    constructor(method: string, _parameterStructures?: ParameterStructures);
    get parameterStructures(): ParameterStructures;
}
export declare class NotificationType0 extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [_EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType1<P1> extends AbstractMessageSignature {
    private _parameterStructures;
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, _EM] | undefined;
    constructor(method: string, _parameterStructures?: ParameterStructures);
    get parameterStructures(): ParameterStructures;
}
export declare class NotificationType2<P1, P2> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, _EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType3<P1, P2, P3> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, _EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType4<P1, P2, P3, P4> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, _EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType5<P1, P2, P3, P4, P5> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, _EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType6<P1, P2, P3, P4, P5, P6> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, _EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType7<P1, P2, P3, P4, P5, P6, P7> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, P7, _EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType8<P1, P2, P3, P4, P5, P6, P7, P8> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, _EM] | undefined;
    constructor(method: string);
}
export declare class NotificationType9<P1, P2, P3, P4, P5, P6, P7, P8, P9> extends AbstractMessageSignature {
    /**
     * Clients must not use this property. It is here to ensure correct typing.
     */
    readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, P9, _EM] | undefined;
    constructor(method: string);
}
export declare namespace Message {
    /**
     * Tests if the given message is a request message
     */
    function isRequest(message: Message | undefined): message is RequestMessage;
    /**
     * Tests if the given message is a notification message
     */
    function isNotification(message: Message | undefined): message is NotificationMessage;
    /**
     * Tests if the given message is a response message
     */
    function isResponse(message: Message | undefined): message is ResponseMessage;
}
export {};
