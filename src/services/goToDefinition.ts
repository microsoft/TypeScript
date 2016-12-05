/* @internal */
namespace ts.GoToDefinition {
    export function getDefinitionAtPosition(program: Program, sourceFile: SourceFile, position: number): DefinitionInfo[] {
        /// Triple slash reference comments
        const comment = findReferenceInPosition(sourceFile.referencedFiles, position);
        if (comment) {
            const referenceFile = tryResolveScriptReference(program, sourceFile, comment);
            if (referenceFile) {
                return [getDefinitionInfoForFileReference(comment.fileName, referenceFile.fileName)];
            }
            return undefined;
        }

        // Type reference directives
        const typeReferenceDirective = findReferenceInPosition(sourceFile.typeReferenceDirectives, position);
        if (typeReferenceDirective) {
            const referenceFile = program.getResolvedTypeReferenceDirectives().get(typeReferenceDirective.fileName);
            if (referenceFile && referenceFile.resolvedFileName) {
                return [getDefinitionInfoForFileReference(typeReferenceDirective.fileName, referenceFile.resolvedFileName)];
            }
            return undefined;
        }

        const node = getTouchingPropertyName(sourceFile, position);
        if (node === sourceFile) {
            return undefined;
        }

        // Labels
        if (isJumpStatementTarget(node)) {
            const labelName = (<Identifier>node).text;
            const label = getTargetLabel((<BreakOrContinueStatement>node.parent), (<Identifier>node).text);
            return label ? [createDefinitionInfo(label, ScriptElementKind.label, labelName, /*containerName*/ undefined)] : undefined;
        }

        const typeChecker = program.getTypeChecker();

        const calledDeclaration = tryGetSignatureDeclaration(typeChecker, node);
        if (calledDeclaration) {
            return [createDefinitionFromSignatureDeclaration(typeChecker, calledDeclaration)];
        }

        let symbol = typeChecker.getSymbolAtLocation(node);

        // Could not find a symbol e.g. node is string or number keyword,
        // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
        if (!symbol) {
            return undefined;
        }

        // If this is an alias, and the request came at the declaration location
        // get the aliased symbol instead. This allows for goto def on an import e.g.
        //   import {A, B} from "mod";
        // to jump to the implementation directly.
        if (symbol.flags & SymbolFlags.Alias) {
            const declaration = symbol.declarations[0];

            // Go to the original declaration for cases:
            //
            //   (1) when the aliased symbol was declared in the location(parent).
            //   (2) when the aliased symbol is originating from a named import.
            //
            if (node.kind === SyntaxKind.Identifier &&
                (node.parent === declaration ||
                (declaration.kind === SyntaxKind.ImportSpecifier && declaration.parent && declaration.parent.kind === SyntaxKind.NamedImports))) {

                symbol = typeChecker.getAliasedSymbol(symbol);
            }
        }

        // Because name in short-hand property assignment has two different meanings: property name and property value,
        // using go-to-definition at such position should go to the variable declaration of the property value rather than
        // go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition
        // is performed at the location of property access, we would like to go to definition of the property in the short-hand
        // assignment. This case and others are handled by the following code.
        if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
            const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
            if (!shorthandSymbol) {
                return [];
            }

            const shorthandDeclarations = shorthandSymbol.getDeclarations();
            const shorthandSymbolKind = SymbolDisplay.getSymbolKind(typeChecker, shorthandSymbol, node);
            const shorthandSymbolName = typeChecker.symbolToString(shorthandSymbol);
            const shorthandContainerName = typeChecker.symbolToString(symbol.parent, node);
            return map(shorthandDeclarations,
                declaration => createDefinitionInfo(declaration, shorthandSymbolKind, shorthandSymbolName, shorthandContainerName));
        }

        return getDefinitionFromSymbol(typeChecker, symbol, node);
    }

    /// Goto type
    export function getTypeDefinitionAtPosition(typeChecker: TypeChecker, sourceFile: SourceFile, position: number): DefinitionInfo[] {
        const node = getTouchingPropertyName(sourceFile, position);
        if (node === sourceFile) {
            return undefined;
        }

        const symbol = typeChecker.getSymbolAtLocation(node);
        if (!symbol) {
            return undefined;
        }

        const type = typeChecker.getTypeOfSymbolAtLocation(symbol, node);
        if (!type) {
            return undefined;
        }

        if (type.flags & TypeFlags.Union && !(type.flags & TypeFlags.Enum)) {
            const result: DefinitionInfo[] = [];
            forEach((<UnionType>type).types, t => {
                if (t.symbol) {
                    addRange(/*to*/ result, /*from*/ getDefinitionFromSymbol(typeChecker, t.symbol, node));
                }
            });
            return result;
        }

        if (!type.symbol) {
            return undefined;
        }

        return getDefinitionFromSymbol(typeChecker, type.symbol, node);
    }

    function getDefinitionFromSymbol(typeChecker: TypeChecker, symbol: Symbol, node: Node): DefinitionInfo[] {
        const result: DefinitionInfo[] = [];
        const declarations = symbol.getDeclarations();
        const { symbolName, symbolKind, containerName } = getSymbolInfo(typeChecker, symbol, node);

        if (!tryAddConstructSignature(symbol, node, symbolKind, symbolName, containerName, result) &&
            !tryAddCallSignature(symbol, node, symbolKind, symbolName, containerName, result)) {
            // Just add all the declarations.
            forEach(declarations, declaration => {
                result.push(createDefinitionInfo(declaration, symbolKind, symbolName, containerName));
            });
        }

        return result;

        function tryAddConstructSignature(symbol: Symbol, location: Node, symbolKind: string, symbolName: string, containerName: string, result: DefinitionInfo[]) {
            // Applicable only if we are in a new expression, or we are on a constructor declaration
            // and in either case the symbol has a construct signature definition, i.e. class
            if (isNewExpressionTarget(location) || location.kind === SyntaxKind.ConstructorKeyword) {
                if (symbol.flags & SymbolFlags.Class) {
                    // Find the first class-like declaration and try to get the construct signature.
                    for (const declaration of symbol.getDeclarations()) {
                        if (isClassLike(declaration)) {
                            return tryAddSignature(declaration.members,
                                                    /*selectConstructors*/ true,
                                                    symbolKind,
                                                    symbolName,
                                                    containerName,
                                                    result);
                        }
                    }

                    Debug.fail("Expected declaration to have at least one class-like declaration");
                }
            }
            return false;
        }

        function tryAddCallSignature(symbol: Symbol, location: Node, symbolKind: string, symbolName: string, containerName: string, result: DefinitionInfo[]) {
            if (isCallExpressionTarget(location) || isNewExpressionTarget(location) || isNameOfFunctionDeclaration(location)) {
                return tryAddSignature(symbol.declarations, /*selectConstructors*/ false, symbolKind, symbolName, containerName, result);
            }
            return false;
        }

        function tryAddSignature(signatureDeclarations: Declaration[], selectConstructors: boolean, symbolKind: string, symbolName: string, containerName: string, result: DefinitionInfo[]) {
            const declarations: Declaration[] = [];
            let definition: Declaration;

            forEach(signatureDeclarations, d => {
                if ((selectConstructors && d.kind === SyntaxKind.Constructor) ||
                    (!selectConstructors && (d.kind === SyntaxKind.FunctionDeclaration || d.kind === SyntaxKind.MethodDeclaration || d.kind === SyntaxKind.MethodSignature))) {
                    declarations.push(d);
                    if ((<FunctionLikeDeclaration>d).body) definition = d;
                }
            });

            if (definition) {
                result.push(createDefinitionInfo(definition, symbolKind, symbolName, containerName));
                return true;
            }
            else if (declarations.length) {
                result.push(createDefinitionInfo(lastOrUndefined(declarations), symbolKind, symbolName, containerName));
                return true;
            }

            return false;
        }
    }

    function createDefinitionInfo(node: Node, symbolKind: string, symbolName: string, containerName: string): DefinitionInfo {
        return {
            fileName: node.getSourceFile().fileName,
            textSpan: createTextSpanFromBounds(node.getStart(), node.getEnd()),
            kind: symbolKind,
            name: symbolName,
            containerKind: undefined,
            containerName
        };
    }

    function getSymbolInfo(typeChecker: TypeChecker, symbol: Symbol, node: Node) {
        return {
            symbolName: typeChecker.symbolToString(symbol), // Do not get scoped name, just the name of the symbol
            symbolKind: SymbolDisplay.getSymbolKind(typeChecker, symbol, node),
            containerName: symbol.parent ? typeChecker.symbolToString(symbol.parent, node) : ""
        };
    }

    function createDefinitionFromSignatureDeclaration(typeChecker: TypeChecker, decl: SignatureDeclaration): DefinitionInfo {
        const { symbolName, symbolKind, containerName } = getSymbolInfo(typeChecker, decl.symbol, decl);
        return createDefinitionInfo(decl, symbolKind, symbolName, containerName);
    }

    function findReferenceInPosition(refs: FileReference[], pos: number): FileReference {
        for (const ref of refs) {
            if (ref.pos <= pos && pos < ref.end) {
                return ref;
            }
        }
        return undefined;
    }

    function getDefinitionInfoForFileReference(name: string, targetFileName: string): DefinitionInfo {
        return {
            fileName: targetFileName,
            textSpan: createTextSpanFromBounds(0, 0),
            kind: ScriptElementKind.scriptElement,
            name: name,
            containerName: undefined,
            containerKind: undefined
        };
    }

    /** Returns a CallLikeExpression where `node` is the target being invoked. */
    function getAncestorCallLikeExpression(node: Node): CallLikeExpression | undefined {
        const target = climbPastManyPropertyAccesses(node);
        const callLike = target.parent;
        return callLike && isCallLikeExpression(callLike) && getInvokedExpression(callLike) === target && callLike;
    }

    function climbPastManyPropertyAccesses(node: Node): Node {
        return isRightSideOfPropertyAccess(node) ? climbPastManyPropertyAccesses(node.parent) : node;
    }

    function tryGetSignatureDeclaration(typeChecker: TypeChecker, node: Node): SignatureDeclaration | undefined {
        const callLike = getAncestorCallLikeExpression(node);
        return callLike && typeChecker.getResolvedSignature(callLike).declaration;
    }
}
