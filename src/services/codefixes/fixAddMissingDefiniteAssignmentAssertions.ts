/* @internal */
namespace ts.codefix {
    const fixId = "addMissingDefiniteAssignmentAssertions";
    const errorCodes = [Diagnostics.Property_0_has_no_initializer_and_is_not_definitely_assigned_in_the_constructor.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const info = getInfo(context.sourceFile, context.span.start);
            if (!info) return undefined;
            const { token, propertyDeclaration } = info;
            return getActionsForAddMissingDefiniteAssignmentAssertion(context, token, propertyDeclaration);
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const seenNames = createMap<true>();
            const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);

            return codeFixAll(context, errorCodes, (changes, diag) => {
                const info = getInfo(diag.file!, diag.start!);
                if (!info) return undefined;

                const { token, propertyDeclaration } = info;
                if (!addToSeen(seenNames, token.text)) {
                    return;
                }

                addDefiniteAssignmentAssertion(changes, diag.file, propertyDeclaration, newLineCharacter);
            });
        },
    });

    interface Info { token: Identifier; propertyDeclaration: PropertyDeclaration; }
    function getInfo (sourceFile: SourceFile, pos: number): Info | undefined {
        const token = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        if (!isIdentifier(token)) {
            return undefined;
        }

        const propertyDeclaration = token.parent;
        if (!isPropertyDeclaration(propertyDeclaration)) {
            return undefined;
        }

        return { token, propertyDeclaration };
    }

    function getActionsForAddMissingDefiniteAssignmentAssertion (context: CodeFixContext, token: Identifier, propertyDeclaration: PropertyDeclaration): CodeFixAction[] | undefined {
        const newLineCharacter = getNewLineOrDefaultFromHost(context.host, context.formatContext.options);
        const description = formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Declare_property_0), [token.text]);
        const changes = textChanges.ChangeTracker.with(context, t => addDefiniteAssignmentAssertion(t, context.sourceFile, propertyDeclaration, newLineCharacter));
        const action = { description, changes, fixId };
        return [ action ];
    }

    function addDefiniteAssignmentAssertion(changeTracker: textChanges.ChangeTracker, propertyDeclarationSourceFile: SourceFile, propertyDeclaration: PropertyDeclaration, newLineCharacter: string): void {
        const property = clone(propertyDeclaration);
        property.exclamationToken = createToken(SyntaxKind.ExclamationToken);
        changeTracker.replaceNode(propertyDeclarationSourceFile, propertyDeclaration, property, { suffix: newLineCharacter });
    }
}
