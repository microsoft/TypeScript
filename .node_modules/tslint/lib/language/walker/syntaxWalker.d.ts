/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as ts from "typescript";
export declare class SyntaxWalker {
    walk(node: ts.Node): void;
    protected visitAnyKeyword(node: ts.Node): void;
    protected visitArrayLiteralExpression(node: ts.ArrayLiteralExpression): void;
    protected visitArrayType(node: ts.ArrayTypeNode): void;
    protected visitArrowFunction(node: ts.ArrowFunction): void;
    protected visitBinaryExpression(node: ts.BinaryExpression): void;
    protected visitBindingElement(node: ts.BindingElement): void;
    protected visitBindingPattern(node: ts.BindingPattern): void;
    protected visitBlock(node: ts.Block): void;
    protected visitBreakStatement(node: ts.BreakOrContinueStatement): void;
    protected visitCallExpression(node: ts.CallExpression): void;
    protected visitCallSignature(node: ts.SignatureDeclaration): void;
    protected visitCaseClause(node: ts.CaseClause): void;
    protected visitClassDeclaration(node: ts.ClassDeclaration): void;
    protected visitClassExpression(node: ts.ClassExpression): void;
    protected visitCatchClause(node: ts.CatchClause): void;
    protected visitConditionalExpression(node: ts.ConditionalExpression): void;
    protected visitConstructSignature(node: ts.ConstructSignatureDeclaration): void;
    protected visitConstructorDeclaration(node: ts.ConstructorDeclaration): void;
    protected visitConstructorType(node: ts.FunctionOrConstructorTypeNode): void;
    protected visitContinueStatement(node: ts.BreakOrContinueStatement): void;
    protected visitDebuggerStatement(node: ts.Statement): void;
    protected visitDefaultClause(node: ts.DefaultClause): void;
    protected visitDoStatement(node: ts.DoStatement): void;
    protected visitElementAccessExpression(node: ts.ElementAccessExpression): void;
    protected visitEndOfFileToken(node: ts.Node): void;
    protected visitEnumDeclaration(node: ts.EnumDeclaration): void;
    protected visitEnumMember(node: ts.EnumMember): void;
    protected visitExportAssignment(node: ts.ExportAssignment): void;
    protected visitExpressionStatement(node: ts.ExpressionStatement): void;
    protected visitForStatement(node: ts.ForStatement): void;
    protected visitForInStatement(node: ts.ForInStatement): void;
    protected visitForOfStatement(node: ts.ForOfStatement): void;
    protected visitFunctionDeclaration(node: ts.FunctionDeclaration): void;
    protected visitFunctionExpression(node: ts.FunctionExpression): void;
    protected visitFunctionType(node: ts.FunctionOrConstructorTypeNode): void;
    protected visitGetAccessor(node: ts.AccessorDeclaration): void;
    protected visitIdentifier(node: ts.Identifier): void;
    protected visitIfStatement(node: ts.IfStatement): void;
    protected visitImportDeclaration(node: ts.ImportDeclaration): void;
    protected visitImportEqualsDeclaration(node: ts.ImportEqualsDeclaration): void;
    protected visitIndexSignatureDeclaration(node: ts.IndexSignatureDeclaration): void;
    protected visitInterfaceDeclaration(node: ts.InterfaceDeclaration): void;
    protected visitJsxAttribute(node: ts.JsxAttribute): void;
    protected visitJsxElement(node: ts.JsxElement): void;
    protected visitJsxExpression(node: ts.JsxExpression): void;
    protected visitJsxSelfClosingElement(node: ts.JsxSelfClosingElement): void;
    protected visitJsxSpreadAttribute(node: ts.JsxSpreadAttribute): void;
    protected visitLabeledStatement(node: ts.LabeledStatement): void;
    protected visitMethodDeclaration(node: ts.MethodDeclaration): void;
    protected visitMethodSignature(node: ts.SignatureDeclaration): void;
    protected visitModuleDeclaration(node: ts.ModuleDeclaration): void;
    protected visitNamedImports(node: ts.NamedImports): void;
    protected visitNamespaceImport(node: ts.NamespaceImport): void;
    protected visitNewExpression(node: ts.NewExpression): void;
    protected visitNonNullExpression(node: ts.NonNullExpression): void;
    protected visitNumericLiteral(node: ts.NumericLiteral): void;
    protected visitObjectLiteralExpression(node: ts.ObjectLiteralExpression): void;
    protected visitParameterDeclaration(node: ts.ParameterDeclaration): void;
    protected visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression): void;
    protected visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression): void;
    protected visitPropertyAccessExpression(node: ts.PropertyAccessExpression): void;
    protected visitPropertyAssignment(node: ts.PropertyAssignment): void;
    protected visitPropertyDeclaration(node: ts.PropertyDeclaration): void;
    protected visitPropertySignature(node: ts.Node): void;
    protected visitRegularExpressionLiteral(node: ts.Node): void;
    protected visitReturnStatement(node: ts.ReturnStatement): void;
    protected visitSetAccessor(node: ts.AccessorDeclaration): void;
    protected visitSourceFile(node: ts.SourceFile): void;
    protected visitStringLiteral(node: ts.StringLiteral): void;
    protected visitSwitchStatement(node: ts.SwitchStatement): void;
    protected visitTemplateExpression(node: ts.TemplateExpression): void;
    protected visitThrowStatement(node: ts.ThrowStatement): void;
    protected visitTryStatement(node: ts.TryStatement): void;
    protected visitTupleType(node: ts.TupleTypeNode): void;
    protected visitTypeAliasDeclaration(node: ts.TypeAliasDeclaration): void;
    protected visitTypeAssertionExpression(node: ts.TypeAssertion): void;
    protected visitTypeLiteral(node: ts.TypeLiteralNode): void;
    protected visitTypeReference(node: ts.TypeReferenceNode): void;
    protected visitVariableDeclaration(node: ts.VariableDeclaration): void;
    protected visitVariableDeclarationList(node: ts.VariableDeclarationList): void;
    protected visitVariableStatement(node: ts.VariableStatement): void;
    protected visitWhileStatement(node: ts.WhileStatement): void;
    protected visitWithStatement(node: ts.WithStatement): void;
    protected visitNode(node: ts.Node): void;
    protected walkChildren(node: ts.Node): void;
}
