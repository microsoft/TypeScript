module TypeScript {
    function assertParent(parent: ISyntaxElement, child: ISyntaxElement) {
        if (child) {
            return Debug.assert(parent === child.parent);
        }
    }

    export function nodeStructuralEquals(node1: TypeScript.ISyntaxNode, node2: TypeScript.ISyntaxNode, checkParents: boolean, text1: ISimpleText, text2: ISimpleText): boolean {
        if (node1 === node2) { return true; }
        if (!node1 || !node2) { return false; }

        Debug.assert(node1.kind() === TypeScript.SyntaxKind.SourceUnit || node1.parent);
        Debug.assert(node2.kind() === TypeScript.SyntaxKind.SourceUnit || node2.parent);

        if (node1.kind() !== node2.kind()) { return false; }
        if (node1.childCount() !== node2.childCount()) { return false; }

        for (var i = 0, n = node1.childCount(); i < n; i++) {
            var element1 = node1.childAt(i);
            var element2 = node2.childAt(i);

            if (checkParents) {
                assertParent(node1, element1);
                assertParent(node2, element2);
            }

            if (!elementStructuralEquals(element1, element2, checkParents, text1, text2)) {
                return false;
            }
        }

        return true;
    }

    export function nodeOrTokenStructuralEquals(node1: TypeScript.ISyntaxNodeOrToken, node2: TypeScript.ISyntaxNodeOrToken, checkParents: boolean, text1: ISimpleText, text2: ISimpleText): boolean {
        if (node1 === node2) {
            return true;
        }

        if (!node1 || !node2) {
            return false;
        }

        Debug.assert(node1.kind() === TypeScript.SyntaxKind.SourceUnit || node1.parent);
        Debug.assert(node2.kind() === TypeScript.SyntaxKind.SourceUnit || node2.parent);

        if (TypeScript.isToken(node1)) {
            return TypeScript.isToken(node2) ? tokenStructuralEquals(<TypeScript.ISyntaxToken>node1, <TypeScript.ISyntaxToken>node2, text1, text2) : false;
        }

        return TypeScript.isNode(node2) ? nodeStructuralEquals(<TypeScript.ISyntaxNode>node1, <TypeScript.ISyntaxNode>node2, checkParents, text1, text2) : false;
    }

    export function tokenStructuralEquals(token1: TypeScript.ISyntaxToken, token2: TypeScript.ISyntaxToken, text1: ISimpleText, text2: ISimpleText): boolean {
        if (token1 === token2) {
            return true;
        }

        if (!token1 || !token2) {
            return false;
        }

        Debug.assert(token1.parent);
        Debug.assert(token2.parent);

        return token1.kind() === token2.kind() &&
            TypeScript.width(token1) === TypeScript.width(token2) &&
            token1.fullWidth() === token2.fullWidth() &&
            token1.fullStart() === token2.fullStart() &&
            TypeScript.fullEnd(token1) === TypeScript.fullEnd(token2) &&
            TypeScript.start(token1, text1) === TypeScript.start(token2, text2) &&
            TypeScript.end(token1, text1) === TypeScript.end(token2, text2) &&
            token1.text() === token2.text() &&
            triviaListStructuralEquals(token1.leadingTrivia(text1), token2.leadingTrivia(text2)) &&
            triviaListStructuralEquals(token1.trailingTrivia(text1), token2.trailingTrivia(text2));
    }

    export function triviaListStructuralEquals(triviaList1: TypeScript.ISyntaxTriviaList, triviaList2: TypeScript.ISyntaxTriviaList): boolean {
        Debug.assert(triviaList1.isShared() || triviaList1.parent);
        Debug.assert(triviaList1.isShared() || triviaList2.parent);

        if (triviaList1.count() !== triviaList2.count()) {
            return false;
        }

        for (var i = 0, n = triviaList1.count(); i < n; i++) {
            if (!triviaStructuralEquals(triviaList1.syntaxTriviaAt(i), triviaList2.syntaxTriviaAt(i))) {
                return false;
            }
        }

        return true;
    }

    export function triviaStructuralEquals(trivia1: TypeScript.ISyntaxTrivia, trivia2: TypeScript.ISyntaxTrivia): boolean {
        Debug.assert(trivia1.parent);
        Debug.assert(trivia2.parent);

        return trivia1.kind === trivia2.kind &&
            trivia1.fullWidth() === trivia2.fullWidth() &&
            trivia1.fullText() === trivia2.fullText();
    }

    function listStructuralEquals<T extends TypeScript.ISyntaxNodeOrToken>(list1: T[], list2: T[], checkParents: boolean, text1: ISimpleText, text2: ISimpleText): boolean {
        Debug.assert(list1.parent);
        Debug.assert(list2.parent);

        if (list1.childCount() !== list2.childCount()) {
            return false;
        }

        for (var i = 0, n = list1.childCount(); i < n; i++) {
            var child1 = list1.childAt(i);
            var child2 = list2.childAt(i);

            if (checkParents) {
                assertParent(list1, child1);
                assertParent(list2, child2);
            }

            if (!nodeOrTokenStructuralEquals(child1, child2, checkParents, text1, text2)) {
                return false;
            }
        }

        return true;
    }

    export function elementStructuralEquals(element1: TypeScript.ISyntaxElement, element2: TypeScript.ISyntaxElement, checkParents: boolean, text1: ISimpleText, text2: ISimpleText) {
        if (element1 === element2) {
            return true;
        }

        if (!element1 || !element2) {
            return false;
        }

        Debug.assert(element1.kind() === SyntaxKind.SourceUnit || element1.parent);
        Debug.assert(element2.kind() === SyntaxKind.SourceUnit || element2.parent);

        if (element2.kind() !== element2.kind()) {
            return false;
        }

        if (TypeScript.fullStart(element1) !== TypeScript.fullStart(element2)) {
            return false;
        }

        if (TypeScript.start(element1) !== TypeScript.start(element2)) {
            return false;
        }

        if (TypeScript.end(element1) !== TypeScript.end(element2)) {
            return false;
        }

        if (TypeScript.fullEnd(element1) !== TypeScript.fullEnd(element2)) {
            return false;
        }

        if (TypeScript.isToken(element1)) {
            return tokenStructuralEquals(<TypeScript.ISyntaxToken>element1, <TypeScript.ISyntaxToken>element2, text1, text2);
        }
        else if (TypeScript.isNode(element1)) {
            return nodeStructuralEquals(<TypeScript.ISyntaxNode>element1, <TypeScript.ISyntaxNode>element2, checkParents, text1, text2);
        }
        else if (TypeScript.isList(element1)) {
            return listStructuralEquals(<TypeScript.ISyntaxNodeOrToken[]>element1, <TypeScript.ISyntaxNodeOrToken[]>element2, checkParents, text1, text2);
        }

        throw TypeScript.Errors.invalidOperation();
    }

    export function treeStructuralEquals(tree1: TypeScript.SyntaxTree, tree2: TypeScript.SyntaxTree, checkParents: boolean): boolean {
        if (!TypeScript.ArrayUtilities.sequenceEquals(tree1.diagnostics(), tree2.diagnostics(), TypeScript.Diagnostic.equals)) {
            return false;
        }

        return nodeStructuralEquals(tree1.sourceUnit(), tree2.sourceUnit(), checkParents, tree1.text, tree2.text);
    }
}