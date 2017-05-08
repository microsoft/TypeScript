/* @internal */
namespace ts.refactor {

    const asyncSuffixRefactor: Refactor = {
        name: "Add Async suffix",
        description: "Add an 'Async' suffix to async function declarations",
        getCodeActions,
        isApplicableForPositionOrRange
    };

    registerRefactor(asyncSuffixRefactor);

    function getCodeActions(context: RefactorContext, positionOrRange: number | TextRange): CodeAction[] | undefined {
        const { boundSourceFile, program } = context;
        const tokenPos = typeof positionOrRange === "number" ? positionOrRange : positionOrRange.pos;
        const token = getTokenAtPosition(boundSourceFile, tokenPos);

        const functionSymbol = program.getTypeChecker().getSymbolAtLocation(token);
        if (!(functionSymbol.flags & SymbolFlags.Function)) {
            return undefined;
        }

        const oldNameNode = functionSymbol.valueDeclaration.name as Identifier;
        const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);

        changeTracker.replaceNode(boundSourceFile, oldNameNode, createIdentifier(functionSymbol.name + "Async"));

        return [{
            changes: changeTracker.getChanges(),
            description: asyncSuffixRefactor.description
        }];
    }

    function isApplicableForPositionOrRange(context: LightRefactorContext, positionOrRange: number | TextRange): boolean {
        const { nonBoundSourceFile } = context;
        const tokenPos = typeof positionOrRange === "number" ? positionOrRange : positionOrRange.pos;
        const token = getTokenAtPosition(nonBoundSourceFile, tokenPos);

        let node = token;
        while (node) {
            if (node.kind === SyntaxKind.FunctionDeclaration) {
                const nameNode = (<FunctionDeclaration>node).name;
                const modifiers = (<FunctionDeclaration>node).modifiers;
                const hasAsyncModifier = modifiers && forEach(modifiers, modifier => modifier.kind === SyntaxKind.AsyncKeyword);
                return hasAsyncModifier && nameNode === token && !nameNode.text.match(/.*[aA]sync$/g);
            }
            node = node.parent;
        }
        return false;
    }
}