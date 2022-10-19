import * as ts from "../_namespaces/ts";

const fixMissingMember = "fixMissingMember";
const fixMissingProperties = "fixMissingProperties";
const fixMissingAttributes = "fixMissingAttributes";
const fixMissingFunctionDeclaration = "fixMissingFunctionDeclaration";

const errorCodes = [
    ts.Diagnostics.Property_0_does_not_exist_on_type_1.code,
    ts.Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code,
    ts.Diagnostics.Property_0_is_missing_in_type_1_but_required_in_type_2.code,
    ts.Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2.code,
    ts.Diagnostics.Type_0_is_missing_the_following_properties_from_type_1_Colon_2_and_3_more.code,
    ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code,
    ts.Diagnostics.Cannot_find_name_0.code
];

enum InfoKind {
    TypeLikeDeclaration,
    Enum,
    Function,
    ObjectLiteral,
    JsxAttributes,
    Signature,
}

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const typeChecker = context.program.getTypeChecker();
        const info = getInfo(context.sourceFile, context.span.start, context.errorCode, typeChecker, context.program);
        if (!info) {
            return undefined;
        }
        if (info.kind === InfoKind.ObjectLiteral) {
            const changes = ts.textChanges.ChangeTracker.with(context, t => addObjectLiteralProperties(t, context, info));
            return [ts.codefix.createCodeFixAction(fixMissingProperties, changes, ts.Diagnostics.Add_missing_properties, fixMissingProperties, ts.Diagnostics.Add_all_missing_properties)];
        }
        if (info.kind === InfoKind.JsxAttributes) {
            const changes = ts.textChanges.ChangeTracker.with(context, t => addJsxAttributes(t, context, info));
            return [ts.codefix.createCodeFixAction(fixMissingAttributes, changes, ts.Diagnostics.Add_missing_attributes, fixMissingAttributes, ts.Diagnostics.Add_all_missing_attributes)];
        }
        if (info.kind === InfoKind.Function || info.kind === InfoKind.Signature) {
            const changes = ts.textChanges.ChangeTracker.with(context, t => addFunctionDeclaration(t, context, info));
            return [ts.codefix.createCodeFixAction(fixMissingFunctionDeclaration, changes, [ts.Diagnostics.Add_missing_function_declaration_0, info.token.text], fixMissingFunctionDeclaration, ts.Diagnostics.Add_all_missing_function_declarations)];
        }
        if (info.kind === InfoKind.Enum) {
            const changes = ts.textChanges.ChangeTracker.with(context, t => addEnumMemberDeclaration(t, context.program.getTypeChecker(), info));
            return [ts.codefix.createCodeFixAction(fixMissingMember, changes, [ts.Diagnostics.Add_missing_enum_member_0, info.token.text], fixMissingMember, ts.Diagnostics.Add_all_missing_members)];
        }
        return ts.concatenate(getActionsForMissingMethodDeclaration(context, info), getActionsForMissingMemberDeclaration(context, info));
    },
    fixIds: [fixMissingMember, fixMissingFunctionDeclaration, fixMissingProperties, fixMissingAttributes],
    getAllCodeActions: context => {
        const { program, fixId } = context;
        const checker = program.getTypeChecker();
        const seen = new ts.Map<string, true>();
        const typeDeclToMembers = new ts.Map<ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode, TypeLikeDeclarationInfo[]>();

        return ts.codefix.createCombinedCodeActions(ts.textChanges.ChangeTracker.with(context, changes => {
            ts.codefix.eachDiagnostic(context, errorCodes, diag => {
                const info = getInfo(diag.file, diag.start, diag.code, checker, context.program);
                if (!info || !ts.addToSeen(seen, ts.getNodeId(info.parentDeclaration) + "#" + info.token.text)) {
                    return;
                }
                if (fixId === fixMissingFunctionDeclaration && (info.kind === InfoKind.Function || info.kind === InfoKind.Signature)) {
                    addFunctionDeclaration(changes, context, info);
                }
                else if (fixId === fixMissingProperties && info.kind === InfoKind.ObjectLiteral) {
                    addObjectLiteralProperties(changes, context, info);
                }
                else if (fixId === fixMissingAttributes && info.kind === InfoKind.JsxAttributes) {
                    addJsxAttributes(changes, context, info);
                }
                else {
                    if (info.kind === InfoKind.Enum) {
                        addEnumMemberDeclaration(changes, checker, info);
                    }
                    if (info.kind === InfoKind.TypeLikeDeclaration) {
                        const { parentDeclaration, token } = info;
                        const infos = ts.getOrUpdate(typeDeclToMembers, parentDeclaration, () => []);
                        if (!infos.some(i => i.token.text === token.text)) {
                            infos.push(info);
                        }
                    }
                }
            });

            typeDeclToMembers.forEach((infos, declaration) => {
                const supers = ts.isTypeLiteralNode(declaration) ? undefined : ts.codefix.getAllSupers(declaration, checker);
                for (const info of infos) {
                    // If some superclass added this property, don't add it again.
                    if (supers?.some(superClassOrInterface => {
                        const superInfos = typeDeclToMembers.get(superClassOrInterface);
                        return !!superInfos && superInfos.some(({ token }) => token.text === info.token.text);
                    })) continue;

                    const { parentDeclaration, declSourceFile, modifierFlags, token, call, isJSFile } = info;
                    // Always prefer to add a method declaration if possible.
                    if (call && !ts.isPrivateIdentifier(token)) {
                        addMethodDeclaration(context, changes, call, token, modifierFlags & ts.ModifierFlags.Static, parentDeclaration, declSourceFile);
                    }
                    else {
                        if (isJSFile && !ts.isInterfaceDeclaration(parentDeclaration) && !ts.isTypeLiteralNode(parentDeclaration)) {
                            addMissingMemberInJs(changes, declSourceFile, parentDeclaration, token, !!(modifierFlags & ts.ModifierFlags.Static));
                        }
                        else {
                            const typeNode = getTypeNode(checker, parentDeclaration, token);
                            addPropertyDeclaration(changes, declSourceFile, parentDeclaration, token.text, typeNode, modifierFlags & ts.ModifierFlags.Static);
                        }
                    }
                }
            });
        }));
    },
});

type Info = TypeLikeDeclarationInfo | EnumInfo | FunctionInfo | ObjectLiteralInfo | JsxAttributesInfo | SignatureInfo;

interface EnumInfo {
    readonly kind: InfoKind.Enum;
    readonly token: ts.Identifier;
    readonly parentDeclaration: ts.EnumDeclaration;
}

interface TypeLikeDeclarationInfo {
    readonly kind: InfoKind.TypeLikeDeclaration;
    readonly call: ts.CallExpression | undefined;
    readonly token: ts.Identifier | ts.PrivateIdentifier;
    readonly modifierFlags: ts.ModifierFlags;
    readonly parentDeclaration: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode;
    readonly declSourceFile: ts.SourceFile;
    readonly isJSFile: boolean;
}

interface FunctionInfo {
    readonly kind: InfoKind.Function;
    readonly call: ts.CallExpression;
    readonly token: ts.Identifier;
    readonly sourceFile: ts.SourceFile;
    readonly modifierFlags: ts.ModifierFlags;
    readonly parentDeclaration: ts.SourceFile | ts.ModuleDeclaration | ts.ReturnStatement;
}

interface ObjectLiteralInfo {
    readonly kind: InfoKind.ObjectLiteral;
    readonly token: ts.Identifier;
    readonly properties: ts.Symbol[];
    readonly parentDeclaration: ts.ObjectLiteralExpression;
    readonly indentation?: number;
}

interface JsxAttributesInfo {
    readonly kind: InfoKind.JsxAttributes;
    readonly token: ts.Identifier;
    readonly attributes: ts.Symbol[];
    readonly parentDeclaration: ts.JsxOpeningLikeElement;
}

interface SignatureInfo {
    readonly kind: InfoKind.Signature;
    readonly token: ts.Identifier;
    readonly signature: ts.Signature;
    readonly sourceFile: ts.SourceFile;
    readonly parentDeclaration: ts.Node;
}

function getInfo(sourceFile: ts.SourceFile, tokenPos: number, errorCode: number, checker: ts.TypeChecker, program: ts.Program): Info | undefined {
    // The identifier of the missing property. eg:
    // this.missing = 1;
    //      ^^^^^^^
    const token = ts.getTokenAtPosition(sourceFile, tokenPos);
    const parent = token.parent;

    if (errorCode === ts.Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1.code) {
        if (!(token.kind === ts.SyntaxKind.OpenBraceToken && ts.isObjectLiteralExpression(parent) && ts.isCallExpression(parent.parent))) return undefined;

        const argIndex = ts.findIndex(parent.parent.arguments, arg => arg === parent);
        if (argIndex < 0) return undefined;

        const signature = checker.getResolvedSignature(parent.parent);
        if (!(signature && signature.declaration && signature.parameters[argIndex])) return undefined;

        const param = signature.parameters[argIndex].valueDeclaration;
        if (!(param && ts.isParameter(param) && ts.isIdentifier(param.name))) return undefined;

        const properties = ts.arrayFrom(checker.getUnmatchedProperties(checker.getTypeAtLocation(parent), checker.getParameterType(signature, argIndex), /* requireOptionalProperties */ false, /* matchDiscriminantProperties */ false));
        if (!ts.length(properties)) return undefined;
        return { kind: InfoKind.ObjectLiteral, token: param.name, properties, parentDeclaration: parent };
    }

    if (!ts.isMemberName(token)) return undefined;

    if (ts.isIdentifier(token) && ts.hasInitializer(parent) && parent.initializer && ts.isObjectLiteralExpression(parent.initializer)) {
        const properties = ts.arrayFrom(checker.getUnmatchedProperties(checker.getTypeAtLocation(parent.initializer), checker.getTypeAtLocation(token), /* requireOptionalProperties */ false, /* matchDiscriminantProperties */ false));
        if (!ts.length(properties)) return undefined;

        return { kind: InfoKind.ObjectLiteral, token, properties, parentDeclaration: parent.initializer };
    }

    if (ts.isIdentifier(token) && ts.isJsxOpeningLikeElement(token.parent)) {
        const target = ts.getEmitScriptTarget(program.getCompilerOptions());
        const attributes = getUnmatchedAttributes(checker, target, token.parent);
        if (!ts.length(attributes)) return undefined;
        return { kind: InfoKind.JsxAttributes, token, attributes, parentDeclaration: token.parent };
    }

    if (ts.isIdentifier(token)) {
        const type = checker.getContextualType(token);
        if (type && ts.getObjectFlags(type) & ts.ObjectFlags.Anonymous) {
            const signature = ts.firstOrUndefined(checker.getSignaturesOfType(type, ts.SignatureKind.Call));
            if (signature === undefined) return undefined;
            return { kind: InfoKind.Signature, token, signature, sourceFile, parentDeclaration: findScope(token) };
        }
        if (ts.isCallExpression(parent) && parent.expression === token) {
            return { kind: InfoKind.Function, token, call: parent, sourceFile, modifierFlags: ts.ModifierFlags.None, parentDeclaration: findScope(token) };
        }
    }

    if (!ts.isPropertyAccessExpression(parent)) return undefined;

    const leftExpressionType = ts.skipConstraint(checker.getTypeAtLocation(parent.expression));
    const symbol = leftExpressionType.symbol;
    if (!symbol || !symbol.declarations) return undefined;

    if (ts.isIdentifier(token) && ts.isCallExpression(parent.parent)) {
        const moduleDeclaration = ts.find(symbol.declarations, ts.isModuleDeclaration);
        const moduleDeclarationSourceFile = moduleDeclaration?.getSourceFile();
        if (moduleDeclaration && moduleDeclarationSourceFile && !ts.isSourceFileFromLibrary(program, moduleDeclarationSourceFile)) {
            return { kind: InfoKind.Function, token, call: parent.parent, sourceFile, modifierFlags: ts.ModifierFlags.Export, parentDeclaration: moduleDeclaration };
        }

        const moduleSourceFile = ts.find(symbol.declarations, ts.isSourceFile);
        if (sourceFile.commonJsModuleIndicator) return undefined;

        if (moduleSourceFile && !ts.isSourceFileFromLibrary(program, moduleSourceFile)) {
            return { kind: InfoKind.Function, token, call: parent.parent, sourceFile: moduleSourceFile, modifierFlags: ts.ModifierFlags.Export, parentDeclaration: moduleSourceFile };
        }
    }

    const classDeclaration = ts.find(symbol.declarations, ts.isClassLike);
    // Don't suggest adding private identifiers to anything other than a class.
    if (!classDeclaration && ts.isPrivateIdentifier(token)) return undefined;

    // Prefer to change the class instead of the interface if they are merged
    const declaration = classDeclaration || ts.find(symbol.declarations, d => ts.isInterfaceDeclaration(d) || ts.isTypeLiteralNode(d)) as ts.InterfaceDeclaration | ts.TypeLiteralNode | undefined;
    if (declaration && !ts.isSourceFileFromLibrary(program, declaration.getSourceFile())) {
        const makeStatic = !ts.isTypeLiteralNode(declaration) && ((leftExpressionType as ts.TypeReference).target || leftExpressionType) !== checker.getDeclaredTypeOfSymbol(symbol);
        if (makeStatic && (ts.isPrivateIdentifier(token) || ts.isInterfaceDeclaration(declaration))) return undefined;

        const declSourceFile = declaration.getSourceFile();
        const modifierFlags = ts.isTypeLiteralNode(declaration) ? ts.ModifierFlags.None :
            (makeStatic ? ts.ModifierFlags.Static : ts.ModifierFlags.None) | (ts.startsWithUnderscore(token.text) ? ts.ModifierFlags.Private : ts.ModifierFlags.None);
        const isJSFile = ts.isSourceFileJS(declSourceFile);
        const call = ts.tryCast(parent.parent, ts.isCallExpression);
        return { kind: InfoKind.TypeLikeDeclaration, token, call, modifierFlags, parentDeclaration: declaration, declSourceFile, isJSFile };
    }

    const enumDeclaration = ts.find(symbol.declarations, ts.isEnumDeclaration);
    if (enumDeclaration && !(leftExpressionType.flags & ts.TypeFlags.EnumLike) && !ts.isPrivateIdentifier(token) && !ts.isSourceFileFromLibrary(program, enumDeclaration.getSourceFile())) {
        return { kind: InfoKind.Enum, token, parentDeclaration: enumDeclaration };
    }

    return undefined;
}

function getActionsForMissingMemberDeclaration(context: ts.CodeFixContext, info: TypeLikeDeclarationInfo): ts.CodeFixAction[] | undefined {
    return info.isJSFile ? ts.singleElementArray(createActionForAddMissingMemberInJavascriptFile(context, info)) :
        createActionsForAddMissingMemberInTypeScriptFile(context, info);
}

function createActionForAddMissingMemberInJavascriptFile(context: ts.CodeFixContext, { parentDeclaration, declSourceFile, modifierFlags, token }: TypeLikeDeclarationInfo): ts.CodeFixAction | undefined {
    if (ts.isInterfaceDeclaration(parentDeclaration) || ts.isTypeLiteralNode(parentDeclaration)) {
        return undefined;
    }

    const changes = ts.textChanges.ChangeTracker.with(context, t => addMissingMemberInJs(t, declSourceFile, parentDeclaration, token, !!(modifierFlags & ts.ModifierFlags.Static)));
    if (changes.length === 0) {
        return undefined;
    }

    const diagnostic = modifierFlags & ts.ModifierFlags.Static ? ts.Diagnostics.Initialize_static_property_0 :
        ts.isPrivateIdentifier(token) ? ts.Diagnostics.Declare_a_private_field_named_0 : ts.Diagnostics.Initialize_property_0_in_the_constructor;

    return ts.codefix.createCodeFixAction(fixMissingMember, changes, [diagnostic, token.text], fixMissingMember, ts.Diagnostics.Add_all_missing_members);
}

function addMissingMemberInJs(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, classDeclaration: ts.ClassLikeDeclaration, token: ts.Identifier | ts.PrivateIdentifier, makeStatic: boolean): void {
    const tokenName = token.text;
    if (makeStatic) {
        if (classDeclaration.kind === ts.SyntaxKind.ClassExpression) {
            return;
        }
        const className = classDeclaration.name!.getText();
        const staticInitialization = initializePropertyToUndefined(ts.factory.createIdentifier(className), tokenName);
        changeTracker.insertNodeAfter(sourceFile, classDeclaration, staticInitialization);
    }
    else if (ts.isPrivateIdentifier(token)) {
        const property = ts.factory.createPropertyDeclaration(
            /*modifiers*/ undefined,
            tokenName,
            /*questionToken*/ undefined,
            /*type*/ undefined,
            /*initializer*/ undefined);

        const lastProp = getNodeToInsertPropertyAfter(classDeclaration);
        if (lastProp) {
            changeTracker.insertNodeAfter(sourceFile, lastProp, property);
        }
        else {
            changeTracker.insertMemberAtStart(sourceFile, classDeclaration, property);
        }
    }
    else {
        const classConstructor = ts.getFirstConstructorWithBody(classDeclaration);
        if (!classConstructor) {
            return;
        }
        const propertyInitialization = initializePropertyToUndefined(ts.factory.createThis(), tokenName);
        changeTracker.insertNodeAtConstructorEnd(sourceFile, classConstructor, propertyInitialization);
    }
}

function initializePropertyToUndefined(obj: ts.Expression, propertyName: string) {
    return ts.factory.createExpressionStatement(ts.factory.createAssignment(ts.factory.createPropertyAccessExpression(obj, propertyName), createUndefined()));
}

function createActionsForAddMissingMemberInTypeScriptFile(context: ts.CodeFixContext, { parentDeclaration, declSourceFile, modifierFlags, token }: TypeLikeDeclarationInfo): ts.CodeFixAction[] | undefined {
    const memberName = token.text;
    const isStatic = modifierFlags & ts.ModifierFlags.Static;
    const typeNode = getTypeNode(context.program.getTypeChecker(), parentDeclaration, token);
    const addPropertyDeclarationChanges = (modifierFlags: ts.ModifierFlags) => ts.textChanges.ChangeTracker.with(context, t => addPropertyDeclaration(t, declSourceFile, parentDeclaration, memberName, typeNode, modifierFlags));

    const actions = [ts.codefix.createCodeFixAction(fixMissingMember, addPropertyDeclarationChanges(modifierFlags & ts.ModifierFlags.Static), [isStatic ? ts.Diagnostics.Declare_static_property_0 : ts.Diagnostics.Declare_property_0, memberName], fixMissingMember, ts.Diagnostics.Add_all_missing_members)];
    if (isStatic || ts.isPrivateIdentifier(token)) {
        return actions;
    }

    if (modifierFlags & ts.ModifierFlags.Private) {
        actions.unshift(ts.codefix.createCodeFixActionWithoutFixAll(fixMissingMember, addPropertyDeclarationChanges(ts.ModifierFlags.Private), [ts.Diagnostics.Declare_private_property_0, memberName]));
    }

    actions.push(createAddIndexSignatureAction(context, declSourceFile, parentDeclaration, token.text, typeNode));
    return actions;
}

function getTypeNode(checker: ts.TypeChecker, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode, token: ts.Node) {
    let typeNode: ts.TypeNode | undefined;
    if (token.parent.parent.kind === ts.SyntaxKind.BinaryExpression) {
        const binaryExpression = token.parent.parent as ts.BinaryExpression;
        const otherExpression = token.parent === binaryExpression.left ? binaryExpression.right : binaryExpression.left;
        const widenedType = checker.getWidenedType(checker.getBaseTypeOfLiteralType(checker.getTypeAtLocation(otherExpression)));
        typeNode = checker.typeToTypeNode(widenedType, node, ts.NodeBuilderFlags.NoTruncation);
    }
    else {
        const contextualType = checker.getContextualType(token.parent as ts.Expression);
        typeNode = contextualType ? checker.typeToTypeNode(contextualType, /*enclosingDeclaration*/ undefined, ts.NodeBuilderFlags.NoTruncation) : undefined;
    }
    return typeNode || ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
}

function addPropertyDeclaration(changeTracker: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode, tokenName: string, typeNode: ts.TypeNode, modifierFlags: ts.ModifierFlags): void {
    const modifiers = modifierFlags ? ts.factory.createNodeArray(ts.factory.createModifiersFromModifierFlags(modifierFlags)) : undefined;

    const property = ts.isClassLike(node)
        ? ts.factory.createPropertyDeclaration(modifiers, tokenName, /*questionToken*/ undefined, typeNode, /*initializer*/ undefined)
        : ts.factory.createPropertySignature(/*modifiers*/ undefined, tokenName, /*questionToken*/ undefined, typeNode);

    const lastProp = getNodeToInsertPropertyAfter(node);
    if (lastProp) {
        changeTracker.insertNodeAfter(sourceFile, lastProp, property);
    }
    else {
        changeTracker.insertMemberAtStart(sourceFile, node, property);
    }
}

// Gets the last of the first run of PropertyDeclarations, or undefined if the class does not start with a PropertyDeclaration.
function getNodeToInsertPropertyAfter(node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode): ts.PropertyDeclaration | undefined {
    let res: ts.PropertyDeclaration | undefined;
    for (const member of node.members) {
        if (!ts.isPropertyDeclaration(member)) break;
        res = member;
    }
    return res;
}

function createAddIndexSignatureAction(context: ts.CodeFixContext, sourceFile: ts.SourceFile, node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode, tokenName: string, typeNode: ts.TypeNode): ts.CodeFixAction {
    // Index signatures cannot have the static modifier.
    const stringTypeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    const indexingParameter = ts.factory.createParameterDeclaration(
        /*modifiers*/ undefined,
        /*dotDotDotToken*/ undefined,
        "x",
        /*questionToken*/ undefined,
        stringTypeNode,
        /*initializer*/ undefined);
    const indexSignature = ts.factory.createIndexSignature(
        /*modifiers*/ undefined,
        [indexingParameter],
        typeNode);

    const changes = ts.textChanges.ChangeTracker.with(context, t => t.insertMemberAtStart(sourceFile, node, indexSignature));
    // No fixId here because code-fix-all currently only works on adding individual named properties.
    return ts.codefix.createCodeFixActionWithoutFixAll(fixMissingMember, changes, [ts.Diagnostics.Add_index_signature_for_property_0, tokenName]);
}

function getActionsForMissingMethodDeclaration(context: ts.CodeFixContext, info: TypeLikeDeclarationInfo): ts.CodeFixAction[] | undefined {
    const { parentDeclaration, declSourceFile, modifierFlags, token, call } = info;
    if (call === undefined) {
        return undefined;
    }

    // Private methods are not implemented yet.
    if (ts.isPrivateIdentifier(token)) {
        return undefined;
    }

    const methodName = token.text;
    const addMethodDeclarationChanges = (modifierFlags: ts.ModifierFlags) => ts.textChanges.ChangeTracker.with(context, t => addMethodDeclaration(context, t, call, token, modifierFlags, parentDeclaration, declSourceFile));
    const actions = [ts.codefix.createCodeFixAction(fixMissingMember, addMethodDeclarationChanges(modifierFlags & ts.ModifierFlags.Static), [modifierFlags & ts.ModifierFlags.Static ? ts.Diagnostics.Declare_static_method_0 : ts.Diagnostics.Declare_method_0, methodName], fixMissingMember, ts.Diagnostics.Add_all_missing_members)];
    if (modifierFlags & ts.ModifierFlags.Private) {
        actions.unshift(ts.codefix.createCodeFixActionWithoutFixAll(fixMissingMember, addMethodDeclarationChanges(ts.ModifierFlags.Private), [ts.Diagnostics.Declare_private_method_0, methodName]));
    }
    return actions;
}

function addMethodDeclaration(
    context: ts.CodeFixContextBase,
    changes: ts.textChanges.ChangeTracker,
    callExpression: ts.CallExpression,
    name: ts.Identifier,
    modifierFlags: ts.ModifierFlags,
    parentDeclaration: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode,
    sourceFile: ts.SourceFile,
): void {
    const importAdder = ts.codefix.createImportAdder(sourceFile, context.program, context.preferences, context.host);
    const kind = ts.isClassLike(parentDeclaration) ? ts.SyntaxKind.MethodDeclaration : ts.SyntaxKind.MethodSignature;
    const signatureDeclaration = ts.codefix.createSignatureDeclarationFromCallExpression(kind, context, importAdder, callExpression, name, modifierFlags, parentDeclaration) as ts.MethodDeclaration;
    const containingMethodDeclaration = tryGetContainingMethodDeclaration(parentDeclaration, callExpression);
    if (containingMethodDeclaration) {
        changes.insertNodeAfter(sourceFile, containingMethodDeclaration, signatureDeclaration);
    }
    else {
        changes.insertMemberAtStart(sourceFile, parentDeclaration, signatureDeclaration);
    }
    importAdder.writeFixes(changes);
}

function addEnumMemberDeclaration(changes: ts.textChanges.ChangeTracker, checker: ts.TypeChecker, { token, parentDeclaration }: EnumInfo) {
    /**
     * create initializer only literal enum that has string initializer.
     * value of initializer is a string literal that equal to name of enum member.
     * numeric enum or empty enum will not create initializer.
     */
    const hasStringInitializer = ts.some(parentDeclaration.members, member => {
        const type = checker.getTypeAtLocation(member);
        return !!(type && type.flags & ts.TypeFlags.StringLike);
    });

    const enumMember = ts.factory.createEnumMember(token, hasStringInitializer ? ts.factory.createStringLiteral(token.text) : undefined);
    changes.replaceNode(parentDeclaration.getSourceFile(), parentDeclaration, ts.factory.updateEnumDeclaration(
        parentDeclaration,
        parentDeclaration.modifiers,
        parentDeclaration.name,
        ts.concatenate(parentDeclaration.members, ts.singleElementArray(enumMember))
    ), {
        leadingTriviaOption: ts.textChanges.LeadingTriviaOption.IncludeAll,
        trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude
    });
}

function addFunctionDeclaration(changes: ts.textChanges.ChangeTracker, context: ts.CodeFixContextBase, info: FunctionInfo | SignatureInfo) {
    const quotePreference = ts.getQuotePreference(context.sourceFile, context.preferences);
    const importAdder = ts.codefix.createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
    const functionDeclaration = info.kind === InfoKind.Function
        ? ts.codefix.createSignatureDeclarationFromCallExpression(ts.SyntaxKind.FunctionDeclaration, context, importAdder, info.call, ts.idText(info.token), info.modifierFlags, info.parentDeclaration)
        : ts.codefix.createSignatureDeclarationFromSignature(ts.SyntaxKind.FunctionDeclaration, context, quotePreference, info.signature, ts.codefix.createStubbedBody(ts.Diagnostics.Function_not_implemented.message, quotePreference), info.token, /*modifiers*/ undefined, /*optional*/ undefined, /*enclosingDeclaration*/ undefined, importAdder);
    if (functionDeclaration === undefined) {
        ts.Debug.fail("fixMissingFunctionDeclaration codefix got unexpected error.");
    }

    ts.isReturnStatement(info.parentDeclaration)
        ? changes.insertNodeBefore(info.sourceFile, info.parentDeclaration, functionDeclaration, /*blankLineBetween*/ true)
        : changes.insertNodeAtEndOfScope(info.sourceFile, info.parentDeclaration, functionDeclaration);
    importAdder.writeFixes(changes);
}

function addJsxAttributes(changes: ts.textChanges.ChangeTracker, context: ts.CodeFixContextBase, info: JsxAttributesInfo) {
    const importAdder = ts.codefix.createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
    const quotePreference = ts.getQuotePreference(context.sourceFile, context.preferences);
    const checker = context.program.getTypeChecker();
    const jsxAttributesNode = info.parentDeclaration.attributes;
    const hasSpreadAttribute = ts.some(jsxAttributesNode.properties, ts.isJsxSpreadAttribute);
    const attrs = ts.map(info.attributes, attr => {
        const value = tryGetValueFromType(context, checker, importAdder, quotePreference, checker.getTypeOfSymbol(attr), info.parentDeclaration);
        const name = ts.factory.createIdentifier(attr.name);
        const jsxAttribute = ts.factory.createJsxAttribute(name, ts.factory.createJsxExpression(/*dotDotDotToken*/ undefined, value));
        // formattingScanner requires the Identifier to have a context for scanning attributes with "-" (data-foo).
        ts.setParent(name, jsxAttribute);
        return jsxAttribute;
    });
    const jsxAttributes = ts.factory.createJsxAttributes(hasSpreadAttribute ? [...attrs, ...jsxAttributesNode.properties] : [...jsxAttributesNode.properties, ...attrs]);
    const options = { prefix: jsxAttributesNode.pos === jsxAttributesNode.end ? " " : undefined };
    changes.replaceNode(context.sourceFile, jsxAttributesNode, jsxAttributes, options);
    importAdder.writeFixes(changes);
}

function addObjectLiteralProperties(changes: ts.textChanges.ChangeTracker, context: ts.CodeFixContextBase, info: ObjectLiteralInfo) {
    const importAdder = ts.codefix.createImportAdder(context.sourceFile, context.program, context.preferences, context.host);
    const quotePreference = ts.getQuotePreference(context.sourceFile, context.preferences);
    const target = ts.getEmitScriptTarget(context.program.getCompilerOptions());
    const checker = context.program.getTypeChecker();
    const props = ts.map(info.properties, prop => {
        const initializer = tryGetValueFromType(context, checker, importAdder, quotePreference, checker.getTypeOfSymbol(prop), info.parentDeclaration);
        return ts.factory.createPropertyAssignment(createPropertyNameFromSymbol(prop, target, quotePreference, checker), initializer);
    });
    const options = {
        leadingTriviaOption: ts.textChanges.LeadingTriviaOption.Exclude,
        trailingTriviaOption: ts.textChanges.TrailingTriviaOption.Exclude,
        indentation: info.indentation
    };
    changes.replaceNode(context.sourceFile, info.parentDeclaration, ts.factory.createObjectLiteralExpression([...info.parentDeclaration.properties, ...props], /*multiLine*/ true), options);
    importAdder.writeFixes(changes);
}

function tryGetValueFromType(context: ts.CodeFixContextBase, checker: ts.TypeChecker, importAdder: ts.codefix.ImportAdder, quotePreference: ts.QuotePreference, type: ts.Type, enclosingDeclaration: ts.Node | undefined): ts.Expression {
    if (type.flags & ts.TypeFlags.AnyOrUnknown) {
        return createUndefined();
    }
    if (type.flags & (ts.TypeFlags.String | ts.TypeFlags.TemplateLiteral)) {
        return ts.factory.createStringLiteral("", /* isSingleQuote */ quotePreference === ts.QuotePreference.Single);
    }
    if (type.flags & ts.TypeFlags.Number) {
        return ts.factory.createNumericLiteral(0);
    }
    if (type.flags & ts.TypeFlags.BigInt) {
        return ts.factory.createBigIntLiteral("0n");
    }
    if (type.flags & ts.TypeFlags.Boolean) {
        return ts.factory.createFalse();
    }
    if (type.flags & ts.TypeFlags.EnumLike) {
        const enumMember = type.symbol.exports ? ts.firstOrUndefined(ts.arrayFrom(type.symbol.exports.values())) : type.symbol;
        const name = checker.symbolToExpression(type.symbol.parent ? type.symbol.parent : type.symbol, ts.SymbolFlags.Value, /*enclosingDeclaration*/ undefined, /*flags*/ undefined);
        return enumMember === undefined || name === undefined ? ts.factory.createNumericLiteral(0) : ts.factory.createPropertyAccessExpression(name, checker.symbolToString(enumMember));
    }
    if (type.flags & ts.TypeFlags.NumberLiteral) {
        return ts.factory.createNumericLiteral((type as ts.NumberLiteralType).value);
    }
    if (type.flags & ts.TypeFlags.BigIntLiteral) {
        return ts.factory.createBigIntLiteral((type as ts.BigIntLiteralType).value);
    }
    if (type.flags & ts.TypeFlags.StringLiteral) {
        return ts.factory.createStringLiteral((type as ts.StringLiteralType).value, /* isSingleQuote */ quotePreference === ts.QuotePreference.Single);
    }
    if (type.flags & ts.TypeFlags.BooleanLiteral) {
        return (type === checker.getFalseType() || type === checker.getFalseType(/*fresh*/ true)) ? ts.factory.createFalse() : ts.factory.createTrue();
    }
    if (type.flags & ts.TypeFlags.Null) {
        return ts.factory.createNull();
    }
    if (type.flags & ts.TypeFlags.Union) {
        const expression = ts.firstDefined((type as ts.UnionType).types, t => tryGetValueFromType(context, checker, importAdder, quotePreference, t, enclosingDeclaration));
        return expression ?? createUndefined();
    }
    if (checker.isArrayLikeType(type)) {
        return ts.factory.createArrayLiteralExpression();
    }
    if (isObjectLiteralType(type)) {
        const props = ts.map(checker.getPropertiesOfType(type), prop => {
            const initializer = prop.valueDeclaration ? tryGetValueFromType(context, checker, importAdder, quotePreference, checker.getTypeAtLocation(prop.valueDeclaration), enclosingDeclaration) : createUndefined();
            return ts.factory.createPropertyAssignment(prop.name, initializer);
        });
        return ts.factory.createObjectLiteralExpression(props, /*multiLine*/ true);
    }
    if (ts.getObjectFlags(type) & ts.ObjectFlags.Anonymous) {
        const decl = ts.find(type.symbol.declarations || ts.emptyArray, ts.or(ts.isFunctionTypeNode, ts.isMethodSignature, ts.isMethodDeclaration));
        if (decl === undefined) return createUndefined();

        const signature = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
        if (signature === undefined) return createUndefined();

        const func = ts.codefix.createSignatureDeclarationFromSignature(ts.SyntaxKind.FunctionExpression, context, quotePreference, signature[0],
            ts.codefix.createStubbedBody(ts.Diagnostics.Function_not_implemented.message, quotePreference), /*name*/ undefined, /*modifiers*/ undefined, /*optional*/ undefined, /*enclosingDeclaration*/ enclosingDeclaration, importAdder) as ts.FunctionExpression | undefined;
        return func ?? createUndefined();
    }
    if (ts.getObjectFlags(type) & ts.ObjectFlags.Class) {
        const classDeclaration = ts.getClassLikeDeclarationOfSymbol(type.symbol);
        if (classDeclaration === undefined || ts.hasAbstractModifier(classDeclaration)) return createUndefined();

        const constructorDeclaration = ts.getFirstConstructorWithBody(classDeclaration);
        if (constructorDeclaration && ts.length(constructorDeclaration.parameters)) return createUndefined();

        return ts.factory.createNewExpression(ts.factory.createIdentifier(type.symbol.name), /*typeArguments*/ undefined, /*argumentsArray*/ undefined);
    }
    return createUndefined();
}

function createUndefined() {
    return ts.factory.createIdentifier("undefined");
}

function isObjectLiteralType(type: ts.Type) {
    return (type.flags & ts.TypeFlags.Object) &&
        ((ts.getObjectFlags(type) & ts.ObjectFlags.ObjectLiteral) || (type.symbol && ts.tryCast(ts.singleOrUndefined(type.symbol.declarations), ts.isTypeLiteralNode)));
}

function getUnmatchedAttributes(checker: ts.TypeChecker, target: ts.ScriptTarget, source: ts.JsxOpeningLikeElement) {
    const attrsType = checker.getContextualType(source.attributes);
    if (attrsType === undefined) return ts.emptyArray;

    const targetProps = attrsType.getProperties();
    if (!ts.length(targetProps)) return ts.emptyArray;

    const seenNames = new ts.Set<ts.__String>();
    for (const sourceProp of source.attributes.properties) {
        if (ts.isJsxAttribute(sourceProp)) {
            seenNames.add(sourceProp.name.escapedText);
        }
        if (ts.isJsxSpreadAttribute(sourceProp)) {
            const type = checker.getTypeAtLocation(sourceProp.expression);
            for (const prop of type.getProperties()) {
                seenNames.add(prop.escapedName);
            }
        }
    }
    return ts.filter(targetProps, targetProp =>
        ts.isIdentifierText(targetProp.name, target, ts.LanguageVariant.JSX) && !((targetProp.flags & ts.SymbolFlags.Optional || ts.getCheckFlags(targetProp) & ts.CheckFlags.Partial) || seenNames.has(targetProp.escapedName)));
}

function tryGetContainingMethodDeclaration(node: ts.ClassLikeDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode, callExpression: ts.CallExpression) {
    if (ts.isTypeLiteralNode(node)) {
        return undefined;
    }
    const declaration = ts.findAncestor(callExpression, n => ts.isMethodDeclaration(n) || ts.isConstructorDeclaration(n));
    return declaration && declaration.parent === node ? declaration : undefined;
}

function createPropertyNameFromSymbol(symbol: ts.Symbol, target: ts.ScriptTarget, quotePreference: ts.QuotePreference, checker: ts.TypeChecker) {
    if (ts.isTransientSymbol(symbol)) {
        const prop = checker.symbolToNode(symbol, ts.SymbolFlags.Value, /*enclosingDeclaration*/ undefined, ts.NodeBuilderFlags.WriteComputedProps);
        if (prop && ts.isComputedPropertyName(prop)) return prop;
    }
    return ts.createPropertyNameNodeForIdentifierOrLiteral(symbol.name, target, quotePreference === ts.QuotePreference.Single);
}

function findScope(node: ts.Node) {
    if (ts.findAncestor(node, ts.isJsxExpression)) {
        const returnStatement = ts.findAncestor(node.parent, ts.isReturnStatement);
        if (returnStatement) return returnStatement;
    }
    return ts.getSourceFileOfNode(node);
}
