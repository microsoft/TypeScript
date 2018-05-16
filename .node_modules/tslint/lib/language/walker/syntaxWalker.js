"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var SyntaxWalker = /** @class */ (function () {
    function SyntaxWalker() {
    }
    SyntaxWalker.prototype.walk = function (node) {
        this.visitNode(node);
    };
    SyntaxWalker.prototype.visitAnyKeyword = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitArrayLiteralExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitArrayType = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitArrowFunction = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitBinaryExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitBindingElement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitBindingPattern = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitBlock = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitBreakStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitCallExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitCallSignature = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitCaseClause = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitClassDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitClassExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitCatchClause = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitConditionalExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitConstructSignature = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitConstructorDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitConstructorType = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitContinueStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitDebuggerStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitDefaultClause = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitDoStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitElementAccessExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitEndOfFileToken = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitEnumDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitEnumMember = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitExportAssignment = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitExpressionStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitForStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitForInStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitForOfStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitFunctionDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitFunctionExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitFunctionType = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitGetAccessor = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitIdentifier = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitIfStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitImportDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitImportEqualsDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitIndexSignatureDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitInterfaceDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitJsxAttribute = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitJsxElement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitJsxExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitJsxSpreadAttribute = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitLabeledStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitMethodDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitMethodSignature = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitModuleDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitNamedImports = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitNamespaceImport = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitNewExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitNonNullExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitNumericLiteral = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitObjectLiteralExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitParameterDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitPostfixUnaryExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitPropertyAccessExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitPropertyAssignment = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitPropertyDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitPropertySignature = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitRegularExpressionLiteral = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitReturnStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitSetAccessor = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitSourceFile = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitStringLiteral = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitSwitchStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitTemplateExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitThrowStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitTryStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitTupleType = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitTypeAliasDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitTypeAssertionExpression = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitTypeLiteral = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitTypeReference = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitVariableDeclaration = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitVariableDeclarationList = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitVariableStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitWhileStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitWithStatement = function (node) {
        this.walkChildren(node);
    };
    SyntaxWalker.prototype.visitNode = function (node) {
        switch (node.kind) {
            case ts.SyntaxKind.AnyKeyword:
                this.visitAnyKeyword(node);
                break;
            case ts.SyntaxKind.ArrayBindingPattern:
                this.visitBindingPattern(node);
                break;
            case ts.SyntaxKind.ArrayLiteralExpression:
                this.visitArrayLiteralExpression(node);
                break;
            case ts.SyntaxKind.ArrayType:
                this.visitArrayType(node);
                break;
            case ts.SyntaxKind.ArrowFunction:
                this.visitArrowFunction(node);
                break;
            case ts.SyntaxKind.BinaryExpression:
                this.visitBinaryExpression(node);
                break;
            case ts.SyntaxKind.BindingElement:
                this.visitBindingElement(node);
                break;
            case ts.SyntaxKind.Block:
                this.visitBlock(node);
                break;
            case ts.SyntaxKind.BreakStatement:
                this.visitBreakStatement(node);
                break;
            case ts.SyntaxKind.CallExpression:
                this.visitCallExpression(node);
                break;
            case ts.SyntaxKind.CallSignature:
                this.visitCallSignature(node);
                break;
            case ts.SyntaxKind.CaseClause:
                this.visitCaseClause(node);
                break;
            case ts.SyntaxKind.ClassDeclaration:
                this.visitClassDeclaration(node);
                break;
            case ts.SyntaxKind.ClassExpression:
                this.visitClassExpression(node);
                break;
            case ts.SyntaxKind.CatchClause:
                this.visitCatchClause(node);
                break;
            case ts.SyntaxKind.ConditionalExpression:
                this.visitConditionalExpression(node);
                break;
            case ts.SyntaxKind.ConstructSignature:
                this.visitConstructSignature(node);
                break;
            case ts.SyntaxKind.Constructor:
                this.visitConstructorDeclaration(node);
                break;
            case ts.SyntaxKind.ConstructorType:
                this.visitConstructorType(node);
                break;
            case ts.SyntaxKind.ContinueStatement:
                this.visitContinueStatement(node);
                break;
            case ts.SyntaxKind.DebuggerStatement:
                this.visitDebuggerStatement(node);
                break;
            case ts.SyntaxKind.DefaultClause:
                this.visitDefaultClause(node);
                break;
            case ts.SyntaxKind.DoStatement:
                this.visitDoStatement(node);
                break;
            case ts.SyntaxKind.ElementAccessExpression:
                this.visitElementAccessExpression(node);
                break;
            case ts.SyntaxKind.EndOfFileToken:
                this.visitEndOfFileToken(node);
                break;
            case ts.SyntaxKind.EnumDeclaration:
                this.visitEnumDeclaration(node);
                break;
            case ts.SyntaxKind.EnumMember:
                this.visitEnumMember(node);
                break;
            case ts.SyntaxKind.ExportAssignment:
                this.visitExportAssignment(node);
                break;
            case ts.SyntaxKind.ExpressionStatement:
                this.visitExpressionStatement(node);
                break;
            case ts.SyntaxKind.ForStatement:
                this.visitForStatement(node);
                break;
            case ts.SyntaxKind.ForInStatement:
                this.visitForInStatement(node);
                break;
            case ts.SyntaxKind.ForOfStatement:
                this.visitForOfStatement(node);
                break;
            case ts.SyntaxKind.FunctionDeclaration:
                this.visitFunctionDeclaration(node);
                break;
            case ts.SyntaxKind.FunctionExpression:
                this.visitFunctionExpression(node);
                break;
            case ts.SyntaxKind.FunctionType:
                this.visitFunctionType(node);
                break;
            case ts.SyntaxKind.GetAccessor:
                this.visitGetAccessor(node);
                break;
            case ts.SyntaxKind.Identifier:
                this.visitIdentifier(node);
                break;
            case ts.SyntaxKind.IfStatement:
                this.visitIfStatement(node);
                break;
            case ts.SyntaxKind.ImportDeclaration:
                this.visitImportDeclaration(node);
                break;
            case ts.SyntaxKind.ImportEqualsDeclaration:
                this.visitImportEqualsDeclaration(node);
                break;
            case ts.SyntaxKind.IndexSignature:
                this.visitIndexSignatureDeclaration(node);
                break;
            case ts.SyntaxKind.InterfaceDeclaration:
                this.visitInterfaceDeclaration(node);
                break;
            case ts.SyntaxKind.JsxAttribute:
                this.visitJsxAttribute(node);
                break;
            case ts.SyntaxKind.JsxElement:
                this.visitJsxElement(node);
                break;
            case ts.SyntaxKind.JsxExpression:
                this.visitJsxExpression(node);
                break;
            case ts.SyntaxKind.JsxSelfClosingElement:
                this.visitJsxSelfClosingElement(node);
                break;
            case ts.SyntaxKind.JsxSpreadAttribute:
                this.visitJsxSpreadAttribute(node);
                break;
            case ts.SyntaxKind.LabeledStatement:
                this.visitLabeledStatement(node);
                break;
            case ts.SyntaxKind.MethodDeclaration:
                this.visitMethodDeclaration(node);
                break;
            case ts.SyntaxKind.MethodSignature:
                this.visitMethodSignature(node);
                break;
            case ts.SyntaxKind.ModuleDeclaration:
                this.visitModuleDeclaration(node);
                break;
            case ts.SyntaxKind.NamedImports:
                this.visitNamedImports(node);
                break;
            case ts.SyntaxKind.NamespaceImport:
                this.visitNamespaceImport(node);
                break;
            case ts.SyntaxKind.NewExpression:
                this.visitNewExpression(node);
                break;
            case ts.SyntaxKind.NonNullExpression:
                this.visitNonNullExpression(node);
                break;
            case ts.SyntaxKind.NumericLiteral:
                this.visitNumericLiteral(node);
                break;
            case ts.SyntaxKind.ObjectBindingPattern:
                this.visitBindingPattern(node);
                break;
            case ts.SyntaxKind.ObjectLiteralExpression:
                this.visitObjectLiteralExpression(node);
                break;
            case ts.SyntaxKind.Parameter:
                this.visitParameterDeclaration(node);
                break;
            case ts.SyntaxKind.PostfixUnaryExpression:
                this.visitPostfixUnaryExpression(node);
                break;
            case ts.SyntaxKind.PrefixUnaryExpression:
                this.visitPrefixUnaryExpression(node);
                break;
            case ts.SyntaxKind.PropertyAccessExpression:
                this.visitPropertyAccessExpression(node);
                break;
            case ts.SyntaxKind.PropertyAssignment:
                this.visitPropertyAssignment(node);
                break;
            case ts.SyntaxKind.PropertyDeclaration:
                this.visitPropertyDeclaration(node);
                break;
            case ts.SyntaxKind.PropertySignature:
                this.visitPropertySignature(node);
                break;
            case ts.SyntaxKind.RegularExpressionLiteral:
                this.visitRegularExpressionLiteral(node);
                break;
            case ts.SyntaxKind.ReturnStatement:
                this.visitReturnStatement(node);
                break;
            case ts.SyntaxKind.SetAccessor:
                this.visitSetAccessor(node);
                break;
            case ts.SyntaxKind.SourceFile:
                this.visitSourceFile(node);
                break;
            case ts.SyntaxKind.StringLiteral:
                this.visitStringLiteral(node);
                break;
            case ts.SyntaxKind.SwitchStatement:
                this.visitSwitchStatement(node);
                break;
            case ts.SyntaxKind.TemplateExpression:
                this.visitTemplateExpression(node);
                break;
            case ts.SyntaxKind.ThrowStatement:
                this.visitThrowStatement(node);
                break;
            case ts.SyntaxKind.TryStatement:
                this.visitTryStatement(node);
                break;
            case ts.SyntaxKind.TupleType:
                this.visitTupleType(node);
                break;
            case ts.SyntaxKind.TypeAliasDeclaration:
                this.visitTypeAliasDeclaration(node);
                break;
            case ts.SyntaxKind.TypeAssertionExpression:
                this.visitTypeAssertionExpression(node);
                break;
            case ts.SyntaxKind.TypeLiteral:
                this.visitTypeLiteral(node);
                break;
            case ts.SyntaxKind.TypeReference:
                this.visitTypeReference(node);
                break;
            case ts.SyntaxKind.VariableDeclaration:
                this.visitVariableDeclaration(node);
                break;
            case ts.SyntaxKind.VariableDeclarationList:
                this.visitVariableDeclarationList(node);
                break;
            case ts.SyntaxKind.VariableStatement:
                this.visitVariableStatement(node);
                break;
            case ts.SyntaxKind.WhileStatement:
                this.visitWhileStatement(node);
                break;
            case ts.SyntaxKind.WithStatement:
                this.visitWithStatement(node);
                break;
            default:
                this.walkChildren(node);
        }
    };
    SyntaxWalker.prototype.walkChildren = function (node) {
        var _this = this;
        ts.forEachChild(node, function (child) { return _this.visitNode(child); });
    };
    return SyntaxWalker;
}());
exports.SyntaxWalker = SyntaxWalker;
