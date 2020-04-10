import * as ts from 'typescript';

export function overwriteOptional(data: string): string {
    const sourceFile = ts.createSourceFile("input.d.ts", data, ts.ScriptTarget.Latest, true);
    const fixes: Array<{insertAt: number, remove: [number, number]}> = [];
    sourceFile.forEachChild(visit);

    let result = data;
    while (fixes.length > 0) {
        const {insertAt, remove} = fixes.pop()!;
        result = result.substring(0, remove[0]) + result.substring(remove[1], insertAt) + '?' + result.substring(insertAt);
    }
    return result;

    function visit(node: ts.Node) {
        if (isTraversable(node)) {
            const trivia = node.getFullText().substr(0, node.getLeadingTriviaWidth());
            if (trivia.indexOf('@optional') >= 0 && hasName(node)) {
                fixes.push({
                  insertAt: node.name.getEnd(),
                  remove: [node.getStart(sourceFile, true), node.getStart()],  // jsDoc
                });
            }
            node.forEachChild(visit);
        }
    }
}

function isTraversable(node: ts.Node) {
    switch (node.kind) {
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.IndexSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.ModuleBlock:
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.SyntaxList:
            return true;
    }
    return false;
}

function hasName(node: ts.Node) : node is ts.Node&{name: ts.Identifier} {
    switch (node.kind) {
        case ts.SyntaxKind.PropertySignature:
            return true;
    }
    return false;
}
