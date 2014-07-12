///<reference path='references.ts' />

module TypeScript {
    export class SyntaxWalker implements ISyntaxVisitor {
        public visitToken(token: ISyntaxToken): void {
        }

        public visitNode(node: SyntaxNode): void {
            node.accept(this);
        }

        public visitNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void {
            if (nodeOrToken.isToken()) { 
                this.visitToken(<ISyntaxToken>nodeOrToken);
            }
            else {
                this.visitNode(<SyntaxNode>nodeOrToken);
            }
        }

        private visitOptionalToken(token: ISyntaxToken): void {
            if (token === null) {
                return;
            }

            this.visitToken(token);
        }

        public visitOptionalNode(node: SyntaxNode): void {
            if (node === null) {
                return;
            }

            this.visitNode(node);
        }

        public visitOptionalNodeOrToken(nodeOrToken: ISyntaxNodeOrToken): void {
            if (nodeOrToken === null) {
                return;
            }

            this.visitNodeOrToken(nodeOrToken);
        }

        public visitList(list: ISyntaxList): void {
            for (var i = 0, n = list.childCount(); i < n; i++) {
               this.visitNodeOrToken(list.childAt(i));
            }
        }

        public visitSeparatedList(list: ISeparatedSyntaxList): void {
            for (var i = 0, n = list.childCount(); i < n; i++) {
                var item = list.childAt(i);
                this.visitNodeOrToken(item);
            }
        }

        public visitSourceUnit(node: SourceUnitSyntax): void {
            this.visitList(node.moduleElements);
            this.visitToken(node.endOfFileToken);
        }

        public visitExternalModuleReference(node: ExternalModuleReferenceSyntax): void {
            this.visitToken(node.requireKeyword);
            this.visitToken(node.openParenToken);
            this.visitToken(node.stringLiteral);
            this.visitToken(node.closeParenToken);
        }

        public visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): void {
            this.visitNodeOrToken(node.moduleName);
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.importKeyword);
            this.visitToken(node.identifier);
            this.visitToken(node.equalsToken);
            this.visitNodeOrToken(node.moduleReference);
            this.visitToken(node.semicolonToken);
        }

        public visitExportAssignment(node: ExportAssignmentSyntax): void {
            this.visitToken(node.exportKeyword);
            this.visitToken(node.equalsToken);
            this.visitToken(node.identifier);
            this.visitToken(node.semicolonToken);
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

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.interfaceKeyword);
            this.visitToken(node.identifier);
            this.visitOptionalNode(node.typeParameterList);
            this.visitList(node.heritageClauses);
            this.visitNode(node.body);
        }

        public visitHeritageClause(node: HeritageClauseSyntax): void {
            this.visitToken(node.extendsOrImplementsKeyword);
            this.visitSeparatedList(node.typeNames);
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.moduleKeyword);
            this.visitOptionalNodeOrToken(node.name);
            this.visitOptionalToken(node.stringLiteral);
            this.visitToken(node.openBraceToken);
            this.visitList(node.moduleElements);
            this.visitToken(node.closeBraceToken);
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.functionKeyword);
            this.visitToken(node.identifier);
            this.visitNode(node.callSignature);
            this.visitOptionalNode(node.block);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitVariableStatement(node: VariableStatementSyntax): void {
            this.visitList(node.modifiers);
            this.visitNode(node.variableDeclaration);
            this.visitToken(node.semicolonToken);
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

        public visitEqualsValueClause(node: EqualsValueClauseSyntax): void {
            this.visitToken(node.equalsToken);
            this.visitNodeOrToken(node.value);
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            this.visitToken(node.operatorToken);
            this.visitNodeOrToken(node.operand);
        }

        public visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitSeparatedList(node.expressions);
            this.visitToken(node.closeBracketToken);
        }

        public visitOmittedExpression(node: OmittedExpressionSyntax): void {
        }

        public visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void {
            this.visitToken(node.openParenToken);
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.closeParenToken);
        }

        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void {
            this.visitToken(node.identifier);
            this.visitToken(node.equalsGreaterThanToken);
            this.visitOptionalNode(node.block);
            this.visitOptionalNodeOrToken(node.expression);
        }

        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void {
            this.visitNode(node.callSignature);
            this.visitToken(node.equalsGreaterThanToken);
            this.visitOptionalNode(node.block);
            this.visitOptionalNodeOrToken(node.expression);
        }

        public visitQualifiedName(node: QualifiedNameSyntax): void {
            this.visitNodeOrToken(node.left);
            this.visitToken(node.dotToken);
            this.visitToken(node.right);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            this.visitToken(node.lessThanToken);
            this.visitSeparatedList(node.typeArguments);
            this.visitToken(node.greaterThanToken);
        }

        public visitConstructorType(node: ConstructorTypeSyntax): void {
            this.visitToken(node.newKeyword);
            this.visitOptionalNode(node.typeParameterList);
            this.visitNode(node.parameterList);
            this.visitToken(node.equalsGreaterThanToken);
            this.visitNodeOrToken(node.type);
        }

        public visitFunctionType(node: FunctionTypeSyntax): void {
            this.visitOptionalNode(node.typeParameterList);
            this.visitNode(node.parameterList);
            this.visitToken(node.equalsGreaterThanToken);
            this.visitNodeOrToken(node.type);
        }

        public visitObjectType(node: ObjectTypeSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitSeparatedList(node.typeMembers);
            this.visitToken(node.closeBraceToken);
        }

        public visitArrayType(node: ArrayTypeSyntax): void {
            this.visitNodeOrToken(node.type);
            this.visitToken(node.openBracketToken);
            this.visitToken(node.closeBracketToken);
        }

        public visitGenericType(node: GenericTypeSyntax): void {
            this.visitNodeOrToken(node.name);
            this.visitNode(node.typeArgumentList);
        }

        public visitTypeQuery(node: TypeQuerySyntax): void {
            this.visitToken(node.typeOfKeyword);
            this.visitNodeOrToken(node.name);
        }

        public visitTypeAnnotation(node: TypeAnnotationSyntax): void {
            this.visitToken(node.colonToken);
            this.visitNodeOrToken(node.type);
        }

        public visitBlock(node: BlockSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitList(node.statements);
            this.visitToken(node.closeBraceToken);
        }

        public visitParameter(node: ParameterSyntax): void {
            this.visitOptionalToken(node.dotDotDotToken);
            this.visitList(node.modifiers);
            this.visitToken(node.identifier);
            this.visitOptionalToken(node.questionToken);
            this.visitOptionalNode(node.typeAnnotation);
            this.visitOptionalNode(node.equalsValueClause);
        }

        public visitMemberAccessExpression(node: MemberAccessExpressionSyntax): void {
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.dotToken);
            this.visitToken(node.name);
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            this.visitNodeOrToken(node.operand);
            this.visitToken(node.operatorToken);
        }

        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): void {
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.openBracketToken);
            this.visitNodeOrToken(node.argumentExpression);
            this.visitToken(node.closeBracketToken);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): void {
            this.visitNodeOrToken(node.expression);
            this.visitNode(node.argumentList);
        }

        public visitArgumentList(node: ArgumentListSyntax): void {
            this.visitOptionalNode(node.typeArgumentList);
            this.visitToken(node.openParenToken);
            this.visitSeparatedList(node.arguments);
            this.visitToken(node.closeParenToken);
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): void {
            this.visitNodeOrToken(node.left);
            this.visitToken(node.operatorToken);
            this.visitNodeOrToken(node.right);
        }

        public visitConditionalExpression(node: ConditionalExpressionSyntax): void {
            this.visitNodeOrToken(node.condition);
            this.visitToken(node.questionToken);
            this.visitNodeOrToken(node.whenTrue);
            this.visitToken(node.colonToken);
            this.visitNodeOrToken(node.whenFalse);
        }

        public visitConstructSignature(node: ConstructSignatureSyntax): void {
            this.visitToken(node.newKeyword);
            this.visitNode(node.callSignature);
        }

        public visitMethodSignature(node: MethodSignatureSyntax): void {
            this.visitToken(node.propertyName);
            this.visitOptionalToken(node.questionToken);
            this.visitNode(node.callSignature);
        }

        public visitIndexSignature(node: IndexSignatureSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitNode(node.parameter);
            this.visitToken(node.closeBracketToken);
            this.visitOptionalNode(node.typeAnnotation);
        }

        public visitPropertySignature(node: PropertySignatureSyntax): void {
            this.visitToken(node.propertyName);
            this.visitOptionalToken(node.questionToken);
            this.visitOptionalNode(node.typeAnnotation);
        }

        public visitCallSignature(node: CallSignatureSyntax): void {
            this.visitOptionalNode(node.typeParameterList);
            this.visitNode(node.parameterList);
            this.visitOptionalNode(node.typeAnnotation);
        }

        public visitParameterList(node: ParameterListSyntax): void {
            this.visitToken(node.openParenToken);
            this.visitSeparatedList(node.parameters);
            this.visitToken(node.closeParenToken);
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): void {
            this.visitToken(node.lessThanToken);
            this.visitSeparatedList(node.typeParameters);
            this.visitToken(node.greaterThanToken);
        }

        public visitTypeParameter(node: TypeParameterSyntax): void {
            this.visitToken(node.identifier);
            this.visitOptionalNode(node.constraint);
        }

        public visitConstraint(node: ConstraintSyntax): void {
            this.visitToken(node.extendsKeyword);
            this.visitNodeOrToken(node.type);
        }

        public visitElseClause(node: ElseClauseSyntax): void {
            this.visitToken(node.elseKeyword);
            this.visitNodeOrToken(node.statement);
        }

        public visitIfStatement(node: IfStatementSyntax): void {
            this.visitToken(node.ifKeyword);
            this.visitToken(node.openParenToken);
            this.visitNodeOrToken(node.condition);
            this.visitToken(node.closeParenToken);
            this.visitNodeOrToken(node.statement);
            this.visitOptionalNode(node.elseClause);
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): void {
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.semicolonToken);
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.constructorKeyword);
            this.visitNode(node.callSignature);
            this.visitOptionalNode(node.block);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.propertyName);
            this.visitNode(node.callSignature);
            this.visitOptionalNode(node.block);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitGetAccessor(node: GetAccessorSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.getKeyword);
            this.visitToken(node.propertyName);
            this.visitNode(node.parameterList);
            this.visitOptionalNode(node.typeAnnotation);
            this.visitNode(node.block);
        }

        public visitSetAccessor(node: SetAccessorSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.setKeyword);
            this.visitToken(node.propertyName);
            this.visitNode(node.parameterList);
            this.visitNode(node.block);
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitNode(node.variableDeclarator);
            this.visitToken(node.semicolonToken);
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitNode(node.indexSignature);
            this.visitToken(node.semicolonToken);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): void {
            this.visitToken(node.throwKeyword);
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.semicolonToken);
        }

        public visitReturnStatement(node: ReturnStatementSyntax): void {
            this.visitToken(node.returnKeyword);
            this.visitOptionalNodeOrToken(node.expression);
            this.visitToken(node.semicolonToken);
        }

        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void {
            this.visitToken(node.newKeyword);
            this.visitNodeOrToken(node.expression);
            this.visitOptionalNode(node.argumentList);
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): void {
            this.visitToken(node.switchKeyword);
            this.visitToken(node.openParenToken);
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.closeParenToken);
            this.visitToken(node.openBraceToken);
            this.visitList(node.switchClauses);
            this.visitToken(node.closeBraceToken);
        }

        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void {
            this.visitToken(node.caseKeyword);
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.colonToken);
            this.visitList(node.statements);
        }

        public visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): void {
            this.visitToken(node.defaultKeyword);
            this.visitToken(node.colonToken);
            this.visitList(node.statements);
        }

        public visitBreakStatement(node: BreakStatementSyntax): void {
            this.visitToken(node.breakKeyword);
            this.visitOptionalToken(node.identifier);
            this.visitToken(node.semicolonToken);
        }

        public visitContinueStatement(node: ContinueStatementSyntax): void {
            this.visitToken(node.continueKeyword);
            this.visitOptionalToken(node.identifier);
            this.visitToken(node.semicolonToken);
        }

        public visitForStatement(node: ForStatementSyntax): void {
            this.visitToken(node.forKeyword);
            this.visitToken(node.openParenToken);
            this.visitOptionalNode(node.variableDeclaration);
            this.visitOptionalNodeOrToken(node.initializer);
            this.visitToken(node.firstSemicolonToken);
            this.visitOptionalNodeOrToken(node.condition);
            this.visitToken(node.secondSemicolonToken);
            this.visitOptionalNodeOrToken(node.incrementor);
            this.visitToken(node.closeParenToken);
            this.visitNodeOrToken(node.statement);
        }

        public visitForInStatement(node: ForInStatementSyntax): void {
            this.visitToken(node.forKeyword);
            this.visitToken(node.openParenToken);
            this.visitOptionalNode(node.variableDeclaration);
            this.visitOptionalNodeOrToken(node.left);
            this.visitToken(node.inKeyword);
            this.visitNodeOrToken(node.expression);
            this.visitToken(node.closeParenToken);
            this.visitNodeOrToken(node.statement);
        }

        public visitWhileStatement(node: WhileStatementSyntax): void {
            this.visitToken(node.whileKeyword);
            this.visitToken(node.openParenToken);
            this.visitNodeOrToken(node.condition);
            this.visitToken(node.closeParenToken);
            this.visitNodeOrToken(node.statement);
        }

        public visitWithStatement(node: WithStatementSyntax): void {
            this.visitToken(node.withKeyword);
            this.visitToken(node.openParenToken);
            this.visitNodeOrToken(node.condition);
            this.visitToken(node.closeParenToken);
            this.visitNodeOrToken(node.statement);
        }

        public visitEnumDeclaration(node: EnumDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.enumKeyword);
            this.visitToken(node.identifier);
            this.visitToken(node.openBraceToken);
            this.visitSeparatedList(node.enumElements);
            this.visitToken(node.closeBraceToken);
        }

        public visitEnumElement(node: EnumElementSyntax): void {
            this.visitToken(node.propertyName);
            this.visitOptionalNode(node.equalsValueClause);
        }

        public visitCastExpression(node: CastExpressionSyntax): void {
            this.visitToken(node.lessThanToken);
            this.visitNodeOrToken(node.type);
            this.visitToken(node.greaterThanToken);
            this.visitNodeOrToken(node.expression);
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitSeparatedList(node.propertyAssignments);
            this.visitToken(node.closeBraceToken);
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void {
            this.visitToken(node.propertyName);
            this.visitToken(node.colonToken);
            this.visitNodeOrToken(node.expression);
        }

        public visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): void {
            this.visitToken(node.propertyName);
            this.visitNode(node.callSignature);
            this.visitNode(node.block);
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): void {
            this.visitToken(node.functionKeyword);
            this.visitOptionalToken(node.identifier);
            this.visitNode(node.callSignature);
            this.visitNode(node.block);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): void {
            this.visitToken(node.semicolonToken);
        }

        public visitTryStatement(node: TryStatementSyntax): void {
            this.visitToken(node.tryKeyword);
            this.visitNode(node.block);
            this.visitOptionalNode(node.catchClause);
            this.visitOptionalNode(node.finallyClause);
        }

        public visitCatchClause(node: CatchClauseSyntax): void {
            this.visitToken(node.catchKeyword);
            this.visitToken(node.openParenToken);
            this.visitToken(node.identifier);
            this.visitOptionalNode(node.typeAnnotation);
            this.visitToken(node.closeParenToken);
            this.visitNode(node.block);
        }

        public visitFinallyClause(node: FinallyClauseSyntax): void {
            this.visitToken(node.finallyKeyword);
            this.visitNode(node.block);
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): void {
            this.visitToken(node.identifier);
            this.visitToken(node.colonToken);
            this.visitNodeOrToken(node.statement);
        }

        public visitDoStatement(node: DoStatementSyntax): void {
            this.visitToken(node.doKeyword);
            this.visitNodeOrToken(node.statement);
            this.visitToken(node.whileKeyword);
            this.visitToken(node.openParenToken);
            this.visitNodeOrToken(node.condition);
            this.visitToken(node.closeParenToken);
            this.visitToken(node.semicolonToken);
        }

        public visitTypeOfExpression(node: TypeOfExpressionSyntax): void {
            this.visitToken(node.typeOfKeyword);
            this.visitNodeOrToken(node.expression);
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): void {
            this.visitToken(node.deleteKeyword);
            this.visitNodeOrToken(node.expression);
        }

        public visitVoidExpression(node: VoidExpressionSyntax): void {
            this.visitToken(node.voidKeyword);
            this.visitNodeOrToken(node.expression);
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): void {
            this.visitToken(node.debuggerKeyword);
            this.visitToken(node.semicolonToken);
        }
    }
}