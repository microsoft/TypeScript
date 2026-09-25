import assert from "node:assert/strict";
import {
    type Declaration,
    type GoValue,
    optionKind,
} from "./options-model.ts";
import { options } from "./options.ts";

export interface JSONSchema {
    $schema?: string;
    $comment?: string;
    $ref?: string;
    title?: string;
    description?: string;
    markdownDescription?: string;
    type?: string | string[];
    properties?: Record<string, JSONSchema>;
    definitions?: Record<string, JSONSchema>;
    additionalProperties?: boolean | JSONSchema;
    required?: string[];
    items?: JSONSchema;
    anyOf?: JSONSchema[];
    allOf?: JSONSchema[];
    enum?: string[];
    enumDescriptions?: string[];
    pattern?: string;
    default?: string | boolean | number;
    minimum?: number;
    minLength?: number;
    deprecated?: boolean;
    deprecationMessage?: string;
    allowComments?: boolean;
    allowTrailingCommas?: boolean;
}

function nullable(schema: JSONSchema): JSONSchema {
    return { anyOf: [schema, { type: "null" }] };
}

function enumSchema(name: string): JSONSchema {
    const map = options.enumMaps[name];
    assert(map, `Missing enum map: ${name}`);
    const keys = map.values.map(entry => entry.name);
    const pattern = keys.map(key => [...key].map(char => /[a-z]/.test(char) ? `[${char.toUpperCase()}${char}]` : char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("")).join("|");
    const suggestions: JSONSchema = { enum: keys };
    if (map.deprecatedKeys?.length) {
        suggestions.enumDescriptions = keys.map(key => map.deprecatedKeys!.includes(key) ? "Deprecated." : "");
    }
    // Keep enum completions while accepting every casing supported by the parser.
    return { type: "string", anyOf: [suggestions, { pattern: `^(${pattern})$` }] };
}

function defaultValue(value: GoValue | undefined, name: string): string | number | boolean | undefined {
    // Help text may wrap a literal string default in a Markdown code span.
    if (typeof value === "string") return value.replace(/^`([^`]*)`$/, "$1");
    if (value === undefined || typeof value !== "object") return value;
    if ("text" in value || value.go === "core.TSUnknown") return undefined;
    let constant = value.go;
    if (constant === "core.ScriptTargetLatestStandard") {
        const target = options.enums.find(enumDef => enumDef.name === "ScriptTarget")?.members.find(member => member.name === "LatestStandard");
        assert(target, "Missing ScriptTargetLatestStandard");
        constant = `core.ScriptTarget${target.value}`;
    }
    const entry = options.enumMaps[name]?.values.find(entry => typeof entry.value === "object" && entry.value.go === constant);
    assert(entry, `No schema default for ${name}: ${constant}`);
    return entry.name;
}

function valueSchema(declaration: Declaration): JSONSchema {
    switch (declaration.kind) {
        case "Boolean":
            return { type: "boolean" };
        case "String":
            return { type: "string" };
        case "Number":
            return { type: "number", ...(declaration.minValue !== undefined ? { minimum: declaration.minValue } : {}) };
        case "Enum":
            return enumSchema(declaration.name);
        case "List":
        case "ListOrElement": {
            const element = options.elements[declaration.name];
            assert(element, `Missing list element: ${declaration.name}`);
            const items = valueSchema(element);
            const array: JSONSchema = { type: "array", items };
            return declaration.kind === "List" ? array : { anyOf: [items, array] };
        }
        case "Object":
            if (declaration.name === "paths") {
                return { type: "object", additionalProperties: { type: "array", items: { type: "string" } } };
            }
            if (declaration.name === "plugin") {
                return { type: "object", properties: { name: { type: "string" } } };
            }
            if (declaration.name === "references") {
                return {
                    type: "object",
                    properties: { path: { type: "string", minLength: 1 }, circular: { type: "boolean" } },
                    required: ["path"],
                };
            }
            if (declaration.name === "contentMappers") {
                return {
                    type: "object",
                    properties: {
                        package: { type: "string", minLength: 1 },
                        extensions: { type: "array", items: { type: "string" } },
                        options: { type: "object" },
                    },
                    required: ["package", "extensions"],
                    additionalProperties: false,
                };
            }
            throw new Error(`Missing object schema: ${declaration.name}`);
    }
}

function withDescription(schema: JSONSchema, description: string | undefined, anchor: string | false): JSONSchema {
    if (description !== undefined) {
        schema.description = description;
        schema.markdownDescription = anchor === false
            ? description
            : `${description}\n\nSee the [TSConfig reference](https://www.typescriptlang.org/tsconfig/${anchor ? `#${anchor}` : ""}).`;
    }
    return schema;
}

function optionSchema(declaration: Declaration): JSONSchema {
    const schema = nullable(valueSchema(declaration));
    if (declaration.schemaDescription !== undefined) schema.description = declaration.schemaDescription;
    else if (declaration.description) schema.description = declaration.description.text;
    const value = defaultValue(declaration.defaultValueDescription, declaration.name);
    if (value !== undefined) schema.default = value;
    const defaultDescription = declaration.defaultValueDescription;
    if (typeof defaultDescription === "object" && "text" in defaultDescription) {
        schema.description = [schema.description, `Default: ${defaultDescription.text}`].filter(Boolean).join("\n\n");
    }
    return withDescription(schema, schema.description, declaration.documentationAnchor ?? declaration.name);
}

function optionObject(properties: Record<string, JSONSchema>) {
    return { type: ["object", "null"], properties, additionalProperties: true };
}

export function generateConfigSchema(kind: "tsconfig" | "jsconfig") {
    const compilerProperties: Record<string, JSONSchema> = {};
    for (const option of options.compilerOptions) {
        const declaration = option.declarations?.[0];
        if (!declaration || declaration.isCommandLineOnly || declaration.category?.go === "diagnostics.Command_line_Options") continue;
        const schema = optionSchema({
            name: option.name,
            kind: optionKind(option),
            ...declaration,
            ...(kind === "jsconfig" && option.jsconfigDefault !== undefined ? { defaultValueDescription: option.jsconfigDefault } : {}),
        });
        if (option.deprecated) {
            schema.deprecated = true;
            schema.deprecationMessage = "This compiler option is deprecated.";
        }
        compilerProperties[option.name] = schema;
    }
    const watchProperties = Object.fromEntries(options.watchOptions.map(option => [option.name, optionSchema(option)]));
    const acquisitionProperties = Object.fromEntries(options.typeAcquisition.map(option => [
        option.name,
        optionSchema({
            documentationAnchor: "typeAcquisition",
            ...option,
            ...(kind === "jsconfig" && option.jsconfigDefault !== undefined ? { defaultValueDescription: option.jsconfigDefault } : {}),
        }),
    ]));
    const descriptions: Record<string, string> = {
        compilerOptions: "Options for the TypeScript compiler.",
        typeAcquisition: "Options for automatic type acquisition in JavaScript projects.",
        extends: "Configuration file or files to inherit from. Later entries take precedence. Relative paths are resolved relative to the configuration file in which they occur.",
        files: "Files to include in the project, in addition to files matched by include.",
        include: "File names or glob patterns to include. Defaults to all supported files when neither files nor include is specified.",
        exclude: "File names or glob patterns excluded from include. Does not exclude files brought in by imports, references, types, or files.",
        references: "Referenced projects. Each path identifies a configuration file or a directory containing one.",
        compileOnSave: "Compile this project when a file is saved in a supporting editor.",
        contentMappers: "External content mapper packages and the file extensions they handle. Execution must be enabled separately with --runExternalCode.",
    };
    const properties: Record<string, JSONSchema> = {
        $schema: { type: "string", description: "The JSON schema used to validate this configuration." },
        watchOptions: withDescription({ allOf: [{ $ref: "#/definitions/watchOptions" }] }, "Options for watching files and directories.", "watchOptions"),
    };
    for (const option of options.rootOptions) {
        const schema = option.elementOptions && option.elementOptions !== "extends"
            ? { allOf: [{ $ref: `#/definitions/${option.elementOptions}` }] }
            : option.name === "extends" ? valueSchema(option) : optionSchema(option);
        properties[option.name] = withDescription(schema, option.schemaDescription ?? descriptions[option.name], option.documentationAnchor ?? option.name);
    }
    return {
        $schema: "http://json-schema.org/draft-07/schema#",
        $comment: "Generated by tools/scripts/tsc/generate-options.ts. DO NOT EDIT.",
        title: kind === "tsconfig" ? "TypeScript configuration" : "JavaScript configuration",
        type: "object",
        allowComments: true,
        allowTrailingCommas: true,
        properties,
        // Root properties are extensible so tools can use their own config sections.
        additionalProperties: true,
        definitions: {
            compilerOptions: optionObject(compilerProperties),
            watchOptions: optionObject(watchProperties),
            typeAcquisition: optionObject(acquisitionProperties),
        },
    };
}
