#!/usr/bin/env node

import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import which from "which";

/**
 * @import { MetaModel, OrType, Type, Request, Notification } from "./metaModelSchema.mts"
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
 */

/**
 * @typedef {Object} TypeInfo
 * @property {Map<string, GoType>} types - Map of type names to types
 * @property {Map<string, string>} literalTypes - Map from literal values to type names
 * @property {Map<string, {name: string, type: Type}[]>} unionTypes - Map of union type names to their component types
 */

/**
 * @type {TypeInfo}
 */
const typeInfo = {
    types: new Map(),
    literalTypes: new Map(),
    unionTypes: new Map(),
};

/**
 * @param {string} s
 */
function titleCase(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * @param {Type} type
 * @returns {GoType}
 */
function resolveType(type) {
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
                default:
                    throw new Error(`Unsupported base type: ${type.name}`);
            }

        case "reference":
            const typeAliasOverride = typeAliasOverrides.get(type.name);
            if (typeAliasOverride) {
                return typeAliasOverride;
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
            throw new Error("Expected exactly two items in OR type for null handling: " + JSON.stringify(types));
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
            return `${titleCase(type.element.name)}s`;
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

    const unionTypeName = memberNames.join("Or");
    const union = memberNames.map((name, i) => ({ name, type: types[i] }));

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
]);

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

        const resolvedType = resolveType(typeAlias.type);
        typeInfo.types.set(typeAlias.name, {
            name: typeAlias.name,
            needsPointer: resolvedType.needsPointer,
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

/**
 * @param {string} name
 */
function methodNameIdentifier(name) {
    return name.split("/").map(v => v === "$" ? "" : titleCase(v)).join("");
}

/**
 * Generate the Go code
 */
function generateCode() {
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
            identifier: `${enumeration.name}${value.name}`,
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
    }

    // Generate type aliases
    writeLine("// Type aliases\n");

    for (const typeAlias of model.typeAliases) {
        if (typeAliasOverrides.has(typeAlias.name)) {
            continue;
        }

        write(formatDocumentation(typeAlias.documentation));

        const resolvedType = resolveType(typeAlias.type);
        writeLine(`type ${typeAlias.name} = ${resolvedType.name}`);
        writeLine("");
    }

    /** @type {(Request | Notification)[]} */
    const requestsAndNotifications = [...model.requests, ...model.notifications];

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

    writeLine("// Methods");
    writeLine("const (");
    for (const request of requestsAndNotifications) {
        write(formatDocumentation(request.documentation));

        const methodName = methodNameIdentifier(request.method);

        writeLine(`\tMethod${methodName} Method = "${request.method}"`);
    }
    writeLine(")");
    writeLine("");

    // Generate union types
    writeLine("// Union types\n");

    for (const [name, members] of typeInfo.unionTypes.entries()) {
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
    }

    // Generate literal types
    writeLine("// Literal types\n");

    for (const [value, name] of typeInfo.literalTypes.entries()) {
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
