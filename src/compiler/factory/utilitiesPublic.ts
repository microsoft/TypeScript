import {
    HasDecorators,
    HasModifiers,
    Node,
    setTextRangePosEnd,
    SyntaxKind,
    TextRange,
} from "../_namespaces/ts.js";

export function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T {
    return location ? setTextRangePosEnd(range, location.pos, location.end) : range;
}

export function canHaveModifiers(node: Node): node is HasModifiers {
    const kind = node.kind;
    return kind === SyntaxKind.TypeParameter
        || kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertySignature
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodSignature
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.Constructor
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.IndexSignature
        || kind === SyntaxKind.ConstructorType
        || kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.ArrowFunction
        || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.ClassDeclaration
        || kind === SyntaxKind.InterfaceDeclaration
        || kind === SyntaxKind.TypeAliasDeclaration
        || kind === SyntaxKind.EnumDeclaration
        || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.ImportEqualsDeclaration
        || kind === SyntaxKind.ImportDeclaration
        || kind === SyntaxKind.ExportAssignment
        || kind === SyntaxKind.ExportDeclaration;
}

export function canHaveDecorators(node: Node): node is HasDecorators {
    const kind = node.kind;
    return kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.ClassDeclaration;
}
