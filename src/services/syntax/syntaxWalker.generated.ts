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

        public visitList(list: ISyntaxNodeOrToken[]): void {
            for (var i = 0, n = list.length; i < n; i++) {
                visitNodeOrToken(this, list[i]);
            }
        }

        public visitSourceUnit(node: SourceUnitSyntax): void {
            this.visitList(node.moduleElements);
            this.visitToken(node.endOfFileToken);
        }

        public visitQualifiedName(node: QualifiedNameSyntax): void {
            visitNodeOrToken(this, node.left);
            this.visitToken(node.dotToken);
            this.visitToken(node.right);
        }

        public visitObjectType(node: ObjectTypeSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitList(node.typeMembers);
            this.visitToken(node.closeBraceToken);
        }

        public visitFunctionType(node: FunctionTypeSyntax): void {
            visitNodeOrToken(this, node.typeParameterList);
            visitNodeOrToken(this, node.parameterList);
            this.visitToken(node.equalsGreaterThanToken);
            visitNodeOrToken(this, node.type);
        }

        public visitArrayType(node: ArrayTypeSyntax): void {
            visitNodeOrToken(this, node.type);
            this.visitToken(node.openBracketToken);
            this.visitToken(node.closeBracketToken);
        }

        public visitConstructorType(node: ConstructorTypeSyntax): void {
            this.visitToken(node.newKeyword);
            visitNodeOrToken(this, node.typeParameterList);
            visitNodeOrToken(this, node.parameterList);
            this.visitToken(node.equalsGreaterThanToken);
            visitNodeOrToken(this, node.type);
        }

        public visitGenericType(node: GenericTypeSyntax): void {
            visitNodeOrToken(this, node.name);
            visitNodeOrToken(this, node.typeArgumentList);
        }

        public visitTypeQuery(node: TypeQuerySyntax): void {
            this.visitToken(node.typeOfKeyword);
            visitNodeOrToken(this, node.name);
        }

        public visitTupleType(node: TupleTypeSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitList(node.types);
            this.visitToken(node.closeBracketToken);
        }

        public visitUnionType(node: UnionTypeSyntax): void {
            visitNodeOrToken(this, node.left);
            this.visitToken(node.barToken);
            visitNodeOrToken(this, node.right);
        }

        public visitParenthesizedType(node: ParenthesizedTypeSyntax): void {
            this.visitToken(node.openParenToken);
            visitNodeOrToken(this, node.type);
            this.visitToken(node.closeParenToken);
        }

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.interfaceKeyword);
            this.visitToken(node.identifier);
            visitNodeOrToken(this, node.typeParameterList);
            this.visitList(node.heritageClauses);
            visitNodeOrToken(this, node.body);
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.functionKeyword);
            this.visitOptionalToken(node.asterixToken);
            this.visitToken(node.identifier);
            visitNodeOrToken(this, node.callSignature);
            visitNodeOrToken(this, node.body);
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.moduleKeyword);
            visitNodeOrToken(this, node.name);
            this.visitToken(node.openBraceToken);
            this.visitList(node.moduleElements);
            this.visitToken(node.closeBraceToken);
        }

        public visitClassDeclaration(node: ClassDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.classKeyword);
            this.visitToken(node.identifier);
            visitNodeOrToken(this, node.typeParameterList);
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
            this.visitList(node.enumElements);
            this.visitToken(node.closeBraceToken);
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.importKeyword);
            this.visitToken(node.identifier);
            this.visitToken(node.equalsToken);
            visitNodeOrToken(this, node.moduleReference);
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
            this.visitOptionalToken(node.asterixToken);
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.callSignature);
            visitNodeOrToken(this, node.body);
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            this.visitList(node.modifiers);
            visitNodeOrToken(this, node.variableDeclarator);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.constructorKeyword);
            visitNodeOrToken(this, node.callSignature);
            visitNodeOrToken(this, node.body);
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void {
            this.visitList(node.modifiers);
            visitNodeOrToken(this, node.indexSignature);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitGetAccessor(node: GetAccessorSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.getKeyword);
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.callSignature);
            visitNodeOrToken(this, node.body);
        }

        public visitSetAccessor(node: SetAccessorSyntax): void {
            this.visitList(node.modifiers);
            this.visitToken(node.setKeyword);
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.callSignature);
            visitNodeOrToken(this, node.body);
        }

        public visitPropertySignature(node: PropertySignatureSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            this.visitOptionalToken(node.questionToken);
            visitNodeOrToken(this, node.typeAnnotation);
        }

        public visitCallSignature(node: CallSignatureSyntax): void {
            visitNodeOrToken(this, node.typeParameterList);
            visitNodeOrToken(this, node.parameterList);
            visitNodeOrToken(this, node.typeAnnotation);
        }

        public visitConstructSignature(node: ConstructSignatureSyntax): void {
            this.visitToken(node.newKeyword);
            visitNodeOrToken(this, node.callSignature);
        }

        public visitIndexSignature(node: IndexSignatureSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitList(node.parameters);
            this.visitToken(node.closeBracketToken);
            visitNodeOrToken(this, node.typeAnnotation);
        }

        public visitMethodSignature(node: MethodSignatureSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            this.visitOptionalToken(node.questionToken);
            visitNodeOrToken(this, node.callSignature);
        }

        public visitBlock(node: BlockSyntax): void {
            this.visitOptionalToken(node.equalsGreaterThanToken);
            this.visitToken(node.openBraceToken);
            this.visitList(node.statements);
            this.visitToken(node.closeBraceToken);
        }

        public visitIfStatement(node: IfStatementSyntax): void {
            this.visitToken(node.ifKeyword);
            this.visitToken(node.openParenToken);
            visitNodeOrToken(this, node.condition);
            this.visitToken(node.closeParenToken);
            visitNodeOrToken(this, node.statement);
            visitNodeOrToken(this, node.elseClause);
        }

        public visitVariableStatement(node: VariableStatementSyntax): void {
            this.visitList(node.modifiers);
            visitNodeOrToken(this, node.variableDeclaration);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): void {
            visitNodeOrToken(this, node.expression);
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
            visitNodeOrToken(this, node.expression);
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
            visitNodeOrToken(this, node.initializer);
            this.visitToken(node.firstSemicolonToken);
            visitNodeOrToken(this, node.condition);
            this.visitToken(node.secondSemicolonToken);
            visitNodeOrToken(this, node.incrementor);
            this.visitToken(node.closeParenToken);
            visitNodeOrToken(this, node.statement);
        }

        public visitForInStatement(node: ForInStatementSyntax): void {
            this.visitToken(node.forKeyword);
            this.visitToken(node.openParenToken);
            visitNodeOrToken(this, node.left);
            this.visitToken(node.inKeyword);
            visitNodeOrToken(this, node.right);
            this.visitToken(node.closeParenToken);
            visitNodeOrToken(this, node.statement);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): void {
            this.visitToken(node.semicolonToken);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): void {
            this.visitToken(node.throwKeyword);
            visitNodeOrToken(this, node.expression);
            this.visitOptionalToken(node.semicolonToken);
        }

        public visitWhileStatement(node: WhileStatementSyntax): void {
            this.visitToken(node.whileKeyword);
            this.visitToken(node.openParenToken);
            visitNodeOrToken(this, node.condition);
            this.visitToken(node.closeParenToken);
            visitNodeOrToken(this, node.statement);
        }

        public visitTryStatement(node: TryStatementSyntax): void {
            this.visitToken(node.tryKeyword);
            visitNodeOrToken(this, node.block);
            visitNodeOrToken(this, node.catchClause);
            visitNodeOrToken(this, node.finallyClause);
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): void {
            this.visitToken(node.identifier);
            this.visitToken(node.colonToken);
            visitNodeOrToken(this, node.statement);
        }

        public visitDoStatement(node: DoStatementSyntax): void {
            this.visitToken(node.doKeyword);
            visitNodeOrToken(this, node.statement);
            this.visitToken(node.whileKeyword);
            this.visitToken(node.openParenToken);
            visitNodeOrToken(this, node.condition);
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
            visitNodeOrToken(this, node.condition);
            this.visitToken(node.closeParenToken);
            visitNodeOrToken(this, node.statement);
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            this.visitToken(node.operatorToken);
            visitNodeOrToken(this, node.operand);
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): void {
            this.visitToken(node.deleteKeyword);
            visitNodeOrToken(this, node.expression);
        }

        public visitTypeOfExpression(node: TypeOfExpressionSyntax): void {
            this.visitToken(node.typeOfKeyword);
            visitNodeOrToken(this, node.expression);
        }

        public visitVoidExpression(node: VoidExpressionSyntax): void {
            this.visitToken(node.voidKeyword);
            visitNodeOrToken(this, node.expression);
        }

        public visitConditionalExpression(node: ConditionalExpressionSyntax): void {
            visitNodeOrToken(this, node.condition);
            this.visitToken(node.questionToken);
            visitNodeOrToken(this, node.whenTrue);
            this.visitToken(node.colonToken);
            visitNodeOrToken(this, node.whenFalse);
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): void {
            visitNodeOrToken(this, node.left);
            this.visitToken(node.operatorToken);
            visitNodeOrToken(this, node.right);
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            visitNodeOrToken(this, node.operand);
            this.visitToken(node.operatorToken);
        }

        public visitMemberAccessExpression(node: MemberAccessExpressionSyntax): void {
            visitNodeOrToken(this, node.expression);
            this.visitToken(node.dotToken);
            this.visitToken(node.name);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): void {
            visitNodeOrToken(this, node.expression);
            visitNodeOrToken(this, node.argumentList);
        }

        public visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): void {
            this.visitToken(node.openBracketToken);
            this.visitList(node.expressions);
            this.visitToken(node.closeBracketToken);
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void {
            this.visitToken(node.openBraceToken);
            this.visitList(node.propertyAssignments);
            this.visitToken(node.closeBraceToken);
        }

        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void {
            this.visitToken(node.newKeyword);
            visitNodeOrToken(this, node.expression);
            visitNodeOrToken(this, node.argumentList);
        }

        public visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void {
            this.visitToken(node.openParenToken);
            visitNodeOrToken(this, node.expression);
            this.visitToken(node.closeParenToken);
        }

        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void {
            this.visitOptionalToken(node.asyncKeyword);
            visitNodeOrToken(this, node.callSignature);
            this.visitToken(node.equalsGreaterThanToken);
            visitNodeOrToken(this, node.body);
        }

        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void {
            this.visitOptionalToken(node.asyncKeyword);
            visitNodeOrToken(this, node.parameter);
            this.visitToken(node.equalsGreaterThanToken);
            visitNodeOrToken(this, node.body);
        }

        public visitCastExpression(node: CastExpressionSyntax): void {
            this.visitToken(node.lessThanToken);
            visitNodeOrToken(this, node.type);
            this.visitToken(node.greaterThanToken);
            visitNodeOrToken(this, node.expression);
        }

        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): void {
            visitNodeOrToken(this, node.expression);
            this.visitToken(node.openBracketToken);
            visitNodeOrToken(this, node.argumentExpression);
            this.visitToken(node.closeBracketToken);
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): void {
            this.visitOptionalToken(node.asyncKeyword);
            this.visitToken(node.functionKeyword);
            this.visitOptionalToken(node.asterixToken);
            this.visitOptionalToken(node.identifier);
            visitNodeOrToken(this, node.callSignature);
            visitNodeOrToken(this, node.body);
        }

        public visitOmittedExpression(node: OmittedExpressionSyntax): void {
        }

        public visitTemplateExpression(node: TemplateExpressionSyntax): void {
            this.visitToken(node.templateStartToken);
            this.visitList(node.templateClauses);
        }

        public visitTemplateAccessExpression(node: TemplateAccessExpressionSyntax): void {
            visitNodeOrToken(this, node.expression);
            visitNodeOrToken(this, node.templateExpression);
        }

        public visitYieldExpression(node: YieldExpressionSyntax): void {
            this.visitToken(node.yieldKeyword);
            this.visitOptionalToken(node.asterixToken);
            visitNodeOrToken(this, node.expression);
        }

        public visitAwaitExpression(node: AwaitExpressionSyntax): void {
            this.visitToken(node.awaitKeyword);
            visitNodeOrToken(this, node.expression);
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): void {
            this.visitToken(node.varKeyword);
            this.visitList(node.variableDeclarators);
        }

        public visitVariableDeclarator(node: VariableDeclaratorSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.typeAnnotation);
            visitNodeOrToken(this, node.equalsValueClause);
        }

        public visitArgumentList(node: ArgumentListSyntax): void {
            visitNodeOrToken(this, node.typeArgumentList);
            this.visitToken(node.openParenToken);
            this.visitList(node.arguments);
            this.visitToken(node.closeParenToken);
        }

        public visitParameterList(node: ParameterListSyntax): void {
            this.visitToken(node.openParenToken);
            this.visitList(node.parameters);
            this.visitToken(node.closeParenToken);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            this.visitToken(node.lessThanToken);
            this.visitList(node.typeArguments);
            this.visitToken(node.greaterThanToken);
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): void {
            this.visitToken(node.lessThanToken);
            this.visitList(node.typeParameters);
            this.visitToken(node.greaterThanToken);
        }

        public visitHeritageClause(node: HeritageClauseSyntax): void {
            this.visitToken(node.extendsOrImplementsKeyword);
            this.visitList(node.typeNames);
        }

        public visitEqualsValueClause(node: EqualsValueClauseSyntax): void {
            this.visitToken(node.equalsToken);
            visitNodeOrToken(this, node.value);
        }

        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void {
            this.visitToken(node.caseKeyword);
            visitNodeOrToken(this, node.expression);
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
            visitNodeOrToken(this, node.statement);
        }

        public visitCatchClause(node: CatchClauseSyntax): void {
            this.visitToken(node.catchKeyword);
            this.visitToken(node.openParenToken);
            this.visitToken(node.identifier);
            visitNodeOrToken(this, node.typeAnnotation);
            this.visitToken(node.closeParenToken);
            visitNodeOrToken(this, node.block);
        }

        public visitFinallyClause(node: FinallyClauseSyntax): void {
            this.visitToken(node.finallyKeyword);
            visitNodeOrToken(this, node.block);
        }

        public visitTemplateClause(node: TemplateClauseSyntax): void {
            visitNodeOrToken(this, node.expression);
            this.visitToken(node.templateMiddleOrEndToken);
        }

        public visitTypeParameter(node: TypeParameterSyntax): void {
            this.visitToken(node.identifier);
            visitNodeOrToken(this, node.constraint);
        }

        public visitConstraint(node: ConstraintSyntax): void {
            this.visitToken(node.extendsKeyword);
            visitNodeOrToken(this, node.typeOrExpression);
        }

        public visitParameter(node: ParameterSyntax): void {
            this.visitOptionalToken(node.dotDotDotToken);
            this.visitList(node.modifiers);
            this.visitToken(node.identifier);
            this.visitOptionalToken(node.questionToken);
            visitNodeOrToken(this, node.typeAnnotation);
            visitNodeOrToken(this, node.equalsValueClause);
        }

        public visitEnumElement(node: EnumElementSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.equalsValueClause);
        }

        public visitTypeAnnotation(node: TypeAnnotationSyntax): void {
            this.visitToken(node.colonToken);
            visitNodeOrToken(this, node.type);
        }

        public visitExpressionBody(node: ExpressionBody): void {
            this.visitToken(node.equalsGreaterThanToken);
            visitNodeOrToken(this, node.expression);
        }

        public visitComputedPropertyName(node: ComputedPropertyNameSyntax): void {
            this.visitToken(node.openBracketToken);
            visitNodeOrToken(this, node.expression);
            this.visitToken(node.closeBracketToken);
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            this.visitToken(node.colonToken);
            visitNodeOrToken(this, node.expression);
        }

        public visitExternalModuleReference(node: ExternalModuleReferenceSyntax): void {
            this.visitToken(node.requireKeyword);
            this.visitToken(node.openParenToken);
            this.visitToken(node.stringLiteral);
            this.visitToken(node.closeParenToken);
        }

        public visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): void {
            visitNodeOrToken(this, node.moduleName);
        }
    }
}