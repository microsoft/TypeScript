import type { TelemetryReporter as VSCodeTelemetryReporter } from "@vscode/extension-telemetry";
import type { IExperimentationTelemetry } from "vscode-tas-client";

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

export interface ExperimentationTelemetryReporter extends TelemetryReporter, IExperimentationTelemetry {}

// Note:
// This reporter *supports* experimentation telemetry,
// but will only do so when passed to an `ExperimentationService` which
// will set shared properties on this reporter.
export function createTelemetryReporter(vscReporter: VSCodeTelemetryReporter): ExperimentationTelemetryReporter {
    let sharedProperties: Record<string, string> = Object.create(null);

    return {
        // Primary reporting methods for the extension.
        sendTelemetryEvent,
        sendTelemetryErrorEvent,
        sendTelemetryEventUntyped: sendTelemetryEvent,
        sendTelemetryErrorEventUntyped: sendTelemetryErrorEvent,

        // Required for the experimentation telemetry service interface.
        setSharedProperty,
        postEvent,

        dispose: () => vscReporter.dispose(),
    };

    function setSharedProperty(key: string, value: string): void {
        sharedProperties[key] = value;
    }

    function postEvent(eventName: string, props: Map<string, string>): void {
        const propsAsObj = { ...sharedProperties, ...Object.fromEntries(props) };
        vscReporter.sendTelemetryEvent(eventName, propsAsObj);
    }

    function sendTelemetryEvent(eventName: string, data?: Record<string, string>, measurements?: Record<string, number>): void {
        data = { ...sharedProperties, ...data };
        vscReporter.sendTelemetryEvent(eventName, data, measurements);
    }

    function sendTelemetryErrorEvent(eventName: string, data?: Record<string, string>, measurements?: Record<string, number>): void {
        data = { ...sharedProperties, ...data };
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
