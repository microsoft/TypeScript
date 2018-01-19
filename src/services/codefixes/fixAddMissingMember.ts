/* @internal */
namespace ts.codefix {
    const errorCodes = [
        Diagnostics.Property_0_does_not_exist_on_type_1.code,
        Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code,
    ];
    const fixId = "addMissingMember";
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const info = getInfo(context.sourceFile, context.span.start, context.program.getTypeChecker());
            if (!info) return undefined;
            const { classDeclaration, classDeclarationSourceFile, inJs, makeStatic, token, call } = info;
            const methodCodeAction = call && getActionForMethodDeclaration(context, classDeclarationSourceFile, classDeclaration, token, call, makeStatic, inJs);
            const addMember = inJs ?
                singleElementArray(getActionsForAddMissingMemberInJavaScriptFile(context, classDeclarationSourceFile, classDeclaration, token.text, makeStatic)) :
                getActionsForAddMissingMemberInTypeScriptFile(context, classDeclarationSourceFile, classDeclaration, token, makeStatic);
            return concatenate(singleElementArray(methodCodeAction), addMember);
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const seenNames = createMap<true>();
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const { program } = context;
                const info = getInfo(diag.file!, diag.start!, program.getTypeChecker());
                if (!info) return;
                const { classDeclaration, classDeclarationSourceFile, inJs, makeStatic, token, call } = info;
                if (!addToSeen(seenNames, token.text)) {
                    return;
                }

                // Always prefer to add a method declaration if possible.
                if (call) {
                    addMethodDeclaration(changes, classDeclarationSourceFile, classDeclaration, token, call, makeStatic, inJs);
                }
                else {
                    if (inJs) {
                        addMissingMemberInJs(changes, classDeclarationSourceFile, classDeclaration, token.text, makeStatic);
                    }
                    else {
                        const typeNode = getTypeNode(program.getTypeChecker(), classDeclaration, token);
                        addPropertyDeclaration(changes, classDeclarationSourceFile, classDeclaration, token.text, typeNode, makeStatic);
                    }
                }
            });
        },
    });

    interface Info { token: Identifier; classDeclaration: ClassLikeDeclaration; makeStatic: boolean; classDeclarationSourceFile: SourceFile; inJs: boolean; call: CallExpression; }
    function getInfo(tokenSourceFile: SourceFile, tokenPos: number, checker: TypeChecker): Info | undefined {
        // The identifier of the missing property. eg:
        // this.missing = 1;
        //      ^^^^^^^
        const token = getTokenAtPosition(tokenSourceFile, tokenPos, /*includeJsDocComment*/ false);
        if (!isIdentifier(token)) {
            return undefined;
        }

        const classAndMakeStatic = getClassAndMakeStatic(token, checker);
        if (!classAndMakeStatic) {
            return undefined;
        }
        const { classDeclaration, makeStatic } = classAndMakeStatic;
        const classDeclarationSourceFile = classDeclaration.getSourceFile();
        const inJs = isInJavaScriptFile(classDeclarationSourceFile);
        const call = tryCast(token.parent.parent, isCallExpression);

        return { token, classDeclaration, makeStatic, classDeclarationSourceFile, inJs, call };
    }

    function getClassAndMakeStatic(token: Node, checker: TypeChecker): { readonly classDeclaration: ClassLikeDeclaration, readonly makeStatic: boolean } | undefined {
        const { parent } = token;
        if (!isPropertyAccessExpression(parent)) {
            return undefined;
        }

        if (parent.expression.kind === SyntaxKind.ThisKeyword) {
            const containingClassMemberDeclaration = getThisContainer(token, /*includeArrowFunctions*/ false);
            if (!isClassElement(containingClassMemberDeclaration)) {
                return undefined;
            }
            const classDeclaration = containingClassMemberDeclaration.parent;
            // Property accesses on `this` in a static method are accesses of a static member.
            return isClassLike(classDeclaration) ? { classDeclaration, makeStatic: hasModifier(containingClassMemberDeclaration, ModifierFlags.Static) } : undefined;
        }
        else {
            const leftExpressionType = checker.getTypeAtLocation(parent.expression);
            const { symbol } = leftExpressionType;
            if (!(leftExpressionType.flags & TypeFlags.Object && symbol.flags & SymbolFlags.Class)) {
                return undefined;
            }
            const classDeclaration = cast(first(symbol.declarations), isClassLike);
            // The expression is a class symbol but the type is not the instance-side.
            return { classDeclaration, makeStatic: leftExpressionType !== checker.getDeclaredTypeOfSymbol(symbol) };
        }
    }

    function getActionsForAddMissingMemberInJavaScriptFile(context: CodeFixContext, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, tokenName: string, makeStatic: boolean): CodeFixAction | undefined {
        const changes = textChanges.ChangeTracker.with(context, t => addMissingMemberInJs(t, classDeclarationSourceFile, classDeclaration, tokenName, makeStatic));
        if (changes.length === 0) return undefined;
        const description = formatStringFromArgs(getLocaleSpecificMessage(makeStatic ? Diagnostics.Initialize_static_property_0 : Diagnostics.Initialize_property_0_in_the_constructor), [tokenName]);
        return { description, changes, fixId };
    }

    function addMissingMemberInJs(changeTracker: textChanges.ChangeTracker, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, tokenName: string, makeStatic: boolean): void {
        if (makeStatic) {
            if (classDeclaration.kind === SyntaxKind.ClassExpression) {
                return;
            }
            const className = classDeclaration.name.getText();
            const staticInitialization = initializePropertyToUndefined(createIdentifier(className), tokenName);
            changeTracker.insertNodeAfter(classDeclarationSourceFile, classDeclaration, staticInitialization);
        }
        else {
            const classConstructor = getFirstConstructorWithBody(classDeclaration);
            if (!classConstructor) {
                return;
            }
            const propertyInitialization = initializePropertyToUndefined(createThis(), tokenName);
            changeTracker.insertNodeAtConstructorEnd(classDeclarationSourceFile, classConstructor, propertyInitialization);
        }
    }

    function initializePropertyToUndefined(obj: Expression, propertyName: string) {
        return createStatement(createAssignment(createPropertyAccess(obj, propertyName), createIdentifier("undefined")));
    }

    function getActionsForAddMissingMemberInTypeScriptFile(context: CodeFixContext, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, token: Identifier, makeStatic: boolean): CodeFixAction[] | undefined {
        const typeNode = getTypeNode(context.program.getTypeChecker(), classDeclaration, token);
        const addProp = createAddPropertyDeclarationAction(context, classDeclarationSourceFile, classDeclaration, makeStatic, token.text, typeNode);
        return makeStatic ? [addProp] : [addProp, createAddIndexSignatureAction(context, classDeclarationSourceFile, classDeclaration, token.text, typeNode)];
    }

    function getTypeNode(checker: TypeChecker, classDeclaration: ClassLikeDeclaration, token: Node) {
        let typeNode: TypeNode;
        if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
            const binaryExpression = token.parent.parent as BinaryExpression;
            const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
            const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)));
            typeNode = checker.typeToTypeNode(widenedType, classDeclaration);
        }
        return typeNode || createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function createAddPropertyDeclarationAction(context: CodeFixContext, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, makeStatic: boolean, tokenName: string, typeNode: TypeNode): CodeFixAction {
        const description = formatStringFromArgs(getLocaleSpecificMessage(makeStatic ? Diagnostics.Declare_static_property_0 : Diagnostics.Declare_property_0), [tokenName]);
        const changes = textChanges.ChangeTracker.with(context, t => addPropertyDeclaration(t, classDeclarationSourceFile, classDeclaration, tokenName, typeNode, makeStatic));
        return { description, changes, fixId };
    }

    function addPropertyDeclaration(changeTracker: textChanges.ChangeTracker, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, tokenName: string, typeNode: TypeNode, makeStatic: boolean): void {
        const property = createProperty(
            /*decorators*/ undefined,
            /*modifiers*/ makeStatic ? [createToken(SyntaxKind.StaticKeyword)] : undefined,
            tokenName,
            /*questionToken*/ undefined,
            typeNode,
            /*initializer*/ undefined);
        changeTracker.insertNodeAtClassStart(classDeclarationSourceFile, classDeclaration, property);
    }

    function createAddIndexSignatureAction(context: CodeFixContext, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, tokenName: string, typeNode: TypeNode): CodeFixAction {
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

        const changes = textChanges.ChangeTracker.with(context, t => t.insertNodeAtClassStart(classDeclarationSourceFile, classDeclaration, indexSignature));
        // No fixId here because code-fix-all currently only works on adding individual named properties.
        return { description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Add_index_signature_for_property_0), [tokenName]), changes, fixId: undefined };
    }

    function getActionForMethodDeclaration(context: CodeFixContext, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, token: Identifier, callExpression: CallExpression, makeStatic: boolean, inJs: boolean): CodeFixAction | undefined {
        const description = formatStringFromArgs(getLocaleSpecificMessage(makeStatic ? Diagnostics.Declare_static_method_0 : Diagnostics.Declare_method_0), [token.text]);
        const changes = textChanges.ChangeTracker.with(context, t => addMethodDeclaration(t, classDeclarationSourceFile, classDeclaration, token, callExpression, makeStatic, inJs));
        return { description, changes, fixId };
    }

    function addMethodDeclaration(changeTracker: textChanges.ChangeTracker, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, token: Identifier, callExpression: CallExpression, makeStatic: boolean, inJs: boolean) {
        const methodDeclaration = createMethodFromCallExpression(callExpression, token.text, inJs, makeStatic);
        changeTracker.insertNodeAtClassStart(classDeclarationSourceFile, classDeclaration, methodDeclaration);
    }
}
