/// <reference path="../transform.generated.ts" />
/*@internal*/
namespace ts.transform {
    export function toES5(statements: NodeArray<Statement>) {
        return visitNodes(statements, transformNode, VisitorFlags.NewLexicalEnvironment);
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
        let varDecl = factory.createVariableDeclaration2(name, classInitExpr);
        let varDecls = factory.createVariableDeclarationList([varDecl]);
        let varStmt = factory.createVariableStatement2(varDecls, /*location*/ node);
        return write(varStmt);
    } 
    
    function transformClassExpression(node: ClassExpression, write: (node: LeftHandSideExpression) => void) {
        let name = getDeclarationName(node);
        return write(transformClassLikeDeclaration(node, name));
    }

    function transformClassLikeDeclaration(node: ClassLikeDeclaration, name: Identifier): LeftHandSideExpression {
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        let classBody = factory.createBlock([]);
        emitNode(node, classBody.statements, transformClassBody);
        
        let superExpr = baseTypeNode ? visitNode(baseTypeNode.expression, transformNode) : undefined;
        let superName = baseTypeNode ? factory.createIdentifier("_super") : undefined;
        let superParam = baseTypeNode ? factory.createParameter2(superName) : undefined;
        let classDecl = factory.createFunctionExpression2(/*name*/ undefined, baseTypeNode ? [superParam] : [], classBody);
        let parenExpr = factory.createParenthesizedExpression(classDecl);
        let callExpr = factory.createCallExpression2(parenExpr, baseTypeNode ? [superExpr] : undefined);
        return callExpr;
    }
    
    function transformClassBody(node: ClassLikeDeclaration, write: (node: Statement) => void): void {
        let name = getDeclarationName(node);
        let baseTypeNode = getClassExtendsHeritageClauseElement(node);
        emitExtendsCall(node, name, baseTypeNode, write);
        emitConstructor(node, name, baseTypeNode, write);
        emitMemberFunctions(node, write);

        let returnStmt = factory.createReturnStatement(name);
        write(returnStmt);
    }
    
    function emitExtendsCall(node: ClassLikeDeclaration, name: Identifier, baseTypeNode: ExpressionWithTypeArguments, write: (node: Statement) => void): void {
        if (!baseTypeNode) {
            return;
        }
        
        let extendsExpr = factory.createExtendsHelperCall(name);
        let extendsStmt = factory.createExpressionStatement(extendsExpr);
        write(extendsStmt);
    }
    
    function emitConstructor(node: ClassLikeDeclaration, name: Identifier, baseTypeNode: ExpressionWithTypeArguments, write: (node: Statement) => void) {
        let constructor = getFirstConstructorWithBody(node);
        let parameters: ParameterDeclaration[] = constructor ? visitNodes(constructor.parameters, transformNode) : [];
        let body = factory.createBlock([]);

        if (constructor) {
            emitNode(constructor, body.statements, transformConstructor, VisitorFlags.NewLexicalEnvironment);
        }
        else if (baseTypeNode) {
            let superCall = createDefaultSuperCall();
            body.statements.push(superCall);
        }

        let constructorFunc = factory.createFunctionDeclaration2(name, parameters, body);
        write(constructorFunc);
    }
    
    function transformConstructor(constructor: ConstructorDeclaration, write: (node: Statement) => void) {
        emitCaptureThisForNode(constructor, write);
        emitDefaultValueAssignments(constructor, write);
        emitRestParameter(constructor, write);
        pipeNodes(constructor.body.statements, write, transformNode);
    }
    
    function transformParameter(node: ParameterDeclaration, write: (node: ParameterDeclaration) => void) {
        if (isBindingPattern(node.name)) {
            write(factory.createParameter2(
                getGeneratedNameForNode(node),
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

    function emitDefaultValueAssignments(node: FunctionLikeDeclaration, write: (node: Statement) => void) {
        if (!(node.transformFlags & (TransformFlags.SubtreeContainsParameterInitializer | TransformFlags.SubtreeContainsParameterBindingPattern))) {
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
            let varDecls = factory.createVariableDeclarationList([]);
            transformBindingElement(parameter, tempName, varDecls.declarations, /*assignments*/ undefined);
            
            let varStmt = factory.createVariableStatement2(varDecls);
            factory.startOnNewLine(varStmt);
            write(varStmt);
        }
        else if (initializer) {
            let initExpr = visitNode(initializer, transformNode);
            let assignExpr = factory.createAssignmentExpression(tempName, initExpr);
            let assignStmt = factory.createExpressionStatement(assignExpr);
            factory.startOnNewLine(assignStmt);
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
            value = factory.createVoidZeroExpression();
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
                    transformBindingElement(element, factory.createPropertyOrElementAccessExpression(value, propName), declarations, assignments);
                }
                else if (element.kind !== SyntaxKind.OmittedExpression) {
                    if (!element.dotDotDotToken) {
                        // Rewrite element to a declaration that accesses array element at index i
                        transformBindingElement(element, factory.createElementAccessExpression3(value, i), declarations, assignments);
                    }
                    else if (i === elements.length - 1) {
                        transformBindingElement(element, factory.createSliceCall(value, i), declarations, assignments);
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
        let equalityExpr = factory.createStrictEqualityExpression(value, factory.createVoidZeroExpression());
        let conditionalExpr = factory.createConditionalExpression2(equalityExpr, defaultValue, value);
        return conditionalExpr;
    }
    
    function emitDefaultValueAssignmentForInitializer(parameter: ParameterDeclaration, name: Identifier, initializer: Expression, write: (node: Statement) => void): void {
        name = factory.cloneNode(name);
        let equalityExpr = factory.createStrictEqualityExpression(name, factory.createVoidZeroExpression());
        let initExpr = visitNode(initializer, transformNode);
        let assignExpr = factory.createAssignmentExpression(name, initExpr);
        let assignStmt = factory.createExpressionStatement(assignExpr);
        let trueStmt = factory.createBlock([assignStmt]);
        let ifStmt = factory.createIfStatement(equalityExpr, trueStmt);
        factory.startOnNewLine(ifStmt);
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
        let arrayExpr = factory.createArrayLiteralExpression([]);
        let paramVarDecl = factory.createVariableDeclaration2(name, arrayExpr);
        let paramVarDecls = factory.createVariableDeclarationList([paramVarDecl]);
        let paramVarStmt = factory.createVariableStatement2(paramVarDecls);
        factory.startOnNewLine(paramVarStmt);
        write(paramVarStmt);
        
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
        write(forStmt);
    }
    
    function emitCaptureThisForNode(node: Node, write: (node: Statement) => void): void {
        if (isArrowFunction(node) || !(node.transformFlags & TransformFlags.SubtreeCapturesLexicalThis)) {
            return;
        }
        
        let thisName = factory.createIdentifier("_this");
        let thisExpr = factory.createThisKeyword();
        let varDecl = factory.createVariableDeclaration2(thisName, thisExpr);
        let varDecls = factory.createVariableDeclarationList([varDecl]);
        let varStmt = factory.createVariableStatement2(varDecls);
        factory.startOnNewLine(varStmt);
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
        let stmt = factory.createEmptyStatement();
        factory.startOnNewLine(stmt);
        write(stmt);
    }
    
    function transformMethodDeclaration(node: ClassLikeDeclaration, member: MethodDeclaration, write: (node: Statement) => void): void {
        let prefix = getClassMemberPrefix(node, member);
        let propExpr = getMemberAccessForPropertyName(node, member);
        let funcExpr = rewriteFunctionExpression(member, /*name*/ undefined, /*location*/ undefined);
        let assignExpr = factory.createAssignmentExpression(propExpr, funcExpr);
        let assignStmt = factory.createExpressionStatement(assignExpr, /*location*/ member);
        factory.startOnNewLine(assignStmt);
        write(assignStmt);
    }
    
    function transformAccessorDeclaration(node: ClassLikeDeclaration, accessors: AllAccessorDeclarations, write: (node: Statement) => void): void {
        let firstAccessor = accessors.firstAccessor;
        let prefix = getClassMemberPrefix(node, firstAccessor);
        let name = getExpressionForPropertyName(firstAccessor);
        let descriptorExpr = factory.createObjectLiteralExpression2();
        if (accessors.getAccessor) {
            let funcExpr = rewriteFunctionExpression(accessors.getAccessor, /*name*/ undefined, /*location*/ accessors.getAccessor);
            let getName = factory.createIdentifier("get");
            let getProp = factory.createPropertyAssignment(getName, funcExpr);
            factory.startOnNewLine(getProp);
            descriptorExpr.properties.push(getProp);
        }
        
        if (accessors.setAccessor) {
            let funcExpr = rewriteFunctionExpression(accessors.setAccessor, /*name*/ undefined, /*location*/ accessors.setAccessor);
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
        write(definePropertyStmt);
    }
    
    function transformFunctionExpression(node: FunctionExpression, write: (node: Expression) => void): void {
        write(rewriteFunctionExpression(node, node.name, /*location*/ node));
    }
    
    function rewriteFunctionExpression(node: FunctionLikeDeclaration, name: Identifier, location: TextRange): FunctionExpression {
        let parameters = visitNodes(node.parameters, transformNode);
        let body = factory.createBlock([], node.body);
        emitNode(node, body.statements, transformFunctionBody, VisitorFlags.NewLexicalEnvironment);
        return factory.createFunctionExpression2(name, parameters, body, location);
    }

    function transformFunctionDeclaration(node: FunctionDeclaration, write: (node: Statement) => void): void {
        let parameters = visitNodes(node.parameters, transformNode);
        let body = factory.createBlock([], node.body);
        emitNode(node, body.statements, transformFunctionBody, VisitorFlags.NewLexicalEnvironment);
        write(factory.createFunctionDeclaration2(node.name, parameters, body, /*location*/ node));
    }
    
    function transformToFunctionLikeDeclaration<T extends FunctionLikeDeclaration>(node: FunctionLikeDeclaration, name: Identifier, location: TextRange, 
        createfn: (name: DeclarationName, parameters: ParameterDeclaration[], body: Block, location: TextRange) => T): T {

        let parameters = visitNodes(node.parameters, transformNode);
        let newBody = factory.createBlock([], /*location*/ isBlock(node.body) ? node.body : undefined);
        emitNode(node, newBody.statements, transformFunctionBody, VisitorFlags.NewLexicalEnvironment);
        
        let func = createfn(name, parameters, newBody, location);
        return func;
    }
    
    function transformFunctionBody(node: FunctionLikeDeclaration, write: (node: Statement) => void) {
        emitCaptureThisForNode(node, write);
        emitDefaultValueAssignments(node, write);
        emitRestParameter(node, write);
        
        let body = node.body;
        if (isBlock(body)) {
            pipeNodes(body.statements, write, transformNode);
        }
        else {
            let expr = visitNode(body, transformNode);
            if (expr) {
                let returnStmt = factory.createReturnStatement(expr);
                if (!childNodeStartPositionIsOnSameLine(node, body)) {
                    factory.startOnNewLine(returnStmt);
                }

                write(returnStmt);
            }
        }
    }
    
    function getExpressionForPropertyName(member: ClassElement): Expression {
        let memberName = <PropertyName>member.name;
        if (isIdentifier(memberName)) {
            return factory.createStringLiteral(memberName.text);
        }
        else if (isComputedPropertyName(memberName)) {
            return visitNode(memberName.expression, transformNode);
        }
        else {
            return factory.cloneNode(memberName);
        }
    }
    
    function getMemberAccessForPropertyName(node: ClassLikeDeclaration, member: ClassElement): LeftHandSideExpression {
        let target = getClassMemberPrefix(node, member);
        let memberName = <PropertyName>member.name;
        if (isIdentifier(memberName)) {
            return factory.createPropertyAccessExpression2(target, factory.cloneNode(memberName));
        }
        else if (isComputedPropertyName(memberName)) {
            let expression = visitNode(memberName.expression, transformNode);
            return factory.createElementAccessExpression2(target, expression);
        }
        else {
            return factory.createElementAccessExpression2(target, factory.cloneNode(memberName));
        }
    }
    
    function transformThisKeyword(node: LeftHandSideExpression): LeftHandSideExpression {
        let container = getThisContainer(transform, /*includeArrowFunctions*/ true);
        if (isArrowFunction(container)) {
            let thisName = factory.createIdentifier("_this");
            return thisName;
        }

        return node;
    }
    
    function transformInitialSuperCall(node: ExpressionStatement, write: (node: Statement) => void) {
        let statement = createDefaultSuperCall();
        return write(statement);
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