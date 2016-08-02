/* @internal */
namespace ts.codeRefactor {
    registerCodeRefactor({
        name: "Add JSDoc Comments to Method",
        nodeLabel: ts.SyntaxKind.MethodDeclaration,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            return getJSDocCodeRefactor(token.pos + 1, context, Diagnostics.Add_JSDoc_Comments_to_Method);
        }
    });

    registerCodeRefactor({
        name: "Add JSDoc Comments to Constructor",
        nodeLabel: ts.SyntaxKind.Constructor,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            return getJSDocCodeRefactor(token.pos + 1, context, Diagnostics.Add_JSDoc_Comments_to_Constructor);
        }
    });

    registerCodeRefactor({
        name: "Add JSDoc Comments to Function",
        nodeLabel: ts.SyntaxKind.FunctionDeclaration,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            return getJSDocCodeRefactor(token.pos, context, Diagnostics.Add_JSDoc_Comments_to_Function);
        }
    });

    registerCodeRefactor({
        name: "Add JSDoc Comments to Class",
        nodeLabel: ts.SyntaxKind.ClassDeclaration,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            return getJSDocCodeRefactor(token.pos, context, Diagnostics.Add_JSDoc_Comments_to_Class);
        }
    });

    registerCodeRefactor({
        name: "Add JSDoc Comments to Module",
        nodeLabel: ts.SyntaxKind.ModuleDeclaration,
        getTextChanges: (token: Node, context: CodeFixContext): CodeAction[] => {
            return getJSDocCodeRefactor(token.pos, context, Diagnostics.Add_JSDoc_Comments_to_Module);
        }
    });

    function getJSDocCodeRefactor(position: number, context: CodeFixContext, diagnosticMessage: DiagnosticMessage) {
        const docCommentTemplate = ts.codeRefactor.getDocCommentTemplateAtPosition(context.sourceFile, position, context.newLineCharacter);
        if (docCommentTemplate && docCommentTemplate.newText && docCommentTemplate.newText.length > 0) {
            return [{
                description: getLocaleSpecificMessage(diagnosticMessage),
                changes: [{
                    fileName: context.sourceFile.fileName,
                    textChanges: [{
                        span: {
                            start: context.span.start,
                            length: 0
                        },
                        newText: docCommentTemplate.newText
                    }]
                }]
            }];
        }
    }

    export function getDocCommentTemplateAtPosition(sourceFile: SourceFile, position: number, newLine: string): TextInsertion {
        // Check if in a context where we don't want to perform any insertion
        if (isInString(sourceFile, position) || isInComment(sourceFile, position) || hasDocComment(sourceFile, position)) {
            return undefined;
        }

        const tokenAtPos = getTokenAtPosition(sourceFile, position);
        const tokenStart = tokenAtPos.getStart();
        if (!tokenAtPos || tokenStart < position) {
            return undefined;
        }

        // TODO: add support for:
        // - enums/enum members
        // - interfaces
        // - property declarations
        // - potentially property assignments
        let commentOwner: Node;
        findOwner: for (commentOwner = tokenAtPos; commentOwner; commentOwner = commentOwner.parent) {
            switch (commentOwner.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.Constructor:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.VariableStatement:
                    break findOwner;
                case SyntaxKind.SourceFile:
                    return undefined;
                case SyntaxKind.ModuleDeclaration:
                    // If in walking up the tree, we hit a a nested namespace declaration,
                    // then we must be somewhere within a dotted namespace name; however we don't
                    // want to give back a JSDoc template for the 'b' or 'c' in 'namespace a.b.c { }'.
                    if (commentOwner.parent.kind === SyntaxKind.ModuleDeclaration) {
                        return undefined;
                    }
                    break findOwner;
            }
        }

        if (!commentOwner || commentOwner.getStart() < position) {
            return undefined;
        }

        const parameters = getParametersForJsDocOwningNode(commentOwner);
        const posLineAndChar = sourceFile.getLineAndCharacterOfPosition(position);
        const lineStart = sourceFile.getLineStarts()[posLineAndChar.line];

        const indentationStr = sourceFile.text.substr(lineStart, posLineAndChar.character);

        let docParams = "";
        for (let i = 0, numParams = parameters.length; i < numParams; i++) {
            const currentName = parameters[i].name;
            const paramName = currentName.kind === SyntaxKind.Identifier ?
                (<Identifier>currentName).text :
                "param" + i;

            docParams += `${indentationStr} * @param ${paramName}${newLine}`;
        }

        // A doc comment consists of the following
        // * The opening comment line
        // * the first line (without a param) for the object's untagged info (this is also where the caret ends up)
        // * the '@param'-tagged lines
        // * TODO: other tags.
        // * the closing comment line
        // * if the caret was directly in front of the object, then we add an extra line and indentation.
        const preamble = "/**" + newLine +
            indentationStr + " * ";
        const result =
            preamble + newLine +
            docParams +
            indentationStr + " */" +
            (tokenStart === position ? newLine + indentationStr : "");

        return { newText: result, caretOffset: preamble.length };
    }

    function getParametersForJsDocOwningNode(commentOwner: Node): ParameterDeclaration[] {
        const emptyArray: any[] = [];
        if (isFunctionLike(commentOwner)) {
            return commentOwner.parameters;
        }

        if (commentOwner.kind === SyntaxKind.VariableStatement) {
            const varStatement = <VariableStatement>commentOwner;
            const varDeclarations = varStatement.declarationList.declarations;

            if (varDeclarations.length === 1 && varDeclarations[0].initializer) {
                return getParametersFromRightHandSideOfAssignment(varDeclarations[0].initializer);
            }
        }

        return emptyArray;
    }

    function getParametersFromRightHandSideOfAssignment(rightHandSide: Expression): ParameterDeclaration[] {
        const emptyArray: any[] = [];
        while (rightHandSide.kind === SyntaxKind.ParenthesizedExpression) {
            rightHandSide = (<ParenthesizedExpression>rightHandSide).expression;
        }

        switch (rightHandSide.kind) {
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return (<FunctionExpression>rightHandSide).parameters;
            case SyntaxKind.ClassExpression:
                for (const member of (<ClassExpression>rightHandSide).members) {
                    if (member.kind === SyntaxKind.Constructor) {
                        return (<ConstructorDeclaration>member).parameters;
                    }
                }
                break;
        }

        return emptyArray;
    }
}
