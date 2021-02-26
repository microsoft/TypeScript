namespace ts.server.lsp {
    export const enum Methods {
        Initialize = "initialize"
    }

    export interface Message {
        jsonRpc: string;
    }

    export interface RequestMessage extends Message {
        id: number | string;
        method: string;
        params?: unknown[] | object;
    }

    export interface NotificationMessage extends Message {
        method: string;
        params?: unknown[] | object;
    }

    export interface ResponseMessage extends Message {
        id: number | string | null;
        result?: string | number | boolean | object | null;
    }

    export interface InitializeRequest extends protocol.Request {
        command: Methods.Initialize;
        arguments: InitializeParams;
    }

    export interface InitializeParams {
        processId: number | null;
    }
}
