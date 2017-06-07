/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Constructors_for_derived_classes_must_contain_a_super_call.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const token = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);

            if (token.kind !== SyntaxKind.ConstructorKeyword) {
                return undefined;
            }

            const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
            const superCall = createStatement(createCall(createSuper(), /*typeArguments*/ undefined, /*argumentsArray*/ emptyArray));
            changeTracker.insertNodeAfter(sourceFile, getOpenBrace(<ConstructorDeclaration>token.parent, sourceFile), superCall, { suffix: context.newLineCharacter });

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Add_missing_super_call),
                changes: changeTracker.getChanges()
            }];
        }
    });
}