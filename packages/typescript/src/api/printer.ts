import { EmitFlags } from "../../enums/emitFlags.js";
import { SyntaxKind } from "../../enums/syntaxKind.js";
import {
    getOriginalNode,
    type Node,
} from "../ast/index.ts";
import {
    encodeNode,
    uint8ArrayToBase64,
} from "./node/encoder.ts";
import {
    getRemoteNodeLocation,
    type RemoteSourceFile,
    sourceFileDescriptor,
} from "./node/node.ts";
import type {
    PrintOriginalNode,
    SourceFileDescriptor,
} from "./proto.generated.ts";

export interface PrintNodeOptions {
    preserveSourceNewlines?: boolean | undefined;
    neverAsciiEscape?: boolean | undefined;
    terminateUnterminatedLiterals?: boolean | undefined;
    emitContext?: EmitContext | undefined;
}

type CommentKind = SyntaxKind.MultiLineCommentTrivia | SyntaxKind.SingleLineCommentTrivia;

export interface SynthesizedComment {
    kind: CommentKind;
    text: string;
    hasTrailingNewLine: boolean;
    hasLeadingNewLine: boolean;
}

/** @internal */
interface EmitNode {
    emitFlags: EmitFlags;
    leadingComments: SynthesizedComment[] | undefined;
    trailingComments: SynthesizedComment[] | undefined;
}

export interface EmitContext {
    /** @internal */
    getEmitNode(node: Node): EmitNode | undefined;
    setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags): T;
    getEmitFlags(node: Node): EmitFlags;

    addSyntheticLeadingComment(node: Node, kind: CommentKind, text: string, hasTrailingNewLine: boolean, hasLeadingNewLine: boolean): Node;
    setSyntheticLeadingComments<T extends Node>(node: T, comments: SynthesizedComment[]): T;
    getSyntheticLeadingComments(node: Node): readonly SynthesizedComment[] | undefined;

    addSyntheticTrailingComment(node: Node, kind: CommentKind, text: string, hasTrailingNewLine: boolean, hasLeadingNewLine: boolean): Node;
    setSyntheticTrailingComments<T extends Node>(node: T, comments: SynthesizedComment[]): T;
    getSyntheticTrailingComments(node: Node): readonly SynthesizedComment[] | undefined;

    /**
     * Suppresses emission of the source comments before and after `node`. Comments inside the
     * node are still emitted. `NoLeadingComments` and `NoTrailingComments` hide comments at a
     * node's start and end, including those of descendants sharing that position, so the flags
     * are also added to first and last descendants until one with a source position is reached.
     */
    suppressLeadingAndTrailingComments<T extends Node>(node: T): T;
}

/** @internal */
export function encodePrintNode(node: Node, emitContext: EmitContext | undefined): {
    data: string;
    emitNodes: Record<number, EmitNode> | undefined;
    originalFiles: SourceFileDescriptor[] | undefined;
    originalNodes: Record<number, PrintOriginalNode> | undefined;
} {
    let emitNodes: Record<number, EmitNode> | undefined;
    let originalFiles: SourceFileDescriptor[] | undefined;
    let originalNodes: Record<number, PrintOriginalNode> | undefined;
    const fileIndices = new Map<RemoteSourceFile, number>();
    const encoded = encodeNode(node, (node, index) => {
        const original = getOriginalNode(node);
        const location = original !== node ? getRemoteNodeLocation(original) : undefined;
        if (location) {
            let file = fileIndices.get(location.sourceFile);
            if (file === undefined) {
                file = (originalFiles ??= []).push(sourceFileDescriptor(location.sourceFile)) - 1;
                fileIndices.set(location.sourceFile, file);
            }
            (originalNodes ??= {})[index] = { file, index: location.index };
        }
        const emitNode = emitContext?.getEmitNode(node);
        if (emitNode === undefined) return;
        (emitNodes ??= {})[index] = {
            emitFlags: emitNode.emitFlags,
            leadingComments: emitNode.leadingComments?.map(c => ({ ...c })),
            trailingComments: emitNode.trailingComments?.map(c => ({ ...c })),
        };
    });
    return { data: uint8ArrayToBase64(encoded), emitNodes, originalFiles, originalNodes };
}

/** @internal */
export function createEmitContext(): EmitContext {
    const emitNodes = new WeakMap<Node, EmitNode>();

    function getOrCreateEmitNode(node: Node): EmitNode {
        let emitNode = emitNodes.get(node);
        if (!emitNode) {
            emitNode = { emitFlags: 0 as EmitFlags, leadingComments: undefined, trailingComments: undefined };
            emitNodes.set(node, emitNode);
        }
        return emitNode;
    }

    return {
        getEmitNode(node) {
            return emitNodes.get(node);
        },
        setEmitFlags(node, emitFlags) {
            getOrCreateEmitNode(node).emitFlags = emitFlags;
            return node;
        },
        getEmitFlags(node) {
            return emitNodes.get(node)?.emitFlags ?? 0 as EmitFlags;
        },

        addSyntheticLeadingComment(node, kind, text, hasTrailingNewLine, hasLeadingNewLine) {
            (getOrCreateEmitNode(node).leadingComments ??= []).push({ kind, text, hasTrailingNewLine, hasLeadingNewLine });
            return node;
        },
        setSyntheticLeadingComments(node, comments) {
            getOrCreateEmitNode(node).leadingComments = comments;
            return node;
        },
        getSyntheticLeadingComments(node) {
            return emitNodes.get(node)?.leadingComments;
        },

        addSyntheticTrailingComment(node, kind, text, hasTrailingNewLine, hasLeadingNewLine) {
            (getOrCreateEmitNode(node).trailingComments ??= []).push({ kind, text, hasTrailingNewLine, hasLeadingNewLine });
            return node;
        },
        setSyntheticTrailingComments(node, comments) {
            getOrCreateEmitNode(node).trailingComments = comments;
            return node;
        },
        getSyntheticTrailingComments(node) {
            return emitNodes.get(node)?.trailingComments;
        },

        suppressLeadingAndTrailingComments(node) {
            for (let n: Node | undefined = node; n; n = n.pos < 0 ? getFirstChild(n) : undefined) {
                getOrCreateEmitNode(n).emitFlags |= EmitFlags.NoLeadingComments;
            }
            for (let n: Node | undefined = node; n; n = n.end < 0 ? getLastChild(n) : undefined) {
                getOrCreateEmitNode(n).emitFlags |= EmitFlags.NoTrailingComments;
            }
            return node;
        },
    };
}

function getFirstChild(node: Node): Node | undefined {
    return node.forEachChild(child => child);
}

function getLastChild(node: Node): Node | undefined {
    let lastChild: Node | undefined;
    node.forEachChild(
        child => {
            if (nodeIsPresent(child)) lastChild = child;
        },
        children => {
            for (let i = children.length - 1; i >= 0; i--) {
                if (nodeIsPresent(children[i])) {
                    lastChild = children[i];
                    break;
                }
            }
        },
    );
    return lastChild;
}

function nodeIsPresent(node: Node): boolean {
    return node.pos !== node.end || node.pos < 0 || node.kind === SyntaxKind.EndOfFile;
}
