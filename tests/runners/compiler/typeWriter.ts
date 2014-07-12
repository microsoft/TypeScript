interface PositionedNode extends TypeScript.ISyntaxElement {
    position: number;
}

class PositionalWalker extends TypeScript.SyntaxWalker {
    private currentPosition = 0;

    public visitList(list: TypeScript.ISyntaxList) {
        (<any>list).position = this.currentPosition;
        return super.visitList(list);
    }

    public visitNode(node: TypeScript.SyntaxNode) {
        (<any>node).position = this.currentPosition;
        return super.visitNode(node);
    }

    public visitToken(token: TypeScript.ISyntaxToken) {
        (<any>token).position = this.currentPosition;
        this.currentPosition += token.fullWidth();
        return super.visitToken(token);
    }
}

class TypeWriterWalker extends TypeScript.PositionTrackingWalker {
    private document: TypeScript.Document;
    private syntaxTree: TypeScript.SyntaxTree;
    private currentPosition = 0;

    public results: {
        line: number;
        column: number;
        syntaxKind: string;
        identifierName: string;
        type: string;
    }[] = [];

    constructor(public filename: string, public compiler: TypeScript.TypeScriptCompiler) {
        super();

        this.document = compiler.getDocument(filename);
        this.syntaxTree = this.document.syntaxTree();
    }

    public run() {
        this.syntaxTree.sourceUnit().accept(this);
    }

    private isName(token: TypeScript.ISyntaxToken, parent: TypeScript.ISyntaxElement) {
        switch (parent.kind()) {
            case TypeScript.SyntaxKind.ContinueStatement:
                return (<TypeScript.ContinueStatementSyntax>parent).identifier === token;
            case TypeScript.SyntaxKind.BreakStatement:
                return (<TypeScript.BreakStatementSyntax>parent).identifier === token;
            case TypeScript.SyntaxKind.LabeledStatement:
                return (<TypeScript.LabeledStatementSyntax>parent).identifier === token;
        }
        return false;
    }

    public visitToken(token: TypeScript.ISyntaxToken) {
        if (token.kind() === TypeScript.SyntaxKind.IdentifierName) {
            var posToken = this.syntaxTree.sourceUnit().findToken(this.position());
            var myParent = posToken.parentElement();
            if (!this.isName(token, myParent)) {
                this.log(token);
            }
        } else if (token.kind() === TypeScript.SyntaxKind.ThisKeyword) {
            this.log(token);
        }
        return super.visitToken(token);
    }

    public visitNode(node: TypeScript.SyntaxNode) {
        return super.visitNode(node);
    }

    public visitSourceUnit(node: TypeScript.SourceUnitSyntax) {
        node.accept(new PositionalWalker());
        return super.visitSourceUnit(node);
    }

    private getAstForElement(element: TypeScript.ISyntaxElement) {
        var candidates: string[] = [];

        for (var i = 0; i < element.fullWidth(); i++) {
            var ast = TypeScript.ASTHelpers.getAstAtPosition(this.document.sourceUnit(), (<PositionedNode>element).position + i, false, false);
            while (ast) {
                if (ast.end() - ast.start() === element.width()) {
                    return ast;
                }
                ast = ast.parent;
            }
        }

        var errorText = 'Was looking for AST in file ' + this.filename + ' with fulltext = ' + element.fullText() + ', width = ' + element.width() + ', pos = ' + (<PositionedNode>element).position;

        throw new Error(errorText);
    }

    private getEnclosingScopeSymbol(ast: TypeScript.AST): TypeScript.PullSymbol {
        var enclosingScopeAST = TypeScript.DeclarationEmitter.getEnclosingContainer(ast);
        if (enclosingScopeAST) {
            var typeInfo = this.compiler.pullGetSymbolInformationFromAST(enclosingScopeAST, this.document);
            return typeInfo ? typeInfo.symbol : null;
        }

        return null;
    }

    private getTypeOfElement(element: TypeScript.ISyntaxElement) {
        var ast = this.getAstForElement(element);
        if (ast) {
            var typeInfo = this.compiler.pullGetSymbolInformationFromAST(ast, this.document);
            if (typeInfo.symbol && typeInfo.symbol.type) {
                var enclosingScope = this.getEnclosingScopeSymbol(ast);
                return typeInfo.symbol.type.toString(enclosingScope);
            }
        }

        return "<unknown>";
    }

    public visitPrefixUnaryExpression(node: TypeScript.PrefixUnaryExpressionSyntax) {
        this.log(node);
        return super.visitPrefixUnaryExpression(node);
    }
    public visitArrayLiteralExpression(node: TypeScript.ArrayLiteralExpressionSyntax) {
        this.log(node);
        return super.visitArrayLiteralExpression(node);
    }
    public visitOmittedExpression(node: TypeScript.OmittedExpressionSyntax) {
        this.log(node);
        return super.visitOmittedExpression(node);
    }
    public visitParenthesizedExpression(node: TypeScript.ParenthesizedExpressionSyntax) {
        this.log(node);
        return super.visitParenthesizedExpression(node);
    }
    public visitSimpleArrowFunctionExpression(node: TypeScript.SimpleArrowFunctionExpressionSyntax) {
        this.log(node);
        return super.visitSimpleArrowFunctionExpression(node);
    }
    public visitParenthesizedArrowFunctionExpression(node: TypeScript.ParenthesizedArrowFunctionExpressionSyntax) {
        this.log(node);
        return super.visitParenthesizedArrowFunctionExpression(node);
    }
    public visitObjectCreationExpression(node: TypeScript.ObjectCreationExpressionSyntax) {
        this.log(node);
        return super.visitObjectCreationExpression(node);
    }
    public visitCastExpression(node: TypeScript.CastExpressionSyntax) {
        this.log(node);
        return super.visitCastExpression(node);
    }
    public visitObjectLiteralExpression(node: TypeScript.ObjectLiteralExpressionSyntax) {
        this.log(node);
        return super.visitObjectLiteralExpression(node);
    }
    public visitFunctionExpression(node: TypeScript.FunctionExpressionSyntax) {
        this.log(node);
        return super.visitFunctionExpression(node);
    }
    public visitTypeOfExpression(node: TypeScript.TypeOfExpressionSyntax) {
        this.log(node);
        return super.visitTypeOfExpression(node);
    }
    public visitDeleteExpression(node: TypeScript.DeleteExpressionSyntax) {
        this.log(node);
        return super.visitDeleteExpression(node);
    }
    public visitVoidExpression(node: TypeScript.VoidExpressionSyntax) {
        this.log(node);
        return super.visitVoidExpression(node);
    }
    public visitMemberAccessExpression(node: TypeScript.MemberAccessExpressionSyntax) {
        this.log(node);
        return super.visitMemberAccessExpression(node);
    }
    public visitPostfixUnaryExpression(node: TypeScript.PostfixUnaryExpressionSyntax) {
        this.log(node);
        return super.visitPostfixUnaryExpression(node);
    }
    public visitElementAccessExpression(node: TypeScript.ElementAccessExpressionSyntax) {
        this.log(node);
        return super.visitElementAccessExpression(node);
    }
    public visitInvocationExpression(node: TypeScript.InvocationExpressionSyntax) {
        this.log(node);
        return super.visitInvocationExpression(node);
    }
    public visitBinaryExpression(node: TypeScript.BinaryExpressionSyntax) {
        this.log(node);
        return super.visitBinaryExpression(node);
    }
    public visitConditionalExpression(node: TypeScript.ConditionalExpressionSyntax) {
        this.log(node);
        return super.visitConditionalExpression(node);
    }

    public log(node: TypeScript.ISyntaxNodeOrToken) {
        var pos = this.document.lineMap().getLineAndCharacterFromPosition(this.position());
        this.results.push({ line: pos.line(), column: pos.character(), syntaxKind: TypeScript.SyntaxKind[node.kind()], identifierName: node.fullText().trim(), type: this.getTypeOfElement(node) });
    }
}