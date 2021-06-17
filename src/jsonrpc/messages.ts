/* @internal */
namespace ts.server.rpc {
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
        params?: any[] | object
    }

    /**
     * Predefined error codes.
     */
    export namespace ErrorCodes {
        // Defined by JSON RPC
        export const ParseError: number = -32700;
        export const InvalidRequest: number = -32600;
        export const MethodNotFound: number = -32601;
        export const InvalidParams: number = -32602;
        export const InternalError: number = -32603;

        /**
         * This is the start range of JSON RPC reserved error codes.
         * It doesn't denote a real error code. No application error codes should
         * be defined between the start and end range. For backwards
         * compatibility the `ServerNotInitialized` and the `UnknownErrorCode`
         * are left in the range.
         *
         * @since 3.16.0
        */
        export const jsonrpcReservedErrorRangeStart: number = -32099;
        /** @deprecated use  jsonrpcReservedErrorRangeStart */
        export const serverErrorStart: number = jsonrpcReservedErrorRangeStart;

        export const MessageWriteError: number = -32099;
        export const MessageReadError: number = -32098;

        /**
         * Error code indicating that a server received a notification or
         * request before the server has received the `initialize` request.
         */
        export const ServerNotInitialized: number = -32002;
        export const UnknownErrorCode: number = -32001;

        /**
         * This is the end range of JSON RPC reserved error codes.
         * It doesn't denote a real error code.
         *
         * @since 3.16.0
        */
        export const jsonrpcReservedErrorRangeEnd = -32000;
        /** @deprecated use  jsonrpcReservedErrorRangeEnd */
        export const serverErrorEnd: number = jsonrpcReservedErrorRangeEnd;
    }

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
    export class ResponseError<D = void> extends Error {

        public readonly code: number;
        public readonly data: D | undefined;

        constructor(code: number, message: string, data?: D) {
            super(message);
            this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
            this.data = data;
            Object.setPrototypeOf(this, ResponseError.prototype);
        }

        public toJson(): ResponseErrorLiteral<D> {
            const result: ResponseErrorLiteral<D> = {
                code: this.code,
                message: this.message
            };
            if (this.data !== undefined) {
                result.data = this.data;
            }
            return result;
        }
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
    export type LSPMessageType =
        | 'send-request'
        | 'receive-request'
        | 'send-response'
        | 'receive-response'
        | 'send-notification'
        | 'receive-notification';

    export interface LSPLogMessage {
        type: LSPMessageType;
        message: RequestMessage | ResponseMessage | NotificationMessage;
        timestamp: number;
    }

    export class ParameterStructures {
        /**
         * The parameter structure is automatically inferred on the number of parameters
         * and the parameter type in case of a single param.
         */
        public static readonly auto = new ParameterStructures('auto');

        /**
         * Forces `byPosition` parameter structure. This is useful if you have a single
         * parameter which has a literal type.
         */
        public static readonly byPosition = new ParameterStructures('byPosition');

        /**
         * Forces `byName` parameter structure. This is only useful when having a single
         * parameter. The library will report errors if used with a different number of
         * parameters.
         */
        public static readonly byName = new ParameterStructures('byName');

        private constructor(private readonly kind: string) {
        }

        public static is(value: any): value is ParameterStructures {
            return value === ParameterStructures.auto || value === ParameterStructures.byName || value === ParameterStructures.byPosition;
        }

        public toString(): string {
            return this.kind;
        }
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
    export abstract class AbstractMessageSignature implements MessageSignature {

        public readonly method: string;
        public readonly numberOfParams: number;

        constructor(method: string, numberOfParams: number) {
            this.method = method;
            this.numberOfParams = numberOfParams;
        }

        get parameterStructures(): ParameterStructures {
            return ParameterStructures.auto;
        }
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
    export class RequestType0<R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 0);
        }
    }

    export class RequestType<P, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P, R, E, _EM] | undefined;
        constructor(method: string, private _parameterStructures: ParameterStructures = ParameterStructures.auto) {
            super(method, 1);
        }

        get parameterStructures(): ParameterStructures {
            return this._parameterStructures;
        }
    }

    export class RequestType1<P1, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, R, E, _EM] | undefined;
        constructor(method: string, private _parameterStructures: ParameterStructures = ParameterStructures.auto) {
            super(method, 1);
        }

        get parameterStructures(): ParameterStructures {
            return this._parameterStructures;
        }
    }

    export class RequestType2<P1, P2, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 2);
        }
    }

    export class RequestType3<P1, P2, P3, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 3);
        }
    }

    export class RequestType4<P1, P2, P3, P4, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 4);
        }
    }

    export class RequestType5<P1, P2, P3, P4, P5, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 5);
        }
    }

    export class RequestType6<P1, P2, P3, P4, P5, P6, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 6);
        }
    }

    export class RequestType7<P1, P2, P3, P4, P5, P6, P7, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, P7, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 7);
        }
    }

    export class RequestType8<P1, P2, P3, P4, P5, P6, P7, P8, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 8);
        }
    }

    export class RequestType9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, P9, R, E, _EM] | undefined;
        constructor(method: string) {
            super(method, 9);
        }
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
        params?: [] | object
    }

    export class NotificationType<P> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P, _EM] | undefined;
        constructor(method: string, private _parameterStructures: ParameterStructures = ParameterStructures.auto) {
            super(method, 1);
        }

        get parameterStructures(): ParameterStructures {
            return this._parameterStructures;
        }
    }

    export class NotificationType0 extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [_EM] | undefined;
        constructor(method: string) {
            super(method, 0);
        }
    }

    export class NotificationType1<P1> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, _EM] | undefined;
        constructor(method: string, private _parameterStructures: ParameterStructures = ParameterStructures.auto) {
            super(method, 1);
        }

        get parameterStructures(): ParameterStructures {
            return this._parameterStructures;
        }
    }

    export class NotificationType2<P1, P2> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, _EM] | undefined;
        constructor(method: string) {
            super(method, 2);
        }
    }

    export class NotificationType3<P1, P2, P3> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, _EM] | undefined;
        constructor(method: string) {
            super(method, 3);
        }
    }

    export class NotificationType4<P1, P2, P3, P4> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, _EM] | undefined;
        constructor(method: string) {
            super(method, 4);
        }
    }

    export class NotificationType5<P1, P2, P3, P4, P5> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, _EM] | undefined;
        constructor(method: string) {
            super(method, 5);
        }
    }

    export class NotificationType6<P1, P2, P3, P4, P5, P6> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, _EM] | undefined;
        constructor(method: string) {
            super(method, 6);
        }
    }

    export class NotificationType7<P1, P2, P3, P4, P5, P6, P7> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, P7, _EM] | undefined;
        constructor(method: string) {
            super(method, 7);
        }
    }

    export class NotificationType8<P1, P2, P3, P4, P5, P6, P7, P8> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, _EM] | undefined;
        constructor(method: string) {
            super(method, 8);
        }
    }

    export class NotificationType9<P1, P2, P3, P4, P5, P6, P7, P8, P9> extends AbstractMessageSignature {
        /**
         * Clients must not use this property. It is here to ensure correct typing.
         */
        public readonly _: [P1, P2, P3, P4, P5, P6, P7, P8, P9, _EM] | undefined;
        constructor(method: string) {
            super(method, 9);
        }
    }

    /**
     * Tests if the given message is a request message
     */
    export function isRequestMessage(message: Message | undefined): message is RequestMessage {
        const candidate = <RequestMessage>message;
        return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
    }

    /**
     * Tests if the given message is a notification message
     */
    export function isNotificationMessage(message: Message | undefined): message is NotificationMessage {
        const candidate = <NotificationMessage>message;
        return candidate && is.string(candidate.method) && (<any>message).id === void 0;
    }

    /**
     * Tests if the given message is a response message
     */
    export function isResponseMessage(message: Message | undefined): message is ResponseMessage {
        const candidate = <ResponseMessage>message;
        return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
    }

}
