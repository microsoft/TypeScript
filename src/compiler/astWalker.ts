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
    function walkListChildren(preAst: ISyntaxList2, walker: AstWalker): void {
        for (var i = 0, n = preAst.childCount(); i < n; i++) {
            walker.walk(preAst.childAt(i));
        }
    }

    function walkThrowStatementChildren(preAst: ThrowStatement, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkPrefixUnaryExpressionChildren(preAst: PrefixUnaryExpression, walker: AstWalker): void {
        walker.walk(preAst.operand);
    }

    function walkPostfixUnaryExpressionChildren(preAst: PostfixUnaryExpression, walker: AstWalker): void {
        walker.walk(preAst.operand);
    }

    function walkDeleteExpressionChildren(preAst: DeleteExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkTypeArgumentListChildren(preAst: TypeArgumentList, walker: AstWalker): void {
        walker.walk(preAst.typeArguments);
    }

    function walkTypeOfExpressionChildren(preAst: TypeOfExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkVoidExpressionChildren(preAst: VoidExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkArgumentListChildren(preAst: ArgumentList, walker: AstWalker): void {
        walker.walk(preAst.typeArgumentList);
        walker.walk(preAst.arguments);
    }

    function walkArrayLiteralExpressionChildren(preAst: ArrayLiteralExpression, walker: AstWalker): void {
        walker.walk(preAst.expressions);
    }

    function walkSimplePropertyAssignmentChildren(preAst: SimplePropertyAssignment, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.expression);
    }

    function walkFunctionPropertyAssignmentChildren(preAst: FunctionPropertyAssignment, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkGetAccessorChildren(preAst: GetAccessor, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.typeAnnotation);
        walker.walk(preAst.block);
    }

    function walkSeparatedListChildren(preAst: ISeparatedSyntaxList2, walker: AstWalker): void {
        for (var i = 0, n = preAst.nonSeparatorCount(); i < n; i++) {
            walker.walk(preAst.nonSeparatorAt(i));
        }
    }

    function walkSetAccessorChildren(preAst: SetAccessor, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.block);
    }

    function walkObjectLiteralExpressionChildren(preAst: ObjectLiteralExpression, walker: AstWalker): void {
        walker.walk(preAst.propertyAssignments);
    }

    function walkCastExpressionChildren(preAst: CastExpression, walker: AstWalker): void {
        walker.walk(preAst.type);
        walker.walk(preAst.expression);
    }

    function walkParenthesizedExpressionChildren(preAst: ParenthesizedExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkElementAccessExpressionChildren(preAst: ElementAccessExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.argumentExpression);
    }

    function walkMemberAccessExpressionChildren(preAst: MemberAccessExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.name);
    }

    function walkQualifiedNameChildren(preAst: QualifiedName, walker: AstWalker): void {
        walker.walk(preAst.left);
        walker.walk(preAst.right);
    }

    function walkBinaryExpressionChildren(preAst: BinaryExpression, walker: AstWalker): void {
        walker.walk(preAst.left);
        walker.walk(preAst.right);
    }

    function walkEqualsValueClauseChildren(preAst: EqualsValueClause, walker: AstWalker): void {
        walker.walk(preAst.value);
    }

    function walkTypeParameterChildren(preAst: TypeParameter, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.constraint);
    }

    function walkTypeParameterListChildren(preAst: TypeParameterList, walker: AstWalker): void {
        walker.walk(preAst.typeParameters);
    }

    function walkGenericTypeChildren(preAst: GenericType, walker: AstWalker): void {
        walker.walk(preAst.name);
        walker.walk(preAst.typeArgumentList);
    }

    function walkTypeAnnotationChildren(preAst: TypeAnnotation, walker: AstWalker): void {
        walker.walk(preAst.type);
    }

    function walkTypeQueryChildren(preAst: TypeQuery, walker: AstWalker): void {
        walker.walk(preAst.name);
    }

    function walkInvocationExpressionChildren(preAst: InvocationExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.argumentList);
    }

    function walkObjectCreationExpressionChildren(preAst: ObjectCreationExpression, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.argumentList);
    }

    function walkTrinaryExpressionChildren(preAst: ConditionalExpression, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.whenTrue);
        walker.walk(preAst.whenFalse);
    }

    function walkFunctionExpressionChildren(preAst: FunctionExpression, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkFunctionTypeChildren(preAst: FunctionType, walker: AstWalker): void {
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.type);
    }

    function walkParenthesizedArrowFunctionExpressionChildren(preAst: ParenthesizedArrowFunctionExpression, walker: AstWalker): void {
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
        walker.walk(preAst.expression);
    }

    function walkSimpleArrowFunctionExpressionChildren(preAst: SimpleArrowFunctionExpression, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.block);
        walker.walk(preAst.expression);
    }

    function walkMemberFunctionDeclarationChildren(preAst: MemberFunctionDeclaration, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkFuncDeclChildren(preAst: FunctionDeclaration, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkIndexMemberDeclarationChildren(preAst: IndexMemberDeclaration, walker: AstWalker): void {
        walker.walk(preAst.indexSignature);
    }

    function walkIndexSignatureChildren(preAst: IndexSignature, walker: AstWalker): void {
        walker.walk(preAst.parameter);
        walker.walk(preAst.typeAnnotation);
    }

    function walkCallSignatureChildren(preAst: CallSignature, walker: AstWalker): void {
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.typeAnnotation);
    }

    function walkConstraintChildren(preAst: Constraint, walker: AstWalker): void {
        walker.walk(preAst.type);
    }

    function walkConstructorDeclarationChildren(preAst: ConstructorDeclaration, walker: AstWalker): void {
        walker.walk(preAst.callSignature);
        walker.walk(preAst.block);
    }

    function walkConstructorTypeChildren(preAst: FunctionType, walker: AstWalker): void {
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.parameterList);
        walker.walk(preAst.type);
    }

    function walkConstructSignatureChildren(preAst: ConstructSignature, walker: AstWalker): void {
        walker.walk(preAst.callSignature);
    }

    function walkParameterChildren(preAst: Parameter, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeAnnotation);
        walker.walk(preAst.equalsValueClause);
    }

    function walkParameterListChildren(preAst: ParameterList, walker: AstWalker): void {
        walker.walk(preAst.parameters);
    }

    function walkPropertySignatureChildren(preAst: PropertySignature, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.typeAnnotation);
    }

    function walkVariableDeclaratorChildren(preAst: VariableDeclarator, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.typeAnnotation);
        walker.walk(preAst.equalsValueClause);
    }

    function walkMemberVariableDeclarationChildren(preAst: MemberVariableDeclaration, walker: AstWalker): void {
        walker.walk(preAst.variableDeclarator);
    }

    function walkMethodSignatureChildren(preAst: MethodSignature, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.callSignature);
    }

    function walkReturnStatementChildren(preAst: ReturnStatement, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkForStatementChildren(preAst: ForStatement, walker: AstWalker): void {
        walker.walk(preAst.variableDeclaration);
        walker.walk(preAst.initializer);
        walker.walk(preAst.condition);
        walker.walk(preAst.incrementor);
        walker.walk(preAst.statement);
    }

    function walkForInStatementChildren(preAst: ForInStatement, walker: AstWalker): void {
        walker.walk(preAst.variableDeclaration);
        walker.walk(preAst.left);
        walker.walk(preAst.expression);
        walker.walk(preAst.statement);
    }

    function walkIfStatementChildren(preAst: IfStatement, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
        walker.walk(preAst.elseClause);
    }

    function walkElseClauseChildren(preAst: ElseClause, walker: AstWalker): void {
        walker.walk(preAst.statement);
    }

    function walkWhileStatementChildren(preAst: WhileStatement, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
    }

    function walkDoStatementChildren(preAst: DoStatement, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
    }

    function walkBlockChildren(preAst: Block, walker: AstWalker): void {
        walker.walk(preAst.statements);
    }

    function walkVariableDeclarationChildren(preAst: VariableDeclaration, walker: AstWalker): void {
        walker.walk(preAst.declarators);
    }

    function walkCaseSwitchClauseChildren(preAst: CaseSwitchClause, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.statements);
    }

    function walkDefaultSwitchClauseChildren(preAst: DefaultSwitchClause, walker: AstWalker): void {
        walker.walk(preAst.statements);
    }

    function walkSwitchStatementChildren(preAst: SwitchStatement, walker: AstWalker): void {
        walker.walk(preAst.expression);
        walker.walk(preAst.switchClauses);
    }

    function walkTryStatementChildren(preAst: TryStatement, walker: AstWalker): void {
        walker.walk(preAst.block);
        walker.walk(preAst.catchClause);
        walker.walk(preAst.finallyClause);
    }

    function walkCatchClauseChildren(preAst: CatchClause, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeAnnotation);
        walker.walk(preAst.block);
    }

    function walkExternalModuleReferenceChildren(preAst: ExternalModuleReference, walker: AstWalker): void {
        walker.walk(preAst.stringLiteral);
    }

    function walkFinallyClauseChildren(preAst: FinallyClause, walker: AstWalker): void {
        walker.walk(preAst.block);
    }

    function walkClassDeclChildren(preAst: ClassDeclaration, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.heritageClauses);
        walker.walk(preAst.classElements);
    }

    function walkScriptChildren(preAst: SourceUnit, walker: AstWalker): void {
        walker.walk(preAst.moduleElements);
    }

    function walkHeritageClauseChildren(preAst: HeritageClause, walker: AstWalker): void {
        walker.walk(preAst.typeNames);
    }

    function walkInterfaceDeclerationChildren(preAst: InterfaceDeclaration, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.typeParameterList);
        walker.walk(preAst.heritageClauses);
        walker.walk(preAst.body);
    }

    function walkObjectTypeChildren(preAst: ObjectType, walker: AstWalker): void {
        walker.walk(preAst.typeMembers);
    }

    function walkArrayTypeChildren(preAst: ArrayType, walker: AstWalker): void {
        walker.walk(preAst.type);
    }

    function walkModuleDeclarationChildren(preAst: ModuleDeclaration, walker: AstWalker): void {
        walker.walk(preAst.name);
        walker.walk(preAst.stringLiteral);
        walker.walk(preAst.moduleElements);
    }

    function walkModuleNameModuleReferenceChildren(preAst: ModuleNameModuleReference, walker: AstWalker): void {
        walker.walk(preAst.moduleName);
    }

    function walkEnumDeclarationChildren(preAst: EnumDeclaration, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.enumElements);
    }

    function walkEnumElementChildren(preAst: EnumElement, walker: AstWalker): void {
        walker.walk(preAst.propertyName);
        walker.walk(preAst.equalsValueClause);
    }

    function walkImportDeclarationChildren(preAst: ImportDeclaration, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.moduleReference);
    }

    function walkExportAssignmentChildren(preAst: ExportAssignment, walker: AstWalker): void {
        walker.walk(preAst.identifier);
    }

    function walkWithStatementChildren(preAst: WithStatement, walker: AstWalker): void {
        walker.walk(preAst.condition);
        walker.walk(preAst.statement);
    }

    function walkExpressionStatementChildren(preAst: ExpressionStatement, walker: AstWalker): void {
        walker.walk(preAst.expression);
    }

    function walkLabeledStatementChildren(preAst: LabeledStatement, walker: AstWalker): void {
        walker.walk(preAst.identifier);
        walker.walk(preAst.statement);
    }

    function walkVariableStatementChildren(preAst: VariableStatement, walker: AstWalker): void {
        walker.walk(preAst.declaration);
    }

    var childrenWalkers: IAstWalkChildren[] = new Array<IAstWalkChildren>(SyntaxKind.Last + 1);

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
        (preAst: AST, walker: AstWalker): void;
    }

    export interface IAstWalker {
        options: AstWalkOptions;
        state: any
    }

    interface AstWalker {
        walk(ast: AST): void;
    }

    class SimplePreAstWalker implements AstWalker {
        public options: AstWalkOptions = new AstWalkOptions();

        constructor(
            private pre: (ast: AST, state: any) => void,
            public state: any) {
        }

        public walk(ast: AST): void {
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
            private pre: (ast: AST, state: any) => void,
            private post: (ast: AST, state: any) => void,
            public state: any) {
        }

        public walk(ast: AST): void {
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
            private pre: (ast: AST, walker: IAstWalker) => void,
            private post: (ast: AST, walker: IAstWalker) => void,
            public state: any) {
        }

        public walk(ast: AST): void {
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
        public walk(ast: AST, pre: (ast: AST, walker: IAstWalker) => void, post?: (ast: AST, walker: IAstWalker) => void, state?: any): void {
            new NormalAstWalker(pre, post, state).walk(ast);
        }

        public simpleWalk(ast: AST, pre: (ast: AST, state: any) => void, post?: (ast: AST, state: any) => void, state?: any): void {
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