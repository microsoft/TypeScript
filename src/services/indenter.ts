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

module TypeScript.Services {
    export class Indenter {
        public static getIndentation(node: TypeScript.SourceUnitSyntax, soruceText: TypeScript.IScriptSnapshot, position: number, editorOptions: TypeScript.Services.EditorOptions): number {
            var indentation = 0;
            var currentToken = TypeScript.findToken(node, position);
            var currentNode: TypeScript.ISyntaxElement = currentToken;

            if (currentToken.kind() === TypeScript.SyntaxKind.EndOfFileToken) {
                // Ignore EOF tokens, pick the one before it
                currentNode = previousToken(currentToken);
            }
            else if (Indenter.belongsToBracket(soruceText, currentToken, position)) {
                // Let braces and brackets take the indentation of thier parents
                currentNode = currentToken.parent;
            }

            if (currentNode === null) {
                return indentation;
            }
            
            // Check if this is a valid node to provide indentation
            if (currentNode.kind() === TypeScript.SyntaxKind.StringLiteral ||
                currentNode.kind() === TypeScript.SyntaxKind.RegularExpressionLiteral) {
                return indentation;
            }

            var currentElement = currentNode;
            var parent = currentNode.parent;

            while (parent !== null) {
                // Skip nodes that start at the position, these will have the indentation level of thier parent
                if (fullStart(parent) !== fullStart(currentNode)) {
                    if (Indenter.isInContainerNode(parent, currentElement)) {
                        indentation += editorOptions.IndentSize;
                    }
                    else {
                        var listIndentation = Indenter.getCustomListIndentation(parent, currentElement);
                        if (listIndentation !== -1) {
                            // Found a list node with special indentation, If the list items span multiple lines, we want 
                            // to use the user-specified indentation; return.
                            return indentation + listIndentation;
                        }
                    }
                }
                currentNode = parent;
                currentElement = parent;
                parent = parent.parent;
            }
            
            return indentation;
        }

        private static belongsToBracket(sourceText: TypeScript.IScriptSnapshot, token: TypeScript.ISyntaxToken, position: number): boolean {
            switch (token.kind()) {
                case TypeScript.SyntaxKind.OpenBraceToken:
                case TypeScript.SyntaxKind.CloseBraceToken:
                case TypeScript.SyntaxKind.OpenParenToken:
                case TypeScript.SyntaxKind.CloseParenToken:
                case TypeScript.SyntaxKind.OpenBracketToken:
                case TypeScript.SyntaxKind.CloseBracketToken:
                    // the current token is a bracket, check if the current position is separated from it by a new line
                    if (position < start(token)) {
                        var text = sourceText.getText(position, start(token));
                        for(var i = 0; i< text.length; i++){
                            if (TypeScript.CharacterInfo.isLineTerminator(text.charCodeAt(i))) {
                                return false;
                            }    
                        }
                    }
                    return true;
            }
            return false;
        }

        private static isInContainerNode(parent: TypeScript.ISyntaxElement, element: TypeScript.ISyntaxElement): boolean {
            switch (parent.kind()) {
                case TypeScript.SyntaxKind.ClassDeclaration:
                case TypeScript.SyntaxKind.ModuleDeclaration:
                case TypeScript.SyntaxKind.EnumDeclaration:
                case TypeScript.SyntaxKind.ImportDeclaration:
                case TypeScript.SyntaxKind.Block:
                case TypeScript.SyntaxKind.SwitchStatement:
                case TypeScript.SyntaxKind.CaseSwitchClause:
                case TypeScript.SyntaxKind.DefaultSwitchClause:
                    return true;

                case TypeScript.SyntaxKind.ObjectType:
                    return true;

                case TypeScript.SyntaxKind.InterfaceDeclaration:
                    return element.kind() !== TypeScript.SyntaxKind.ObjectType;

                case TypeScript.SyntaxKind.FunctionDeclaration:
                case TypeScript.SyntaxKind.MemberFunctionDeclaration:
                case TypeScript.SyntaxKind.GetAccessor:
                case TypeScript.SyntaxKind.SetAccessor:
                case TypeScript.SyntaxKind.FunctionExpression:
                case TypeScript.SyntaxKind.CatchClause:
                case TypeScript.SyntaxKind.FinallyClause:
                case TypeScript.SyntaxKind.FunctionDeclaration:
                case TypeScript.SyntaxKind.ConstructorDeclaration:
                case TypeScript.SyntaxKind.ForStatement:
                case TypeScript.SyntaxKind.ForInStatement:
                case TypeScript.SyntaxKind.WhileStatement:
                case TypeScript.SyntaxKind.DoStatement:
                case TypeScript.SyntaxKind.WithStatement:
                case TypeScript.SyntaxKind.IfStatement:
                case TypeScript.SyntaxKind.ElseClause:
                    // The block has already been conted before, ignore the container node
                    return element.kind() !== TypeScript.SyntaxKind.Block;

                case TypeScript.SyntaxKind.TryStatement:
                    // If inside the try body, the block element will take care of the indentation
                    // If not, we do not want to indent, as the next token would probally be catch or finally
                    // and we want these on the same indentation level.
                    return false;
                default:
                    return isNode(parent) && SyntaxUtilities.isStatement(parent);
            }
        }

        private static getCustomListIndentation(list: TypeScript.ISyntaxElement, element: TypeScript.ISyntaxElement): number {
            switch (list.kind()) {
                case TypeScript.SyntaxKind.SeparatedList:
                    // If it is the first in the list, let it have its parents indentation; no custom indentation here.
                    for (var i = 0, n = childCount(list); i < n ; i++) {
                        var child = childAt(list, i);
                        if (child !== null && child === element)
                            return Indenter.getListItemIndentation(list, i - 1);
                    }
                    break;

                case TypeScript.SyntaxKind.ArgumentList:
                    // The separated list has been handled in the previous case, this is just if we are after
                    // the last element of the list, we want to get the indentation of the last element of the list
                    var argumentList = <TypeScript.ArgumentListSyntax> list;
                    var _arguments = argumentList.arguments;
                    if (_arguments !== null && argumentList.closeParenToken === element) {
                        return Indenter.getListItemIndentation(_arguments, childCount(_arguments) - 1);
                    }
                    break;

                case TypeScript.SyntaxKind.ParameterList:
                    // The separated list has been handled in the previous case, this is just if we are after
                    // the last element of the list, we want to get the indentation of the last element of the list
                    var parameterList = <TypeScript.ParameterListSyntax> list;
                    var parameters = parameterList.parameters;
                    if (parameters !== null && parameterList.closeParenToken === element) {
                        return Indenter.getListItemIndentation(parameters, childCount(parameters) - 1);
                    }
                    break;

                case TypeScript.SyntaxKind.TypeArgumentList:
                    // The separated list has been handled in the previous case, this is just if we are after
                    // the last element of the list, we want to get the indentation of the last element of the list
                    var typeArgumentList = <TypeScript.TypeArgumentListSyntax> list;
                    var typeArguments = typeArgumentList.typeArguments;
                    if (typeArguments !== null && typeArgumentList.greaterThanToken === element) {
                        return Indenter.getListItemIndentation(typeArguments, childCount(typeArguments) - 1);
                    }
                    break;

                case TypeScript.SyntaxKind.TypeParameterList:
                    // The separated list has been handled in the previous case, this is just if we are after
                    // the last element of the list, we want to get the indentation of the last element of the list
                    var typeParameterList = <TypeScript.TypeParameterListSyntax> list;
                    var typeParameters = typeParameterList.typeParameters;
                    if (typeParameters !== null && typeParameterList.greaterThanToken === element) {
                        return Indenter.getListItemIndentation(typeParameters, childCount(typeParameters) - 1);
                    }
                    break;
            }
            return -1;
        }

        private static getListItemIndentation(list: TypeScript.ISyntaxElement, elementIndex: number): number {
            for (var i = elementIndex; i > 0 ; i--) {
                var child = childAt(list, i);
                var previousChild = childAt(list, i - 1);
                if ((child !== null && firstToken(child).leadingTrivia().hasNewLine()) ||
                    (previousChild !== null && lastToken(previousChild).trailingTrivia().hasNewLine())) {

                    // TODO: get the trivia after new line
                    return leadingTriviaWidth(child);
                }
            }
            return -1;
        }
    }
}
