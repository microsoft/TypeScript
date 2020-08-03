/* @internal */
namespace ts.refactor {
    const refactorName = "Introduce destruction";
    const actionNameIntroduceObjectDestruction = "Convert access to destruction";
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction });

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile || !cancellationToken) return emptyArray;

        const info = getInfo(context, file, program.getTypeChecker(), program, cancellationToken, /*resolveUniqueName*/ false);
        if (!info) return emptyArray;

        return [{
            name: refactorName,
            description: actionNameIntroduceObjectDestruction,
            actions: [{
                name: refactorName,
                description: actionNameIntroduceObjectDestruction
            }]
        }];
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        Debug.assert(actionName === refactorName);
        const { file, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);

        const emptyResult: RefactorEditInfo = { edits: [] };
        if (isJSFile || !cancellationToken) return emptyResult;

        const info = getInfo(context, file, program.getTypeChecker(), program, cancellationToken, /*resolveUniqueName*/ true);
        if (!info) return emptyResult;

        const edits = textChanges.ChangeTracker.with(context, t => doChange(t, file, info));
        return { renameFilename: undefined, renameLocation: undefined, edits };
    }

    function getUniqueNumericAccessVariable(name: string | number, file: SourceFile) {
        const tempName = `index_${name}`;
        return isFileLevelUniqueName(file, tempName) ? tempName : getUniqueName(tempName, file);
    }

    /**
     * `Dense` means we use array literal pattern to destruction the expression.
     * We allowed index up to 15 to avoid many omit expression.
     */
    function getDenseNumericAccessInfo(infos: ReferencedAccessInfo[]): [max: number, indexSet: Set<number>] | undefined {
        let min = Infinity;
        let max = -Infinity;
        const indexSet = new Set<number>();
        for (const info of infos) {
            if (!info.isNumericAccess) {
                return undefined;
            }

            const value = parseInt(info.name);
            min = Math.min(min, value);
            max = Math.max(max, value);
            indexSet.add(value);

            if (isNaN(min) || isNaN(max) || min < 0 || max < 0) {
                return undefined;
            }
        }

        if (max > 15) {
            return undefined;
        }

        return [max, indexSet];
    }

    function doChange(changeTracker: textChanges.ChangeTracker, file: SourceFile, info: Info) {
        const bindingPattern = getBindingPattern(info, file, changeTracker);
        const newBinding = factory.createVariableStatement(
            /* modifiers*/ undefined,
            factory.createVariableDeclarationList(
                [
                    factory.createVariableDeclaration(
                        bindingPattern,
                        /*exclamationToken*/ undefined,
                        /*type*/ undefined,
                        info.replacementExpression
                    )
                ],
                NodeFlags.Const
            ),
        );

        changeTracker.insertNodeBefore(
            file,
            info.firstReferencedStatement,
            newBinding
        );
    }

    function getBindingPattern(info: Info, file: SourceFile, changeTracker: textChanges.ChangeTracker): BindingPattern {
        const denseNumericInfo = info.isArrayLikeType && getDenseNumericAccessInfo(info.referencedAccessExpression);
        if (denseNumericInfo) {
            const [max, indexSet] = denseNumericInfo;
            return getdenseNumericBindingPattern(info, file, max, indexSet, changeTracker);
        }
        return getObjectBindingPattern(info, file, changeTracker);
    }

    function getObjectBindingPattern(info: Info, file: SourceFile, changeTracker: textChanges.ChangeTracker) {
        const nameMap = new Map<string, string>();
        const bindingElements: BindingElement[] = [];
        info.referencedAccessExpression.forEach(({ expression, name, isNumericAccess }) => {
            if (!nameMap.has(name)) {
                const needAlias = isNumericAccess || info.namesNeedUniqueName.has(name);
                const uniqueName = isNumericAccess ? getUniqueNumericAccessVariable(name, file) :
                    needAlias ? getUniqueName(name, file) : name;
                nameMap.set(name, uniqueName);
                bindingElements.push(getUniqueDestructionName(expression, needAlias, uniqueName));
            }

            const newName = nameMap.get(name);
            Debug.assertIsDefined(newName);
            replaceBindingPatternReferenced(file, changeTracker, expression, newName);
        });
        return factory.createObjectBindingPattern(bindingElements);
    }

    function getdenseNumericBindingPattern(info: Info, file: SourceFile, max: number, indexSet: Set<number>, changeTracker: textChanges.ChangeTracker): ArrayBindingPattern {
        const nameMap = new Map<number, string>();
        const bindingElements: ArrayBindingElement[] = [];

        for (let i = 0; i <= max; ++i) {
            if (indexSet.has(i)) {
                if (!nameMap.has(i)) {
                    const name = getUniqueNumericAccessVariable(i, file);
                    nameMap.set(i, name);
                }

                const name = nameMap.get(i);
                Debug.assertIsDefined(name);

                bindingElements.push(factory.createBindingElement(
                    /* dotDotDotToken*/ undefined,
                    /*propertyName*/ undefined,
                    factory.createIdentifier(name)
                ));
            }
            else {
                bindingElements.push(factory.createOmittedExpression());
            }
        }

        info.referencedAccessExpression.forEach(({ expression, name }) => {
            const index = parseInt(name);

            const newName = nameMap.get(index);
            Debug.assertIsDefined(newName);
            replaceBindingPatternReferenced(file, changeTracker, expression, newName);
        });

        return factory.createArrayBindingPattern(bindingElements);
    }

    function replaceBindingPatternReferenced(file: SourceFile, changeTracker: textChanges.ChangeTracker, expression: Expression, newName: string) {
        const newIdentifier = factory.createIdentifier(newName);
        suppressLeadingAndTrailingTrivia(expression);
        copyComments(expression, newIdentifier);

        changeTracker.replaceNode(
            file,
            expression,
            newIdentifier
        );
    }

    function getUniqueDestructionName(expr: AccessExpression, needAlias: boolean, newName: string) {
        if (isPropertyAccessExpression(expr)) {
            const bindingName = cast(expr.name, isIdentifier);
            return factory.createBindingElement(
                /* dotDotDotToken*/ undefined,
                needAlias ? expr.name : undefined,
                needAlias ? newName : bindingName,
            );
        }
        else {
            const argExpr = cast(expr.argumentExpression, isPropertyName);
            return factory.createBindingElement(
                /* dotDotDotToken*/ undefined,
                needAlias ? factory.cloneNode(argExpr) : undefined,
                newName,
            );
        }
    }

    interface ReferencedAccessInfo {
        expression: AccessExpression
        name: string,
        isNumericAccess: boolean
    }

    interface Info {
        replacementExpression: Expression,
        referencedAccessExpression: ReferencedAccessInfo[]
        firstReferenced: Expression
        firstReferencedStatement: Statement
        namesNeedUniqueName: Set<string>
        isArrayLikeType: boolean
    }

    function getInfo(context: RefactorContext, file: SourceFile, checker: TypeChecker, program: Program, cancellationToken: CancellationToken, resolveUniqueName: boolean): Info | undefined {
        const current = getTokenAtPosition(file, context.startPosition);
        const compilerOptions = context.program.getCompilerOptions();
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));

        const node = findAncestor(current, (node => node.parent && isAccessExpression(node.parent) && !rangeContainsSkipTrivia(range, node.parent, file)));

        if (!node || !isAccessExpression(node.parent) || node.parent.expression !== node) return undefined;
        const symbol = checker.getSymbolAtLocation(node);
        if (!symbol || checker.isUnknownSymbol(symbol) || !symbol.valueDeclaration || !isVariableLike(symbol.valueDeclaration) || isEnumMember(symbol.valueDeclaration)) return undefined;

        // Find only current file
        const references = FindAllReferences.getReferenceEntriesForNode(-1, node, program, [file], cancellationToken);
        let firstReferenced: Expression | undefined;
        let firstReferencedStatement: Statement | undefined;
        const referencedAccessExpression: ReferencedAccessInfo[] = [];
        const allReferencedAcccessExpression: AccessExpression[] = [];
        const container = isParameter(symbol.valueDeclaration) ? symbol.valueDeclaration : findAncestor(symbol.valueDeclaration, or(isStatement, isSourceFile));
        Debug.assertIsDefined(container);
        forEach(references, reference => {
            if (reference.kind !== FindAllReferences.EntryKind.Node) {
                return;
            }

            const accessExpression = getAccessExpressionIfValidReference(reference.node, symbol, container, allReferencedAcccessExpression);
            if (!accessExpression) {
                return;
            }

            if (accessExpression !== symbol.valueDeclaration && isExpression(accessExpression)) {
                if (!firstReferenced || accessExpression.pos < firstReferenced.pos) {
                    firstReferenced = accessExpression;
                }
                const referencedStatement = findAncestor(accessExpression, n => {
                    const parent = n.parent && isBlock(n.parent) && isFunctionLikeDeclaration(n.parent.parent) ? n.parent.parent : n.parent;
                    return isStatement(n) && parent === container.parent;
                });
                if (referencedStatement && (!firstReferencedStatement || referencedStatement.pos < firstReferencedStatement.pos)) {
                    firstReferencedStatement = cast(referencedStatement, isStatement);
                }
            }

            if (isElementAccessExpression(accessExpression)) {
                let isNumericAccess = false;
                if (!isStringLiteralLike(accessExpression.argumentExpression) && !isNumericLiteral(accessExpression.argumentExpression)) {
                    return;
                }
                if (isNumericLiteral(accessExpression.argumentExpression)) {
                    isNumericAccess = true;
                }
                else if (!isIdentifierText(accessExpression.argumentExpression.text, compilerOptions.target, compilerOptions.jsx ? LanguageVariant.JSX : LanguageVariant.Standard)) {
                    return;
                }

                referencedAccessExpression.push({
                    expression: accessExpression,
                    name: accessExpression.argumentExpression.text,
                    isNumericAccess
                });
                return;
            }

            referencedAccessExpression.push({
                expression: accessExpression,
                name: accessExpression.name.text,
                isNumericAccess: false
            });
        });
        if (!firstReferenced || !firstReferencedStatement || !referencedAccessExpression.length || !some(referencedAccessExpression, ({ expression }) => rangeContainsRange(expression, current))) return undefined;

        let hasUnconvertableReference = false;
        const namesNeedUniqueName = new Set<string>();
        const type = checker.getTypeOfSymbolAtLocation(symbol, firstReferenced);
        const isArrayLikeType = checker.isArrayLikeType(type);
        forEach(allReferencedAcccessExpression, expr => {
            const referenceType = checker.getTypeAtLocation(expr.expression);
            if (referenceType !== type) {
                const propName = isElementAccessExpression(expr) ?
                    cast(expr.argumentExpression, isStringOrNumericLiteralLike).text :
                    checker.getSymbolAtLocation(expr)?.name;

                const accessType = checker.getTypeAtLocation(expr);
                const prop = propName && checker.getPropertyOfType(type, propName);

                if (!prop || checker.getTypeOfSymbolAtLocation(prop, expr) !== accessType) {
                    hasUnconvertableReference = true;
                    return "quit";
                }
            }
        });
        if (hasUnconvertableReference) return undefined;

        if (resolveUniqueName) {
            forEach(referencedAccessExpression, ({ name }) => {
                const symbol = checker.resolveName(name, /*location*/ undefined, SymbolFlags.Value, /*excludeGlobals*/ false);
                if (symbol) {
                    namesNeedUniqueName.add(name);
                }
            });
        }

        return {
            replacementExpression: node.parent.expression,
            firstReferenced,
            firstReferencedStatement,
            referencedAccessExpression,
            namesNeedUniqueName,
            isArrayLikeType
        };
    }

    function getAccessExpressionIfValidReference(node: Node, symbol: Symbol, container: Node, allReferencedAcccessExpression: Node[]): AccessExpression | undefined {
        let lastChild = node;
        const topReferencedAccessExpression = findAncestor(node.parent, n => {
            if (isParenthesizedExpression(n)) {
                lastChild = n;
                return false;
            }
            else if (isAccessExpression(n)) {
                if (n.expression === lastChild) {
                    return true;
                }
                lastChild = n;
                return false;
            }
            return "quit";
        });
        if (!topReferencedAccessExpression) {
            return undefined;
        }

        const accessExpression = cast(topReferencedAccessExpression, isAccessExpression);
        allReferencedAcccessExpression.push(accessExpression);

        if (isAssignmentTarget(accessExpression)) {
            return undefined;
        }

        const referencedParentMaybeCall = skipParenthesesUp(accessExpression.parent);
        if (isCallOrNewExpression(referencedParentMaybeCall) && !(referencedParentMaybeCall.arguments && rangeContainsRange(referencedParentMaybeCall.arguments, topReferencedAccessExpression))) {
            return undefined;
        }

        if (node.pos < symbol.valueDeclaration.pos) {
            return undefined;
        }
        if (isFunctionLikeDeclaration(container.parent) && container.parent.body && !rangeContainsRange(container.parent.body, node)) {
            return undefined;
        }

        return accessExpression;
    }
}