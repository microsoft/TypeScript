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
            if (!info) {
                return undefined;
            }
            if (info.kind === InfoKind.Enum) {
                const { token, parentDeclaration } = info;
                const changes = textChanges.ChangeTracker.with(context, t => addEnumMemberDeclaration(t, context.program.getTypeChecker(), token, parentDeclaration));
                return [createCodeFixAction(fixName, changes, [Diagnostics.Add_missing_enum_member_0, token.text], fixId, Diagnostics.Add_all_missing_members)];
            }
            return concatenate(getActionsForMissingMethodDeclaration(context, info), getActionsForMissingMemberDeclaration(context, info));
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const { program } = context;
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

                        const { parentDeclaration, declSourceFile, modifierFlags, token, call, isJSFile } = info;
                        // Always prefer to add a method declaration if possible.
                        if (call && !isPrivateIdentifier(token)) {
                            addMethodDeclaration(context, changes, call, token.text, modifierFlags & ModifierFlags.Static, parentDeclaration, declSourceFile, isJSFile);
                        }
                        else {
                            if (isJSFile && !isInterfaceDeclaration(parentDeclaration)) {
                                addMissingMemberInJs(changes, declSourceFile, parentDeclaration, token, !!(modifierFlags & ModifierFlags.Static));
                            }
                            else {
                                const typeNode = getTypeNode(program.getTypeChecker(), parentDeclaration, token);
                                addPropertyDeclaration(changes, declSourceFile, parentDeclaration, token.text, typeNode, modifierFlags & ModifierFlags.Static);
                            }
                        }
                    }
                });
            }));
        },
    });

    const enum InfoKind { Enum, ClassOrInterface }
    interface EnumInfo {
        readonly kind: InfoKind.Enum;
        readonly token: Identifier;
        readonly parentDeclaration: EnumDeclaration;
    }
    interface ClassOrInterfaceInfo {
        readonly kind: InfoKind.ClassOrInterface;
        readonly call: CallExpression | undefined;
        readonly token: Identifier | PrivateIdentifier;
        readonly modifierFlags: ModifierFlags;
        readonly parentDeclaration: ClassOrInterface;
        readonly declSourceFile: SourceFile;
        readonly isJSFile: boolean;
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

        const classDeclaration = find(symbol.declarations, isClassLike);
        // Don't suggest adding private identifiers to anything other than a class.
        if (!classDeclaration && isPrivateIdentifier(token)) {
            return undefined;
        }

        // Prefer to change the class instead of the interface if they are merged
        const classOrInterface = classDeclaration || find(symbol.declarations, isInterfaceDeclaration);
        if (classOrInterface && !program.isSourceFileFromExternalLibrary(classOrInterface.getSourceFile())) {
            const makeStatic = ((leftExpressionType as TypeReference).target || leftExpressionType) !== checker.getDeclaredTypeOfSymbol(symbol);
            if (makeStatic && (isPrivateIdentifier(token) || isInterfaceDeclaration(classOrInterface))) {
                return undefined;
            }

            const declSourceFile = classOrInterface.getSourceFile();
            const modifierFlags = (makeStatic ? ModifierFlags.Static : 0) | (startsWithUnderscore(token.text) ? ModifierFlags.Private : 0);
            const isJSFile = isSourceFileJS(declSourceFile);
            const call = tryCast(parent.parent, isCallExpression);
            return { kind: InfoKind.ClassOrInterface, token, call, modifierFlags, parentDeclaration: classOrInterface, declSourceFile, isJSFile };
        }

        const enumDeclaration = find(symbol.declarations, isEnumDeclaration);
        if (enumDeclaration && !isPrivateIdentifier(token) && !program.isSourceFileFromExternalLibrary(enumDeclaration.getSourceFile())) {
            return { kind: InfoKind.Enum, token, parentDeclaration: enumDeclaration };
        }
        return undefined;
    }

    function getActionsForMissingMemberDeclaration(context: CodeFixContext, info: ClassOrInterfaceInfo): CodeFixAction[] | undefined {
        return info.isJSFile ? singleElementArray(createActionForAddMissingMemberInJavascriptFile(context, info)) :
            createActionsForAddMissingMemberInTypeScriptFile(context, info);
    }

    function createActionForAddMissingMemberInJavascriptFile(context: CodeFixContext, { parentDeclaration, declSourceFile, modifierFlags, token }: ClassOrInterfaceInfo): CodeFixAction | undefined {
        if (isInterfaceDeclaration(parentDeclaration)) {
            return undefined;
        }

        const changes = textChanges.ChangeTracker.with(context, t => addMissingMemberInJs(t, declSourceFile, parentDeclaration, token, !!(modifierFlags & ModifierFlags.Static)));
        if (changes.length === 0) {
            return undefined;
        }

        const diagnostic = modifierFlags & ModifierFlags.Static ? Diagnostics.Initialize_static_property_0 :
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

    function createActionsForAddMissingMemberInTypeScriptFile(context: CodeFixContext, { parentDeclaration, declSourceFile, modifierFlags, token }: ClassOrInterfaceInfo): CodeFixAction[] | undefined {
        const memberName = token.text;
        const isStatic = modifierFlags & ModifierFlags.Static;
        const typeNode = getTypeNode(context.program.getTypeChecker(), parentDeclaration, token);
        const addPropertyDeclarationChanges = (modifierFlags: ModifierFlags) => textChanges.ChangeTracker.with(context, t => addPropertyDeclaration(t, declSourceFile, parentDeclaration, memberName, typeNode, modifierFlags));

        const actions = [createCodeFixAction(fixName, addPropertyDeclarationChanges(modifierFlags & ModifierFlags.Static), [isStatic ? Diagnostics.Declare_static_property_0 : Diagnostics.Declare_property_0, memberName], fixId, Diagnostics.Add_all_missing_members)];
        if (isStatic || isPrivateIdentifier(token)) {
            return actions;
        }

        if (modifierFlags & ModifierFlags.Private) {
            actions.unshift(createCodeFixActionWithoutFixAll(fixName, addPropertyDeclarationChanges(ModifierFlags.Private), [Diagnostics.Declare_private_property_0, memberName]));
        }

        actions.push(createAddIndexSignatureAction(context, declSourceFile, parentDeclaration, token.text, typeNode));
        return actions;
    }

    function getTypeNode(checker: TypeChecker, classDeclaration: ClassOrInterface, token: Node) {
        let typeNode: TypeNode | undefined;
        if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
            const binaryExpression = token.parent.parent as BinaryExpression;
            const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
            const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)));
            typeNode = checker.typeToTypeNode(widenedType, classDeclaration, /*flags*/ undefined);
        }
        else {
            const contextualType = checker.getContextualType(token.parent as Expression);
            typeNode = contextualType ? checker.typeToTypeNode(contextualType, /*enclosingDeclaration*/ undefined, /*flags*/ undefined) : undefined;
        }
        return typeNode || createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function addPropertyDeclaration(changeTracker: textChanges.ChangeTracker, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, tokenName: string, typeNode: TypeNode, modifierFlags: ModifierFlags): void {
        const property = createProperty(
            /*decorators*/ undefined,
            /*modifiers*/ modifierFlags ? createNodeArray(createModifiersFromModifierFlags(modifierFlags)) : undefined,
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

    function getActionsForMissingMethodDeclaration(context: CodeFixContext, info: ClassOrInterfaceInfo): CodeFixAction[] | undefined {
        const { parentDeclaration, declSourceFile, modifierFlags, token, call, isJSFile } = info;
        if (call === undefined) {
            return undefined;
        }

        // Private methods are not implemented yet.
        if (isPrivateIdentifier(token)) {
            return undefined;
        }

        const methodName = token.text;
        const addMethodDeclarationChanges = (modifierFlags: ModifierFlags) => textChanges.ChangeTracker.with(context, t => addMethodDeclaration(context, t, call, methodName, modifierFlags, parentDeclaration, declSourceFile, isJSFile));
        const actions = [createCodeFixAction(fixName, addMethodDeclarationChanges(modifierFlags & ModifierFlags.Static), [modifierFlags & ModifierFlags.Static ? Diagnostics.Declare_static_method_0 : Diagnostics.Declare_method_0, methodName], fixId, Diagnostics.Add_all_missing_members)];
        if (modifierFlags & ModifierFlags.Private) {
            actions.unshift(createCodeFixActionWithoutFixAll(fixName, addMethodDeclarationChanges(ModifierFlags.Private), [Diagnostics.Declare_private_method_0, methodName]));
        }
        return actions;
    }

    function addMethodDeclaration(
        context: CodeFixContextBase,
        changes: textChanges.ChangeTracker,
        callExpression: CallExpression,
        methodName: string,
        modifierFlags: ModifierFlags,
        parentDeclaration: ClassOrInterface,
        sourceFile: SourceFile,
        isJSFile: boolean
    ): void {
        const importAdder = createImportAdder(sourceFile, context.program, context.preferences, context.host);
        const methodDeclaration = createMethodFromCallExpression(context, importAdder, callExpression, methodName, modifierFlags, parentDeclaration, isJSFile);
        const containingMethodDeclaration = findAncestor(callExpression, n => isMethodDeclaration(n) || isConstructorDeclaration(n));
        if (containingMethodDeclaration && containingMethodDeclaration.parent === parentDeclaration) {
            changes.insertNodeAfter(sourceFile, containingMethodDeclaration, methodDeclaration);
        }
        else {
            changes.insertNodeAtClassStart(sourceFile, parentDeclaration, methodDeclaration);
        }
        importAdder.writeFixes(changes);
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
        ), {
            leadingTriviaOption: textChanges.LeadingTriviaOption.IncludeAll,
            trailingTriviaOption: textChanges.TrailingTriviaOption.Exclude
        });
    }
}
