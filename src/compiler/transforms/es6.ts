/// <reference path="../checker.ts" />
/*@internal*/
namespace ts {
    export function createES6Transformation(transformer: Transformer): Transformation {
        // create local aliases for transformer methods
        let {
            startLexicalEnvironment,
            endLexicalEnvironment,
            getParentNode,
            findAncestorNode,
            declareLocal,
            getGeneratedNameForNode,
            createTempVariable,
            hoistVariableDeclaration,
            getDeclarationName,
            getClassMemberPrefix,
            pushNode,
            popNode,
            pipeNode,
            pipeNodes,
            mapNode,
            mapNodes,
            flattenNode,
            visitNode,
            visitNodes,
            visitStatement,
            visitConciseBody,
            visitFunctionBody,
            visitModuleBody,
            visitSourceFile,
            accept,
        } = transformer;

        let compilerOptions = transformer.getCompilerOptions();
        let languageVersion = compilerOptions.target || ScriptTarget.ES3;
        let resolver = transformer.getEmitResolver();
        let currentSourceFile: SourceFile;

        return transformES6;

        function transformES6(node: SourceFile): SourceFile {
            if (node.transformFlags & TransformFlags.ContainsES6) {
                return transformES6Worker(node);
            }

            return node;
        }

        function transformES6Worker(node: SourceFile): SourceFile {
            currentSourceFile = node;
            node = visitSourceFile(node, visitor);
            currentSourceFile = undefined;
            return node;
        }

        /**
         * Transforms a node from ES6 to ES5 if it requires any transformations.
         * @param context Context information for the transform.
         * @param node The node to transform.
         * @remarks
         * This function is intentionally kept small to keep its overhead low.
         *
         * If the node needs direct transformation, it will be passed on to the
         * `transformNodeWorker` function.
         *
         * If any part of its subtree needs transformation, the node will be
         * passed to the fallback `accept` function which will ensure any changes
         * to the subtree will generate new nodes.
         *
         * If no part of this node or its subtree requires transformation, the node
         * is returned, unchanged.
         */
        function visitor(node: Node, write: (node: Node) => void): void {
            if (!node) {
                return;
            }

            if (node.transformFlags & TransformFlags.ThisNodeIsES6) {
                visitorWorker(node, write);
            }
            else if (node.transformFlags & TransformFlags.ContainsES6) {
                write(accept(node, visitor));
            }
            else {
                write(node);
            }
        }

        /**
         * Transforms a node from ES6 to ES5.
         * @param context Context information for the transform.
         * @param node The node to transform.
         */
        function visitorWorker(node: Node, write: (node: Node) => void): void {
            switch (node.kind) {
                case SyntaxKind.ClassDeclaration:
                    visitClassDeclaration(<ClassDeclaration>node, write);
                    break;

                case SyntaxKind.ClassExpression:
                    visitClassExpression(<ClassExpression>node, write);
                    break;

                case SyntaxKind.Parameter:
                    visitParameter(<ParameterDeclaration>node, write);
                    break;

                case SyntaxKind.FunctionDeclaration:
                    visitFunctionDeclaration(<FunctionDeclaration>node, write);
                    break;

                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                    visitFunctionExpression(<FunctionExpression>node, write);
                    break;

                case SyntaxKind.VariableStatement:
                    visitVariableStatement(<VariableStatement>node, write);
                    break;

                case SyntaxKind.VariableDeclarationList:
                    visitVariableDeclarationList(<VariableDeclarationList>node, write);
                    break;

                case SyntaxKind.ExpressionStatement:
                    visitExpressionStatement(<ExpressionStatement>node, write);
                    break;

                case SyntaxKind.ForOfStatement:
                    visitForOfStatement(<ForOfStatement>node, write);
                    break;

                case SyntaxKind.ObjectLiteralExpression:
                    visitObjectLiteralExpression(<ObjectLiteralExpression>node, write);
                    break;

                case SyntaxKind.ShorthandPropertyAssignment:
                    visitShorthandPropertyAssignment(<ShorthandPropertyAssignment>node, write);
                    break;

                case SyntaxKind.ArrayLiteralExpression:
                    visitArrayLiteralExpression(<ArrayLiteralExpression>node, write);
                    break;

                case SyntaxKind.CallExpression:
                    visitCallExpression(<CallExpression>node, write);
                    break;

                case SyntaxKind.NewExpression:
                    visitNewExpression(<NewExpression>node, write);
                    break;

                case SyntaxKind.BinaryExpression:
                    visitBinaryExpression(<BinaryExpression>node, write);
                    break;

                case SyntaxKind.NoSubstitutionTemplateLiteral:
                case SyntaxKind.TemplateHead:
                case SyntaxKind.TemplateMiddle:
                case SyntaxKind.TemplateTail:
                    visitTemplateLiteral(<LiteralExpression>node, write);
                    break;

                case SyntaxKind.TaggedTemplateExpression:
                    visitTaggedTemplateExpression(<TaggedTemplateExpression>node, write);
                    break;

                case SyntaxKind.TemplateExpression:
                    visitTemplateExpression(<TemplateExpression>node, write);
                    break;

                case SyntaxKind.SuperKeyword:
                    visitSuperKeyword(<PrimaryExpression>node, write);
                    break;

                case SyntaxKind.ThisKeyword:
                    visitThisKeyword(<PrimaryExpression>node, write);
                    break;

                default:
                    Debug.fail("Encountered unhandled node kind when transforming ES6 syntax.");
                    write(accept(node, visitor));
                    break;
            }
        }

        function visitClassDeclaration(node: ClassDeclaration, write: (node: Statement) => void): void {
            visitClassLikeDeclaration(node, write);
        }

        function visitClassExpression(node: ClassExpression, write: (node: LeftHandSideExpression) => void): void {
            visitClassLikeDeclaration(node, write);
        }

        function visitClassLikeDeclaration(node: ClassLikeDeclaration, write: (node: Expression | Statement) => void): void {
            let name = getDeclarationName(node);
            let statements = flattenNode(node, emitClassBody);
            let baseTypeNode = getClassExtendsHeritageClauseElement(node);
            let functionParameters: ParameterDeclaration[] = [];
            let functionArguments: Expression[] = [];
            if (baseTypeNode) {
                functionParameters.push(createParameter3("_super"));
                functionArguments.push(visitNode(baseTypeNode.expression, visitor, isExpressionNode));
            }

            let classFunction = createFunctionExpression3(functionParameters, createBlock(statements));
            let classExpression = createCallExpression2(createParenthesizedExpression(classFunction), functionArguments);

            if (isClassDeclaration(node)) {
                let classStatement = createVariableStatement3(name, classExpression, /*location*/ node);
                startOnNewLine(classStatement);
                write(classStatement);
            }
            else {
                write(classExpression);
            }
        }

        function emitClassBody(node: ClassLikeDeclaration, write: (node: Statement) => void): void {
            startLexicalEnvironment();
            emitExtendsHelperIfNeeded(node, write);
            emitConstructor(node, write);
            emitMemberFunctions(node, write);
            write(createReturnStatement(getDeclarationName(node)));
            endLexicalEnvironment(write);
        }

        function emitExtendsHelperIfNeeded(node: ClassLikeDeclaration, write: (node: Statement) => void): void {
            if (getClassExtendsHeritageClauseElement(node)) {
                let extendsExpr = createExtendsHelperCall(getDeclarationName(node));
                let extendsStmt = createExpressionStatement(extendsExpr);
                startOnNewLine(extendsStmt);
                write(extendsStmt);
            }
        }

        function emitConstructor(node: ClassLikeDeclaration, write: (node: Statement) => void): void {
            let ctor = getFirstConstructorWithBody(node);
            let parameters: ParameterDeclaration[];
            let statements: Statement[];
            if (ctor) {
                parameters = visitNodes(ctor.parameters, visitor, isParameter);
                statements = flattenNode(ctor, emitConstructorBody);
            }
            else {
                parameters = [];
                statements = [];
                if (getClassExtendsHeritageClauseElement(node)) {
                    statements.push(createDefaultSuperCall());
                }
            }

            let name = getDeclarationName(node);
            let constructorFunction = createFunctionDeclaration2(name, parameters, createBlock(statements));
            startOnNewLine(constructorFunction);
            write(constructorFunction);
        }

        function emitConstructorBody(constructor: ConstructorDeclaration, write: (node: Statement) => void): void {
            startLexicalEnvironment();
            emitCaptureThisForNodeIfNeeded(constructor, write);
            emitDefaultValueAssignments(constructor, write);
            emitRestParameter(constructor, write);
            pipeNodes(constructor.body.statements, visitor, write);
            endLexicalEnvironment(write);
        }

        function visitParameter(node: ParameterDeclaration, write: (node: ParameterDeclaration) => void): void {
            if (isBindingPattern(node.name)) {
                write(createParameter2(getGeneratedNameForNode(node), /*initializer*/ undefined, /*location*/ node));
            }
            else if (node.initializer) {
                write(createParameter2(node.name, /*initializer*/ undefined, /*location*/ node));
            }
            else if (!node.dotDotDotToken) {
                // rest parameters are elided, other parameters are included.
                write(node);
            }
        }

        function shouldEmitDefaultValueAssignments(node: FunctionLikeDeclaration) {
            return (node.transformFlags & TransformFlags.ContainsDefaultValueAssignments);
        }

        function emitDefaultValueAssignments(node: FunctionLikeDeclaration, write: (node: Statement) => void) {
            if (!shouldEmitDefaultValueAssignments(node)) {
                return;
            }

            for (let parameter of node.parameters) {
                let { name, initializer, dotDotDotToken } = parameter;

                // A rest parameter cannot have a binding pattern or an initializer,
                // so let's just ignore it.
                if (dotDotDotToken) {
                    continue;
                }

                if (isBindingPattern(name)) {
                    emitDefaultValueAssignmentForBindingPattern(parameter, name, initializer, write);
                }
                else if (initializer) {
                    emitDefaultValueAssignmentForInitializer(parameter, name, initializer, write);
                }
            }
        }

        function emitDefaultValueAssignmentForBindingPattern(parameter: ParameterDeclaration, name: BindingPattern, initializer: Expression, write: (node: Statement) => void): void {
            let tempName = getGeneratedNameForNode(parameter);

            // In cases where a binding pattern is simply '[]' or '{}',
            // we usually don't want to emit a var declaration; however, in the presence
            // of an initializer, we must emit that expression to preserve side effects.
            let hasBindingElements = name.elements.length > 0;
            if (hasBindingElements) {
                let declarations = flattenNode(parameter, emitParameterBindingElements);
                let varDecls = createVariableDeclarationList(declarations);
                let varStmt = createVariableStatement2(varDecls);
                startOnNewLine(varStmt);
                write(varStmt);
            }
            else if (initializer) {
                let initExpr = visitNode(initializer, visitor, isExpressionNode);
                let assignExpr = createAssignmentExpression(tempName, initExpr);
                let assignStmt = createExpressionStatement(assignExpr);
                startOnNewLine(assignStmt);
                write(assignStmt);
            }
        }

        function emitParameterBindingElements(parameter: ParameterDeclaration, write: (node: VariableDeclaration) => void): void {
            let tempName = getGeneratedNameForNode(parameter);
            emitBindingElement(parameter, tempName, write);
        }

        function emitBindingElement(target: BindingElement, value: Expression, write: (node: VariableDeclaration) => void): void {
            if (target.initializer) {
                // Combine value and initializer
                let initializer = visitNode(target.initializer, visitor, isExpressionNode);
                value = value ? createDefaultValueCheck(value, initializer, /*isVariableDeclarationList*/ true, write) : initializer;
            }
            else if (!value) {
                // Use 'void 0' in absence of value and initializer
                value = createVoidZeroExpression();
            }

            let name = target.name;
            if (isBindingPattern(name)) {
                const elements = name.elements;
                const numElements = elements.length;
                if (numElements !== 1) {
                    // For anything other than a single-element destructuring we need to generate a temporary
                    // to ensure value is evaluated exactly once. Additionally, if we have zero elements
                    // we need to emit *something* to ensure that in case a 'var' keyword was already emitted,
                    // so in that case, we'll intentionally create that temporary.
                    value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ numElements !== 0, /*isVariableDeclarationList*/ true, write);
                }
                for (let i = 0; i < elements.length; i++) {
                    let element = elements[i];
                    if (name.kind === SyntaxKind.ObjectBindingPattern) {
                        // Rewrite element to a declaration with an initializer that fetches property
                        let propName = element.propertyName || <Identifier>element.name;
                        emitBindingElement(element, createPropertyOrElementAccessExpression(value, propName), write);
                    }
                    else if (element.kind !== SyntaxKind.OmittedExpression) {
                        if (!element.dotDotDotToken) {
                            // Rewrite element to a declaration that accesses array element at index i
                            emitBindingElement(element, createElementAccessExpression3(value, i), write);
                        }
                        else if (i === elements.length - 1) {
                            emitBindingElement(element, createSliceCall(value, i), write);
                        }
                    }
                }
            }
            else {
                emitAssignment(name, value, /*isTempVariable*/ false, /*isVariableDeclarationList*/ true, write);
            }
        }

        function emitAssignment(left: Identifier, right: Expression, isTempVariable: boolean, isVariableDeclarationList: boolean, write: (node: Expression | VariableDeclaration) => void): void {
            if (isVariableDeclarationList) {
                write(createVariableDeclaration2(left, right));
            }
            else {
                write(createAssignmentExpression(left, right));
            }
        }

        function ensureIdentifier(value: Expression, reuseIdentifierExpressions: boolean, isVariableDeclarationList: boolean, write: (node: Expression | VariableDeclaration) => void) {
            if (isIdentifier(value) && reuseIdentifierExpressions) {
                return value;
            }
            else {
                let temp = createTempVariable(TempFlags.Auto);
                if (!isVariableDeclarationList) {
                    hoistVariableDeclaration(temp);
                }

                emitAssignment(temp, value, /*isTempVariable*/ true, isVariableDeclarationList, write);
                return temp;
            }
        }

        function createDefaultValueCheck(value: Expression, defaultValue: Expression, isVariableDeclarationList: boolean, write: (node: Expression | VariableDeclaration) => void): Expression {
            value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, isVariableDeclarationList, write);
            let equalityExpr = createStrictEqualityExpression(value, createVoidZeroExpression());
            return createConditionalExpression2(equalityExpr, defaultValue, value);
        }

        function emitDefaultValueAssignmentForInitializer(parameter: ParameterDeclaration, name: Identifier, initializer: Expression, write: (node: Statement) => void): void {
            name = cloneNode(name);
            let equalityExpr = createStrictEqualityExpression(name, createVoidZeroExpression());
            let initExpr = visitNode(initializer, visitor, isExpressionNode);
            let assignExpr = createAssignmentExpression(name, initExpr);
            let assignStmt = createExpressionStatement(assignExpr);
            let trueStmt = createBlock([assignStmt]);
            let ifStmt = createIfStatement(equalityExpr, trueStmt);
            startOnNewLine(ifStmt);
            write(ifStmt);
        }

        function shouldEmitRestParameter(node: ParameterDeclaration) {
            return node.dotDotDotToken && !(node.flags & NodeFlags.GeneratedRest);
        }

        function emitRestParameter(node: FunctionLikeDeclaration, write: (node: Statement) => void): void {
            let lastParam = lastOrUndefined(node.parameters);
            if (!shouldEmitRestParameter(lastParam)) {
                return;
            }

            // var param = [];
            let name = <Identifier>getDeclarationName(lastParam);
            let restIndex = node.parameters.length - 1;
            let paramVarStmt = createVariableStatement3(name, createArrayLiteralExpression([]));
            startOnNewLine(paramVarStmt);
            write(paramVarStmt);

            // for (var _i = restIndex; _i < arguments.length; _i++) {
            let _i = createTempVariable(TempFlags._i);
            let initializerVarDecls = createVariableDeclarationList2(_i, createNumericLiteral2(restIndex));
            let argumentsLength = createPropertyAccessExpression3(createIdentifier("arguments"), "length");
            let condition = createLessThanExpression(_i, argumentsLength);
            let incrementer = createPostfixUnaryExpression(_i, SyntaxKind.PlusPlusToken);

            // param[_i - restIndex] = arguments[_i];
            let arrayOffset = restIndex === 0 ? _i : createSubtractExpression(_i, createNumericLiteral2(restIndex));
            let arrayElement = createElementAccessExpression2(name, arrayOffset);
            let argumentsElement = createElementAccessExpression2(createIdentifier("arguments"), _i);
            let assignExpr = createAssignmentExpression(arrayElement, argumentsElement);
            let assignStmt = createExpressionStatement(assignExpr);
            startOnNewLine(assignStmt);

            let forStmt = createForStatement(initializerVarDecls, condition, incrementer, createBlock([assignStmt]));
            startOnNewLine(forStmt);
            write(forStmt);
        }

        function emitCaptureThisForNodeIfNeeded(node: Node, write: (node: Statement) => void): void {
            if (node.transformFlags & TransformFlags.ContainsCapturedLexicalThis && !isArrowFunction(node)) {
                let thisName = createIdentifier("_this");
                let thisExpr = createThisKeyword();
                let varStmt = createVariableStatement3(thisName, thisExpr);
                startOnNewLine(varStmt);
                write(varStmt);
            }
        }

        function emitMemberFunctions(node: ClassLikeDeclaration, write: (node: Statement) => void): void {
            for (let member of node.members) {
                if (isSemicolonClassElement(member)) {
                    visitSemicolonClassElement(member, write);
                }
                else if (isMethodDeclaration(member)) {
                    visitMethodDeclaration(node, member, write);
                }
                else if (isGetAccessor(member) || isSetAccessor(member)) {
                    let accessors = getAllAccessorDeclarations(node.members, member);
                    if (member === accessors.firstAccessor) {
                        let receiver = getClassMemberPrefix(node, member);
                        emitAccessors(receiver, accessors, /*isStatement*/ true, write);
                    }
                }
            }
        }

        function visitSemicolonClassElement(member: SemicolonClassElement, write: (node: Statement) => void): void {
            let stmt = createEmptyStatement();
            startOnNewLine(stmt);
            write(stmt);
        }

        function visitMethodDeclaration(node: ClassLikeDeclaration, member: MethodDeclaration, write: (node: Statement) => void): void {
            let prefix = getClassMemberPrefix(node, member);
            let propExpr = createMemberAccessForPropertyName(prefix, visitNode(member.name, visitor, isPropertyName));
            let funcExpr = transformFunctionLikeToExpression(member);
            let assignExpr = createAssignmentExpression(propExpr, funcExpr);
            let assignStmt = createExpressionStatement(assignExpr, /*location*/ member);
            startOnNewLine(assignStmt);
            write(assignStmt);
        }

        function emitAccessors(receiver: LeftHandSideExpression, accessors: AllAccessorDeclarations, isStatement: boolean, write: (node: Expression | Statement) => void): void {
            let property = accessors.firstAccessor;
            let propertyName = visitNode(property.name, visitor, isPropertyName);
            let expressionName = createExpressionForPropertyName(propertyName, /*location*/ property.name);
            let getter = accessors.getAccessor && transformFunctionLikeToExpression(accessors.getAccessor, /*location*/ accessors.getAccessor);
            let setter = accessors.setAccessor && transformFunctionLikeToExpression(accessors.setAccessor, /*location*/ accessors.setAccessor);
            let defineCall = createDefinePropertyCall2(receiver, expressionName, getter, setter, /*location*/ property);
            if (isStatement) {
                let statement = createExpressionStatement(defineCall);
                startOnNewLine(statement);
                write(statement);
            }
            else {
                write(defineCall);
            }
        }

        function visitFunctionExpression(node: FunctionExpression, write: (node: Expression) => void): void {
            write(transformFunctionLikeToExpression(node, /*location*/ node, node.name));
        }

        function transformFunctionLikeToExpression(node: FunctionLikeDeclaration, location?: TextRange, name?: Identifier): FunctionExpression {
            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let statements = flattenNode(node, emitFunctionBody);
            return createFunctionExpression2(name, parameters, createBlock(statements), location);
        }

        function visitFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void): void {
            let parameters = visitNodes(node.parameters, visitor, isParameter);
            let statements = flattenNode(node, emitFunctionBody);
            write(createFunctionDeclaration2(node.name, parameters, createBlock(statements), /*location*/ node));
        }

        function emitFunctionBody(node: FunctionLikeDeclaration, write: (node: Statement) => void): void {
            startLexicalEnvironment();
            emitCaptureThisForNodeIfNeeded(node, write);
            emitDefaultValueAssignments(node, write);
            emitRestParameter(node, write);

            let body = node.body;
            if (isBlock(body)) {
                pipeNodes(body.statements, visitor, write);
            }
            else {
                let expr = visitNode(body, visitor, isExpressionNode);
                if (expr) {
                    let returnStmt = createReturnStatement(expr);
                    if (!childNodeStartPositionIsOnSameLine(currentSourceFile, node, body)) {
                        startOnNewLine(returnStmt);
                    }

                    write(returnStmt);
                }
            }
            endLexicalEnvironment(write);
        }

        function visitBinaryExpression(node: BinaryExpression, write: (node: Expression) => void): void {
            // If we are here it is because this is a destructuring assignment.
            if (isEmptyObjectLiteralOrArrayLiteral(node.left)) {
                write(node.right);
            }
            else {
                let expressions = flattenNode(node, emitDestructuringExpressions);
                let expression = inlineExpressions(expressions);
                let parentNode = getParentNode();
                if (!isExpressionStatement(parentNode) && !isParenthesizedExpression(parentNode)) {
                    expression = createParenthesizedExpression(expression);
                }
                write(expression);
            }
        }

        function emitDestructuringExpressions(node: BinaryExpression, write: (node: Expression) => void): void {
            let target = node.left;
            let value = node.right;
            let parentNode = getParentNode();
            if (isExpressionStatement(parentNode)) {
                emitDestructuringAssignment(target, value, write);
            }
            else {
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, /*isVariableDeclarationList*/ false, write);
                emitDestructuringAssignment(target, value, write);
                write(value);
            }
        }

        function emitDestructuringAssignment(target: Expression, value: Expression, write: (node: Expression) => void) {
            if (isBinaryExpression(target) && target.operatorToken.kind === SyntaxKind.EqualsToken) {
                value = createDefaultValueCheck(value, (<BinaryExpression>target).right, /*isVariableDeclarationList*/ false, write);
                target = (<BinaryExpression>target).left;
            }
            if (isObjectLiteralExpression(target)) {
                emitObjectLiteralAssignment(target, value, write);
            }
            else if (isArrayLiteralExpression(target)) {
                emitArrayLiteralAssignment(target, value, write);
            }
            else if (isIdentifier(target)) {
                emitAssignment(target, value, /*isTempVariable*/ false, /*isVariableDeclarationList*/ false, write);
            }
            else {
                Debug.fail();
            }
        }

        function emitObjectLiteralAssignment(target: ObjectLiteralExpression, value: Expression, write: (node: Expression) => void): void {
            let properties = target.properties;
            if (properties.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, /*isVariableDeclarationList*/ false, write);
            }

            for (let p of properties) {
                if (isPropertyAssignment(p) || isShorthandPropertyAssignment(p)) {
                    let propName = <Identifier | LiteralExpression>(<PropertyAssignment>p).name;
                    let expr = createPropertyOrElementAccessExpression(value, propName);
                    emitDestructuringAssignment((<PropertyAssignment>p).initializer || propName, expr, write);
                }
            }
        }

        function emitArrayLiteralAssignment(target: ArrayLiteralExpression, value: Expression, write: (node: Expression) => void): void {
            let elements = target.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = ensureIdentifier(value, /*reuseIdentifierExpressions*/ true, /*isVariableDeclarationList*/ false, write);
            }

            for (let i = 0; i < elements.length; i++) {
                let e = elements[i];
                if (e.kind !== SyntaxKind.OmittedExpression) {
                    if (e.kind !== SyntaxKind.SpreadElementExpression) {
                        emitDestructuringAssignment(e, createElementAccessExpression3(value, i), write);
                    }
                    else if (i === elements.length - 1) {
                        emitDestructuringAssignment((<SpreadElementExpression>e).expression, createSliceCall(value, i), write);
                    }
                }
            }
        }

        function visitVariableStatement(node: VariableStatement, write: (node: Statement) => void): void {
            // TODO(rbuckton): Do we need to handle this? Exports needs to be moved to a module transformer.
            write(accept(node, visitor));
        }

        function visitVariableDeclarationList(node: VariableDeclarationList, write: (node: VariableDeclarationList) => void): void {
            // TODO(rbuckton): let/const
            let declarations = visitNodes(node.declarations, visitVariableDeclaration, isVariableDeclaration);
            write(updateVariableDeclarationList(node, declarations));
        }

        function visitVariableDeclaration(node: VariableDeclaration, write: (node: VariableDeclaration) => void): void {
            if (isBindingPattern(node.name)) {
                emitBindingElement(node, node.initializer, write);
            }
            else {
                // TODO(rbuckton): Is there any reason we should hit this branch?
                write(accept(node, visitor));
            }
        }

        function visitForOfStatement(node: ForOfStatement, write: (node: Statement) => void): void {
            // The following ES6 code:
            //
            //    for (let v of expr) { }
            //
            // should be emitted as
            //
            //    for (let _i = 0, _a = expr; _i < _a.length; _i++) {
            //        let v = _a[_i];
            //    }
            //
            // where _a and _i are temps emitted to capture the RHS and the counter,
            // respectively.
            // When the left hand side is an expression instead of a let declaration,
            // the "let v" is not emitted.
            // When the left hand side is a let/const, the v is renamed if there is
            // another v in scope.
            // Note that all assignments to the LHS are emitted in the body, including
            // all destructuring.
            // Note also that because an extra statement is needed to assign to the LHS,
            // for-of bodies are always emitted as blocks.

            let expression = visitNode(node.expression, visitor, isExpressionNode);

            // In the case where the user wrote an identifier as the RHS, like this:
            //
            //     for (let v of arr) { }
            //
            // we don't want to emit a temporary variable for the RHS, just use it directly.

            let rhsIsIdentifier = expression.kind === SyntaxKind.Identifier;
            let counter = createTempVariable(TempFlags._i);
            let rhsReference = rhsIsIdentifier ? <Identifier>expression : createTempVariable(TempFlags.Auto);

            // _i = 0
            let loopInitializer = createVariableDeclarationList([], /*location*/ node.expression);
            loopInitializer.declarations.push(createVariableDeclaration2(counter, createNumericLiteral2(0), /*location*/ node.expression));
            if (!rhsIsIdentifier) {
                // , _a = expr
                loopInitializer.declarations.push(createVariableDeclaration2(rhsReference, expression, /*location*/ node.expression));
            }

            // _i < _a.length;
            let loopCondition = createLessThanExpression(counter, createPropertyAccessExpression3(rhsReference, "length"), /*location*/ node.initializer);

            // _i++)
            let loopIncrementer = createPostfixUnaryExpression(counter, SyntaxKind.PlusPlusToken, /*location*/ node.initializer);

            // Body
            let loopBodyStatements: Statement[] = [];

            // Initialize LHS
            // let v = _a[_i];
            let rhsIterationValue = createElementAccessExpression(rhsReference, counter);
            let initializer = node.initializer;
            if (isVariableDeclarationList(initializer)) {
                let declarations: VariableDeclaration[] = [];
                if (initializer.declarations.length > 0) {
                    let declaration = initializer.declarations[0];
                    if (isBindingPattern(declaration.name)) {
                        // This works whether the declaration is a var, let, or const.
                        // It will use rhsIterationValue _a[_i] as the initializer.
                        pushNode(initializer);
                        pipeNode(declaration, visitVariableDeclaration, declarations);
                        popNode();
                    }
                    else {
                        // The following call does not include the initializer, so we have
                        // to emit it separately.
                        declarations.push(createVariableDeclaration2(declaration.name, rhsIterationValue));
                    }
                }
                else {
                    // It's an empty declaration list. This can only happen in an error case, if the user wrote
                    //     for (let of []) {}
                    declarations.push(createVariableDeclaration2(createTempVariable(TempFlags.Auto), rhsIterationValue));
                }

                loopBodyStatements.push(createVariableStatement2(createVariableDeclarationList(declarations), /*location*/ node.initializer));
            }
            else {
                // Initializer is an expression. Emit the expression in the body, so that it's
                // evaluated on every iteration.
                let assignmentExpression: Expression = createAssignmentExpression(initializer, rhsIterationValue);
                if (isDestructuringAssignment(assignmentExpression)) {
                    // This is a destructuring pattern, so call emitDestructuring instead of emit. Calling emit will not work, because it will cause
                    // the BinaryExpression to be passed in instead of the expression statement, which will cause emitDestructuring to crash.
                    assignmentExpression = mapNode(assignmentExpression, visitBinaryExpression);
                }

                loopBodyStatements.push(createExpressionStatement(assignmentExpression, /*location*/ node.initializer));
            }

            let statement = node.statement;
            if (isBlock(statement)) {
                pipeNodes(statement.statements, visitor, loopBodyStatements);
            }
            else {
                pipeNode(statement, visitor, loopBodyStatements);
            }

            write(createForStatement(loopInitializer, loopCondition, loopIncrementer, createBlock(loopBodyStatements), /*location*/ node));
        }

        function visitObjectLiteralExpression(node: ObjectLiteralExpression, write: (node: LeftHandSideExpression) => void): void {
            // We are here because a ComputedPropertyName was used somewhere in the expression.
            let properties = node.properties;
            let numProperties = properties.length;

            // Find the first computed property.
            // Everything until that point can be emitted as part of the initial object literal.
            let numInitialNonComputedProperties = numProperties;
            for (let i = 0, n = properties.length; i < n; i++) {
                if (properties[i].name.kind === SyntaxKind.ComputedPropertyName) {
                    numInitialNonComputedProperties = i;
                    break;
                }
            }

            Debug.assert(numInitialNonComputedProperties !== numProperties);

            // For computed properties, we need to create a unique handle to the object
            // literal so we can modify it without risking internal assignments tainting the object.
            let temp = declareLocal();

            // Write out the first non-computed properties, then emit the rest through indexing on the temp variable.
            let initialProperties = visitNodes(properties, visitor, isObjectLiteralElement, 0, numInitialNonComputedProperties);

            let expressions: Expression[] = [];
            expressions.push(createAssignmentExpression(temp, createObjectLiteralExpression(initialProperties)))
            pipeNodes(properties, (property, write) => emitObjectLiteralElementAsExpression(property, write, node, temp), expressions, numInitialNonComputedProperties);
            expressions.push(temp);

            write(createParenthesizedExpression(inlineExpressions(expressions)));
        }

        function emitObjectLiteralElementAsExpression(property: ObjectLiteralElement, write: (node: Expression) => void, node: ObjectLiteralExpression, receiver: Identifier): void {
            if (isGetAccessor(property) || isSetAccessor(property)) {
                let accessors = getAllAccessorDeclarations(node.properties, property);
                if (property !== accessors.firstAccessor) {
                    return;
                }

                emitAccessors(receiver, accessors, /*isStatement*/ false, write);
            }
            else {
                let propertyName = visitNode(property.name, visitor, isPropertyName);
                let qualifiedName = createMemberAccessForPropertyName(receiver, propertyName);

                let initializer: Expression;
                if (isPropertyAssignment(property)) {
                    initializer = visitNode(property.initializer, visitor, isExpressionNode);
                }
                else if (isShorthandPropertyAssignment(property)) {
                    initializer = cloneNode(property.name);
                }
                else if (isMethodDeclaration(property)) {
                    initializer = transformFunctionLikeToExpression(property, /*location*/ property);
                }
                else {
                    Debug.fail("ObjectLiteralElement type not accounted for: " + property.kind);
                }

                write(createAssignmentExpression(qualifiedName, initializer));
            }
        }

        function visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment, write: (node: ObjectLiteralElement) => void): void {
            let property = createPropertyAssignment(node.name, cloneNode(node.name), /*location*/ node);
            write(property);
        }

        function visitArrayLiteralExpression(node: ArrayLiteralExpression, write: (node: LeftHandSideExpression) => void): void {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.
            if (forEach(node.elements, isSpreadElementExpression)) {
                write(spreadElements(node.elements, /*needsUniqueCopy*/ true));
            }
            else {
                // We don't handle SuperKeyword here, so fall back.
                write(accept(node, visitor));
            }
        }

        function visitCallExpression(node: CallExpression, write: (node: LeftHandSideExpression) => void): void {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.
            if (forEach(node.arguments, isSpreadElementExpression)) {
                emitCallWithSpread(node, write);
            }
            else {
                let expression = visitNode(node.expression, visitor, isExpressionNode);
                let thisArg = mapNode(createThisKeyword(), visitThisKeyword);
                let args = visitNodes(node.arguments, visitor, isExpressionNode);
                let callCall = createCallCall(expression, thisArg, args, /*location*/ node);
                write(callCall);
            }
        }

        function emitCallWithSpread(node: CallExpression, write: (node: LeftHandSideExpression) => void): void {
            let callee = skipParenthesis(node.expression);
            let expression = callee;
            let target: Expression;
            if (isPropertyAccessExpression(callee)) {
                // Target will be emitted as "this" argument.
                ({ target, expression } = getCallTarget(visitNode(callee.expression, visitor, isLeftHandSideExpression)));
                expression = createPropertyAccessExpression2(expression, callee.name);
            }
            else if (isElementAccessExpression(callee)) {
                // target will be emitted as "this" argument.
                ({ target, expression } = getCallTarget(visitNode(callee.expression, visitor, isLeftHandSideExpression)));
                expression = createElementAccessExpression2(expression, visitNode(callee.argumentExpression, visitor, isExpressionNode));
            }
            else if (isSuperKeyword(callee)) {
                target = mapNode(createThisKeyword(/*location*/ callee), visitThisKeyword);
                expression = createIdentifier("_super");
            }
            else {
                target = createVoidZeroExpression();
                expression = visitNode(callee, visitor, isExpressionNode);
            }

            let argumentsArray = spreadElements(node.arguments, /*needsUniqueCopy*/ false);
            let applyCall = createApplyCall(expression, target, argumentsArray);
            write(applyCall);
        }

        function visitNewExpression(node: NewExpression, write: (node: LeftHandSideExpression) => void): void {
            // We are here either because SuperKeyword was used somewhere in the expression, or
            // because we contain a SpreadElementExpression.
            if (forEach(node.arguments, isSpreadElementExpression)) {
                let { target, expression } = getCallTarget(visitNode(node.expression, visitor, isExpressionNode));
                let argumentsArray = spreadElements(node.arguments, /*needsUniqueCopy*/ false, createVoidZeroExpression());
                let bindApply = createApplyCall(createPropertyAccessExpression3(expression, "bind"), target, argumentsArray);
                write(createNewExpression(createParenthesizedExpression(bindApply), /*typeArguments*/ undefined, []));
                return;
            }
            else {
                // We have nothing to do for SuperKeyword, so fallback.
                write(accept(node, visitor));
            }
        }

        function skipParenthesis(node: Expression) {
            while (isParenthesizedExpression(node) || isTypeAssertionExpression(node) || isAsExpression(node)) {
                node = (<ParenthesizedExpression | AssertionExpression>node).expression;
            }
            return node;
        }

        function getCallTarget(expression: Expression) {
            let target: PrimaryExpression;
            if (isIdentifier(expression) || isThisKeyword(expression) || isSuperKeyword(expression)) {
                target = cloneNode(<PrimaryExpression>expression);
            }
            else {
                target = declareLocal();
                expression = createParenthesizedExpression(createAssignmentExpression(target, expression));
            }

            return { target, expression };
        }

        function spreadElements(elements: Expression[], needsUniqueCopy: boolean, leadingExpression?: Expression) {
            let segments: Expression[] = [];
            if (leadingExpression) {
                segments.push(leadingExpression);
            }

            let length = elements.length;
            let start = 0;
            for (let i = 0; i < length; i++) {
                let element = elements[i];
                if (isSpreadElementExpression(element)) {
                    if (i > start) {
                        segments.push(createArrayLiteralExpression(visitNodes(elements.slice(start, i), visitor, isExpressionNode)));
                    }

                    segments.push(needsUniqueCopy ? createSliceCall(element.expression) : element.expression);
                    start = i + 1;
                }
            }

            if (start < length) {
                segments.push(createArrayLiteralExpression(visitNodes(elements.slice(start, length), visitor, isExpressionNode)));
            }

            if (segments.length === 1) {
                return parenthesizeForAccess(segments[0]);
            }

            // Rewrite using the pattern <segment0>.concat(<segment1>, <segment2>, ...)
            return createConcatCall(segments.shift(), segments);
        }

        function visitTemplateLiteral(node: LiteralExpression, write: (node: LeftHandSideExpression) => void): void {
            write(createStringLiteral(node.text));
        }

        function visitTaggedTemplateExpression(node: TaggedTemplateExpression, write: (node: LeftHandSideExpression) => void): void {
            // Visit the tag expression
            let tag = visitNode(node.tag, visitor, isExpressionNode);

            // Allocate storage for the template site object
            let templateObj = declareLocal();
            let rawObj = createPropertyAccessExpression3(templateObj, "raw");

            // Build up the template arguments and the raw and cooked strings for the template.
            let templateArguments: Expression[] = [templateObj];
            let cookedStrings: Expression[] = [];
            let rawStrings: Expression[] = [];
            let template = node.template;
            if (isNoSubstitutionTemplateLiteral(template)) {
                cookedStrings.push(createStringLiteral(template.text));
                rawStrings.push(getRawLiteral(template));
            }
            else {
                cookedStrings.push(createStringLiteral(template.head.text));
                rawStrings.push(getRawLiteral(template.head));
                pushNode(template);
                for (let templateSpan of template.templateSpans) {
                    cookedStrings.push(createStringLiteral(templateSpan.literal.text));
                    rawStrings.push(getRawLiteral(templateSpan.literal));
                    templateArguments.push(mapNode(templateSpan, visitExpressionOfTemplateSpan));
                }
                popNode();
            }

            let cookedArray = createArrayLiteralExpression(cookedStrings);
            let rawArray = createArrayLiteralExpression(rawStrings);

            let expressions: Expression[] = [];
            expressions.push(createAssignmentExpression(templateObj, cookedArray));
            expressions.push(createAssignmentExpression(rawObj, rawArray));
            expressions.push(createCallExpression2(tag, templateArguments));
            write(createParenthesizedExpression(inlineExpressions(expressions)));
        }

        function getRawLiteral(node: LiteralExpression) {
            // Find original source text, since we need to emit the raw strings of the tagged template.
            // The raw strings contain the (escaped) strings of what the user wrote.
            // Examples: `\n` is converted to "\\n", a template string with a newline to "\n".
            let text = getSourceTextOfNodeFromSourceFile(currentSourceFile, node);

            // text contains the original source, it will also contain quotes ("`"), dolar signs and braces ("${" and "}"),
            // thus we need to remove those characters.
            // First template piece starts with "`", others with "}"
            // Last template piece ends with "`", others with "${"
            let isLast = node.kind === SyntaxKind.NoSubstitutionTemplateLiteral || node.kind === SyntaxKind.TemplateTail;
            text = text.substring(1, text.length - (isLast ? 1 : 2));

            // Newline normalization:
            // ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
            // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
            text = text.replace(/\r\n?/g, "\n");
            text = escapeString(text);
            return createStringLiteral(text);
        }

        function visitExpressionOfTemplateSpan(node: TemplateSpan, write: (node: Expression) => void): void {
            write(visitNode(node.expression, visitor, isExpressionNode));
        }

        function visitTemplateExpression(node: TemplateExpression, write: (node: Expression) => void): void {
            let expressions: Expression[] = [];

            if (shouldEmitTemplateHead(node)) {
                pipeNode(node.head, visitTemplateLiteral, expressions);
            }

            pipeNodes(node.templateSpans, emitTemplateSpan, expressions);

            let expression = reduceLeft(expressions, createAddExpression);
            if (templateNeedsParens(node)) {
                expression = createParenthesizedExpression(expression);
            }

            write(expression);
        }

        function emitTemplateSpan(node: TemplateSpan, write: (node: Expression) => void): void {
            // Check if the expression has operands and binds its operands less closely than binary '+'.
            // If it does, we need to wrap the expression in parentheses. Otherwise, something like
            //    `abc${ 1 << 2 }`
            // becomes
            //    "abc" + 1 << 2 + ""
            // which is really
            //    ("abc" + 1) << (2 + "")
            // rather than
            //    "abc" + (1 << 2) + ""
            let expression = visitNode(node.expression, visitor, isExpressionNode);
            let needsParens = !isParenthesizedExpression(expression)
                && comparePrecedenceToBinaryPlus(expression) !== Comparison.GreaterThan;

            if (needsParens) {
                expression = createParenthesizedExpression(expression);
            }

            write(expression);

            // Only emit if the literal is non-empty.
            // The binary '+' operator is left-associative, so the first string concatenation
            // with the head will force the result up to this point to be a string.
            // Emitting a '+ ""' has no semantic effect for middles and tails.
            if (node.literal.text.length !== 0) {
                pipeNode(node.literal, visitTemplateLiteral, write);
            }
        }

        function shouldEmitTemplateHead(node: TemplateExpression) {
            // If this expression has an empty head literal and the first template span has a non-empty
            // literal, then emitting the empty head literal is not necessary.
            //     `${ foo } and ${ bar }`
            // can be emitted as
            //     foo + " and " + bar
            // This is because it is only required that one of the first two operands in the emit
            // output must be a string literal, so that the other operand and all following operands
            // are forced into strings.
            //
            // If the first template span has an empty literal, then the head must still be emitted.
            //     `${ foo }${ bar }`
            // must still be emitted as
            //     "" + foo + bar

            // There is always atleast one templateSpan in this code path, since
            // NoSubstitutionTemplateLiterals are directly emitted via emitLiteral()
            Debug.assert(node.templateSpans.length !== 0);

            return node.head.text.length !== 0 || node.templateSpans[0].literal.text.length === 0;
        }

        function templateNeedsParens(template: TemplateExpression) {
            let parentNode = getParentNode();
            if (isExpressionNode(parentNode)) {
                switch (parentNode.kind) {
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.NewExpression:
                        return (<CallExpression>parentNode).expression === template;

                    case SyntaxKind.TaggedTemplateExpression:
                    case SyntaxKind.ParenthesizedExpression:
                        return false;

                    default:
                        return comparePrecedenceToBinaryPlus(<Expression>parentNode) !== Comparison.LessThan;
                }
            }

            return false;
        }

        function visitSuperKeyword(node: PrimaryExpression, write: (node: LeftHandSideExpression) => void): void {
            let _super: LeftHandSideExpression = createIdentifier("_super");
            if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.SuperInstance) {
                _super = createPropertyAccessExpression3(createIdentifier("_super"), "prototype");
            }

            write(_super);
        }

        function visitThisKeyword(node: PrimaryExpression, write: (node: LeftHandSideExpression) => void): void {
            let container = getThisContainer(transformer, /*includeArrowFunctions*/ true);
            if (isArrowFunction(container)) {
                let thisName = createIdentifier("_this");
                write(thisName);
            }
            else {
                write(node);
            }
        }

        function visitExpressionStatement(node: ExpressionStatement, write: (node: Statement) => void): void {
            if (node.flags & NodeFlags.GeneratedSuper) {
                write(createDefaultSuperCall());
            }
            else {
                // TODO(rbuckton): Is there any reason we should hit this branch?
                write(accept(node, visitor));
            }
        }

        function createDefaultSuperCall() {
            let superName = createIdentifier("_super");
            let thisExpr = createThisKeyword();
            let argumentsName = createIdentifier("arguments");
            let applyExpr = createApplyCall(superName, thisExpr, argumentsName);
            let statement = createExpressionStatement(applyExpr);
            startOnNewLine(statement);
            return statement;
        }
    }
}