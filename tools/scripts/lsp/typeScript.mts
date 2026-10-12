import type {
    Enumeration,
    MetaModel,
    Property,
    Structure,
    Type,
    TypeAlias,
} from "./metaModelSchema.mts";

/** Generates only the types reachable from the selected client-to-server requests. */
export function generateTypeScript(model: MetaModel, methods: readonly string[]): string {
    const definitions = new Map<string, Structure | Enumeration | TypeAlias>([
        ...model.structures.map(value => [value.name, value] as const),
        ...model.enumerations.map(value => [value.name, value] as const),
        ...model.typeAliases.map(value => [value.name, value] as const),
    ]);
    const declarations = new Map<string, string>();
    const visited = new Set<string>();
    const baseTypes = { URI: "string", DocumentUri: "string", integer: "number", uinteger: "number", decimal: "number", RegExp: "string", string: "string", boolean: "boolean", null: "null" };

    function documentation(text: string | undefined): string {
        if (!text) return "";
        return `/**\n${text.replaceAll("*/", "* /").split("\n").map(line => ` * ${line}`).join("\n")}\n */\n`;
    }

    function properties(values: readonly Property[]): string {
        return values.map(property => {
            const optional = property.optional || property.omitzeroValue;
            return `${documentation(property.documentation)}${JSON.stringify(property.name)}${optional ? "?" : ""}: ${type(property.type)}${optional ? " | undefined" : ""};`;
        }).join("\n");
    }

    function structureProperties(structure: Structure, ancestors = new Set<string>()): Property[] {
        if (ancestors.has(structure.name)) throw new Error(`Cyclic inheritance in ${structure.name}`);
        const inherited = new Map<string, Property>();
        const nextAncestors = new Set([...ancestors, structure.name]);
        for (const parent of [...structure.extends ?? [], ...structure.mixins ?? []]) {
            if (parent.kind !== "reference") throw new Error(`Unsupported inheritance type in ${structure.name}: ${parent.kind}`);
            const definition = definitions.get(parent.name);
            if (!definition || !("properties" in definition)) throw new Error(`Unknown parent structure ${parent.name}`);
            for (const property of structureProperties(definition, nextAncestors)) inherited.set(property.name, property);
        }
        for (const property of structure.properties) inherited.set(property.name, property);
        return [...inherited.values()];
    }

    function reference(name: string): string {
        if (visited.has(name)) return name;
        visited.add(name);
        const definition = definitions.get(name);
        if (!definition) throw new Error(`Unknown LSP type ${name}`);
        let declaration: string;
        if ("properties" in definition) {
            // The metamodel omits FormattingOptions' open extension properties.
            const index = name === "FormattingOptions" ? "\n[key: string]: boolean | number | string | undefined;" : "";
            declaration = `export interface ${name} {\n${properties(structureProperties(definition))}${index}\n}`;
        }
        else if ("values" in definition) {
            const values = definition.values.map(value => JSON.stringify(value.value));
            if (definition.supportsCustomValues) values.push(baseTypes[definition.type.name]);
            declaration = `export type ${name} = ${values.join(" | ") || "never"};`;
        }
        else {
            declaration = `export type ${name} = ${type(definition.type)};`;
        }
        declarations.set(name, documentation(definition.documentation) + declaration);
        return name;
    }

    function type(value: Type, minimumPrecedence = 0): string {
        const precedence = value.kind === "or" ? 1 : value.kind === "and" ? 2 : value.kind === "array" ? 3 : 4;
        const text = typeText(value);
        return precedence < minimumPrecedence ? `(${text})` : text;
    }

    function typeText(value: Type): string {
        switch (value.kind) {
            case "base":
                if (value.name === "DocumentUri" || value.name === "URI") {
                    declarations.set(value.name, `export type ${value.name} = string;`);
                    return value.name;
                }
                return baseTypes[value.name];
            case "reference":
                return reference(value.name);
            case "array":
                return `${type(value.element, 3)}[]`;
            case "map":
                return `{ [key: ${type(value.key)}]: ${type(value.value)}; }`;
            case "and":
                return value.items.map(item => type(item, 2)).join(" & ");
            case "or":
                return [...new Set(value.items.map(item => type(item, 1)))].join(" | ");
            case "tuple":
                return `[${value.items.map(item => type(item)).join(", ")}]`;
            case "literal":
                return `{\n${properties(value.value.properties)}\n}`;
            case "stringLiteral":
            case "integerLiteral":
            case "booleanLiteral":
                return JSON.stringify(value.value);
            default: {
                const exhaustive: never = value;
                throw new Error(`Unsupported LSP type ${JSON.stringify(exhaustive)}`);
            }
        }
    }

    const requests = new Map(model.requests.map(request => [request.method, request]));
    const selected = new Set<string>();
    const entries = methods.map(method => {
        if (selected.has(method)) throw new Error(`Duplicate middleware method ${method}`);
        selected.add(method);
        const request = requests.get(method);
        if (!request || request.messageDirection !== "clientToServer") throw new Error(`Not a client-to-server request: ${method}`);
        const params = !request.params ? "undefined" : Array.isArray(request.params) ? `[${request.params.map(item => type(item)).join(", ")}]` : type(request.params);
        return `${JSON.stringify(method)}: { params: ${params}; result: ${type(request.result)}; };`;
    });
    return [
        "// Code generated by tools/scripts/lsp/generateTypeScript.mts. DO NOT EDIT.",
        "// LSP metamodel copyright (c) Microsoft Corporation. Licensed under the MIT License.",
        "",
        ...[...declarations].sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0).map(([, declaration]) => declaration + "\n"),
        "/** Language-feature requests supported by the extension middleware API. */",
        `export interface LspMiddlewareRequests {\n${entries.join("\n")}\n}`,
        "",
    ].join("\n");
}
