/* @internal */
namespace ts.codefix {
    const fixName = "addMissingMember";
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

            if (info.kind === InfoKind.enum) {
                const { token, parentDeclaration } = info;
                const changes = textChanges.ChangeTracker.with(context, t => addEnumMemberDeclaration(t, context.program.getTypeChecker(), token, parentDeclaration));
                return singleElementArray(createCodeFixAction(fixName, changes, [Diagnostics.Add_missing_enum_member_0, token.text], fixId, Diagnostics.Add_all_missing_enum_members));
            }
            const { parentDeclaration, classDeclarationSourceFile, inJs, makeStatic, token, call } = info;
            const methodCodeAction = call && getActionForMethodDeclaration(context, classDeclarationSourceFile, parentDeclaration, token, call, makeStatic, inJs, context.preferences);
            const addMember = inJs ?
                singleElementArray(getActionsForAddMissingMemberInJavaScriptFile(context, classDeclarationSourceFile, parentDeclaration, token.text, makeStatic)) :
                getActionsForAddMissingMemberInTypeScriptFile(context, classDeclarationSourceFile, parentDeclaration, token, makeStatic);
            return concatenate(singleElementArray(methodCodeAction), addMember);
        },
        fixIds: [fixId],
        getAllCodeActions: context => {
            const { program, preferences } = context;
            const checker = program.getTypeChecker();
            const seen = createMap<true>();

            const classToMembers = new NodeMap<ClassLikeDeclaration, ClassInfo[]>();

            return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
                eachDiagnostic(context, errorCodes, diag => {
                    const info = getInfo(diag.file, diag.start, checker);
                    if (!info || !addToSeen(seen, getNodeId(info.parentDeclaration) + "#" + info.token.text)) {
                        return;
                    }

                    if (info.kind === InfoKind.enum) {
                        const { token, parentDeclaration } = info;
                        addEnumMemberDeclaration(changes, checker, token, parentDeclaration);
                    }
                    else {
                        const { parentDeclaration, token } = info;
                        const infos = classToMembers.getOrUpdate(parentDeclaration, () => []);
                        if (!infos.some(i => i.token.text === token.text)) infos.push(info);
                    }
                });

                classToMembers.forEach((infos, classDeclaration) => {
                    const superClasses = getAllSuperClasses(classDeclaration, checker);
                    for (const info of infos) {
                        // If some superclass added this property, don't add it again.
                        if (superClasses.some(superClass => {
                            const superInfos = classToMembers.get(superClass);
                            return !!superInfos && superInfos.some(({ token }) => token.text === info.token.text);
                        })) continue;

                        const { parentDeclaration, classDeclarationSourceFile, inJs, makeStatic, token, call } = info;

                        // Always prefer to add a method declaration if possible.
                        if (call) {
                            addMethodDeclaration(context, changes, classDeclarationSourceFile, parentDeclaration, token, call, makeStatic, inJs, preferences);
                        }
                        else {
                            if (inJs) {
                                addMissingMemberInJs(changes, classDeclarationSourceFile, parentDeclaration, token.text, makeStatic);
                            }
                            else {
                                const typeNode = getTypeNode(program.getTypeChecker(), parentDeclaration, token);
                                addPropertyDeclaration(changes, classDeclarationSourceFile, parentDeclaration, token.text, typeNode, makeStatic);
                            }
                        }
                    }
                });
            }));
        },
    });

    function getAllSuperClasses(cls: ClassLikeDeclaration | undefined, checker: TypeChecker): ReadonlyArray<ClassLikeDeclaration> {
        const res: ClassLikeDeclaration[] = [];
        while (cls) {
            const superElement = getClassExtendsHeritageElement(cls);
            const superSymbol = superElement && checker.getSymbolAtLocation(superElement.expression);
            const superDecl = superSymbol && find(superSymbol.declarations, isClassLike);
            if (superDecl) { res.push(superDecl); }
            cls = superDecl;
        }
        return res;
    }

    interface InfoBase {
        readonly kind: InfoKind;
        readonly token: Identifier;
        readonly parentDeclaration: EnumDeclaration | ClassLikeDeclaration;
    }
    enum InfoKind { enum, class }
    interface EnumInfo extends InfoBase {
        readonly kind: InfoKind.enum;
        readonly parentDeclaration: EnumDeclaration;
    }
    interface ClassInfo extends InfoBase {
        readonly kind: InfoKind.class;
        readonly parentDeclaration: ClassLikeDeclaration;
        readonly makeStatic: boolean;
        readonly classDeclarationSourceFile: SourceFile;
        readonly inJs: boolean;
        readonly call: CallExpression | undefined;
    }
    type Info = EnumInfo | ClassInfo;

    function getInfo(tokenSourceFile: SourceFile, tokenPos: number, checker: TypeChecker): Info | undefined {
        // The identifier of the missing property. eg:
        // this.missing = 1;
        //      ^^^^^^^
        const token = getTokenAtPosition(tokenSourceFile, tokenPos);
        if (!isIdentifier(token)) {
            return undefined;
        }

        const { parent } = token;
        if (!isPropertyAccessExpression(parent)) return undefined;

        const leftExpressionType = skipConstraint(checker.getTypeAtLocation(parent.expression)!);
        const { symbol } = leftExpressionType;
        if (!symbol || !symbol.declarations) return undefined;

        const classDeclaration = find(symbol.declarations, isClassLike);
        if (classDeclaration) {
            const makeStatic = (leftExpressionType as TypeReference).target !== checker.getDeclaredTypeOfSymbol(symbol);
            const classDeclarationSourceFile = classDeclaration.getSourceFile();
            const inJs = isSourceFileJavaScript(classDeclarationSourceFile);
            const call = tryCast(parent.parent, isCallExpression);
            return { kind: InfoKind.class, token, parentDeclaration: classDeclaration, makeStatic, classDeclarationSourceFile, inJs, call };
        }
        const enumDeclaration = find(symbol.declarations, isEnumDeclaration);
        if (enumDeclaration) {
            return { kind: InfoKind.enum, token, parentDeclaration: enumDeclaration };
        }
        return undefined;
    }

    function getActionsForAddMissingMemberInJavaScriptFile(context: CodeFixContext, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, tokenName: string, makeStatic: boolean): CodeFixAction | undefined {
        const changes = textChanges.ChangeTracker.with(context, t => addMissingMemberInJs(t, classDeclarationSourceFile, classDeclaration, tokenName, makeStatic));
        return changes.length === 0 ? undefined
            : createCodeFixAction(fixName, changes, [makeStatic ? Diagnostics.Initialize_static_property_0 : Diagnostics.Initialize_property_0_in_the_constructor, tokenName], fixId, Diagnostics.Add_all_missing_members);
    }

    function addMissingMemberInJs(changeTracker: textChanges.ChangeTracker, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, tokenName: string, makeStatic: boolean): void {
        if (makeStatic) {
            if (classDeclaration.kind === SyntaxKind.ClassExpression) {
                return;
            }
            const className = classDeclaration.name!.getText();
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
        let typeNode: TypeNode | undefined;
        if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
            const binaryExpression = token.parent.parent as BinaryExpression;
            const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
            const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)!)); // TODO: GH#18217
            typeNode = checker.typeToTypeNode(widenedType, classDeclaration);
        }
        return typeNode || createKeywordTypeNode(SyntaxKind.AnyKeyword);
    }

    function createAddPropertyDeclarationAction(context: CodeFixContext, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, makeStatic: boolean, tokenName: string, typeNode: TypeNode): CodeFixAction {
        const changes = textChanges.ChangeTracker.with(context, t => addPropertyDeclaration(t, classDeclarationSourceFile, classDeclaration, tokenName, typeNode, makeStatic));
        return createCodeFixAction(fixName, changes, [makeStatic ? Diagnostics.Declare_static_property_0 : Diagnostics.Declare_property_0, tokenName], fixId, Diagnostics.Add_all_missing_members);
    }

    function addPropertyDeclaration(changeTracker: textChanges.ChangeTracker, classDeclarationSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, tokenName: string, typeNode: TypeNode, makeStatic: boolean): void {
        const property = createProperty(
            /*decorators*/ undefined,
            /*modifiers*/ makeStatic ? [createToken(SyntaxKind.StaticKeyword)] : undefined,
            tokenName,
            /*questionToken*/ undefined,
            typeNode,
            /*initializer*/ undefined);

        const lastProp = getNodeToInsertPropertyAfter(classDeclaration);
        if (lastProp) {
            changeTracker.insertNodeAfter(classDeclarationSourceFile, lastProp, property);
        }
        else {
            changeTracker.insertNodeAtClassStart(classDeclarationSourceFile, classDeclaration, property);
        }
    }

    // Gets the last of the first run of PropertyDeclarations, or undefined if the class does not start with a PropertyDeclaration.
    function getNodeToInsertPropertyAfter(cls: ClassLikeDeclaration): PropertyDeclaration | undefined {
        let res: PropertyDeclaration | undefined;
        for (const member of cls.members) {
            if (!isPropertyDeclaration(member)) break;
            res = member;
        }
        return res;
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
        return createCodeFixActionNoFixId(fixName, changes, [Diagnostics.Add_index_signature_for_property_0, tokenName]);
    }

    function getActionForMethodDeclaration(
        context: CodeFixContext,
        classDeclarationSourceFile: SourceFile,
        classDeclaration: ClassLikeDeclaration,
        token: Identifier,
        callExpression: CallExpression,
        makeStatic: boolean,
        inJs: boolean,
        preferences: UserPreferences,
    ): CodeFixAction | undefined {
        const changes = textChanges.ChangeTracker.with(context, t => addMethodDeclaration(context, t, classDeclarationSourceFile, classDeclaration, token, callExpression, makeStatic, inJs, preferences));
        return createCodeFixAction(fixName, changes, [makeStatic ? Diagnostics.Declare_static_method_0 : Diagnostics.Declare_method_0, token.text], fixId, Diagnostics.Add_all_missing_members);
    }

    function addMethodDeclaration(
        context: CodeFixContextBase,
        changeTracker: textChanges.ChangeTracker,
        classDeclarationSourceFile: SourceFile,
        classDeclaration: ClassLikeDeclaration,
        token: Identifier,
        callExpression: CallExpression,
        makeStatic: boolean,
        inJs: boolean,
        preferences: UserPreferences,
    ): void {
        const methodDeclaration = createMethodFromCallExpression(context, callExpression, token.text, inJs, makeStatic, preferences);
        const containingMethodDeclaration = getAncestor(callExpression, SyntaxKind.MethodDeclaration);

        if (containingMethodDeclaration && containingMethodDeclaration.parent === classDeclaration) {
            changeTracker.insertNodeAfter(classDeclarationSourceFile, containingMethodDeclaration, methodDeclaration);
        }
        else {
            changeTracker.insertNodeAtClassStart(classDeclarationSourceFile, classDeclaration, methodDeclaration);
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
