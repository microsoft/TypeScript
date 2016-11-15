/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const {
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
                if (e.kind === SyntaxKind.SpreadAssignment) {
                    if (chunkObject) {
                        objects.push(createObjectLiteral(chunkObject));
                        chunkObject = undefined;
                    }
                    const target = (e as SpreadAssignment).expression;
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
            if (forEach(node.properties, p => p.kind === SyntaxKind.SpreadAssignment)) {
                const objects = chunkObjectLiteralElements(node.properties);
                if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                    objects.unshift(createObjectLiteral());
                }

                return aggregateTransformFlags(createCall(createIdentifier("__assign"), undefined, objects));
            }
            return visitEachChild(node, visitor, context);
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

            return convertForOf(node, undefined, visitor, noop, context, /*transformRest*/ true);
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
            const hasRest = forEach(node.parameters, isObjectRestParameter);
            const body = hasRest ?
                transformFunctionBody(node, visitor, currentSourceFile, context, noop, /*convertObjectRest*/ true) as Block :
                visitEachChild(node.body, visitor, context);

            return setOriginalNode(
                createFunctionDeclaration(
                    /*decorators*/ undefined,
                    node.modifiers,
                    node.asteriskToken,
                    node.name,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    body,
                    /*location*/ node
                ),
                /*original*/ node);
        }

        function visitArrowFunction(node: ArrowFunction) {
            const hasRest = forEach(node.parameters, isObjectRestParameter);
            const body = hasRest ?
                transformFunctionBody(node, visitor, currentSourceFile, context, noop, /*convertObjectRest*/ true) as Block :
                visitEachChild(node.body, visitor, context);
            const func = setOriginalNode(
                createArrowFunction(
                    node.modifiers,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    node.equalsGreaterThanToken,
                    body,
                    /*location*/ node
                ),
                /*original*/ node
            );
            setEmitFlags(func, EmitFlags.CapturesThis);
            return func;
        }

        function visitFunctionExpression(node: FunctionExpression): Expression {
            const hasRest = forEach(node.parameters, isObjectRestParameter);
            const body = hasRest ?
                transformFunctionBody(node, visitor, currentSourceFile, context, noop, /*convertObjectRest*/ true) as Block :
                visitEachChild(node.body, visitor, context);
            return setOriginalNode(
                createFunctionExpression(
                    node.modifiers,
                    node.asteriskToken,
                    name,
                    /*typeParameters*/ undefined,
                    visitNodes(node.parameters, visitor, isParameter),
                    /*type*/ undefined,
                    body,
                    /*location*/ node
                ),
                /*original*/ node
            );
        }
    }
}
