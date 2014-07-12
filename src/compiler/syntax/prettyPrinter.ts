///<reference path='References.ts' />

module TypeScript.PrettyPrinter {
    export function prettyPrint(node: SyntaxNode, indentWhitespace: string = "    "): string {
        var impl = new PrettyPrinterImpl(indentWhitespace);
        node.accept(impl);
        return impl.result.join("");
    }

    class PrettyPrinterImpl implements ISyntaxVisitor {
        public result: string[] = [];
        private indentations: string[] = [];
        private indentation: number = 0;

        constructor(private indentWhitespace: string) {
        }

        private newLineCountBetweenModuleElements(element1: IModuleElementSyntax, element2: IModuleElementSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            if (element1.lastToken().kind() === SyntaxKind.CloseBraceToken) {
                return 2;
            }

            return 1;
        }

        private newLineCountBetweenClassElements(element1: IClassElementSyntax, element2: IClassElementSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            return 1;
        }

        private newLineCountBetweenStatements(element1: IClassElementSyntax, element2: IClassElementSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            if (element1.lastToken().kind() === SyntaxKind.CloseBraceToken) {
                return 2;
            }

            return 1;
        }

        private newLineCountBetweenSwitchClauses(element1: ISwitchClauseSyntax, element2: ISwitchClauseSyntax): number {
            if (element1 === null || element2 === null) {
                return 0;
            }

            if (element1.statements.childCount() === 0) {
                return 1;
            }

            return 2;
        }

        private ensureSpace(): void {
            if (this.result.length > 0) {
                var last = ArrayUtilities.last(this.result);
                if (last !== " " && last !== "\r\n") {
                    this.appendText(" ");
                }
            }
        }

        private ensureNewLine(): void {
            if (this.result.length > 0) {
                var last = ArrayUtilities.last(this.result);
                if (last !== "\r\n") {
                    this.appendText("\r\n");
                }
            }
        }

        private appendNewLines(count: number): void {
            for (var i = 0; i < count; i++) {
                this.appendText("\r\n");
            }
        }

        private getIndentation(count: number): string {
            for (var i = this.indentations.length; i <= count; i++) {
                var text = i === 0
                    ? ""
                    : this.indentations[i - 1] + this.indentWhitespace;
                this.indentations[i] = text;
            }

            return this.indentations[count];
        }

        private appendIndentationIfAfterNewLine(): void {
            if (this.result.length > 0) {
                if (ArrayUtilities.last(this.result) === "\r\n") {
                    this.result.push(this.getIndentation(this.indentation));
                }
            }
        }

        private appendText(text: string): void {
            this.result.push(text);
        }

        private appendNode(node: ISyntaxNode): void {
            if (node !== null) {
                node.accept(this);
            }
        }

        private appendToken(token: ISyntaxToken): void {
            if (token !== null && token.fullWidth() > 0) {
                this.appendIndentationIfAfterNewLine();
                this.appendText(token.text());
            }
        }

        public visitToken(token: ISyntaxToken): void {
            this.appendToken(token);
        }

        private appendSpaceList(list: ISyntaxList): void {
            for (var i = 0, n = list.childCount(); i < n; i++) {
                this.appendToken(<ISyntaxToken>list.childAt(i));
                this.ensureSpace();
            }
        }

        private appendSeparatorSpaceList(list: ISeparatedSyntaxList): void {
            for (var i = 0, n = list.childCount(); i < n; i++) {
                if (i % 2 === 0) {
                    if (i > 0) {
                        this.ensureSpace();
                    }

                    list.childAt(i).accept(this);
                }
                else {
                    this.appendToken(<ISyntaxToken>list.childAt(i));
                }
            }
        }

        private appendSeparatorNewLineList(list: ISeparatedSyntaxList): void {
            for (var i = 0, n = list.childCount(); i < n; i++) {
                if (i % 2 === 0) {
                    if (i > 0) {
                        this.ensureNewLine();
                    }

                    list.childAt(i).accept(this);
                }
                else {
                    this.appendToken(<ISyntaxToken>list.childAt(i));
                }
            }
        }

        private appendModuleElements(list: ISyntaxList): void {
            var lastModuleElement: IModuleElementSyntax = null;
            for (var i = 0, n = list.childCount(); i < n; i++) {
                var moduleElement = <IModuleElementSyntax>list.childAt(i);
                var newLineCount = this.newLineCountBetweenModuleElements(lastModuleElement, moduleElement);

                this.appendNewLines(newLineCount);
                moduleElement.accept(this);

                lastModuleElement = moduleElement;
            }
        }

        public visitSourceUnit(node: SourceUnitSyntax): void {
            this.appendModuleElements(node.moduleElements);
        }

        public visitExternalModuleReference(node: ExternalModuleReferenceSyntax): void {
            this.appendToken(node.requireKeyword);
            this.appendToken(node.openParenToken);
            this.appendToken(node.stringLiteral);
            this.appendToken(node.closeParenToken);
        }

        public visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): void {
            node.moduleName.accept(this);
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): void {
            this.appendToken(node.importKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.ensureSpace();
            this.appendToken(node.equalsToken);
            this.ensureSpace();
            node.moduleReference.accept(this);
            this.appendToken(node.semicolonToken);
        }

        public visitExportAssignment(node: ExportAssignmentSyntax): void {
            this.appendToken(node.exportKeyword);
            this.ensureSpace();
            this.appendToken(node.equalsToken);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.appendToken(node.semicolonToken);
        }

        public visitClassDeclaration(node: ClassDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.classKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.appendNode(node.typeParameterList);
            this.ensureSpace();
            this.appendSpaceList(node.heritageClauses);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            this.indentation++;

            var lastClassElement: IClassElementSyntax = null;
            for (var i = 0, n = node.classElements.childCount(); i < n; i++) {
                var classElement = <IClassElementSyntax>node.classElements.childAt(i);
                var newLineCount = this.newLineCountBetweenClassElements(lastClassElement, classElement);

                this.appendNewLines(newLineCount);
                classElement.accept(this);

                lastClassElement = classElement;
            }

            this.indentation--;

            this.ensureNewLine();
            this.appendToken(node.closeBraceToken);
        }

        public visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.interfaceKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.appendNode(node.typeParameterList);
            this.ensureSpace();
            this.appendSpaceList(node.heritageClauses);
            this.ensureSpace();
            this.appendObjectType(node.body, /*appendNewLines:*/ true);
        }

        private appendObjectType(node: ObjectTypeSyntax, appendNewLines: boolean): void {
            this.appendToken(node.openBraceToken);

            if (appendNewLines) {
                this.ensureNewLine();
                this.indentation++;
            }
            else {
                this.ensureSpace();
            }

            for (var i = 0, n = node.typeMembers.childCount(); i < n; i++) {
                node.typeMembers.childAt(i).accept(this);

                if (appendNewLines) {
                    this.ensureNewLine();
                }
                else {
                    this.ensureSpace();
                }
            }

            this.indentation--;
            this.appendToken(node.closeBraceToken);
        }

        public visitHeritageClause(node: HeritageClauseSyntax): void {
            this.appendToken(node.extendsOrImplementsKeyword);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.typeNames);
        }

        public visitModuleDeclaration(node: ModuleDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.moduleKeyword);
            this.ensureSpace();
            this.appendNode(node.name);
            this.ensureSpace();
            this.appendToken(node.stringLiteral);
            this.ensureSpace();

            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            this.indentation++;
            
            this.appendModuleElements(node.moduleElements);

            this.indentation--;
            this.appendToken(node.closeBraceToken);
        }

        private appendBlockOrSemicolon(block: BlockSyntax, semicolonToken: ISyntaxToken) {
            if (block) {
                this.ensureSpace();
                block.accept(this);
            }
            else {
                this.appendToken(semicolonToken);
            }
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.functionKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.appendNode(node.callSignature);
            this.appendBlockOrSemicolon(node.block, node.semicolonToken);
        }

        public visitVariableStatement(node: VariableStatementSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            node.variableDeclaration.accept(this);
            this.appendToken(node.semicolonToken);
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): void {
            this.appendToken(node.varKeyword);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.variableDeclarators);
        }

        public visitVariableDeclarator(node: VariableDeclaratorSyntax): void {
            this.appendToken(node.propertyName);
            this.appendNode(node.equalsValueClause);
        }

        public visitEqualsValueClause(node: EqualsValueClauseSyntax): void {
            this.ensureSpace();
            this.appendToken(node.equalsToken);
            this.ensureSpace();
            node.value.accept(this);
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            this.appendToken(node.operatorToken);
            node.operand.accept(this);
        }

        public visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): void {
            this.appendToken(node.openBracketToken);
            this.appendSeparatorSpaceList(node.expressions);
            this.appendToken(node.closeBracketToken);
        }

        public visitOmittedExpression(node: OmittedExpressionSyntax): void {
            // Nothing to do.
        }

        public visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): void {
            this.appendToken(node.openParenToken);
            node.expression.accept(this);
            this.appendToken(node.closeParenToken);
        }

        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void {
            this.appendToken(node.identifier);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            this.appendNode(node.block);
            this.appendNode(node.expression);
        }

        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void {
            node.callSignature.accept(this);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            this.appendNode(node.block);
            this.appendNode(node.expression);
        }

        public visitQualifiedName(node: QualifiedNameSyntax): void {
            node.left.accept(this);
            this.appendToken(node.dotToken);
            this.appendToken(node.right);
        }

        public visitTypeQuery(node: TypeQuerySyntax): void {
            this.appendToken(node.typeOfKeyword);
            this.ensureSpace();
            node.name.accept(this);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            this.appendToken(node.lessThanToken);
            this.appendSeparatorSpaceList(node.typeArguments);
            this.appendToken(node.greaterThanToken);
        }

        public visitConstructorType(node: ConstructorTypeSyntax): void {
            this.appendToken(node.newKeyword);
            this.ensureSpace();
            this.appendNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            node.type.accept(this);
        }

        public visitFunctionType(node: FunctionTypeSyntax): void {
            this.appendNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            node.type.accept(this);
        }

        public visitObjectType(node: ObjectTypeSyntax): void {
            this.appendToken(node.openBraceToken);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.typeMembers);
            this.appendToken(node.closeBraceToken);
        }

        public visitArrayType(node: ArrayTypeSyntax): void {
            node.type.accept(this);
            this.appendToken(node.openBracketToken);
            this.appendToken(node.closeBracketToken);
        }

        public visitGenericType(node: GenericTypeSyntax): void {
            node.name.accept(this);
            node.typeArgumentList.accept(this);
        }

        public visitTypeAnnotation(node: TypeAnnotationSyntax): void {
            this.appendToken(node.colonToken);
            this.ensureSpace();
            node.type.accept(this);
        }

        private appendStatements(statements: ISyntaxList): void {
            var lastStatement: IStatementSyntax = null;
            for (var i = 0, n = statements.childCount(); i < n; i++) {
                var statement = <IStatementSyntax>statements.childAt(i);

                var newLineCount = this.newLineCountBetweenStatements(lastStatement, statement);

                this.appendNewLines(newLineCount);
                statement.accept(this);

                lastStatement = statement;
            }
        }

        public visitBlock(node: BlockSyntax): void {
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();
            this.indentation++;
            
            this.appendStatements(node.statements);

            this.indentation--;
            this.ensureNewLine();
            this.appendToken(node.closeBraceToken);
        }

        public visitParameter(node: ParameterSyntax): void {
            this.appendToken(node.dotDotDotToken);
            this.appendSpaceList(node.modifiers);
            this.appendToken(node.identifier);
            this.appendToken(node.questionToken);
            this.appendNode(node.typeAnnotation);
            this.appendNode(node.equalsValueClause);
        }

        public visitMemberAccessExpression(node: MemberAccessExpressionSyntax): void {
            node.expression.accept(this);
            this.appendToken(node.dotToken);
            this.appendToken(node.name);
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            node.operand.accept(this);
            this.appendToken(node.operatorToken);
        }

        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): void {
            node.expression.accept(this);
            this.appendToken(node.openBracketToken);
            node.argumentExpression.accept(this);
            this.appendToken(node.closeBracketToken);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): void {
            node.expression.accept(this);
            node.argumentList.accept(this);
        }

        public visitArgumentList(node: ArgumentListSyntax): void {
            this.appendToken(node.openParenToken);
            this.appendSeparatorSpaceList(node.arguments);
            this.appendToken(node.closeParenToken);
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): void {
            node.left.accept(this);

            if (node.kind() !== SyntaxKind.CommaExpression) {
                this.ensureSpace();
            }

            this.appendToken(node.operatorToken);
            this.ensureSpace();
            node.right.accept(this);
        }

        public visitConditionalExpression(node: ConditionalExpressionSyntax): void {
            node.condition.accept(this);
            this.ensureSpace();
            this.appendToken(node.questionToken);
            this.ensureSpace();
            node.whenTrue.accept(this);
            this.ensureSpace();
            this.appendToken(node.colonToken);
            this.ensureSpace();
            node.whenFalse.accept(this);
        }

        public visitConstructSignature(node: ConstructSignatureSyntax): void {
            this.appendToken(node.newKeyword);
            node.callSignature.accept(this);
        }

        public visitMethodSignature(node: MethodSignatureSyntax): void {
            this.appendToken(node.propertyName);
            this.appendToken(node.questionToken);
            node.callSignature.accept(this);
        }

        public visitIndexSignature(node: IndexSignatureSyntax): void {
            this.appendToken(node.openBracketToken);
            this.appendNode(node.parameter);
            this.appendToken(node.closeBracketToken);
            this.appendNode(node.typeAnnotation);
        }

        public visitPropertySignature(node: PropertySignatureSyntax): void {
            this.appendToken(node.propertyName);
            this.appendToken(node.questionToken);
            this.appendNode(node.typeAnnotation);
        }

        public visitParameterList(node: ParameterListSyntax): void {
            this.appendToken(node.openParenToken);
            this.appendSeparatorSpaceList(node.parameters);
            this.appendToken(node.closeParenToken);
        }

        public visitCallSignature(node: CallSignatureSyntax): void {
            this.appendNode(node.typeParameterList);
            node.parameterList.accept(this);
            this.appendNode(node.typeAnnotation);
        }

        public visitTypeParameterList(node: TypeParameterListSyntax): void {
            this.appendToken(node.lessThanToken);
            this.appendSeparatorSpaceList(node.typeParameters);
            this.appendToken(node.greaterThanToken);
        }

        public visitTypeParameter(node: TypeParameterSyntax): void {
            this.appendToken(node.identifier);
            this.appendNode(node.constraint);
        }

        public visitConstraint(node: ConstraintSyntax): void {
            this.ensureSpace();
            this.appendToken(node.extendsKeyword);
            this.ensureSpace();
            node.type.accept(this);
        }

        private appendBlockOrStatement(node: IStatementSyntax): void {
            if (node.kind() === SyntaxKind.Block) {
                this.ensureSpace();
                node.accept(this);
            }
            else {
                this.ensureNewLine();
                this.indentation++;
                node.accept(this);
                this.indentation--;
            }
        }

        public visitIfStatement(node: IfStatementSyntax): void {
            this.appendToken(node.ifKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
            this.appendNode(node.elseClause);
        }

        public visitElseClause(node: ElseClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.elseKeyword);

            if (node.statement.kind() === SyntaxKind.IfStatement) {
                this.ensureSpace();
                node.statement.accept(this);
            }
            else {
                this.appendBlockOrStatement(node.statement);
            }
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): void {
            node.expression.accept(this);
            this.appendToken(node.semicolonToken);
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            this.appendToken(node.constructorKeyword);
            node.callSignature.accept(this);
            this.appendBlockOrSemicolon(node.block, node.semicolonToken);
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            node.indexSignature.accept(this);
            this.appendToken(node.semicolonToken);
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.propertyName);
            node.callSignature.accept(this);
            this.appendBlockOrSemicolon(node.block, node.semicolonToken);
        }

        public visitGetAccessor(node: GetAccessorSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.getKeyword);
            this.ensureSpace();
            this.appendToken(node.propertyName);
            node.parameterList.accept(this);
            this.appendNode(node.typeAnnotation);
            this.ensureSpace();
            node.block.accept(this);
        }

        public visitSetAccessor(node: SetAccessorSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.setKeyword);
            this.ensureSpace();
            this.appendToken(node.propertyName);
            node.parameterList.accept(this);
            this.ensureSpace();
            node.block.accept(this);
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            node.variableDeclarator.accept(this);
            this.appendToken(node.semicolonToken);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): void {
            this.appendToken(node.throwKeyword);

            if (node.expression) {
                this.ensureSpace();
                node.expression.accept(this);
            }

            this.appendToken(node.semicolonToken);
        }

        public visitReturnStatement(node: ReturnStatementSyntax): void {
            this.appendToken(node.returnKeyword);

            if (node.expression) {
                this.ensureSpace();
                node.expression.accept(this);
            }

            this.appendToken(node.semicolonToken);
        }

        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void {
            this.appendToken(node.newKeyword);
            this.ensureSpace();
            node.expression.accept(this);
            this.appendNode(node.argumentList);
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): void {
            this.appendToken(node.switchKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.expression.accept(this);
            this.appendToken(node.closeParenToken);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            var lastSwitchClause: ISwitchClauseSyntax = null;
            for (var i = 0, n = node.switchClauses.childCount(); i < n; i++) {
                var switchClause = <ISwitchClauseSyntax>node.switchClauses.childAt(i);

                var newLineCount = this.newLineCountBetweenSwitchClauses(lastSwitchClause, switchClause);

                this.appendNewLines(newLineCount);
                switchClause.accept(this);

                lastSwitchClause = switchClause;
            }

            this.ensureNewLine();
            this.appendToken(node.closeBraceToken);
        }

        private appendSwitchClauseStatements(node: ISwitchClauseSyntax): void {
            if (node.statements.childCount() === 1 && node.statements.childAt(0).kind() === SyntaxKind.Block) {
                this.ensureSpace();
                node.statements.childAt(0).accept(this);
            }
            else if (node.statements.childCount() > 0) {
                this.ensureNewLine();

                this.indentation++;
                this.appendStatements(node.statements);
                this.indentation--;
            }
        }

        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void {
            this.appendToken(node.caseKeyword);
            this.ensureSpace();
            node.expression.accept(this);
            this.appendToken(node.colonToken);
            this.appendSwitchClauseStatements(node);
        }

        public visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): void {
            this.appendToken(node.defaultKeyword);
            this.appendToken(node.colonToken);
            this.appendSwitchClauseStatements(node);
        }

        public visitBreakStatement(node: BreakStatementSyntax): void {
            this.appendToken(node.breakKeyword);
            if (node.identifier) {
                this.ensureSpace();
                this.appendToken(node.identifier);
            }

            this.appendToken(node.semicolonToken);
        }

        public visitContinueStatement(node: ContinueStatementSyntax): void {
            this.appendToken(node.continueKeyword);
            if (node.identifier) {
                this.ensureSpace();
                this.appendToken(node.identifier);
            }

            this.appendToken(node.semicolonToken);
        }

        public visitForStatement(node: ForStatementSyntax): void {
            this.appendToken(node.forKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            this.appendNode(node.variableDeclaration);
            this.appendNode(node.initializer);
            this.appendToken(node.firstSemicolonToken);

            if (node.condition) {
                this.ensureSpace();
                node.condition.accept(this);
            }

            this.appendToken(node.secondSemicolonToken);

            if (node.incrementor) {
                this.ensureSpace();
                node.incrementor.accept(this);
            }

            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitForInStatement(node: ForInStatementSyntax): void {
            this.appendToken(node.forKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            this.appendNode(node.variableDeclaration);
            this.appendNode(node.left);
            this.ensureSpace();
            this.appendToken(node.inKeyword);
            this.ensureSpace();
            this.appendNode(node.expression);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitWhileStatement(node: WhileStatementSyntax): void {
            this.appendToken(node.whileKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitWithStatement(node: WithStatementSyntax): void {
            this.appendToken(node.withKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitEnumDeclaration(node: EnumDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.enumKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            this.indentation++;
            this.appendSeparatorNewLineList(node.enumElements);
            this.indentation--;

            this.appendToken(node.closeBraceToken);
        }

        public visitEnumElement(node: EnumElementSyntax): void {
            this.appendToken(node.propertyName);
            this.ensureSpace();
            this.appendNode(node.equalsValueClause);
        }

        public visitCastExpression(node: CastExpressionSyntax): void {
            this.appendToken(node.lessThanToken);
            node.type.accept(this);
            this.appendToken(node.greaterThanToken);
            node.expression.accept(this);
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void {
            this.appendToken(node.openBraceToken);

            if (node.propertyAssignments.childCount() === 1) {
                this.ensureSpace();
                node.propertyAssignments.childAt(0).accept(this);
                this.ensureSpace();
            }
            else if (node.propertyAssignments.childCount() > 0) {
                this.indentation++;
                this.ensureNewLine();
                this.appendSeparatorNewLineList(node.propertyAssignments);
                this.ensureNewLine();
                this.indentation--;
            }

            this.appendToken(node.closeBraceToken);
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void {
            this.appendToken(node.propertyName);
            this.appendToken(node.colonToken);
            this.ensureSpace();
            node.expression.accept(this);
        }

        public visitFunctionPropertyAssignment(node: FunctionPropertyAssignmentSyntax): void {
            this.appendToken(node.propertyName);
            node.callSignature.accept(this);
            this.ensureSpace();
            node.block.accept(this);
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): void {
            this.appendToken(node.functionKeyword);
            
            if (node.identifier) {
                this.ensureSpace();
                this.appendToken(node.identifier);
            }

            node.callSignature.accept(this);
            this.ensureSpace();
            node.block.accept(this);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): void {
            this.appendToken(node.semicolonToken);
        }

        public visitTryStatement(node: TryStatementSyntax): void {
            this.appendToken(node.tryKeyword);
            this.ensureSpace();
            node.block.accept(this);
            this.appendNode(node.catchClause);
            this.appendNode(node.finallyClause);
        }

        public visitCatchClause(node: CatchClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.catchKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            this.appendToken(node.identifier);
            this.appendToken(node.closeParenToken);
            this.ensureSpace();
            node.block.accept(this);
        }

        public visitFinallyClause(node: FinallyClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.finallyKeyword);
            this.ensureNewLine();
            node.block.accept(this);
        }

        public visitLabeledStatement(node: LabeledStatementSyntax): void {
            this.appendToken(node.identifier);
            this.appendToken(node.colonToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitDoStatement(node: DoStatementSyntax): void {
            this.appendToken(node.doKeyword);
            this.appendBlockOrStatement(node.statement);
            this.ensureNewLine();
            this.appendToken(node.whileKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            node.condition.accept(this);
            this.appendToken(node.closeParenToken);
            this.appendToken(node.semicolonToken);
        }

        public visitTypeOfExpression(node: TypeOfExpressionSyntax): void {
            this.appendToken(node.typeOfKeyword);
            this.ensureSpace();
            node.expression.accept(this);
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): void {
            this.appendToken(node.deleteKeyword);
            this.ensureSpace();
            node.expression.accept(this);
        }

        public visitVoidExpression(node: VoidExpressionSyntax): void {
            this.appendToken(node.voidKeyword);
            this.ensureSpace();
            node.expression.accept(this);
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): void {
            this.appendToken(node.debuggerKeyword);
            this.appendToken(node.semicolonToken);
        }
    }
}