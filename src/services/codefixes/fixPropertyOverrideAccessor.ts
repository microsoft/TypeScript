
    // export interface CodeAction {
    //     /** Description of the code action to display in the UI of the editor */
    //     description: string;
    //     /** Text changes to apply to each file as part of the code action */
    //     changes: FileTextChanges[];
    //     /**
    //      * If the user accepts the code fix, the editor should send the action back in a `applyAction` request.
    //      * This allows the language service to have side effects (e.g. installing dependencies) upon a code fix.
    //      */
    //     commands?: CodeActionCommand[];
    // }

    // export interface CodeFixAction extends CodeAction {
    //     /** Short name to identify the fix, for use by telemetry. */
    //     fixName: string;
    //     /**
    //      * If present, one may call 'getCombinedCodeFix' with this fixId.
    //      * This may be omitted to indicate that the code fix can't be applied in a group.
    //      */
    //     fixId?: {};
    //     fixAllDescription?: string;
    // }

    // export interface RefactorEditInfo {
    //     edits: FileTextChanges[];
    //     renameFilename?: string ;
    //     renameLocation?: number;
    //     commands?: CodeActionCommand[];
    // }
// r.commands -> c.commands
// r.edits -> c.changes
// r.renameFilename ???
// r.renameLocation ???

/* @internal */
namespace ts.codefix {
    const fixName = "fixPropertyOverrideAccessor";
    const errorCodes = [
        Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code,
        Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor.code,
    ];
    const fixId = "fixPropertyOverrideAccessor";
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            // TODO: Also still need to support getAllCodeActions (most codefixes do this pretty simply)
            if (context.errorCode === Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code) {
                const ctx = { ...context, file: context.sourceFile, startPosition: context.span.start, endPosition: context.span.start + context.span.length }
                const r = ts.refactor.generateGetAccessorAndSetAccessor.getEditsForAction(ctx, "Generate 'get' and 'set' accessors");
                if (!r) Debug.fail("Couldn't get refactor edits");
                // createCodeFixAction(fixName, r.edits, [Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property, token.text], fixId, Diagnostics.Add_all_missing_members)
                return [{ commands: r.commands, changes: r.edits, description: "Generate 'get' and 'set' accessors", fixName, fixAllDescription: "Generate 'get' and 'set' accessors", fixId }];
            }
            else if (context.errorCode === Diagnostics._0_is_defined_as_a_property_in_class_1_but_is_overridden_here_in_2_as_an_accessor.code) {
                const checker = context.program.getTypeChecker()
                // 1. find node
                const node = getTokenAtPosition(context.sourceFile, context.span.start).parent;
                // 2. make usre it's a accessor declaration, and if so record its name
                Debug.assert(isAccessor(node), "it wasn't an accessor");
                const name = unescapeLeadingUnderscores(getTextOfPropertyName(node.name))
                // 3. find parent, make sure it's a class
                const containingClass = node.parent;
                Debug.assert(isClassLike(containingClass), "it wasn't classlike")
                // 4. getAllSupers
                const bases = getAllSupers(containingClass, checker)
                // 4a. for now, just use the first one
                const base = singleOrUndefined(bases)
                Debug.assert(!!base, "Porbably more than one super:" + bases.length)

                // 5. getTypeOfNode
                const baseType = checker.getTypeAtLocation(base)
                // 6. getPropertyOfType
                const baseProp = checker.getPropertyOfType(baseType, name)
                Debug.assert(!!baseProp, "Couldn't find base property for " + name)
                // 7. pass property.valueDeclaration.start,end into the other refactor
                const ctx = { ...context, file: context.sourceFile, startPosition: baseProp.valueDeclaration.pos, endPosition: baseProp.valueDeclaration.end }
                // TODO: This doesn't do the snazzy post-rename tho
                const r = ts.refactor.generateGetAccessorAndSetAccessor.getEditsForAction(ctx, "Generate 'get' and 'set' accessors");
                if (!r) Debug.fail("Couldn't get refactor edits");
                // createCodeFixAction(fixName, r.edits, [Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property, token.text], fixId, Diagnostics.Add_all_missing_members)
                return [{ commands: r.commands, changes: r.edits, description: "Generate 'get' and 'set' accessors", fixName, fixAllDescription: "Generate 'get' and 'set' accessors", fixId }];
                // 1. find location of base property
                // 2. do the other thing here too
                // TODO: Remember to look for readonly and skip emitting setter if found
                // TODO: Maybe should convert base into getter/setter pair
                // class A { x = 1 } class B { get x() { return 2 }
                // ==>
                // class A { private _x
            }
            else {
                Debug.fail("fixPropertyOverrideAccessor codefix got unexpected error code " + context.errorCode);
            }
            // const info = getInfo(context.sourceFile, context.span.start, context.program.getTypeChecker(), context.program);
            // if (!info) return undefined;

            // if (info.kind === InfoKind.Enum) {
            //     const { token, parentDeclaration } = info;
            //     const changes = textChanges.ChangeTracker.with(context, t => addEnumMemberDeclaration(t, context.program.getTypeChecker(), token, parentDeclaration));
            //     return [createCodeFixAction(fixName, changes, [Diagnostics.Add_missing_enum_member_0, token.text], fixId, Diagnostics.Add_all_missing_members)];
            // }
            // const { parentDeclaration, declSourceFile, inJs, makeStatic, token, call } = info;
            // const methodCodeAction = call && getActionForMethodDeclaration(context, declSourceFile, parentDeclaration, token, call, makeStatic, inJs, context.preferences);
            // const addMember = inJs && !isInterfaceDeclaration(parentDeclaration) ?
            //     singleElementArray(getActionsForAddMissingMemberInJavascriptFile(context, declSourceFile, parentDeclaration, token, makeStatic)) :
            //     getActionsForAddMissingMemberInTypeScriptFile(context, declSourceFile, parentDeclaration, token, makeStatic);
            // return concatenate(singleElementArray(methodCodeAction), addMember);
        },
        fixIds: [fixId],

        getAllCodeActions: context => codeFixAll(context, errorCodes, (changes, diag) => {
            if (diag.code === Diagnostics._0_is_defined_as_an_accessor_in_class_1_but_is_overridden_here_in_2_as_an_instance_property.code) {
                const ctx = { ...context, file: context.sourceFile, startPosition: diag.start, endPosition: diag.start + diag.length }
                const r = ts.refactor.generateGetAccessorAndSetAccessor.getEditsForAction(ctx, "Generate 'get' and 'set' accessors");
                if (!r) Debug.fail("Couldn't get refactor edits");
                for (const e of r.edits) {
                    changes.pushRaw(context.sourceFile, e)
                }
            }
        }),
        // getAllCodeActions: context => {
        //     const { program, preferences } = context;
        //     const checker = program.getTypeChecker();
        //     const seen = createMap<true>();

        //     const typeDeclToMembers = new NodeMap<ClassOrInterface, ClassOrInterfaceInfo[]>();

        //     return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
        //         eachDiagnostic(context, errorCodes, diag => {
        //             const info = getInfo(diag.file, diag.start, checker, context.program);
        //             if (!info || !addToSeen(seen, getNodeId(info.parentDeclaration) + "#" + info.token.text)) {
        //                 return;
        //             }

        //             if (info.kind === InfoKind.Enum) {
        //                 const { token, parentDeclaration } = info;
        //                 addEnumMemberDeclaration(changes, checker, token, parentDeclaration);
        //             }
        //             else {
        //                 const { parentDeclaration, token } = info;
        //                 const infos = typeDeclToMembers.getOrUpdate(parentDeclaration, () => []);
        //                 if (!infos.some(i => i.token.text === token.text)) infos.push(info);
        //             }
        //         });

        //         typeDeclToMembers.forEach((infos, classDeclaration) => {
        //             const supers = getAllSupers(classDeclaration, checker);
        //             for (const info of infos) {
        //                 // If some superclass added this property, don't add it again.
        //                 if (supers.some(superClassOrInterface => {
        //                     const superInfos = typeDeclToMembers.get(superClassOrInterface);
        //                     return !!superInfos && superInfos.some(({ token }) => token.text === info.token.text);
        //                 })) continue;

        //                 const { parentDeclaration, declSourceFile, inJs, makeStatic, token, call } = info;

        //                 // Always prefer to add a method declaration if possible.
        //                 if (call && !isPrivateIdentifier(token)) {
        //                     addMethodDeclaration(context, changes, declSourceFile, parentDeclaration, token, call, makeStatic, inJs, preferences);
        //                 }
        //                 else {
        //                     if (inJs && !isInterfaceDeclaration(parentDeclaration)) {
        //                         addMissingMemberInJs(changes, declSourceFile, parentDeclaration, token, makeStatic);
        //                     }
        //                     else {
        //                         const typeNode = getTypeNode(program.getTypeChecker(), parentDeclaration, token);
        //                         addPropertyDeclaration(changes, declSourceFile, parentDeclaration, token.text, typeNode, makeStatic ? ModifierFlags.Static : 0);
        //                     }
        //                 }
        //             }
        //         });
        //     }));
        // },
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
    // const enum InfoKind { Enum, ClassOrInterface }
    // interface EnumInfo {
    //     readonly kind: InfoKind.Enum;
    //     readonly token: Identifier;
    //     readonly parentDeclaration: EnumDeclaration;
    // }
    // interface ClassOrInterfaceInfo {
    //     readonly kind: InfoKind.ClassOrInterface;
    //     readonly token: Identifier | PrivateIdentifier;
    //     readonly parentDeclaration: ClassOrInterface;
    //     readonly makeStatic: boolean;
    //     readonly declSourceFile: SourceFile;
    //     readonly inJs: boolean;
    //     readonly call: CallExpression | undefined;
    // }
    // type Info = EnumInfo | ClassOrInterfaceInfo;

    // function getInfo(tokenSourceFile: SourceFile, tokenPos: number, checker: TypeChecker, program: Program): Info | undefined {
    //     // The identifier of the missing property. eg:
    //     // this.missing = 1;
    //     //      ^^^^^^^
    //     const token = getTokenAtPosition(tokenSourceFile, tokenPos);
    //     if (!isIdentifier(token) && !isPrivateIdentifier(token)) {
    //         return undefined;
    //     }

    //     const { parent } = token;
    //     if (!isPropertyAccessExpression(parent)) return undefined;

    //     const leftExpressionType = skipConstraint(checker.getTypeAtLocation(parent.expression));
    //     const { symbol } = leftExpressionType;
    //     if (!symbol || !symbol.declarations) return undefined;

    //     const classDeclaration = find(symbol.declarations, isClassLike);
    //     // Don't suggest adding private identifiers to anything other than a class.
    //     if (!classDeclaration && isPrivateIdentifier(token)) {
    //         return undefined;
    //     }

    //     // Prefer to change the class instead of the interface if they are merged
    //     const classOrInterface = classDeclaration || find(symbol.declarations, isInterfaceDeclaration);
    //     if (classOrInterface && !program.isSourceFileFromExternalLibrary(classOrInterface.getSourceFile())) {
    //         const makeStatic = ((leftExpressionType as TypeReference).target || leftExpressionType) !== checker.getDeclaredTypeOfSymbol(symbol);
    //         if (makeStatic && (isPrivateIdentifier(token) || isInterfaceDeclaration(classOrInterface))) {
    //             return undefined;
    //         }

    //         const declSourceFile = classOrInterface.getSourceFile();
    //         const inJs = isSourceFileJS(declSourceFile);
    //         const call = tryCast(parent.parent, isCallExpression);
    //         return { kind: InfoKind.ClassOrInterface, token, parentDeclaration: classOrInterface, makeStatic, declSourceFile, inJs, call };
    //     }

    //     const enumDeclaration = find(symbol.declarations, isEnumDeclaration);
    //     if (enumDeclaration && !isPrivateIdentifier(token) && !program.isSourceFileFromExternalLibrary(enumDeclaration.getSourceFile())) {
    //         return { kind: InfoKind.Enum, token, parentDeclaration: enumDeclaration };
    //     }
    //     return undefined;
    // }

    // function getActionsForAddMissingMemberInJavascriptFile(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, token: Identifier | PrivateIdentifier, makeStatic: boolean): CodeFixAction | undefined {
    //     const changes = textChanges.ChangeTracker.with(context, t => addMissingMemberInJs(t, declSourceFile, classDeclaration, token, makeStatic));
    //     if (changes.length === 0) {
    //         return undefined;
    //     }

    //     const diagnostic = makeStatic ? Diagnostics.Initialize_static_property_0 :
    //         isPrivateIdentifier(token) ? Diagnostics.Declare_a_private_field_named_0 : Diagnostics.Initialize_property_0_in_the_constructor;

    //     return createCodeFixAction(fixName, changes, [diagnostic, token.text], fixId, Diagnostics.Add_all_missing_members);
    // }

    // function addMissingMemberInJs(changeTracker: textChanges.ChangeTracker, declSourceFile: SourceFile, classDeclaration: ClassLikeDeclaration, token: Identifier | PrivateIdentifier, makeStatic: boolean): void {
    //     const tokenName = token.text;
    //     if (makeStatic) {
    //         if (classDeclaration.kind === SyntaxKind.ClassExpression) {
    //             return;
    //         }
    //         const className = classDeclaration.name!.getText();
    //         const staticInitialization = initializePropertyToUndefined(createIdentifier(className), tokenName);
    //         changeTracker.insertNodeAfter(declSourceFile, classDeclaration, staticInitialization);
    //     }
    //     else if (isPrivateIdentifier(token)) {
    //         const property = createProperty(
    //             /*decorators*/ undefined,
    //             /*modifiers*/ undefined,
    //             tokenName,
    //             /*questionToken*/ undefined,
    //             /*type*/ undefined,
    //             /*initializer*/ undefined);

    //         const lastProp = getNodeToInsertPropertyAfter(classDeclaration);
    //         if (lastProp) {
    //             changeTracker.insertNodeAfter(declSourceFile, lastProp, property);
    //         }
    //         else {
    //             changeTracker.insertNodeAtClassStart(declSourceFile, classDeclaration, property);
    //         }
    //     }
    //     else {
    //         const classConstructor = getFirstConstructorWithBody(classDeclaration);
    //         if (!classConstructor) {
    //             return;
    //         }
    //         const propertyInitialization = initializePropertyToUndefined(createThis(), tokenName);
    //         changeTracker.insertNodeAtConstructorEnd(declSourceFile, classConstructor, propertyInitialization);
    //     }
    // }

    // function initializePropertyToUndefined(obj: Expression, propertyName: string) {
    //     return createStatement(createAssignment(createPropertyAccess(obj, propertyName), createIdentifier("undefined")));
    // }

    // function getActionsForAddMissingMemberInTypeScriptFile(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, token: Identifier | PrivateIdentifier, makeStatic: boolean): CodeFixAction[] | undefined {
    //     const typeNode = getTypeNode(context.program.getTypeChecker(), classDeclaration, token);
    //     const actions: CodeFixAction[] = [createAddPropertyDeclarationAction(context, declSourceFile, classDeclaration, token.text, typeNode, makeStatic ? ModifierFlags.Static : 0)];
    //     if (makeStatic || isPrivateIdentifier(token)) {
    //         return actions;
    //     }

    //     if (startsWithUnderscore(token.text)) {
    //         actions.unshift(createAddPropertyDeclarationAction(context, declSourceFile, classDeclaration, token.text, typeNode, ModifierFlags.Private));
    //     }

    //     actions.push(createAddIndexSignatureAction(context, declSourceFile, classDeclaration, token.text, typeNode));
    //     return actions;
    // }

    // function getTypeNode(checker: TypeChecker, classDeclaration: ClassOrInterface, token: Node) {
    //     let typeNode: TypeNode | undefined;
    //     if (token.parent.parent.kind === SyntaxKind.BinaryExpression) {
    //         const binaryExpression = token.parent.parent as BinaryExpression;
    //         const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
    //         const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)));
    //         typeNode = checker.typeToTypeNode(widenedType, classDeclaration);
    //     }
    //     else {
    //         const contextualType = checker.getContextualType(token.parent as Expression);
    //         typeNode = contextualType ? checker.typeToTypeNode(contextualType) : undefined;
    //     }
    //     return typeNode || createKeywordTypeNode(SyntaxKind.AnyKeyword);
    // }

    // function createAddPropertyDeclarationAction(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, tokenName: string, typeNode: TypeNode, modifierFlags: ModifierFlags): CodeFixAction {
    //     const changes = textChanges.ChangeTracker.with(context, t => addPropertyDeclaration(t, declSourceFile, classDeclaration, tokenName, typeNode, modifierFlags));
    //     if (modifierFlags & ModifierFlags.Private) {
    //         return createCodeFixActionWithoutFixAll(fixName, changes, [Diagnostics.Declare_private_property_0, tokenName]);
    //     }
    //     return createCodeFixAction(fixName, changes, [modifierFlags & ModifierFlags.Static ? Diagnostics.Declare_static_property_0 : Diagnostics.Declare_property_0, tokenName], fixId, Diagnostics.Add_all_missing_members);
    // }

    // function addPropertyDeclaration(changeTracker: textChanges.ChangeTracker, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, tokenName: string, typeNode: TypeNode, modifierFlags: ModifierFlags): void {
    //     const property = createProperty(
    //         /*decorators*/ undefined,
    //         /*modifiers*/ modifierFlags ? createNodeArray(createModifiersFromModifierFlags(modifierFlags)) : undefined,
    //         tokenName,
    //         /*questionToken*/ undefined,
    //         typeNode,
    //         /*initializer*/ undefined);

    //     const lastProp = getNodeToInsertPropertyAfter(classDeclaration);
    //     if (lastProp) {
    //         changeTracker.insertNodeAfter(declSourceFile, lastProp, property);
    //     }
    //     else {
    //         changeTracker.insertNodeAtClassStart(declSourceFile, classDeclaration, property);
    //     }
    // }

    // // Gets the last of the first run of PropertyDeclarations, or undefined if the class does not start with a PropertyDeclaration.
    // function getNodeToInsertPropertyAfter(cls: ClassOrInterface): PropertyDeclaration | undefined {
    //     let res: PropertyDeclaration | undefined;
    //     for (const member of cls.members) {
    //         if (!isPropertyDeclaration(member)) break;
    //         res = member;
    //     }
    //     return res;
    // }

    // function createAddIndexSignatureAction(context: CodeFixContext, declSourceFile: SourceFile, classDeclaration: ClassOrInterface, tokenName: string, typeNode: TypeNode): CodeFixAction {
    //     // Index signatures cannot have the static modifier.
    //     const stringTypeNode = createKeywordTypeNode(SyntaxKind.StringKeyword);
    //     const indexingParameter = createParameter(
    //         /*decorators*/ undefined,
    //         /*modifiers*/ undefined,
    //         /*dotDotDotToken*/ undefined,
    //         "x",
    //         /*questionToken*/ undefined,
    //         stringTypeNode,
    //         /*initializer*/ undefined);
    //     const indexSignature = createIndexSignature(
    //         /*decorators*/ undefined,
    //         /*modifiers*/ undefined,
    //         [indexingParameter],
    //         typeNode);

    //     const changes = textChanges.ChangeTracker.with(context, t => t.insertNodeAtClassStart(declSourceFile, classDeclaration, indexSignature));
    //     // No fixId here because code-fix-all currently only works on adding individual named properties.
    //     return createCodeFixActionWithoutFixAll(fixName, changes, [Diagnostics.Add_index_signature_for_property_0, tokenName]);
    // }

    // function getActionForMethodDeclaration(
    //     context: CodeFixContext,
    //     declSourceFile: SourceFile,
    //     classDeclaration: ClassOrInterface,
    //     token: Identifier | PrivateIdentifier,
    //     callExpression: CallExpression,
    //     makeStatic: boolean,
    //     inJs: boolean,
    //     preferences: UserPreferences,
    // ): CodeFixAction | undefined {
    //     // Private methods are not implemented yet.
    //     if (isPrivateIdentifier(token)) { return undefined; }
    //     const changes = textChanges.ChangeTracker.with(context, t => addMethodDeclaration(context, t, declSourceFile, classDeclaration, token, callExpression, makeStatic, inJs, preferences));
    //     return createCodeFixAction(fixName, changes, [makeStatic ? Diagnostics.Declare_static_method_0 : Diagnostics.Declare_method_0, token.text], fixId, Diagnostics.Add_all_missing_members);
    // }

    // function addMethodDeclaration(
    //     context: CodeFixContextBase,
    //     changeTracker: textChanges.ChangeTracker,
    //     declSourceFile: SourceFile,
    //     typeDecl: ClassOrInterface,
    //     token: Identifier,
    //     callExpression: CallExpression,
    //     makeStatic: boolean,
    //     inJs: boolean,
    //     preferences: UserPreferences,
    // ): void {
    //     const methodDeclaration = createMethodFromCallExpression(context, callExpression, token.text, inJs, makeStatic, preferences, typeDecl);
    //     const containingMethodDeclaration = getAncestor(callExpression, SyntaxKind.MethodDeclaration);

    //     if (containingMethodDeclaration && containingMethodDeclaration.parent === typeDecl) {
    //         changeTracker.insertNodeAfter(declSourceFile, containingMethodDeclaration, methodDeclaration);
    //     }
    //     else {
    //         changeTracker.insertNodeAtClassStart(declSourceFile, typeDecl, methodDeclaration);
    //     }
    // }

    // function addEnumMemberDeclaration(changes: textChanges.ChangeTracker, checker: TypeChecker, token: Identifier, enumDeclaration: EnumDeclaration) {
    //     /**
    //      * create initializer only literal enum that has string initializer.
    //      * value of initializer is a string literal that equal to name of enum member.
    //      * numeric enum or empty enum will not create initializer.
    //      */
    //     const hasStringInitializer = some(enumDeclaration.members, member => {
    //         const type = checker.getTypeAtLocation(member);
    //         return !!(type && type.flags & TypeFlags.StringLike);
    //     });

    //     const enumMember = createEnumMember(token, hasStringInitializer ? createStringLiteral(token.text) : undefined);
    //     changes.replaceNode(enumDeclaration.getSourceFile(), enumDeclaration, updateEnumDeclaration(
    //         enumDeclaration,
    //         enumDeclaration.decorators,
    //         enumDeclaration.modifiers,
    //         enumDeclaration.name,
    //         concatenate(enumDeclaration.members, singleElementArray(enumMember))
    //     ), {
    //         leadingTriviaOption: textChanges.LeadingTriviaOption.IncludeAll,
    //         trailingTriviaOption: textChanges.TrailingTriviaOption.Exclude
    //     });
    // }
}
