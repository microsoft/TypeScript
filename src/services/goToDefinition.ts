/* @internal */
namespace ts.GoToDefinition {
    export function getDefinitionAtPosition(program: Program, sourceFile: SourceFile, position: number, searchOtherFilesOnly?: boolean): readonly DefinitionInfo[] | undefined {
        const resolvedRef = getReferenceAtPosition(sourceFile, position, program);
        const fileReferenceDefinition = resolvedRef && [getDefinitionInfoForFileReference(resolvedRef.reference.fileName, resolvedRef.fileName, resolvedRef.unverified)] || emptyArray;
        if (resolvedRef?.file) {
            // If `file` is missing, do a symbol-based lookup as well
            return fileReferenceDefinition;
        }

        const node = getTouchingPropertyName(sourceFile, position);
        if (node === sourceFile) {
            return undefined;
        }

        const { parent } = node;
        const typeChecker = program.getTypeChecker();

        if (node.kind === SyntaxKind.OverrideKeyword || (isJSDocOverrideTag(node) && rangeContainsPosition(node.tagName, position))) {
            return getDefinitionFromOverriddenMember(typeChecker, node) || emptyArray;
        }

        // Labels
        if (isJumpStatementTarget(node)) {
            const label = getTargetLabel(node.parent, node.text);
            return label ? [createDefinitionInfoFromName(typeChecker, label, ScriptElementKind.label, node.text, /*containerName*/ undefined!)] : undefined; // TODO: GH#18217
        }

        if (isStaticModifier(node) && isClassStaticBlockDeclaration(node.parent)) {
            const classDecl = node.parent.parent;
            const { symbol, failedAliasResolution } = getSymbol(classDecl, typeChecker);

            const staticBlocks = filter(classDecl.members, isClassStaticBlockDeclaration);
            const containerName = symbol ? typeChecker.symbolToString(symbol, classDecl) : "";
            const sourceFile = node.getSourceFile();
            return map(staticBlocks, staticBlock => {
                let { pos } = moveRangePastModifiers(staticBlock);
                pos = skipTrivia(sourceFile.text, pos);
                return createDefinitionInfoFromName(typeChecker, staticBlock, ScriptElementKind.constructorImplementationElement, "static {}", containerName, /*unverified*/ false, failedAliasResolution, { start: pos, length: "static".length });
            });
        }

        let { symbol, failedAliasResolution } = getSymbol(node, typeChecker);
        let fallbackNode = node;

        if (searchOtherFilesOnly && failedAliasResolution) {
            // We couldn't resolve the specific import, try on the module specifier.
            const importDeclaration = forEach([node, ...symbol?.declarations || emptyArray], n => findAncestor(n, isAnyImportOrBareOrAccessedRequire));
            const moduleSpecifier = importDeclaration && tryGetModuleSpecifierFromDeclaration(importDeclaration);
            if (moduleSpecifier) {
                ({ symbol, failedAliasResolution } = getSymbol(moduleSpecifier, typeChecker));
                fallbackNode = moduleSpecifier;
            }
        }

        if (!symbol && isModuleSpecifierLike(fallbackNode)) {
            // We couldn't resolve the module specifier as an external module, but it could
            // be that module resolution succeeded but the target was not a module.
            const ref = sourceFile.resolvedModules?.get(fallbackNode.text, getModeForUsageLocation(sourceFile, fallbackNode));
            if (ref) {
                return [{
                    name: fallbackNode.text,
                    fileName: ref.resolvedFileName,
                    containerName: undefined!,
                    containerKind: undefined!,
                    kind: ScriptElementKind.scriptElement,
                    textSpan: createTextSpan(0, 0),
                    failedAliasResolution,
                    isAmbient: isDeclarationFileName(ref.resolvedFileName),
                    unverified: fallbackNode !== node,
                }];
            }
        }

        // Could not find a symbol e.g. node is string or number keyword,
        // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
        if (!symbol) {
            return concatenate(fileReferenceDefinition, getDefinitionInfoForIndexSignatures(node, typeChecker));
        }

        if (searchOtherFilesOnly && every(symbol.declarations, d => d.getSourceFile().fileName === sourceFile.fileName)) return undefined;

        const calledDeclaration = tryGetSignatureDeclaration(typeChecker, node);
        // Don't go to the component constructor definition for a JSX element, just go to the component definition.
        if (calledDeclaration && !(isJsxOpeningLikeElement(node.parent) && isConstructorLike(calledDeclaration))) {
            const sigInfo = createDefinitionFromSignatureDeclaration(typeChecker, calledDeclaration, failedAliasResolution);
            // For a function, if this is the original function definition, return just sigInfo.
            // If this is the original constructor definition, parent is the class.
            if (typeChecker.getRootSymbols(symbol).some(s => symbolMatchesSignature(s, calledDeclaration))) {
                return [sigInfo];
            }
            else {
                const defs = getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution, calledDeclaration) || emptyArray;
                // For a 'super()' call, put the signature first, else put the variable first.
                return node.kind === SyntaxKind.SuperKeyword ? [sigInfo, ...defs] : [...defs, sigInfo];
            }
        }

        // Because name in short-hand property assignment has two different meanings: property name and property value,
        // using go-to-definition at such position should go to the variable declaration of the property value rather than
        // go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition
        // is performed at the location of property access, we would like to go to definition of the property in the short-hand
        // assignment. This case and others are handled by the following code.
        if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
            const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
            const definitions = shorthandSymbol?.declarations ? shorthandSymbol.declarations.map(decl => createDefinitionInfo(decl, typeChecker, shorthandSymbol, node, /*unverified*/ false, failedAliasResolution)) : emptyArray;
            return concatenate(definitions, getDefinitionFromObjectLiteralElement(typeChecker, node) || emptyArray);
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
        if (isPropertyName(node) && isBindingElement(parent) && isObjectBindingPattern(parent.parent) &&
            (node === (parent.propertyName || parent.name))) {
            const name = getNameFromPropertyName(node);
            const type = typeChecker.getTypeAtLocation(parent.parent);
            return name === undefined ? emptyArray : flatMap(type.isUnion() ? type.types : [type], t => {
                const prop = t.getProperty(name);
                return prop && getDefinitionFromSymbol(typeChecker, prop, node);
            });
        }

        return concatenate(fileReferenceDefinition, getDefinitionFromObjectLiteralElement(typeChecker, node) || getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution));
    }

    /**
     * True if we should not add definitions for both the signature symbol and the definition symbol.
     * True for `const |f = |() => 0`, false for `function |f() {} const |g = f;`.
     * Also true for any assignment RHS.
     */
    function symbolMatchesSignature(s: Symbol, calledDeclaration: SignatureDeclaration) {
        return s === calledDeclaration.symbol
            || s === calledDeclaration.symbol.parent
            || isAssignmentExpression(calledDeclaration.parent)
            || (!isCallLikeExpression(calledDeclaration.parent) && s === calledDeclaration.parent.symbol);
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
    function getDefinitionFromObjectLiteralElement(typeChecker: TypeChecker, node: Node) {
        const element = getContainingObjectLiteralElement(node);
        if (element) {
            const contextualType = element && typeChecker.getContextualType(element.parent);
            if (contextualType) {
                return flatMap(getPropertySymbolsFromContextualType(element, typeChecker, contextualType, /*unionSymbolOk*/ false), propertySymbol =>
                    getDefinitionFromSymbol(typeChecker, propertySymbol, node));
            }
        }
    }

    function getDefinitionFromOverriddenMember(typeChecker: TypeChecker, node: Node) {
        const classElement = findAncestor(node, isClassElement);
        if (!(classElement && classElement.name)) return;

        const baseDeclaration = findAncestor(classElement, isClassLike);
        if (!baseDeclaration) return;

        const baseTypeNode = getEffectiveBaseTypeNode(baseDeclaration);
        const baseType = baseTypeNode ? typeChecker.getTypeAtLocation(baseTypeNode) : undefined;
        if (!baseType) return;

        const name = unescapeLeadingUnderscores(getTextOfPropertyName(classElement.name));
        const symbol = hasStaticModifier(classElement)
            ? typeChecker.getPropertyOfType(typeChecker.getTypeOfSymbolAtLocation(baseType.symbol, baseDeclaration), name)
            : typeChecker.getPropertyOfType(baseType, name);
        if (!symbol) return;

        return getDefinitionFromSymbol(typeChecker, symbol, node);
    }

    export function getReferenceAtPosition(sourceFile: SourceFile, position: number, program: Program): { reference: FileReference, fileName: string, unverified: boolean, file?: SourceFile } | undefined {
        const referencePath = findReferenceInPosition(sourceFile.referencedFiles, position);
        if (referencePath) {
            const file = program.getSourceFileFromReference(sourceFile, referencePath);
            return file && { reference: referencePath, fileName: file.fileName, file, unverified: false };
        }

        const typeReferenceDirective = findReferenceInPosition(sourceFile.typeReferenceDirectives, position);
        if (typeReferenceDirective) {
            const reference = program.getResolvedTypeReferenceDirectives().get(typeReferenceDirective.fileName, typeReferenceDirective.resolutionMode || sourceFile.impliedNodeFormat);
            const file = reference && program.getSourceFile(reference.resolvedFileName!); // TODO:GH#18217
            return file && { reference: typeReferenceDirective, fileName: file.fileName, file, unverified: false };
        }

        const libReferenceDirective = findReferenceInPosition(sourceFile.libReferenceDirectives, position);
        if (libReferenceDirective) {
            const file = program.getLibFileFromReference(libReferenceDirective);
            return file && { reference: libReferenceDirective, fileName: file.fileName, file, unverified: false };
        }

        if (sourceFile.resolvedModules?.size()) {
            const node = getTouchingToken(sourceFile, position);
            if (isModuleSpecifierLike(node) && isExternalModuleNameRelative(node.text) && sourceFile.resolvedModules.has(node.text, getModeForUsageLocation(sourceFile, node))) {
                const verifiedFileName = sourceFile.resolvedModules.get(node.text, getModeForUsageLocation(sourceFile, node))?.resolvedFileName;
                const fileName = verifiedFileName || resolvePath(getDirectoryPath(sourceFile.fileName), node.text);
                return {
                    file: program.getSourceFile(fileName),
                    fileName,
                    reference: {
                        pos: node.getStart(),
                        end: node.getEnd(),
                        fileName: node.text
                    },
                    unverified: !verifiedFileName,
                };
            }
        }

        return undefined;
    }

    /// Goto type
    export function getTypeDefinitionAtPosition(typeChecker: TypeChecker, sourceFile: SourceFile, position: number): readonly DefinitionInfo[] | undefined {
        const node = getTouchingPropertyName(sourceFile, position);
        if (node === sourceFile) {
            return undefined;
        }

        if (isImportMeta(node.parent) && node.parent.name === node) {
            return definitionFromType(typeChecker.getTypeAtLocation(node.parent), typeChecker, node.parent, /*failedAliasResolution*/ false);
        }

        const { symbol, failedAliasResolution } = getSymbol(node, typeChecker);
        if (!symbol) return undefined;

        const typeAtLocation = typeChecker.getTypeOfSymbolAtLocation(symbol, node);
        const returnType = tryGetReturnTypeOfFunction(symbol, typeAtLocation, typeChecker);
        const fromReturnType = returnType && definitionFromType(returnType, typeChecker, node, failedAliasResolution);
        // If a function returns 'void' or some other type with no definition, just return the function definition.
        const typeDefinitions = fromReturnType && fromReturnType.length !== 0 ? fromReturnType : definitionFromType(typeAtLocation, typeChecker, node, failedAliasResolution);
        return typeDefinitions.length ? typeDefinitions
            : !(symbol.flags & SymbolFlags.Value) && symbol.flags & SymbolFlags.Type ? getDefinitionFromSymbol(typeChecker, skipAlias(symbol, typeChecker), node, failedAliasResolution)
            : undefined;
    }

    function definitionFromType(type: Type, checker: TypeChecker, node: Node, failedAliasResolution: boolean | undefined): readonly DefinitionInfo[] {
        return flatMap(type.isUnion() && !(type.flags & TypeFlags.Enum) ? type.types : [type], t =>
            t.symbol && getDefinitionFromSymbol(checker, t.symbol, node, failedAliasResolution));
    }

    function tryGetReturnTypeOfFunction(symbol: Symbol, type: Type, checker: TypeChecker): Type | undefined {
        // If the type is just a function's inferred type,
        // go-to-type should go to the return type instead, since go-to-definition takes you to the function anyway.
        if (type.symbol === symbol ||
            // At `const f = () => {}`, the symbol is `f` and the type symbol is at `() => {}`
            symbol.valueDeclaration && type.symbol && isVariableDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.initializer === type.symbol.valueDeclaration as Node) {
            const sigs = type.getCallSignatures();
            if (sigs.length === 1) return checker.getReturnTypeOfSignature(first(sigs));
        }
        return undefined;
    }

    export function getDefinitionAndBoundSpan(program: Program, sourceFile: SourceFile, position: number): DefinitionInfoAndBoundSpan | undefined {
        const definitions = getDefinitionAtPosition(program, sourceFile, position);

        if (!definitions || definitions.length === 0) {
            return undefined;
        }

        // Check if position is on triple slash reference.
        const comment = findReferenceInPosition(sourceFile.referencedFiles, position) ||
            findReferenceInPosition(sourceFile.typeReferenceDirectives, position) ||
            findReferenceInPosition(sourceFile.libReferenceDirectives, position);

        if (comment) {
            return { definitions, textSpan: createTextSpanFromRange(comment) };
        }

        const node = getTouchingPropertyName(sourceFile, position);
        const textSpan = createTextSpan(node.getStart(), node.getWidth());

        return { definitions, textSpan };
    }

    // At 'x.foo', see if the type of 'x' has an index signature, and if so find its declarations.
    function getDefinitionInfoForIndexSignatures(node: Node, checker: TypeChecker): DefinitionInfo[] | undefined {
        return mapDefined(checker.getIndexInfosAtLocation(node), info => info.declaration && createDefinitionFromSignatureDeclaration(checker, info.declaration));
    }

    function getSymbol(node: Node, checker: TypeChecker) {
        const symbol = checker.getSymbolAtLocation(node);
        // If this is an alias, and the request came at the declaration location
        // get the aliased symbol instead. This allows for goto def on an import e.g.
        //   import {A, B} from "mod";
        // to jump to the implementation directly.
        let failedAliasResolution = false;
        if (symbol?.declarations && symbol.flags & SymbolFlags.Alias && shouldSkipAlias(node, symbol.declarations[0])) {
            const aliased = checker.getAliasedSymbol(symbol);
            if (aliased.declarations) {
                return { symbol: aliased };
            }
            else {
                failedAliasResolution = true;
            }
        }
        return { symbol, failedAliasResolution };
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
        if (declaration.kind === SyntaxKind.NamespaceImport) {
            return false;
        }
        return true;
    }

    /**
     * ```ts
     * function f() {}
     * f.foo = 0;
     * ```
     *
     * Here, `f` has two declarations: the function declaration, and the identifier in the next line.
     * The latter is a declaration for `f` because it gives `f` the `SymbolFlags.Namespace` meaning so
     * it can contain `foo`. However, that declaration is pretty uninteresting and not intuitively a
     * "definition" for `f`. Ideally, the question we'd like to answer is "what SymbolFlags does this
     * declaration contribute to the symbol for `f`?" If the answer is just `Namespace` and the
     * declaration looks like an assignment, that declaration is in no sense a definition for `f`.
     * But that information is totally lost during binding and/or symbol merging, so we need to do
     * our best to reconstruct it or use other heuristics. This function (and the logic around its
     * calling) covers our tests but feels like a hack, and it would be great if someone could come
     * up with a more precise definition of what counts as a definition.
     */
    function isExpandoDeclaration(node: Declaration): boolean {
        if (!isAssignmentDeclaration(node)) return false;
        const containingAssignment = findAncestor(node, p => {
            if (isAssignmentExpression(p)) return true;
            if (!isAssignmentDeclaration(p as Declaration)) return "quit";
            return false;
        }) as AssignmentExpression<AssignmentOperatorToken> | undefined;
        return !!containingAssignment && getAssignmentDeclarationKind(containingAssignment) === AssignmentDeclarationKind.Property;
    }

    function getDefinitionFromSymbol(typeChecker: TypeChecker, symbol: Symbol, node: Node, failedAliasResolution?: boolean, excludeDeclaration?: Node): DefinitionInfo[] | undefined {
        const filteredDeclarations = filter(symbol.declarations, d => d !== excludeDeclaration);
        const withoutExpandos = filter(filteredDeclarations, d => !isExpandoDeclaration(d));
        const results = some(withoutExpandos) ? withoutExpandos : filteredDeclarations;
        return getConstructSignatureDefinition() || getCallSignatureDefinition() || map(results, declaration => createDefinitionInfo(declaration, typeChecker, symbol, node, /*unverified*/ false, failedAliasResolution));

        function getConstructSignatureDefinition(): DefinitionInfo[] | undefined {
            // Applicable only if we are in a new expression, or we are on a constructor declaration
            // and in either case the symbol has a construct signature definition, i.e. class
            if (symbol.flags & SymbolFlags.Class && !(symbol.flags & (SymbolFlags.Function | SymbolFlags.Variable)) && (isNewExpressionTarget(node) || node.kind === SyntaxKind.ConstructorKeyword)) {
                const cls = find(filteredDeclarations!, isClassLike) || Debug.fail("Expected declaration to have at least one class-like declaration");
                return getSignatureDefinition(cls.members, /*selectConstructors*/ true);
            }
        }

        function getCallSignatureDefinition(): DefinitionInfo[] | undefined {
            return isCallOrNewExpressionTarget(node) || isNameOfFunctionDeclaration(node)
                ? getSignatureDefinition(filteredDeclarations, /*selectConstructors*/ false)
                : undefined;
        }

        function getSignatureDefinition(signatureDeclarations: readonly Declaration[] | undefined, selectConstructors: boolean): DefinitionInfo[] | undefined {
            if (!signatureDeclarations) {
                return undefined;
            }
            const declarations = signatureDeclarations.filter(selectConstructors ? isConstructorDeclaration : isFunctionLike);
            const declarationsWithBody = declarations.filter(d => !!(d as FunctionLikeDeclaration).body);

            // declarations defined on the global scope can be defined on multiple files. Get all of them.
            return declarations.length
                ? declarationsWithBody.length !== 0
                    ? declarationsWithBody.map(x => createDefinitionInfo(x, typeChecker, symbol, node))
                    : [createDefinitionInfo(last(declarations), typeChecker, symbol, node, /*unverified*/ false, failedAliasResolution)]
                : undefined;
        }
    }

    /** Creates a DefinitionInfo from a Declaration, using the declaration's name if possible. */
    export function createDefinitionInfo(declaration: Declaration, checker: TypeChecker, symbol: Symbol, node: Node, unverified?: boolean, failedAliasResolution?: boolean): DefinitionInfo {
        const symbolName = checker.symbolToString(symbol); // Do not get scoped name, just the name of the symbol
        const symbolKind = SymbolDisplay.getSymbolKind(checker, symbol, node);
        const containerName = symbol.parent ? checker.symbolToString(symbol.parent, node) : "";
        return createDefinitionInfoFromName(checker, declaration, symbolKind, symbolName, containerName, unverified, failedAliasResolution);
    }

    /** Creates a DefinitionInfo directly from the name of a declaration. */
    function createDefinitionInfoFromName(checker: TypeChecker, declaration: Declaration, symbolKind: ScriptElementKind, symbolName: string, containerName: string, unverified?: boolean, failedAliasResolution?: boolean, textSpan?: TextSpan): DefinitionInfo {
        const sourceFile = declaration.getSourceFile();
        if (!textSpan) {
            const name = getNameOfDeclaration(declaration) || declaration;
            textSpan = createTextSpanFromNode(name, sourceFile);
        }
        return {
            fileName: sourceFile.fileName,
            textSpan,
            kind: symbolKind,
            name: symbolName,
            containerKind: undefined!, // TODO: GH#18217
            containerName,
            ...FindAllReferences.toContextSpan(
                textSpan,
                sourceFile,
                FindAllReferences.getContextNode(declaration)
            ),
            isLocal: !isDefinitionVisible(checker, declaration),
            isAmbient: !!(declaration.flags & NodeFlags.Ambient),
            unverified,
            failedAliasResolution,
        };
    }

    function isDefinitionVisible(checker: TypeChecker, declaration: Declaration): boolean {
        if (checker.isDeclarationVisible(declaration)) return true;
        if (!declaration.parent) return false;

        // Variable initializers are visible if variable is visible
        if (hasInitializer(declaration.parent) && declaration.parent.initializer === declaration) return isDefinitionVisible(checker, declaration.parent as Declaration);

        // Handle some exceptions here like arrow function, members of class and object literal expression which are technically not visible but we want the definition to be determined by its parent
        switch (declaration.kind) {
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.MethodDeclaration:
                // Private/protected properties/methods are not visible
                if (hasEffectiveModifier(declaration, ModifierFlags.Private)) return false;
            // Public properties/methods are visible if its parents are visible, so:
            // falls through

            case SyntaxKind.Constructor:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                return isDefinitionVisible(checker, declaration.parent as Declaration);
            default:
                return false;
        }
    }

    function createDefinitionFromSignatureDeclaration(typeChecker: TypeChecker, decl: SignatureDeclaration, failedAliasResolution?: boolean): DefinitionInfo {
        return createDefinitionInfo(decl, typeChecker, decl.symbol, decl, /*unverified*/ false, failedAliasResolution);
    }

    export function findReferenceInPosition(refs: readonly FileReference[], pos: number): FileReference | undefined {
        return find(refs, ref => textRangeContainsPositionInclusive(ref, pos));
    }

    function getDefinitionInfoForFileReference(name: string, targetFileName: string, unverified: boolean): DefinitionInfo {
        return {
            fileName: targetFileName,
            textSpan: createTextSpanFromBounds(0, 0),
            kind: ScriptElementKind.scriptElement,
            name,
            containerName: undefined!,
            containerKind: undefined!, // TODO: GH#18217
            unverified,
        };
    }

    /** Returns a CallLikeExpression where `node` is the target being invoked. */
    function getAncestorCallLikeExpression(node: Node): CallLikeExpression | undefined {
        const target = findAncestor(node, n => !isRightSideOfPropertyAccess(n));
        const callLike = target?.parent;
        return callLike && isCallLikeExpression(callLike) && getInvokedExpression(callLike) === target ? callLike : undefined;
    }

    function tryGetSignatureDeclaration(typeChecker: TypeChecker, node: Node): SignatureDeclaration | undefined {
        const callLike = getAncestorCallLikeExpression(node);
        const signature = callLike && typeChecker.getResolvedSignature(callLike);
        // Don't go to a function type, go to the value having that type.
        return tryCast(signature && signature.declaration, (d): d is SignatureDeclaration => isFunctionLike(d) && !isFunctionTypeNode(d));
    }

    function isConstructorLike(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.ConstructSignature:
                return true;
            default:
                return false;
        }
    }
}
