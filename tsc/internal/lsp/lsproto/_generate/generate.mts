#!/usr/bin/env node

import cp from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import which from "which";
import type {
    MetaModel,
    Notification,
    OrType,
    Property,
    Request,
    Structure,
    Type,
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

// Preprocess the model to inline extends/mixins contents
function preprocessModel() {
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
    }
}

// Preprocess the model before proceeding
preprocessModel();

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
            return `${titleCase(type.element.name)}s`;
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

    // File header
    writeLine("// Code generated by generate.mts; DO NOT EDIT.");
    writeLine("");
    writeLine("package lsproto");
    writeLine("");
    writeLine(`import (`);
    writeLine(`\t"fmt"`);
    writeLine("");
    writeLine(`\t"github.com/go-json-experiment/json"`);
    writeLine(`\t"github.com/go-json-experiment/json/jsontext"`);
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
                const goType = prop.optional || type.needsPointer ? `*${type.name}` : type.name;

                writeLine(`\t${titleCase(prop.name)} ${goType} \`json:"${prop.name}${prop.optional ? ",omitzero" : ""}"\``);

                if (includeDocumentation) {
                    writeLine("");
                }
            }

            writeLine("}");
            writeLine("");
        }

        generateStructFields(structure.name, true);
        writeLine("");

        // Generate UnmarshalJSONFrom method for structure validation
        const requiredProps = structure.properties?.filter(p => !p.optional) || [];
        if (requiredProps.length > 0) {
            writeLine(`\tvar _ json.UnmarshalerFrom = (*${structure.name})(nil)`);
            writeLine("");

            writeLine(`func (s *${structure.name}) UnmarshalJSONFrom(dec *jsontext.Decoder) error {`);
            writeLine(`\tvar (`);
            for (const prop of requiredProps) {
                writeLine(`\t\tseen${titleCase(prop.name)} bool`);
            }
            writeLine(`\t)`);
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
                if (!prop.optional) {
                    writeLine(`\t\t\tseen${titleCase(prop.name)} = true`);
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

            for (const prop of requiredProps) {
                writeLine(`\tif !seen${titleCase(prop.name)} {`);
                writeLine(`\t\treturn fmt.Errorf("required property '${prop.name}' is missing")`);
                writeLine(`\t}`);
            }

            writeLine("");
            writeLine(`\treturn nil`);
            writeLine(`}`);
            writeLine("");
        }
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
        writeLine(`var _ json.MarshalerTo = (*${name})(nil)`);
        writeLine("");

        writeLine(`func (o *${name}) MarshalJSONTo(enc *jsontext.Encoder) error {`);

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
            writeLine(`\treturn enc.WriteToken(jsontext.Null)`);
        }
        else {
            writeLine(`\tpanic("unreachable")`);
        }
        writeLine(`}`);
        writeLine("");

        // Unmarshal method
        writeLine(`var _ json.UnmarshalerFrom = (*${name})(nil)`);
        writeLine("");

        writeLine(`func (o *${name}) UnmarshalJSONFrom(dec *jsontext.Decoder) error {`);
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

        writeLine(`func (o ${name}) MarshalJSONTo(enc *jsontext.Encoder) error {`);
        writeLine(`\treturn enc.WriteValue(jsontext.Value(\`${jsonValue}\`))`);
        writeLine(`}`);
        writeLine("");

        writeLine(`var _ json.UnmarshalerFrom = &${name}{}`);
        writeLine("");

        writeLine(`func (o *${name}) UnmarshalJSONFrom(dec *jsontext.Decoder) error {`);
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
        const gofmt = which.sync("go");
        cp.execFileSync(gofmt, ["tool", "mvdan.cc/gofumpt", "-lang=go1.24", "-w", out]);

        console.log(`Successfully generated ${out}`);
    }
    catch (error) {
        console.error("Error generating code:", error);
        process.exit(1);
    }
}

main();
