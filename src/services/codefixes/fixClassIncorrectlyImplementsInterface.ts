/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Class_0_incorrectly_implements_interface_1.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const checker = context.program.getTypeChecker();

            const classDecl = getContainingClass(token);
            if (!classDecl) {
                return undefined;
            }

            const startPos: number = classDecl.members.pos;

            const implementedTypeNodes = getClassImplementsHeritageClauseElements(classDecl);

            const result: CodeAction[] = [];

            for (const implementedTypeNode of implementedTypeNodes) {
                const implementedType = checker.getTypeFromTypeReference(implementedTypeNode);
                // Note that this is ultimately derived from a map indexed by symbol names,
                // so duplicates cannot occur.
                const implementedTypeSymbols = checker.getPropertiesOfType(implementedType);
                const nonPrivateMembers = implementedTypeSymbols.filter(symbolRefersToNonPrivateMember);

                const insertion = getMissingMembersInsertion(classDecl, nonPrivateMembers, checker, context.newLineCharacter);
                pushAction(result, insertion, getLocaleSpecificMessage(Diagnostics.Implement_interface_on_class));
            }

            return result;

            function symbolRefersToNonPrivateMember(symbol: Symbol): boolean {
                const decls = symbol.getDeclarations();
                Debug.assert(!!(decls && decls.length > 0));
                return !(getModifierFlags(decls[0]) & ModifierFlags.Private);
            }

            function pushAction(result: CodeAction[], insertion: string, description: string): void {
                if (insertion && insertion.length) {
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
    });
}