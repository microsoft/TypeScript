/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const token = getTokenAtPosition(sourceFile, context.span.start);

            if (token.kind !== SyntaxKind.ConstructorKeyword) {
                return undefined;
            }

            const newPosition = getOpenBraceEnd(<ConstructorDeclaration>token.parent, sourceFile);
            return [{
                description: getLocaleSpecificMessage(Diagnostics.Add_missing_super_call),
                changes: [{ fileName: sourceFile.fileName, textChanges: [{ newText: "super();", span: { start: newPosition, length: 0 } }] }]
            }];
        }
    });
}