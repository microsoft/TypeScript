import { SyntaxKind } from "#enums/syntaxKind";
import type { Node } from "./ast.ts";

export interface SynthesizedComment {
    readonly kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;
    readonly text: string;
    readonly hasTrailingNewLine?: boolean | undefined;
}

const leadingComments = new WeakMap<Node, SynthesizedComment[]>();
const trailingComments = new WeakMap<Node, SynthesizedComment[]>();

function add(store: WeakMap<Node, SynthesizedComment[]>, node: Node, comment: SynthesizedComment): void {
    const existing = store.get(node);
    if (existing) {
        existing.push(comment);
    }
    else {
        store.set(node, [comment]);
    }
}

/**
 * Attaches a synthetic comment before `node`. It is emitted by the printer when the node is printed.
 * For multi-line comments `text` excludes the `/*` and `*\/` delimiters, so a JSDoc block is `"*\n * text\n "`.
 */
export function addSyntheticLeadingComment<T extends Node>(
    node: T,
    kind: SynthesizedComment["kind"],
    text: string,
    hasTrailingNewLine?: boolean,
): T {
    add(leadingComments, node, { kind, text, hasTrailingNewLine });
    return node;
}

/** Attaches a synthetic comment after `node`. */
export function addSyntheticTrailingComment<T extends Node>(
    node: T,
    kind: SynthesizedComment["kind"],
    text: string,
    hasTrailingNewLine?: boolean,
): T {
    add(trailingComments, node, { kind, text, hasTrailingNewLine });
    return node;
}

export function getSyntheticLeadingComments(node: Node): readonly SynthesizedComment[] | undefined {
    return leadingComments.get(node);
}

export function getSyntheticTrailingComments(node: Node): readonly SynthesizedComment[] | undefined {
    return trailingComments.get(node);
}

export function setSyntheticLeadingComments<T extends Node>(node: T, comments: readonly SynthesizedComment[] | undefined): T {
    if (comments) leadingComments.set(node, [...comments]);
    else leadingComments.delete(node);
    return node;
}

export function setSyntheticTrailingComments<T extends Node>(node: T, comments: readonly SynthesizedComment[] | undefined): T {
    if (comments) trailingComments.set(node, [...comments]);
    else trailingComments.delete(node);
    return node;
}
