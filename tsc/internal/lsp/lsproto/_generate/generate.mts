#!/usr/bin/env -S node --experimental-strip-types

// Usage: node --experimental-strip-types generate.mts

import { $ } from "execa";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import type {
    Enumeration,
    MetaModel,
    Notification,
    OrType,
    Property,
    ReferenceType,
    Request,
    Structure,
    Type,
    TypeAlias,
} from "./metaModelSchema.mts";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../..");

const out = path.resolve(__dirname, "../lsp_generated.go");
const metaModelPath = path.resolve(__dirname, "metaModel.json");

if (!fs.existsSync(metaModelPath)) {
    console.error("Meta model file not found; did you forget to run fetchModel.mjs?");
    process.exit(1);
}

const model: MetaModel = JSON.parse(fs.readFileSync(metaModelPath, "utf-8"));

// Custom structures to add to the model
const customStructures: Structure[] = [
    {
        name: "InitializationOptions",
        properties: [
            {
                name: "disablePushDiagnostics",
                type: { kind: "base", name: "boolean" },
                optional: true,
                documentation: "DisablePushDiagnostics disables automatic pushing of diagnostics to the client.",
            },
            {
                name: "codeLensShowLocationsCommandName",
                type: { kind: "base", name: "string" },
                optional: true,
                documentation: "The client-side command name that resolved references/implementations `CodeLens` should trigger. Arguments passed will be `(DocumentUri, Position, Location[])`.",
            },
            {
                name: "userPreferences",
                type: { kind: "reference", name: "any" },
                optional: true,
                documentation: "userPreferences and/or formatting options if provided at initialization.",
            },
            {
                name: "enableTelemetry",
                type: { kind: "base", name: "boolean" },
                optional: true,
                documentation: "EnableTelemetry enables sending telemetry events from the server to the client.",
            },
        ],
        documentation: "InitializationOptions contains user-provided initialization options.",
    },
    {
        name: "AutoImportFix",
        properties: [
            {
                name: "kind",
                type: { kind: "reference", name: "AutoImportFixKind" },
                omitzeroValue: true,
            },
            {
                name: "name",
                type: { kind: "base", name: "string" },
                omitzeroValue: true,
            },
            {
                name: "importKind",
                type: { kind: "reference", name: "ImportKind" },
            },
            {
                name: "useRequire",
                type: { kind: "base", name: "boolean" },
                omitzeroValue: true,
            },
            {
                name: "addAsTypeOnly",
                type: { kind: "reference", name: "AddAsTypeOnly" },
            },
            {
                name: "moduleSpecifier",
                type: { kind: "base", name: "string" },
                documentation: "The module specifier for this auto-import.",
                omitzeroValue: true,
            },
            {
                name: "importIndex",
                type: { kind: "base", name: "integer" },
                documentation: "Index of the import to modify when adding to an existing import declaration.",
            },
            {
                name: "usagePosition",
                type: { kind: "reference", name: "Position" },
                optional: true,
            },
            {
                name: "namespacePrefix",
                type: { kind: "base", name: "string" },
                omitzeroValue: true,
            },
        ],
        documentation: "AutoImportFix contains information about an auto-import suggestion.",
    },
    {
        name: "CompletionItemData",
        properties: [
            {
                name: "fileName",
                type: { kind: "base", name: "string" },
                documentation: "The file name where the completion was requested.",
                omitzeroValue: true,
            },
            {
                name: "position",
                type: { kind: "base", name: "integer" },
                documentation: "The position where the completion was requested.",
                omitzeroValue: true,
            },
            {
                name: "source",
                type: { kind: "base", name: "string" },
                documentation: "Special source value for disambiguation.",
                omitzeroValue: true,
            },
            {
                name: "name",
                type: { kind: "base", name: "string" },
                documentation: "The name of the completion item.",
                omitzeroValue: true,
            },
            {
                name: "autoImport",
                type: { kind: "reference", name: "AutoImportFix" },
                optional: true,
                documentation: "Auto-import data for this completion item.",
            },
        ],
        documentation: "CompletionItemData is preserved on a CompletionItem between CompletionRequest and CompletionResolveRequest.",
    },
    {
        name: "CodeLensData",
        properties: [
            {
                name: "kind",
                type: { kind: "reference", name: "CodeLensKind" },
                documentation: `The kind of the code lens ("references" or "implementations").`,
            },
            {
                name: "uri",
                type: { kind: "base", name: "DocumentUri" },
                documentation: `The document in which the code lens and its range are located.`,
            },
        ],
    },
    {
        name: "VsOnAutoInsertOptions",
        properties: [
            {
                name: "_vs_triggerCharacters",
                type: { kind: "array", element: { kind: "base", name: "string" } },
                documentation: "List of trigger characters that trigger auto-insert.",
            },
        ],
        documentation: "Options for the textDocument/_vs_onAutoInsert provider capability.",
    },
    {
        name: "VsOnAutoInsertParams",
        properties: [
            {
                name: "_vs_textDocument",
                type: { kind: "reference", name: "TextDocumentIdentifier" },
                documentation: "The text document.",
            },
            {
                name: "_vs_position",
                type: { kind: "reference", name: "Position" },
                documentation: "The position inside the text document.",
            },
            {
                name: "_vs_ch",
                type: { kind: "base", name: "string" },
                documentation: "The character that triggered the auto-insert.",
            },
        ],
        documentation: "Parameters for the textDocument/_vs_onAutoInsert request.",
    },
    {
        name: "VsOnAutoInsertResponseItem",
        properties: [
            {
                name: "_vs_textEditFormat",
                type: { kind: "reference", name: "InsertTextFormat" },
                documentation: "The format of the text edit (plaintext or snippet).",
            },
            {
                name: "_vs_textEdit",
                type: { kind: "reference", name: "TextEdit" },
                documentation: "The text edit to apply for the auto-insertion.",
            },
        ],
        documentation: "Response item for the textDocument/_vs_onAutoInsert request.",
    },
    {
        name: "RequestFailureTelemetryEvent",
        properties: [
            {
                name: "eventName",
                type: { kind: "stringLiteral", value: "languageServer.errorResponse" },
                documentation: "The name of the telemetry event.",
            },
            {
                name: "telemetryPurpose",
                type: { kind: "stringLiteral", value: "error" },
                documentation: "Indicates whether the reason for generating the event (e.g. general usage telemetry or errors).",
            },
            {
                name: "properties",
                type: { kind: "reference", name: "RequestFailureTelemetryProperties" },
                documentation: "The properties associated with the event.",
            },
        ],
        documentation: "A RequestFailureTelemetryEvent is sent when a request fails and the server recovers.",
    },
    {
        name: "RequestFailureTelemetryProperties",
        properties: [
            {
                name: "errorCode",
                type: { kind: "base", name: "string" },
                documentation: "The error code associated with the event.",
            },
            {
                name: "requestMethod",
                type: { kind: "base", name: "string" },
                documentation: "The method of the request that caused the event.",
            },
            {
                name: "stack",
                type: { kind: "base", name: "string" },
                documentation: "The stack trace associated with the event.",
            },
        ],
        documentation: "RequestFailureTelemetryProperties contains failure information when an LSP request manages to recover.",
    },
    {
        name: "ProfileParams",
        properties: [
            {
                name: "dir",
                type: { kind: "base", name: "string" },
                documentation: "The directory path where the profile should be saved.",
            },
        ],
        documentation: "Parameters for profiling requests.",
    },
    {
        name: "ProfileResult",
        properties: [
            {
                name: "file",
                type: { kind: "base", name: "string" },
                documentation: "The file path where the profile was saved.",
            },
        ],
        documentation: "Result of a profiling request.",
    },
    {
        name: "InitializeAPISessionParams",
        properties: [
            {
                name: "pipe",
                type: { kind: "base", name: "string" },
                optional: true,
                documentation: "Optional path to use for the named pipe or Unix domain socket. If not provided, a unique path will be generated.",
            },
        ],
        documentation: "Parameters for the initializeAPISession request.",
    },
    {
        name: "InitializeAPISessionResult",
        properties: [
            {
                name: "sessionId",
                type: { kind: "base", name: "string" },
                documentation: "The unique identifier for this API session.",
            },
            {
                name: "pipe",
                type: { kind: "base", name: "string" },
                documentation: "The path to the named pipe or Unix domain socket for API communication.",
            },
        ],
        documentation: "Result for the initializeAPISession request.",
    },
    {
        name: "ProjectInfoParams",
        properties: [
            {
                name: "textDocument",
                type: { kind: "reference", name: "TextDocumentIdentifier" },
                documentation: "The text document to get project info for.",
            },
        ],
        documentation: "Parameters for the custom/projectInfo request.",
    },
    {
        name: "ProjectInfoResult",
        properties: [
            {
                name: "configFilePath",
                type: { kind: "base", name: "string" },
                documentation: "The absolute path to the config file (e.g. /path/to/tsconfig.json) for the project that contains this file, or an empty string if the file is in an inferred project.",
            },
        ],
        documentation: "Result for the custom/projectInfo request.",
    },
    {
        name: "PerformanceStatsTelemetryEvent",
        properties: [
            {
                name: "eventName",
                type: { kind: "stringLiteral", value: "languageServer.performanceStats" },
                documentation: "The name of the telemetry event.",
            },
            {
                name: "telemetryPurpose",
                type: { kind: "stringLiteral", value: "usage" },
                documentation: "Indicates this is a usage telemetry event.",
            },
            {
                name: "measurements",
                type: { kind: "reference", name: "PerformanceStatsTelemetryMeasurements" },
                documentation: "Numeric measurements for this telemetry event.",
            },
        ],
        documentation: "A PerformanceStatsTelemetryEvent is sent periodically with performance and resource usage statistics.",
    },
    {
        name: "PerformanceStatsTelemetryMeasurements",
        properties: [
            { name: "openFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of files currently open in the editor." },
            { name: "uptimeSeconds", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Seconds since the session was initialized." },
            { name: "projectCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of loaded projects." },
            { name: "configCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of loaded config files." },
            { name: "cachedDiskFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of files cached from disk." },
            { name: "memoryUsedBytes", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total memory mapped by the Go runtime in bytes." },
            { name: "goMemLimit", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "GOMEMLIMIT value in bytes, or 0 if not set." },
            { name: "goGCPercent", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "GOGC percentage value configured for the GC." },
            { name: "heapGoalBytes", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Heap size target the GC is working toward in bytes." },
            { name: "heapLiveBytes", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Bytes of live (reachable) heap objects." },
            { name: "heapObjectCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of live or unswept objects occupying heap memory." },
            { name: "heapStackBytes", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Heap memory reserved for goroutine stacks." },
            { name: "heapReleasedBytes", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Heap memory returned to the OS." },
            { name: "heapFreeBytes", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Heap memory that is free and eligible to be returned to the OS." },
            { name: "gcScanHeapBytes", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total scannable heap bytes — how much the GC must traverse." },
            { name: "goMaxProcs", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "The current GOMAXPROCS value." },
            { name: "goroutineCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Current number of goroutines." },
            { name: "gcCyclesTotal", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total completed GC cycles." },
            { name: "gcCPUSeconds", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Cumulative CPU time spent in GC in seconds." },
            { name: "userCPUSeconds", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Cumulative CPU time spent in user Go code in seconds." },
            { name: "systemMemTotal", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total physical memory on the system in bytes." },
            { name: "systemMemUsed", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Used physical memory on the system in bytes." },
            { name: "autoImportProjectBucketCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of auto-import project buckets." },
            { name: "autoImportNodeModulesBucketCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of auto-import node_modules buckets." },
            { name: "autoImportUniquePackageCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Unique packages across all node_modules buckets." },
            { name: "autoImportProjectExportCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total indexed exports from project files." },
            { name: "autoImportNodeModulesExportCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total indexed exports from node_modules." },
            { name: "autoImportProjectFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total files tracked across project buckets." },
            { name: "autoImportNodeModulesFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Total files tracked across node_modules buckets." },
            { name: "autoImportNodeModulesUnfilteredBucketCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true, documentation: "Number of node_modules buckets with no package.json filter." },
        ],
        documentation: "Numeric measurements for PerformanceStatsTelemetryEvent.",
    },
    {
        name: "ProjectInfoTelemetryEvent",
        properties: [
            {
                name: "eventName",
                type: { kind: "stringLiteral", value: "languageServer.projectInfo" },
                documentation: "The name of the telemetry event.",
            },
            {
                name: "telemetryPurpose",
                type: { kind: "stringLiteral", value: "usage" },
                documentation: "Indicates this is a usage telemetry event.",
            },
            {
                name: "properties",
                type: { kind: "map", key: { kind: "base", name: "string" }, value: { kind: "base", name: "string" } },
                documentation: "String properties for this telemetry event. Complex values (compilerOptions, fileStats) are JSON-stringified.",
            },
            {
                name: "measurements",
                type: { kind: "reference", name: "ProjectInfoTelemetryMeasurements" },
                documentation: "Numeric measurements for this telemetry event.",
            },
        ],
        documentation: "A ProjectInfoTelemetryEvent is sent once per project when it is first loaded.",
    },
    {
        name: "ProjectInfoTelemetryMeasurements",
        properties: [
            { name: "jsFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "jsFileSize", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "jsxFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "jsxFileSize", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "tsFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "tsFileSize", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "tsxFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "tsxFileSize", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "dtsFileCount", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
            { name: "dtsFileSize", type: { kind: "base", name: "decimal" }, omitzeroValue: true },
        ],
        documentation: "Numeric measurements for ProjectInfoTelemetryEvent.",
    },
    {
        name: "MultiDocumentHighlight",
        properties: [
            {
                name: "uri",
                type: { kind: "base", name: "DocumentUri" },
                documentation: "The URI of the document containing the highlights.",
            },
            {
                name: "highlights",
                type: { kind: "array", element: { kind: "reference", name: "DocumentHighlight" } },
                documentation: "The highlights for the document.",
            },
        ],
        documentation: "Represents a collection of document highlights from a single document, used in multi-document highlight responses.",
    },
    {
        name: "MultiDocumentHighlightParams",
        properties: [
            {
                name: "textDocument",
                type: { kind: "reference", name: "TextDocumentIdentifier" },
                documentation: "The text document.",
            },
            {
                name: "position",
                type: { kind: "reference", name: "Position" },
                documentation: "The position inside the text document.",
            },
            {
                name: "filesToSearch",
                type: { kind: "array", element: { kind: "base", name: "DocumentUri" } },
                documentation: "The list of file URIs to search for highlights across.",
            },
        ],
        documentation: "Parameters for the custom/textDocument/multiDocumentHighlight request.",
    },
];

const customEnumerations: Enumeration[] = [
    {
        name: "CodeLensKind",
        type: {
            kind: "base",
            name: "string",
        },
        values: [
            {
                name: "References",
                value: "references",
            },
            {
                name: "Implementations",
                value: "implementations",
            },
        ],
    },
    {
        name: "AutoImportFixKind",
        type: { kind: "base", name: "integer" },
        values: [
            { name: "UseNamespace", value: 0, documentation: "Augment an existing namespace import." },
            { name: "JsdocTypeImport", value: 1, documentation: "Add a JSDoc-only type import." },
            { name: "AddToExisting", value: 2, documentation: "Insert into an existing import declaration." },
            { name: "AddNew", value: 3, documentation: "Create a fresh import statement." },
            { name: "PromoteTypeOnly", value: 4, documentation: "Promote a type-only import when necessary." },
        ],
    },
    {
        name: "ImportKind",
        type: { kind: "base", name: "integer" },
        values: [
            { name: "Named", value: 0, documentation: "Adds a named import." },
            { name: "Default", value: 1, documentation: "Adds a default import." },
            { name: "Namespace", value: 2, documentation: "Adds a namespace import." },
            { name: "CommonJS", value: 3, documentation: "Adds a CommonJS import assignment." },
        ],
    },
    {
        name: "AddAsTypeOnly",
        type: { kind: "base", name: "integer" },
        values: [
            { name: "Allowed", value: 1, documentation: "Import may be marked type-only if needed." },
            { name: "Required", value: 2, documentation: "Import must be marked type-only." },
            { name: "NotAllowed", value: 4, documentation: "Import cannot be marked type-only." },
        ],
    },
];

// Custom requests to add to the model (tsgo-specific)
const customRequests: Request[] = [
    {
        method: "custom/runGC",
        typeName: "RunGCRequest",
        messageDirection: "clientToServer",
        result: { kind: "base", name: "null" },
        documentation: "Triggers garbage collection in the language server.",
    },
    {
        method: "custom/saveHeapProfile",
        typeName: "SaveHeapProfileRequest",
        params: { kind: "reference", name: "ProfileParams" },
        messageDirection: "clientToServer",
        result: { kind: "reference", name: "ProfileResult" },
        documentation: "Saves a heap profile to the specified directory.",
    },
    {
        method: "custom/saveAllocProfile",
        typeName: "SaveAllocProfileRequest",
        params: { kind: "reference", name: "ProfileParams" },
        messageDirection: "clientToServer",
        result: { kind: "reference", name: "ProfileResult" },
        documentation: "Saves an allocation profile to the specified directory.",
    },
    {
        method: "custom/startCPUProfile",
        typeName: "StartCPUProfileRequest",
        params: { kind: "reference", name: "ProfileParams" },
        messageDirection: "clientToServer",
        result: { kind: "base", name: "null" },
        documentation: "Starts CPU profiling, writing to the specified directory when stopped.",
    },
    {
        method: "custom/stopCPUProfile",
        typeName: "StopCPUProfileRequest",
        messageDirection: "clientToServer",
        result: { kind: "reference", name: "ProfileResult" },
        documentation: "Stops CPU profiling and saves the profile.",
    },
    {
        method: "custom/initializeAPISession",
        typeName: "CustomInitializeAPISessionRequest",
        params: { kind: "reference", name: "InitializeAPISessionParams" },
        result: { kind: "reference", name: "InitializeAPISessionResult" },
        messageDirection: "clientToServer",
        documentation: "Custom request to initialize an API session.",
    },
    {
        method: "custom/projectInfo",
        typeName: "CustomProjectInfoRequest",
        params: { kind: "reference", name: "ProjectInfoParams" },
        result: { kind: "reference", name: "ProjectInfoResult" },
        messageDirection: "clientToServer",
        documentation: "Returns project information (e.g. the tsconfig.json path) for a given text document.",
    },
    {
        method: "custom/textDocument/sourceDefinition",
        typeName: "CustomTextDocumentSourceDefinitionRequest",
        params: { kind: "reference", name: "TextDocumentPositionParams" },
        result: { kind: "reference", name: "LocationOrLocationsOrDefinitionLinksOrNull" },
        messageDirection: "clientToServer",
        documentation: "Request to get source definitions for a position.",
    },
    {
        method: "custom/textDocument/multiDocumentHighlight",
        typeName: "CustomMultiDocumentHighlightRequest",
        params: { kind: "reference", name: "MultiDocumentHighlightParams" },
        result: {
            kind: "or",
            items: [
                { kind: "array", element: { kind: "reference", name: "MultiDocumentHighlight" } },
                { kind: "base", name: "null" },
            ],
        },
        messageDirection: "clientToServer",
        documentation: "Request to get document highlights across multiple files.",
    },
    {
        method: "textDocument/_vs_onAutoInsert",
        typeName: "VsOnAutoInsertRequest",
        params: { kind: "reference", name: "VsOnAutoInsertParams" },
        result: {
            kind: "or",
            items: [
                { kind: "reference", name: "VsOnAutoInsertResponseItem" },
                { kind: "base", name: "null" },
            ],
        },
        messageDirection: "clientToServer",
        documentation: "Request for auto-insert when a trigger character is typed (VS-specific).",
    },
];

const customTypeAliases: TypeAlias[] = [
    {
        name: "TelemetryEvent",
        type: {
            kind: "or",
            items: [
                { kind: "reference", name: "RequestFailureTelemetryEvent" },
                { kind: "reference", name: "PerformanceStatsTelemetryEvent" },
                { kind: "reference", name: "ProjectInfoTelemetryEvent" },
                { kind: "base", name: "null" },
            ],
        },
    },
];

// Track which custom Data structures were declared explicitly
const explicitDataStructures = new Set(customStructures.map(s => s.name));

// Map from registration method → { fieldName, optionsTypeName }
// Built during patchAndPreprocessModel, used during code generation.
interface RegistrationMethodInfo {
    registrationMethod: string;
    fieldName: string;
    optionsTypeName: string;
    isRegistrationOnly?: boolean;
}
let registrationMethods: RegistrationMethodInfo[] = [];

// Patch and preprocess the model
function patchAndPreprocessModel() {
    // Track which Data types we need to create as placeholders
    const neededDataStructures = new Set<string>();

    // Collect all registration option types from requests and notifications
    const registrationOptionTypes: Type[] = [];
    for (const request of [...model.requests, ...model.notifications]) {
        if (request.registrationOptions) {
            registrationOptionTypes.push(request.registrationOptions);
        }
    }

    // Create synthetic structures for "and" types in registration options
    const syntheticStructures: Structure[] = [];
    for (let i = 0; i < registrationOptionTypes.length; i++) {
        const regOptType = registrationOptionTypes[i];
        if (regOptType.kind === "and") {
            // Find which request/notification this registration option belongs to
            const owner = [...model.requests, ...model.notifications].find(r => r.registrationOptions === regOptType);
            if (!owner) {
                throw new Error("Could not find owner for 'and' type registration option");
            }

            // Determine the proper name based on the typeName or method
            let structureName: string;
            if (owner.typeName) {
                // Use typeName as base: "ColorPresentationRequest" -> "ColorPresentationRegistrationOptions"
                structureName = owner.typeName.replace(/Request$/, "").replace(/Notification$/, "") + "RegistrationOptions";
            }
            else {
                // Fall back to method: "textDocument/colorPresentation" -> "ColorPresentationRegistrationOptions"
                const methodParts = owner.method.split("/");
                const lastPart = methodParts[methodParts.length - 1];
                structureName = titleCase(lastPart) + "RegistrationOptions";
            }

            // Extract all reference types from the "and"
            const refTypes = regOptType.items.filter((item): item is ReferenceType => item.kind === "reference");

            // Create a synthetic structure that combines all the referenced structures
            syntheticStructures.push({
                name: structureName,
                properties: [],
                extends: refTypes,
                documentation: `Registration options for ${owner.method}.`,
            });

            // Replace the "and" type with a reference to the synthetic structure
            registrationOptionTypes[i] = { kind: "reference", name: structureName };
            // Also update the model so the request/notification has the resolved type
            owner.registrationOptions = registrationOptionTypes[i];
        }
    }

    for (const structure of model.structures) {
        // Patch ServerCapabilities to add custom tsgo capability flags
        if (structure.name === "ServerCapabilities") {
            structure.properties.push({
                name: "customSourceDefinitionProvider",
                type: { kind: "base", name: "boolean" },
                optional: true,
                documentation: "The server provides source definition support via custom/textDocument/sourceDefinition.",
            });
            structure.properties.push({
                name: "_vs_onAutoInsertProvider",
                type: { kind: "reference", name: "VsOnAutoInsertOptions" },
                optional: true,
                documentation: "Provider options for the VS auto-insert feature via textDocument/_vs_onAutoInsert.",
            });
        }

        // Patch HoverParams to add verbosityLevel
        if (structure.name === "HoverParams") {
            structure.properties.push({
                name: "verbosityLevel",
                type: { kind: "base", name: "integer" },
                optional: true,
                documentation: "Controls how many levels of type definitions will be expanded. Default is 0.",
            });
        }

        // Patch Hover to add canIncreaseVerbosity
        if (structure.name === "Hover") {
            structure.properties.push(
                {
                    name: "canIncreaseVerbosity",
                    type: { kind: "base", name: "boolean" },
                    omitzeroValue: true,
                    documentation: "Whether the verbosity level can be increased for this hover.",
                },
            );
        }

        // Patch ClientCapabilities to add VS-specific client capabilities
        if (structure.name === "ClientCapabilities") {
            structure.properties.push(
                {
                    name: "_vs_supportsVisualStudioExtensions",
                    type: { kind: "base", name: "boolean" },
                    optional: true,
                    documentation: "Whether the client supports Visual Studio extensions.",
                },
                {
                    name: "_vs_supportedSnippetVersion",
                    type: { kind: "base", name: "integer" },
                    optional: true,
                    documentation: "The snippet version supported by the client.",
                },
                {
                    name: "_vs_supportsNotIncludingTextInTextDocumentDidOpen",
                    type: { kind: "base", name: "boolean" },
                    optional: true,
                    documentation: "Whether the client supports not including text in textDocument/didOpen notifications.",
                },
                {
                    name: "_vs_supportsIconExtensions",
                    type: { kind: "base", name: "boolean" },
                    optional: true,
                    documentation: "Whether the client supports icon extensions.",
                },
                {
                    name: "_vs_supportsDiagnosticRequests",
                    type: { kind: "base", name: "boolean" },
                    optional: true,
                    documentation: "Whether the client supports diagnostic requests.",
                },
            );
        }

        // Patch HoverClientCapabilities to add verbosityLevel support flag
        if (structure.name === "HoverClientCapabilities") {
            structure.properties.push({
                name: "verbosityLevel",
                type: { kind: "base", name: "boolean" },
                optional: true,
                documentation: "The client supports the `verbosityLevel` property on `HoverParams` and `canIncreaseVerbosity` on `Hover`.",
            });
        }

        // Patch ServerCapabilities to add custom tsgo capability flags
        if (structure.name === "ServerCapabilities") {
            structure.properties.push({
                name: "customMultiDocumentHighlightProvider",
                type: { kind: "base", name: "boolean" },
                optional: true,
                documentation: "The server provides multi-document highlight support via custom/textDocument/multiDocumentHighlight.",
            });
        }

        for (const prop of structure.properties) {
            // Replace initializationOptions type with custom InitializationOptions
            if (prop.name === "initializationOptions" && prop.type.kind === "reference" && prop.type.name === "LSPAny") {
                prop.type = { kind: "reference", name: "InitializationOptions" };
            }

            // Replace Data *any fields with custom typed Data fields
            if (prop.name === "data" && prop.type.kind === "reference" && prop.type.name === "LSPAny") {
                const customDataType = `${structure.name}Data`;
                prop.type = { kind: "reference", name: customDataType };

                // If we haven't explicitly declared this Data structure, we'll need a placeholder
                if (!explicitDataStructures.has(customDataType)) {
                    neededDataStructures.add(customDataType);
                }
            }

            // Registration.registerOptions and Registration.method are handled specially:
            // registerOptions becomes a custom struct, and method is derived from it.
            // Remove both from the structure so the normal generator skips them.
            if (structure.name === "Registration" && (prop.name === "registerOptions" || prop.name === "method")) {
                // Will be filtered out below
            }

            // Replace ProgressParams.value with a proper union type
            if (structure.name === "ProgressParams" && prop.name === "value" && prop.type.kind === "reference" && prop.type.name === "LSPAny") {
                prop.type = {
                    kind: "or",
                    items: [
                        { kind: "reference", name: "WorkDoneProgressBegin" },
                        { kind: "reference", name: "WorkDoneProgressReport" },
                        { kind: "reference", name: "WorkDoneProgressEnd" },
                    ],
                };
            }
        }
    }

    for (const notification of model.notifications) {
        if (notification.typeName === "TelemetryEventNotification") {
            notification.params = {
                kind: "reference",
                name: "TelemetryEvent",
            };
        }
    }

    // Create placeholder structures for Data types that weren't explicitly declared
    for (const dataTypeName of neededDataStructures) {
        const baseName = dataTypeName.replace(/Data$/, "");
        customStructures.push({
            name: dataTypeName,
            properties: [],
            documentation: `${dataTypeName} is a placeholder for custom data preserved on a ${baseName}.`,
        });
    }

    // Add custom enumerations, custom structures, custom requests, and synthetic structures to the model
    model.enumerations.push(...customEnumerations);
    model.structures.push(...customStructures, ...syntheticStructures);
    model.requests.push(...customRequests);

    // Build structure map for preprocessing
    const structureMap = new Map<string, Structure>();
    for (const structure of model.structures) {
        structureMap.set(structure.name, structure);
    }

    function collectInheritedProperties(structure: Structure, visited = new Set<string>()): Property[] {
        if (visited.has(structure.name)) {
            return []; // Avoid circular dependencies
        }
        visited.add(structure.name);

        const properties: Property[] = [];
        const inheritanceTypes = [...(structure.extends || []), ...(structure.mixins || [])];

        for (const type of inheritanceTypes) {
            if (type.kind === "reference") {
                const inheritedStructure = structureMap.get(type.name);
                if (inheritedStructure) {
                    properties.push(
                        ...collectInheritedProperties(inheritedStructure, new Set(visited)),
                        ...inheritedStructure.properties,
                    );
                }
            }
        }

        return properties;
    }

    // Inline inheritance for each structure
    for (const structure of model.structures) {
        const inheritedProperties = collectInheritedProperties(structure);

        // Merge properties with structure's own properties taking precedence
        const propertyMap = new Map<string, Property>();

        inheritedProperties.forEach(prop => propertyMap.set(prop.name, prop));
        structure.properties.forEach(prop => propertyMap.set(prop.name, prop));

        structure.properties = Array.from(propertyMap.values());
        structure.extends = undefined;
        structure.mixins = undefined;

        // Remove experimental properties from ServerCapabilities and ClientCapabilities
        if (structure.name === "ServerCapabilities" || structure.name === "ClientCapabilities") {
            structure.properties = structure.properties.filter(p => p.name !== "experimental");
        }

        // Remove method and registerOptions from Registration (handled by custom codegen)
        if (structure.name === "Registration") {
            structure.properties = structure.properties.filter(p => p.name !== "method" && p.name !== "registerOptions");
        }
    }

    // Remove _InitializeParams structure after flattening (it was only needed for inheritance)
    model.structures = model.structures.filter(s => s.name !== "_InitializeParams");

    // Remove all notebook-related features from the model
    function isNotebookRelatedName(name: string): boolean {
        const lower = name.toLowerCase();
        return lower.includes("notebook");
    }

    function isNotebookRelatedMethod(method: string): boolean {
        return method.toLowerCase().startsWith("notebookdocument/");
    }

    function typeReferencesNotebook(type: Type): boolean {
        if (type.kind === "reference") return isNotebookRelatedName(type.name);
        if (type.kind === "array") return typeReferencesNotebook(type.element);
        if (type.kind === "or" || type.kind === "and") return type.items.some(typeReferencesNotebook);
        if (type.kind === "map") return typeReferencesNotebook(type.key) || typeReferencesNotebook(type.value);
        return false;
    }

    function isEntirelyNotebookType(type: Type): boolean {
        if (type.kind === "reference") return isNotebookRelatedName(type.name);
        if (type.kind === "array") return isEntirelyNotebookType(type.element);
        if (type.kind === "or" || type.kind === "and") return type.items.every(isEntirelyNotebookType);
        return false;
    }

    function removeNotebookFromType(type: Type): Type {
        if (type.kind === "or") {
            const filtered = type.items.filter(item => !typeReferencesNotebook(item)).map(removeNotebookFromType);
            if (filtered.length === 1) return filtered[0];
            if (filtered.length < type.items.length) {
                return { ...type, items: filtered };
            }
        }
        if (type.kind === "and") {
            const filtered = type.items.filter(item => !typeReferencesNotebook(item)).map(removeNotebookFromType);
            if (filtered.length === 1) return filtered[0];
            if (filtered.length < type.items.length) {
                return { ...type, items: filtered };
            }
        }
        return type;
    }

    // Filter out notebook structures (and notebook-only structures like ExecutionSummary)
    const notebookOnlyStructures = new Set(["ExecutionSummary"]);
    model.structures = model.structures.filter(s => !isNotebookRelatedName(s.name) && !notebookOnlyStructures.has(s.name));

    // Remove notebook properties from remaining structures
    for (const structure of model.structures) {
        structure.properties = structure.properties.filter(p => {
            if (isNotebookRelatedName(p.name)) return false;
            // Only remove properties whose type is entirely notebook-related
            if (isEntirelyNotebookType(p.type)) return false;
            return true;
        });
        // Clean up union types in remaining properties to remove notebook members
        for (const prop of structure.properties) {
            prop.type = removeNotebookFromType(prop.type);
        }
    }

    // Filter out notebook notifications and requests
    model.notifications = model.notifications.filter(n => !isNotebookRelatedMethod(n.method));
    model.requests = model.requests.filter(r => !isNotebookRelatedMethod(r.method));

    // Filter out notebook enumerations
    model.enumerations = model.enumerations.filter(e => !isNotebookRelatedName(e.name));

    // Remove notebook-related values from remaining enumerations
    for (const enumeration of model.enumerations) {
        enumeration.values = enumeration.values.filter(v => !isNotebookRelatedName(v.name));
    }

    // Filter out notebook type aliases
    model.typeAliases = model.typeAliases.filter(ta => !isNotebookRelatedName(ta.name));

    // Clean up type aliases that reference notebook types (e.g., DocumentFilter)
    for (const ta of model.typeAliases) {
        if (ta.type.kind === "or") {
            ta.type.items = ta.type.items.filter(item => !typeReferencesNotebook(item));
            // If only one item remains, unwrap the union
            if (ta.type.items.length === 1) {
                ta.type = ta.type.items[0];
            }
        }
    }

    // Build the registration method map (after notebook filtering).
    // Each unique registration method gets a field in the generated RegisterOptions struct.
    const regMethodSeen = new Set<string>();
    for (const request of [...model.requests, ...model.notifications]) {
        if (!request.registrationOptions) continue;
        const regMethod = (request as any).registrationMethod || request.method;

        if (regMethodSeen.has(regMethod)) continue;
        regMethodSeen.add(regMethod);

        // Resolve the options type name
        const ro = request.registrationOptions;
        let optionsTypeName: string;
        if (ro.kind === "reference") {
            optionsTypeName = ro.name;
        }
        else {
            throw new Error(`Unexpected registrationOptions kind '${ro.kind}' for ${request.method}; expected all to be resolved to references`);
        }

        registrationMethods.push({
            registrationMethod: regMethod,
            fieldName: methodNameIdentifier(regMethod),
            optionsTypeName,
        });
    }

    // Identify registration-only methods (not also a request/notification method).
    // These need their own Method constant emitted.
    const allRequestMethods = new Set([...model.requests, ...model.notifications].map(r => r.method));
    for (const reg of registrationMethods) {
        (reg as any).isRegistrationOnly = !allRequestMethods.has(reg.registrationMethod);
    }

    // Merge LSPErrorCodes into ErrorCodes and remove LSPErrorCodes
    const errorCodesEnum = model.enumerations.find(e => e.name === "ErrorCodes");
    const lspErrorCodesEnum = model.enumerations.find(e => e.name === "LSPErrorCodes");
    if (errorCodesEnum && lspErrorCodesEnum) {
        // Merge LSPErrorCodes values into ErrorCodes
        errorCodesEnum.values.push(...lspErrorCodesEnum.values);
        // Remove LSPErrorCodes from the model
        model.enumerations = model.enumerations.filter(e => e.name !== "LSPErrorCodes");
    }

    // Singularize plural enum names (e.g., "ErrorCodes" -> "ErrorCode")
    for (const enumeration of model.enumerations) {
        if (enumeration.name.endsWith("Codes")) {
            enumeration.name = enumeration.name.slice(0, -1); // "Codes" -> "Code"
        }
        else if (enumeration.name.endsWith("Modifiers")) {
            enumeration.name = enumeration.name.slice(0, -1); // "Modifiers" -> "Modifier"
        }
        else if (enumeration.name.endsWith("Types")) {
            enumeration.name = enumeration.name.slice(0, -1); // "Types" -> "Type"
        }
    }
}

patchAndPreprocessModel();

// Validate that telemetry events in the TelemetryEvent union have properly shaped
// measurements and properties fields. measurements struct fields must only contain
// numeric types (decimal/integer/uinteger).
function validateTelemetryEvents() {
    const telemetryAlias = customTypeAliases.find(a => a.name === "TelemetryEvent");
    if (!telemetryAlias || telemetryAlias.type.kind !== "or") return;

    const structureMap = new Map(model.structures.map(s => [s.name, s]));

    for (const item of telemetryAlias.type.items) {
        if (item.kind !== "reference") continue;
        const eventStruct = structureMap.get(item.name);
        if (!eventStruct) continue;

        for (const prop of eventStruct.properties) {
            if (prop.name === "measurements" && prop.type.kind === "reference") {
                const measurementsStruct = structureMap.get(prop.type.name);
                if (!measurementsStruct) continue;
                for (const mp of measurementsStruct.properties) {
                    if (mp.type.kind !== "base" || !["decimal", "integer", "uinteger"].includes(mp.type.name)) {
                        throw new Error(
                            `Telemetry measurements struct ${prop.type.name}.${mp.name} must be a numeric type ` +
                                `(decimal/integer/uinteger), got ${mp.type.kind === "base" ? mp.type.name : mp.type.kind}`,
                        );
                    }
                }
            }
        }
    }
}

validateTelemetryEvents();

interface GoType {
    name: string;
    needsPointer: boolean;
}

interface TypeInfo {
    types: Map<string, GoType>;
    literalTypes: Map<string, string>;
    unionTypes: Map<string, { name: string; type: Type; containedNull: boolean; }[]>;
    typeAliasMap: Map<string, Type>;
}

const typeInfo: TypeInfo = {
    types: new Map(),
    literalTypes: new Map(),
    unionTypes: new Map(),
    typeAliasMap: new Map(),
};

function titleCase(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function goFieldName(prop: Property): string {
    if (prop.name.startsWith("_vs_")) {
        return "VS" + titleCase(prop.name.slice(4));
    }
    return titleCase(prop.name);
}

function resolveType(type: Type): GoType {
    switch (type.kind) {
        case "base":
            switch (type.name) {
                case "integer":
                    return { name: "int32", needsPointer: false };
                case "uinteger":
                    return { name: "uint32", needsPointer: false };
                case "string":
                    return { name: "string", needsPointer: false };
                case "boolean":
                    return { name: "bool", needsPointer: false };
                case "URI":
                    return { name: "URI", needsPointer: false };
                case "DocumentUri":
                    return { name: "DocumentUri", needsPointer: false };
                case "decimal":
                    return { name: "float64", needsPointer: false };
                case "null":
                    return { name: "any", needsPointer: false };
                default:
                    throw new Error(`Unsupported base type: ${type.name}`);
            }

        case "reference":
            const typeAliasOverride = typeAliasOverrides.get(type.name);
            if (typeAliasOverride) {
                return typeAliasOverride;
            }

            const nonResolved = nonResolvedAliases.has(type.name);
            if (nonResolved) {
                return { name: type.name, needsPointer: false };
            }

            // Check if this is a type alias that resolves to a union type
            const aliasedType = typeInfo.typeAliasMap.get(type.name);
            if (aliasedType) {
                return resolveType(aliasedType);
            }

            let refType = typeInfo.types.get(type.name);
            if (!refType) {
                refType = { name: type.name, needsPointer: true };
                typeInfo.types.set(type.name, refType);
            }
            return refType;

        case "array": {
            const elementType = resolveType(type.element);
            const arrayTypeName = elementType.needsPointer
                ? `[]*${elementType.name}`
                : `[]${elementType.name}`;
            return {
                name: arrayTypeName,
                needsPointer: false,
            };
        }

        case "map": {
            const keyType = resolveType(type.key);
            const valueType = resolveType(type.value);
            const valueTypeName = valueType.needsPointer ? `*${valueType.name}` : valueType.name;

            return {
                name: `map[${keyType.name}]${valueTypeName}`,
                needsPointer: false,
            };
        }

        case "tuple": {
            if (
                type.items.length === 2 &&
                type.items[0].kind === "base" && type.items[0].name === "uinteger" &&
                type.items[1].kind === "base" && type.items[1].name === "uinteger"
            ) {
                return { name: "[2]uint32", needsPointer: false };
            }

            throw new Error("Unsupported tuple type: " + JSON.stringify(type));
        }

        case "stringLiteral": {
            const typeName = `StringLiteral${type.value.split(".").map(titleCase).join("")}`;
            typeInfo.literalTypes.set(String(type.value), typeName);
            return { name: typeName, needsPointer: false };
        }

        case "integerLiteral": {
            const typeName = `IntegerLiteral${type.value}`;
            typeInfo.literalTypes.set(String(type.value), typeName);
            return { name: typeName, needsPointer: false };
        }

        case "booleanLiteral": {
            const typeName = `BooleanLiteral${type.value ? "True" : "False"}`;
            typeInfo.literalTypes.set(String(type.value), typeName);
            return { name: typeName, needsPointer: false };
        }
        case "literal":
            if (type.value.properties.length === 0) {
                return { name: "struct{}", needsPointer: false };
            }

            throw new Error("Unexpected non-empty literal object: " + JSON.stringify(type.value));

        case "or": {
            return handleOrType(type);
        }

        default:
            throw new Error(`Unsupported type kind: ${type.kind}`);
    }
}

function flattenOrTypes(types: Type[]): Type[] {
    const flattened = new Set<Type>();

    for (const rawType of types) {
        let type = rawType;

        // Dereference reference types that point to OR types
        if (rawType.kind === "reference") {
            const aliasedType = typeInfo.typeAliasMap.get(rawType.name);
            if (aliasedType && aliasedType.kind === "or") {
                type = aliasedType;
            }
        }

        if (type.kind === "or") {
            // Recursively flatten OR types
            for (const subType of flattenOrTypes(type.items)) {
                flattened.add(subType);
            }
        }
        else {
            flattened.add(rawType);
        }
    }

    return Array.from(flattened);
}

function pluralize(name: string): string {
    // Handle common irregular plurals and special cases
    if (
        name.endsWith("s") || name.endsWith("x") || name.endsWith("z") ||
        name.endsWith("ch") || name.endsWith("sh")
    ) {
        return name + "es";
    }
    if (name.endsWith("y") && name.length > 1 && !"aeiou".includes(name[name.length - 2])) {
        return name.slice(0, -1) + "ies";
    }
    return name + "s";
}

function handleOrType(orType: OrType): GoType {
    // First, flatten any nested OR types
    const types = flattenOrTypes(orType.items);

    // Check for nullable types (OR with null)
    const nullIndex = types.findIndex(item => item.kind === "base" && item.name === "null");
    let containedNull = nullIndex !== -1;

    // If it's nullable, remove the null type from the list
    let nonNullTypes = types;
    if (containedNull) {
        nonNullTypes = types.filter((_, i) => i !== nullIndex);
    }

    // If no types remain after filtering null, this shouldn't happen
    if (nonNullTypes.length === 0) {
        throw new Error("Union type with only null is not supported: " + JSON.stringify(types));
    }

    // Even if only one type remains after filtering null, we still need to create a union type
    // to preserve the nullable behavior (all fields nil = null)

    let memberNames = nonNullTypes.map(type => {
        if (type.kind === "reference") {
            return type.name;
        }
        else if (type.kind === "base") {
            return titleCase(type.name);
        }
        else if (
            type.kind === "array" &&
            (type.element.kind === "reference" || type.element.kind === "base")
        ) {
            return pluralize(titleCase(type.element.name));
        }
        else if (type.kind === "array") {
            // Handle more complex array types
            const elementType = resolveType(type.element);
            return `${elementType.name}Array`;
        }
        else if (type.kind === "literal" && type.value.properties.length === 0) {
            return "EmptyObject";
        }
        else if (type.kind === "tuple") {
            return "Tuple";
        }
        else {
            throw new Error(`Unsupported type kind in union: ${type.kind}`);
        }
    });

    // Find longest common prefix of member names chunked by PascalCase
    function findLongestCommonPrefix(names: string[]): string {
        if (names.length === 0) return "";
        if (names.length === 1) return "";

        // Split each name into PascalCase chunks
        function splitPascalCase(name: string): string[] {
            const chunks: string[] = [];
            let currentChunk = "";

            for (let i = 0; i < name.length; i++) {
                const char = name[i];
                if (char >= "A" && char <= "Z" && currentChunk.length > 0) {
                    // Start of a new chunk
                    chunks.push(currentChunk);
                    currentChunk = char;
                }
                else {
                    currentChunk += char;
                }
            }

            if (currentChunk.length > 0) {
                chunks.push(currentChunk);
            }

            return chunks;
        }

        const allChunks = names.map(splitPascalCase);
        const minChunkLength = Math.min(...allChunks.map(chunks => chunks.length));

        // Find the longest common prefix of chunks
        let commonChunks: string[] = [];
        for (let i = 0; i < minChunkLength; i++) {
            const chunk = allChunks[0][i];
            if (allChunks.every(chunks => chunks[i] === chunk)) {
                commonChunks.push(chunk);
            }
            else {
                break;
            }
        }

        return commonChunks.join("");
    }

    const commonPrefix = findLongestCommonPrefix(memberNames);

    let unionTypeName = "";

    if (commonPrefix.length > 0) {
        const trimmedMemberNames = memberNames.map(name => name.slice(commonPrefix.length));
        if (trimmedMemberNames.every(name => name)) {
            unionTypeName = commonPrefix + trimmedMemberNames.join("Or");
            memberNames = trimmedMemberNames;
        }
        else {
            unionTypeName = memberNames.join("Or");
        }
    }
    else {
        unionTypeName = memberNames.join("Or");
    }

    if (containedNull) {
        unionTypeName += "OrNull";
    }
    else {
        containedNull = false;
    }

    const union = memberNames.map((name, i) => ({ name, type: nonNullTypes[i], containedNull }));

    typeInfo.unionTypes.set(unionTypeName, union);

    return {
        name: unionTypeName,
        needsPointer: false,
    };
}

const typeAliasOverrides = new Map([
    ["LSPAny", { name: "any", needsPointer: false }],
    ["LSPArray", { name: "[]any", needsPointer: false }],
    ["LSPObject", { name: "map[string]any", needsPointer: false }],
    ["uint64", { name: "uint64", needsPointer: false }],
]);

// These type aliases are intentionally not resolved to their underlying types.
// It means that we can end up with non-normalized union types in some places.
// Also, unlike other type aliases, these will get a type alias in the generated source code.
// We may want to eventually do this for all type aliases though.
const nonResolvedAliases = new Set(customTypeAliases.map(ta => ta.name));

/**
 * First pass: Resolve all type information
 */
function collectTypeDefinitions() {
    // Process all enumerations first to make them available for struct fields
    for (const enumeration of model.enumerations) {
        typeInfo.types.set(enumeration.name, {
            name: enumeration.name,
            needsPointer: false,
        });
    }

    const valueTypes = new Set([
        "Position",
        "Range",
        "Location",
        "Color",
        "TextDocumentIdentifier",
        "PreviousResultId",
        "VersionedTextDocumentIdentifier",
        "OptionalVersionedTextDocumentIdentifier",
        "ExportInfoMapKey",
    ]);

    // Process all structures
    for (const structure of model.structures) {
        typeInfo.types.set(structure.name, {
            name: structure.name,
            needsPointer: !valueTypes.has(structure.name),
        });
    }

    // Process all type aliases
    for (const typeAlias of model.typeAliases) {
        if (typeAliasOverrides.has(typeAlias.name)) {
            continue;
        }

        // Store the alias mapping so we can resolve it later
        typeInfo.typeAliasMap.set(typeAlias.name, typeAlias.type);
    }
}

function formatDocumentation(s: string | undefined): string {
    if (!s) return "";

    let lines: string[] = [];

    for (let line of s.split("\n")) {
        line = line.trimEnd();
        line = line.replace(/(\w ) +/g, "$1");
        line = line.replace(/\{@link(?:code)?.*?([^} ]+)\}/g, "$1");
        line = line.replace(/^@(since|proposed|deprecated)(.*)/, (_, tag, rest) => {
            lines.push("");
            return `${titleCase(tag)}${rest ? ":" + rest : "."}`;
        });
        lines.push(line);
    }

    // filter out contiguous empty lines
    while (true) {
        const toRemove = lines.findIndex((line, index) => {
            if (line) return false;
            if (index === 0) return true;
            if (index === lines.length - 1) return true;
            return !(lines[index - 1] && lines[index + 1]);
        });
        if (toRemove === -1) break;
        lines.splice(toRemove, 1);
    }

    return lines.length > 0 ? "// " + lines.join("\n// ") + "\n" : "";
}

function methodNameIdentifier(name: string) {
    return name.split("/").map(v => {
        if (v === "$") return "";
        // Mirror goFieldName: "_vs_foo" -> "VSFoo".
        if (v.startsWith("_vs_")) return "VS" + titleCase(v.slice(4));
        return titleCase(v);
    }).join("");
}

/**
 * Returns the JSON token kind ("string", "number", "object", "array", "boolean")
 * for a given meta model Type, or undefined if the kind cannot be statically determined.
 */
function jsonKindForType(type: Type): string | undefined {
    switch (type.kind) {
        case "base":
            switch (type.name) {
                case "integer":
                case "uinteger":
                case "decimal":
                    return "number";
                case "string":
                case "URI":
                case "DocumentUri":
                    return "string";
                case "boolean":
                    return "boolean";
                default:
                    return undefined;
            }
        case "reference": {
            if (typeAliasOverrides.has(type.name)) {
                return undefined;
            }
            if (model.structures.some(s => s.name === type.name)) {
                return "object";
            }
            const enumeration = model.enumerations.find(e => e.name === type.name);
            if (enumeration) {
                switch (enumeration.type.name) {
                    case "string":
                        return "string";
                    case "integer":
                    case "uinteger":
                        return "number";
                    default:
                        return undefined;
                }
            }
            const aliasType = typeInfo.typeAliasMap.get(type.name);
            if (aliasType) return jsonKindForType(aliasType);
            return undefined;
        }
        case "array":
            return "array";
        case "map":
            return "object";
        case "tuple":
            return "array";
        case "stringLiteral":
            return "string";
        case "integerLiteral":
            return "number";
        case "booleanLiteral":
            return "boolean";
        case "literal":
            return "object";
        case "or": {
            const kinds = new Set(type.items.map(item => jsonKindForType(item)).filter(Boolean));
            return kinds.size === 1 ? kinds.values().next().value : undefined;
        }
        default:
            return undefined;
    }
}

function goKindCasesForJsonKind(kind: string): string {
    switch (kind) {
        case "string":
            return `case '"':`;
        case "number":
            return `case '0':`;
        case "object":
            return `case '{':`;
        case "array":
            return `case '[':`;
        case "boolean":
            return `case 't', 'f':`;
        default:
            return "";
    }
}

/**
 * Checks if a meta model Type can represent a JSON null value.
 * Used to determine whether to reject explicit JSON `null` for any field
 * that can otherwise decode `null` without a type error.
 */
function typeCanBeNull(type: Type): boolean {
    switch (type.kind) {
        case "base":
            return type.name === "null";
        case "reference": {
            const override = typeAliasOverrides.get(type.name);
            if (override) {
                return override.name === "any";
            }
            // A bare "any" reference resolves to Go's `any` (interface), which can hold null.
            if (type.name === "any") {
                return true;
            }
            if (nonResolvedAliases.has(type.name)) {
                const customAlias = customTypeAliases.find(t => t.name === type.name);
                if (customAlias) return typeCanBeNull(customAlias.type);
                return false;
            }
            const aliased = typeInfo.typeAliasMap.get(type.name);
            if (aliased) return typeCanBeNull(aliased);
            return false;
        }
        case "or":
            return type.items.some(item => typeCanBeNull(item));
        default:
            return false;
    }
}

/**
 * For a group of union entries that share the same JSON kind (e.g., all objects),
 * find a discriminator field — a JSON property whose string literal type differs
 * across variants — enabling efficient O(1) dispatch instead of try-each.
 */
function findDiscriminatorField(entries: { fieldName: string; typeName: string; originalType: Type; }[]): {
    fieldName: string;
    mapping: Map<string, { fieldName: string; typeName: string; originalType: Type; }>;
    unmapped: { fieldName: string; typeName: string; originalType: Type; }[];
} | null {
    // For each entry, find string literal fields and build candidate discriminators.
    // A valid discriminator is a field name that appears on multiple variants with
    // different string literal values.
    const fieldCandidates = new Map<string, Map<string, typeof entries[0] | undefined>>();

    for (const entry of entries) {
        if (entry.originalType.kind !== "reference") continue;
        const structure = model.structures.find(s => s.name === (entry.originalType as ReferenceType).name);
        if (!structure) continue;

        for (const prop of structure.properties) {
            if (prop.type.kind === "stringLiteral") {
                if (!fieldCandidates.has(prop.name)) {
                    fieldCandidates.set(prop.name, new Map());
                }
                const mapping = fieldCandidates.get(prop.name)!;
                if (!mapping.has(prop.type.value)) {
                    mapping.set(prop.type.value, entry);
                }
                else {
                    // Two entries share the same literal value; invalidate this candidate.
                    mapping.set(prop.type.value, undefined);
                }
            }
        }
    }

    // Pick the discriminator field that covers the most entries.
    let bestField: string | null = null;
    let bestMapping: Map<string, typeof entries[0]> | null = null;

    for (const [fieldName, mapping] of fieldCandidates) {
        const validMapping = new Map<string, typeof entries[0]>();
        for (const [value, entry] of mapping) {
            if (entry !== undefined) validMapping.set(value, entry);
        }
        if (validMapping.size >= 2 && (!bestMapping || validMapping.size > bestMapping.size)) {
            bestField = fieldName;
            bestMapping = validMapping;
        }
    }

    if (!bestField || !bestMapping) return null;

    const mappedEntries = new Set(bestMapping.values());
    const unmapped = entries.filter(e => !mappedEntries.has(e));

    return { fieldName: bestField, mapping: bestMapping, unmapped };
}

/**
 * For a group of union entries that share the same JSON kind, find fields whose
 * presence/absence in the JSON uniquely identifies a variant. A "presence discriminator"
 * for variant X is a required field on X that does not appear in any other variant's
 * property set at all.
 */
function findPresenceDiscriminator(entries: { fieldName: string; typeName: string; originalType: Type; }[]): {
    checks: { jsonFieldName: string; entry: { fieldName: string; typeName: string; originalType: Type; }; }[];
    unmapped: { fieldName: string; typeName: string; originalType: Type; }[];
} | null {
    // Collect all property names for each variant
    const variantProps = new Map<typeof entries[0], { required: Property[]; allNames: Set<string>; }>();
    for (const entry of entries) {
        if (entry.originalType.kind !== "reference") continue;
        const structure = model.structures.find(s => s.name === (entry.originalType as ReferenceType).name);
        if (!structure) continue;
        const required = structure.properties.filter(p => !p.optional && !p.omitzeroValue);
        const allNames = new Set(structure.properties.map(p => p.name));
        variantProps.set(entry, { required, allNames });
    }

    const checks: { jsonFieldName: string; entry: typeof entries[0]; }[] = [];
    const handled = new Set<typeof entries[0]>();

    for (const entry of entries) {
        const info = variantProps.get(entry);
        if (!info) continue;

        const otherEntries = entries.filter(e => e !== entry);
        for (const field of info.required) {
            const absentFromAllOthers = otherEntries.every(other => {
                const otherInfo = variantProps.get(other);
                if (!otherInfo) return false;
                return !otherInfo.allNames.has(field.name);
            });
            if (absentFromAllOthers) {
                checks.push({ jsonFieldName: field.name, entry });
                handled.add(entry);
                break;
            }
        }
    }

    if (checks.length === 0) return null;

    const unmapped = entries.filter(e => !handled.has(e));
    return { checks, unmapped };
}

/**
 * Generate the Go code
 */
function generateCode() {
    const parts: string[] = [];

    function write(s: string) {
        parts.push(s);
    }

    function writeLine(s = "") {
        parts.push(s + "\n");
    }

    /**
     * Generate Go code for discriminator-based union dispatch.
     * Assumes a variable named `data` of type `json.Value` is in scope.
     * Returns true if all switch branches return (exhaustive).
     */
    function generateDiscriminatorDispatch(
        disc: NonNullable<ReturnType<typeof findDiscriminatorField>>,
        indent: string,
    ): boolean {
        writeLine(`${indent}switch string(jsonObjectRawField(data, ${JSON.stringify(disc.fieldName)})) {`);
        for (const [value, entry] of disc.mapping) {
            writeLine(`${indent}case \`"${value}"\`:`);
            writeLine(`${indent}\to.${entry.fieldName} = new(${entry.typeName})`);
            writeLine(`${indent}\treturn json.Unmarshal(data, o.${entry.fieldName})`);
        }
        let exhaustive = false;
        if (disc.unmapped.length > 0) {
            writeLine(`${indent}default:`);
            exhaustive = generateUnmappedFallback(disc.unmapped, indent + "\t");
        }
        writeLine(`${indent}}`);
        return exhaustive;
    }

    /**
     * Generate try-each fallback code for unmapped entries, chaining into
     * presence dispatch if possible before falling back to raw try-each.
     * Assumes a variable named `data` of type `json.Value` is in scope.
     * Returns true if all generated paths return (exhaustive).
     */
    function generateUnmappedFallback(
        unmapped: { fieldName: string; typeName: string; originalType: Type; }[],
        indent: string,
    ): boolean {
        if (unmapped.length <= 1) {
            // Exactly 1 entry: it's the only remaining variant after dispatch,
            // so use a hard error return instead of speculative err == nil.
            for (const entry of unmapped) {
                writeLine(`${indent}o.${entry.fieldName} = new(${entry.typeName})`);
                writeLine(`${indent}return json.Unmarshal(data, o.${entry.fieldName})`);
            }
            return unmapped.length === 1;
        }
        // Try chaining presence dispatch on the remaining subset
        const pres = findPresenceDiscriminator(unmapped);
        if (pres) {
            return generatePresenceDispatch(pres, indent);
        }
        else {
            for (const entry of unmapped) {
                writeLine(`${indent}var v${entry.fieldName} ${entry.typeName}`);
                writeLine(`${indent}if err := json.Unmarshal(data, &v${entry.fieldName}); err == nil {`);
                writeLine(`${indent}\to.${entry.fieldName} = &v${entry.fieldName}`);
                writeLine(`${indent}\treturn nil`);
                writeLine(`${indent}}`);
            }
            return false;
        }
    }

    /**
     * Iteratively collect all presence discriminator checks across multiple
     * passes, so they can be emitted as a single flat switch with one scan.
     */
    function collectAllPresenceChecks(
        pres: NonNullable<ReturnType<typeof findPresenceDiscriminator>>,
    ): {
        allChecks: { jsonFieldName: string; entry: { fieldName: string; typeName: string; originalType: Type; }; }[];
        finalUnmapped: { fieldName: string; typeName: string; originalType: Type; }[];
    } {
        const allChecks = [...pres.checks];
        let remaining = pres.unmapped;
        while (remaining.length > 1) {
            const next = findPresenceDiscriminator(remaining);
            if (!next) break;
            allChecks.push(...next.checks);
            remaining = next.unmapped;
        }
        return { allChecks, finalUnmapped: remaining };
    }

    /**
     * Generate Go code for presence-based union dispatch.
     * Assumes a variable named `data` of type `json.Value` is in scope.
     * Collects all presence checks iteratively, then emits a single flat
     * switch jsonObjectHasKey(data, key1, key2, ...) so data is scanned once.
     * Returns true if all switch branches return (exhaustive).
     */
    function generatePresenceDispatch(
        pres: NonNullable<ReturnType<typeof findPresenceDiscriminator>>,
        indent: string,
    ): boolean {
        const { allChecks, finalUnmapped } = collectAllPresenceChecks(pres);
        const args = allChecks.map(c => JSON.stringify(c.jsonFieldName)).join(", ");
        writeLine(`${indent}switch jsonObjectHasKey(data, ${args}) {`);
        for (let i = 0; i < allChecks.length; i++) {
            writeLine(`${indent}case ${i}: // ${allChecks[i].jsonFieldName}`);
            writeLine(`${indent}\to.${allChecks[i].entry.fieldName} = new(${allChecks[i].entry.typeName})`);
            writeLine(`${indent}\treturn json.Unmarshal(data, o.${allChecks[i].entry.fieldName})`);
        }
        if (finalUnmapped.length > 0) {
            writeLine(`${indent}default:`);
            if (finalUnmapped.length === 1) {
                // Only one variant left after dispatch — use hard error return.
                const entry = finalUnmapped[0];
                writeLine(`${indent}\to.${entry.fieldName} = new(${entry.typeName})`);
                writeLine(`${indent}\treturn json.Unmarshal(data, o.${entry.fieldName})`);
            }
            else {
                for (const entry of finalUnmapped) {
                    writeLine(`${indent}\tvar v${entry.fieldName} ${entry.typeName}`);
                    writeLine(`${indent}\tif err := json.Unmarshal(data, &v${entry.fieldName}); err == nil {`);
                    writeLine(`${indent}\t\to.${entry.fieldName} = &v${entry.fieldName}`);
                    writeLine(`${indent}\t\treturn nil`);
                    writeLine(`${indent}\t}`);
                }
            }
        }
        writeLine(`${indent}}`);
        // Exhaustive if the default case has a single hard-returning entry
        return finalUnmapped.length === 1;
    }

    function generateResolvedStruct(structure: Structure, indent: string = "\t"): string[] {
        const lines: string[] = [];

        for (const prop of structure.properties) {
            // Add property documentation if it exists
            if (prop.documentation) {
                const propDoc = formatDocumentation(prop.documentation);
                if (propDoc) {
                    // Add the documentation with proper indentation
                    for (const line of propDoc.split("\n").filter(l => l)) {
                        lines.push(`${indent}${line}`);
                    }
                }
            }

            const type = resolveType(prop.type);

            // For reference types that are structures, use a named resolved type
            if (prop.type.kind === "reference") {
                const refStructure = model.structures.find(s => s.name === type.name);
                if (refStructure) {
                    // Use a named type for the resolved version
                    lines.push(`${indent}${goFieldName(prop)} Resolved${type.name} \`json:"${prop.name},omitzero"\``);
                    continue;
                }
            }

            // For other types (primitives, enums, arrays, etc.), use the type directly (no pointer)
            const goType = type.name;
            lines.push(`${indent}${goFieldName(prop)} ${goType} \`json:"${prop.name},omitzero"\``);
        }

        return lines;
    }

    function generateResolveConversion(structure: Structure, varName: string, indent: string): string[] {
        const lines: string[] = [];

        for (const prop of structure.properties) {
            const type = resolveType(prop.type);
            const fieldName = goFieldName(prop);
            const accessPath = `${varName}.${fieldName}`;

            // For reference types that are structures, call the resolve method
            if (prop.type.kind === "reference") {
                const refStructure = model.structures.find(s => s.name === type.name);
                if (refStructure) {
                    lines.push(`${indent}${fieldName}: ${accessPath}.resolve(),`);
                    continue;
                }
            }

            // For other types, dereference if pointer
            if (prop.optional || type.needsPointer) {
                lines.push(`${indent}${fieldName}: derefOr(${accessPath}),`);
            }
            else {
                lines.push(`${indent}${fieldName}: ${accessPath},`);
            }
        }

        return lines;
    }

    function collectStructureDependencies(structure: Structure, visited = new Set<string>()): Structure[] {
        if (visited.has(structure.name)) {
            return [];
        }
        visited.add(structure.name);

        const deps: Structure[] = [];

        for (const prop of structure.properties) {
            if (prop.type.kind === "reference") {
                const refStructure = model.structures.find(s => s.name === (prop.type as ReferenceType).name);
                if (refStructure) {
                    deps.push(...collectStructureDependencies(refStructure, new Set(visited)));
                    deps.push(refStructure);
                }
            }
        }

        return deps;
    }

    function generateResolvedTypeAndHelper(structure: Structure, isMain: boolean = false): string[] {
        const lines: string[] = [];
        const typeName = `Resolved${structure.name}`;
        // Main method is exported (Resolve), helpers are unexported (resolve)
        const methodName = isMain ? `Resolve` : `resolve`;

        // Generate the resolved type with documentation
        if (!isMain) {
            // For non-main types, add standard documentation header
            if (structure.documentation) {
                const typeDoc = formatDocumentation(structure.documentation);
                if (typeDoc) {
                    // Prepend comment explaining this is the resolved version
                    lines.push(`// ${typeName} is a resolved version of ${structure.name} with all optional fields`);
                    lines.push(`// converted to non-pointer values for easier access.`);
                    lines.push(`//`);
                    // Add the original structure documentation
                    for (const line of typeDoc.split("\n").filter(l => l)) {
                        lines.push(line);
                    }
                }
            }
            else {
                // If no documentation, just add a basic comment
                lines.push(`// ${typeName} is a resolved version of ${structure.name} with all optional fields`);
                lines.push(`// converted to non-pointer values for easier access.`);
            }
        }
        // For main type, documentation is added separately before calling this function

        lines.push(`type ${typeName} struct {`);
        lines.push(...generateResolvedStruct(structure, "\t"));
        lines.push(`}`);
        lines.push(``);

        // Generate the conversion method on the pointer receiver
        lines.push(`func (v *${structure.name}) ${methodName}() ${typeName} {`);
        lines.push(`\tif v == nil {`);
        lines.push(`\t\treturn ${typeName}{}`);
        lines.push(`\t}`);
        lines.push(`\treturn ${typeName}{`);
        lines.push(...generateResolveConversion(structure, "v", "\t\t"));
        lines.push(`\t}`);
        lines.push(`}`);
        lines.push(``);

        return lines;
    }

    // File header
    writeLine("// Code generated by generate.mts; DO NOT EDIT.");
    writeLine("");
    writeLine("package lsproto");
    writeLine("");
    writeLine(`import (`);
    writeLine(`\t"fmt"`);
    writeLine(`\t"strings"`);
    writeLine("");
    writeLine(`\t"github.com/microsoft/typescript-go/internal/json"`);
    writeLine(`)`);
    writeLine("");
    writeLine("// Meta model version " + model.metaData.version);
    writeLine("");

    // Generate structures
    writeLine("// Structures\n");

    for (const structure of model.structures) {
        function generateStructFields(name: string, includeDocumentation: boolean) {
            if (includeDocumentation) {
                write(formatDocumentation(structure.documentation));
            }

            writeLine(`type ${name} struct {`);

            // Properties are now inlined, no need to embed extends/mixins
            for (const prop of structure.properties) {
                if (includeDocumentation) {
                    write(formatDocumentation(prop.documentation));
                }

                const type = resolveType(prop.type);

                // For properties marked with omitzeroValue, use value type with omitzero instead of pointer
                const useOmitzero = prop.optional || prop.omitzeroValue;
                const goType = (prop.optional || type.needsPointer) && !prop.omitzeroValue ? `*${type.name}` : type.name;

                writeLine(`\t${goFieldName(prop)} ${goType} \`json:"${prop.name}${useOmitzero ? ",omitzero" : ""}"\``);

                if (includeDocumentation) {
                    writeLine("");
                }
            }

            // Special: add RegisterOptions field to Registration
            if (structure.name === "Registration") {
                writeLine("");
                writeLine(`\t// Options necessary for the registration. Determines the method.`);
                writeLine(`\tRegisterOptions *RegisterOptions \`json:"-"\``);
            }

            writeLine("}");
            writeLine("");
        }

        generateStructFields(structure.name, true);
        writeLine("");

        if (hasTextDocumentURI(structure)) {
            // Generate TextDocumentURI method
            const textDocProp = structure.properties?.find(p => (p.name === "textDocument" || p.name === "_vs_textDocument") && p.type.kind === "reference" && p.type.name === "TextDocumentIdentifier");
            const textDocFieldName = textDocProp ? goFieldName(textDocProp) : "TextDocument";
            writeLine(`func (s *${structure.name}) TextDocumentURI() DocumentUri {`);
            writeLine(`\treturn s.${textDocFieldName}.Uri`);
            writeLine(`}`);
            writeLine("");

            if (hasTextDocumentPosition(structure)) {
                // Generate TextDocumentPosition method
                const posProp = structure.properties?.find(p => (p.name === "position" || p.name === "_vs_position") && p.type.kind === "reference" && p.type.name === "Position");
                const posFieldName = posProp ? goFieldName(posProp) : "Position";
                writeLine(`func (s *${structure.name}) TextDocumentPosition() Position {`);
                writeLine(`\treturn s.${posFieldName}`);
                writeLine(`}`);
                writeLine("");
            }
        }

        const locationUriProperty = getLocationUriProperty(structure);
        if (locationUriProperty) {
            // Generate Location method
            writeLine(`func (s ${structure.name}) GetLocation() Location {`);
            if (locationUriProperty === "Uri" && structure.name === "Location") {
                writeLine(`\treturn s`);
            }
            else {
                writeLine(`\treturn Location{`);
                writeLine(`\t\tUri:   s.${locationUriProperty},`);
                writeLine(`\t\tRange: s.${locationUriProperty.replace(/Uri$/, "Range")},`);
                writeLine(`\t}`);
            }
            writeLine(`}`);
            writeLine("");
        }

        // Generate UnmarshalJSONFrom method for structure validation
        // Skip Registration (has custom marshal/unmarshal generated separately)
        // Skip properties marked with omitzeroValue since they're optional by nature
        const requiredProps = structure.properties?.filter(p => {
            if (p.optional) return false;
            if (p.omitzeroValue) return false;
            return true;
        }) || [];
        // Check if any fields need null rejection
        const hasNullRejectableFields = structure.properties?.some(p => {
            if (p.omitzeroValue) return false;
            if (typeCanBeNull(p.type)) return false;
            const resolved = resolveType(p.type);
            return p.optional || resolved.needsPointer || resolved.name.startsWith("[]") || resolved.name.startsWith("map[");
        }) || false;
        if ((requiredProps.length > 0 || hasNullRejectableFields) && structure.name !== "Registration") {
            writeLine(`\tvar _ json.UnmarshalerFrom = (*${structure.name})(nil)`);
            writeLine("");

            writeLine(`func (s *${structure.name}) UnmarshalJSONFrom(dec *json.Decoder) error {`);
            if (requiredProps.length > 0) {
                writeLine(`\tconst (`);
                for (let i = 0; i < requiredProps.length; i++) {
                    const prop = requiredProps[i];
                    const iotaPrefix = i === 0 ? " uint = 1 << iota" : "";
                    writeLine(`\t\tmissing${goFieldName(prop)}${iotaPrefix}`);
                }
                writeLine(`\t\t_missingLast`);
                writeLine(`\t)`);
                writeLine(`\tmissing := _missingLast - 1`);
                writeLine("");
            }

            writeLine(`\tif k := dec.PeekKind(); k != '{' {`);
            writeLine(`\t\treturn errNotObject(k)`);
            writeLine(`\t}`);
            writeLine(`\tif _, err := dec.ReadToken(); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine("");

            writeLine(`\tfor dec.PeekKind() != '}' {`);
            writeLine(`\t\tname, err := dec.ReadValue()`);
            writeLine(`\t\tif err != nil {`);
            writeLine(`\t\t\treturn err`);
            writeLine(`\t\t}`);
            writeLine(`\t\tswitch string(name) {`);

            for (const prop of structure.properties) {
                writeLine(`\t\tcase \`"${prop.name}"\`:`);
                if (!prop.optional && !prop.omitzeroValue) {
                    writeLine(`\t\t\tmissing &^= missing${goFieldName(prop)}`);
                }
                // Reject null for fields whose types cannot represent null but whose Go types
                // silently accept it (pointers, slices, maps).
                const resolvedType = resolveType(prop.type);
                const goTypeAcceptsNull = (prop.optional || resolvedType.needsPointer || resolvedType.name.startsWith("[]") || resolvedType.name.startsWith("map[")) && !prop.omitzeroValue;
                if (goTypeAcceptsNull && !typeCanBeNull(prop.type)) {
                    writeLine(`\t\t\tif dec.PeekKind() == 'n' {`);
                    writeLine(`\t\t\t\treturn errNull("${prop.name}")`);
                    writeLine(`\t\t\t}`);
                }
                writeLine(`\t\t\tif err := json.UnmarshalDecode(dec, &s.${goFieldName(prop)}); err != nil {`);
                writeLine(`\t\t\t\treturn err`);
                writeLine(`\t\t\t}`);
            }

            writeLine(`\t\tdefault:`);
            writeLine(`\t\t\tif err := dec.SkipValue(); err != nil {`);
            writeLine(`\t\t\t\treturn err`);
            writeLine(`\t\t\t}`);
            writeLine(`\t\t}`);
            writeLine(`\t}`);
            writeLine("");

            writeLine(`\tif _, err := dec.ReadToken(); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine("");

            if (requiredProps.length > 0) {
                writeLine(`\tif missing != 0 {`);
                writeLine(`\t\tvar missingProps []string`);
                for (const prop of requiredProps) {
                    writeLine(`\t\tif missing&missing${goFieldName(prop)} != 0 {`);
                    writeLine(`\t\t\tmissingProps = append(missingProps, "${prop.name}")`);
                    writeLine(`\t\t}`);
                }
                writeLine(`\t\treturn errMissing(missingProps)`);
                writeLine(`\t}`);
                writeLine("");
            }

            writeLine(`\treturn nil`);
            writeLine(`}`);
            writeLine("");
        }

        // Generate RegisterOptions struct and custom Registration marshal/unmarshal
        // right after the Registration struct definition.
        if (structure.name === "Registration") {
            // RegisterOptions struct
            writeLine(`// RegisterOptions is an externally-tagged union representing the options for a capability registration.`);
            writeLine(`// Exactly one field should be set. The set field determines the method for the registration.`);
            writeLine(`type RegisterOptions struct {`);
            for (const reg of registrationMethods) {
                writeLine(`\t${reg.fieldName} *${reg.optionsTypeName}`);
            }
            writeLine(`}`);
            writeLine("");

            // MarshalJSONTo for Registration
            writeLine(`var _ json.MarshalerTo = (*Registration)(nil)`);
            writeLine("");
            writeLine(`func (s *Registration) MarshalJSONTo(enc *json.Encoder) error {`);

            // Assert RegisterOptions is set and exactly one field is set
            writeLine(`\tif s.RegisterOptions == nil {`);
            writeLine(`\t\tpanic("RegisterOptions must be set")`);
            writeLine(`\t}`);
            const regParts = registrationMethods.map(r => `boolToInt(s.RegisterOptions.${r.fieldName} != nil)`);
            const regSum = regParts.join(" +\n\t\t");
            writeLine(`\tassertOnlyOne("exactly one element of RegisterOptions should be set", ${regSum})`);
            writeLine("");

            writeLine(`\tif err := enc.WriteToken(json.BeginObject); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine(`\tif err := enc.WriteValue(json.Value(\`"id"\`)); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine(`\tif err := json.MarshalEncode(enc, s.Id); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine(`\tif err := enc.WriteValue(json.Value(\`"method"\`)); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine(`\tvar method json.Value`);
            writeLine(`\tvar opts any`);
            writeLine(`\tswitch {`);
            for (const reg of registrationMethods) {
                writeLine(`\tcase s.RegisterOptions.${reg.fieldName} != nil:`);
                writeLine(`\t\tmethod = json.Value(\`"${reg.registrationMethod}"\`)`);
                writeLine(`\t\topts = s.RegisterOptions.${reg.fieldName}`);
            }
            writeLine(`\t}`);
            writeLine(`\tif err := enc.WriteValue(method); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine(`\tif err := enc.WriteValue(json.Value(\`"registerOptions"\`)); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine(`\tif err := json.MarshalEncode(enc, opts); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine(`\treturn enc.WriteToken(json.EndObject)`);
            writeLine(`}`);
            writeLine("");

            // UnmarshalJSONFrom for Registration
            writeLine(`var _ json.UnmarshalerFrom = (*Registration)(nil)`);
            writeLine("");
            writeLine(`func (s *Registration) UnmarshalJSONFrom(dec *json.Decoder) error {`);
            writeLine(`\t*s = Registration{}`);
            writeLine(`\tconst (`);
            writeLine(`\t\tmissingId uint = 1 << iota`);
            writeLine(`\t\tmissingMethod`);
            writeLine(`\t\t_missingLast`);
            writeLine(`\t)`);
            writeLine(`\tmissing := _missingLast - 1`);
            writeLine("");
            writeLine(`\tif k := dec.PeekKind(); k != '{' {`);
            writeLine(`\t\treturn errNotObject(k)`);
            writeLine(`\t}`);
            writeLine(`\tif _, err := dec.ReadToken(); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine("");
            writeLine(`\tvar method string`);
            writeLine(`\tvar rawRegisterOptions json.Value`);
            writeLine("");
            writeLine(`\tfor dec.PeekKind() != '}' {`);
            writeLine(`\t\tname, err := dec.ReadValue()`);
            writeLine(`\t\tif err != nil {`);
            writeLine(`\t\t\treturn err`);
            writeLine(`\t\t}`);
            writeLine(`\t\tswitch string(name) {`);
            writeLine(`\t\tcase \`"id"\`:`);
            writeLine(`\t\t\tmissing &^= missingId`);
            writeLine(`\t\t\tif err := json.UnmarshalDecode(dec, &s.Id); err != nil {`);
            writeLine(`\t\t\t\treturn err`);
            writeLine(`\t\t\t}`);
            writeLine(`\t\tcase \`"method"\`:`);
            writeLine(`\t\t\tmissing &^= missingMethod`);
            writeLine(`\t\t\tif err := json.UnmarshalDecode(dec, &method); err != nil {`);
            writeLine(`\t\t\t\treturn err`);
            writeLine(`\t\t\t}`);
            writeLine(`\t\tcase \`"registerOptions"\`:`);
            writeLine(`\t\t\tv, err := dec.ReadValue()`);
            writeLine(`\t\t\tif err != nil {`);
            writeLine(`\t\t\t\treturn err`);
            writeLine(`\t\t\t}`);
            writeLine(`\t\t\trawRegisterOptions = v`);
            writeLine(`\t\tdefault:`);
            writeLine(`\t\t\tif err := dec.SkipValue(); err != nil {`);
            writeLine(`\t\t\t\treturn err`);
            writeLine(`\t\t\t}`);
            writeLine(`\t\t}`);
            writeLine(`\t}`);
            writeLine("");
            writeLine(`\tif _, err := dec.ReadToken(); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine("");
            writeLine(`\tif missing != 0 {`);
            writeLine(`\t\tvar missingProps []string`);
            writeLine(`\t\tif missing&missingId != 0 {`);
            writeLine(`\t\t\tmissingProps = append(missingProps, "id")`);
            writeLine(`\t\t}`);
            writeLine(`\t\tif missing&missingMethod != 0 {`);
            writeLine(`\t\t\tmissingProps = append(missingProps, "method")`);
            writeLine(`\t\t}`);
            writeLine(`\t\treturn errMissing(missingProps)`);
            writeLine(`\t}`);
            writeLine("");
            writeLine(`\tif len(rawRegisterOptions) > 0 {`);
            writeLine(`\t\ts.RegisterOptions = &RegisterOptions{}`);
            writeLine(`\t\tswitch Method(method) {`);
            for (const reg of registrationMethods) {
                writeLine(`\t\tcase Method${reg.fieldName}:`);
                writeLine(`\t\t\tvar v ${reg.optionsTypeName}`);
                writeLine(`\t\t\tif err := json.Unmarshal(rawRegisterOptions, &v); err != nil {`);
                writeLine(`\t\t\t\treturn err`);
                writeLine(`\t\t\t}`);
                writeLine(`\t\t\ts.RegisterOptions.${reg.fieldName} = &v`);
            }
            writeLine(`\t\tdefault:`);
            writeLine(`\t\t\treturn fmt.Errorf("unknown registration method: %s", method)`);
            writeLine(`\t\t}`);
            writeLine(`\t} else {`);
            writeLine(`\t\treturn fmt.Errorf("missing registerOptions for method: %s", method)`);
            writeLine(`\t}`);
            writeLine("");
            writeLine(`\treturn nil`);
            writeLine(`}`);
            writeLine("");
        }
    }

    // Helper function to detect if an enum is a bitflag enum
    // Hardcoded list of bitflag enums
    const bitflagEnums = new Set(["WatchKind"]);

    function isBitflagEnum(enumeration: any): boolean {
        return bitflagEnums.has(enumeration.name);
    }

    // Generate enumerations
    writeLine("// Enumerations\n");

    for (const enumeration of model.enumerations) {
        write(formatDocumentation(enumeration.documentation));

        let baseType;
        switch (enumeration.type.name) {
            case "string":
                baseType = "string";
                break;
            case "integer":
                baseType = "int32";
                break;
            case "uinteger":
                baseType = "uint32";
                break;
            default:
                throw new Error(`Unsupported enum type: ${enumeration.type.name}`);
        }

        writeLine(`type ${enumeration.name} ${baseType}`);
        writeLine("");

        // Get the pre-processed enum entries map that avoids duplicates

        const enumValues = enumeration.values.map(value => ({
            value: String(value.value),
            numericValue: Number(value.value),
            name: value.name,
            identifier: `${enumeration.name}${titleCase(value.name)}`,
            documentation: value.documentation,
            deprecated: value.deprecated,
        }));

        writeLine("const (");

        // Process entries with unique identifiers
        for (const entry of enumValues) {
            write(formatDocumentation(entry.documentation));

            let valueLiteral;
            // Handle string values
            if (enumeration.type.name === "string") {
                valueLiteral = `"${entry.value.replace(/^"|"$/g, "")}"`;
            }
            else {
                valueLiteral = entry.value;
            }

            writeLine(`\t${entry.identifier} ${enumeration.name} = ${valueLiteral}`);
        }

        writeLine(")");
        writeLine("");

        // Generate String() method for non-string enums
        if (enumeration.type.name !== "string") {
            const isBitflag = isBitflagEnum(enumeration);

            if (isBitflag) {
                // Generate bitflag-aware String() method using stringer-style efficiency
                const sortedValues = [...enumValues].sort((a, b) => a.numericValue - b.numericValue);
                const names = sortedValues.map(v => v.name);
                const values = sortedValues.map(v => v.numericValue);

                const nameConst = `_${enumeration.name}_name`;
                const indexVar = `_${enumeration.name}_index`;
                const combinedNames = names.join("");

                writeLine(`const ${nameConst} = "${combinedNames}"`);
                write(`var ${indexVar} = [...]uint16{0`);
                let offset = 0;
                for (const name of names) {
                    offset += name.length;
                    write(`, ${offset}`);
                }
                writeLine(`}`);
                writeLine("");

                writeLine(`func (e ${enumeration.name}) String() string {`);
                writeLine(`\tif e == 0 {`);
                writeLine(`\t\treturn "0"`);
                writeLine(`\t}`);
                writeLine(`\tvar parts []string`);
                for (let i = 0; i < values.length; i++) {
                    writeLine(`\tif e&${values[i]} != 0 {`);
                    writeLine(`\t\tparts = append(parts, ${nameConst}[${indexVar}[${i}]:${indexVar}[${i + 1}]])`);
                    writeLine(`\t}`);
                }
                writeLine(`\tif len(parts) == 0 {`);
                writeLine(`\t\treturn fmt.Sprintf("${enumeration.name}(%d)", e)`);
                writeLine(`\t}`);
                writeLine(`\treturn strings.Join(parts, "|")`);
                writeLine(`}`);
                writeLine("");
            }
            else {
                // Generate regular String() method using stringer-style approach
                // Split values into runs of contiguous values
                const sortedValues = [...enumValues].sort((a, b) => a.numericValue - b.numericValue);

                // Split into runs
                const runs: Array<{ names: string[]; values: number[]; }> = [];
                let currentRun = { names: [sortedValues[0].name], values: [sortedValues[0].numericValue] };

                for (let i = 1; i < sortedValues.length; i++) {
                    if (sortedValues[i].numericValue === sortedValues[i - 1].numericValue + 1) {
                        currentRun.names.push(sortedValues[i].name);
                        currentRun.values.push(sortedValues[i].numericValue);
                    }
                    else {
                        runs.push(currentRun);
                        currentRun = { names: [sortedValues[i].name], values: [sortedValues[i].numericValue] };
                    }
                }
                runs.push(currentRun);

                const nameConst = `_${enumeration.name}_name`;
                const indexVar = `_${enumeration.name}_index`;

                if (runs.length === 1) {
                    // Single contiguous run - simple case
                    const combinedNames = runs[0].names.join("");
                    writeLine(`const ${nameConst} = "${combinedNames}"`);
                    write(`var ${indexVar} = [...]uint16{0`);
                    let offset = 0;
                    for (const name of runs[0].names) {
                        offset += name.length;
                        write(`, ${offset}`);
                    }
                    writeLine(`}`);
                    writeLine("");

                    const minVal = runs[0].values[0];
                    writeLine(`func (e ${enumeration.name}) String() string {`);
                    writeLine(`\ti := int(e) - ${minVal}`);
                    // For unsigned types, i can still be negative if e < minVal (due to underflow in conversion)
                    // So we always need to check both bounds
                    writeLine(`\tif i < 0 || i >= len(${indexVar})-1 {`);
                    writeLine(`\t\treturn fmt.Sprintf("${enumeration.name}(%d)", e)`);
                    writeLine(`\t}`);
                    writeLine(`\treturn ${nameConst}[${indexVar}[i]:${indexVar}[i+1]]`);
                    writeLine(`}`);
                    writeLine("");
                }
                else if (runs.length <= 10) {
                    // Multiple runs - use switch statement
                    let allNames = "";
                    const runInfo: Array<{ startOffset: number; endOffset: number; minVal: number; maxVal: number; }> = [];

                    for (const run of runs) {
                        const startOffset = allNames.length;
                        allNames += run.names.join("");
                        const endOffset = allNames.length;
                        runInfo.push({
                            startOffset,
                            endOffset,
                            minVal: run.values[0],
                            maxVal: run.values[run.values.length - 1],
                        });
                    }

                    writeLine(`const ${nameConst} = "${allNames}"`);
                    writeLine("");

                    // Generate index variables for each run
                    for (let i = 0; i < runs.length; i++) {
                        write(`var ${indexVar}_${i} = [...]uint16{0`);
                        let offset = 0;
                        for (const name of runs[i].names) {
                            offset += name.length;
                            write(`, ${offset}`);
                        }
                        writeLine(`}`);
                    }
                    writeLine("");

                    writeLine(`func (e ${enumeration.name}) String() string {`);
                    writeLine(`\tswitch {`);

                    for (let i = 0; i < runs.length; i++) {
                        const run = runs[i];
                        const info = runInfo[i];

                        if (run.values.length === 1) {
                            writeLine(`\tcase e == ${run.values[0]}:`);
                            writeLine(`\t\treturn ${nameConst}[${info.startOffset}:${info.endOffset}]`);
                        }
                        else {
                            if (info.minVal === 0 && baseType.startsWith("uint")) {
                                writeLine(`\tcase e <= ${info.maxVal}:`);
                            }
                            else if (info.minVal === 0) {
                                writeLine(`\tcase 0 <= e && e <= ${info.maxVal}:`);
                            }
                            else {
                                writeLine(`\tcase ${info.minVal} <= e && e <= ${info.maxVal}:`);
                            }
                            writeLine(`\t\ti := int(e) - ${info.minVal}`);
                            writeLine(`\t\treturn ${nameConst}[${info.startOffset}+${indexVar}_${i}[i]:${info.startOffset}+${indexVar}_${i}[i+1]]`);
                        }
                    }

                    writeLine(`\tdefault:`);
                    writeLine(`\t\treturn fmt.Sprintf("${enumeration.name}(%d)", e)`);
                    writeLine(`\t}`);
                    writeLine(`}`);
                    writeLine("");
                }
                else {
                    // Too many runs - use a map
                    let allNames = "";
                    const valueMap: Array<{ value: number; startOffset: number; endOffset: number; }> = [];

                    for (const run of runs) {
                        for (let i = 0; i < run.names.length; i++) {
                            const startOffset = allNames.length;
                            allNames += run.names[i];
                            const endOffset = allNames.length;
                            valueMap.push({ value: run.values[i], startOffset, endOffset });
                        }
                    }

                    writeLine(`const ${nameConst} = "${allNames}"`);
                    writeLine("");
                    writeLine(`var ${enumeration.name}_map = map[${enumeration.name}]string{`);
                    for (const entry of valueMap) {
                        writeLine(`\t${entry.value}: ${nameConst}[${entry.startOffset}:${entry.endOffset}],`);
                    }
                    writeLine(`}`);
                    writeLine("");

                    writeLine(`func (e ${enumeration.name}) String() string {`);
                    writeLine(`\tif str, ok := ${enumeration.name}_map[e]; ok {`);
                    writeLine(`\t\treturn str`);
                    writeLine(`\t}`);
                    writeLine(`\treturn fmt.Sprintf("${enumeration.name}(%d)", e)`);
                    writeLine(`}`);
                    writeLine("");
                }
            }
        }

        // Generate Error() method for ErrorCode to implement the error interface
        if (enumeration.name === "ErrorCode") {
            writeLine(`func (e ${enumeration.name}) Error() string {`);
            writeLine(`\treturn e.String()`);
            writeLine(`}`);
            writeLine("");
        }
    }

    const requestsAndNotifications: (Request | Notification)[] = [...model.requests, ...model.notifications];

    // Generate unmarshalParams function
    writeLine("func unmarshalParams(method Method, data []byte) (any, error) {");
    writeLine("\tswitch method {");

    // Requests and notifications
    for (const request of requestsAndNotifications) {
        const methodName = methodNameIdentifier(request.method);

        if (!request.params) {
            writeLine(`\tcase Method${methodName}:`);
            writeLine(`\t\treturn unmarshalEmpty(data)`);
            continue;
        }
        if (Array.isArray(request.params)) {
            throw new Error("Unexpected array type for request params: " + JSON.stringify(request.params));
        }

        const resolvedType = resolveType(request.params);

        writeLine(`\tcase Method${methodName}:`);
        if (resolvedType.name === "any") {
            writeLine(`\t\treturn unmarshalAny(data)`);
        }
        else {
            writeLine(`\t\treturn unmarshalPtrTo[${resolvedType.name}](data)`);
        }
    }

    writeLine("\tdefault:");
    writeLine(`\t\treturn unmarshalAny(data)`);
    writeLine("\t}");
    writeLine("}");
    writeLine("");

    // Generate unmarshalResult function
    writeLine("func unmarshalResult(method Method, data []byte) (any, error) {");
    writeLine("\tswitch method {");

    // Only requests have results, not notifications
    for (const request of model.requests) {
        const methodName = methodNameIdentifier(request.method);

        if (!("result" in request)) {
            continue;
        }

        let responseTypeName: string;
        if (request.typeName && request.typeName.endsWith("Request")) {
            responseTypeName = request.typeName.replace(/Request$/, "Response");
        }
        else {
            responseTypeName = `${methodName}Response`;
        }

        writeLine(`\tcase Method${methodName}:`);
        writeLine(`\t\treturn unmarshalValue[${responseTypeName}](data)`);
    }

    writeLine("\tdefault:");
    writeLine(`\t\treturn unmarshalAny(data)`);
    writeLine("\t}");
    writeLine("}");
    writeLine("");

    writeLine("// Methods");
    writeLine("const (");
    for (const request of requestsAndNotifications) {
        write(formatDocumentation(request.documentation));

        const methodName = methodNameIdentifier(request.method);

        writeLine(`\tMethod${methodName} Method = "${request.method}"`);
    }
    // Emit constants for registration-only methods (not also a request/notification)
    for (const reg of registrationMethods) {
        if (reg.isRegistrationOnly) {
            writeLine(`\t// Registration-only method for ${reg.registrationMethod}.`);
            writeLine(`\tMethod${reg.fieldName} Method = "${reg.registrationMethod}"`);
        }
    }
    writeLine(")");
    writeLine("");

    // Generate request response types
    writeLine("// Request response types");
    writeLine("");

    for (const request of requestsAndNotifications) {
        const methodName = methodNameIdentifier(request.method);

        let responseTypeName: string | undefined;

        if ("result" in request) {
            if (request.typeName && request.typeName.endsWith("Request")) {
                responseTypeName = request.typeName.replace(/Request$/, "Response");
            }
            else {
                responseTypeName = `${methodName}Response`;
            }

            writeLine(`// Response type for \`${request.method}\``);

            // Special case for response types that are explicitly base type "null"
            if (request.result.kind === "base" && request.result.name === "null") {
                writeLine(`type ${responseTypeName} = Null`);
            }
            else {
                const resultType = resolveType(request.result);
                const goType = resultType.needsPointer ? `*${resultType.name}` : resultType.name;
                writeLine(`type ${responseTypeName} = ${goType}`);
            }
            writeLine("");
        }

        if (Array.isArray(request.params)) {
            throw new Error("Unexpected request params for " + methodName + ": " + JSON.stringify(request.params));
        }

        const paramType = request.params ? resolveType(request.params) : undefined;
        const paramGoType = paramType ? (paramType.needsPointer ? `*${paramType.name}` : paramType.name) : "NoParams";

        writeLine(`// Type mapping info for \`${request.method}\``);
        if (responseTypeName) {
            writeLine(`var ${methodName}Info = RequestInfo[${paramGoType}, ${responseTypeName}]{Method: Method${methodName}}`);
        }
        else {
            writeLine(`var ${methodName}Info = NotificationInfo[${paramGoType}]{Method: Method${methodName}}`);
        }

        writeLine("");
    }

    // Generate type aliases
    writeLine("// Type aliases\n");
    for (const aliasName of customTypeAliases) {
        const resolvedType = resolveType(aliasName.type);
        const goType = resolvedType.needsPointer ? `*${resolvedType.name}` : resolvedType.name;
        writeLine(`type ${aliasName.name} = ${goType}`);
        writeLine("");
    }

    // Generate union types
    writeLine("// Union types\n");

    for (const [name, members] of typeInfo.unionTypes.entries()) {
        writeLine(`type ${name} struct {`);
        const uniqueTypeFields = new Map(); // Maps type name -> field name
        const uniqueTypeToOriginal = new Map<string, Type>(); // Maps type name -> original meta model Type

        let hasLocations = false;
        for (const member of members) {
            const type = resolveType(member.type);
            const memberType = type.name;

            // If this type name already exists in our map, skip it
            if (!uniqueTypeFields.has(memberType)) {
                const fieldName = titleCase(member.name);
                uniqueTypeFields.set(memberType, fieldName);
                uniqueTypeToOriginal.set(memberType, member.type);
                writeLine(`\t${fieldName} *${memberType}`);
                if (fieldName === "Locations" && memberType === "[]Location") {
                    hasLocations = true;
                }
            }
        }

        writeLine(`}`);
        writeLine("");

        // Get the field names and types for marshal/unmarshal methods
        const fieldEntries = Array.from(uniqueTypeFields.entries()).map(([typeName, fieldName]) => ({
            fieldName,
            typeName,
            originalType: uniqueTypeToOriginal.get(typeName)!,
        }));

        // Marshal method
        writeLine(`var _ json.MarshalerTo = (*${name})(nil)`);
        writeLine("");

        writeLine(`func (o *${name}) MarshalJSONTo(enc *json.Encoder) error {`);

        // Determine if this union contained null (check if any member has containedNull = true)
        const unionContainedNull = members.some(member => member.containedNull);
        // Always assert for non-nullable unions; for nullable unions, only when there are multiple fields.
        if (!unionContainedNull || fieldEntries.length > 1) {
            const parts = fieldEntries.map(e => `boolToInt(o.${e.fieldName} != nil)`);
            const sum = parts.length > 3 ? parts.join(" +\n\t\t") : parts.join(" + ");
            if (unionContainedNull) {
                writeLine(`\tassertAtMostOne("more than one element of ${name} is set", ${sum})`);
            }
            else {
                writeLine(`\tassertOnlyOne("exactly one element of ${name} should be set", ${sum})`);
            }
            writeLine("");
        }

        for (const entry of fieldEntries) {
            writeLine(`\tif o.${entry.fieldName} != nil {`);
            writeLine(`\t\treturn json.MarshalEncode(enc, o.${entry.fieldName})`);
            writeLine(`\t}`);
        }

        // If all fields are nil, marshal as null (only for unions that can contain null)
        if (unionContainedNull) {
            writeLine(`\treturn enc.WriteToken(json.Null)`);
        }
        else {
            writeLine(`\tpanic("unreachable")`);
        }
        writeLine(`}`);
        writeLine("");

        // Unmarshal method
        writeLine(`var _ json.UnmarshalerFrom = (*${name})(nil)`);
        writeLine("");

        writeLine(`func (o *${name}) UnmarshalJSONFrom(dec *json.Decoder) error {`);
        writeLine(`\t*o = ${name}{}`);
        writeLine("");

        // Group field entries by their expected JSON token kind for optimized dispatch.
        const kindMap = new Map<string, typeof fieldEntries>();
        const unknownKindEntries: typeof fieldEntries = [];
        for (const entry of fieldEntries) {
            const kind = jsonKindForType(entry.originalType);
            if (!kind) {
                unknownKindEntries.push(entry);
            }
            else {
                if (!kindMap.has(kind)) kindMap.set(kind, []);
                kindMap.get(kind)!.push(entry);
            }
        }

        // Sort ambiguous variants (same JSON kind) by number of required fields
        // descending, so more specific variants are tried first. This prevents
        // a less specific variant from greedily matching inputs intended for
        // a more specific one.
        function countRequiredFields(entry: typeof fieldEntries[0]): number {
            if (entry.originalType.kind !== "reference") return 0;
            const structure = model.structures.find(s => s.name === (entry.originalType as ReferenceType).name);
            if (!structure) return 0;
            return structure.properties.filter(p => !p.optional && !p.omitzeroValue).length;
        }

        for (const [, entries] of kindMap) {
            if (entries.length > 1) {
                entries.sort((a, b) => countRequiredFields(b) - countRequiredFields(a));
            }
        }

        // Also sort the flat fieldEntries to match (for the fallback path)
        // We need to sort only within groups of the same kind.
        {
            const sorted: typeof fieldEntries = [];
            const seen = new Set<string>();
            for (const [, entries] of kindMap) {
                for (const entry of entries) {
                    sorted.push(entry);
                    seen.add(entry.fieldName);
                }
            }
            for (const entry of unknownKindEntries) {
                if (!seen.has(entry.fieldName)) {
                    sorted.push(entry);
                }
            }
            // Replace fieldEntries contents with sorted order
            fieldEntries.length = 0;
            fieldEntries.push(...sorted);
        }

        // Validate that ambiguous union variants (same JSON kind) don't have
        // order-dependent overlap. Two struct variants overlap if one's required
        // fields are a subset of the other's, meaning any valid input for the
        // superset also successfully parses as the subset (since unknown properties
        // are ignored). This would make the unmarshal result depend on try order.
        //
        // Exception: variants discriminated by literal field values (e.g., a "kind"
        // field with different string literal types) are safe because the literal
        // unmarshaler rejects mismatched values.
        for (const [kind, entries] of kindMap) {
            if (entries.length <= 1) continue;

            // Get required fields with their types for each variant
            const variantInfo = entries.map(entry => {
                if (entry.originalType.kind !== "reference") return null;
                const structure = model.structures.find(s => s.name === (entry.originalType as ReferenceType).name);
                if (!structure) return null;
                const requiredFields = new Map<string, Type>();
                for (const p of structure.properties) {
                    if (!p.optional && !p.omitzeroValue) {
                        requiredFields.set(p.name, p.type);
                    }
                }
                return { entry, requiredFields };
            }).filter((v): v is NonNullable<typeof v> => v !== null);

            // Check if two variants are discriminated by literal field values.
            // Returns true if they share a field where both sides have different
            // literal types (stringLiteral, integerLiteral, booleanLiteral).
            function isDiscriminatedByLiteral(
                a: Map<string, Type>,
                b: Map<string, Type>,
            ): boolean {
                for (const [fieldName, aType] of a) {
                    const bType = b.get(fieldName);
                    if (!bType) continue;
                    const aLiteral = aType.kind === "stringLiteral" || aType.kind === "integerLiteral" || aType.kind === "booleanLiteral";
                    const bLiteral = bType.kind === "stringLiteral" || bType.kind === "integerLiteral" || bType.kind === "booleanLiteral";
                    if (aLiteral && bLiteral) {
                        // Both are literals for the same field — check if values differ
                        if (aType.kind === bType.kind && (aType as any).value !== (bType as any).value) {
                            return true;
                        }
                        // Different literal kinds on same field also discriminates
                        if (aType.kind !== bType.kind) {
                            return true;
                        }
                    }
                }
                return false;
            }

            // Check each pair for subset relationships
            for (let i = 0; i < variantInfo.length; i++) {
                for (let j = 0; j < variantInfo.length; j++) {
                    if (i === j) continue;
                    const a = variantInfo[i];
                    const b = variantInfo[j];
                    const aNames = new Set(a.requiredFields.keys());
                    const bNames = new Set(b.requiredFields.keys());

                    const aSubsetOfB = [...aNames].every(f => bNames.has(f));
                    if (!aSubsetOfB) continue;

                    // Skip if discriminated by literal values
                    if (isDiscriminatedByLiteral(a.requiredFields, b.requiredFields)) continue;

                    if (aNames.size < bNames.size) {
                        // a is a strict subset of b
                        const aIdx = entries.indexOf(a.entry);
                        const bIdx = entries.indexOf(b.entry);
                        if (aIdx < bIdx) {
                            console.warn(
                                `Warning: In union ${name} (${kind} variants), ` +
                                    `${a.entry.fieldName} (required: [${[...aNames]}]) is tried before ` +
                                    `${b.entry.fieldName} (required: [${[...bNames]}]), but ` +
                                    `${a.entry.fieldName}'s required fields are a strict subset — ` +
                                    `it will greedily match inputs intended for ${b.entry.fieldName}. ` +
                                    `Reorder so the more specific variant is tried first.`,
                            );
                        }
                    }
                    else if (aNames.size === bNames.size && i < j) {
                        // Identical required fields — truly ambiguous
                        console.warn(
                            `Warning: In union ${name} (${kind} variants), ` +
                                `${a.entry.fieldName} and ${b.entry.fieldName} have identical ` +
                                `required fields [${[...aNames]}] — they are structurally ` +
                                `indistinguishable and the unmarshal result is order-dependent.`,
                        );
                    }
                }
            }
        }

        // Determine if we can use PeekKind-based dispatch:
        // - Every entry must have a known kind (no `any` etc.)
        // - There must be at least 2 distinct cases (kind groups + null) for a switch to be worthwhile
        const hasUnknownKinds = unknownKindEntries.length > 0;
        const distinctKinds = kindMap.size + (unionContainedNull ? 1 : 0);
        const canDispatch = !hasUnknownKinds && distinctKinds >= 2;

        // Check if all kind groups are unambiguous (exactly 1 entry each).
        // When unambiguous, we can UnmarshalDecode directly without buffering.
        const allUnambiguous = canDispatch && Array.from(kindMap.values()).every(entries => entries.length === 1);

        let fallbackExhaustive = false;
        const hasBooleanKind = kindMap.has("boolean");
        if (canDispatch && allUnambiguous) {
            // Best case: PeekKind + UnmarshalDecode directly, no ReadValue buffer needed.
            if (hasBooleanKind) {
                writeLine(`\tswitch kind := dec.PeekKind(); kind {`);
            }
            else {
                writeLine(`\tswitch dec.PeekKind() {`);
            }

            if (unionContainedNull) {
                writeLine(`\tcase 'n':`);
                writeLine(`\t\t_, err := dec.ReadToken()`);
                writeLine(`\t\treturn err`);
            }

            for (const [kind, entries] of kindMap) {
                writeLine(`\t${goKindCasesForJsonKind(kind)}`);
                const entry = entries[0];
                if (kind === "boolean") {
                    writeLine(`\t\to.${entry.fieldName} = new(kind == 't')`);
                    writeLine(`\t\t_, err := dec.ReadToken()`);
                    writeLine(`\t\treturn err`);
                }
                else {
                    writeLine(`\t\to.${entry.fieldName} = new(${entry.typeName})`);
                    writeLine(`\t\treturn json.UnmarshalDecode(dec, o.${entry.fieldName})`);
                }
            }

            writeLine(`\tdefault:`);
            writeLine(`\t\treturn errInvalidKind("${name}", dec.PeekKind())`);
            writeLine(`\t}`);
        }
        else if (canDispatch) {
            // Mixed case: some kind groups have multiple entries.
            // Use PeekKind to dispatch, then ReadValue + try-each within ambiguous groups,
            // or UnmarshalDecode directly for unambiguous groups.
            if (hasBooleanKind) {
                writeLine(`\tswitch kind := dec.PeekKind(); kind {`);
            }
            else {
                writeLine(`\tswitch dec.PeekKind() {`);
            }

            if (unionContainedNull) {
                writeLine(`\tcase 'n':`);
                writeLine(`\t\t_, err := dec.ReadToken()`);
                writeLine(`\t\treturn err`);
            }

            for (const [kind, entries] of kindMap) {
                writeLine(`\t${goKindCasesForJsonKind(kind)}`);
                if (entries.length === 1) {
                    // Unambiguous: decode directly
                    const entry = entries[0];
                    if (kind === "boolean") {
                        writeLine(`\t\to.${entry.fieldName} = new(kind == 't')`);
                        writeLine(`\t\t_, err := dec.ReadToken()`);
                        writeLine(`\t\treturn err`);
                    }
                    else {
                        writeLine(`\t\to.${entry.fieldName} = new(${entry.typeName})`);
                        writeLine(`\t\treturn json.UnmarshalDecode(dec, o.${entry.fieldName})`);
                    }
                }
                else {
                    // Ambiguous: buffer and dispatch
                    writeLine(`\t\tdata, err := dec.ReadValue()`);
                    writeLine(`\t\tif err != nil {`);
                    writeLine(`\t\t\treturn err`);
                    writeLine(`\t\t}`);
                    let exhaustive = false;
                    const disc = findDiscriminatorField(entries);
                    if (disc) {
                        exhaustive = generateDiscriminatorDispatch(disc, "\t\t");
                    }
                    else {
                        const pres = findPresenceDiscriminator(entries);
                        if (pres) {
                            exhaustive = generatePresenceDispatch(pres, "\t\t");
                        }
                        else {
                            for (const entry of entries) {
                                writeLine(`\t\tvar v${entry.fieldName} ${entry.typeName}`);
                                writeLine(`\t\tif err := json.Unmarshal(data, &v${entry.fieldName}); err == nil {`);
                                writeLine(`\t\t\to.${entry.fieldName} = &v${entry.fieldName}`);
                                writeLine(`\t\t\treturn nil`);
                                writeLine(`\t\t}`);
                            }
                        }
                    }
                    if (!exhaustive) {
                        writeLine(`\t\treturn errInvalidValue("${name}", data)`);
                    }
                }
            }

            writeLine(`\tdefault:`);
            writeLine(`\t\treturn errInvalidKind("${name}", dec.PeekKind())`);
            writeLine(`\t}`);
        }
        else {
            // Fallback: unknown kinds present (e.g. `any`), use ReadValue + try-each.
            writeLine("\tdata, err := dec.ReadValue()");
            writeLine("\tif err != nil {");
            writeLine("\t\treturn err");
            writeLine("\t}");

            if (unionContainedNull) {
                writeLine(`\tif string(data) == "null" {`);
                writeLine(`\t\treturn nil`);
                writeLine(`\t}`);
                writeLine("");
            }

            let exhaustive = false;
            const disc = findDiscriminatorField(fieldEntries);
            if (disc) {
                exhaustive = generateDiscriminatorDispatch(disc, "\t");
            }
            else {
                const pres = findPresenceDiscriminator(fieldEntries);
                if (pres) {
                    exhaustive = generatePresenceDispatch(pres, "\t");
                }
                else {
                    for (const entry of fieldEntries) {
                        writeLine(`\tvar v${entry.fieldName} ${entry.typeName}`);
                        writeLine(`\tif err := json.Unmarshal(data, &v${entry.fieldName}); err == nil {`);
                        writeLine(`\t\to.${entry.fieldName} = &v${entry.fieldName}`);
                        writeLine(`\t\treturn nil`);
                        writeLine(`\t}`);
                    }
                }
            }
            fallbackExhaustive = exhaustive;
        }

        if (canDispatch) {
            // Dispatch paths have an exhaustive switch with default, nothing after the switch.
        }
        else if (!fallbackExhaustive) {
            // Fallback paths: the final error references `data` which is in scope.
            writeLine(`\treturn errInvalidValue("${name}", data)`);
        }
        writeLine(`}`);
        writeLine("");

        // Generate GetLocations method
        if (hasLocations) {
            writeLine(`func (o ${name}) GetLocations() *[]Location {`);
            writeLine(`\treturn o.Locations`);
            writeLine(`}`);
            writeLine("");
        }
    }

    // Generate literal types
    writeLine("// Literal types\n");

    for (const [value, name] of typeInfo.literalTypes.entries()) {
        const jsonValue = JSON.stringify(value);

        writeLine(`// ${name} is a literal type for ${jsonValue}`);
        writeLine(`type ${name} struct{}`);
        writeLine("");

        writeLine(`var _ json.MarshalerTo = ${name}{}`);
        writeLine("");

        writeLine(`func (o ${name}) MarshalJSONTo(enc *json.Encoder) error {`);
        writeLine(`\treturn enc.WriteValue(json.Value(\`${jsonValue}\`))`);
        writeLine(`}`);
        writeLine("");

        writeLine(`var _ json.UnmarshalerFrom = &${name}{}`);
        writeLine("");

        writeLine(`func (o *${name}) UnmarshalJSONFrom(dec *json.Decoder) error {`);
        writeLine(`\tv, err := dec.ReadValue();`);
        writeLine(`\tif err != nil {`);
        writeLine(`\t\treturn err`);
        writeLine(`\t}`);
        writeLine(`\tif string(v) != \`${jsonValue}\` {`);
        writeLine(`\t\treturn errLiteralMismatch("${name}", \`${jsonValue}\`, v)`);
        writeLine(`\t}`);
        writeLine(`\treturn nil`);
        writeLine(`}`);
        writeLine("");
    }

    // Generate resolved capabilities
    const clientCapsStructure = model.structures.find(s => s.name === "ClientCapabilities");
    if (clientCapsStructure) {
        writeLine("// Helper function for dereferencing pointers with zero value fallback");
        writeLine("func derefOr[T any](v *T) T {");
        writeLine("\tif v != nil {");
        writeLine("\t\treturn *v");
        writeLine("\t}");
        writeLine("\tvar zero T");
        writeLine("\treturn zero");
        writeLine("}");
        writeLine("");

        // Collect all dependent structures and generate their resolved types
        const deps = collectStructureDependencies(clientCapsStructure);
        const uniqueDeps = Array.from(new Map(deps.map(d => [d.name, d])).values());

        for (const dep of uniqueDeps) {
            const depLines = generateResolvedTypeAndHelper(dep, false);
            for (const line of depLines) {
                writeLine(line);
            }
        }

        // Generate the main ResolvedClientCapabilities type and function
        writeLine("// ResolvedClientCapabilities is a version of ClientCapabilities where all nested");
        writeLine("// fields are values (not pointers), making it easier to access deeply nested capabilities.");
        writeLine("// Use (*ClientCapabilities).Resolve() to convert from ClientCapabilities.");
        if (clientCapsStructure.documentation) {
            writeLine("//");
            const typeDoc = formatDocumentation(clientCapsStructure.documentation);
            for (const line of typeDoc.split("\n").filter(l => l)) {
                writeLine(line);
            }
        }
        const mainLines = generateResolvedTypeAndHelper(clientCapsStructure, true);
        for (const line of mainLines) {
            writeLine(line);
        }
    }

    return parts.join("");
}

function hasSomeProp(structure: Structure, propName: string, propTypeName: string) {
    return structure.properties?.some(p =>
        !p.optional &&
        p.name === propName &&
        p.type.kind === "reference" &&
        p.type.name === propTypeName
    );
}

function hasTextDocumentURI(structure: Structure) {
    return hasSomeProp(structure, "textDocument", "TextDocumentIdentifier") ||
        hasSomeProp(structure, "_vs_textDocument", "TextDocumentIdentifier");
}

function hasTextDocumentPosition(structure: Structure) {
    return hasSomeProp(structure, "position", "Position") ||
        hasSomeProp(structure, "_vs_position", "Position");
}

function getLocationUriProperty(structure: Structure) {
    const prop = structure.properties?.find(p =>
        !p.optional &&
        titleCase(p.name).endsWith("Uri") &&
        p.type.kind === "base" &&
        p.type.name === "DocumentUri"
    );
    if (
        prop &&
        structure.properties.some(p =>
            !p.optional &&
            titleCase(p.name) === titleCase(prop.name).replace(/Uri$/, "Range") &&
            p.type.kind === "reference" &&
            p.type.name === "Range"
        )
    ) {
        return titleCase(prop.name);
    }
}

/**
 * Main function
 */
async function main() {
    collectTypeDefinitions();
    const generatedCode = generateCode();
    fs.writeFileSync(out, generatedCode);

    await $({ cwd: repoRoot })`dprint fmt ${out}`;

    console.log(`Successfully generated ${out}`);
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
