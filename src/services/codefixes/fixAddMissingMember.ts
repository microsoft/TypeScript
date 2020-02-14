/* @internal */
namespace ts.codefix {
    const fixName = "addMissingMember";
    const errorCodes = [
        Diagnostics.Property_0_does_not_exist_on_type_1.code,
        Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code,
        Diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2.code,
        Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2.code,
        Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more.code
    ];
    const fixId = "addMissingMember";
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const info = getInfo(context.sourceFile, context.span.start, context.program.getTypeChecker(), context.program);
            if (!info) return undefined;

            if (info.kind === InfoKind.Enum) {
                const { token, parentDeclaration } = info;
                const changes = textChanges.ChangeTracker.with(context, t => addEnumMemberDeclaration(t, context.program.getTypeChecker(), token, parentDeclaration));
                return [createCodeFixAction(fixName, changes, [Diagnostics.Add_missing_enum_member_0, token.text], fixId, Diagnostics.Add_all_missing_members)];
            }
            const { parentDeclaration, declSourceFile, inJs, makeStatic, token, call } = info;
            const methodCodeAction = call && getActionForMethodDeclaration(context, declSourceFile, parentDeclaration, token, call, makeStatic, inJs, context.preferences);
            const addMember = inJs && !isInterfaceDeclaration(parentDeclaration) ?
                singleElementArray(getActionsForAddMissingMemberInJavascriptFile(context, declSourceFile, parentDeclaration, token, makeStatic)) :
                getActionsForAddMissingMemberInTypeScriptFile(context, declSourceFile, parentDeclaration, token, makeStatic);
            return concatenate(singleElementArray(methodCodeAction), addMember);
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const { program, preferences } = context;
            const checker = program.getTypeChecker();
            const seen = createMap<true>();

            const typeDeclToMembers = new NodeMap<ClassOrInterface, ClassOrInterfaceInfo[]>();

            return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
                eachDiagnostic(context, errorCodes, diag => {
                    const info = getInfo(diag.file, diag.start, checker, context.program);
                    if (!info || !addToSeen(seen, getNodeId(info.parentDeclaration) + "#" + info.token.text)) {
                        return;
                    }

                    if (info.kind === InfoKind.Enum) {
                        const { token, parentDeclaration } = info;
                        addEnumMemberDeclaration(changes, checker, token, parentDeclaration);
                    }
                    else {
                        const { parentDeclaration, token } = info;
                        const infos = typeDeclToMembers.getOrUpdate(parentDeclaration, () => []);
                        if (!infos.some(i => i.token.text === token.text)) infos.push(info);
                    }
                });

                typeDeclToMembers.forEach((infos, classDeclaration) => {
                    const supers = getAllSupers(classDeclaration, checker);
                    for (const info of infos) {
                        // If some superclass added this property, don't add it again.
                        if (supers.some(superClassOrInterface => {
                            const superInfos = typeDeclToMembers.get(superClassOrInterface);
                            return !!superInfos && superInfos.some(({ token }) => token.text === info.token.text);
                        })) continue;

                        const { parentDeclaration, declSourceFile, inJs, makeStatic, token, call } = info;

                        // Always prefer to add a method declaration if possible.
                        if (call && !isPrivateIdentifier(token)) {
                            addMethodDeclaration(context, changes, declSourceFile, parentDeclaration, token, call, makeStatic, inJs, preferences);
                        }
                        else {
                            if (inJs && !isInterfaceDeclaration(parentDeclaration)) {
                                addMissingMemberInJs(changes, declSourceFile, parentDeclaration, token, makeStatic);
                            }
                            else {
                                const typeNode = getTypeNode(program.getTypeChecker(), parentDeclaration, token);
                                addPropertyDeclaration(changes, declSourceFile, parentDeclaration, token.text, typeNode, makeStatic);
                            }
                        }
                    }
                });
            }));
        },
    });

    function getAllSupers(decl: ClassOrInterface | undefined, checker: TypeChecker): readonly ClassOrInterface[] {
        const res: ClassLikeDeclaration[] = [];
        while (decl) {
            const superElement = getClassExtendsHeritageElement(decl);
            const superSymbol = superElement && checker.getSymbolAtLocation(superElement.expression);
            const superDecl = superSymbol && find(superSymbol.declarations, isClassLike);
            if (superDecl) { res.push(superDecl); }
            decl = superDecl;
        }
        return res;
    }

    type ClassOrInterface = ClassLikeDeclaration | InterfaceDeclaration;
    const enum InfoKind { Enum, ClassOrInterface }
    interface EnumInfo {
        readonly kind: InfoKind.Enum;
        readonly token: Identifier;
        readonly parentDeclaration: EnumDeclaration;
    }
    interface ClassOrInterfaceInfo {
        readonly kind: InfoKind.ClassOrInterface;
        readonly token: Identifier | PrivateIdentifier;
        readonly parentDeclaration: ClassOrInterface;
        readonly makeStatic: boolean;
        readonly declSourceFile: SourceFile;
        readonly inJs: boolean;
        readonly call: CallExpression | undefined;
    }
    type Info = EnumInfo | ClassOrInterfaceInfo;

    function getInfo(tokenSourceFile: SourceFile, tokenPos: number, checker: TypeChecker, program: Program): Info | undefined {
        // The identifier of the missing property. eg:
        // this.missing = 1;
        //      ^^^^^^^
        const token = getTokenAtPosition(tokenSourceFile, tokenPos);
        if (!isIdentifier(token) && !isPrivateIdentifier(token)) {
            return undefined;
        }

        const { parent } = token;
        if (!isPropertyAccessExpression(parent)) return undefined;

        const leftExpressionType = skipConstraint(checker.getTypeAtLocation(parent.expression));
        const { symbol } = leftExpressionType;
        if (!symbol || !symbol.declarations) return undefined;

        const isClass = find(symbol.declarations, isClassLike);
        // Don't suggest adding private identifiers to anything other than a class.
        if (!isClass && isPrivateIdentifier(token)) {
            return undefined;
        }

        // Prefer to change the class instead of the interface if they are merged
        const classOrInterface = isClass || find(symbol.declarations, isInterfaceDeclaration);
        if (classOrInterface && !program.isSourceFileFromExternalLibrary(classOrInterface.getSourceFile())) {
            const makeStatic = ((leftExpressionType as TypeReference).target || leftExpressionType) !== checker.getDeclaredTypeOfSymbol(symbol);
            // Static private identifier properties are not supported yet.
            if (makeStatic && isPrivateIdentifier(token)) return undefined;
            const declSourceFile = classOrInterface.getSourceFile();
            const inJs = isSourceFileJS(declSourceFile);
            const call = tryCast(parent.parent, isCallExpression);
            return { kind: InfoKind.ClassOrInterface, token, parentDeclaration: classOrInterface, makeStatic, declSourceFile, inJs, call };
        }
        const enumDeclaration = find(symbol.declarations, isEnumDeclaration);
        if (enumDeclaration && !isPrivateIdentifier(token) && !program.isSourceFileFromExternalLibrary(enumDeclaration.getSourceFile())) {
            return { kind: InfoKind.Enum, token, parentDeclaration: enumDeclaration };
        }
        return undefined;
    }

    function getActionsForAddMissingMemberInJavascriptFile(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, token: Identifier | PrivateIdentifier, makeStatic: boolean): CodeFixAction | undefined {
        const changes = textChanges.ChangeTracker.with(context, t => addMissingMemberInJs(t, declSourceFile, classDeclaration, token, makeStatic));
        if (changes.length === 0) {
            return undefined;
        }

        const diagnostic = makeStatic ? Diagnostics.Initialize_static_property_0 :
            isPrivateIdentifier(token) ? Diagnostics.Declare_a_private_field_named_0 : Diagnostics.Initialize_property_0_in_the_constructor;

        return createCodeFixAction(fixName, changes, [diagnostic, token.text], fixId, Diagnostics.Add_all_missing_members);
    }

    function addMissingMemberInJs(changeTracker: textChanges.ChangeTracker, declSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, token: Identifier | PrivateIdentifier, makeStatic: boolean): void {
        const tokenName = token.text;
        if (makeStatic) {
            if (classDeclaration.kind === SyntaxKind.ClassExpression) {
                return;
            }
            const className = classDeclaration.name!.getText();
            const staticInitialization = initializePropertyToUndefined(createIdentifier(className), tokenName);
            changeTracker.insertNodeAfter(declSourceFile, classDeclaration, staticInitialization);
        }
        else if (isPrivateIdentifier(token)) {
            const property = createProperty(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                tokenName,
                /*questionToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined);

            const lastProp = getNodeToInsertPropertyAfter(classDeclaration);
            if (lastProp) {
                changeTracker.insertNodeAfter(declSourceFile, lastProp, property);
            }
            else {
                changeTracker.insertNodeAtClassStart(declSourceFile, classDeclaration, property);
            }
        }
        else {
            const classConstructor = getFirstConstructorWithBody(classDeclaration);
            if (!classConstructor) {
                return;
            }
            const propertyInitialization = initializePropertyToUndefined(createThis(), tokenName);
            changeTracker.insertNodeAtConstructorEnd(declSourceFile, classConstructor, propertyInitialization);
        }
    }

    function initializePropertyToUndefined(obj: Expression, propertyName: string) {
        return createStatement(createAssignment(createPropertyAccess(obj, propertyName), createIdentifier("undefined")));
    }

    function getActionsForAddMissingMemberInTypeScriptFile(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, token: Identifier | PrivateIdentifier, makeStatic: boolean): CodeFixAction[] | undefined {
        const typeNode = getTypeNode(context.program.getTypeChecker(), classDeclaration, token);
        const addProp = createAddPropertyDeclarationAction(context, declSourceFile, classDeclaration, makeStatic, token.text, typeNode);
        return makeStatic || isPrivateIdentifier(token) ? [addProp] : [addProp, createAddIndexSignatureAction(context, declSourceFile, classDeclaration, token.text, typeNode)];
    }

    function getTypeNode(checker: TypeChecker, classDeclaration: ClassOrInterface, token: Node) {
        let typeNode: TypeNode | undefined;
        if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
            const binaryExpression = token.parent.parent as BinaryExpression;
            const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
            const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)));
            typeNode = checker.typeToTypeNode(widenedType, classDeclaration);
        }
        else {
            const contextualType = checker.getContextualType(token.parent as Expression);
            typeNode = contextualType ? checker.typeToTypeNode(contextualType) : undefined;
        }
        return typeNode || createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function createAddPropertyDeclarationAction(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, makeStatic: boolean, tokenName: string, typeNode: TypeNode): CodeFixAction {
        const changes = textChanges.ChangeTracker.with(context, t => addPropertyDeclaration(t, declSourceFile, classDeclaration, tokenName, typeNode, makeStatic));
        return createCodeFixAction(fixName, changes, [makeStatic ? Diagnostics.Declare_static_property_0 : Diagnostics.Declare_property_0, tokenName], fixId, Diagnostics.Add_all_missing_members);
    }

    function addPropertyDeclaration(changeTracker: textChanges.ChangeTracker, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, tokenName: string, typeNode: TypeNode, makeStatic: boolean): void {
        const property = createProperty(
            /*decorators*/ undefined,
            /*modifiers*/ makeStatic ? [createToken(SyntaxKind.StaticKeyword)] : undefined,
            tokenName,
            /*questionToken*/ undefined,
            typeNode,
            /*initializer*/ undefined);

        const lastProp = getNodeToInsertPropertyAfter(classDeclaration);
        if (lastProp) {
            changeTracker.insertNodeAfter(declSourceFile, lastProp, property);
        }
        else {
            changeTracker.insertNodeAtClassStart(declSourceFile, classDeclaration, property);
        }
    }

    // Gets the last of the first run of PropertyDeclarations, or undefined if the class does not start with a PropertyDeclaration.
    function getNodeToInsertPropertyAfter(cls: ClassOrInterface): PropertyDeclaration | undefined {
        let res: PropertyDeclaration | undefined;
        for (const member of cls.members) {
            if (!isPropertyDeclaration(member)) break;
            res = member;
        }
        return res;
    }

    function createAddIndexSignatureAction(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, tokenName: string, typeNode: TypeNode): CodeFixAction {
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

        const changes = textChanges.ChangeTracker.with(context, t => t.insertNodeAtClassStart(declSourceFile, classDeclaration, indexSignature));
        // No fixId here because code-fix-all currently only works on adding individual named properties.
        return createCodeFixActionWithoutFixAll(fixName, changes, [Diagnostics.Add_index_signature_for_property_0, tokenName]);
    }

    function getActionForMethodDeclaration(
        context: CodeFixContext,
        declSourceFile: SourceFile,
        classDeclaration: ClassOrInterface,
        token: Identifier | PrivateIdentifier,
        callExpression: CallExpression,
        makeStatic: boolean,
        inJs: boolean,
        preferences: UserPreferences,
    ): CodeFixAction | undefined {
        // Private methods are not implemented yet.
        if (isPrivateIdentifier(token)) { return undefined; }
        const changes = textChanges.ChangeTracker.with(context, t => addMethodDeclaration(context, t, declSourceFile, classDeclaration, token, callExpression, makeStatic, inJs, preferences));
        return createCodeFixAction(fixName, changes, [makeStatic ? Diagnostics.Declare_static_method_0 : Diagnostics.Declare_method_0, token.text], fixId, Diagnostics.Add_all_missing_members);
    }

    function addMethodDeclaration(
        context: CodeFixContextBase,
        changeTracker: textChanges.ChangeTracker,
        declSourceFile: SourceFile,
        typeDecl: ClassOrInterface,
        token: Identifier,
        callExpression: CallExpression,
        makeStatic: boolean,
        inJs: boolean,
        preferences: UserPreferences,
    ): void {
        const methodDeclaration = createMethodFromCallExpression(context, callExpression, token.text, inJs, makeStatic, preferences, typeDecl);
        const containingMethodDeclaration = getAncestor(callExpression, SyntaxKind.MethodDeclaration);

        if (containingMethodDeclaration && containingMethodDeclaration.parent === typeDecl) {
            changeTracker.insertNodeAfter(declSourceFile, containingMethodDeclaration, methodDeclaration);
        }
        else {
            changeTracker.insertNodeAtClassStart(declSourceFile, typeDecl, methodDeclaration);
        }
    }

    function addEnumMemberDeclaration(changes: textChanges.ChangeTracker, checker: TypeChecker, token: Identifier, enumDeclaration: EnumDeclaration) {
        /**
         * create initializer only literal enum that has string initializer.
         * value of initializer is a string literal that equal to name of enum member.
         * numeric enum or empty enum will not create initializer.
         */
        const hasStringInitializer = some(enumDeclaration.members, member => {
            const type = checker.getTypeAtLocation(member);
            return !!(type && type.flags & TypeFlags.StringLike);
        });

        const enumMember = createEnumMember(token, hasStringInitializer ? createStringLiteral(token.text) : undefined);
        changes.replaceNode(enumDeclaration.getSourceFile(), enumDeclaration, updateEnumDeclaration(
            enumDeclaration,
            enumDeclaration.decorators,
            enumDeclaration.modifiers,
            enumDeclaration.name,
            concatenate(enumDeclaration.members, singleElementArray(enumMember))
        ));
    }
}
