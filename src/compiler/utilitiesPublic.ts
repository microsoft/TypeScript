import * as ts from "./_namespaces/ts";

export function isExternalModuleNameRelative(moduleName: string): boolean {
    // TypeScript 1.0 spec (April 2014): 11.2.1
    // An external module name is "relative" if the first term is "." or "..".
    // Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
    return ts.pathIsRelative(moduleName) || ts.isRootedDiskPath(moduleName);
}

export function sortAndDeduplicateDiagnostics<T extends ts.Diagnostic>(diagnostics: readonly T[]): ts.SortedReadonlyArray<T> {
    return ts.sortAndDeduplicate<T>(diagnostics, ts.compareDiagnostics);
}

export function getDefaultLibFileName(options: ts.CompilerOptions): string {
    switch (ts.getEmitScriptTarget(options)) {
        case ts.ScriptTarget.ESNext:
            return "lib.esnext.full.d.ts";
        case ts.ScriptTarget.ES2022:
            return "lib.es2022.full.d.ts";
        case ts.ScriptTarget.ES2021:
            return "lib.es2021.full.d.ts";
        case ts.ScriptTarget.ES2020:
            return "lib.es2020.full.d.ts";
        case ts.ScriptTarget.ES2019:
            return "lib.es2019.full.d.ts";
        case ts.ScriptTarget.ES2018:
            return "lib.es2018.full.d.ts";
        case ts.ScriptTarget.ES2017:
            return "lib.es2017.full.d.ts";
        case ts.ScriptTarget.ES2016:
            return "lib.es2016.full.d.ts";
        case ts.ScriptTarget.ES2015:
            return "lib.es6.d.ts";  // We don't use lib.es2015.full.d.ts due to breaking change.
        default:
            return "lib.d.ts";
    }
}

export function textSpanEnd(span: ts.TextSpan) {
    return span.start + span.length;
}

export function textSpanIsEmpty(span: ts.TextSpan) {
    return span.length === 0;
}

export function textSpanContainsPosition(span: ts.TextSpan, position: number) {
    return position >= span.start && position < textSpanEnd(span);
}

/* @internal */
export function textRangeContainsPositionInclusive(span: ts.TextRange, position: number): boolean {
    return position >= span.pos && position <= span.end;
}

// Returns true if 'span' contains 'other'.
export function textSpanContainsTextSpan(span: ts.TextSpan, other: ts.TextSpan) {
    return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
}

export function textSpanOverlapsWith(span: ts.TextSpan, other: ts.TextSpan) {
    return textSpanOverlap(span, other) !== undefined;
}

export function textSpanOverlap(span1: ts.TextSpan, span2: ts.TextSpan): ts.TextSpan | undefined {
    const overlap = textSpanIntersection(span1, span2);
    return overlap && overlap.length === 0 ? undefined : overlap;
}

export function textSpanIntersectsWithTextSpan(span: ts.TextSpan, other: ts.TextSpan) {
    return decodedTextSpanIntersectsWith(span.start, span.length, other.start, other.length);
}

export function textSpanIntersectsWith(span: ts.TextSpan, start: number, length: number) {
    return decodedTextSpanIntersectsWith(span.start, span.length, start, length);
}

export function decodedTextSpanIntersectsWith(start1: number, length1: number, start2: number, length2: number) {
    const end1 = start1 + length1;
    const end2 = start2 + length2;
    return start2 <= end1 && end2 >= start1;
}

export function textSpanIntersectsWithPosition(span: ts.TextSpan, position: number) {
    return position <= textSpanEnd(span) && position >= span.start;
}

export function textSpanIntersection(span1: ts.TextSpan, span2: ts.TextSpan): ts.TextSpan | undefined {
    const start = Math.max(span1.start, span2.start);
    const end = Math.min(textSpanEnd(span1), textSpanEnd(span2));
    return start <= end ? createTextSpanFromBounds(start, end) : undefined;
}

export function createTextSpan(start: number, length: number): ts.TextSpan {
    if (start < 0) {
        throw new Error("start < 0");
    }
    if (length < 0) {
        throw new Error("length < 0");
    }

    return { start, length };
}

export function createTextSpanFromBounds(start: number, end: number) {
    return createTextSpan(start, end - start);
}

export function textChangeRangeNewSpan(range: ts.TextChangeRange) {
    return createTextSpan(range.span.start, range.newLength);
}

export function textChangeRangeIsUnchanged(range: ts.TextChangeRange) {
    return textSpanIsEmpty(range.span) && range.newLength === 0;
}

export function createTextChangeRange(span: ts.TextSpan, newLength: number): ts.TextChangeRange {
    if (newLength < 0) {
        throw new Error("newLength < 0");
    }

    return { span, newLength };
}

export let unchangedTextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0); // eslint-disable-line prefer-const

/**
 * Called to merge all the changes that occurred across several versions of a script snapshot
 * into a single change.  i.e. if a user keeps making successive edits to a script we will
 * have a text change from V1 to V2, V2 to V3, ..., Vn.
 *
 * This function will then merge those changes into a single change range valid between V1 and
 * Vn.
 */
export function collapseTextChangeRangesAcrossMultipleVersions(changes: readonly ts.TextChangeRange[]): ts.TextChangeRange {
    if (changes.length === 0) {
        return unchangedTextChangeRange;
    }

    if (changes.length === 1) {
        return changes[0];
    }

    // We change from talking about { { oldStart, oldLength }, newLength } to { oldStart, oldEnd, newEnd }
    // as it makes things much easier to reason about.
    const change0 = changes[0];

    let oldStartN = change0.span.start;
    let oldEndN = textSpanEnd(change0.span);
    let newEndN = oldStartN + change0.newLength;

    for (let i = 1; i < changes.length; i++) {
        const nextChange = changes[i];

        // Consider the following case:
        // i.e. two edits.  The first represents the text change range { { 10, 50 }, 30 }.  i.e. The span starting
        // at 10, with length 50 is reduced to length 30.  The second represents the text change range { { 30, 30 }, 40 }.
        // i.e. the span starting at 30 with length 30 is increased to length 40.
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      -------------------------------------------------------------------------------------------------------
        //                |                                                 /
        //                |                                            /----
        //  T1            |                                       /----
        //                |                                  /----
        //                |                             /----
        //      -------------------------------------------------------------------------------------------------------
        //                                     |                            \
        //                                     |                               \
        //   T2                                |                                 \
        //                                     |                                   \
        //                                     |                                      \
        //      -------------------------------------------------------------------------------------------------------
        //
        // Merging these turns out to not be too difficult.  First, determining the new start of the change is trivial
        // it's just the min of the old and new starts.  i.e.:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      ------------------------------------------------------------*------------------------------------------
        //                |                                                 /
        //                |                                            /----
        //  T1            |                                       /----
        //                |                                  /----
        //                |                             /----
        //      ----------------------------------------$-------------------$------------------------------------------
        //                .                    |                            \
        //                .                    |                               \
        //   T2           .                    |                                 \
        //                .                    |                                   \
        //                .                    |                                      \
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // (Note the dots represent the newly inferred start.
        // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
        // absolute positions at the asterisks, and the relative change between the dollar signs. Basically, we see
        // which if the two $'s precedes the other, and we move that one forward until they line up.  in this case that
        // means:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      --------------------------------------------------------------------------------*----------------------
        //                |                                                                     /
        //                |                                                                /----
        //  T1            |                                                           /----
        //                |                                                      /----
        //                |                                                 /----
        //      ------------------------------------------------------------$------------------------------------------
        //                .                    |                            \
        //                .                    |                               \
        //   T2           .                    |                                 \
        //                .                    |                                   \
        //                .                    |                                      \
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // In other words (in this case), we're recognizing that the second edit happened after where the first edit
        // ended with a delta of 20 characters (60 - 40).  Thus, if we go back in time to where the first edit started
        // that's the same as if we started at char 80 instead of 60.
        //
        // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rather
        // than pushing the first edit forward to match the second, we'll push the second edit forward to match the
        // first.
        //
        // In this case that means we have { oldStart: 10, oldEnd: 80, newEnd: 70 } or, in TextChangeRange
        // semantics: { { start: 10, length: 70 }, newLength: 60 }
        //
        // The math then works out as follows.
        // If we have { oldStart1, oldEnd1, newEnd1 } and { oldStart2, oldEnd2, newEnd2 } then we can compute the
        // final result like so:
        //
        // {
        //      oldStart3: Min(oldStart1, oldStart2),
        //      oldEnd3: Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
        //      newEnd3: Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
        // }

        const oldStart1 = oldStartN;
        const oldEnd1 = oldEndN;
        const newEnd1 = newEndN;

        const oldStart2 = nextChange.span.start;
        const oldEnd2 = textSpanEnd(nextChange.span);
        const newEnd2 = oldStart2 + nextChange.newLength;

        oldStartN = Math.min(oldStart1, oldStart2);
        oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
        newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
    }

    return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), /*newLength*/ newEndN - oldStartN);
}

export function getTypeParameterOwner(d: ts.Declaration): ts.Declaration | undefined {
    if (d && d.kind === ts.SyntaxKind.TypeParameter) {
        for (let current: ts.Node = d; current; current = current.parent) {
            if (isFunctionLike(current) || isClassLike(current) || current.kind === ts.SyntaxKind.InterfaceDeclaration) {
                return current as ts.Declaration;
            }
        }
    }
}

export type ParameterPropertyDeclaration = ts.ParameterDeclaration & { parent: ts.ConstructorDeclaration, name: ts.Identifier };
export function isParameterPropertyDeclaration(node: ts.Node, parent: ts.Node): node is ParameterPropertyDeclaration {
    return ts.hasSyntacticModifier(node, ts.ModifierFlags.ParameterPropertyModifier) && parent.kind === ts.SyntaxKind.Constructor;
}

export function isEmptyBindingPattern(node: ts.BindingName): node is ts.BindingPattern {
    if (isBindingPattern(node)) {
        return ts.every(node.elements, isEmptyBindingElement);
    }
    return false;
}

export function isEmptyBindingElement(node: ts.BindingElement): boolean {
    if (ts.isOmittedExpression(node)) {
        return true;
    }
    return isEmptyBindingPattern(node.name);
}

export function walkUpBindingElementsAndPatterns(binding: ts.BindingElement): ts.VariableDeclaration | ts.ParameterDeclaration {
    let node = binding.parent;
    while (ts.isBindingElement(node.parent)) {
        node = node.parent.parent;
    }
    return node.parent;
}

function getCombinedFlags(node: ts.Node, getFlags: (n: ts.Node) => number): number {
    if (ts.isBindingElement(node)) {
        node = walkUpBindingElementsAndPatterns(node);
    }
    let flags = getFlags(node);
    if (node.kind === ts.SyntaxKind.VariableDeclaration) {
        node = node.parent;
    }
    if (node && node.kind === ts.SyntaxKind.VariableDeclarationList) {
        flags |= getFlags(node);
        node = node.parent;
    }
    if (node && node.kind === ts.SyntaxKind.VariableStatement) {
        flags |= getFlags(node);
    }
    return flags;
}

export function getCombinedModifierFlags(node: ts.Declaration): ts.ModifierFlags {
    return getCombinedFlags(node, ts.getEffectiveModifierFlags);
}

/* @internal */
export function getCombinedNodeFlagsAlwaysIncludeJSDoc(node: ts.Declaration): ts.ModifierFlags {
    return getCombinedFlags(node, ts.getEffectiveModifierFlagsAlwaysIncludeJSDoc);
}

// Returns the node flags for this node and all relevant parent nodes.  This is done so that
// nodes like variable declarations and binding elements can returned a view of their flags
// that includes the modifiers from their container.  i.e. flags like export/declare aren't
// stored on the variable declaration directly, but on the containing variable statement
// (if it has one).  Similarly, flags for let/const are stored on the variable declaration
// list.  By calling this function, all those flags are combined so that the client can treat
// the node as if it actually had those flags.
export function getCombinedNodeFlags(node: ts.Node): ts.NodeFlags {
    return getCombinedFlags(node, n => n.flags);
}

/* @internal */
export const supportedLocaleDirectories = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "ru", "tr", "zh-cn", "zh-tw"];

/**
 * Checks to see if the locale is in the appropriate format,
 * and if it is, attempts to set the appropriate language.
 */
export function validateLocaleAndSetLanguage(
    locale: string,
    sys: { getExecutingFilePath(): string, resolvePath(path: string): string, fileExists(fileName: string): boolean, readFile(fileName: string): string | undefined },
    errors?: ts.Push<ts.Diagnostic>) {
    const lowerCaseLocale = locale.toLowerCase();
    const matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(lowerCaseLocale);

    if (!matchResult) {
        if (errors) {
            errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
        }
        return;
    }

    const language = matchResult[1];
    const territory = matchResult[3];

    // First try the entire locale, then fall back to just language if that's all we have.
    // Either ways do not fail, and fallback to the English diagnostic strings.
    if (ts.contains(supportedLocaleDirectories, lowerCaseLocale) && !trySetLanguageAndTerritory(language, territory, errors)) {
        trySetLanguageAndTerritory(language, /*territory*/ undefined, errors);
    }

    // Set the UI locale for string collation
    ts.setUILocale(locale);

    function trySetLanguageAndTerritory(language: string, territory: string | undefined, errors?: ts.Push<ts.Diagnostic>): boolean {
        const compilerFilePath = ts.normalizePath(sys.getExecutingFilePath());
        const containingDirectoryPath = ts.getDirectoryPath(compilerFilePath);

        let filePath = ts.combinePaths(containingDirectoryPath, language);

        if (territory) {
            filePath = filePath + "-" + territory;
        }

        filePath = sys.resolvePath(ts.combinePaths(filePath, "diagnosticMessages.generated.json"));

        if (!sys.fileExists(filePath)) {
            return false;
        }

        // TODO: Add codePage support for readFile?
        let fileContents: string | undefined = "";
        try {
            fileContents = sys.readFile(filePath);
        }
        catch (e) {
            if (errors) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Unable_to_open_file_0, filePath));
            }
            return false;
        }
        try {
            // this is a global mutation (or live binding update)!
            ts.setLocalizedDiagnosticMessages(JSON.parse(fileContents!));
        }
        catch {
            if (errors) {
                errors.push(ts.createCompilerDiagnostic(ts.Diagnostics.Corrupted_locale_file_0, filePath));
            }
            return false;
        }

        return true;
    }
}

export function getOriginalNode(node: ts.Node): ts.Node;
export function getOriginalNode<T extends ts.Node>(node: ts.Node, nodeTest: (node: ts.Node) => node is T): T;
export function getOriginalNode(node: ts.Node | undefined): ts.Node | undefined;
export function getOriginalNode<T extends ts.Node>(node: ts.Node | undefined, nodeTest: (node: ts.Node | undefined) => node is T): T | undefined;
export function getOriginalNode(node: ts.Node | undefined, nodeTest?: (node: ts.Node | undefined) => boolean): ts.Node | undefined {
    if (node) {
        while (node.original !== undefined) {
            node = node.original;
        }
    }

    return !nodeTest || nodeTest(node) ? node : undefined;
}

/**
 * Iterates through the parent chain of a node and performs the callback on each parent until the callback
 * returns a truthy value, then returns that value.
 * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
 * At that point findAncestor returns undefined.
 */
export function findAncestor<T extends ts.Node>(node: ts.Node | undefined, callback: (element: ts.Node) => element is T): T | undefined;
export function findAncestor(node: ts.Node | undefined, callback: (element: ts.Node) => boolean | "quit"): ts.Node | undefined;
export function findAncestor(node: ts.Node, callback: (element: ts.Node) => boolean | "quit"): ts.Node | undefined {
    while (node) {
        const result = callback(node);
        if (result === "quit") {
            return undefined;
        }
        else if (result) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/**
 * Gets a value indicating whether a node originated in the parse tree.
 *
 * @param node The node to test.
 */
export function isParseTreeNode(node: ts.Node): boolean {
    return (node.flags & ts.NodeFlags.Synthesized) === 0;
}

/**
 * Gets the original parse tree node for a node.
 *
 * @param node The original node.
 * @returns The original parse tree node if found; otherwise, undefined.
 */
export function getParseTreeNode(node: ts.Node | undefined): ts.Node | undefined;

/**
 * Gets the original parse tree node for a node.
 *
 * @param node The original node.
 * @param nodeTest A callback used to ensure the correct type of parse tree node is returned.
 * @returns The original parse tree node if found; otherwise, undefined.
 */
export function getParseTreeNode<T extends ts.Node>(node: T | undefined, nodeTest?: (node: ts.Node) => node is T): T | undefined;
export function getParseTreeNode(node: ts.Node | undefined, nodeTest?: (node: ts.Node) => boolean): ts.Node | undefined {
    if (node === undefined || isParseTreeNode(node)) {
        return node;
    }

    node = node.original;
    while (node) {
        if (isParseTreeNode(node)) {
            return !nodeTest || nodeTest(node) ? node : undefined;
        }
        node = node.original;
    }
}

/** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
export function escapeLeadingUnderscores(identifier: string): ts.__String {
    return (identifier.length >= 2 && identifier.charCodeAt(0) === ts.CharacterCodes._ && identifier.charCodeAt(1) === ts.CharacterCodes._ ? "_" + identifier : identifier) as ts.__String;
}

/**
 * Remove extra underscore from escaped identifier text content.
 *
 * @param identifier The escaped identifier text.
 * @returns The unescaped identifier text.
 */
export function unescapeLeadingUnderscores(identifier: ts.__String): string {
    const id = identifier as string;
    return id.length >= 3 && id.charCodeAt(0) === ts.CharacterCodes._ && id.charCodeAt(1) === ts.CharacterCodes._ && id.charCodeAt(2) === ts.CharacterCodes._ ? id.substr(1) : id;
}

export function idText(identifierOrPrivateName: ts.Identifier | ts.PrivateIdentifier): string {
    return unescapeLeadingUnderscores(identifierOrPrivateName.escapedText);
}
export function symbolName(symbol: ts.Symbol): string {
    if (symbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
        return idText(symbol.valueDeclaration.name);
    }
    return unescapeLeadingUnderscores(symbol.escapedName);
}

/**
 * A JSDocTypedef tag has an _optional_ name field - if a name is not directly present, we should
 * attempt to draw the name from the node the declaration is on (as that declaration is what its' symbol
 * will be merged with)
 */
function nameForNamelessJSDocTypedef(declaration: ts.JSDocTypedefTag | ts.JSDocEnumTag): ts.Identifier | ts.PrivateIdentifier | undefined {
    const hostNode = declaration.parent.parent;
    if (!hostNode) {
        return undefined;
    }
    // Covers classes, functions - any named declaration host node
    if (isDeclaration(hostNode)) {
        return getDeclarationIdentifier(hostNode);
    }
    // Covers remaining cases (returning undefined if none match).
    switch (hostNode.kind) {
        case ts.SyntaxKind.VariableStatement:
            if (hostNode.declarationList && hostNode.declarationList.declarations[0]) {
                return getDeclarationIdentifier(hostNode.declarationList.declarations[0]);
            }
            break;
        case ts.SyntaxKind.ExpressionStatement:
            let expr = hostNode.expression;
            if (expr.kind === ts.SyntaxKind.BinaryExpression && (expr as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.EqualsToken) {
                expr = (expr as ts.BinaryExpression).left;
            }
            switch (expr.kind) {
                case ts.SyntaxKind.PropertyAccessExpression:
                    return (expr as ts.PropertyAccessExpression).name;
                case ts.SyntaxKind.ElementAccessExpression:
                    const arg = (expr as ts.ElementAccessExpression).argumentExpression;
                    if (ts.isIdentifier(arg)) {
                        return arg;
                    }
            }
            break;
        case ts.SyntaxKind.ParenthesizedExpression: {
            return getDeclarationIdentifier(hostNode.expression);
        }
        case ts.SyntaxKind.LabeledStatement: {
            if (isDeclaration(hostNode.statement) || isExpression(hostNode.statement)) {
                return getDeclarationIdentifier(hostNode.statement);
            }
            break;
        }
    }
}

function getDeclarationIdentifier(node: ts.Declaration | ts.Expression): ts.Identifier | undefined {
    const name = getNameOfDeclaration(node);
    return name && ts.isIdentifier(name) ? name : undefined;
}

/** @internal */
export function nodeHasName(statement: ts.Node, name: ts.Identifier) {
    if (isNamedDeclaration(statement) && ts.isIdentifier(statement.name) && idText(statement.name as ts.Identifier) === idText(name)) {
        return true;
    }
    if (ts.isVariableStatement(statement) && ts.some(statement.declarationList.declarations, d => nodeHasName(d, name))) {
        return true;
    }
    return false;
}

export function getNameOfJSDocTypedef(declaration: ts.JSDocTypedefTag): ts.Identifier | ts.PrivateIdentifier | undefined {
    return declaration.name || nameForNamelessJSDocTypedef(declaration);
}

/** @internal */
export function isNamedDeclaration(node: ts.Node): node is ts.NamedDeclaration & { name: ts.DeclarationName } {
    return !!(node as ts.NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
}

/** @internal */
export function getNonAssignedNameOfDeclaration(declaration: ts.Declaration | ts.Expression): ts.DeclarationName | undefined {
    switch (declaration.kind) {
        case ts.SyntaxKind.Identifier:
            return declaration as ts.Identifier;
        case ts.SyntaxKind.JSDocPropertyTag:
        case ts.SyntaxKind.JSDocParameterTag: {
            const { name } = declaration as ts.JSDocPropertyLikeTag;
            if (name.kind === ts.SyntaxKind.QualifiedName) {
                return name.right;
            }
            break;
        }
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.BinaryExpression: {
            const expr = declaration as ts.BinaryExpression | ts.CallExpression;
            switch (ts.getAssignmentDeclarationKind(expr)) {
                case ts.AssignmentDeclarationKind.ExportsProperty:
                case ts.AssignmentDeclarationKind.ThisProperty:
                case ts.AssignmentDeclarationKind.Property:
                case ts.AssignmentDeclarationKind.PrototypeProperty:
                    return ts.getElementOrPropertyAccessArgumentExpressionOrName((expr as ts.BinaryExpression).left as ts.AccessExpression);
                case ts.AssignmentDeclarationKind.ObjectDefinePropertyValue:
                case ts.AssignmentDeclarationKind.ObjectDefinePropertyExports:
                case ts.AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                    return (expr as ts.BindableObjectDefinePropertyCall).arguments[1];
                default:
                    return undefined;
            }
        }
        case ts.SyntaxKind.JSDocTypedefTag:
            return getNameOfJSDocTypedef(declaration as ts.JSDocTypedefTag);
        case ts.SyntaxKind.JSDocEnumTag:
            return nameForNamelessJSDocTypedef(declaration as ts.JSDocEnumTag);
        case ts.SyntaxKind.ExportAssignment: {
            const { expression } = declaration as ts.ExportAssignment;
            return ts.isIdentifier(expression) ? expression : undefined;
        }
        case ts.SyntaxKind.ElementAccessExpression:
            const expr = declaration as ts.ElementAccessExpression;
            if (ts.isBindableStaticElementAccessExpression(expr)) {
                return expr.argumentExpression;
            }
    }
    return (declaration as ts.NamedDeclaration).name;
}

export function getNameOfDeclaration(declaration: ts.Declaration | ts.Expression | undefined): ts.DeclarationName | undefined {
    if (declaration === undefined) return undefined;
    return getNonAssignedNameOfDeclaration(declaration) ||
        (ts.isFunctionExpression(declaration) || ts.isArrowFunction(declaration) || ts.isClassExpression(declaration) ? getAssignedName(declaration) : undefined);
}

/*@internal*/
export function getAssignedName(node: ts.Node): ts.DeclarationName | undefined {
    if (!node.parent) {
        return undefined;
    }
    else if (ts.isPropertyAssignment(node.parent) || ts.isBindingElement(node.parent)) {
        return node.parent.name;
    }
    else if (ts.isBinaryExpression(node.parent) && node === node.parent.right) {
        if (ts.isIdentifier(node.parent.left)) {
            return node.parent.left;
        }
        else if (ts.isAccessExpression(node.parent.left)) {
            return ts.getElementOrPropertyAccessArgumentExpressionOrName(node.parent.left);
        }
    }
    else if (ts.isVariableDeclaration(node.parent) && ts.isIdentifier(node.parent.name)) {
        return node.parent.name;
    }
}

export function getDecorators(node: ts.HasDecorators): readonly ts.Decorator[] | undefined {
    if (ts.hasDecorators(node)) {
        return ts.filter(node.modifiers, ts.isDecorator);
    }
}

export function getModifiers(node: ts.HasModifiers): readonly ts.Modifier[] | undefined {
    if (ts.hasSyntacticModifier(node, ts.ModifierFlags.Modifier)) {
        return ts.filter(node.modifiers, isModifier);
    }
}

function getJSDocParameterTagsWorker(param: ts.ParameterDeclaration, noCache?: boolean): readonly ts.JSDocParameterTag[] {
    if (param.name) {
        if (ts.isIdentifier(param.name)) {
            const name = param.name.escapedText;
            return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is ts.JSDocParameterTag => ts.isJSDocParameterTag(tag) && ts.isIdentifier(tag.name) && tag.name.escapedText === name);
        }
        else {
            const i = param.parent.parameters.indexOf(param);
            ts.Debug.assert(i > -1, "Parameters should always be in their parents' parameter list");
            const paramTags = getJSDocTagsWorker(param.parent, noCache).filter(ts.isJSDocParameterTag);
            if (i < paramTags.length) {
                return [paramTags[i]];
            }
        }
    }
    // return empty array for: out-of-order binding patterns and JSDoc function syntax, which has un-named parameters
    return ts.emptyArray;
}

/**
 * Gets the JSDoc parameter tags for the node if present.
 *
 * @remarks Returns any JSDoc param tag whose name matches the provided
 * parameter, whether a param tag on a containing function
 * expression, or a param tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are returned first, so in the previous example, the param
 * tag on the containing function expression would be first.
 *
 * For binding patterns, parameter tags are matched by position.
 */
export function getJSDocParameterTags(param: ts.ParameterDeclaration): readonly ts.JSDocParameterTag[] {
    return getJSDocParameterTagsWorker(param, /*noCache*/ false);
}

/* @internal */
export function getJSDocParameterTagsNoCache(param: ts.ParameterDeclaration): readonly ts.JSDocParameterTag[] {
    return getJSDocParameterTagsWorker(param, /*noCache*/ true);
}

function getJSDocTypeParameterTagsWorker(param: ts.TypeParameterDeclaration, noCache?: boolean): readonly ts.JSDocTemplateTag[] {
    const name = param.name.escapedText;
    return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is ts.JSDocTemplateTag =>
        ts.isJSDocTemplateTag(tag) && tag.typeParameters.some(tp => tp.name.escapedText === name));
}

/**
 * Gets the JSDoc type parameter tags for the node if present.
 *
 * @remarks Returns any JSDoc template tag whose names match the provided
 * parameter, whether a template tag on a containing function
 * expression, or a template tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are returned first, so in the previous example, the template
 * tag on the containing function expression would be first.
 */
export function getJSDocTypeParameterTags(param: ts.TypeParameterDeclaration): readonly ts.JSDocTemplateTag[] {
    return getJSDocTypeParameterTagsWorker(param, /*noCache*/ false);
}

/* @internal */
export function getJSDocTypeParameterTagsNoCache(param: ts.TypeParameterDeclaration): readonly ts.JSDocTemplateTag[] {
    return getJSDocTypeParameterTagsWorker(param, /*noCache*/ true);
}

/**
 * Return true if the node has JSDoc parameter tags.
 *
 * @remarks Includes parameter tags that are not directly on the node,
 * for example on a variable declaration whose initializer is a function expression.
 */
export function hasJSDocParameterTags(node: ts.FunctionLikeDeclaration | ts.SignatureDeclaration): boolean {
    return !!getFirstJSDocTag(node, ts.isJSDocParameterTag);
}

/** Gets the JSDoc augments tag for the node if present */
export function getJSDocAugmentsTag(node: ts.Node): ts.JSDocAugmentsTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocAugmentsTag);
}

/** Gets the JSDoc implements tags for the node if present */
export function getJSDocImplementsTags(node: ts.Node): readonly ts.JSDocImplementsTag[] {
    return getAllJSDocTags(node, ts.isJSDocImplementsTag);
}

/** Gets the JSDoc class tag for the node if present */
export function getJSDocClassTag(node: ts.Node): ts.JSDocClassTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocClassTag);
}

/** Gets the JSDoc public tag for the node if present */
export function getJSDocPublicTag(node: ts.Node): ts.JSDocPublicTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocPublicTag);
}

/*@internal*/
export function getJSDocPublicTagNoCache(node: ts.Node): ts.JSDocPublicTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocPublicTag, /*noCache*/ true);
}

/** Gets the JSDoc private tag for the node if present */
export function getJSDocPrivateTag(node: ts.Node): ts.JSDocPrivateTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocPrivateTag);
}

/*@internal*/
export function getJSDocPrivateTagNoCache(node: ts.Node): ts.JSDocPrivateTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocPrivateTag, /*noCache*/ true);
}

/** Gets the JSDoc protected tag for the node if present */
export function getJSDocProtectedTag(node: ts.Node): ts.JSDocProtectedTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocProtectedTag);
}

/*@internal*/
export function getJSDocProtectedTagNoCache(node: ts.Node): ts.JSDocProtectedTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocProtectedTag, /*noCache*/ true);
}

/** Gets the JSDoc protected tag for the node if present */
export function getJSDocReadonlyTag(node: ts.Node): ts.JSDocReadonlyTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocReadonlyTag);
}

/*@internal*/
export function getJSDocReadonlyTagNoCache(node: ts.Node): ts.JSDocReadonlyTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocReadonlyTag, /*noCache*/ true);
}

export function getJSDocOverrideTagNoCache(node: ts.Node): ts.JSDocOverrideTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocOverrideTag, /*noCache*/ true);
}

/** Gets the JSDoc deprecated tag for the node if present */
export function getJSDocDeprecatedTag(node: ts.Node): ts.JSDocDeprecatedTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocDeprecatedTag);
}

/*@internal */
export function getJSDocDeprecatedTagNoCache(node: ts.Node): ts.JSDocDeprecatedTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocDeprecatedTag, /*noCache*/ true);
}

/** Gets the JSDoc enum tag for the node if present */
export function getJSDocEnumTag(node: ts.Node): ts.JSDocEnumTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocEnumTag);
}

/** Gets the JSDoc this tag for the node if present */
export function getJSDocThisTag(node: ts.Node): ts.JSDocThisTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocThisTag);
}

/** Gets the JSDoc return tag for the node if present */
export function getJSDocReturnTag(node: ts.Node): ts.JSDocReturnTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocReturnTag);
}

/** Gets the JSDoc template tag for the node if present */
export function getJSDocTemplateTag(node: ts.Node): ts.JSDocTemplateTag | undefined {
    return getFirstJSDocTag(node, ts.isJSDocTemplateTag);
}

/** Gets the JSDoc type tag for the node if present and valid */
export function getJSDocTypeTag(node: ts.Node): ts.JSDocTypeTag | undefined {
    // We should have already issued an error if there were multiple type jsdocs, so just use the first one.
    const tag = getFirstJSDocTag(node, ts.isJSDocTypeTag);
    if (tag && tag.typeExpression && tag.typeExpression.type) {
        return tag;
    }
    return undefined;
}

/**
 * Gets the type node for the node if provided via JSDoc.
 *
 * @remarks The search includes any JSDoc param tag that relates
 * to the provided parameter, for example a type tag on the
 * parameter itself, or a param tag on a containing function
 * expression, or a param tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are examined first, so in the previous example, the type
 * tag directly on the node would be returned.
 */
export function getJSDocType(node: ts.Node): ts.TypeNode | undefined {
    let tag: ts.JSDocTypeTag | ts.JSDocParameterTag | undefined = getFirstJSDocTag(node, ts.isJSDocTypeTag);
    if (!tag && ts.isParameter(node)) {
        tag = ts.find(getJSDocParameterTags(node), tag => !!tag.typeExpression);
    }

    return tag && tag.typeExpression && tag.typeExpression.type;
}

/**
 * Gets the return type node for the node if provided via JSDoc return tag or type tag.
 *
 * @remarks `getJSDocReturnTag` just gets the whole JSDoc tag. This function
 * gets the type from inside the braces, after the fat arrow, etc.
 */
export function getJSDocReturnType(node: ts.Node): ts.TypeNode | undefined {
    const returnTag = getJSDocReturnTag(node);
    if (returnTag && returnTag.typeExpression) {
        return returnTag.typeExpression.type;
    }
    const typeTag = getJSDocTypeTag(node);
    if (typeTag && typeTag.typeExpression) {
        const type = typeTag.typeExpression.type;
        if (ts.isTypeLiteralNode(type)) {
            const sig = ts.find(type.members, ts.isCallSignatureDeclaration);
            return sig && sig.type;
        }
        if (ts.isFunctionTypeNode(type) || ts.isJSDocFunctionType(type)) {
            return type.type;
        }
    }
}

function getJSDocTagsWorker(node: ts.Node, noCache?: boolean): readonly ts.JSDocTag[] {
    let tags = (node as ts.JSDocContainer).jsDocCache;
    // If cache is 'null', that means we did the work of searching for JSDoc tags and came up with nothing.
    if (tags === undefined || noCache) {
        const comments = ts.getJSDocCommentsAndTags(node, noCache);
        ts.Debug.assert(comments.length < 2 || comments[0] !== comments[1]);
        tags = ts.flatMap(comments, j => ts.isJSDoc(j) ? j.tags : j);
        if (!noCache) {
            (node as ts.JSDocContainer).jsDocCache = tags;
        }
    }
    return tags;
}

/** Get all JSDoc tags related to a node, including those on parent nodes. */
export function getJSDocTags(node: ts.Node): readonly ts.JSDocTag[] {
    return getJSDocTagsWorker(node, /*noCache*/ false);
}

/* @internal */
export function getJSDocTagsNoCache(node: ts.Node): readonly ts.JSDocTag[] {
    return getJSDocTagsWorker(node, /*noCache*/ true);
}

/** Get the first JSDoc tag of a specified kind, or undefined if not present. */
function getFirstJSDocTag<T extends ts.JSDocTag>(node: ts.Node, predicate: (tag: ts.JSDocTag) => tag is T, noCache?: boolean): T | undefined {
    return ts.find(getJSDocTagsWorker(node, noCache), predicate);
}

/** Gets all JSDoc tags that match a specified predicate */
export function getAllJSDocTags<T extends ts.JSDocTag>(node: ts.Node, predicate: (tag: ts.JSDocTag) => tag is T): readonly T[] {
    return getJSDocTags(node).filter(predicate);
}

/** Gets all JSDoc tags of a specified kind */
export function getAllJSDocTagsOfKind(node: ts.Node, kind: ts.SyntaxKind): readonly ts.JSDocTag[] {
    return getJSDocTags(node).filter(doc => doc.kind === kind);
}

/** Gets the text of a jsdoc comment, flattening links to their text. */
export function getTextOfJSDocComment(comment?: string | ts.NodeArray<ts.JSDocComment>) {
    return typeof comment === "string" ? comment
        : comment?.map(c => c.kind === ts.SyntaxKind.JSDocText ? c.text : formatJSDocLink(c)).join("");
}

function formatJSDocLink(link: ts.JSDocLink | ts.JSDocLinkCode | ts.JSDocLinkPlain) {
    const kind = link.kind === ts.SyntaxKind.JSDocLink ? "link"
        : link.kind === ts.SyntaxKind.JSDocLinkCode ? "linkcode"
        : "linkplain";
    const name = link.name ? ts.entityNameToString(link.name) : "";
    const space = link.name && link.text.startsWith("://") ? "" : " ";
    return `{@${kind} ${name}${space}${link.text}}`;
}

/**
 * Gets the effective type parameters. If the node was parsed in a
 * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
 *
 * This does *not* return type parameters from a jsdoc reference to a generic type, eg
 *
 * type Id = <T>(x: T) => T
 * /** @type {Id} /
 * function id(x) { return x }
 */
export function getEffectiveTypeParameterDeclarations(node: ts.DeclarationWithTypeParameters): readonly ts.TypeParameterDeclaration[] {
    if (ts.isJSDocSignature(node)) {
        return ts.emptyArray;
    }
    if (ts.isJSDocTypeAlias(node)) {
        ts.Debug.assert(node.parent.kind === ts.SyntaxKind.JSDoc);
        return ts.flatMap(node.parent.tags, tag => ts.isJSDocTemplateTag(tag) ? tag.typeParameters : undefined);
    }
    if (node.typeParameters) {
        return node.typeParameters;
    }
    if (ts.canHaveIllegalTypeParameters(node) && node.typeParameters) {
        return node.typeParameters;
    }
    if (ts.isInJSFile(node)) {
        const decls = ts.getJSDocTypeParameterDeclarations(node);
        if (decls.length) {
            return decls;
        }
        const typeTag = getJSDocType(node);
        if (typeTag && ts.isFunctionTypeNode(typeTag) && typeTag.typeParameters) {
            return typeTag.typeParameters;
        }
    }
    return ts.emptyArray;
}

export function getEffectiveConstraintOfTypeParameter(node: ts.TypeParameterDeclaration): ts.TypeNode | undefined {
    return node.constraint ? node.constraint :
        ts.isJSDocTemplateTag(node.parent) && node === node.parent.typeParameters[0] ? node.parent.constraint :
        undefined;
}

// #region

export function isMemberName(node: ts.Node): node is ts.MemberName {
    return node.kind === ts.SyntaxKind.Identifier || node.kind === ts.SyntaxKind.PrivateIdentifier;
}

/* @internal */
export function isGetOrSetAccessorDeclaration(node: ts.Node): node is ts.AccessorDeclaration {
    return node.kind === ts.SyntaxKind.SetAccessor || node.kind === ts.SyntaxKind.GetAccessor;
}

export function isPropertyAccessChain(node: ts.Node): node is ts.PropertyAccessChain {
    return ts.isPropertyAccessExpression(node) && !!(node.flags & ts.NodeFlags.OptionalChain);
}

export function isElementAccessChain(node: ts.Node): node is ts.ElementAccessChain {
    return ts.isElementAccessExpression(node) && !!(node.flags & ts.NodeFlags.OptionalChain);
}

export function isCallChain(node: ts.Node): node is ts.CallChain {
    return ts.isCallExpression(node) && !!(node.flags & ts.NodeFlags.OptionalChain);
}

export function isOptionalChain(node: ts.Node): node is ts.PropertyAccessChain | ts.ElementAccessChain | ts.CallChain | ts.NonNullChain {
    const kind = node.kind;
    return !!(node.flags & ts.NodeFlags.OptionalChain) &&
        (kind === ts.SyntaxKind.PropertyAccessExpression
            || kind === ts.SyntaxKind.ElementAccessExpression
            || kind === ts.SyntaxKind.CallExpression
            || kind === ts.SyntaxKind.NonNullExpression);
}

/* @internal */
export function isOptionalChainRoot(node: ts.Node): node is ts.OptionalChainRoot {
    return isOptionalChain(node) && !ts.isNonNullExpression(node) && !!node.questionDotToken;
}

/**
 * Determines whether a node is the expression preceding an optional chain (i.e. `a` in `a?.b`).
 */
/* @internal */
export function isExpressionOfOptionalChainRoot(node: ts.Node): node is ts.Expression & { parent: ts.OptionalChainRoot } {
    return isOptionalChainRoot(node.parent) && node.parent.expression === node;
}

/**
 * Determines whether a node is the outermost `OptionalChain` in an ECMAScript `OptionalExpression`:
 *
 * 1. For `a?.b.c`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.`)
 * 2. For `a?.b!`, the outermost chain is `a?.b` (`b` is the end of the chain starting at `a?.`)
 * 3. For `(a?.b.c).d`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.` since parens end the chain)
 * 4. For `a?.b.c?.d`, both `a?.b.c` and `a?.b.c?.d` are outermost (`c` is the end of the chain starting at `a?.`, and `d` is
 *   the end of the chain starting at `c?.`)
 * 5. For `a?.(b?.c).d`, both `b?.c` and `a?.(b?.c)d` are outermost (`c` is the end of the chain starting at `b`, and `d` is
 *   the end of the chain starting at `a?.`)
 */
/* @internal */
export function isOutermostOptionalChain(node: ts.OptionalChain) {
    return !isOptionalChain(node.parent) // cases 1, 2, and 3
        || isOptionalChainRoot(node.parent) // case 4
        || node !== node.parent.expression; // case 5
}

export function isNullishCoalesce(node: ts.Node) {
    return node.kind === ts.SyntaxKind.BinaryExpression && (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken;
}

export function isConstTypeReference(node: ts.Node) {
    return ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) &&
        node.typeName.escapedText === "const" && !node.typeArguments;
}

export function skipPartiallyEmittedExpressions(node: ts.Expression): ts.Expression;
export function skipPartiallyEmittedExpressions(node: ts.Node): ts.Node;
export function skipPartiallyEmittedExpressions(node: ts.Node) {
    return ts.skipOuterExpressions(node, ts.OuterExpressionKinds.PartiallyEmittedExpressions);
}

export function isNonNullChain(node: ts.Node): node is ts.NonNullChain {
    return ts.isNonNullExpression(node) && !!(node.flags & ts.NodeFlags.OptionalChain);
}

export function isBreakOrContinueStatement(node: ts.Node): node is ts.BreakOrContinueStatement {
    return node.kind === ts.SyntaxKind.BreakStatement || node.kind === ts.SyntaxKind.ContinueStatement;
}

export function isNamedExportBindings(node: ts.Node): node is ts.NamedExportBindings {
    return node.kind === ts.SyntaxKind.NamespaceExport || node.kind === ts.SyntaxKind.NamedExports;
}

export function isUnparsedTextLike(node: ts.Node): node is ts.UnparsedTextLike {
    switch (node.kind) {
        case ts.SyntaxKind.UnparsedText:
        case ts.SyntaxKind.UnparsedInternalText:
            return true;
        default:
            return false;
    }
}

export function isUnparsedNode(node: ts.Node): node is ts.UnparsedNode {
    return isUnparsedTextLike(node) ||
        node.kind === ts.SyntaxKind.UnparsedPrologue ||
        node.kind === ts.SyntaxKind.UnparsedSyntheticReference;
}

export function isJSDocPropertyLikeTag(node: ts.Node): node is ts.JSDocPropertyLikeTag {
    return node.kind === ts.SyntaxKind.JSDocPropertyTag || node.kind === ts.SyntaxKind.JSDocParameterTag;
}

// #endregion

// #region
// Node tests
//
// All node tests in the following list should *not* reference parent pointers so that
// they may be used with transformations.
/* @internal */
export function isNode(node: ts.Node) {
    return isNodeKind(node.kind);
}

/* @internal */
export function isNodeKind(kind: ts.SyntaxKind) {
    return kind >= ts.SyntaxKind.FirstNode;
}

/**
 * True if kind is of some token syntax kind.
 * For example, this is true for an IfKeyword but not for an IfStatement.
 * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
 */
export function isTokenKind(kind: ts.SyntaxKind): boolean {
    return kind >= ts.SyntaxKind.FirstToken && kind <= ts.SyntaxKind.LastToken;
}

/**
 * True if node is of some token syntax kind.
 * For example, this is true for an IfKeyword but not for an IfStatement.
 * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
 */
export function isToken(n: ts.Node): boolean {
    return isTokenKind(n.kind);
}

// Node Arrays

/* @internal */
export function isNodeArray<T extends ts.Node>(array: readonly T[]): array is ts.NodeArray<T> {
    return ts.hasProperty(array, "pos") && ts.hasProperty(array, "end");
}

// Literals

/* @internal */
export function isLiteralKind(kind: ts.SyntaxKind): kind is ts.LiteralToken["kind"] {
    return ts.SyntaxKind.FirstLiteralToken <= kind && kind <= ts.SyntaxKind.LastLiteralToken;
}

export function isLiteralExpression(node: ts.Node): node is ts.LiteralExpression {
    return isLiteralKind(node.kind);
}

/** @internal */
export function isLiteralExpressionOfObject(node: ts.Node) {
    switch (node.kind) {
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.RegularExpressionLiteral:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ClassExpression:
            return true;
    }
    return false;
}

// Pseudo-literals

/* @internal */
export function isTemplateLiteralKind(kind: ts.SyntaxKind): kind is ts.TemplateLiteralToken["kind"] {
    return ts.SyntaxKind.FirstTemplateToken <= kind && kind <= ts.SyntaxKind.LastTemplateToken;
}

export function isTemplateLiteralToken(node: ts.Node): node is ts.TemplateLiteralToken {
    return isTemplateLiteralKind(node.kind);
}

export function isTemplateMiddleOrTemplateTail(node: ts.Node): node is ts.TemplateMiddle | ts.TemplateTail {
    const kind = node.kind;
    return kind === ts.SyntaxKind.TemplateMiddle
        || kind === ts.SyntaxKind.TemplateTail;
}

export function isImportOrExportSpecifier(node: ts.Node): node is ts.ImportSpecifier | ts.ExportSpecifier {
    return ts.isImportSpecifier(node) || ts.isExportSpecifier(node);
}

export function isTypeOnlyImportOrExportDeclaration(node: ts.Node): node is ts.TypeOnlyAliasDeclaration {
    switch (node.kind) {
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.ExportSpecifier:
            return (node as ts.ImportOrExportSpecifier).isTypeOnly || (node as ts.ImportOrExportSpecifier).parent.parent.isTypeOnly;
        case ts.SyntaxKind.NamespaceImport:
            return (node as ts.NamespaceImport).parent.isTypeOnly;
        case ts.SyntaxKind.ImportClause:
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return (node as ts.ImportClause | ts.ImportEqualsDeclaration).isTypeOnly;
        default:
            return false;
    }
}

export function isAssertionKey(node: ts.Node): node is ts.AssertionKey {
    return ts.isStringLiteral(node) || ts.isIdentifier(node);
}

export function isStringTextContainingNode(node: ts.Node): node is ts.StringLiteral | ts.TemplateLiteralToken {
    return node.kind === ts.SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind);
}

// Identifiers

/* @internal */
export function isGeneratedIdentifier(node: ts.Node): node is ts.GeneratedIdentifier {
    return ts.isIdentifier(node) && (node.autoGenerateFlags! & ts.GeneratedIdentifierFlags.KindMask) > ts.GeneratedIdentifierFlags.None;
}

/* @internal */
export function isGeneratedPrivateIdentifier(node: ts.Node): node is ts.GeneratedPrivateIdentifier {
    return ts.isPrivateIdentifier(node) && (node.autoGenerateFlags! & ts.GeneratedIdentifierFlags.KindMask) > ts.GeneratedIdentifierFlags.None;
}

// Private Identifiers
/*@internal*/
export function isPrivateIdentifierClassElementDeclaration(node: ts.Node): node is ts.PrivateClassElementDeclaration {
    return (ts.isPropertyDeclaration(node) || isMethodOrAccessor(node)) && ts.isPrivateIdentifier(node.name);
}

/*@internal*/
export function isPrivateIdentifierPropertyAccessExpression(node: ts.Node): node is ts.PrivateIdentifierPropertyAccessExpression {
    return ts.isPropertyAccessExpression(node) && ts.isPrivateIdentifier(node.name);
}

// Keywords

/* @internal */
export function isModifierKind(token: ts.SyntaxKind): token is ts.Modifier["kind"] {
    switch (token) {
        case ts.SyntaxKind.AbstractKeyword:
        case ts.SyntaxKind.AccessorKeyword:
        case ts.SyntaxKind.AsyncKeyword:
        case ts.SyntaxKind.ConstKeyword:
        case ts.SyntaxKind.DeclareKeyword:
        case ts.SyntaxKind.DefaultKeyword:
        case ts.SyntaxKind.ExportKeyword:
        case ts.SyntaxKind.InKeyword:
        case ts.SyntaxKind.PublicKeyword:
        case ts.SyntaxKind.PrivateKeyword:
        case ts.SyntaxKind.ProtectedKeyword:
        case ts.SyntaxKind.ReadonlyKeyword:
        case ts.SyntaxKind.StaticKeyword:
        case ts.SyntaxKind.OutKeyword:
        case ts.SyntaxKind.OverrideKeyword:
            return true;
    }
    return false;
}

/* @internal */
export function isParameterPropertyModifier(kind: ts.SyntaxKind): boolean {
    return !!(ts.modifierToFlag(kind) & ts.ModifierFlags.ParameterPropertyModifier);
}

/* @internal */
export function isClassMemberModifier(idToken: ts.SyntaxKind): boolean {
    return isParameterPropertyModifier(idToken) ||
        idToken === ts.SyntaxKind.StaticKeyword ||
        idToken === ts.SyntaxKind.OverrideKeyword ||
        idToken === ts.SyntaxKind.AccessorKeyword;
}

export function isModifier(node: ts.Node): node is ts.Modifier {
    return isModifierKind(node.kind);
}

export function isEntityName(node: ts.Node): node is ts.EntityName {
    const kind = node.kind;
    return kind === ts.SyntaxKind.QualifiedName
        || kind === ts.SyntaxKind.Identifier;
}

export function isPropertyName(node: ts.Node): node is ts.PropertyName {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Identifier
        || kind === ts.SyntaxKind.PrivateIdentifier
        || kind === ts.SyntaxKind.StringLiteral
        || kind === ts.SyntaxKind.NumericLiteral
        || kind === ts.SyntaxKind.ComputedPropertyName;
}

export function isBindingName(node: ts.Node): node is ts.BindingName {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Identifier
        || kind === ts.SyntaxKind.ObjectBindingPattern
        || kind === ts.SyntaxKind.ArrayBindingPattern;
}

// Functions

export function isFunctionLike(node: ts.Node | undefined): node is ts.SignatureDeclaration {
    return !!node && isFunctionLikeKind(node.kind);
}

/* @internal */
export function isFunctionLikeOrClassStaticBlockDeclaration(node: ts.Node | undefined): node is ts.SignatureDeclaration | ts.ClassStaticBlockDeclaration {
    return !!node && (isFunctionLikeKind(node.kind) || ts.isClassStaticBlockDeclaration(node));
}

/* @internal */
export function isFunctionLikeDeclaration(node: ts.Node): node is ts.FunctionLikeDeclaration {
    return node && isFunctionLikeDeclarationKind(node.kind);
}

/* @internal */
export function isBooleanLiteral(node: ts.Node): node is ts.BooleanLiteral {
    return node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword;
}

function isFunctionLikeDeclarationKind(kind: ts.SyntaxKind): boolean {
    switch (kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            return true;
        default:
            return false;
    }
}

/* @internal */
export function isFunctionLikeKind(kind: ts.SyntaxKind): boolean {
    switch (kind) {
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.JSDocSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.IndexSignature:
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.JSDocFunctionType:
        case ts.SyntaxKind.ConstructorType:
            return true;
        default:
            return isFunctionLikeDeclarationKind(kind);
    }
}

/* @internal */
export function isFunctionOrModuleBlock(node: ts.Node): boolean {
    return ts.isSourceFile(node) || ts.isModuleBlock(node) || ts.isBlock(node) && isFunctionLike(node.parent);
}

// Classes
export function isClassElement(node: ts.Node): node is ts.ClassElement {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.PropertyDeclaration
        || kind === ts.SyntaxKind.MethodDeclaration
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor
        || kind === ts.SyntaxKind.IndexSignature
        || kind === ts.SyntaxKind.ClassStaticBlockDeclaration
        || kind === ts.SyntaxKind.SemicolonClassElement;
}

export function isClassLike(node: ts.Node): node is ts.ClassLikeDeclaration {
    return node && (node.kind === ts.SyntaxKind.ClassDeclaration || node.kind === ts.SyntaxKind.ClassExpression);
}

export function isAccessor(node: ts.Node): node is ts.AccessorDeclaration {
    return node && (node.kind === ts.SyntaxKind.GetAccessor || node.kind === ts.SyntaxKind.SetAccessor);
}

export function isAutoAccessorPropertyDeclaration(node: ts.Node): node is ts.AutoAccessorPropertyDeclaration {
    return ts.isPropertyDeclaration(node) && ts.hasAccessorModifier(node);
}

/* @internal */
export function isMethodOrAccessor(node: ts.Node): node is ts.MethodDeclaration | ts.AccessorDeclaration {
    switch (node.kind) {
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return true;
        default:
            return false;
    }
}

/* @internal */
export function isNamedClassElement(node: ts.Node): node is ts.MethodDeclaration | ts.AccessorDeclaration | ts.PropertyDeclaration {
    switch (node.kind) {
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.PropertyDeclaration:
            return true;
        default:
            return false;
    }
}

// Type members

export function isModifierLike(node: ts.Node): node is ts.ModifierLike {
    return isModifier(node) || ts.isDecorator(node);
}

export function isTypeElement(node: ts.Node): node is ts.TypeElement {
    const kind = node.kind;
    return kind === ts.SyntaxKind.ConstructSignature
        || kind === ts.SyntaxKind.CallSignature
        || kind === ts.SyntaxKind.PropertySignature
        || kind === ts.SyntaxKind.MethodSignature
        || kind === ts.SyntaxKind.IndexSignature
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor;
}

export function isClassOrTypeElement(node: ts.Node): node is ts.ClassElement | ts.TypeElement {
    return isTypeElement(node) || isClassElement(node);
}

export function isObjectLiteralElementLike(node: ts.Node): node is ts.ObjectLiteralElementLike {
    const kind = node.kind;
    return kind === ts.SyntaxKind.PropertyAssignment
        || kind === ts.SyntaxKind.ShorthandPropertyAssignment
        || kind === ts.SyntaxKind.SpreadAssignment
        || kind === ts.SyntaxKind.MethodDeclaration
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.SetAccessor;
}

// Type

/**
 * Node test that determines whether a node is a valid type node.
 * This differs from the `isPartOfTypeNode` function which determines whether a node is *part*
 * of a TypeNode.
 */
export function isTypeNode(node: ts.Node): node is ts.TypeNode {
    return ts.isTypeNodeKind(node.kind);
}

export function isFunctionOrConstructorTypeNode(node: ts.Node): node is ts.FunctionTypeNode | ts.ConstructorTypeNode {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
            return true;
    }

    return false;
}

// Binding patterns

/* @internal */
export function isBindingPattern(node: ts.Node | undefined): node is ts.BindingPattern {
    if (node) {
        const kind = node.kind;
        return kind === ts.SyntaxKind.ArrayBindingPattern
            || kind === ts.SyntaxKind.ObjectBindingPattern;
    }

    return false;
}

/* @internal */
export function isAssignmentPattern(node: ts.Node): node is ts.AssignmentPattern {
    const kind = node.kind;
    return kind === ts.SyntaxKind.ArrayLiteralExpression
        || kind === ts.SyntaxKind.ObjectLiteralExpression;
}


/* @internal */
export function isArrayBindingElement(node: ts.Node): node is ts.ArrayBindingElement {
    const kind = node.kind;
    return kind === ts.SyntaxKind.BindingElement
        || kind === ts.SyntaxKind.OmittedExpression;
}


/**
 * Determines whether the BindingOrAssignmentElement is a BindingElement-like declaration
 */
/* @internal */
export function isDeclarationBindingElement(bindingElement: ts.BindingOrAssignmentElement): bindingElement is ts.VariableDeclaration | ts.ParameterDeclaration | ts.BindingElement {
    switch (bindingElement.kind) {
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.BindingElement:
            return true;
    }

    return false;
}

/**
 * Determines whether a node is a BindingOrAssignmentPattern
 */
/* @internal */
export function isBindingOrAssignmentPattern(node: ts.BindingOrAssignmentElementTarget): node is ts.BindingOrAssignmentPattern {
    return isObjectBindingOrAssignmentPattern(node)
        || isArrayBindingOrAssignmentPattern(node);
}

/**
 * Determines whether a node is an ObjectBindingOrAssignmentPattern
 */
/* @internal */
export function isObjectBindingOrAssignmentPattern(node: ts.BindingOrAssignmentElementTarget): node is ts.ObjectBindingOrAssignmentPattern {
    switch (node.kind) {
        case ts.SyntaxKind.ObjectBindingPattern:
        case ts.SyntaxKind.ObjectLiteralExpression:
            return true;
    }

    return false;
}

/* @internal */
export function isObjectBindingOrAssignmentElement(node: ts.Node): node is ts.ObjectBindingOrAssignmentElement {
    switch (node.kind) {
        case ts.SyntaxKind.BindingElement:
        case ts.SyntaxKind.PropertyAssignment: // AssignmentProperty
        case ts.SyntaxKind.ShorthandPropertyAssignment: // AssignmentProperty
        case ts.SyntaxKind.SpreadAssignment: // AssignmentRestProperty
            return true;
    }
    return false;
}

/**
 * Determines whether a node is an ArrayBindingOrAssignmentPattern
 */
/* @internal */
export function isArrayBindingOrAssignmentPattern(node: ts.BindingOrAssignmentElementTarget): node is ts.ArrayBindingOrAssignmentPattern {
    switch (node.kind) {
        case ts.SyntaxKind.ArrayBindingPattern:
        case ts.SyntaxKind.ArrayLiteralExpression:
            return true;
    }

    return false;
}

/* @internal */
export function isPropertyAccessOrQualifiedNameOrImportTypeNode(node: ts.Node): node is ts.PropertyAccessExpression | ts.QualifiedName | ts.ImportTypeNode {
    const kind = node.kind;
    return kind === ts.SyntaxKind.PropertyAccessExpression
        || kind === ts.SyntaxKind.QualifiedName
        || kind === ts.SyntaxKind.ImportType;
}

// Expression

export function isPropertyAccessOrQualifiedName(node: ts.Node): node is ts.PropertyAccessExpression | ts.QualifiedName {
    const kind = node.kind;
    return kind === ts.SyntaxKind.PropertyAccessExpression
        || kind === ts.SyntaxKind.QualifiedName;
}

export function isCallLikeExpression(node: ts.Node): node is ts.CallLikeExpression {
    switch (node.kind) {
        case ts.SyntaxKind.JsxOpeningElement:
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
        case ts.SyntaxKind.TaggedTemplateExpression:
        case ts.SyntaxKind.Decorator:
            return true;
        default:
            return false;
    }
}

export function isCallOrNewExpression(node: ts.Node): node is ts.CallExpression | ts.NewExpression {
    return node.kind === ts.SyntaxKind.CallExpression || node.kind === ts.SyntaxKind.NewExpression;
}

export function isTemplateLiteral(node: ts.Node): node is ts.TemplateLiteral {
    const kind = node.kind;
    return kind === ts.SyntaxKind.TemplateExpression
        || kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral;
}

/* @internal */
export function isLeftHandSideExpression(node: ts.Node): node is ts.LeftHandSideExpression {
    return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isLeftHandSideExpressionKind(kind: ts.SyntaxKind): boolean {
    switch (kind) {
        case ts.SyntaxKind.PropertyAccessExpression:
        case ts.SyntaxKind.ElementAccessExpression:
        case ts.SyntaxKind.NewExpression:
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.JsxElement:
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxFragment:
        case ts.SyntaxKind.TaggedTemplateExpression:
        case ts.SyntaxKind.ArrayLiteralExpression:
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.Identifier:
        case ts.SyntaxKind.PrivateIdentifier: // technically this is only an Expression if it's in a `#field in expr` BinaryExpression
        case ts.SyntaxKind.RegularExpressionLiteral:
        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.BigIntLiteral:
        case ts.SyntaxKind.StringLiteral:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateExpression:
        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.ThisKeyword:
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.SuperKeyword:
        case ts.SyntaxKind.NonNullExpression:
        case ts.SyntaxKind.ExpressionWithTypeArguments:
        case ts.SyntaxKind.MetaProperty:
        case ts.SyntaxKind.ImportKeyword: // technically this is only an Expression if it's in a CallExpression
            return true;
        default:
            return false;
    }
}

/* @internal */
export function isUnaryExpression(node: ts.Node): node is ts.UnaryExpression {
    return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isUnaryExpressionKind(kind: ts.SyntaxKind): boolean {
    switch (kind) {
        case ts.SyntaxKind.PrefixUnaryExpression:
        case ts.SyntaxKind.PostfixUnaryExpression:
        case ts.SyntaxKind.DeleteExpression:
        case ts.SyntaxKind.TypeOfExpression:
        case ts.SyntaxKind.VoidExpression:
        case ts.SyntaxKind.AwaitExpression:
        case ts.SyntaxKind.TypeAssertionExpression:
            return true;
        default:
            return isLeftHandSideExpressionKind(kind);
    }
}

/* @internal */
export function isUnaryExpressionWithWrite(expr: ts.Node): expr is ts.PrefixUnaryExpression | ts.PostfixUnaryExpression {
    switch (expr.kind) {
        case ts.SyntaxKind.PostfixUnaryExpression:
            return true;
        case ts.SyntaxKind.PrefixUnaryExpression:
            return (expr as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.PlusPlusToken ||
                (expr as ts.PrefixUnaryExpression).operator === ts.SyntaxKind.MinusMinusToken;
        default:
            return false;
    }
}

/* @internal */
/**
 * Determines whether a node is an expression based only on its kind.
 * Use `isExpressionNode` if not in transforms.
 */
export function isExpression(node: ts.Node): node is ts.Expression {
    return isExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isExpressionKind(kind: ts.SyntaxKind): boolean {
    switch (kind) {
        case ts.SyntaxKind.ConditionalExpression:
        case ts.SyntaxKind.YieldExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.BinaryExpression:
        case ts.SyntaxKind.SpreadElement:
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.OmittedExpression:
        case ts.SyntaxKind.CommaListExpression:
        case ts.SyntaxKind.PartiallyEmittedExpression:
        case ts.SyntaxKind.SatisfiesExpression:
            return true;
        default:
            return isUnaryExpressionKind(kind);
    }
}

export function isAssertionExpression(node: ts.Node): node is ts.AssertionExpression {
    const kind = node.kind;
    return kind === ts.SyntaxKind.TypeAssertionExpression
        || kind === ts.SyntaxKind.AsExpression;
}

/* @internal */
export function isNotEmittedOrPartiallyEmittedNode(node: ts.Node): node is ts.NotEmittedStatement | ts.PartiallyEmittedExpression {
    return ts.isNotEmittedStatement(node)
        || ts.isPartiallyEmittedExpression(node);
}

// Statement

export function isIterationStatement(node: ts.Node, lookInLabeledStatements: false): node is ts.IterationStatement;
export function isIterationStatement(node: ts.Node, lookInLabeledStatements: boolean): node is ts.IterationStatement | ts.LabeledStatement;
export function isIterationStatement(node: ts.Node, lookInLabeledStatements: boolean): node is ts.IterationStatement {
    switch (node.kind) {
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.DoStatement:
        case ts.SyntaxKind.WhileStatement:
            return true;
        case ts.SyntaxKind.LabeledStatement:
            return lookInLabeledStatements && isIterationStatement((node as ts.LabeledStatement).statement, lookInLabeledStatements);
    }

    return false;
}

/* @internal */
export function isScopeMarker(node: ts.Node) {
    return ts.isExportAssignment(node) || ts.isExportDeclaration(node);
}

/* @internal */
export function hasScopeMarker(statements: readonly ts.Statement[]) {
    return ts.some(statements, isScopeMarker);
}

/* @internal */
export function needsScopeMarker(result: ts.Statement) {
    return !ts.isAnyImportOrReExport(result) && !ts.isExportAssignment(result) && !ts.hasSyntacticModifier(result, ts.ModifierFlags.Export) && !ts.isAmbientModule(result);
}

/* @internal */
export function isExternalModuleIndicator(result: ts.Statement) {
    // Exported top-level member indicates moduleness
    return ts.isAnyImportOrReExport(result) || ts.isExportAssignment(result) || ts.hasSyntacticModifier(result, ts.ModifierFlags.Export);
}

/* @internal */
export function isForInOrOfStatement(node: ts.Node): node is ts.ForInOrOfStatement {
    return node.kind === ts.SyntaxKind.ForInStatement || node.kind === ts.SyntaxKind.ForOfStatement;
}

// Element

/* @internal */
export function isConciseBody(node: ts.Node): node is ts.ConciseBody {
    return ts.isBlock(node)
        || isExpression(node);
}

/* @internal */
export function isFunctionBody(node: ts.Node): node is ts.FunctionBody {
    return ts.isBlock(node);
}

/* @internal */
export function isForInitializer(node: ts.Node): node is ts.ForInitializer {
    return ts.isVariableDeclarationList(node)
        || isExpression(node);
}

/* @internal */
export function isModuleBody(node: ts.Node): node is ts.ModuleBody {
    const kind = node.kind;
    return kind === ts.SyntaxKind.ModuleBlock
        || kind === ts.SyntaxKind.ModuleDeclaration
        || kind === ts.SyntaxKind.Identifier;
}

/* @internal */
export function isNamespaceBody(node: ts.Node): node is ts.NamespaceBody {
    const kind = node.kind;
    return kind === ts.SyntaxKind.ModuleBlock
        || kind === ts.SyntaxKind.ModuleDeclaration;
}

/* @internal */
export function isJSDocNamespaceBody(node: ts.Node): node is ts.JSDocNamespaceBody {
    const kind = node.kind;
    return kind === ts.SyntaxKind.Identifier
        || kind === ts.SyntaxKind.ModuleDeclaration;
}

/* @internal */
export function isNamedImportBindings(node: ts.Node): node is ts.NamedImportBindings {
    const kind = node.kind;
    return kind === ts.SyntaxKind.NamedImports
        || kind === ts.SyntaxKind.NamespaceImport;
}

/* @internal */
export function isModuleOrEnumDeclaration(node: ts.Node): node is ts.ModuleDeclaration | ts.EnumDeclaration {
    return node.kind === ts.SyntaxKind.ModuleDeclaration || node.kind === ts.SyntaxKind.EnumDeclaration;
}

function isDeclarationKind(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.ArrowFunction
        || kind === ts.SyntaxKind.BindingElement
        || kind === ts.SyntaxKind.ClassDeclaration
        || kind === ts.SyntaxKind.ClassExpression
        || kind === ts.SyntaxKind.ClassStaticBlockDeclaration
        || kind === ts.SyntaxKind.Constructor
        || kind === ts.SyntaxKind.EnumDeclaration
        || kind === ts.SyntaxKind.EnumMember
        || kind === ts.SyntaxKind.ExportSpecifier
        || kind === ts.SyntaxKind.FunctionDeclaration
        || kind === ts.SyntaxKind.FunctionExpression
        || kind === ts.SyntaxKind.GetAccessor
        || kind === ts.SyntaxKind.ImportClause
        || kind === ts.SyntaxKind.ImportEqualsDeclaration
        || kind === ts.SyntaxKind.ImportSpecifier
        || kind === ts.SyntaxKind.InterfaceDeclaration
        || kind === ts.SyntaxKind.JsxAttribute
        || kind === ts.SyntaxKind.MethodDeclaration
        || kind === ts.SyntaxKind.MethodSignature
        || kind === ts.SyntaxKind.ModuleDeclaration
        || kind === ts.SyntaxKind.NamespaceExportDeclaration
        || kind === ts.SyntaxKind.NamespaceImport
        || kind === ts.SyntaxKind.NamespaceExport
        || kind === ts.SyntaxKind.Parameter
        || kind === ts.SyntaxKind.PropertyAssignment
        || kind === ts.SyntaxKind.PropertyDeclaration
        || kind === ts.SyntaxKind.PropertySignature
        || kind === ts.SyntaxKind.SetAccessor
        || kind === ts.SyntaxKind.ShorthandPropertyAssignment
        || kind === ts.SyntaxKind.TypeAliasDeclaration
        || kind === ts.SyntaxKind.TypeParameter
        || kind === ts.SyntaxKind.VariableDeclaration
        || kind === ts.SyntaxKind.JSDocTypedefTag
        || kind === ts.SyntaxKind.JSDocCallbackTag
        || kind === ts.SyntaxKind.JSDocPropertyTag;
}

function isDeclarationStatementKind(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.FunctionDeclaration
        || kind === ts.SyntaxKind.MissingDeclaration
        || kind === ts.SyntaxKind.ClassDeclaration
        || kind === ts.SyntaxKind.InterfaceDeclaration
        || kind === ts.SyntaxKind.TypeAliasDeclaration
        || kind === ts.SyntaxKind.EnumDeclaration
        || kind === ts.SyntaxKind.ModuleDeclaration
        || kind === ts.SyntaxKind.ImportDeclaration
        || kind === ts.SyntaxKind.ImportEqualsDeclaration
        || kind === ts.SyntaxKind.ExportDeclaration
        || kind === ts.SyntaxKind.ExportAssignment
        || kind === ts.SyntaxKind.NamespaceExportDeclaration;
}

function isStatementKindButNotDeclarationKind(kind: ts.SyntaxKind) {
    return kind === ts.SyntaxKind.BreakStatement
        || kind === ts.SyntaxKind.ContinueStatement
        || kind === ts.SyntaxKind.DebuggerStatement
        || kind === ts.SyntaxKind.DoStatement
        || kind === ts.SyntaxKind.ExpressionStatement
        || kind === ts.SyntaxKind.EmptyStatement
        || kind === ts.SyntaxKind.ForInStatement
        || kind === ts.SyntaxKind.ForOfStatement
        || kind === ts.SyntaxKind.ForStatement
        || kind === ts.SyntaxKind.IfStatement
        || kind === ts.SyntaxKind.LabeledStatement
        || kind === ts.SyntaxKind.ReturnStatement
        || kind === ts.SyntaxKind.SwitchStatement
        || kind === ts.SyntaxKind.ThrowStatement
        || kind === ts.SyntaxKind.TryStatement
        || kind === ts.SyntaxKind.VariableStatement
        || kind === ts.SyntaxKind.WhileStatement
        || kind === ts.SyntaxKind.WithStatement
        || kind === ts.SyntaxKind.NotEmittedStatement
        || kind === ts.SyntaxKind.EndOfDeclarationMarker
        || kind === ts.SyntaxKind.MergeDeclarationMarker;
}

/* @internal */
export function isDeclaration(node: ts.Node): node is ts.NamedDeclaration {
    if (node.kind === ts.SyntaxKind.TypeParameter) {
        return (node.parent && node.parent.kind !== ts.SyntaxKind.JSDocTemplateTag) || ts.isInJSFile(node);
    }

    return isDeclarationKind(node.kind);
}

/* @internal */
export function isDeclarationStatement(node: ts.Node): node is ts.DeclarationStatement {
    return isDeclarationStatementKind(node.kind);
}

/**
 * Determines whether the node is a statement that is not also a declaration
 */
/* @internal */
export function isStatementButNotDeclaration(node: ts.Node): node is ts.Statement {
    return isStatementKindButNotDeclarationKind(node.kind);
}

/* @internal */
export function isStatement(node: ts.Node): node is ts.Statement {
    const kind = node.kind;
    return isStatementKindButNotDeclarationKind(kind)
        || isDeclarationStatementKind(kind)
        || isBlockStatement(node);
}

function isBlockStatement(node: ts.Node): node is ts.Block {
    if (node.kind !== ts.SyntaxKind.Block) return false;
    if (node.parent !== undefined) {
        if (node.parent.kind === ts.SyntaxKind.TryStatement || node.parent.kind === ts.SyntaxKind.CatchClause) {
            return false;
        }
    }
    return !ts.isFunctionBlock(node);
}

/**
 * NOTE: This is similar to `isStatement` but does not access parent pointers.
 */
/* @internal */
export function isStatementOrBlock(node: ts.Node): node is ts.Statement | ts.Block {
    const kind = node.kind;
    return isStatementKindButNotDeclarationKind(kind)
        || isDeclarationStatementKind(kind)
        || kind === ts.SyntaxKind.Block;
}

// Module references

/* @internal */
export function isModuleReference(node: ts.Node): node is ts.ModuleReference {
    const kind = node.kind;
    return kind === ts.SyntaxKind.ExternalModuleReference
        || kind === ts.SyntaxKind.QualifiedName
        || kind === ts.SyntaxKind.Identifier;
}

// JSX

/* @internal */
export function isJsxTagNameExpression(node: ts.Node): node is ts.JsxTagNameExpression {
    const kind = node.kind;
    return kind === ts.SyntaxKind.ThisKeyword
        || kind === ts.SyntaxKind.Identifier
        || kind === ts.SyntaxKind.PropertyAccessExpression;
}

/* @internal */
export function isJsxChild(node: ts.Node): node is ts.JsxChild {
    const kind = node.kind;
    return kind === ts.SyntaxKind.JsxElement
        || kind === ts.SyntaxKind.JsxExpression
        || kind === ts.SyntaxKind.JsxSelfClosingElement
        || kind === ts.SyntaxKind.JsxText
        || kind === ts.SyntaxKind.JsxFragment;
}

/* @internal */
export function isJsxAttributeLike(node: ts.Node): node is ts.JsxAttributeLike {
    const kind = node.kind;
    return kind === ts.SyntaxKind.JsxAttribute
        || kind === ts.SyntaxKind.JsxSpreadAttribute;
}

/* @internal */
export function isStringLiteralOrJsxExpression(node: ts.Node): node is ts.StringLiteral | ts.JsxExpression {
    const kind = node.kind;
    return kind === ts.SyntaxKind.StringLiteral
        || kind === ts.SyntaxKind.JsxExpression;
}

export function isJsxOpeningLikeElement(node: ts.Node): node is ts.JsxOpeningLikeElement {
    const kind = node.kind;
    return kind === ts.SyntaxKind.JsxOpeningElement
        || kind === ts.SyntaxKind.JsxSelfClosingElement;
}

// Clauses

export function isCaseOrDefaultClause(node: ts.Node): node is ts.CaseOrDefaultClause {
    const kind = node.kind;
    return kind === ts.SyntaxKind.CaseClause
        || kind === ts.SyntaxKind.DefaultClause;
}

// JSDoc

/** True if node is of some JSDoc syntax kind. */
/* @internal */
export function isJSDocNode(node: ts.Node): boolean {
    return node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode;
}

/** True if node is of a kind that may contain comment text. */
export function isJSDocCommentContainingNode(node: ts.Node): boolean {
    return node.kind === ts.SyntaxKind.JSDoc
        || node.kind === ts.SyntaxKind.JSDocNamepathType
        || node.kind === ts.SyntaxKind.JSDocText
        || isJSDocLinkLike(node)
        || isJSDocTag(node)
        || ts.isJSDocTypeLiteral(node)
        || ts.isJSDocSignature(node);
}

// TODO: determine what this does before making it public.
/* @internal */
export function isJSDocTag(node: ts.Node): node is ts.JSDocTag {
    return node.kind >= ts.SyntaxKind.FirstJSDocTagNode && node.kind <= ts.SyntaxKind.LastJSDocTagNode;
}

export function isSetAccessor(node: ts.Node): node is ts.SetAccessorDeclaration {
    return node.kind === ts.SyntaxKind.SetAccessor;
}

export function isGetAccessor(node: ts.Node): node is ts.GetAccessorDeclaration {
    return node.kind === ts.SyntaxKind.GetAccessor;
}

/** True if has jsdoc nodes attached to it. */
/* @internal */
// TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
export function hasJSDocNodes(node: ts.Node): node is ts.HasJSDoc {
    const { jsDoc } = node as ts.JSDocContainer;
    return !!jsDoc && jsDoc.length > 0;
}

/** True if has type node attached to it. */
/* @internal */
export function hasType(node: ts.Node): node is ts.HasType {
    return !!(node as ts.HasType).type;
}

/** True if has initializer node attached to it. */
/* @internal */
export function hasInitializer(node: ts.Node): node is ts.HasInitializer {
    return !!(node as ts.HasInitializer).initializer;
}

/** True if has initializer node attached to it. */
export function hasOnlyExpressionInitializer(node: ts.Node): node is ts.HasExpressionInitializer {
    switch (node.kind) {
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.BindingElement:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertyAssignment:
        case ts.SyntaxKind.EnumMember:
            return true;
        default:
            return false;
    }
}

export function isObjectLiteralElement(node: ts.Node): node is ts.ObjectLiteralElement {
    return node.kind === ts.SyntaxKind.JsxAttribute || node.kind === ts.SyntaxKind.JsxSpreadAttribute || isObjectLiteralElementLike(node);
}

/* @internal */
export function isTypeReferenceType(node: ts.Node): node is ts.TypeReferenceType {
    return node.kind === ts.SyntaxKind.TypeReference || node.kind === ts.SyntaxKind.ExpressionWithTypeArguments;
}

const MAX_SMI_X86 = 0x3fff_ffff;
/* @internal */
export function guessIndentation(lines: string[]) {
    let indentation = MAX_SMI_X86;
    for (const line of lines) {
        if (!line.length) {
            continue;
        }
        let i = 0;
        for (; i < line.length && i < indentation; i++) {
            if (!ts.isWhiteSpaceLike(line.charCodeAt(i))) {
                break;
            }
        }
        if (i < indentation) {
            indentation = i;
        }
        if (indentation === 0) {
            return 0;
        }
    }
    return indentation === MAX_SMI_X86 ? undefined : indentation;
}

export function isStringLiteralLike(node: ts.Node | ts.FileReference): node is ts.StringLiteralLike {
    return (node as ts.Node).kind === ts.SyntaxKind.StringLiteral || (node as ts.Node).kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral;
}

export function isJSDocLinkLike(node: ts.Node): node is ts.JSDocLink | ts.JSDocLinkCode | ts.JSDocLinkPlain {
    return node.kind === ts.SyntaxKind.JSDocLink || node.kind === ts.SyntaxKind.JSDocLinkCode || node.kind === ts.SyntaxKind.JSDocLinkPlain;
}

export function hasRestParameter(s: ts.SignatureDeclaration | ts.JSDocSignature): boolean {
    const last = ts.lastOrUndefined<ts.ParameterDeclaration | ts.JSDocParameterTag>(s.parameters);
    return !!last && isRestParameter(last);
}

export function isRestParameter(node: ts.ParameterDeclaration | ts.JSDocParameterTag): boolean {
    const type = ts.isJSDocParameterTag(node) ? (node.typeExpression && node.typeExpression.type) : node.type;
    return (node as ts.ParameterDeclaration).dotDotDotToken !== undefined || !!type && type.kind === ts.SyntaxKind.JSDocVariadicType;
}
