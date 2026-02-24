import type {
    ArrayLiteralExpression,
    Block,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    ImportAttributes,
    ImportClause,
    ImportEqualsDeclaration,
    ImportSpecifier,
    ImportTypeNode,
    JSDocPropertyLikeTag,
    JSDocTag,
    JSDocTypeLiteral,
    JsxText,
    LiteralLikeNode,
    Node,
    NodeArray,
    ObjectLiteralExpression,
    SourceFile,
    TemplateLiteralLikeNode,
} from "@typescript/ast";
import {
    NodeFlags,
    SyntaxKind,
} from "@typescript/ast";
import {
    childProperties,
    HEADER_SIZE,
    KIND_NODE_LIST,
    NODE_DATA_TYPE_CHILDREN,
    NODE_DATA_TYPE_EXTENDED,
    NODE_DATA_TYPE_STRING,
    PROTOCOL_VERSION,
} from "./protocol.ts";

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

function getNodeDataType(kind: SyntaxKind): number {
    switch (kind) {
        case SyntaxKind.JsxText:
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.BigIntLiteral:
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.JSDocText:
            return NODE_DATA_TYPE_STRING;
        case SyntaxKind.TemplateHead:
        case SyntaxKind.TemplateMiddle:
        case SyntaxKind.TemplateTail:
        case SyntaxKind.SourceFile:
            return NODE_DATA_TYPE_EXTENDED;
        default:
            return NODE_DATA_TYPE_CHILDREN;
    }
}

function getNodeDefinedData(node: Node): number {
    switch (node.kind) {
        case SyntaxKind.JSDocTypeLiteral:
            return ((node as JSDocTypeLiteral).isArrayType ? 1 : 0) << 24;
        case SyntaxKind.ImportSpecifier:
            return ((node as ImportSpecifier).isTypeOnly ? 1 : 0) << 24;
        case SyntaxKind.ImportEqualsDeclaration:
            return ((node as ImportEqualsDeclaration).isTypeOnly ? 1 : 0) << 24;
        case SyntaxKind.ExportDeclaration:
            return ((node as ExportDeclaration).isTypeOnly ? 1 : 0) << 24;
        case SyntaxKind.ImportClause: {
            const phaseModifier = (node as ImportClause).phaseModifier;
            return ((phaseModifier === SyntaxKind.TypeKeyword ? 1 : 0) << 24) |
                ((phaseModifier === SyntaxKind.DeferKeyword ? 1 : 0) << 25);
        }
        case SyntaxKind.ExportSpecifier:
            return ((node as ExportSpecifier).isTypeOnly ? 1 : 0) << 24;
        case SyntaxKind.ImportType:
            return ((node as ImportTypeNode).isTypeOf ? 1 : 0) << 24;
        case SyntaxKind.ExportAssignment:
            return ((node as ExportAssignment).isExportEquals ? 1 : 0) << 24;
        case SyntaxKind.Block:
            return ((node as Block).multiLine ? 1 : 0) << 24;
        case SyntaxKind.ArrayLiteralExpression:
            return ((node as ArrayLiteralExpression).multiLine ? 1 : 0) << 24;
        case SyntaxKind.ObjectLiteralExpression:
            return ((node as ObjectLiteralExpression).multiLine ? 1 : 0) << 24;
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocPropertyTag: {
            const tag = node as JSDocPropertyLikeTag;
            return ((tag.isBracketed ? 1 : 0) << 24) | ((tag.isNameFirst ? 1 : 0) << 25);
        }
        case SyntaxKind.JsxText:
            return ((node as JsxText).containsOnlyTriviaWhiteSpaces ? 1 : 0) << 24;
        case SyntaxKind.VariableDeclarationList: {
            const flags = node.flags;
            // NodeFlags.Let = 1, NodeFlags.Const = 2
            return (flags & (NodeFlags.Let | NodeFlags.Const)) << 24;
        }
        case SyntaxKind.ImportAttributes: {
            const attrs = node as ImportAttributes;
            return ((attrs.multiLine ? 1 : 0) << 24) |
                ((attrs.token === SyntaxKind.AssertKeyword ? 1 : 0) << 25);
        }
    }
    return 0;
}

function getChildrenPropertyMask(node: Node): number {
    const kind = node.kind;

    // Special handling for JSDocParameterTag and JSDocPropertyTag
    if (kind === SyntaxKind.JSDocParameterTag || kind === SyntaxKind.JSDocPropertyTag) {
        const tag = node as JSDocPropertyLikeTag & JSDocTag;
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

// A child is "present" if it's non-null and, for arrays, non-empty.
// This matches the Go encoder's behavior where nil and empty NodeLists
// are both treated as absent.
function isChildPresent(v: unknown): boolean {
    if (v === undefined || v === null) return false;
    if (Array.isArray(v)) return v.length > 0;
    return true;
}

function recordNodeStrings(node: Node, strs: StringTable): number {
    return strs.add((node as LiteralLikeNode).text ?? "");
}

function recordExtendedData(node: Node, strs: StringTable, extendedData: number[]): number {
    const offset = extendedData.length * 4;
    if (node.kind === SyntaxKind.SourceFile) {
        const sf = node as SourceFile;
        const textIndex = strs.add(sf.text);
        const fileNameIndex = strs.add(sf.fileName);
        const pathIndex = strs.add(sf.path);
        extendedData.push(textIndex, fileNameIndex, pathIndex);
    }
    else {
        // TemplateHead, TemplateMiddle, TemplateTail
        const tmpl = node as TemplateLiteralLikeNode;
        const text: string = tmpl.text ?? "";
        const rawText: string = tmpl.rawText ?? "";
        const templateFlags: number = tmpl.templateFlags ?? 0;
        const textIndex = strs.add(text);
        const rawTextIndex = strs.add(rawText);
        extendedData.push(textIndex, rawTextIndex, templateFlags);
    }
    return offset;
}

function getNodeData(node: Node, strs: StringTable, extendedData: number[]): number {
    const t = getNodeDataType(node.kind);
    const defined = getNodeDefinedData(node);
    switch (t) {
        case NODE_DATA_TYPE_CHILDREN:
            return t | defined | getChildrenPropertyMask(node);
        case NODE_DATA_TYPE_STRING:
            return t | defined | recordNodeStrings(node, strs);
        case NODE_DATA_TYPE_EXTENDED:
            return t | defined | recordExtendedData(node, strs, extendedData);
        default:
            throw new Error("unreachable");
    }
}

const singleChildNodePropertyNames: Readonly<Partial<Record<SyntaxKind, string>>> = {
    // Single-child nodes
    [SyntaxKind.ReturnStatement]: "expression",
    [SyntaxKind.ThrowStatement]: "expression",
    [SyntaxKind.ExpressionStatement]: "expression",
    [SyntaxKind.BreakStatement]: "label",
    [SyntaxKind.ContinueStatement]: "label",
    [SyntaxKind.ParenthesizedExpression]: "expression",
    [SyntaxKind.ComputedPropertyName]: "expression",
    [SyntaxKind.Decorator]: "expression",
    [SyntaxKind.SpreadElement]: "expression",
    [SyntaxKind.SpreadAssignment]: "expression",
    [SyntaxKind.DeleteExpression]: "expression",
    [SyntaxKind.TypeOfExpression]: "expression",
    [SyntaxKind.VoidExpression]: "expression",
    [SyntaxKind.AwaitExpression]: "expression",
    [SyntaxKind.NonNullExpression]: "expression",
    [SyntaxKind.ExternalModuleReference]: "expression",
    [SyntaxKind.NamespaceImport]: "name",
    [SyntaxKind.NamespaceExport]: "name",
    [SyntaxKind.JsxClosingElement]: "tagName",
    [SyntaxKind.ArrayType]: "elementType",
    [SyntaxKind.LiteralType]: "literal",
    [SyntaxKind.InferType]: "typeParameter",
    [SyntaxKind.OptionalType]: "type",
    [SyntaxKind.RestType]: "type",
    [SyntaxKind.ParenthesizedType]: "type",
    [SyntaxKind.JSDocTypeExpression]: "type",
    [SyntaxKind.JSDocNonNullableType]: "type",
    [SyntaxKind.JSDocNullableType]: "type",
    [SyntaxKind.JSDocVariadicType]: "type",
    [SyntaxKind.JSDocOptionalType]: "type",
    [SyntaxKind.PrefixUnaryExpression]: "operand",
    [SyntaxKind.PostfixUnaryExpression]: "operand",
    [SyntaxKind.MetaProperty]: "name",
    [SyntaxKind.TypeOperator]: "type",
    [SyntaxKind.MissingDeclaration]: "modifiers",
    // Single NodeList child nodes
    [SyntaxKind.Block]: "statements",
    [SyntaxKind.VariableDeclarationList]: "declarations",
    [SyntaxKind.ImportAttributes]: "elements",
    [SyntaxKind.ArrayLiteralExpression]: "elements",
    [SyntaxKind.ObjectLiteralExpression]: "properties",
    [SyntaxKind.UnionType]: "types",
    [SyntaxKind.IntersectionType]: "types",
    [SyntaxKind.TupleType]: "elements",
    [SyntaxKind.NamedImports]: "elements",
    [SyntaxKind.NamedExports]: "elements",
    [SyntaxKind.ModuleBlock]: "statements",
    [SyntaxKind.CaseBlock]: "clauses",
    [SyntaxKind.TypeLiteral]: "members",
    [SyntaxKind.JsxAttributes]: "properties",
    [SyntaxKind.ArrayBindingPattern]: "elements",
    [SyntaxKind.ObjectBindingPattern]: "elements",
    [SyntaxKind.HeritageClause]: "types",
    [SyntaxKind.JSDocTypeLiteral]: "jsDocPropertyTags",
};

function getChildPropertiesForNode(node: Node): readonly string[] | undefined {
    const kind = node.kind;
    if (kind === SyntaxKind.JSDocParameterTag || kind === SyntaxKind.JSDocPropertyTag) {
        if ((node as JSDocPropertyLikeTag).isNameFirst) {
            return kind === SyntaxKind.JSDocParameterTag
                ? ["tagName", "name", "typeExpression", "comment"]
                : ["name", "typeExpression"];
        }
        return kind === SyntaxKind.JSDocParameterTag
            ? ["tagName", "typeExpression", "name", "comment"]
            : ["typeExpression", "name"];
    }
    return childProperties[kind] ?? [singleChildNodePropertyNames[kind]!];
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

    // We'll build an array of uint32 values for the nodes section, 6 per node
    const nodeValues: number[] = [];

    // Nil node (index 0)
    nodeValues.push(0, 0, 0, 0, 0, 0);

    let nodeCount = 0;
    let parentIndex = 0;
    let prevIndex = 0;

    function visitNode(node: Node): void {
        nodeCount++;
        const currentIndex = nodeCount;

        if (prevIndex !== 0) {
            // Set next pointer on previous sibling
            nodeValues[prevIndex * 6 + 3] = currentIndex;
        }

        const data = getNodeData(node, strs, extendedDataValues);
        nodeValues.push(
            node.kind,
            node.pos >= 0 ? node.pos : 0,
            node.end >= 0 ? node.end : 0,
            0, // next (filled in later)
            parentIndex,
            data,
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
        if (!list || list.length === 0) {
            return;
        }

        nodeCount++;
        const currentIndex = nodeCount;

        if (prevIndex !== 0) {
            nodeValues[prevIndex * 6 + 3] = currentIndex;
        }

        nodeValues.push(
            KIND_NODE_LIST,
            list.pos >= 0 ? list.pos : 0,
            list.end >= 0 ? list.end : 0,
            0, // next
            parentIndex,
            list.length, // data for NodeList is its length
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
    const rootData = getNodeData(node, strs, extendedDataValues);
    nodeValues.push(
        node.kind,
        node.pos >= 0 ? node.pos : 0,
        node.end >= 0 ? node.end : 0,
        0,
        0,
        rootData,
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
    const offsetNodes = offsetExtendedData + extendedDataBytes.length;

    // Build header
    const header = new Uint8Array(HEADER_SIZE);
    const headerView = new DataView(header.buffer);
    const metadata = PROTOCOL_VERSION << 24;
    headerView.setUint32(0, metadata, true); // metadata
    // bytes 4-19: hash (zero for non-SourceFile, we don't have access to xxh3 here)
    // byte 20-23: parse options (zero for non-SourceFile)
    headerView.setUint32(24, offsetStringTableOffsets, true);
    headerView.setUint32(28, offsetStringTableData, true);
    headerView.setUint32(32, offsetExtendedData, true);
    headerView.setUint32(36, offsetNodes, true);

    // Concatenate all sections
    const result = new Uint8Array(header.length + strsBytes.length + extendedDataBytes.length + nodesBytes.length);
    result.set(header, 0);
    result.set(strsBytes, HEADER_SIZE);
    result.set(extendedDataBytes, offsetExtendedData);
    result.set(nodesBytes, offsetNodes);
    return result;
}

/**
 * Encode a Uint8Array to a base64 string.
 */
export function uint8ArrayToBase64(data: Uint8Array): string {
    return Buffer.from(data).toString("base64");
}
