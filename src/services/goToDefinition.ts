/* @internal */
namespace ts.GoToDefinition {
    export function getDefinitionAtPosition(program: Program, sourceFile: SourceFile, position: number): DefinitionInfo[] {
        const reference = getReferenceAtPosition(sourceFile, position, program);
        if (reference) {
            return [getDefinitionInfoForFileReference(reference.fileName, reference.file.fileName)];
        }

        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
        if (node === sourceFile) {
            return undefined;
        }

        // Labels
        if (isJumpStatementTarget(node)) {
            const label = getTargetLabel(node.parent, node.text);
            return label ? [createDefinitionInfoFromName(label, ScriptElementKind.label, node.text, /*containerName*/ undefined)] : undefined;
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
        if (symbol.flags & SymbolFlags.Alias && shouldSkipAlias(node, symbol.declarations[0])) {
            const aliased = typeChecker.getAliasedSymbol(symbol);
            if (aliased.declarations) {
                symbol = aliased;
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

        // If the node is the name of a BindingElement within an ObjectBindingPattern instead of just returning the
        // declaration the symbol (which is itself), we should try to get to the original type of the ObjectBindingPattern
        // and return the property declaration for the referenced property.
        // For example:
        //      import('./foo').then(({ b/*goto*/ar }) => undefined); => should get use to the declaration in file "./foo"
        //
        //      function bar<T>(onfulfilled: (value: T) => void) { //....}
        //      interface Test {
        //          pr/*destination*/op1: number
        //      }
        //      bar<Test>(({pr/*goto*/op1})=>{});
        if (isPropertyName(node) && isBindingElement(node.parent) && isObjectBindingPattern(node.parent.parent) &&
            (node === (node.parent.propertyName || node.parent.name))) {
            const type = typeChecker.getTypeAtLocation(node.parent.parent);
            if (type) {
                const propSymbols = getPropertySymbolsFromType(type, node);
                if (propSymbols) {
                    return flatMap(propSymbols, propSymbol => getDefinitionFromSymbol(typeChecker, propSymbol, node));
                }
            }
        }

        // If the current location we want to find its definition is in an object literal, try to get the contextual type for the
        // object literal, lookup the property symbol in the contextual type, and use this for goto-definition.
        // For example
        //      interface Props{
        //          /*first*/prop1: number
        //          prop2: boolean
        //      }
        //      function Foo(arg: Props) {}
        //      Foo( { pr/*1*/op1: 10, prop2: true })
        const element = getContainingObjectLiteralElement(node);
        if (element && typeChecker.getContextualType(element.parent as Expression)) {
            return flatMap(getPropertySymbolsFromContextualType(typeChecker, element), propertySymbol =>
                getDefinitionFromSymbol(typeChecker, propertySymbol, node));
        }
        return getDefinitionFromSymbol(typeChecker, symbol, node);
    }

    export function getReferenceAtPosition(sourceFile: SourceFile, position: number, program: Program): { fileName: string, file: SourceFile } | undefined {
        const referencePath = findReferenceInPosition(sourceFile.referencedFiles, position);
        if (referencePath) {
            const file = tryResolveScriptReference(program, sourceFile, referencePath);
            return file && { fileName: referencePath.fileName, file };
        }

        const typeReferenceDirective = findReferenceInPosition(sourceFile.typeReferenceDirectives, position);
        if (typeReferenceDirective) {
            const reference = program.getResolvedTypeReferenceDirectives().get(typeReferenceDirective.fileName);
            const file = reference && program.getSourceFile(reference.resolvedFileName);
            return file && { fileName: typeReferenceDirective.fileName, file };
        }

        return undefined;
    }

    /// Goto type
    export function getTypeDefinitionAtPosition(typeChecker: TypeChecker, sourceFile: SourceFile, position: number): DefinitionInfo[] {
        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
        if (node === sourceFile) {
            return undefined;
        }

        const symbol = typeChecker.getSymbolAtLocation(node);
        const type = symbol && typeChecker.getTypeOfSymbolAtLocation(symbol, node);
        if (!type) {
            return undefined;
        }

        if (type.isUnion() && !(type.flags & TypeFlags.Enum)) {
            return flatMap(type.types, t => t.symbol && getDefinitionFromSymbol(typeChecker, t.symbol, node));
        }

        return type.symbol && getDefinitionFromSymbol(typeChecker, type.symbol, node);
    }

    export function getDefinitionAndBoundSpan(program: Program, sourceFile: SourceFile, position: number): DefinitionInfoAndBoundSpan {
        const definitions = getDefinitionAtPosition(program, sourceFile, position);

        if (!definitions || definitions.length === 0) {
            return undefined;
        }

        // Check if position is on triple slash reference.
        const comment = findReferenceInPosition(sourceFile.referencedFiles, position) || findReferenceInPosition(sourceFile.typeReferenceDirectives, position);
        if (comment) {
            return { definitions, textSpan: createTextSpanFromRange(comment) };
        }

        const node = getTouchingPropertyName(sourceFile, position, /*includeJsDocComment*/ true);
        const textSpan = createTextSpan(node.getStart(), node.getWidth());

        return { definitions, textSpan };
    }

    // Go to the original declaration for cases:
    //
    //   (1) when the aliased symbol was declared in the location(parent).
    //   (2) when the aliased symbol is originating from an import.
    //
    function shouldSkipAlias(node: Node, declaration: Node): boolean {
        if (node.kind !== SyntaxKind.Identifier) {
            return false;
        }
        if (node.parent === declaration) {
            return true;
        }
        switch (declaration.kind) {
            case SyntaxKind.ImportClause:
            case SyntaxKind.ImportEqualsDeclaration:
                return true;
            case SyntaxKind.ImportSpecifier:
                return declaration.parent.kind === SyntaxKind.NamedImports;
            default:
                return false;
        }
    }

    function getDefinitionFromSymbol(typeChecker: TypeChecker, symbol: Symbol, node: Node): DefinitionInfo[] {
        const { symbolName, symbolKind, containerName } = getSymbolInfo(typeChecker, symbol, node);
        return getConstructSignatureDefinition() || getCallSignatureDefinition() || map(symbol.declarations, declaration => createDefinitionInfo(declaration, symbolKind, symbolName, containerName));

        function getConstructSignatureDefinition(): DefinitionInfo[] | undefined {
            // Applicable only if we are in a new expression, or we are on a constructor declaration
            // and in either case the symbol has a construct signature definition, i.e. class
            if (symbol.flags & SymbolFlags.Class && (isNewExpressionTarget(node) || node.kind === SyntaxKind.ConstructorKeyword)) {
                const cls = find(symbol.declarations, isClassLike) || Debug.fail("Expected declaration to have at least one class-like declaration");
                return getSignatureDefinition(cls.members, /*selectConstructors*/ true);
            }
        }

        function getCallSignatureDefinition(): DefinitionInfo[] | undefined {
            return isCallExpressionTarget(node) || isNewExpressionTarget(node) || isNameOfFunctionDeclaration(node)
                ? getSignatureDefinition(symbol.declarations, /*selectConstructors*/ false)
                : undefined;
        }

        function getSignatureDefinition(signatureDeclarations: ReadonlyArray<Declaration> | undefined, selectConstructors: boolean): DefinitionInfo[] | undefined {
            if (!signatureDeclarations) {
                return undefined;
            }
            const declarations = signatureDeclarations.filter(selectConstructors ? isConstructorDeclaration : isSignatureDeclaration);
            return declarations.length
                ? [createDefinitionInfo(find(declarations, d => !!(<FunctionLikeDeclaration>d).body) || last(declarations), symbolKind, symbolName, containerName)]
                : undefined;
        }
    }

    function isSignatureDeclaration(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
                return true;
            default:
                return false;
        }
    }

    /** Creates a DefinitionInfo from a Declaration, using the declaration's name if possible. */
    function createDefinitionInfo(node: Declaration, symbolKind: ScriptElementKind, symbolName: string, containerName: string): DefinitionInfo {
        return createDefinitionInfoFromName(getNameOfDeclaration(node) || node, symbolKind, symbolName, containerName);
    }

    /** Creates a DefinitionInfo directly from the name of a declaration. */
    function createDefinitionInfoFromName(name: Node, symbolKind: ScriptElementKind, symbolName: string, containerName: string): DefinitionInfo {
        const sourceFile = name.getSourceFile();
        return {
            fileName: sourceFile.fileName,
            textSpan: createTextSpanFromNode(name, sourceFile),
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

    export function findReferenceInPosition(refs: ReadonlyArray<FileReference>, pos: number): FileReference | undefined {
        for (const ref of refs) {
            if (ref.pos <= pos && pos <= ref.end) {
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
            name,
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
        const signature = callLike && typeChecker.getResolvedSignature(callLike);
        if (signature) {
            const decl = signature.declaration;
            if (decl && isSignatureDeclaration(decl)) {
                return decl;
            }
        }
        // Don't go to a function type, go to the value having that type.
        return undefined;
    }
}
