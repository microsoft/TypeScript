/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Cannot_access_0_1_because_0_is_a_type_but_not_a_namespace_Did_you_mean_to_retrieve_the_type_of_the_property_1_in_0_with_0_1.code],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const token = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);
            const qualifiedName = getAncestor(token, SyntaxKind.QualifiedName) as QualifiedName;
            Debug.assert(!!qualifiedName, "Expected position to be owned by a qualified name.");
            if (!isIdentifier(qualifiedName.left)) {
                return undefined;
            }
            const leftText = qualifiedName.left.getText(sourceFile);
            const rightText = qualifiedName.right.getText(sourceFile);
            const replacement = createIndexedAccessTypeNode(
                createTypeReferenceNode(qualifiedName.left, /*typeArguments*/ undefined),
                createLiteralTypeNode(createLiteral(rightText)));
            const changeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
            changeTracker.replaceNode(sourceFile, qualifiedName, replacement);

            return [{
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Rewrite_as_the_indexed_access_type_0), [`${leftText}["${rightText}"]`]),
                changes: changeTracker.getChanges()
            }];
        }
    });
}
