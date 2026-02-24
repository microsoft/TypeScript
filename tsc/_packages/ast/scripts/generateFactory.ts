#!/usr/bin/env node

/**
 * Code generator for the monomorphic NodeObject class and factory functions.
 *
 * Usage:
 *   node _packages/ast/scripts/generateFactory.ts
 *
 * Reads:  _packages/ast/src/nodes.ts
 * Writes: _packages/ast/src/factory.ts
 */

import { SyntaxKind } from "#enums/syntaxKind";
import { execaSync } from "execa";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { childProperties } from "../../api/src/node/protocol.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodesPath = path.resolve(__dirname, "../src/nodes.ts");
const outputPath = path.resolve(__dirname, "../src/factory.ts");

const errors: string[] = [];

function reportError(msg: string): void {
    errors.push(msg);
}

function fail(msg: string): never {
    throw new Error(msg);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PropertyInfo {
    name: string;
    typeNode: ts.TypeNode;
    substitutions?: Map<string, string>;
    optional: boolean;
}

interface ExtendsInfo {
    name: string;
    typeArguments: string[];
}

interface InterfaceInfo {
    name: string;
    syntaxKind: string;
    properties: PropertyInfo[];
    extends: ExtendsInfo[];
    typeParameters: string[];
}

interface FactoryDef {
    interfaceName: string;
    syntaxKind: string;
    factoryName: string;
    params: PropertyInfo[];
    hasProtocolOrder: boolean;
}

function countChildParams(params: PropertyInfo[]): number {
    return params.filter(p => classifyProperty(p) !== "data").length;
}

// ---------------------------------------------------------------------------
// Step 1: Parse nodes.ts and build interface map
// ---------------------------------------------------------------------------

const nodesSource = fs.readFileSync(nodesPath, "utf-8");
const sourceFile = ts.createSourceFile("nodes.ts", nodesSource, ts.ScriptTarget.Latest, true);

const interfaces = new Map<string, InterfaceInfo>();

for (const stmt of sourceFile.statements) {
    if (!ts.isInterfaceDeclaration(stmt)) continue;

    const name = stmt.name.text;
    let syntaxKind = "";
    const properties: PropertyInfo[] = [];
    const extendsInfos: ExtendsInfo[] = [];
    const typeParameters: string[] = [];

    if (stmt.typeParameters) {
        for (const tp of stmt.typeParameters) {
            typeParameters.push(tp.name.text);
        }
    }

    if (stmt.heritageClauses) {
        for (const clause of stmt.heritageClauses) {
            if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                for (const type of clause.types) {
                    if (!ts.isIdentifier(type.expression)) {
                        fail(`${name}: extends clause has non-identifier expression: ${type.expression.getText(sourceFile)}`);
                    }
                    const typeArgs = type.typeArguments
                        ? type.typeArguments.map(a => a.getText(sourceFile))
                        : [];
                    extendsInfos.push({ name: type.expression.text, typeArguments: typeArgs });
                }
            }
        }
    }

    for (const member of stmt.members) {
        // Skip index signatures, method signatures, call signatures, etc.
        if (!ts.isPropertySignature(member)) continue;

        if (!member.name) {
            fail(`${name}: property signature has no name at pos ${member.pos}`);
        }

        let propName: string;
        if (ts.isIdentifier(member.name)) {
            propName = member.name.text;
        }
        else if (ts.isStringLiteral(member.name)) {
            propName = member.name.text;
        }
        else {
            fail(`${name}: unexpected property name kind ${ts.SyntaxKind[member.name.kind]} at pos ${member.name.pos}`);
        }

        if (!member.type) {
            fail(`${name}.${propName}: property has no type annotation`);
        }
        const propTypeNode = member.type;
        const isOptional = !!member.questionToken;

        if (propName === "kind") {
            const kindText = propTypeNode.getText(sourceFile);
            if (kindText.startsWith("SyntaxKind.")) {
                syntaxKind = kindText;
            }
        }

        properties.push({ name: propName, typeNode: propTypeNode, optional: isOptional });
    }

    interfaces.set(name, { name, syntaxKind, properties, extends: extendsInfos, typeParameters });
}

// ---------------------------------------------------------------------------
// Step 2: Collect exported type names for import filtering
// ---------------------------------------------------------------------------

const exportedTypeNames = new Set<string>();
for (const stmt of sourceFile.statements) {
    if (ts.isTypeAliasDeclaration(stmt)) {
        exportedTypeNames.add(stmt.name.text);
    }
    else if (ts.isInterfaceDeclaration(stmt)) {
        exportedTypeNames.add(stmt.name.text);
    }
}

// ---------------------------------------------------------------------------
// Step 2b: Build the set of all types that are Node subtypes
// ---------------------------------------------------------------------------

function extendsNode(name: string, visited = new Set<string>()): boolean {
    if (visited.has(name)) return false;
    visited.add(name);
    if (name === "Node") return true;
    const iface = interfaces.get(name);
    if (!iface) return false;
    return iface.extends.some(ext => extendsNode(ext.name, visited));
}

const nodeTypeInterfaces = new Set<string>();
for (const [name] of interfaces) {
    if (extendsNode(name)) nodeTypeInterfaces.add(name);
}

// Also collect type aliases that resolve to node types (unions of node types, Token<X>, etc.)
const nodeTypeAliases = new Set<string>();
for (const stmt of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(stmt)) continue;
    const aliasName = stmt.name.text;
    if (nodeTypeInterfaces.has(aliasName)) continue;
    // Check if it resolves to a node type
    if (isNodeType(stmt.type)) {
        nodeTypeAliases.add(aliasName);
    }
}

function isNodeType(typeNode: ts.TypeNode): boolean {
    if (ts.isTypeReferenceNode(typeNode)) {
        if (ts.isIdentifier(typeNode.typeName)) {
            const name = typeNode.typeName.text;
            return nodeTypeInterfaces.has(name) || nodeTypeAliases.has(name);
        }
        return false;
    }
    if (ts.isUnionTypeNode(typeNode)) {
        const nonUndefined = typeNode.types.filter(t => t.kind !== ts.SyntaxKind.UndefinedKeyword);
        return nonUndefined.length > 0 && nonUndefined.every(t => isNodeType(t));
    }
    if (ts.isIntersectionTypeNode(typeNode)) {
        return typeNode.types.some(t => isNodeType(t));
    }
    return false;
}

// ---------------------------------------------------------------------------
// Step 3: Resolve all properties for an interface (including inherited)
// ---------------------------------------------------------------------------

const EXCLUDED_PROPS = new Set(["kind", "parent", "pos", "end", "flags"]);

// Per-interface property exclusions for inherited properties that are semantically
// meaningless on certain node types (e.g. constructors don't have type parameters).
const INTERFACE_EXCLUDED_PROPS: Record<string, Set<string>> = {
    ConstructorDeclaration: new Set(["typeParameters", "type", "name"]),
    GetAccessorDeclaration: new Set(["typeParameters"]),
    SetAccessorDeclaration: new Set(["typeParameters", "type"]),
    SemicolonClassElement: new Set(["name"]),
};

function isBrandField(name: string): boolean {
    return name.startsWith("_") && (name.endsWith("Brand") || name.endsWith("brand"));
}

function isNeverType(typeNode: ts.TypeNode): boolean {
    return typeNode.kind === ts.SyntaxKind.NeverKeyword;
}

function substituteTypeParams(type: string, substitutions: Map<string, string>): string {
    if (substitutions.size === 0) return type;
    // Replace standalone type parameter references with their concrete types
    let result = type;
    for (const [param, concrete] of substitutions) {
        result = result.replace(new RegExp(`\\b${param}\\b`, "g"), concrete);
    }
    return result;
}

// Known external base interfaces that we don't need to resolve properties from.
const EXTERNAL_BASES = new Set([
    "ReadonlyArray",
    "ReadonlyTextRange",
]);

function getAllProperties(name: string, visited = new Set<string>(), substitutions = new Map<string, string>()): PropertyInfo[] {
    if (visited.has(name)) return [];
    visited.add(name);

    const iface = interfaces.get(name);
    if (!iface) {
        if (!EXTERNAL_BASES.has(name)) {
            reportError(`getAllProperties: interface "${name}" not found in nodes.ts (not in EXTERNAL_BASES either)`);
        }
        return [];
    }

    const result: PropertyInfo[] = [];

    for (const ext of iface.extends) {
        // Build substitutions for the parent's type parameters
        const parentIface = interfaces.get(ext.name);
        const parentSubs = new Map(substitutions);
        if (parentIface && ext.typeArguments.length > 0) {
            for (let i = 0; i < Math.min(parentIface.typeParameters.length, ext.typeArguments.length); i++) {
                // Also apply current substitutions to the type argument itself
                parentSubs.set(parentIface.typeParameters[i], substituteTypeParams(ext.typeArguments[i], substitutions));
            }
        }
        result.push(...getAllProperties(ext.name, visited, parentSubs));
    }

    for (const prop of iface.properties) {
        if (substitutions.size > 0) {
            const merged = prop.substitutions ? new Map([...prop.substitutions, ...substitutions]) : new Map(substitutions);
            result.push({ ...prop, substitutions: merged });
        }
        else {
            result.push(prop);
        }
    }

    return result;
}

// ---------------------------------------------------------------------------
// Step 4: Build factory definitions for concrete interfaces
// ---------------------------------------------------------------------------

// Rename reserved words used as parameter names
const RESERVED_WORDS = new Set(["arguments", "class", "default", "delete", "export", "extends", "import", "in", "new", "return", "super", "switch", "this", "throw", "typeof", "var", "void", "with", "yield"]);
function safeParamName(name: string): string {
    return RESERVED_WORDS.has(name) ? `${name}_` : name;
}

// Map protocol child property names that differ from TS interface property names.
// The Go AST unifies questionToken/exclamationToken into a single PostfixToken field.
const PROTOCOL_NAME_MAP: Record<string, string> = {};

function protocolToInterfaceName(protocolName: string, propMap: Map<string, PropertyInfo>): string {
    // If the protocol name directly exists in the interface, use it
    if (propMap.has(protocolName)) return protocolName;
    // Otherwise, try the mapping
    const mapped = PROTOCOL_NAME_MAP[protocolName];
    return mapped ?? protocolName;
}

const factoryDefs: FactoryDef[] = [];
const allPropertyNames = new Set<string>();

for (const [name, iface] of interfaces) {
    if (!iface.syntaxKind) continue;
    // Skip union kinds (generic Token types)
    if (iface.syntaxKind.includes(" | ")) continue;

    const allProps = getAllProperties(name);

    // Deduplicate by name, last definition wins
    const propMap = new Map<string, PropertyInfo>();
    for (const prop of allProps) {
        if (EXCLUDED_PROPS.has(prop.name) || isBrandField(prop.name)) continue;
        if (isNeverType(prop.typeNode)) continue;
        if (INTERFACE_EXCLUDED_PROPS[name]?.has(prop.name)) continue;
        propMap.set(prop.name, prop);
    }

    // Order params using childProperties from protocol.ts when available.
    // childProperties is also used as a filter: only child properties listed
    // there are included. Inherited child properties not in the list are dropped.
    // Data properties (non-node) are always included from the type hierarchy.
    const kindName = iface.syntaxKind.replace("SyntaxKind.", "");
    const kindValue = SyntaxKind[kindName as keyof typeof SyntaxKind] as SyntaxKind;
    const order = kindValue !== undefined ? childProperties[kindValue]?.filter((s): s is string => s !== undefined) : undefined;
    let params: PropertyInfo[];
    if (order) {
        const ordered: PropertyInfo[] = [];
        const childPropSet = new Set(order);
        const remaining = new Map(propMap);
        for (const protocolName of order) {
            // Map Go-side protocol names to TS interface property names
            const propName = protocolToInterfaceName(protocolName, remaining);
            const prop = remaining.get(propName);
            if (prop) {
                ordered.push(prop);
                remaining.delete(propName);
            }
        }
        // Append remaining data properties only; drop unlisted child properties
        for (const prop of remaining.values()) {
            if (classifyProperty(prop) === "data") {
                ordered.push(prop);
            }
        }
        params = ordered;
    }
    else {
        params = [...propMap.values()];
    }
    const factoryName = `create${name}`;

    for (const prop of params) {
        allPropertyNames.add(prop.name);
    }

    factoryDefs.push({
        interfaceName: name,
        syntaxKind: iface.syntaxKind,
        factoryName,
        params,
        hasProtocolOrder: !!order,
    });
}

// Diagnostic: error if any node without protocol order has more than 1 child param
for (const def of factoryDefs) {
    if (!def.hasProtocolOrder && countChildParams(def.params) > 1) {
        reportError(`${def.interfaceName} has ${countChildParams(def.params)} child params but no childProperties order`);
    }
}

factoryDefs.sort((a, b) => a.interfaceName.localeCompare(b.interfaceName));

// ---------------------------------------------------------------------------
// Step 5: Collect type references for imports
// ---------------------------------------------------------------------------

function walkTypeReferences(node: ts.Node, refs: Set<string>, skipParams?: Set<string>): void {
    if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName)) {
        if (!skipParams?.has(node.typeName.text)) {
            refs.add(node.typeName.text);
        }
    }
    node.forEachChild(child => walkTypeReferences(child, refs, skipParams));
}

// Collect all type parameter names across all interfaces
const allTypeParams = new Set<string>();
for (const iface of interfaces.values()) {
    for (const tp of iface.typeParameters) allTypeParams.add(tp);
}

const referencedTypes = new Set<string>(["Node", "NodeArray", "SourceFile", "KeywordTypeNode", "KeywordTypeSyntaxKind"]);
for (const def of factoryDefs) {
    referencedTypes.add(def.interfaceName);
    for (const param of def.params) {
        walkTypeReferences(param.typeNode, referencedTypes, allTypeParams);
        if (param.substitutions) {
            for (const value of param.substitutions.values()) {
                const matches = value.match(/\b[A-Z][A-Za-z0-9]*\b/g) ?? [];
                for (const m of matches) referencedTypes.add(m);
            }
        }
    }
}
referencedTypes.delete("SyntaxKind");
const needsTokenFlags = referencedTypes.has("TokenFlags");
referencedTypes.delete("TokenFlags");

// Validate all referenced types are accounted for
const KNOWN_EXTERNAL_TYPES = new Set([
    "SyntaxKind",
    "TokenFlags",
    "NodeFlags",
]);
for (const t of referencedTypes) {
    if (!exportedTypeNames.has(t) && !KNOWN_EXTERNAL_TYPES.has(t)) {
        reportError(`Referenced type "${t}" is not exported from nodes.ts and is not a known external type`);
    }
}

const importTypes = [...referencedTypes].filter(t => exportedTypeNames.has(t)).sort();

// ---------------------------------------------------------------------------
// Step 6: Emit output
// ---------------------------------------------------------------------------

const lines: string[] = [];

function emit(line: string) {
    lines.push(line);
}

// Header
emit("// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
emit("// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!");
emit("// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
emit("//");
emit("// Source: _packages/ast/src/nodes.ts");
emit("// Generator: _packages/ast/scripts/generateFactory.ts");
emit("//");
emit("");
emit(`import { NodeFlags } from "#enums/nodeFlags";`);
emit(`import { SyntaxKind } from "#enums/syntaxKind";`);

if (needsTokenFlags) {
    emit(`import { TokenFlags } from "#enums/tokenFlags";`);
}

emit(`import type {`);
for (const t of importTypes) {
    emit(`    ${t},`);
}
emit(`} from "./nodes.ts";`);
emit("");

const sortedPropertyNames = [...allPropertyNames].sort();

// NodeObject class
emit("/**");
emit(" * Monomorphic AST node implementation.");
emit(" * All synthetic nodes share the same V8 hidden class for optimal property access.");
emit(" *");
emit(" * Common fields live directly on the object; kind-specific fields are stored");
emit(" * in the `_data` bag and accessed via generated property accessors.");
emit(" */");
emit("export class NodeObject {");
emit("    readonly kind!: SyntaxKind;");
emit("    readonly flags!: NodeFlags;");
emit("    readonly pos!: number;");
emit("    readonly end!: number;");
emit("    readonly parent!: Node;");
emit("    /** @internal */");
emit("    _data: any;");
emit("");
emit("    constructor(kind: SyntaxKind, data: any) {");
emit("        this.kind = kind;");
emit("        this.flags = 0 as NodeFlags;");
emit("        this.pos = -1;");
emit("        this.end = -1;");
emit("        this.parent = undefined!;");
emit("        this._data = data;");
emit("    }");
emit("");

for (const propName of sortedPropertyNames) {
    emit(`    get ${propName}(): any { return this._data?.${propName}; }`);
}

emit("");
emit("    forEachChild<T>(visitor: (node: Node) => T, visitArray?: (nodes: NodeArray<Node>) => T): T | undefined {");
emit("        const fn = forEachChildTable[this.kind];");
emit("        return fn ? fn(this._data, visitor, visitArray) : undefined;");
emit("    }");
emit("");
emit("    getSourceFile(): SourceFile {");
emit("        let node: Node = this as unknown as Node;");
emit("        while (node.parent) node = node.parent;");
emit("        return node as unknown as SourceFile;");
emit("    }");

emit("}");
emit("");

// createToken helper
emit("/**");
emit(" * Create a simple token node with only a `kind`.");
emit(" */");
emit("export function createToken<TKind extends SyntaxKind>(kind: TKind): Node & { readonly kind: TKind } {");
emit("    return new NodeObject(kind, undefined) as any;");
emit("}");
emit("");

// createKeywordTypeNode helper
emit("/**");
emit(" * Create a keyword type node (e.g. `string`, `number`, `boolean`, etc.).");
emit(" */");
emit("export function createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): KeywordTypeNode<TKind> {");
emit("    return new NodeObject(kind, undefined) as any;");
emit("}");
emit("");

// createNodeArray helper
emit("export function createNodeArray<T extends Node>(elements: readonly T[], pos: number = -1, end: number = -1): NodeArray<T> {");
emit("    const arr = elements as unknown as NodeArray<T> & { pos: number; end: number };");
emit("    arr.pos = pos;");
emit("    arr.end = end;");
emit("    return arr;");
emit("}");
emit("");

// Structural check for NodeArray<X> types — returns the element TypeNode if matched.
// Also handles `NodeArray<X> | undefined` since the `?` optional marker already covers undefined.
function getNodeArrayElementType(typeNode: ts.TypeNode): ts.TypeNode | undefined {
    if (ts.isTypeReferenceNode(typeNode)) {
        if (
            ts.isIdentifier(typeNode.typeName) && typeNode.typeName.text === "NodeArray"
            && typeNode.typeArguments && typeNode.typeArguments.length === 1
        ) {
            return typeNode.typeArguments[0];
        }
        return undefined;
    }
    if (ts.isUnionTypeNode(typeNode)) {
        // Check for `NodeArray<X> | undefined`
        const nonUndefined = typeNode.types.filter(t => t.kind !== ts.SyntaxKind.UndefinedKeyword);
        if (nonUndefined.length === 1) {
            return getNodeArrayElementType(nonUndefined[0]);
        }
    }
    return undefined;
}

/**
 * Classify a property as "node" (single child node), "nodeArray" (NodeArray child),
 * or "data" (non-node value like string, number, boolean, SyntaxKind, etc.).
 */
function classifyProperty(prop: PropertyInfo): "node" | "nodeArray" | "data" {
    if (getNodeArrayElementType(prop.typeNode)) return "nodeArray";
    if (isPropertyNodeType(prop.typeNode)) return "node";
    return "data";
}

function isPropertyNodeType(typeNode: ts.TypeNode): boolean {
    if (ts.isTypeReferenceNode(typeNode)) {
        if (ts.isIdentifier(typeNode.typeName)) {
            const name = typeNode.typeName.text;
            return nodeTypeInterfaces.has(name) || nodeTypeAliases.has(name);
        }
        return false;
    }
    if (ts.isUnionTypeNode(typeNode)) {
        const nonUndefined = typeNode.types.filter(t => t.kind !== ts.SyntaxKind.UndefinedKeyword);
        return nonUndefined.length > 0 && nonUndefined.every(t => isPropertyNodeType(t));
    }
    if (ts.isIntersectionTypeNode(typeNode)) {
        return typeNode.types.some(t => isPropertyNodeType(t));
    }
    return false;
}

function printType(prop: PropertyInfo): string {
    let text = prop.typeNode.getText(sourceFile);
    if (prop.substitutions) {
        text = substituteTypeParams(text, prop.substitutions);
    }
    return text;
}

function printElementType(elemTypeNode: ts.TypeNode, substitutions?: Map<string, string>): string {
    let text = elemTypeNode.getText(sourceFile);
    if (substitutions) {
        text = substituteTypeParams(text, substitutions);
    }
    // Only parenthesize union/intersection types for valid array syntax
    if (ts.isUnionTypeNode(elemTypeNode) || ts.isIntersectionTypeNode(elemTypeNode)) {
        return `(${text})`;
    }
    return text;
}

// ---------------------------------------------------------------------------
// forEachChildTable: generated dispatch table for forEachChild
// ---------------------------------------------------------------------------

type ChildProp = { name: string; kind: "node" | "nodeArray"; };

emit("type ForEachChildFunction = (data: any, cbNode: (node: Node) => any, cbNodes?: (nodes: NodeArray<Node>) => any) => any;");
emit("");
emit("const forEachChildTable: Record<number, ForEachChildFunction> = {");

let forEachChildCount = 0;
for (const def of factoryDefs) {
    const childProps: ChildProp[] = [];
    for (const prop of def.params) {
        const classification = classifyProperty(prop);
        if (classification !== "data") {
            childProps.push({ name: prop.name, kind: classification });
        }
    }

    if (childProps.length === 0) continue;
    forEachChildCount++;

    const propAccesses = childProps.map(cp => {
        if (cp.kind === "nodeArray") {
            return `visitNodes(cbNode, cbNodes, data.${cp.name})`;
        }
        else {
            return `visitNode(cbNode, data.${cp.name})`;
        }
    });

    if (propAccesses.length === 1) {
        emit(`    [${def.syntaxKind}]: (data, cbNode, cbNodes) => ${propAccesses[0]},`);
    }
    else {
        emit(`    [${def.syntaxKind}]: (data, cbNode, cbNodes) =>`);
        for (let i = 0; i < propAccesses.length; i++) {
            const sep = i < propAccesses.length - 1 ? " ||" : ",";
            const indent = "        ";
            emit(`${indent}${propAccesses[i]}${sep}`);
        }
    }
}

emit("};");
emit("");

// visitNode / visitNodes helpers
emit("function visitNode<T>(cbNode: (node: Node) => T, node: Node | undefined): T | undefined {");
emit("    return node ? cbNode(node) : undefined;");
emit("}");
emit("");
emit("function visitNodes<T>(cbNode: (node: Node) => T, cbNodes: ((nodes: NodeArray<Node>) => T) | undefined, nodes: NodeArray<Node> | undefined): T | undefined {");
emit("    if (!nodes) return undefined;");
emit("    if (cbNodes) return cbNodes(nodes);");
emit("    for (const node of nodes) {");
emit("        const result = cbNode(node);");
emit("        if (result) return result;");
emit("    }");
emit("    return undefined;");
emit("}");
emit("");

// Factory functions
for (const def of factoryDefs) {
    const { interfaceName, syntaxKind, factoryName, params } = def;

    // Params are already in protocol order (from childProperties) when available.
    // Child params (node/nodeArray) are never optional (?) — they use | undefined.
    // Only trailing data params may use ?.
    const orderedParams = params;

    // Find the index after which all remaining params are optional data params
    let lastNonTrailingIndex = -1;
    for (let i = orderedParams.length - 1; i >= 0; i--) {
        const p = orderedParams[i];
        if (!p.optional || classifyProperty(p) !== "data") {
            lastNonTrailingIndex = i;
            break;
        }
    }

    // Track which params are NodeArray types so we can wrap them
    const nodeArrayParams = new Set<string>();
    const paramList = orderedParams.map((p, i) => {
        const isChild = classifyProperty(p) !== "data";
        const safe = safeParamName(p.name);
        const elemTypeNode = getNodeArrayElementType(p.typeNode);
        if (elemTypeNode) {
            nodeArrayParams.add(p.name);
            const elemText = printElementType(elemTypeNode, p.substitutions);
            if (p.optional) {
                return `${safe}: readonly ${elemText}[] | undefined`;
            }
            return `${safe}: readonly ${elemText}[]`;
        }
        if (isChild) {
            // Child params are never ?, use | undefined in the type
            let typeText = printType(p);
            if (p.optional && !typeText.includes("undefined")) {
                typeText += " | undefined";
            }
            return `${safe}: ${typeText}`;
        }
        // Data params: only trailing optional ones use ?
        const isTrailing = i > lastNonTrailingIndex;
        if (p.optional && isTrailing) {
            return `${safe}?: ${printType(p)}`;
        }
        let typeText = printType(p);
        if (p.optional && !typeText.includes("undefined")) {
            typeText += " | undefined";
        }
        return `${safe}: ${typeText}`;
    });

    emit(`export function ${factoryName}(${paramList.join(", ")}): ${interfaceName} {`);

    if (params.length === 0) {
        emit(`    return new NodeObject(${syntaxKind}, undefined) as unknown as ${interfaceName};`);
    }
    else {
        emit(`    return new NodeObject(${syntaxKind}, {`);
        for (const p of orderedParams) {
            const safe = safeParamName(p.name);
            if (nodeArrayParams.has(p.name)) {
                const wrap = p.optional ? `${safe} ? createNodeArray(${safe}) : undefined` : `createNodeArray(${safe})`;
                emit(`        ${p.name}: ${wrap},`);
            }
            else if (safe !== p.name) {
                emit(`        ${p.name}: ${safe},`);
            }
            else {
                emit(`        ${p.name},`);
            }
        }
        emit(`    }) as unknown as ${interfaceName};`);
    }
    emit("}");
    emit("");
}

// ---------------------------------------------------------------------------
// Step 7: Write output
// ---------------------------------------------------------------------------

const output = lines.join("\n") + "\n";
fs.writeFileSync(outputPath, output);

console.log("Formatting...");
execaSync("dprint", ["fmt", outputPath]);

console.log(`Generated ${outputPath}`);
console.log(`  ${factoryDefs.length} factory functions`);
console.log(`  ${sortedPropertyNames.length} accessors on NodeObject`);

if (factoryDefs.length === 0) {
    reportError("No factory definitions generated — something is very wrong");
}

if (sortedPropertyNames.length === 0) {
    reportError("No properties collected — something is very wrong");
}

if (errors.length > 0) {
    console.error(`\n${errors.length} error(s):`);
    for (const e of errors) {
        console.error(`  - ${e}`);
    }
    process.exit(1);
}
