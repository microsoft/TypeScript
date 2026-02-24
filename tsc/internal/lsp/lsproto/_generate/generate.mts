#!/usr/bin/env node

import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import which from "which";
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
        // Longer-term, we may just want to use TextEdit.
        name: "CustomClosingTagCompletion",
        properties: [
            {
                name: "newText",
                type: { kind: "base", name: "string" },
                documentation: "The text to insert at the closing tag position.",
            },
        ],
        documentation: "CustomClosingTagCompletion is the response for the custom/textDocument/closingTagCompletion request.",
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
        method: "custom/textDocument/closingTagCompletion",
        typeName: "CustomClosingTagCompletionRequest",
        params: { kind: "reference", name: "TextDocumentPositionParams" },
        result: {
            kind: "or",
            items: [
                { kind: "reference", name: "CustomClosingTagCompletion" },
                { kind: "base", name: "null" },
            ],
        },
        messageDirection: "clientToServer",
        documentation: "Request to get the closing tag completion at a given position.",
    },
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
];

const customTypeAliases: TypeAlias[] = [
    {
        name: "TelemetryEvent",
        type: {
            kind: "or",
            items: [
                { kind: "reference", name: "RequestFailureTelemetryEvent" },
                { kind: "base", name: "null" },
            ],
        },
    },
];

// Track which custom Data structures were declared explicitly
const explicitDataStructures = new Set(customStructures.map(s => s.name));

// Global variable to track the RegisterOptions union type for special naming
let registerOptionsUnionType: OrType | undefined;

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
        }
    }

    for (const structure of model.structures) {
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

            // Replace registerOptions type with a custom RegisterOptions type
            if (prop.name === "registerOptions" && prop.type.kind === "reference" && prop.type.name === "LSPAny") {
                // Create a union type and save it for special naming
                if (registrationOptionTypes.length > 0) {
                    registerOptionsUnionType = { kind: "or", items: registrationOptionTypes };
                    prop.type = registerOptionsUnionType;
                }
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
    }

    // Remove _InitializeParams structure after flattening (it was only needed for inheritance)
    model.structures = model.structures.filter(s => s.name !== "_InitializeParams");

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

    // Special case: if this is the RegisterOptions union, use a custom name
    // and slice off the common suffix "RegistrationOptions" from member names
    if (orType === registerOptionsUnionType) {
        unionTypeName = "RegisterOptions";

        // Remove the common suffix "RegistrationOptions" from all member names
        memberNames = memberNames.map(name => {
            if (name.endsWith("RegistrationOptions")) {
                return name.slice(0, -"RegistrationOptions".length);
            }
            return name;
        });
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
        "NotebookDocumentIdentifier",
        "PreviousResultId",
        "VersionedNotebookDocumentIdentifier",
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
    return name.split("/").map(v => v === "$" ? "" : titleCase(v)).join("");
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
                    lines.push(`${indent}${titleCase(prop.name)} Resolved${type.name} \`json:"${prop.name},omitzero"\``);
                    continue;
                }
            }

            // For other types (primitives, enums, arrays, etc.), use the type directly (no pointer)
            const goType = type.name;
            lines.push(`${indent}${titleCase(prop.name)} ${goType} \`json:"${prop.name},omitzero"\``);
        }

        return lines;
    }

    function generateResolveConversion(structure: Structure, varName: string, indent: string): string[] {
        const lines: string[] = [];

        for (const prop of structure.properties) {
            const type = resolveType(prop.type);
            const fieldName = titleCase(prop.name);
            const accessPath = `${varName}.${fieldName}`;

            // For reference types that are structures, call the resolve function
            if (prop.type.kind === "reference") {
                const refStructure = model.structures.find(s => s.name === type.name);
                if (refStructure) {
                    // Use lowercase (unexported) function name for helper functions
                    lines.push(`${indent}${fieldName}: resolve${type.name}(${accessPath}),`);
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
        // Main function is exported, helpers are unexported
        const funcName = isMain ? `Resolve${structure.name}` : `resolve${structure.name}`;

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

        // Generate the conversion function
        lines.push(`func ${funcName}(v *${structure.name}) ${typeName} {`);
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

                writeLine(`\t${titleCase(prop.name)} ${goType} \`json:"${prop.name}${useOmitzero ? ",omitzero" : ""}"\``);

                if (includeDocumentation) {
                    writeLine("");
                }
            }

            writeLine("}");
            writeLine("");
        }

        generateStructFields(structure.name, true);
        writeLine("");

        if (hasTextDocumentURI(structure)) {
            // Generate TextDocumentURI method
            writeLine(`func (s *${structure.name}) TextDocumentURI() DocumentUri {`);
            writeLine(`\treturn s.TextDocument.Uri`);
            writeLine(`}`);
            writeLine("");

            if (hasTextDocumentPosition(structure)) {
                // Generate TextDocumentPosition method
                writeLine(`func (s *${structure.name}) TextDocumentPosition() Position {`);
                writeLine(`\treturn s.Position`);
                writeLine(`}`);
                writeLine("");
            }
        }

        const locationUriProperty = getLocationUriProperty(structure);
        if (locationUriProperty) {
            // Generate Location method
            writeLine(`func (s ${structure.name}) GetLocation() Location {`);
            writeLine(`\treturn Location{`);
            writeLine(`\t\tUri:   s.${locationUriProperty},`);
            writeLine(`\t\tRange: s.${locationUriProperty.replace(/Uri$/, "Range")},`);
            writeLine(`\t}`);
            writeLine(`}`);
            writeLine("");
        }

        // Generate UnmarshalJSONFrom method for structure validation
        // Skip properties marked with omitzeroValue since they're optional by nature
        const requiredProps = structure.properties?.filter(p => {
            if (p.optional) return false;
            if (p.omitzeroValue) return false;
            return true;
        }) || [];
        if (requiredProps.length > 0) {
            writeLine(`\tvar _ json.UnmarshalerFrom = (*${structure.name})(nil)`);
            writeLine("");

            writeLine(`func (s *${structure.name}) UnmarshalJSONFrom(dec *json.Decoder) error {`);
            writeLine(`\tconst (`);
            for (let i = 0; i < requiredProps.length; i++) {
                const prop = requiredProps[i];
                const iotaPrefix = i === 0 ? " uint = 1 << iota" : "";
                writeLine(`\t\tmissing${titleCase(prop.name)}${iotaPrefix}`);
            }
            writeLine(`\t\t_missingLast`);
            writeLine(`\t)`);
            writeLine(`\tmissing := _missingLast - 1`);
            writeLine("");

            writeLine(`\tif k := dec.PeekKind(); k != '{' {`);
            writeLine(`\t\treturn fmt.Errorf("expected object start, but encountered %v", k)`);
            writeLine(`\t}`);
            writeLine(`\tif _, err := dec.ReadToken(); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine("");

            writeLine(`\tfor dec.PeekKind() != '}' {`);
            writeLine("name, err := dec.ReadValue()");
            writeLine(`\t\tif err != nil {`);
            writeLine(`\t\t\treturn err`);
            writeLine(`\t\t}`);
            writeLine(`\t\tswitch string(name) {`);

            for (const prop of structure.properties) {
                writeLine(`\t\tcase \`"${prop.name}"\`:`);
                if (!prop.optional && !prop.omitzeroValue) {
                    writeLine(`\t\t\tmissing &^= missing${titleCase(prop.name)}`);
                }
                writeLine(`\t\t\tif err := json.UnmarshalDecode(dec, &s.${titleCase(prop.name)}); err != nil {`);
                writeLine(`\t\t\t\treturn err`);
                writeLine(`\t\t\t}`);
            }

            writeLine(`\t\tdefault:`);
            writeLine(`\t\t// Ignore unknown properties.`);
            writeLine(`\t\t}`);
            writeLine(`\t}`);
            writeLine("");

            writeLine(`\tif _, err := dec.ReadToken(); err != nil {`);
            writeLine(`\t\treturn err`);
            writeLine(`\t}`);
            writeLine("");

            writeLine(`\tif missing != 0 {`);
            writeLine(`\t\tvar missingProps []string`);
            for (const prop of requiredProps) {
                writeLine(`\t\tif missing&missing${titleCase(prop.name)} != 0 {`);
                writeLine(`\t\t\tmissingProps = append(missingProps, "${prop.name}")`);
                writeLine(`\t\t}`);
            }
            writeLine(`\t\treturn fmt.Errorf("missing required properties: %s", strings.Join(missingProps, ", "))`);
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
        const paramGoType = paramType ? (paramType.needsPointer ? `*${paramType.name}` : paramType.name) : "any";

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

        let hasLocations = false;
        for (const member of members) {
            const type = resolveType(member.type);
            const memberType = type.name;

            // If this type name already exists in our map, skip it
            if (!uniqueTypeFields.has(memberType)) {
                const fieldName = titleCase(member.name);
                uniqueTypeFields.set(memberType, fieldName);
                writeLine(`\t${fieldName} *${memberType}`);
                if (fieldName === "Locations" && memberType === "[]Location") {
                    hasLocations = true;
                }
            }
        }

        writeLine(`}`);
        writeLine("");

        // Get the field names and types for marshal/unmarshal methods
        const fieldEntries = Array.from(uniqueTypeFields.entries()).map(([typeName, fieldName]) => ({ fieldName, typeName }));

        // Marshal method
        writeLine(`var _ json.MarshalerTo = (*${name})(nil)`);
        writeLine("");

        writeLine(`func (o *${name}) MarshalJSONTo(enc *json.Encoder) error {`);

        // Determine if this union contained null (check if any member has containedNull = true)
        const unionContainedNull = members.some(member => member.containedNull);
        if (unionContainedNull) {
            write(`\tassertAtMostOne("more than one element of ${name} is set", `);
        }
        else {
            write(`\tassertOnlyOne("exactly one element of ${name} should be set", `);
        }

        // Create assertion to ensure at most one field is set at a time

        // Write the assertion conditions
        for (let i = 0; i < fieldEntries.length; i++) {
            if (i > 0) write(", ");
            write(`o.${fieldEntries[i].fieldName} != nil`);
        }
        writeLine(`)`);
        writeLine("");

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

        for (const entry of fieldEntries) {
            writeLine(`\tvar v${entry.fieldName} ${entry.typeName}`);
            writeLine(`\tif err := json.Unmarshal(data, &v${entry.fieldName}); err == nil {`);
            writeLine(`\t\to.${entry.fieldName} = &v${entry.fieldName}`);
            writeLine(`\t\treturn nil`);
            writeLine(`\t}`);
        }

        // Match the error format from the original script
        writeLine(`\treturn fmt.Errorf("invalid ${name}: %s", data)`);
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
        writeLine(`\t\treturn fmt.Errorf("expected ${name} value %s, got %s", \`${jsonValue}\`, v)`);
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
        writeLine("// Use ResolveClientCapabilities to convert from ClientCapabilities.");
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
    return hasSomeProp(structure, "textDocument", "TextDocumentIdentifier");
}

function hasTextDocumentPosition(structure: Structure) {
    return hasSomeProp(structure, "position", "Position");
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
function main() {
    try {
        collectTypeDefinitions();
        const generatedCode = generateCode();
        fs.writeFileSync(out, generatedCode);

        // Format with gofmt
        const gofmt = which.sync("go");
        cp.execFileSync(gofmt, ["tool", "mvdan.cc/gofumpt", "-lang=go1.26", "-w", out]);

        console.log(`Successfully generated ${out}`);
    }
    catch (error) {
        console.error("Error generating code:", error);
        process.exit(1);
    }
}

main();
