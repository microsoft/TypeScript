/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Class_0_incorrectly_implements_interface_1.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const checker = context.program.getTypeChecker();

            if (token.kind === SyntaxKind.Identifier && isClassLike(token.parent)) {
                const classDeclaration = <ClassDeclaration>token.parent;
                const startPos: number = classDeclaration.members.pos;

                const insertion = getMissingInterfaceMembersInsertion(classDeclaration, checker, context.newLineCharacter);

                if (insertion && insertion.length) {
                    return [{
                        description: getLocaleSpecificMessage(Diagnostics.Implement_interface_on_class),
                        changes: [{
                            fileName: sourceFile.fileName,
                            textChanges: [{
                                span: { start: startPos, length: 0 },
                                newText: insertion
                            }]
                        }]
                    }];
                }
            }
            return undefined;
        }
    });
}