import {
    __String,
    CompilerOptions,
    createNameResolver,
    createSymbolTable,
    Declaration,
    escapeLeadingUnderscores,
    findAncestor,
    forEachChild,
    getTokenAtPosition,
    isIdentifier,
    rangeContainsPosition,
    rangeContainsRange,
    SourceFile,
    SymbolFlags,
    SymbolTable,
    TextRange,
    TransientSymbol,
} from "./_namespaces/ts.js";
import { isInImport } from "./refactors/moveToFile.js";

/** @internal */
export function preparePasteEdits(
    sourceFile: SourceFile,
    copiedFromRange: TextRange[],
    compilerOptions: CompilerOptions,
): boolean {
    let shouldProvidePasteEdits = false;
    const symbol: TransientSymbol = {} as TransientSymbol;
    const globals = createSymbolTable();
    const nameResolver = createNameResolver({
        compilerOptions,
        globals,
        getSymbolOfDeclaration(node: Declaration) {
            return node.symbol;
        },
        error: () => {},
        getRequiresScopeChangeCache() {
            return undefined;
        },
        setRequiresScopeChangeCache() {
            return undefined;
        },
        lookup(symbols: SymbolTable, name: __String, _meaning: SymbolFlags) {
            return symbols.get(name);
        },
        requireSymbol: symbol,
        argumentsSymbol: symbol,
    });
    copiedFromRange.forEach(range => {
        const enclosingNode = findAncestor(
            getTokenAtPosition(sourceFile, range.pos),
            ancestorNode => rangeContainsRange(ancestorNode, range),
        );
        if (!enclosingNode) return;
        forEachChild(enclosingNode, function checkNameResolution(node) {
            if (shouldProvidePasteEdits) return;
            if (isIdentifier(node) && rangeContainsPosition(range, node.getStart(sourceFile))) {
                const resolvedSymbol = nameResolver(node, escapeLeadingUnderscores(node.text), SymbolFlags.All, /*nameNotFoundMessage*/ undefined, /*isUse*/ false, /*excludeGlobals*/ true);
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
