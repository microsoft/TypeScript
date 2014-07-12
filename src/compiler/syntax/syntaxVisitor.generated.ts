///<reference path='references.ts' />

module TypeScript {
    export interface ISyntaxVisitor {
        visitToken(token: ISyntaxToken): any;
        visitSourceUnit(node: SourceUnitSyntax): any;
        visitExternalModuleReference(node: ExternalModuleReferenceSyntax): any;
        visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): any;
        visitImportDeclaration(node: ImportDeclarationSyntax): any;
        visitExportAssignment(node: ExportAssignmentSyntax): any;
        visitClassDeclaration(node: ClassDeclarationSyntax): any;
        visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): any;
        visitHeritageClause(node: HeritageClauseSyntax): any;
        visitModuleDeclaration(node: ModuleDeclarationSyntax): any;
        visitFunctionDeclaration(node: FunctionDeclarationSyntax): any;
        visitVariableStatement(node: VariableStatementSyntax): any;
        visitVariableDeclaration(node: VariableDeclarationSyntax): any;
        visitVariableDeclarator(node: VariableDeclaratorSyntax): any;
        visitEqualsValueClause(node: EqualsValueClauseSyntax): any;
        visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): any;
        visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): any;
        visitOmittedExpression(node: OmittedExpressionSyntax): any;
        visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): any;
        visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): any;
        visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): any;
        visitQualifiedName(node: QualifiedNameSyntax): any;
        visitTypeArgumentList(node: TypeArgumentListSyntax): any;
        visitConstructorType(node: ConstructorTypeSyntax): any;
        visitFunctionType(node: FunctionTypeSyntax): any;
        visitObjectType(node: ObjectTypeSyntax): any;
        visitArrayType(node: ArrayTypeSyntax): any;
        visitGenericType(node: GenericTypeSyntax): any;
        visitTypeQuery(node: TypeQuerySyntax): any;
        visitTypeAnnotation(node: TypeAnnotationSyntax): any;
        visitBlock(node: BlockSyntax): any;
        visitParameter(node: ParameterSyntax): any;
        visitMemberAccessExpression(node: MemberAccessExpressionSyntax): any;
        visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): any;
        visitElementAccessExpression(node: ElementAccessExpressionSyntax): any;
        visitInvocationExpression(node: InvocationExpressionSyntax): any;
        visitArgumentList(node: ArgumentListSyntax): any;
        visitBinaryExpression(node: BinaryExpressionSyntax): any;
        visitConditionalExpression(node: ConditionalExpressionSyntax): any;
        visitConstructSignature(node: ConstructSignatureSyntax): any;
        visitMethodSignature(node: MethodSignatureSyntax): any;
        visitIndexSignature(node: IndexSignatureSyntax): any;
        visitPropertySignature(node: PropertySignatureSyntax): any;
        visitCallSignature(node: CallSignatureSyntax): any;
        visitParameterList(node: ParameterListSyntax): any;
        visitTypeParameterList(node: TypeParameterListSyntax): any;
        visitTypeParameter(node: TypeParameterSyntax): any;
        visitConstraint(node: ConstraintSyntax): any;
        visitElseClause(node: ElseClauseSyntax): any;
        visitIfStatement(node: IfStatementSyntax): any;
        visitExpressionStatement(node: ExpressionStatementSyntax): any;
        visitConstructorDeclaration(node: ConstructorDeclarationSyntax): any;
        visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): any;
        visitGetAccessor(node: GetAccessorSyntax): any;
        visitSetAccessor(node: SetAccessorSyntax): any;
        visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): any;
        visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): any;
        visitThrowStatement(node: ThrowStatementSyntax): any;
        visitReturnStatement(node: ReturnStatementSyntax): any;
        visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): any;
        visitSwitchStatement(node: SwitchStatementSyntax): any;
        visitCaseSwitchClause(node: CaseSwitchClauseSyntax): any;
        visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): any;
        visitBreakStatement(node: BreakStatementSyntax): any;
        visitContinueStatement(node: ContinueStatementSyntax): any;
        visitForStatement(node: ForStatementSyntax): any;
        visitForInStatement(node: ForInStatementSyntax): any;
        visitWhileStatement(node: WhileStatementSyntax): any;
        visitWithStatement(node: WithStatementSyntax): any;
        visitEnumDeclaration(node: EnumDeclarationSyntax): any;
        visitEnumElement(node: EnumElementSyntax): any;
        visitCastExpression(node: CastExpressionSyntax): any;
        visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): any;
        visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): any;
        visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): any;
        visitFunctionExpression(node: FunctionExpressionSyntax): any;
        visitEmptyStatement(node: EmptyStatementSyntax): any;
        visitTryStatement(node: TryStatementSyntax): any;
        visitCatchClause(node: CatchClauseSyntax): any;
        visitFinallyClause(node: FinallyClauseSyntax): any;
        visitLabeledStatement(node: LabeledStatementSyntax): any;
        visitDoStatement(node: DoStatementSyntax): any;
        visitTypeOfExpression(node: TypeOfExpressionSyntax): any;
        visitDeleteExpression(node: DeleteExpressionSyntax): any;
        visitVoidExpression(node: VoidExpressionSyntax): any;
        visitDebuggerStatement(node: DebuggerStatementSyntax): any;
    }

    export class SyntaxVisitor implements ISyntaxVisitor {
        public defaultVisit(node: ISyntaxNodeOrToken): any {
            return null;
        }

        public visitToken(token: ISyntaxToken): any {
            return this.defaultVisit(token);
        }

        public visitSourceUnit(node: SourceUnitSyntax): any {
            return this.defaultVisit(node);
        }

        public visitExternalModuleReference(node: ExternalModuleReferenceSyntax): any {
            return this.defaultVisit(node);
        }

        public visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): any {
            return this.defaultVisit(node);
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitExportAssignment(node: ExportAssignmentSyntax): any {
            return this.defaultVisit(node);
        }

        public visitClassDeclaration(node: ClassDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitHeritageClause(node: HeritageClauseSyntax): any {
            return this.defaultVisit(node);
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitVariableStatement(node: VariableStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitVariableDeclarator(node: VariableDeclaratorSyntax): any {
            return this.defaultVisit(node);
        }

        public visitEqualsValueClause(node: EqualsValueClauseSyntax): any {
            return this.defaultVisit(node);
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitOmittedExpression(node: OmittedExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitQualifiedName(node: QualifiedNameSyntax): any {
            return this.defaultVisit(node);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): any {
            return this.defaultVisit(node);
        }

        public visitConstructorType(node: ConstructorTypeSyntax): any {
            return this.defaultVisit(node);
        }

        public visitFunctionType(node: FunctionTypeSyntax): any {
            return this.defaultVisit(node);
        }

        public visitObjectType(node: ObjectTypeSyntax): any {
            return this.defaultVisit(node);
        }

        public visitArrayType(node: ArrayTypeSyntax): any {
            return this.defaultVisit(node);
        }

        public visitGenericType(node: GenericTypeSyntax): any {
            return this.defaultVisit(node);
        }

        public visitTypeQuery(node: TypeQuerySyntax): any {
            return this.defaultVisit(node);
        }

        public visitTypeAnnotation(node: TypeAnnotationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitBlock(node: BlockSyntax): any {
            return this.defaultVisit(node);
        }

        public visitParameter(node: ParameterSyntax): any {
            return this.defaultVisit(node);
        }

        public visitMemberAccessExpression(node: MemberAccessExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitArgumentList(node: ArgumentListSyntax): any {
            return this.defaultVisit(node);
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitConditionalExpression(node: ConditionalExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitConstructSignature(node: ConstructSignatureSyntax): any {
            return this.defaultVisit(node);
        }

        public visitMethodSignature(node: MethodSignatureSyntax): any {
            return this.defaultVisit(node);
        }

        public visitIndexSignature(node: IndexSignatureSyntax): any {
            return this.defaultVisit(node);
        }

        public visitPropertySignature(node: PropertySignatureSyntax): any {
            return this.defaultVisit(node);
        }

        public visitCallSignature(node: CallSignatureSyntax): any {
            return this.defaultVisit(node);
        }

        public visitParameterList(node: ParameterListSyntax): any {
            return this.defaultVisit(node);
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): any {
            return this.defaultVisit(node);
        }

        public visitTypeParameter(node: TypeParameterSyntax): any {
            return this.defaultVisit(node);
        }

        public visitConstraint(node: ConstraintSyntax): any {
            return this.defaultVisit(node);
        }

        public visitElseClause(node: ElseClauseSyntax): any {
            return this.defaultVisit(node);
        }

        public visitIfStatement(node: IfStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitGetAccessor(node: GetAccessorSyntax): any {
            return this.defaultVisit(node);
        }

        public visitSetAccessor(node: SetAccessorSyntax): any {
            return this.defaultVisit(node);
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitReturnStatement(node: ReturnStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): any {
            return this.defaultVisit(node);
        }

        public visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): any {
            return this.defaultVisit(node);
        }

        public visitBreakStatement(node: BreakStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitContinueStatement(node: ContinueStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitForStatement(node: ForStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitForInStatement(node: ForInStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitWhileStatement(node: WhileStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitWithStatement(node: WithStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitEnumDeclaration(node: EnumDeclarationSyntax): any {
            return this.defaultVisit(node);
        }

        public visitEnumElement(node: EnumElementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitCastExpression(node: CastExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): any {
            return this.defaultVisit(node);
        }

        public visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): any {
            return this.defaultVisit(node);
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitTryStatement(node: TryStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitCatchClause(node: CatchClauseSyntax): any {
            return this.defaultVisit(node);
        }

        public visitFinallyClause(node: FinallyClauseSyntax): any {
            return this.defaultVisit(node);
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitDoStatement(node: DoStatementSyntax): any {
            return this.defaultVisit(node);
        }

        public visitTypeOfExpression(node: TypeOfExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitVoidExpression(node: VoidExpressionSyntax): any {
            return this.defaultVisit(node);
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): any {
            return this.defaultVisit(node);
        }
    }
}