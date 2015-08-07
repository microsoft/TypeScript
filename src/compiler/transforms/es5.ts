/// <reference path="../transform.generated.ts" />
/*@internal*/
namespace ts.transform {
    export function toES5(context: VisitorContext, statements: NodeArray<Statement>) {
        return visitNodes(context, statements, transformNode);
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
    function transformNode(context: VisitorContext, node: Node, write: (node: Node) => void): void {
        if (!node) {
            return;
        }
        
        // Debug.assert(
        //     !needsTransform(node, TransformFlags.ThisNodeNeedsTransformToES6), 
        //     "Cannot transform node with post-ES6 syntax.");
        
        if (needsTransform(node, TransformFlags.ThisNodeNeedsTransformToES5)) {
            return transformNodeWorker(context, node, write);
        }
        else if (node.flags & NodeFlags.GeneratedSuper && isExpressionStatement(node)) {
            return transformInitialSuperCall(context, node, write);
        }
        else if (needsTransform(node, TransformFlags.SubtreeNeedsTransformToES5)) {
            return accept(context, node, transformNode, write);
        }
        
        return write(node);
    }

    /**
      * Transforms a node from ES6 to ES5.
      * @param context Context information for the transform.
      * @param node The node to transform.
      */
    function transformNodeWorker(context: VisitorContext, node: Node, write: (node: Node) => void): void {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                return transformClassDeclaration(context, <ClassDeclaration>node, write);
                
            case SyntaxKind.ClassExpression:
                return transformClassExpression(context, <ClassExpression>node, write);
                
            case SyntaxKind.Parameter:
                return transformParameter(context, <ParameterDeclaration>node, write);
                
            case SyntaxKind.FunctionDeclaration:
                return transformFunctionDeclaration(context, <FunctionDeclaration>node, write);

            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return transformFunctionExpression(context, <FunctionExpression>node, write);
                
            case SyntaxKind.BindingElement:
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ComputedPropertyName:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.SpreadElementExpression:
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.YieldExpression:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.VariableDeclarationList:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BinaryExpression:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TaggedTemplateExpression:
            case SyntaxKind.TemplateExpression:
                // TODO (rbuckton): ES6 syntax we're not yet transforming and are leaving for the emitter to handle.
                
            default:
                return accept(context, node, transformNode, write);
        }
    }
    
    function transformClassDeclaration(context: VisitorContext, node: ClassDeclaration, write: (node: Statement) => void) {
        let name = context.getDeclarationName(node);
        let classInitExpr = transformClassLikeDeclaration(context, node, name);
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        let varDecl = factory.createVariableDeclaration2(name, classInitExpr);
        let varDecls = factory.createVariableDeclarationList([varDecl]);
        let varStmt = factory.createVariableStatement2(varDecls, /*location*/ node);
        return write(varStmt);
        // return tag_statement`
        //     var ${name} = (function (${baseTypeNode && tag_id`_super`}) {
        //         ${baseTypeNode && tag_statement`__extends(${name}, _super);`}
        //         ${transformConstructor(context, node, baseTypeNode)}
        //         ${transformMemberFunctions(context, node)}
        //         return ${name};
        //     })(${baseTypeNode && tag_id`_super`});
        // `;
    } 
    
    function transformClassExpression(context: VisitorContext, node: ClassExpression, write: (node: LeftHandSideExpression) => void) {
        let name = context.getDeclarationName(node);
        return write(transformClassLikeDeclaration(context, node, name));
        // let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        // return tag_lhs_expression`
        //     (function (${baseTypeNode && tag_id`_super`}) {
        //         ${baseTypeNode && tag_statement`__extends(${name}, _super);`}
        //         ${transformConstructor(context, node, baseTypeNode)}
        //         ${transformMemberFunctions(context, node)}
        //         return ${name};
        //     })(${baseTypeNode && tag_id`_super`});
        // `;
    }

    function transformClassLikeDeclaration(context: VisitorContext, node: ClassLikeDeclaration, name: Identifier): LeftHandSideExpression {
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        let superExpr = baseTypeNode ? visitNode(context, baseTypeNode.expression, transformNode) : undefined;
        let superName = baseTypeNode ? factory.createIdentifier("_super") : undefined;
        let superParam = baseTypeNode ? factory.createParameter2(superName) : undefined;
        let classBody = factory.createBlock([]);
        if (baseTypeNode) {
            let extendsExpr = factory.createExtendsHelperCall(name);
            let extendsStmt = factory.createExpressionStatement(extendsExpr);
            classBody.statements.push(extendsStmt);
        }
        
        transformConstructor(context, node, name, baseTypeNode, classBody.statements);
        transformMemberFunctions(context, node, classBody.statements);
        
        let returnStmt = factory.createReturnStatement(name);
        classBody.statements.push(returnStmt);
        
        let classDecl = factory.createFunctionExpression2(/*name*/ undefined, baseTypeNode ? [superParam] : [], classBody);
        let parenExpr = factory.createParenthesizedExpression(classDecl);
        let callExpr = factory.createCallExpression2(parenExpr, baseTypeNode ? [superExpr] : undefined);
        return callExpr;
    }
    
    function transformConstructor(context: VisitorContext, node: ClassLikeDeclaration, name: Identifier, baseTypeNode: ExpressionWithTypeArguments, classStatements: Statement[]) {
        context.pushLexicalEnvironment();
        
        let constructor = getFirstConstructorWithBody(node);
        let parameters: ParameterDeclaration[] = constructor ? visitNodes(context, constructor.parameters, transformNode) : [];
        let body = factory.createBlock([]);
        
        if (constructor) {
            transformCaptureThisForNode(context, constructor, body.statements);
            transformDefaultValueAssignments(context, constructor, body.statements);
            transformRestParameter(context, constructor, body.statements);

            let statements = visitNodes(context, constructor.body.statements, transformNode);
            body.statements.push(...statements);
        }
        else if (baseTypeNode) {
            let superCall = createDefaultSuperCall();
            body.statements.push(superCall);
        }
        
        context.writeHoistedDeclarations(body.statements);
        context.popLexicalEnvironment();
        
        let constructorFunc = factory.createFunctionDeclaration2(name, parameters, body);
        classStatements.push(constructorFunc);
        // return tag_statement`
        //     function ${name}(${transformSignatureParameters(context, constructor)}) {
        //         ${transformCaptureThisForNode(context, constructor)}
        //         ${transformDefaultValueAssignments(context, constructor)}
        //         ${transformRestParameter(context, constructor)}
        //         ${visitNodeArrayOfStatement(context, constructor && constructor.body.statements, transformNode)}
        //     }
        // `;
    }
    
    function transformParameter(context: VisitorContext, node: ParameterDeclaration, write: (node: ParameterDeclaration) => void) {
        if (isBindingPattern(node.name)) {
            write(factory.createParameter2(
                context.getGeneratedNameForNode(node),
                /*initializer*/ undefined,
                /*location*/ node
            ));
        }
        else if (node.initializer) {
            write(factory.createParameter2(
                node.name,
                /*initializer*/ undefined,
                /*location*/ node
            ));
        }
        else if (!node.dotDotDotToken) {
            // rest parameters are elided, other parameters are included.
            write(node);
        }
    }

    function transformDefaultValueAssignments(context: VisitorContext, node: FunctionLikeDeclaration, statements: Statement[]) {
        if (!needsTransform(node, TransformFlags.SubtreeContainsParameterInitializer | TransformFlags.SubtreeContainsParameterBindingPattern)) {
            return
        }
        
        for (let parameter of node.parameters) {
            let { name, initializer, dotDotDotToken } = parameter;

            // A rest parameter cannot have a binding pattern or an initializer,
            // so let's just ignore it.
            if (dotDotDotToken) {
                continue;
            }
        
            if (isBindingPattern(name)) {
                transformDefaultValueAssignmentForBindingPattern(context, parameter, name, initializer, statements);
            }
            else if (initializer) {
                transformDefaultValueAssignmentForInitializer(context, parameter, name, initializer, statements);
            }
        }
    }
    
    function transformDefaultValueAssignmentForBindingPattern(context: VisitorContext, parameter: ParameterDeclaration, name: BindingPattern, initializer: Expression, statements: Statement[]): void {
        let tempName = context.getGeneratedNameForNode(parameter);
        
        // In cases where a binding pattern is simply '[]' or '{}',
        // we usually don't want to emit a var declaration; however, in the presence
        // of an initializer, we must emit that expression to preserve side effects.
        let hasBindingElements = name.elements.length > 0;
        if (hasBindingElements) {
            let varDecls = factory.createVariableDeclarationList([]);
            transformBindingElement(context, parameter, tempName, varDecls.declarations, /*assignments*/ undefined);
            
            let varStmt = factory.createVariableStatement2(varDecls);
            factory.startOnNewLine(varStmt);
            statements.push(varStmt);
        }
        else if (initializer) {
            let initExpr = visitNode(context, initializer, transformNode);
            let assignExpr = factory.createAssignmentExpression(tempName, initExpr);
            let assignStmt = factory.createExpressionStatement(assignExpr);
            factory.startOnNewLine(assignStmt);
            statements.push(assignStmt);
            // return tag_statements`
            //     ${tempName} = ${visit(context, initializer, transformNode)};
            // `;
        }
    }
    
    function transformBindingElement(context: VisitorContext, target: BindingElement, value: Expression, declarations: VariableDeclaration[], assignments: Expression[]): void {
        if (target.initializer) {
            // Combine value and initializer
            let initializer = visitNode(context, target.initializer, transformNode); 
            value = value ? createDefaultValueCheck(context, value, initializer, declarations, assignments) : initializer;
        }
        else if (!value) {
            // Use 'void 0' in absence of value and initializer
            value = factory.createVoidZeroExpression();
        }
        
        let name = target.name;
        if (isBindingPattern(name)) {
            let elements = name.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = ensureIdentifier(context, value, declarations, assignments);
            }
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                if (name.kind === SyntaxKind.ObjectBindingPattern) {
                    // Rewrite element to a declaration with an initializer that fetches property
                    let propName = element.propertyName || <Identifier>element.name;
                    transformBindingElement(context, element, factory.createPropertyOrElementAccessExpression(value, propName), declarations, assignments);
                }
                else if (element.kind !== SyntaxKind.OmittedExpression) {
                    if (!element.dotDotDotToken) {
                        // Rewrite element to a declaration that accesses array element at index i
                        transformBindingElement(context, element, factory.createElementAccessExpression3(value, i), declarations, assignments);
                    }
                    else if (i === elements.length - 1) {
                        transformBindingElement(context, element, factory.createSliceCall(value, i), declarations, assignments);
                    }
                }
            }
        }
        else {
            appendAssignment(name, value, declarations, assignments);
        }
    }
    
    function appendAssignment(left: Identifier, right: Expression, declarations: VariableDeclaration[], assignments: Expression[]): void {
        let varDecl = factory.createVariableDeclaration2(left, assignments ? undefined : right);
        declarations.push(varDecl);
        
        if (assignments) {
            let assignExpr = factory.createAssignmentExpression(left, right);
            assignments.push(assignExpr);
        }
    }
    
    function ensureIdentifier(context: VisitorContext, value: Expression, declarations: VariableDeclaration[], assignments: Expression[]) {
        if (isIdentifier(value)) {
            return value;
        }
        else {
            let tempVar = context.createTempVariable(/*loopVariable*/ false);
            appendAssignment(tempVar, value, declarations, assignments);
            return tempVar;
        }
    }
    
    function createDefaultValueCheck(context: VisitorContext, value: Expression, defaultValue: Expression, declarations: VariableDeclaration[], assignments: Expression[]) {
        value = ensureIdentifier(context, value, declarations, assignments);
        let equalityExpr = factory.createStrictEqualityExpression(value, factory.createVoidZeroExpression());
        let conditionalExpr = factory.createConditionalExpression2(equalityExpr, defaultValue, value);
        return conditionalExpr;
    }
    
    function transformDefaultValueAssignmentForInitializer(context: VisitorContext, parameter: ParameterDeclaration, name: Identifier, initializer: Expression, statements: Statement[]): void {
        name = factory.cloneNode(name);
        let equalityExpr = factory.createStrictEqualityExpression(name, factory.createVoidZeroExpression());
        let initExpr = visitNode(context, initializer, transformNode);
        let assignExpr = factory.createAssignmentExpression(name, initExpr);
        let assignStmt = factory.createExpressionStatement(assignExpr);
        let trueStmt = factory.createBlock([assignStmt]);
        let ifStmt = factory.createIfStatement(equalityExpr, trueStmt);
        factory.startOnNewLine(ifStmt);
        statements.push(ifStmt);
        // return tag_statement`
        //     if (${name} === void 0) {
        //         ${name} = ${visit(context, initializer, transformNode)};
        //     }
        // `;
    }
    
    function transformRestParameter(context: VisitorContext, node: FunctionLikeDeclaration, statements: Statement[]): void {
        if (!needsTransform(node, TransformFlags.SubtreeContainsRestParameter)) {
            return;
        }
        
        let restParam = lastOrUndefined(node.parameters);
        if (!restParam.dotDotDotToken || restParam.flags & NodeFlags.GeneratedRest) {
            return;
        }
        
        let restIndex = node.parameters.length - 1;
        let _i = context.createTempVariable(/*loopVariable*/ true);
        let name = <Identifier>context.getDeclarationName(restParam);
        let arrayExpr = factory.createArrayLiteralExpression([]);
        let paramVarDecl = factory.createVariableDeclaration2(name, arrayExpr);
        let paramVarDecls = factory.createVariableDeclarationList([paramVarDecl]);
        let paramVarStmt = factory.createVariableStatement2(paramVarDecls);
        factory.startOnNewLine(paramVarStmt);
        statements.push(paramVarStmt);
        
        let restIndexExpr = factory.createNumericLiteral2(restIndex);
        let initializerVarDecl = factory.createVariableDeclaration2(_i, restIndexExpr);
        let initializerVarDecls = factory.createVariableDeclarationList([initializerVarDecl]);
        let argumentsName = factory.createIdentifier("arguments");
        let lengthName = factory.createIdentifier("length");
        let argumentsLengthExpr = factory.createPropertyAccessExpression2(argumentsName, lengthName);
        let conditionExpr = factory.createBinaryExpression2(_i, SyntaxKind.LessThanToken, argumentsLengthExpr);
        let incrementerExpr = factory.createPostfixUnaryExpression(_i, SyntaxKind.PlusPlusToken);
        let arrayOffsetExpr = restIndex === 0 ? _i : factory.createBinaryExpression2(_i, SyntaxKind.MinusToken, restIndexExpr);
        let arrayElementExpr = factory.createElementAccessExpression2(name, arrayOffsetExpr);
        let argumentsElementExpr = factory.createElementAccessExpression2(argumentsName, _i);
        let assignExpr = factory.createAssignmentExpression(arrayElementExpr, argumentsElementExpr);
        let assignStmt = factory.createExpressionStatement(assignExpr);
        factory.startOnNewLine(assignStmt);

        let forBody  = factory.createBlock([assignStmt]);
        let forStmt = factory.createForStatement(initializerVarDecls, conditionExpr, incrementerExpr, forBody);
        factory.startOnNewLine(forStmt);
        statements.push(forStmt);
        // return tag_statements`
        //     var ${name} = [];
        //     for (var ${_i} = ${restIndex}; ${_i} < arguments.length; ${_i}++) {
        //         ${name}[${_i}${restIndex ? tag_part` - ${restIndex}` : undefined}] = arguments[${_i}];
        //     }
        // `;
    }
    
    function transformCaptureThisForNode(context: VisitorContext, node: Node, statements: Statement[]): void {
        if (isArrowFunction(node) || !needsTransform(node, TransformFlags.SubtreeCapturesLexicalThis)) {
            return;
        }
        
        let thisName = factory.createIdentifier("_this");
        let thisExpr = factory.createThisKeyword();
        let varDecl = factory.createVariableDeclaration2(thisName, thisExpr);
        let varDecls = factory.createVariableDeclarationList([varDecl]);
        let varStmt = factory.createVariableStatement2(varDecls);
        factory.startOnNewLine(varStmt);
        statements.push(varStmt);
        
        // return tag_statement`
        //     var _this = this;
        // `;
    }
    
    function transformMemberFunctions(context: VisitorContext, node: ClassLikeDeclaration, statements: Statement[]): void {
        for (let member of node.members) {
            if (isSemicolonClassElement(member)) {
                transformSemicolonClassElement(context, member, statements);
            }
            else if (isMethodDeclaration(member)) {
                transformMethodDeclaration(context, node, member, statements);
            }
            else if (isGetAccessor(member) || isSetAccessor(member)) {
                let accessors = getAllAccessorDeclarations(node.members, member);
                if (member === accessors.firstAccessor) {
                    transformAccessorDeclaration(context, node, member, accessors, statements);
                }
            }
        }
    }
    
    function transformSemicolonClassElement(context: VisitorContext, member: SemicolonClassElement, statements: Statement[]): void {
        let stmt = factory.createEmptyStatement();
        factory.startOnNewLine(stmt);
        statements.push(stmt);
    }
    
    function transformMethodDeclaration(context: VisitorContext, node: ClassLikeDeclaration, member: MethodDeclaration, classStatements: Statement[]): void {
        let prefix = context.getClassMemberPrefix(node, member);
        let propExpr = getMemberAccessForPropertyName(context, node, member);
        let funcExpr = transformToFunctionLikeDeclaration(context, member, /*name*/ undefined, /*location*/ undefined, factory.createFunctionExpression2);
        let assignExpr = factory.createAssignmentExpression(propExpr, funcExpr);
        let assignStmt = factory.createExpressionStatement(assignExpr, /*location*/ member);
        factory.startOnNewLine(assignStmt);
        classStatements.push(assignStmt);
        // return tag_statement`
        //     ${property} = ${transformToFunctionExpression(context, member)};
        // `;
    }
    
    function transformAccessorDeclaration(context: VisitorContext, node: ClassLikeDeclaration, member: AccessorDeclaration, accessors: AllAccessorDeclarations, classStatements: Statement[]): void {
        let prefix = context.getClassMemberPrefix(node, member);
        let name = getExpressionForPropertyName(context, member);
        let descriptorExpr = factory.createObjectLiteralExpression2();
        if (accessors.getAccessor) {
            let funcExpr = transformToFunctionLikeDeclaration(context, accessors.getAccessor, /*name*/ undefined, /*location*/ accessors.getAccessor, factory.createFunctionExpression2);
            let getName = factory.createIdentifier("get");
            let getProp = factory.createPropertyAssignment(getName, funcExpr);
            factory.startOnNewLine(getProp);
            descriptorExpr.properties.push(getProp);
        }
        if (accessors.setAccessor) {
            let funcExpr = transformToFunctionLikeDeclaration(context, accessors.setAccessor, /*name*/ undefined, /*location*/ accessors.setAccessor, factory.createFunctionExpression2);
            let setName = factory.createIdentifier("set");
            let setProp = factory.createPropertyAssignment(setName, funcExpr);
            factory.startOnNewLine(setProp);
            descriptorExpr.properties.push(setProp);
        }
        
        let trueExpr = factory.createTrueKeyword();
        let enumerableName = factory.createIdentifier("enumerable");
        let enumerableProp = factory.createPropertyAssignment(enumerableName, trueExpr)
        factory.startOnNewLine(enumerableProp);
        descriptorExpr.properties.push(enumerableProp);
        
        let configurableName = factory.createIdentifier("configurable");
        let configurableProp = factory.createPropertyAssignment(configurableName, trueExpr);
        factory.startOnNewLine(configurableProp);
        descriptorExpr.properties.push(configurableProp);
        
        let definePropertyExpr = factory.createDefinePropertyCall(prefix, name, descriptorExpr);
        let definePropertyStmt = factory.createExpressionStatement(definePropertyExpr);
        classStatements.push(definePropertyStmt);
        // return tag_statement`
        //     Object.defineProperty(${prefix}, ${name}, {
        //         ${accessors.getAccessor && tag_part`get: ${transformToFunctionExpression(context, accessors.getAccessor)}, `}
        //         ${accessors.setAccessor && tag_part`set: ${transformToFunctionExpression(context, accessors.setAccessor)}, `}
        //         enumerable: true,
        //         configurable: true
        //     });
        // `;
    }
    
    function transformFunctionExpression(context: VisitorContext, node: FunctionExpression, write: (node: Expression) => void): void {
        let func = transformToFunctionLikeDeclaration(context, node, node.name, /*location*/ node, factory.createFunctionExpression2);
        write(func);
    }
    
    function transformFunctionDeclaration(context: VisitorContext, node: FunctionDeclaration, write: (node: Statement) => void): void {
        let func = transformToFunctionLikeDeclaration(context, node, node.name, /*location*/ node, factory.createFunctionDeclaration2);
        write(func);
    }

    function transformToFunctionLikeDeclaration<T extends FunctionLikeDeclaration>(context: VisitorContext, node: FunctionLikeDeclaration, name: Identifier, location: TextRange, 
        createFunctionLike: (name: DeclarationName, parameters: ParameterDeclaration[], body: Block, location: TextRange) => T): T {

        context.pushLexicalEnvironment();

        let parameters = visitNodes(context, node.parameters, transformNode);
        let newBody = factory.createBlock([]);

        transformCaptureThisForNode(context, node, newBody.statements);
        transformDefaultValueAssignments(context, node, newBody.statements);
        transformRestParameter(context, node, newBody.statements);
        
        let originalBody = node.body;
        if (isBlock(originalBody)) {
            let statements = visitNodes(context, originalBody.statements, transformNode);
            newBody.statements.push(...statements);
            factory.setTextRange(newBody, originalBody);
        }
        else {
            let expr = visitNode(context, originalBody, transformNode);
            if (expr) {
                let returnStmt = factory.createReturnStatement(expr);
                newBody.statements.push(returnStmt);
                if (!context.childNodeStartPositionIsOnSameLine(node, originalBody)) {
                    factory.startOnNewLine(returnStmt);
                }
            }
        }
        
        context.writeHoistedDeclarations(newBody.statements);
        context.popLexicalEnvironment();
        
        let func = createFunctionLike(name, parameters, newBody, location);
        return func;
    }
    
    function getExpressionForPropertyName(context: VisitorContext, member: ClassElement): Expression {
        let memberName = <PropertyName>member.name;
        if (isIdentifier(memberName)) {
            return factory.createStringLiteral(memberName.text);
        }
        else if (isComputedPropertyName(memberName)) {
            return visitNode(context, memberName.expression, transformNode);
        }
        else {
            return factory.cloneNode(memberName);
        }
    }
    
    function getMemberAccessForPropertyName(context: VisitorContext, node: ClassLikeDeclaration, member: ClassElement): LeftHandSideExpression {
        let target = context.getClassMemberPrefix(node, member);
        let memberName = <PropertyName>member.name;
        if (isIdentifier(memberName)) {
            return factory.createPropertyAccessExpression2(target, factory.cloneNode(memberName));
        }
        else if (isComputedPropertyName(memberName)) {
            let expression = visitNode(context, memberName.expression, transformNode);
            return factory.createElementAccessExpression2(target, expression);
        }
        else {
            return factory.createElementAccessExpression2(target, factory.cloneNode(memberName));
        }
    }
    
    function transformThisKeyword(context: VisitorContext, node: LeftHandSideExpression): LeftHandSideExpression {
        let container = getThisContainer(node, /*includeArrowFunctions*/ true, context.getAncestorOrSelfCallback, /*offset*/ 0);
        if (isArrowFunction(container)) {
            let thisName = factory.createIdentifier("_this");
            return thisName;
            // return tag_id`_this`;
        }
        return node;
    }
    
    function transformInitialSuperCall(context: VisitorContext, node: ExpressionStatement, write: (node: Statement) => void) {
        let statement = createDefaultSuperCall();
        return write(statement);
        // return tag_statement`
        //     _super.apply(this, arguments);
        // `;
    }
    
    function createDefaultSuperCall() {
        let superName = factory.createIdentifier("_super");
        let thisExpr = factory.createThisKeyword();
        let argumentsName = factory.createIdentifier("arguments");
        let applyExpr = factory.createApplyCall(superName, thisExpr, argumentsName);
        let statement = factory.createExpressionStatement(applyExpr);
        factory.startOnNewLine(statement);
        return statement;
    }
}