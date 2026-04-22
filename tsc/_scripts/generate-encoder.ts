/**
 * Encoder/decoder code generator: reads _scripts/ast.json and produces binary
 * encoding/decoding code for Go and TypeScript.
 *
 * Usage: node --experimental-strip-types _scripts/generate-encoder.ts
 *
 * Generates:
 *   - internal/api/encoder/encoder_generated.go
 *   - internal/api/encoder/decoder_generated.go
 *   - _packages/native-preview/src/api/node/protocol.generated.ts
 */

import { execaSync } from "execa";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import type {
    KindType,
    MemberInfo,
    NodeType,
} from "./schema.ts";
import { api } from "./schema.ts";

const ROOT = path.resolve(import.meta.dirname!, "..");

// ═══════════════════════════════════════════════════════════════════════════
// Code writer
// ═══════════════════════════════════════════════════════════════════════════

class CodeWriter {
    private lines: string[] = [];
    private indent = 0;
    private indentStr: string;

    constructor(indentStr = "\t") {
        this.indentStr = indentStr;
    }

    write(line = "") {
        if (line === "") this.lines.push("");
        else this.lines.push(this.indentStr.repeat(this.indent) + line);
    }

    push() {
        this.indent++;
    }
    pop() {
        this.indent--;
    }

    toString(): string {
        return this.lines.join("\n");
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// Node classification
// ═══════════════════════════════════════════════════════════════════════════

/** Encoder-visible members: excludes noTS and noGo members. */
function schemaMembers(node: NodeType): MemberInfo[] {
    return node.members.filter(m => !m.noTS && !m.noGo);
}

/** Whether a member is a child that should be encoded in the binary format. */
function isEncodedChild(m: MemberInfo): boolean {
    return m.isChild() && !m.noTS && !m.noGo;
}

type ChildType = "node" | "nodeList" | "rawNodeList" | "modifierList";

/** Determine the child type for an encoded child member. */
function childType(m: MemberInfo): ChildType {
    if (m.listKind === "ModifierList") return "modifierList";
    if (m.listKind === "NodeList") return "nodeList";
    if (m.type.baseKind() === "list" && m.listKind === "raw") return "rawNodeList";
    return "node";
}

// ═══════════════════════════════════════════════════════════════════════════
// Common data analysis
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Returns true if the member is a NodeFlags member. NodeFlags are already
 * stored verbatim in every node's flags field, so they do not need to be
 * redundantly encoded in the commonData bits.
 */
function isNodeFlagsMember(m: MemberInfo): boolean {
    const dt = m.declaredType;
    return (dt.kind === "primitive" && dt.name === "NodeFlags") ||
        (!!m.bitmask && m.bitmask.startsWith("NodeFlags"));
}

/** Returns the bool members that can be auto-encoded in the commonData (1 bit each). */
function getAutoBoolBits(node: NodeType): MemberInfo[] {
    // If any non-auto-encodable data exists, all data encoding is hand-written (including bools).
    if (needsHandWrittenCommonData(node)) return [];
    const members = schemaMembers(node);
    return members.filter(m => {
        if (m.isChild() || m.isKindParam()) return false;
        const dt = m.declaredType;
        return dt.kind === "primitive" && dt.name === "bool";
    });
}

/** Returns the SyntaxKind union members that can be auto-encoded. */
function getAutoUnionBits(node: NodeType): MemberInfo[] {
    if (needsHandWrittenCommonData(node)) return [];
    const members = schemaMembers(node);
    return members.filter(m => {
        if (m.isChild() || m.isKindParam()) return false;
        return isSyntaxKindUnion(m);
    });
}

/** Check if a member's type is a union of SyntaxKind values (auto-encodable). */
function isSyntaxKindUnion(m: MemberInfo): boolean {
    const dt = resolveUnion(m.declaredType);
    if (!dt || dt.kind !== "union") return false;
    return dt.types.every(t => t.kind === "kind");
}

/** Resolve through aliases to find an underlying union type, if any. */
function resolveUnion(dt: import("./schema.ts").Type): import("./schema.ts").Type | undefined {
    if (dt.kind === "union") return dt;
    if (dt.kind === "alias") return resolveUnion(dt.resolved);
    return undefined;
}

/** Number of bits needed to encode a SyntaxKind union member. */
function unionBitWidth(m: MemberInfo): number {
    const dt = resolveUnion(m.declaredType);
    if (!dt || dt.kind !== "union") return 0;
    // Optional unions need an extra index for "absent" (index 0 = absent)
    const count = m.optional ? dt.types.length + 1 : dt.types.length;
    return Math.ceil(Math.log2(count));
}

/**
 * Returns true if the node has non-bool, non-string data members whose encoding
 * format cannot be automatically inferred. Such nodes delegate their entire
 * commonData encoding/decoding to hand-written functions.
 *
 * SyntaxKind union members are auto-encodable and do NOT require hand-written functions.
 */
function needsHandWrittenCommonData(node: NodeType): boolean {
    if (node.handWritten) return false; // extended data nodes handle everything
    const members = schemaMembers(node);
    return members.some(m => {
        if (m.isChild() || m.isKindParam()) return false;
        const dt = m.declaredType;
        if (dt.kind === "primitive" && dt.name === "bool") return false;
        if (dt.kind === "primitive" && dt.name === "string") return false;
        if (isSyntaxKindUnion(m)) return false;
        if (isNodeFlagsMember(m)) return false;
        return true;
    });
}

/**
 * Returns all data members (non-child, non-kindParam, non-string) for a node
 * that needs hand-written commonData. Includes bools, since the hand-written
 * function controls the entire 6-bit layout.
 */
function getHandWrittenDataMembers(node: NodeType): MemberInfo[] {
    const members = schemaMembers(node);
    return members.filter(m => {
        if (m.isChild() || m.isKindParam()) return false;
        const dt = m.declaredType;
        if (dt.kind === "primitive" && dt.name === "string") return false;
        if (isNodeFlagsMember(m)) return false;
        return true;
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// Data type classification
// ═══════════════════════════════════════════════════════════════════════════

type DataType = "string" | "children" | "extended";

function classifyDataType(node: NodeType): DataType {
    if (node.handWritten) return "extended";
    const members = schemaMembers(node);
    const stringMembers = members.filter(m =>
        !m.isChild() && !m.isKindParam() &&
        m.declaredType.kind === "primitive" && m.declaredType.name === "string"
    );
    if (stringMembers.length > 1) return "extended";
    if (stringMembers.length === 1) {
        // If the node also has non-bool data members, TokenFlags etc. won't fit in
        // 6 common data bits → must use extended data.
        if (needsHandWrittenCommonData(node)) return "extended";
        return "string";
    }
    return "children";
}

// ═══════════════════════════════════════════════════════════════════════════
// Go factory call helpers
// ═══════════════════════════════════════════════════════════════════════════

/** Get all SyntaxKind Go constant names for a node (prefixed with `ast.`). */
function getGoKinds(node: NodeType): string[] {
    return node.allKinds().map(k => `ast.${k.formatGoConstant()}`);
}

/** Get all SyntaxKind names for a node in TS (without prefix). */
function getTSKinds(node: NodeType): string[] {
    return node.allKinds().map(k => k.name);
}

/** Get the Go factory method name (e.g., "NewIfStatement"). */
function goFactoryName(node: NodeType): string {
    return `New${node.name}`;
}

/** Get the Go "As*" cast method name (e.g., "AsIfStatement"). */
function goCastName(node: NodeType): string {
    return `As${node.name}`;
}

/** Get the Go param name, avoiding Go keywords. */
function goParamName(m: MemberInfo): string {
    return m.goParamName();
}

/** Get the Go accessor for a member on a cast struct (e.g., "n.IsTypeOnly", "n.Name()"). */
function goFieldAccess(m: MemberInfo): string {
    if (m.private) return `n.${api.capitalize(m.name)}()`;
    return `n.${m.name}`;
}

/** Get the default Go value for a non-encoded factory parameter. */
function goDefaultValue(m: MemberInfo): string {
    if (m.isChild()) return "nil";
    const dt = m.declaredType;
    if (dt.kind === "primitive") {
        switch (dt.name) {
            case "bool":
                return "false";
            case "int":
                return "0";
            case "string":
                return `""`;
            case "NodeFlags":
                return "0";
            case "TokenFlags":
                return "0";
            case "ModifierFlags":
                return "0";
        }
    }
    if (dt.baseKind() === "kind") return "0";
    return "nil";
}

// ═══════════════════════════════════════════════════════════════════════════
// Encoder node info (per-node analysis)
// ═══════════════════════════════════════════════════════════════════════════

interface EncoderNodeInfo {
    node: NodeType;
    dataType: DataType;
    /** Encoded child members in visitor order. */
    childProps: MemberInfo[];
    /** Bool members auto-encoded in commonData (empty if hand-written). */
    autoBoolBits: MemberInfo[];
    /** SyntaxKind union members auto-encoded in commonData. */
    autoUnionBits: MemberInfo[];
    /** Whether commonData encoding is delegated to a hand-written function. */
    handWrittenCommonData: boolean;
    /** The text member for string nodes. */
    textMember?: MemberInfo;
    /** Whether this node has a Kind parameter in the factory. */
    kindMember?: MemberInfo;
    /** All factory parameters, including non-encoded ones. */
    factoryMembers: MemberInfo[];
}

function analyzeNode(node: NodeType): EncoderNodeInfo {
    const dataType = classifyDataType(node);
    const members = schemaMembers(node);
    const childProps = members.filter(m => isEncodedChild(m));
    const handWrittenCD = needsHandWrittenCommonData(node);
    const autoBoolBits = getAutoBoolBits(node);
    const autoUnionBits = getAutoUnionBits(node);
    const kindMember = members.find(m => m.isKindParam());
    const textMember = dataType === "string"
        ? members.find(m =>
            !m.isChild() && !m.isKindParam() &&
            m.declaredType.kind === "primitive" && m.declaredType.name === "string"
        )
        : undefined;
    // Factory members include all non-noFactory members (even noTS ones),
    // since the factory signature is determined by generate-go-ast.ts.
    const factoryMembers = node.members.filter(m => !m.noFactory);

    return {
        node,
        dataType,
        childProps,
        autoBoolBits,
        autoUnionBits,
        handWrittenCommonData: handWrittenCD,
        textMember,
        kindMember,
        factoryMembers,
    };
}

/**
 * Compute the bit layout for all auto-encoded data members of a node.
 * Bools get 1 bit each, SyntaxKind unions get ceil(log2(N)) bits.
 * Returns entries with the bit position (relative to bit 24) and width.
 */
function getAutoEncodedLayout(info: EncoderNodeInfo): { member: MemberInfo; bitPos: number; bitWidth: number; }[] {
    const layout: { member: MemberInfo; bitPos: number; bitWidth: number; }[] = [];
    let bitPos = 0;
    for (const m of info.autoBoolBits) {
        layout.push({ member: m, bitPos, bitWidth: 1 });
        bitPos++;
    }
    for (const m of info.autoUnionBits) {
        const width = unionBitWidth(m);
        layout.push({ member: m, bitPos, bitWidth: width });
        bitPos += width;
    }
    return layout;
}

/** Check if a node has any auto-encoded data members (bools or unions). */
function hasAutoEncodedData(info: EncoderNodeInfo): boolean {
    return info.autoBoolBits.length > 0 || info.autoUnionBits.length > 0;
}

// ═══════════════════════════════════════════════════════════════════════════
// Go Encoder Generation
// ═══════════════════════════════════════════════════════════════════════════

function generateGoEncoder(): string {
    const w = new CodeWriter();
    w.write("// Code generated by _scripts/generate-encoder.ts. DO NOT EDIT.");
    w.write("");
    w.write("package encoder");
    w.write("");
    w.write("import (");
    w.push();
    w.write('"fmt"');
    w.write("");
    w.write('"github.com/microsoft/typescript-go/internal/ast"');
    w.pop();
    w.write(")");
    w.write("");

    generateGoGetNodeDataType(w);
    generateGoGetChildrenPropertyMask(w);
    generateGoGetNodeCommonData(w);
    generateGoRecordNodeStrings(w);
    generateGoRecordExtendedData(w);

    return w.toString();
}

function generateGoGetNodeDataType(w: CodeWriter) {
    w.write("func getNodeDataType(node *ast.Node) uint32 {");
    w.push();
    w.write("switch node.Kind {");

    const stringKinds: string[] = [];
    const extendedKinds: string[] = [];

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        const kinds = getGoKinds(node);

        if (info.dataType === "string") {
            stringKinds.push(...kinds);
        }
        else if (info.dataType === "extended") {
            extendedKinds.push(...kinds);
        }
    }

    if (stringKinds.length > 0) {
        w.write(`case ${stringKinds.join(",\n\t\t")}:`);
        w.push();
        w.write("return NodeDataTypeString");
        w.pop();
    }
    if (extendedKinds.length > 0) {
        w.write(`case ${extendedKinds.join(",\n\t\t")}:`);
        w.push();
        w.write("return NodeDataTypeExtendedData");
        w.pop();
    }

    w.write("default:");
    w.push();
    w.write("return NodeDataTypeChildren");
    w.pop();
    w.write("}");
    w.pop();
    w.write("}");
    w.write("");
}

function generateGoGetChildrenPropertyMask(w: CodeWriter) {
    w.write("func getChildrenPropertyMask(node *ast.Node) uint8 {");
    w.push();
    w.write("switch node.Kind {");

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType === "extended") continue;
        if (info.childProps.length === 0) continue;

        const kinds = getGoKinds(node);
        const castName = goCastName(node);

        w.write(`case ${kinds.join(", ")}:`);
        w.push();
        w.write(`n := node.${castName}()`);

        const parts: string[] = [];
        for (let i = 0; i < info.childProps.length; i++) {
            const m = info.childProps[i];
            const ct = childType(m);
            let check: string;
            if (ct === "modifierList") {
                check = `hasModifiers(n.Modifiers())`;
            }
            else if (ct === "nodeList") {
                check = `${goFieldAccess(m)} != nil`;
            }
            else if (ct === "rawNodeList") {
                check = `len(${goFieldAccess(m)}) > 0`;
            }
            else {
                check = `${goFieldAccess(m)} != nil`;
            }
            parts.push(`(boolToByte(${check}) << ${i})`);
        }
        w.write(`return ${parts.join(" | ")}`);
        w.pop();
    }

    w.write("default:");
    w.push();
    w.write("return 0");
    w.pop();
    w.write("}");
    w.pop();
    w.write("}");
    w.write("");
}

function generateGoGetNodeCommonData(w: CodeWriter) {
    w.write("func getNodeCommonData(node *ast.Node) uint32 {");
    w.push();
    w.write("switch node.Kind {");

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType === "extended") continue;

        if (info.handWrittenCommonData) {
            // Delegate to hand-written function for all non-bool data members.
            const kinds = getGoKinds(node);
            w.write(`case ${kinds.join(", ")}:`);
            w.push();
            w.write(`return getNodeCommonData_${node.name}(node)`);
            w.pop();
        }
        else if (hasAutoEncodedData(info)) {
            const kinds = getGoKinds(node);
            const castName = goCastName(node);
            const layout = getAutoEncodedLayout(info);

            w.write(`case ${kinds.join(", ")}:`);
            w.push();
            w.write(`n := node.${castName}()`);

            const parts: string[] = [];
            for (const { member: m, bitPos, bitWidth } of layout) {
                if (!isSyntaxKindUnion(m)) {
                    // Bool or bitmask
                    parts.push(`uint32(boolToByte(${goFieldAccess(m)})) << ${24 + bitPos}`);
                }
                else {
                    // SyntaxKind union → index-based encoding
                    const kinds = unionKindValues(m.declaredType);
                    const varName = `${goParamName(m)}Idx`;
                    w.write(`var ${varName} uint32`);
                    w.write(`switch ${goFieldAccess(m)} {`);
                    if (m.optional) {
                        // Optional: 0 = absent, 1..N = values[0]..values[N-1]
                        for (let i = 0; i < kinds.length; i++) {
                            w.write(`case ast.${kinds[i].formatGoConstant()}: ${varName} = ${i + 1}`);
                        }
                    }
                    else {
                        // Non-optional: 0 = values[0] (default), 1..N-1 = values[1]..values[N-1]
                        for (let i = 1; i < kinds.length; i++) {
                            w.write(`case ast.${kinds[i].formatGoConstant()}: ${varName} = ${i}`);
                        }
                    }
                    w.write("}");
                    parts.push(`${varName} << ${24 + bitPos}`);
                }
            }
            w.write(`return ${parts.join(" | ")}`);
            w.pop();
        }
    }

    w.write("}");
    w.write("return 0");
    w.pop();
    w.write("}");
    w.write("");
}

function generateGoRecordNodeStrings(w: CodeWriter) {
    w.write("func recordNodeStrings(node *ast.Node, strs *stringTable) uint32 {");
    w.push();
    w.write("switch node.Kind {");

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType !== "string" || !info.textMember) continue;

        const kinds = getGoKinds(node);
        const castName = goCastName(node);
        const textAccess = info.textMember.private
            ? `node.${castName}().${api.capitalize(info.textMember.name)}()`
            : `node.${castName}().${info.textMember.name}`;

        w.write(`case ${kinds.join(", ")}:`);
        w.push();
        w.write(`return strs.add(${textAccess}, node.Kind, node.Pos(), node.End())`);
        w.pop();
    }

    w.write("default:");
    w.push();
    w.write(`panic(fmt.Sprintf("Unexpected node kind %v", node.Kind))`);
    w.pop();
    w.write("}");
    w.pop();
    w.write("}");
    w.write("");
}

function generateGoRecordExtendedData(w: CodeWriter) {
    w.write("func recordExtendedData(node *ast.Node, strs *stringTable, positionMap *ast.PositionMap, extendedData *[]byte, structuredData *[]byte) uint32 {");
    w.push();
    w.write("offset := uint32(len(*extendedData))");
    w.write("switch node.Kind {");

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType !== "extended") continue;

        const kinds = getGoKinds(node);

        w.write(`case ${kinds.join(", ")}:`);
        w.push();
        w.write(`recordExtendedData_${node.name}(node, strs, positionMap, extendedData, structuredData)`);
        w.pop();
    }

    w.write("default:");
    w.push();
    w.write(`panic(fmt.Sprintf("unknown extended data node kind %v", node.Kind))`);
    w.pop();
    w.write("}");
    w.write("return offset");
    w.pop();
    w.write("}");
    w.write("");
}

// ═══════════════════════════════════════════════════════════════════════════
// Go Decoder Generation
// ═══════════════════════════════════════════════════════════════════════════

function generateGoDecoder(): string {
    const w = new CodeWriter();
    w.write("// Code generated by _scripts/generate-encoder.ts. DO NOT EDIT.");
    w.write("");
    w.write("package encoder");
    w.write("");
    w.write("import (");
    w.push();
    w.write('"fmt"');
    w.write("");
    w.write('"github.com/microsoft/typescript-go/internal/ast"');
    w.pop();
    w.write(")");
    w.write("");

    generateGoCreateStringNode(w);
    generateGoCreateExtendedNode(w);
    generateGoCreateChildrenNode(w);

    return w.toString();
}

function generateGoCreateStringNode(w: CodeWriter) {
    w.write("func (d *astDecoder) createStringNode(kind ast.Kind, data uint32, commonData uint8) (*ast.Node, error) {");
    w.push();
    w.write("strIdx := data & NodeDataStringIndexMask");
    w.write("text := d.getString(strIdx)");
    w.write("");
    w.write("switch kind {");

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType !== "string") continue;

        const kinds = getGoKinds(node);
        const factoryName = goFactoryName(node);

        w.write(`case ${kinds.join(", ")}:`);
        w.push();

        // Decode commonData
        const commonVars = emitCommonDataDecode(w, node, info);

        // Build factory args
        const args: string[] = [];
        for (const m of info.factoryMembers) {
            if (m.isKindParam()) {
                args.push("kind");
            }
            else if (m === info.textMember) {
                if (m.listKind === "raw") {
                    args.push("[]string{text}");
                }
                else {
                    args.push("text");
                }
            }
            else if (isEncodedChild(m)) {
                args.push("nil");
            }
            else {
                const v = commonVars.get(m);
                if (v) {
                    args.push(v);
                }
                else {
                    args.push(goDefaultValue(m));
                }
            }
        }

        w.write(`return d.factory.${factoryName}(${args.join(", ")}), nil`);
        w.pop();
    }

    w.write("default:");
    w.push();
    w.write(`return nil, fmt.Errorf("unknown string node kind %v", kind)`);
    w.pop();
    w.write("}");
    w.pop();
    w.write("}");
    w.write("");
}

function generateGoCreateExtendedNode(w: CodeWriter) {
    w.write("func (d *astDecoder) createExtendedNode(kind ast.Kind, data uint32, childIndices []int, commonData uint8) (*ast.Node, error) {");
    w.push();
    w.write("switch kind {");

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType !== "extended") continue;

        const kinds = getGoKinds(node);

        w.write(`case ${kinds.join(", ")}:`);
        w.push();
        // Extended data nodes call hand-written decode functions
        w.write(`return d.decodeExtendedData_${node.name}(data, childIndices, commonData)`);
        w.pop();
    }

    w.write("default:");
    w.push();
    w.write(`return nil, fmt.Errorf("unknown extended data node kind %v", kind)`);
    w.pop();
    w.write("}");
    w.pop();
    w.write("}");
    w.write("");
}

function generateGoCreateChildrenNode(w: CodeWriter) {
    w.write("func (d *astDecoder) createChildrenNode(kind ast.Kind, data uint32, childIndices []int, commonData uint8) (*ast.Node, error) {");
    w.push();
    w.write("mask := uint8(data & NodeDataChildMask)");
    w.write("");
    w.write("switch kind {");

    // Build a set of all kinds claimed by specific nodes, so that the most
    // specific node (fewest kinds) takes priority for shared kinds.
    const kindOwner = new Map<string, { node: NodeType; info: EncoderNodeInfo; totalKinds: number; }>();
    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType !== "children") continue;
        const kinds = getGoKinds(node);
        for (const k of kinds) {
            const existing = kindOwner.get(k);
            if (!existing || kinds.length < existing.totalKinds) {
                kindOwner.set(k, { node, info, totalKinds: kinds.length });
            }
        }
    }

    // Group kinds by their owning node (deconflicted).
    const nodeKinds = new Map<string, string[]>();
    for (const [kind, owner] of kindOwner) {
        const key = owner.node.name;
        if (!nodeKinds.has(key)) nodeKinds.set(key, []);
        nodeKinds.get(key)!.push(kind);
    }

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType !== "children") continue;

        const kinds = nodeKinds.get(node.name);
        if (!kinds || kinds.length === 0) continue;

        if (info.childProps.length === 0) {
            emitZeroChildDecoder(w, node, info, kinds);
        }
        else if (info.childProps.length === 1) {
            emitSingleChildDecoder(w, node, info, kinds);
        }
        else {
            emitMultiChildDecoder(w, node, info, kinds);
        }
    }

    // Default: error for unhandled kinds
    w.write("default:");
    w.push();
    w.write(`return nil, fmt.Errorf("unhandled node kind %v with %d children", kind, len(childIndices))`);
    w.pop();

    w.write("}");
    w.pop();
    w.write("}");
    w.write("");
}

// ═══════════════════════════════════════════════════════════════════════════
// Decoder helpers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Emits commonData decoding and returns a map of member → Go variable name.
 * For auto-bool nodes: decodes bools from bit positions.
 * For hand-written nodes: calls decodeNodeCommonData_<NodeName>(commonData).
 */
function emitCommonDataDecode(w: CodeWriter, node: NodeType, info: EncoderNodeInfo): Map<MemberInfo, string> {
    const vars = new Map<MemberInfo, string>();

    if (info.handWrittenCommonData) {
        const dataMembers = getHandWrittenDataMembers(node);
        if (dataMembers.length === 0) return vars;

        const varNames = dataMembers.map(m => goParamName(m));
        if (dataMembers.length === 1) {
            w.write(`${varNames[0]} := decodeNodeCommonData_${node.name}(commonData)`);
        }
        else {
            w.write(`${varNames.join(", ")} := decodeNodeCommonData_${node.name}(commonData)`);
        }
        for (let i = 0; i < dataMembers.length; i++) {
            vars.set(dataMembers[i], varNames[i]);
        }
    }
    else {
        const layout = getAutoEncodedLayout(info);
        for (const { member: m, bitPos, bitWidth } of layout) {
            const varName = goParamName(m);
            if (!isSyntaxKindUnion(m)) {
                // Bool or bitmask
                w.write(`${varName} := commonData&${1 << bitPos} != 0`);
                vars.set(m, varName);
            }
            else {
                // SyntaxKind union → index-based decoding
                const kinds = unionKindValues(m.declaredType);
                const mask = (1 << bitWidth) - 1;
                const indexExpr = bitPos === 0
                    ? `commonData & ${mask}`
                    : `(commonData >> ${bitPos}) & ${mask}`;
                if (m.optional) {
                    // Optional: 0 = absent (KindUnknown), 1..N = values[0]..values[N-1]
                    w.write(`var ${varName} ast.Kind`);
                    w.write(`switch ${indexExpr} {`);
                    for (let i = 0; i < kinds.length; i++) {
                        w.write(`case ${i + 1}: ${varName} = ast.${kinds[i].formatGoConstant()}`);
                    }
                    w.write("}");
                }
                else if (kinds.length === 2) {
                    // Non-optional 2-value: simple if
                    w.write(`${varName} := ast.${kinds[0].formatGoConstant()}`);
                    w.write(`if ${indexExpr} != 0 {`);
                    w.push();
                    w.write(`${varName} = ast.${kinds[1].formatGoConstant()}`);
                    w.pop();
                    w.write("}");
                }
                else {
                    // Non-optional N-value: switch
                    w.write(`var ${varName} ast.Kind`);
                    w.write(`switch ${indexExpr} {`);
                    for (let i = 0; i < kinds.length; i++) {
                        w.write(`case ${i}: ${varName} = ast.${kinds[i].formatGoConstant()}`);
                    }
                    w.write("}");
                }
                vars.set(m, varName);
            }
        }
    }

    return vars;
}

function emitZeroChildDecoder(w: CodeWriter, node: NodeType, info: EncoderNodeInfo, kinds: string[]) {
    const factoryName = goFactoryName(node);

    w.write(`case ${kinds.join(",\n\t\t")}:`);
    w.push();

    const commonVars = emitCommonDataDecode(w, node, info);

    const args: string[] = [];
    for (const m of info.factoryMembers) {
        if (m.isKindParam()) {
            args.push("kind");
            continue;
        }
        const v = commonVars.get(m);
        if (v) {
            args.push(v);
            continue;
        }
        args.push(goDefaultValue(m));
    }

    w.write(`return d.factory.${factoryName}(${args.join(", ")}), nil`);
    w.pop();
}

function emitSingleChildDecoder(w: CodeWriter, node: NodeType, info: EncoderNodeInfo, kinds: string[]) {
    const cp = info.childProps[0];
    const ct = childType(cp);
    const factoryName = goFactoryName(node);
    const hasCommonData = info.autoBoolBits.length > 0 || info.handWrittenCommonData;

    w.write(`case ${kinds.join(", ")}:`);
    w.push();

    // Decode commonData if needed
    const commonVars = emitCommonDataDecode(w, node, info);

    // Build factory args
    const args: string[] = [];
    for (const m of info.factoryMembers) {
        if (m.isKindParam()) {
            args.push("kind");
        }
        else if (m === cp) {
            if (ct === "rawNodeList") {
                w.write(`nodes := d.allocNodeSlice(len(childIndices))`);
                w.write("for i, ci := range childIndices {");
                w.push();
                w.write("nodes[i] = d.nodes[ci]");
                w.pop();
                w.write("}");
                args.push("nodes");
            }
            else if (ct === "nodeList") {
                if (hasCommonData) {
                    w.write("var list *ast.NodeList");
                    w.write("if len(childIndices) > 0 {");
                    w.push();
                    w.write("list = d.nodeListAt(childIndices[0])");
                    w.pop();
                    w.write("}");
                    args.push("list");
                }
                else {
                    args.push("d.singleNodeListChild(childIndices)");
                }
            }
            else if (ct === "modifierList") {
                w.write("var mods *ast.ModifierList");
                w.write("if len(childIndices) > 0 {");
                w.push();
                w.write("mods = d.modifierListAt(childIndices[0])");
                w.pop();
                w.write("}");
                args.push("mods");
            }
            else {
                args.push("d.singleChild(childIndices)");
            }
        }
        else {
            const cdVar = commonVars.get(m);
            if (cdVar) {
                args.push(cdVar);
            }
            else {
                args.push(goDefaultValue(m));
            }
        }
    }

    w.write(`return d.factory.${factoryName}(${args.join(", ")}), nil`);
    w.pop();
}

function emitMultiChildDecoder(w: CodeWriter, node: NodeType, info: EncoderNodeInfo, kinds: string[]) {
    const factoryName = goFactoryName(node);

    w.write(`case ${kinds.join(", ")}:`);
    w.push();

    // Decode commonData
    const commonVars = emitCommonDataDecode(w, node, info);

    // Child iterator
    w.write("it := newChildIter(childIndices)");

    // Decode each child from mask
    const childVars = new Map<MemberInfo, string>();
    for (let i = 0; i < info.childProps.length; i++) {
        const m = info.childProps[i];
        const ct = childType(m);
        const varName = goParamName(m);
        let decode: string;
        if (ct === "modifierList") {
            decode = `d.modifierListAt(it.nextIf(mask, ${i}))`;
        }
        else if (ct === "rawNodeList") {
            const nlVar = `${varName}NL`;
            w.write(`${nlVar} := d.nodeListAt(it.nextIf(mask, ${i}))`);
            w.write(`var ${varName} []*ast.Node`);
            w.write(`if ${nlVar} != nil {`);
            w.push();
            w.write(`${varName} = ${nlVar}.Nodes`);
            w.pop();
            w.write("}");
            childVars.set(m, varName);
            continue;
        }
        else if (ct === "nodeList") {
            decode = `d.nodeListAt(it.nextIf(mask, ${i}))`;
        }
        else {
            decode = `d.nodeAt(it.nextIf(mask, ${i}))`;
        }
        w.write(`${varName} := ${decode}`);
        childVars.set(m, varName);
    }

    // Build factory args
    const args: string[] = [];
    for (const m of info.factoryMembers) {
        if (m.isKindParam()) {
            args.push("kind");
            continue;
        }
        const childVar = childVars.get(m);
        if (childVar) {
            args.push(childVar);
            continue;
        }
        const cdVar = commonVars.get(m);
        if (cdVar) {
            args.push(cdVar);
            continue;
        }
        args.push(goDefaultValue(m));
    }

    // Handle kindAliases with separate factories
    if (node.kindAliases.length > 0 && !info.kindMember) {
        for (const alias of node.kindAliases) {
            w.write(`if kind == ast.Kind${alias} {`);
            w.push();
            w.write(`return d.factory.New${alias}(${args.slice(info.kindMember ? 1 : 0).join(", ")}), nil`);
            w.pop();
            w.write("}");
        }
    }

    w.write(`return d.factory.${factoryName}(${args.join(", ")}), nil`);
    w.pop();
}

// ═══════════════════════════════════════════════════════════════════════════
// TypeScript Protocol Generation
// ═══════════════════════════════════════════════════════════════════════════

function generateTSProtocol(): string {
    const w = new CodeWriter("    ");
    w.write("// Code generated by _scripts/generate-encoder.ts. DO NOT EDIT.");
    w.write("");
    w.write('import { SyntaxKind } from "../../ast/index.ts";');
    w.write("");

    // Complete childProperties mapping — includes all nodes with children
    // (single-child, multi-child, and extended data nodes).
    w.write("export const childProperties: Readonly<Partial<Record<SyntaxKind, readonly (string | undefined)[]>>> = {");
    w.push();

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.childProps.length === 0) continue;

        const kinds = getTSKinds(node);
        const props = info.childProps.map(m => `"${api.uncapitalize(m.name)}"`).join(", ");
        for (const kind of kinds) {
            w.write(`[SyntaxKind.${kind}]: [${props}],`);
        }
    }

    w.pop();
    w.write("};");
    w.write("");

    // singleChildNodePropertyNames mapping
    w.write("export const singleChildNodePropertyNames: Readonly<Partial<Record<SyntaxKind, string>>> = {");
    w.push();

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType === "extended") continue;
        if (info.childProps.length !== 1) continue;

        const kinds = getTSKinds(node);
        const prop = api.uncapitalize(info.childProps[0].name);

        for (const kind of kinds) {
            w.write(`[SyntaxKind.${kind}]: "${prop}",`);
        }
    }

    w.pop();
    w.write("};");
    w.write("");

    return w.toString();
}

// ═══════════════════════════════════════════════════════════════════════════
// TypeScript Encoder Generation (encoder.generated.ts)
// ═══════════════════════════════════════════════════════════════════════════

/** Get all KindType values from a SyntaxKind union type. Resolves through aliases. */
function unionKindValues(dt: import("./schema.ts").Type): import("./schema.ts").KindType[] {
    const resolved = resolveUnion(dt);
    if (!resolved || resolved.kind !== "union") return [];
    return resolved.types.filter((t): t is import("./schema.ts").KindType => t.kind === "kind");
}

function generateTSEncoder(): string {
    const w = new CodeWriter("    ");
    w.write("// Code generated by _scripts/generate-encoder.ts. DO NOT EDIT.");
    w.write("");

    // Collect needed type imports
    const typeImports = new Set<string>();
    const valueImports = new Set<string>(["SyntaxKind"]);

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType === "extended") continue;

        if (info.autoBoolBits.length > 0 || info.autoUnionBits.length > 0) {
            typeImports.add(node.name);
        }
        else if (info.handWrittenCommonData) {
            typeImports.add(node.name);
        }
    }

    // Write imports
    if (typeImports.size > 0) {
        w.write("import type {");
        w.push();
        w.write("Node,");
        for (const t of [...typeImports].sort()) {
            w.write(`${t},`);
        }
        w.pop();
        w.write('} from "../../ast/index.ts";');
    }
    w.write("import {");
    w.push();
    for (const v of [...valueImports].sort()) {
        w.write(`${v},`);
    }
    w.pop();
    w.write('} from "../../ast/index.ts";');
    w.write("import {");
    w.push();
    w.write("NODE_DATA_TYPE_CHILDREN,");
    w.write("NODE_DATA_TYPE_EXTENDED,");
    w.write("NODE_DATA_TYPE_STRING,");
    w.pop();
    w.write('} from "./protocol.ts";');
    w.write("");

    generateTSGetNodeDataType(w);
    generateTSGetNodeCommonData(w);

    return w.toString();
}

function generateTSGetNodeDataType(w: CodeWriter) {
    w.write("export function getNodeDataType(kind: SyntaxKind): number {");
    w.push();
    w.write("switch (kind) {");

    const stringKinds: string[] = [];
    const extendedKinds: string[] = [];

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        const kinds = getTSKinds(node);
        if (info.dataType === "string") {
            stringKinds.push(...kinds);
        }
        else if (info.dataType === "extended") {
            extendedKinds.push(...kinds);
        }
    }

    if (stringKinds.length > 0) {
        for (const k of stringKinds) {
            w.write(`case SyntaxKind.${k}:`);
        }
        w.push();
        w.write("return NODE_DATA_TYPE_STRING;");
        w.pop();
    }
    if (extendedKinds.length > 0) {
        for (const k of extendedKinds) {
            w.write(`case SyntaxKind.${k}:`);
        }
        w.push();
        w.write("return NODE_DATA_TYPE_EXTENDED;");
        w.pop();
    }

    w.write("default:");
    w.push();
    w.write("return NODE_DATA_TYPE_CHILDREN;");
    w.pop();
    w.write("}");
    w.pop();
    w.write("}");
    w.write("");
}

function generateTSGetNodeCommonData(w: CodeWriter) {
    w.write("export function getNodeCommonData(node: Node): number {");
    w.push();
    w.write("switch (node.kind) {");

    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType === "extended") continue;

        if (hasAutoEncodedData(info)) {
            // Auto-encoded: generate bit packing for bools and index encoding for unions
            const kinds = getTSKinds(node);
            const layout = getAutoEncodedLayout(info);
            for (const k of kinds) {
                w.write(`case SyntaxKind.${k}:`);
            }
            w.push();
            const parts: string[] = [];
            for (const { member: m, bitPos, bitWidth } of layout) {
                const propName = api.uncapitalize(m.name);
                if (!isSyntaxKindUnion(m)) {
                    // Bool
                    parts.push(`((node as ${node.name}).${propName} ? 1 : 0) << ${24 + bitPos}`);
                }
                else {
                    // SyntaxKind union → index-based encoding
                    const kinds = unionKindValues(m.declaredType);
                    if (m.optional) {
                        // Optional union: 0 = absent, 1..N = values[0]..values[N-1]
                        const cases = kinds.map((k, i) => `(node as ${node.name}).${propName} === ${k.formatTypeScript()} ? ${i + 1} : `).join("");
                        parts.push(`(${cases}0) << ${24 + bitPos}`);
                    }
                    else {
                        // Required union: index into values array
                        const cases = kinds.slice(1).map((k, i) => `(node as ${node.name}).${propName} === ${k.formatTypeScript()} ? ${i + 1} : `).join("");
                        parts.push(`(${cases}0) << ${24 + bitPos}`);
                    }
                }
            }
            w.write(`return ${parts.join(" | ")};`);
            w.pop();
        }
        else if (info.handWrittenCommonData) {
            // Hand-written: generate encoding based on member types
            const kinds = getTSKinds(node);
            const dataMembers = getHandWrittenDataMembers(node);
            if (dataMembers.length === 0) continue;

            // Skip nodes with 'any' type data members (e.g., SyntheticExpression) — they should never be encoded
            if (dataMembers.some(m => m.declaredType.kind === "primitive" && m.declaredType.name === "any")) {
                continue;
            }

            for (const k of kinds) {
                w.write(`case SyntaxKind.${k}:`);
            }
            w.push();

            emitTSCommonDataEncoding(w, node, dataMembers);

            w.pop();
        }
    }

    w.write("}");
    w.write("return 0;");
    w.pop();
    w.write("}");
    w.write("");
}

function emitTSCommonDataEncoding(w: CodeWriter, node: NodeType, dataMembers: MemberInfo[]) {
    const parts: string[] = [];
    let bitPos = 24;

    for (const m of dataMembers) {
        const propName = api.uncapitalize(m.name);
        const dt = m.declaredType;

        if (dt.kind === "primitive" && dt.name === "bool") {
            parts.push(`((node as ${node.name}).${propName} ? 1 : 0) << ${bitPos}`);
            bitPos++;
        }
        else {
            throw new Error(`Unexpected hand-written data member ${node.name}.${m.name} of type ${dt.kind}`);
        }
    }

    if (parts.length === 0) {
        w.write("return 0;");
    }
    else if (parts.length === 1) {
        w.write(`return ${parts[0]};`);
    }
    else {
        w.write("return " + parts.join(" |\n                ") + ";");
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// TypeScript Node Generation (node.ts — entire file)
// ═══════════════════════════════════════════════════════════════════════════

function generateTSNodeGenerated(): string {
    const w = new CodeWriter("    ");

    // Collect all unique child property names and their types (node vs nodeList)
    const childGetters = new Map<string, "node" | "nodeList" | "both">();
    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        for (const m of info.childProps) {
            const propName = api.uncapitalize(m.name);
            const ct = childType(m);
            const isListType = ct === "nodeList" || ct === "modifierList";
            const existing = childGetters.get(propName);
            if (!existing) {
                childGetters.set(propName, isListType ? "nodeList" : "node");
            }
            else if ((existing === "node" && isListType) || (existing === "nodeList" && !isListType)) {
                childGetters.set(propName, "both");
            }
        }
    }

    // Collect all unique auto-bool property names with their bit positions
    const boolGetters = new Map<string, number>();
    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        const layout = getAutoEncodedLayout(info);
        for (const { member: m, bitPos, bitWidth } of layout) {
            if (!isSyntaxKindUnion(m)) {
                const propName = api.uncapitalize(m.name);
                const absBitPos = 24 + bitPos;
                const existing = boolGetters.get(propName);
                if (existing !== undefined && existing !== absBitPos) {
                    throw new Error(`Bool property "${propName}" has inconsistent bit positions: ${existing} vs ${absBitPos}`);
                }
                boolGetters.set(propName, absBitPos);
            }
        }
    }

    // Collect all unique SyntaxKind union property getters:
    // Map from property name → array of { kinds, bitPos, bitWidth, values, optional }
    interface UnionGetterEntry {
        kinds: string[];
        bitPos: number;
        bitWidth: number;
        values: KindType[];
        optional: boolean;
    }
    const unionGetters = new Map<string, UnionGetterEntry[]>();
    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        const layout = getAutoEncodedLayout(info);
        for (const { member: m, bitPos, bitWidth } of layout) {
            if (isSyntaxKindUnion(m)) {
                const propName = api.uncapitalize(m.name);
                const entries = unionGetters.get(propName) || [];
                entries.push({
                    kinds: getTSKinds(node),
                    bitPos: 24 + bitPos,
                    bitWidth,
                    values: unionKindValues(m.declaredType),
                    optional: !!m.optional,
                });
                unionGetters.set(propName, entries);
            }
        }
    }

    // Collect string data property info
    const stringTextKinds: string[] = [];
    const extendedTextKinds: string[] = [];
    for (const node of api.nodes()) {
        const info = analyzeNode(node);
        if (info.dataType === "string" && info.textMember) {
            stringTextKinds.push(...getTSKinds(node));
        }
        else if (info.dataType === "extended") {
            extendedTextKinds.push(...getTSKinds(node));
        }
    }

    // Emit the file
    w.write("// Code generated by _scripts/generate-encoder.ts. DO NOT EDIT.");
    w.write("");
    emitNodeGeneratedImports(w);
    w.write("");
    emitRemoteNodeList(w);
    w.write("");
    emitRemoteNodeClassOpen(w);
    w.write("");

    // ── Generated: Boolean property getters ──
    w.write("    // ═══ Generated boolean property getters ═══");
    w.write("");
    for (const [propName, bitPos] of [...boolGetters.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        w.write(`    get ${propName}(): boolean {`);
        w.write(`        return (this.data & (1 << ${bitPos})) !== 0;`);
        w.write(`    }`);
        w.write("");
    }

    // ── Generated: SyntaxKind union property getters ──
    w.write("    // ═══ Generated SyntaxKind union property getters ═══");
    w.write("");
    for (const [propName, entries] of [...unionGetters.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        // Determine return type: if any entry is optional, return type includes undefined
        const anyOptional = entries.some(e => e.optional);
        const returnType = anyOptional ? "SyntaxKind | undefined" : "SyntaxKind | undefined";
        w.write(`    get ${propName}(): ${returnType} {`);
        w.write(`        switch (this.kind) {`);
        for (const entry of entries) {
            for (const kind of entry.kinds) {
                w.write(`            case SyntaxKind.${kind}:`);
            }
            const mask = (1 << entry.bitWidth) - 1;
            const indexExpr = `(this.data >> ${entry.bitPos}) & 0x${mask.toString(16)}`;
            if (entry.optional) {
                // Optional: 0 = undefined, 1..N = values[0]..values[N-1]
                w.write(`            {`);
                w.write(`                const idx = ${indexExpr};`);
                w.write(`                if (idx === 0) return undefined;`);
                const cases = entry.values.map((k, i) => `idx === ${i + 1} ? ${k.formatTypeScript()} : `).join("");
                w.write(`                return ${cases}undefined;`);
                w.write(`            }`);
            }
            else if (entry.values.length === 2) {
                // 2-value: simple ternary
                w.write(`                return ${indexExpr} ? ${entry.values[1].formatTypeScript()} : ${entry.values[0].formatTypeScript()};`);
            }
            else {
                // N-value: switch on index
                w.write(`            {`);
                w.write(`                const idx = ${indexExpr};`);
                for (let i = 0; i < entry.values.length; i++) {
                    if (i === 0) {
                        // default case (index 0)
                    }
                    else {
                        w.write(`                if (idx === ${i}) return ${entry.values[i].formatTypeScript()};`);
                    }
                }
                w.write(`                return ${entry.values[0].formatTypeScript()};`);
                w.write(`            }`);
            }
        }
        w.write(`        }`);
        w.write(`    }`);
        w.write("");
    }

    // ── Generated: templateFlags (extended data, not a union) ──
    emitTemplateFlagsGetter(w);
    w.write("");

    // ── Generated: tokenFlags (extended data for RegularExpressionLiteral) ──
    emitTokenFlagsGetter(w);
    w.write("");

    // ── Generated: Child property getters ──
    w.write("    // ═══ Generated child property getters ═══");
    w.write("");
    for (const [propName, type] of [...childGetters.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        const returnType = type === "nodeList" ? "RemoteNodeList" : type === "both" ? "RemoteNode | RemoteNodeList" : "RemoteNode";
        const castType = type === "nodeList" ? "RemoteNodeList" : type === "both" ? "RemoteNode | RemoteNodeList" : "RemoteNode";
        w.write(`    get ${propName}(): ${returnType} | undefined {`);
        w.write(`        return this.getNamedChild(${JSON.stringify(propName)}) as ${castType};`);
        w.write(`    }`);
    }
    w.write("");

    // ── Generated: String property getters (text, rawText) ──
    w.write("    // ═══ Generated string property getters ═══");
    w.write("");
    emitStringGetters(w, stringTextKinds, extendedTextKinds);
    w.write("");

    // ── Generated: Extended data property getters (SourceFile-specific, etc.) ──
    w.write("    // ═══ Generated extended data property getters ═══");
    w.write("");
    emitExtendedDataGetters(w);
    w.write("");

    // ── Hand-written remaining getters (flags, modifierFlags, etc.) ──
    emitRemoteNodeClassClose(w);
    w.write("");

    return w.toString();
}

// ── Infrastructure template sections ──

function emitNodeGeneratedImports(w: CodeWriter) {
    w.write(`import {`);
    w.write(`    ModifierFlags,`);
    w.write(`    type Node,`);
    w.write(`    type NodeArray,`);
    w.write(`    type SourceFile,`);
    w.write(`    SyntaxKind,`);
    w.write(`} from "../../ast/index.ts";`);
    w.write(`import {`);
    w.write(`    childProperties,`);
    w.write(`    KIND_NODE_LIST,`);
    w.write(`    NODE_DATA_TYPE_CHILDREN,`);
    w.write(`    NODE_DATA_TYPE_EXTENDED,`);
    w.write(`    NODE_DATA_TYPE_STRING,`);
    w.write(`    NODE_LEN,`);
    w.write(`    NODE_OFFSET_DATA,`);
    w.write(`    NODE_OFFSET_END,`);
    w.write(`    NODE_OFFSET_FLAGS,`);
    w.write(`    NODE_OFFSET_KIND,`);
    w.write(`    NODE_OFFSET_NEXT,`);
    w.write(`    NODE_OFFSET_PARENT,`);
    w.write(`    NODE_OFFSET_POS,`);
    w.write(`} from "./protocol.ts";`);
    w.write(`import {`);
    w.write(`    type NodeDataType,`);
    w.write(`    NODE_CHILD_MASK,`);
    w.write(`    NODE_DATA_TYPE_MASK,`);
    w.write(`    NODE_EXTENDED_DATA_MASK,`);
    w.write(`    NODE_STRING_INDEX_MASK,`);
    w.write(`    modifierToFlag,`);
    w.write(`    popcount8,`);
    w.write(`    RemoteNodeBase,`);
    w.write(`    type SourceFileInfo,`);
    w.write(`} from "./node.infrastructure.ts";`);
}

function emitRemoteNodeList(w: CodeWriter) {
    w.write(`export class RemoteNodeList extends Array<RemoteNode> implements NodeArray<RemoteNode> {`);
    w.write(`    parent: RemoteNode;`);
    w.write(`    hasTrailingComma?: boolean;`);
    w.write(`    transformFlags: number = 0;`);
    w.write(`    protected view: DataView;`);
    w.write(`    protected index: number;`);
    w.write(`    private _byteIndex: number;`);
    w.write(``);
    w.write(`    get pos(): number {`);
    w.write(`        return this.view.getUint32(this._byteIndex + NODE_OFFSET_POS, true);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    get end(): number {`);
    w.write(`        return this.view.getUint32(this._byteIndex + NODE_OFFSET_END, true);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    get next(): number {`);
    w.write(`        return this.view.getUint32(this._byteIndex + NODE_OFFSET_NEXT, true);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    private get data(): number {`);
    w.write(`        return this.view.getUint32(this._byteIndex + NODE_OFFSET_DATA, true);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    private sourceFile: SourceFileInfo;`);
    w.write(``);
    w.write(`    constructor(view: DataView, index: number, parent: RemoteNode, sourceFile: SourceFileInfo, offsetNodes: number) {`);
    w.write(`        super();`);
    w.write(`        this.view = view;`);
    w.write(`        this.index = index;`);
    w.write(`        this.parent = parent;`);
    w.write(`        this.sourceFile = sourceFile;`);
    w.write(`        this._byteIndex = offsetNodes + index * NODE_LEN;`);
    w.write(`        this.length = this.data;`);
    w.write(``);
    w.write(`        const length = this.length;`);
    w.write(`        for (let i = 16; i < length; i++) {`);
    w.write(`            Object.defineProperty(this, i, {`);
    w.write(`                get() {`);
    w.write(`                    return this.at(i);`);
    w.write(`                },`);
    w.write(`            });`);
    w.write(`        }`);
    w.write(`    }`);

    // Emit indexed getters 0..15
    for (let i = 0; i < 16; i++) {
        w.write(`    get ${i}(): RemoteNode {`);
        w.write(`        return this.at(${i});`);
        w.write(`    }`);
    }

    w.write(``);
    w.write(`    *[Symbol.iterator](): ArrayIterator<RemoteNode> {`);
    w.write(`        if (!this.length) return;`);
    w.write(`        let next = this.index + 1;`);
    w.write(`        while (next) {`);
    w.write(`            const child = this.getOrCreateChildAtNodeIndex(next);`);
    w.write(`            next = child.next;`);
    w.write(`            yield child as RemoteNode;`);
    w.write(`        }`);
    w.write(`    }`);
    w.write(``);
    w.write(`    forEachNode<T>(visitNode: (node: RemoteNode) => T | undefined): T | undefined {`);
    w.write(`        if (!this.length) return;`);
    w.write(`        let next = this.index + 1;`);
    w.write(`        while (next) {`);
    w.write(`            const child = this.getOrCreateChildAtNodeIndex(next);`);
    w.write(`            next = child.next;`);
    w.write(`            const result = visitNode(child as RemoteNode);`);
    w.write(`            if (result) return result;`);
    w.write(`        }`);
    w.write(`    }`);
    w.write(``);
    w.write(`    at(index: number): RemoteNode {`);
    w.write(`        if (!Number.isInteger(index)) {`);
    w.write(`            return undefined!;`);
    w.write(`        }`);
    w.write(`        if (index >= this.data || (index < 0 && -index > this.data)) {`);
    w.write(`            return undefined!;`);
    w.write(`        }`);
    w.write(`        if (index < 0) {`);
    w.write(`            index = this.length + index;`);
    w.write(`        }`);
    w.write(`        let next = this.index + 1;`);
    w.write(`        for (let i = 0; i < index; i++) {`);
    w.write(`            const child = this.getOrCreateChildAtNodeIndex(next);`);
    w.write(`            next = child.next;`);
    w.write(`        }`);
    w.write(`        return this.getOrCreateChildAtNodeIndex(next) as RemoteNode;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    private getOrCreateChildAtNodeIndex(index: number): RemoteNode | RemoteNodeList {`);
    w.write(`        let child = this.sourceFile.nodes[index];`);
    w.write(`        if (!child) {`);
    w.write(`            const kind = this.view.getUint32(this.sourceFile._offsetNodes + index * NODE_LEN + NODE_OFFSET_KIND, true);`);
    w.write(`            if (kind === KIND_NODE_LIST) {`);
    w.write(`                throw new Error("NodeList cannot directly contain another NodeList");`);
    w.write(`            }`);
    w.write(`            child = new RemoteNode(this.view, index, this.parent, this.sourceFile, this.sourceFile._offsetNodes);`);
    w.write(`            this.sourceFile.nodes[index] = child;`);
    w.write(`        }`);
    w.write(`        return child;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    __print(): string {`);
    w.write(`        const result = [];`);
    w.write(`        result.push(\`kind: NodeList\`);`);
    w.write(`        result.push(\`index: \${this.index}\`);`);
    w.write(`        result.push(\`byteIndex: \${this._byteIndex}\`);`);
    w.write(`        result.push(\`length: \${this.length}\`);`);
    w.write(`        return result.join("\\n");`);
    w.write(`    }`);
    w.write(`}`);
}

function emitRemoteNodeClassOpen(w: CodeWriter) {
    w.write(`export class RemoteNode extends RemoteNodeBase implements Node {`);
    w.write(`    protected static NODE_LEN: number = NODE_LEN;`);
    w.write(`    protected override get sourceFile(): SourceFileInfo {`);
    w.write(`        return this._sourceFile;`);
    w.write(`    }`);
    w.write(`    protected _sourceFile: SourceFileInfo;`);
    w.write(`    get id(): string {`);
    w.write(`        return \`\${this.pos}.\${this.end}.\${this.kind}.\${this.sourceFile.path}\`;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    constructor(view: DataView, index: number, parent: RemoteNode, sourceFile: SourceFileInfo, offsetNodes: number) {`);
    w.write(`        super(view, index, parent, offsetNodes + index * NODE_LEN);`);
    w.write(`        this._sourceFile = sourceFile;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    forEachChild<T>(visitNode: (node: Node) => T, visitList?: (list: NodeArray<Node>) => T): T | undefined {`);
    w.write(`        if (this.hasChildren()) {`);
    w.write(`            let next = this.index + 1;`);
    w.write(`            do {`);
    w.write(`                const child = this.getOrCreateChildAtNodeIndex(next);`);
    w.write(`                if (child instanceof RemoteNodeList) {`);
    w.write(`                    if (visitList) {`);
    w.write(`                        const result = visitList(child);`);
    w.write(`                        if (result) {`);
    w.write(`                            return result;`);
    w.write(`                        }`);
    w.write(`                    }`);
    w.write(`                    const result = child.forEachNode(visitNode);`);
    w.write(`                    if (result) {`);
    w.write(`                        return result;`);
    w.write(`                    }`);
    w.write(`                }`);
    w.write(`                else if (child.kind !== SyntaxKind.JSDoc) {`);
    w.write(`                    const result = visitNode(child);`);
    w.write(`                    if (result) {`);
    w.write(`                        return result;`);
    w.write(`                    }`);
    w.write(`                }`);
    w.write(`                next = child.next;`);
    w.write(`            }`);
    w.write(`            while (next);`);
    w.write(`        }`);
    w.write(`    }`);
    w.write(``);
    w.write(`    get jsDoc(): readonly Node[] | undefined {`);
    w.write(`        if (!this.hasChildren()) {`);
    w.write(`            return undefined;`);
    w.write(`        }`);
    w.write(`        let result: Node[] | undefined;`);
    w.write(`        let next = this.index + 1;`);
    w.write(`        do {`);
    w.write(`            const child = this.getOrCreateChildAtNodeIndex(next);`);
    w.write(`            if (!(child instanceof RemoteNodeList) && child.kind === SyntaxKind.JSDoc) {`);
    w.write(`                (result ??= []).push(child);`);
    w.write(`            }`);
    w.write(`            next = child.next;`);
    w.write(`        }`);
    w.write(`        while (next);`);
    w.write(`        return result;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    getSourceFile(): SourceFile {`);
    w.write(`        return this.sourceFile as unknown as SourceFile;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    protected getString(index: number): string {`);
    w.write(`        const offsetStringTableOffsets = this.sourceFile._offsetStringTableOffsets;`);
    w.write(`        const start = this.view.getUint32(offsetStringTableOffsets + index * 4, true);`);
    w.write(`        const end = this.view.getUint32(offsetStringTableOffsets + (index + 1) * 4, true);`);
    w.write(`        const offsetStringTable = this.sourceFile._offsetStringTable;`);
    w.write(`        const text = new Uint8Array(this.view.buffer, this.view.byteOffset + offsetStringTable + start, end - start);`);
    w.write(`        return this.sourceFile._decoder.decode(text);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    private getOrCreateChildAtNodeIndex(index: number): RemoteNode | RemoteNodeList {`);
    w.write(`        let child = this.sourceFile.nodes[index];`);
    w.write(`        if (!child) {`);
    w.write(`            const offsetNodes = this.sourceFile._offsetNodes;`);
    w.write(`            const kind = this.view.getUint32(offsetNodes + index * NODE_LEN + NODE_OFFSET_KIND, true);`);
    w.write(`            const sf = this.sourceFile;`);
    w.write(`            child = kind === KIND_NODE_LIST`);
    w.write(`                ? new RemoteNodeList(this.view, index, this, sf, offsetNodes)`);
    w.write(`                : new RemoteNode(this.view, index, this, sf, offsetNodes);`);
    w.write(`            sf.nodes[index] = child;`);
    w.write(`        }`);
    w.write(`        return child;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    private hasChildren(): boolean {`);
    w.write(`        if (this._byteIndex >= this.view.byteLength - NODE_LEN) {`);
    w.write(`            return false;`);
    w.write(`        }`);
    w.write(`        const nextNodeParent = this.view.getUint32(this.sourceFile._offsetNodes + (this.index + 1) * NODE_LEN + NODE_OFFSET_PARENT, true);`);
    w.write(`        return nextNodeParent === this.index;`);
    w.write(`    }`);
    w.write(``);
    w.write(`    private getNamedChild(propertyName: string): RemoteNode | RemoteNodeList | undefined {`);
    w.write(`        // JSDocPropertyTag and JSDocParameterTag have runtime-dependent child order based on isNameFirst.`);
    w.write(`        // Handle them before the general childProperties lookup.`);
    w.write(`        const kind = this.kind;`);
    w.write(`        if (kind === SyntaxKind.JSDocPropertyTag) {`);
    w.write(`            let order: number;`);
    w.write(`            switch (propertyName) {`);
    w.write(`                case "name": order = this.isNameFirst ? 0 : 1; break;`);
    w.write(`                case "typeExpression": order = this.isNameFirst ? 1 : 0; break;`);
    w.write(`                default: return undefined;`);
    w.write(`            }`);
    w.write(`            return this.getChildAtOrder(order);`);
    w.write(`        }`);
    w.write(`        else if (kind === SyntaxKind.JSDocParameterTag) {`);
    w.write(`            let order: number;`);
    w.write(`            switch (propertyName) {`);
    w.write(`                case "tagName": order = 0; break;`);
    w.write(`                case "name": order = this.isNameFirst ? 1 : 2; break;`);
    w.write(`                case "typeExpression": order = this.isNameFirst ? 2 : 1; break;`);
    w.write(`                case "comment": order = 3; break;`);
    w.write(`                default: return undefined;`);
    w.write(`            }`);
    w.write(`            return this.getChildAtOrder(order);`);
    w.write(`        }`);
    w.write(``);
    w.write(`        const propertyNames = childProperties[kind];`);
    w.write(`        if (!propertyNames) {`);
    w.write(`            return undefined;`);
    w.write(`        }`);
    w.write(``);
    w.write(`        const order = propertyNames.indexOf(propertyName);`);
    w.write(`        if (order === -1) {`);
    w.write(`            return undefined;`);
    w.write(`        }`);
    w.write(`        return this.getChildAtOrder(order);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    private getChildAtOrder(order: number): RemoteNode | RemoteNodeList | undefined {`);
    w.write(`        const mask = this.childMask;`);
    w.write(`        if (!(mask & (1 << order))) {`);
    w.write(`            // Property is not present`);
    w.write(`            return undefined;`);
    w.write(`        }`);
    w.write(``);
    w.write(`        // The property index is \`order\`, minus the number of zeros in the mask that are in bit positions less`);
    w.write(`        // than the \`order\`th bit. Example:`);
    w.write(`        //`);
    w.write(`        // This is a MethodDeclaration with mask 0b01110101. The possible properties are`);
    w.write(`        // ["modifiers", "asteriskToken", "name", "postfixToken", "typeParameters", "parameters", "type", "body"]`);
    w.write(`        // (it has modifiers, name, typeParameters, parameters, and type).`);
    w.write(`        //`);
    w.write(`        // | Bit   | 7    | 6    | 5          | 4              | 3            | 2    | 1             | 0         |`);
    w.write(`        // | ----- | ---- | ---- | ---------- | -------------- | ------------ | ---- | ------------- | --------- |`);
    w.write(`        // | Value | 0    | 1    | 1          | 1              | 0            | 1    | 0             | 1         |`);
    w.write(`        // | Name  | body | type | parameters | typeParameters | postfixToken | name | asteriskToken | modifiers |`);
    w.write(`        //`);
    w.write(`        // We are trying to get the index of "parameters" (bit = 5).`);
    w.write(`        // First, set all the more significant bits to 1:`);
    w.write(`        //`);
    w.write(`        // | Bit   | 7    | 6    | 5          | 4              | 3            | 2    | 1             | 0         |`);
    w.write(`        // | ----- | ---- | ---- | ---------- | -------------- | ------------ | ---- | ------------- | --------- |`);
    w.write(`        // | Value | 1    | 1    | 1          | 1              | 0            | 1    | 0             | 1         |`);
    w.write(`        //`);
    w.write(`        // Then, flip the bits:`);
    w.write(`        //`);
    w.write(`        // | Bit   | 7    | 6    | 5          | 4              | 3            | 2    | 1             | 0         |`);
    w.write(`        // | ----- | ---- | ---- | ---------- | -------------- | ------------ | ---- | ------------- | --------- |`);
    w.write(`        // | Value | 0    | 0    | 0          | 0              | 1            | 0    | 1             | 0         |`);
    w.write(`        //`);
    w.write(`        // Counting the 1s gives us the number of *missing properties* before the \`order\`th property. If every property`);
    w.write(`        // were present, we would have \`parameters = children[5]\`, but since \`postfixToken\` and \`astersiskToken\` are`);
    w.write(`        // missing, we have \`parameters = children[5 - 2]\`.`);
    w.write(`        const propertyIndex = order - popcount8[~(mask | ((0xff << order) & 0xff)) & 0xff];`);
    w.write(`        let childIndex = this.index + 1;`);
    w.write(`        for (let i = 0; i < propertyIndex; i++) {`);
    w.write(`            // Walk through children via their \`next\` pointer until we get to the right property index`);
    w.write(`            childIndex = this.view.getUint32(this.sourceFile._offsetNodes + childIndex * NODE_LEN + NODE_OFFSET_NEXT, true);`);
    w.write(`        }`);
    w.write(`        return this.getOrCreateChildAtNodeIndex(childIndex);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    __print(): string {`);
    w.write(`        const result = [];`);
    w.write(`        result.push(\`index: \${this.index}\`);`);
    w.write(`        result.push(\`byteIndex: \${this._byteIndex}\`);`);
    w.write(`        result.push(\`kind: \${SyntaxKind[this.kind]}\`);`);
    w.write(`        result.push(\`pos: \${this.pos}\`);`);
    w.write(`        result.push(\`end: \${this.end}\`);`);
    w.write(`        result.push(\`next: \${this.next}\`);`);
    w.write(`        result.push(\`parent: \${this.parentIndex}\`);`);
    w.write(`        result.push(\`data: \${this.data.toString(2).padStart(32, "0")}\`);`);
    w.write(`        const dataType = this.dataType === NODE_DATA_TYPE_CHILDREN ? "children" :`);
    w.write(`            this.dataType === NODE_DATA_TYPE_STRING ? "string" :`);
    w.write(`            "extended";`);
    w.write(`        result.push(\`dataType: \${dataType}\`);`);
    w.write(`        if (this.dataType === NODE_DATA_TYPE_CHILDREN) {`);
    w.write(`            result.push(\`childMask: \${this.childMask.toString(2).padStart(8, "0")}\`);`);
    w.write(`            result.push(\`childProperties: \${childProperties[this.kind]?.join(", ")}\`);`);
    w.write(`        }`);
    w.write(`        return result.join("\\n");`);
    w.write(`    }`);
    w.write(``);
    w.write(`    __printChildren(): string {`);
    w.write(`        const result = [];`);
    w.write(`        let next = this.index + 1;`);
    w.write(`        while (next) {`);
    w.write(`            const child = this.getOrCreateChildAtNodeIndex(next);`);
    w.write(`            next = child.next;`);
    w.write(`            result.push(child.__print());`);
    w.write(`        }`);
    w.write(`        return result.join("\\n\\n");`);
    w.write(`    }`);
    w.write(``);
    w.write(`    __printSubtree(): string {`);
    w.write(`        const result = [this.__print()];`);
    w.write(`        this.forEachChild(function visitNode(node) {`);
    w.write(`            result.push((node as RemoteNode).__print());`);
    w.write(`            node.forEachChild(visitNode);`);
    w.write(`        }, visitList => {`);
    w.write(`            result.push((visitList as RemoteNodeList).__print());`);
    w.write(`        });`);
    w.write(`        return result.join("\\n\\n");`);
    w.write(`    }`);
}

function emitTemplateFlagsGetter(w: CodeWriter) {
    // templateFlags — from extended data (not a commonData union)
    w.write(`    get templateFlags(): number | undefined {`);
    w.write(`        switch (this.kind) {`);
    w.write(`            case SyntaxKind.TemplateHead:`);
    w.write(`            case SyntaxKind.TemplateMiddle:`);
    w.write(`            case SyntaxKind.TemplateTail:`);
    w.write(`                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);`);
    w.write(`                return this.view.getUint32(extendedDataOffset + 8, true);`);
    w.write(`        }`);
    w.write(`    }`);
}

function emitTokenFlagsGetter(w: CodeWriter) {
    // tokenFlags — from extended data for literal kinds that store TokenFlags
    w.write(`    get tokenFlags(): number {`);
    w.write(`        switch (this.kind) {`);
    w.write(`            case SyntaxKind.StringLiteral:`);
    w.write(`            case SyntaxKind.NumericLiteral:`);
    w.write(`            case SyntaxKind.BigIntLiteral:`);
    w.write(`            case SyntaxKind.RegularExpressionLiteral:`);
    w.write(`                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);`);
    w.write(`                return this.view.getUint32(extendedDataOffset + 4, true);`);
    w.write(`            default:`);
    w.write(`                return 0;`);
    w.write(`        }`);
    w.write(`    }`);
}

function emitStringGetters(w: CodeWriter, stringTextKinds: string[], extendedTextKinds: string[]) {
    // text getter — string data kinds vs extended data kinds
    w.write(`    get text(): string | undefined {`);
    w.write(`        switch (this.kind) {`);
    for (const k of stringTextKinds) {
        w.write(`            case SyntaxKind.${k}:`);
    }
    w.write(`            {`);
    w.write(`                const stringIndex = this.data & NODE_STRING_INDEX_MASK;`);
    w.write(`                return this.getString(stringIndex);`);
    w.write(`            }`);
    for (const k of extendedTextKinds) {
        w.write(`            case SyntaxKind.${k}:`);
    }
    w.write(`            {`);
    w.write(`                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);`);
    w.write(`                const stringIndex = this.view.getUint32(extendedDataOffset, true);`);
    w.write(`                return this.getString(stringIndex);`);
    w.write(`            }`);
    w.write(`        }`);
    w.write(`    }`);
    w.write(``);
    // rawText — template kinds only
    w.write(`    get rawText(): string | undefined {`);
    w.write(`        switch (this.kind) {`);
    w.write(`            case SyntaxKind.TemplateHead:`);
    w.write(`            case SyntaxKind.TemplateMiddle:`);
    w.write(`            case SyntaxKind.TemplateTail:`);
    w.write(`                const extendedDataOffset = this.sourceFile._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);`);
    w.write(`                const stringIndex = this.view.getUint32(extendedDataOffset + 4, true);`);
    w.write(`                return this.getString(stringIndex);`);
    w.write(`        }`);
    w.write(`    }`);
}

function emitExtendedDataGetters(w: CodeWriter) {
    // SourceFile-specific extended data getters live on RemoteSourceFile in node.ts.
    // Only non-SourceFile extended data getters are emitted here.
}

function emitRemoteNodeClassClose(w: CodeWriter) {
    w.write(`    // ═══ Other property getters ═══`);
    w.write(``);
    w.write(`    get flags(): number {`);
    w.write(`        return this.view.getUint32(this._byteIndex + NODE_OFFSET_FLAGS, true);`);
    w.write(`    }`);
    w.write(``);
    w.write(`    get modifierFlags(): ModifierFlags {`);
    w.write(`        const mods = this.modifiers;`);
    w.write(`        if (!mods) return ModifierFlags.None;`);
    w.write(`        let flags: ModifierFlags = ModifierFlags.None;`);
    w.write(`        for (const mod of mods) {`);
    w.write(`            flags |= modifierToFlag(mod.kind);`);
    w.write(`        }`);
    w.write(`        return flags;`);
    w.write(`    }`);
    w.write(`}`);
}

// ═══════════════════════════════════════════════════════════════════════════
// Main: generate and write all files
// ═══════════════════════════════════════════════════════════════════════════

function writeAndFormat(filePath: string, content: string, formatter: string) {
    fs.writeFileSync(filePath, content);
    try {
        const [cmd, ...args] = formatter.split(" ");
        execaSync(cmd, [...args, filePath], { stdio: "inherit", cwd: ROOT });
    }
    catch {
        console.warn(`Warning: formatter failed for ${filePath}`);
    }
    console.log(`Wrote ${filePath}`);
}

export default function main() {
    console.log("Generating encoder/decoder code...");

    const goEncoder = generateGoEncoder();
    writeAndFormat(
        path.join(ROOT, "internal/api/encoder/encoder_generated.go"),
        goEncoder + "\n",
        "dprint fmt",
    );

    const goDecoder = generateGoDecoder();
    writeAndFormat(
        path.join(ROOT, "internal/api/encoder/decoder_generated.go"),
        goDecoder + "\n",
        "dprint fmt",
    );

    const tsProtocol = generateTSProtocol();
    writeAndFormat(
        path.join(ROOT, "_packages/native-preview/src/api/node/protocol.generated.ts"),
        tsProtocol + "\n",
        "dprint fmt",
    );

    const tsEncoder = generateTSEncoder();
    writeAndFormat(
        path.join(ROOT, "_packages/native-preview/src/api/node/encoder.generated.ts"),
        tsEncoder + "\n",
        "dprint fmt",
    );

    const tsNode = generateTSNodeGenerated();
    writeAndFormat(
        path.join(ROOT, "_packages/native-preview/src/api/node/node.generated.ts"),
        tsNode + "\n",
        "dprint fmt",
    );

    console.log("Done!");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    main();
}
