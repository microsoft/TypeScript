/* @internal */
namespace ts.CallHierarchy {
export type NamedExpression =
    | ts.ClassExpression & { name: ts.Identifier }
    | ts.FunctionExpression & { name: ts.Identifier }
    ;

/** Indictates whether a node is named function or class expression. */
function isNamedExpression(node: ts.Node): node is NamedExpression {
    return (ts.isFunctionExpression(node) || ts.isClassExpression(node)) && ts.isNamedDeclaration(node);
}

export type ConstNamedExpression =
    | ts.ClassExpression & { name: undefined, parent: ts.VariableDeclaration & { name: ts.Identifier } }
    | ts.FunctionExpression & { name: undefined, parent: ts.VariableDeclaration & { name: ts.Identifier } }
    | ts.ArrowFunction & { name: undefined, parent: ts.VariableDeclaration & { name: ts.Identifier } }
    ;

/** Indicates whether a node is a function, arrow, or class expression assigned to a constant variable. */
function isConstNamedExpression(node: ts.Node): node is ConstNamedExpression {
    return (ts.isFunctionExpression(node) || ts.isArrowFunction(node) || ts.isClassExpression(node))
        && ts.isVariableDeclaration(node.parent)
        && node === node.parent.initializer
        && ts.isIdentifier(node.parent.name)
        && !!(ts.getCombinedNodeFlags(node.parent) & ts.NodeFlags.Const);
}

export type CallHierarchyDeclaration =
    | ts.SourceFile
    | ts.ModuleDeclaration & { name: ts.Identifier }
    | ts.FunctionDeclaration
    | ts.ClassDeclaration
    | ts.ClassStaticBlockDeclaration
    | ts.MethodDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration
    | NamedExpression
    | ConstNamedExpression
    ;

/**
 * Indicates whether a node could possibly be a call hierarchy declaration.
 *
 * See `resolveCallHierarchyDeclaration` for the specific rules.
 */
function isPossibleCallHierarchyDeclaration(node: ts.Node) {
    return ts.isSourceFile(node)
        || ts.isModuleDeclaration(node)
        || ts.isFunctionDeclaration(node)
        || ts.isFunctionExpression(node)
        || ts.isClassDeclaration(node)
        || ts.isClassExpression(node)
        || ts.isClassStaticBlockDeclaration(node)
        || ts.isMethodDeclaration(node)
        || ts.isMethodSignature(node)
        || ts.isGetAccessorDeclaration(node)
        || ts.isSetAccessorDeclaration(node);
}

/**
 * Indicates whether a node is a valid a call hierarchy declaration.
 *
 * See `resolveCallHierarchyDeclaration` for the specific rules.
 */
function isValidCallHierarchyDeclaration(node: ts.Node): node is CallHierarchyDeclaration {
    return ts.isSourceFile(node)
        || ts.isModuleDeclaration(node) && ts.isIdentifier(node.name)
        || ts.isFunctionDeclaration(node)
        || ts.isClassDeclaration(node)
        || ts.isClassStaticBlockDeclaration(node)
        || ts.isMethodDeclaration(node)
        || ts.isMethodSignature(node)
        || ts.isGetAccessorDeclaration(node)
        || ts.isSetAccessorDeclaration(node)
        || isNamedExpression(node)
        || isConstNamedExpression(node);
}

/** Gets the node that can be used as a reference to a call hierarchy declaration. */
function getCallHierarchyDeclarationReferenceNode(node: Exclude<CallHierarchyDeclaration, ts.ClassStaticBlockDeclaration>) {
    if (ts.isSourceFile(node)) return node;
    if (ts.isNamedDeclaration(node)) return node.name;
    if (isConstNamedExpression(node)) return node.parent.name;
    return ts.Debug.checkDefined(node.modifiers && ts.find(node.modifiers, isDefaultModifier));
}

function isDefaultModifier(node: ts.Node) {
    return node.kind === ts.SyntaxKind.DefaultKeyword;
}

/** Gets the symbol for a call hierarchy declaration. */
function getSymbolOfCallHierarchyDeclaration(typeChecker: ts.TypeChecker, node: Exclude<CallHierarchyDeclaration, ts.ClassStaticBlockDeclaration>) {
    const location = getCallHierarchyDeclarationReferenceNode(node);
    return location && typeChecker.getSymbolAtLocation(location);
}

/** Gets the text and range for the name of a call hierarchy declaration. */
function getCallHierarchyItemName(program: ts.Program, node: CallHierarchyDeclaration): { text: string, pos: number, end: number } {
    if (ts.isSourceFile(node)) {
        return { text: node.fileName, pos: 0, end: 0 };
    }

    if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) && !ts.isNamedDeclaration(node)) {
        const defaultModifier = node.modifiers && ts.find(node.modifiers, isDefaultModifier);
        if (defaultModifier) {
            return { text: "default", pos: defaultModifier.getStart(), end: defaultModifier.getEnd() };
        }
    }

    if (ts.isClassStaticBlockDeclaration(node)) {
        const sourceFile = node.getSourceFile();
        const pos = ts.skipTrivia(sourceFile.text, ts.moveRangePastModifiers(node).pos);
        const end = pos + 6; /* "static".length */
        const typeChecker = program.getTypeChecker();
        const symbol = typeChecker.getSymbolAtLocation(node.parent);
        const prefix = symbol ? `${typeChecker.symbolToString(symbol, node.parent)} ` : "";
        return { text: `${prefix}static {}`, pos, end };
    }

    const declName = isConstNamedExpression(node) ? node.parent.name :
        ts.Debug.checkDefined(ts.getNameOfDeclaration(node), "Expected call hierarchy item to have a name");

    let text =
        ts.isIdentifier(declName) ? ts.idText(declName) :
        ts.isStringOrNumericLiteralLike(declName) ? declName.text :
        ts.isComputedPropertyName(declName) ?
            ts.isStringOrNumericLiteralLike(declName.expression) ? declName.expression.text :
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
        const printer = ts.createPrinter({ removeComments: true, omitTrailingSemicolon: true });
        text = ts.usingSingleLineStringWriter(writer => printer.writeNode(ts.EmitHint.Unspecified, node, node.getSourceFile(), writer));
    }
    return { text, pos: declName.getStart(), end: declName.getEnd() };
}

function getCallHierarchItemContainerName(node: CallHierarchyDeclaration): string | undefined {
    if (isConstNamedExpression(node)) {
        if (ts.isModuleBlock(node.parent.parent.parent.parent) && ts.isIdentifier(node.parent.parent.parent.parent.parent.name)) {
            return node.parent.parent.parent.parent.parent.name.getText();
        }
        return;
    }

    switch (node.kind) {
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.MethodDeclaration:
            if (node.parent.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                return ts.getAssignedName(node.parent)?.getText();
            }
            return ts.getNameOfDeclaration(node.parent)?.getText();
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
            if (ts.isModuleBlock(node.parent) && ts.isIdentifier(node.parent.parent.name)) {
                return node.parent.parent.name.getText();
            }
    }
}

/** Finds the implementation of a function-like declaration, if one exists. */
function findImplementation(typeChecker: ts.TypeChecker, node: Extract<CallHierarchyDeclaration, ts.FunctionLikeDeclaration>): Extract<CallHierarchyDeclaration, ts.FunctionLikeDeclaration> | undefined;
function findImplementation(typeChecker: ts.TypeChecker, node: ts.FunctionLikeDeclaration): ts.FunctionLikeDeclaration | undefined;
function findImplementation(typeChecker: ts.TypeChecker, node: ts.FunctionLikeDeclaration): ts.FunctionLikeDeclaration | undefined {
    if (node.body) {
        return node;
    }
    if (ts.isConstructorDeclaration(node)) {
        return ts.getFirstConstructorWithBody(node.parent);
    }
    if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
        const symbol = getSymbolOfCallHierarchyDeclaration(typeChecker, node);
        if (symbol && symbol.valueDeclaration && ts.isFunctionLikeDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.body) {
            return symbol.valueDeclaration;
        }
        return undefined;
    }
    return node;
}

function findAllInitialDeclarations(typeChecker: ts.TypeChecker, node: Exclude<CallHierarchyDeclaration, ts.ClassStaticBlockDeclaration>) {
    const symbol = getSymbolOfCallHierarchyDeclaration(typeChecker, node);
    let declarations: CallHierarchyDeclaration[] | undefined;
    if (symbol && symbol.declarations) {
        const indices = ts.indicesOf(symbol.declarations);
        const keys = ts.map(symbol.declarations, decl => ({ file: decl.getSourceFile().fileName, pos: decl.pos }));
        indices.sort((a, b) => ts.compareStringsCaseSensitive(keys[a].file, keys[b].file) || keys[a].pos - keys[b].pos);
        const sortedDeclarations = ts.map(indices, i => symbol.declarations![i]);
        let lastDecl: CallHierarchyDeclaration | undefined;
        for (const decl of sortedDeclarations) {
            if (isValidCallHierarchyDeclaration(decl)) {
                if (!lastDecl || lastDecl.parent !== decl.parent || lastDecl.end !== decl.pos) {
                    declarations = ts.append(declarations, decl);
                }
                lastDecl = decl;
            }
        }
    }
    return declarations;
}

/** Find the implementation or the first declaration for a call hierarchy declaration. */
function findImplementationOrAllInitialDeclarations(typeChecker: ts.TypeChecker, node: CallHierarchyDeclaration): CallHierarchyDeclaration | CallHierarchyDeclaration[] {
    if (ts.isClassStaticBlockDeclaration(node)) {
        return node;
    }
    if (ts.isFunctionLikeDeclaration(node)) {
        return findImplementation(typeChecker, node) ??
            findAllInitialDeclarations(typeChecker, node) ??
            node;
    }
    return findAllInitialDeclarations(typeChecker, node) ?? node;
}

/** Resolves the call hierarchy declaration for a node. */
export function resolveCallHierarchyDeclaration(program: ts.Program, location: ts.Node): CallHierarchyDeclaration | CallHierarchyDeclaration[] | undefined {
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
            const ancestor = ts.findAncestor(location, isValidCallHierarchyDeclaration);
            return ancestor && findImplementationOrAllInitialDeclarations(typeChecker, ancestor);
        }
        if (ts.isDeclarationName(location)) {
            if (isValidCallHierarchyDeclaration(location.parent)) {
                return findImplementationOrAllInitialDeclarations(typeChecker, location.parent);
            }
            if (isPossibleCallHierarchyDeclaration(location.parent)) {
                const ancestor = ts.findAncestor(location.parent, isValidCallHierarchyDeclaration);
                return ancestor && findImplementationOrAllInitialDeclarations(typeChecker, ancestor);
            }
            if (ts.isVariableDeclaration(location.parent) && location.parent.initializer && isConstNamedExpression(location.parent.initializer)) {
                return location.parent.initializer;
            }
            return undefined;
        }
        if (ts.isConstructorDeclaration(location)) {
            if (isValidCallHierarchyDeclaration(location.parent)) {
                return location.parent;
            }
            return undefined;
        }
        if (location.kind === ts.SyntaxKind.StaticKeyword && ts.isClassStaticBlockDeclaration(location.parent)) {
            location = location.parent;
            continue;
        }
        // #39453
        if (ts.isVariableDeclaration(location) && location.initializer && isConstNamedExpression(location.initializer)) {
            return location.initializer;
        }
        if (!followingSymbol) {
            let symbol = typeChecker.getSymbolAtLocation(location);
            if (symbol) {
                if (symbol.flags & ts.SymbolFlags.Alias) {
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

/** Creates a `CallHierarchyItem` for a call hierarchy declaration. */
export function createCallHierarchyItem(program: ts.Program, node: CallHierarchyDeclaration): ts.CallHierarchyItem {
    const sourceFile = node.getSourceFile();
    const name = getCallHierarchyItemName(program, node);
    const containerName = getCallHierarchItemContainerName(node);
    const kind = ts.getNodeKind(node);
    const kindModifiers = ts.getNodeModifiers(node);
    const span = ts.createTextSpanFromBounds(ts.skipTrivia(sourceFile.text, node.getFullStart(), /*stopAfterLineBreak*/ false, /*stopAtComments*/ true), node.getEnd());
    const selectionSpan = ts.createTextSpanFromBounds(name.pos, name.end);
    return { file: sourceFile.fileName, kind, kindModifiers, name: name.text, containerName, span, selectionSpan };
}

function isDefined<T>(x: T): x is NonNullable<T> {
    return x !== undefined;
}

interface CallSite {
    declaration: CallHierarchyDeclaration;
    range: ts.TextRange;
}

function convertEntryToCallSite(entry: ts.FindAllReferences.Entry): CallSite | undefined {
    if (entry.kind === ts.FindAllReferences.EntryKind.Node) {
        const { node } = entry;
        if (ts.isCallOrNewExpressionTarget(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || ts.isTaggedTemplateTag(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || ts.isDecoratorTarget(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || ts.isJsxOpeningLikeElementTagName(node, /*includeElementAccess*/ true, /*skipPastOuterExpressions*/ true)
            || ts.isRightSideOfPropertyAccess(node)
            || ts.isArgumentExpressionOfElementAccess(node)) {
            const sourceFile = node.getSourceFile();
            const ancestor = ts.findAncestor(node, isValidCallHierarchyDeclaration) || sourceFile;
            return { declaration: ancestor, range: ts.createTextRangeFromNode(node, sourceFile) };
        }
    }
}

function getCallSiteGroupKey(entry: CallSite) {
    return ts.getNodeId(entry.declaration);
}

function createCallHierarchyIncomingCall(from: ts.CallHierarchyItem, fromSpans: ts.TextSpan[]): ts.CallHierarchyIncomingCall {
    return { from, fromSpans };
}

function convertCallSiteGroupToIncomingCall(program: ts.Program, entries: readonly CallSite[]) {
    return createCallHierarchyIncomingCall(createCallHierarchyItem(program, entries[0].declaration), ts.map(entries, entry => ts.createTextSpanFromRange(entry.range)));
}

/** Gets the call sites that call into the provided call hierarchy declaration. */
export function getIncomingCalls(program: ts.Program, declaration: CallHierarchyDeclaration, cancellationToken: ts.CancellationToken): ts.CallHierarchyIncomingCall[] {
    // Source files and modules have no incoming calls.
    if (ts.isSourceFile(declaration) || ts.isModuleDeclaration(declaration) || ts.isClassStaticBlockDeclaration(declaration)) {
        return [];
    }
    const location = getCallHierarchyDeclarationReferenceNode(declaration);
    const calls = ts.filter(ts.FindAllReferences.findReferenceOrRenameEntries(program, cancellationToken, program.getSourceFiles(), location, /*position*/ 0, { use: ts.FindAllReferences.FindReferencesUse.References }, convertEntryToCallSite), isDefined);
    return calls ? ts.group(calls, getCallSiteGroupKey, entries => convertCallSiteGroupToIncomingCall(program, entries)) : [];
}

function createCallSiteCollector(program: ts.Program, callSites: CallSite[]): (node: ts.Node | undefined) => void {
    function recordCallSite(node: ts.CallExpression | ts.NewExpression | ts.TaggedTemplateExpression | ts.PropertyAccessExpression | ts.ElementAccessExpression | ts.Decorator | ts.JsxOpeningLikeElement | ts.ClassStaticBlockDeclaration) {
        const target =
            ts.isTaggedTemplateExpression(node) ? node.tag :
            ts.isJsxOpeningLikeElement(node) ? node.tagName :
            ts.isAccessExpression(node) ? node :
            ts.isClassStaticBlockDeclaration(node) ? node :
            node.expression;
        const declaration = resolveCallHierarchyDeclaration(program, target);
        if (declaration) {
            const range = ts.createTextRangeFromNode(target, node.getSourceFile());
            if (ts.isArray(declaration)) {
                for (const decl of declaration) {
                    callSites.push({ declaration: decl, range });
                }
            }
            else {
                callSites.push({ declaration, range });
            }
        }
    }

    function collect(node: ts.Node | undefined) {
        if (!node) return;
        if (node.flags & ts.NodeFlags.Ambient) {
            // do not descend into ambient nodes.
            return;
        }

        if (isValidCallHierarchyDeclaration(node)) {
            // do not descend into other call site declarations, other than class member names
            if (ts.isClassLike(node)) {
                for (const member of node.members) {
                    if (member.name && ts.isComputedPropertyName(member.name)) {
                        collect(member.name.expression);
                    }
                }
            }
            return;
        }

        switch (node.kind) {
            case ts.SyntaxKind.Identifier:
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ExportDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
                // do not descend into nodes that cannot contain callable nodes
                return;
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                recordCallSite(node as ts.ClassStaticBlockDeclaration);
                return;
            case ts.SyntaxKind.TypeAssertionExpression:
            case ts.SyntaxKind.AsExpression:
                // do not descend into the type side of an assertion
                collect((node as ts.TypeAssertion | ts.AsExpression).expression);
                return;
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.Parameter:
                // do not descend into the type of a variable or parameter declaration
                collect((node as ts.VariableDeclaration | ts.ParameterDeclaration).name);
                collect((node as ts.VariableDeclaration | ts.ParameterDeclaration).initializer);
                return;
            case ts.SyntaxKind.CallExpression:
                // do not descend into the type arguments of a call expression
                recordCallSite(node as ts.CallExpression);
                collect((node as ts.CallExpression).expression);
                ts.forEach((node as ts.CallExpression).arguments, collect);
                return;
            case ts.SyntaxKind.NewExpression:
                // do not descend into the type arguments of a new expression
                recordCallSite(node as ts.NewExpression);
                collect((node as ts.NewExpression).expression);
                ts.forEach((node as ts.NewExpression).arguments, collect);
                return;
            case ts.SyntaxKind.TaggedTemplateExpression:
                // do not descend into the type arguments of a tagged template expression
                recordCallSite(node as ts.TaggedTemplateExpression);
                collect((node as ts.TaggedTemplateExpression).tag);
                collect((node as ts.TaggedTemplateExpression).template);
                return;
            case ts.SyntaxKind.JsxOpeningElement:
            case ts.SyntaxKind.JsxSelfClosingElement:
                // do not descend into the type arguments of a JsxOpeningLikeElement
                recordCallSite(node as ts.JsxOpeningLikeElement);
                collect((node as ts.JsxOpeningLikeElement).tagName);
                collect((node as ts.JsxOpeningLikeElement).attributes);
                return;
            case ts.SyntaxKind.Decorator:
                recordCallSite(node as ts.Decorator);
                collect((node as ts.Decorator).expression);
                return;
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.ElementAccessExpression:
                recordCallSite(node as ts.AccessExpression);
                ts.forEachChild(node, collect);
                break;
            case ts.SyntaxKind.SatisfiesExpression:
                // do not descend into the type side of an assertion
                collect((node as ts.SatisfiesExpression).expression);
                return;
        }

        if (ts.isPartOfTypeNode(node)) {
            // do not descend into types
            return;
        }

        ts.forEachChild(node, collect);
    }
    return collect;
}

function collectCallSitesOfSourceFile(node: ts.SourceFile, collect: (node: ts.Node | undefined) => void) {
    ts.forEach(node.statements, collect);
}

function collectCallSitesOfModuleDeclaration(node: ts.ModuleDeclaration, collect: (node: ts.Node | undefined) => void) {
    if (!ts.hasSyntacticModifier(node, ts.ModifierFlags.Ambient) && node.body && ts.isModuleBlock(node.body)) {
        ts.forEach(node.body.statements, collect);
    }
}

function collectCallSitesOfFunctionLikeDeclaration(typeChecker: ts.TypeChecker, node: ts.FunctionLikeDeclaration, collect: (node: ts.Node | undefined) => void) {
    const implementation = findImplementation(typeChecker, node);
    if (implementation) {
        ts.forEach(implementation.parameters, collect);
        collect(implementation.body);
    }
}

function collectCallSitesOfClassStaticBlockDeclaration(node: ts.ClassStaticBlockDeclaration, collect: (node: ts.Node | undefined) => void) {
    collect(node.body);
}

function collectCallSitesOfClassLikeDeclaration(node: ts.ClassLikeDeclaration, collect: (node: ts.Node | undefined) => void) {
    ts.forEach(node.modifiers, collect);
    const heritage = ts.getClassExtendsHeritageElement(node);
    if (heritage) {
        collect(heritage.expression);
    }
    for (const member of node.members) {
        if (ts.canHaveModifiers(member)) {
            ts.forEach(member.modifiers, collect);
        }
        if (ts.isPropertyDeclaration(member)) {
            collect(member.initializer);
        }
        else if (ts.isConstructorDeclaration(member) && member.body) {
            ts.forEach(member.parameters, collect);
            collect(member.body);
        }
        else if (ts.isClassStaticBlockDeclaration(member)) {
            collect(member);
        }
    }
}

function collectCallSites(program: ts.Program, node: CallHierarchyDeclaration) {
    const callSites: CallSite[] = [];
    const collect = createCallSiteCollector(program, callSites);
    switch (node.kind) {
        case ts.SyntaxKind.SourceFile:
            collectCallSitesOfSourceFile(node, collect);
            break;
        case ts.SyntaxKind.ModuleDeclaration:
            collectCallSitesOfModuleDeclaration(node, collect);
            break;
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            collectCallSitesOfFunctionLikeDeclaration(program.getTypeChecker(), node, collect);
            break;
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
            collectCallSitesOfClassLikeDeclaration(node, collect);
            break;
        case ts.SyntaxKind.ClassStaticBlockDeclaration:
            collectCallSitesOfClassStaticBlockDeclaration(node, collect);
            break;
        default:
            ts.Debug.assertNever(node);
    }
    return callSites;
}

function createCallHierarchyOutgoingCall(to: ts.CallHierarchyItem, fromSpans: ts.TextSpan[]): ts.CallHierarchyOutgoingCall {
    return { to, fromSpans };
}

function convertCallSiteGroupToOutgoingCall(program: ts.Program, entries: readonly CallSite[]) {
    return createCallHierarchyOutgoingCall(createCallHierarchyItem(program, entries[0].declaration), ts.map(entries, entry => ts.createTextSpanFromRange(entry.range)));
}

/** Gets the call sites that call out of the provided call hierarchy declaration. */
export function getOutgoingCalls(program: ts.Program, declaration: CallHierarchyDeclaration): ts.CallHierarchyOutgoingCall[] {
    if (declaration.flags & ts.NodeFlags.Ambient || ts.isMethodSignature(declaration)) {
        return [];
    }
    return ts.group(collectCallSites(program, declaration), getCallSiteGroupKey, entries => convertCallSiteGroupToOutgoingCall(program, entries));
}
}
