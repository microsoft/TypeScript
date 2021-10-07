/* eslint-disable no-fallthrough */
/* @internal */
namespace ts.snippets {
    // interface SnippetWriter extends EmitTextWriter, PrintHandlers {}

    // function createSnippetWriter(newLine: string): SnippetWriter {
    //     const substituteNode = (_hint: EmitHint, node: Node) => {
    //         switch (node.kind) {
    //             // Comments:
    //             // TODO: doesn't work because comments are `TextRanges` with a syntax kind, but are not nodes.
    //             // case SyntaxKind.SingleLineCommentTrivia:
    //             // case SyntaxKind.MultiLineCommentTrivia:
    //             //     return escapeTrivia(node);
    //             // >> comments are emitted in previous phase
    //             // String-like literals:
    //             case SyntaxKind.StringLiteral: // >> emitLiteral
    //                 return escapeLiteralLikeNode(node as StringLiteral);
    //             case SyntaxKind.RegularExpressionLiteral: // >> emitLiteral
    //                 return escapeLiteralLikeNode(node as RegularExpressionLiteral);
    //             case SyntaxKind.NoSubstitutionTemplateLiteral: // >> emitLiteral
    //                 // Has .rawText but also .text
    //             // Templates:
    //             // >> .rawText
    //             case SyntaxKind.TemplateHead: // >> emitLiteral
    //             case SyntaxKind.TemplateMiddle: // >> emitLiteral
    //             case SyntaxKind.TemplateTail: // >> emitLiteral
    //             // Identifiers:
    //             case SyntaxKind.Identifier: // >> emitIdentifier
    //             case SyntaxKind.PrivateIdentifier: // >> emitPrivateIdentifier
    //             // Other:
    //             // >> TODO: JSX? JSDoc?

    //                 return undefined;
    //         }
    //         return node;
    //     };

    //     const writer = createTextWriter(newLine);


    //     return {
    //         ...writer,
    //         substituteNode,
    //     };
    // }

    // function escapeLiteralLikeNode<T extends LiteralLikeNode>(node: T): T {
    //     const copy = getSynthesizedDeepClone(node);
    //     copy.text = escapeSnippetText(node.text);
    //     return copy;
    // }

    // function escapeSnippetText(text: string): string {
    //     return text.replace(/\$/gm, "\\$");
    // }
}
