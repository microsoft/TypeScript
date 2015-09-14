/// <reference path="../transform.generated.ts" />
/*@internal*/
namespace ts.transform {
    export function toES5(statements: NodeArray<Statement>) {
        return visitNodes(statements, transformNode, VisitorFlags.LexicalEnvironment);
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
    function transformNode(node: Node, write: (node: Node) => void): void {
        if (!node) {
            return;
        }
        
        // Debug.assert(
        //     !needsTransform(node, TransformFlags.ThisNodeNeedsTransformToES6), 
        //     "Cannot transform node with post-ES6 syntax.");
        
        if (node.transformFlags & TransformFlags.ThisNodeNeedsTransformToES5) {
            transformNodeWorker(node, write);
        }
        else if (node.flags & NodeFlags.GeneratedSuper && isExpressionStatement(node)) {
            transformInitialSuperCall(node, write);
        }
        else if (node.transformFlags & TransformFlags.SubtreeNeedsTransformToES5) {
            accept(node, transformNode, write);
        }
        else {
            return write(node);
        }
    }

    /**
      * Transforms a node from ES6 to ES5.
      * @param context Context information for the transform.
      * @param node The node to transform.
      */
    function transformNodeWorker(node: Node, write: (node: Node) => void): void {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
                return transformClassDeclaration(<ClassDeclaration>node, write);
                
            case SyntaxKind.ClassExpression:
                return transformClassExpression(<ClassExpression>node, write);
                
            case SyntaxKind.Parameter:
                return transformParameter(<ParameterDeclaration>node, write);
                
            case SyntaxKind.FunctionDeclaration:
                return transformFunctionDeclaration(<FunctionDeclaration>node, write);

            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return transformFunctionExpression(<FunctionExpression>node, write);
                
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
                return accept(node, transformNode, write);
        }
    }
    
    function transformClassDeclaration(node: ClassDeclaration, write: (node: Statement) => void) {
        let name = getDeclarationName(node);
        let classInitExpr = transformClassLikeDeclaration(node, name);
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        let varDecl = createVariableDeclaration2(name, classInitExpr);
        let varDecls = createVariableDeclarationList([varDecl]);
        let varStmt = createVariableStatement2(varDecls, /*location*/ node);
        return write(varStmt);
    } 
    
    function transformClassExpression(node: ClassExpression, write: (node: LeftHandSideExpression) => void) {
        let name = getDeclarationName(node);
        return write(transformClassLikeDeclaration(node, name));
    }

    function transformClassLikeDeclaration(node: ClassLikeDeclaration, name: Identifier): LeftHandSideExpression {
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        let classBody = createBlock([]);
        emitNode(node, transformClassBody, classBody.statements);
        
        let superExpr = baseTypeNode ? visitNode(baseTypeNode.expression, transformNode) : undefined;
        let superName = baseTypeNode ? createIdentifier("_super") : undefined;
        let superParam = baseTypeNode ? createParameter2(superName) : undefined;
        let classDecl = createFunctionExpression2(/*name*/ undefined, baseTypeNode ? [superParam] : [], classBody);
        let parenExpr = createParenthesizedExpression(classDecl);
        let callExpr = createCallExpression2(parenExpr, baseTypeNode ? [superExpr] : undefined);
        return callExpr;
    }
    
    function transformClassBody(node: ClassLikeDeclaration, write: (node: Statement) => void): void {
        let name = getDeclarationName(node);
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        emitExtendsCall(node, name, baseTypeNode, write);
        emitConstructor(node, name, baseTypeNode, write);
        emitMemberFunctions(node, write);

        let returnStmt = createReturnStatement(name);
        write(returnStmt);
    }
    
    function emitExtendsCall(node: ClassLikeDeclaration, name: Identifier, baseTypeNode: ExpressionWithTypeArguments, write: (node: Statement) => void): void {
        if (!baseTypeNode) {
            return;
        }
        
        let extendsExpr = createExtendsHelperCall(name);
        let extendsStmt = createExpressionStatement(extendsExpr);
        write(extendsStmt);
    }
    
    function emitConstructor(node: ClassLikeDeclaration, name: Identifier, baseTypeNode: ExpressionWithTypeArguments, write: (node: Statement) => void) {
        let constructor = getFirstConstructorWithBody(node);
        let parameters: ParameterDeclaration[] = constructor ? visitNodes(constructor.parameters, transformNode) : [];
        let body = createBlock([]);

        if (constructor) {
            emitNode(constructor, transformConstructor, body.statements, VisitorFlags.LexicalEnvironment);
        }
        else if (baseTypeNode) {
            let superCall = createDefaultSuperCall();
            body.statements.push(superCall);
        }

        let constructorFunc = createFunctionDeclaration2(name, parameters, body);
        write(constructorFunc);
    }
    
    function transformConstructor(constructor: ConstructorDeclaration, write: (node: Statement) => void) {
        emitCaptureThisForNode(constructor, write);
        emitDefaultValueAssignments(constructor, write);
        emitRestParameter(constructor, write);
        pipeNodes(constructor.body.statements, transformNode, write);
    }
    
    function transformParameter(node: ParameterDeclaration, write: (node: ParameterDeclaration) => void) {
        if (isBindingPattern(node.name)) {
            write(createParameter2(
                getGeneratedNameForNode(node),
                /*initializer*/ undefined,
                /*location*/ node
            ));
        }
        else if (node.initializer) {
            write(createParameter2(
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

    function emitDefaultValueAssignments(node: FunctionLikeDeclaration, write: (node: Statement) => void) {
        if (!(node.transformFlags & (TransformFlags.SubtreeContainsParameterInitializer | TransformFlags.SubtreeContainsParameterBindingPattern))) {
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
            let varDecls = createVariableDeclarationList([]);
            transformBindingElement(parameter, tempName, varDecls.declarations, /*assignments*/ undefined);
            
            let varStmt = createVariableStatement2(varDecls);
            startOnNewLine(varStmt);
            write(varStmt);
        }
        else if (initializer) {
            let initExpr = visitNode(initializer, transformNode);
            let assignExpr = createAssignmentExpression(tempName, initExpr);
            let assignStmt = createExpressionStatement(assignExpr);
            startOnNewLine(assignStmt);
            write(assignStmt);
        }
    }
    
    function transformBindingElement(target: BindingElement, value: Expression, declarations: VariableDeclaration[], assignments: Expression[]): void {
        if (target.initializer) {
            // Combine value and initializer
            let initializer = visitNode(target.initializer, transformNode); 
            value = value ? createDefaultValueCheck(value, initializer, declarations, assignments) : initializer;
        }
        else if (!value) {
            // Use 'void 0' in absence of value and initializer
            value = createVoidZeroExpression();
        }
        
        let name = target.name;
        if (isBindingPattern(name)) {
            let elements = name.elements;
            if (elements.length !== 1) {
                // For anything but a single element destructuring we need to generate a temporary
                // to ensure value is evaluated exactly once.
                value = ensureIdentifier(value, declarations, assignments);
            }
            for (let i = 0; i < elements.length; i++) {
                let element = elements[i];
                if (name.kind === SyntaxKind.ObjectBindingPattern) {
                    // Rewrite element to a declaration with an initializer that fetches property
                    let propName = element.propertyName || <Identifier>element.name;
                    transformBindingElement(element, createPropertyOrElementAccessExpression(value, propName), declarations, assignments);
                }
                else if (element.kind !== SyntaxKind.OmittedExpression) {
                    if (!element.dotDotDotToken) {
                        // Rewrite element to a declaration that accesses array element at index i
                        transformBindingElement(element, createElementAccessExpression3(value, i), declarations, assignments);
                    }
                    else if (i === elements.length - 1) {
                        transformBindingElement(element, createSliceCall(value, i), declarations, assignments);
                    }
                }
            }
        }
        else {
            appendAssignment(name, value, declarations, assignments);
        }
    }
    
    function appendAssignment(left: Identifier, right: Expression, declarations: VariableDeclaration[], assignments: Expression[]): void {
        let varDecl = createVariableDeclaration2(left, assignments ? undefined : right);
        declarations.push(varDecl);
        
        if (assignments) {
            let assignExpr = createAssignmentExpression(left, right);
            assignments.push(assignExpr);
        }
    }
    
    function ensureIdentifier(value: Expression, declarations: VariableDeclaration[], assignments: Expression[]) {
        if (isIdentifier(value)) {
            return value;
        }
        else {
            let tempVar = createTempVariable(/*loopVariable*/ false);
            appendAssignment(tempVar, value, declarations, assignments);
            return tempVar;
        }
    }
    
    function createDefaultValueCheck(value: Expression, defaultValue: Expression, declarations: VariableDeclaration[], assignments: Expression[]) {
        value = ensureIdentifier(value, declarations, assignments);
        let equalityExpr = createStrictEqualityExpression(value, createVoidZeroExpression());
        let conditionalExpr = createConditionalExpression2(equalityExpr, defaultValue, value);
        return conditionalExpr;
    }
    
    function emitDefaultValueAssignmentForInitializer(parameter: ParameterDeclaration, name: Identifier, initializer: Expression, write: (node: Statement) => void): void {
        name = cloneNode(name);
        let equalityExpr = createStrictEqualityExpression(name, createVoidZeroExpression());
        let initExpr = visitNode(initializer, transformNode);
        let assignExpr = createAssignmentExpression(name, initExpr);
        let assignStmt = createExpressionStatement(assignExpr);
        let trueStmt = createBlock([assignStmt]);
        let ifStmt = createIfStatement(equalityExpr, trueStmt);
        startOnNewLine(ifStmt);
        write(ifStmt);
    }
    
    function emitRestParameter(node: FunctionLikeDeclaration, write: (node: Statement) => void): void {
        if (!(node.transformFlags & TransformFlags.SubtreeContainsRestParameter)) {
            return;
        }
        
        let restParam = lastOrUndefined(node.parameters);
        if (!restParam.dotDotDotToken || restParam.flags & NodeFlags.GeneratedRest) {
            return;
        }
        
        let restIndex = node.parameters.length - 1;
        let _i = createTempVariable(/*loopVariable*/ true);
        let name = <Identifier>getDeclarationName(restParam);
        let arrayExpr = createArrayLiteralExpression([]);
        let paramVarDecl = createVariableDeclaration2(name, arrayExpr);
        let paramVarDecls = createVariableDeclarationList([paramVarDecl]);
        let paramVarStmt = createVariableStatement2(paramVarDecls);
        startOnNewLine(paramVarStmt);
        write(paramVarStmt);
        
        let restIndexExpr = createNumericLiteral2(restIndex);
        let initializerVarDecl = createVariableDeclaration2(_i, restIndexExpr);
        let initializerVarDecls = createVariableDeclarationList([initializerVarDecl]);
        let argumentsName = createIdentifier("arguments");
        let lengthName = createIdentifier("length");
        let argumentsLengthExpr = createPropertyAccessExpression2(argumentsName, lengthName);
        let conditionExpr = createBinaryExpression2(_i, SyntaxKind.LessThanToken, argumentsLengthExpr);
        let incrementerExpr = createPostfixUnaryExpression(_i, SyntaxKind.PlusPlusToken);
        let arrayOffsetExpr = restIndex === 0 ? _i : createBinaryExpression2(_i, SyntaxKind.MinusToken, restIndexExpr);
        let arrayElementExpr = createElementAccessExpression2(name, arrayOffsetExpr);
        let argumentsElementExpr = createElementAccessExpression2(argumentsName, _i);
        let assignExpr = createAssignmentExpression(arrayElementExpr, argumentsElementExpr);
        let assignStmt = createExpressionStatement(assignExpr);
        startOnNewLine(assignStmt);

        let forBody  = createBlock([assignStmt]);
        let forStmt = createForStatement(initializerVarDecls, conditionExpr, incrementerExpr, forBody);
        startOnNewLine(forStmt);
        write(forStmt);
    }
    
    function emitCaptureThisForNode(node: Node, write: (node: Statement) => void): void {
        if (isArrowFunction(node) || !(node.transformFlags & TransformFlags.SubtreeCapturesLexicalThis)) {
            return;
        }
        
        let thisName = createIdentifier("_this");
        let thisExpr = createThisKeyword();
        let varDecl = createVariableDeclaration2(thisName, thisExpr);
        let varDecls = createVariableDeclarationList([varDecl]);
        let varStmt = createVariableStatement2(varDecls);
        startOnNewLine(varStmt);
        write(varStmt);
    }
    
    function emitMemberFunctions(node: ClassLikeDeclaration, write: (node: Statement) => void): void {
        for (let member of node.members) {
            if (isSemicolonClassElement(member)) {
                transformSemicolonClassElement(member, write);
            }
            else if (isMethodDeclaration(member)) {
                transformMethodDeclaration(node, member, write);
            }
            else if (isGetAccessor(member) || isSetAccessor(member)) {
                let accessors = getAllAccessorDeclarations(node.members, member);
                if (member === accessors.firstAccessor) {
                    transformAccessorDeclaration(node, accessors, write);
                }
            }
        }
    }
    
    function transformSemicolonClassElement(member: SemicolonClassElement, write: (node: Statement) => void): void {
        let stmt = createEmptyStatement();
        startOnNewLine(stmt);
        write(stmt);
    }
    
    function transformMethodDeclaration(node: ClassLikeDeclaration, member: MethodDeclaration, write: (node: Statement) => void): void {
        let prefix = getClassMemberPrefix(node, member);
        let propExpr = getMemberAccessForPropertyName(node, member);
        let funcExpr = rewriteFunctionExpression(member, /*name*/ undefined, /*location*/ undefined);
        let assignExpr = createAssignmentExpression(propExpr, funcExpr);
        let assignStmt = createExpressionStatement(assignExpr, /*location*/ member);
        startOnNewLine(assignStmt);
        write(assignStmt);
    }
    
    function transformAccessorDeclaration(node: ClassLikeDeclaration, accessors: AllAccessorDeclarations, write: (node: Statement) => void): void {
        let firstAccessor = accessors.firstAccessor;
        let prefix = getClassMemberPrefix(node, firstAccessor);
        let name = getExpressionForPropertyName(firstAccessor);
        let descriptorExpr = createObjectLiteralExpression2();
        if (accessors.getAccessor) {
            let funcExpr = rewriteFunctionExpression(accessors.getAccessor, /*name*/ undefined, /*location*/ accessors.getAccessor);
            let getName = createIdentifier("get");
            let getProp = createPropertyAssignment(getName, funcExpr);
            startOnNewLine(getProp);
            descriptorExpr.properties.push(getProp);
        }
        
        if (accessors.setAccessor) {
            let funcExpr = rewriteFunctionExpression(accessors.setAccessor, /*name*/ undefined, /*location*/ accessors.setAccessor);
            let setName = createIdentifier("set");
            let setProp = createPropertyAssignment(setName, funcExpr);
            startOnNewLine(setProp);
            descriptorExpr.properties.push(setProp);
        }
        
        let trueExpr = createTrueKeyword();
        let enumerableName = createIdentifier("enumerable");
        let enumerableProp = createPropertyAssignment(enumerableName, trueExpr)
        startOnNewLine(enumerableProp);
        descriptorExpr.properties.push(enumerableProp);
        
        let configurableName = createIdentifier("configurable");
        let configurableProp = createPropertyAssignment(configurableName, trueExpr);
        startOnNewLine(configurableProp);
        descriptorExpr.properties.push(configurableProp);
        
        let definePropertyExpr = createDefinePropertyCall(prefix, name, descriptorExpr);
        let definePropertyStmt = createExpressionStatement(definePropertyExpr);
        write(definePropertyStmt);
    }
    
    function transformFunctionExpression(node: FunctionExpression, write: (node: Expression) => void): void {
        write(rewriteFunctionExpression(node, node.name, /*location*/ node));
    }
    
    function rewriteFunctionExpression(node: FunctionLikeDeclaration, name: Identifier, location: TextRange): FunctionExpression {
        let parameters = visitNodes(node.parameters, transformNode);
        let body = createBlock([], node.body);
        emitNode(node, transformFunctionBody, body.statements, VisitorFlags.LexicalEnvironment);
        return createFunctionExpression2(name, parameters, body, location);
    }

    function transformFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void): void {
        let parameters = visitNodes(node.parameters, transformNode);
        let body = createBlock([], node.body);
        emitNode(node, transformFunctionBody, body.statements, VisitorFlags.LexicalEnvironment);
        write(createFunctionDeclaration2(node.name, parameters, body, /*location*/ node));
    }
    
    function transformToFunctionLikeDeclaration<T extends FunctionLikeDeclaration>(node: FunctionLikeDeclaration, name: Identifier, location: TextRange, 
        createfn: (name: DeclarationName, parameters: ParameterDeclaration[], body: Block, location: TextRange) => T): T {

        let parameters = visitNodes(node.parameters, transformNode);
        let newBody = createBlock([], /*location*/ isBlock(node.body) ? node.body : undefined);
        emitNode(node, transformFunctionBody, newBody.statements, VisitorFlags.LexicalEnvironment);
        
        let func = createfn(name, parameters, newBody, location);
        return func;
    }
    
    function transformFunctionBody(node: FunctionLikeDeclaration, write: (node: Statement) => void) {
        emitCaptureThisForNode(node, write);
        emitDefaultValueAssignments(node, write);
        emitRestParameter(node, write);
        
        let body = node.body;
        if (isBlock(body)) {
            pipeNodes(body.statements, transformNode, write);
        }
        else {
            let expr = visitNode(body, transformNode);
            if (expr) {
                let returnStmt = createReturnStatement(expr);
                if (!childNodeStartPositionIsOnSameLine(node, body)) {
                    startOnNewLine(returnStmt);
                }

                write(returnStmt);
            }
        }
    }
    
    function getExpressionForPropertyName(member: ClassElement): Expression {
        let memberName = <PropertyName>member.name;
        if (isIdentifier(memberName)) {
            return createStringLiteral(memberName.text);
        }
        else if (isComputedPropertyName(memberName)) {
            return visitNode(memberName.expression, transformNode);
        }
        else {
            return cloneNode(memberName);
        }
    }
    
    function getMemberAccessForPropertyName(node: ClassLikeDeclaration, member: ClassElement): LeftHandSideExpression {
        let target = getClassMemberPrefix(node, member);
        let memberName = <PropertyName>member.name;
        if (isIdentifier(memberName)) {
            return createPropertyAccessExpression2(target, cloneNode(memberName));
        }
        else if (isComputedPropertyName(memberName)) {
            let expression = visitNode(memberName.expression, transformNode);
            return createElementAccessExpression2(target, expression);
        }
        else {
            return createElementAccessExpression2(target, cloneNode(memberName));
        }
    }
    
    function transformThisKeyword(node: LeftHandSideExpression): LeftHandSideExpression {
        let container = getThisContainer(transform, /*includeArrowFunctions*/ true);
        if (isArrowFunction(container)) {
            let thisName = createIdentifier("_this");
            return thisName;
        }

        return node;
    }
    
    function transformInitialSuperCall(node: ExpressionStatement, write: (node: Statement) => void) {
        let statement = createDefaultSuperCall();
        return write(statement);
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