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
                const classMembers = ts.map(getNamedClassMembers(classDeclaration), member => member.name.getText());
                const trackingAddedMembers: string[] = [];
                const interfaceClauses = ts.getClassImplementsHeritageClauseElements(classDeclaration);

                let textChanges: TextChange[] = undefined;

                for (let i = 0; interfaceClauses && i < interfaceClauses.length; i++) {
                    const newChanges = getCodeFixChanges(interfaceClauses[i], classMembers, startPos, checker, /*reference*/ false, trackingAddedMembers, context.newLineCharacter);
                    textChanges = textChanges ? textChanges.concat(newChanges) : newChanges;
                }

                if (textChanges && textChanges.length > 0) {
                    return [{
                        description: getLocaleSpecificMessage(Diagnostics.Implement_interface_on_class),
                        changes: [{
                            fileName: sourceFile.fileName,
                            textChanges: textChanges
                        }]
                    }];
                }
            }

            return undefined;
        }
    });
}