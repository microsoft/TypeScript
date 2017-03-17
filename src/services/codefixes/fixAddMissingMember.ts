/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Property_0_does_not_exist_on_type_1.code],
        getCodeActions: getActionsForAddMissingMember
    });

    function getActionsForAddMissingMember(context: CodeFixContext): CodeAction[] | undefined {

        const sourceFile = context.sourceFile;
        const start = context.span.start;
        // This is the identifier of the missing property. eg:
        // this.missing = 1;
        //      ^^^^^^^
        const token = getTokenAtPosition(sourceFile, start);

        if (token.kind != SyntaxKind.Identifier) {
            return undefined;
        }

        const classDeclaration = getContainingClass(token);
        if (!classDeclaration) {
            return undefined;
        }

        if (!(token.parent && token.parent.kind === SyntaxKind.PropertyAccessExpression)) {
            return undefined;
        }

        if ((token.parent as PropertyAccessExpression).expression.kind !== SyntaxKind.ThisKeyword) {
            return undefined;
        }

        let typeNode: TypeNode = createKeywordTypeNode(SyntaxKind.AnyKeyword);

        if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
            const binaryExpression = token.parent.parent as BinaryExpression;

            const checker = context.program.getTypeChecker();
            const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(binaryExpression.right)));
            typeNode = checker.createTypeNode(widenedType, classDeclaration) || typeNode;
        }

        const openBrace = getOpenBraceOfClassLike(classDeclaration, sourceFile);

        const property = createProperty(
              /*decorators*/undefined
            , /*modifiers*/ undefined
            , token.getText(sourceFile)
            , /*questionToken*/ undefined
            , typeNode
            , /*initializer*/ undefined);
        // TODO: make index signature.
        const propertyChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
        propertyChangeTracker.insertNodeAfter(sourceFile, openBrace, property, { suffix: context.newLineCharacter });

        const stringTypeNode = createKeywordTypeNode(SyntaxKind.StringKeyword);
        const indexingParameter = createParameter(
             /*decorators*/ undefined
            , /*modifiers*/ undefined
            , /*dotDotDotToken*/ undefined
            , "x"
            , /*questionToken*/ undefined
            , stringTypeNode
            , /*initializer*/ undefined);
        const indexSignature = createIndexSignatureDeclaration(
              [indexingParameter]
            , typeNode
            , /*decorators*/undefined
            , /*modifiers*/ undefined);

        const indexSignatureChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
        indexSignatureChangeTracker.insertNodeAfter(sourceFile, openBrace, indexSignature, { suffix: context.newLineCharacter });

        return [{
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_declaration_for_missing_property_0), [token.getText()]),
            changes: propertyChangeTracker.getChanges()
        },
        {
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_index_signature_for_missing_property_0), [token.getText()]),
            changes: indexSignatureChangeTracker.getChanges()
        }];
    }
}