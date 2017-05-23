/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Property_0_does_not_exist_on_type_1.code,
                     Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code],
        getCodeActions: getActionsForAddMissingMember
    });

    function getActionsForAddMissingMember(context: CodeFixContext): CodeAction[] | undefined {

        const sourceFile = context.sourceFile;
        const start = context.span.start;
        // This is the identifier of the missing property. eg:
        // this.missing = 1;
        //      ^^^^^^^
        const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);

        if (token.kind !== SyntaxKind.Identifier) {
            return undefined;
        }

        if (!isPropertyAccessExpression(token.parent) || token.parent.expression.kind !== SyntaxKind.ThisKeyword) {
            return undefined;
        }

        const classMemberDeclaration = getThisContainer(token, /*includeArrowFunctions*/ false);
        if (!isClassElement(classMemberDeclaration)) {
            return undefined;
        }

        const classDeclaration = <ClassLikeDeclaration>classMemberDeclaration.parent;
        if (!classDeclaration || !isClassLike(classDeclaration)) {
            return undefined;
        }

        const tokenName = token.getText(sourceFile);
        const isStatic = hasModifier(classMemberDeclaration, ModifierFlags.Static);

        return isInJavaScriptFile(sourceFile) ? getActionsForAddMissingMemberInJavaScriptFile() : getActionsForAddMissingMemberInTypeScriptFile();

        function getActionsForAddMissingMemberInJavaScriptFile(): CodeAction[] | undefined {
            if (isStatic) {
                if (classDeclaration.kind === SyntaxKind.ClassExpression) {
                    return undefined;
                }

                const className = classDeclaration.name.getText();

                return [{
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Initialize_static_property_0), [tokenName]),
                    changes: [{
                        fileName: sourceFile.fileName,
                        textChanges: [{
                            span: { start: classDeclaration.getEnd(), length: 0 },
                            newText: `${context.newLineCharacter}${className}.${tokenName} = undefined;${context.newLineCharacter}`
                        }]
                    }]
                }];

            }
            else {
                const classConstructor = getFirstConstructorWithBody(classDeclaration);
                if (!classConstructor) {
                    return undefined;
                }

                return [{
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Initialize_property_0_in_the_constructor), [tokenName]),
                    changes: [{
                        fileName: sourceFile.fileName,
                        textChanges: [{
                            span: { start: classConstructor.body.getEnd() - 1, length: 0 },
                            newText: `this.${tokenName} = undefined;${context.newLineCharacter}`
                        }]
                    }]
                }];
            }
        }

        function getActionsForAddMissingMemberInTypeScriptFile(): CodeAction[] | undefined {
            const openBrace = getOpenBraceOfClassLike(classDeclaration, sourceFile);
            let actions: CodeAction[];

            if (token.parent.parent.kind === SyntaxKind.CallExpression) {
                const callExpression = <CallExpression>token.parent.parent;
                const methodDeclaration = createMethodFromCallExpression(callExpression, tokenName);

                const methodDeclarationChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
                methodDeclarationChangeTracker.insertNodeAfter(sourceFile, openBrace, methodDeclaration, { suffix: context.newLineCharacter });
                actions = [{
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_declaration_for_missing_method_0), [tokenName]),
                    changes: methodDeclarationChangeTracker.getChanges()
                }];
            }

            let typeNode: TypeNode;
            if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
                const binaryExpression = token.parent.parent as BinaryExpression;
                const checker = context.program.getTypeChecker();
                const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(binaryExpression.right)));
                typeNode = checker.typeToTypeNode(widenedType, classDeclaration);
            }
            typeNode = typeNode || createKeywordTypeNode(SyntaxKind.AnyKeyword);

            const property = createProperty(
                /*decorators*/undefined,
                /*modifiers*/ isStatic ? [createToken(SyntaxKind.StaticKeyword)] : undefined,
                tokenName,
                /*questionToken*/ undefined,
                typeNode,
                /*initializer*/ undefined);
            const propertyChangeTracker = textChanges.ChangeTracker.fromCodeFixContext(context);
            propertyChangeTracker.insertNodeAfter(sourceFile, openBrace, property, { suffix: context.newLineCharacter });

            (actions || (actions = [])).push({
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_declaration_for_missing_property_0), [tokenName]),
                changes: propertyChangeTracker.getChanges()
            });

            if (!isStatic) {
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
                indexSignatureChangeTracker.insertNodeAfter(sourceFile, openBrace, indexSignature, { suffix: context.newLineCharacter });

                actions.push({
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_index_signature_for_missing_property_0), [tokenName]),
                    changes: indexSignatureChangeTracker.getChanges()
                });
            }

            return actions;
        }
    }
}
