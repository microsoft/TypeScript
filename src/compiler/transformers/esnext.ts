/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const {
            endLexicalEnvironment
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
                return visitNodeContainingESNext(node);
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
                    return visitBinaryExpression(node as BinaryExpression, /*needsDestructuringValue*/ true);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(node as ForOfStatement);
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.ArrayBindingPattern:
                    return node;
                case SyntaxKind.Constructor:
                    return visitConstructorDeclaration(node as ConstructorDeclaration);
                case SyntaxKind.MethodDeclaration:
                    return visitMethodDeclaration(node as MethodDeclaration);
                case SyntaxKind.GetAccessor:
                    return visitGetAccessorDeclaration(node as GetAccessorDeclaration);
                case SyntaxKind.SetAccessor:
                    return visitSetAccessorDeclaration(node as SetAccessorDeclaration);
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

        function visitNodeContainingESNext(node: Node) {
            switch (node.kind) {
                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(node as ParenthesizedExpression, /*needsDestructuringValue*/ true);
            }
            return visitEachChild(node, visitor, context);
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
            const objects = chunkObjectLiteralElements(node.properties);
            if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                objects.unshift(createObjectLiteral());
            }
            return createCall(createIdentifier("__assign"), undefined, objects);
        }

        function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            switch (node.expression.kind) {
                case SyntaxKind.ParenthesizedExpression:
                    return updateStatement(node, visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false));
                case SyntaxKind.BinaryExpression:
                    return updateStatement(node, visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false));
            }
            return visitEachChild(node, visitor, context);
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression, needsDestructuringValue: boolean): ParenthesizedExpression {
            if (!needsDestructuringValue) {
                switch (node.expression.kind) {
                    case SyntaxKind.ParenthesizedExpression:
                        return updateParen(node, visitParenthesizedExpression(<ParenthesizedExpression>node.expression, /*needsDestructuringValue*/ false));
                    case SyntaxKind.BinaryExpression:
                        return updateParen(node, visitBinaryExpression(<BinaryExpression>node.expression, /*needsDestructuringValue*/ false));
                }
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         */
        function visitBinaryExpression(node: BinaryExpression, needsDestructuringValue: boolean): Expression {
            if (isDestructuringAssignment(node) && node.left.transformFlags & TransformFlags.ContainsObjectRest) {
                return flattenDestructuringAssignment(
                    context,
                    node,
                    needsDestructuringValue,
                    FlattenLevel.ObjectRest,
                    /*createAssignmentCallback*/ undefined,
                    visitor
                );
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
            if (isBindingPattern(node.name) && node.name.transformFlags & TransformFlags.ContainsObjectRest) {
                return flattenDestructuringBinding(
                    context,
                    node,
                    /*boundValue*/ undefined,
                    /*skipInitializer*/ false,
                    /*recordTempVariablesInLine*/ true,
                    FlattenLevel.ObjectRest,
                    visitor);
            }
            return visitEachChild(node, visitor, context);
        }

        /**
         * Visits a ForOfStatement and converts it into a ES2015-compatible ForOfStatement.
         *
         * @param node A ForOfStatement.
         */
        function visitForOfStatement(node: ForOfStatement): VisitResult<Statement> {
            let leadingStatements: Statement[];
            let temp: Identifier;
            const initializer = skipParentheses(node.initializer);
            if (initializer.transformFlags & TransformFlags.ContainsObjectRest) {
                if (isVariableDeclarationList(initializer)) {
                    temp = createTempVariable(/*recordTempVariable*/ undefined);
                    const firstDeclaration = firstOrUndefined(initializer.declarations);
                    const declarations = flattenDestructuringBinding(
                        context,
                        firstDeclaration,
                        temp,
                        /*skipInitializer*/ true,
                        /*recordTempVariablesInLine*/ true,
                        FlattenLevel.ObjectRest,
                        visitor
                    );
                    if (some(declarations)) {
                        const statement = createVariableStatement(
                            /*modifiers*/ undefined,
                            updateVariableDeclarationList(initializer, declarations),
                            /*location*/ initializer
                        );
                        leadingStatements = append(leadingStatements, statement);
                    }
                }
                else if (isAssignmentPattern(initializer)) {
                    temp = createTempVariable(/*recordTempVariable*/ undefined);
                    const expression = flattenDestructuringAssignment(
                        context,
                        aggregateTransformFlags(createAssignment(initializer, temp, /*location*/ node.initializer)),
                        /*needsValue*/ false,
                        FlattenLevel.ObjectRest,
                        /*createAssignmentCallback*/ undefined,
                        visitor
                    );
                    leadingStatements = append(leadingStatements, createStatement(expression, /*location*/ node.initializer));
                }
            }
            if (temp) {
                const expression = visitNode(node.expression, visitor, isExpression);
                const statement = visitNode(node.statement, visitor, isStatement);
                const block = isBlock(statement)
                    ? updateBlock(statement, createNodeArray(concatenate(leadingStatements, statement.statements), statement.statements))
                    : createBlock(append(leadingStatements, statement), statement, /*multiLine*/ true);
                return updateForOf(
                    node,
                    createVariableDeclarationList(
                        [
                            createVariableDeclaration(temp, /*type*/ undefined, /*initializer*/ undefined, node.initializer)
                        ],
                        node.initializer,
                        NodeFlags.Let
                    ),
                    expression,
                    block
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitParameter(node: ParameterDeclaration): ParameterDeclaration {
            if (node.transformFlags & TransformFlags.ContainsObjectRest) {
                // Binding patterns are converted into a generated name and are
                // evaluated inside the function body.
                return updateParameter(
                    node,
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    node.dotDotDotToken,
                    getGeneratedNameForNode(node),
                    /*type*/ undefined,
                    visitNode(node.initializer, visitor, isExpression)
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitConstructorDeclaration(node: ConstructorDeclaration) {
            return updateConstructor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitParameterList(node.parameters, visitor, context),
                transformFunctionBody(node)
            );
        }

        function visitGetAccessorDeclaration(node: GetAccessorDeclaration) {
            return updateGetAccessor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitNode(node.name, visitor, isPropertyName),
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
        }

        function visitSetAccessorDeclaration(node: SetAccessorDeclaration) {
            return updateSetAccessor(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitNode(node.name, visitor, isPropertyName),
                visitParameterList(node.parameters, visitor, context),
                transformFunctionBody(node)
            );
        }

        function visitMethodDeclaration(node: MethodDeclaration) {
            return updateMethod(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                visitNode(node.name, visitor, isPropertyName),
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
        }

        function visitFunctionDeclaration(node: FunctionDeclaration) {
            return updateFunctionDeclaration(
                node,
                /*decorators*/ undefined,
                node.modifiers,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
        }

        function visitArrowFunction(node: ArrowFunction) {
            return updateArrowFunction(
                node,
                node.modifiers,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
        }

        function visitFunctionExpression(node: FunctionExpression) {
            return updateFunctionExpression(
                node,
                node.modifiers,
                node.name,
                /*typeParameters*/ undefined,
                visitParameterList(node.parameters, visitor, context),
                /*type*/ undefined,
                transformFunctionBody(node)
            );
        }

        function transformFunctionBody(node: FunctionDeclaration | FunctionExpression | ConstructorDeclaration | MethodDeclaration | AccessorDeclaration): FunctionBody;
        function transformFunctionBody(node: ArrowFunction): ConciseBody;
        function transformFunctionBody(node: FunctionLikeDeclaration): ConciseBody {
            let leadingStatements: Statement[];
            for (const parameter of node.parameters) {
                if (parameter.transformFlags & TransformFlags.ContainsObjectRest) {
                    const temp = getGeneratedNameForNode(parameter);
                    const declarations = flattenDestructuringBinding(context, parameter, temp, /*skipInitializer*/ true, /*recordTempVariablesInLine*/ true, FlattenLevel.ObjectRest, visitor);
                    if (some(declarations)) {
                        const statement = createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(
                                declarations
                            )
                        );
                        setEmitFlags(statement, EmitFlags.CustomPrologue);
                        leadingStatements = append(leadingStatements, statement);
                    }
                }
            }
            const body = visitNode(node.body, visitor, isConciseBody);
            const trailingStatements = endLexicalEnvironment();
            if (some(leadingStatements) || some(trailingStatements)) {
                const block = convertToFunctionBody(body, /*multiLine*/ true);
                return updateBlock(block, createNodeArray(concatenate(concatenate(leadingStatements, block.statements), trailingStatements), block.statements));
            }
            return body;
        }
    }
}
