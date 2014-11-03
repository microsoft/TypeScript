module TypeScript {
    export function childCount(element: ISyntaxElement): number {
        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element).length; }
        switch (element.kind()) {
            case SyntaxKind.SourceUnit: return 2;
            case SyntaxKind.QualifiedName: return 3;
            case SyntaxKind.ObjectType: return 3;
            case SyntaxKind.FunctionType: return 4;
            case SyntaxKind.ArrayType: return 3;
            case SyntaxKind.ConstructorType: return 5;
            case SyntaxKind.GenericType: return 2;
            case SyntaxKind.TypeQuery: return 2;
            case SyntaxKind.TupleType: return 3;
            case SyntaxKind.UnionType: return 3;
            case SyntaxKind.ParenthesizedType: return 3;
            case SyntaxKind.InterfaceDeclaration: return 6;
            case SyntaxKind.FunctionDeclaration: return 6;
            case SyntaxKind.ModuleDeclaration: return 7;
            case SyntaxKind.ClassDeclaration: return 8;
            case SyntaxKind.EnumDeclaration: return 6;
            case SyntaxKind.ImportDeclaration: return 6;
            case SyntaxKind.ExportAssignment: return 4;
            case SyntaxKind.MemberFunctionDeclaration: return 5;
            case SyntaxKind.MemberVariableDeclaration: return 3;
            case SyntaxKind.ConstructorDeclaration: return 5;
            case SyntaxKind.IndexMemberDeclaration: return 3;
            case SyntaxKind.GetAccessor: return 5;
            case SyntaxKind.SetAccessor: return 5;
            case SyntaxKind.PropertySignature: return 3;
            case SyntaxKind.CallSignature: return 3;
            case SyntaxKind.ConstructSignature: return 2;
            case SyntaxKind.IndexSignature: return 4;
            case SyntaxKind.MethodSignature: return 3;
            case SyntaxKind.Block: return 3;
            case SyntaxKind.IfStatement: return 6;
            case SyntaxKind.VariableStatement: return 3;
            case SyntaxKind.ExpressionStatement: return 2;
            case SyntaxKind.ReturnStatement: return 3;
            case SyntaxKind.SwitchStatement: return 7;
            case SyntaxKind.BreakStatement: return 3;
            case SyntaxKind.ContinueStatement: return 3;
            case SyntaxKind.ForStatement: return 10;
            case SyntaxKind.ForInStatement: return 8;
            case SyntaxKind.EmptyStatement: return 1;
            case SyntaxKind.ThrowStatement: return 3;
            case SyntaxKind.WhileStatement: return 5;
            case SyntaxKind.TryStatement: return 4;
            case SyntaxKind.LabeledStatement: return 3;
            case SyntaxKind.DoStatement: return 7;
            case SyntaxKind.DebuggerStatement: return 2;
            case SyntaxKind.WithStatement: return 5;
            case SyntaxKind.PrefixUnaryExpression: return 2;
            case SyntaxKind.DeleteExpression: return 2;
            case SyntaxKind.TypeOfExpression: return 2;
            case SyntaxKind.VoidExpression: return 2;
            case SyntaxKind.ConditionalExpression: return 5;
            case SyntaxKind.BinaryExpression: return 3;
            case SyntaxKind.PostfixUnaryExpression: return 2;
            case SyntaxKind.MemberAccessExpression: return 3;
            case SyntaxKind.InvocationExpression: return 2;
            case SyntaxKind.ArrayLiteralExpression: return 3;
            case SyntaxKind.ObjectLiteralExpression: return 3;
            case SyntaxKind.ObjectCreationExpression: return 3;
            case SyntaxKind.ParenthesizedExpression: return 3;
            case SyntaxKind.ParenthesizedArrowFunctionExpression: return 4;
            case SyntaxKind.SimpleArrowFunctionExpression: return 4;
            case SyntaxKind.CastExpression: return 4;
            case SyntaxKind.ElementAccessExpression: return 4;
            case SyntaxKind.FunctionExpression: return 4;
            case SyntaxKind.OmittedExpression: return 0;
            case SyntaxKind.TemplateExpression: return 2;
            case SyntaxKind.TemplateAccessExpression: return 2;
            case SyntaxKind.VariableDeclaration: return 2;
            case SyntaxKind.VariableDeclarator: return 3;
            case SyntaxKind.ArgumentList: return 4;
            case SyntaxKind.ParameterList: return 3;
            case SyntaxKind.TypeArgumentList: return 3;
            case SyntaxKind.TypeParameterList: return 3;
            case SyntaxKind.HeritageClause: return 2;
            case SyntaxKind.EqualsValueClause: return 2;
            case SyntaxKind.CaseSwitchClause: return 4;
            case SyntaxKind.DefaultSwitchClause: return 3;
            case SyntaxKind.ElseClause: return 2;
            case SyntaxKind.CatchClause: return 6;
            case SyntaxKind.FinallyClause: return 2;
            case SyntaxKind.TemplateClause: return 2;
            case SyntaxKind.TypeParameter: return 2;
            case SyntaxKind.Constraint: return 2;
            case SyntaxKind.SimplePropertyAssignment: return 3;
            case SyntaxKind.FunctionPropertyAssignment: return 3;
            case SyntaxKind.Parameter: return 6;
            case SyntaxKind.EnumElement: return 2;
            case SyntaxKind.TypeAnnotation: return 2;
            case SyntaxKind.ExternalModuleReference: return 4;
            case SyntaxKind.ModuleNameModuleReference: return 1;
            default: return 0;
        }
    }

    function sourceUnitChildAt(node: SourceUnitSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.moduleElements;
            case 1: return node.endOfFileToken;
        }
    }
    function qualifiedNameChildAt(node: QualifiedNameSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.left;
            case 1: return node.dotToken;
            case 2: return node.right;
        }
    }
    function objectTypeChildAt(node: ObjectTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openBraceToken;
            case 1: return node.typeMembers;
            case 2: return node.closeBraceToken;
        }
    }
    function functionTypeChildAt(node: FunctionTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.typeParameterList;
            case 1: return node.parameterList;
            case 2: return node.equalsGreaterThanToken;
            case 3: return node.type;
        }
    }
    function arrayTypeChildAt(node: ArrayTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.type;
            case 1: return node.openBracketToken;
            case 2: return node.closeBracketToken;
        }
    }
    function constructorTypeChildAt(node: ConstructorTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.newKeyword;
            case 1: return node.typeParameterList;
            case 2: return node.parameterList;
            case 3: return node.equalsGreaterThanToken;
            case 4: return node.type;
        }
    }
    function genericTypeChildAt(node: GenericTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.name;
            case 1: return node.typeArgumentList;
        }
    }
    function typeQueryChildAt(node: TypeQuerySyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.typeOfKeyword;
            case 1: return node.name;
        }
    }
    function tupleTypeChildAt(node: TupleTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openBracketToken;
            case 1: return node.types;
            case 2: return node.closeBracketToken;
        }
    }
    function unionTypeChildAt(node: UnionTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.left;
            case 1: return node.barToken;
            case 2: return node.right;
        }
    }
    function parenthesizedTypeChildAt(node: ParenthesizedTypeSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openParenToken;
            case 1: return node.type;
            case 2: return node.closeParenToken;
        }
    }
    function interfaceDeclarationChildAt(node: InterfaceDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.interfaceKeyword;
            case 2: return node.identifier;
            case 3: return node.typeParameterList;
            case 4: return node.heritageClauses;
            case 5: return node.body;
        }
    }
    function functionDeclarationChildAt(node: FunctionDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.functionKeyword;
            case 2: return node.identifier;
            case 3: return node.callSignature;
            case 4: return node.block;
            case 5: return node.semicolonToken;
        }
    }
    function moduleDeclarationChildAt(node: ModuleDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.moduleKeyword;
            case 2: return node.name;
            case 3: return node.stringLiteral;
            case 4: return node.openBraceToken;
            case 5: return node.moduleElements;
            case 6: return node.closeBraceToken;
        }
    }
    function classDeclarationChildAt(node: ClassDeclarationSyntax, index: number): ISyntaxElement {
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
    }
    function enumDeclarationChildAt(node: EnumDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.enumKeyword;
            case 2: return node.identifier;
            case 3: return node.openBraceToken;
            case 4: return node.enumElements;
            case 5: return node.closeBraceToken;
        }
    }
    function importDeclarationChildAt(node: ImportDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.importKeyword;
            case 2: return node.identifier;
            case 3: return node.equalsToken;
            case 4: return node.moduleReference;
            case 5: return node.semicolonToken;
        }
    }
    function exportAssignmentChildAt(node: ExportAssignmentSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.exportKeyword;
            case 1: return node.equalsToken;
            case 2: return node.identifier;
            case 3: return node.semicolonToken;
        }
    }
    function memberFunctionDeclarationChildAt(node: MemberFunctionDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.propertyName;
            case 2: return node.callSignature;
            case 3: return node.block;
            case 4: return node.semicolonToken;
        }
    }
    function memberVariableDeclarationChildAt(node: MemberVariableDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.variableDeclarator;
            case 2: return node.semicolonToken;
        }
    }
    function constructorDeclarationChildAt(node: ConstructorDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.constructorKeyword;
            case 2: return node.callSignature;
            case 3: return node.block;
            case 4: return node.semicolonToken;
        }
    }
    function indexMemberDeclarationChildAt(node: IndexMemberDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.indexSignature;
            case 2: return node.semicolonToken;
        }
    }
    function getAccessorChildAt(node: GetAccessorSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.getKeyword;
            case 2: return node.propertyName;
            case 3: return node.callSignature;
            case 4: return node.block;
        }
    }
    function setAccessorChildAt(node: SetAccessorSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.setKeyword;
            case 2: return node.propertyName;
            case 3: return node.callSignature;
            case 4: return node.block;
        }
    }
    function propertySignatureChildAt(node: PropertySignatureSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.propertyName;
            case 1: return node.questionToken;
            case 2: return node.typeAnnotation;
        }
    }
    function callSignatureChildAt(node: CallSignatureSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.typeParameterList;
            case 1: return node.parameterList;
            case 2: return node.typeAnnotation;
        }
    }
    function constructSignatureChildAt(node: ConstructSignatureSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.newKeyword;
            case 1: return node.callSignature;
        }
    }
    function indexSignatureChildAt(node: IndexSignatureSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openBracketToken;
            case 1: return node.parameters;
            case 2: return node.closeBracketToken;
            case 3: return node.typeAnnotation;
        }
    }
    function methodSignatureChildAt(node: MethodSignatureSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.propertyName;
            case 1: return node.questionToken;
            case 2: return node.callSignature;
        }
    }
    function blockChildAt(node: BlockSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openBraceToken;
            case 1: return node.statements;
            case 2: return node.closeBraceToken;
        }
    }
    function ifStatementChildAt(node: IfStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.ifKeyword;
            case 1: return node.openParenToken;
            case 2: return node.condition;
            case 3: return node.closeParenToken;
            case 4: return node.statement;
            case 5: return node.elseClause;
        }
    }
    function variableStatementChildAt(node: VariableStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.modifiers;
            case 1: return node.variableDeclaration;
            case 2: return node.semicolonToken;
        }
    }
    function expressionStatementChildAt(node: ExpressionStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.expression;
            case 1: return node.semicolonToken;
        }
    }
    function returnStatementChildAt(node: ReturnStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.returnKeyword;
            case 1: return node.expression;
            case 2: return node.semicolonToken;
        }
    }
    function switchStatementChildAt(node: SwitchStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.switchKeyword;
            case 1: return node.openParenToken;
            case 2: return node.expression;
            case 3: return node.closeParenToken;
            case 4: return node.openBraceToken;
            case 5: return node.switchClauses;
            case 6: return node.closeBraceToken;
        }
    }
    function breakStatementChildAt(node: BreakStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.breakKeyword;
            case 1: return node.identifier;
            case 2: return node.semicolonToken;
        }
    }
    function continueStatementChildAt(node: ContinueStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.continueKeyword;
            case 1: return node.identifier;
            case 2: return node.semicolonToken;
        }
    }
    function forStatementChildAt(node: ForStatementSyntax, index: number): ISyntaxElement {
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
    }
    function forInStatementChildAt(node: ForInStatementSyntax, index: number): ISyntaxElement {
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
    }
    function emptyStatementChildAt(node: EmptyStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.semicolonToken;
        }
    }
    function throwStatementChildAt(node: ThrowStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.throwKeyword;
            case 1: return node.expression;
            case 2: return node.semicolonToken;
        }
    }
    function whileStatementChildAt(node: WhileStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.whileKeyword;
            case 1: return node.openParenToken;
            case 2: return node.condition;
            case 3: return node.closeParenToken;
            case 4: return node.statement;
        }
    }
    function tryStatementChildAt(node: TryStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.tryKeyword;
            case 1: return node.block;
            case 2: return node.catchClause;
            case 3: return node.finallyClause;
        }
    }
    function labeledStatementChildAt(node: LabeledStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.identifier;
            case 1: return node.colonToken;
            case 2: return node.statement;
        }
    }
    function doStatementChildAt(node: DoStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.doKeyword;
            case 1: return node.statement;
            case 2: return node.whileKeyword;
            case 3: return node.openParenToken;
            case 4: return node.condition;
            case 5: return node.closeParenToken;
            case 6: return node.semicolonToken;
        }
    }
    function debuggerStatementChildAt(node: DebuggerStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.debuggerKeyword;
            case 1: return node.semicolonToken;
        }
    }
    function withStatementChildAt(node: WithStatementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.withKeyword;
            case 1: return node.openParenToken;
            case 2: return node.condition;
            case 3: return node.closeParenToken;
            case 4: return node.statement;
        }
    }
    function prefixUnaryExpressionChildAt(node: PrefixUnaryExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.operatorToken;
            case 1: return node.operand;
        }
    }
    function deleteExpressionChildAt(node: DeleteExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.deleteKeyword;
            case 1: return node.expression;
        }
    }
    function typeOfExpressionChildAt(node: TypeOfExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.typeOfKeyword;
            case 1: return node.expression;
        }
    }
    function voidExpressionChildAt(node: VoidExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.voidKeyword;
            case 1: return node.expression;
        }
    }
    function conditionalExpressionChildAt(node: ConditionalExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.condition;
            case 1: return node.questionToken;
            case 2: return node.whenTrue;
            case 3: return node.colonToken;
            case 4: return node.whenFalse;
        }
    }
    function binaryExpressionChildAt(node: BinaryExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.left;
            case 1: return node.operatorToken;
            case 2: return node.right;
        }
    }
    function postfixUnaryExpressionChildAt(node: PostfixUnaryExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.operand;
            case 1: return node.operatorToken;
        }
    }
    function memberAccessExpressionChildAt(node: MemberAccessExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.expression;
            case 1: return node.dotToken;
            case 2: return node.name;
        }
    }
    function invocationExpressionChildAt(node: InvocationExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.expression;
            case 1: return node.argumentList;
        }
    }
    function arrayLiteralExpressionChildAt(node: ArrayLiteralExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openBracketToken;
            case 1: return node.expressions;
            case 2: return node.closeBracketToken;
        }
    }
    function objectLiteralExpressionChildAt(node: ObjectLiteralExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openBraceToken;
            case 1: return node.propertyAssignments;
            case 2: return node.closeBraceToken;
        }
    }
    function objectCreationExpressionChildAt(node: ObjectCreationExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.newKeyword;
            case 1: return node.expression;
            case 2: return node.argumentList;
        }
    }
    function parenthesizedExpressionChildAt(node: ParenthesizedExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openParenToken;
            case 1: return node.expression;
            case 2: return node.closeParenToken;
        }
    }
    function parenthesizedArrowFunctionExpressionChildAt(node: ParenthesizedArrowFunctionExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.callSignature;
            case 1: return node.equalsGreaterThanToken;
            case 2: return node.block;
            case 3: return node.expression;
        }
    }
    function simpleArrowFunctionExpressionChildAt(node: SimpleArrowFunctionExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.parameter;
            case 1: return node.equalsGreaterThanToken;
            case 2: return node.block;
            case 3: return node.expression;
        }
    }
    function castExpressionChildAt(node: CastExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.lessThanToken;
            case 1: return node.type;
            case 2: return node.greaterThanToken;
            case 3: return node.expression;
        }
    }
    function elementAccessExpressionChildAt(node: ElementAccessExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.expression;
            case 1: return node.openBracketToken;
            case 2: return node.argumentExpression;
            case 3: return node.closeBracketToken;
        }
    }
    function functionExpressionChildAt(node: FunctionExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.functionKeyword;
            case 1: return node.identifier;
            case 2: return node.callSignature;
            case 3: return node.block;
        }
    }
    function omittedExpressionChildAt(node: OmittedExpressionSyntax, index: number): ISyntaxElement {
        throw Errors.invalidOperation();
    }
    function templateExpressionChildAt(node: TemplateExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.templateStartToken;
            case 1: return node.templateClauses;
        }
    }
    function templateAccessExpressionChildAt(node: TemplateAccessExpressionSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.expression;
            case 1: return node.templateExpression;
        }
    }
    function variableDeclarationChildAt(node: VariableDeclarationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.varKeyword;
            case 1: return node.variableDeclarators;
        }
    }
    function variableDeclaratorChildAt(node: VariableDeclaratorSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.propertyName;
            case 1: return node.typeAnnotation;
            case 2: return node.equalsValueClause;
        }
    }
    function argumentListChildAt(node: ArgumentListSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.typeArgumentList;
            case 1: return node.openParenToken;
            case 2: return node.arguments;
            case 3: return node.closeParenToken;
        }
    }
    function parameterListChildAt(node: ParameterListSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.openParenToken;
            case 1: return node.parameters;
            case 2: return node.closeParenToken;
        }
    }
    function typeArgumentListChildAt(node: TypeArgumentListSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.lessThanToken;
            case 1: return node.typeArguments;
            case 2: return node.greaterThanToken;
        }
    }
    function typeParameterListChildAt(node: TypeParameterListSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.lessThanToken;
            case 1: return node.typeParameters;
            case 2: return node.greaterThanToken;
        }
    }
    function heritageClauseChildAt(node: HeritageClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.extendsOrImplementsKeyword;
            case 1: return node.typeNames;
        }
    }
    function equalsValueClauseChildAt(node: EqualsValueClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.equalsToken;
            case 1: return node.value;
        }
    }
    function caseSwitchClauseChildAt(node: CaseSwitchClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.caseKeyword;
            case 1: return node.expression;
            case 2: return node.colonToken;
            case 3: return node.statements;
        }
    }
    function defaultSwitchClauseChildAt(node: DefaultSwitchClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.defaultKeyword;
            case 1: return node.colonToken;
            case 2: return node.statements;
        }
    }
    function elseClauseChildAt(node: ElseClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.elseKeyword;
            case 1: return node.statement;
        }
    }
    function catchClauseChildAt(node: CatchClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.catchKeyword;
            case 1: return node.openParenToken;
            case 2: return node.identifier;
            case 3: return node.typeAnnotation;
            case 4: return node.closeParenToken;
            case 5: return node.block;
        }
    }
    function finallyClauseChildAt(node: FinallyClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.finallyKeyword;
            case 1: return node.block;
        }
    }
    function templateClauseChildAt(node: TemplateClauseSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.expression;
            case 1: return node.templateMiddleOrEndToken;
        }
    }
    function typeParameterChildAt(node: TypeParameterSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.identifier;
            case 1: return node.constraint;
        }
    }
    function constraintChildAt(node: ConstraintSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.extendsKeyword;
            case 1: return node.typeOrExpression;
        }
    }
    function simplePropertyAssignmentChildAt(node: SimplePropertyAssignmentSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.propertyName;
            case 1: return node.colonToken;
            case 2: return node.expression;
        }
    }
    function functionPropertyAssignmentChildAt(node: FunctionPropertyAssignmentSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.propertyName;
            case 1: return node.callSignature;
            case 2: return node.block;
        }
    }
    function parameterChildAt(node: ParameterSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.dotDotDotToken;
            case 1: return node.modifiers;
            case 2: return node.identifier;
            case 3: return node.questionToken;
            case 4: return node.typeAnnotation;
            case 5: return node.equalsValueClause;
        }
    }
    function enumElementChildAt(node: EnumElementSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.propertyName;
            case 1: return node.equalsValueClause;
        }
    }
    function typeAnnotationChildAt(node: TypeAnnotationSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.colonToken;
            case 1: return node.type;
        }
    }
    function externalModuleReferenceChildAt(node: ExternalModuleReferenceSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.requireKeyword;
            case 1: return node.openParenToken;
            case 2: return node.stringLiteral;
            case 3: return node.closeParenToken;
        }
    }
    function moduleNameModuleReferenceChildAt(node: ModuleNameModuleReferenceSyntax, index: number): ISyntaxElement {
        switch (index) {
            case 0: return node.moduleName;
        }
    }
    export function childAt(element: ISyntaxElement, index: number): ISyntaxElement {
        if (isList(element)) { return (<ISyntaxNodeOrToken[]>element)[index]; }
        switch (element.kind()) {
            case SyntaxKind.SourceUnit: return sourceUnitChildAt(<SourceUnitSyntax>element, index);
            case SyntaxKind.QualifiedName: return qualifiedNameChildAt(<QualifiedNameSyntax>element, index);
            case SyntaxKind.ObjectType: return objectTypeChildAt(<ObjectTypeSyntax>element, index);
            case SyntaxKind.FunctionType: return functionTypeChildAt(<FunctionTypeSyntax>element, index);
            case SyntaxKind.ArrayType: return arrayTypeChildAt(<ArrayTypeSyntax>element, index);
            case SyntaxKind.ConstructorType: return constructorTypeChildAt(<ConstructorTypeSyntax>element, index);
            case SyntaxKind.GenericType: return genericTypeChildAt(<GenericTypeSyntax>element, index);
            case SyntaxKind.TypeQuery: return typeQueryChildAt(<TypeQuerySyntax>element, index);
            case SyntaxKind.TupleType: return tupleTypeChildAt(<TupleTypeSyntax>element, index);
            case SyntaxKind.UnionType: return unionTypeChildAt(<UnionTypeSyntax>element, index);
            case SyntaxKind.ParenthesizedType: return parenthesizedTypeChildAt(<ParenthesizedTypeSyntax>element, index);
            case SyntaxKind.InterfaceDeclaration: return interfaceDeclarationChildAt(<InterfaceDeclarationSyntax>element, index);
            case SyntaxKind.FunctionDeclaration: return functionDeclarationChildAt(<FunctionDeclarationSyntax>element, index);
            case SyntaxKind.ModuleDeclaration: return moduleDeclarationChildAt(<ModuleDeclarationSyntax>element, index);
            case SyntaxKind.ClassDeclaration: return classDeclarationChildAt(<ClassDeclarationSyntax>element, index);
            case SyntaxKind.EnumDeclaration: return enumDeclarationChildAt(<EnumDeclarationSyntax>element, index);
            case SyntaxKind.ImportDeclaration: return importDeclarationChildAt(<ImportDeclarationSyntax>element, index);
            case SyntaxKind.ExportAssignment: return exportAssignmentChildAt(<ExportAssignmentSyntax>element, index);
            case SyntaxKind.MemberFunctionDeclaration: return memberFunctionDeclarationChildAt(<MemberFunctionDeclarationSyntax>element, index);
            case SyntaxKind.MemberVariableDeclaration: return memberVariableDeclarationChildAt(<MemberVariableDeclarationSyntax>element, index);
            case SyntaxKind.ConstructorDeclaration: return constructorDeclarationChildAt(<ConstructorDeclarationSyntax>element, index);
            case SyntaxKind.IndexMemberDeclaration: return indexMemberDeclarationChildAt(<IndexMemberDeclarationSyntax>element, index);
            case SyntaxKind.GetAccessor: return getAccessorChildAt(<GetAccessorSyntax>element, index);
            case SyntaxKind.SetAccessor: return setAccessorChildAt(<SetAccessorSyntax>element, index);
            case SyntaxKind.PropertySignature: return propertySignatureChildAt(<PropertySignatureSyntax>element, index);
            case SyntaxKind.CallSignature: return callSignatureChildAt(<CallSignatureSyntax>element, index);
            case SyntaxKind.ConstructSignature: return constructSignatureChildAt(<ConstructSignatureSyntax>element, index);
            case SyntaxKind.IndexSignature: return indexSignatureChildAt(<IndexSignatureSyntax>element, index);
            case SyntaxKind.MethodSignature: return methodSignatureChildAt(<MethodSignatureSyntax>element, index);
            case SyntaxKind.Block: return blockChildAt(<BlockSyntax>element, index);
            case SyntaxKind.IfStatement: return ifStatementChildAt(<IfStatementSyntax>element, index);
            case SyntaxKind.VariableStatement: return variableStatementChildAt(<VariableStatementSyntax>element, index);
            case SyntaxKind.ExpressionStatement: return expressionStatementChildAt(<ExpressionStatementSyntax>element, index);
            case SyntaxKind.ReturnStatement: return returnStatementChildAt(<ReturnStatementSyntax>element, index);
            case SyntaxKind.SwitchStatement: return switchStatementChildAt(<SwitchStatementSyntax>element, index);
            case SyntaxKind.BreakStatement: return breakStatementChildAt(<BreakStatementSyntax>element, index);
            case SyntaxKind.ContinueStatement: return continueStatementChildAt(<ContinueStatementSyntax>element, index);
            case SyntaxKind.ForStatement: return forStatementChildAt(<ForStatementSyntax>element, index);
            case SyntaxKind.ForInStatement: return forInStatementChildAt(<ForInStatementSyntax>element, index);
            case SyntaxKind.EmptyStatement: return emptyStatementChildAt(<EmptyStatementSyntax>element, index);
            case SyntaxKind.ThrowStatement: return throwStatementChildAt(<ThrowStatementSyntax>element, index);
            case SyntaxKind.WhileStatement: return whileStatementChildAt(<WhileStatementSyntax>element, index);
            case SyntaxKind.TryStatement: return tryStatementChildAt(<TryStatementSyntax>element, index);
            case SyntaxKind.LabeledStatement: return labeledStatementChildAt(<LabeledStatementSyntax>element, index);
            case SyntaxKind.DoStatement: return doStatementChildAt(<DoStatementSyntax>element, index);
            case SyntaxKind.DebuggerStatement: return debuggerStatementChildAt(<DebuggerStatementSyntax>element, index);
            case SyntaxKind.WithStatement: return withStatementChildAt(<WithStatementSyntax>element, index);
            case SyntaxKind.PrefixUnaryExpression: return prefixUnaryExpressionChildAt(<PrefixUnaryExpressionSyntax>element, index);
            case SyntaxKind.DeleteExpression: return deleteExpressionChildAt(<DeleteExpressionSyntax>element, index);
            case SyntaxKind.TypeOfExpression: return typeOfExpressionChildAt(<TypeOfExpressionSyntax>element, index);
            case SyntaxKind.VoidExpression: return voidExpressionChildAt(<VoidExpressionSyntax>element, index);
            case SyntaxKind.ConditionalExpression: return conditionalExpressionChildAt(<ConditionalExpressionSyntax>element, index);
            case SyntaxKind.BinaryExpression: return binaryExpressionChildAt(<BinaryExpressionSyntax>element, index);
            case SyntaxKind.PostfixUnaryExpression: return postfixUnaryExpressionChildAt(<PostfixUnaryExpressionSyntax>element, index);
            case SyntaxKind.MemberAccessExpression: return memberAccessExpressionChildAt(<MemberAccessExpressionSyntax>element, index);
            case SyntaxKind.InvocationExpression: return invocationExpressionChildAt(<InvocationExpressionSyntax>element, index);
            case SyntaxKind.ArrayLiteralExpression: return arrayLiteralExpressionChildAt(<ArrayLiteralExpressionSyntax>element, index);
            case SyntaxKind.ObjectLiteralExpression: return objectLiteralExpressionChildAt(<ObjectLiteralExpressionSyntax>element, index);
            case SyntaxKind.ObjectCreationExpression: return objectCreationExpressionChildAt(<ObjectCreationExpressionSyntax>element, index);
            case SyntaxKind.ParenthesizedExpression: return parenthesizedExpressionChildAt(<ParenthesizedExpressionSyntax>element, index);
            case SyntaxKind.ParenthesizedArrowFunctionExpression: return parenthesizedArrowFunctionExpressionChildAt(<ParenthesizedArrowFunctionExpressionSyntax>element, index);
            case SyntaxKind.SimpleArrowFunctionExpression: return simpleArrowFunctionExpressionChildAt(<SimpleArrowFunctionExpressionSyntax>element, index);
            case SyntaxKind.CastExpression: return castExpressionChildAt(<CastExpressionSyntax>element, index);
            case SyntaxKind.ElementAccessExpression: return elementAccessExpressionChildAt(<ElementAccessExpressionSyntax>element, index);
            case SyntaxKind.FunctionExpression: return functionExpressionChildAt(<FunctionExpressionSyntax>element, index);
            case SyntaxKind.OmittedExpression: return omittedExpressionChildAt(<OmittedExpressionSyntax>element, index);
            case SyntaxKind.TemplateExpression: return templateExpressionChildAt(<TemplateExpressionSyntax>element, index);
            case SyntaxKind.TemplateAccessExpression: return templateAccessExpressionChildAt(<TemplateAccessExpressionSyntax>element, index);
            case SyntaxKind.VariableDeclaration: return variableDeclarationChildAt(<VariableDeclarationSyntax>element, index);
            case SyntaxKind.VariableDeclarator: return variableDeclaratorChildAt(<VariableDeclaratorSyntax>element, index);
            case SyntaxKind.ArgumentList: return argumentListChildAt(<ArgumentListSyntax>element, index);
            case SyntaxKind.ParameterList: return parameterListChildAt(<ParameterListSyntax>element, index);
            case SyntaxKind.TypeArgumentList: return typeArgumentListChildAt(<TypeArgumentListSyntax>element, index);
            case SyntaxKind.TypeParameterList: return typeParameterListChildAt(<TypeParameterListSyntax>element, index);
            case SyntaxKind.HeritageClause: return heritageClauseChildAt(<HeritageClauseSyntax>element, index);
            case SyntaxKind.EqualsValueClause: return equalsValueClauseChildAt(<EqualsValueClauseSyntax>element, index);
            case SyntaxKind.CaseSwitchClause: return caseSwitchClauseChildAt(<CaseSwitchClauseSyntax>element, index);
            case SyntaxKind.DefaultSwitchClause: return defaultSwitchClauseChildAt(<DefaultSwitchClauseSyntax>element, index);
            case SyntaxKind.ElseClause: return elseClauseChildAt(<ElseClauseSyntax>element, index);
            case SyntaxKind.CatchClause: return catchClauseChildAt(<CatchClauseSyntax>element, index);
            case SyntaxKind.FinallyClause: return finallyClauseChildAt(<FinallyClauseSyntax>element, index);
            case SyntaxKind.TemplateClause: return templateClauseChildAt(<TemplateClauseSyntax>element, index);
            case SyntaxKind.TypeParameter: return typeParameterChildAt(<TypeParameterSyntax>element, index);
            case SyntaxKind.Constraint: return constraintChildAt(<ConstraintSyntax>element, index);
            case SyntaxKind.SimplePropertyAssignment: return simplePropertyAssignmentChildAt(<SimplePropertyAssignmentSyntax>element, index);
            case SyntaxKind.FunctionPropertyAssignment: return functionPropertyAssignmentChildAt(<FunctionPropertyAssignmentSyntax>element, index);
            case SyntaxKind.Parameter: return parameterChildAt(<ParameterSyntax>element, index);
            case SyntaxKind.EnumElement: return enumElementChildAt(<EnumElementSyntax>element, index);
            case SyntaxKind.TypeAnnotation: return typeAnnotationChildAt(<TypeAnnotationSyntax>element, index);
            case SyntaxKind.ExternalModuleReference: return externalModuleReferenceChildAt(<ExternalModuleReferenceSyntax>element, index);
            case SyntaxKind.ModuleNameModuleReference: return moduleNameModuleReferenceChildAt(<ModuleNameModuleReferenceSyntax>element, index);
        }
    }
}