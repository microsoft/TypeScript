#!/usr/bin/env -S node --conditions=@typescript/source --experimental-strip-types --no-warnings

/**
 * Code generator for visitNode, visitNodes, and visitEachChild.
 *
 * Usage:
 *   node --conditions=@typescript/source --experimental-strip-types --no-warnings generateVisitor.ts
 *
 * Reads:  _packages/ast/src/nodes.ts
 * Writes: _packages/ast/src/visitor.ts
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
const outputPath = path.resolve(__dirname, "../src/visitor.ts");

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

interface VisitorDef {
    interfaceName: string;
    syntaxKind: string;
    factoryName: string;
    params: PropertyInfo[];
    hasProtocolOrder: boolean;
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
// Step 2: Build the set of all types that are Node subtypes
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

const nodeTypeAliases = new Set<string>();
let changed = true;
while (changed) {
    changed = false;
    for (const stmt of sourceFile.statements) {
        if (!ts.isTypeAliasDeclaration(stmt)) continue;
        const aliasName = stmt.name.text;
        if (nodeTypeInterfaces.has(aliasName) || nodeTypeAliases.has(aliasName)) continue;
        if (isNodeType(stmt.type)) {
            nodeTypeAliases.add(aliasName);
            changed = true;
        }
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

function getEffectiveTypeName(typeNode: ts.TypeNode, substitutions?: Map<string, string>): string | undefined {
    if (ts.isTypeReferenceNode(typeNode)) {
        if (ts.isIdentifier(typeNode.typeName)) {
            let name = typeNode.typeName.text;
            if (substitutions?.has(name)) {
                name = substitutions.get(name)!;
            }
            if (nodeTypeInterfaces.has(name) || nodeTypeAliases.has(name)) {
                return name;
            }
        }
        return undefined;
    }
    if (ts.isUnionTypeNode(typeNode)) {
        const nonUndefined = typeNode.types.filter(t => t.kind !== ts.SyntaxKind.UndefinedKeyword);
        if (nonUndefined.length === 1) {
            return getEffectiveTypeName(nonUndefined[0], substitutions);
        }
        // Multiple non-undefined types - can't narrow to a single test function
        return undefined;
    }
    if (ts.isIntersectionTypeNode(typeNode)) {
        for (const t of typeNode.types) {
            const name = getEffectiveTypeName(t, substitutions);
            if (name) return name;
        }
        return undefined;
    }
    return undefined;
}

// ---------------------------------------------------------------------------
// Step 3: Resolve all properties for an interface (including inherited)
// ---------------------------------------------------------------------------

const EXCLUDED_PROPS = new Set(["kind", "parent", "pos", "end", "flags", "jsDoc"]);

const INTERFACE_EXCLUDED_PROPS: Record<string, Set<string>> = {
    ConstructorDeclaration: new Set(["typeParameters", "type", "name"]),
    GetAccessorDeclaration: new Set(["typeParameters"]),
    SetAccessorDeclaration: new Set(["typeParameters", "type"]),
    SemicolonClassElement: new Set(["name"]),
    SourceFile: new Set(["languageVariant", "scriptKind", "tokenCache", "isDeclarationFile", "referencedFiles", "typeReferenceDirectives", "libReferenceDirectives", "imports", "moduleAugmentations", "ambientModuleNames", "externalModuleIndicator"]),
};

function isBrandField(name: string): boolean {
    return name.startsWith("_") && (name.endsWith("Brand") || name.endsWith("brand"));
}

function isNeverType(typeNode: ts.TypeNode): boolean {
    return typeNode.kind === ts.SyntaxKind.NeverKeyword;
}

function substituteTypeParams(type: string, substitutions: Map<string, string>): string {
    if (substitutions.size === 0) return type;
    let result = type;
    for (const [param, concrete] of substitutions) {
        result = result.replace(new RegExp(`\\b${param}\\b`, "g"), concrete);
    }
    return result;
}

const EXTERNAL_BASES = new Set(["ReadonlyArray", "ReadonlyTextRange"]);

function getAllProperties(name: string, visited = new Set<string>(), substitutions = new Map<string, string>()): PropertyInfo[] {
    if (visited.has(name)) return [];
    visited.add(name);

    const iface = interfaces.get(name);
    if (!iface) {
        return [];
    }

    const result: PropertyInfo[] = [];

    for (const ext of iface.extends) {
        const parentIface = interfaces.get(ext.name);
        const parentSubs = new Map(substitutions);
        if (parentIface && ext.typeArguments.length > 0) {
            for (let i = 0; i < Math.min(parentIface.typeParameters.length, ext.typeArguments.length); i++) {
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
// Step 4: Property classification utilities
// ---------------------------------------------------------------------------

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
        const nonUndefined = typeNode.types.filter(t => t.kind !== ts.SyntaxKind.UndefinedKeyword);
        if (nonUndefined.length === 1) {
            return getNodeArrayElementType(nonUndefined[0]);
        }
    }
    return undefined;
}

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

function typeIncludesUndefined(typeNode: ts.TypeNode): boolean {
    if (typeNode.kind === ts.SyntaxKind.UndefinedKeyword) return true;
    if (ts.isUnionTypeNode(typeNode)) {
        return typeNode.types.some(t => t.kind === ts.SyntaxKind.UndefinedKeyword);
    }
    return false;
}

// ---------------------------------------------------------------------------
// Step 5: Build visitor definitions for concrete interfaces
// ---------------------------------------------------------------------------

const PROTOCOL_NAME_MAP: Record<string, string> = {};

function protocolToInterfaceName(protocolName: string, propMap: Map<string, PropertyInfo>): string {
    if (propMap.has(protocolName)) return protocolName;
    const mapped = PROTOCOL_NAME_MAP[protocolName];
    return mapped ?? protocolName;
}

const visitorDefs: VisitorDef[] = [];

for (const [name, iface] of interfaces) {
    if (!iface.syntaxKind) continue;
    if (iface.syntaxKind.includes(" | ")) continue;

    const allProps = getAllProperties(name);

    const propMap = new Map<string, PropertyInfo>();
    for (const prop of allProps) {
        if (EXCLUDED_PROPS.has(prop.name) || isBrandField(prop.name)) continue;
        if (isNeverType(prop.typeNode)) continue;
        if (INTERFACE_EXCLUDED_PROPS[name]?.has(prop.name)) continue;
        propMap.set(prop.name, prop);
    }

    const kindName = iface.syntaxKind.replace("SyntaxKind.", "");
    const kindValue = SyntaxKind[kindName as keyof typeof SyntaxKind] as SyntaxKind;
    const order = kindValue !== undefined ? childProperties[kindValue]?.filter((s): s is string => s !== undefined) : undefined;
    let params: PropertyInfo[];
    if (order) {
        const ordered: PropertyInfo[] = [];
        const childPropSet = new Set(order);
        const remaining = new Map(propMap);
        for (const protocolName of order) {
            const propName = protocolToInterfaceName(protocolName, remaining);
            const prop = remaining.get(propName);
            if (prop) {
                ordered.push(prop);
                remaining.delete(propName);
            }
        }
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

    // Only include defs that have at least one child property
    const hasChildren = params.some(p => classifyProperty(p) !== "data");
    if (!hasChildren) continue;

    visitorDefs.push({
        interfaceName: name,
        syntaxKind: iface.syntaxKind,
        factoryName,
        params,
        hasProtocolOrder: !!order,
    });
}

visitorDefs.sort((a, b) => a.interfaceName.localeCompare(b.interfaceName));

// ---------------------------------------------------------------------------
// Step 6: Collect imports
// ---------------------------------------------------------------------------

// Only import the types actually used in the generated code
const typeImports = new Set<string>(["Node", "NodeArray"]);
for (const def of visitorDefs) {
    typeImports.add(def.interfaceName);
}
const sortedTypeImports = [...typeImports].filter(t => {
    // Only import types that are exported from nodes.ts
    const exportedTypeNames = new Set<string>();
    for (const stmt of sourceFile.statements) {
        if (ts.isTypeAliasDeclaration(stmt)) exportedTypeNames.add(stmt.name.text);
        else if (ts.isInterfaceDeclaration(stmt)) exportedTypeNames.add(stmt.name.text);
    }
    return exportedTypeNames.has(t);
}).sort();

// Collect factory function names we need to import
const factoryImports = new Set<string>();
for (const def of visitorDefs) {
    factoryImports.add(`update${def.interfaceName}`);
}
// We also need createNodeArray for visitNodes
factoryImports.add("createNodeArray");
const sortedFactoryImports = [...factoryImports].sort();

// Collect is* function names needed for visitNode type checks
const isImports = new Set<string>();

// Test function overrides for properties where getEffectiveTypeName can't determine the correct
// test function (e.g. multi-member union types, Token<SyntaxKind.X> types).
// Keyed by "InterfaceName.propertyName", value is the test function name.
const TEST_FUNCTION_OVERRIDES: Record<string, string> = {
    "JSDocCallbackTag.fullName": "isIdentifierOrJSDocNamespaceDeclaration",
    "JSDocLink.name": "isEntityNameOrJSDocMemberName",
    "JSDocLinkCode.name": "isEntityNameOrJSDocMemberName",
    "JSDocLinkPlain.name": "isEntityNameOrJSDocMemberName",
    "JSDocMemberName.left": "isEntityNameOrJSDocMemberName",
    "JSDocNameReference.name": "isEntityNameOrJSDocMemberName",
    "JSDocTypedefTag.fullName": "isIdentifierOrJSDocNamespaceDeclaration",
    "JSDocTypedefTag.typeExpression": "isJSDocTypeExpressionOrJSDocTypeLiteral",
    "JsxExpression.dotDotDotToken": "isDotDotDotToken",
    "LiteralTypeNode.literal": "isLiteralTypeLiteral",
    "MappedTypeNode.questionToken": "isQuestionOrPlusOrMinusToken",
    "MappedTypeNode.readonlyToken": "isReadonlyKeywordOrPlusOrMinusToken",
    "ModuleDeclaration.body": "isModuleBody",
    "NamedTupleMember.dotDotDotToken": "isDotDotDotToken",
    "NamedTupleMember.questionToken": "isQuestionToken",
    "PropertyDeclaration.postfixToken": "isQuestionOrExclamationToken",
    "TemplateLiteralTypeSpan.literal": "isTemplateMiddleOrTemplateTail",
    "TemplateSpan.literal": "isTemplateMiddleOrTemplateTail",
    "TypePredicateNode.parameterName": "isIdentifierOrThisTypeNode",
};

// Properties where the visitNode result needs to be cast to the property type
// (for intersection types where the test function's return type is too broad).
const CAST_PROPERTIES = new Set<string>([
    "JSDocAugmentsTag.class",
    "JSDocImplementsTag.class",
]);

// Pre-generate the visitEachChildTable entries so isImports is populated before we emit
interface TableEntry {
    syntaxKind: string;
    interfaceName: string;
    bodyLines: string[];
    updateArgs: string[];
}
const tableEntries: TableEntry[] = [];

for (const def of visitorDefs) {
    const childParams = def.params.filter(p => classifyProperty(p) !== "data");
    if (childParams.length === 0) continue;

    const visitedVars: { name: string; varName: string; kind: "node" | "nodeArray"; }[] = [];
    const bodyLines: string[] = [];

    for (const cp of childParams) {
        const kind = classifyProperty(cp);
        const varName = `_${cp.name}`;
        visitedVars.push({ name: cp.name, varName, kind: kind as "node" | "nodeArray" });
        if (kind === "nodeArray") {
            bodyLines.push(`        const ${varName} = visitNodes(node.${cp.name}, visitor);`);
        }
        else {
            const overrideKey = `${def.interfaceName}.${cp.name}`;
            const overrideTestFn = TEST_FUNCTION_OVERRIDES[overrideKey];
            const needsCast = CAST_PROPERTIES.has(overrideKey);

            let testFn: string | undefined;
            if (overrideTestFn) {
                testFn = overrideTestFn;
            }
            else {
                const typeName = getEffectiveTypeName(cp.typeNode, cp.substitutions);
                testFn = typeName ? `is${typeName}` : undefined;
            }

            const castSuffix = needsCast ? ` as typeof node.${cp.name}` : "";

            if (testFn) {
                isImports.add(testFn);
                bodyLines.push(`        const ${varName} = visitNode(node.${cp.name}, visitor, ${testFn})${castSuffix};`);
            }
            else {
                const isRequired = !cp.optional && !typeIncludesUndefined(cp.typeNode);
                const assert = isRequired ? "!" : "";
                bodyLines.push(`        const ${varName} = visitNode(node.${cp.name}, visitor)${assert}${castSuffix};`);
            }
        }
    }

    tableEntries.push({
        syntaxKind: def.syntaxKind,
        interfaceName: def.interfaceName,
        bodyLines,
        updateArgs: visitedVars.map(v => v.varName),
    });
}

// ---------------------------------------------------------------------------
// Step 7: Emit output
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
emit("// Generator: _packages/ast/scripts/generateVisitor.ts");
emit("//");
emit("");
emit(`import { SyntaxKind } from "#enums/syntaxKind";`);
emit(`import {`);
for (const f of sortedFactoryImports) {
    emit(`    ${f},`);
}
emit(`} from "./factory.ts";`);
if (isImports.size > 0) {
    const sortedIsImports = [...isImports].sort();
    emit(`import {`);
    for (const f of sortedIsImports) {
        emit(`    ${f},`);
    }
    emit(`} from "./is.ts";`);
}
emit(`import type {`);
for (const t of sortedTypeImports) {
    emit(`    ${t},`);
}
emit(`} from "./nodes.ts";`);
emit("");

// Visitor type
emit("/**");
emit(" * A callback that receives a node and returns a visited node (or undefined to remove it).");
emit(" */");
emit("export type Visitor = (node: Node) => Node | undefined;");
emit("");

// visitNode
emit("/**");
emit(" * Visits a Node using the supplied visitor, possibly returning a new Node in its place.");
emit(" *");
emit(" * - If the input node is undefined, then the output is undefined.");
emit(" * - If the visitor returns undefined, then the output is undefined.");
emit(" * - If the output node is not undefined, then it will satisfy the test function.");
emit(" * - In order to obtain a return type that is more specific than `Node`, a test");
emit(" *   function _must_ be provided, and that function must be a type predicate.");
emit(" *");
emit(" * @param node The Node to visit.");
emit(" * @param visitor The callback used to visit the Node.");
emit(" * @param test A callback to execute to verify the Node is valid.");
emit(" */");
emit("export function visitNode<TIn extends Node | undefined, TOut extends Node>(");
emit("    node: TIn,");
emit("    visitor: Visitor,");
emit("    test: (node: Node) => node is TOut,");
emit("): TOut | (TIn & undefined);");
emit("/**");
emit(" * Visits a Node using the supplied visitor, possibly returning a new Node in its place.");
emit(" *");
emit(" * - If the input node is undefined, then the output is undefined.");
emit(" * - If the visitor returns undefined, then the output is undefined.");
emit(" *");
emit(" * @param node The Node to visit.");
emit(" * @param visitor The callback used to visit the Node.");
emit(" * @param test An optional callback to execute to verify the Node is valid.");
emit(" */");
emit("export function visitNode<TIn extends Node | undefined>(");
emit("    node: TIn,");
emit("    visitor: Visitor,");
emit("    test?: (node: Node) => boolean,");
emit("): Node | (TIn & undefined);");
emit("export function visitNode(node: Node | undefined, visitor: Visitor, test?: (node: Node) => boolean): Node | undefined {");
emit("    if (node === undefined) return undefined;");
emit("    const visited = visitor(node);");
emit("    if (visited !== undefined && test !== undefined && !test(visited)) {");
emit('        throw new Error("Visited node failed test assertion.");');
emit("    }");
emit("    return visited;");
emit("}");
emit("");

// visitNodes
emit("/**");
emit(" * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.");
emit(" *");
emit(" * - If the input node array is undefined, the output is undefined.");
emit(" * - If the visitor returns undefined for a node, that node is dropped from the result.");
emit(" */");
emit("export function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor): NodeArray<T>;");
emit("export function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor): NodeArray<T> | undefined;");
emit("export function visitNodes(nodes: NodeArray<Node> | undefined, visitor: Visitor): NodeArray<Node> | undefined {");
emit("    if (nodes === undefined) return undefined;");
emit("    let updated: Node[] | undefined;");
emit("    for (let i = 0; i < nodes.length; i++) {");
emit("        const node = nodes[i];");
emit("        const visited = visitor(node);");
emit("        if (updated) {");
emit("            if (visited) updated.push(visited);");
emit("        }");
emit("        else if (visited !== node) {");
emit("            updated = [];");
emit("            for (let j = 0; j < i; j++) updated.push(nodes[j]);");
emit("            if (visited) updated.push(visited);");
emit("        }");
emit("    }");
emit("    if (!updated) return nodes;");
emit("    return createNodeArray(updated, nodes.pos, nodes.end);");
emit("}");
emit("");

// visitEachChild
emit("/**");
emit(" * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.");
emit(" *");
emit(" * @param node The Node whose children will be visited.");
emit(" * @param visitor The callback used to visit each child.");
emit(" * @returns The original node if no children changed, or a new node with visited children.");
emit(" */");
emit("export function visitEachChild<T extends Node>(node: T, visitor: Visitor): T;");
emit("export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor): T | undefined;");
emit("export function visitEachChild(node: Node | undefined, visitor: Visitor): Node | undefined {");
emit("    if (node === undefined) return undefined;");
emit("    const fn = visitEachChildTable[node.kind];");
emit("    return fn ? fn(node, visitor) : node;");
emit("}");
emit("");

// visitEachChildTable type
emit("type VisitEachChildFunction = (node: any, visitor: Visitor) => Node;");
emit("");

// The dispatch table
emit("const visitEachChildTable: Record<number, VisitEachChildFunction> = {");

for (const entry of tableEntries) {
    const updateName = `update${entry.interfaceName}`;
    emit(`    [${entry.syntaxKind}]: (node: ${entry.interfaceName}, visitor: Visitor): ${entry.interfaceName} => {`);
    for (const line of entry.bodyLines) {
        emit(line);
    }
    emit(`        return ${updateName}(node, ${entry.updateArgs.join(", ")});`);
    emit("    },");
}

emit("};");

// ---------------------------------------------------------------------------
// Step 8: Write output
// ---------------------------------------------------------------------------

const output = lines.join("\n") + "\n";
fs.writeFileSync(outputPath, output);

console.log("Formatting...");
execaSync("dprint", ["fmt", outputPath]);

console.log(`Generated ${outputPath}`);
console.log(`  ${visitorDefs.length} visitEachChild entries`);

if (visitorDefs.length === 0) {
    reportError("No visitor definitions generated — something is very wrong");
}

if (errors.length > 0) {
    console.error(`\n${errors.length} error(s):`);
    for (const e of errors) {
        console.error(`  - ${e}`);
    }
    process.exit(1);
}
