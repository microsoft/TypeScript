/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Class_0_incorrectly_implements_interface_1.code],
        getCodeActions: getActionForClassLikeIncorrectImplementsInterface
    });

    function getActionForClassLikeIncorrectImplementsInterface(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;
        const start = context.span.start;
        const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
        const checker = context.program.getTypeChecker();

        const classDeclaration = getContainingClass(token);
        if (!classDeclaration) {
            return undefined;
        }

        const openBrace = getOpenBraceOfClassLike(classDeclaration, sourceFile);
        const classType = checker.getTypeAtLocation(classDeclaration) as InterfaceType;
        const implementedTypeNodes = getClassImplementsHeritageClauseElements(classDeclaration);

        const hasNumericIndexSignature = !!checker.getIndexTypeOfType(classType, IndexKind.Number);
        const hasStringIndexSignature = !!checker.getIndexTypeOfType(classType, IndexKind.String);

        const result: CodeAction[] = [];
        for (const implementedTypeNode of implementedTypeNodes) {
            // Note that this is ultimately derived from a map indexed by symbol names,
            // so duplicates cannot occur.
            const implementedType = checker.getTypeAtLocation(implementedTypeNode) as InterfaceType;
            const implementedTypeSymbols = checker.getPropertiesOfType(implementedType);
            const nonPrivateMembers = implementedTypeSymbols.filter(symbol => !(getModifierFlags(symbol.valueDeclaration) & ModifierFlags.Private));

            let newNodes: Node[] = [];
            createAndAddMissingIndexSignatureDeclaration(implementedType, IndexKind.Number, hasNumericIndexSignature, newNodes);
            createAndAddMissingIndexSignatureDeclaration(implementedType, IndexKind.String, hasStringIndexSignature, newNodes);
            newNodes = newNodes.concat(createMissingMemberNodes(classDeclaration, nonPrivateMembers, checker));
            const message = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Implement_interface_0), [implementedTypeNode.getText()]);
            if (newNodes.length > 0) {
                pushAction(result, newNodes, message);
            }
        }

        return result;

        function createAndAddMissingIndexSignatureDeclaration(type: InterfaceType, kind: IndexKind, hasIndexSigOfKind: boolean, newNodes: Node[]): void {
            if (hasIndexSigOfKind) {
                return;
            }

            const indexInfoOfKind = checker.getIndexInfoOfType(type, kind);

            if (!indexInfoOfKind) {
                return;
            }
            const newIndexSignatureDeclaration = checker.indexInfoToIndexSignatureDeclaration(indexInfoOfKind, kind, classDeclaration);
            newNodes.push(newIndexSignatureDeclaration);
        }

        function pushAction(result: CodeAction[], newNodes: Node[], description: string): void {
            const newAction: CodeAction = {
                description: description,
                changes: newNodesToChanges(newNodes, openBrace, context)
            };
            result.push(newAction);
        }
    }
}