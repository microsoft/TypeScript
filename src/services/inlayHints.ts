/* @internal */
namespace ts.InlayHints {

const maxHintsLength = 30;

const leadingParameterNameCommentRegexFactory = (name: string) => {
    return new RegExp(`^\\s?/\\*\\*?\\s?${name}\\s?\\*\\/\\s?$`);
};

function shouldShowParameterNameHints(preferences: ts.UserPreferences) {
    return preferences.includeInlayParameterNameHints === "literals" || preferences.includeInlayParameterNameHints === "all";
}

function shouldShowLiteralParameterNameHintsOnly(preferences: ts.UserPreferences) {
    return preferences.includeInlayParameterNameHints === "literals";
}

export function provideInlayHints(context: ts.InlayHintsContext): ts.InlayHint[] {
    const { file, program, span, cancellationToken, preferences } = context;
    const sourceFileText = file.text;
    const compilerOptions = program.getCompilerOptions();

    const checker = program.getTypeChecker();
    const result: ts.InlayHint[] = [];

    visitor(file);
    return result;

    function visitor(node: ts.Node): true | undefined {
        if (!node || node.getFullWidth() === 0) {
            return;
        }

        switch (node.kind) {
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.ArrowFunction:
                cancellationToken.throwIfCancellationRequested();
        }

        if (!ts.textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
            return;
        }

        if (ts.isTypeNode(node) && !ts.isExpressionWithTypeArguments(node)) {
            return;
        }

        if (preferences.includeInlayVariableTypeHints && ts.isVariableDeclaration(node)) {
            visitVariableLikeDeclaration(node);
        }
        else if (preferences.includeInlayPropertyDeclarationTypeHints && ts.isPropertyDeclaration(node)) {
            visitVariableLikeDeclaration(node);
        }
        else if (preferences.includeInlayEnumMemberValueHints && ts.isEnumMember(node)) {
            visitEnumMember(node);
        }
        else if (shouldShowParameterNameHints(preferences) && (ts.isCallExpression(node) || ts.isNewExpression(node))) {
            visitCallOrNewExpression(node);
        }
        else {
            if (preferences.includeInlayFunctionParameterTypeHints && ts.isFunctionLikeDeclaration(node) && ts.hasContextSensitiveParameters(node)) {
                visitFunctionLikeForParameterType(node);
            }
            if (preferences.includeInlayFunctionLikeReturnTypeHints && isSignatureSupportingReturnAnnotation(node)) {
                visitFunctionDeclarationLikeForReturnType(node);
            }
        }
        return ts.forEachChild(node, visitor);
    }

    function isSignatureSupportingReturnAnnotation(node: ts.Node): node is ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.GetAccessorDeclaration {
        return ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node) || ts.isGetAccessorDeclaration(node);
    }

    function addParameterHints(text: string, position: number, isFirstVariadicArgument: boolean) {
        result.push({
            text: `${isFirstVariadicArgument ? "..." : ""}${truncation(text, maxHintsLength)}:`,
            position,
            kind: ts.InlayHintKind.Parameter,
            whitespaceAfter: true,
        });
    }

    function addTypeHints(text: string, position: number) {
        result.push({
            text: `: ${truncation(text, maxHintsLength)}`,
            position,
            kind: ts.InlayHintKind.Type,
            whitespaceBefore: true,
        });
    }

    function addEnumMemberValueHints(text: string, position: number) {
        result.push({
            text: `= ${truncation(text, maxHintsLength)}`,
            position,
            kind: ts.InlayHintKind.Enum,
            whitespaceBefore: true,
        });
    }

    function visitEnumMember(member: ts.EnumMember) {
        if (member.initializer) {
            return;
        }

        const enumValue = checker.getConstantValue(member);
        if (enumValue !== undefined) {
            addEnumMemberValueHints(enumValue.toString(), member.end);
        }
    }

    function isModuleReferenceType(type: ts.Type) {
        return type.symbol && (type.symbol.flags & ts.SymbolFlags.Module);
    }

    function visitVariableLikeDeclaration(decl: ts.VariableDeclaration | ts.PropertyDeclaration) {
        if (!decl.initializer || ts.isBindingPattern(decl.name) || ts.isVariableDeclaration(decl) && !isHintableDeclaration(decl)) {
            return;
        }

        const effectiveTypeAnnotation = ts.getEffectiveTypeAnnotationNode(decl);
        if (effectiveTypeAnnotation) {
            return;
        }

        const declarationType = checker.getTypeAtLocation(decl);
        if (isModuleReferenceType(declarationType)) {
            return;
        }

        const typeDisplayString = printTypeInSingleLine(declarationType);
        if (typeDisplayString) {
            const isVariableNameMatchesType = preferences.includeInlayVariableTypeHintsWhenTypeMatchesName === false && ts.equateStringsCaseInsensitive(decl.name.getText(), typeDisplayString);
            if (isVariableNameMatchesType) {
                return;
            }
            addTypeHints(typeDisplayString, decl.name.end);
        }
    }

    function visitCallOrNewExpression(expr: ts.CallExpression | ts.NewExpression) {
        const args = expr.arguments;
        if (!args || !args.length) {
            return;
        }

        const candidates: ts.Signature[] = [];
        const signature = checker.getResolvedSignatureForSignatureHelp(expr, candidates);
        if (!signature || !candidates.length) {
            return;
        }

        for (let i = 0; i < args.length; ++i) {
            const originalArg = args[i];
            const arg = ts.skipParentheses(originalArg);
            if (shouldShowLiteralParameterNameHintsOnly(preferences) && !isHintableLiteral(arg)) {
                continue;
            }

            const identifierNameInfo = checker.getParameterIdentifierNameAtPosition(signature, i);
            if (identifierNameInfo) {
                const [parameterName, isFirstVariadicArgument] = identifierNameInfo;
                const isParameterNameNotSameAsArgument = preferences.includeInlayParameterNameHintsWhenArgumentMatchesName || !identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName);
                if (!isParameterNameNotSameAsArgument && !isFirstVariadicArgument) {
                    continue;
                }

                const name = ts.unescapeLeadingUnderscores(parameterName);
                if (leadingCommentsContainsParameterName(arg, name)) {
                    continue;
                }

                addParameterHints(name, originalArg.getStart(), isFirstVariadicArgument);
            }
        }
    }

    function identifierOrAccessExpressionPostfixMatchesParameterName(expr: ts.Expression, parameterName: ts.__String) {
        if (ts.isIdentifier(expr)) {
            return expr.text === parameterName;
        }
        if (ts.isPropertyAccessExpression(expr)) {
            return expr.name.text === parameterName;
        }
        return false;
    }

    function leadingCommentsContainsParameterName(node: ts.Node, name: string) {
        if (!ts.isIdentifierText(name, compilerOptions.target, ts.getLanguageVariant(file.scriptKind))) {
            return false;
        }

        const ranges = ts.getLeadingCommentRanges(sourceFileText, node.pos);
        if (!ranges?.length) {
            return false;
        }

        const regex = leadingParameterNameCommentRegexFactory(name);
        return ts.some(ranges, range => regex.test(sourceFileText.substring(range.pos, range.end)));
    }

    function isHintableLiteral(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.PrefixUnaryExpression: {
                const operand = (node as ts.PrefixUnaryExpression).operand;
                return ts.isLiteralExpression(operand) || ts.isIdentifier(operand) && ts.isInfinityOrNaNString(operand.escapedText);
            }
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.NullKeyword:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.TemplateExpression:
                return true;
            case ts.SyntaxKind.Identifier: {
                const name = (node as ts.Identifier).escapedText;
                return isUndefined(name) || ts.isInfinityOrNaNString(name);
            }
        }
        return ts.isLiteralExpression(node);
    }

    function visitFunctionDeclarationLikeForReturnType(decl: ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.GetAccessorDeclaration) {
        if (ts.isArrowFunction(decl)) {
            if (!ts.findChildOfKind(decl, ts.SyntaxKind.OpenParenToken, file)) {
                return;
            }
        }

        const effectiveTypeAnnotation = ts.getEffectiveReturnTypeNode(decl);
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

    function getTypeAnnotationPosition(decl: ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.GetAccessorDeclaration) {
        const closeParenToken = ts.findChildOfKind(decl, ts.SyntaxKind.CloseParenToken, file);
        if (closeParenToken) {
            return closeParenToken.end;
        }
        return decl.parameters.end;
    }

    function visitFunctionLikeForParameterType(node: ts.FunctionLikeDeclaration) {
        const signature = checker.getSignatureFromDeclaration(node);
        if (!signature) {
            return;
        }

        for (let i = 0; i < node.parameters.length && i < signature.parameters.length; ++i) {
            const param = node.parameters[i];
            if (!isHintableDeclaration(param)) {
                continue;
            }

            const effectiveTypeAnnotation = ts.getEffectiveTypeAnnotationNode(param);
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

    function getParameterDeclarationTypeDisplayString(symbol: ts.Symbol) {
        const valueDeclaration = symbol.valueDeclaration;
        if (!valueDeclaration || !ts.isParameter(valueDeclaration)) {
            return undefined;
        }

        const signatureParamType = checker.getTypeOfSymbolAtLocation(symbol, valueDeclaration);
        if (isModuleReferenceType(signatureParamType)) {
            return undefined;
        }

        return printTypeInSingleLine(signatureParamType);
    }

    function truncation(text: string, maxLength: number) {
        if (text.length > maxLength) {
            return text.substr(0, maxLength - "...".length) + "...";
        }
        return text;
    }

    function printTypeInSingleLine(type: ts.Type) {
        const flags = ts.NodeBuilderFlags.IgnoreErrors | ts.TypeFormatFlags.AllowUniqueESSymbolType | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
        const options: ts.PrinterOptions = { removeComments: true };
        const printer = ts.createPrinter(options);

        return ts.usingSingleLineStringWriter(writer => {
            const typeNode = checker.typeToTypeNode(type, /*enclosingDeclaration*/ undefined, flags, writer);
            ts.Debug.assertIsDefined(typeNode, "should always get typenode");
            printer.writeNode(ts.EmitHint.Unspecified, typeNode, /*sourceFile*/ file, writer);
        });
    }

    function isUndefined(name: ts.__String) {
        return name === "undefined";
    }

    function isHintableDeclaration(node: ts.VariableDeclaration | ts.ParameterDeclaration) {
        if ((ts.isParameterDeclaration(node) || ts.isVariableDeclaration(node) && ts.isVarConst(node)) && node.initializer) {
            const initializer = ts.skipParentheses(node.initializer);
            return !(isHintableLiteral(initializer) || ts.isNewExpression(initializer) || ts.isObjectLiteralExpression(initializer) || ts.isAssertionExpression(initializer));
        }
        return true;
    }
}
}
