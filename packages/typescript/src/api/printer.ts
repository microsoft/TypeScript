import { EmitFlags } from "../../enums/emitFlags.js";
import type {
    Node,
    SyntaxKind,
} from "../ast/index.ts";
import {
    encodeNode,
    uint8ArrayToBase64,
} from "./node/encoder.ts";

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
}

/** @internal */
export function encodePrintNode(node: Node, emitContext: EmitContext | undefined): { data: string; emitNodes: Record<number, EmitNode> | undefined; } {
    let emitNodes: Record<number, EmitNode> | undefined;
    const encoded = encodeNode(node, (node, index) => {
        const emitNode = emitContext?.getEmitNode(node);
        if (emitNode === undefined) return;
        (emitNodes ??= {})[index] = {
            emitFlags: emitNode.emitFlags,
            leadingComments: emitNode.leadingComments?.map(c => ({ ...c })),
            trailingComments: emitNode.trailingComments?.map(c => ({ ...c })),
        };
    });
    return { data: uint8ArrayToBase64(encoded), emitNodes };
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
    };
}
