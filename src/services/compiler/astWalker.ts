//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='references.ts' />

module TypeScript {
    function walkListChildren(preAst: ISyntaxNodeOrToken[], walker: AstWalker): void {
        for (var i = 0, n = preAst.length; i < n; i++) {
            walker.walk(preAst[i]);
        }
    }

    function walkThrowStatementChildren(preAst: ThrowStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkPrefixUnaryExpressionChildren(preAst: PrefixUnaryExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.operand);
    }

    function walkPostfixUnaryExpressionChildren(preAst: PostfixUnaryExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.operand);
    }

    function walkDeleteExpressionChildren(preAst: DeleteExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkTypeArgumentListChildren(preAst: TypeArgumentListSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeArguments);
    }

    function walkTypeOfExpressionChildren(preAst: TypeOfExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkVoidExpressionChildren(preAst: VoidExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkArgumentListChildren(preAst: ArgumentListSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeArgumentList);
        walker.walk(preAst.arguments);
    }

    function walkArrayLiteralExpressionChildren(preAst: ArrayLiteralExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expressions);
    }

    function walkSimplePropertyAssignmentChildren(preAst: SimplePropertyAssignmentSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.expression);
    }

    function walkFunctionPropertyAssignmentChildren(preAst: FunctionPropertyAssignmentSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkGetAccessorChildren(preAst: GetAccessorSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkSeparatedListChildren(preAst: ISyntaxNodeOrToken[], walker: AstWalker): void {
        for (var i = 0, n = preAst.length; i < n; i++) {
            walker.walk(preAst[i]);
        }
    }

    function walkSetAccessorChildren(preAst: SetAccessorSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkObjectLiteralExpressionChildren(preAst: ObjectLiteralExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyAssignments);
    }

    function walkCastExpressionChildren(preAst: CastExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.type);
        walker.walk(preAst.expression);
    }

    function walkParenthesizedExpressionChildren(preAst: ParenthesizedExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkElementAccessExpressionChildren(preAst: ElementAccessExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.argumentExpression);
    }

    function walkMemberAccessExpressionChildren(preAst: MemberAccessExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.name);
    }

    function walkQualifiedNameChildren(preAst: QualifiedNameSyntax, walker: AstWalker): void {
        walker.walk(preAst.left);
        walker.walk(preAst.right);
    }

    function walkBinaryExpressionChildren(preAst: BinaryExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.left);
        walker.walk(preAst.right);
    }

    function walkEqualsValueClauseChildren(preAst: EqualsValueClauseSyntax, walker: AstWalker): void {
        walker.walk(preAst.value);
    }

    function walkTypeParameterChildren(preAst: TypeParameterSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.constraint);
    }

    function walkTypeParameterListChildren(preAst: TypeParameterListSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeParameters);
    }

    function walkGenericTypeChildren(preAst: GenericTypeSyntax, walker: AstWalker): void {
        walker.walk(preAst.name);
        walker.walk(preAst.typeArgumentList);
    }

    function walkTypeAnnotationChildren(preAst: TypeAnnotationSyntax, walker: AstWalker): void {
        walker.walk(preAst.type);
    }

    function walkTypeQueryChildren(preAst: TypeQuerySyntax, walker: AstWalker): void {
        walker.walk(preAst.name);
    }

    function walkInvocationExpressionChildren(preAst: InvocationExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.argumentList);
    }

    function walkObjectCreationExpressionChildren(preAst: ObjectCreationExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.argumentList);
    }

    function walkTrinaryExpressionChildren(preAst: ConditionalExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.whenTrue);
        walker.walk(preAst.whenFalse);
    }

    function walkFunctionExpressionChildren(preAst: FunctionExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkFunctionTypeChildren(preAst: FunctionTypeSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.type);
    }

    function walkParenthesizedArrowFunctionExpressionChildren(preAst: ParenthesizedArrowFunctionExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
        walker.walk(preAst.expression);
    }

    function walkSimpleArrowFunctionExpressionChildren(preAst: SimpleArrowFunctionExpressionSyntax, walker: AstWalker): void {
        walker.walk(preAst.parameter);
        walker.walk(preAst.block);
        walker.walk(preAst.expression);
    }

    function walkMemberFunctionDeclarationChildren(preAst: MemberFunctionDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkFuncDeclChildren(preAst: FunctionDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkIndexMemberDeclarationChildren(preAst: IndexMemberDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.indexSignature);
    }

    function walkIndexSignatureChildren(preAst: IndexSignatureSyntax, walker: AstWalker): void {
        walker.walk(preAst.parameters);
        walker.walk(preAst.typeAnnotation);
    }

    function walkCallSignatureChildren(preAst: CallSignatureSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.typeAnnotation);
    }

    function walkConstraintChildren(preAst: ConstraintSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeOrExpression);
    }

    function walkConstructorDeclarationChildren(preAst: ConstructorDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkConstructorTypeChildren(preAst: FunctionTypeSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.type);
    }

    function walkConstructSignatureChildren(preAst: ConstructSignatureSyntax, walker: AstWalker): void {
        walker.walk(preAst.callSignature);
    }

    function walkParameterChildren(preAst: ParameterSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeAnnotation);
        walker.walk(preAst.equalsValueClause);
    }

    function walkParameterListChildren(preAst: ParameterListSyntax, walker: AstWalker): void {
        walker.walk(preAst.parameters);
    }

    function walkPropertySignatureChildren(preAst: PropertySignatureSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.typeAnnotation);
    }

    function walkVariableDeclaratorChildren(preAst: VariableDeclaratorSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.typeAnnotation);
        walker.walk(preAst.equalsValueClause);
    }

    function walkMemberVariableDeclarationChildren(preAst: MemberVariableDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.variableDeclarator);
    }

    function walkMethodSignatureChildren(preAst: MethodSignatureSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
    }

    function walkReturnStatementChildren(preAst: ReturnStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkForStatementChildren(preAst: ForStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.variableDeclaration);
        walker.walk(preAst.initializer);
        walker.walk(preAst.condition);
        walker.walk(preAst.incrementor);
        walker.walk(preAst.statement);
    }

    function walkForInStatementChildren(preAst: ForInStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.variableDeclaration);
        walker.walk(preAst.left);
        walker.walk(preAst.expression);
        walker.walk(preAst.statement);
    }

    function walkIfStatementChildren(preAst: IfStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
        walker.walk(preAst.elseClause);
    }

    function walkElseClauseChildren(preAst: ElseClauseSyntax, walker: AstWalker): void {
        walker.walk(preAst.statement);
    }

    function walkWhileStatementChildren(preAst: WhileStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
    }

    function walkDoStatementChildren(preAst: DoStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
    }

    function walkBlockChildren(preAst: BlockSyntax, walker: AstWalker): void {
        walker.walk(preAst.statements);
    }

    function walkVariableDeclarationChildren(preAst: VariableDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.variableDeclarators);
    }

    function walkCaseSwitchClauseChildren(preAst: CaseSwitchClauseSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.statements);
    }

    function walkDefaultSwitchClauseChildren(preAst: DefaultSwitchClauseSyntax, walker: AstWalker): void {
        walker.walk(preAst.statements);
    }

    function walkSwitchStatementChildren(preAst: SwitchStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.switchClauses);
    }

    function walkTryStatementChildren(preAst: TryStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.block);
        walker.walk(preAst.catchClause);
        walker.walk(preAst.finallyClause);
    }

    function walkCatchClauseChildren(preAst: CatchClauseSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeAnnotation);
        walker.walk(preAst.block);
    }

    function walkExternalModuleReferenceChildren(preAst: ExternalModuleReferenceSyntax, walker: AstWalker): void {
        walker.walk(preAst.stringLiteral);
    }

    function walkFinallyClauseChildren(preAst: FinallyClauseSyntax, walker: AstWalker): void {
        walker.walk(preAst.block);
    }

    function walkClassDeclChildren(preAst: ClassDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.heritageClauses);
        walker.walk(preAst.classElements);
    }

    function walkScriptChildren(preAst: SourceUnitSyntax, walker: AstWalker): void {
        walker.walk(preAst.moduleElements);
    }

    function walkHeritageClauseChildren(preAst: HeritageClauseSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeNames);
    }

    function walkInterfaceDeclerationChildren(preAst: InterfaceDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.heritageClauses);
        walker.walk(preAst.body);
    }

    function walkObjectTypeChildren(preAst: ObjectTypeSyntax, walker: AstWalker): void {
        walker.walk(preAst.typeMembers);
    }

    function walkArrayTypeChildren(preAst: ArrayTypeSyntax, walker: AstWalker): void {
        walker.walk(preAst.type);
    }

    function walkModuleDeclarationChildren(preAst: ModuleDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.name);
        walker.walk(preAst.stringLiteral);
        walker.walk(preAst.moduleElements);
    }

    function walkModuleNameModuleReferenceChildren(preAst: ModuleNameModuleReferenceSyntax, walker: AstWalker): void {
        walker.walk(preAst.moduleName);
    }

    function walkEnumDeclarationChildren(preAst: EnumDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.enumElements);
    }

    function walkEnumElementChildren(preAst: EnumElementSyntax, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.equalsValueClause);
    }

    function walkImportDeclarationChildren(preAst: ImportDeclarationSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.moduleReference);
    }

    function walkExportAssignmentChildren(preAst: ExportAssignmentSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
    }

    function walkWithStatementChildren(preAst: WithStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
    }

    function walkExpressionStatementChildren(preAst: ExpressionStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkLabeledStatementChildren(preAst: LabeledStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.statement);
    }

    function walkVariableStatementChildren(preAst: VariableStatementSyntax, walker: AstWalker): void {
        walker.walk(preAst.variableDeclaration);
    }

    var childrenWalkers: IAstWalkChildren[] = new Array<IAstWalkChildren>(SyntaxKind.LastNode + 1);

    // Tokens/trivia can't ever be walked into. 
    for (var i = SyntaxKind.FirstToken, n = SyntaxKind.LastToken; i <= n; i++) {
        childrenWalkers[i] = null;
    }
    for (var i = SyntaxKind.FirstTrivia, n = SyntaxKind.LastTrivia; i <= n; i++) {
        childrenWalkers[i] = null;
    }

    childrenWalkers[SyntaxKind.AddAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.AddExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.AndAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.AnyKeyword] = null;
    childrenWalkers[SyntaxKind.ArgumentList] = walkArgumentListChildren;
    childrenWalkers[SyntaxKind.ArrayLiteralExpression] = walkArrayLiteralExpressionChildren;
    childrenWalkers[SyntaxKind.ArrayType] = walkArrayTypeChildren;
    childrenWalkers[SyntaxKind.SimpleArrowFunctionExpression] = walkSimpleArrowFunctionExpressionChildren;
    childrenWalkers[SyntaxKind.ParenthesizedArrowFunctionExpression] = walkParenthesizedArrowFunctionExpressionChildren;
    childrenWalkers[SyntaxKind.AssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.BitwiseAndExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.BitwiseExclusiveOrExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.BitwiseNotExpression] = walkPrefixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.BitwiseOrExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.Block] = walkBlockChildren;
    childrenWalkers[SyntaxKind.BooleanKeyword] = null;
    childrenWalkers[SyntaxKind.BreakStatement] = null;
    childrenWalkers[SyntaxKind.CallSignature] = walkCallSignatureChildren;
    childrenWalkers[SyntaxKind.CaseSwitchClause] = walkCaseSwitchClauseChildren;
    childrenWalkers[SyntaxKind.CastExpression] = walkCastExpressionChildren;
    childrenWalkers[SyntaxKind.CatchClause] = walkCatchClauseChildren;
    childrenWalkers[SyntaxKind.ClassDeclaration] = walkClassDeclChildren;
    childrenWalkers[SyntaxKind.CommaExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.ConditionalExpression] = walkTrinaryExpressionChildren;
    childrenWalkers[SyntaxKind.Constraint] = walkConstraintChildren;
    childrenWalkers[SyntaxKind.ConstructorDeclaration] = walkConstructorDeclarationChildren;
    childrenWalkers[SyntaxKind.ConstructSignature] = walkConstructSignatureChildren;
    childrenWalkers[SyntaxKind.ContinueStatement] = null;
    childrenWalkers[SyntaxKind.ConstructorType] = walkConstructorTypeChildren;
    childrenWalkers[SyntaxKind.DebuggerStatement] = null;
    childrenWalkers[SyntaxKind.DefaultSwitchClause] = walkDefaultSwitchClauseChildren;
    childrenWalkers[SyntaxKind.DeleteExpression] = walkDeleteExpressionChildren;
    childrenWalkers[SyntaxKind.DivideAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.DivideExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.DoStatement] = walkDoStatementChildren;
    childrenWalkers[SyntaxKind.ElementAccessExpression] = walkElementAccessExpressionChildren;
    childrenWalkers[SyntaxKind.ElseClause] = walkElseClauseChildren;
    childrenWalkers[SyntaxKind.EmptyStatement] = null;
    childrenWalkers[SyntaxKind.EnumDeclaration] = walkEnumDeclarationChildren;
    childrenWalkers[SyntaxKind.EnumElement] = walkEnumElementChildren;
    childrenWalkers[SyntaxKind.EqualsExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.EqualsValueClause] = walkEqualsValueClauseChildren;
    childrenWalkers[SyntaxKind.EqualsWithTypeConversionExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.ExclusiveOrAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.ExportAssignment] = walkExportAssignmentChildren;
    childrenWalkers[SyntaxKind.ExpressionStatement] = walkExpressionStatementChildren;
    childrenWalkers[SyntaxKind.ExtendsHeritageClause] = walkHeritageClauseChildren;
    childrenWalkers[SyntaxKind.ExternalModuleReference] = walkExternalModuleReferenceChildren;
    childrenWalkers[SyntaxKind.FalseKeyword] = null;
    childrenWalkers[SyntaxKind.FinallyClause] = walkFinallyClauseChildren;
    childrenWalkers[SyntaxKind.ForInStatement] = walkForInStatementChildren;
    childrenWalkers[SyntaxKind.ForStatement] = walkForStatementChildren;
    childrenWalkers[SyntaxKind.FunctionDeclaration] = walkFuncDeclChildren;
    childrenWalkers[SyntaxKind.FunctionExpression] = walkFunctionExpressionChildren;
    childrenWalkers[SyntaxKind.FunctionPropertyAssignment] = walkFunctionPropertyAssignmentChildren;
    childrenWalkers[SyntaxKind.FunctionType] = walkFunctionTypeChildren;
    childrenWalkers[SyntaxKind.GenericType] = walkGenericTypeChildren;
    childrenWalkers[SyntaxKind.GetAccessor] = walkGetAccessorChildren;
    childrenWalkers[SyntaxKind.GreaterThanExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.GreaterThanOrEqualExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.IfStatement] = walkIfStatementChildren;
    childrenWalkers[SyntaxKind.ImplementsHeritageClause] = walkHeritageClauseChildren;
    childrenWalkers[SyntaxKind.ImportDeclaration] = walkImportDeclarationChildren;
    childrenWalkers[SyntaxKind.IndexMemberDeclaration] = walkIndexMemberDeclarationChildren;
    childrenWalkers[SyntaxKind.IndexSignature] = walkIndexSignatureChildren;
    childrenWalkers[SyntaxKind.InExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.InstanceOfExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.InterfaceDeclaration] = walkInterfaceDeclerationChildren;
    childrenWalkers[SyntaxKind.InvocationExpression] = walkInvocationExpressionChildren;
    childrenWalkers[SyntaxKind.LabeledStatement] = walkLabeledStatementChildren;
    childrenWalkers[SyntaxKind.LeftShiftAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.LeftShiftExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.LessThanExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.LessThanOrEqualExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.List] = walkListChildren;
    childrenWalkers[SyntaxKind.LogicalAndExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.LogicalNotExpression] = walkPrefixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.LogicalOrExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.MemberAccessExpression] = walkMemberAccessExpressionChildren;
    childrenWalkers[SyntaxKind.MemberFunctionDeclaration] = walkMemberFunctionDeclarationChildren;
    childrenWalkers[SyntaxKind.MemberVariableDeclaration] = walkMemberVariableDeclarationChildren;
    childrenWalkers[SyntaxKind.MethodSignature] = walkMethodSignatureChildren;
    childrenWalkers[SyntaxKind.ModuleDeclaration] = walkModuleDeclarationChildren;
    childrenWalkers[SyntaxKind.ModuleNameModuleReference] = walkModuleNameModuleReferenceChildren;
    childrenWalkers[SyntaxKind.ModuloAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.ModuloExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.MultiplyAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.MultiplyExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.IdentifierName] = null;
    childrenWalkers[SyntaxKind.NegateExpression] = walkPrefixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.None] = null;
    childrenWalkers[SyntaxKind.NotEqualsExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.NotEqualsWithTypeConversionExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.NullKeyword] = null;
    childrenWalkers[SyntaxKind.NumberKeyword] = null;
    childrenWalkers[SyntaxKind.NumericLiteral] = null;
    childrenWalkers[SyntaxKind.ObjectCreationExpression] = walkObjectCreationExpressionChildren;
    childrenWalkers[SyntaxKind.ObjectLiteralExpression] = walkObjectLiteralExpressionChildren;
    childrenWalkers[SyntaxKind.ObjectType] = walkObjectTypeChildren;
    childrenWalkers[SyntaxKind.OmittedExpression] = null;
    childrenWalkers[SyntaxKind.OrAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.Parameter] = walkParameterChildren;
    childrenWalkers[SyntaxKind.ParameterList] = walkParameterListChildren;
    childrenWalkers[SyntaxKind.ParenthesizedExpression] = walkParenthesizedExpressionChildren;
    childrenWalkers[SyntaxKind.PlusExpression] = walkPrefixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.PostDecrementExpression] = walkPostfixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.PostIncrementExpression] = walkPostfixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.PreDecrementExpression] = walkPrefixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.PreIncrementExpression] = walkPrefixUnaryExpressionChildren;
    childrenWalkers[SyntaxKind.PropertySignature] = walkPropertySignatureChildren;
    childrenWalkers[SyntaxKind.QualifiedName] = walkQualifiedNameChildren;
    childrenWalkers[SyntaxKind.RegularExpressionLiteral] = null;
    childrenWalkers[SyntaxKind.ReturnStatement] = walkReturnStatementChildren;
    childrenWalkers[SyntaxKind.SourceUnit] = walkScriptChildren;
    childrenWalkers[SyntaxKind.SeparatedList] = walkSeparatedListChildren;
    childrenWalkers[SyntaxKind.SetAccessor] = walkSetAccessorChildren;
    childrenWalkers[SyntaxKind.SignedRightShiftAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.SignedRightShiftExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.SimplePropertyAssignment] = walkSimplePropertyAssignmentChildren;
    childrenWalkers[SyntaxKind.StringLiteral] = null;
    childrenWalkers[SyntaxKind.StringKeyword] = null;
    childrenWalkers[SyntaxKind.SubtractAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.SubtractExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.SuperKeyword] = null;
    childrenWalkers[SyntaxKind.SwitchStatement] = walkSwitchStatementChildren;
    childrenWalkers[SyntaxKind.ThisKeyword] = null;
    childrenWalkers[SyntaxKind.ThrowStatement] = walkThrowStatementChildren;
    childrenWalkers[SyntaxKind.TriviaList] = null;
    childrenWalkers[SyntaxKind.TrueKeyword] = null;
    childrenWalkers[SyntaxKind.TryStatement] = walkTryStatementChildren;
    childrenWalkers[SyntaxKind.TypeAnnotation] = walkTypeAnnotationChildren;
    childrenWalkers[SyntaxKind.TypeArgumentList] = walkTypeArgumentListChildren;
    childrenWalkers[SyntaxKind.TypeOfExpression] = walkTypeOfExpressionChildren;
    childrenWalkers[SyntaxKind.TypeParameter] = walkTypeParameterChildren;
    childrenWalkers[SyntaxKind.TypeParameterList] = walkTypeParameterListChildren;
    childrenWalkers[SyntaxKind.TypeQuery] = walkTypeQueryChildren;
    childrenWalkers[SyntaxKind.UnsignedRightShiftAssignmentExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.UnsignedRightShiftExpression] = walkBinaryExpressionChildren;
    childrenWalkers[SyntaxKind.VariableDeclaration] = walkVariableDeclarationChildren;
    childrenWalkers[SyntaxKind.VariableDeclarator] = walkVariableDeclaratorChildren;
    childrenWalkers[SyntaxKind.VariableStatement] = walkVariableStatementChildren;
    childrenWalkers[SyntaxKind.VoidExpression] = walkVoidExpressionChildren;
    childrenWalkers[SyntaxKind.VoidKeyword] = null;
    childrenWalkers[SyntaxKind.WhileStatement] = walkWhileStatementChildren;
    childrenWalkers[SyntaxKind.WithStatement] = walkWithStatementChildren;

    // Verify the code is up to date with the enum
    for (var e in SyntaxKind) {
        if (SyntaxKind.hasOwnProperty(e) && StringUtilities.isString(SyntaxKind[e])) {
            TypeScript.Debug.assert(childrenWalkers[e] !== undefined, "Fix initWalkers: " + SyntaxKind[e]);
        }
    }

    export class AstWalkOptions {
        public goChildren = true;
        public stopWalking = false;
    }

    interface IAstWalkChildren {
        (preAst: ISyntaxElement, walker: AstWalker): void;
    }

    export interface IAstWalker {
        options: AstWalkOptions;
        state: any
    }

    interface AstWalker {
        walk(ast: ISyntaxElement): void;
    }

    class SimplePreAstWalker implements AstWalker {
        public options: AstWalkOptions = new AstWalkOptions();

        constructor(
            private pre: (ast: ISyntaxElement, state: any) => void,
            public state: any) {
        }

        public walk(ast: ISyntaxElement): void {
            if (!ast) {
                return;
            }

            this.pre(ast, this.state);

            var walker = childrenWalkers[ast.kind()];
            if (walker) {
                walker(ast, this);
            }
        }
    }

    class SimplePrePostAstWalker implements AstWalker {
        public options: AstWalkOptions = new AstWalkOptions();

        constructor(
            private pre: (ast: ISyntaxElement, state: any) => void,
            private post: (ast: ISyntaxElement, state: any) => void,
            public state: any) {
        }

        public walk(ast: ISyntaxElement): void {
            if (!ast) {
                return;
            }

            this.pre(ast, this.state);

            var walker = childrenWalkers[ast.kind()];
            if (walker) {
                walker(ast, this);
            }

            this.post(ast, this.state);
        }
    }

    class NormalAstWalker implements AstWalker {
        public options: AstWalkOptions = new AstWalkOptions();

        constructor(
            private pre: (ast: ISyntaxElement, walker: IAstWalker) => void,
            private post: (ast: ISyntaxElement, walker: IAstWalker) => void,
            public state: any) {
        }

        public walk(ast: ISyntaxElement): void {
            if (!ast) {
                return;
            }

            // If we're stopping, then bail out immediately.
            if (this.options.stopWalking) {
                return;
            }

            this.pre(ast, this);

            // If we were asked to stop, then stop.
            if (this.options.stopWalking) {
                return;
            }

            if (this.options.goChildren) {
                // Call the "walkChildren" function corresponding to "nodeType".
                var walker = childrenWalkers[ast.kind()];
                if (walker) {
                    walker(ast, this);
                }
            }
            else {
                // no go only applies to children of node issuing it
                this.options.goChildren = true;
            }

            if (this.post) {
                this.post(ast, this);
            }
        }
    }

    export class AstWalkerFactory {
        public walk(ast: ISyntaxElement, pre: (ast: ISyntaxElement, walker: IAstWalker) => void, post?: (ast: ISyntaxElement, walker: IAstWalker) => void, state?: any): void {
            new NormalAstWalker(pre, post, state).walk(ast);
        }

        public simpleWalk(ast: ISyntaxElement, pre: (ast: ISyntaxElement, state: any) => void, post?: (ast: ISyntaxElement, state: any) => void, state?: any): void {
            if (post) {
                new SimplePrePostAstWalker(pre, post, state).walk(ast);
            }
            else {
                new SimplePreAstWalker(pre, state).walk(ast);
            }
        }
    }

    var globalAstWalkerFactory = new AstWalkerFactory();

    export function getAstWalkerFactory(): AstWalkerFactory {
        return globalAstWalkerFactory;
    }
}