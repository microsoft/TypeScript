/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Class_0_incorrectly_implements_interface_1.code],
        getCodeActions: getActionForClassLikeIncorrectImplementsInterface
    });

    function getActionForClassLikeIncorrectImplementsInterface(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;
        const start = context.span.start;
        const token = getTokenAtPosition(sourceFile, start);
        const checker = context.program.getTypeChecker();

        const classDecl = getContainingClass(token);
        if (!classDecl) {
            return undefined;
        }

        const openBrace = getOpenBraceOfClassLike(classDecl, sourceFile);
        const classType = checker.getTypeAtLocation(classDecl) as InterfaceType;
        const implementedTypeNodes = getClassImplementsHeritageClauseElements(classDecl);

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
            newNodes = newNodes.concat(createMissingMemberNodes(classDecl, nonPrivateMembers, checker));
            const message = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Implement_interface_0), [implementedTypeNode.getText()]);
            if (newNodes.length > 0) {
                pushAction(result, newNodes, message);
            }
        }

        return result;

        function createAndAddMissingIndexSignatureDeclaration(type: InterfaceType, kind: IndexKind, hasIndexSigOfKind: boolean, newNodes: Node[]): void {
            if (hasIndexSigOfKind) {
                return undefined;
            }

            const indexInfoOfKind = checker.getIndexInfoOfType(type, kind);

            if (!indexInfoOfKind) {
                return undefined;
            }
            const typeNode = checker.createTypeNode(indexInfoOfKind.type);
            let name: string;
            const newIndexSignatureDeclaration = createIndexSignatureDeclaration(
                [createParameter(
                      /*decorators*/undefined
                    , /*modifiers*/ undefined
                    , /*dotDotDotToken*/ undefined
                    , name
                    , /*questionToken*/ undefined
                    , kind === IndexKind.String ? createKeywordTypeNode(SyntaxKind.StringKeyword) : createKeywordTypeNode(SyntaxKind.NumberKeyword))]
                , typeNode);
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