import {
    type FileReference,
    type Node,
    NodeFlags,
    type Path,
    SyntaxKind,
    TokenFlags,
} from "../../ast/index.ts";
import { MsgpackReader } from "./msgpack.ts";
import {
    RemoteNode,
    RemoteNodeList,
} from "./node.generated.ts";
import {
    NODE_EXTENDED_DATA_MASK,
    type SourceFileInfo,
} from "./node.infrastructure.ts";
import {
    HEADER_OFFSET_EXTENDED_DATA,
    HEADER_OFFSET_NODES,
    HEADER_OFFSET_STRING_TABLE,
    HEADER_OFFSET_STRING_TABLE_OFFSETS,
    HEADER_OFFSET_STRUCTURED_DATA,
    NODE_LEN,
} from "./protocol.ts";

// Re-export everything consumers need from the other two files.
export { RemoteNode, RemoteNodeList } from "./node.generated.ts";
export { readParseOptionsKey, readSourceFileHash, RemoteNodeBase } from "./node.infrastructure.ts";

// ═══════════════════════════════════════════════════════════════════════════
// RemoteSourceFile
// ═══════════════════════════════════════════════════════════════════════════

const NO_STRUCTURED_DATA = 0xFFFFFFFF;

export class RemoteSourceFile extends RemoteNode implements SourceFileInfo {
    readonly nodes: (RemoteNode | RemoteNodeList)[];
    readonly _offsetNodes: number;
    readonly _offsetStringTableOffsets: number;
    readonly _offsetStringTable: number;
    readonly _offsetExtendedData: number;
    readonly _offsetStructuredData: number;
    readonly _decoder: TextDecoder;

    constructor(data: Uint8Array, decoder: TextDecoder) {
        const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
        const offsetNodes = view.getUint32(HEADER_OFFSET_NODES, true);
        super(view, 1, undefined!, undefined!, offsetNodes);
        this._sourceFile = this;
        this._offsetNodes = offsetNodes;
        this._offsetStringTableOffsets = view.getUint32(HEADER_OFFSET_STRING_TABLE_OFFSETS, true);
        this._offsetStringTable = view.getUint32(HEADER_OFFSET_STRING_TABLE, true);
        this._offsetExtendedData = view.getUint32(HEADER_OFFSET_EXTENDED_DATA, true);
        this._offsetStructuredData = view.getUint32(HEADER_OFFSET_STRUCTURED_DATA, true);
        this._decoder = decoder;
        this.nodes = Array((view.byteLength - offsetNodes) / NODE_LEN);
        this.nodes[1] = this;
    }

    readFileReferences(structuredDataOffset: number): readonly FileReference[] {
        if (structuredDataOffset === NO_STRUCTURED_DATA) {
            return [];
        }
        const buf = new Uint8Array(this.view.buffer, this.view.byteOffset, this.view.byteLength);
        const reader = new MsgpackReader(buf, this._offsetStructuredData + structuredDataOffset);
        const count = reader.readArrayHeader();
        const result: FileReference[] = [];
        for (let i = 0; i < count; i++) {
            reader.readArrayHeader(); // 5-element tuple
            const pos = reader.readUint();
            const end = reader.readUint();
            const fileName = reader.readString();
            const resolutionMode = reader.readUint();
            const preserve = reader.readBool();
            result.push({ pos, end, fileName, resolutionMode, preserve });
        }
        return result;
    }

    readNodeIndexArray(structuredDataOffset: number): readonly Node[] {
        if (structuredDataOffset === NO_STRUCTURED_DATA) {
            return [];
        }
        const buf = new Uint8Array(this.view.buffer, this.view.byteOffset, this.view.byteLength);
        const reader = new MsgpackReader(buf, this._offsetStructuredData + structuredDataOffset);
        const count = reader.readArrayHeader();
        const result: Node[] = [];
        for (let i = 0; i < count; i++) {
            const nodeIndex = reader.readUint();
            result.push(this.getOrCreateNodeAtIndex(nodeIndex));
        }
        return result;
    }

    readStringArray(structuredDataOffset: number): readonly string[] {
        if (structuredDataOffset === NO_STRUCTURED_DATA) {
            return [];
        }
        const buf = new Uint8Array(this.view.buffer, this.view.byteOffset, this.view.byteLength);
        const reader = new MsgpackReader(buf, this._offsetStructuredData + structuredDataOffset);
        const count = reader.readArrayHeader();
        const result: string[] = [];
        for (let i = 0; i < count; i++) {
            result.push(reader.readString());
        }
        return result;
    }

    /** @internal */
    getOrCreateNodeAtIndex(index: number): Node {
        let node = this.nodes[index];
        if (!node) {
            node = new RemoteNode(this.view, index, this, this, this._offsetNodes);
            this.nodes[index] = node;
        }
        return node as Node;
    }

    // ═══ SourceFile-specific extended data getters ═══

    private get extendedDataOffset(): number {
        return this._offsetExtendedData + (this.data & NODE_EXTENDED_DATA_MASK);
    }

    get fileName(): string {
        const stringIndex = this.view.getUint32(this.extendedDataOffset + 4, true);
        return this.getString(stringIndex);
    }

    get path(): string {
        const stringIndex = this.view.getUint32(this.extendedDataOffset + 8, true);
        return this.getString(stringIndex);
    }

    get languageVariant(): number {
        return this.view.getUint32(this.extendedDataOffset + 12, true);
    }

    get scriptKind(): number {
        return this.view.getUint32(this.extendedDataOffset + 16, true);
    }

    get referencedFiles(): readonly FileReference[] {
        const offset = this.view.getUint32(this.extendedDataOffset + 20, true);
        return this.readFileReferences(offset);
    }

    get typeReferenceDirectives(): readonly FileReference[] {
        const offset = this.view.getUint32(this.extendedDataOffset + 24, true);
        return this.readFileReferences(offset);
    }

    get libReferenceDirectives(): readonly FileReference[] {
        const offset = this.view.getUint32(this.extendedDataOffset + 28, true);
        return this.readFileReferences(offset);
    }

    get imports(): readonly Node[] {
        const offset = this.view.getUint32(this.extendedDataOffset + 32, true);
        return this.readNodeIndexArray(offset);
    }

    get moduleAugmentations(): readonly Node[] {
        const offset = this.view.getUint32(this.extendedDataOffset + 36, true);
        return this.readNodeIndexArray(offset);
    }

    get ambientModuleNames(): readonly string[] {
        const offset = this.view.getUint32(this.extendedDataOffset + 40, true);
        return this.readStringArray(offset);
    }

    get externalModuleIndicator(): Node | true | undefined {
        const nodeIndex = this.view.getUint32(this.extendedDataOffset + 44, true);
        if (nodeIndex === 0) return undefined;
        if (nodeIndex === this.index) return true;
        return this.getOrCreateNodeAtIndex(nodeIndex) as Node;
    }

    get isDeclarationFile(): boolean {
        return (this.flags & NodeFlags.Ambient) !== 0;
    }
}

/**
 * Find a descendant node at a specific position with matching kind and end position.
 */
export function findDescendant(root: Node, pos: number, end: number, kind: SyntaxKind): Node | undefined {
    if (root.pos === pos && root.end === end && root.kind === kind) {
        return root;
    }

    // Search children
    let result: Node | undefined;
    root.forEachChild(child => {
        if (result) return result; // Already found
        // Only search in children that could contain our target
        if (child.pos <= pos && child.end >= end) {
            result = findDescendant(child, pos, end, kind);
        }
        return undefined;
    });

    return result;
}

/**
 * Parsed components of a node handle.
 */
export interface ParsedNodeHandle {
    pos: number;
    end: number;
    kind: SyntaxKind;
    path: Path;
}

/**
 * Parse a node handle string into its components.
 * Handle format: "pos.end.kind.path" where path may contain dots.
 */
export function parseNodeHandle(handle: string): ParsedNodeHandle {
    const dot1 = handle.indexOf(".");
    const dot2 = handle.indexOf(".", dot1 + 1);
    const dot3 = handle.indexOf(".", dot2 + 1);

    if (dot1 === -1 || dot2 === -1 || dot3 === -1) {
        throw new Error(`Invalid node handle: ${handle}`);
    }

    return {
        pos: parseInt(handle.slice(0, dot1), 10),
        end: parseInt(handle.slice(dot1 + 1, dot2), 10),
        kind: parseInt(handle.slice(dot2 + 1, dot3), 10) as SyntaxKind,
        path: handle.slice(dot3 + 1) as Path,
    };
}

/**
 * Decode binary-encoded AST data into a Node.
 * Works for any binary-encoded node, including synthetic nodes
 * (e.g. from typeToTypeNode) that don't have a source file.
 */
export function decodeNode(data: Uint8Array): Node {
    const sf = new RemoteSourceFile(data, new TextDecoder());
    return sf as unknown as Node;
}

/**
 * Get the unique ID string for a remote node.
 * Throws if the node is not a RemoteNode (i.e. not decoded from binary data).
 */
export function getNodeId(node: Node): string {
    if (!(node instanceof RemoteNode)) {
        throw new Error("getNodeId requires a RemoteNode");
    }
    return node.id;
}
