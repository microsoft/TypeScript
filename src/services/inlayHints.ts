/* @internal */
namespace ts.InlayHints {

    const maxHintsLength = 30;

    const undefinedTupleLabel = "(undefined)";

    const leadingParameterNameCommentRegexFactory = (name: string) => {
        return new RegExp(`^\\s?/\\*\\*?\\s?${name}\\s?\\*\\/\\s?$`);
    };

    function shouldShowParameterNameHints(preferences: UserPreferences) {
        return preferences.includeInlayParameterNameHints === "literals" || preferences.includeInlayParameterNameHints === "all";
    }

    function shouldShowLiteralParameterNameHintsOnly(preferences: UserPreferences) {
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
            else if (isElementAccessExpression(node)) {
                visitTupleElementAccessExpression(node);
            }
            else if (isArrayLiteralExpression(node)) {
                visitTupleArrayLiteralExpression(node);
            }
            else if (isArrayBindingPattern(node)) {
                visitTupleArrayBindingPattern(node);
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

        function getAssignableTypeFromUnion(typeToAssign: Type, unionType: UnionType): Type | undefined {
            for (const typeToCheck of unionType.types) {
                if (checker.isTypeAssignableTo(typeToAssign, typeToCheck)) {
                    return typeToCheck;
                }
            }
            return undefined;
        }

        function getTupleLabelsFromUnion(unionType: UnionType, tupleIndex: number): string[] {
            const labels: string[] = [];
            for (const typeToCheck of unionType.types) {
                const labeledElementDeclarations = (typeToCheck as TupleTypeReference).target.labeledElementDeclarations;
                if (labeledElementDeclarations) {
                    const labelDecl = labeledElementDeclarations[tupleIndex];
                    if (labelDecl) {
                        Debug.assertNode(labelDecl.name, isIdentifier);
                        const label = idText(labelDecl.name);
                        if (labels.indexOf(label) === -1) {
                            labels.push(label);
                        }
                    }
                    else if (labels.indexOf(undefinedTupleLabel) === -1) {
                        labels.push(undefinedTupleLabel);
                    }
                }
            }
            return labels;
        }

        function isSignatureSupportingReturnAnnotation(node: Node): node is FunctionDeclaration | ArrowFunction | FunctionExpression | MethodDeclaration | GetAccessorDeclaration {
            return isArrowFunction(node) || isFunctionExpression(node) || isFunctionDeclaration(node) || isMethodDeclaration(node) || isGetAccessorDeclaration(node);
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

        function addTupleLabelHints(tupleLabel: string, position: number) {
            result.push({
                text: truncation(tupleLabel, maxHintsLength) + ":",
                position,
                kind: InlayHintKind.Parameter, // TODO
                whitespaceAfter: true
            });
        }

        function addLabeledTupleVariableHints(tupleLabels: string[], position: number) {
            result.push({
                text: `[${tupleLabels.join(", ")}]:`,
                position,
                kind: InlayHintKind.Parameter, // TODO
                whitespaceAfter: true
            });
        }

        function addUnionTupleTypeHints(tupleLabels: string[], position: number) {
            result.push({
                text: tupleLabels.join(" | ") + ":",
                position,
                kind: InlayHintKind.Parameter, // TODO
                whitespaceAfter: true
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

        function visitTupleElementAccessExpression(node: ElementAccessExpression) {
            const tupleType = checker.getTypeAtLocation(node.expression);
            if (isModuleReferenceType(tupleType) || !isNumericLiteral(node.argumentExpression)) {
                return;
            }

            const tupleIndex = parseInt(node.argumentExpression.getText());
            if (tupleType.flags & TypeFlags.Union) {
                const tupleLabels = getTupleLabelsFromUnion(tupleType as UnionType, tupleIndex);
                if (tupleLabels.length > 0) {
                    addUnionTupleTypeHints(tupleLabels, node.argumentExpression.getStart());
                }
                return;
            }
            else if (!(tupleType as TupleTypeReference).target) {
                return;
            }

            const labelDecls = (tupleType as TupleTypeReference).target.labeledElementDeclarations;
            if (!labelDecls) {
                return;
            }

            const labelDecl = labelDecls[tupleIndex];
            if (labelDecl) {
                Debug.assertNode(labelDecl.name, isIdentifier);
                addTupleLabelHints(idText(labelDecl.name), node.argumentExpression.getStart());
            }
            else {
                addTupleLabelHints(undefinedTupleLabel, node.argumentExpression.getStart());
            }
        }

        function visitTupleArrayLiteralExpression(node: ArrayLiteralExpression) {
            let tupleType = checker.getContextualType(node);
            if (!tupleType || isModuleReferenceType(tupleType)) {
                return;
            }

            if (tupleType.flags & TypeFlags.Union) {
                const arrayType = checker.getTypeAtLocation(node);
                tupleType = getAssignableTypeFromUnion(arrayType, tupleType as UnionType);
            }

            if (!tupleType || !(tupleType as TupleTypeReference).target) {
                return;
            }

            const labelDecls = (tupleType as TupleTypeReference).target.labeledElementDeclarations;
            if (!labelDecls) {
                return;
            }

            for (let i = 0; i < node.elements.length; i++) {
                const labelDecl = labelDecls[i] as NamedTupleMember;
                if (labelDecl) {
                    Debug.assertNode(labelDecl.name, isIdentifier);
                    addTupleLabelHints(idText(labelDecl.name), node.elements[i].getStart());
                }
                else {
                    addTupleLabelHints(undefinedTupleLabel, node.elements[i].getStart());
                }
            }
        }

        function visitTupleArrayBindingPattern(node: ArrayBindingPattern) {
            const tupleType = checker.getTypeAtLocation(node);
            if (isModuleReferenceType(tupleType)) {
                return;
            }

            const labelDecls = (tupleType as TupleTypeReference).target.labeledElementDeclarations;
            if (!labelDecls) {
                return;
            }

            for (let i = 0; i < node.elements.length; i++) {
                const bindingElement = node.elements[i] as BindingElement;
                if (bindingElement.name.kind !== SyntaxKind.Identifier) {
                    continue;
                }

                if (bindingElement.dotDotDotToken) {
                    const spreadType = checker.getTypeAtLocation(bindingElement) as TupleTypeReference;
                    const spreadTupleLabels = spreadType.target.labeledElementDeclarations!
                        .map((labelDecl: NamedTupleMember) => {
                            Debug.assertNode(labelDecl.name, isIdentifier);
                            return idText(labelDecl.name);
                        });

                    addLabeledTupleVariableHints(spreadTupleLabels, bindingElement.getStart());
                }
                else {
                    const labelDecl = labelDecls[i] as NamedTupleMember;
                    if (labelDecl) {
                        Debug.assertNode(labelDecl.name, isIdentifier);
                        addTupleLabelHints(idText(labelDecl.name), node.elements[i].getStart());
                    }
                    else {
                        addTupleLabelHints(undefinedTupleLabel, node.elements[i].getStart());
                    }
                }
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

        function isUndefined(name: __String) {
            return name === "undefined";
        }
    }
}
