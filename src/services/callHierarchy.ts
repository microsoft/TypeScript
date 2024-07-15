import {
    AccessExpression,
    append,
    ArrowFunction,
    AsExpression,
    CallExpression,
    CallHierarchyIncomingCall,
    CallHierarchyItem,
    CallHierarchyOutgoingCall,
    CancellationToken,
    canHaveModifiers,
    ClassDeclaration,
    ClassExpression,
    ClassLikeDeclaration,
    ClassStaticBlockDeclaration,
    compareStringsCaseSensitive,
    createPrinterWithRemoveCommentsOmitTrailingSemicolon,
    createTextRangeFromNode,
    createTextSpanFromBounds,
    createTextSpanFromRange,
    Debug,
    Decorator,
    ElementAccessExpression,
    EmitHint,
    filter,
    find,
    FindAllReferences,
    findAncestor,
    forEach,
    forEachChild,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    GetAccessorDeclaration,
    getAssignedName,
    getClassExtendsHeritageElement,
    getCombinedNodeFlags,
    getFirstConstructorWithBody,
    getNameOfDeclaration,
    getNodeId,
    getNodeKind,
    getNodeModifiers,
    group,
    hasSyntacticModifier,
    Identifier,
    idText,
    indicesOf,
    isAccessExpression,
    isArgumentExpressionOfElementAccess,
    isArray,
    isArrowFunction,
    isCallOrNewExpressionTarget,
    isClassDeclaration,
    isClassExpression,
    isClassLike,
    isClassStaticBlockDeclaration,
    isComputedPropertyName,
    isConstructorDeclaration,
    isDeclarationName,
    isDecoratorTarget,
    isFunctionDeclaration,
    isFunctionExpression,
    isFunctionLikeDeclaration,
    isGetAccessorDeclaration,
    isIdentifier,
    isJsxOpeningLikeElement,
    isJsxOpeningLikeElementTagName,
    isMethodDeclaration,
    isMethodSignature,
    isModuleBlock,
    isModuleDeclaration,
    isNamedDeclaration,
    isPartOfTypeNode,
    isPropertyDeclaration,
    isRightSideOfPropertyAccess,
    isSetAccessorDeclaration,
    isSourceFile,
    isStringOrNumericLiteralLike,
    isTaggedTemplateExpression,
    isTaggedTemplateTag,
    isVariableDeclaration,
    JsxOpeningLikeElement,
    map,
    MethodDeclaration,
    ModifierFlags,
    ModuleDeclaration,
    moveRangePastModifiers,
    NewExpression,
    Node,
    NodeFlags,
    ParameterDeclaration,
    Program,
    PropertyAccessExpression,
    PropertyDeclaration,
    SatisfiesExpression,
    SetAccessorDeclaration,
    skipTrivia,
    SourceFile,
    SymbolFlags,
    SyntaxKind,
    TaggedTemplateExpression,
    TextRange,
    TextSpan,
    TypeAssertion,
    TypeChecker,
    usingSingleLineStringWriter,
    VariableDeclaration,
} from "./_namespaces/ts.js";

/** @internal */
export type NamedExpression =
    | ClassExpression & { name: Identifier; }
    | FunctionExpression & { name: Identifier; };

/** Indictates whether a node is named function or class expression. */
function isNamedExpression(node: Node): node is NamedExpression {
    return (isFunctionExpression(node) || isClassExpression(node)) && isNamedDeclaration(node);
}

/** @internal */
export type VariableLike =
    | VariableDeclaration
    | PropertyDeclaration;

function isVariableLike(node: Node): node is VariableLike {
    return isPropertyDeclaration(node) || isVariableDeclaration(node);
}

/** @internal */
export type AssignedExpression =
    | ClassExpression & { name: undefined; parent: VariableLike & { name: Identifier; }; }
    | FunctionExpression & { name: undefined; parent: VariableLike & { name: Identifier; }; }
    | ArrowFunction & { name: undefined; parent: VariableLike & { name: Identifier; }; };

/** Indicates whether a node is a function, arrow, or class expression assigned to a constant variable or class property. */
function isAssignedExpression(node: Node): node is AssignedExpression {
    return (isFunctionExpression(node) || isArrowFunction(node) || isClassExpression(node))
        && isVariableLike(node.parent)
        && node === node.parent.initializer
        && isIdentifier(node.parent.name)
        && (!!(getCombinedNodeFlags(node.parent) & NodeFlags.Const) || isPropertyDeclaration(node.parent));
}

/** @internal */
export type CallHierarchyDeclaration =
    | SourceFile
    | ModuleDeclaration & { name: Identifier; }
    | FunctionDeclaration
    | ClassDeclaration
    | ClassStaticBlockDeclaration
    | MethodDeclaration
    | GetAccessorDeclaration
    | SetAccessorDeclaration
    | NamedExpression
    | AssignedExpression;

/**
 * Indicates whether a node could possibly be a call hierarchy declaration.
 *
 * See `resolveCallHierarchyDeclaration` for the specific rules.
 */
function isPossibleCallHierarchyDeclaration(node: Node) {
    return isSourceFile(node)
        || isModuleDeclaration(node)
        || isFunctionDeclaration(node)
        || isFunctionExpression(node)
        || isClassDeclaration(node)
        || isClassExpression(node)
        || isClassStaticBlockDeclaration(node)
        || isMethodDeclaration(node)
        || isMethodSignature(node)
        || isGetAccessorDeclaration(node)
        || isSetAccessorDeclaration(node);
}

/**
 * Indicates whether a node is a valid a call hierarchy declaration.
 *
 * See `resolveCallHierarchyDeclaration` for the specific rules.
 */
function isValidCallHierarchyDeclaration(node: Node): node is CallHierarchyDeclaration {
    return isSourceFile(node)
        || isModuleDeclaration(node) && isIdentifier(node.name)
        || isFunctionDeclaration(node)
        || isClassDeclaration(node)
        || isClassStaticBlockDeclaration(node)
        || isMethodDeclaration(node)
        || isMethodSignature(node)
        || isGetAccessorDeclaration(node)
        || isSetAccessorDeclaration(node)
        || isNamedExpression(node)
        || isAssignedExpression(node);
}

/** Gets the node that can be used as a reference to a call hierarchy declaration. */
function getCallHierarchyDeclarationReferenceNode(node: Exclude<CallHierarchyDeclaration, ClassStaticBlockDeclaration>) {
    if (isSourceFile(node)) return node;
    if (isNamedDeclaration(node)) return node.name;
    if (isAssignedExpression(node)) return node.parent.name;
    return Debug.checkDefined(node.modifiers && find(node.modifiers, isDefaultModifier));
}

function isDefaultModifier(node: Node) {
    return node.kind === SyntaxKind.DefaultKeyword;
}

/** Gets the symbol for a call hierarchy declaration. */
function getSymbolOfCallHierarchyDeclaration(typeChecker: TypeChecker, node: Exclude<CallHierarchyDeclaration, ClassStaticBlockDeclaration>) {
    const location = getCallHierarchyDeclarationReferenceNode(node);
    return location && typeChecker.getSymbolAtLocation(location);
}

/** Gets the text and range for the name of a call hierarchy declaration. */
function getCallHierarchyItemName(program: Program, node: CallHierarchyDeclaration): { text: string; pos: number; end: number; } {
    if (isSourceFile(node)) {
        return { text: node.fileName, pos: 0, end: 0 };
    }

    if ((isFunctionDeclaration(node) || isClassDeclaration(node)) && !isNamedDeclaration(node)) {
        const defaultModifier = node.modifiers && find(node.modifiers, isDefaultModifier);
        if (defaultModifier) {
            return { text: "default", pos: defaultModifier.getStart(), end: defaultModifier.getEnd() };
        }
    }

    if (isClassStaticBlockDeclaration(node)) {
        const sourceFile = node.getSourceFile();
        const pos = skipTrivia(sourceFile.text, moveRangePastModifiers(node).pos);
        const end = pos + 6; /* "static".length */
        const typeChecker = program.getTypeChecker();
        const symbol = typeChecker.getSymbolAtLocation(node.parent);
        const prefix = symbol ? `${typeChecker.symbolToString(symbol, node.parent)} ` : "";
        return { text: `${prefix}static {}`, pos, end };
    }

    const declName = isAssignedExpression(node) ? node.parent.name :
        Debug.checkDefined(getNameOfDeclaration(node), "Expected call hierarchy item to have a name");

    let text = isIdentifier(declName) ? idText(declName) :
        isStringOrNumericLiteralLike(declName) ? declName.text :
        isComputedPropertyName(declName) ?
        isStringOrNumericLiteralLike(declName.expression) ? declName.expression.text :
            undefined :
        undefined;
    if (text === undefined) {
        const typeChecker = program.getTypeChecker();
        const symbol = typeChecker.getSymbolAtLocation(declName);
        if (symbol) {
            text = typeChecker.symbolToString(symbol, node);
        }
    }
    if (text === undefined) {
        // get the text from printing the node on a single line without comments...
        const printer = createPrinterWithRemoveCommentsOmitTrailingSemicolon();
        text = usingSingleLineStringWriter(writer => printer.writeNode(EmitHint.Unspecified, node, node.getSourceFile(), writer));
    }
    return { text, pos: declName.getStart(), end: declName.getEnd() };
}

function getCallHierarchItemContainerName(node: CallHierarchyDeclaration): string | undefined {
    if (isAssignedExpression(node)) {
        if (isPropertyDeclaration(node.parent) && isClassLike(node.parent.parent)) {
            return isClassExpression(node.parent.parent) ? getAssignedName(node.parent.parent)?.getText() : node.parent.parent.name?.getText();
        }
        if (isModuleBlock(node.parent.parent.parent.parent) && isIdentifier(node.parent.parent.parent.parent.parent.name)) {
            return node.parent.parent.parent.parent.parent.name.getText();
        }
        return;
    }

    switch (node.kind) {
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.MethodDeclaration:
            if (node.parent.kind === SyntaxKind.ObjectLiteralExpression) {
                return getAssignedName(node.parent)?.getText();
            }
            return getNameOfDeclaration(node.parent)?.getText();
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ModuleDeclaration:
            if (isModuleBlock(node.parent) && isIdentifier(node.parent.parent.name)) {
                return node.parent.parent.name.getText();
            }
    }
}

/** Finds the implementation of a function-like declaration, if one exists. */
function findImplementation(typeChecker: TypeChecker, node: Extract<CallHierarchyDeclaration, FunctionLikeDeclaration>): Extract<CallHierarchyDeclaration, FunctionLikeDeclaration> | undefined;
function findImplementation(typeChecker: TypeChecker, node: FunctionLikeDeclaration): FunctionLikeDeclaration | undefined;
function findImplementation(typeChecker: TypeChecker, node: FunctionLikeDeclaration): FunctionLikeDeclaration | undefined {
    if (node.body) {
        return node;
    }
    if (isConstructorDeclaration(node)) {
        return getFirstConstructorWithBody(node.parent);
    }
    if (isFunctionDeclaration(node) || isMethodDeclaration(node)) {
        const symbol = getSymbolOfCallHierarchyDeclaration(typeChecker, node);
        if (symbol && symbol.valueDeclaration && isFunctionLikeDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.body) {
            return symbol.valueDeclaration;
        }
        return undefined;
    }
    return node;
}

function findAllInitialDeclarations(typeChecker: TypeChecker, node: Exclude<CallHierarchyDeclaration, ClassStaticBlockDeclaration>) {
    const symbol = getSymbolOfCallHierarchyDeclaration(typeChecker, node);
    let declarations: CallHierarchyDeclaration[] | undefined;
    if (symbol && symbol.declarations) {
        const indices = indicesOf(symbol.declarations);
        const keys = map(symbol.declarations, decl => ({ file: decl.getSourceFile().fileName, pos: decl.pos }));
        indices.sort((a, b) => compareStringsCaseSensitive(keys[a].file, keys[b].file) || keys[a].pos - keys[b].pos);
        const sortedDeclarations = map(indices, i => symbol.declarations![i]);
        let lastDecl: CallHierarchyDeclaration | undefined;
        for (const decl of sortedDeclarations) {
            if (isValidCallHierarchyDeclaration(decl)) {
                if (!lastDecl || lastDecl.parent !== decl.parent || lastDecl.end !== decl.pos) {
                    declarations = append(declarations, decl);
                }
                lastDecl = decl;
            }
        }
    }
    return declarations;
}

/** Find the implementation or the first declaration for a call hierarchy declaration. */
function findImplementationOrAllInitialDeclarations(typeChecker: TypeChecker, node: CallHierarchyDeclaration): CallHierarchyDeclaration | CallHierarchyDeclaration[] {
    if (isClassStaticBlockDeclaration(node)) {
        return node;
    }
    if (isFunctionLikeDeclaration(node)) {
        return findImplementation(typeChecker, node) ??
            findAllInitialDeclarations(typeChecker, node) ??
            node;
    }
    return findAllInitialDeclarations(typeChecker, node) ?? node;
}

/**
 * Resolves the call hierarchy declaration for a node.
 *
 * @internal
 */
export function resolveCallHierarchyDeclaration(program: Program, location: Node): CallHierarchyDeclaration | CallHierarchyDeclaration[] | undefined {
    // A call hierarchy item must refer to either a SourceFile, Module Declaration, Class Static Block, or something intrinsically callable that has a name:
    // - Class Declarations
    // - Class Expressions (with a name)
    // - Function Declarations
    // - Function Expressions (with a name or assigned to a const variable)
    // - Arrow Functions (assigned to a const variable)
    // - Constructors
    // - Class `static {}` initializer blocks
    // - Methods
    // - Accessors
    //
    // If a call is contained in a non-named callable Node (function expression, arrow function, etc.), then
    // its containing `CallHierarchyItem` is a containing function or SourceFile that matches the above list.

    const typeChecker = program.getTypeChecker();
    let followingSymbol = false;
    while (true) {
        if (isValidCallHierarchyDeclaration(location)) {
            return findImplementationOrAllInitialDeclarations(typeChecker, location);
        }
        if (isPossibleCallHierarchyDeclaration(location)) {
            const ancestor = findAncestor(location, isValidCallHierarchyDeclaration);
            return ancestor && findImplementationOrAllInitialDeclarations(typeChecker, ancestor);
        }
        if (isDeclarationName(location)) {
            if (isValidCallHierarchyDeclaration(location.parent)) {
                return findImplementationOrAllInitialDeclarations(typeChecker, location.parent);
            }
            if (isPossibleCallHierarchyDeclaration(location.parent)) {
                const ancestor = findAncestor(location.parent, isValidCallHierarchyDeclaration);
                return ancestor && findImplementationOrAllInitialDeclarations(typeChecker, ancestor);
            }
            if (isVariableLike(location.parent) && location.parent.initializer && isAssignedExpression(location.parent.initializer)) {
                return location.parent.initializer;
            }
            return undefined;
        }
        if (isConstructorDeclaration(location)) {
            if (isValidCallHierarchyDeclaration(location.parent)) {
                return location.parent;
            }
            return undefined;
        }
        if (location.kind === SyntaxKind.StaticKeyword && isClassStaticBlockDeclaration(location.parent)) {
            location = location.parent;
            continue;
        }
        // #39453
        if (isVariableDeclaration(location) && location.initializer && isAssignedExpression(location.initializer)) {
            return location.initializer;
        }
        if (!followingSymbol) {
            let symbol = typeChecker.getSymbolAtLocation(location);
            if (symbol) {
                if (symbol.flags & SymbolFlags.Alias) {
                    symbol = typeChecker.getAliasedSymbol(symbol);
                }
                if (symbol.valueDeclaration) {
                    followingSymbol = true;
                    location = symbol.valueDeclaration;
                    continue;
                }
            }
        }
        return undefined;
    }
}

/**
 * Creates a `CallHierarchyItem` for a call hierarchy declaration.
 *
 * @internal
 */
export function createCallHierarchyItem(program: Program, node: CallHierarchyDeclaration): CallHierarchyItem {
    const sourceFile = node.getSourceFile();
    const name = getCallHierarchyItemName(program, node);
    const containerName = getCallHierarchItemContainerName(node);
    const kind = getNodeKind(node);
    const kindModifiers = getNodeModifiers(node);
    const span = createTextSpanFromBounds(skipTrivia(sourceFile.text, node.getFullStart(), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true), node.getEnd());
    const selectionSpan = createTextSpanFromBounds(name.pos, name.end);
    return { file: sourceFile.fileName, kind, kindModifiers, name: name.text, containerName, span, selectionSpan };
}

function isDefined<T>(x: T): x is NonNullable<T> {
    return x !== undefined;
}

interface CallSite {
    declaration: CallHierarchyDeclaration;
    range: TextRange;
}

function convertEntryToCallSite(entry: FindAllReferences.Entry): CallSite | undefined {
    if (entry.kind === FindAllReferences.EntryKind.Node) {
        const { node } = entry;
        if (
            isCallOrNewExpressionTarget(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || isTaggedTemplateTag(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || isDecoratorTarget(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || isJsxOpeningLikeElementTagName(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || isRightSideOfPropertyAccess(node)
            || isArgumentExpressionOfElementAccess(node)
        ) {
            const sourceFile = node.getSourceFile();
            const ancestor = findAncestor(node, isValidCallHierarchyDeclaration) || sourceFile;
            return { declaration: ancestor, range: createTextRangeFromNode(node, sourceFile) };
        }
    }
}

function getCallSiteGroupKey(entry: CallSite) {
    return getNodeId(entry.declaration);
}

function createCallHierarchyIncomingCall(from: CallHierarchyItem, fromSpans: TextSpan[]): CallHierarchyIncomingCall {
    return { from, fromSpans };
}

function convertCallSiteGroupToIncomingCall(program: Program, entries: readonly CallSite[]) {
    return createCallHierarchyIncomingCall(createCallHierarchyItem(program, entries[0].declaration), map(entries, entry => createTextSpanFromRange(entry.range)));
}

/**
 * Gets the call sites that call into the provided call hierarchy declaration.
 *
 * @internal
 */
export function getIncomingCalls(program: Program, declaration: CallHierarchyDeclaration, cancellationToken: CancellationToken): CallHierarchyIncomingCall[] {
    // Source files and modules have no incoming calls.
    if (isSourceFile(declaration) || isModuleDeclaration(declaration) || isClassStaticBlockDeclaration(declaration)) {
        return [];
    }
    const location = getCallHierarchyDeclarationReferenceNode(declaration);
    const calls = filter(FindAllReferences.findReferenceOrRenameEntries(program, cancellationToken, program.getSourceFiles(), location, /*position*/ 0, { use: FindAllReferences.FindReferencesUse.References }, convertEntryToCallSite), isDefined);
    return calls ? group(calls, getCallSiteGroupKey, entries => convertCallSiteGroupToIncomingCall(program, entries)) : [];
}

function createCallSiteCollector(program: Program, callSites: CallSite[]): (node: Node | undefined) => void {
    function recordCallSite(node: CallExpression | NewExpression | TaggedTemplateExpression | PropertyAccessExpression | ElementAccessExpression | Decorator | JsxOpeningLikeElement | ClassStaticBlockDeclaration) {
        const target = isTaggedTemplateExpression(node) ? node.tag :
            isJsxOpeningLikeElement(node) ? node.tagName :
            isAccessExpression(node) ? node :
            isClassStaticBlockDeclaration(node) ? node :
            node.expression;
        const declaration = resolveCallHierarchyDeclaration(program, target);
        if (declaration) {
            const range = createTextRangeFromNode(target, node.getSourceFile());
            if (isArray(declaration)) {
                for (const decl of declaration) {
                    callSites.push({ declaration: decl, range });
                }
            }
            else {
                callSites.push({ declaration, range });
            }
        }
    }

    function collect(node: Node | undefined) {
        if (!node) return;
        if (node.flags & NodeFlags.Ambient) {
            // do not descend into ambient nodes.
            return;
        }

        if (isValidCallHierarchyDeclaration(node)) {
            // do not descend into other call site declarations, other than class member names
            if (isClassLike(node)) {
                for (const member of node.members) {
                    if (member.name && isComputedPropertyName(member.name)) {
                        collect(member.name.expression);
                    }
                }
            }
            return;
        }

        switch (node.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                // do not descend into nodes that cannot contain callable nodes
                return;
            case SyntaxKind.ClassStaticBlockDeclaration:
                recordCallSite(node as ClassStaticBlockDeclaration);
                return;
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                // do not descend into the type side of an assertion
                collect((node as TypeAssertion | AsExpression).expression);
                return;
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
                // do not descend into the type of a variable or parameter declaration
                collect((node as VariableDeclaration | ParameterDeclaration).name);
                collect((node as VariableDeclaration | ParameterDeclaration).initializer);
                return;
            case SyntaxKind.CallExpression:
                // do not descend into the type arguments of a call expression
                recordCallSite(node as CallExpression);
                collect((node as CallExpression).expression);
                forEach((node as CallExpression).arguments, collect);
                return;
            case SyntaxKind.NewExpression:
                // do not descend into the type arguments of a new expression
                recordCallSite(node as NewExpression);
                collect((node as NewExpression).expression);
                forEach((node as NewExpression).arguments, collect);
                return;
            case SyntaxKind.TaggedTemplateExpression:
                // do not descend into the type arguments of a tagged template expression
                recordCallSite(node as TaggedTemplateExpression);
                collect((node as TaggedTemplateExpression).tag);
                collect((node as TaggedTemplateExpression).template);
                return;
            case SyntaxKind.JsxOpeningElement:
            case SyntaxKind.JsxSelfClosingElement:
                // do not descend into the type arguments of a JsxOpeningLikeElement
                recordCallSite(node as JsxOpeningLikeElement);
                collect((node as JsxOpeningLikeElement).tagName);
                collect((node as JsxOpeningLikeElement).attributes);
                return;
            case SyntaxKind.Decorator:
                recordCallSite(node as Decorator);
                collect((node as Decorator).expression);
                return;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                recordCallSite(node as AccessExpression);
                forEachChild(node, collect);
                break;
            case SyntaxKind.SatisfiesExpression:
                // do not descend into the type side of an assertion
                collect((node as SatisfiesExpression).expression);
                return;
        }

        if (isPartOfTypeNode(node)) {
            // do not descend into types
            return;
        }

        forEachChild(node, collect);
    }
    return collect;
}

function collectCallSitesOfSourceFile(node: SourceFile, collect: (node: Node | undefined) => void) {
    forEach(node.statements, collect);
}

function collectCallSitesOfModuleDeclaration(node: ModuleDeclaration, collect: (node: Node | undefined) => void) {
    if (!hasSyntacticModifier(node, ModifierFlags.Ambient) && node.body && isModuleBlock(node.body)) {
        forEach(node.body.statements, collect);
    }
}

function collectCallSitesOfFunctionLikeDeclaration(typeChecker: TypeChecker, node: FunctionLikeDeclaration, collect: (node: Node | undefined) => void) {
    const implementation = findImplementation(typeChecker, node);
    if (implementation) {
        forEach(implementation.parameters, collect);
        collect(implementation.body);
    }
}

function collectCallSitesOfClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, collect: (node: Node | undefined) => void) {
    collect(node.body);
}

function collectCallSitesOfClassLikeDeclaration(node: ClassLikeDeclaration, collect: (node: Node | undefined) => void) {
    forEach(node.modifiers, collect);
    const heritage = getClassExtendsHeritageElement(node);
    if (heritage) {
        collect(heritage.expression);
    }
    for (const member of node.members) {
        if (canHaveModifiers(member)) {
            forEach(member.modifiers, collect);
        }
        if (isPropertyDeclaration(member)) {
            collect(member.initializer);
        }
        else if (isConstructorDeclaration(member) && member.body) {
            forEach(member.parameters, collect);
            collect(member.body);
        }
        else if (isClassStaticBlockDeclaration(member)) {
            collect(member);
        }
    }
}

function collectCallSites(program: Program, node: CallHierarchyDeclaration) {
    const callSites: CallSite[] = [];
    const collect = createCallSiteCollector(program, callSites);
    switch (node.kind) {
        case SyntaxKind.SourceFile:
            collectCallSitesOfSourceFile(node, collect);
            break;
        case SyntaxKind.ModuleDeclaration:
            collectCallSitesOfModuleDeclaration(node, collect);
            break;
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            collectCallSitesOfFunctionLikeDeclaration(program.getTypeChecker(), node, collect);
            break;
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
            collectCallSitesOfClassLikeDeclaration(node, collect);
            break;
        case SyntaxKind.ClassStaticBlockDeclaration:
            collectCallSitesOfClassStaticBlockDeclaration(node, collect);
            break;
        default:
            Debug.assertNever(node);
    }
    return callSites;
}

function createCallHierarchyOutgoingCall(to: CallHierarchyItem, fromSpans: TextSpan[]): CallHierarchyOutgoingCall {
    return { to, fromSpans };
}

function convertCallSiteGroupToOutgoingCall(program: Program, entries: readonly CallSite[]) {
    return createCallHierarchyOutgoingCall(createCallHierarchyItem(program, entries[0].declaration), map(entries, entry => createTextSpanFromRange(entry.range)));
}

/**
 * Gets the call sites that call out of the provided call hierarchy declaration.
 *
 * @internal
 */
export function getOutgoingCalls(program: Program, declaration: CallHierarchyDeclaration): CallHierarchyOutgoingCall[] {
    if (declaration.flags & NodeFlags.Ambient || isMethodSignature(declaration)) {
        return [];
    }
    return group(collectCallSites(program, declaration), getCallSiteGroupKey, entries => convertCallSiteGroupToOutgoingCall(program, entries));
}
