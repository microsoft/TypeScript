namespace ts.server.lsp {
    export const enum Methods {
        // General messages
        Initialize = "initialize",
        Initialized = "initialized",
        Shutdown = "shutdown",
        Exit = "exit",

        // Text synchronization messages
        DidOpen = "textDocument/didOpen",
        DidChange = "textDocument/didChange",
        DidClose = "textDocument/didClose",
    }

    export interface Message {
        jsonrpc: string;
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

    export interface Position {
        line: number, // line >= 0
        character: number, // character >= 0
    }

    export interface Range {
        start: Position,
        end: Position,
    }

    export interface Location {
        uri: DocumentUri,
        range: Range,
    }

    type DocumentUri = string;

    export interface TextDocumentIdentifier {
        uri: DocumentUri;
    }

    export interface TextDocumentItem {
        uri: DocumentUri;

        languageId: string;

        version: number;

        text: string;
    }

    export interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
        version: number;
    }

    export interface InitializeRequest extends RequestMessage {
        method: Methods.Initialize;
        params: InitializeParams;
    }

    export interface InitializeParams {
        processId: number | null;
    }

    export interface InitializeResult {
        capabilities: ServerCapabilities;
    }

    export interface ServerCapabilities {
        textDocumentSync?: TextDocumentSyncKind;
    }

    export interface InitializedNotification extends NotificationMessage {
        method: Methods.Initialized;
        params?: {};
    }

    export enum TextDocumentSyncKind {
        None = 0,
        Full = 1,
        Incremental = 2,
    }

    export interface DidOpenTextDocumentNotification extends NotificationMessage {
        method: Methods.DidOpen,
        params: DidOpenTextDocumentParams;
    }

    export interface DidOpenTextDocumentParams {
        textDocument: TextDocumentItem;
    }

    export interface DidChangeTextDocumentNotification extends NotificationMessage {
        method: Methods.DidChange,
        params: DidChangeTextDocumentParams;
    }

    export interface DidChangeTextDocumentParams {
        textDocument: VersionedTextDocumentIdentifier;

        contentChanges: TextDocumentContentChangeEvent[];
    }

    export type TextDocumentContentChangeEvent = {
        range: Range;

        text: string;
    } | {
        text: string;
    }

    export interface DidCloseTextDocumentNotification extends NotificationMessage {
        method: Methods.DidClose,
        params: DidCloseTextDocumentParams;
    }

    export interface DidCloseTextDocumentParams {
        textDocument: TextDocumentIdentifier;
    }
}
