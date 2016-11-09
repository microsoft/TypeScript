/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Non_abstract_class_0_does_not_implement_inherited_abstract_member_1_from_class_2.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;
            const token = getTokenAtPosition(sourceFile, start);
            const checker = context.program.getTypeChecker();

            if (token.kind === SyntaxKind.Identifier && isClassLike(token.parent)) {
                const classDeclaration = <ClassDeclaration>token.parent;
                const startPos = classDeclaration.members.pos;

                const insertion = getMissingAbstractMemberInsertion(classDeclaration, checker, context.newLineCharacter);

                if (insertion.length > 0) {
                    return [{
                        description: getLocaleSpecificMessage(Diagnostics.Implement_inherited_abstract_class),
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