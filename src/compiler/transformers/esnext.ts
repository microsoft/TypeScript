/// <reference path="../factory.ts" />
/// <reference path="../visitor.ts" />

/*@internal*/
namespace ts {
    export function transformESNext(context: TransformationContext) {
        const {
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
        } = context;
        return transformSourceFile;

        function transformSourceFile(node: SourceFile) {
            if (isDeclarationFile(node)) {
                return node;
            }

            const visited = visitEachChild(node, visitor, context);
            addEmitHelpers(visited, context.readEmitHelpers());
            return visited;
        }

        function visitor(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*noDestructuringValue*/ false);
        }

        function visitorNoDestructuringValue(node: Node): VisitResult<Node> {
            return visitorWorker(node, /*noDestructuringValue*/ true);
        }

        function visitorWorker(node: Node, noDestructuringValue: boolean): VisitResult<Node> {
            if ((node.transformFlags & TransformFlags.ContainsESNext) === 0) {
                return node;
            }

            switch (node.kind) {
                case SyntaxKind.ObjectLiteralExpression:
                    return visitObjectLiteralExpression(node as ObjectLiteralExpression);
                case SyntaxKind.BinaryExpression:
                    return visitBinaryExpression(node as BinaryExpression, noDestructuringValue);
                case SyntaxKind.VariableDeclaration:
                    return visitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.ForOfStatement:
                    return visitForOfStatement(node as ForOfStatement);
                case SyntaxKind.ForStatement:
                    return visitForStatement(node as ForStatement);
                case SyntaxKind.VoidExpression:
                    return visitVoidExpression(node as VoidExpression);
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
                case SyntaxKind.ExpressionStatement:
                    return visitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.ParenthesizedExpression:
                    return visitParenthesizedExpression(node as ParenthesizedExpression, noDestructuringValue);
                case SyntaxKind.CallExpression:
                    return visitCallExpression(node as CallExpression);
                case SyntaxKind.NewExpression:
                    return visitNewExpression(node as NewExpression);
                case SyntaxKind.OperatorExpression:
                    return visitOperatorExpression(node as OperatorExpression);
                case SyntaxKind.BindExpression:
                    return visitBindExpression(node as BindExpression);
                case SyntaxKind.BindToExpression:
                    return visitBindToExpression(node as BindToExpression);
                case SyntaxKind.PropertyAccessExpression:
                    return visitPropertyAccess(node as PropertyAccessExpression);
                case SyntaxKind.ElementAccessExpression:
                    return visitElementAccess(node as ElementAccessExpression);
                default:
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
            if (node.transformFlags & TransformFlags.ContainsObjectSpread) {
                // spread elements emit like so:
                // non-spread elements are chunked together into object literals, and then all are passed to __assign:
                //     { a, ...o, b } => __assign({a}, o, {b});
                // If the first element is a spread element, then the first argument to __assign is {}:
                //     { ...o, a, b, ...o2 } => __assign({}, o, {a, b}, o2)
                const objects = chunkObjectLiteralElements(node.properties);
                if (objects.length && objects[0].kind !== SyntaxKind.ObjectLiteralExpression) {
                    objects.unshift(createObjectLiteral());
                }
                return createAssignHelper(context, objects);
            }
            return visitEachChild(node, visitor, context);
        }

        function visitExpressionStatement(node: ExpressionStatement): ExpressionStatement {
            return visitEachChild(node, visitorNoDestructuringValue, context);
        }

        function visitParenthesizedExpression(node: ParenthesizedExpression, noDestructuringValue: boolean): ParenthesizedExpression {
            return visitEachChild(node, noDestructuringValue ? visitorNoDestructuringValue : visitor, context);
        }

        /**
         * Visits a BinaryExpression that contains a destructuring assignment.
         *
         * @param node A BinaryExpression node.
         */
        function visitBinaryExpression(node: BinaryExpression, noDestructuringValue: boolean): Expression {
            if (isDestructuringAssignment(node) && node.left.transformFlags & TransformFlags.ContainsObjectRest) {
                return flattenDestructuringAssignment(
                    node,
                    visitor,
                    context,
                    FlattenLevel.ObjectRest,
                    !noDestructuringValue
                );
            }
            switch (node.operatorToken.kind) {
                case SyntaxKind.CommaToken:
                    return updateBinary(
                        node,
                        visitNode(node.left, visitorNoDestructuringValue, isExpression),
                        visitNode(node.right, noDestructuringValue ? visitorNoDestructuringValue : visitor, isExpression)
                    );
                case SyntaxKind.BarGreaterThanToken:
                    return transformPipelineExpression(<PipelineExpression>node);
                case SyntaxKind.QuestionQuestionToken:
                    return transformCoalesceExpression(<CoalesceExpression>node);
            }
            return visitEachChild(node, visitor, context);
        }

        function transformPipelineExpression(node: PipelineExpression) {
            const argumentList: Expression[] = [];
            if (node.left.kind === SyntaxKind.ParenthesizedExpression) {
                collectPipelineArguments((<ParenthesizedExpression>node.left).expression, argumentList);
            }
            else {
                argumentList.push(visitNode(node.left, visitor, isExpression));
            }
            const func = visitNode(node.right, visitor, isExpression);
            if (func.kind === SyntaxKind.ArrowFunction ||
                func.kind === SyntaxKind.FunctionExpression) {
                return createCall(func, /*typeArguments*/ undefined, argumentList, node);
            }
            else {
                const parameterList: ParameterDeclaration[] = [];
                const innerArgumentList: Expression[] = [];
                for (let i = 0; i < argumentList.length; i++) {
                    const parameter = createParameter();
                    parameterList.push(parameter);
                    innerArgumentList.push(<Identifier>parameter.name);
                }
                return createCall(
                    createArrowFunction(
                        /*modifiers*/ undefined,
                        /*typeParameters*/ undefined,
                        parameterList,
                        /*type*/ undefined,
                        createToken(SyntaxKind.EqualsGreaterThanToken),
                        createCall(
                            func,
                            /*typeArguments*/ undefined,
                            innerArgumentList
                        )
                    ),
                    /*typeArguments*/ undefined,
                    argumentList,
                    node
                );
            }
        }

        function collectPipelineArguments(node: Expression, argumentList: Expression[]) {
            if (isCommaExpression(node)) {
                collectPipelineArguments(node.left, argumentList);
                collectPipelineArguments(node.right, argumentList);
            }
            else {
                argumentList.push(visitNode(node, visitor, isExpression));
            }
        }

        function transformCoalesceExpression(node: CoalesceExpression): Expression {
            const left = visitNode(node.left, visitor, isExpression);
            const right = visitNode(node.right, visitor, isExpression);
            if (isIdentifier(left)) {
                return createConditional(
                    createInequality(left, createNull()),
                    left,
                    right
                );
            }
            else {
                const temp = createTempVariable(hoistVariableDeclaration);
                return createConditional(
                    createInequality(createAssignment(temp, left), createNull()),
                    temp,
                    right
                );
            }
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
                    node,
                    visitor,
                    context,
                    FlattenLevel.ObjectRest
                );
            }
            return visitEachChild(node, visitor, context);
        }

        function visitForStatement(node: ForStatement): VisitResult<Statement> {
            return updateFor(
                node,
                visitNode(node.initializer, visitorNoDestructuringValue, isForInitializer),
                visitNode(node.condition, visitor, isExpression),
                visitNode(node.incrementor, visitor, isExpression),
                visitNode(node.statement, visitor, isStatement)
            );
        }

        function visitVoidExpression(node: VoidExpression) {
            return visitEachChild(node, visitorNoDestructuringValue, context);
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
                        firstDeclaration,
                        visitor,
                        context,
                        FlattenLevel.ObjectRest,
                        temp,
                        /*doNotRecordTempVariablesInLine*/ false,
                        /*skipInitializer*/ true,
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
                        aggregateTransformFlags(createAssignment(initializer, temp, /*location*/ node.initializer)),
                        visitor,
                        context,
                        FlattenLevel.ObjectRest
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
            resumeLexicalEnvironment();
            let leadingStatements: Statement[];
            for (const parameter of node.parameters) {
                if (parameter.transformFlags & TransformFlags.ContainsObjectRest) {
                    const temp = getGeneratedNameForNode(parameter);
                    const declarations = flattenDestructuringBinding(
                        parameter,
                        visitor,
                        context,
                        FlattenLevel.ObjectRest,
                        temp,
                        /*doNotRecordTempVariablesInLine*/ false,
                        /*skipInitializer*/ true,
                    );
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

        function propagateNull<T extends Node>(finishExpression: (node: T, nullableExpression: Expression) => Expression, node: T, nullableExpression: Expression): Expression;
        function propagateNull<T extends Node, U>(finishExpression: (node: T, nullableExpression: Expression, data: U) => Expression, node: T, nullableExpression: Expression, data: U): Expression;
        function propagateNull<T extends Node, U>(finishExpression: (node: T, nullableExpression: Expression, data: U) => Expression, node: T, nullableExpression: Expression, data?: U): Expression {
            if (node.flags & NodeFlags.PropagateNull) {
                if (isIdentifier(nullableExpression)) {
                    return createConditional(
                        createEquality(nullableExpression, createNull()),
                        nullableExpression,
                        finishExpression(node, nullableExpression, data),
                        node
                    );
                }
                else {
                    const temp = createTempVariable(hoistVariableDeclaration);
                    return createConditional(
                        createEquality(
                            createAssignment(temp, nullableExpression),
                            createNull()
                        ),
                        temp,
                        finishExpression(node, temp, data),
                        node
                    );
                }
            }
            return finishExpression(node, nullableExpression, data);
        }

        function visitCallExpression(node: CallExpression): Expression {
            return propagateNull(finishCallExpression, node, visitNode(node.expression, visitor, isExpression));
        }

        function finishCallExpression(node: CallExpression, expression: Expression) {
            if (forEach(node.arguments, isPositionalOrPositionalSpreadElement)) {
                return transformPartialCallExpression(node, expression);
            }
            if (node.flags & NodeFlags.PropagateNull) {
                return setOriginalNode(
                    createCall(
                        expression,
                        /*typeArguments*/ undefined,
                        visitNodes(node.arguments, visitor, isExpression),
                        node
                    ),
                    node
                );
            }
            return updateCall(
                node,
                expression,
                /*typeArguments*/ undefined,
                visitNodes(node.arguments, visitor, isExpression),
            )
        }

        function transformPartialCallExpression(node: CallExpression, expression: Expression) {
            const expressionTemp = createTempVariable(hoistVariableDeclaration);
            const argumentList: Expression[] = [];
            const pendingExpressions: Expression[] = [createAssignment(expressionTemp, expression)];
            const positionalParameters: ParameterDeclaration[] = [];
            let positionalRestParameter: ParameterDeclaration;
            let position = 0;
            for (let i = 0; i < node.arguments.length; i++) {
                let argument = node.arguments[i];
                if (isPositionalElement(argument)) {
                    if (argument.literal) {
                        position = +argument.literal.text;
                    }
                    const parameter = positionalParameters[position] || (positionalParameters[position] = createParameter());
                    argument = <Identifier>parameter.name;
                    position++;
                }
                else if (isPositionalSpreadElement(argument)) {
                    const parameter = positionalRestParameter || (positionalRestParameter = createParameter(/*decorators*/ undefined, /*modifiers*/ undefined, createToken(SyntaxKind.DotDotDotToken)));
                    argument = createSpreadElement(<Identifier>parameter.name);
                }
                else {
                    argument = visitNode(argument, visitor, isExpression);
                    const temp = createTempVariable(hoistVariableDeclaration);
                    pendingExpressions.push(createAssignment(temp, isSpreadElement(argument) ? argument.expression : argument));
                    argument = isSpreadElement(argument) ? createSpreadElement(temp) : temp;
                }
                argumentList.push(argument);
            }
            if (positionalRestParameter) {
                positionalParameters.push(positionalRestParameter);
            }
            for (let i = 0; i < positionalParameters.length; i++) {
                if (!positionalParameters[i]) {
                    positionalParameters[i] = createParameter();
                }
            }
            pendingExpressions.push(
                createArrowFunction(
                    /*modifiers*/ undefined,
                    /*typeParameters*/ undefined,
                    positionalParameters,
                    /*type*/ undefined,
                    /*equalsGreaterThanToken*/ createToken(SyntaxKind.EqualsGreaterThanToken),
                    setOriginalNode(
                        createCall(expressionTemp, /*typeArguments*/ undefined, argumentList, node),
                        node
                    ),
                    /*location*/ node
                )
            );
            return inlineExpressions(pendingExpressions);
        }

        function visitNewExpression(node: NewExpression): Expression {
            return propagateNull(finishNewExpression, node, visitNode(node.expression, visitor, isExpression));
        }

        function finishNewExpression(node: NewExpression, expression: Expression) {
            if (node.flags & NodeFlags.PropagateNull) {
                return setOriginalNode(
                    createNew(
                        expression,
                        /*typeArguments*/ undefined,
                        visitNodes(node.arguments, visitor, isExpression),
                        /*location*/ node
                    ),
                    node
                );
            }
            return updateNew(
                node,
                expression,
                /*typeArguments*/ undefined,
                visitNodes(node.arguments, visitor, isExpression),
            );
        }

        function visitPropertyAccess(node: PropertyAccessExpression): Expression {
            return propagateNull(finishPropertyAccess, node, visitNode(node.expression, visitor, isExpression));
        }

        function finishPropertyAccess(node: PropertyAccessExpression, expression: Expression) {
            if (node.flags & NodeFlags.PropagateNull) {
                return setOriginalNode(
                    createPropertyAccess(
                        expression,
                        node.name,
                        node
                    ),
                    node
                );
            }
            return updatePropertyAccess(
                node,
                expression,
                node.name
            );
        }

        function visitElementAccess(node: ElementAccessExpression): Expression {
            return propagateNull(finishElementAccess, node, visitNode(node.expression, visitor, isExpression));
        }

        function finishElementAccess(node: ElementAccessExpression, expression: Expression) {
            if (node.flags & NodeFlags.PropagateNull) {
                return setOriginalNode(
                    createElementAccess(
                        expression,
                        visitNode(node.argumentExpression, visitor, isExpression),
                        node
                    ),
                    node
                );
            }
            return updateElementAccess(
                node,
                expression,
                visitNode(node.argumentExpression, visitor, isExpression),
            );
        }

        function visitOperatorExpression(node: OperatorExpression) {
            let parameters: ParameterDeclaration[];
            let expression: Expression;
            if (isBinaryOperator(node.operator)) {
                parameters = [createParameter(), createParameter()];
                expression = createBinary(
                    <Identifier>parameters[0].name,
                    node.operator,
                    <Identifier>parameters[1].name
                );
            }
            else {
                parameters = [createParameter()];
                switch (node.operator) {
                    case SyntaxKind.TildePlusToken:
                        expression = createPrefix(SyntaxKind.PlusToken, <Identifier>parameters[0].name, node);
                        break;
                    case SyntaxKind.TildeMinusToken:
                        expression = createPrefix(SyntaxKind.MinusToken, <Identifier>parameters[0].name, node);
                        break;
                    case SyntaxKind.TildeToken:
                    case SyntaxKind.ExclamationToken:
                        expression = createPrefix(node.operator, <Identifier>parameters[0].name, node);
                        break;
                    case SyntaxKind.VoidKeyword:
                        expression = createVoid(<Identifier>parameters[0].name, node);
                        break;
                    case SyntaxKind.TypeOfKeyword:
                        expression = createTypeOf(<Identifier>parameters[0].name, node);
                        break;
                }
            }
            return createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                createToken(SyntaxKind.EqualsGreaterThanToken),
                expression,
                node
            );
        }

        function visitBindExpression(node: BindExpression) {
            const operand = visitNode(node.expression, visitor, isExpression);
            if (operand.kind === SyntaxKind.PropertyAccessExpression
                || operand.kind === SyntaxKind.ElementAccessExpression) {
                const { target, thisArg } = createCallBinding(operand, hoistVariableDeclaration);
                return createFunctionBind(target, thisArg, [], node);
            }
            else {
                return createFunctionBind(operand, createNull(), [], node);
            }
        }

        function visitBindToExpression(node: BindToExpression) {
            const targetExpression = visitNode(node.targetExpression, visitor, isExpression);
            const expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
            if (isIdentifier(targetExpression)) {
                return createFunctionBind(expression, targetExpression, [], node);
            }
            const thisArg = createTempVariable(context.hoistVariableDeclaration);
            return createComma(
                createAssignment(
                    thisArg,
                    targetExpression,
                    node.targetExpression
                ),
                createFunctionBind(expression, thisArg, [], node)
            );
        }
    }

    const assignHelper: EmitHelper = {
        name: "typescript:assign",
        scoped: false,
        priority: 1,
        text: `
            var __assign = (this && this.__assign) || Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) {
                    s = arguments[i];
                    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
                }
                return t;
            };`
    };

    export function createAssignHelper(context: TransformationContext, attributesSegments: Expression[]) {
        context.requestEmitHelper(assignHelper);
        return createCall(
            getHelperName("__assign"),
            /*typeArguments*/ undefined,
            attributesSegments
        );
    }
}
