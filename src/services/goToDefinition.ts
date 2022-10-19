import * as ts from "./_namespaces/ts";

/** @internal */
export function getDefinitionAtPosition(program: ts.Program, sourceFile: ts.SourceFile, position: number, searchOtherFilesOnly?: boolean, stopAtAlias?: boolean): readonly ts.DefinitionInfo[] | undefined {
    const resolvedRef = getReferenceAtPosition(sourceFile, position, program);
    const fileReferenceDefinition = resolvedRef && [getDefinitionInfoForFileReference(resolvedRef.reference.fileName, resolvedRef.fileName, resolvedRef.unverified)] || ts.emptyArray;
    if (resolvedRef?.file) {
        // If `file` is missing, do a symbol-based lookup as well
        return fileReferenceDefinition;
    }

    const node = ts.getTouchingPropertyName(sourceFile, position);
    if (node === sourceFile) {
        return undefined;
    }

    const { parent } = node;
    const typeChecker = program.getTypeChecker();

    if (node.kind === ts.SyntaxKind.OverrideKeyword || (ts.isIdentifier(node) && ts.isJSDocOverrideTag(parent) && parent.tagName === node)) {
        return getDefinitionFromOverriddenMember(typeChecker, node) || ts.emptyArray;
    }

    // Labels
    if (ts.isJumpStatementTarget(node)) {
        const label = ts.getTargetLabel(node.parent, node.text);
        return label ? [createDefinitionInfoFromName(typeChecker, label, ts.ScriptElementKind.label, node.text, /*containerName*/ undefined!)] : undefined; // TODO: GH#18217
    }

    if (node.kind === ts.SyntaxKind.ReturnKeyword) {
        const functionDeclaration = ts.findAncestor(node.parent, n =>
            ts.isClassStaticBlockDeclaration(n) ? "quit" : ts.isFunctionLikeDeclaration(n)) as ts.FunctionLikeDeclaration | undefined;
        return functionDeclaration ? [createDefinitionFromSignatureDeclaration(typeChecker, functionDeclaration)] : undefined;
    }

    if (ts.isStaticModifier(node) && ts.isClassStaticBlockDeclaration(node.parent)) {
        const classDecl = node.parent.parent;
        const { symbol, failedAliasResolution } = getSymbol(classDecl, typeChecker, stopAtAlias);

        const staticBlocks = ts.filter(classDecl.members, ts.isClassStaticBlockDeclaration);
        const containerName = symbol ? typeChecker.symbolToString(symbol, classDecl) : "";
        const sourceFile = node.getSourceFile();
        return ts.map(staticBlocks, staticBlock => {
            let { pos } = ts.moveRangePastModifiers(staticBlock);
            pos = ts.skipTrivia(sourceFile.text, pos);
            return createDefinitionInfoFromName(typeChecker, staticBlock, ts.ScriptElementKind.constructorImplementationElement, "static {}", containerName, /*unverified*/ false, failedAliasResolution, { start: pos, length: "static".length });
        });
    }

    let { symbol, failedAliasResolution } = getSymbol(node, typeChecker, stopAtAlias);
    let fallbackNode = node;

    if (searchOtherFilesOnly && failedAliasResolution) {
        // We couldn't resolve the specific import, try on the module specifier.
        const importDeclaration = ts.forEach([node, ...symbol?.declarations || ts.emptyArray], n => ts.findAncestor(n, ts.isAnyImportOrBareOrAccessedRequire));
        const moduleSpecifier = importDeclaration && ts.tryGetModuleSpecifierFromDeclaration(importDeclaration);
        if (moduleSpecifier) {
            ({ symbol, failedAliasResolution } = getSymbol(moduleSpecifier, typeChecker, stopAtAlias));
            fallbackNode = moduleSpecifier;
        }
    }

    if (!symbol && ts.isModuleSpecifierLike(fallbackNode)) {
        // We couldn't resolve the module specifier as an external module, but it could
        // be that module resolution succeeded but the target was not a module.
        const ref = sourceFile.resolvedModules?.get(fallbackNode.text, ts.getModeForUsageLocation(sourceFile, fallbackNode));
        if (ref) {
            return [{
                name: fallbackNode.text,
                fileName: ref.resolvedFileName,
                containerName: undefined!,
                containerKind: undefined!,
                kind: ts.ScriptElementKind.scriptElement,
                textSpan: ts.createTextSpan(0, 0),
                failedAliasResolution,
                isAmbient: ts.isDeclarationFileName(ref.resolvedFileName),
                unverified: fallbackNode !== node,
            }];
        }
    }

    // Could not find a symbol e.g. node is string or number keyword,
    // or the symbol was an internal symbol and does not have a declaration e.g. undefined symbol
    if (!symbol) {
        return ts.concatenate(fileReferenceDefinition, getDefinitionInfoForIndexSignatures(node, typeChecker));
    }

    if (searchOtherFilesOnly && ts.every(symbol.declarations, d => d.getSourceFile().fileName === sourceFile.fileName)) return undefined;

    const calledDeclaration = tryGetSignatureDeclaration(typeChecker, node);
    // Don't go to the component constructor definition for a JSX element, just go to the component definition.
    if (calledDeclaration && !(ts.isJsxOpeningLikeElement(node.parent) && isConstructorLike(calledDeclaration))) {
        const sigInfo = createDefinitionFromSignatureDeclaration(typeChecker, calledDeclaration, failedAliasResolution);
        // For a function, if this is the original function definition, return just sigInfo.
        // If this is the original constructor definition, parent is the class.
        if (typeChecker.getRootSymbols(symbol).some(s => symbolMatchesSignature(s, calledDeclaration))) {
            return [sigInfo];
        }
        else {
            const defs = getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution, calledDeclaration) || ts.emptyArray;
            // For a 'super()' call, put the signature first, else put the variable first.
            return node.kind === ts.SyntaxKind.SuperKeyword ? [sigInfo, ...defs] : [...defs, sigInfo];
        }
    }

    // Because name in short-hand property assignment has two different meanings: property name and property value,
    // using go-to-definition at such position should go to the variable declaration of the property value rather than
    // go to the declaration of the property name (in this case stay at the same position). However, if go-to-definition
    // is performed at the location of property access, we would like to go to definition of the property in the short-hand
    // assignment. This case and others are handled by the following code.
    if (node.parent.kind === ts.SyntaxKind.ShorthandPropertyAssignment) {
        const shorthandSymbol = typeChecker.getShorthandAssignmentValueSymbol(symbol.valueDeclaration);
        const definitions = shorthandSymbol?.declarations ? shorthandSymbol.declarations.map(decl => createDefinitionInfo(decl, typeChecker, shorthandSymbol, node, /*unverified*/ false, failedAliasResolution)) : ts.emptyArray;
        return ts.concatenate(definitions, getDefinitionFromObjectLiteralElement(typeChecker, node) || ts.emptyArray);
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
    if (ts.isPropertyName(node) && ts.isBindingElement(parent) && ts.isObjectBindingPattern(parent.parent) &&
        (node === (parent.propertyName || parent.name))) {
        const name = ts.getNameFromPropertyName(node);
        const type = typeChecker.getTypeAtLocation(parent.parent);
        return name === undefined ? ts.emptyArray : ts.flatMap(type.isUnion() ? type.types : [type], t => {
            const prop = t.getProperty(name);
            return prop && getDefinitionFromSymbol(typeChecker, prop, node);
        });
    }

    return ts.concatenate(fileReferenceDefinition, getDefinitionFromObjectLiteralElement(typeChecker, node) || getDefinitionFromSymbol(typeChecker, symbol, node, failedAliasResolution));
}

/**
 * True if we should not add definitions for both the signature symbol and the definition symbol.
 * True for `const |f = |() => 0`, false for `function |f() {} const |g = f;`.
 * Also true for any assignment RHS.
 */
function symbolMatchesSignature(s: ts.Symbol, calledDeclaration: ts.SignatureDeclaration) {
    return s === calledDeclaration.symbol
        || s === calledDeclaration.symbol.parent
        || ts.isAssignmentExpression(calledDeclaration.parent)
        || (!ts.isCallLikeExpression(calledDeclaration.parent) && s === calledDeclaration.parent.symbol);
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
function getDefinitionFromObjectLiteralElement(typeChecker: ts.TypeChecker, node: ts.Node) {
    const element = ts.getContainingObjectLiteralElement(node);
    if (element) {
        const contextualType = element && typeChecker.getContextualType(element.parent);
        if (contextualType) {
            return ts.flatMap(ts.getPropertySymbolsFromContextualType(element, typeChecker, contextualType, /*unionSymbolOk*/ false), propertySymbol =>
                getDefinitionFromSymbol(typeChecker, propertySymbol, node));
        }
    }
}

function getDefinitionFromOverriddenMember(typeChecker: ts.TypeChecker, node: ts.Node) {
    const classElement = ts.findAncestor(node, ts.isClassElement);
    if (!(classElement && classElement.name)) return;

    const baseDeclaration = ts.findAncestor(classElement, ts.isClassLike);
    if (!baseDeclaration) return;

    const baseTypeNode = ts.getEffectiveBaseTypeNode(baseDeclaration);
    if (!baseTypeNode) return;
    const expression = ts.skipParentheses(baseTypeNode.expression);
    const base = ts.isClassExpression(expression) ? expression.symbol : typeChecker.getSymbolAtLocation(expression);
    if (!base) return;

    const name = ts.unescapeLeadingUnderscores(ts.getTextOfPropertyName(classElement.name));
    const symbol = ts.hasStaticModifier(classElement)
        ? typeChecker.getPropertyOfType(typeChecker.getTypeOfSymbol(base), name)
        : typeChecker.getPropertyOfType(typeChecker.getDeclaredTypeOfSymbol(base), name);
    if (!symbol) return;

    return getDefinitionFromSymbol(typeChecker, symbol, node);
}

/** @internal */
export function getReferenceAtPosition(sourceFile: ts.SourceFile, position: number, program: ts.Program): { reference: ts.FileReference, fileName: string, unverified: boolean, file?: ts.SourceFile } | undefined {
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
        const node = ts.getTouchingToken(sourceFile, position);
        if (ts.isModuleSpecifierLike(node) && ts.isExternalModuleNameRelative(node.text) && sourceFile.resolvedModules.has(node.text, ts.getModeForUsageLocation(sourceFile, node))) {
            const verifiedFileName = sourceFile.resolvedModules.get(node.text, ts.getModeForUsageLocation(sourceFile, node))?.resolvedFileName;
            const fileName = verifiedFileName || ts.resolvePath(ts.getDirectoryPath(sourceFile.fileName), node.text);
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
/** @internal */
export function getTypeDefinitionAtPosition(typeChecker: ts.TypeChecker, sourceFile: ts.SourceFile, position: number): readonly ts.DefinitionInfo[] | undefined {
    const node = ts.getTouchingPropertyName(sourceFile, position);
    if (node === sourceFile) {
        return undefined;
    }

    if (ts.isImportMeta(node.parent) && node.parent.name === node) {
        return definitionFromType(typeChecker.getTypeAtLocation(node.parent), typeChecker, node.parent, /*failedAliasResolution*/ false);
    }

    const { symbol, failedAliasResolution } = getSymbol(node, typeChecker, /*stopAtAlias*/ false);
    if (!symbol) return undefined;

    const typeAtLocation = typeChecker.getTypeOfSymbolAtLocation(symbol, node);
    const returnType = tryGetReturnTypeOfFunction(symbol, typeAtLocation, typeChecker);
    const fromReturnType = returnType && definitionFromType(returnType, typeChecker, node, failedAliasResolution);
    // If a function returns 'void' or some other type with no definition, just return the function definition.
    const typeDefinitions = fromReturnType && fromReturnType.length !== 0 ? fromReturnType : definitionFromType(typeAtLocation, typeChecker, node, failedAliasResolution);
    return typeDefinitions.length ? typeDefinitions
        : !(symbol.flags & ts.SymbolFlags.Value) && symbol.flags & ts.SymbolFlags.Type ? getDefinitionFromSymbol(typeChecker, ts.skipAlias(symbol, typeChecker), node, failedAliasResolution)
        : undefined;
}

function definitionFromType(type: ts.Type, checker: ts.TypeChecker, node: ts.Node, failedAliasResolution: boolean | undefined): readonly ts.DefinitionInfo[] {
    return ts.flatMap(type.isUnion() && !(type.flags & ts.TypeFlags.Enum) ? type.types : [type], t =>
        t.symbol && getDefinitionFromSymbol(checker, t.symbol, node, failedAliasResolution));
}

function tryGetReturnTypeOfFunction(symbol: ts.Symbol, type: ts.Type, checker: ts.TypeChecker): ts.Type | undefined {
    // If the type is just a function's inferred type,
    // go-to-type should go to the return type instead, since go-to-definition takes you to the function anyway.
    if (type.symbol === symbol ||
        // At `const f = () => {}`, the symbol is `f` and the type symbol is at `() => {}`
        symbol.valueDeclaration && type.symbol && ts.isVariableDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.initializer === type.symbol.valueDeclaration as ts.Node) {
        const sigs = type.getCallSignatures();
        if (sigs.length === 1) return checker.getReturnTypeOfSignature(ts.first(sigs));
    }
    return undefined;
}

/** @internal */
export function getDefinitionAndBoundSpan(program: ts.Program, sourceFile: ts.SourceFile, position: number): ts.DefinitionInfoAndBoundSpan | undefined {
    const definitions = getDefinitionAtPosition(program, sourceFile, position);

    if (!definitions || definitions.length === 0) {
        return undefined;
    }

    // Check if position is on triple slash reference.
    const comment = findReferenceInPosition(sourceFile.referencedFiles, position) ||
        findReferenceInPosition(sourceFile.typeReferenceDirectives, position) ||
        findReferenceInPosition(sourceFile.libReferenceDirectives, position);

    if (comment) {
        return { definitions, textSpan: ts.createTextSpanFromRange(comment) };
    }

    const node = ts.getTouchingPropertyName(sourceFile, position);
    const textSpan = ts.createTextSpan(node.getStart(), node.getWidth());

    return { definitions, textSpan };
}

// At 'x.foo', see if the type of 'x' has an index signature, and if so find its declarations.
function getDefinitionInfoForIndexSignatures(node: ts.Node, checker: ts.TypeChecker): ts.DefinitionInfo[] | undefined {
    return ts.mapDefined(checker.getIndexInfosAtLocation(node), info => info.declaration && createDefinitionFromSignatureDeclaration(checker, info.declaration));
}

function getSymbol(node: ts.Node, checker: ts.TypeChecker, stopAtAlias: boolean | undefined) {
    const symbol = checker.getSymbolAtLocation(node);
    // If this is an alias, and the request came at the declaration location
    // get the aliased symbol instead. This allows for goto def on an import e.g.
    //   import {A, B} from "mod";
    // to jump to the implementation directly.
    let failedAliasResolution = false;
    if (symbol?.declarations && symbol.flags & ts.SymbolFlags.Alias && !stopAtAlias && shouldSkipAlias(node, symbol.declarations[0])) {
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
function shouldSkipAlias(node: ts.Node, declaration: ts.Node): boolean {
    if (node.kind !== ts.SyntaxKind.Identifier) {
        return false;
    }
    if (node.parent === declaration) {
        return true;
    }
    if (declaration.kind === ts.SyntaxKind.NamespaceImport) {
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
function isExpandoDeclaration(node: ts.Declaration): boolean {
    if (!ts.isAssignmentDeclaration(node)) return false;
    const containingAssignment = ts.findAncestor(node, p => {
        if (ts.isAssignmentExpression(p)) return true;
        if (!ts.isAssignmentDeclaration(p as ts.Declaration)) return "quit";
        return false;
    }) as ts.AssignmentExpression<ts.AssignmentOperatorToken> | undefined;
    return !!containingAssignment && ts.getAssignmentDeclarationKind(containingAssignment) === ts.AssignmentDeclarationKind.Property;
}

function getDefinitionFromSymbol(typeChecker: ts.TypeChecker, symbol: ts.Symbol, node: ts.Node, failedAliasResolution?: boolean, excludeDeclaration?: ts.Node): ts.DefinitionInfo[] | undefined {
    const filteredDeclarations = ts.filter(symbol.declarations, d => d !== excludeDeclaration);
    const withoutExpandos = ts.filter(filteredDeclarations, d => !isExpandoDeclaration(d));
    const results = ts.some(withoutExpandos) ? withoutExpandos : filteredDeclarations;
    return getConstructSignatureDefinition() || getCallSignatureDefinition() || ts.map(results, declaration => createDefinitionInfo(declaration, typeChecker, symbol, node, /*unverified*/ false, failedAliasResolution));

    function getConstructSignatureDefinition(): ts.DefinitionInfo[] | undefined {
        // Applicable only if we are in a new expression, or we are on a constructor declaration
        // and in either case the symbol has a construct signature definition, i.e. class
        if (symbol.flags & ts.SymbolFlags.Class && !(symbol.flags & (ts.SymbolFlags.Function | ts.SymbolFlags.Variable)) && (ts.isNewExpressionTarget(node) || node.kind === ts.SyntaxKind.ConstructorKeyword)) {
            const cls = ts.find(filteredDeclarations, ts.isClassLike) || ts.Debug.fail("Expected declaration to have at least one class-like declaration");
            return getSignatureDefinition(cls.members, /*selectConstructors*/ true);
        }
    }

    function getCallSignatureDefinition(): ts.DefinitionInfo[] | undefined {
        return ts.isCallOrNewExpressionTarget(node) || ts.isNameOfFunctionDeclaration(node)
            ? getSignatureDefinition(filteredDeclarations, /*selectConstructors*/ false)
            : undefined;
    }

    function getSignatureDefinition(signatureDeclarations: readonly ts.Declaration[] | undefined, selectConstructors: boolean): ts.DefinitionInfo[] | undefined {
        if (!signatureDeclarations) {
            return undefined;
        }
        const declarations = signatureDeclarations.filter(selectConstructors ? ts.isConstructorDeclaration : ts.isFunctionLike);
        const declarationsWithBody = declarations.filter(d => !!(d as ts.FunctionLikeDeclaration).body);

        // declarations defined on the global scope can be defined on multiple files. Get all of them.
        return declarations.length
            ? declarationsWithBody.length !== 0
                ? declarationsWithBody.map(x => createDefinitionInfo(x, typeChecker, symbol, node))
                : [createDefinitionInfo(ts.last(declarations), typeChecker, symbol, node, /*unverified*/ false, failedAliasResolution)]
            : undefined;
    }
}

/** @internal */
/** Creates a DefinitionInfo from a Declaration, using the declaration's name if possible. */
export function createDefinitionInfo(declaration: ts.Declaration, checker: ts.TypeChecker, symbol: ts.Symbol, node: ts.Node, unverified?: boolean, failedAliasResolution?: boolean): ts.DefinitionInfo {
    const symbolName = checker.symbolToString(symbol); // Do not get scoped name, just the name of the symbol
    const symbolKind = ts.SymbolDisplay.getSymbolKind(checker, symbol, node);
    const containerName = symbol.parent ? checker.symbolToString(symbol.parent, node) : "";
    return createDefinitionInfoFromName(checker, declaration, symbolKind, symbolName, containerName, unverified, failedAliasResolution);
}

/** Creates a DefinitionInfo directly from the name of a declaration. */
function createDefinitionInfoFromName(checker: ts.TypeChecker, declaration: ts.Declaration, symbolKind: ts.ScriptElementKind, symbolName: string, containerName: string, unverified?: boolean, failedAliasResolution?: boolean, textSpan?: ts.TextSpan): ts.DefinitionInfo {
    const sourceFile = declaration.getSourceFile();
    if (!textSpan) {
        const name = ts.getNameOfDeclaration(declaration) || declaration;
        textSpan = ts.createTextSpanFromNode(name, sourceFile);
    }
    return {
        fileName: sourceFile.fileName,
        textSpan,
        kind: symbolKind,
        name: symbolName,
        containerKind: undefined!, // TODO: GH#18217
        containerName,
        ...ts.FindAllReferences.toContextSpan(
            textSpan,
            sourceFile,
            ts.FindAllReferences.getContextNode(declaration)
        ),
        isLocal: !isDefinitionVisible(checker, declaration),
        isAmbient: !!(declaration.flags & ts.NodeFlags.Ambient),
        unverified,
        failedAliasResolution,
    };
}

function isDefinitionVisible(checker: ts.TypeChecker, declaration: ts.Declaration): boolean {
    if (checker.isDeclarationVisible(declaration)) return true;
    if (!declaration.parent) return false;

    // Variable initializers are visible if variable is visible
    if (ts.hasInitializer(declaration.parent) && declaration.parent.initializer === declaration) return isDefinitionVisible(checker, declaration.parent as ts.Declaration);

    // Handle some exceptions here like arrow function, members of class and object literal expression which are technically not visible but we want the definition to be determined by its parent
    switch (declaration.kind) {
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.MethodDeclaration:
            // Private/protected properties/methods are not visible
            if (ts.hasEffectiveModifier(declaration, ts.ModifierFlags.Private)) return false;
        // Public properties/methods are visible if its parents are visible, so:
        // falls through

        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.ShorthandPropertyAssignment:
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            return isDefinitionVisible(checker, declaration.parent as ts.Declaration);
        default:
            return false;
    }
}

function createDefinitionFromSignatureDeclaration(typeChecker: ts.TypeChecker, decl: ts.SignatureDeclaration, failedAliasResolution?: boolean): ts.DefinitionInfo {
    return createDefinitionInfo(decl, typeChecker, decl.symbol, decl, /*unverified*/ false, failedAliasResolution);
}

/** @internal */
export function findReferenceInPosition(refs: readonly ts.FileReference[], pos: number): ts.FileReference | undefined {
    return ts.find(refs, ref => ts.textRangeContainsPositionInclusive(ref, pos));
}

function getDefinitionInfoForFileReference(name: string, targetFileName: string, unverified: boolean): ts.DefinitionInfo {
    return {
        fileName: targetFileName,
        textSpan: ts.createTextSpanFromBounds(0, 0),
        kind: ts.ScriptElementKind.scriptElement,
        name,
        containerName: undefined!,
        containerKind: undefined!, // TODO: GH#18217
        unverified,
    };
}

/** Returns a CallLikeExpression where `node` is the target being invoked. */
function getAncestorCallLikeExpression(node: ts.Node): ts.CallLikeExpression | undefined {
    const target = ts.findAncestor(node, n => !ts.isRightSideOfPropertyAccess(n));
    const callLike = target?.parent;
    return callLike && ts.isCallLikeExpression(callLike) && ts.getInvokedExpression(callLike) === target ? callLike : undefined;
}

function tryGetSignatureDeclaration(typeChecker: ts.TypeChecker, node: ts.Node): ts.SignatureDeclaration | undefined {
    const callLike = getAncestorCallLikeExpression(node);
    const signature = callLike && typeChecker.getResolvedSignature(callLike);
    // Don't go to a function type, go to the value having that type.
    return ts.tryCast(signature && signature.declaration, (d): d is ts.SignatureDeclaration => ts.isFunctionLike(d) && !ts.isFunctionTypeNode(d));
}

function isConstructorLike(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.ConstructorType:
        case ts.SyntaxKind.ConstructSignature:
            return true;
        default:
            return false;
    }
}
