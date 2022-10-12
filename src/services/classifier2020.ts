import * as ts from "./_namespaces/ts";

/** @internal */

/** @internal */
export const enum TokenEncodingConsts {
    typeOffset = 8,
    modifierMask = (1 << typeOffset) - 1
}

/** @internal */
export const enum TokenType {
    class, enum, interface, namespace, typeParameter, type, parameter, variable, enumMember, property, function, member
}

/** @internal */
export const enum TokenModifier {
    declaration, static, async, readonly, defaultLibrary, local
}

/** @internal */
/** This is mainly used internally for testing */
export function getSemanticClassifications(program: ts.Program, cancellationToken: ts.CancellationToken, sourceFile: ts.SourceFile, span: ts.TextSpan): ts.ClassifiedSpan2020[] {
    const classifications = getEncodedSemanticClassifications(program, cancellationToken, sourceFile, span);

    ts.Debug.assert(classifications.spans.length % 3 === 0);
    const dense = classifications.spans;
    const result: ts.ClassifiedSpan2020[] = [];
    for (let i = 0; i < dense.length; i += 3) {
        result.push({
            textSpan: ts.createTextSpan(dense[i], dense[i + 1]),
            classificationType: dense[i + 2]
        });
    }

    return result;
}

/** @internal */
export function getEncodedSemanticClassifications(program: ts.Program, cancellationToken: ts.CancellationToken, sourceFile: ts.SourceFile, span: ts.TextSpan): ts.Classifications {
    return {
        spans: getSemanticTokens(program, sourceFile, span, cancellationToken),
        endOfLineState: ts.EndOfLineState.None
    };
}

function getSemanticTokens(program: ts.Program, sourceFile: ts.SourceFile, span: ts.TextSpan, cancellationToken: ts.CancellationToken): number[] {
    const resultTokens: number[] = [];

    const collector = (node: ts.Node, typeIdx: number, modifierSet: number) => {
        resultTokens.push(node.getStart(sourceFile), node.getWidth(sourceFile), ((typeIdx + 1) << TokenEncodingConsts.typeOffset) + modifierSet);
    };

    if (program && sourceFile) {
        collectTokens(program, sourceFile, span, collector, cancellationToken);
    }
    return resultTokens;
}

function collectTokens(program: ts.Program, sourceFile: ts.SourceFile, span: ts.TextSpan, collector: (node: ts.Node, tokenType: number, tokenModifier: number) => void, cancellationToken: ts.CancellationToken) {
    const typeChecker = program.getTypeChecker();

    let inJSXElement = false;

    function visit(node: ts.Node) {
        switch(node.kind) {
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
                cancellationToken.throwIfCancellationRequested();
        }

        if (!node || !ts.textSpanIntersectsWith(span, node.pos, node.getFullWidth()) || node.getFullWidth() === 0) {
            return;
        }
        const prevInJSXElement = inJSXElement;
        if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
            inJSXElement = true;
        }
        if (ts.isJsxExpression(node)) {
            inJSXElement = false;
        }

        if (ts.isIdentifier(node) && !inJSXElement && !inImportClause(node) && !ts.isInfinityOrNaNString(node.escapedText)) {
            let symbol = typeChecker.getSymbolAtLocation(node);
            if (symbol) {
                if (symbol.flags & ts.SymbolFlags.Alias) {
                    symbol = typeChecker.getAliasedSymbol(symbol);
                }
                let typeIdx = classifySymbol(symbol, ts.getMeaningFromLocation(node));
                if (typeIdx !== undefined) {
                    let modifierSet = 0;
                    if (node.parent) {
                        const parentIsDeclaration = (ts.isBindingElement(node.parent) || tokenFromDeclarationMapping.get(node.parent.kind) === typeIdx);
                        if (parentIsDeclaration && (node.parent as ts.NamedDeclaration).name === node) {
                            modifierSet = 1 << TokenModifier.declaration;
                        }
                    }

                    // property declaration in constructor
                    if (typeIdx === TokenType.parameter && isRightSideOfQualifiedNameOrPropertyAccess(node)) {
                        typeIdx = TokenType.property;
                    }

                    typeIdx = reclassifyByType(typeChecker, node, typeIdx);

                    const decl = symbol.valueDeclaration;
                    if (decl) {
                        const modifiers = ts.getCombinedModifierFlags(decl);
                        const nodeFlags = ts.getCombinedNodeFlags(decl);
                        if (modifiers & ts.ModifierFlags.Static) {
                            modifierSet |= 1 << TokenModifier.static;
                        }
                        if (modifiers & ts.ModifierFlags.Async) {
                            modifierSet |= 1 << TokenModifier.async;
                        }
                        if (typeIdx !== TokenType.class && typeIdx !== TokenType.interface) {
                            if ((modifiers & ts.ModifierFlags.Readonly) || (nodeFlags & ts.NodeFlags.Const) || (symbol.getFlags() & ts.SymbolFlags.EnumMember)) {
                                modifierSet |= 1 << TokenModifier.readonly;
                            }
                        }
                        if ((typeIdx === TokenType.variable || typeIdx === TokenType.function) && isLocalDeclaration(decl, sourceFile)) {
                            modifierSet |= 1 << TokenModifier.local;
                        }
                        if (program.isSourceFileDefaultLibrary(decl.getSourceFile())) {
                            modifierSet |= 1 << TokenModifier.defaultLibrary;
                        }
                    }
                    else if (symbol.declarations && symbol.declarations.some(d => program.isSourceFileDefaultLibrary(d.getSourceFile()))) {
                        modifierSet |= 1 << TokenModifier.defaultLibrary;
                    }

                    collector(node, typeIdx, modifierSet);

                }
            }
        }
        ts.forEachChild(node, visit);

        inJSXElement = prevInJSXElement;
    }
    visit(sourceFile);
}

function classifySymbol(symbol: ts.Symbol, meaning: ts.SemanticMeaning): TokenType | undefined {
    const flags = symbol.getFlags();
    if (flags & ts.SymbolFlags.Class) {
        return TokenType.class;
    }
    else if (flags & ts.SymbolFlags.Enum) {
        return TokenType.enum;
    }
     else if (flags & ts.SymbolFlags.TypeAlias) {
        return TokenType.type;
    }
    else if (flags & ts.SymbolFlags.Interface) {
        if (meaning & ts.SemanticMeaning.Type) {
            return TokenType.interface;
        }
    }
    else if (flags & ts.SymbolFlags.TypeParameter) {
        return TokenType.typeParameter;
    }
    let decl = symbol.valueDeclaration || symbol.declarations && symbol.declarations[0];
    if (decl && ts.isBindingElement(decl)) {
        decl = getDeclarationForBindingElement(decl);
    }
    return decl && tokenFromDeclarationMapping.get(decl.kind);
}

function reclassifyByType(typeChecker: ts.TypeChecker, node: ts.Node, typeIdx: TokenType): TokenType {
    // type based classifications
    if (typeIdx === TokenType.variable || typeIdx === TokenType.property || typeIdx === TokenType.parameter) {
        const type = typeChecker.getTypeAtLocation(node);
        if (type) {
            const test = (condition: (type: ts.Type) => boolean) => {
                return condition(type) || type.isUnion() && type.types.some(condition);
            };
            if (typeIdx !== TokenType.parameter && test(t => t.getConstructSignatures().length > 0)) {
                return TokenType.class;
            }
            if (test(t => t.getCallSignatures().length > 0) && !test(t => t.getProperties().length > 0) || isExpressionInCallExpression(node)) {
                return typeIdx === TokenType.property ? TokenType.member : TokenType.function;
            }
        }
    }
    return typeIdx;
}

function isLocalDeclaration(decl: ts.Declaration, sourceFile: ts.SourceFile): boolean {
    if (ts.isBindingElement(decl)) {
        decl = getDeclarationForBindingElement(decl);
    }
    if (ts.isVariableDeclaration(decl)) {
        return (!ts.isSourceFile(decl.parent.parent.parent) || ts.isCatchClause(decl.parent)) && decl.getSourceFile() === sourceFile;
    }
    else if (ts.isFunctionDeclaration(decl)) {
        return !ts.isSourceFile(decl.parent) && decl.getSourceFile() === sourceFile;
    }
    return false;
}

function getDeclarationForBindingElement(element: ts.BindingElement): ts.VariableDeclaration | ts.ParameterDeclaration {
    while (true) {
        if (ts.isBindingElement(element.parent.parent)) {
            element = element.parent.parent;
        }
        else {
            return element.parent.parent;
        }
    }
}

function inImportClause(node: ts.Node): boolean {
    const parent = node.parent;
    return parent && (ts.isImportClause(parent) || ts.isImportSpecifier(parent) || ts.isNamespaceImport(parent));
}

function isExpressionInCallExpression(node: ts.Node): boolean {
    while (isRightSideOfQualifiedNameOrPropertyAccess(node)) {
        node = node.parent;
    }
    return ts.isCallExpression(node.parent) && node.parent.expression === node;
}

function isRightSideOfQualifiedNameOrPropertyAccess(node: ts.Node): boolean {
    return (ts.isQualifiedName(node.parent) && node.parent.right === node) || (ts.isPropertyAccessExpression(node.parent) && node.parent.name === node);
}

const tokenFromDeclarationMapping = new ts.Map<ts.SyntaxKind, TokenType>([
    [ts.SyntaxKind.VariableDeclaration, TokenType.variable],
    [ts.SyntaxKind.Parameter, TokenType.parameter],
    [ts.SyntaxKind.PropertyDeclaration, TokenType.property],
    [ts.SyntaxKind.ModuleDeclaration, TokenType.namespace],
    [ts.SyntaxKind.EnumDeclaration, TokenType.enum],
    [ts.SyntaxKind.EnumMember, TokenType.enumMember],
    [ts.SyntaxKind.ClassDeclaration, TokenType.class],
    [ts.SyntaxKind.MethodDeclaration, TokenType.member],
    [ts.SyntaxKind.FunctionDeclaration, TokenType.function],
    [ts.SyntaxKind.FunctionExpression, TokenType.function],
    [ts.SyntaxKind.MethodSignature, TokenType.member],
    [ts.SyntaxKind.GetAccessor, TokenType.property],
    [ts.SyntaxKind.SetAccessor, TokenType.property],
    [ts.SyntaxKind.PropertySignature, TokenType.property],
    [ts.SyntaxKind.InterfaceDeclaration, TokenType.interface],
    [ts.SyntaxKind.TypeAliasDeclaration, TokenType.type],
    [ts.SyntaxKind.TypeParameter, TokenType.typeParameter],
    [ts.SyntaxKind.PropertyAssignment, TokenType.property],
    [ts.SyntaxKind.ShorthandPropertyAssignment, TokenType.property]
]);
