///<reference path='references.ts' />

module TypeScript.PrettyPrinter {
    export function prettyPrint(node: ISyntaxNode, indentWhitespace: string = "    "): string {
        var impl = new PrettyPrinterImpl(indentWhitespace);
        visitNodeOrToken(impl, node);
        return impl.result.join("");
    }

    class PrettyPrinterImpl implements ISyntaxVisitor {
        public result: string[] = [];
        private indentations: string[] = [];
        private indentation: number = 0;

        constructor(private indentWhitespace: string) {
        }

        private newLineCountBetweenModuleElements(element1: IModuleElementSyntax, element2: IModuleElementSyntax): number {
            if (!element1 || !element2) {
                return 0;
            }

            if (lastToken(element1).kind === SyntaxKind.CloseBraceToken) {
                return 2;
            }

            return 1;
        }

        private newLineCountBetweenClassElements(element1: IClassElementSyntax, element2: IClassElementSyntax): number {
            if (!element1 || !element2) {
                return 0;
            }

            return 1;
        }

        private newLineCountBetweenStatements(element1: IStatementSyntax, element2: IStatementSyntax): number {
            if (!element1 || !element2) {
                return 0;
            }

            if (lastToken(element1).kind === SyntaxKind.CloseBraceToken) {
                return 2;
            }

            return 1;
        }

        private newLineCountBetweenSwitchClauses(element1: ISwitchClauseSyntax, element2: ISwitchClauseSyntax): number {
            if (!element1 || !element2) {
                return 0;
            }

            if (childCount(element1.statements) === 0) {
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

        private appendElement(element: ISyntaxElement): void {
            if (isToken(element)) {
                this.appendToken(<ISyntaxToken>element);
            }
            else if (isNode(element)) {
                this.appendNode(<ISyntaxNode>element);
            }
        }

        private appendNode(node: ISyntaxNode): void {
            visitNodeOrToken(this, node);
        }

        private appendToken(token: ISyntaxToken): void {
            if (token && token.fullWidth() > 0) {
                this.appendIndentationIfAfterNewLine();
                this.appendText(token.text());
            }
        }

        public visitToken(token: ISyntaxToken): void {
            this.appendToken(token);
        }

        private appendSpaceList(list: ISyntaxNodeOrToken[]): void {
            for (var i = 0, n = childCount(list); i < n; i++) {
                if (isNode(childAt(list, i))) {
                    this.appendNode(<ISyntaxNode>childAt(list, i));
                }
                else {
                    this.appendToken(<ISyntaxToken>childAt(list, i));
                }

                this.ensureSpace();
            }
        }

        private appendSeparatorSpaceList(list: ISyntaxNodeOrToken[]): void {
            for (var i = 0, n = childCount(list); i < n; i++) {
                if (i % 2 === 0) {
                    if (i > 0) {
                        this.ensureSpace();
                    }

                    visitNodeOrToken(this, list[i]);
                }
                else {
                    this.appendToken(<ISyntaxToken>childAt(list, i));
                }
            }
        }

        private appendSeparatorNewLineList(list: ISyntaxNodeOrToken[]): void {
            for (var i = 0, n = childCount(list); i < n; i++) {
                if (i % 2 === 0) {
                    if (i > 0) {
                        this.ensureNewLine();
                    }

                    visitNodeOrToken(this, list[i]);
                }
                else {
                    this.appendToken(<ISyntaxToken>childAt(list, i));
                }
            }
        }

        private appendModuleElements(list: IModuleElementSyntax[]): void {
            var lastModuleElement: IModuleElementSyntax = undefined;
            for (var i = 0, n = list.length; i < n; i++) {
                var moduleElement = list[i];
                var newLineCount = this.newLineCountBetweenModuleElements(lastModuleElement, moduleElement);

                this.appendNewLines(newLineCount);
                visitNodeOrToken(this, moduleElement);

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
            visitNodeOrToken(this, node.moduleName);
        }

        public visitImportDeclaration(node: ImportDeclarationSyntax): void {
            this.appendToken(node.importKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.ensureSpace();
            this.appendToken(node.equalsToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.moduleReference);
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

            var lastClassElement: IClassElementSyntax = undefined;
            for (var i = 0, n = node.classElements.length; i < n; i++) {
                var classElement = node.classElements[i];
                var newLineCount = this.newLineCountBetweenClassElements(lastClassElement, classElement);

                this.appendNewLines(newLineCount);
                visitNodeOrToken(this, classElement);

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

            for (var i = 0, n = childCount(node.typeMembers); i < n; i++) {
                visitNodeOrToken(this, node.typeMembers[i]);

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
            this.appendElement(node.name);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            this.indentation++;
            
            this.appendModuleElements(node.moduleElements);

            this.indentation--;
            this.appendToken(node.closeBraceToken);
        }

        private appendBody(body: BlockSyntax | ExpressionBody | ISyntaxToken) {
            if (body.kind === SyntaxKind.Block || body.kind === SyntaxKind.ExpressionBody) {
                this.ensureSpace();
                visitNodeOrToken(this, body);
            }
            else {
                this.appendToken(<ISyntaxToken>body);
            }
        }

        public visitExpressionBody(node: ExpressionBody): void {
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
        }

        public visitFunctionDeclaration(node: FunctionDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.functionKeyword);
            this.ensureSpace();
            this.appendToken(node.identifier);
            this.appendNode(node.callSignature);
            this.appendBody(node.body);
        }

        public visitVariableStatement(node: VariableStatementSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            visitNodeOrToken(this, node.variableDeclaration);
            this.appendToken(node.semicolonToken);
        }

        public visitVariableDeclaration(node: VariableDeclarationSyntax): void {
            this.appendToken(node.varKeyword);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.variableDeclarators);
        }

        public visitVariableDeclarator(node: VariableDeclaratorSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            this.appendNode(node.equalsValueClause);
        }

        public visitEqualsValueClause(node: EqualsValueClauseSyntax): void {
            this.ensureSpace();
            this.appendToken(node.equalsToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.value);
        }

        public visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): void {
            this.appendToken(node.operatorToken);
            visitNodeOrToken(this, node.operand);
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
            visitNodeOrToken(this, node.expression);
            this.appendToken(node.closeParenToken);
        }

        public visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): void {
            this.appendNode(node.parameter);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.body);
        }

        public visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): void {
            visitNodeOrToken(this, node.callSignature);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.body);
        }

        public visitQualifiedName(node: QualifiedNameSyntax): void {
            visitNodeOrToken(this, node.left);
            this.appendToken(node.dotToken);
            this.appendToken(node.right);
        }

        public visitTypeQuery(node: TypeQuerySyntax): void {
            this.appendToken(node.typeOfKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.name);
        }

        public visitTypeArgumentList(node: TypeArgumentListSyntax): void {
            this.appendToken(node.lessThanToken);
            this.appendSeparatorSpaceList(node.typeArguments);
            this.appendToken(node.greaterThanToken);
        }

        public visitTupleType(node: TupleTypeSyntax): void {
            this.appendToken(node.openBracketToken);
            this.appendSeparatorSpaceList(node.types);
            this.appendToken(node.closeBracketToken);
        }

        public visitParenthesizedType(node: ParenthesizedTypeSyntax): void {
            this.appendToken(node.openParenToken);
            this.appendElement(node.type);
            this.appendToken(node.closeParenToken);
        }

        public visitUnionType(node: UnionTypeSyntax): void {
            this.appendElement(node.left);
            this.ensureSpace();
            this.appendToken(node.barToken);
            this.ensureSpace();
            this.appendElement(node.right);
        }

        public visitConstructorType(node: ConstructorTypeSyntax): void {
            this.appendToken(node.newKeyword);
            this.ensureSpace();
            this.appendNode(node.typeParameterList);
            visitNodeOrToken(this, node.parameterList);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.type);
        }

        public visitFunctionType(node: FunctionTypeSyntax): void {
            this.appendNode(node.typeParameterList);
            visitNodeOrToken(this, node.parameterList);
            this.ensureSpace();
            this.appendToken(node.equalsGreaterThanToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.type);
        }

        public visitObjectType(node: ObjectTypeSyntax): void {
            this.appendToken(node.openBraceToken);
            this.ensureSpace();
            this.appendSeparatorSpaceList(node.typeMembers);
            this.appendToken(node.closeBraceToken);
        }

        public visitArrayType(node: ArrayTypeSyntax): void {
            visitNodeOrToken(this, node.type);
            this.appendToken(node.openBracketToken);
            this.appendToken(node.closeBracketToken);
        }

        public visitGenericType(node: GenericTypeSyntax): void {
            visitNodeOrToken(this, node.name);
            visitNodeOrToken(this, node.typeArgumentList);
        }

        public visitTypeAnnotation(node: TypeAnnotationSyntax): void {
            this.appendToken(node.colonToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.type);
        }

        private appendStatements(statements: IStatementSyntax[]): void {
            var lastStatement: IStatementSyntax = undefined;
            for (var i = 0, n = statements.length; i < n; i++) {
                var statement = statements[i];

                var newLineCount = this.newLineCountBetweenStatements(lastStatement, statement);

                this.appendNewLines(newLineCount);
                visitNodeOrToken(this, statement);

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
            visitNodeOrToken(this, node.expression);
            this.appendToken(node.dotToken);
            this.appendToken(node.name);
        }

        public visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): void {
            visitNodeOrToken(this, node.operand);
            this.appendToken(node.operatorToken);
        }

        public visitElementAccessExpression(node: ElementAccessExpressionSyntax): void {
            visitNodeOrToken(this, node.expression);
            this.appendToken(node.openBracketToken);
            visitNodeOrToken(this, node.argumentExpression);
            this.appendToken(node.closeBracketToken);
        }

        public visitInvocationExpression(node: InvocationExpressionSyntax): void {
            visitNodeOrToken(this, node.expression);
            visitNodeOrToken(this, node.argumentList);
        }

        public visitArgumentList(node: ArgumentListSyntax): void {
            this.appendToken(node.openParenToken);
            this.appendSeparatorSpaceList(node.arguments);
            this.appendToken(node.closeParenToken);
        }

        public visitBinaryExpression(node: BinaryExpressionSyntax): void {
            visitNodeOrToken(this, node.left);

            if (node.operatorToken.kind !== SyntaxKind.CommaToken) {
                this.ensureSpace();
            }

            this.appendToken(node.operatorToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.right);
        }

        public visitConditionalExpression(node: ConditionalExpressionSyntax): void {
            visitNodeOrToken(this, node.condition);
            this.ensureSpace();
            this.appendToken(node.questionToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.whenTrue);
            this.ensureSpace();
            this.appendToken(node.colonToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.whenFalse);
        }

        public visitConstructSignature(node: ConstructSignatureSyntax): void {
            this.appendToken(node.newKeyword);
            visitNodeOrToken(this, node.callSignature);
        }

        public visitMethodSignature(node: MethodSignatureSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            this.appendToken(node.questionToken);
            visitNodeOrToken(this, node.callSignature);
        }

        public visitIndexSignature(node: IndexSignatureSyntax): void {
            this.appendToken(node.openBracketToken);
            this.appendSeparatorSpaceList(node.parameters)
            this.appendToken(node.closeBracketToken);
            this.appendNode(node.typeAnnotation);
        }

        public visitPropertySignature(node: PropertySignatureSyntax): void {
            visitNodeOrToken(this, node.propertyName);
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
            visitNodeOrToken(this, node.parameterList);
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
            visitNodeOrToken(this, node.typeOrExpression);
        }

        private appendBlockOrStatement(node: IStatementSyntax): void {
            if (node.kind === SyntaxKind.Block) {
                this.ensureSpace();
                visitNodeOrToken(this, node);
            }
            else {
                this.ensureNewLine();
                this.indentation++;
                visitNodeOrToken(this, node);
                this.indentation--;
            }
        }

        public visitIfStatement(node: IfStatementSyntax): void {
            this.appendToken(node.ifKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            visitNodeOrToken(this, node.condition);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
            this.appendNode(node.elseClause);
        }

        public visitElseClause(node: ElseClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.elseKeyword);

            if (node.statement.kind === SyntaxKind.IfStatement) {
                this.ensureSpace();
                visitNodeOrToken(this, node.statement);
            }
            else {
                this.appendBlockOrStatement(node.statement);
            }
        }

        public visitExpressionStatement(node: ExpressionStatementSyntax): void {
            visitNodeOrToken(this, node.expression);
            this.appendToken(node.semicolonToken);
        }

        public visitConstructorDeclaration(node: ConstructorDeclarationSyntax): void {
            this.appendToken(node.constructorKeyword);
            visitNodeOrToken(this, node.callSignature);
            this.appendBody(node.body);
        }

        public visitIndexMemberDeclaration(node: IndexMemberDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            visitNodeOrToken(this, node.indexSignature);
            this.appendToken(node.semicolonToken);
        }

        public visitMemberFunctionDeclaration(node: MemberFunctionDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.callSignature);
            this.appendBody(node.body);
        }

        public visitGetAccessor(node: GetAccessorSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.getKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.callSignature);
            this.ensureSpace();
            visitNodeOrToken(this, node.body);
        }

        public visitSetAccessor(node: SetAccessorSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            this.appendToken(node.setKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.propertyName);
            visitNodeOrToken(this, node.callSignature)
            this.ensureSpace();
            visitNodeOrToken(this, node.body);
        }

        public visitMemberVariableDeclaration(node: MemberVariableDeclarationSyntax): void {
            this.appendSpaceList(node.modifiers);
            this.ensureSpace();
            visitNodeOrToken(this, node.variableDeclarator);
            this.appendToken(node.semicolonToken);
        }

        public visitThrowStatement(node: ThrowStatementSyntax): void {
            this.appendToken(node.throwKeyword);

            if (node.expression) {
                this.ensureSpace();
                visitNodeOrToken(this, node.expression);
            }

            this.appendToken(node.semicolonToken);
        }

        public visitReturnStatement(node: ReturnStatementSyntax): void {
            this.appendToken(node.returnKeyword);

            if (node.expression) {
                this.ensureSpace();
                visitNodeOrToken(this, node.expression);
            }

            this.appendToken(node.semicolonToken);
        }

        public visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): void {
            this.appendToken(node.newKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
            this.appendNode(node.argumentList);
        }

        public visitSwitchStatement(node: SwitchStatementSyntax): void {
            this.appendToken(node.switchKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            visitNodeOrToken(this, node.expression);
            this.appendToken(node.closeParenToken);
            this.ensureSpace();
            this.appendToken(node.openBraceToken);
            this.ensureNewLine();

            var lastSwitchClause: ISwitchClauseSyntax = undefined;
            for (var i = 0, n = node.switchClauses.length; i < n; i++) {
                var switchClause = node.switchClauses[i];

                var newLineCount = this.newLineCountBetweenSwitchClauses(lastSwitchClause, switchClause);

                this.appendNewLines(newLineCount);
                visitNodeOrToken(this, switchClause);

                lastSwitchClause = switchClause;
            }

            this.ensureNewLine();
            this.appendToken(node.closeBraceToken);
        }

        private appendSwitchClauseStatements(node: ISwitchClauseSyntax): void {
            if (childCount(node.statements) === 1 && childAt(node.statements, 0).kind === SyntaxKind.Block) {
                this.ensureSpace();
                visitNodeOrToken(this, node.statements[0]);
            }
            else if (childCount(node.statements) > 0) {
                this.ensureNewLine();

                this.indentation++;
                this.appendStatements(node.statements);
                this.indentation--;
            }
        }

        public visitCaseSwitchClause(node: CaseSwitchClauseSyntax): void {
            this.appendToken(node.caseKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
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
            visitNodeOrToken(this, node.initializer);
            this.appendToken(node.firstSemicolonToken);

            if (node.condition) {
                this.ensureSpace();
                visitNodeOrToken(this, node.condition);
            }

            this.appendToken(node.secondSemicolonToken);

            if (node.incrementor) {
                this.ensureSpace();
                visitNodeOrToken(this, node.incrementor);
            }

            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitForInStatement(node: ForInStatementSyntax): void {
            this.appendToken(node.forKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            this.appendElement(node.left);
            this.ensureSpace();
            this.appendToken(node.inKeyword);
            this.ensureSpace();
            this.appendElement(node.right);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitWhileStatement(node: WhileStatementSyntax): void {
            this.appendToken(node.whileKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            visitNodeOrToken(this, node.condition);
            this.appendToken(node.closeParenToken);
            this.appendBlockOrStatement(node.statement);
        }

        public visitWithStatement(node: WithStatementSyntax): void {
            this.appendToken(node.withKeyword);
            this.ensureSpace();
            this.appendToken(node.openParenToken);
            visitNodeOrToken(this, node.condition);
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
            visitNodeOrToken(this, node.propertyName);
            this.ensureSpace();
            this.appendNode(node.equalsValueClause);
        }

        public visitCastExpression(node: CastExpressionSyntax): void {
            this.appendToken(node.lessThanToken);
            visitNodeOrToken(this, node.type);
            this.appendToken(node.greaterThanToken);
            visitNodeOrToken(this, node.expression);
        }

        public visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): void {
            this.appendToken(node.openBraceToken);

            if (childCount(node.propertyAssignments) === 1) {
                this.ensureSpace();
                visitNodeOrToken(this, <ISyntaxNodeOrToken>childAt(node.propertyAssignments, 0));
                this.ensureSpace();
            }
            else if (childCount(node.propertyAssignments) > 0) {
                this.indentation++;
                this.ensureNewLine();
                this.appendSeparatorNewLineList(node.propertyAssignments);
                this.ensureNewLine();
                this.indentation--;
            }

            this.appendToken(node.closeBraceToken);
        }

        public visitComputedPropertyName(node: ComputedPropertyNameSyntax): void {
            this.appendToken(node.openBracketToken);
            visitNodeOrToken(this, node.expression);
            this.appendToken(node.closeBracketToken);
        }

        public visitSimplePropertyAssignment(node: SimplePropertyAssignmentSyntax): void {
            visitNodeOrToken(this, node.propertyName);
            this.appendToken(node.colonToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
        }

        public visitFunctionExpression(node: FunctionExpressionSyntax): void {
            this.appendToken(node.functionKeyword);
            
            if (node.identifier) {
                this.ensureSpace();
                this.appendToken(node.identifier);
            }

            visitNodeOrToken(this, node.callSignature);
            this.ensureSpace();
            visitNodeOrToken(this, node.body);
        }

        public visitEmptyStatement(node: EmptyStatementSyntax): void {
            this.appendToken(node.semicolonToken);
        }

        public visitTryStatement(node: TryStatementSyntax): void {
            this.appendToken(node.tryKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.block);
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
            visitNodeOrToken(this, node.block);
        }

        public visitFinallyClause(node: FinallyClauseSyntax): void {
            this.ensureNewLine();
            this.appendToken(node.finallyKeyword);
            this.ensureNewLine();
            visitNodeOrToken(this, node.block);
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
            visitNodeOrToken(this, node.condition);
            this.appendToken(node.closeParenToken);
            this.appendToken(node.semicolonToken);
        }

        public visitTypeOfExpression(node: TypeOfExpressionSyntax): void {
            this.appendToken(node.typeOfKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
        }

        public visitDeleteExpression(node: DeleteExpressionSyntax): void {
            this.appendToken(node.deleteKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
        }

        public visitVoidExpression(node: VoidExpressionSyntax): void {
            this.appendToken(node.voidKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
        }

        public visitYieldExpression(node: YieldExpressionSyntax): void {
            this.appendToken(node.yieldKeyword);
            this.ensureSpace();
            this.appendToken(node.asterixToken);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
        }

        public visitAwaitExpression(node: AwaitExpressionSyntax): void {
            this.appendToken(node.awaitKeyword);
            this.ensureSpace();
            visitNodeOrToken(this, node.expression);
        }

        public visitDebuggerStatement(node: DebuggerStatementSyntax): void {
            this.appendToken(node.debuggerKeyword);
            this.appendToken(node.semicolonToken);
        }

        public visitTemplateExpression(node: TemplateExpressionSyntax): void {
            this.appendToken(node.templateStartToken);
            this.ensureSpace();
            this.appendSpaceList(node.templateClauses);
        }

        public visitTemplateClause(node: TemplateClauseSyntax): void {
            visitNodeOrToken(this, node.expression);
            this.ensureSpace();
            this.appendToken(node.templateMiddleOrEndToken);
        }

        public visitTemplateAccessExpression(node: TemplateAccessExpressionSyntax): void {
            visitNodeOrToken(this, node.expression);
            this.ensureSpace();
            visitNodeOrToken(this, node.templateExpression);
        }
    }
}