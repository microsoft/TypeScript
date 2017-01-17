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

        const startPos: number = classDecl.members.pos;
        const classType = checker.getTypeAtLocation(classDecl);
        const implementedTypeNodes = getClassImplementsHeritageClauseElements(classDecl);

        const hasNumericIndexSignature = !!checker.getIndexTypeOfType(classType, IndexKind.Number);
        const hasStringIndexSignature = !!checker.getIndexTypeOfType(classType, IndexKind.String);

        const result: CodeAction[] = [];
        for (const implementedTypeNode of implementedTypeNodes) {
            const implementedType = checker.getTypeFromTypeNode(implementedTypeNode) as InterfaceType;
            // Note that this is ultimately derived from a map indexed by symbol names,
            // so duplicates cannot occur.
            const implementedTypeSymbols = checker.getPropertiesOfType(implementedType);
            const nonPrivateMembers = implementedTypeSymbols.filter(symbol => !(getModifierFlags(symbol.valueDeclaration) & ModifierFlags.Private));

            let insertion = getMissingIndexSignatureInsertion(implementedType, IndexKind.Number, classDecl, hasNumericIndexSignature);
            insertion += getMissingIndexSignatureInsertion(implementedType, IndexKind.String, classDecl, hasStringIndexSignature);
            insertion += getMissingMembersInsertion(classDecl, nonPrivateMembers, checker, context.newLineCharacter);

            const message = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Implement_interface_0), [implementedTypeNode.getText()]);
            if (insertion) {
                pushAction(result, insertion, message);
            }
        }

        return result;

        function getMissingIndexSignatureInsertion(type: InterfaceType, kind: IndexKind, enclosingDeclaration: ClassLikeDeclaration, hasIndexSigOfKind: boolean) {
            if (!hasIndexSigOfKind) {
                const IndexInfoOfKind = checker.getIndexInfoOfType(type, kind);
                if (IndexInfoOfKind) {
                    const writer = getSingleLineStringWriter();
                    checker.getSymbolDisplayBuilder().buildIndexSignatureDisplay(IndexInfoOfKind, writer, kind, enclosingDeclaration);
                    const result = writer.string();
                    releaseStringWriter(writer);

                    return result;
                }
            }
            return "";
        }

        function pushAction(result: CodeAction[], insertion: string, description: string): void {
            const newAction: CodeAction = {
                description: description,
                changes: [{
                    fileName: sourceFile.fileName,
                    textChanges: [{
                        span: { start: startPos, length: 0 },
                        newText: insertion
                    }]
                }]
            };
            result.push(newAction);
        }
    }
}