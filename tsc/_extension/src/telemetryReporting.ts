import type { TelemetryReporter as VSCodeTelemetryReporter } from "@vscode/extension-telemetry";

// As new events are added, update the TelemetryReporter interface below.
// This helps ensure that the telemetry events used in the codebase are
// properly typed, and that properties/measurements are never forgotten.
//
// The difference between `sendTelemetryEvent` and `sendTelemetryErrorEvent` is that
// these methods respect user preferences around reporting (i.e. `telemetry.telemetryLevel`).
//
// The "untyped" variants are provided for when properties/measurements are not known
// from the editor client - for example, when forwarding telemetry events from the language server.
export interface TelemetryReporter {
    sendTelemetryEvent(eventName: "command.enableNativePreview"): void;
    sendTelemetryEvent(eventName: "command.disableNativePreview"): void;
    sendTelemetryEvent(eventName: "command.restartLanguageServer"): void;
    sendTelemetryEvent(eventName: "command.reportIssue"): void;
    sendTelemetryEvent(eventName: "languageServer.start", data: LSServerStart): void;

    sendTelemetryErrorEvent(eventName: "languageServer.connectionError", data: LSConnectionError): void;
    sendTelemetryErrorEvent(eventName: "languageServer.connectionClosed", data: LSServerConnectionClosed): void;
    sendTelemetryErrorEvent(eventName: "languageServer.errorResponse", data: LSErrorResponse): void;
    sendTelemetryErrorEvent(eventName: "languageServer.unexpectedTelemetryPurpose", data: UnexpectedTelemetryPurpose): void;

    sendTelemetryEventUntyped(eventName: string, data?: Record<string, string>, measurements?: Record<string, number>): void;
    sendTelemetryErrorEventUntyped(eventName: string, data?: Record<string, string>, measurements?: Record<string, number>): void;

    dispose(): void;
}

export function createTelemetryReporter(vscReporter: VSCodeTelemetryReporter): TelemetryReporter {
    return {
        sendTelemetryEvent,
        sendTelemetryErrorEvent,
        sendTelemetryEventUntyped: sendTelemetryEvent,
        sendTelemetryErrorEventUntyped: sendTelemetryErrorEvent,

        dispose: () => vscReporter.dispose(),
    };

    function sendTelemetryEvent(eventName: string, data?: Record<string, string>, measurements?: Record<string, number>): void {
        vscReporter.sendTelemetryEvent(eventName, data, measurements);
    }

    function sendTelemetryErrorEvent(eventName: string, data?: Record<string, string>, measurements?: Record<string, number>): void {
        vscReporter.sendTelemetryErrorEvent(eventName, data, measurements);
    }
}

export type LSServerStart = {
    version: string;
};

export type LSConnectionError = {
    resultingAction: string;
};

export type LSServerConnectionClosed = {
    resultingAction: string;
};

export type LSErrorResponse = {
    errorCode: string;
    requestMethod: string;
    stack: string;
};

export type EnableNativePreview = {};

export type DisableNativePreview = {};

export type RestartLanguageServer = {};

export type ReportIssue = {};

export type UnexpectedTelemetryPurpose = {
    telemetryPurpose: string;
};
