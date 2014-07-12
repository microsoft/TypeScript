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
    export interface IASTSpan {
        _start: number;
        _end: number;

        start(): number;
        end(): number;        //trailingTriviaWidth(): number;
    }

    export class ASTSpan implements IASTSpan {
        constructor(public _start: number, public _end: number) {
        }

        public start(): number {
            return this._start;
        }

        public end(): number {
            return this._end;
        }
    }

    var astID = 0;

    export function structuralEqualsNotIncludingPosition(ast1: AST, ast2: AST): boolean {
        return structuralEquals(ast1, ast2, false);
    }

    export function structuralEqualsIncludingPosition(ast1: AST, ast2: AST): boolean {
        return structuralEquals(ast1, ast2, true);
    }

    function commentStructuralEqualsNotIncludingPosition(ast1: Comment, ast2: Comment): boolean {
        return commentStructuralEquals(ast1, ast2, false);
    }

    function commentStructuralEqualsIncludingPosition(ast1: Comment, ast2: Comment): boolean {
        return commentStructuralEquals(ast1, ast2, true);
    }

    function structuralEquals(ast1: AST, ast2: AST, includingPosition: boolean): boolean {
        if (ast1 === ast2) {
            return true;
        }

        return ast1 !== null && ast2 !== null &&
               ast1.kind() === ast2.kind() &&
               ast1.structuralEquals(ast2, includingPosition);
    }

    function commentStructuralEquals(ast1: Comment, ast2: Comment, includingPosition: boolean): boolean {
        if (ast1 === ast2) {
            return true;
        }

        return ast1 !== null && ast2 !== null &&
            ast1.structuralEquals(ast2, includingPosition);
    }

    function astArrayStructuralEquals(array1: AST[], array2: AST[], includingPosition: boolean): boolean {
        return ArrayUtilities.sequenceEquals(array1, array2,
            includingPosition ? structuralEqualsIncludingPosition : structuralEqualsNotIncludingPosition);
    }

    function commentArrayStructuralEquals(array1: Comment[], array2: Comment[], includingPosition: boolean): boolean {
        return ArrayUtilities.sequenceEquals(array1, array2,
            includingPosition ? commentStructuralEqualsIncludingPosition : commentStructuralEqualsNotIncludingPosition);
    }

    export class AST implements IASTSpan {
        public parent: AST = null;
        public _start: number = -1;
        public _end: number = -1;
        public _trailingTriviaWidth: number = 0;

        private _astID: number = astID++;

        private _preComments: Comment[] = null;
        private _postComments: Comment[] = null;

        constructor() {
        }

        public syntaxID(): number {
            return this._astID;
        }

        public start(): number {
            return this._start;
        }

        public end(): number {
            return this._end;
        }

        public trailingTriviaWidth(): number {
            return this._trailingTriviaWidth;
        }

        public fileName(): string {
            return this.parent.fileName();
        }

        public kind(): SyntaxKind {
            throw Errors.abstract();
        }

        public preComments(): Comment[] {
            return this._preComments;
        }

        public postComments(): Comment[] {
            return this._postComments;
        }

        public setPreComments(comments: Comment[]) {
            if (comments && comments.length) {
                this._preComments = comments;
            }
            else if (this._preComments) {
                this._preComments = null;
            }
        }

        public setPostComments(comments: Comment[]) {
            if (comments && comments.length) {
                this._postComments = comments;
            }
            else if (this._postComments) {
                this._postComments = null;
            }
        }

        public width(): number {
            return this.end() - this.start();
        }

        public structuralEquals(ast: AST, includingPosition: boolean): boolean {
            if (includingPosition) {
                if (this.start() !== ast.start() || this.end() !== ast.end()) {
                    return false;
                }
            }

            return commentArrayStructuralEquals(this.preComments(), ast.preComments(), includingPosition) &&
                   commentArrayStructuralEquals(this.postComments(), ast.postComments(), includingPosition);
        }

        public isExpression() {
            return false;
        }
    }

    export interface IASTToken extends AST {
        text(): string;
        valueText(): string;
    }

    export class ISyntaxList2 extends AST {
        constructor(private _fileName: string, private members: AST[]) {
            super();

            for (var i = 0, n = members.length; i < n; i++) {
                members[i].parent = this;
            }
        }

        public childCount(): number {
            return this.members.length;
        }

        public childAt(index: number): AST {
            return this.members[index];
        }

        public fileName(): string {
            return this._fileName;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.List;
        }

        public firstOrDefault(func: (v: AST, index: number) => boolean): AST {
            return ArrayUtilities.firstOrDefault(this.members, func);
        }

        public lastOrDefault(func: (v: AST, index: number) => boolean): AST {
            return ArrayUtilities.lastOrDefault(this.members, func);
        }

        public any(func: (v: AST) => boolean): boolean {
            return ArrayUtilities.any(this.members, func);
        }

        public structuralEquals(ast: ISyntaxList2, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                   astArrayStructuralEquals(this.members, ast.members, includingPosition);
        }
    }

    export class ISeparatedSyntaxList2 extends AST {
        constructor(private _fileName: string, private members: AST[], private _separatorCount: number) {
            super();

            for (var i = 0, n = members.length; i < n; i++) {
                members[i].parent = this;
            }
        }

        public nonSeparatorCount(): number {
            return this.members.length;
        }

        public separatorCount(): number {
            return this._separatorCount;
        }

        public nonSeparatorAt(index: number): AST {
            return this.members[index];
        }

        public nonSeparatorIndexOf(ast: AST): number {
            for (var i = 0, n = this.nonSeparatorCount(); i < n; i++) {
                if (this.nonSeparatorAt(i) === ast) {
                    return i;
                }
            }

            return -1;
        }

        public fileName(): string {
            return this._fileName;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SeparatedList;
        }

        public structuralEquals(ast: ISeparatedSyntaxList2, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                astArrayStructuralEquals(this.members, ast.members, includingPosition);
        }
    }

    export class SourceUnit extends AST {
        constructor(public moduleElements: ISyntaxList2,
                    public endOfFileTokenLeadingComments: Comment[],
                    private _fileName: string) {
            super();
            moduleElements && (moduleElements.parent = this);
        }

        public fileName(): string {
            return this._fileName;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SourceUnit;
        }

        public structuralEquals(ast: SourceUnit, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.moduleElements, ast.moduleElements, includingPosition);
        }
    }

    export class Identifier extends AST implements IASTToken {
        private _valueText: string = null;

        // 'actualText' is the text that the user has entered for the identifier. the text might 
        // include any Unicode escape sequences (e.g.: \u0041 for 'A'). 'text', however, contains 
        // the resolved value of any escape sequences in the actual text; so in the previous 
        // example, actualText = '\u0041', text = 'A'.
        // Also, in the case where actualText is "__proto__", we substitute "#__proto__" as the _text
        // so that we can safely use it as a key in a javascript object.
        //
        // For purposes of finding a symbol, use text, as this will allow you to match all 
        // variations of the variable text. For full-fidelity translation of the user input, such
        // as emitting, use the actualText field.
        constructor(private _text: string) {
            super();
        }

        public text(): string {
            return this._text;
        }
        public valueText(): string {
            if (!this._valueText) {
                // In the case where actualText is "__proto__", we substitute "#__proto__" as the _text
                // so that we can safely use it as a key in a javascript object.
                var text = this._text;
                if (text === "__proto__") {
                    this._valueText = "#__proto__";
                }
                else {
                    this._valueText = Syntax.massageEscapes(text);
                }
            }

            return this._valueText;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IdentifierName;
        }

        public structuralEquals(ast: Identifier, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                   this._text === ast._text;
        }

        public isExpression() {
            return true;
        }
    }

    export class LiteralExpression extends AST {
        constructor(private _nodeType: SyntaxKind, private _text: string, private _valueText: string) {
            super();
        }

        public text(): string {
            return this._text;
        }

        public valueText(): string {
            return this._valueText;
        }

        public kind(): SyntaxKind {
            return this._nodeType;
        }

        public structuralEquals(ast: ParenthesizedExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ThisExpression extends AST implements IASTToken {
        constructor(private _text: string, private _valueText: string) {
            super();
        }

        public text(): string {
            return this._text;
        }

        public valueText(): string {
            return this._valueText;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ThisKeyword;
        }

        public structuralEquals(ast: ParenthesizedExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class SuperExpression extends AST implements IASTToken {
        constructor(private _text: string, private _valueText: string) {
            super();
        }

        public text(): string {
            return this._text;
        }

        public valueText(): string {
            return this._valueText;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SuperKeyword;
        }

        public structuralEquals(ast: ParenthesizedExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class NumericLiteral extends AST implements IASTToken {
        constructor(private _value: number,
                    private _text: string,
                    private _valueText: string) {
            super();
        }

        public text(): string { return this._text; }
        public valueText(): string { return this._valueText; }
        public value(): any { return this._value; }

        public kind(): SyntaxKind {
            return SyntaxKind.NumericLiteral;
        }

        public structuralEquals(ast: NumericLiteral, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                   (this._value === ast._value || (isNaN(this._value) && isNaN(ast._value))) &&
                   this._text === ast._text;
        }

        public isExpression() {
            return true;
        }
    }

    export class RegularExpressionLiteral extends AST implements IASTToken {
        constructor(private _text: string, private _valueText: string) {
            super();
        }

        public text(): string {
            return this._text;
        }

        public valueText(): string {
            return this._valueText;
        }

        public kind(): SyntaxKind {
            return SyntaxKind.RegularExpressionLiteral;
        }

        public isExpression() {
            return true;
        }
    }

    export class StringLiteral extends AST implements IASTToken {
        constructor(private _text: string, private _valueText: string) {
            super();
            this._valueText = _valueText === "__proto__" ? "#__proto__" : _valueText;

        }

        public text(): string { return this._text; }
        public valueText(): string { return this._valueText; }

        public kind(): SyntaxKind {
            return SyntaxKind.StringLiteral;
        }

        public structuralEquals(ast: StringLiteral, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                   this._text === ast._text;
        }

        public isExpression() {
            return true;
        }
    }

    export class TypeAnnotation extends AST {
        constructor(public type: AST) {
            super();
            type && (type.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeAnnotation;
        }
    }

    export class BuiltInType extends AST implements IASTToken {
        constructor(private _nodeType: SyntaxKind, private _text: string, private _valueText: string) {
            super();
        }

        public text(): string {
            return this._text;
        }

        public valueText(): string {
            return this._valueText;
        }

        public kind(): SyntaxKind {
            return this._nodeType;
        }
    }

    export class ExternalModuleReference extends AST {
        constructor(public stringLiteral: StringLiteral) {
            super();
            stringLiteral && (stringLiteral.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ExternalModuleReference;
        }
    }

    export class ModuleNameModuleReference extends AST {
        constructor(public moduleName: AST) {
            super();
            moduleName && (moduleName.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ModuleNameModuleReference;
        }
    }

    export class ImportDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public identifier: Identifier, public moduleReference: AST) {
            super();
            identifier && (identifier.parent = this);
            moduleReference && (moduleReference.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ImportDeclaration;
        }

        public structuralEquals(ast: ImportDeclaration, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.identifier, ast.identifier, includingPosition) &&
                structuralEquals(this.moduleReference, ast.moduleReference, includingPosition);
        }
    }

    export class ExportAssignment extends AST {
        constructor(public identifier: Identifier) {
            super();
            identifier && (identifier.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ExportAssignment;
        }

        public structuralEquals(ast: ExportAssignment, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.identifier, ast.identifier, includingPosition);
        }
    }

    export class TypeParameterList extends AST {
        constructor(public typeParameters: ISeparatedSyntaxList2) {
            super();
            typeParameters && (typeParameters.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeParameterList;
        }
    }

    export class ClassDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public identifier: Identifier, public typeParameterList: TypeParameterList, public heritageClauses: ISyntaxList2, public classElements: ISyntaxList2, public closeBraceToken: ASTSpan) {
            super();
            identifier && (identifier.parent = this);
            typeParameterList && (typeParameterList.parent = this);
            heritageClauses && (heritageClauses.parent = this);
            classElements && (classElements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ClassDeclaration;
        }

        public structuralEquals(ast: ClassDeclaration, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.identifier, ast.identifier, includingPosition) &&
                structuralEquals(this.classElements, ast.classElements, includingPosition) &&
                structuralEquals(this.typeParameterList, ast.typeParameterList, includingPosition) &&
                structuralEquals(this.heritageClauses, ast.heritageClauses, includingPosition);
        }
    }

    export class InterfaceDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public identifier: Identifier, public typeParameterList: TypeParameterList, public heritageClauses: ISyntaxList2, public body: ObjectType) {
            super();
            identifier && (identifier.parent = this);
            typeParameterList && (typeParameterList.parent = this);
            body && (body.parent = this);
            heritageClauses && (heritageClauses.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.InterfaceDeclaration;
        }

        public structuralEquals(ast: InterfaceDeclaration, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.identifier, ast.identifier, includingPosition) &&
                structuralEquals(this.body, ast.body, includingPosition) &&
                structuralEquals(this.typeParameterList, ast.typeParameterList, includingPosition) &&
                structuralEquals(this.heritageClauses, ast.heritageClauses, includingPosition);
        }
    }

    export class HeritageClause extends AST {
        constructor(private _nodeType: SyntaxKind, public typeNames: ISeparatedSyntaxList2) {
            super();
            typeNames && (typeNames.parent = this);
        }

        public kind(): SyntaxKind {
            return this._nodeType;
        }

        public structuralEquals(ast: HeritageClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.typeNames, ast.typeNames, includingPosition);
        }
    }

    export class ModuleDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public name: AST, public stringLiteral: StringLiteral, public moduleElements: ISyntaxList2, public endingToken: ASTSpan) {
            super();
            name && (name.parent = this);
            stringLiteral && (stringLiteral.parent = this);
            moduleElements && (moduleElements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ModuleDeclaration;
        }

        public structuralEquals(ast: ModuleDeclaration, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.name, ast.name, includingPosition) &&
                structuralEquals(this.moduleElements, ast.moduleElements, includingPosition);
        }
    }

    export class FunctionDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public identifier: Identifier, public callSignature: CallSignature, public block: Block) {
            super();
            identifier && (identifier.parent = this);
            callSignature && (callSignature.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionDeclaration;
        }

        public structuralEquals(ast: FunctionDeclaration, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.identifier, ast.identifier, includingPosition) &&
                structuralEquals(this.block, ast.block, includingPosition) &&
                structuralEquals(this.callSignature, ast.callSignature, includingPosition);
        }
    }

    export class VariableStatement extends AST {
        constructor(public modifiers: PullElementFlags[], public declaration: VariableDeclaration) {
            super();
            declaration && (declaration.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableStatement;
        }

        public structuralEquals(ast: VariableStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.declaration, ast.declaration, includingPosition);
        }
    }

    export class VariableDeclaration extends AST {
        constructor(public declarators: ISeparatedSyntaxList2) {
            super();
            declarators && (declarators.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableDeclaration;
        }

        public structuralEquals(ast: VariableDeclaration, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.declarators, ast.declarators, includingPosition);
        }
    }

    export class VariableDeclarator extends AST {
        constructor(public propertyName: IASTToken, public typeAnnotation: TypeAnnotation, public equalsValueClause: EqualsValueClause) {
            super();
            propertyName && (propertyName.parent = this);
            typeAnnotation && (typeAnnotation.parent = this);
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VariableDeclarator;
        }
    }

    export class EqualsValueClause extends AST {
        constructor(public value: AST) {
            super();
            value && (value.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EqualsValueClause;
        }
    }

    export class PrefixUnaryExpression extends AST {
        constructor(private _nodeType: SyntaxKind, public operand: AST) {
            super();
            operand && (operand.parent = this);
        }

        public kind(): SyntaxKind {
            return this._nodeType;
        }

        public structuralEquals(ast: PrefixUnaryExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.operand, ast.operand, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ArrayLiteralExpression extends AST {
        constructor(public expressions: ISeparatedSyntaxList2) {
            super();
            expressions && (expressions.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArrayLiteralExpression;
        }

        public structuralEquals(ast: ArrayLiteralExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expressions, ast.expressions, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class OmittedExpression extends AST {
        public kind(): SyntaxKind {
            return SyntaxKind.OmittedExpression;
        }

        public structuralEquals(ast: CatchClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ParenthesizedExpression extends AST {
        constructor(public openParenTrailingComments: Comment[], public expression: AST) {
            super();
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParenthesizedExpression;
        }

        public structuralEquals(ast: ParenthesizedExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export interface ICallExpression extends IASTSpan {
        expression: AST;
        argumentList: ArgumentList;
    }

    export class SimpleArrowFunctionExpression extends AST {
        constructor(public identifier: Identifier, public block: Block, public expression: AST) {
            super();
            identifier && (identifier.parent = this);
            block && (block.parent = this);
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SimpleArrowFunctionExpression;
        }

        public isExpression() {
            return true;
        }
    }

    export class ParenthesizedArrowFunctionExpression extends AST {
        constructor(public callSignature: CallSignature, public block: Block, public expression: AST) {
            super();
            callSignature && (callSignature.parent = this);
            block && (block.parent = this);
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParenthesizedArrowFunctionExpression;
        }

        public isExpression() {
            return true;
        }
    }

    export class QualifiedName extends AST {
        constructor(public left: AST, public right: Identifier) {
            super();
            left && (left.parent = this);
            right && (right.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.QualifiedName;
        }

        public structuralEquals(ast: QualifiedName, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.left, ast.left, includingPosition) &&
                structuralEquals(this.right, ast.right, includingPosition);
        }
    }

    export class ParameterList extends AST {
        constructor(public openParenTrailingComments: Comment[], public parameters: ISeparatedSyntaxList2) {
            super();
            parameters && (parameters.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ParameterList;
        }
    }

    export class ConstructorType extends AST {
        constructor(public typeParameterList: TypeParameterList, public parameterList: ParameterList, public type: AST) {
            super();
            typeParameterList && (typeParameterList.parent = this);
            parameterList && (parameterList.parent = this);
            type && (type.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructorType;
        }
    }

    export class FunctionType extends AST {
        constructor(public typeParameterList: TypeParameterList, public parameterList: ParameterList, public type: AST) {
            super();
            typeParameterList && (typeParameterList.parent = this);
            parameterList && (parameterList.parent = this);
            type && (type.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionType;
        }
    }

    export class ObjectType extends AST {
        constructor(public typeMembers: ISeparatedSyntaxList2) {
            super();
            typeMembers && (typeMembers.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectType;
        }

        public structuralEquals(ast: ObjectType, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.typeMembers, ast.typeMembers, includingPosition);
        }
    }

    export class ArrayType extends AST {
        constructor(public type: AST) {
            super();
            type && (type.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArrayType;
        }

        public structuralEquals(ast: ArrayType, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.type, ast.type, includingPosition);
        }
    }

    export class TypeArgumentList extends AST {
        constructor(public typeArguments: ISeparatedSyntaxList2) {
            super();
            typeArguments && (typeArguments.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeArgumentList;
        }
    }

    export class GenericType extends AST {
        constructor(public name: AST, public typeArgumentList: TypeArgumentList) {
            super();
            name && (name.parent = this);
            typeArgumentList && (typeArgumentList.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.GenericType;
        }

        public structuralEquals(ast: GenericType, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.name, ast.name, includingPosition) &&
                structuralEquals(this.typeArgumentList, ast.typeArgumentList, includingPosition);
        }
    }

    export class TypeQuery extends AST {
        constructor(public name: AST) {
            super();
            name && (name.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeQuery;
        }

        public structuralEquals(ast: TypeQuery, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.name, ast.name, includingPosition);
        }
    }

    export class Block extends AST {
        constructor(public statements: ISyntaxList2, public closeBraceLeadingComments: Comment[], public closeBraceToken: IASTSpan) {
            super();
            statements && (statements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Block;
        }

        public structuralEquals(ast: Block, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.statements, ast.statements, includingPosition);
        }
    }

    export class Parameter extends AST {
        constructor(public dotDotDotToken: ASTSpan, public modifiers: PullElementFlags[], public identifier: Identifier, public questionToken: ASTSpan, public typeAnnotation: TypeAnnotation, public equalsValueClause: EqualsValueClause) {
            super();
            identifier && (identifier.parent = this);
            typeAnnotation && (typeAnnotation.parent = this);
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Parameter;
        }
    }

    export class MemberAccessExpression extends AST {
        constructor(public expression: AST, public name: Identifier) {
            super();
            expression && (expression.parent = this);
            name && (name.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberAccessExpression;
        }

        public structuralEquals(ast: MemberAccessExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition) &&
                structuralEquals(this.name, ast.name, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class PostfixUnaryExpression extends AST {
        constructor(private _nodeType: SyntaxKind, public operand: AST) {
            super();
            operand && (operand.parent = this);
        }

        public kind(): SyntaxKind {
            return this._nodeType;
        }

        public structuralEquals(ast: PostfixUnaryExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.operand, ast.operand, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ElementAccessExpression extends AST {
        constructor(public expression: AST, public argumentExpression: AST) {
            super();
            expression && (expression.parent = this);
            argumentExpression && (argumentExpression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ElementAccessExpression;
        }

        public structuralEquals(ast: ElementAccessExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition) &&
                structuralEquals(this.argumentExpression, ast.argumentExpression, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class InvocationExpression extends AST implements ICallExpression {
        constructor(public expression: AST, public argumentList: ArgumentList) {
            super();
            expression && (expression.parent = this);
            argumentList && (argumentList.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.InvocationExpression;
        }

        public structuralEquals(ast: InvocationExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition) &&
                structuralEquals(this.argumentList, ast.argumentList, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ArgumentList extends AST {
        public arguments: ISeparatedSyntaxList2;

        constructor(public typeArgumentList: TypeArgumentList, _arguments: ISeparatedSyntaxList2, public closeParenToken: ASTSpan) {
            super();
            this.arguments = _arguments;

            typeArgumentList && (typeArgumentList.parent = this);
            _arguments && (_arguments.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ArgumentList;
        }
    }

    export class BinaryExpression extends AST {
        constructor(private _nodeType: SyntaxKind, public left: AST, public right: AST) {
            super();
            left && (left.parent = this);
            right && (right.parent = this);
        }

        public kind(): SyntaxKind {
            return this._nodeType;
        }

        public structuralEquals(ast: BinaryExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.left, ast.left, includingPosition) &&
                structuralEquals(this.right, ast.right, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ConditionalExpression extends AST {
        constructor(public condition: AST, public whenTrue: AST, public whenFalse: AST) {
            super();
            condition && (condition.parent = this);
            whenTrue && (whenTrue.parent = this);
            whenFalse && (whenFalse.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConditionalExpression;
        }

        public structuralEquals(ast: ConditionalExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.condition, ast.condition, includingPosition) &&
                structuralEquals(this.whenTrue, ast.whenTrue, includingPosition) &&
                structuralEquals(this.whenFalse, ast.whenFalse, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ConstructSignature extends AST {
        constructor(public callSignature: CallSignature) {
            super();
            callSignature && (callSignature.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructSignature;
        }
    }

    export class MethodSignature extends AST {
        constructor(public propertyName: IASTToken, public questionToken: ASTSpan, public callSignature: CallSignature) {
            super();
            propertyName && (propertyName.parent = this);
            callSignature && (callSignature.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MethodSignature;
        }
    }

    export class IndexSignature extends AST {
        constructor(public parameter: Parameter, public typeAnnotation: TypeAnnotation) {
            super();
            parameter && (parameter.parent = this);
            typeAnnotation && (typeAnnotation.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IndexSignature;
        }
    }

    export class PropertySignature extends AST {
        constructor(public propertyName: IASTToken, public questionToken: ASTSpan, public typeAnnotation: TypeAnnotation) {
            super();
            propertyName && (propertyName.parent = this);
            typeAnnotation && (typeAnnotation.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.PropertySignature;
        }
    }

    export class CallSignature extends AST {
        constructor(public typeParameterList: TypeParameterList, public parameterList: ParameterList, public typeAnnotation: TypeAnnotation) {
            super();
            typeParameterList && (typeParameterList.parent = this);
            parameterList && (parameterList.parent = this);
            typeAnnotation && (typeAnnotation.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CallSignature;
        }
    }

    export class TypeParameter extends AST {
        constructor(public identifier: Identifier, public constraint: Constraint) {
            super();
            identifier && (identifier.parent = this);
            constraint && (constraint.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeParameter;
        }

        public structuralEquals(ast: TypeParameter, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.identifier, ast.identifier, includingPosition) &&
                structuralEquals(this.constraint, ast.constraint, includingPosition);
        }
    }

    export class Constraint extends AST {
        constructor(public type: AST) {
            super();
            type && (type.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.Constraint;
        }
    }

    export class ElseClause extends AST {
        constructor(public statement: AST) {
            super();
            statement && (statement.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ElseClause;
        }

        public structuralEquals(ast: ElseClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition);
        }
    }

    export class IfStatement extends AST {
        constructor(public condition: AST, public statement: AST, public elseClause: ElseClause) {
            super();
            condition && (condition.parent = this);
            statement && (statement.parent = this);
            elseClause && (elseClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IfStatement;
        }

        public structuralEquals(ast: IfStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.condition, ast.condition, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition) &&
                structuralEquals(this.elseClause, ast.elseClause, includingPosition);
        }
    }

    export class ExpressionStatement extends AST {
        constructor(public expression: AST) {
            super();
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ExpressionStatement;
        }

        public structuralEquals(ast: ExpressionStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }
    }

    export class ConstructorDeclaration extends AST {
        constructor(public callSignature: CallSignature, public block: Block) {
            super();
            callSignature && (callSignature.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ConstructorDeclaration;
        }
    }

    export class MemberFunctionDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public propertyName: IASTToken, public callSignature: CallSignature, public block: Block) {
            super();
            propertyName && (propertyName.parent = this);
            callSignature && (callSignature.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberFunctionDeclaration;
        }
    }

    export class GetAccessor extends AST {
        constructor(public modifiers: PullElementFlags[], public propertyName: IASTToken, public parameterList: ParameterList, public typeAnnotation: TypeAnnotation, public block: Block) {
            super();
            propertyName && (propertyName.parent = this);
            parameterList && (parameterList.parent = this);
            typeAnnotation && (typeAnnotation.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.GetAccessor;
        }
    }

    export class SetAccessor extends AST {
        constructor(public modifiers: PullElementFlags[], public propertyName: IASTToken, public parameterList: ParameterList, public block: Block) {
            super();
            propertyName && (propertyName.parent = this);
            parameterList && (parameterList.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SetAccessor;
        }
    }

    export class MemberVariableDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public variableDeclarator: VariableDeclarator) {
            super();
            variableDeclarator && (variableDeclarator.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.MemberVariableDeclaration;
        }
    }

    export class IndexMemberDeclaration extends AST {
        constructor(public indexSignature: IndexSignature) {
            super();
            indexSignature && (indexSignature.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.IndexMemberDeclaration;
        }
    }

    export class ThrowStatement extends AST {
        constructor(public expression: AST) {
            super();
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ThrowStatement;
        }

        public structuralEquals(ast: ThrowStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }
    }

    export class ReturnStatement extends AST {
        constructor(public expression: AST) {
            super();
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ReturnStatement;
        }

        public structuralEquals(ast: ReturnStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }
    }

    export class ObjectCreationExpression extends AST implements ICallExpression {
        constructor(public expression: AST, public argumentList: ArgumentList) {
            super();
            expression && (expression.parent = this);
            argumentList && (argumentList.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectCreationExpression;
        }

        public structuralEquals(ast: ObjectCreationExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition) &&
                structuralEquals(this.argumentList, ast.argumentList, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class SwitchStatement extends AST {
        constructor(public expression: AST, public closeParenToken: ASTSpan, public switchClauses: ISyntaxList2) {
            super();
            expression && (expression.parent = this);
            switchClauses && (switchClauses.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SwitchStatement;
        }

        public structuralEquals(ast: SwitchStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.switchClauses, ast.switchClauses, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }
    }

    export class CaseSwitchClause extends AST {
        constructor(public expression: AST, public statements: ISyntaxList2) {
            super();
            expression && (expression.parent = this);
            statements && (statements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CaseSwitchClause;
        }

        public structuralEquals(ast: CaseSwitchClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition) &&
                structuralEquals(this.statements, ast.statements, includingPosition);
        }
    }

    export class DefaultSwitchClause extends AST {
        constructor(public statements: ISyntaxList2) {
            super();
            statements && (statements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DefaultSwitchClause;
        }

        public structuralEquals(ast: DefaultSwitchClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.statements, ast.statements, includingPosition);
        }
    }

    export class BreakStatement extends AST {
        constructor(public identifier: Identifier) {
            super();
        }

        public kind(): SyntaxKind {
            return SyntaxKind.BreakStatement;
        }

        public structuralEquals(ast: BreakStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition);
        }
    }

    export class ContinueStatement extends AST {
        constructor(public identifier: Identifier) {
            super();
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ContinueStatement;
        }

        public structuralEquals(ast: ContinueStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition);
        }
    }

    export class ForStatement extends AST {
        constructor(public variableDeclaration: VariableDeclaration, public initializer: AST, public condition: AST, public incrementor: AST, public statement: AST) {
            super();
            variableDeclaration && (variableDeclaration.parent = this);
            initializer && (initializer.parent = this);
            condition && (condition.parent = this);
            incrementor && (incrementor.parent = this);
            statement && (statement.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ForStatement;
        }

        public structuralEquals(ast: ForStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.initializer, ast.initializer, includingPosition) &&
                structuralEquals(this.condition, ast.condition, includingPosition) &&
                structuralEquals(this.incrementor, ast.incrementor, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition);
        }
    }

    export class ForInStatement extends AST {
        constructor(public variableDeclaration: VariableDeclaration, public left: AST, public expression: AST, public statement: AST) {
            super();
            variableDeclaration && (variableDeclaration.parent = this);
            left && (left.parent = this);
            expression && (expression.parent = this);
            statement && (statement.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ForInStatement;
        }

        public structuralEquals(ast: ForInStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.variableDeclaration, ast.variableDeclaration, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition);
        }
    }

    export class WhileStatement extends AST {
        constructor(public condition: AST, public statement: AST) {
            super();
            condition && (condition.parent = this);
            statement && (statement.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.WhileStatement;
        }

        public structuralEquals(ast: WhileStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.condition, ast.condition, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition);
        }
    }

    export class WithStatement extends AST {
        constructor(public condition: AST, public statement: AST) {
            super();
            condition && (condition.parent = this);
            statement && (statement.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.WithStatement;
        }

        public structuralEquals(ast: WithStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.condition, ast.condition, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition);
        }
    }

    export class EnumDeclaration extends AST {
        constructor(public modifiers: PullElementFlags[], public identifier: Identifier, public enumElements: ISeparatedSyntaxList2) {
            super();
            identifier && (identifier.parent = this);
            enumElements && (enumElements.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EnumDeclaration;
        }
    }

    export class EnumElement extends AST {
        constructor(public propertyName: IASTToken, public equalsValueClause: EqualsValueClause) {
            super();
            propertyName && (propertyName.parent = this);
            equalsValueClause && (equalsValueClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.EnumElement;
        }
    }

    export class CastExpression extends AST {
        constructor(public type: AST, public expression: AST) {
            super();
            type && (type.parent = this);
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CastExpression;
        }

        public structuralEquals(ast: CastExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.type, ast.type, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class ObjectLiteralExpression extends AST {
        constructor(public propertyAssignments: ISeparatedSyntaxList2) {
            super();
            propertyAssignments && (propertyAssignments.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.ObjectLiteralExpression;
        }

        public structuralEquals(ast: ObjectLiteralExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.propertyAssignments, ast.propertyAssignments, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class SimplePropertyAssignment extends AST {
        constructor(public propertyName: Identifier, public expression: AST) {
            super();
            propertyName && (propertyName.parent = this);
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.SimplePropertyAssignment;
        }
    }

    export class FunctionPropertyAssignment extends AST {
        constructor(public propertyName: Identifier, public callSignature: CallSignature, public block: Block) {
            super();
            propertyName && (propertyName.parent = this);
            callSignature && (callSignature.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionPropertyAssignment;
        }
    }

    export class FunctionExpression extends AST {
        constructor(public identifier: Identifier, public callSignature: CallSignature, public block: Block) {
            super();
            identifier && (identifier.parent = this);
            callSignature && (callSignature.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FunctionExpression;
        }

        public isExpression() {
            return true;
        }
    }

    export class EmptyStatement extends AST {
        public kind(): SyntaxKind {
            return SyntaxKind.EmptyStatement;
        }

        public structuralEquals(ast: CatchClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition);
        }
    }

    export class TryStatement extends AST {
        constructor(public block: Block, public catchClause: CatchClause, public finallyClause: FinallyClause) {
            super();
            block && (block.parent = this);
            catchClause && (catchClause.parent = this);
            finallyClause && (finallyClause.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TryStatement;
        }

        public structuralEquals(ast: TryStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                   structuralEquals(this.block, ast.block, includingPosition) &&
                   structuralEquals(this.catchClause, ast.catchClause, includingPosition) &&
                   structuralEquals(this.finallyClause, ast.finallyClause, includingPosition);
        }
    }

    export class CatchClause extends AST {
        constructor(public identifier: Identifier, public typeAnnotation: TypeAnnotation, public block: Block) {
            super();
            identifier && (identifier.parent = this);
            typeAnnotation && (typeAnnotation.parent = this);
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.CatchClause;
        }

        public structuralEquals(ast: CatchClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                   structuralEquals(this.identifier, ast.identifier, includingPosition) &&
                   structuralEquals(this.typeAnnotation, ast.typeAnnotation, includingPosition) &&
                   structuralEquals(this.block, ast.block, includingPosition);
        }
    }

    export class FinallyClause extends AST {
        constructor(public block: Block) {
            super();
            block && (block.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.FinallyClause;
        }

        public structuralEquals(ast: CatchClause, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.block, ast.block, includingPosition);
        }
    }

    export class LabeledStatement extends AST {
        constructor(public identifier: Identifier, public statement: AST) {
            super();
            identifier && (identifier.parent = this);
            statement && (statement.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.LabeledStatement;
        }

        public structuralEquals(ast: LabeledStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.identifier, ast.identifier, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition);
        }
    }

    export class DoStatement extends AST {
        constructor(public statement: AST, public whileKeyword: ASTSpan, public condition: AST) {
            super();
            statement && (statement.parent = this);
            condition && (condition.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DoStatement;
        }

        public structuralEquals(ast: DoStatement, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.statement, ast.statement, includingPosition) &&
                structuralEquals(this.condition, ast.condition, includingPosition);
        }
    }

    export class TypeOfExpression extends AST {
        constructor(public expression: AST) {
            super();
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.TypeOfExpression;
        }

        public structuralEquals(ast: TypeOfExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class DeleteExpression extends AST {
        constructor(public expression: AST) {
            super();
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.DeleteExpression;
        }

        public structuralEquals(ast: DeleteExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class VoidExpression extends AST {
        constructor(public expression: AST) {
            super();
            expression && (expression.parent = this);
        }

        public kind(): SyntaxKind {
            return SyntaxKind.VoidExpression;
        }

        public structuralEquals(ast: VoidExpression, includingPosition: boolean): boolean {
            return super.structuralEquals(ast, includingPosition) &&
                structuralEquals(this.expression, ast.expression, includingPosition);
        }

        public isExpression() {
            return true;
        }
    }

    export class DebuggerStatement extends AST {
        public kind(): SyntaxKind {
            return SyntaxKind.DebuggerStatement;
        }
    }

    export class Comment {
        constructor(private _trivia: ISyntaxTrivia,
                    public endsLine: boolean,
                    public _start: number,
                    public _end: number) {
        }

        public start(): number {
            return this._start;
        }

        public end(): number {
            return this._end;
        }

        public fullText(): string {
            return this._trivia.fullText();
        }

        public kind(): SyntaxKind {
            return this._trivia.kind();
        }

        public structuralEquals(ast: Comment, includingPosition: boolean): boolean {
            if (includingPosition) {
                if (this.start() !== ast.start() || this.end() !== ast.end()) {
                    return false;
                }
            }

            return this._trivia.fullText() === ast._trivia.fullText() &&
                   this.endsLine === ast.endsLine;
        }
    }
}