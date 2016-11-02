/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const {
            startLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
        } = context;
        let currentSourceFile: SourceFile;
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            currentSourceFile = node;
            return visitEachChild(node, visitor, context);
        }

        function visitor(node: Node): VisitResult<Node> {
            if (node.transformFlags & TransformFlags.ESNext) {
                return visitorWorker(node);
            }
            else if (node.transformFlags & TransformFlags.ContainsESNext) {
                return visitEachChild(node, visitor, context);
            }
            else {
                return node;
            }
        }

        function visitorWorker(node: Node): VisitResult<Node> {
            switch (node.kind) {
                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(node as ObjectLiteralExpression);
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(node as BinaryExpression);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(node as ForOfStatement);
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.ArrayBindingPattern:
                    return node;
                case SyntaxKind.FunctionDeclaration:
                    return visitFunctionDeclaration(node as FunctionDeclaration);
                case SyntaxKind.FunctionExpression:
                    return visitFunctionExpression(node as FunctionExpression);
                case SyntaxKind.ArrowFunction:
                    return visitArrowFunction(node as ArrowFunction);
                case SyntaxKind.Parameter:
                    return visitParameter(node as ParameterDeclaration);
                default:
                    Debug.failBadSyntaxKind(node);
                    return visitEachChild(node, visitor, context);
            }
        }

        function chunkObjectLiteralElements(elements: ObjectLiteralElement[]): Expression[] {
            let chunkObject: (ShorthandPropertyAssignment | PropertyAssignment)[];
            const objects: Expression[] = [];
            for (const e of elements) {
                if (e.kind === SyntaxKind.SpreadElementExpression) {
                    if (chunkObject) {
                        objects.push(createObjectLiteral(chunkObject));
                        chunkObject = undefined;
                    }
                    const target = (e as SpreadElementExpression).expression;
                    objects.push(visitNode(target, visitor, isExpression));
                }
                else {
                    if (!chunkObject) {
                        chunkObject = [];
                    }
                    if (e.kind === SyntaxKind.PropertyAssignment) {
                        const p = e as PropertyAssignment;
                        chunkObject.push(createPropertyAssignment(p.name, visitNode(p.initializer, visitor, isExpression)));
                    }
                    else {
                        chunkObject.push(e as ShorthandPropertyAssignment);
                    }
                }
            }
            if (chunkObject) {
                objects.push(createObjectLiteral(chunkObject));
            }

            return objects;
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression): Expression {
            // spread elements emit like so:
            // non-spread elements are chunked together into object literals, and then all are passed to __assign:
            //     { a, ...o, b } => __assign({a}, o, {b});
            // If the first element is a spread element, then the first argument to __assign is {}:
            //     { ...o, a, b, ...o2 } => __assign({}, o, {a, b}, o2)
            const objects = chunkObjectLiteralElements(node.properties);
            if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                objects.unshift(createObjectLiteral());
            }
            return createCall(createIdentifier("__assign"), undefined, objects);
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         */
        function visitBinaryExpression(node: BinaryExpression): Expression {
            if (isDestructuringAssignment(node) && node.left.transformFlags & TransformFlags.AssertESNext) {
                return flattenDestructuringAssignment(context, node, /*needsDestructuringValue*/ true, hoistVariableDeclaration, visitor, /*transformRest*/ true);
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a VariableDeclaration node with a binding pattern.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
            // If we are here it is because the name contains a binding pattern with a rest somewhere in it.
            if (isBindingPattern(node.name) && node.name.transformFlags & TransformFlags.AssertESNext) {
                const result = flattenVariableDestructuring(node, /*value*/ undefined, visitor, /*recordTempVariable*/ undefined, /*transformRest*/ true);
                return result;
            }

            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a ForOfStatement and converts it into a ES2015-compatible ForOfStatement.
         *
         * @param node A ForOfStatement.
         */
        function visitForOfStatement(node: ForOfStatement): VisitResult<Statement> {
            // The following ESNext code:
            //
            //    for (let { x, y, ...rest } of expr) { }
            //
            // should be emitted as
            //
            //    for (var _a of expr) {
            //        let { x, y } = _a, rest = __rest(_a, ["x", "y"]);
            //    }
            //
            // where _a is a temp emitted to capture the RHS.
            // When the left hand side is an expression instead of a let declaration,
            // the `let` before the `{ x, y }` is not emitted.
            // When the left hand side is a let/const, the v is renamed if there is
            // another v in scope.
            // Note that all assignments to the LHS are emitted in the body, including
            // all destructuring.
            // Note also that because an extra statement is needed to assign to the LHS,
            // for-of bodies are always emitted as blocks.

            // for (<init> of <expression>) <statement>
            // where <init> is [let] variabledeclarationlist | expression
            const initializer = node.initializer;
            if (!isRestBindingPattern(initializer) && !isRestAssignment(initializer)) {
                return visitEachChild(node, visitor, context);
            }

            const expression = visitNode(node.expression, visitor, isExpression);
            const statements: Statement[] = [];
            const rhsReference = createTempVariable(/*recordTempVariable*/ undefined);

            // var { x, y } = _a, rest = __rest(_a, ["x", "y"]);
            if (isVariableDeclarationList(initializer)) {
                // This works whether the declaration is a var, let, or const.
                // It will use rhsReference _a as the initializer.
                const declarations = flattenVariableDestructuring(
                    initializer.declarations[0],
                    rhsReference,
                    visitor,
                    /*recordTempVariable*/ undefined,
                    /*transformRest*/ true,
                );

                const declarationList = createVariableDeclarationList(declarations, /*location*/ initializer);
                setOriginalNode(declarationList, initializer);

                // Adjust the source map range for the first declaration to align with the old
                // emitter.
                const firstDeclaration = declarations[0];
                const lastDeclaration = lastOrUndefined(declarations);
                setSourceMapRange(declarationList, createRange(firstDeclaration.pos, lastDeclaration.end));

                statements.push(
                    createVariableStatement(
                        /*modifiers*/ undefined,
                        declarationList
                    )
                );
            }
            else {
                // Initializer is an object literal destructuring assignment.
                // Emit the flattened assignments from the object literal expression in the body
                const assignment = createAssignment(initializer, rhsReference);
                statements.push(
                    createStatement(
                        flattenDestructuringAssignment(
                            context,
                            assignment,
                            /*needsValue*/ false,
                            hoistVariableDeclaration,
                            visitor,
                            /*transformRest*/ true
                        )
                    )
                );
            }

            let bodyLocation: TextRange;
            let statementsLocation: TextRange;
            const statement = visitNode(node.statement, visitor, isStatement);
            if (isBlock(statement)) {
                addRange(statements, statement.statements);
                bodyLocation = statement;
                statementsLocation = statement.statements;
            }
            else {
                statements.push(statement);
            }

            // The old emitter does not emit source maps for the expression
            setEmitFlags(expression, EmitFlags.NoSourceMap | getEmitFlags(expression));

            // The old emitter does not emit source maps for the block.
            // We add the location to preserve comments.
            const body = createBlock(
                createNodeArray(statements, /*location*/ statementsLocation),
                /*location*/ bodyLocation
            );

            setEmitFlags(body, EmitFlags.NoSourceMap | EmitFlags.NoTokenSourceMaps);

            const forStatement = createForOf(
                createVariableDeclarationList([
                    createVariableDeclaration(rhsReference, /*type*/ undefined, /*initializer*/ undefined, /*location*/ node.expression)
                ], /*location*/ node.expression),
                node.expression,
                body,
                /*location*/ node
            );

            // Disable trailing source maps for the OpenParenToken to align source map emit with the old emitter.
            setEmitFlags(forStatement, EmitFlags.NoTokenTrailingSourceMaps);
            return forStatement;
        }

        function isRestBindingPattern(initializer: ForInitializer) {
            if (isVariableDeclarationList(initializer)) {
                const declaration = firstOrUndefined(initializer.declarations);
                return declaration && declaration.name &&
                    declaration.name.kind === SyntaxKind.ObjectBindingPattern &&
                    !!(declaration.name.transformFlags & TransformFlags.ContainsSpreadExpression);
            }
            return false;
        }

        function isRestAssignment(initializer: ForInitializer) {
            return initializer.kind === SyntaxKind.ObjectLiteralExpression &&
                initializer.transformFlags & TransformFlags.ContainsSpreadExpression;
        }

        function visitParameter(node: ParameterDeclaration): ParameterDeclaration {
            if (isObjectRestParameter(node)) {
                // Binding patterns are converted into a generated name and are
                // evaluated inside the function body.
                return setOriginalNode(
                    createParameter(
                        /*decorators*/ undefined,
                        /*modifiers*/ undefined,
                        /*dotDotDotToken*/ undefined,
                        getGeneratedNameForNode(node),
                        /*questionToken*/ undefined,
                        /*type*/ undefined,
                        node.initializer,
                        /*location*/ node
                    ),
                    /*original*/ node
                );
            }
            else {
                return node;
            }
        }

        function isObjectRestParameter(node: ParameterDeclaration) {
            return node.name &&
                node.name.kind === SyntaxKind.ObjectBindingPattern &&
                !!(node.name.transformFlags & TransformFlags.ContainsSpreadExpression);
        }

        function visitFunctionDeclaration(node: FunctionDeclaration): FunctionDeclaration {
            return setOriginalNode(
                createFunctionDeclaration(
                    /*decorators*/ undefined,
                    node.modifiers,
                    node.asteriskToken,
                    node.name,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    transformFunctionBody(node) as Block,
                    /*location*/ node
                ),
                /*original*/ node);
        }

        function visitArrowFunction(node: ArrowFunction) {
            const func = setOriginalNode(
                createArrowFunction(
                    /*modifiers*/ undefined,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    node.equalsGreaterThanToken,
                    transformFunctionBody(node),
                    /*location*/ node
                ),
                /*original*/ node
            );
            setEmitFlags(func, EmitFlags.CapturesThis);
            return func;
        }

        function visitFunctionExpression(node: FunctionExpression): Expression {
            return setOriginalNode(
                createFunctionExpression(
                    /*modifiers*/ undefined,
                    node.asteriskToken,
                    name,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    transformFunctionBody(node) as Block,
                    /*location*/ node
                ),
                /*original*/ node
            );
        }

        /**
         * Transforms the body of a function-like node.
         *
         * @param node A function-like node.
         */
        function transformFunctionBody(node: FunctionLikeDeclaration): Block | Expression {
            const hasRest = forEach(node.parameters, isObjectRestParameter);
            if (!hasRest) {
                return visitEachChild(node.body, visitor, context);
            }

            let multiLine = false; // indicates whether the block *must* be emitted as multiple lines
            let singleLine = false; // indicates whether the block *may* be emitted as a single line
            let statementsLocation: TextRange;
            let closeBraceLocation: TextRange;

            const statements: Statement[] = [];
            const body = node.body;
            let statementOffset: number;

            startLexicalEnvironment();
            if (isBlock(body)) {
                // ensureUseStrict is false because no new prologue-directive should be added.
                // addPrologueDirectives will simply put already-existing directives at the beginning of the target statement-array
                statementOffset = addPrologueDirectives(statements, body.statements, /*ensureUseStrict*/ false, visitor);
            }

            addDefaultValueAssignmentsIfNeeded(statements, node);

            // If we added any generated statements, this must be a multi-line block.
            if (!multiLine && statements.length > 0) {
                multiLine = true;
            }

            if (isBlock(body)) {
                statementsLocation = body.statements;
                addRange(statements, visitNodes(body.statements, visitor, isStatement, statementOffset));

                // If the original body was a multi-line block, this must be a multi-line block.
                if (!multiLine && body.multiLine) {
                    multiLine = true;
                }
            }
            else {
                Debug.assert(node.kind === SyntaxKind.ArrowFunction);

                // To align with the old emitter, we use a synthetic end position on the location
                // for the statement list we synthesize when we down-level an arrow function with
                // an expression function body. This prevents both comments and source maps from
                // being emitted for the end position only.
                statementsLocation = moveRangeEnd(body, -1);

                const equalsGreaterThanToken = (<ArrowFunction>node).equalsGreaterThanToken;
                if (!nodeIsSynthesized(equalsGreaterThanToken) && !nodeIsSynthesized(body)) {
                    if (rangeEndIsOnSameLineAsRangeStart(equalsGreaterThanToken, body, currentSourceFile)) {
                        singleLine = true;
                    }
                    else {
                        multiLine = true;
                    }
                }

                const expression = visitNode(body, visitor, isExpression);
                const returnStatement = createReturn(expression, /*location*/ body);
                setEmitFlags(returnStatement, EmitFlags.NoTokenSourceMaps | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTrailingComments);
                statements.push(returnStatement);

                // To align with the source map emit for the old emitter, we set a custom
                // source map location for the close brace.
                closeBraceLocation = body;
            }

            const lexicalEnvironment = endLexicalEnvironment();
            addRange(statements, lexicalEnvironment);

            // If we added any final generated statements, this must be a multi-line block
            if (!multiLine && lexicalEnvironment && lexicalEnvironment.length) {
                multiLine = true;
            }

            const block = createBlock(createNodeArray(statements, statementsLocation), node.body, multiLine);
            if (!multiLine && singleLine) {
                setEmitFlags(block, EmitFlags.SingleLine);
            }

            if (closeBraceLocation) {
                setTokenSourceMapRange(block, SyntaxKind.CloseBraceToken, closeBraceLocation);
            }

            setOriginalNode(block, node.body);
            return block;
        }

        function shouldAddDefaultValueAssignments(node: FunctionLikeDeclaration): boolean {
            return !!(node.transformFlags & TransformFlags.ContainsDefaultValueAssignments);
        }

        /**
         * Adds statements to the body of a function-like node if it contains parameters with
         * binding patterns or initializers.
         *
         * @param statements The statements for the new function body.
         * @param node A function-like node.
         */
        function addDefaultValueAssignmentsIfNeeded(statements: Statement[], node: FunctionLikeDeclaration): void {
            if (!shouldAddDefaultValueAssignments(node)) {
                return;
            }

            for (const parameter of node.parameters) {
                // A rest parameter cannot have a binding pattern or an initializer,
                // so let's just ignore it.
                if (parameter.dotDotDotToken) {
                    continue;
                }

                if (isBindingPattern(parameter.name)) {
                    addDefaultValueAssignmentForBindingPattern(statements, parameter);
                }
            }
        }

        /**
         * Adds statements to the body of a function-like node for parameters with binding patterns
         *
         * @param statements The statements for the new function body.
         * @param parameter The parameter for the function.
         */
        function addDefaultValueAssignmentForBindingPattern(statements: Statement[], parameter: ParameterDeclaration): void {
            const temp = getGeneratedNameForNode(parameter);

            // In cases where a binding pattern is simply '[]' or '{}',
            // we usually don't want to emit a var declaration; however, in the presence
            // of an initializer, we must emit that expression to preserve side effects.
            if ((parameter.name as BindingPattern).elements.length > 0) {
                statements.push(
                    setEmitFlags(
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                flattenParameterDestructuring(parameter, temp, visitor, /*transformRest*/ true)
                            )
                        ),
                        EmitFlags.CustomPrologue
                    )
                );
            }
            else if (parameter.initializer) {
                statements.push(
                    setEmitFlags(
                        createStatement(
                            createAssignment(
                                temp,
                                visitNode(parameter.initializer, visitor, isExpression)
                            )
                        ),
                        EmitFlags.CustomPrologue
                    )
                );
            }
        }
    }
}
