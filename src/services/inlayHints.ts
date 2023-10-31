import {
    __String,
    ArrayTypeNode,
    ArrowFunction,
    CallExpression,
    CharacterCodes,
    ConditionalTypeNode,
    ConstructorTypeNode,
    createPrinterWithRemoveComments,
    createTextSpanFromNode,
    Debug,
    ElementFlags,
    EmitHint,
    EnumMember,
    equateStringsCaseInsensitive,
    escapeString,
    Expression,
    findChildOfKind,
    findIndex,
    forEachChild,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    FunctionTypeNode,
    GetAccessorDeclaration,
    getEffectiveReturnTypeNode,
    getEffectiveTypeAnnotationNode,
    getLanguageVariant,
    getLeadingCommentRanges,
    getNameOfDeclaration,
    getQuotePreference,
    hasContextSensitiveParameters,
    Identifier,
    idText,
    ImportTypeNode,
    IndexedAccessTypeNode,
    InferTypeNode,
    InlayHint,
    InlayHintDisplayPart,
    InlayHintKind,
    InlayHintsContext,
    IntersectionTypeNode,
    isArrowFunction,
    isAssertionExpression,
    isBindingPattern,
    isCallExpression,
    isEnumMember,
    isExpressionWithTypeArguments,
    isFunctionDeclaration,
    isFunctionExpression,
    isFunctionLikeDeclaration,
    isGetAccessorDeclaration,
    isIdentifier,
    isIdentifierText,
    isInfinityOrNaNString,
    isLiteralExpression,
    isMethodDeclaration,
    isNewExpression,
    isObjectLiteralExpression,
    isParameter,
    isParameterDeclaration,
    isPropertyAccessExpression,
    isPropertyDeclaration,
    isSpreadElement,
    isStringLiteral,
    isTypeNode,
    isVarConst,
    isVariableDeclaration,
    LiteralExpression,
    LiteralTypeNode,
    MappedTypeNode,
    MethodDeclaration,
    NamedTupleMember,
    NewExpression,
    Node,
    NodeArray,
    NodeBuilderFlags,
    OptionalTypeNode,
    ParameterDeclaration,
    ParenthesizedTypeNode,
    PrefixUnaryExpression,
    PropertyDeclaration,
    PropertySignature,
    QualifiedName,
    QuotePreference,
    RestTypeNode,
    Signature,
    skipParentheses,
    some,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    textSpanIntersectsWith,
    tokenToString,
    TupleTypeNode,
    TupleTypeReference,
    Type,
    TypeLiteralNode,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    unescapeLeadingUnderscores,
    UnionTypeNode,
    UserPreferences,
    usingSingleLineStringWriter,
    VariableDeclaration,
} from "./_namespaces/ts";

const leadingParameterNameCommentRegexFactory = (name: string) => {
    return new RegExp(`^\\s?/\\*\\*?\\s?${name}\\s?\\*\\/\\s?$`);
};

function shouldShowParameterNameHints(preferences: UserPreferences) {
    return preferences.includeInlayParameterNameHints === "literals" || preferences.includeInlayParameterNameHints === "all";
}

function shouldShowLiteralParameterNameHintsOnly(preferences: UserPreferences) {
    return preferences.includeInlayParameterNameHints === "literals";
}

function shouldUseInteractiveInlayHints(preferences: UserPreferences) {
    return preferences.interactiveInlayHints === true;
}

/** @internal */
export function provideInlayHints(context: InlayHintsContext): InlayHint[] {
    const { file, program, span, cancellationToken, preferences } = context;
    const sourceFileText = file.text;
    const compilerOptions = program.getCompilerOptions();
    const quotePreference = getQuotePreference(file, preferences);

    const checker = program.getTypeChecker();
    const result: InlayHint[] = [];

    visitor(file);
    return result;

    function visitor(node: Node): true | undefined {
        if (!node || node.getFullWidth() === 0) {
            return;
        }

        switch (node.kind) {
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.ArrowFunction:
                cancellationToken.throwIfCancellationRequested();
        }

        if (!textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
            return;
        }

        if (isTypeNode(node) && !isExpressionWithTypeArguments(node)) {
            return;
        }

        if (preferences.includeInlayVariableTypeHints && isVariableDeclaration(node)) {
            visitVariableLikeDeclaration(node);
        }
        else if (preferences.includeInlayPropertyDeclarationTypeHints && isPropertyDeclaration(node)) {
            visitVariableLikeDeclaration(node);
        }
        else if (preferences.includeInlayEnumMemberValueHints && isEnumMember(node)) {
            visitEnumMember(node);
        }
        else if (shouldShowParameterNameHints(preferences) && (isCallExpression(node) || isNewExpression(node))) {
            visitCallOrNewExpression(node);
        }
        else {
            if (preferences.includeInlayFunctionParameterTypeHints && isFunctionLikeDeclaration(node) && hasContextSensitiveParameters(node)) {
                visitFunctionLikeForParameterType(node);
            }
            if (preferences.includeInlayFunctionLikeReturnTypeHints && isSignatureSupportingReturnAnnotation(node)) {
                visitFunctionDeclarationLikeForReturnType(node);
            }
        }
        return forEachChild(node, visitor);
    }

    function isSignatureSupportingReturnAnnotation(node: Node): node is FunctionDeclaration | ArrowFunction | FunctionExpression | MethodDeclaration | GetAccessorDeclaration {
        return isArrowFunction(node) || isFunctionExpression(node) || isFunctionDeclaration(node) || isMethodDeclaration(node) || isGetAccessorDeclaration(node);
    }

    function addParameterHints(text: string, parameter: Identifier, position: number, isFirstVariadicArgument: boolean) {
        let hintText = `${isFirstVariadicArgument ? "..." : ""}${text}`;
        let displayParts: InlayHintDisplayPart[] | undefined;
        if (shouldUseInteractiveInlayHints(preferences)) {
            displayParts = [getNodeDisplayPart(hintText, parameter), { text: ":" }];
            hintText = "";
        }
        else {
            hintText += ":";
        }

        result.push({
            text: hintText,
            position,
            kind: InlayHintKind.Parameter,
            whitespaceAfter: true,
            displayParts,
        });
    }

    function addTypeHints(hintText: string | InlayHintDisplayPart[], position: number) {
        result.push({
            text: typeof hintText === "string" ? `: ${hintText}` : "",
            displayParts: typeof hintText === "string" ? undefined : [{ text: ": " }, ...hintText],
            position,
            kind: InlayHintKind.Type,
            whitespaceBefore: true,
        });
    }

    function addEnumMemberValueHints(text: string, position: number) {
        result.push({
            text: `= ${text}`,
            position,
            kind: InlayHintKind.Enum,
            whitespaceBefore: true,
        });
    }

    function visitEnumMember(member: EnumMember) {
        if (member.initializer) {
            return;
        }

        const enumValue = checker.getConstantValue(member);
        if (enumValue !== undefined) {
            addEnumMemberValueHints(enumValue.toString(), member.end);
        }
    }

    function isModuleReferenceType(type: Type) {
        return type.symbol && (type.symbol.flags & SymbolFlags.Module);
    }

    function visitVariableLikeDeclaration(decl: VariableDeclaration | PropertyDeclaration) {
        if (!decl.initializer || isBindingPattern(decl.name) || isVariableDeclaration(decl) && !isHintableDeclaration(decl)) {
            return;
        }

        const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(decl);
        if (effectiveTypeAnnotation) {
            return;
        }

        const declarationType = checker.getTypeAtLocation(decl);
        if (isModuleReferenceType(declarationType)) {
            return;
        }

        const hintParts = typeToInlayHintParts(declarationType);
        if (hintParts) {
            const hintText = typeof hintParts === "string" ? hintParts : hintParts.map(part => part.text).join("");
            const isVariableNameMatchesType = preferences.includeInlayVariableTypeHintsWhenTypeMatchesName === false && equateStringsCaseInsensitive(decl.name.getText(), hintText);
            if (isVariableNameMatchesType) {
                return;
            }
            addTypeHints(hintParts, decl.name.end);
        }
    }

    function visitCallOrNewExpression(expr: CallExpression | NewExpression) {
        const args = expr.arguments;
        if (!args || !args.length) {
            return;
        }

        const candidates: Signature[] = [];
        const signature = checker.getResolvedSignatureForSignatureHelp(expr, candidates);
        if (!signature || !candidates.length) {
            return;
        }

        let signatureParamPos = 0;
        for (const originalArg of args) {
            const arg = skipParentheses(originalArg);
            if (shouldShowLiteralParameterNameHintsOnly(preferences) && !isHintableLiteral(arg)) {
                signatureParamPos++;
                continue;
            }

            let spreadArgs = 0;
            if (isSpreadElement(arg)) {
                const spreadType = checker.getTypeAtLocation(arg.expression);
                if (checker.isTupleType(spreadType)) {
                    const { elementFlags, fixedLength } = (spreadType as TupleTypeReference).target;
                    if (fixedLength === 0) {
                        continue;
                    }
                    const firstOptionalIndex = findIndex(elementFlags, f => !(f & ElementFlags.Required));
                    const requiredArgs = firstOptionalIndex < 0 ? fixedLength : firstOptionalIndex;
                    if (requiredArgs > 0) {
                        spreadArgs = firstOptionalIndex < 0 ? fixedLength : firstOptionalIndex;
                    }
                }
            }

            const identifierInfo = checker.getParameterIdentifierInfoAtPosition(signature, signatureParamPos);
            signatureParamPos = signatureParamPos + (spreadArgs || 1);
            if (identifierInfo) {
                const { parameter, parameterName, isRestParameter: isFirstVariadicArgument } = identifierInfo;
                const isParameterNameNotSameAsArgument = preferences.includeInlayParameterNameHintsWhenArgumentMatchesName || !identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName);
                if (!isParameterNameNotSameAsArgument && !isFirstVariadicArgument) {
                    continue;
                }

                const name = unescapeLeadingUnderscores(parameterName);
                if (leadingCommentsContainsParameterName(arg, name)) {
                    continue;
                }

                addParameterHints(name, parameter, originalArg.getStart(), isFirstVariadicArgument);
            }
        }
    }

    function identifierOrAccessExpressionPostfixMatchesParameterName(expr: Expression, parameterName: __String) {
        if (isIdentifier(expr)) {
            return expr.text === parameterName;
        }
        if (isPropertyAccessExpression(expr)) {
            return expr.name.text === parameterName;
        }
        return false;
    }

    function leadingCommentsContainsParameterName(node: Node, name: string) {
        if (!isIdentifierText(name, compilerOptions.target, getLanguageVariant(file.scriptKind))) {
            return false;
        }

        const ranges = getLeadingCommentRanges(sourceFileText, node.pos);
        if (!ranges?.length) {
            return false;
        }

        const regex = leadingParameterNameCommentRegexFactory(name);
        return some(ranges, range => regex.test(sourceFileText.substring(range.pos, range.end)));
    }

    function isHintableLiteral(node: Node) {
        switch (node.kind) {
            case SyntaxKind.PrefixUnaryExpression: {
                const operand = (node as PrefixUnaryExpression).operand;
                return isLiteralExpression(operand) || isIdentifier(operand) && isInfinityOrNaNString(operand.escapedText);
            }
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateExpression:
                return true;
            case SyntaxKind.Identifier: {
                const name = (node as Identifier).escapedText;
                return isUndefined(name) || isInfinityOrNaNString(name);
            }
        }
        return isLiteralExpression(node);
    }

    function visitFunctionDeclarationLikeForReturnType(decl: FunctionDeclaration | ArrowFunction | FunctionExpression | MethodDeclaration | GetAccessorDeclaration) {
        if (isArrowFunction(decl)) {
            if (!findChildOfKind(decl, SyntaxKind.OpenParenToken, file)) {
                return;
            }
        }

        const effectiveTypeAnnotation = getEffectiveReturnTypeNode(decl);
        if (effectiveTypeAnnotation || !decl.body) {
            return;
        }

        const signature = checker.getSignatureFromDeclaration(decl);
        if (!signature) {
            return;
        }

        const returnType = checker.getReturnTypeOfSignature(signature);
        if (isModuleReferenceType(returnType)) {
            return;
        }

        const hintParts = typeToInlayHintParts(returnType);
        if (hintParts) {
            addTypeHints(hintParts, getTypeAnnotationPosition(decl));
        }
    }

    function getTypeAnnotationPosition(decl: FunctionDeclaration | ArrowFunction | FunctionExpression | MethodDeclaration | GetAccessorDeclaration) {
        const closeParenToken = findChildOfKind(decl, SyntaxKind.CloseParenToken, file);
        if (closeParenToken) {
            return closeParenToken.end;
        }
        return decl.parameters.end;
    }

    function visitFunctionLikeForParameterType(node: FunctionLikeDeclaration) {
        const signature = checker.getSignatureFromDeclaration(node);
        if (!signature) {
            return;
        }

        for (let i = 0; i < node.parameters.length && i < signature.parameters.length; ++i) {
            const param = node.parameters[i];
            if (!isHintableDeclaration(param)) {
                continue;
            }

            const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(param);
            if (effectiveTypeAnnotation) {
                continue;
            }

            const typeHints = getParameterDeclarationTypeHints(signature.parameters[i]);
            if (!typeHints) {
                continue;
            }

            addTypeHints(typeHints, param.questionToken ? param.questionToken.end : param.name.end);
        }
    }

    function getParameterDeclarationTypeHints(symbol: Symbol) {
        const valueDeclaration = symbol.valueDeclaration;
        if (!valueDeclaration || !isParameter(valueDeclaration)) {
            return undefined;
        }

        const signatureParamType = checker.getTypeOfSymbolAtLocation(symbol, valueDeclaration);
        if (isModuleReferenceType(signatureParamType)) {
            return undefined;
        }
        return typeToInlayHintParts(signatureParamType);
    }

    function printTypeInSingleLine(type: Type) {
        const flags = NodeBuilderFlags.IgnoreErrors | NodeBuilderFlags.AllowUniqueESSymbolType | NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope;
        const printer = createPrinterWithRemoveComments();

        return usingSingleLineStringWriter(writer => {
            const typeNode = checker.typeToTypeNode(type, /*enclosingDeclaration*/ undefined, flags);
            Debug.assertIsDefined(typeNode, "should always get typenode");
            printer.writeNode(EmitHint.Unspecified, typeNode, /*sourceFile*/ file, writer);
        });
    }

    function typeToInlayHintParts(type: Type): InlayHintDisplayPart[] | string {
        if (!shouldUseInteractiveInlayHints(preferences)) {
            return printTypeInSingleLine(type);
        }

        const flags = NodeBuilderFlags.IgnoreErrors | NodeBuilderFlags.AllowUniqueESSymbolType | NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope;
        const typeNode = checker.typeToTypeNode(type, /*enclosingDeclaration*/ undefined, flags);
        Debug.assertIsDefined(typeNode, "should always get typenode");

        const parts: InlayHintDisplayPart[] = [];
        visitForDisplayParts(typeNode);
        return parts;

        function visitForDisplayParts(node: Node) {
            if (!node) {
                return;
            }

            const tokenString = tokenToString(node.kind);
            if (tokenString) {
                parts.push({ text: tokenString });
                return;
            }

            if (isLiteralExpression(node)) {
                parts.push({ text: getLiteralText(node) });
                return;
            }

            switch (node.kind) {
                case SyntaxKind.Identifier:
                    const identifier = node as Identifier;
                    const identifierText = idText(identifier);
                    const name = identifier.symbol && identifier.symbol.declarations && identifier.symbol.declarations.length && getNameOfDeclaration(identifier.symbol.declarations[0]);
                    if (name) {
                        parts.push(getNodeDisplayPart(identifierText, name));
                    }
                    else {
                        parts.push({ text: identifierText });
                    }
                    break;
                case SyntaxKind.QualifiedName:
                    const qualifiedName = node as QualifiedName;
                    visitForDisplayParts(qualifiedName.left);
                    parts.push({ text: "." });
                    visitForDisplayParts(qualifiedName.right);
                    break;
                case SyntaxKind.TypePredicate:
                    const predicate = node as TypePredicateNode;
                    if (predicate.assertsModifier) {
                        parts.push({ text: "asserts " });
                    }
                    visitForDisplayParts(predicate.parameterName);
                    if (predicate.type) {
                        parts.push({ text: " is " });
                        visitForDisplayParts(predicate.type);
                    }
                    break;
                case SyntaxKind.TypeReference:
                    const typeReference = node as TypeReferenceNode;
                    visitForDisplayParts(typeReference.typeName);
                    if (typeReference.typeArguments) {
                        parts.push({ text: "<" });
                        visitDisplayPartList(typeReference.typeArguments, ", ");
                        parts.push({ text: ">" });
                    }
                    break;
                case SyntaxKind.TypeParameter:
                    const typeParameter = node as TypeParameterDeclaration;
                    if (typeParameter.modifiers) {
                        visitDisplayPartList(typeParameter.modifiers, " ");
                    }
                    visitForDisplayParts(typeParameter.name);
                    if (typeParameter.constraint) {
                        parts.push({ text: " extends " });
                        visitForDisplayParts(typeParameter.constraint);
                    }
                    if (typeParameter.default) {
                        parts.push({ text: " = " });
                        visitForDisplayParts(typeParameter.default);
                    }
                    break;
                case SyntaxKind.Parameter:
                    const parameter = node as ParameterDeclaration;
                    if (parameter.modifiers) {
                        visitDisplayPartList(parameter.modifiers, " ");
                    }
                    if (parameter.dotDotDotToken) {
                        parts.push({ text: "..." });
                    }
                    visitForDisplayParts(parameter.name);
                    if (parameter.questionToken) {
                        parts.push({ text: "?" });
                    }
                    if (parameter.type) {
                        parts.push({ text: ": " });
                        visitForDisplayParts(parameter.type);
                    }
                    break;
                case SyntaxKind.ConstructorType:
                    const constructorType = node as ConstructorTypeNode;
                    parts.push({ text: "new " });
                    if (constructorType.typeParameters) {
                        parts.push({ text: "<" });
                        visitDisplayPartList(constructorType.typeParameters, ", ");
                        parts.push({ text: ">" });
                    }
                    parts.push({ text: "(" });
                    visitDisplayPartList(constructorType.parameters, ", ");
                    parts.push({ text: ")" });
                    parts.push({ text: " => " });
                    visitForDisplayParts(constructorType.type);
                    break;
                case SyntaxKind.TypeQuery:
                    const typeQuery = node as TypeQueryNode;
                    parts.push({ text: "typeof " });
                    visitForDisplayParts(typeQuery.exprName);
                    if (typeQuery.typeArguments) {
                        parts.push({ text: "<" });
                        visitDisplayPartList(typeQuery.typeArguments, ", ");
                        parts.push({ text: ">" });
                    }
                    break;
                case SyntaxKind.TypeLiteral:
                    const typeLiteral = node as TypeLiteralNode;
                    parts.push({ text: "{" });
                    if (typeLiteral.members.length) {
                        parts.push({ text: " " });
                        visitDisplayPartList(typeLiteral.members, "; ");
                        parts.push({ text: " " });
                    }
                    parts.push({ text: "}" });
                    break;
                case SyntaxKind.ArrayType:
                    visitForDisplayParts((node as ArrayTypeNode).elementType);
                    parts.push({ text: "[]" });
                    break;
                case SyntaxKind.TupleType:
                    parts.push({ text: "[" });
                    visitDisplayPartList((node as TupleTypeNode).elements, ", ");
                    parts.push({ text: "]" });
                    break;
                case SyntaxKind.NamedTupleMember:
                    const member = node as NamedTupleMember;
                    if (member.dotDotDotToken) {
                        parts.push({ text: "..." });
                    }
                    visitForDisplayParts(member.name);
                    if (member.questionToken) {
                        parts.push({ text: "?" });
                    }
                    parts.push({ text: ": " });
                    visitForDisplayParts(member.type);
                    break;
                case SyntaxKind.OptionalType:
                    visitForDisplayParts((node as OptionalTypeNode).type);
                    parts.push({ text: "?" });
                    break;
                case SyntaxKind.RestType:
                    parts.push({ text: "..." });
                    visitForDisplayParts((node as RestTypeNode).type);
                    break;
                case SyntaxKind.UnionType:
                    visitDisplayPartList((node as UnionTypeNode).types, " | ");
                    break;
                case SyntaxKind.IntersectionType:
                    visitDisplayPartList((node as IntersectionTypeNode).types, " & ");
                    break;
                case SyntaxKind.ConditionalType:
                    const conditionalType = node as ConditionalTypeNode;
                    visitForDisplayParts(conditionalType.checkType);
                    parts.push({ text: " extends " });
                    visitForDisplayParts(conditionalType.extendsType);
                    parts.push({ text: " ? " });
                    visitForDisplayParts(conditionalType.trueType);
                    parts.push({ text: " : " });
                    visitForDisplayParts(conditionalType.falseType);
                    break;
                case SyntaxKind.InferType:
                    parts.push({ text: "infer " });
                    visitForDisplayParts((node as InferTypeNode).typeParameter);
                    break;
                case SyntaxKind.ParenthesizedType:
                    parts.push({ text: "(" });
                    visitForDisplayParts((node as ParenthesizedTypeNode).type);
                    parts.push({ text: ")" });
                    break;
                case SyntaxKind.TypeOperator:
                    const typeOperator = node as TypeOperatorNode;
                    parts.push({ text: `${tokenToString(typeOperator.operator)} ` });
                    visitForDisplayParts(typeOperator.type);
                    break;
                case SyntaxKind.IndexedAccessType:
                    const indexedAccess = node as IndexedAccessTypeNode;
                    visitForDisplayParts(indexedAccess.objectType);
                    parts.push({ text: "[" });
                    visitForDisplayParts(indexedAccess.indexType);
                    parts.push({ text: "]" });
                    break;
                case SyntaxKind.MappedType:
                    const mappedType = node as MappedTypeNode;
                    parts.push({ text: "{ " });
                    if (mappedType.readonlyToken) {
                        if (mappedType.readonlyToken.kind === SyntaxKind.PlusToken) {
                            parts.push({ text: "+" });
                        }
                        else if (mappedType.readonlyToken.kind === SyntaxKind.MinusToken) {
                            parts.push({ text: "-" });
                        }
                        parts.push({ text: "readonly " });
                    }
                    parts.push({ text: "[" });
                    visitForDisplayParts(mappedType.typeParameter);
                    if (mappedType.nameType) {
                        parts.push({ text: " as " });
                        visitForDisplayParts(mappedType.nameType);
                    }
                    parts.push({ text: "]" });
                    if (mappedType.questionToken) {
                        if (mappedType.questionToken.kind === SyntaxKind.PlusToken) {
                            parts.push({ text: "+" });
                        }
                        else if (mappedType.questionToken.kind === SyntaxKind.MinusToken) {
                            parts.push({ text: "-" });
                        }
                        parts.push({ text: "?" });
                    }
                    parts.push({ text: ": " });
                    if (mappedType.type) {
                        visitForDisplayParts(mappedType.type);
                    }
                    parts.push({ text: "; }" });
                    break;
                case SyntaxKind.LiteralType:
                    visitForDisplayParts((node as LiteralTypeNode).literal);
                    break;
                case SyntaxKind.FunctionType:
                    const functionType = node as FunctionTypeNode;
                    if (functionType.typeParameters) {
                        parts.push({ text: "<" });
                        visitDisplayPartList(functionType.typeParameters, ", ");
                        parts.push({ text: ">" });
                    }
                    parts.push({ text: "(" });
                    visitDisplayPartList(functionType.parameters, ", ");
                    parts.push({ text: ")" });
                    parts.push({ text: " => " });
                    visitForDisplayParts(functionType.type);
                    break;
                case SyntaxKind.ImportType:
                    const importType = node as ImportTypeNode;
                    if (importType.isTypeOf) {
                        parts.push({ text: "typeof " });
                    }
                    parts.push({ text: "import(" });
                    visitForDisplayParts(importType.argument);
                    if (importType.assertions) {
                        parts.push({ text: ", { assert: " });
                        visitDisplayPartList(importType.assertions.assertClause.elements, ", ");
                        parts.push({ text: " }" });
                    }
                    parts.push({ text: ")" });
                    if (importType.qualifier) {
                        parts.push({ text: "." });
                        visitForDisplayParts(importType.qualifier);
                    }
                    if (importType.typeArguments) {
                        parts.push({ text: "<" });
                        visitDisplayPartList(importType.typeArguments, ", ");
                        parts.push({ text: ">" });
                    }
                    break;
                case SyntaxKind.PropertySignature:
                    const propertySignature = node as PropertySignature;
                    if (propertySignature.modifiers) {
                        visitDisplayPartList(propertySignature.modifiers, " ");
                    }
                    visitForDisplayParts(propertySignature.name);
                    if (propertySignature.questionToken) {
                        parts.push({ text: "?" });
                    }
                    if (propertySignature.type) {
                        parts.push({ text: ": " });
                        visitForDisplayParts(propertySignature.type);
                    }
                    break;
                default:
                    Debug.failBadSyntaxKind(node);
            }
        }

        function visitDisplayPartList<T extends Node>(nodes: NodeArray<T>, separator: string) {
            nodes.forEach((node, index) => {
                if (index > 0) {
                    parts.push({ text: separator });
                }
                visitForDisplayParts(node);
            });
        }

        function getLiteralText(node: LiteralExpression) {
            if (isStringLiteral(node)) {
                return quotePreference === QuotePreference.Single ? `'${escapeString(node.text, CharacterCodes.singleQuote)}'` : `"${escapeString(node.text, CharacterCodes.doubleQuote)}"`;
            }
            return node.text;
        }
    }

    function isUndefined(name: __String) {
        return name === "undefined";
    }

    function isHintableDeclaration(node: VariableDeclaration | ParameterDeclaration) {
        if ((isParameterDeclaration(node) || isVariableDeclaration(node) && isVarConst(node)) && node.initializer) {
            const initializer = skipParentheses(node.initializer);
            return !(isHintableLiteral(initializer) || isNewExpression(initializer) || isObjectLiteralExpression(initializer) || isAssertionExpression(initializer));
        }
        return true;
    }

    function getNodeDisplayPart(text: string, node: Node): InlayHintDisplayPart {
        const sourceFile = node.getSourceFile();
        return {
            text,
            span: createTextSpanFromNode(node, sourceFile),
            file: sourceFile.fileName,
        };
    }
}
