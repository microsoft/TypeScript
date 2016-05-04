/// <reference path="binder.ts" />

// TODO: Does @internal protected the contents from being publically visible?
/* @internal */
namespace ts {
    // this is unprincipled -- it's just a test and should be moved back probably
    export function cloneSymbolTable(symbolTable: SymbolTable): SymbolTable {
        const result: SymbolTable = {};
        for (const id in symbolTable) {
            if (hasProperty(symbolTable, id)) {
                result[id] = symbolTable[id];
            }
        }
        return result;
    }

    export function isGlobalSourceFile(node: Node) {
        return node.kind === SyntaxKind.SourceFile && !isExternalOrCommonJsModule(<SourceFile>node);
    }

    /* Starting from 'initial' node walk up the parent chain until 'stopAt' node is reached.
     * If at any point current node is equal to 'parent' node - return true.
     * Return false if 'stopAt' node is reached or isFunctionLike(current) === true.
     */
    export function isSameScopeDescendentOf(initial: Node, parent: Node, stopAt: Node): boolean {
        if (!parent) {
            return false;
        }
        for (let current = initial; current && current !== stopAt && !isFunctionLike(current); current = current.parent) {
            if (current === parent) {
                return true;
            }
        }
        return false;
    }

    export function getAnyImportSyntax(node: Node): AnyImportSyntax {
        if (isAliasSymbolDeclaration(node)) {
            if (node.kind === SyntaxKind.ImportEqualsDeclaration) {
                return <ImportEqualsDeclaration>node;
            }

            while (node && node.kind !== SyntaxKind.ImportDeclaration) {
                node = node.parent;
            }
            return <ImportDeclaration>node;
        }
    }

    export function getDeclarationOfAliasSymbol(symbol: Symbol): Declaration {
        return forEach(symbol.declarations, d => isAliasSymbolDeclaration(d) ? d : undefined);
    }
}
