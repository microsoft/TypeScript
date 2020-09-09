/* @internal */
namespace ts.refactor.wrapReturnValue {
    const refactorName = "Wrap return value";
    const actionNameWrapReturnIntoObject = "Wrap return value into object";

    const defaultPropertyName = "value";
    registerRefactor(refactorName, {
        getAvailableActions(context): readonly ApplicableRefactorInfo[] {
            const info = getInfo(context);
            if (!info) return emptyArray;

            return [{
                name: refactorName,
                description: refactorName,
                actions: [{
                    name: actionNameWrapReturnIntoObject,
                    description: actionNameWrapReturnIntoObject
                }]
            }];
        },
        getEditsForAction(context, actionName): RefactorEditInfo {
            Debug.assert(actionName === actionNameWrapReturnIntoObject);

            const cancellationToken = context.cancellationToken;
            const info = getInfo(context, /*findReference*/ true, cancellationToken);
            if (!info || !cancellationToken) {
                return { edits: [] };
            }
            const edits = textChanges.ChangeTracker.with(context, t => doChange(t, info, context.file));
            const renameFilename = context.file.fileName;
            const renameLocation = getRenameLocation(edits, renameFilename, defaultPropertyName, /*preferLastLocation*/ false);

            return { edits, renameFilename, renameLocation };
        },
    });


    interface Info {
        func: FunctionDeclaration | ArrowFunction | MethodDeclaration | FunctionExpression;
        returnStatements: (ReturnStatement | Expression)[]
        callExpressions: CallExpression[]
    }

    function getInfo(context: RefactorContext, findReference?: boolean, cancellationToken?: CancellationToken): Info | undefined {
        const { file, startPosition, program } = context;
        const node = getTokenAtPosition(file, startPosition);
        const func = getContainingFunction(node);

        if (!func || (!isFunctionDeclaration(func) && !isArrowFunction(func) && !isMethodDeclaration(func) && !isFunctionExpression(func)) || !func.body) {
            return undefined;
        }

        const returnStmtOrExpr: (ReturnStatement | Expression)[] = [];
        if (isBlock(func.body)) {
            forEachReturnStatement(func.body, stmt => {
                returnStmtOrExpr.push(stmt);
            });
        }
        else {
            returnStmtOrExpr.push(skipParentheses(func.body));
        }
        if (!returnStmtOrExpr || every(returnStmtOrExpr, ret => isReturnStatement(ret) && !ret.expression)) {
            return undefined;
        }

        if (func.type) {
            if (isTypePredicateNode(func.type)) {
                return undefined;
            }

            const checker = program.getTypeChecker();
            const signature = checker.getSignatureFromDeclaration(func);
            const returnType = signature && checker.getReturnTypeOfSignature(signature);
            if (returnType === checker.getVoidType() || returnType === checker.getNeverType()) {
                return undefined;
            }
        }

        const funcName = func.name || getNameOfDeclarationWorker(func, /*includeArrowFunction*/ true);
        const callExpressions: CallExpression[] = [];
        if (findReference && funcName) {
            Debug.assertIsDefined(cancellationToken);

            const references = FindAllReferences.getReferenceEntriesForNode(-1, funcName, program, program.getSourceFiles(), cancellationToken);
            forEach(references, reference => {
                if (reference.kind !== FindAllReferences.EntryKind.Node) {
                    return;
                }

                const parent = skipParenthesesUp(reference.node.parent);
                if (isCallExpression(parent)) {
                    callExpressions.push(parent);
                }
                else if (isAccessExpression(parent) && parent.expression !== reference.node && isCallExpression(parent.parent)) {
                    callExpressions.push(parent.parent);
                }
            });
        }

        return {
            func,
            returnStatements: returnStmtOrExpr,
            callExpressions
        };
    }

    function doChange(changeTracker: textChanges.ChangeTracker, info: Info, file: SourceFile) {
        forEach(info.returnStatements, returnStmtOrExpr => {
            const returnExpression = isReturnStatement(returnStmtOrExpr) ?
                returnStmtOrExpr.expression ?? factory.createIdentifier("undefined") :
                returnStmtOrExpr;

            const newReturnObject = factory.createObjectLiteralExpression([
                factory.createPropertyAssignment(
                    defaultPropertyName,
                    returnExpression
                )
            ]);

            if (isReturnStatement(returnStmtOrExpr)) {
                if (!returnStmtOrExpr.expression) {
                    changeTracker.replaceNode(file, returnStmtOrExpr, factory.createReturnStatement(newReturnObject));
                }
                else {
                    changeTracker.replaceNode(file, returnStmtOrExpr.expression, newReturnObject);
                }
            }
            else {
                const newReturnExpression = !isParenthesizedExpression(returnStmtOrExpr.parent) ?
                    factory.createParenthesizedExpression(newReturnObject) :
                    newReturnObject;
                changeTracker.replaceNode(file, returnStmtOrExpr, newReturnExpression);
            }
        });

        forEach(info.callExpressions, call => {
            const newCall = factory.createPropertyAccessExpression(
                call,
                defaultPropertyName
            );
            changeTracker.replaceNode(file, call, newCall);
        });

        if (info.func.type) {
            const newType = factory.createTypeLiteralNode([
                factory.createPropertySignature(
                    /*modifiers*/ undefined,
                    defaultPropertyName,
                    /*questionToken*/ undefined,
                    info.func.type
                )
            ]);
            changeTracker.replaceNode(file, info.func.type, newType);
        }
    }
}