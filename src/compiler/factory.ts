/// <reference path="core.ts"/>
/// <reference path="factory.generated.ts" />
namespace ts {
    let nodeConstructors = new Array<new () => Node>(SyntaxKind.Count);

    export function getNodeConstructor(kind: SyntaxKind): new () => Node {
        return nodeConstructors[kind] || (nodeConstructors[kind] = objectAllocator.getNodeConstructor(kind));
    }
    
    export function createNode<T extends Node>(kind: SyntaxKind): T {
        return factory.createNode<T>(kind);
    }
    
    // @internal
    export namespace factory {
        export function setNodeFlags<T extends Node>(node: T, flags: NodeFlags): T {
            if (!node || flags === undefined) {
                return node;
            }
            
            node.flags = flags;
            return node;
        }
        
        export function setTextRange<T extends TextRange>(node: T, range: TextRange): T {
            if (!node || !range) {
                return node;
            }
            
            node.pos = range.pos;
            node.end = range.end;
            return node;
        }

        export function setModifiers<T extends Node>(node: T, modifiers: Node[]): T {
            if (modifiers) {
                node.modifiers = createModifiersArray(modifiers);
                node.flags |= node.modifiers.flags;
            }
            
            return node;
        }
        
        export function attachCommentRanges<T extends Node>(node: T, leadingCommentRanges: CommentRange[], trailingCommentRanges?: CommentRange[]): T {
            (<SynthesizedNode>node).leadingCommentRanges = leadingCommentRanges;
            (<SynthesizedNode>node).trailingCommentRanges = trailingCommentRanges;
            return node;
        }

        export function startOnNewLine<T extends Node>(node: T): T {
            (<SynthesizedNode>node).startsOnNewLine = true;
            return node;
        }
        
        export function updateFrom<T extends Node>(oldNode: T, newNode: T): T {
            let flags = oldNode.flags;
            if (oldNode.modifiers) {
                flags &= ~oldNode.modifiers.flags;
            }
            
            if (newNode.modifiers) {
                flags |= newNode.modifiers.flags;
            }
            
            newNode.flags = flags;
            newNode.original = oldNode;
            newNode.pos = oldNode.pos;
            newNode.end = oldNode.end;
            
            //mergeCommentRanges(oldNode, newNode);
            return newNode;
        }
        
        function mergeCommentRanges(oldNode: Node, newNode: Node) {
            if ((<SynthesizedNode>oldNode).leadingCommentRanges && !(<SynthesizedNode>newNode).leadingCommentRanges) {
                (<SynthesizedNode>newNode).leadingCommentRanges = (<SynthesizedNode>oldNode).leadingCommentRanges;
            }
            if ((<SynthesizedNode>oldNode).trailingCommentRanges && !(<SynthesizedNode>newNode).trailingCommentRanges) {
                (<SynthesizedNode>newNode).trailingCommentRanges = (<SynthesizedNode>oldNode).trailingCommentRanges;
            }
        }
        
        export function cloneNodeArray<T extends Node>(array: NodeArray<T>): NodeArray<T> {
            return array ? factory.createNodeArray(array.slice(0), /*location*/ array) : undefined;
        }
        
        export function createNode<T extends Node>(kind: SyntaxKind, location?: TextRange, flags?: NodeFlags): T {
            let node = <T>new (getNodeConstructor(kind))();
            if (location) {
                node.pos = location.pos;
                node.end = location.end;
            }
            if (flags) {
                node.flags = flags;
            }
            return node;
        }
        
        export function createNodeArray<T extends Node>(elements?: T[], location?: TextRange) {
            let nodes = <NodeArray<T>>(elements || []);
            if (location) {
                nodes.pos = location.pos;
                nodes.end = location.end;
            }
            else if (nodes.pos === undefined) {
                nodes.pos = -1;
                nodes.end = -1;
            }
            
            return nodes;
        }
        
        export function createModifiersArray(elements?: Node[], location?: TextRange) {
            let modifiers = <ModifiersArray>createNodeArray(elements || [], location);
            if (modifiers.flags === undefined) {
                let flags = 0;
                for (let modifier of modifiers) {
                    flags |= modifierToFlag(modifier.kind);
                }
                
                modifiers.flags = flags;
            }
            
            return modifiers;
        }
        
        export function createSourceFile(): SourceFile {
            let node = <SourceFile>createNode(SyntaxKind.SourceFile);
            return node;
        }
        
        export function updateSourceFile(node: SourceFile, statements: NodeArray<Statement>, endOfFileToken: Node): SourceFile {
            if (statements !== node.statements || endOfFileToken !== node.endOfFileToken) {
                let newNode = createSourceFile();
                newNode.statements = statements;
                newNode.endOfFileToken = endOfFileToken;
                return updateFrom(node, newNode); 
            }
            return node;
        }
        
        export function createNumericLiteral2(value: number, location?: TextRange, flags?: NodeFlags): LiteralExpression {
            let node = factory.createNumericLiteral(String(value), location, flags);
            return node;
        }

        export function createPropertyAccessExpression2(expression: Expression, name: Identifier, location?: TextRange, flags?: NodeFlags) {
            return factory.createPropertyAccessExpression(
                factory.parenthesizeForAccess(expression),
                factory.createNode(SyntaxKind.DotToken),
                name,
                location,
                flags
            );
        }
        
        export const enum BinaryOperand {
            Left,
            Right
        }

        export function parenthesizeForBinary(expr: Expression, operator: SyntaxKind) {
            // When diagnosing whether the expression needs parentheses, the decision should be based
            // on the innermost expression in a chain of nested type assertions.
            while (expr.kind === SyntaxKind.TypeAssertionExpression || expr.kind === SyntaxKind.AsExpression) {
                expr = (<AssertionExpression>expr).expression;
            }
            
            // If the resulting expression is already parenthesized, we do not need to do any further processing.
            if (isParenthesizedExpression(expr)) {
                return expr;
            }
            
            let exprPrecedence = getExpressionPrecedence(expr);
            let operatorPrecedence = getBinaryOperatorPrecedence(operator);
            if (exprPrecedence < operatorPrecedence) {
                // lower precedence, the expression needs parenthesis
                return factory.createParenthesizedExpression(expr);
            }
            else {
                // higher precedence. 
                return expr;
            }
        }

        export function parenthesizeForAccess(expr: Expression): LeftHandSideExpression {
            // When diagnosing whether the expression needs parentheses, the decision should be based
            // on the innermost expression in a chain of nested type assertions.
            while (expr.kind === SyntaxKind.TypeAssertionExpression || expr.kind === SyntaxKind.AsExpression) {
                expr = (<AssertionExpression>expr).expression;
            }

            // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
            // to parenthesize the expression before a dot. The known exceptions are:
            //
            //    NewExpression:
            //       new C.x        -> not the same as (new C).x
            //    NumberLiteral
            //       1.x            -> not the same as (1).x
            //
            if (isLeftHandSideExpression(expr) &&
                expr.kind !== SyntaxKind.NewExpression &&
                expr.kind !== SyntaxKind.NumericLiteral) {

                return <LeftHandSideExpression>expr;
            }
            
            return factory.createParenthesizedExpression(expr);
        }

        export function createCallExpression2(expression: Expression, _arguments?: Expression[], location?: TextRange, flags?: NodeFlags) {
            return factory.createCallExpression(
                parenthesizeForAccess(expression),
                /*typeArguments*/ undefined,
                _arguments,
                location,
                flags
            );
        }
        
        export function createObjectLiteralExpression2(properties?: ObjectLiteralElement[]) {
            return createObjectLiteralExpression(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createNodeArray(properties)
            );
        }
        
        export function createAssignmentExpression(left: Expression, right: Expression) {
            return createBinaryExpression2(left, SyntaxKind.EqualsToken, right);
        }
        
        export function createStrictEqualityExpression(left: Expression, right: Expression) {
            return createBinaryExpression2(left, SyntaxKind.EqualsEqualsEqualsToken, right);
        }
        
        export function createStrictInequalityExpression(left: Expression, right: Expression) {
            return createBinaryExpression2(left, SyntaxKind.ExclamationEqualsEqualsToken, right);
        }
        
        export function createLogicalAndExpression(left: Expression, right: Expression) {
            return createBinaryExpression2(left, SyntaxKind.AmpersandAmpersandToken, right);
        }
        
        export function createLogicalOrExpression(left: Expression, right: Expression) {
            return createBinaryExpression2(left, SyntaxKind.BarBarToken, right);
        }
        
        export function createCommaExpression(left: Expression, right: Expression) {
            return createBinaryExpression2(left, SyntaxKind.CommaToken, right);
        }

        export function createBinaryExpression2(left: Expression, operator: SyntaxKind, right: Expression) {
            return factory.createBinaryExpression(
                parenthesizeForBinary(left, operator),
                factory.createNode(operator),
                parenthesizeForBinary(right, operator)
            );
        }
        
        export function createConditionalExpression2(condition: Expression, whenTrue: Expression, whenFalse: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createConditionalExpression(
                condition,
                factory.createNode(SyntaxKind.QuestionToken),
                whenTrue,
                factory.createNode(SyntaxKind.ColonToken),
                whenFalse,
                location,
                flags
            );
        }
        
        export function createParameter2(name: BindingPattern | Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                name,
                /*questionToken*/ undefined,
                /*type*/ undefined,
                initializer,
                location,
                flags
            );
        }
        
        export function createRestParameter(name: Identifier, location?: TextRange, flags?: NodeFlags) {
            return factory.createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                factory.createNode(SyntaxKind.DotDotDotToken),
                name,
                /*questionToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined,
                location,
                flags
            );
        }
        
        export function createVariableStatement2(declarationList: VariableDeclarationList, location?: TextRange, flags?: NodeFlags) {
            return factory.createVariableStatement(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                declarationList,
                location,
                flags
            );
        }
        
        export function createVariableDeclaration2(name: Identifier | BindingPattern, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createVariableDeclaration(
                name,
                /*type*/ undefined,
                initializer,
                location,
                flags
            );
        }
        
        export function createClassDeclaration2(name: Identifier, heritageClause: HeritageClause, members: ClassElement[], location?: TextRange, flags?: NodeFlags): ClassDeclaration {
            return factory.createClassDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                /*typeParameters*/ undefined,
                heritageClause ? [heritageClause] : undefined,
                members,
                location,
                flags
            );
        }

        export function createClassExpression2(name: Identifier, heritageClause: HeritageClause, members: ClassElement[]): ClassExpression {
            return factory.createClassExpression(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                /*typeParameters*/ undefined,
                heritageClause ? [heritageClause] : undefined,
                members
            );
        }
        
        export function createConstructor2(parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): ConstructorDeclaration {
            return factory.createConstructor(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }
        
        export function createMethodDeclaration2(name: PropertyName, parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): MethodDeclaration {
            return factory.createMethodDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }

        export function createGetAccessor2(name: PropertyName, parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): GetAccessorDeclaration {
            return factory.createGetAccessor(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }

        export function createSetAccessor2(name: PropertyName, parameters: Array<ParameterDeclaration>, body: Block, location?: TextRange, flags?: NodeFlags): SetAccessorDeclaration {
            return factory.createSetAccessor(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }
        
        export function createFunctionDeclaration2(name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }
        
        export function createFunctionDeclaration3(asteriskToken: Node, name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                asteriskToken,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }        
        
        export function createFunctionExpression2(name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionExpression(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }
        
        export function createFunctionExpression3(asteriskToken: Node, name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionExpression(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                asteriskToken,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }
        
        export function createGeneratorFunctionExpression(name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionExpression(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createNode(SyntaxKind.AsteriskToken),
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }
        
        export function createVoidZeroExpression(location?: TextRange, flags?: NodeFlags): VoidExpression {
            return factory.createVoidExpression(
                factory.createNumericLiteral2(0),
                location,
                flags);
        }

        export function createPropertyOrElementAccessExpression(expression: Expression, propName: Identifier | LiteralExpression, location?: TextRange, flags?: NodeFlags): LeftHandSideExpression {
            if (!nodeIsSynthesized(propName)) {
                propName = cloneNode(propName);
            }
            
            if (propName.kind !== SyntaxKind.Identifier) {
                return createElementAccessExpression2(expression, propName, location, flags);
            }
            
            return createPropertyAccessExpression2(expression, <Identifier>propName, location, flags);
        }
        
        export function createElementAccessExpression2(expression: Expression, argumentExpression: Expression, location?: TextRange, flags?: NodeFlags): ElementAccessExpression {
            return factory.createElementAccessExpression(
                factory.parenthesizeForAccess(expression),
                argumentExpression,
                location,
                flags
            );
        }

        export function createElementAccessExpression3(expression: Expression, index: number, location?: TextRange, flags?: NodeFlags): ElementAccessExpression {
            return factory.createElementAccessExpression2(
                expression,
                factory.createNumericLiteral2(index),
                location,
                flags
            );
        }

        export function createSliceCall(value: Expression, sliceIndex: number, location?: TextRange, flags?: NodeFlags): CallExpression {
            return factory.createCallExpression2(
                factory.createPropertyAccessExpression2(
                    factory.parenthesizeForAccess(value),
                    factory.createIdentifier("slice")
                ),
                [factory.createNumericLiteral2(sliceIndex)],
                location,
                flags
            );
        }
        
        export function createApplyCall(target: Expression, thisArg: Expression, _arguments: Expression, location?: TextRange, flags?: NodeFlags) {
            let applyName = createIdentifier("apply");
            let propExpr = createPropertyAccessExpression2(target, applyName);
            return factory.createCallExpression2(propExpr, [thisArg, _arguments], location, flags);
        }

        export function createExtendsHelperCall(name: Identifier) {
            let extendsName = factory.createIdentifier("__extends");
            let superName = factory.createIdentifier("_super");
            let callExpr = factory.createCallExpression2(extendsName, [name, superName]);
            return callExpr;
        }
        
        export function createAwaiterHelperCall(hasLexicalArguments: boolean, promiseConstructor: EntityName | Expression, body: Block) {
            let thisExpr = factory.createThisKeyword();
            let awaiterName = factory.createIdentifier("__awaiter");
            let argumentsExpr = hasLexicalArguments ? factory.createIdentifier("arguments") : factory.createVoidZeroExpression();
            let promiseExpr = promiseConstructor ? convertEntityNameToExpression(promiseConstructor) : factory.createIdentifier("Promise");
            let generatorFunc = factory.createGeneratorFunctionExpression(/*name*/ undefined, [], body);
            let callExpr = factory.createCallExpression2(awaiterName, [thisExpr, argumentsExpr, promiseExpr, generatorFunc]);
            return callExpr;
        }
        
        function convertEntityNameToExpression(node: EntityName | Expression): Expression {
            if (isQualifiedName(node)) {
                let left = convertEntityNameToExpression(node.left);
                let right = factory.cloneNode(node.right);
                return factory.createPropertyAccessExpression2(left, right);
            }
            else {
                return factory.cloneNode(node);
            }
        }
        
        export function createDecorateHelperCall(decoratorExpressions: Expression[], target: Expression, memberName?: Expression, descriptor?: Expression) {
            let _arguments: Expression[] = [
                factory.createArrayLiteralExpression(decoratorExpressions),
                target
            ];
            if (memberName) {
                _arguments.push(memberName);
                if (descriptor) {
                    _arguments.push(descriptor);
                }
            }
            let decorateHelperName = factory.createIdentifier("__decorate");
            let decoratorsExpr = factory.createArrayLiteralExpression(decoratorExpressions);
            let callExpr = factory.createCallExpression2(decorateHelperName, _arguments);
            return callExpr;
        }
        
        export function createParamHelperCall(parameterIndex: number, decoratorExpression: Expression) {
            let paramHelperName = factory.createIdentifier("__param");
            let parameterIndexExpr = factory.createNumericLiteral(String(parameterIndex));
            let callExpr = factory.createCallExpression2(paramHelperName, [parameterIndexExpr, decoratorExpression]);
            return callExpr;
        }
        
        export function createMetadataHelperCall(metadataKey: string, metadataValue: Expression) {
            let metadataHelperName = factory.createIdentifier("__metadata");
            let metadataKeyExpr = factory.createStringLiteral(metadataKey);
            let callExpr = factory.createCallExpression2(metadataHelperName, [metadataKeyExpr, metadataValue]);
            return callExpr;
        }

        export function createDefinePropertyCall(target: Expression, memberName: Expression, descriptor: Expression) {
            let globalObjectName = factory.createIdentifier("Object");
            let definePropertyName = factory.createIdentifier("defineProperty");
            let propExpr = factory.createPropertyAccessExpression(globalObjectName, factory.createNode(SyntaxKind.DotToken), definePropertyName);
            let callExpr = factory.createCallExpression2(propExpr, [target, memberName, descriptor]);
            return callExpr;
        }
        
        export function createGetOwnPropertyDescriptorCall(target: Expression, memberName: Expression) {
            let globalObjectName = factory.createIdentifier("Object");
            let getOwnPropertyDescriptorName = factory.createIdentifier("getOwnPropertyDescriptor");
            let propExpr = factory.createPropertyAccessExpression(globalObjectName, factory.createNode(SyntaxKind.DotToken), getOwnPropertyDescriptorName);
            let callExpr = factory.createCallExpression2(propExpr, [target, memberName]);
            return callExpr;
        }
    
        export function createDefaultValueCheck(value: Expression, defaultValue: Expression, ensureIdentifier: (value: Expression) => Expression, location?: TextRange, flags?: NodeFlags): Expression {
            // The value expression will be evaluated twice, so for anything but a simple identifier
            // we need to generate a temporary variable
            value = ensureIdentifier(value);
            
            // <value> === void 0 ? <defaultValue> : <value>
            return factory.createConditionalExpression2(factory.createStrictEqualityExpression(value, factory.createVoidZeroExpression()), defaultValue, value, location, flags);
        }

        export function createMemberAccessForPropertyName(target: Expression, memberName: DeclarationName, location?: TextRange, flags?: NodeFlags): MemberExpression {
            if (isStringLiteral(memberName) || isNumericLiteral(memberName)) {
                return factory.createElementAccessExpression2(
                    target,
                    cloneNode(memberName),
                    location,
                    flags
                );
            }
            else if (isComputedPropertyName(memberName)) {
                // TODO(rbuckton): Decorators? Will be handled higher in the stack I think.
                return factory.createElementAccessExpression2(
                    target,
                    cloneNode(memberName.expression),
                    location,
                    flags
                );
            }
            else {
                return factory.createPropertyAccessExpression2(
                    target,
                    cloneNode(<Identifier>memberName),
                    location,
                    flags
                )
            }
        }
        
        export function inlineExpressions(expressions: Expression[]) {
            let expression = expressions[0];
            for (let i = 1; i < expressions.length; i++) {
                expression = createBinaryExpression2(
                    expression,
                    SyntaxKind.CommaToken,
                    expressions[i]
                );
            }
            
            return expression;
        }
    }

    export function isDeclarationStatement(node: Node): node is DeclarationStatement {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MissingDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ExportDeclaration:
                case SyntaxKind.ExportAssignment:
                    return true;
            }
        }
        return false; 
    }
}