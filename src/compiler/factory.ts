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
            (<SynthesizedNode><Node>node).leadingCommentRanges = leadingCommentRanges;
            (<SynthesizedNode><Node>node).trailingCommentRanges = trailingCommentRanges;
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
            
            mergeCommentRanges(oldNode, newNode);
            return setTextRange(newNode, oldNode);
        }
        
        function mergeCommentRanges(oldNode: Node, newNode: Node) {
            if ((<SynthesizedNode>oldNode).leadingCommentRanges && !(<SynthesizedNode>newNode).leadingCommentRanges) {
                (<SynthesizedNode>newNode).leadingCommentRanges = (<SynthesizedNode>oldNode).leadingCommentRanges;
            }
            if ((<SynthesizedNode>oldNode).trailingCommentRanges && !(<SynthesizedNode>newNode).trailingCommentRanges) {
                (<SynthesizedNode>newNode).trailingCommentRanges = (<SynthesizedNode>oldNode).trailingCommentRanges;
            }
        }
        
        export function createNode<T extends Node>(kind: SyntaxKind, location?: TextRange, flags?: NodeFlags): T {
            return setNodeFlags(setTextRange(<T>new (getNodeConstructor(kind))(), location), flags);
        }
        
        export function createNodeArray<T extends Node>(elements?: T[], location?: TextRange) {
            let nodes = <NodeArray<T>>(elements || []);
            if (nodes.pos === undefined) {
                nodes.pos = -1;
                nodes.end = -1;
            }
            
            return setTextRange(nodes, location);
        }
        
        export function createModifiersArray(elements?: Node[], location?: TextRange) {
            let modifiers = <ModifiersArray>(elements || []);
            if (modifiers.flags === undefined) {
                let flags = 0;
                for (let modifier of modifiers) {
                    flags |= modifierToFlag(modifier.kind);
                }
                
                modifiers.flags = flags;
            }
            
            return setTextRange(modifiers, location);
        }
        
        export function createSourceFile(): SourceFile {
            let node = <SourceFile>createNode(SyntaxKind.SourceFile);
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

        export function createCallExpression2(expression: LeftHandSideExpression, _arguments?: Expression[], location?: TextRange, flags?: NodeFlags) {
            return factory.createCallExpression(
                expression,
                /*typeArguments*/ undefined,
                _arguments,
                location,
                flags
            );
        }
        
        export function createAssignmentExpression(left: Expression, right: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createBinaryExpression2(left, SyntaxKind.EqualsToken, right, location, flags);
        }
        
        export function createAssignmentExpressionStatement(left: Expression, right: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createExpressionStatement(factory.createAssignmentExpression(left, right), location, flags);
        }

        export function createBinaryExpression2(left: Expression, operator: SyntaxKind, right: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createBinaryExpression(
                left,
                factory.createNode(operator),
                right,
                location,
                flags
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
        
        export function createInlineFunctionExpressionEvaluation(parameters: ParameterDeclaration[], bodyStatements: Statement[], _arguments: Expression[], location?: TextRange, flags?: NodeFlags) {
            return factory.createCallExpression2(
                factory.createParenthesizedExpression(
                    factory.createFunctionExpression5(
                        parameters,
                        bodyStatements
                    )
                ),
                _arguments,
                location,
                flags
            );
        }
        
        export function createParameter2(name: BindingPattern | Identifier, location?: TextRange, flags?: NodeFlags) {
            return factory.createParameter(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                name,
                /*questionToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined,
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
        
        export function createVariableStatement2(name: Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createVariableStatement(
                factory.createVariableDeclarationList([
                    factory.createVariableDeclaration2(name, initializer)
                ], /*location*/ undefined, flags & (NodeFlags.Let | NodeFlags.Const)),
                location,
                flags & ~(NodeFlags.Let | NodeFlags.Const) 
            );
        }
        
        export function createVariableDeclaration2(name: Identifier, initializer?: Expression, location?: TextRange, flags?: NodeFlags) {
            return factory.createVariableDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                /*type*/ undefined,
                initializer,
                location,
                flags
            );
        }
        
        export function createClassDeclaration2(modifiers: Modifier[], name: Identifier, heritageClause: HeritageClause, members: ClassElement[]): ClassDeclaration {
            return factory.createClassDeclaration(
                /*decorators*/ undefined,
                modifiers,
                name,
                /*typeParameters*/ undefined,
                heritageClause ? [heritageClause] : undefined,
                members
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
        
        export function createClassExpression3(heritageClause: HeritageClause, members: ClassElement[]) {
            return factory.createClassExpression2(
                /*name*/ undefined,
                heritageClause,
                members
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

        export function createFunctionDeclaration3(name: Identifier, parameters: ParameterDeclaration[], body: Statement[], location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionDeclaration2(
                name,
                parameters,
                factory.createBlock(body || []),
                location,
                flags);
        }
        
        export function createFunctionExpression2(name: Identifier, parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionExpression(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body,
                location,
                flags
            );
        }
        
        export function createFunctionExpression3(parameters: ParameterDeclaration[], body: Block, location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionExpression2(
                /*name*/ undefined,
                parameters,
                body,
                location,
                flags
            );
        }

        export function createFunctionExpression4(name: Identifier, parameters: ParameterDeclaration[], body: Statement[], location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionExpression2(
                name,
                parameters,
                factory.createBlock(body || []),
                location,
                flags
            );
        }

        export function createFunctionExpression5(parameters: ParameterDeclaration[], body: Statement[], location?: TextRange, flags?: NodeFlags) {
            return factory.createFunctionExpression2(
                /*name*/ undefined,
                parameters,
                factory.createBlock(body || []),
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
        
        export function createDefaultValueCheck(value: Expression, defaultValue: Expression, ensureIdentifier: (value: Expression) => Expression, location?: TextRange, flags?: NodeFlags): Expression {
            // The value expression will be evaluated twice, so for anything but a simple identifier
            // we need to generate a temporary variable
            value = ensureIdentifier(value);
            
            // <value> === void 0 ? <defaultValue> : <value>
            return factory.createConditionalExpression2(factory.createAssignmentExpression(value, factory.createVoidZeroExpression()), defaultValue, value, location, flags);
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
                expression = factory.createBinaryExpression2(
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