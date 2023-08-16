import {
    __String,
    ArrowFunction,
    CallExpression,
    createPrinterWithRemoveComments,
    createTextSpanFromNode,
    Debug,
    ElementFlags,
    EmitHint,
    EnumMember,
    equateStringsCaseInsensitive,
    Expression,
    findChildOfKind,
    findIndex,
    forEachChild,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    GetAccessorDeclaration,
    getEffectiveReturnTypeNode,
    getEffectiveTypeAnnotationNode,
    getLanguageVariant,
    getLeadingCommentRanges,
    hasContextSensitiveParameters,
    Identifier,
    InlayHint,
    InlayHintDisplayPart,
    InlayHintKind,
    InlayHintsContext,
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
    isTypeNode,
    isVarConst,
    isVariableDeclaration,
    MethodDeclaration,
    NewExpression,
    Node,
    NodeBuilderFlags,
    ParameterDeclaration,
    PrefixUnaryExpression,
    PropertyDeclaration,
    Signature,
    skipParentheses,
    some,
    SourceFile,
    Symbol,
    SymbolFlags,
    SyntaxKind,
    textSpanIntersectsWith,
    TupleTypeReference,
    Type,
    unescapeLeadingUnderscores,
    UserPreferences,
    usingSingleLineStringWriter,
    VariableDeclaration,
} from "./_namespaces/ts";

const maxTypeHintLength = 30;

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

    function addParameterHints(text: string, parameter: Identifier, position: number, isFirstVariadicArgument: boolean, sourceFile: SourceFile | undefined) {
        let hintText = `${isFirstVariadicArgument ? "..." : ""}${text}`;
        let displayParts: InlayHintDisplayPart[] | undefined;
        if (shouldUseInteractiveInlayHints(preferences)) {
            displayParts = [getNodeDisplayPart(hintText, parameter, sourceFile!), { text: ":" }];
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

    function addTypeHints(text: string, position: number) {
        result.push({
            text: `: ${text.length > maxTypeHintLength ? text.substr(0, maxTypeHintLength - "...".length) + "..." : text}`,
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

        const typeDisplayString = printTypeInSingleLine(declarationType);
        if (typeDisplayString) {
            const isVariableNameMatchesType = preferences.includeInlayVariableTypeHintsWhenTypeMatchesName === false && equateStringsCaseInsensitive(decl.name.getText(), typeDisplayString);
            if (isVariableNameMatchesType) {
                return;
            }
            addTypeHints(typeDisplayString, decl.name.end);
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

        const sourceFile = shouldUseInteractiveInlayHints(preferences) ? expr.getSourceFile() : undefined;

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

                addParameterHints(name, parameter, originalArg.getStart(), isFirstVariadicArgument, sourceFile);
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

        const typeDisplayString = printTypeInSingleLine(returnType);
        if (!typeDisplayString) {
            return;
        }

        addTypeHints(typeDisplayString, getTypeAnnotationPosition(decl));
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

            const typeDisplayString = getParameterDeclarationTypeDisplayString(signature.parameters[i]);
            if (!typeDisplayString) {
                continue;
            }

            addTypeHints(typeDisplayString, param.questionToken ? param.questionToken.end : param.name.end);
        }
    }

    function getParameterDeclarationTypeDisplayString(symbol: Symbol) {
        const valueDeclaration = symbol.valueDeclaration;
        if (!valueDeclaration || !isParameter(valueDeclaration)) {
            return undefined;
        }

        const signatureParamType = checker.getTypeOfSymbolAtLocation(symbol, valueDeclaration);
        if (isModuleReferenceType(signatureParamType)) {
            return undefined;
        }

        return printTypeInSingleLine(signatureParamType);
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

    function getNodeDisplayPart(text: string, node: Node, sourceFile: SourceFile): InlayHintDisplayPart {
        return {
            text,
            span: createTextSpanFromNode(node, sourceFile),
            file: sourceFile.fileName,
        };
    }
}
