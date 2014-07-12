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
    export interface IParameters {
        length: number;
        lastParameterIsRest(): boolean;
        ast: AST;
        astAt(index: number): AST;
        identifierAt(index: number): Identifier;
        typeAt(index: number): AST;
        initializerAt(index: number): EqualsValueClause;
        isOptionalAt(index: number): boolean;
    }
}

module TypeScript.ASTHelpers {
    export function scriptIsElided(sourceUnit: SourceUnit): boolean {
        return isDTSFile(sourceUnit.fileName()) || moduleMembersAreElided(sourceUnit.moduleElements);
    }

    export function moduleIsElided(declaration: ModuleDeclaration): boolean {
        return hasModifier(declaration.modifiers, PullElementFlags.Ambient) || moduleMembersAreElided(declaration.moduleElements);
    }

    function moduleMembersAreElided(members: ISyntaxList2): boolean {
        for (var i = 0, n = members.childCount(); i < n; i++) {
            var member = members.childAt(i);

            // We should emit *this* module if it contains any non-interface types. 
            // Caveat: if we have contain a module, then we should be emitted *if we want to
            // emit that inner module as well.
            if (member.kind() === SyntaxKind.ModuleDeclaration) {
                if (!moduleIsElided(<ModuleDeclaration>member)) {
                    return false;
                }
            }
            else if (member.kind() !== SyntaxKind.InterfaceDeclaration) {
                return false;
            }
        }

        return true;
    }

    export function enumIsElided(declaration: EnumDeclaration): boolean {
        if (hasModifier(declaration.modifiers, PullElementFlags.Ambient)) {
            return true;
        }

        return false;
    }

    export function isValidAstNode(ast: IASTSpan): boolean {
        if (!ast)
            return false;

        if (ast.start() === -1 || ast.end() === -1)
            return false;

        return true;
    }

    ///
    /// Return the AST containing "position"
    ///
    export function getAstAtPosition(script: AST, pos: number, useTrailingTriviaAsLimChar: boolean = true, forceInclusive: boolean = false): AST {
        var top: AST = null;

        var pre = function (cur: AST, walker: IAstWalker) {
            if (isValidAstNode(cur)) {
                var isInvalid1 = cur.kind() === SyntaxKind.ExpressionStatement && cur.width() === 0;

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
                        pos === script.end() + script.trailingTriviaWidth(); // Special "EOF" case

                    var minChar = cur.start();
                    var limChar = cur.end() + (useTrailingTriviaAsLimChar ? cur.trailingTriviaWidth() : 0) + (inclusive ? 1 : 0);
                    if (pos >= minChar && pos < limChar) {

                        // Ignore empty lists
                        if ((cur.kind() !== SyntaxKind.List && cur.kind() !== SyntaxKind.SeparatedList) || cur.end() > cur.start()) {
                            // TODO: Since AST is sometimes not correct wrt to position, only add "cur" if it's better
                            //       than top of the stack.
                            if (top === null) {
                                top = cur;
                            }
                            else if (cur.start() >= top.start() &&
                                (cur.end() + (useTrailingTriviaAsLimChar ? cur.trailingTriviaWidth() : 0)) <= (top.end() + (useTrailingTriviaAsLimChar ? top.trailingTriviaWidth() : 0))) {
                                // this new node appears to be better than the one we're 
                                // storing.  Make this the new node.

                                // However, If the current top is a missing identifier, we 
                                // don't want to replace it with another missing identifier.
                                // We want to return the first missing identifier found in a
                                // depth first walk of  the tree.
                                if (top.width() !== 0 || cur.width() !== 0) {
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

    export function getExtendsHeritageClause(clauses: ISyntaxList2): HeritageClause {
        if (!clauses) {
            return null;
        }

        return <HeritageClause>clauses.firstOrDefault((c: HeritageClause) =>
            c.typeNames.nonSeparatorCount() > 0 && c.kind() === SyntaxKind.ExtendsHeritageClause);
    }

    export function getImplementsHeritageClause(clauses: ISyntaxList2): HeritageClause {
        if (!clauses) {
            return null;
        }

        return <HeritageClause>clauses.firstOrDefault((c: HeritageClause) =>
            c.typeNames.nonSeparatorCount() > 0 && c.kind() === SyntaxKind.ImplementsHeritageClause);
    }

    export function isCallExpression(ast: AST): boolean {
        return (ast && ast.kind() === SyntaxKind.InvocationExpression) ||
            (ast && ast.kind() === SyntaxKind.ObjectCreationExpression);
    }

    export function isCallExpressionTarget(ast: AST): boolean {
        if (!ast) {
            return false;
        }

        var current = ast;

        while (current && current.parent) {
            if (current.parent.kind() === SyntaxKind.MemberAccessExpression &&
                (<MemberAccessExpression>current.parent).name === current) {
                current = current.parent;
                continue;
            }

            break;
        }

        if (current && current.parent) {
            if (current.parent.kind() === SyntaxKind.InvocationExpression || current.parent.kind() === SyntaxKind.ObjectCreationExpression) {
                return current === (<InvocationExpression>current.parent).expression;
            }
        }

        return false;
    }

    function isNameOfSomeDeclaration(ast: AST) {
        if (ast === null || ast.parent === null) {
            return false;
        }
        if (ast.kind() !== SyntaxKind.IdentifierName) {
            return false;
        }

        switch (ast.parent.kind()) {
            case SyntaxKind.ClassDeclaration:
                return (<ClassDeclaration>ast.parent).identifier === ast;
            case SyntaxKind.InterfaceDeclaration:
                return (<InterfaceDeclaration>ast.parent).identifier === ast;
            case SyntaxKind.EnumDeclaration:
                return (<EnumDeclaration>ast.parent).identifier === ast;
            case SyntaxKind.ModuleDeclaration:
                return (<ModuleDeclaration>ast.parent).name === ast || (<ModuleDeclaration>ast.parent).stringLiteral === ast;
            case SyntaxKind.VariableDeclarator:
                return (<VariableDeclarator>ast.parent).propertyName === ast;
            case SyntaxKind.FunctionDeclaration:
                return (<FunctionDeclaration>ast.parent).identifier === ast;
            case SyntaxKind.MemberFunctionDeclaration:
                return (<MemberFunctionDeclaration>ast.parent).propertyName === ast;
            case SyntaxKind.Parameter:
                return (<Parameter>ast.parent).identifier === ast;
            case SyntaxKind.TypeParameter:
                return (<TypeParameter>ast.parent).identifier === ast;
            case SyntaxKind.SimplePropertyAssignment:
                return (<SimplePropertyAssignment>ast.parent).propertyName === ast;
            case SyntaxKind.FunctionPropertyAssignment:
                return (<FunctionPropertyAssignment>ast.parent).propertyName === ast;
            case SyntaxKind.EnumElement:
                return (<EnumElement>ast.parent).propertyName === ast;
            case SyntaxKind.ImportDeclaration:
                return (<ImportDeclaration>ast.parent).identifier === ast;
        }

        return false;
    }

    export function isDeclarationASTOrDeclarationNameAST(ast: AST) {
        return isNameOfSomeDeclaration(ast) || isDeclarationAST(ast);
    }

    export function getEnclosingParameterForInitializer(ast: AST): Parameter {
        var current = ast;
        while (current) {
            switch (current.kind()) {
                case SyntaxKind.EqualsValueClause:
                    if (current.parent && current.parent.kind() === SyntaxKind.Parameter) {
                        return <Parameter>current.parent;
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

    export function getEnclosingMemberVariableDeclaration(ast: AST): MemberVariableDeclaration {
        var current = ast;

        while (current) {
            switch (current.kind()) {
                case SyntaxKind.MemberVariableDeclaration:
                    return <MemberVariableDeclaration>current;
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

    export function isNameOfFunction(ast: AST) {
        return ast
            && ast.parent
            && ast.kind() === SyntaxKind.IdentifierName
            && ast.parent.kind() === SyntaxKind.FunctionDeclaration
            && (<FunctionDeclaration>ast.parent).identifier === ast;
    }

    export function isNameOfMemberFunction(ast: AST) {
        return ast
            && ast.parent
            && ast.kind() === SyntaxKind.IdentifierName
            && ast.parent.kind() === SyntaxKind.MemberFunctionDeclaration
            && (<MemberFunctionDeclaration>ast.parent).propertyName === ast;
    }

    export function isNameOfMemberAccessExpression(ast: AST) {
        if (ast &&
            ast.parent &&
            ast.parent.kind() === SyntaxKind.MemberAccessExpression &&
            (<MemberAccessExpression>ast.parent).name === ast) {

            return true;
        }

        return false;
    }

    export function isRightSideOfQualifiedName(ast: AST) {
        if (ast &&
            ast.parent &&
            ast.parent.kind() === SyntaxKind.QualifiedName &&
            (<QualifiedName>ast.parent).right === ast) {

            return true;
        }

        return false;
    }

    export function parentIsModuleDeclaration(ast: AST) {
        return ast.parent && ast.parent.kind() === SyntaxKind.ModuleDeclaration;
    }

    export function parametersFromIdentifier(id: Identifier): IParameters {
        return {
            length: 1,
            lastParameterIsRest: () => false,
            ast: id,
            astAt: (index: number) => id,
            identifierAt: (index: number) => id,
            typeAt: (index: number): AST => null,
            initializerAt: (index: number): EqualsValueClause => null,
            isOptionalAt: (index: number) => false,
        };
    }

    export function parametersFromParameter(parameter: Parameter): IParameters {
        return {
            length: 1,
            lastParameterIsRest: () => parameter.dotDotDotToken !== null,
            ast: parameter,
            astAt: (index: number) => parameter,
            identifierAt: (index: number) => parameter.identifier,
            typeAt: (index: number) => getType(parameter),
            initializerAt: (index: number) => parameter.equalsValueClause,
            isOptionalAt: (index: number) => parameterIsOptional(parameter),
        };
    }

    function parameterIsOptional(parameter: Parameter): boolean {
        return parameter.questionToken !== null || parameter.equalsValueClause !== null;
    }

    export function parametersFromParameterList(list: ParameterList): IParameters {
        return {
            length: list.parameters.nonSeparatorCount(),
            lastParameterIsRest: () => lastParameterIsRest(list),
            ast: list.parameters,
            astAt: (index: number) => list.parameters.nonSeparatorAt(index),
            identifierAt: (index: number) => (<Parameter>list.parameters.nonSeparatorAt(index)).identifier,
            typeAt: (index: number) => getType(list.parameters.nonSeparatorAt(index)),
            initializerAt: (index: number) => (<Parameter>list.parameters.nonSeparatorAt(index)).equalsValueClause,
            isOptionalAt: (index: number) => parameterIsOptional(<Parameter>list.parameters.nonSeparatorAt(index)),
        };
    }

    export function isDeclarationAST(ast: AST): boolean {
        switch (ast.kind()) {
            case SyntaxKind.VariableDeclarator:
                return getVariableStatement(<VariableDeclarator>ast) !== null;

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

    export function docComments(ast: AST): Comment[] {
        if (isDeclarationAST(ast)) {
            var preComments = ast.kind() === SyntaxKind.VariableDeclarator
                ? getVariableStatement(<VariableDeclarator>ast).preComments()
                : ast.preComments();

            if (preComments && preComments.length > 0) {
                var preCommentsLength = preComments.length;
                var docComments = new Array<Comment>();
                for (var i = preCommentsLength - 1; i >= 0; i--) {
                    if (isDocComment(preComments[i])) {
                        docComments.push(preComments[i]);
                        continue;
                    }

                    break;
                }

                return docComments.reverse();
            }
        }

        return sentinelEmptyArray;
    }



    function isDocComment(comment: Comment) {
        if (comment.kind() === SyntaxKind.MultiLineCommentTrivia) {
            var fullText = comment.fullText();
            return fullText.charAt(2) === "*" && fullText.charAt(3) !== "/";
        }

        return false;
    }

    export function getParameterList(ast: AST): ParameterList {
        if (ast) {
            switch (ast.kind()) {
                case SyntaxKind.ConstructorDeclaration:
                    return getParameterList((<ConstructorDeclaration>ast).callSignature);
                case SyntaxKind.FunctionDeclaration:
                    return getParameterList((<FunctionDeclaration>ast).callSignature);
                case SyntaxKind.ParenthesizedArrowFunctionExpression:
                    return getParameterList((<ParenthesizedArrowFunctionExpression>ast).callSignature);
                case SyntaxKind.ConstructSignature:
                    return getParameterList((<ConstructSignature>ast).callSignature);
                case SyntaxKind.MemberFunctionDeclaration:
                    return getParameterList((<MemberFunctionDeclaration>ast).callSignature);
                case SyntaxKind.FunctionPropertyAssignment:
                    return getParameterList((<FunctionPropertyAssignment>ast).callSignature);
                case SyntaxKind.FunctionExpression:
                    return getParameterList((<FunctionExpression>ast).callSignature);
                case SyntaxKind.MethodSignature:
                    return getParameterList((<MethodSignature>ast).callSignature);
                case SyntaxKind.ConstructorType:
                    return (<ConstructorType>ast).parameterList;
                case SyntaxKind.FunctionType:
                    return (<FunctionType>ast).parameterList;
                case SyntaxKind.CallSignature:
                    return (<CallSignature>ast).parameterList;
                case SyntaxKind.GetAccessor:
                    return (<GetAccessor>ast).parameterList;
                case SyntaxKind.SetAccessor:
                    return (<SetAccessor>ast).parameterList;
            }
        }

        return null;
    }

    export function getType(ast: AST): AST {
        if (ast) {
            switch (ast.kind()) {
                case SyntaxKind.FunctionDeclaration:
                    return getType((<FunctionDeclaration>ast).callSignature);
                case SyntaxKind.ParenthesizedArrowFunctionExpression:
                    return getType((<ParenthesizedArrowFunctionExpression>ast).callSignature);
                case SyntaxKind.ConstructSignature:
                    return getType((<ConstructSignature>ast).callSignature);
                case SyntaxKind.MemberFunctionDeclaration:
                    return getType((<MemberFunctionDeclaration>ast).callSignature);
                case SyntaxKind.FunctionPropertyAssignment:
                    return getType((<FunctionPropertyAssignment>ast).callSignature);
                case SyntaxKind.FunctionExpression:
                    return getType((<FunctionExpression>ast).callSignature);
                case SyntaxKind.MethodSignature:
                    return getType((<MethodSignature>ast).callSignature);
                case SyntaxKind.CallSignature:
                    return getType((<CallSignature>ast).typeAnnotation);
                case SyntaxKind.IndexSignature:
                    return getType((<IndexSignature>ast).typeAnnotation);
                case SyntaxKind.PropertySignature:
                    return getType((<PropertySignature>ast).typeAnnotation);
                case SyntaxKind.GetAccessor:
                    return getType((<GetAccessor>ast).typeAnnotation);
                case SyntaxKind.Parameter:
                    return getType((<Parameter>ast).typeAnnotation);
                case SyntaxKind.MemberVariableDeclaration:
                    return getType((<MemberVariableDeclaration>ast).variableDeclarator);
                case SyntaxKind.VariableDeclarator:
                    return getType((<VariableDeclarator>ast).typeAnnotation);
                case SyntaxKind.CatchClause:
                    return getType((<CatchClause>ast).typeAnnotation);
                case SyntaxKind.ConstructorType:
                    return (<ConstructorType>ast).type;
                case SyntaxKind.FunctionType:
                    return (<FunctionType>ast).type;
                case SyntaxKind.TypeAnnotation:
                    return (<TypeAnnotation>ast).type;
            }
        }

        return null;
    }

    function getVariableStatement(variableDeclarator: VariableDeclarator): VariableStatement {
        if (variableDeclarator && variableDeclarator.parent && variableDeclarator.parent.parent && variableDeclarator.parent.parent.parent &&
            variableDeclarator.parent.kind() === SyntaxKind.SeparatedList &&
            variableDeclarator.parent.parent.kind() === SyntaxKind.VariableDeclaration &&
            variableDeclarator.parent.parent.parent.kind() === SyntaxKind.VariableStatement) {

            return <VariableStatement>variableDeclarator.parent.parent.parent;
        }

        return null;
    }

    export function getVariableDeclaratorModifiers(variableDeclarator: VariableDeclarator): PullElementFlags[] {
        var variableStatement = getVariableStatement(variableDeclarator);
        return variableStatement ? variableStatement.modifiers : sentinelEmptyArray;
    }

    export function isIntegerLiteralAST(expression: AST): boolean {
        if (expression) {
            switch (expression.kind()) {
                case SyntaxKind.PlusExpression:
                case SyntaxKind.NegateExpression:
                    // Note: if there is a + or - sign, we can only allow a normal integer following
                    // (and not a hex integer).  i.e. -0xA is a legal expression, but it is not a 
                    // *literal*.
                    expression = (<PrefixUnaryExpression>expression).operand;
                    return expression.kind() === SyntaxKind.NumericLiteral && IntegerUtilities.isInteger((<NumericLiteral>expression).text());

                case SyntaxKind.NumericLiteral:
                    // If it doesn't have a + or -, then either an integer literal or a hex literal
                    // is acceptable.
                    var text = (<NumericLiteral>expression).text();
                    return IntegerUtilities.isInteger(text) || IntegerUtilities.isHexInteger(text);
            }
        }

        return false;
    }

    export function getEnclosingModuleDeclaration(ast: AST): ModuleDeclaration {
        while (ast) {
            if (ast.kind() === SyntaxKind.ModuleDeclaration) {
                return <ModuleDeclaration>ast;
            }

            ast = ast.parent;
        }

        return null;
    }

    function isEntireNameOfModuleDeclaration(nameAST: AST) {
        return parentIsModuleDeclaration(nameAST) && (<ModuleDeclaration>nameAST.parent).name === nameAST;
    }

    export function getModuleDeclarationFromNameAST(ast: AST): ModuleDeclaration {
        if (ast) {
            switch (ast.kind()) {
                case SyntaxKind.StringLiteral:
                    if (parentIsModuleDeclaration(ast) && (<ModuleDeclaration>ast.parent).stringLiteral === ast) {
                        return <ModuleDeclaration>ast.parent;
                    }
                    return null;

                case SyntaxKind.IdentifierName:
                case SyntaxKind.QualifiedName:
                    if (isEntireNameOfModuleDeclaration(ast)) {
                        return <ModuleDeclaration>ast.parent;
                    }
                    break;

                default: 
                    return null;
            }

            // Only qualified names can be name of module declaration if they didnt satisfy above conditions
            for (ast = ast.parent; ast && ast.kind() === SyntaxKind.QualifiedName; ast = ast.parent) {
                if (isEntireNameOfModuleDeclaration(ast)) {
                    return <ModuleDeclaration>ast.parent;
                }
            }
        }

        return null;
    }

    export function isLastNameOfModule(ast: ModuleDeclaration, astName: AST): boolean {
        if (ast) {
            if (ast.stringLiteral) {
                return astName === ast.stringLiteral;
            }
            else if (ast.name.kind() === SyntaxKind.QualifiedName) {
                return astName === (<QualifiedName>ast.name).right;
            }
            else {
                return astName === ast.name;
            }
        }

        return false;
    }

    export function getNameOfIdenfierOrQualifiedName(name: AST): string {
        if (name.kind() === SyntaxKind.IdentifierName) {
            return (<Identifier>name).text();
        }
        else {
            Debug.assert(name.kind() == SyntaxKind.QualifiedName);
            var dotExpr = <QualifiedName>name;
            return getNameOfIdenfierOrQualifiedName(dotExpr.left) + "." + getNameOfIdenfierOrQualifiedName(dotExpr.right);
        }
    }

    export function getModuleNames(name: AST, result?: Identifier[]): Identifier[] {
        result = result || [];

        if (name.kind() === SyntaxKind.QualifiedName) {
            getModuleNames((<QualifiedName>name).left, result);
            result.push((<QualifiedName>name).right);
        }
        else {
            result.push(<Identifier>name);
        }

        return result;
    }
}
