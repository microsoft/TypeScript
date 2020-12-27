/* @internal */
namespace ts.InlineHints {
    interface HintInfo {
        text: string;
        position: number;
        whitespaceBefore?: boolean;
        whitespaceAfter?: boolean;
    }

    const maxHintsLength = 30;

    export function provideInlineHints(context: InlineHintsContext): HintInfo[] {
        const { file, program, span, cancellationToken, preferences } = context;

        const checker = program.getTypeChecker();
        const result: HintInfo[] = [];

        visitor(file);
        return result;
        function visitor(node: Node): true | undefined | void {
            if (!node || node.getFullWidth() === 0) {
                return;
            }

            switch(node.kind) {
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

            if (preferences.includeInlineParameterName && (isCallExpression(node) || isNewExpression(node))) {
                visitCallOrNewExpression(node);
            }
            else if (preferences.includeInlineFunctionParameterType && (isArrowFunction(node) || isFunctionExpression(node))) {
                visitFunctionExpressionLike(node);
            }
            else if (preferences.includeInlineVariableType && (isVariableDeclaration(node))) {
                visitVariableDeclaration(node);
            }
            return forEachChild(node, visitor);
        }

        function addNameHints(text: string, position: number) {
            result.push({
                text: `${truncation(text, maxHintsLength)}:`,
                position,
                whitespaceAfter: true,
            });
        }

        function addTypeHints(text: string, position: number) {
            result.push({
                text: `:${truncation(text, maxHintsLength)}`,
                position,
                whitespaceBefore: true,
            });
        }

        function visitVariableDeclaration(decl: VariableDeclaration) {
            if (decl.type || !decl.initializer) {
                return;
            }

            const initializerType = checker.getTypeAtLocation(decl.initializer);
            const typeDisplayString = printTypeInSingleLine(initializerType);
            if (typeDisplayString) {
                addTypeHints(typeDisplayString, decl.name.end);
            }
        }

        function visitCallOrNewExpression(expr: CallExpression | NewExpression) {
            if (!expr.arguments || !expr.arguments.length) {
                return;
            }

            const candidates: Signature[] = [];
            const signature = checker.getResolvedSignatureForSignatureHelp(expr, candidates);
            if (!signature || !candidates.length) {
                return;
            }

            for (let i = 0; i < expr.arguments.length; ++i) {
                const parameterName = checker.getParameterIdentifierNameAtPosition(signature, i);
                if (parameterName) {
                    const arg = expr.arguments[i];
                    const argumentName = isIdentifier(arg) ? arg.text : undefined;
                    if (!argumentName || argumentName !== parameterName) {
                        addNameHints(unescapeLeadingUnderscores(parameterName), expr.arguments[i].getStart());
                    }
                }
            }
        }

        function visitFunctionExpressionLike(expr: ArrowFunction | FunctionExpression) {
            if (!expr.parameters.length || expr.parameters.every(param => param.type)) {
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
                if (param.type) {
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

            if (valueDeclaration.type) {
                return printNodeInSingleLine(valueDeclaration.type);
            }

            const signatureParamType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
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

        function printNodeInSingleLine(node: Node) {
            const displayParts = mapToDisplayParts(writer => {
                const singleLineWriter = createSignleLineWriter(writer);
                writeNodeInSignleLine(node, singleLineWriter);
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