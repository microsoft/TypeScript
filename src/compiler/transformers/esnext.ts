import {
    addEmitHelpers,
    addRange,
    append,
    arrayFrom,
    BindingElement,
    Block,
    Bundle,
    CaseOrDefaultClause,
    chainBundle,
    ClassDeclaration,
    Debug,
    EmitFlags,
    ExportAssignment,
    ExportSpecifier,
    Expression,
    ForOfStatement,
    ForStatement,
    GeneratedIdentifierFlags,
    getEmitFlags,
    hasSyntacticModifier,
    Identifier,
    IdentifierNameMap,
    isArray,
    isBindingPattern,
    isBlock,
    isCaseClause,
    isClassExpression,
    isCustomPrologue,
    isExpression,
    isFunctionExpression,
    isGeneratedIdentifier,
    isIdentifier,
    isNamedEvaluation,
    isOmittedExpression,
    isPrologueDirective,
    isSourceFile,
    isStatement,
    isVariableDeclarationList,
    isVariableStatement,
    ModifierFlags,
    Node,
    NodeFlags,
    setCommentRange,
    setEmitFlags,
    setOriginalNode,
    setSourceMapRange,
    setTextRange,
    skipOuterExpressions,
    SourceFile,
    Statement,
    SwitchStatement,
    SyntaxKind,
    TransformationContext,
    TransformFlags,
    transformNamedEvaluation,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    visitArray,
    visitEachChild,
    visitNode,
    visitNodes,
    VisitResult
} from "../_namespaces/ts";

/** @internal */
export function transformESNext(context: TransformationContext): (x: SourceFile | Bundle) => SourceFile | Bundle {
    const {
        factory,
        getEmitHelperFactory: emitHelpers,
        hoistVariableDeclaration,
        startLexicalEnvironment,
        endLexicalEnvironment,
    } = context;

    let exportBindings: IdentifierNameMap<ExportSpecifier>;
    let exportVars: VariableDeclaration[];
    let defaultExportBinding: Identifier | undefined;
    let exportEqualsBinding: Identifier | undefined;

    return chainBundle(context, transformSourceFile);

    function transformSourceFile(node: SourceFile) {
        if (node.isDeclarationFile) {
            return node;
        }

        const visited = visitNode(node, visitor, isSourceFile);
        addEmitHelpers(visited, context.readEmitHelpers());
        exportVars = undefined!;
        exportBindings = undefined!;
        defaultExportBinding = undefined;
        return visited;
    }

    function visitor(node: Node): VisitResult<Node> {
        if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
            return node;
        }

        switch (node.kind) {
            case SyntaxKind.SourceFile:
                return visitSourceFile(node as SourceFile);

            case SyntaxKind.Block:
                return visitBlock(node as Block);

            case SyntaxKind.ForStatement:
                return visitForStatement(node as ForStatement);

            case SyntaxKind.ForOfStatement:
                return visitForOfStatement(node as ForOfStatement);

            case SyntaxKind.SwitchStatement:
                return visitSwitchStatement(node as SwitchStatement);

            default:
                return visitEachChild(node, visitor, context);
        }
    }

    function visitSourceFile(node: SourceFile): SourceFile {
        const usingKind = getUsingKindOfStatements(node.statements);
        if (usingKind) {
            // Imports and exports must stay at the top level. This means we must hoist all imports, exports, and
            // top-level function declarations and bindings out of the `try` statements we generate.
            startLexicalEnvironment();

            exportBindings = new IdentifierNameMap();
            exportVars = [];

            const prologueCount = countPrologueStatements(node.statements);
            const topLevelStatements: Statement[] = [];
            addRange(topLevelStatements, visitArray(node.statements, visitor, isStatement, 0, prologueCount));

            // Collect and transform any leading statements up to the first `using` or `await using`. This preserves
            // the original statement order much as is possible.
            let pos = prologueCount;
            while (pos < node.statements.length) {
                const statement = node.statements[pos];
                if (getUsingKind(statement) !== UsingKind.None) {
                    if (pos > prologueCount) {
                        addRange(topLevelStatements, visitNodes(node.statements, visitor, isStatement, prologueCount, pos - prologueCount));
                    }
                    break;
                }
                pos++;
            }

            Debug.assert(pos < node.statements.length, "Should have encountered at least one 'using' statement.");

            // transform the rest of the body
            const envBinding = createEnvBinding();
            const bodyStatements = transformUsingDeclarations(node.statements, pos, node.statements.length, envBinding, topLevelStatements);

            // add `export {}` declarations for any hoisted bindings.
            if (exportBindings.size) {
                append(topLevelStatements, factory.createExportDeclaration(
                    /*modifiers*/ undefined,
                    /*isTypeOnly*/ false,
                    factory.createNamedExports(arrayFrom(exportBindings.values()))
                ));
            }

            addRange(topLevelStatements, endLexicalEnvironment());
            if (exportVars.length) {
                topLevelStatements.push(factory.createVariableStatement(
                    factory.createModifiersFromModifierFlags(ModifierFlags.Export),
                    factory.createVariableDeclarationList(
                        exportVars,
                        NodeFlags.Let
                    )
                ));
            }
            addRange(topLevelStatements, createDownlevelUsingStatements(bodyStatements, envBinding, usingKind === UsingKind.Async));

            if (exportEqualsBinding) {
                topLevelStatements.push(factory.createExportAssignment(
                    /*modifiers*/ undefined,
                    /*isExportEquals*/ true,
                    exportEqualsBinding
                ));
            }

            return factory.updateSourceFile(node, topLevelStatements);
        }

        return visitEachChild(node, visitor, context);
    }

    function visitBlock(node: Block): VisitResult<Statement> {
        const usingKind = getUsingKindOfStatements(node.statements);
        if (usingKind) {
            const prologueCount = countPrologueStatements(node.statements);
            const envBinding = createEnvBinding();
            return factory.updateBlock(
                node,
                [
                    ...visitArray(node.statements, visitor, isStatement, 0, prologueCount),
                    ...createDownlevelUsingStatements(
                        transformUsingDeclarations(node.statements, prologueCount, node.statements.length, envBinding, /*topLevelStatements*/ undefined),
                        envBinding,
                        usingKind === UsingKind.Async,
                    )
                ]
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function visitForStatement(node: ForStatement): VisitResult<Statement> {
        if (node.initializer && isUsingVariableDeclarationList(node.initializer)) {
            return visitNode(
                factory.createBlock([
                    factory.createVariableStatement(/*modifiers*/ undefined, node.initializer),
                    factory.updateForStatement(
                        node,
                        /*initializer*/ undefined,
                        node.condition,
                        node.incrementor,
                        node.statement
                    )
                ]),
                visitor,
                isStatement
            );
        }

        return visitEachChild(node, visitor, context);
    }

    function visitForOfStatement(node: ForOfStatement) {
        if (isUsingVariableDeclarationList(node.initializer)) {
            const forInitializer = node.initializer;
            Debug.assertNode(forInitializer, isUsingVariableDeclarationList);
            Debug.assert(forInitializer.declarations.length === 1, "ForInitializer may only have one declaration");

            const forDecl = forInitializer.declarations[0];
            Debug.assert(!forDecl.initializer, "ForInitializer may not have an initializer");

            const isAwaitUsing = getUsingKindOfVariableDeclarationList(forInitializer) === UsingKind.Async;
            const temp = factory.getGeneratedNameForNode(forDecl.name);
            const usingVar = factory.updateVariableDeclaration(forDecl, forDecl.name, /*exclamationToken*/ undefined, /*type*/ undefined, temp);
            const usingVarList = factory.createVariableDeclarationList([usingVar], isAwaitUsing ? NodeFlags.AwaitUsing : NodeFlags.Using);
            const usingVarStatement = factory.createVariableStatement(/*modifiers*/ undefined, usingVarList);
            return visitNode(
                factory.updateForOfStatement(
                    node,
                    node.awaitModifier,
                    factory.createVariableDeclarationList([
                        factory.createVariableDeclaration(temp)
                    ], NodeFlags.Const),
                    node.expression,
                    isBlock(node.statement) ?
                        factory.updateBlock(node.statement, [
                            usingVarStatement,
                            ...node.statement.statements
                        ]) :
                        factory.createBlock([
                            usingVarStatement,
                            node.statement
                        ], /*multiLine*/ true)
                ),
                visitor,
                isStatement
            );
        }
        return visitEachChild(node, visitor, context);
    }

    function visitCaseOrDefaultClause(node: CaseOrDefaultClause, envBinding: Identifier) {
        if (getUsingKindOfStatements(node.statements) !== UsingKind.None) {
            if (isCaseClause(node)) {
                return factory.updateCaseClause(
                    node,
                    visitNode(node.expression, visitor, isExpression),
                    transformUsingDeclarations(node.statements, /*start*/ 0, node.statements.length, envBinding, /*topLevelStatements*/ undefined)
                );
            }
            else {
                return factory.updateDefaultClause(
                    node,
                    transformUsingDeclarations(node.statements, /*start*/ 0, node.statements.length, envBinding, /*topLevelStatements*/ undefined)
                );
            }
        }
        return visitEachChild(node, visitor, context);
    }

    function visitSwitchStatement(node: SwitchStatement) {
        const usingKind = getUsingKindOfCaseOrDefaultClauses(node.caseBlock.clauses);
        if (usingKind) {
            const envBinding = createEnvBinding();
            return createDownlevelUsingStatements(
                [
                    factory.updateSwitchStatement(
                        node,
                        visitNode(node.expression, visitor, isExpression),
                        factory.updateCaseBlock(
                            node.caseBlock,
                            node.caseBlock.clauses.map(clause => visitCaseOrDefaultClause(clause, envBinding))
                        )
                    )
                ],
                envBinding,
                usingKind === UsingKind.Async,
            );
        }

        return visitEachChild(node, visitor, context);
    }

    /**
     * Transform `using` declarations in a statement list.
     * @param statementsIn
     * @param start
     * @param envBinding
     * @returns
     */
    function transformUsingDeclarations(statementsIn: readonly Statement[], start: number, end: number, envBinding: Identifier, topLevelStatements: Statement[] | undefined) {
        const statements: Statement[] = [];

        for (let i = start; i < end; i++) {
            const statement = statementsIn[i];
            const usingKind = getUsingKind(statement);
            if (usingKind) {
                Debug.assertNode(statement, isVariableStatement);
                const declarations: VariableDeclaration[] = [];
                for (let declaration of statement.declarationList.declarations) {
                    if (!isIdentifier(declaration.name)) {
                        // Since binding patterns are a grammar error, we reset `declarations` so we don't process this as a `using`.
                        declarations.length = 0;
                        break;
                    }

                    // perform a shallow transform for any named evaluation
                    if (isNamedEvaluation(declaration)) {
                        declaration = transformNamedEvaluation(context, declaration);
                    }

                    const initializer = visitNode(declaration.initializer, visitor, isExpression) ?? factory.createVoidZero();
                    declarations.push(factory.updateVariableDeclaration(
                        declaration,
                        declaration.name,
                        /*exclamationToken*/ undefined,
                        /*type*/ undefined,
                        emitHelpers().createAddDisposableResourceHelper(
                            envBinding,
                            initializer,
                            usingKind === UsingKind.Async
                        )
                    ));
                }

                // Only replace the statement if it was valid.
                if (declarations.length) {
                    const varList = factory.createVariableDeclarationList(declarations, NodeFlags.Const);
                    setOriginalNode(varList, statement.declarationList);
                    setTextRange(varList, statement.declarationList);
                    hoistOrAppendNode(factory.updateVariableStatement(statement, /*modifiers*/ undefined, varList));
                    continue;
                }
            }

            const result = visitor(statement);
            if (isArray(result)) {
                result.forEach(hoistOrAppendNode);
            }
            else if (result) {
                hoistOrAppendNode(result);
            }
        }

        return statements;

        function hoistOrAppendNode(node: Node) {
            Debug.assertNode(node, isStatement);
            append(statements, hoist(node));
        }

        function hoist(node: Statement) {
            if (!topLevelStatements) return node;

            switch (node.kind) {
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ExportDeclaration:
                case SyntaxKind.FunctionDeclaration:
                    return hoistImportOrExportOrHoistedDeclaration(node, topLevelStatements);
                case SyntaxKind.ExportAssignment:
                    return hoistExportAssignment(node as ExportAssignment);
                case SyntaxKind.ClassDeclaration:
                    return hoistClassDeclaration(node as ClassDeclaration);
                case SyntaxKind.VariableStatement:
                    return hoistVariableStatement(node as VariableStatement);
            }

            return node;
        }
    }

    function hoistImportOrExportOrHoistedDeclaration(node: Statement, topLevelStatements: Statement[]) {
        // NOTE: `node` has already been visited
        topLevelStatements.push(node);
        return undefined;
    }

    function hoistExportAssignment(node: ExportAssignment) {
        return node.isExportEquals ? hoistExportEquals(node) : hoistExportDefault(node);
    }

    function hoistExportDefault(node: ExportAssignment) {
        // NOTE: `node` has already been visited
        if (defaultExportBinding) {
            // invalid case of multiple `export default` declarations. Don't assert here, just pass it through
            return node;
        }

        // converts
        //
        //   export default expr;
        //
        // to
        //
        //   // top level
        //   var default_1;
        //   export { default_1 as default };
        //
        //   // body
        //   default_1 = expr;

        defaultExportBinding = factory.createUniqueName("_default", GeneratedIdentifierFlags.ReservedInNestedScopes | GeneratedIdentifierFlags.FileLevel | GeneratedIdentifierFlags.Optimistic);
        hoistBindingIdentifier(defaultExportBinding, /*isExport*/ true, "default", node);

        // give a class or function expression an assigned name, if needed.
        let expression = node.expression;
        const innerExpression = skipOuterExpressions(expression);
        if ((isFunctionExpression(innerExpression) || isClassExpression(innerExpression)) && !innerExpression.name) {
            expression = emitHelpers().createSetFunctionNameHelper(expression, factory.createStringLiteral("default"));
        }

        const assignment = factory.createAssignment(defaultExportBinding, expression);
        return factory.createExpressionStatement(assignment);
    }

    function hoistExportEquals(node: ExportAssignment) {
        // NOTE: `node` has already been visited
        if (exportEqualsBinding) {
            // invalid case of multiple `export default` declarations. Don't assert here, just pass it through
            return node;
        }

        // converts
        //
        //   export = expr;
        //
        // to
        //
        //   // top level
        //   var default_1;
        //
        //   try {
        //       // body
        //       default_1 = expr;
        //   } ...
        //
        //   // top level suffix
        //   export = default_1;

        exportEqualsBinding = factory.createUniqueName("_default", GeneratedIdentifierFlags.ReservedInNestedScopes | GeneratedIdentifierFlags.FileLevel | GeneratedIdentifierFlags.Optimistic);
        hoistVariableDeclaration(exportEqualsBinding);

        // give a class or function expression an assigned name, if needed.
        const assignment = factory.createAssignment(exportEqualsBinding, node.expression);
        return factory.createExpressionStatement(assignment);
    }

    function hoistClassDeclaration(node: ClassDeclaration) {
        // NOTE: `node` has already been visited
        if (!node.name && defaultExportBinding) {
            // invalid case of multiple `export default` declarations. Don't assert here, just pass it through
            return node;
        }

        const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
        const isDefault = hasSyntacticModifier(node, ModifierFlags.Default);
        let expression: Expression = factory.converters.convertToClassExpression(node);
        if (isDefault && !defaultExportBinding) {
            defaultExportBinding = factory.createUniqueName("default");
            hoistBindingIdentifier(defaultExportBinding, /*isExport*/ true, "default", node);
            if (isClassExpression(expression) && !expression.name) {
                expression = emitHelpers().createSetFunctionNameHelper(expression, factory.createStringLiteral("default"));
            }
            expression = factory.createAssignment(defaultExportBinding, expression);
            setOriginalNode(expression, node);
        }

        if (node.name) {
            hoistBindingIdentifier(factory.getLocalName(node), isExported && !isDefault, /*exportAlias*/ undefined, node);
            expression = factory.createAssignment(factory.getDeclarationName(node), expression);
            setOriginalNode(expression, node);
            setSourceMapRange(expression, node);
            setCommentRange(expression, node);
        }

        return factory.createExpressionStatement(expression);
    }

    function hoistVariableStatement(node: VariableStatement) {
        // NOTE: `node` has already been visited
        let expressions: Expression[] | undefined;
        const isExported = hasSyntacticModifier(node, ModifierFlags.Export);
        for (const variable of node.declarationList.declarations) {
            hoistBindingElement(variable, isExported, variable);
            if (variable.initializer) {
                expressions = append(expressions, hoistInitializedVariable(variable));
            }
        }
        if (expressions) {
            const statement = factory.createExpressionStatement(factory.inlineExpressions(expressions));
            setOriginalNode(statement, node);
            setCommentRange(statement, node);
            setSourceMapRange(statement, node);
            return statement;
        }
        return undefined;
    }

    function hoistInitializedVariable(node: VariableDeclaration) {
        // NOTE: `node` has already been visited
        Debug.assertIsDefined(node.initializer);
        let target: Expression;
        if (isIdentifier(node.name)) {
            target = factory.cloneNode(node.name);
            setEmitFlags(target, getEmitFlags(target) & ~(EmitFlags.LocalName | EmitFlags.ExportName | EmitFlags.InternalName));
        }
        else {
            target = factory.converters.convertToAssignmentPattern(node.name);
        }

        const assignment = factory.createAssignment(target, node.initializer);
        setOriginalNode(assignment, node);
        setCommentRange(assignment, node);
        setSourceMapRange(assignment, node);
        return assignment;
    }

    function hoistBindingElement(node: VariableDeclaration | BindingElement, isExportedDeclaration: boolean, original: Node | undefined) {
        // NOTE: `node` has already been visited
        if (isBindingPattern(node.name)) {
            for (const element of node.name.elements) {
                if (!isOmittedExpression(element)) {
                    hoistBindingElement(element, isExportedDeclaration, original);
                }
            }
        }
        else {
            hoistBindingIdentifier(node.name, isExportedDeclaration, /*exportAlias*/ undefined, original);
        }
    }

    function hoistBindingIdentifier(node: Identifier, isExport: boolean, exportAlias: string | Identifier | undefined, original: Node | undefined) {
        // NOTE: `node` has already been visited
        const name = isGeneratedIdentifier(node) ? node : factory.cloneNode(node);
        if (isExport) {
            if (exportAlias === undefined) {
                const varDecl = factory.createVariableDeclaration(name);
                if (original) {
                    setOriginalNode(varDecl, original);
                }
                exportVars.push(varDecl);
                return;
            }

            const specifier = factory.createExportSpecifier(/*isTypeOnly*/ false, name, exportAlias);
            if (original) {
                setOriginalNode(specifier, original);
            }
            exportBindings.set(name, specifier);
        }
        hoistVariableDeclaration(name);
    }

    function createEnvBinding() {
        return factory.createUniqueName("env");
    }

    function createDownlevelUsingStatements(bodyStatements: readonly Statement[], envBinding: Identifier, async: boolean) {
        const statements: Statement[] = [];
        const envObject = factory.createObjectLiteralExpression([
            factory.createPropertyAssignment("stack", factory.createArrayLiteralExpression()),
            factory.createPropertyAssignment("error", factory.createVoidZero()),
            factory.createPropertyAssignment("hasError", factory.createFalse())
        ]);
        const envVar = factory.createVariableDeclaration(envBinding, /*exclamationToken*/ undefined, /*type*/ undefined, envObject);
        const envVarList = factory.createVariableDeclarationList([envVar], NodeFlags.Const);
        const envVarStatement = factory.createVariableStatement(/*modifiers*/ undefined, envVarList);
        statements.push(envVarStatement);

        const tryBlock = factory.createBlock(bodyStatements, /*multiLine*/ true);
        const bodyCatchBinding = factory.createUniqueName("e");
        const catchClause = factory.createCatchClause(
            bodyCatchBinding,
            factory.createBlock([
                factory.createExpressionStatement(
                    factory.createAssignment(
                        factory.createPropertyAccessExpression(envBinding, "error"),
                        bodyCatchBinding)
                ),
                factory.createExpressionStatement(
                    factory.createAssignment(
                        factory.createPropertyAccessExpression(envBinding, "hasError"),
                        factory.createTrue())
                ),
            ], /*multiLine*/ true)
        );

        let finallyBlock: Block;
        if (async) {
            const result = factory.createUniqueName("result");
            finallyBlock = factory.createBlock([
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList([
                        factory.createVariableDeclaration(
                            result,
                            /*exclamationToken*/ undefined,
                            /*type*/ undefined,
                            emitHelpers().createDisposeResourcesHelper(envBinding)
                        )
                    ], NodeFlags.Const)
                ),
                factory.createIfStatement(result, factory.createExpressionStatement(factory.createAwaitExpression(result)))
            ], /*multiLine*/ true);
        }
        else {
            finallyBlock = factory.createBlock([
                factory.createExpressionStatement(
                    emitHelpers().createDisposeResourcesHelper(envBinding)
                )
            ], /*multiLine*/ true);
        }

        const tryStatement = factory.createTryStatement(tryBlock, catchClause, finallyBlock);
        statements.push(tryStatement);

        return statements;
    }
}

function countPrologueStatements(statements: readonly Statement[]) {
    for (let i = 0; i < statements.length; i++) {
        if (!isPrologueDirective(statements[i]) && !isCustomPrologue(statements[i])) {
            return i;
        }
    }
    return 0;
}

function isUsingVariableDeclarationList(node: Node): node is VariableDeclarationList & { _usingBrand: any } {
    return isVariableDeclarationList(node) && getUsingKindOfVariableDeclarationList(node) !== UsingKind.None;
}

function getUsingKindOfVariableDeclarationList(node: VariableDeclarationList) {
    return (node.flags & NodeFlags.BlockScoped) === NodeFlags.AwaitUsing ? UsingKind.Async :
        (node.flags & NodeFlags.BlockScoped) === NodeFlags.Using ? UsingKind.Sync :
        UsingKind.None;
}

function getUsingKindOfVariableStatement(node: VariableStatement) {
    return getUsingKindOfVariableDeclarationList(node.declarationList);
}

function getUsingKind(statement: Statement): UsingKind {
    return isVariableStatement(statement) ? getUsingKindOfVariableStatement(statement) : UsingKind.None;
}

function getUsingKindOfStatements(statements: readonly Statement[]/*, inAwaitContext: boolean*/): UsingKind {
    let result = UsingKind.None;
    for (const statement of statements) {
        const usingKind = getUsingKind(statement);
        if (usingKind === UsingKind.Async) return UsingKind.Async;
        if (usingKind > result) result = usingKind;
    }
    return result;
}

function getUsingKindOfCaseOrDefaultClauses(clauses: readonly CaseOrDefaultClause[]/*, inAwaitContext: boolean*/): UsingKind {
    let result = UsingKind.None;
    for (const clause of clauses) {
        const usingKind = getUsingKindOfStatements(clause.statements);
        if (usingKind === UsingKind.Async) return UsingKind.Async;
        if (usingKind > result) result = usingKind;
    }
    return result;
}

const enum UsingKind {
    None,
    Sync,
    Async,
}

