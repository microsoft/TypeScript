/**
 * Schema-driven TypeScript AST code generator.
 * Reads _scripts/ast.json and produces:
 *   - _packages/ast/src/ast.generated.ts
 *   - _packages/ast/src/factory.generated.ts
 *   - _packages/ast/src/is.generated.ts
 *
 * Usage: node --experimental-strip-types _scripts/generate-ts-ast.ts
 */

import { execaSync } from "execa";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type {
    MemberInfo,
    NodeType,
    Type,
} from "./schema.ts";
import {
    api,
    kindGuardName,
} from "./schema.ts";

// ────────────────────────────────────────────────────────────────────────────
// Load schema
// ────────────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(import.meta.dirname!, "..");

// TS members only (filter noTS/inherited issues)
function tsMembers(node: NodeType): MemberInfo[] {
    return node.members.filter(member => !member.isKindParam() && !member.noTS);
}

function isInheritedFromTsBase(member: MemberInfo): boolean {
    return member.inherited && !!member.inheritedField && !member.inheritedField.noTS;
}

// NodeBase fields (e.g. Flags) are class-level properties on NodeObject,
// not data members stored in _data.
const nodeBaseFieldNames = new Set(
    api.bases().find(b => b.name === "NodeBase")?.fields.filter(f => !f.noTS).map(f => f.name) ?? [],
);

function isNodeBaseProperty(member: MemberInfo): boolean {
    return member.inherited && nodeBaseFieldNames.has(member.name);
}

function tsInterfaceMembers(node: NodeType): MemberInfo[] {
    return tsMembers(node).filter(member => !isInheritedFromTsBase(member) || member.hasTypeScriptOverride());
}

// ────────────────────────────────────────────────────────────────────────────
// TS-specific naming and typing
// ────────────────────────────────────────────────────────────────────────────

function tsParamTypeFrom(type: Type): string {
    return type.kind === "list" ? type.raw().formatTypeScript() : type.formatTypeScript();
}

function tsParamName(propName: string): string {
    if (propName === "arguments") return "arguments_";
    return propName;
}

// Get factory members in schema order.
function factoryMembers(node: NodeType): MemberInfo[] {
    return tsMembers(node).filter(m => !m.noFactory);
}

function factoryNodes(): NodeType[] {
    return api.nodes().filter(node => !node.handWritten && !isVariantNode(node));
}

function kindTypeParameter(node: NodeType): { name: string; constraint: string; } | undefined {
    const kindType = node.kindType;
    if (kindType.kind !== "typeParameter") return undefined;
    return { name: kindType.name, constraint: kindType.constraint.formatTypeScript() };
}

function isVariantNode(node: NodeType): boolean {
    return node.isMultiKind() && node.kindType.kind !== "typeParameter";
}

function syntaxKindChecksForNode(node: NodeType): string[] {
    return node.allKinds().map(k => k.formatTypeScript());
}

// ────────────────────────────────────────────────────────────────────────────
// Bases for ast.generated.ts
// ────────────────────────────────────────────────────────────────────────────

const goOnlyBases = new Set(
    api.bases().filter(base => base.isGoOnly()).map(base => base.key),
);

// Expand goOnly bases transitively: when a goOnly base appears in an extends
// list, replace it with its own non-goOnly extends (recursively).
function expandTsExtends(exts: string[]): string[] {
    const result: string[] = [];
    const seen = new Set<string>();

    function expand(bases: string[]) {
        for (const b of bases) {
            if (seen.has(b)) continue;
            seen.add(b);
            if (goOnlyBases.has(b)) {
                const base = api.getBase(b);
                if (base?.extends) {
                    expand(base.extendsKeys);
                }
            }
            else {
                result.push(b);
            }
        }
    }

    expand(exts);
    return result;
}

function baseTsName(base: string | NodeType): string {
    return typeof base === "string" ? base : base.formatTypeScript();
}

function resolveBaseExtends(base: NodeType): string {
    if (base.extendsKeys.length > 0) {
        const tsExts = expandTsExtends(base.extendsKeys)
            .map(e => baseTsName(e));
        if (tsExts.length > 0) return tsExts.join(", ");
    }
    return "Node";
}

function deriveNodeTsExtends(node: NodeType): string {
    const tsExts = expandTsExtends(node.extendsKeys)
        .map(e => baseTsName(e));
    return tsExts.length > 0 ? tsExts.join(", ") : "Node";
}

function generateBaseFields(base: NodeType): string {
    if (base.fields.length === 0) return "";
    let result = "";
    for (const field of base.fields) {
        if (field.noTS) continue;
        const name = api.uncapitalize(field.name);
        const type = field.type.formatTypeScript();
        const opt = field.optional ? "?" : "";
        result += `\n    readonly ${name}${opt}: ${type};`;
    }
    return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Variant types derived from multi-kind Go nodes with enum Kind members.
// ────────────────────────────────────────────────────────────────────────────

// Compute TS variant interfaces from multi-kind nodes with enum Kind members.
// For each enum value, create a separate interface; a union type alias uses the Go struct name.
interface TsVariant {
    tsName: string;
    syntaxKind: string;
    tsExtends: string;
    members?: MemberInfo[];
    handWrittenVisitor?: boolean;
}

interface VisitorEntry {
    tsName: string;
    syntaxKind: string;
    updateName: string;
    members: MemberInfo[];
    handWrittenVisitor?: boolean;
}

function computeTsVariants(): TsVariant[] {
    const result: TsVariant[] = [];
    for (const node of api.nodes()) {
        if (!isVariantNode(node)) continue;

        // tsMembers excludes the Kind member; use full set so factory/visitor/clone
        // code sees inherited members too. Interface generation filters further.
        const otherMembers = tsMembers(node);
        const tsExtends = deriveNodeTsExtends(node);

        const kindValues = node.kindTypes().map(kind => kind.name);

        for (const kindValue of kindValues) {
            result.push({
                tsName: kindValue,
                syntaxKind: kindValue,
                tsExtends,
                members: otherMembers,
                handWrittenVisitor: node.handWrittenVisitor,
            });
        }
    }
    return result;
}

const tsVariants = computeTsVariants();

function visitorNodes(): NodeType[] {
    return api.nodes().filter(node => !isVariantNode(node));
}

function visitorMembers(node: NodeType): MemberInfo[] {
    return factoryMembers(node).filter(member => member.isChild());
}

function visitorGuardName(member: MemberInfo): string | undefined {
    const typeName = member.type.formatTypeScript();
    if (typeName === "Node" || typeName === "Declaration") {
        return undefined;
    }

    if (member.typeGuard) {
        return member.typeGuard;
    }

    switch (member.type.kind) {
        case "node":
        case "alias":
            return `is${member.type.name}`;
        case "union": {
            throw new Error(`No visitor guard configured for union child type ${member.type.formatTypeScript()} on ${member.node?.name}.${member.name}`);
        }
        default:
            return undefined;
    }
}

function visitorVisitExpression(member: MemberInfo): { expression: string; guardName?: string; } {
    const propName = api.uncapitalize(member.name);
    if (member.listKind === "raw") {
        return { expression: `visitNodesArray(node.${propName}, visitor)` };
    }
    if (member.type.kind === "list") {
        return { expression: `visitNodes(node.${propName}, visitor)` };
    }
    const guardName = visitorGuardName(member);
    const guardArg = guardName ? `, ${guardName}` : "";
    return { expression: `visitNode(node.${propName}, visitor${guardArg})`, guardName };
}

function visitorEntries(): VisitorEntry[] {
    const entries: VisitorEntry[] = [];

    for (const node of visitorNodes()) {
        const members = visitorMembers(node);
        if (members.length === 0) continue;
        entries.push({
            tsName: node.name,
            syntaxKind: node.syntaxKindName,
            updateName: `update${node.name}`,
            members,
            handWrittenVisitor: node.handWrittenVisitor,
        });
    }

    for (const variant of tsVariants) {
        const members = (variant.members || []).filter(member => member.isChild());
        if (members.length === 0) continue;
        entries.push({
            tsName: variant.tsName,
            syntaxKind: variant.syntaxKind,
            updateName: `update${variant.tsName}`,
            members,
            handWrittenVisitor: variant.handWrittenVisitor,
        });
    }

    return entries;
}

// ────────────────────────────────────────────────────────────────────────────
// Code generation: ast.generated.ts
// ────────────────────────────────────────────────────────────────────────────

function generateAstGenerated(): string {
    const eol = "\r\n";
    const parts: string[] = [];

    // ── Header ──
    parts.push(`// Code generated by _scripts/generate-ts-ast.ts. DO NOT EDIT.

import type { ModifierFlags } from "#enums/modifierFlags";
import type { NodeFlags } from "#enums/nodeFlags";
import { SyntaxKind } from "#enums/syntaxKind";
import { TokenFlags } from "#enums/tokenFlags";
import type { Node, NodeArray } from "./ast.ts";`);

    // ── SyntaxKind union aliases from schema ──
    const kindUnions = api.kindAliases();
    for (const { name, members } of kindUnions) {
        const parts2 = members.map(m => {
            // If it references another union, use the union name directly
            if (api.hasKindAlias(m)) return m;
            return `SyntaxKind.${m}`;
        });
        parts.push(`export type ${name} = ${parts2.join(" | ")};`);
    }

    // ── Base interfaces from schema ──
    parts.push("");
    for (const base of api.bases()) {
        if (goOnlyBases.has(base.key)) continue;
        const name = baseTsName(base);
        const extendsClause = resolveBaseExtends(base);
        const brandProp = base.brand ? `\n    readonly ${base.brand}: any;` : "";
        const fields = generateBaseFields(base);
        parts.push(`export interface ${name} extends ${extendsClause} {${brandProp}${fields}\n}`);
    }

    // ── Concrete node interfaces from schema ──
    parts.push("");
    for (const node of api.nodes()) {
        if (node.handWritten) continue;
        if (isVariantNode(node)) continue; // handled as variant interfaces below

        const interfaceName = node.name;
        const extendsClause = deriveNodeTsExtends(node);

        // Generic type parameters
        let typeParamStr = "";
        if (node.typeParameters.length > 0) {
            const tps = node.typeParameters.map(tp => {
                let s = tp.name + " extends " + tp.constraint;
                if (tp.default) s += " = " + tp.default;
                return s;
            });
            typeParamStr = `<${tps.join(", ")}>`;
        }

        // Kind line: use type param name if available, otherwise SyntaxKind constant
        const kindLine = `\n    readonly kind: ${node.kindType.formatTypeScript()};`;

        let memberLines = "";
        for (const m of tsInterfaceMembers(node)) {
            if (m.rawType === "SyntaxKind" && m.name === "SyntaxKind") continue;
            const propName = api.uncapitalize(m.name);
            const propType = m.type.formatTypeScript();
            const opt = m.optional ? "?" : "";
            memberLines += `\n    readonly ${propName}${opt}: ${propType};`;
        }

        parts.push(`export interface ${interfaceName}${typeParamStr} extends ${extendsClause} {${kindLine}${memberLines}\n}`);
    }

    // ── Union types from schema ──
    parts.push("");
    for (const alias of api.nodeAliases()) {
        if (alias.isUnion) {
            const members = alias.unionMemberTypes.map(type => {
                if (type.baseKind() === "kind") {
                    // SyntaxKind -> Node
                    debugger;
                }
                return type.formatTypeScript();
            }).join(" | ");
            if (!members) continue;
            parts.push(`export type ${alias.name} = ${members};`);
        }
        else if (alias.base) {
            parts.push(`export type ${alias.name} = ${baseTsName(alias.base)};`);
        }
    }

    // ── Variant interfaces (from multi-kind nodes with enum Kind) ──
    parts.push("");
    for (const v of tsVariants) {
        const kindLine = `\n    readonly kind: SyntaxKind.${v.syntaxKind};`;
        let memberLines = "";
        if (v.members) {
            for (const m of v.members) {
                // For interfaces, skip inherited members (they come from the base type)
                if (isInheritedFromTsBase(m) && !m.hasTypeScriptOverride()) continue;
                const propName = api.uncapitalize(m.name);
                const propType = m.type.formatTypeScript();
                const opt = m.optional ? "?" : "";
                memberLines += `\n    readonly ${propName}${opt}: ${propType};`;
            }
        }
        parts.push(`export interface ${v.tsName} extends ${v.tsExtends} {${kindLine}${memberLines}\n}`);
    }

    // ── Union type aliases for multi-kind nodes ──
    for (const node of api.nodes()) {
        if (!isVariantNode(node)) continue;
        const kindValues = node.kindTypes().map(kind => kind.name);
        parts.push(`export type ${node.name} = ${kindValues.join(" | ")};`);
    }

    // ── Instantiation aliases for generic nodes ──
    for (const node of api.nodes()) {
        if (node.instantiationAliases.length === 0) continue;
        const interfaceName = node.name;
        for (const { name: aliasName, typeArg } of node.instantiationAliases) {
            // If the type arg is a kind union name, use it directly; otherwise prefix with SyntaxKind.
            const arg = api.hasKindAlias(typeArg) ? typeArg : `SyntaxKind.${typeArg}`;
            parts.push(`export type ${aliasName} = ${interfaceName}<${arg}>;`);
        }
    }

    // ── NodeList type aliases ──
    for (const listAlias of api.listAliases()) {
        parts.push(`export type ${listAlias.name} = NodeArray<${listAlias.elementTypeName}>;`);
    }

    return parts.join(eol);
}

// ────────────────────────────────────────────────────────────────────────────
// Code generation: factory.generated.ts
// ────────────────────────────────────────────────────────────────────────────

function generateFactory(): string {
    const out: string[] = [];
    const importTypes = new Set<string>();

    // Collect all factory-generatable schema nodes
    const concreteFactoryNodes = factoryNodes();

    // ── Collect property names for getters ──
    // Exclude names that conflict with NodeObject's own properties
    const nodeObjectOwnProps = new Set(["kind", "flags", "pos", "end", "parent", "_data"]);
    const getterNames = new Set<string>();
    for (const node of api.nodes()) {
        for (const m of tsMembers(node)) {
            const name = api.uncapitalize(m.name);
            if (!nodeObjectOwnProps.has(name)) getterNames.add(name);
        }
    }
    // Add variant property names
    for (const v of tsVariants) {
        for (const m of v.members || []) {
            const name = api.uncapitalize(m.name);
            if (!nodeObjectOwnProps.has(name)) getterNames.add(name);
        }
    }
    // Extra getters for hand-written nodes (SourceFile) whose data properties
    // aren't in the schema but are set by hand-written factory functions.
    for (
        const name of [
            "fileName",
            "path",
            "languageVariant",
            "scriptKind",
            "isDeclarationFile",
            "referencedFiles",
            "typeReferenceDirectives",
            "libReferenceDirectives",
            "imports",
            "moduleAugmentations",
            "ambientModuleNames",
            "externalModuleIndicator",
            "tokenCache",
        ]
    ) {
        getterNames.add(name);
    }

    // ── Collect all types referenced in factory ──
    function addType(t: string) {
        // Extract base type names from complex types
        const stripped = t.replace(/readonly\s+/g, "").replace(/\[\]/g, "")
            .replace(/NodeArray<(.+)>/g, "$1").replace(/\s*\|\s*/g, "|");
        for (const part of stripped.split("|")) {
            const clean = part.trim();
            if (
                clean && clean !== "undefined" && clean !== "boolean" && clean !== "string"
                && clean !== "any"
                && clean !== "number" && clean !== "true" && !clean.startsWith("SyntaxKind.")
            ) {
                importTypes.add(clean);
            }
        }
    }

    // Pre-collect types from factory nodes
    for (const node of concreteFactoryNodes) {
        addType(node.name);
        const kindTypeParam = kindTypeParameter(node);
        if (kindTypeParam) addType(kindTypeParam.constraint);
        for (const m of tsMembers(node)) {
            addType(tsParamTypeFrom(m.type));
            addType(m.type.formatTypeScript());
        }
    }
    for (const v of tsVariants) {
        addType(v.tsName);
        for (const m of v.members || []) {
            addType(m.type.formatTypeScript());
        }
    }
    // Always needed
    for (const t of ["Node", "NodeArray", "KeywordTypeSyntaxKind", "Token", "SourceFile", "KeywordTypeNode", "EndOfFile", "ImportPhaseModifierSyntaxKind", "Path", "Statement"]) {
        importTypes.add(t);
    }
    // Remove enum types that are imported separately
    importTypes.delete("NodeFlags");
    importTypes.delete("SyntaxKind");
    importTypes.delete("TokenFlags");

    // ── Header ──
    out.push(`// Code generated by _scripts/generate-ts-ast.ts. DO NOT EDIT.`);
    out.push("");
    out.push(`import { NodeFlags } from "#enums/nodeFlags";`);
    out.push(`import { SyntaxKind } from "#enums/syntaxKind";`);
    out.push(`import { TokenFlags } from "#enums/tokenFlags";`);

    const sortedImports = [...importTypes].sort((a, b) => a.localeCompare(b));
    out.push(`import type {`);
    for (const t of sortedImports) {
        out.push(`    ${t},`);
    }
    out.push(`} from "./ast.ts";`);

    // Import hand-written forEachChild functions
    const handWrittenForEachChildImports: string[] = [];
    for (const node of api.nodes()) {
        if (node.handWrittenVisitor && !node.handWritten) {
            const members = tsMembers(node);
            if (members.filter(m => m.isChild()).length > 0) {
                for (const kind of node.kindTypes()) {
                    handWrittenForEachChildImports.push(`forEachChildOf${kind.name}`);
                }
            }
        }
    }
    if (handWrittenForEachChildImports.length > 0) {
        out.push(`import {`);
        for (const name of handWrittenForEachChildImports.sort((a, b) => a.localeCompare(b))) {
            out.push(`    ${name},`);
        }
        out.push(`} from "./visitor.ts";`);
    }

    out.push("");

    // ── NodeObject class ──
    const sortedGetters = [...getterNames].sort();
    out.push(`export class NodeObject {`);
    out.push(`    readonly kind: SyntaxKind;`);
    out.push(`    flags: NodeFlags = 0 as NodeFlags;`);
    out.push(`    readonly pos: number = -1;`);
    out.push(`    readonly end: number = -1;`);
    out.push(`    parent: Node = undefined!;`);
    out.push(`    _data: any;`);
    out.push(``);
    out.push(`    constructor(kind: SyntaxKind, data: any) {`);
    out.push(`        this.kind = kind;`);
    out.push(`        this._data = data;`);
    out.push(`    }`);
    out.push(``);

    // Getters
    for (const name of sortedGetters) {
        out.push(`    get ${name}(): any { return this._data?.${name}; }`);
    }
    out.push(``);

    // Methods
    out.push(`    forEachChild<T>(visitor: (node: Node) => T, visitArray?: (nodes: NodeArray<Node>) => T): T | undefined {`);
    out.push(`        const fn = forEachChildTable[this.kind];`);
    out.push(`        return fn ? fn(this._data, visitor, visitArray) : undefined;`);
    out.push(`    }`);
    out.push(``);
    out.push(`    getSourceFile(): SourceFile {`);
    out.push(`        let node: Node = this as unknown as Node;`);
    out.push(`        while (node.parent) node = node.parent;`);
    out.push(`        return node as unknown as SourceFile;`);
    out.push(`    }`);
    out.push(`}`);
    out.push(``);

    // ── Utility functions ──
    out.push(`function isNodeArray<T extends Node>(array: readonly T[]): array is NodeArray<T> {`);
    out.push(`    return "pos" in array && "end" in array;`);
    out.push(`}`);
    out.push(``);
    out.push(`export function createNodeArray<T extends Node>(elements: readonly T[], pos: number = -1, end: number = -1): NodeArray<T> {`);
    out.push(`    if (isNodeArray(elements)) return elements;`);
    out.push(`    const arr = elements.slice() as unknown as NodeArray<T> & { pos: number; end: number; };`);
    out.push(`    arr.pos = pos;`);
    out.push(`    arr.end = end;`);
    out.push(`    return arr;`);
    out.push(`}`);
    out.push(``);
    out.push(`export function cloneNode<T extends Node>(node: T): T {`);
    out.push(`    const data = cloneNodeData(node);`);
    out.push(`    const clone = new NodeObject(node.kind, data);`);
    out.push(`    (clone as any).flags = node.flags;`);
    out.push(`    (clone as any).pos = node.pos;`);
    out.push(`    (clone as any).end = node.end;`);
    out.push(`    return clone as unknown as T;`);
    out.push(`}`);
    out.push(``);

    // ── cloneNodeData ──
    out.push(`function cloneNodeData(node: Node): any {`);
    out.push(`    const n = node as any;`);
    out.push(`    switch (node.kind) {`);
    // Schema nodes
    for (const node of api.nodes()) {
        if (node.handWritten) continue;
        if (isVariantNode(node)) continue;
        const members = tsMembers(node).filter(m => !isNodeBaseProperty(m));
        if (members.length === 0) continue;
        const props = members.map(m => api.uncapitalize(m.name));
        if (props.length === 0) continue;
        const syntaxKinds = node.allKinds();
        for (const sk of syntaxKinds) {
            out.push(`        case ${sk.formatTypeScript()}:`);
        }
        const propStr = props.map(p => `${p}: n.${p}`).join(", ");
        out.push(`            return { ${propStr} };`);
    }
    // Variant nodes
    for (const v of tsVariants) {
        if (!v.members || v.members.length === 0) continue;
        const props = v.members.map(m => api.uncapitalize(m.name));
        const propStr = props.map(p => `${p}: n.${p}`).join(", ");
        out.push(`        case SyntaxKind.${v.syntaxKind}:`);
        out.push(`            return { ${propStr} };`);
    }
    // SourceFile is handWritten so we add its case manually
    out.push(`        case SyntaxKind.SourceFile:`);
    out.push(`            return { statements: n.statements, endOfFileToken: n.endOfFileToken, text: n.text, fileName: n.fileName, path: n.path };`);
    out.push(`        default:`);
    out.push(`            return undefined;`);
    out.push(`    }`);
    out.push(`}`);
    out.push(``);

    // ── forEachChildTable ──
    out.push(`type ForEachChildFunction = <T>(data: any, cbNode: (node: Node) => T, cbNodes: ((nodes: NodeArray<Node>) => T) | undefined) => T | undefined;`);
    out.push(``);
    out.push(`const forEachChildTable: Record<number, ForEachChildFunction> = {`);
    // Schema nodes
    for (const node of api.nodes()) {
        if (node.handWritten) continue;
        if (isVariantNode(node)) continue;
        const members = tsMembers(node);
        const childMembers = members.filter(m => m.isChild());
        if (childMembers.length === 0) continue;
        const syntaxKinds = node.allKinds();
        if (node.handWrittenVisitor) {
            for (const sk of syntaxKinds) {
                out.push(`    [${sk.formatTypeScript()}]: forEachChildOf${node.name},`);
            }
            continue;
        }
        const visits = childMembers.map(m => {
            const propName = api.uncapitalize(m.name);
            const listKind = m.listKind;
            if (listKind) {
                return `visitNodes(cbNode, cbNodes, data.${propName})`;
            }
            return `visitNode(cbNode, data.${propName})`;
        });
        const body = visits.join(" ||\n        ");
        for (const sk of syntaxKinds) {
            out.push(`    [${sk.formatTypeScript()}]: (data, cbNode, cbNodes) =>`);
            out.push(`        ${body},`);
        }
    }
    // Variant nodes
    for (const v of tsVariants) {
        if (!v.members) continue;
        const childMembers = v.members.filter(m => m.type.baseKind() === "node" || m.type.baseKind() === "list");
        if (childMembers.length === 0) continue;
        if (v.handWrittenVisitor) {
            out.push(`    [SyntaxKind.${v.syntaxKind}]: forEachChildOf${v.tsName},`);
            continue;
        }
        const visits = childMembers.map(m => {
            const propName = api.uncapitalize(m.name);
            if (m.listKind) return `visitNodes(cbNode, cbNodes, data.${propName})`;
            return `visitNode(cbNode, data.${propName})`;
        });
        const body = visits.join(" ||\n        ");
        out.push(`    [SyntaxKind.${v.syntaxKind}]: (data, cbNode, cbNodes) =>`);
        out.push(`        ${body},`);
    }
    // SourceFile is handWritten so we add its forEachChild entry manually
    out.push(`    [SyntaxKind.SourceFile]: (data, cbNode, cbNodes) =>`);
    out.push(`        visitNodes(cbNode, cbNodes, data.statements) ||`);
    out.push(`        visitNode(cbNode, data.endOfFileToken),`);
    out.push(`};`);
    out.push(``);

    // ── visitNode / visitNodes ──
    out.push(`function visitNode<T>(cbNode: (node: Node) => T, node: Node | undefined): T | undefined {`);
    out.push(`    return node ? cbNode(node) : undefined;`);
    out.push(`}`);
    out.push(``);
    out.push(`function visitNodes<T>(cbNode: (node: Node) => T, cbNodes: ((nodes: NodeArray<Node>) => T) | undefined, nodes: NodeArray<Node> | undefined): T | undefined {`);
    out.push(`    if (!nodes) return undefined;`);
    out.push(`    if (cbNodes) return cbNodes(nodes);`);
    out.push(`    for (const node of nodes) {`);
    out.push(`        const result = cbNode(node);`);
    out.push(`        if (result) return result;`);
    out.push(`    }`);
    out.push(`    return undefined;`);
    out.push(`}`);
    out.push(``);

    // ── Create functions (schema nodes) ──
    const createNames: string[] = [];
    for (const node of concreteFactoryNodes) {
        const iface = node.name;
        const members = factoryMembers(node);
        const funcName = `create${iface}`;
        createNames.push(funcName);
        const kindTypeParam = kindTypeParameter(node);

        // Build params
        const paramParts: string[] = [];
        if (kindTypeParam) {
            paramParts.push(`kind: ${kindTypeParam.name}`);
        }

        // First pass: determine which members are "required" (cannot be omitted).
        // A member is required if it is not optional and not a bool.
        const isRequired = members.map(m => {
            if (m.optional) return false;
            const mt = m.type;
            if (!m.isChild() && mt.kind === "primitive" && mt.name === "bool") return false;
            return true;
        });

        // Find the index of the last required member.
        let lastRequiredIdx = -1;
        for (let i = members.length - 1; i >= 0; i--) {
            if (isRequired[i]) {
                lastRequiredIdx = i;
                break;
            }
        }

        for (let mi = 0; mi < members.length; mi++) {
            const m = members[mi];
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            const paramType = tsParamTypeFrom(m.type);
            const memberType = m.type;
            const isBool = !m.isChild() && memberType.kind === "primitive" && memberType.name === "bool";

            if (isBool) {
                if (mi < lastRequiredIdx) {
                    // Required params follow — use default value instead of optional
                    paramParts.push(`${paramName}: ${paramType} = false`);
                }
                else {
                    paramParts.push(`${paramName}?: ${paramType}`);
                }
            }
            else if (m.optional) {
                if (mi < lastRequiredIdx) {
                    // Required params follow — cannot use ? syntax
                    paramParts.push(`${paramName}: ${paramType} | undefined`);
                }
                else {
                    paramParts.push(`${paramName}?: ${paramType}`);
                }
            }
            else {
                paramParts.push(`${paramName}: ${paramType}`);
            }
        }

        // Build data object (includes ALL tsMembers, not just factory params)
        const allMembers = tsMembers(node);
        const dataParts: string[] = [];
        const nodeProps: { propName: string; paramName: string; }[] = [];
        for (const m of allMembers) {
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            const listKind = m.listKind;
            const isParam = members.includes(m);
            // Members inherited from NodeBase (e.g. Flags) are class-level
            // properties on NodeObject, not data members.
            if (isNodeBaseProperty(m)) {
                if (isParam) {
                    nodeProps.push({ propName, paramName });
                }
                continue;
            }
            if (listKind === "NodeList" || listKind === "ModifierList") {
                if (isParam) {
                    if (m.optional) {
                        dataParts.push(`${propName}: ${paramName} ? createNodeArray(${paramName}) : undefined`);
                    }
                    else {
                        dataParts.push(`${propName}: createNodeArray(${paramName})`);
                    }
                }
            }
            else {
                if (isParam) {
                    if (propName === paramName) {
                        dataParts.push(propName); // shorthand
                    }
                    else {
                        dataParts.push(`${propName}: ${paramName}`);
                    }
                }
            }
        }

        const paramsStr = paramParts.join(", ");
        const dataStr = dataParts.length > 0
            ? `{\n        ${dataParts.join(",\n        ")},\n    }`
            : "undefined";
        const genericParamStr = kindTypeParam
            ? `<${kindTypeParam.name} extends ${kindTypeParam.constraint}>`
            : "";
        const returnType = kindTypeParam
            ? `${iface}<${kindTypeParam.name}>`
            : iface;
        const kindExpr = kindTypeParam ? "kind" : `SyntaxKind.${node.syntaxKindName}`;

        out.push(`export function ${funcName}${genericParamStr}(${paramsStr}): ${returnType} {`);
        if (nodeProps.length > 0) {
            out.push(`    const node = new NodeObject(${kindExpr}, ${dataStr}) as unknown as ${returnType};`);
            for (const { propName, paramName } of nodeProps) {
                out.push(`    (node as any).${propName} = ${paramName};`);
            }
            out.push(`    return node;`);
        }
        else {
            out.push(`    return new NodeObject(${kindExpr}, ${dataStr}) as unknown as ${returnType};`);
        }
        out.push(`}`);
        out.push(``);
    }

    // ── Create functions (variant nodes) ──
    for (const v of tsVariants) {
        const funcName = `create${v.tsName}`;
        createNames.push(funcName);
        if (!v.members || v.members.length === 0) {
            out.push(`export function ${funcName}(): ${v.tsName} {`);
            out.push(`    return new NodeObject(SyntaxKind.${v.syntaxKind}, undefined) as unknown as ${v.tsName};`);
            out.push(`}`);
        }
        else {
            const paramParts: string[] = [];
            const dataParts: string[] = [];
            for (const m of v.members) {
                const propName = api.uncapitalize(m.name);
                const paramName = tsParamName(propName);
                const paramType = tsParamTypeFrom(m.type);
                if (m.optional) {
                    paramParts.push(`${paramName}: ${paramType} | undefined`);
                }
                else {
                    paramParts.push(`${paramName}: ${paramType}`);
                }
                if (m.listKind === "NodeList") {
                    if (m.optional) {
                        dataParts.push(`${propName}: ${paramName} ? createNodeArray(${paramName}) : undefined`);
                    }
                    else {
                        dataParts.push(`${propName}: createNodeArray(${paramName})`);
                    }
                }
                else if (propName === paramName) {
                    dataParts.push(propName);
                }
                else {
                    dataParts.push(`${propName}: ${paramName}`);
                }
            }
            const paramsStr = paramParts.join(", ");
            const dataStr = `{\n        ${dataParts.join(",\n        ")},\n    }`;
            out.push(`export function ${funcName}(${paramsStr}): ${v.tsName} {`);
            out.push(`    return new NodeObject(SyntaxKind.${v.syntaxKind}, ${dataStr}) as unknown as ${v.tsName};`);
            out.push(`}`);
        }
        out.push(``);
    }

    // ── Update functions (schema nodes) ──
    for (const node of concreteFactoryNodes) {
        const iface = node.name;
        const members = factoryMembers(node);
        // Update params: all child members
        const updateChildMembers = members.filter(m => m.isChild());
        if (updateChildMembers.length === 0) continue;

        const funcName = `update${iface}`;
        const paramParts = [`node: ${iface}`];

        // Determine which update child members are required
        const updateIsRequired = updateChildMembers.map(m => !m.optional);
        let updateLastRequiredIdx = -1;
        for (let i = updateChildMembers.length - 1; i >= 0; i--) {
            if (updateIsRequired[i]) {
                updateLastRequiredIdx = i;
                break;
            }
        }

        for (let mi = 0; mi < updateChildMembers.length; mi++) {
            const m = updateChildMembers[mi];
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            const paramType = tsParamTypeFrom(m.type);
            if (m.optional) {
                if (mi < updateLastRequiredIdx) {
                    paramParts.push(`${paramName}: ${paramType} | undefined`);
                }
                else {
                    paramParts.push(`${paramName}?: ${paramType}`);
                }
            }
            else {
                paramParts.push(`${paramName}: ${paramType}`);
            }
        }

        // Comparison
        const comparisons = updateChildMembers.map(m => {
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            return `node.${propName} !== ${paramName}`;
        });

        // Create call args (all factory members, using params for update children, node.prop for rest)
        const updateChildNames = new Set(updateChildMembers.map(m => m.name));
        const createArgs = members.map(m => {
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            if (updateChildNames.has(m.name)) return paramName;
            return `node.${propName}`;
        });

        out.push(`export function ${funcName}(${paramParts.join(", ")}): ${iface} {`);
        out.push(`    return ${comparisons.join(" || ")} ? create${iface}(${createArgs.join(", ")}) : node;`);
        out.push(`}`);
        out.push(``);
    }

    // ── Update functions (variant nodes) ──
    for (const v of tsVariants) {
        if (!v.members || v.members.length === 0) continue;
        const childMembers = v.members.filter(m => m.type.baseKind() === "node" || m.type.baseKind() === "list");
        if (childMembers.length === 0) continue;

        const paramParts = [`node: ${v.tsName}`];
        for (const m of childMembers) {
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            const paramType = tsParamTypeFrom(m.type);
            if (m.optional) {
                paramParts.push(`${paramName}: ${paramType} | undefined`);
            }
            else {
                paramParts.push(`${paramName}: ${paramType}`);
            }
        }

        const comparisons = childMembers.map(m => {
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            return `node.${propName} !== ${paramName}`;
        });

        const createArgs = (v.members || []).map(m => {
            const propName = api.uncapitalize(m.name);
            const paramName = tsParamName(propName);
            if (m.type.baseKind() !== "node" && m.type.baseKind() !== "list") return `node.${propName}`;
            return paramName;
        });

        out.push(`export function update${v.tsName}(${paramParts.join(", ")}): ${v.tsName} {`);
        out.push(`    return ${comparisons.join(" || ")} ? create${v.tsName}(${createArgs.join(", ")}) : node;`);
        out.push(`}`);
        out.push(``);
    }

    // ── createSourceFile (hand-written — SourceFile is handWritten in schema) ──
    out.push(`export function createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFile, text: string, fileName: string, path: Path): SourceFile {`);
    out.push(`    return new NodeObject(SyntaxKind.SourceFile, {`);
    out.push(`        statements: createNodeArray(statements),`);
    out.push(`        endOfFileToken,`);
    out.push(`        text,`);
    out.push(`        fileName,`);
    out.push(`        path,`);
    out.push(`    }) as unknown as SourceFile;`);
    out.push(`}`);
    out.push(``);

    // ── updateSourceFile (hand-written in schema) ──
    out.push(`export function updateSourceFile(node: SourceFile, statements: readonly Statement[], endOfFileToken: EndOfFile): SourceFile {`);
    out.push(`    return node.statements !== statements || node.endOfFileToken !== endOfFileToken`);
    out.push(`        ? createSourceFile(statements, endOfFileToken, node.text, node.fileName, node.path)`);
    out.push(`        : node;`);
    out.push(`}`);
    out.push(``);

    // Clean up
    while (out.length > 0 && out[out.length - 1] === "") out.pop();
    out.push("");

    let result = out.join("\n");
    result = result.replace(/\n/g, "\r\n");
    return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Code generation: is.ts
// ────────────────────────────────────────────────────────────────────────────

function generateIsGenerated(): string {
    const out: string[] = [];
    const importTypes = new Set<string>();

    // ── Simple is* guards from schema nodes ──
    const guards: { funcName: string; typeName: string; kindChecks: string[]; kindAliasConstraint?: string; }[] = [];

    for (const node of api.nodes()) {
        if (node.handWritten) continue;
        if (isVariantNode(node)) continue;

        const typeName = node.name;
        const funcName = `is${typeName}`;
        // If the node has a type parameter constrained to a kind alias, use the kind-level guard.
        const kindParam = node.typeParameters.find(tp => tp.constraint && api.hasKindAlias(tp.constraint));
        const kindAliasConstraint = kindParam?.constraint;
        guards.push({ funcName, typeName, kindChecks: syntaxKindChecksForNode(node), kindAliasConstraint });
        importTypes.add(typeName);
    }

    // Variant node guards
    for (const v of tsVariants) {
        const funcName = `is${v.tsName}`;
        guards.push({ funcName, typeName: v.tsName, kindChecks: [`SyntaxKind.${v.syntaxKind}`] });
        importTypes.add(v.tsName);
    }

    // Always needed
    importTypes.add("Node");

    // ── Composite guards from unions ──
    interface CompositeGuard {
        funcName: string;
        typeName: string;
        body: string;
    }
    const compositeGuards: CompositeGuard[] = [];

    // Build a map from instantiation alias name → SyntaxKind name.
    // E.g. "AbstractKeyword" → "AbstractKeyword", "TrueLiteral" → "TrueKeyword"
    const instantiationAliasToKind = new Map<string, string>();
    for (const node of api.nodes()) {
        for (const { name: aliasName, typeArg } of node.instantiationAliases) {
            // typeArg is either a SyntaxKind name or a kind alias name
            if (!api.hasKindAlias(typeArg)) {
                instantiationAliasToKind.set(aliasName, typeArg);
            }
        }
    }

    // Recursively resolve union members to SyntaxKind checks.
    // Returns null if any member cannot be resolved to concrete kinds.
    function resolveUnionKindChecks(members: readonly string[]): string[] | null {
        const checks: string[] = [];
        for (const m of members) {
            const node = api.getNode(m);
            if (node) {
                checks.push(...syntaxKindChecksForNode(node));
                continue;
            }
            const variant = tsVariants.find(v => v.tsName === m);
            if (variant) {
                checks.push(`SyntaxKind.${variant.syntaxKind}`);
                continue;
            }
            // Check if it's a Token instantiation alias (e.g. AbstractKeyword, TrueLiteral)
            const kindName = instantiationAliasToKind.get(m);
            if (kindName) {
                checks.push(`SyntaxKind.${kindName}`);
                continue;
            }
            // Recurse into sub-aliases
            const subAlias = api.nodeAliases().find(a => a.name === m);
            if (subAlias?.isUnion) {
                const sub = resolveUnionKindChecks(subAlias.unionMemberNames);
                if (sub === null) return null;
                checks.push(...sub);
                continue;
            }
            // Check if it's a kind alias (e.g. ModifierSyntaxKind) — expand to SyntaxKind checks
            if (api.hasKindAlias(m)) {
                const kindMembers = api.expandKindAliasMembers(m);
                checks.push(...kindMembers.map(k => k.formatTypeScript()));
                continue;
            }
            // Unresolvable member (e.g. Expression, Statement) — can't enumerate kinds
            return null;
        }
        return checks;
    }

    for (const alias of api.nodeAliases()) {
        if (!alias.isUnion) continue;
        const members = alias.unionMemberNames;
        if (members.length === 0) continue;

        const typeName = alias.name;
        const funcName = `is${typeName}`;
        if (guards.some(g => g.funcName === funcName)) continue;

        const kindChecksRaw = resolveUnionKindChecks(members);

        if (kindChecksRaw === null || kindChecksRaw.length === 0) {
            // Union contains unresolvable members (e.g. Expression) — skip,
            // must be hand-written in is.ts
            continue;
        }

        importTypes.add(typeName);
        const kindChecks = [...new Set(kindChecksRaw)];
        let body: string;

        // Build conditions: delegate to kind guard for kind alias members, direct checks for others
        const kindAliasMembers = members.filter(m => api.hasKindAlias(m));
        if (kindAliasMembers.length > 0) {
            // Collect direct SyntaxKind checks for non-kind-alias members
            const nonKindAliasMembers = members.filter(m => !api.hasKindAlias(m));
            const directChecks = nonKindAliasMembers.length > 0
                ? resolveUnionKindChecks(nonKindAliasMembers) ?? []
                : [];
            const conditions: string[] = [
                ...kindAliasMembers.map(m => `${kindGuardName(m)}(kind)`),
                ...[...new Set(directChecks)].map(k => `kind === ${k}`),
            ];
            body = `const kind = node.kind;\n    return ${conditions.join(" || ")};`;
        }
        else if (kindChecks.length <= 3) {
            body = `return ${kindChecks.map(k => `node.kind === ${k}`).join(" || ")};`;
        }
        else {
            body = `const kind = node.kind;\n    return ${kindChecks.map(k => `kind === ${k}`).join(" || ")};`;
        }

        compositeGuards.push({ funcName, typeName, body });
    }

    // ── Kind alias guards (SyntaxKind-level) ──
    // Generate `is<Name>(kind: SyntaxKind): kind is <Name>` for each enumerated kind alias union.
    // Range-based aliases generate `is<Name>(kind: SyntaxKind): boolean` with range checks.
    // Function names drop "Syntax" from the kind alias name: isTriviaSyntaxKind → isTriviaKind.

    interface KindAliasGuard {
        funcName: string;
        typeName: string;
        conditions: string[];
    }
    const kindAliasGuards: KindAliasGuard[] = [];
    interface RangeKindAliasGuard {
        funcName: string;
        first: string;
        last: string;
    }
    const rangeKindAliasGuards: RangeKindAliasGuard[] = [];
    for (const guard of api.kindGuards()) {
        const { guardName: funcName } = guard;
        // Skip if a node-level guard with the same name already exists
        if (guards.some(g => g.funcName === funcName)) continue;
        if (compositeGuards.some(g => g.funcName === funcName)) continue;

        if (guard.type === "range") {
            rangeKindAliasGuards.push({ funcName, first: guard.first, last: guard.last });
        }
        else {
            importTypes.add(guard.aliasName);
            const conditions = guard.members.map(m => {
                if (api.hasKindAlias(m)) return `${kindGuardName(m)}(kind)`;
                return `kind === SyntaxKind.${m}`;
            });
            kindAliasGuards.push({ funcName, typeName: guard.aliasName, conditions });
        }
    }

    // ── Token instantiation alias guards ──
    // For Token instantiation aliases like `BinaryOperatorToken = Token<BinaryOperator>`,
    // generate `is<AliasName>(node: Node): node is <AliasName>` using the kind-level guard.
    // Also generate guards for single-kind Token aliases (like EndOfFile, DotToken, etc.)
    // Token aliases whose underlying kind alias is range-based return boolean (not a type predicate).
    const rangeKindAliasNames = new Set(rangeKindAliasGuards.map(g => g.funcName));
    interface TokenAliasGuard {
        funcName: string;
        typeName: string;
        body: string;
        isRangeBased: boolean;
    }
    const tokenAliasGuards: TokenAliasGuard[] = [];
    for (const node of api.nodes()) {
        for (const { name: aliasName, typeArg } of node.instantiationAliases) {
            const funcName = `is${aliasName}`;
            // Skip if already generated
            if (guards.some(g => g.funcName === funcName)) continue;
            if (compositeGuards.some(g => g.funcName === funcName)) continue;

            if (api.hasKindAlias(typeArg)) {
                const isRangeBased = rangeKindAliasNames.has(kindGuardName(typeArg));
                if (!isRangeBased) importTypes.add(aliasName);
                // Multi-kind token alias: use the kind-level guard
                tokenAliasGuards.push({ funcName, typeName: aliasName, body: `return ${kindGuardName(typeArg)}(node.kind);`, isRangeBased });
            }
            else {
                importTypes.add(aliasName);
                // Single-kind token alias: direct SyntaxKind check
                tokenAliasGuards.push({ funcName, typeName: aliasName, body: `return node.kind === SyntaxKind.${typeArg};`, isRangeBased: false });
            }
        }
    }

    // ── Build output ──
    out.push(`// Code generated by _scripts/generate-ts-ast.ts. DO NOT EDIT.`);
    out.push(``);
    out.push(`import { SyntaxKind } from "#enums/syntaxKind";`);
    const sortedImports = [...importTypes].sort((a, b) => a.localeCompare(b));
    out.push(`import type {`);
    for (const t of sortedImports) {
        out.push(`    ${t},`);
    }
    out.push(`} from "./ast.ts";`);
    out.push(``);

    // ── Simple guards ──
    for (const g of guards) {
        out.push(`export function ${g.funcName}(node: Node): node is ${g.typeName} {`);
        if (g.kindAliasConstraint) {
            // Use the kind-level guard for nodes with a kind alias constraint
            out.push(`    return ${kindGuardName(g.kindAliasConstraint)}(node.kind);`);
        }
        else if (g.kindChecks.length === 1) {
            out.push(`    return node.kind === ${g.kindChecks[0]};`);
        }
        else {
            out.push(`    switch (node.kind) {`);
            for (const kindCheck of g.kindChecks) {
                out.push(`        case ${kindCheck}:`);
            }
            out.push(`            return true;`);
            out.push(`        default:`);
            out.push(`            return false;`);
            out.push(`    }`);
        }
        out.push(`}`);
        out.push(``);
    }

    // ── Composite guards ──
    for (const g of compositeGuards) {
        out.push(`export function ${g.funcName}(node: Node): node is ${g.typeName} {`);
        out.push(`    ${g.body}`);
        out.push(`}`);
        out.push(``);
    }

    // ── Kind alias guards ──
    for (const g of kindAliasGuards) {
        out.push(`export function ${g.funcName}(kind: SyntaxKind): kind is ${g.typeName} {`);
        if (g.conditions.length === 1) {
            out.push(`    return ${g.conditions[0]};`);
        }
        else {
            out.push(`    return ${g.conditions.join("\n        || ")};`);
        }
        out.push(`}`);
        out.push(``);
    }

    // ── Range-based kind alias guards ──
    for (const g of rangeKindAliasGuards) {
        out.push(`export function ${g.funcName}(kind: SyntaxKind): boolean {`);
        out.push(`    return kind >= SyntaxKind.${g.first} && kind <= SyntaxKind.${g.last};`);
        out.push(`}`);
        out.push(``);
    }

    // ── Token alias guards ──
    for (const g of tokenAliasGuards) {
        const returnType = g.isRangeBased ? `boolean` : `node is ${g.typeName}`;
        out.push(`export function ${g.funcName}(node: Node): ${returnType} {`);
        out.push(`    ${g.body}`);
        out.push(`}`);
        out.push(``);
    }

    while (out.length > 0 && out[out.length - 1] === "") out.pop();
    out.push("");

    let result = out.join("\n");
    result = result.replace(/\n/g, "\r\n");
    return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Code generation: visitor.generated.ts
// ────────────────────────────────────────────────────────────────────────────

function generateVisitor(): string {
    const out: string[] = [];
    const entries = visitorEntries();
    const typeImports = new Set(["Node", "NodeArray"]);
    const factoryImports = new Set(["createNodeArray"]);
    const isImports = new Set<string>();
    const handWrittenImports = new Set<string>();

    for (const entry of entries) {
        typeImports.add(entry.tsName);
        if (entry.handWrittenVisitor) {
            handWrittenImports.add(`visitEachChildOf${entry.tsName}`);
        }
        else {
            factoryImports.add(entry.updateName);
        }
        for (const member of entry.members) {
            const { guardName } = visitorVisitExpression(member);
            if (guardName) isImports.add(guardName);
        }
    }

    out.push(`// Code generated by _scripts/generate-ts-ast.ts. DO NOT EDIT.`);
    out.push("");
    out.push(`import { SyntaxKind } from "#enums/syntaxKind";`);
    out.push(`import type {`);
    for (const typeName of [...typeImports].sort((a, b) => a.localeCompare(b))) {
        out.push(`    ${typeName},`);
    }
    out.push(`} from "./ast.ts";`);
    out.push(`import {`);
    for (const name of [...factoryImports].sort((a, b) => a.localeCompare(b))) {
        out.push(`    ${name},`);
    }
    out.push(`} from "./factory.generated.ts";`);
    out.push(`import {`);
    for (const name of [...isImports].sort((a, b) => a.localeCompare(b))) {
        out.push(`    ${name},`);
    }
    out.push(`} from "./is.ts";`);
    if (handWrittenImports.size > 0) {
        out.push(`import {`);
        for (const name of [...handWrittenImports].sort((a, b) => a.localeCompare(b))) {
            out.push(`    ${name},`);
        }
        out.push(`} from "./visitor.ts";`);
    }
    out.push("");
    out.push(`/**`);
    out.push(` * A callback that receives a node and returns a visited node (or undefined to remove it).`);
    out.push(` */`);
    out.push(`export type Visitor = (node: Node) => Node | undefined;`);
    out.push("");
    out.push(`/**`);
    out.push(` * Visits a Node using the supplied visitor, possibly returning a new Node in its place.`);
    out.push(` *`);
    out.push(` * - If the input node is undefined, then the output is undefined.`);
    out.push(` * - If the visitor returns undefined, then the output is undefined.`);
    out.push(` * - If the output node is not undefined, then it will satisfy the test function.`);
    out.push(` * - In order to obtain a return type that is more specific than \`Node\`, a test`);
    out.push(` *   function must be provided, and that function must be a type predicate.`);
    out.push(` *`);
    out.push(` * @param node The Node to visit.`);
    out.push(` * @param visitor The callback used to visit the Node.`);
    out.push(` * @param test A callback to execute to verify the Node is valid.`);
    out.push(` */`);
    out.push(`export function visitNode<TIn extends Node | undefined, TOut extends Node>(`);
    out.push(`    node: TIn,`);
    out.push(`    visitor: Visitor,`);
    out.push(`    test: (node: Node) => node is TOut,`);
    out.push(`): TOut | (TIn & undefined);`);
    out.push(`/**`);
    out.push(` * Visits a Node using the supplied visitor, possibly returning a new Node in its place.`);
    out.push(` *`);
    out.push(` * - If the input node is undefined, then the output is undefined.`);
    out.push(` * - If the visitor returns undefined, then the output is undefined.`);
    out.push(` *`);
    out.push(` * @param node The Node to visit.`);
    out.push(` * @param visitor The callback used to visit the Node.`);
    out.push(` * @param test An optional callback to execute to verify the Node is valid.`);
    out.push(` */`);
    out.push(`export function visitNode<TIn extends Node | undefined>(`);
    out.push(`    node: TIn,`);
    out.push(`    visitor: Visitor,`);
    out.push(`    test?: (node: Node) => boolean,`);
    out.push(`): Node | (TIn & undefined);`);
    out.push(`export function visitNode(node: Node | undefined, visitor: Visitor, test?: (node: Node) => boolean): Node | undefined {`);
    out.push(`    if (node === undefined) return undefined;`);
    out.push(`    const visited = visitor(node);`);
    out.push(`    if (visited !== undefined && test !== undefined && !test(visited)) {`);
    out.push(`        throw new Error("Visited node failed test assertion.");`);
    out.push(`    }`);
    out.push(`    return visited;`);
    out.push(`}`);
    out.push("");
    out.push(`/**`);
    out.push(` * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.`);
    out.push(` *`);
    out.push(` * - If the input node array is undefined, the output is undefined.`);
    out.push(` * - If the visitor returns undefined for a node, that node is dropped from the result.`);
    out.push(` */`);
    out.push(`export function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor): NodeArray<T>;`);
    out.push(`export function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor): NodeArray<T> | undefined;`);
    out.push(`export function visitNodes(nodes: NodeArray<Node> | undefined, visitor: Visitor): NodeArray<Node> | undefined {`);
    out.push(`    if (nodes === undefined) return undefined;`);
    out.push(`    const updated = visitNodesArray(nodes, visitor);`);
    out.push(`    if (updated === nodes) {`);
    out.push(`        return nodes;`);
    out.push(`    }`);
    out.push(`    return createNodeArray(updated, nodes.pos, nodes.end);`);
    out.push(`}`);
    out.push("");
    out.push(`export function visitNodesArray<T extends Node>(nodes: readonly T[], visitor: Visitor): readonly T[];`);
    out.push(`export function visitNodesArray<T extends Node>(nodes: readonly T[] | undefined, visitor: Visitor): readonly T[] | undefined;`);
    out.push(`export function visitNodesArray(nodes: readonly Node[] | undefined, visitor: Visitor): readonly Node[] | undefined {`);
    out.push(`    if (nodes === undefined) return undefined;`);
    out.push(`    let updated: Node[] | undefined;`);
    out.push(`    for (let i = 0; i < nodes.length; i++) {`);
    out.push(`        const node = nodes[i];`);
    out.push(`        const visited = visitor(node);`);
    out.push(`        if (updated) {`);
    out.push(`            if (visited) updated.push(visited);`);
    out.push(`        }`);
    out.push(`        else if (visited !== node) {`);
    out.push(`            updated = [];`);
    out.push(`            for (let j = 0; j < i; j++) updated.push(nodes[j]);`);
    out.push(`            if (visited) updated.push(visited);`);
    out.push(`        }`);
    out.push(`    }`);
    out.push(`    return updated ?? nodes;`);
    out.push(`}`);
    out.push("");
    out.push(`/**`);
    out.push(` * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.`);
    out.push(` *`);
    out.push(` * @param node The Node whose children will be visited.`);
    out.push(` * @param visitor The callback used to visit each child.`);
    out.push(` * @returns The original node if no children changed, or a new node with visited children.`);
    out.push(` */`);
    out.push(`export function visitEachChild<T extends Node>(node: T, visitor: Visitor): T;`);
    out.push(`export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor): T | undefined;`);
    out.push(`export function visitEachChild(node: Node | undefined, visitor: Visitor): Node | undefined {`);
    out.push(`    if (node === undefined) return undefined;`);
    out.push(`    const fn = visitEachChildTable[node.kind];`);
    out.push(`    return fn ? fn(node, visitor) : node;`);
    out.push(`}`);
    out.push("");
    out.push(`type VisitEachChildFunction = (node: any, visitor: Visitor) => Node;`);
    out.push("");
    out.push(`const visitEachChildTable: Record<number, VisitEachChildFunction> = {`);
    for (const entry of entries) {
        if (entry.handWrittenVisitor) {
            out.push(`    [SyntaxKind.${entry.syntaxKind}]: visitEachChildOf${entry.tsName},`);
        }
        else {
            out.push(`    [SyntaxKind.${entry.syntaxKind}]: (node: ${entry.tsName}, visitor: Visitor): ${entry.tsName} => {`);
            const argNames: string[] = [];
            for (const member of entry.members) {
                const propName = api.uncapitalize(member.name);
                const localName = `_${propName}`;
                const { expression } = visitorVisitExpression(member);
                out.push(`        const ${localName} = ${expression};`);
                argNames.push(localName);
            }
            out.push(`        return ${entry.updateName}(node, ${argNames.join(", ")});`);
            out.push(`    },`);
        }
    }
    out.push(`};`);
    out.push("");
    while (out.length > 0 && out[out.length - 1] === "") out.pop();
    out.push("");

    let result = out.join("\n");
    result = result.replace(/\n/g, "\r\n");
    return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

function writeAndFormat(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);
    execaSync("dprint", ["fmt", filePath], { stdio: "inherit", cwd: ROOT });
    console.log(`Generated ${filePath}`);
}

export default function main() {
    console.log("Generating TS AST code...");

    const factoryPath = path.join(ROOT, "_packages/ast/src/factory.generated.ts");
    const isGenPath = path.join(ROOT, "_packages/ast/src/is.generated.ts");
    const astGenPath = path.join(ROOT, "_packages/ast/src/ast.generated.ts");
    const visitorPath = path.join(ROOT, "_packages/ast/src/visitor.generated.ts");

    writeAndFormat(astGenPath, generateAstGenerated());
    writeAndFormat(factoryPath, generateFactory());
    writeAndFormat(isGenPath, generateIsGenerated());
    writeAndFormat(visitorPath, generateVisitor());
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}
