///<reference path='references.ts' />

module TypeScript {
    export class SyntaxRewriter implements ISyntaxVisitor {
        public visitToken(token: ISyntaxToken): ISyntaxToken {
            return token;
        }

        public visitNode(node: SyntaxNode): SyntaxNode {
            return node.accept(this);
        }

        public visitNodeOrToken(node: ISyntaxNodeOrToken): ISyntaxNodeOrToken {
            return node.isToken() ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>node) : this.visitNode(<SyntaxNode>node);
        }

        public visitList(list: ISyntaxList): ISyntaxList {
            var newItems: ISyntaxNodeOrToken[] = null;

            for (var i = 0, n = list.childCount(); i < n; i++) {
                var item = list.childAt(i);
                var newItem = this.visitNodeOrToken(item);

                if (item !== newItem && newItems === null) {
                    newItems = [];
                    for (var j = 0; j < i; j++) {
                        newItems.push(list.childAt(j));
                    }
                }

                if (newItems) {
                    newItems.push(newItem);
                }
            }

            // Debug.assert(newItems === null || newItems.length === list.childCount());
            return newItems === null ? list : Syntax.list(newItems);
        }

        public visitSeparatedList(list: ISeparatedSyntaxList): ISeparatedSyntaxList {
            var newItems: ISyntaxNodeOrToken[] = null;

            for (var i = 0, n = list.childCount(); i < n; i++) {
                var item = list.childAt(i);
                var newItem = item.isToken() ? <ISyntaxNodeOrToken>this.visitToken(<ISyntaxToken>item) : this.visitNode(<SyntaxNode>item);

                if (item !== newItem && newItems === null) {
                    newItems = [];
                    for (var j = 0; j < i; j++) {
                        newItems.push(list.childAt(j));
                    }
                }

                if (newItems) {
                    newItems.push(newItem);
                }
            }

            // Debug.assert(newItems === null || newItems.length === list.childCount());
            return newItems === null ? list : Syntax.separatedList(newItems);
        }

        public visitSourceUnit(node: SourceUnitSyntax): any {
            return node.update(
                this.visitList(node.moduleElements),
                this.visitToken(node.endOfFileToken));
        }

        public visitExternalModuleReference(node: ExternalModuleReferenceSyntax): any {
            return node.update(
                this.visitToken(node.requireKeyword),
                this.visitToken(node.openParenToken),
                this.visitToken(node.stringLiteral),
                this.visitToken(node.closeParenToken));
        }

        public visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): any {
            return node.update(
                <INameSyntax>this.visitNodeOrToken(node.moduleName));
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.importKeyword),
                this.visitToken(node.identifier),
                this.visitToken(node.equalsToken),
                <IModuleReferenceSyntax>this.visitNodeOrToken(node.moduleReference),
                this.visitToken(node.semicolonToken));
        }

        public visitExportAssignment(node: ExportAssignmentSyntax): any {
            return node.update(
                this.visitToken(node.exportKeyword),
                this.visitToken(node.equalsToken),
                this.visitToken(node.identifier),
                this.visitToken(node.semicolonToken));
        }

        public visitClassDeclaration(node: ClassDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.classKeyword),
                this.visitToken(node.identifier),
                node.typeParameterList === null ? null : <TypeParameterListSyntax>this.visitNode(node.typeParameterList),
                this.visitList(node.heritageClauses),
                this.visitToken(node.openBraceToken),
                this.visitList(node.classElements),
                this.visitToken(node.closeBraceToken));
        }

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.interfaceKeyword),
                this.visitToken(node.identifier),
                node.typeParameterList === null ? null : <TypeParameterListSyntax>this.visitNode(node.typeParameterList),
                this.visitList(node.heritageClauses),
                <ObjectTypeSyntax>this.visitNode(node.body));
        }

        public visitHeritageClause(node: HeritageClauseSyntax): any {
            return node.update(
                node.kind(),
                this.visitToken(node.extendsOrImplementsKeyword),
                this.visitSeparatedList(node.typeNames));
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.moduleKeyword),
                node.name === null ? null : <INameSyntax>this.visitNodeOrToken(node.name),
                node.stringLiteral === null ? null : this.visitToken(node.stringLiteral),
                this.visitToken(node.openBraceToken),
                this.visitList(node.moduleElements),
                this.visitToken(node.closeBraceToken));
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.functionKeyword),
                this.visitToken(node.identifier),
                <CallSignatureSyntax>this.visitNode(node.callSignature),
                node.block === null ? null : <BlockSyntax>this.visitNode(node.block),
                node.semicolonToken === null ? null : this.visitToken(node.semicolonToken));
        }

        public visitVariableStatement(node: VariableStatementSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                <VariableDeclarationSyntax>this.visitNode(node.variableDeclaration),
                this.visitToken(node.semicolonToken));
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): any {
            return node.update(
                this.visitToken(node.varKeyword),
                this.visitSeparatedList(node.variableDeclarators));
        }

        public visitVariableDeclarator(node: VariableDeclaratorSyntax): any {
            return node.update(
                this.visitToken(node.propertyName),
                node.typeAnnotation === null ? null : <TypeAnnotationSyntax>this.visitNode(node.typeAnnotation),
                node.equalsValueClause === null ? null : <EqualsValueClauseSyntax>this.visitNode(node.equalsValueClause));
        }

        public visitEqualsValueClause(node: EqualsValueClauseSyntax): any {
            return node.update(
                this.visitToken(node.equalsToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.value));
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): any {
            return node.update(
                node.kind(),
                this.visitToken(node.operatorToken),
                <IUnaryExpressionSyntax>this.visitNodeOrToken(node.operand));
        }

        public visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): any {
            return node.update(
                this.visitToken(node.openBracketToken),
                this.visitSeparatedList(node.expressions),
                this.visitToken(node.closeBracketToken));
        }

        public visitOmittedExpression(node: OmittedExpressionSyntax): any {
            return node;
        }

        public visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): any {
            return node.update(
                this.visitToken(node.openParenToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.closeParenToken));
        }

        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): any {
            return node.update(
                this.visitToken(node.identifier),
                this.visitToken(node.equalsGreaterThanToken),
                node.block === null ? null : <BlockSyntax>this.visitNode(node.block),
                node.expression === null ? null : <IExpressionSyntax>this.visitNodeOrToken(node.expression));
        }

        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): any {
            return node.update(
                <CallSignatureSyntax>this.visitNode(node.callSignature),
                this.visitToken(node.equalsGreaterThanToken),
                node.block === null ? null : <BlockSyntax>this.visitNode(node.block),
                node.expression === null ? null : <IExpressionSyntax>this.visitNodeOrToken(node.expression));
        }

        public visitQualifiedName(node: QualifiedNameSyntax): any {
            return node.update(
                <INameSyntax>this.visitNodeOrToken(node.left),
                this.visitToken(node.dotToken),
                this.visitToken(node.right));
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): any {
            return node.update(
                this.visitToken(node.lessThanToken),
                this.visitSeparatedList(node.typeArguments),
                this.visitToken(node.greaterThanToken));
        }

        public visitConstructorType(node: ConstructorTypeSyntax): any {
            return node.update(
                this.visitToken(node.newKeyword),
                node.typeParameterList === null ? null : <TypeParameterListSyntax>this.visitNode(node.typeParameterList),
                <ParameterListSyntax>this.visitNode(node.parameterList),
                this.visitToken(node.equalsGreaterThanToken),
                <ITypeSyntax>this.visitNodeOrToken(node.type));
        }

        public visitFunctionType(node: FunctionTypeSyntax): any {
            return node.update(
                node.typeParameterList === null ? null : <TypeParameterListSyntax>this.visitNode(node.typeParameterList),
                <ParameterListSyntax>this.visitNode(node.parameterList),
                this.visitToken(node.equalsGreaterThanToken),
                <ITypeSyntax>this.visitNodeOrToken(node.type));
        }

        public visitObjectType(node: ObjectTypeSyntax): any {
            return node.update(
                this.visitToken(node.openBraceToken),
                this.visitSeparatedList(node.typeMembers),
                this.visitToken(node.closeBraceToken));
        }

        public visitArrayType(node: ArrayTypeSyntax): any {
            return node.update(
                <ITypeSyntax>this.visitNodeOrToken(node.type),
                this.visitToken(node.openBracketToken),
                this.visitToken(node.closeBracketToken));
        }

        public visitGenericType(node: GenericTypeSyntax): any {
            return node.update(
                <INameSyntax>this.visitNodeOrToken(node.name),
                <TypeArgumentListSyntax>this.visitNode(node.typeArgumentList));
        }

        public visitTypeQuery(node: TypeQuerySyntax): any {
            return node.update(
                this.visitToken(node.typeOfKeyword),
                <INameSyntax>this.visitNodeOrToken(node.name));
        }

        public visitTypeAnnotation(node: TypeAnnotationSyntax): any {
            return node.update(
                this.visitToken(node.colonToken),
                <ITypeSyntax>this.visitNodeOrToken(node.type));
        }

        public visitBlock(node: BlockSyntax): any {
            return node.update(
                this.visitToken(node.openBraceToken),
                this.visitList(node.statements),
                this.visitToken(node.closeBraceToken));
        }

        public visitParameter(node: ParameterSyntax): any {
            return node.update(
                node.dotDotDotToken === null ? null : this.visitToken(node.dotDotDotToken),
                this.visitList(node.modifiers),
                this.visitToken(node.identifier),
                node.questionToken === null ? null : this.visitToken(node.questionToken),
                node.typeAnnotation === null ? null : <TypeAnnotationSyntax>this.visitNode(node.typeAnnotation),
                node.equalsValueClause === null ? null : <EqualsValueClauseSyntax>this.visitNode(node.equalsValueClause));
        }

        public visitMemberAccessExpression(node: MemberAccessExpressionSyntax): any {
            return node.update(
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.dotToken),
                this.visitToken(node.name));
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): any {
            return node.update(
                node.kind(),
                <IMemberExpressionSyntax>this.visitNodeOrToken(node.operand),
                this.visitToken(node.operatorToken));
        }

        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): any {
            return node.update(
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.openBracketToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.argumentExpression),
                this.visitToken(node.closeBracketToken));
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): any {
            return node.update(
                <IMemberExpressionSyntax>this.visitNodeOrToken(node.expression),
                <ArgumentListSyntax>this.visitNode(node.argumentList));
        }

        public visitArgumentList(node: ArgumentListSyntax): any {
            return node.update(
                node.typeArgumentList === null ? null : <TypeArgumentListSyntax>this.visitNode(node.typeArgumentList),
                this.visitToken(node.openParenToken),
                this.visitSeparatedList(node.arguments),
                this.visitToken(node.closeParenToken));
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): any {
            return node.update(
                node.kind(),
                <IExpressionSyntax>this.visitNodeOrToken(node.left),
                this.visitToken(node.operatorToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.right));
        }

        public visitConditionalExpression(node: ConditionalExpressionSyntax): any {
            return node.update(
                <IExpressionSyntax>this.visitNodeOrToken(node.condition),
                this.visitToken(node.questionToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.whenTrue),
                this.visitToken(node.colonToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.whenFalse));
        }

        public visitConstructSignature(node: ConstructSignatureSyntax): any {
            return node.update(
                this.visitToken(node.newKeyword),
                <CallSignatureSyntax>this.visitNode(node.callSignature));
        }

        public visitMethodSignature(node: MethodSignatureSyntax): any {
            return node.update(
                this.visitToken(node.propertyName),
                node.questionToken === null ? null : this.visitToken(node.questionToken),
                <CallSignatureSyntax>this.visitNode(node.callSignature));
        }

        public visitIndexSignature(node: IndexSignatureSyntax): any {
            return node.update(
                this.visitToken(node.openBracketToken),
                <ParameterSyntax>this.visitNode(node.parameter),
                this.visitToken(node.closeBracketToken),
                node.typeAnnotation === null ? null : <TypeAnnotationSyntax>this.visitNode(node.typeAnnotation));
        }

        public visitPropertySignature(node: PropertySignatureSyntax): any {
            return node.update(
                this.visitToken(node.propertyName),
                node.questionToken === null ? null : this.visitToken(node.questionToken),
                node.typeAnnotation === null ? null : <TypeAnnotationSyntax>this.visitNode(node.typeAnnotation));
        }

        public visitCallSignature(node: CallSignatureSyntax): any {
            return node.update(
                node.typeParameterList === null ? null : <TypeParameterListSyntax>this.visitNode(node.typeParameterList),
                <ParameterListSyntax>this.visitNode(node.parameterList),
                node.typeAnnotation === null ? null : <TypeAnnotationSyntax>this.visitNode(node.typeAnnotation));
        }

        public visitParameterList(node: ParameterListSyntax): any {
            return node.update(
                this.visitToken(node.openParenToken),
                this.visitSeparatedList(node.parameters),
                this.visitToken(node.closeParenToken));
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): any {
            return node.update(
                this.visitToken(node.lessThanToken),
                this.visitSeparatedList(node.typeParameters),
                this.visitToken(node.greaterThanToken));
        }

        public visitTypeParameter(node: TypeParameterSyntax): any {
            return node.update(
                this.visitToken(node.identifier),
                node.constraint === null ? null : <ConstraintSyntax>this.visitNode(node.constraint));
        }

        public visitConstraint(node: ConstraintSyntax): any {
            return node.update(
                this.visitToken(node.extendsKeyword),
                <ITypeSyntax>this.visitNodeOrToken(node.type));
        }

        public visitElseClause(node: ElseClauseSyntax): any {
            return node.update(
                this.visitToken(node.elseKeyword),
                <IStatementSyntax>this.visitNodeOrToken(node.statement));
        }

        public visitIfStatement(node: IfStatementSyntax): any {
            return node.update(
                this.visitToken(node.ifKeyword),
                this.visitToken(node.openParenToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.condition),
                this.visitToken(node.closeParenToken),
                <IStatementSyntax>this.visitNodeOrToken(node.statement),
                node.elseClause === null ? null : <ElseClauseSyntax>this.visitNode(node.elseClause));
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): any {
            return node.update(
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.semicolonToken));
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.constructorKeyword),
                <CallSignatureSyntax>this.visitNode(node.callSignature),
                node.block === null ? null : <BlockSyntax>this.visitNode(node.block),
                node.semicolonToken === null ? null : this.visitToken(node.semicolonToken));
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.propertyName),
                <CallSignatureSyntax>this.visitNode(node.callSignature),
                node.block === null ? null : <BlockSyntax>this.visitNode(node.block),
                node.semicolonToken === null ? null : this.visitToken(node.semicolonToken));
        }

        public visitGetAccessor(node: GetAccessorSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.getKeyword),
                this.visitToken(node.propertyName),
                <ParameterListSyntax>this.visitNode(node.parameterList),
                node.typeAnnotation === null ? null : <TypeAnnotationSyntax>this.visitNode(node.typeAnnotation),
                <BlockSyntax>this.visitNode(node.block));
        }

        public visitSetAccessor(node: SetAccessorSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.setKeyword),
                this.visitToken(node.propertyName),
                <ParameterListSyntax>this.visitNode(node.parameterList),
                <BlockSyntax>this.visitNode(node.block));
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                <VariableDeclaratorSyntax>this.visitNode(node.variableDeclarator),
                this.visitToken(node.semicolonToken));
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                <IndexSignatureSyntax>this.visitNode(node.indexSignature),
                this.visitToken(node.semicolonToken));
        }

        public visitThrowStatement(node: ThrowStatementSyntax): any {
            return node.update(
                this.visitToken(node.throwKeyword),
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.semicolonToken));
        }

        public visitReturnStatement(node: ReturnStatementSyntax): any {
            return node.update(
                this.visitToken(node.returnKeyword),
                node.expression === null ? null : <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.semicolonToken));
        }

        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): any {
            return node.update(
                this.visitToken(node.newKeyword),
                <IMemberExpressionSyntax>this.visitNodeOrToken(node.expression),
                node.argumentList === null ? null : <ArgumentListSyntax>this.visitNode(node.argumentList));
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): any {
            return node.update(
                this.visitToken(node.switchKeyword),
                this.visitToken(node.openParenToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.closeParenToken),
                this.visitToken(node.openBraceToken),
                this.visitList(node.switchClauses),
                this.visitToken(node.closeBraceToken));
        }

        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): any {
            return node.update(
                this.visitToken(node.caseKeyword),
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.colonToken),
                this.visitList(node.statements));
        }

        public visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): any {
            return node.update(
                this.visitToken(node.defaultKeyword),
                this.visitToken(node.colonToken),
                this.visitList(node.statements));
        }

        public visitBreakStatement(node: BreakStatementSyntax): any {
            return node.update(
                this.visitToken(node.breakKeyword),
                node.identifier === null ? null : this.visitToken(node.identifier),
                this.visitToken(node.semicolonToken));
        }

        public visitContinueStatement(node: ContinueStatementSyntax): any {
            return node.update(
                this.visitToken(node.continueKeyword),
                node.identifier === null ? null : this.visitToken(node.identifier),
                this.visitToken(node.semicolonToken));
        }

        public visitForStatement(node: ForStatementSyntax): any {
            return node.update(
                this.visitToken(node.forKeyword),
                this.visitToken(node.openParenToken),
                node.variableDeclaration === null ? null : <VariableDeclarationSyntax>this.visitNode(node.variableDeclaration),
                node.initializer === null ? null : <IExpressionSyntax>this.visitNodeOrToken(node.initializer),
                this.visitToken(node.firstSemicolonToken),
                node.condition === null ? null : <IExpressionSyntax>this.visitNodeOrToken(node.condition),
                this.visitToken(node.secondSemicolonToken),
                node.incrementor === null ? null : <IExpressionSyntax>this.visitNodeOrToken(node.incrementor),
                this.visitToken(node.closeParenToken),
                <IStatementSyntax>this.visitNodeOrToken(node.statement));
        }

        public visitForInStatement(node: ForInStatementSyntax): any {
            return node.update(
                this.visitToken(node.forKeyword),
                this.visitToken(node.openParenToken),
                node.variableDeclaration === null ? null : <VariableDeclarationSyntax>this.visitNode(node.variableDeclaration),
                node.left === null ? null : <IExpressionSyntax>this.visitNodeOrToken(node.left),
                this.visitToken(node.inKeyword),
                <IExpressionSyntax>this.visitNodeOrToken(node.expression),
                this.visitToken(node.closeParenToken),
                <IStatementSyntax>this.visitNodeOrToken(node.statement));
        }

        public visitWhileStatement(node: WhileStatementSyntax): any {
            return node.update(
                this.visitToken(node.whileKeyword),
                this.visitToken(node.openParenToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.condition),
                this.visitToken(node.closeParenToken),
                <IStatementSyntax>this.visitNodeOrToken(node.statement));
        }

        public visitWithStatement(node: WithStatementSyntax): any {
            return node.update(
                this.visitToken(node.withKeyword),
                this.visitToken(node.openParenToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.condition),
                this.visitToken(node.closeParenToken),
                <IStatementSyntax>this.visitNodeOrToken(node.statement));
        }

        public visitEnumDeclaration(node: EnumDeclarationSyntax): any {
            return node.update(
                this.visitList(node.modifiers),
                this.visitToken(node.enumKeyword),
                this.visitToken(node.identifier),
                this.visitToken(node.openBraceToken),
                this.visitSeparatedList(node.enumElements),
                this.visitToken(node.closeBraceToken));
        }

        public visitEnumElement(node: EnumElementSyntax): any {
            return node.update(
                this.visitToken(node.propertyName),
                node.equalsValueClause === null ? null : <EqualsValueClauseSyntax>this.visitNode(node.equalsValueClause));
        }

        public visitCastExpression(node: CastExpressionSyntax): any {
            return node.update(
                this.visitToken(node.lessThanToken),
                <ITypeSyntax>this.visitNodeOrToken(node.type),
                this.visitToken(node.greaterThanToken),
                <IUnaryExpressionSyntax>this.visitNodeOrToken(node.expression));
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): any {
            return node.update(
                this.visitToken(node.openBraceToken),
                this.visitSeparatedList(node.propertyAssignments),
                this.visitToken(node.closeBraceToken));
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): any {
            return node.update(
                this.visitToken(node.propertyName),
                this.visitToken(node.colonToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.expression));
        }

        public visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): any {
            return node.update(
                this.visitToken(node.propertyName),
                <CallSignatureSyntax>this.visitNode(node.callSignature),
                <BlockSyntax>this.visitNode(node.block));
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): any {
            return node.update(
                this.visitToken(node.functionKeyword),
                node.identifier === null ? null : this.visitToken(node.identifier),
                <CallSignatureSyntax>this.visitNode(node.callSignature),
                <BlockSyntax>this.visitNode(node.block));
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): any {
            return node.update(
                this.visitToken(node.semicolonToken));
        }

        public visitTryStatement(node: TryStatementSyntax): any {
            return node.update(
                this.visitToken(node.tryKeyword),
                <BlockSyntax>this.visitNode(node.block),
                node.catchClause === null ? null : <CatchClauseSyntax>this.visitNode(node.catchClause),
                node.finallyClause === null ? null : <FinallyClauseSyntax>this.visitNode(node.finallyClause));
        }

        public visitCatchClause(node: CatchClauseSyntax): any {
            return node.update(
                this.visitToken(node.catchKeyword),
                this.visitToken(node.openParenToken),
                this.visitToken(node.identifier),
                node.typeAnnotation === null ? null : <TypeAnnotationSyntax>this.visitNode(node.typeAnnotation),
                this.visitToken(node.closeParenToken),
                <BlockSyntax>this.visitNode(node.block));
        }

        public visitFinallyClause(node: FinallyClauseSyntax): any {
            return node.update(
                this.visitToken(node.finallyKeyword),
                <BlockSyntax>this.visitNode(node.block));
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): any {
            return node.update(
                this.visitToken(node.identifier),
                this.visitToken(node.colonToken),
                <IStatementSyntax>this.visitNodeOrToken(node.statement));
        }

        public visitDoStatement(node: DoStatementSyntax): any {
            return node.update(
                this.visitToken(node.doKeyword),
                <IStatementSyntax>this.visitNodeOrToken(node.statement),
                this.visitToken(node.whileKeyword),
                this.visitToken(node.openParenToken),
                <IExpressionSyntax>this.visitNodeOrToken(node.condition),
                this.visitToken(node.closeParenToken),
                this.visitToken(node.semicolonToken));
        }

        public visitTypeOfExpression(node: TypeOfExpressionSyntax): any {
            return node.update(
                this.visitToken(node.typeOfKeyword),
                <IUnaryExpressionSyntax>this.visitNodeOrToken(node.expression));
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): any {
            return node.update(
                this.visitToken(node.deleteKeyword),
                <IUnaryExpressionSyntax>this.visitNodeOrToken(node.expression));
        }

        public visitVoidExpression(node: VoidExpressionSyntax): any {
            return node.update(
                this.visitToken(node.voidKeyword),
                <IUnaryExpressionSyntax>this.visitNodeOrToken(node.expression));
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): any {
            return node.update(
                this.visitToken(node.debuggerKeyword),
                this.visitToken(node.semicolonToken));
        }
    }
}