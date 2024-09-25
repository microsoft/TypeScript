import {
    findAncestor,
    forEachChild,
    getTokenAtPosition,
    isIdentifier,
    rangeContainsPosition,
    rangeContainsRange,
    SourceFile,
    SymbolFlags,
    TextRange,
    TypeChecker,
} from "./_namespaces/ts.js";
import { isInImport } from "./refactors/moveToFile.js";

/** @internal */
export function preparePasteEdits(
    sourceFile: SourceFile,
    copiedFromRange: TextRange[],
    checker: TypeChecker,
): boolean {
    let shouldProvidePasteEdits = false;
    copiedFromRange.forEach(range => {
        const enclosingNode = findAncestor(
            getTokenAtPosition(sourceFile, range.pos),
            ancestorNode => rangeContainsRange(ancestorNode, range),
        );
        if (!enclosingNode) return;
        forEachChild(enclosingNode, function checkNameResolution(node) {
            if (shouldProvidePasteEdits) return;
            if (isIdentifier(node) && rangeContainsPosition(range, node.getStart(sourceFile))) {
                const resolvedSymbol = checker.resolveName(node.text, node, SymbolFlags.All, /*excludeGlobals*/ false);
                if (resolvedSymbol && resolvedSymbol.declarations) {
                    for (const decl of resolvedSymbol.declarations) {
                        if (isInImport(decl) || !!(node.text && sourceFile.symbol && sourceFile.symbol.exports?.has(node.escapedText))) {
                            shouldProvidePasteEdits = true;
                            return;
                        }
                    }
                }
            }
            node.forEachChild(checkNameResolution);
        });
        if (shouldProvidePasteEdits) return;
    });
    return shouldProvidePasteEdits;
}
