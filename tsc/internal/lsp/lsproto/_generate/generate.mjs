#!/usr/bin/env node

import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import which from "which";

/**
 * @import { MetaModel, OrType, Type, BaseTypes } from "./metaModelSchema.mts"
 */
void 0;

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const out = path.resolve(__dirname, "../lsp_generated.go");
const metaModelPath = path.resolve(__dirname, "metaModel.json");

if (!fs.existsSync(metaModelPath)) {
    console.error("Meta model file not found; did you forget to run fetchModel.mjs?");
    process.exit(1);
}

/** @type {MetaModel} */
const model = JSON.parse(fs.readFileSync(metaModelPath, "utf-8"));

/**
 * Represents a type in our intermediate type system
 * @typedef {Object} GoType
 * @property {string} name - Name of the type in Go
 * @property {boolean} needsPointer - Whether this type should be used with a pointer
 * @property {boolean} [isAlias] - Whether this type is an alias to another type
 * @property {string} [aliasFor] - If this is an alias, the name of the target type
 * @property {string} [importPath] - Import path if needed
 * @property {string} [jsonUnmarshaling] - Custom JSON unmarshaling code if required
 */

/**
 * @typedef {Object} TypeInfo
 * @property {Map<string, GoType>} types - Map of type names to types
 * @property {Map<string, string>} literalTypes - Map from literal values to type names
 * @property {Map<string, {name: string, type: Type}[]>} unionTypes - Map of union type names to their component types
 * @property {Set<string>} generatedTypes - Set of types that have been generated
 * @property {Map<string, {value: string; identifier: string, documentation: string | undefined, deprecated: string| undefined}[]>} enumValuesByType - Map of enum type names to their values
 * @property {Map<string, string>} unionTypeAliases - Map from union type name to alias name
 */

/**
 * @type {TypeInfo}
 */
const typeInfo = {
    types: new Map(),
    literalTypes: new Map(),
    unionTypes: new Map(),
    generatedTypes: new Set(),
    enumValuesByType: new Map(),
    unionTypeAliases: new Map(), // Map from union type name to alias name
};

/**
 * @param {string} s
 */
function titleCase(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * @param {BaseTypes} baseType
 * @returns {GoType}
 */
function mapBaseTypeToGo(baseType) {
    switch (baseType) {
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
        case "RegExp":
            return { name: "string", needsPointer: false }; // Using string for RegExp
        default:
            throw new Error(`Unsupported base type: ${baseType}`);
    }
}

/**
 * @param {Type} type
 * @returns {GoType}
 */
function resolveType(type) {
    // Special case for the LSP "any" type structure, which would normally become a complex union
    if (
        type.kind === "or" && type.items.length >= 6 &&
        type.items.some(item => item.kind === "reference" && item.name === "LSPObject") &&
        type.items.some(item => item.kind === "reference" && item.name === "LSPArray") &&
        type.items.some(item => item.kind === "base" && item.name === "string") &&
        type.items.some(item => item.kind === "base" && item.name === "integer") &&
        type.items.some(item => item.kind === "base" && item.name === "boolean")
    ) {
        return { name: "LSPAny", needsPointer: false };
    }

    switch (type.kind) {
        case "base":
            return mapBaseTypeToGo(type.name);

        case "reference":
            // If it's a reference, we need to check if we know this type
            if (typeInfo.types.has(type.name)) {
                const refType = typeInfo.types.get(type.name);
                if (refType !== undefined) {
                    // Important: If this is an alias type, preserve the alias name rather than resolving it
                    if (refType.isAlias) {
                        return {
                            name: type.name, // Use the alias name (reference name)
                            needsPointer: refType.needsPointer,
                        };
                    }
                    return refType;
                }
            }

            // By default, assume referenced types are structs that need pointers
            // This will be updated as we process all types
            const refType = { name: type.name, needsPointer: true };
            typeInfo.types.set(type.name, refType);
            return refType;

        case "array": {
            const elementType = resolveType(type.element);
            // Arrays of structs should be arrays of pointers to structs
            const arrayTypeName = elementType.needsPointer
                ? `[]*${elementType.name}`
                : `[]${elementType.name}`;
            return {
                name: arrayTypeName,
                needsPointer: false,
            };
        }

        case "map": {
            const keyType = type.key.kind === "base"
                ? mapBaseTypeToGo(type.key.name).name
                : resolveType(type.key).name;

            const valueType = resolveType(type.value);
            const valueTypeName = valueType.needsPointer ? `*${valueType.name}` : valueType.name;

            return {
                name: `map[${keyType}]${valueTypeName}`,
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
            const typeName = `StringLiteral${titleCase(type.value)}`;
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

/**
 * @param {OrType} orType
 * @returns {GoType}
 */
function handleOrType(orType) {
    const types = orType.items;

    // Check for nullable types (OR with null)
    const nullIndex = types.findIndex(item => item.kind === "base" && item.name === "null");

    // If it's nullable and only has one other type
    if (nullIndex !== -1) {
        if (types.length !== 2) {
            throw new Error("Expected exactly two items in OR type for null handling");
        }

        const otherType = types[1 - nullIndex];
        const resolvedType = resolveType(otherType);

        // Use Nullable[T] instead of pointer for null union with one other type
        return {
            name: `Nullable[${resolvedType.name}]`,
            needsPointer: false,
        };
    }

    // If only one type remains after filtering null
    if (types.length === 1) {
        return resolveType(types[0]);
    }

    const memberNames = types.map(type => {
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
            return `${
                titleCase(
                    type.element.kind === "reference"
                        ? type.element.name
                        : type.element.name,
                )
            }s`;
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

    const unionTypeName = memberNames.map(titleCase).join("Or");
    const union = memberNames.map((name, i) => ({ name, type: types[i] }));

    typeInfo.unionTypes.set(unionTypeName, union);

    return {
        name: unionTypeName,
        needsPointer: false,
    };
}

/**
 * First pass: Resolve all type information
 */
function collectTypeDefinitions() {
    // Register built-in types
    typeInfo.types.set("LSPAny", { name: "any", needsPointer: false });

    // Keep track of used enum identifiers across all enums to avoid conflicts
    const usedEnumIdentifiers = new Set();

    // Process all enumerations first to make them available for struct fields
    for (const enumeration of model.enumerations) {
        typeInfo.types.set(enumeration.name, {
            name: enumeration.name,
            needsPointer: false,
        });

        const enumValues = [];

        // Process values for this enum
        for (const value of enumeration.values) {
            // Generate a unique identifier for this enum constant
            let identifier = `${enumeration.name}${value.name}`;

            // If this identifier is already used, create a more unique one
            if (usedEnumIdentifiers.has(identifier)) {
                // Try with underscores
                identifier = `${enumeration.name}_${value.name}`;

                // If still not unique, add a numeric suffix
                let counter = 1;
                while (usedEnumIdentifiers.has(identifier)) {
                    identifier = `${enumeration.name}_${value.name}_${counter++}`;
                }
            }

            // Mark this identifier as used
            usedEnumIdentifiers.add(identifier);
            enumValues.push({
                value: String(value.value),
                identifier,
                documentation: value.documentation,
                deprecated: value.deprecated,
            });
        }

        // Store the map of values for this enum
        typeInfo.enumValuesByType.set(enumeration.name, enumValues);
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
    ]);

    // Process all structures
    for (const structure of model.structures) {
        typeInfo.types.set(structure.name, {
            name: structure.name,
            needsPointer: !valueTypes.has(structure.name),
        });
    }

    // First pass - process all type aliases to capture union types
    for (const typeAlias of model.typeAliases) {
        if (typeAlias.type.kind === "or") {
            // This is a union type - resolve it but don't yet store the alias
            const resolvedType = resolveType(typeAlias.type);
            typeInfo.unionTypeAliases.set(resolvedType.name, typeAlias.name);
        }
    }

    // Process all type aliases now (including non-union ones)
    for (const typeAlias of model.typeAliases) {
        const resolvedType = resolveType(typeAlias.type);

        // Store the type with the alias name, but mark it as an alias
        // This is critical for resolving references to this type
        typeInfo.types.set(typeAlias.name, {
            name: typeAlias.name, // Use the alias name, not the resolved type name
            needsPointer: resolvedType.needsPointer,
            isAlias: true,
            aliasFor: resolvedType.name,
        });
    }
}

/**
 * @param {string | undefined} s
 * @returns {string}
 */
function formatDocumentation(s) {
    if (!s) return "";

    /** @type {string[]} */
    let lines = [];

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

/** @type {string[]} */
const parts = [];

/**
 * @param {string} s
 */
function write(s) {
    parts.push(s);
}

/**
 * @param {string} s
 */
function writeLine(s = "") {
    parts.push(s + "\n");
}

/**
 * Generate the Go code
 */
function generateCode() {
    // File header
    writeLine("// Code generated by generate.mjs; DO NOT EDIT.");
    writeLine("");
    writeLine("package lsproto");
    writeLine("");
    writeLine(`import (`);
    writeLine(`\t"encoding/json"`);
    writeLine(`\t"fmt"`);
    writeLine(`)`);
    writeLine("");
    writeLine("// Meta model version " + model.metaData.version);
    writeLine("");

    // Generate structures
    writeLine("// Structures\n");

    // Keep track of generated types to avoid duplicates
    const generatedTypes = new Set();

    for (const structure of model.structures) {
        write(formatDocumentation(structure.documentation));

        writeLine(`type ${structure.name} struct {`); // Embed extended types and mixins
        for (const e of structure.extends || []) {
            if (e.kind !== "reference") {
                throw new Error(`Unexpected extends kind: ${e.kind}`);
            }
            writeLine(`\t${e.name}`);
        }

        for (const m of structure.mixins || []) {
            if (m.kind !== "reference") {
                throw new Error(`Unexpected mixin kind: ${m.kind}`);
            }
            writeLine(`\t${m.name}`);
        }

        // Insert a blank line after embeds if there were any
        if (
            (structure.extends && structure.extends.length > 0) ||
            (structure.mixins && structure.mixins.length > 0)
        ) {
            writeLine("");
        }

        // Then properties
        for (const prop of structure.properties) {
            write(formatDocumentation(prop.documentation));

            const type = resolveType(prop.type);
            const goType = prop.optional || type.needsPointer ? `*${type.name}` : type.name;

            writeLine(`\t${titleCase(prop.name)} ${goType} \`json:"${prop.name}${prop.optional ? ",omitempty" : ""}"\``);
            writeLine("");
        }

        writeLine("}");
        writeLine("");

        generatedTypes.add(structure.name);
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
                baseType = "string";
        }

        writeLine(`type ${enumeration.name} ${baseType}`);
        writeLine("");

        // Get the pre-processed enum entries map that avoids duplicates
        const enumValues = typeInfo.enumValuesByType.get(enumeration.name);
        if (!enumValues || !enumValues.length) {
            continue; // Skip if no entries (shouldn't happen)
        }

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

        // Add custom JSON unmarshaling
        writeLine(`func (e *${enumeration.name}) UnmarshalJSON(data []byte) error {`);
        writeLine(`\tvar v ${baseType}`);
        writeLine(`\tif err := json.Unmarshal(data, &v); err != nil {`);
        writeLine(`\t\treturn err`);
        writeLine(`\t}`);
        writeLine(`\t*e = ${enumeration.name}(v)`);
        writeLine(`\treturn nil`);
        writeLine(`}`);
        writeLine("");

        generatedTypes.add(enumeration.name);
    }

    // Generate type aliases
    writeLine("// Type aliases\n");

    for (const typeAlias of model.typeAliases) {
        write(formatDocumentation(typeAlias.documentation));

        if (typeAlias.name === "LSPAny") {
            writeLine("type LSPAny any");
            writeLine("");
            continue;
        }

        const resolvedType = resolveType(typeAlias.type);
        writeLine(`type ${typeAlias.name} = ${resolvedType.name}`);
        writeLine("");

        typeInfo.generatedTypes.add(typeAlias.name);
    }

    // Generate unmarshallers
    writeLine("// Unmarshallers\n");

    // Note: The unmarshallerFor function already exists in lsp.go, so we don't generate it

    // The unmarshallers map is expected by jsonrpc.go
    writeLine("var unmarshallers = map[Method]func([]byte) (any, error){");

    // Client-to-server requests
    for (const request of model.requests) {
        if (request.messageDirection === "serverToClient") {
            continue;
        }

        const methodName = request.method.split("/")
            .map(v => v === "$" ? "" : titleCase(v))
            .join("");

        if (!request.params) {
            // For requests without params (like shutdown), use any type
            writeLine(`\tMethod${methodName}: unmarshallerFor[any],`);
            continue;
        }
        let typeName;
        if (Array.isArray(request.params)) {
            // This shouldn't typically happen in the LSP spec
            typeName = "any";
        }
        else if (request.params.kind === "reference") {
            typeName = request.params.name;
        }
        else {
            const resolvedType = resolveType(request.params);
            typeName = resolvedType.name;
        }

        writeLine(`\tMethod${methodName}: unmarshallerFor[${typeName}],`);
    }

    // Client-to-server notifications
    for (const notification of model.notifications) {
        if (notification.messageDirection === "serverToClient") {
            continue;
        }

        const methodName = notification.method.split("/")
            .map(v => v === "$" ? "" : titleCase(v))
            .join("");

        if (!notification.params) {
            // For notifications without params (like exit), use any type
            writeLine(`\tMethod${methodName}: unmarshallerFor[any],`);
            continue;
        }
        let typeName;
        if (Array.isArray(notification.params)) {
            // This shouldn't typically happen in the LSP spec
            typeName = "any";
        }
        else if (notification.params.kind === "reference") {
            typeName = notification.params.name;
        }
        else {
            const resolvedType = resolveType(notification.params);
            typeName = resolvedType.name;
        }

        writeLine(`\tMethod${methodName}: unmarshallerFor[${typeName}],`);
    }

    writeLine("}");
    writeLine("");

    // Method type exists in lsp.go, so skip declaring it
    writeLine("// Requests");
    writeLine("const (");
    for (const request of model.requests) {
        write(formatDocumentation(request.documentation));

        const methodName = request.method.split("/")
            .map(v => v === "$" ? "" : titleCase(v))
            .join("");

        writeLine(`\tMethod${methodName} Method = "${request.method}"`);
    }
    writeLine(")");
    writeLine("");

    writeLine("// Notifications");
    writeLine("const (");
    for (const notification of model.notifications) {
        write(formatDocumentation(notification.documentation));

        const methodName = notification.method.split("/")
            .map(v => v === "$" ? "" : titleCase(v))
            .join("");

        writeLine(`\tMethod${methodName} Method = "${notification.method}"`);
    }
    writeLine(")");
    writeLine("");

    // Generate union types
    writeLine("// Union types\n");

    for (const [name, members] of typeInfo.unionTypes.entries()) {
        // Skip if already generated
        if (typeInfo.generatedTypes.has(name)) {
            continue;
        }

        writeLine(`type ${name} struct {`);
        const uniqueTypeFields = new Map(); // Maps type name -> field name

        for (const member of members) {
            const type = resolveType(member.type);
            const memberType = type.name;

            // If this type name already exists in our map, skip it
            if (!uniqueTypeFields.has(memberType)) {
                const fieldName = titleCase(member.name);
                uniqueTypeFields.set(memberType, fieldName);
                writeLine(`\t${fieldName} *${memberType}`);
            }
        }

        writeLine(`}`);
        writeLine("");

        // Get the field names and types for marshal/unmarshal methods
        const fieldEntries = Array.from(uniqueTypeFields.entries()).map(([typeName, fieldName]) => ({ fieldName, typeName }));

        // Marshal method
        writeLine(`func (o ${name}) MarshalJSON() ([]byte, error) {`);

        // Create assertion to ensure only one field is set at a time
        write(`\tassertOnlyOne("more than one element of ${name} is set", `);

        // Write the assertion conditions
        for (let i = 0; i < fieldEntries.length; i++) {
            if (i > 0) write(", ");
            write(`o.${fieldEntries[i].fieldName} != nil`);
        }
        writeLine(`)`);
        writeLine("");
        for (const entry of fieldEntries) {
            writeLine(`\tif o.${entry.fieldName} != nil {`);
            writeLine(`\t\treturn json.Marshal(*o.${entry.fieldName})`);
            writeLine(`\t}`);
        }

        writeLine(`\tpanic("unreachable")`);
        writeLine(`}`);
        writeLine("");

        // Unmarshal method
        writeLine(`func (o *${name}) UnmarshalJSON(data []byte) error {`);
        writeLine(`\t*o = ${name}{}`);

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

        typeInfo.generatedTypes.add(name);
    }

    // Generate literal types
    writeLine("// Literal types\n");

    for (const [value, name] of typeInfo.literalTypes.entries()) {
        // Skip if already generated
        if (generatedTypes.has(name)) {
            continue;
        }

        const jsonValue = JSON.stringify(value);

        writeLine(`// ${name} is a literal type for ${jsonValue}`);
        writeLine(`type ${name} struct{}`);
        writeLine("");

        writeLine(`func (o ${name}) MarshalJSON() ([]byte, error) {`);
        writeLine(`\treturn []byte(\`${jsonValue}\`), nil`);
        writeLine(`}`);
        writeLine("");

        writeLine(`func (o *${name}) UnmarshalJSON(data []byte) error {`);
        writeLine(`\tif string(data) != \`${jsonValue}\` {`);
        writeLine(`\t\treturn fmt.Errorf("invalid ${name}: %s", data)`);
        writeLine(`\t}`);
        writeLine(`\treturn nil`);
        writeLine(`}`);
        writeLine("");

        generatedTypes.add(name);
    }

    return parts.join("");
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
        const gofmt = which.sync("gofmt");
        cp.execFileSync(gofmt, ["-w", out]);

        console.log(`Successfully generated ${out}`);
    }
    catch (error) {
        console.error("Error generating code:", error);
        process.exit(1);
    }
}

main();
