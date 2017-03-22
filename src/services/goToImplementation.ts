/* @internal */
namespace ts.GoToImplementation {
    export function getImplementationAtPosition(typeChecker: TypeChecker, cancellationToken: CancellationToken, sourceFiles: SourceFile[], node: Node): ImplementationLocation[] {
        const context = new FindAllReferences.FindImplementationsContext(typeChecker, cancellationToken);
        // If invoked directly on a shorthand property assignment, then return
        // the declaration of the symbol being assigned (not the symbol being assigned to).
        if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
            const result: ImplementationLocation[] = [];
            FindAllReferences.getReferenceEntriesForShorthandPropertyAssignment(node, context, result);
            return result.length > 0 ? result : undefined;
        }
        else if (node.kind === SyntaxKind.SuperKeyword || isSuperProperty(node.parent)) {
            // References to and accesses on the super keyword only have one possible implementation, so no
            // need to "Find all References"
            const symbol = typeChecker.getSymbolAtLocation(node);
            return symbol.valueDeclaration && [context.getReferenceEntryFromNode(symbol.valueDeclaration)];
        }
        else {
            // Perform "Find all References" and retrieve only those that are implementations
            const referencedSymbols = FindAllReferences.getReferencedSymbolsForNode(context,
                node, sourceFiles, /*findInStrings*/false, /*findInComments*/false, /*isForRename*/false, /*implementations*/true);
            const result = flatMap(referencedSymbols, symbol => symbol.references);

            return result && result.length > 0 ? result : undefined;
        }
    }
}
