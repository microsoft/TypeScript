// @strict: true
// @noEmit: true
// @checkOrder: default, typesfirst, editorfirst

// Names in JSDoc links resolve to types and namespaces without errors,
// whether or not the editor asked about the comment first (59401).

interface TextDocument { uri: string; getText(): string }
namespace NS { export interface Inner { a: number } }

/**
 * Uses {@link TextDocument} and {@link TextDocument.getText}.
 * Also {@link NS.Inner}.
 */
export function f(doc: TextDocument): string {
    return doc.getText();
}
