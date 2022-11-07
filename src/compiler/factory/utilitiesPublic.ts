import * as ts from "../_namespaces/ts";

export function setTextRange<T extends ts.TextRange>(range: T, location: ts.TextRange | undefined): T {
    return location ? ts.setTextRangePosEnd(range, location.pos, location.end) : range;
}

export function canHaveModifiers(node: ts.Node): node is ts.HasModifiers {
    const kind = node.kind;
    return kind === ts.SyntaxKind.TypeParameter
        || kind === ts.SyntaxKind.Parameter
        || kind === ts.SyntaxKind.PropertySignature
        || kind === ts.SyntaxKind.PropertyDeclaration
        || kind === ts.SyntaxKind.MethodSignature
        || kind === ts.SyntaxKind.MethodDeclaration
        || kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor
        || kind === ts.SyntaxKind.IndexSignature
        || kind === ts.SyntaxKind.ConstructorType
        || kind === ts.SyntaxKind.FunctionExpression
        || kind === ts.SyntaxKind.ArrowFunction
        || kind === ts.SyntaxKind.ClassExpression
        || kind === ts.SyntaxKind.VariableStatement
        || kind === ts.SyntaxKind.FunctionDeclaration
        || kind === ts.SyntaxKind.ClassDeclaration
        || kind === ts.SyntaxKind.InterfaceDeclaration
        || kind === ts.SyntaxKind.TypeAliasDeclaration
        || kind === ts.SyntaxKind.EnumDeclaration
        || kind === ts.SyntaxKind.ModuleDeclaration
        || kind === ts.SyntaxKind.ImportEqualsDeclaration
        || kind === ts.SyntaxKind.ImportDeclaration
        || kind === ts.SyntaxKind.ExportAssignment
        || kind === ts.SyntaxKind.ExportDeclaration;
}

export function canHaveDecorators(node: ts.Node): node is ts.HasDecorators {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Parameter
        || kind === ts.SyntaxKind.PropertyDeclaration
        || kind === ts.SyntaxKind.MethodDeclaration
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor
        || kind === ts.SyntaxKind.ClassExpression
        || kind === ts.SyntaxKind.ClassDeclaration;
}