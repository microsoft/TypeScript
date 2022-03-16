/* @internal */
namespace ts.refactor {
    const refactorName = "Convert to destruction";
    const refactorKind = "refactor.rewrite.expression.toDestructured";
    registerRefactor(refactorName, { getAvailableActions, getEditsForAction, kinds: [refactorKind] });

    const convertToDestructionAction = {
        name: refactorName,
        description: getLocaleSpecificMessage(Diagnostics.Convert_access_expression_to_destruction),
        kind: refactorKind
    };

    function makeRefactorActionWithErrorReason(reason: string) {
        return { ...convertToDestructionAction, notApplicableReason: reason };
    }

    function getAvailableActions(context: RefactorContext): readonly ApplicableRefactorInfo[] {
        const { file, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);
        if (isJSFile || !cancellationToken) return emptyArray;

        const info = getInfo(context, file, program.getTypeChecker(), program, cancellationToken, /*resolveUniqueName*/ false, context.triggerReason === "invoked");
        if (!isErrorResult(info)) {
            return [{
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Convert_access_expression_to_destruction),
                actions: [convertToDestructionAction]
            }];
        }

        if (context.preferences.provideRefactorNotApplicableReason) {
            return [{
                name: refactorName,
                description: getLocaleSpecificMessage(Diagnostics.Convert_access_expression_to_destruction),
                actions: [makeRefactorActionWithErrorReason(info.reason)]
            }];
        }
        return emptyArray;
    }

    function getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
        Debug.assert(actionName === refactorName);
        const { file, program, cancellationToken } = context;
        const isJSFile = isSourceFileJS(file);

        const emptyResult: RefactorEditInfo = { edits: [] };
        if (isJSFile || !cancellationToken) return emptyResult;

        const info = getInfo(context, file, program.getTypeChecker(), program, cancellationToken, /*resolveUniqueName*/ true);
        Debug.assert(!isErrorResult(info));

        const edits = textChanges.ChangeTracker.with(context, t => doChange(t, file, info.value));
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

            // Check for integer.
            const value = Number(info.name);
            if (isNaN(value) || parseInt(value.toString(), 10) !== value) {
                return undefined;
            }

            min = Math.min(min, value);
            max = Math.max(max, value);
            indexSet.add(value);

            if (min < 0 || max < 0) {
                return undefined;
            }
        }

        if (indexSet.size <= Math.floor(max / 2)) {
            return undefined;
        }

        return [max, indexSet];
    }

    function doChange(changeTracker: textChanges.ChangeTracker, file: SourceFile, info: Info) {
        const bindingPattern = getBindingPattern(info, file, changeTracker);
        Debug.assertIsDefined(bindingPattern);

        suppressLeadingAndTrailingTrivia(info.replacementExpression);
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

        if (info.firstReferencedStatement) {
            changeTracker.insertNodeBefore(
                file,
                info.firstReferencedStatement,
                newBinding
            );
        }
    }

    function getBindingPattern(info: Info, file: SourceFile, changeTracker: textChanges.ChangeTracker): BindingPattern | undefined {
        const denseNumericInfo = info.isArrayLikeType && getDenseNumericAccessInfo(info.referencedAccessExpression);
        if (denseNumericInfo) {
            const [max, indexSet] = denseNumericInfo;
            return getDenseNumericBindingPattern(info, file, max, indexSet, changeTracker);
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

    function getDenseNumericBindingPattern(info: Info, file: SourceFile, max: number, indexSet: Set<number>, changeTracker: textChanges.ChangeTracker): ArrayBindingPattern {
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
        replacementExpression: Expression;
        referencedAccessExpression: ReferencedAccessInfo[];
        firstReferenced: Expression | undefined;
        firstReferencedStatement: Statement | undefined;
        namesNeedUniqueName: Set<string>;
        isArrayLikeType: boolean;
    }
    function getInfo(context: RefactorContext, file: SourceFile, checker: TypeChecker, program: Program, cancellationToken: CancellationToken, resolveUniqueName: boolean, triggerByInvoked = true): Result<Info> {
        const current = getTokenAtPosition(file, context.startPosition);
        const compilerOptions = context.program.getCompilerOptions();
        const range = createTextRangeFromSpan(getRefactorContextSpan(context));
        const cursorRequest = range.pos === range.end && triggerByInvoked;

        const node = findAncestor(current, (node => node.parent && isAccessExpression(node.parent) && !rangeContainsSkipTrivia(range, node.parent, file) && (
            cursorRequest || nodeOverlapsWithStartEnd(node, file, range.pos, range.end)
        )));

        if (!node || !isAccessExpression(node.parent)) {
            return Err(Diagnostics.No_convertible_access_expression_at_location.message);
        }

        const isLeftOfAccess = node.parent.expression === node;

        const symbol = checker.getSymbolAtLocation(isLeftOfAccess ? node.parent.expression : node.parent);
        if (!symbol || checker.isUnknownSymbol(symbol) || !symbol.valueDeclaration || !isVariableLike(symbol.valueDeclaration) || isEnumMember(symbol.valueDeclaration)) {
            return Err(Diagnostics.Cannot_find_convertible_value_declaration.message);
        }

        // Find only current file
        const references = FindAllReferences.getReferenceEntriesForNode(-1, node, program, [file], cancellationToken);
        let firstReferenced: Expression | undefined;
        let firstReferencedStatement: Statement | undefined;
        let hasNumericAccess = false;
        const referencedAccessExpression: ReferencedAccessInfo[] = [];
        const allReferencedAcccessExpression: AccessExpression[] = [];
        const container = getContainingParameterDeclaration(symbol.valueDeclaration) || findAncestor(symbol.valueDeclaration, or(isStatement, isSourceFile));
        Debug.assertIsDefined(container);
        forEach(references, reference => {
            if (reference.kind !== FindAllReferences.EntryKind.Node) {
                return;
            }

            const accessExpression = getAccessExpressionIfValidReference(reference.node, symbol, container, allReferencedAcccessExpression, isLeftOfAccess);
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
                    hasNumericAccess = isNumericAccess = true;
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
        if (!firstReferenced || !firstReferencedStatement || !referencedAccessExpression.length || !some(referencedAccessExpression, ({ expression }) => rangeContainsRange(expression, current))) {
            return Err(Diagnostics.Cannot_find_convertible_references.message);
        }

        const minimumReferenceCount = 2;
        if (!triggerByInvoked && referencedAccessExpression.length < minimumReferenceCount) {
            return Err(formatMessage(/*_dummy*/ undefined, Diagnostics.At_least_0_references_are_required, minimumReferenceCount));
        }

        let hasUnconvertableReference = false;
        const namesNeedUniqueName = new Set<string>();
        const type = checker.getTypeOfSymbolAtLocation(symbol, firstReferenced);
        const isArrayLikeType = checker.isArrayLikeType(type);

        if (hasNumericAccess && isArrayLikeType && !getDenseNumericAccessInfo(referencedAccessExpression) && !triggerByInvoked) {
            return Err(Diagnostics.Too_many_empty_array_item.message);
        }

        forEach(allReferencedAcccessExpression, expr => {
            const referenceType = checker.getTypeAtLocation(expr.expression);
            if (referenceType !== type) {
                const accessType = checker.getTypeAtLocation(expr);
                if (!isLeftOfAccess) {
                    if (accessType !== type) {
                        hasUnconvertableReference = true;
                        return "quit";
                    }
                }
                else {
                    const propName = isElementAccessExpression(expr) ?
                        cast(expr.argumentExpression, isStringOrNumericLiteralLike).text :
                        checker.getSymbolAtLocation(expr)?.name;

                    const prop = propName && checker.getPropertyOfType(type, propName);

                    if (!prop || checker.getTypeOfSymbolAtLocation(prop, expr) !== accessType) {
                        hasUnconvertableReference = true;
                        return "quit";
                    }
                }
            }
        });
        if (hasUnconvertableReference) {
            return Err(Diagnostics.Some_references_are_un_convertible.message);
        }

        if (resolveUniqueName) {
            forEach(referencedAccessExpression, ({ name }) => {
                const symbol = checker.resolveName(name, /*location*/ undefined, SymbolFlags.Value, /*excludeGlobals*/ false);
                if (symbol) {
                    namesNeedUniqueName.add(name);
                }
            });
        }

        return Ok({
            replacementExpression: node.parent.expression,
            firstReferenced,
            firstReferencedStatement,
            referencedAccessExpression,
            namesNeedUniqueName,
            isArrayLikeType
        });
    }

    function getContainingParameterDeclaration(decl: Declaration) {
        return findAncestor(decl, node => isFunctionLike(node) ? "quit" : isParameter(node)) as ParameterDeclaration | undefined;
    }

    function getAccessExpressionIfValidReference(node: Node, symbol: Symbol, container: Node, allReferencedAcccessExpression: Node[], isLeftOfAccess: boolean): AccessExpression | undefined {
        let lastChild = node;
        const topReferencedAccessExpression = findAncestor(node.parent, n => {
            if (isParenthesizedExpression(n)) {
                lastChild = n;
                return false;
            }
            else if (isAccessExpression(n)) {
                if (isLeftOfAccess && n.expression === lastChild) {
                    return true;
                }
                else if (!isLeftOfAccess && (isPropertyAccessExpression(n) ? n.name === lastChild : n.argumentExpression === lastChild)) {
                    return true;
                }
                lastChild = n;
                return false;
            }
            else if (isIdentifier(n) && isAccessExpression(n.parent)) {
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

        Debug.assertIsDefined(symbol.valueDeclaration);
        if (node.pos < symbol.valueDeclaration.pos) {
            return undefined;
        }
        if (isFunctionLikeDeclaration(container.parent) && container.parent.body && !rangeContainsRange(container.parent.body, node)) {
            return undefined;
        }

        return accessExpression;
    }
}