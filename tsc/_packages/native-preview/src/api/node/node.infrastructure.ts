import {
    type FileReference,
    ModifierFlags,
    type Node,
    type NodeArray,
    SyntaxKind,
} from "../../ast/index.ts";
import {
    HEADER_OFFSET_HASH_HI0,
    HEADER_OFFSET_HASH_HI1,
    HEADER_OFFSET_HASH_LO0,
    HEADER_OFFSET_HASH_LO1,
    HEADER_OFFSET_PARSE_OPTIONS,
    NODE_DATA_TYPE_CHILDREN,
    NODE_DATA_TYPE_EXTENDED,
    NODE_DATA_TYPE_STRING,
    NODE_OFFSET_DATA,
    NODE_OFFSET_END,
    NODE_OFFSET_KIND,
    NODE_OFFSET_NEXT,
    NODE_OFFSET_PARENT,
    NODE_OFFSET_POS,
} from "./protocol.ts";

// ═══════════════════════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════════════════════

export const popcount8: number[] = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 1, 2, 2, 3, 2, 3, 3, 4, 2, 3, 3, 4, 3, 4, 4, 5, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 2, 3, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5, 4, 5, 5, 6, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 3, 4, 4, 5, 4, 5, 5, 6, 4, 5, 5, 6, 5, 6, 6, 7, 4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8];

export type NodeDataType = typeof NODE_DATA_TYPE_CHILDREN | typeof NODE_DATA_TYPE_STRING | typeof NODE_DATA_TYPE_EXTENDED;
export const NODE_DATA_TYPE_MASK = 0xc0_00_00_00;
export const NODE_CHILD_MASK = 0x00_00_00_ff;
export const NODE_STRING_INDEX_MASK = 0x00_ff_ff_ff;
export const NODE_EXTENDED_DATA_MASK = 0x00_ff_ff_ff;

// ═══════════════════════════════════════════════════════════════════════════
// SourceFileInfo — the interface RemoteNode/RemoteNodeList need from the
// source file, avoiding a direct dependency on RemoteSourceFile.
// ═══════════════════════════════════════════════════════════════════════════

export interface SourceFileInfo {
    readonly _offsetNodes: number;
    readonly _offsetStringTableOffsets: number;
    readonly _offsetStringTable: number;
    readonly _offsetExtendedData: number;
    readonly _offsetStructuredData: number;
    readonly _decoder: TextDecoder;
    nodes: any[];
    readonly path?: string;
    readFileReferences(offset: number): readonly FileReference[];
    readNodeIndexArray(offset: number): readonly Node[];
    readStringArray(offset: number): readonly string[];
    getOrCreateNodeAtIndex(index: number): Node;
}

// ═══════════════════════════════════════════════════════════════════════════
// Free functions
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Read the 128-bit content hash from a source file binary response as a hex string.
 */
export function readSourceFileHash(data: DataView): string {
    const lo0 = data.getUint32(HEADER_OFFSET_HASH_LO0, true);
    const lo1 = data.getUint32(HEADER_OFFSET_HASH_LO1, true);
    const hi0 = data.getUint32(HEADER_OFFSET_HASH_HI0, true);
    const hi1 = data.getUint32(HEADER_OFFSET_HASH_HI1, true);
    return hex8(hi1) + hex8(hi0) + hex8(lo1) + hex8(lo0);
}

/**
 * Read the per-file parse options key from a source file binary response.
 * This encodes the ExternalModuleIndicatorOptions bitmask as a string,
 * allowing the client to distinguish files parsed with different options.
 */
export function readParseOptionsKey(data: DataView): string {
    return data.getUint32(HEADER_OFFSET_PARSE_OPTIONS, true).toString();
}

function hex8(n: number): string {
    return (n >>> 0).toString(16).padStart(8, "0");
}

export function modifierToFlag(kind: SyntaxKind): ModifierFlags {
    switch (kind) {
        case SyntaxKind.StaticKeyword:
            return ModifierFlags.Static;
        case SyntaxKind.PublicKeyword:
            return ModifierFlags.Public;
        case SyntaxKind.ProtectedKeyword:
            return ModifierFlags.Protected;
        case SyntaxKind.PrivateKeyword:
            return ModifierFlags.Private;
        case SyntaxKind.AbstractKeyword:
            return ModifierFlags.Abstract;
        case SyntaxKind.AccessorKeyword:
            return ModifierFlags.Accessor;
        case SyntaxKind.ExportKeyword:
            return ModifierFlags.Export;
        case SyntaxKind.DeclareKeyword:
            return ModifierFlags.Ambient;
        case SyntaxKind.ConstKeyword:
            return ModifierFlags.Const;
        case SyntaxKind.DefaultKeyword:
            return ModifierFlags.Default;
        case SyntaxKind.AsyncKeyword:
            return ModifierFlags.Async;
        case SyntaxKind.ReadonlyKeyword:
            return ModifierFlags.Readonly;
        case SyntaxKind.OverrideKeyword:
            return ModifierFlags.Override;
        case SyntaxKind.InKeyword:
            return ModifierFlags.In;
        case SyntaxKind.OutKeyword:
            return ModifierFlags.Out;
        case SyntaxKind.Decorator:
            return ModifierFlags.Decorator;
        default:
            return ModifierFlags.None;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// RemoteNodeBase
// ═══════════════════════════════════════════════════════════════════════════

export class RemoteNodeBase {
    parent: any; // RemoteNode at runtime
    view: DataView;
    protected index: number;
    protected _byteIndex: number;

    constructor(view: DataView, index: number, parent: any, byteIndex: number) {
        this.view = view;
        this.index = index;
        this.parent = parent;
        this._byteIndex = byteIndex;
    }

    get kind(): SyntaxKind {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_KIND, true);
    }

    get pos(): number {
        return this.view.getInt32(this._byteIndex + NODE_OFFSET_POS, true);
    }

    get end(): number {
        return this.view.getInt32(this._byteIndex + NODE_OFFSET_END, true);
    }

    get next(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_NEXT, true);
    }

    protected get parentIndex(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_PARENT, true);
    }

    protected get data(): number {
        return this.view.getUint32(this._byteIndex + NODE_OFFSET_DATA, true);
    }

    protected get dataType(): NodeDataType {
        return (this.data & NODE_DATA_TYPE_MASK) as NodeDataType;
    }

    protected get childMask(): number {
        if (this.dataType !== NODE_DATA_TYPE_CHILDREN) {
            return -1;
        }
        return this.data & NODE_CHILD_MASK;
    }

    protected getFileText(start: number, end: number): string {
        return this.sourceFile._decoder.decode(new Uint8Array(this.view.buffer, this.view.byteOffset + this.sourceFile._offsetStringTable + start, end - start));
    }

    protected get sourceFile(): SourceFileInfo {
        // Overridden in RemoteNode; exists here for getFileText access
        throw new Error("sourceFile not available on base");
    }
}
