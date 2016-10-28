/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const { hoistVariableDeclaration } = context;
        let enclosingVariableStatement: VariableStatement;
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
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
                    return visitBinaryExpression(<BinaryExpression>node);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(<VariableDeclaration>node);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(<ForOfStatement>node);
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
            Debug.assert(isDestructuringAssignment(node));
            return flattenDestructuringAssignment(context, node, /*needsDestructuringValue*/ true, hoistVariableDeclaration, visitor, /*restOnly*/ true);
        }

        /**
         * Visits a VariableDeclaration node with a binding pattern.
         *
         * @param node A VariableDeclaration node.
         */
        function visitVariableDeclaration(node: VariableDeclaration): VisitResult<VariableDeclaration> {
            // If we are here it is because the name contains a binding pattern.
            if (isBindingPattern(node.name)) {
                // TOOD: Handle enclosingVariableStatement correctly so that exports work right
                // (this is the case that Ron warned me about, perhaps? but it doesn't seem to require destructuring or System, so maybe not)
                const recordTempVariablesInLine = !enclosingVariableStatement
                    || !hasModifier(enclosingVariableStatement, ModifierFlags.Export);
                return flattenVariableDestructuring(node, /*value*/ undefined, visitor,
                                                    recordTempVariablesInLine ? undefined : hoistVariableDeclaration, /*restOnly*/ true);
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
            // TODO: Is the following needed?
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
                    /*restOnly*/ true
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
                            /*restOnly*/ true
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

        function isRestBindingPattern(initializer: ForInitializer): boolean {
            if (isVariableDeclarationList(initializer)) {
                const declaration = firstOrUndefined(initializer.declarations);
                if (declaration && isBindingPattern(declaration.name)) {
                    const elements = (declaration.name as ObjectBindingPattern).elements;
                    return elements.length && !!elements[elements.length - 1].dotDotDotToken;
                }
            }
            return false;
        }

        function isRestAssignment(initializer: ForInitializer): boolean {
            if (initializer.kind === SyntaxKind.ObjectLiteralExpression) {
                const properties = (initializer as ObjectLiteralExpression).properties;
                return properties[properties.length - 1].kind === SyntaxKind.SpreadElementExpression;
            }
            return false;
        }
    }
}
