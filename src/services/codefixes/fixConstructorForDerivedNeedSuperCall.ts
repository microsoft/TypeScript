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

            const body = (<ConstructorDeclaration>token.parent).body;

            if (!body) {
                return undefined;
            }

            const superCall = startOnNewLine(createStatement(createCall(createSuper(), /*typeArguments*/ undefined, /*argumentsArray*/ emptyArray)));
            const statements: Statement[] = [superCall];
            addRange(statements, body.statements);

            const fixedBody = getMutableClone(body);
            fixedBody.multiLine = true;
            fixedBody.statements = createNodeArray(statements);

            const changeTracker = textChanges.ChangeTracker.fromContext(context);
            changeTracker.replaceNode(sourceFile, body, fixedBody);

            return [{
                description: getLocaleSpecificMessage(Diagnostics.Add_missing_super_call),
                changes: changeTracker.getChanges()
            }];
        }
    });
}