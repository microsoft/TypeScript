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

module TypeScript.ASTHelpers {
    //export function scriptIsElided(sourceUnit: SourceUnitSyntax): boolean {
    //    return isDTSFile(sourceUnit.syntaxTree.fileName()) || moduleMembersAreElided(sourceUnit.moduleElements);
    //}

    //export function moduleIsElided(declaration: ModuleDeclarationSyntax): boolean {
    //    return hasModifier(declaration.modifiers, PullElementFlags.Ambient) || moduleMembersAreElided(declaration.moduleElements);
    //}

    //function moduleMembersAreElided(members: IModuleElementSyntax[]): boolean {
    //    for (var i = 0, n = members.length; i < n; i++) {
    //        var member = members[i];

    //        // We should emit *this* module if it contains any non-interface types. 
    //        // Caveat: if we have contain a module, then we should be emitted *if we want to
    //        // emit that inner module as well.
    //        if (member.kind() === SyntaxKind.ModuleDeclaration) {
    //            if (!moduleIsElided(<ModuleDeclarationSyntax>member)) {
    //                return false;
    //            }
    //        }
    //        else if (member.kind() !== SyntaxKind.InterfaceDeclaration) {
    //            return false;
    //        }
    //    }

    //    return true;
    //}

    //export function enumIsElided(declaration: EnumDeclarationSyntax): boolean {
    //    if (hasModifier(declaration.modifiers, PullElementFlags.Ambient)) {
    //        return true;
    //    }

    //    return false;
    //}

     export function isValidAstNode(ast: ISyntaxElement): boolean {
         return ast && !isShared(ast) && start(ast) !== -1 && end(ast) !== -1;
     }

     export function isValidSpan(ast: ISpan): boolean {
        if (!ast)
            return false;

        if (ast.start() === -1 || ast.end() === -1)
            return false;

        return true;
    }

    ///
    /// Return the ISyntaxElement containing "position"
    ///
    export function getAstAtPosition(script: ISyntaxElement, pos: number, useTrailingTriviaAsLimChar: boolean = true, forceInclusive: boolean = false): ISyntaxElement {
        var top: ISyntaxElement = null;

        var pre = function (cur: ISyntaxElement, walker: IAstWalker) {
            if (!isShared(cur) && isValidAstNode(cur)) {
                var isInvalid1 = cur.kind() === SyntaxKind.ExpressionStatement && width(cur) === 0;

                if (isInvalid1) {
                    walker.options.goChildren = false;
                }
                else {
                    // Add "cur" to the stack if it contains our position
                    // For "identifier" nodes, we need a special case: A position equal to "limChar" is
                    // valid, since the position corresponds to a caret position (in between characters)
                    // For example:
                    //  bar
                    //  0123
                    // If "position === 3", the caret is at the "right" of the "r" character, which should be considered valid
                    var inclusive =
                        forceInclusive ||
                        cur.kind() === SyntaxKind.IdentifierName ||
                        cur.kind() === SyntaxKind.MemberAccessExpression ||
                        cur.kind() === SyntaxKind.QualifiedName ||
                        //cur.kind() === SyntaxKind.TypeRef ||
                        cur.kind() === SyntaxKind.VariableDeclaration ||
                        cur.kind() === SyntaxKind.VariableDeclarator ||
                        cur.kind() === SyntaxKind.InvocationExpression ||
                        pos === end(script) + lastToken(script).trailingTriviaWidth(); // Special "EOF" case

                    var minChar = start(cur);
                    var limChar = end(cur) + (useTrailingTriviaAsLimChar ? trailingTriviaWidth(cur) : 0) + (inclusive ? 1 : 0);
                    if (pos >= minChar && pos < limChar) {

                        // Ignore empty lists
                        if ((cur.kind() !== SyntaxKind.List && cur.kind() !== SyntaxKind.SeparatedList) || end(cur) > start(cur)) {
                            // TODO: Since ISyntaxElement is sometimes not correct wrt to position, only add "cur" if it's better
                            //       than top of the stack.
                            if (top === null) {
                                top = cur;
                            }
                            else if (start(cur) >= start(top) &&
                                (end(cur) + (useTrailingTriviaAsLimChar ? trailingTriviaWidth(cur) : 0)) <= (end(top) + (useTrailingTriviaAsLimChar ? trailingTriviaWidth(top) : 0))) {
                                // this new node appears to be better than the one we're 
                                // storing.  Make this the new node.

                                // However, If the current top is a missing identifier, we 
                                // don't want to replace it with another missing identifier.
                                // We want to return the first missing identifier found in a
                                // depth first walk of  the tree.
                                if (width(top) !== 0 || width(cur) !== 0) {
                                    top = cur;
                                }
                            }
                        }
                    }

                    // Don't go further down the tree if pos is outside of [minChar, limChar]
                    walker.options.goChildren = (minChar <= pos && pos <= limChar);
                }
            }
        };

        getAstWalkerFactory().walk(script, pre);
        return top;
    }

    export function getExtendsHeritageClause(clauses: HeritageClauseSyntax[]): HeritageClauseSyntax {
        return getHeritageClause(clauses, SyntaxKind.ExtendsHeritageClause);
    }

    export function getImplementsHeritageClause(clauses: HeritageClauseSyntax[]): HeritageClauseSyntax {
        return getHeritageClause(clauses, SyntaxKind.ImplementsHeritageClause);
    }

    function getHeritageClause(clauses: HeritageClauseSyntax[], kind: SyntaxKind): HeritageClauseSyntax {
        if (clauses) {
            for (var i = 0, n = clauses.length; i < n; i++) {
                var child = clauses[i];

                if (child.typeNames.length > 0 && child.kind() === kind) {
                    return child;
                }
            }
        }

        return null;
    }

    export function isCallExpression(ast: ISyntaxElement): boolean {
        return (ast && ast.kind() === SyntaxKind.InvocationExpression) ||
            (ast && ast.kind() === SyntaxKind.ObjectCreationExpression);
    }

    export function isCallExpressionTarget(ast: ISyntaxElement): boolean {
        return !!getCallExpressionTarget(ast);
    }

    export function getCallExpressionTarget(ast: ISyntaxElement): ISyntaxElement {
        if (!ast) {
            return null;
        }

        var current = ast;

        while (current && current.parent) {
            if (current.parent.kind() === SyntaxKind.MemberAccessExpression &&
                (<MemberAccessExpressionSyntax>current.parent).name === current) {
                current = current.parent;
                continue;
            }

            break;
        }

        if (current && current.parent) {
            if (current.parent.kind() === SyntaxKind.InvocationExpression || current.parent.kind() === SyntaxKind.ObjectCreationExpression) {
                return current === (<InvocationExpressionSyntax>current.parent).expression ? current : null;
            }
        }
        return null;
    }

    function isNameOfSomeDeclaration(ast: ISyntaxElement) {
        if (ast === null || ast.parent === null) {
            return false;
        }
        if (ast.kind() !== SyntaxKind.IdentifierName) {
            return false;
        }

        switch (ast.parent.kind()) {
            case SyntaxKind.ClassDeclaration:
                return (<ClassDeclarationSyntax>ast.parent).identifier === ast;
            case SyntaxKind.InterfaceDeclaration:
                return (<InterfaceDeclarationSyntax>ast.parent).identifier === ast;
            case SyntaxKind.EnumDeclaration:
                return (<EnumDeclarationSyntax>ast.parent).identifier === ast;
            case SyntaxKind.ModuleDeclaration:
                return (<ModuleDeclarationSyntax>ast.parent).name === ast || (<ModuleDeclarationSyntax>ast.parent).stringLiteral === ast;
            case SyntaxKind.VariableDeclarator:
                return (<VariableDeclaratorSyntax>ast.parent).propertyName === ast;
            case SyntaxKind.FunctionDeclaration:
                return (<FunctionDeclarationSyntax>ast.parent).identifier === ast;
            case SyntaxKind.MemberFunctionDeclaration:
                return (<MemberFunctionDeclarationSyntax>ast.parent).propertyName === ast;
            case SyntaxKind.Parameter:
                return (<ParameterSyntax>ast.parent).identifier === ast;
            case SyntaxKind.TypeParameter:
                return (<TypeParameterSyntax>ast.parent).identifier === ast;
            case SyntaxKind.SimplePropertyAssignment:
                return (<SimplePropertyAssignmentSyntax>ast.parent).propertyName === ast;
            case SyntaxKind.FunctionPropertyAssignment:
                return (<FunctionPropertyAssignmentSyntax>ast.parent).propertyName === ast;
            case SyntaxKind.EnumElement:
                return (<EnumElementSyntax>ast.parent).propertyName === ast;
            case SyntaxKind.ImportDeclaration:
                return (<ImportDeclarationSyntax>ast.parent).identifier === ast;
            case SyntaxKind.MethodSignature:
                return (<MethodSignatureSyntax>ast.parent).propertyName === ast;
            case SyntaxKind.PropertySignature:
                return (<MethodSignatureSyntax>ast.parent).propertyName === ast;
        }

        return false;
    }

    export function isDeclarationASTOrDeclarationNameAST(ast: ISyntaxElement) {
        return isNameOfSomeDeclaration(ast) || ASTHelpers.isDeclarationAST(ast);
    }

    export function getEnclosingParameterForInitializer(ast: ISyntaxElement): ParameterSyntax {
        var current = ast;
        while (current) {
            switch (current.kind()) {
                case SyntaxKind.EqualsValueClause:
                    if (current.parent && current.parent.kind() === SyntaxKind.Parameter) {
                        return <ParameterSyntax>current.parent;
                    }
                    break;
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                    // exit early
                    return null;
            }

            current = current.parent;
        }
        return null;
    }

    export function getEnclosingMemberDeclaration(ast: ISyntaxElement): ISyntaxElement {
        var current = ast;

        while (current) {
            switch (current.kind()) {
                case SyntaxKind.MemberVariableDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.MemberFunctionDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return current;
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                    // exit early
                    return null;
            }
            current = current.parent;
        }

        return null;
    }

    export function isNameOfFunction(ast: ISyntaxElement) {
        return ast
            && ast.parent
            && ast.kind() === SyntaxKind.IdentifierName
            && ast.parent.kind() === SyntaxKind.FunctionDeclaration
            && (<FunctionDeclarationSyntax>ast.parent).identifier === ast;
    }

    export function isNameOfMemberFunction(ast: ISyntaxElement) {
        return ast
            && ast.parent
            && ast.kind() === SyntaxKind.IdentifierName
            && ast.parent.kind() === SyntaxKind.MemberFunctionDeclaration
            && (<MemberFunctionDeclarationSyntax>ast.parent).propertyName === ast;
    }

    export function isNameOfMemberAccessExpression(ast: ISyntaxElement) {
        if (ast &&
            ast.parent &&
            ast.parent.kind() === SyntaxKind.MemberAccessExpression &&
            (<MemberAccessExpressionSyntax>ast.parent).name === ast) {

            return true;
        }

        return false;
    }

    export function isRightSideOfQualifiedName(ast: ISyntaxElement) {
        if (ast &&
            ast.parent &&
            ast.parent.kind() === SyntaxKind.QualifiedName &&
            (<QualifiedNameSyntax>ast.parent).right === ast) {

            return true;
        }

        return false;
    }

    export function parentIsModuleDeclaration(ast: ISyntaxElement) {
        return ast.parent && ast.parent.kind() === SyntaxKind.ModuleDeclaration;
    }

    export function isDeclarationAST(ast: ISyntaxElement): boolean {
        switch (ast.kind()) {
            case SyntaxKind.VariableDeclarator:
                return getVariableStatement(<VariableDeclaratorSyntax>ast) !== null;

            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.SimpleArrowFunctionExpression:
            case SyntaxKind.ParenthesizedArrowFunctionExpression:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ArrayType:
            case SyntaxKind.ObjectType:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.ConstructorDeclaration:
            case SyntaxKind.MemberFunctionDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MemberVariableDeclaration:
            case SyntaxKind.IndexMemberDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumElement:
            case SyntaxKind.SimplePropertyAssignment:
            case SyntaxKind.FunctionPropertyAssignment:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.PropertySignature:
                return true;
            default:
                return false;
        }
    }

    export function preComments(element: ISyntaxElement, text: ISimpleText): Comment[]{
        if (element) {
            switch (element.kind()) {
                case SyntaxKind.VariableStatement:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.IfStatement:
                case SyntaxKind.SimplePropertyAssignment:
                case SyntaxKind.MemberFunctionDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ConstructorDeclaration:
                case SyntaxKind.MemberVariableDeclaration:
                case SyntaxKind.EnumElement:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.FunctionPropertyAssignment:
                case SyntaxKind.Parameter:
                    return convertNodeLeadingComments(element, text);
            }
        }

        return null;
    }

    export function postComments(element: ISyntaxElement, text: ISimpleText): Comment[] {
        if (element) {
            switch (element.kind()) {
                case SyntaxKind.ExpressionStatement:
                    return convertNodeTrailingComments(element, text, /*allowWithNewLine:*/ true);
                case SyntaxKind.VariableStatement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.IfStatement:
                case SyntaxKind.SimplePropertyAssignment:
                case SyntaxKind.MemberFunctionDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ConstructorDeclaration:
                case SyntaxKind.MemberVariableDeclaration:
                case SyntaxKind.EnumElement:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.FunctionPropertyAssignment:
                case SyntaxKind.Parameter:
                    return convertNodeTrailingComments(element, text);
            }
        }

        return null;
    }

    function convertNodeTrailingComments(node: ISyntaxElement, text: ISimpleText, allowWithNewLine = false): Comment[]{
        // Bail out quickly before doing any expensive math computation.
        var _lastToken = lastToken(node);
        if (_lastToken === null || !_lastToken.hasTrailingTrivia()) {
            return null;
        }

        if (!allowWithNewLine && SyntaxUtilities.isLastTokenOnLine(_lastToken, text)) {
            return null;
        }

        return convertComments(_lastToken.trailingTrivia(text), fullStart(node) + fullWidth(node) - _lastToken.trailingTriviaWidth(text));
    }

    function convertNodeLeadingComments(element: ISyntaxElement, text: ISimpleText): Comment[]{
        if (element) {
            return convertTokenLeadingComments(firstToken(element), text);
        }

        return null;
    }

    export function convertTokenLeadingComments(token: ISyntaxToken, text: ISimpleText): Comment[]{
        if (token === null) {
            return null;
        }

        return token.hasLeadingTrivia()
            ? convertComments(token.leadingTrivia(text), token.fullStart())
            : null;
    }

    export function convertTokenTrailingComments(token: ISyntaxToken, text: ISimpleText): Comment[] {
        if (token === null) {
            return null;
        }

        return token.hasTrailingTrivia()
            ? convertComments(token.trailingTrivia(text), fullEnd(token) - token.trailingTriviaWidth(text))
            : null;
    }

    function convertComments(triviaList: ISyntaxTriviaList, commentStartPosition: number): Comment[]{
        var result: Comment[] = null;

        for (var i = 0, n = triviaList.count(); i < n; i++) {
            var trivia = triviaList.syntaxTriviaAt(i);

            if (trivia.isComment()) {
                var hasTrailingNewLine = ((i + 1) < n) && triviaList.syntaxTriviaAt(i + 1).isNewLine();
                result = result || [];
                result.push(convertComment(trivia, commentStartPosition, hasTrailingNewLine));
            }

            commentStartPosition += trivia.fullWidth();
        }

        return result;
    }

    function convertComment(trivia: ISyntaxTrivia, commentStartPosition: number, hasTrailingNewLine: boolean): Comment {
        var comment = new Comment(trivia, hasTrailingNewLine, commentStartPosition, commentStartPosition + trivia.fullWidth());

        return comment;
    }

    export function docComments(ast: ISyntaxElement, text: ISimpleText): Comment[] {
        if (isDeclarationAST(ast)) {
            var comments: Comment[] = null;

            if (ast.kind() === SyntaxKind.VariableDeclarator) {
                // Get the doc comments for a variable off of the variable statement.  That's what
                // they'll be attached to in the tree.
                comments = TypeScript.ASTHelpers.preComments(getVariableStatement(<VariableDeclaratorSyntax>ast), text);
            }
            else if (ast.kind() === SyntaxKind.Parameter) {
                // First check if the parameter was written like so:
                //      (
                //          /** blah */ a,
                //          /** blah */ b);
                comments = TypeScript.ASTHelpers.preComments(ast, text);
                if (!comments) {
                    // Now check if it was written like so:
                    //      (/** blah */ a, /** blah */ b);
                    // In this case, the comment will belong to the preceding token.
                    var previousToken = findToken(syntaxTree(ast).sourceUnit(), firstToken(ast).fullStart() - 1);
                    if (previousToken && (previousToken.kind() === SyntaxKind.OpenParenToken || previousToken.kind() === SyntaxKind.CommaToken)) {
                        comments = convertTokenTrailingComments(previousToken, text);
                    }
                }
            }
            else {
                comments = TypeScript.ASTHelpers.preComments(ast, text);
            }

            if (comments && comments.length > 0) {
                return comments.filter(c => isDocComment(c));
            }
        }

        return sentinelEmptyArray;
    }

    export function isDocComment(comment: Comment) {
        if (comment.kind() === SyntaxKind.MultiLineCommentTrivia) {
            var fullText = comment.fullText();
            return fullText.charAt(2) === "*" && fullText.charAt(3) !== "/";
        }

        return false;
    }

    export function getParameterList(ast: ISyntaxElement): ParameterListSyntax {
        if (ast) {
            switch (ast.kind()) {
                case SyntaxKind.ConstructorDeclaration:
                    return getParameterList((<ConstructorDeclarationSyntax>ast).callSignature);
                case SyntaxKind.FunctionDeclaration:
                    return getParameterList((<FunctionDeclarationSyntax>ast).callSignature);
                case SyntaxKind.ParenthesizedArrowFunctionExpression:
                    return getParameterList((<ParenthesizedArrowFunctionExpressionSyntax>ast).callSignature);
                case SyntaxKind.ConstructSignature:
                    return getParameterList((<ConstructSignatureSyntax>ast).callSignature);
                case SyntaxKind.MemberFunctionDeclaration:
                    return getParameterList((<MemberFunctionDeclarationSyntax>ast).callSignature);
                case SyntaxKind.FunctionPropertyAssignment:
                    return getParameterList((<FunctionPropertyAssignmentSyntax>ast).callSignature);
                case SyntaxKind.FunctionExpression:
                    return getParameterList((<FunctionExpressionSyntax>ast).callSignature);
                case SyntaxKind.MethodSignature:
                    return getParameterList((<MethodSignatureSyntax>ast).callSignature);
                case SyntaxKind.ConstructorType:
                    return (<ConstructorTypeSyntax>ast).parameterList;
                case SyntaxKind.FunctionType:
                    return (<FunctionTypeSyntax>ast).parameterList;
                case SyntaxKind.CallSignature:
                    return (<CallSignatureSyntax>ast).parameterList;
                case SyntaxKind.GetAccessor:
                    return getParameterList((<GetAccessorSyntax>ast).callSignature);
                case SyntaxKind.SetAccessor:
                    return getParameterList((<SetAccessorSyntax>ast).callSignature);
            }
        }

        return null;
    }

    export function getType(ast: ISyntaxElement): ITypeSyntax {
        if (ast) {
            switch (ast.kind()) {
                case SyntaxKind.FunctionDeclaration:
                    return getType((<FunctionDeclarationSyntax>ast).callSignature);
                case SyntaxKind.ParenthesizedArrowFunctionExpression:
                    return getType((<ParenthesizedArrowFunctionExpressionSyntax>ast).callSignature);
                case SyntaxKind.ConstructSignature:
                    return getType((<ConstructSignatureSyntax>ast).callSignature);
                case SyntaxKind.MemberFunctionDeclaration:
                    return getType((<MemberFunctionDeclarationSyntax>ast).callSignature);
                case SyntaxKind.FunctionPropertyAssignment:
                    return getType((<FunctionPropertyAssignmentSyntax>ast).callSignature);
                case SyntaxKind.FunctionExpression:
                    return getType((<FunctionExpressionSyntax>ast).callSignature);
                case SyntaxKind.MethodSignature:
                    return getType((<MethodSignatureSyntax>ast).callSignature);
                case SyntaxKind.CallSignature:
                    return getType((<CallSignatureSyntax>ast).typeAnnotation);
                case SyntaxKind.IndexSignature:
                    return getType((<IndexSignatureSyntax>ast).typeAnnotation);
                case SyntaxKind.PropertySignature:
                    return getType((<PropertySignatureSyntax>ast).typeAnnotation);
                case SyntaxKind.GetAccessor:
                    return getType((<GetAccessorSyntax>ast).callSignature);
                case SyntaxKind.Parameter:
                    return getType((<ParameterSyntax>ast).typeAnnotation);
                case SyntaxKind.MemberVariableDeclaration:
                    return getType((<MemberVariableDeclarationSyntax>ast).variableDeclarator);
                case SyntaxKind.VariableDeclarator:
                    return getType((<VariableDeclaratorSyntax>ast).typeAnnotation);
                case SyntaxKind.CatchClause:
                    return getType((<CatchClauseSyntax>ast).typeAnnotation);
                case SyntaxKind.ConstructorType:
                    return (<ConstructorTypeSyntax>ast).type;
                case SyntaxKind.FunctionType:
                    return (<FunctionTypeSyntax>ast).type;
                case SyntaxKind.TypeAnnotation:
                    return (<TypeAnnotationSyntax>ast).type;
            }
        }

        return null;
    }

    function getVariableStatement(variableDeclarator: VariableDeclaratorSyntax): VariableStatementSyntax {
        if (variableDeclarator && variableDeclarator.parent && variableDeclarator.parent.parent && variableDeclarator.parent.parent.parent &&
            variableDeclarator.parent.kind() === SyntaxKind.SeparatedList &&
            variableDeclarator.parent.parent.kind() === SyntaxKind.VariableDeclaration &&
            variableDeclarator.parent.parent.parent.kind() === SyntaxKind.VariableStatement) {

            return <VariableStatementSyntax>variableDeclarator.parent.parent.parent;
        }

        return null;
    }

    export function getVariableDeclaratorModifiers(variableDeclarator: VariableDeclaratorSyntax): ISyntaxToken[] {
        var variableStatement = getVariableStatement(variableDeclarator);
        return variableStatement ? variableStatement.modifiers : Syntax.emptyList<ISyntaxToken>();
    }

    export function isIntegerLiteralAST(expression: ISyntaxElement): boolean {
        if (expression) {
            switch (expression.kind()) {
                case SyntaxKind.PlusExpression:
                case SyntaxKind.NegateExpression:
                    // Note: if there is a + or - sign, we can only allow a normal integer following
                    // (and not a hex integer).  i.e. -0xA is a legal expression, but it is not a 
                    // *literal*.
                    expression = (<PrefixUnaryExpressionSyntax>expression).operand;
                    return expression.kind() === SyntaxKind.NumericLiteral && IntegerUtilities.isInteger((<ISyntaxToken>expression).text());

                case SyntaxKind.NumericLiteral:
                    // If it doesn't have a + or -, then either an integer literal or a hex literal
                    // is acceptable.
                    var text = (<ISyntaxToken>expression).text();
                    return IntegerUtilities.isInteger(text) || IntegerUtilities.isHexInteger(text);
            }
        }

        return false;
    }

    export function getEnclosingModuleDeclaration(ast: ISyntaxElement): ModuleDeclarationSyntax {
        while (ast) {
            if (ast.kind() === SyntaxKind.ModuleDeclaration) {
                return <ModuleDeclarationSyntax>ast;
            }

            ast = ast.parent;
        }

        return null;
    }

    function isEntireNameOfModuleDeclaration(nameAST: ISyntaxElement) {
        return parentIsModuleDeclaration(nameAST) && (<ModuleDeclarationSyntax>nameAST.parent).name === nameAST;
    }

    export function getModuleDeclarationFromNameAST(ast: ISyntaxElement): ModuleDeclarationSyntax {
        if (ast) {
            switch (ast.kind()) {
                case SyntaxKind.StringLiteral:
                    if (parentIsModuleDeclaration(ast) && (<ModuleDeclarationSyntax>ast.parent).stringLiteral === ast) {
                        return <ModuleDeclarationSyntax>ast.parent;
                    }
                    return null;

                case SyntaxKind.IdentifierName:
                case SyntaxKind.QualifiedName:
                    if (isEntireNameOfModuleDeclaration(ast)) {
                        return <ModuleDeclarationSyntax>ast.parent;
                    }
                    break;

                default: 
                    return null;
            }

            // Only qualified names can be name of module declaration if they didnt satisfy above conditions
            for (ast = ast.parent; ast && ast.kind() === SyntaxKind.QualifiedName; ast = ast.parent) {
                if (isEntireNameOfModuleDeclaration(ast)) {
                    return <ModuleDeclarationSyntax>ast.parent;
                }
            }
        }

        return null;
    }

    export function isLastNameOfModule(ast: ModuleDeclarationSyntax, astName: ISyntaxElement): boolean {
        if (ast) {
            if (ast.stringLiteral) {
                return astName === ast.stringLiteral;
            }
            else if (ast.name.kind() === SyntaxKind.QualifiedName) {
                return astName === (<QualifiedNameSyntax>ast.name).right;
            }
            else {
                return astName === ast.name;
            }
        }

        return false;
    }

    export function getNameOfIdenfierOrQualifiedName(name: ISyntaxElement): string {
        if (name.kind() === SyntaxKind.IdentifierName) {
            return (<ISyntaxToken>name).text();
        }
        else {
            Debug.assert(name.kind() == SyntaxKind.QualifiedName);
            var dotExpr = <QualifiedNameSyntax>name;
            return getNameOfIdenfierOrQualifiedName(dotExpr.left) + "." + getNameOfIdenfierOrQualifiedName(dotExpr.right);
        }
    }

    export function getModuleNames(name: ISyntaxElement, result?: ISyntaxToken[]): ISyntaxToken[] {
        result = result || [];

        if (name.kind() === SyntaxKind.QualifiedName) {
            getModuleNames((<QualifiedNameSyntax>name).left, result);
            result.push((<QualifiedNameSyntax>name).right);
        }
        else {
            result.push(<ISyntaxToken>name);
        }

        return result;
    }
}