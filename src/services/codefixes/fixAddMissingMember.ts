/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Property_0_does_not_exist_on_type_1.code,
                     Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code],
        getCodeActions: getActionsForAddMissingMember
    });

    function getActionsForAddMissingMember(context: CodeFixContext): CodeAction[] | undefined {

        const tokenSourceFile = context.sourceFile;
        const start = context.span.start;
        // The identifier of the missing property. eg:
        // this.missing = 1;
        //      ^^^^^^^
        const token = getTokenAtPosition(tokenSourceFile, start, /*includeJsDocComment*/ false);

        if (token.kind !== SyntaxKind.Identifier) {
            return undefined;
        }

        if (!isPropertyAccessExpression(token.parent)) {
            return undefined;
        }

        const tokenName = token.getText(tokenSourceFile);

        let makeStatic = false;
        let classDeclaration: ClassLikeDeclaration;

        if (token.parent.expression.kind === SyntaxKind.ThisKeyword) {
            const containingClassMemberDeclaration = getThisContainer(token, /*includeArrowFunctions*/ false);
            if (!isClassElement(containingClassMemberDeclaration)) {
                return undefined;
            }

            classDeclaration = <ClassLikeDeclaration>containingClassMemberDeclaration.parent;

            // Property accesses on `this` in a static method are accesses of a static member.
            makeStatic = classDeclaration && hasModifier(containingClassMemberDeclaration, ModifierFlags.Static);
        }
        else {

            const checker = context.program.getTypeChecker();
            const leftExpression = token.parent.expression;
            const leftExpressionType = checker.getTypeAtLocation(leftExpression);

            if (leftExpressionType.flags & TypeFlags.Object) {
                const symbol = leftExpressionType.symbol;
                if (symbol.flags & SymbolFlags.Class) {
                    classDeclaration = symbol.declarations && <ClassLikeDeclaration>symbol.declarations[0];
                    if (leftExpressionType !== checker.getDeclaredTypeOfSymbol(symbol)) {
                        // The expression is a class symbol but the type is not the instance-side.
                        makeStatic = true;
                    }
                }
            }
        }

        if (!classDeclaration || !isClassLike(classDeclaration)) {
            return undefined;
        }

        const classDeclarationSourceFile = getSourceFileOfNode(classDeclaration);
        const classOpenBrace = getOpenBraceOfClassLike(classDeclaration, classDeclarationSourceFile);

        return isInJavaScriptFile(classDeclarationSourceFile) ?
            getActionsForAddMissingMemberInJavaScriptFile(classDeclaration, makeStatic) :
            getActionsForAddMissingMemberInTypeScriptFile(classDeclaration, makeStatic);

        function getActionsForAddMissingMemberInJavaScriptFile(classDeclaration: ClassLikeDeclaration, makeStatic: boolean): CodeAction[] | undefined {
            let actions: CodeAction[];

            const methodCodeAction = getActionForMethodDeclaration(/*includeTypeScriptSyntax*/ false);
            if (methodCodeAction) {
                actions = [methodCodeAction];
            }

            if (makeStatic) {
                if (classDeclaration.kind === SyntaxKind.ClassExpression) {
                    return actions;
                }

                const className = classDeclaration.name.getText();

                const staticInitialization = createStatement(createAssignment(
                    createPropertyAccess(createIdentifier(className), tokenName),
                    createIdentifier("undefined")));

                const staticInitializationChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
                staticInitializationChangeTracker.insertNodeAfter(
                    classDeclarationSourceFile,
                    classDeclaration,
                    staticInitialization,
                    { suffix: context.newLineCharacter });
                const initializeStaticAction = {
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Initialize_static_property_0), [tokenName]),
                    changes: staticInitializationChangeTracker.getChanges()
                };

                (actions || (actions = [])).push(initializeStaticAction);
                return actions;
            }
            else {
                const classConstructor = getFirstConstructorWithBody(classDeclaration);
                if (!classConstructor) {
                    return actions;
                }

                const propertyInitialization = createStatement(createAssignment(
                    createPropertyAccess(createThis(), tokenName),
                    createIdentifier("undefined")));

                const propertyInitializationChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
                propertyInitializationChangeTracker.insertNodeAt(
                    classDeclarationSourceFile,
                    classConstructor.body.getEnd() - 1,
                    propertyInitialization,
                    { prefix: context.newLineCharacter, suffix: context.newLineCharacter });

                const initializeAction = {
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Initialize_property_0_in_the_constructor), [tokenName]),
                    changes: propertyInitializationChangeTracker.getChanges()
                };

                (actions || (actions = [])).push(initializeAction);
                return actions;
            }
        }

        function getActionsForAddMissingMemberInTypeScriptFile(classDeclaration: ClassLikeDeclaration, makeStatic: boolean): CodeAction[] | undefined {
            let actions: CodeAction[];

            const methodCodeAction = getActionForMethodDeclaration(/*includeTypeScriptSyntax*/ true);
            if (methodCodeAction) {
                actions = [methodCodeAction];
            }

            let typeNode: TypeNode;
            if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
                const binaryExpression = token.parent.parent as BinaryExpression;
                const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
                const checker = context.program.getTypeChecker();
                const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)));
                typeNode = checker.typeToTypeNode(widenedType, classDeclaration);
            }
            typeNode = typeNode || createKeywordTypeNode(SyntaxKind.AnyKeyword);

            const property = createProperty(
                /*decorators*/undefined,
                /*modifiers*/ makeStatic ? [createToken(SyntaxKind.StaticKeyword)] : undefined,
                tokenName,
                /*questionToken*/ undefined,
                typeNode,
                /*initializer*/ undefined);
            const propertyChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
            propertyChangeTracker.insertNodeAfter(classDeclarationSourceFile, classOpenBrace, property, { suffix: context.newLineCharacter });

            (actions || (actions = [])).push({
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Declare_property_0), [tokenName]),
                changes: propertyChangeTracker.getChanges()
            });

            if (!makeStatic) {
                // Index signatures cannot have the static modifier.
                const stringTypeNode = createKeywordTypeNode(SyntaxKind.StringKeyword);
                const indexingParameter = createParameter(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    /*dotDotDotToken*/ undefined,
                    "x",
                    /*questionToken*/ undefined,
                    stringTypeNode,
                    /*initializer*/ undefined);
                const indexSignature = createIndexSignature(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    [indexingParameter],
                    typeNode);

                const indexSignatureChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
                indexSignatureChangeTracker.insertNodeAfter(classDeclarationSourceFile, classOpenBrace, indexSignature, { suffix: context.newLineCharacter });

                actions.push({
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_index_signature_for_property_0), [tokenName]),
                    changes: indexSignatureChangeTracker.getChanges()
                });
            }

            return actions;
        }

        function getActionForMethodDeclaration(includeTypeScriptSyntax: boolean): CodeAction | undefined {
            if (token.parent.parent.kind === SyntaxKind.CallExpression) {
                const callExpression = <CallExpression>token.parent.parent;
                const methodDeclaration = createMethodFromCallExpression(callExpression, tokenName, includeTypeScriptSyntax, makeStatic);

                const methodDeclarationChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
                methodDeclarationChangeTracker.insertNodeAfter(classDeclarationSourceFile, classOpenBrace, methodDeclaration, { suffix: context.newLineCharacter });
                return {
                    description: formatStringFromArgs(getLocaleSpecificMessage(makeStatic ?
                        Diagnostics.Declare_method_0 :
                        Diagnostics.Declare_static_method_0),
                        [tokenName]),
                    changes: methodDeclarationChangeTracker.getChanges()
                };
            }
        }
    }
}
