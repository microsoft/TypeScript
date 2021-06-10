/* @internal */
namespace ts.InlayHints {

    const maxHintsLength = 30;

    export function provideInlayHints(context: InlayHintsContext): InlayHint[] {
        const { file, program, span, cancellationToken, preferences } = context;

        const checker = program.getTypeChecker();
        const result: InlayHint[] = [];

        visitor(file);
        return result;

        function visitor(node: Node): true | undefined | void {
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

                    if (!textSpanIntersectsWith(span, node.pos, node.getFullWidth())) {
                        return;
                    }
            }

            if (isTypeNode(node)) {
                return;
            }

            if (preferences.includeInlayVariableTypeHints && (isVariableDeclaration(node))) {
                visitVariableLikeDeclaration(node);
            }
            else if (preferences.includeInlayPropertyDeclarationTypeHints && isPropertyDeclaration(node)) {
                visitVariableLikeDeclaration(node);
            }
            else if (preferences.includeInlayEnumMemberValueHints && isEnumMember(node)) {
                visitEnumMember(node);
            }
            else if (preferences.includeInlayParameterNameHints && (isCallExpression(node) || isNewExpression(node))) {
                visitCallOrNewExpression(node);
            }
            else {
                if (preferences.includeInlayFunctionParameterTypeHints && isFunctionExpressionLike(node)) {
                    visitFunctionExpressionLikeForParameterType(node);
                }
                if (preferences.includeInlayFunctionLikeReturnTypeHints && isFunctionDeclarationLike(node)) {
                    visitFunctionDeclarationLikeForReturnType(node);
                }
            }
            return forEachChild(node, visitor);
        }

        function isFunctionExpressionLike(node: Node): node is ArrowFunction | FunctionExpression {
            return isArrowFunction(node) || isFunctionExpression(node);
        }

        function isFunctionDeclarationLike(node: Node): node is FunctionDeclaration | ArrowFunction | FunctionExpression | MethodDeclaration {
            return isArrowFunction(node) || isFunctionExpression(node) || isFunctionDeclaration(node) || isMethodDeclaration(node);
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
                kind: InlayHintKind.Other,
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

        function visitVariableLikeDeclaration(decl: VariableDeclaration | PropertyDeclaration) {
            const effectiveTypeAnnotation = getEffectiveTypeAnnotationNode(decl);
            if (effectiveTypeAnnotation || !decl.initializer) {
                return;
            }

            const declarationType = checker.getTypeAtLocation(decl);
            if (!preferences.includeInlayRequireAssignedVariableTypeHints && declarationType.symbol && (declarationType.symbol.flags & SymbolFlags.Module)) {
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
                const arg = args[i];
                if (!preferences.includeInlayNonLiteralParameterNameHints && !isHintableExpression(arg)) {
                    continue;
                }

                const identifierNameInfo = checker.getParameterIdentifierNameAtPosition(signature, i);
                if (identifierNameInfo) {
                    const [parameterName, isFirstVariadicArgument] = identifierNameInfo;
                    if (isFirstVariadicArgument || preferences.includeInlayDuplicatedParameterNameHints || !isIdentifier(arg) || arg.text !== parameterName) {
                        addParameterHints(unescapeLeadingUnderscores(parameterName), args[i].getStart(), isFirstVariadicArgument);
                    }
                }
            }
        }

        function isHintableExpression(node: Node) {
            return isLiteralExpression(node) || isBooleanLiteral(node) || isFunctionExpressionLike(node) || isObjectLiteralExpression(node) || isArrayLiteralExpression(node);
        }

        function visitFunctionDeclarationLikeForReturnType(decl: ArrowFunction | FunctionExpression | MethodDeclaration | FunctionDeclaration) {
            const effectiveTypeAnnotation = getEffectiveReturnTypeNode(decl);
            if (effectiveTypeAnnotation || !decl.body) {
                return;
            }

            const type = checker.getTypeAtLocation(decl);
            const signatures = checker.getSignaturesOfType(type, SignatureKind.Call);
            const signature = firstOrUndefined(signatures);
            if (!signature) {
                return;
            }

            const returnType = checker.getReturnTypeOfSignature(signature);
            const typeDisplayString = printTypeInSingleLine(returnType);
            if (!typeDisplayString) {
                return;
            }

            addTypeHints(typeDisplayString, getTypeAnnotationPosition(decl));
        }

        function getTypeAnnotationPosition(decl: ArrowFunction | FunctionExpression | MethodDeclaration | FunctionDeclaration) {
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
            return printTypeInSingleLine(signatureParamType);
        }

        function truncation(text: string, maxLength: number) {
            if (text.length > maxLength) {
                return text.substr(0, maxLength - "...".length) + "...";
            }
            return text;
        }

        function createSignleLineWriter(writer: DisplayPartsSymbolWriter): DisplayPartsSymbolWriter {
            return {
                ...writer,
                writeLine: () => writer.writeSpace(" ")
            };
        }

        function printTypeInSingleLine(type: Type) {
            const flags = NodeBuilderFlags.IgnoreErrors | TypeFormatFlags.AllowUniqueESSymbolType | TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
            const displayParts = mapToDisplayParts(writer => {
                const singleLineWriter = createSignleLineWriter(writer);
                const typeNode = checker.typeToTypeNode(type, /*enclosingDeclaration*/ undefined, flags, singleLineWriter);
                Debug.assertIsDefined(typeNode, "should always get typenode");

                writeNodeInSignleLine(typeNode, singleLineWriter);
            });
            return displayPartsToString(displayParts);
        }

        function writeNodeInSignleLine(node: Node, writer: DisplayPartsSymbolWriter) {
            const options: PrinterOptions = { removeComments: true };
            const printer = createPrinter(options);
            printer.writeNode(EmitHint.Unspecified, node, /*sourceFile*/ file, writer);
        }
    }
}
