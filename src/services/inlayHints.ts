/* @internal */
namespace ts.InlayHints {

    const maxHintsLength = 30;

    const leadingParameterNameCommentRegexFactory = (name: string) => {
        return new RegExp(`^\\s?/\\*\\*?\\s?${name}\\s?\\*\\/\\s?$`);
    };

    function shouldShowParameterNameHints(preferences: InlayHintsOptions) {
        return preferences.includeInlayParameterNameHints === "literals" || preferences.includeInlayParameterNameHints === "all";
    }

    function shouldShowLiteralParameterNameHintsOnly(preferences: InlayHintsOptions) {
        return preferences.includeInlayParameterNameHints === "literals";
    }

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

            if (isTypeNode(node)) {
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
                if (preferences.includeInlayFunctionParameterTypeHints && isFunctionExpressionLike(node)) {
                    visitFunctionExpressionLikeForParameterType(node);
                }
                if (preferences.includeInlayFunctionLikeReturnTypeHints && isFunctionLikeDeclaration(node)) {
                    visitFunctionDeclarationLikeForReturnType(node);
                }
            }
            return forEachChild(node, visitor);
        }

        function isFunctionExpressionLike(node: Node): node is ArrowFunction | FunctionExpression {
            return isArrowFunction(node) || isFunctionExpression(node);
        }

        function addParameterHints(text: string, position: number, isFirstVariadicArgument: boolean) {
            result.push({
                text: `${isFirstVariadicArgument ? "..." : ""}${truncation(text, maxHintsLength)}:`,
                position,
                kind: InlayHintKind.Parameter,
                whitespaceAfter: true,
            });
        }

        function addTypeHints(text: string, position: number) {
            result.push({
                text: `: ${truncation(text, maxHintsLength)}`,
                position,
                kind: InlayHintKind.Type,
                whitespaceBefore: true,
            });
        }

        function addEnumMemberValueHints(text: string, position: number) {
            result.push({
                text: `= ${truncation(text, maxHintsLength)}`,
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
            if (!decl.initializer || isBindingPattern(decl.name)) {
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

            for (let i = 0; i < args.length; ++i) {
                const originalArg = args[i];
                const arg = skipParentheses(originalArg);
                if (shouldShowLiteralParameterNameHintsOnly(preferences) && !isHintableExpression(arg)) {
                    continue;
                }

                const identifierNameInfo = checker.getParameterIdentifierNameAtPosition(signature, i);
                if (identifierNameInfo) {
                    const [parameterName, isFirstVariadicArgument] = identifierNameInfo;
                    const isParameterNameNotSameAsArgument = preferences.includeInlayParameterNameHintsWhenArgumentMatchesName || !identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName);
                    if (!isParameterNameNotSameAsArgument && !isFirstVariadicArgument) {
                        continue;
                    }

                    const name = unescapeLeadingUnderscores(parameterName);
                    if (leadingCommentsContainsParameterName(arg, name)) {
                        continue;
                    }

                    addParameterHints(name, originalArg.getStart(), isFirstVariadicArgument);
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

        function isHintableExpression(node: Node) {
            return isLiteralExpression(node) || isBooleanLiteral(node) || isFunctionExpressionLike(node) || isObjectLiteralExpression(node) || isArrayLiteralExpression(node);
        }

        function visitFunctionDeclarationLikeForReturnType(decl: FunctionLikeDeclaration) {
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

        function getTypeAnnotationPosition(decl: FunctionLikeDeclaration) {
            const closeParenToken = findChildOfKind(decl, SyntaxKind.CloseParenToken, file);
            if (closeParenToken) {
                return closeParenToken.end;
            }
            return decl.parameters.end;
        }

        function visitFunctionExpressionLikeForParameterType(expr: ArrowFunction | FunctionExpression) {
            if (!expr.parameters.length || expr.parameters.every(param => !!getEffectiveTypeAnnotationNode(param))) {
                return;
            }

            const contextualType = checker.getContextualType(expr);
            if (!contextualType) {
                return;
            }

            const signatures = checker.getSignaturesOfType(contextualType, SignatureKind.Call);
            const signature = firstOrUndefined(signatures);
            if (!signature) {
                return;
            }

            for (let i = 0; i < expr.parameters.length && i < signature.parameters.length; ++i) {
                const param = expr.parameters[i];
                const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(param);

                if (effectiveTypeAnnotation) {
                    continue;
                }

                const typeDisplayString = getParameterDeclarationTypeDisplayString(signature.parameters[i]);
                if (!typeDisplayString) {
                    continue;
                }

                addTypeHints(typeDisplayString, param.end);
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

        function truncation(text: string, maxLength: number) {
            if (text.length > maxLength) {
                return text.substr(0, maxLength - "...".length) + "...";
            }
            return text;
        }

        function printTypeInSingleLine(type: Type) {
            const flags = NodeBuilderFlags.IgnoreErrors | TypeFormatFlags.AllowUniqueESSymbolType | TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
            const options: PrinterOptions = { removeComments: true };
            const printer = createPrinter(options);

            return usingSingleLineStringWriter(writer => {
                const typeNode = checker.typeToTypeNode(type, /*enclosingDeclaration*/ undefined, flags, writer);
                Debug.assertIsDefined(typeNode, "should always get typenode");
                printer.writeNode(EmitHint.Unspecified, typeNode, /*sourceFile*/ file, writer);
            });
        }
    }
}
