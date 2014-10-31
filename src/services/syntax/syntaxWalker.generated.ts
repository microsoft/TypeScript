///<reference path='references.ts' />

module TypeScript {
    export class SyntaxWalker implements ISyntaxVisitor {
        public visitToken(token: ISyntaxToken): void {
        }

        private visitOptionalToken(token: ISyntaxToken): void {
            if (token === undefined) {
                return;
            }

            this.visitToken(token);
        }

        private visitOptionalNode(node: ISyntaxNode): void {
            if (node === undefined) {
                return;
            }

            node.accept(this);
        }

        public visitList(list: ISyntaxNodeOrToken[]): void {
            for (var i = 0, n = list.length; i < n; i++) {
                list[i].accept(this);
            }
        }

        public visitSeparatedList(list: ISyntaxNodeOrToken[]): void {
            for (var i = 0, n = separatedListChildCount(list); i < n; i++) {
                if (i % 2 === 0) {
                    list[i >> 1].accept(this);
                }
                else {
                    this.visitToken(list.separators[i >> 1]);
                }
            }
        }

        public visitSourceUnit(node: SourceUnitSyntax): void {
            this.visitList(node.moduleElements);
            this.visitToken(node.endOfFileToken);
        }

        public visitQualifiedName(node: QualifiedNameSyntax): void {
            node.left.accept(this);
            this.visitToken(node.dotToken);
            this.visitToken(node.right);
        }

        public visitObjectType(node: ObjectTypeSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitSeparatedList(node.typeMembers);
            this.visitToken(node.closeBraceToken);
        }

        public visitFunctionType(node: FunctionTypeSyntax): void {
            this.visitOptionalNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.visitToken(node.equalsGreaterThanToken);
            node.type.accept(this);
        }

        public visitArrayType(node: ArrayTypeSyntax): void {
            node.type.accept(this);
            this.visitToken(node.openBracketToken);
            this.visitToken(node.closeBracketToken);
        }

        public visitConstructorType(node: ConstructorTypeSyntax): void {
            this.visitToken(node.newKeyword);
            this.visitOptionalNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.visitToken(node.equalsGreaterThanToken);
            node.type.accept(this);
        }

        public visitGenericType(node: GenericTypeSyntax): void {
            node.name.accept(this);
            node.typeArgumentList.accept(this);
        }

        public visitTypeQuery(node: TypeQuerySyntax): void {
            this.visitToken(node.typeOfKeyword);
            node.name.accept(this);
        }

        public visitTupleType(node: TupleTypeSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitSeparatedList(node.types);
            this.visitToken(node.closeBracketToken);
        }

        public visitUnionType(node: UnionTypeSyntax): void {
            node.left.accept(this);
            this.visitToken(node.barToken);
            node.right.accept(this);
        }

        public visitParenthesizedType(node: ParenthesizedTypeSyntax): void {
            this.visitToken(node.openParenToken);
            node.type.accept(this);
            this.visitToken(node.closeParenToken);
        }

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.interfaceKeyword);
            this.visitToken(node.identifier);
            this.visitOptionalNode(node.typeParameterList);
            this.visitList(node.heritageClauses);
            node.body.accept(this);
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.functionKeyword);
            this.visitToken(node.identifier);
            node.callSignature.accept(this);
            this.visitOptionalNode(node.block);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.moduleKeyword);
            visitNodeOrToken(this, node.name);
            this.visitOptionalToken(node.stringLiteral);
            this.visitToken(node.openBraceToken);
            this.visitList(node.moduleElements);
            this.visitToken(node.closeBraceToken);
        }

        public visitClassDeclaration(node: ClassDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.classKeyword);
            this.visitToken(node.identifier);
            this.visitOptionalNode(node.typeParameterList);
            this.visitList(node.heritageClauses);
            this.visitToken(node.openBraceToken);
            this.visitList(node.classElements);
            this.visitToken(node.closeBraceToken);
        }

        public visitEnumDeclaration(node: EnumDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.enumKeyword);
            this.visitToken(node.identifier);
            this.visitToken(node.openBraceToken);
            this.visitSeparatedList(node.enumElements);
            this.visitToken(node.closeBraceToken);
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.importKeyword);
            this.visitToken(node.identifier);
            this.visitToken(node.equalsToken);
            node.moduleReference.accept(this);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitExportAssignment(node: ExportAssignmentSyntax): void {
            this.visitToken(node.exportKeyword);
            this.visitToken(node.equalsToken);
            this.visitToken(node.identifier);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.propertyName);
            node.callSignature.accept(this);
            this.visitOptionalNode(node.block);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            this.visitList(node.modifiers);
            node.variableDeclarator.accept(this);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.constructorKeyword);
            node.callSignature.accept(this);
            this.visitOptionalNode(node.block);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void {
            this.visitList(node.modifiers);
            node.indexSignature.accept(this);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitGetAccessor(node: GetAccessorSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.getKeyword);
            this.visitToken(node.propertyName);
            node.callSignature.accept(this);
            node.block.accept(this);
        }

        public visitSetAccessor(node: SetAccessorSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.setKeyword);
            this.visitToken(node.propertyName);
            node.callSignature.accept(this);
            node.block.accept(this);
        }

        public visitPropertySignature(node: PropertySignatureSyntax): void {
            this.visitToken(node.propertyName);
            this.visitOptionalToken(node.questionToken);
            this.visitOptionalNode(node.typeAnnotation);
        }

        public visitCallSignature(node: CallSignatureSyntax): void {
            this.visitOptionalNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.visitOptionalNode(node.typeAnnotation);
        }

        public visitConstructSignature(node: ConstructSignatureSyntax): void {
            this.visitToken(node.newKeyword);
            node.callSignature.accept(this);
        }

        public visitIndexSignature(node: IndexSignatureSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitSeparatedList(node.parameters);
            this.visitToken(node.closeBracketToken);
            this.visitOptionalNode(node.typeAnnotation);
        }

        public visitMethodSignature(node: MethodSignatureSyntax): void {
            this.visitToken(node.propertyName);
            this.visitOptionalToken(node.questionToken);
            node.callSignature.accept(this);
        }

        public visitBlock(node: BlockSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitList(node.statements);
            this.visitToken(node.closeBraceToken);
        }

        public visitIfStatement(node: IfStatementSyntax): void {
            this.visitToken(node.ifKeyword);
            this.visitToken(node.openParenToken);
            node.condition.accept(this);
            this.visitToken(node.closeParenToken);
            node.statement.accept(this);
            this.visitOptionalNode(node.elseClause);
        }

        public visitVariableStatement(node: VariableStatementSyntax): void {
            this.visitList(node.modifiers);
            node.variableDeclaration.accept(this);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): void {
            node.expression.accept(this);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitReturnStatement(node: ReturnStatementSyntax): void {
            this.visitToken(node.returnKeyword);
            visitNodeOrToken(this, node.expression);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): void {
            this.visitToken(node.switchKeyword);
            this.visitToken(node.openParenToken);
            node.expression.accept(this);
            this.visitToken(node.closeParenToken);
            this.visitToken(node.openBraceToken);
            this.visitList(node.switchClauses);
            this.visitToken(node.closeBraceToken);
        }

        public visitBreakStatement(node: BreakStatementSyntax): void {
            this.visitToken(node.breakKeyword);
            this.visitOptionalToken(node.identifier);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitContinueStatement(node: ContinueStatementSyntax): void {
            this.visitToken(node.continueKeyword);
            this.visitOptionalToken(node.identifier);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitForStatement(node: ForStatementSyntax): void {
            this.visitToken(node.forKeyword);
            this.visitToken(node.openParenToken);
            this.visitOptionalNode(node.variableDeclaration);
            visitNodeOrToken(this, node.initializer);
            this.visitToken(node.firstSemicolonToken);
            visitNodeOrToken(this, node.condition);
            this.visitToken(node.secondSemicolonToken);
            visitNodeOrToken(this, node.incrementor);
            this.visitToken(node.closeParenToken);
            node.statement.accept(this);
        }

        public visitForInStatement(node: ForInStatementSyntax): void {
            this.visitToken(node.forKeyword);
            this.visitToken(node.openParenToken);
            this.visitOptionalNode(node.variableDeclaration);
            visitNodeOrToken(this, node.left);
            this.visitToken(node.inKeyword);
            node.expression.accept(this);
            this.visitToken(node.closeParenToken);
            node.statement.accept(this);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): void {
            this.visitToken(node.semicolonToken);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): void {
            this.visitToken(node.throwKeyword);
            node.expression.accept(this);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitWhileStatement(node: WhileStatementSyntax): void {
            this.visitToken(node.whileKeyword);
            this.visitToken(node.openParenToken);
            node.condition.accept(this);
            this.visitToken(node.closeParenToken);
            node.statement.accept(this);
        }

        public visitTryStatement(node: TryStatementSyntax): void {
            this.visitToken(node.tryKeyword);
            node.block.accept(this);
            this.visitOptionalNode(node.catchClause);
            this.visitOptionalNode(node.finallyClause);
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): void {
            this.visitToken(node.identifier);
            this.visitToken(node.colonToken);
            node.statement.accept(this);
        }

        public visitDoStatement(node: DoStatementSyntax): void {
            this.visitToken(node.doKeyword);
            node.statement.accept(this);
            this.visitToken(node.whileKeyword);
            this.visitToken(node.openParenToken);
            node.condition.accept(this);
            this.visitToken(node.closeParenToken);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): void {
            this.visitToken(node.debuggerKeyword);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitWithStatement(node: WithStatementSyntax): void {
            this.visitToken(node.withKeyword);
            this.visitToken(node.openParenToken);
            node.condition.accept(this);
            this.visitToken(node.closeParenToken);
            node.statement.accept(this);
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            this.visitToken(node.operatorToken);
            node.operand.accept(this);
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): void {
            this.visitToken(node.deleteKeyword);
            node.expression.accept(this);
        }

        public visitTypeOfExpression(node: TypeOfExpressionSyntax): void {
            this.visitToken(node.typeOfKeyword);
            node.expression.accept(this);
        }

        public visitVoidExpression(node: VoidExpressionSyntax): void {
            this.visitToken(node.voidKeyword);
            node.expression.accept(this);
        }

        public visitConditionalExpression(node: ConditionalExpressionSyntax): void {
            node.condition.accept(this);
            this.visitToken(node.questionToken);
            node.whenTrue.accept(this);
            this.visitToken(node.colonToken);
            node.whenFalse.accept(this);
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): void {
            node.left.accept(this);
            this.visitToken(node.operatorToken);
            node.right.accept(this);
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            node.operand.accept(this);
            this.visitToken(node.operatorToken);
        }

        public visitMemberAccessExpression(node: MemberAccessExpressionSyntax): void {
            node.expression.accept(this);
            this.visitToken(node.dotToken);
            this.visitToken(node.name);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): void {
            node.expression.accept(this);
            node.argumentList.accept(this);
        }

        public visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitSeparatedList(node.expressions);
            this.visitToken(node.closeBracketToken);
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitSeparatedList(node.propertyAssignments);
            this.visitToken(node.closeBraceToken);
        }

        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void {
            this.visitToken(node.newKeyword);
            node.expression.accept(this);
            this.visitOptionalNode(node.argumentList);
        }

        public visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void {
            this.visitToken(node.openParenToken);
            node.expression.accept(this);
            this.visitToken(node.closeParenToken);
        }

        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void {
            node.callSignature.accept(this);
            this.visitToken(node.equalsGreaterThanToken);
            this.visitOptionalNode(node.block);
            visitNodeOrToken(this, node.expression);
        }

        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void {
            node.parameter.accept(this);
            this.visitToken(node.equalsGreaterThanToken);
            this.visitOptionalNode(node.block);
            visitNodeOrToken(this, node.expression);
        }

        public visitCastExpression(node: CastExpressionSyntax): void {
            this.visitToken(node.lessThanToken);
            node.type.accept(this);
            this.visitToken(node.greaterThanToken);
            node.expression.accept(this);
        }

        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): void {
            node.expression.accept(this);
            this.visitToken(node.openBracketToken);
            node.argumentExpression.accept(this);
            this.visitToken(node.closeBracketToken);
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): void {
            this.visitToken(node.functionKeyword);
            this.visitOptionalToken(node.identifier);
            node.callSignature.accept(this);
            node.block.accept(this);
        }

        public visitOmittedExpression(node: OmittedExpressionSyntax): void {
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): void {
            this.visitToken(node.varKeyword);
            this.visitSeparatedList(node.variableDeclarators);
        }

        public visitVariableDeclarator(node: VariableDeclaratorSyntax): void {
            this.visitToken(node.propertyName);
            this.visitOptionalNode(node.typeAnnotation);
            this.visitOptionalNode(node.equalsValueClause);
        }

        public visitArgumentList(node: ArgumentListSyntax): void {
            this.visitOptionalNode(node.typeArgumentList);
            this.visitToken(node.openParenToken);
            this.visitSeparatedList(node.arguments);
            this.visitToken(node.closeParenToken);
        }

        public visitParameterList(node: ParameterListSyntax): void {
            this.visitToken(node.openParenToken);
            this.visitSeparatedList(node.parameters);
            this.visitToken(node.closeParenToken);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            this.visitToken(node.lessThanToken);
            this.visitSeparatedList(node.typeArguments);
            this.visitToken(node.greaterThanToken);
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): void {
            this.visitToken(node.lessThanToken);
            this.visitSeparatedList(node.typeParameters);
            this.visitToken(node.greaterThanToken);
        }

        public visitHeritageClause(node: HeritageClauseSyntax): void {
            this.visitToken(node.extendsOrImplementsKeyword);
            this.visitSeparatedList(node.typeNames);
        }

        public visitEqualsValueClause(node: EqualsValueClauseSyntax): void {
            this.visitToken(node.equalsToken);
            node.value.accept(this);
        }

        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void {
            this.visitToken(node.caseKeyword);
            node.expression.accept(this);
            this.visitToken(node.colonToken);
            this.visitList(node.statements);
        }

        public visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): void {
            this.visitToken(node.defaultKeyword);
            this.visitToken(node.colonToken);
            this.visitList(node.statements);
        }

        public visitElseClause(node: ElseClauseSyntax): void {
            this.visitToken(node.elseKeyword);
            node.statement.accept(this);
        }

        public visitCatchClause(node: CatchClauseSyntax): void {
            this.visitToken(node.catchKeyword);
            this.visitToken(node.openParenToken);
            this.visitToken(node.identifier);
            this.visitOptionalNode(node.typeAnnotation);
            this.visitToken(node.closeParenToken);
            node.block.accept(this);
        }

        public visitFinallyClause(node: FinallyClauseSyntax): void {
            this.visitToken(node.finallyKeyword);
            node.block.accept(this);
        }

        public visitTypeParameter(node: TypeParameterSyntax): void {
            this.visitToken(node.identifier);
            this.visitOptionalNode(node.constraint);
        }

        public visitConstraint(node: ConstraintSyntax): void {
            this.visitToken(node.extendsKeyword);
            node.typeOrExpression.accept(this);
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void {
            this.visitToken(node.propertyName);
            this.visitToken(node.colonToken);
            node.expression.accept(this);
        }

        public visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): void {
            this.visitToken(node.propertyName);
            node.callSignature.accept(this);
            node.block.accept(this);
        }

        public visitParameter(node: ParameterSyntax): void {
            this.visitOptionalToken(node.dotDotDotToken);
            this.visitList(node.modifiers);
            this.visitToken(node.identifier);
            this.visitOptionalToken(node.questionToken);
            this.visitOptionalNode(node.typeAnnotation);
            this.visitOptionalNode(node.equalsValueClause);
        }

        public visitEnumElement(node: EnumElementSyntax): void {
            this.visitToken(node.propertyName);
            this.visitOptionalNode(node.equalsValueClause);
        }

        public visitTypeAnnotation(node: TypeAnnotationSyntax): void {
            this.visitToken(node.colonToken);
            node.type.accept(this);
        }

        public visitExternalModuleReference(node: ExternalModuleReferenceSyntax): void {
            this.visitToken(node.requireKeyword);
            this.visitToken(node.openParenToken);
            this.visitToken(node.stringLiteral);
            this.visitToken(node.closeParenToken);
        }

        public visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): void {
            node.moduleName.accept(this);
        }
    }
}