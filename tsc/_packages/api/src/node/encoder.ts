import type {
    FileReference,
    JSDocParameterOrPropertyTag,
    LiteralLikeNode,
    Node,
    NodeArray,
    SourceFile,
    TemplateLiteralLikeNode,
} from "@typescript/ast";
import { SyntaxKind } from "@typescript/ast";
import {
    getNodeCommonData,
    getNodeDataType,
} from "./encoder.generated.ts";
import { MsgpackWriter } from "./msgpack.ts";
import {
    childProperties,
    HEADER_OFFSET_EXTENDED_DATA,
    HEADER_OFFSET_METADATA,
    HEADER_OFFSET_NODES,
    HEADER_OFFSET_STRING_TABLE,
    HEADER_OFFSET_STRING_TABLE_OFFSETS,
    HEADER_OFFSET_STRUCTURED_DATA,
    HEADER_SIZE,
    KIND_NODE_LIST,
    NODE_DATA_TYPE_CHILDREN,
    NODE_DATA_TYPE_EXTENDED,
    NODE_DATA_TYPE_STRING,
    NODE_LEN,
    PROTOCOL_VERSION,
} from "./protocol.ts";

const NODE_FIELDS = NODE_LEN / 4;
const NODE_FIELD_NEXT = 3;
const NO_STRUCTURED_DATA = 0xFFFFFFFF;

// String table that accumulates strings into a flat byte pool.
class StringTable {
    private parts: string[];
    private byteLen: number;
    private offsets: number[];

    constructor() {
        this.parts = [];
        this.byteLen = 0;
        this.offsets = [];
    }

    add(text: string): number {
        const index = this.offsets.length;
        const encoder = cachedEncoder();
        const encodedLength = encoder.encode(text).length;
        const offset = this.byteLen;
        this.parts.push(text);
        this.byteLen += encodedLength;
        this.offsets.push(offset, offset + encodedLength);
        return index;
    }

    encode(): Uint8Array {
        const encoder = cachedEncoder();
        const dataBytes = encoder.encode(this.parts.join(""));
        const offsetBytes = new Uint8Array(this.offsets.length * 4);
        const view = new DataView(offsetBytes.buffer);
        for (let i = 0; i < this.offsets.length; i++) {
            view.setUint32(i * 4, this.offsets[i], true);
        }
        const result = new Uint8Array(offsetBytes.length + dataBytes.length);
        result.set(offsetBytes, 0);
        result.set(dataBytes, offsetBytes.length);
        return result;
    }

    stringByteLength(): number {
        return this.byteLen;
    }

    offsetsCount(): number {
        return this.offsets.length;
    }
}

let _encoder: TextEncoder | undefined;
function cachedEncoder(): TextEncoder {
    return _encoder ??= new TextEncoder();
}

function getChildrenPropertyMask(node: Node): number {
    const kind = node.kind;

    // Special handling for JSDocParameterTag and JSDocPropertyTag
    if (kind === SyntaxKind.JSDocParameterTag || kind === SyntaxKind.JSDocPropertyTag) {
        const tag = node as JSDocParameterOrPropertyTag;
        if (tag.isNameFirst) {
            return (boolBit(tag.tagName) << 0) | (boolBit(tag.name) << 1) | (boolBit(tag.typeExpression) << 2) | (boolBit(tag.comment) << 3);
        }
        return (boolBit(tag.tagName) << 0) | (boolBit(tag.typeExpression) << 1) | (boolBit(tag.name) << 2) | (boolBit(tag.comment) << 3);
    }

    const props = childProperties[kind];
    if (!props) {
        return 0;
    }
    const n = node as unknown as Record<string, unknown>;
    let mask = 0;
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        if (prop !== undefined && isChildPresent(n[prop])) {
            mask |= 1 << i;
        }
    }
    return mask;
}

function boolBit(v: unknown): number {
    return isChildPresent(v) ? 1 : 0;
}

// A child is "present" if it's non-null/non-undefined.
// This matches the Go encoder's behavior where non-nil NodeLists (even empty)
// are treated as present, and only nil NodeLists are absent.
function isChildPresent(v: unknown): boolean {
    if (v === undefined || v === null) return false;
    return true;
}

function recordNodeStrings(node: Node, strs: StringTable): number {
    return strs.add((node as LiteralLikeNode).text ?? "");
}

function encodeFileReferences(refs: readonly FileReference[] | undefined, writer: MsgpackWriter): number {
    if (!refs || refs.length === 0) return NO_STRUCTURED_DATA;
    const offset = writer.finish().length;
    writer.writeArrayHeader(refs.length);
    for (const ref of refs) {
        writer.writeArrayHeader(5);
        writer.writeUint(ref.pos);
        writer.writeUint(ref.end);
        writer.writeString(ref.fileName);
        writer.writeUint(ref.resolutionMode ?? 0);
        writer.writeBool(ref.preserve ?? false);
    }
    return offset;
}

function recordExtendedData(node: Node, strs: StringTable, extendedData: number[], structuredWriter: MsgpackWriter): number {
    const offset = extendedData.length * 4;
    if (node.kind === SyntaxKind.SourceFile) {
        const sf = node as SourceFile;
        const textIndex = strs.add(sf.text);
        const fileNameIndex = strs.add(sf.fileName);
        const pathIndex = strs.add(sf.path);
        const referencedFilesOffset = encodeFileReferences(sf.referencedFiles, structuredWriter);
        const typeRefDirectivesOffset = encodeFileReferences(sf.typeReferenceDirectives, structuredWriter);
        const libRefDirectivesOffset = encodeFileReferences(sf.libReferenceDirectives, structuredWriter);
        extendedData.push(textIndex, fileNameIndex, pathIndex, sf.languageVariant, sf.scriptKind, referencedFilesOffset, typeRefDirectivesOffset, libRefDirectivesOffset, NO_STRUCTURED_DATA, NO_STRUCTURED_DATA, NO_STRUCTURED_DATA, 0);
    }
    else if (
        node.kind === SyntaxKind.TemplateHead ||
        node.kind === SyntaxKind.TemplateMiddle ||
        node.kind === SyntaxKind.TemplateTail
    ) {
        const tmpl = node as TemplateLiteralLikeNode;
        const text: string = tmpl.text ?? "";
        const rawText: string = tmpl.rawText ?? "";
        const templateFlags: number = tmpl.templateFlags ?? 0;
        const textIndex = strs.add(text);
        const rawTextIndex = strs.add(rawText);
        extendedData.push(textIndex, rawTextIndex, templateFlags);
    }
    else {
        // StringLiteral, NumericLiteral, BigIntLiteral, RegularExpressionLiteral,
        // NoSubstitutionTemplateLiteral — format: [textIndex, tokenFlags]
        const n = node as any;
        const text: string = n.text ?? "";
        const tokenFlags: number = n.tokenFlags ?? 0;
        const textIndex = strs.add(text);
        extendedData.push(textIndex, tokenFlags);
    }
    return offset;
}

function getNodeData(node: Node, strs: StringTable, extendedData: number[], structuredWriter: MsgpackWriter): number {
    const t = getNodeDataType(node.kind);
    const common = getNodeCommonData(node);
    switch (t) {
        case NODE_DATA_TYPE_CHILDREN:
            return t | common | getChildrenPropertyMask(node);
        case NODE_DATA_TYPE_STRING:
            return t | common | recordNodeStrings(node, strs);
        case NODE_DATA_TYPE_EXTENDED:
            return t | common | recordExtendedData(node, strs, extendedData, structuredWriter);
        default:
            throw new Error("unreachable");
    }
}

function getChildPropertiesForNode(node: Node): readonly (string | undefined)[] | undefined {
    const kind = node.kind;
    if (kind === SyntaxKind.JSDocParameterTag || kind === SyntaxKind.JSDocPropertyTag) {
        return (node as JSDocParameterOrPropertyTag).isNameFirst
            ? ["tagName", "name", "typeExpression", "comment"]
            : ["tagName", "typeExpression", "name", "comment"];
    }
    return childProperties[kind];
}

// Returns whether a value is a NodeArray (array-like with pos and end).
function isNodeArray(value: any): value is NodeArray<Node> {
    return Array.isArray(value) && typeof (value as any).pos === "number" && typeof (value as any).end === "number";
}

/**
 * Encode a SourceFile AST node into the binary format.
 */
export function encodeSourceFile(sourceFile: SourceFile): Uint8Array {
    return encodeNode(sourceFile);
}

/**
 * Encode an arbitrary AST node into the binary format.
 * When encoding a non-SourceFile node, the header hash and parse options fields will be zero.
 */
export function encodeNode(node: Node): Uint8Array {
    const strs = new StringTable();
    const extendedDataValues: number[] = [];
    const structuredWriter = new MsgpackWriter();

    // We'll build an array of uint32 values for the nodes section, 7 per node
    const nodeValues: number[] = [];

    // Nil node (index 0)
    nodeValues.push(0, 0, 0, 0, 0, 0, 0);

    let nodeCount = 0;
    let parentIndex = 0;
    let prevIndex = 0;

    function visitNode(node: Node): void {
        nodeCount++;
        const currentIndex = nodeCount;

        if (prevIndex !== 0) {
            // Set next pointer on previous sibling
            nodeValues[prevIndex * NODE_FIELDS + NODE_FIELD_NEXT] = currentIndex;
        }

        const data = getNodeData(node, strs, extendedDataValues, structuredWriter);
        nodeValues.push(
            node.kind,
            node.pos >= 0 ? node.pos : 0,
            node.end >= 0 ? node.end : 0,
            0, // next (filled in later)
            parentIndex,
            data,
            node.flags,
        );

        const saveParentIndex = parentIndex;
        const savePrevIndex = prevIndex;
        parentIndex = currentIndex;
        prevIndex = 0;

        visitChildren(node);

        prevIndex = currentIndex;
        parentIndex = saveParentIndex;
    }

    function visitNodeList(list: NodeArray<Node>): void {
        if (!list) {
            return;
        }

        nodeCount++;
        const currentIndex = nodeCount;

        if (prevIndex !== 0) {
            nodeValues[prevIndex * NODE_FIELDS + NODE_FIELD_NEXT] = currentIndex;
        }

        nodeValues.push(
            KIND_NODE_LIST,
            list.pos >= 0 ? list.pos : 0,
            list.end >= 0 ? list.end : 0,
            0, // next
            parentIndex,
            list.length, // data for NodeList is its length
            0, // flags
        );

        const saveParentIndex = parentIndex;
        parentIndex = currentIndex;
        prevIndex = 0;

        for (const child of list) {
            visitNode(child);
        }

        prevIndex = currentIndex;
        parentIndex = saveParentIndex;
    }

    function visitChildren(node: Node): void {
        const props = getChildPropertiesForNode(node);
        const n = node as any;

        if (props) {
            for (const propName of props) {
                if (propName === undefined) continue;
                const child = n[propName];
                if (child === undefined || child === null) continue;
                if (isNodeArray(child)) {
                    visitNodeList(child);
                }
                else {
                    visitNode(child);
                }
            }
        }
    }

    // Encode root node
    nodeCount++;
    parentIndex++;
    const rootData = getNodeData(node, strs, extendedDataValues, structuredWriter);
    nodeValues.push(
        node.kind,
        node.pos >= 0 ? node.pos : 0,
        node.end >= 0 ? node.end : 0,
        0,
        0,
        rootData,
        node.flags,
    );

    const saveParent = parentIndex;
    prevIndex = 0;
    parentIndex = 1; // root is at index 1
    visitChildren(node);
    parentIndex = saveParent;

    // Encode extended data section
    const extendedDataBytes = new Uint8Array(extendedDataValues.length * 4);
    const extView = new DataView(extendedDataBytes.buffer);
    for (let i = 0; i < extendedDataValues.length; i++) {
        extView.setUint32(i * 4, extendedDataValues[i], true);
    }

    // Encode structured data section
    const structuredDataBytes = structuredWriter.finish();

    // Encode string table
    const strsBytes = strs.encode();

    // Encode nodes section
    const nodesBytes = new Uint8Array(nodeValues.length * 4);
    const nodesView = new DataView(nodesBytes.buffer);
    for (let i = 0; i < nodeValues.length; i++) {
        nodesView.setUint32(i * 4, nodeValues[i] >>> 0, true);
    }

    // Calculate section offsets
    const offsetStringTableOffsets = HEADER_SIZE;
    const offsetStringTableData = HEADER_SIZE + strs.offsetsCount() * 4;
    const offsetExtendedData = offsetStringTableData + strs.stringByteLength();
    const offsetStructuredData = offsetExtendedData + extendedDataBytes.length;
    const offsetNodes = offsetStructuredData + structuredDataBytes.length;

    // Build header
    const header = new Uint8Array(HEADER_SIZE);
    const headerView = new DataView(header.buffer);
    const metadata = PROTOCOL_VERSION << 24;
    headerView.setUint32(HEADER_OFFSET_METADATA, metadata, true);
    // bytes 4-19: hash (zero for non-SourceFile, we don't have access to xxh3 here)
    // byte 20-23: parse options (zero for non-SourceFile)
    headerView.setUint32(HEADER_OFFSET_STRING_TABLE_OFFSETS, offsetStringTableOffsets, true);
    headerView.setUint32(HEADER_OFFSET_STRING_TABLE, offsetStringTableData, true);
    headerView.setUint32(HEADER_OFFSET_EXTENDED_DATA, offsetExtendedData, true);
    headerView.setUint32(HEADER_OFFSET_STRUCTURED_DATA, offsetStructuredData, true);
    headerView.setUint32(HEADER_OFFSET_NODES, offsetNodes, true);

    // Concatenate all sections
    const result = new Uint8Array(header.length + strsBytes.length + extendedDataBytes.length + structuredDataBytes.length + nodesBytes.length);
    result.set(header, 0);
    result.set(strsBytes, HEADER_SIZE);
    result.set(extendedDataBytes, offsetExtendedData);
    result.set(structuredDataBytes, offsetStructuredData);
    result.set(nodesBytes, offsetNodes);
    return result;
}

/**
 * Encode a Uint8Array to a base64 string.
 */
export function uint8ArrayToBase64(data: Uint8Array): string {
    return Buffer.from(data).toString("base64");
}
