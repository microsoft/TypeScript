/* @internal */
namespace ts.refactor.convertToOptionalChainExpression {
    const refactorName = "Convert to optional chain expression";
    const convertToOptionalChainExpressionMessage = getLocaleSpecificMessage(Diagnostics.Convert_to_optional_chain_expression);

    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const info = getInfo(context, context.triggerReason === "invoked");
        if (!info) return emptyArray;
        return [{
            name: refactorName,
            description: convertToOptionalChainExpressionMessage,
            actions: [{
                name: refactorName,
                description: convertToOptionalChainExpressionMessage
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        const info = getInfo(context);
        if (!info) return undefined;
        const edits = textChanges.ChangeTracker.with(context, t => doChange(context.file, context.program.getTypeChecker(), t, info, actionName));
        return { edits, renameFilename: undefined, renameLocation: undefined };
    }

    interface Info {
        finalExpression: PropertyAccessExpression | CallExpression,
        occurrences: (PropertyAccessExpression | Identifier)[],
        expression: ValidExpression
    }

    type ValidExpressionOrStatement = ValidExpression | ValidStatement;

    /**
     * Types for which a "Convert to optional chain refactor" are offered.
     */
    type ValidExpression = BinaryExpression | ConditionalExpression;

    /**
     * Types of statements which are likely to include a valid expression for extraction.
     */
    type ValidStatement = ExpressionStatement | ReturnStatement | VariableStatement;

    function isValidExpression(node: Node): node is ValidExpression {
        return isBinaryExpression(node) || isConditionalExpression(node);
    }

    function isValidStatement(node: Node): node is ValidStatement {
        return isExpressionStatement(node) || isReturnStatement(node) || isVariableStatement(node);
    }

    function isValidExpressionOrStatement(node: Node): node is ValidExpressionOrStatement {
        return isValidExpression(node) || isValidStatement(node);
    }

    function getInfo(context: RefactorContext, considerEmptySpans = true): Info | undefined {
        const { file, program } = context;
        const span = getRefactorContextSpan(context);

        const forEmptySpan = span.length === 0;
        if (forEmptySpan && !considerEmptySpans) return undefined;

        // selecting fo[|o && foo.ba|]r should be valid, so adjust span to fit start and end tokens
        const startToken = getTokenAtPosition(file, span.start);
        const endToken = findTokenOnLeftOfPosition(file, span.start + span.length);
        const adjustedSpan = createTextSpanFromBounds(startToken.pos, endToken && endToken.end >= startToken.pos ? endToken.getEnd() : startToken.getEnd());

        const parent = forEmptySpan ? getValidParentNodeOfEmptySpan(startToken) : getValidParentNodeContainingSpan(startToken, adjustedSpan);
        const expression = parent && isValidExpressionOrStatement(parent) ? getExpression(parent) : undefined;
        if (!expression) return undefined;

        const checker = program.getTypeChecker();
        return isConditionalExpression(expression) ? getConditionalInfo(expression, checker) : getBinaryInfo(expression);
    }

    function getConditionalInfo(expression: ConditionalExpression, checker: TypeChecker): Info | undefined {
        const condition = expression.condition;
        const finalExpression = getFinalExpressionInChain(expression.whenTrue);

        if (!finalExpression || checker.isNullableType(checker.getTypeAtLocation(finalExpression))) return undefined;

        if ((isPropertyAccessExpression(condition) || isIdentifier(condition))
            && getMatchingStart(condition, finalExpression.expression)) {
            return { finalExpression, occurrences:[condition], expression };
        }
        else if (isBinaryExpression(condition)) {
            const occurrences = getOccurrencesInExpression(finalExpression.expression, condition);
            return occurrences ? { finalExpression, occurrences, expression } : undefined;
        }
    }

    function getBinaryInfo(expression: BinaryExpression): Info | undefined {
        if (expression.operatorToken.kind !== SyntaxKind.AmpersandAmpersandToken) return undefined;
        const finalExpression = getFinalExpressionInChain(expression.right);

        if (!finalExpression) return undefined;

        const occurrences = getOccurrencesInExpression(finalExpression.expression, expression.left);
        return occurrences ? { finalExpression, occurrences, expression } : undefined;
    }

    /**
     * Gets a list of property accesses that appear in matchTo and occur in sequence in expression.
     */
    function getOccurrencesInExpression(matchTo: Expression, expression: Expression): (PropertyAccessExpression | Identifier)[] | undefined {
        const occurrences: (PropertyAccessExpression | Identifier)[] = [];
        while (isBinaryExpression(expression) && expression.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
            const match = getMatchingStart(matchTo, expression.right);
            if (!match) {
                break;
            }
            occurrences.push(match);
            matchTo = match;
            expression = expression.left;
        }
        const finalMatch = getMatchingStart(matchTo, expression);
        if (finalMatch) {
            occurrences.push(finalMatch);
        }
        return occurrences.length > 0 ? occurrences: undefined;
    }

    /**
     * Returns subchain if chain begins with subchain syntactically.
     */
    function getMatchingStart(chain: Expression, subchain: Expression): PropertyAccessExpression | Identifier | undefined {
        if (!isIdentifier(subchain) && !isPropertyAccessExpression(subchain)) return undefined;
        return chainStartsWith(chain, subchain) ? subchain : undefined;
    }

    /**
     * Returns true if chain begins with subchain syntactically.
     */
    function chainStartsWith(chain: Node, subchain: Node): boolean {
        // skip until we find a matching identifier.
        while (isCallExpression(chain) || isPropertyAccessExpression(chain)) {
            const subchainName = isPropertyAccessExpression(subchain) ? subchain.name.getText() : subchain.getText();
            if (isPropertyAccessExpression(chain) && chain.name.getText() === subchainName) break;
            chain = chain.expression;
        }
        // check that the chains match at each access.  Call chains in subchain are not valid.
        while (isPropertyAccessExpression(chain) && isPropertyAccessExpression(subchain)) {
            if (chain.name.getText() !== subchain.name.getText()) return false;
            chain = chain.expression;
            subchain = subchain.expression;
        }
        // check if we have reached a final identifier.
        return isIdentifier(chain) && isIdentifier(subchain) && chain.getText() === subchain.getText();
    }

    /**
     * Find the least ancestor of the input node that is a valid type for extraction and contains the input span.
     */
    function getValidParentNodeContainingSpan(node: Node, span: TextSpan): ValidExpressionOrStatement | undefined {
        while (node.parent) {
            if (isValidExpressionOrStatement(node) && span.length !== 0 && node.end >= span.start + span.length) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }

    /**
     * Finds an ancestor of the input node that is a valid type for extraction, skipping subexpressions.
     */
    function getValidParentNodeOfEmptySpan(node: Node): ValidExpressionOrStatement | undefined {
        while (node.parent) {
            if (isValidExpressionOrStatement(node) && !isValidExpressionOrStatement(node.parent)) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }

    /**
     * Gets an expression of valid extraction type from a valid statement or expression.
     */
    function getExpression(node: ValidExpressionOrStatement): ValidExpression | undefined {
        if (isValidExpression(node)) {
            return node;
        }
        if (isVariableStatement(node)) {
            const variable = getSingleVariableOfVariableStatement(node);
            const initializer = variable?.initializer;
            return initializer && isValidExpression(initializer) ? initializer : undefined;
        }
        return node.expression && isValidExpression(node.expression) ? node.expression : undefined;
    }

    /**
     * Gets a property access expression which may be nested inside of a binary expression. The final
     * expression in an && chain will occur as the right child of the parent binary expression, unless
     * it is followed by a different binary operator.
     * @param node the right child of a binary expression or a call expression.
     */
    function getFinalExpressionInChain(node: Expression): CallExpression | PropertyAccessExpression | undefined {
        // foo && |foo.bar === 1|; - here the right child of the && binary expression is another binary expression.
        // the rightmost member of the && chain should be the leftmost child of that expression.
        if (isBinaryExpression(node)) {
            return getFinalExpressionInChain(node.left);
        }
        // foo && |foo.bar()()| - nested calls are treated like further accesses.
        else if ((isPropertyAccessExpression(node) || isCallExpression(node)) && !isOptionalChain(node)) {
            return node;
        }
        return undefined;
    }

    /**
     * Creates an access chain from toConvert with '?.' accesses at expressions appearing in occurrences.
     */
    function convertOccurrences(checker: TypeChecker, toConvert: Expression, occurrences: (PropertyAccessExpression | Identifier)[]): Expression {
        if (isPropertyAccessExpression(toConvert) || isCallExpression(toConvert)) {
            const chain = convertOccurrences(checker, toConvert.expression, occurrences);
            const lastOccurrence = occurrences.length > 0 ? occurrences[occurrences.length - 1] : undefined;
            const isOccurrence = lastOccurrence?.getText() === toConvert.expression.getText();
            if (isOccurrence) occurrences.pop();
            if (isCallExpression(toConvert)) {
                return isOccurrence ?
                    factory.createCallChain(chain, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.typeArguments, toConvert.arguments) :
                    factory.createCallChain(chain, toConvert.questionDotToken, toConvert.typeArguments, toConvert.arguments);
            }
            else if (isPropertyAccessExpression(toConvert)) {
                return isOccurrence ?
                    factory.createPropertyAccessChain(chain, factory.createToken(SyntaxKind.QuestionDotToken), toConvert.name) :
                    factory.createPropertyAccessChain(chain, toConvert.questionDotToken, toConvert.name);
            }
        }
        return toConvert;
    }

    function doChange(sourceFile: SourceFile, checker: TypeChecker, changes: textChanges.ChangeTracker, info: Info, _actionName: string): void {
        const { finalExpression: lastPropertyAccessChain, occurrences, expression } = info;
        const firstOccurrence = occurrences[occurrences.length - 1];
        const convertedChain = convertOccurrences(checker, lastPropertyAccessChain, occurrences);
        if (convertedChain && (isPropertyAccessExpression(convertedChain) || isCallExpression(convertedChain))) {
            if (isBinaryExpression(expression)) {
                changes.replaceNodeRange(sourceFile, firstOccurrence, lastPropertyAccessChain, convertedChain);
            }
            else if (isConditionalExpression(expression)) {
                changes.replaceNode(sourceFile, expression,
                    factory.createBinaryExpression(convertedChain, factory.createToken(SyntaxKind.QuestionQuestionToken), expression.whenFalse)
                );
            }
        }
    }
}
