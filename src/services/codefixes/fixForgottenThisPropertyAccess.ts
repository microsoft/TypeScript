/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const token = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);
            if (token.kind !== SyntaxKind.Identifier) {
                return undefined;
            }
            const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
            changeTracker.replaceNode(sourceFile, token, createPropertyAccess(createThis(), <Identifier>token));

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Add_this_to_unresolved_variable),
                changes: changeTracker.getChanges()
            }];
        }
    });
}