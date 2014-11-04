module TypeScript {
    var childCountArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3, 4, 3, 5, 2, 2, 3, 3, 3, 6, 6, 7, 8, 6, 6, 4, 5, 3, 5, 3, 5, 5, 3, 3, 2, 4, 3, 3, 6, 3, 2, 3, 7, 3, 3, 10, 8, 1, 3, 5, 4, 3, 7, 2, 5, 2, 2, 2, 2, 5, 3, 2, 3, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 0, 2, 2, 2, 3, 4, 3, 3, 3, 2, 2, 4, 3, 2, 6, 2, 2, 2, 2, 3, 3, 6, 2, 2, 4, 1];

    export function childCount(element: ISyntaxElement): number {
        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element).length; }
        return childCountArray[element.kind];
    }

    var childAtArray: ((nodeOrToken: ISyntaxElement, index: number) => ISyntaxElement)[] = [
        undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        (node: SourceUnitSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.moduleElements;
                case 1: return node.endOfFileToken;
            }
        },
        (node: QualifiedNameSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.left;
                case 1: return node.dotToken;
                case 2: return node.right;
            }
        },
        (node: ObjectTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openBraceToken;
                case 1: return node.typeMembers;
                case 2: return node.closeBraceToken;
            }
        },
        (node: FunctionTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.typeParameterList;
                case 1: return node.parameterList;
                case 2: return node.equalsGreaterThanToken;
                case 3: return node.type;
            }
        },
        (node: ArrayTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.type;
                case 1: return node.openBracketToken;
                case 2: return node.closeBracketToken;
            }
        },
        (node: ConstructorTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.newKeyword;
                case 1: return node.typeParameterList;
                case 2: return node.parameterList;
                case 3: return node.equalsGreaterThanToken;
                case 4: return node.type;
            }
        },
        (node: GenericTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.name;
                case 1: return node.typeArgumentList;
            }
        },
        (node: TypeQuerySyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.typeOfKeyword;
                case 1: return node.name;
            }
        },
        (node: TupleTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openBracketToken;
                case 1: return node.types;
                case 2: return node.closeBracketToken;
            }
        },
        (node: UnionTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.left;
                case 1: return node.barToken;
                case 2: return node.right;
            }
        },
        (node: ParenthesizedTypeSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openParenToken;
                case 1: return node.type;
                case 2: return node.closeParenToken;
            }
        },
        (node: InterfaceDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.interfaceKeyword;
                case 2: return node.identifier;
                case 3: return node.typeParameterList;
                case 4: return node.heritageClauses;
                case 5: return node.body;
            }
        },
        (node: FunctionDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.functionKeyword;
                case 2: return node.identifier;
                case 3: return node.callSignature;
                case 4: return node.block;
                case 5: return node.semicolonToken;
            }
        },
        (node: ModuleDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.moduleKeyword;
                case 2: return node.name;
                case 3: return node.stringLiteral;
                case 4: return node.openBraceToken;
                case 5: return node.moduleElements;
                case 6: return node.closeBraceToken;
            }
        },
        (node: ClassDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.classKeyword;
                case 2: return node.identifier;
                case 3: return node.typeParameterList;
                case 4: return node.heritageClauses;
                case 5: return node.openBraceToken;
                case 6: return node.classElements;
                case 7: return node.closeBraceToken;
            }
        },
        (node: EnumDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.enumKeyword;
                case 2: return node.identifier;
                case 3: return node.openBraceToken;
                case 4: return node.enumElements;
                case 5: return node.closeBraceToken;
            }
        },
        (node: ImportDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.importKeyword;
                case 2: return node.identifier;
                case 3: return node.equalsToken;
                case 4: return node.moduleReference;
                case 5: return node.semicolonToken;
            }
        },
        (node: ExportAssignmentSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.exportKeyword;
                case 1: return node.equalsToken;
                case 2: return node.identifier;
                case 3: return node.semicolonToken;
            }
        },
        (node: MemberFunctionDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.propertyName;
                case 2: return node.callSignature;
                case 3: return node.block;
                case 4: return node.semicolonToken;
            }
        },
        (node: MemberVariableDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.variableDeclarator;
                case 2: return node.semicolonToken;
            }
        },
        (node: ConstructorDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.constructorKeyword;
                case 2: return node.callSignature;
                case 3: return node.block;
                case 4: return node.semicolonToken;
            }
        },
        (node: IndexMemberDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.indexSignature;
                case 2: return node.semicolonToken;
            }
        },
        (node: GetAccessorSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.getKeyword;
                case 2: return node.propertyName;
                case 3: return node.callSignature;
                case 4: return node.block;
            }
        },
        (node: SetAccessorSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.setKeyword;
                case 2: return node.propertyName;
                case 3: return node.callSignature;
                case 4: return node.block;
            }
        },
        (node: PropertySignatureSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.propertyName;
                case 1: return node.questionToken;
                case 2: return node.typeAnnotation;
            }
        },
        (node: CallSignatureSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.typeParameterList;
                case 1: return node.parameterList;
                case 2: return node.typeAnnotation;
            }
        },
        (node: ConstructSignatureSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.newKeyword;
                case 1: return node.callSignature;
            }
        },
        (node: IndexSignatureSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openBracketToken;
                case 1: return node.parameters;
                case 2: return node.closeBracketToken;
                case 3: return node.typeAnnotation;
            }
        },
        (node: MethodSignatureSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.propertyName;
                case 1: return node.questionToken;
                case 2: return node.callSignature;
            }
        },
        (node: BlockSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openBraceToken;
                case 1: return node.statements;
                case 2: return node.closeBraceToken;
            }
        },
        (node: IfStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.ifKeyword;
                case 1: return node.openParenToken;
                case 2: return node.condition;
                case 3: return node.closeParenToken;
                case 4: return node.statement;
                case 5: return node.elseClause;
            }
        },
        (node: VariableStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.modifiers;
                case 1: return node.variableDeclaration;
                case 2: return node.semicolonToken;
            }
        },
        (node: ExpressionStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.expression;
                case 1: return node.semicolonToken;
            }
        },
        (node: ReturnStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.returnKeyword;
                case 1: return node.expression;
                case 2: return node.semicolonToken;
            }
        },
        (node: SwitchStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.switchKeyword;
                case 1: return node.openParenToken;
                case 2: return node.expression;
                case 3: return node.closeParenToken;
                case 4: return node.openBraceToken;
                case 5: return node.switchClauses;
                case 6: return node.closeBraceToken;
            }
        },
        (node: BreakStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.breakKeyword;
                case 1: return node.identifier;
                case 2: return node.semicolonToken;
            }
        },
        (node: ContinueStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.continueKeyword;
                case 1: return node.identifier;
                case 2: return node.semicolonToken;
            }
        },
        (node: ForStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.forKeyword;
                case 1: return node.openParenToken;
                case 2: return node.variableDeclaration;
                case 3: return node.initializer;
                case 4: return node.firstSemicolonToken;
                case 5: return node.condition;
                case 6: return node.secondSemicolonToken;
                case 7: return node.incrementor;
                case 8: return node.closeParenToken;
                case 9: return node.statement;
            }
        },
        (node: ForInStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.forKeyword;
                case 1: return node.openParenToken;
                case 2: return node.variableDeclaration;
                case 3: return node.left;
                case 4: return node.inKeyword;
                case 5: return node.expression;
                case 6: return node.closeParenToken;
                case 7: return node.statement;
            }
        },
        (node: EmptyStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.semicolonToken;
            }
        },
        (node: ThrowStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.throwKeyword;
                case 1: return node.expression;
                case 2: return node.semicolonToken;
            }
        },
        (node: WhileStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.whileKeyword;
                case 1: return node.openParenToken;
                case 2: return node.condition;
                case 3: return node.closeParenToken;
                case 4: return node.statement;
            }
        },
        (node: TryStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.tryKeyword;
                case 1: return node.block;
                case 2: return node.catchClause;
                case 3: return node.finallyClause;
            }
        },
        (node: LabeledStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.identifier;
                case 1: return node.colonToken;
                case 2: return node.statement;
            }
        },
        (node: DoStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.doKeyword;
                case 1: return node.statement;
                case 2: return node.whileKeyword;
                case 3: return node.openParenToken;
                case 4: return node.condition;
                case 5: return node.closeParenToken;
                case 6: return node.semicolonToken;
            }
        },
        (node: DebuggerStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.debuggerKeyword;
                case 1: return node.semicolonToken;
            }
        },
        (node: WithStatementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.withKeyword;
                case 1: return node.openParenToken;
                case 2: return node.condition;
                case 3: return node.closeParenToken;
                case 4: return node.statement;
            }
        },
        (node: PrefixUnaryExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.operatorToken;
                case 1: return node.operand;
            }
        },
        (node: DeleteExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.deleteKeyword;
                case 1: return node.expression;
            }
        },
        (node: TypeOfExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.typeOfKeyword;
                case 1: return node.expression;
            }
        },
        (node: VoidExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.voidKeyword;
                case 1: return node.expression;
            }
        },
        (node: ConditionalExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.condition;
                case 1: return node.questionToken;
                case 2: return node.whenTrue;
                case 3: return node.colonToken;
                case 4: return node.whenFalse;
            }
        },
        (node: BinaryExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.left;
                case 1: return node.operatorToken;
                case 2: return node.right;
            }
        },
        (node: PostfixUnaryExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.operand;
                case 1: return node.operatorToken;
            }
        },
        (node: MemberAccessExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.expression;
                case 1: return node.dotToken;
                case 2: return node.name;
            }
        },
        (node: InvocationExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.expression;
                case 1: return node.argumentList;
            }
        },
        (node: ArrayLiteralExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openBracketToken;
                case 1: return node.expressions;
                case 2: return node.closeBracketToken;
            }
        },
        (node: ObjectLiteralExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openBraceToken;
                case 1: return node.propertyAssignments;
                case 2: return node.closeBraceToken;
            }
        },
        (node: ObjectCreationExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.newKeyword;
                case 1: return node.expression;
                case 2: return node.argumentList;
            }
        },
        (node: ParenthesizedExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openParenToken;
                case 1: return node.expression;
                case 2: return node.closeParenToken;
            }
        },
        (node: ParenthesizedArrowFunctionExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.callSignature;
                case 1: return node.equalsGreaterThanToken;
                case 2: return node.block;
                case 3: return node.expression;
            }
        },
        (node: SimpleArrowFunctionExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.parameter;
                case 1: return node.equalsGreaterThanToken;
                case 2: return node.block;
                case 3: return node.expression;
            }
        },
        (node: CastExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.lessThanToken;
                case 1: return node.type;
                case 2: return node.greaterThanToken;
                case 3: return node.expression;
            }
        },
        (node: ElementAccessExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.expression;
                case 1: return node.openBracketToken;
                case 2: return node.argumentExpression;
                case 3: return node.closeBracketToken;
            }
        },
        (node: FunctionExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.functionKeyword;
                case 1: return node.identifier;
                case 2: return node.callSignature;
                case 3: return node.block;
            }
        },
        (node: OmittedExpressionSyntax, index: number): ISyntaxElement => {
            throw Errors.invalidOperation();
        },
        (node: TemplateExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.templateStartToken;
                case 1: return node.templateClauses;
            }
        },
        (node: TemplateAccessExpressionSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.expression;
                case 1: return node.templateExpression;
            }
        },
        (node: VariableDeclarationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.varKeyword;
                case 1: return node.variableDeclarators;
            }
        },
        (node: VariableDeclaratorSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.propertyName;
                case 1: return node.typeAnnotation;
                case 2: return node.equalsValueClause;
            }
        },
        (node: ArgumentListSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.typeArgumentList;
                case 1: return node.openParenToken;
                case 2: return node.arguments;
                case 3: return node.closeParenToken;
            }
        },
        (node: ParameterListSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.openParenToken;
                case 1: return node.parameters;
                case 2: return node.closeParenToken;
            }
        },
        (node: TypeArgumentListSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.lessThanToken;
                case 1: return node.typeArguments;
                case 2: return node.greaterThanToken;
            }
        },
        (node: TypeParameterListSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.lessThanToken;
                case 1: return node.typeParameters;
                case 2: return node.greaterThanToken;
            }
        },
        (node: HeritageClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.extendsOrImplementsKeyword;
                case 1: return node.typeNames;
            }
        },
        (node: EqualsValueClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.equalsToken;
                case 1: return node.value;
            }
        },
        (node: CaseSwitchClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.caseKeyword;
                case 1: return node.expression;
                case 2: return node.colonToken;
                case 3: return node.statements;
            }
        },
        (node: DefaultSwitchClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.defaultKeyword;
                case 1: return node.colonToken;
                case 2: return node.statements;
            }
        },
        (node: ElseClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.elseKeyword;
                case 1: return node.statement;
            }
        },
        (node: CatchClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.catchKeyword;
                case 1: return node.openParenToken;
                case 2: return node.identifier;
                case 3: return node.typeAnnotation;
                case 4: return node.closeParenToken;
                case 5: return node.block;
            }
        },
        (node: FinallyClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.finallyKeyword;
                case 1: return node.block;
            }
        },
        (node: TemplateClauseSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.expression;
                case 1: return node.templateMiddleOrEndToken;
            }
        },
        (node: TypeParameterSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.identifier;
                case 1: return node.constraint;
            }
        },
        (node: ConstraintSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.extendsKeyword;
                case 1: return node.typeOrExpression;
            }
        },
        (node: SimplePropertyAssignmentSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.propertyName;
                case 1: return node.colonToken;
                case 2: return node.expression;
            }
        },
        (node: FunctionPropertyAssignmentSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.propertyName;
                case 1: return node.callSignature;
                case 2: return node.block;
            }
        },
        (node: ParameterSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.dotDotDotToken;
                case 1: return node.modifiers;
                case 2: return node.identifier;
                case 3: return node.questionToken;
                case 4: return node.typeAnnotation;
                case 5: return node.equalsValueClause;
            }
        },
        (node: EnumElementSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.propertyName;
                case 1: return node.equalsValueClause;
            }
        },
        (node: TypeAnnotationSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.colonToken;
                case 1: return node.type;
            }
        },
        (node: ExternalModuleReferenceSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.requireKeyword;
                case 1: return node.openParenToken;
                case 2: return node.stringLiteral;
                case 3: return node.closeParenToken;
            }
        },
        (node: ModuleNameModuleReferenceSyntax, index: number): ISyntaxElement => {
            switch (index) {
                case 0: return node.moduleName;
            }
        }
    ];
    export function childAt(element: ISyntaxElement, index: number): ISyntaxElement {
        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element)[index]; }
        return childAtArray[element.kind](element, index);
    }
}